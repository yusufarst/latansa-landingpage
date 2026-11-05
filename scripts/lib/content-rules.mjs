/**
 * Pure rules behind `npm run content:check`. Kept free of I/O so they can be
 * unit-tested (scripts/__tests__/content-rules.test.mjs).
 */

export const PUBLISHABLE = new Set(["client-confirmed", "client-provided"]);
const STATUSES = new Set([
  "client-confirmed",
  "client-provided",
  "needs-confirmation",
  "unverified",
  "missing",
]);

const isFactLike = (node) =>
  node !== null &&
  typeof node === "object" &&
  "status" in node &&
  "source" in node &&
  "value" in node;

/** Walk a content tree and collect every Fact-shaped object with its path. */
export function collectFacts(node, path = "company", out = []) {
  if (isFactLike(node)) {
    out.push({ path, fact: node });
    return out;
  }
  if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) {
      const label = Array.isArray(node)
        ? `${path}[${child?.id ?? key}]`
        : `${path}.${key}`;
      collectFacts(child, label, out);
    }
  }
  return out;
}

export const isPublishableFact = (fact) =>
  fact.value !== null && PUBLISHABLE.has(fact.status);

/** Normalized launch requirement: { kind: "required" | "optional" | "group", group? }. */
export function launchOf(fact) {
  const l = fact.launch;
  if (l === "required" || l === "optional") return { kind: l };
  if (
    l &&
    typeof l === "object" &&
    typeof l.atLeastOneOf === "string" &&
    l.atLeastOneOf
  ) {
    return { kind: "group", group: l.atLeastOneOf };
  }
  return { kind: "invalid" };
}

/** Structural problems that make the content model untrustworthy. */
export function validateFacts(facts) {
  const errors = [];
  for (const { path, fact } of facts) {
    if (!STATUSES.has(fact.status))
      errors.push(`${path}: unknown status "${fact.status}"`);
    if (typeof fact.source !== "string" || !fact.source.trim())
      errors.push(`${path}: missing source`);
    if (launchOf(fact).kind === "invalid")
      errors.push(`${path}: missing or invalid "launch" requirement`);
    if (fact.value === null && PUBLISHABLE.has(fact.status))
      errors.push(`${path}: status "${fact.status}" but value is null`);
  }
  return errors;
}

/**
 * Launch readiness.
 * - blocking: required facts not publishable, and atLeastOneOf groups with no
 *   publishable member. These fail `--strict`.
 * - deferred: optional (or group) facts that are unresolved but do not block;
 *   they are omitted from the UI until resolved.
 */
export function evaluateLaunch(facts) {
  const blocking = [];
  const deferred = [];
  const groups = new Map();

  for (const entry of facts) {
    const { kind, group } = launchOf(entry.fact);
    const ok = isPublishableFact(entry.fact);
    if (kind === "required" && !ok)
      blocking.push({ ...entry, reason: "required fact unresolved" });
    if (kind === "optional" && !ok) deferred.push(entry);
    if (kind === "group") {
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(entry);
    }
  }

  for (const [group, members] of groups) {
    const satisfied = members.some((m) => isPublishableFact(m.fact));
    for (const m of members) if (!isPublishableFact(m.fact)) deferred.push(m);
    if (!satisfied) {
      blocking.push({
        path: `group "${group}" (${members.map((m) => m.path).join(", ")})`,
        fact: null,
        reason: "at least one fact in this group must be publishable",
      });
    }
  }

  return { blocking, deferred };
}

/** Patterns that must never appear in shipped source. */
export const FORBIDDEN = [
  { re: /\bRp\.?\s?\d/i, why: "price in Rupiah" },
  { re: /\bIDR\s?\d/i, why: "price in IDR" },
  { re: /\b(harga|diskon|promo)\b/i, why: "pricing language" },
  { re: /\b(keranjang|checkout|add to cart|beli sekarang)\b/i, why: "cart / checkout" },
  { re: /\bstok\s*[:\d]/i, why: "stock quantity" },
  { re: /\b\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}\b/, why: "NPWP-like number (15 digit)" },
  { re: /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, why: "NPWP/NIK-like 16-digit number" },
];

const COMMENT_LINE = /^\s*(\*|\/\/|\/\*)/;

/** Scan one file's text for forbidden content. Maintainer comment lines are ignored. */
export function scanForbidden(text, file) {
  const violations = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (COMMENT_LINE.test(line)) return;
    for (const { re, why } of FORBIDDEN) {
      if (re.test(line)) violations.push(`${file}:${i + 1}  ${why}  →  ${line.trim()}`);
    }
  });
  return violations;
}

/**
 * UI files may read `company.<fact>.value` directly only for "required" facts,
 * which are guaranteed publishable at launch. Any other fact must go through
 * `publishedValue()` / `isPublishable()` so it is omitted while unresolved.
 */
export function scanUnguardedAccess(text, file, facts) {
  const byPath = new Map(facts.map((f) => [f.path, f.fact]));
  const violations = [];
  const access = /\bcompany((?:\.\w+|\[[^\]]+\])+?)\.value\b/g;
  text.split(/\r?\n/).forEach((line, i) => {
    if (COMMENT_LINE.test(line)) return;
    for (const m of line.matchAll(access)) {
      const path = `company${m[1]}`;
      const fact = byPath.get(path);
      if (fact && launchOf(fact).kind === "required") continue;
      const why = fact
        ? `non-required fact read directly; use publishedValue(${path})`
        : `cannot verify ${path}; read facts via publishedValue()/isPublishable()`;
      violations.push(`${file}:${i + 1}  ${why}`);
    }
  });
  return violations;
}
