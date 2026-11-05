#!/usr/bin/env node
/**
 * content:check — reports company facts that are not yet publishable and
 * scans source files for content that must never ship.
 *
 *   npm run content:check            report; fails only on forbidden content
 *   npm run content:check -- --strict also fails while any fact is unresolved
 *                                     (Phase 6 production gate)
 *
 * Loads src/content/company.ts through Node's built-in TypeScript type
 * stripping (Node >= 24), so it needs no extra dependencies.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const strict = process.argv.includes("--strict");
const PUBLISHABLE = new Set(["client-confirmed", "client-provided"]);

const { company } = await import("../src/content/company.ts");

/** Walk the content tree and collect every Fact-shaped object. */
function collectFacts(node, path = "company", out = []) {
  if (node && typeof node === "object") {
    if ("status" in node && "source" in node && "value" in node) {
      out.push({ path, ...node });
      return out;
    }
    for (const [key, child] of Object.entries(node)) {
      const label = Array.isArray(node)
        ? `${path}[${child?.id ?? key}]`
        : `${path}.${key}`;
      collectFacts(child, label, out);
    }
  }
  return out;
}

const facts = collectFacts(company);
const open = facts.filter((f) => f.value === null || !PUBLISHABLE.has(f.status));

/** Patterns that must never appear in shipped source. */
const FORBIDDEN = [
  { re: /\bRp\.?\s?\d/i, why: "price in Rupiah" },
  { re: /\bIDR\s?\d/i, why: "price in IDR" },
  { re: /\b(harga|diskon|promo)\b/i, why: "pricing language" },
  { re: /\b(keranjang|checkout|add to cart|beli sekarang)\b/i, why: "cart / checkout" },
  { re: /\bstok\s*[:\d]/i, why: "stock quantity" },
  { re: /\b\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}\b/, why: "NPWP-like number (15 digit)" },
  { re: /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, why: "NPWP/NIK-like 16-digit number" },
];
const SCAN_DIRS = ["src"];
const SCAN_EXT = /\.(tsx?|mdx?|json|css)$/;
// The checker's own rule text and the policy comments are allowed to name these words.
const SCAN_SKIP = new Set([join("src", "content", "types.ts")]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (SCAN_EXT.test(name)) yield p;
  }
}

const violations = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(join(root, dir))) {
    const rel = relative(root, file);
    if (SCAN_SKIP.has(rel)) continue;
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((line, i) => {
        // Ignore maintainer comments that state the rules themselves.
        if (/^\s*(\*|\/\/|\/\*)/.test(line)) return;
        for (const { re, why } of FORBIDDEN) {
          if (re.test(line))
            violations.push(`${rel}:${i + 1}  ${why}  →  ${line.trim()}`);
        }
      });
  }
}

console.log(
  `Facts: ${facts.length} total, ${facts.length - open.length} publishable, ${open.length} open\n`,
);
if (open.length) {
  console.log("Open items (hidden from the site until resolved):");
  for (const f of open) {
    console.log(`  - ${f.path}  [${f.status}]${f.note ? `  ${f.note}` : ""}`);
  }
  console.log("");
}
if (violations.length) {
  console.error("Forbidden content found:");
  for (const v of violations) console.error(`  ✗ ${v}`);
  process.exit(1);
}
console.log("Forbidden-content scan: clean.");
if (strict && open.length) {
  console.error("\n--strict: unresolved facts remain. Resolve them before production.");
  process.exit(1);
}
