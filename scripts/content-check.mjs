#!/usr/bin/env node
/**
 * content:check — content safety and launch-readiness gate.
 *
 *   npm run content:check              report open items; fail on forbidden content,
 *                                      unguarded fact access or an invalid content model
 *   npm run content:check -- --strict  additionally fail when launch-REQUIRED facts are
 *                                      unresolved (Phase 6 production gate). Optional facts
 *                                      never block: the UI omits them until resolved.
 *
 * Options (for tests): --content <module>  load `company` from another module.
 *
 * Loads src/content/company.ts through Node's built-in TypeScript type stripping
 * (Node >= 24), so it needs no extra dependencies. Rules: scripts/lib/content-rules.mjs.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  collectFacts,
  evaluateLaunch,
  scanForbidden,
  scanUnguardedAccess,
  validateFacts,
} from "./lib/content-rules.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const contentArg = args.includes("--content")
  ? args[args.indexOf("--content") + 1]
  : null;
const contentUrl = contentArg
  ? pathToFileURL(resolve(contentArg)).href
  : new URL("../src/content/company.ts", import.meta.url).href;

const { company } = await import(contentUrl);
const facts = collectFacts(company);

// ── Source scans ────────────────────────────────────────────────────────────
const SCAN_EXT = /\.(tsx?|mdx?|json|css)$/;
// The content model's own rule text may name forbidden words.
const SCAN_SKIP = new Set([join("src", "content", "types.ts")]);
const UI_DIRS = [join("src", "app"), join("src", "components")];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (SCAN_EXT.test(name)) yield p;
  }
}

const forbidden = [];
const unguarded = [];
for (const file of walk(join(root, "src"))) {
  const rel = relative(root, file);
  if (SCAN_SKIP.has(rel)) continue;
  const text = readFileSync(file, "utf8");
  forbidden.push(...scanForbidden(text, rel));
  if (UI_DIRS.some((d) => rel.startsWith(d)))
    unguarded.push(...scanUnguardedAccess(text, rel, facts));
}

// ── Report ──────────────────────────────────────────────────────────────────
const modelErrors = validateFacts(facts);
const { blocking, deferred } = evaluateLaunch(facts);
const publishable = facts.length - new Set(deferred.map((d) => d.path)).size;

console.log(`Facts: ${facts.length} total, ${publishable} publishable\n`);
if (blocking.length) {
  console.log("Launch blockers (required before production):");
  for (const b of blocking) {
    const note = b.fact?.note ? `  ${b.fact.note}` : "";
    console.log(`  ! ${b.path}  [${b.fact?.status ?? b.reason}]${note}`);
  }
  console.log("");
}
if (deferred.length) {
  console.log("Optional, unresolved (omitted from the site; do not block launch):");
  for (const d of deferred) {
    console.log(
      `  - ${d.path}  [${d.fact.status}]${d.fact.note ? `  ${d.fact.note}` : ""}`,
    );
  }
  console.log("");
}

let failed = false;
const fail = (title, items) => {
  if (!items.length) return;
  failed = true;
  console.error(title);
  for (const v of items) console.error(`  ✗ ${v}`);
};
fail("Invalid content model:", modelErrors);
fail("Forbidden content found:", forbidden);
fail("Unguarded fact access in UI:", unguarded);
if (failed) process.exit(1);

console.log("Content model valid. Forbidden-content scan clean. UI fact access guarded.");
if (strict) {
  if (blocking.length) {
    console.error(
      `\n--strict: ${blocking.length} launch blocker(s). Resolve them before production.`,
    );
    process.exit(1);
  }
  console.log("--strict: launch-ready (no required facts unresolved).");
}
