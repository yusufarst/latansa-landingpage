#!/usr/bin/env node
/**
 * verify:export — asserts that `npm run build` produced a deployable static
 * site in out/ for Cloudflare Pages (Free).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out", import.meta.url));
const MAX_FILE_BYTES = 25 * 1024 * 1024; // Cloudflare Pages per-file limit
const MAX_FILES = 20_000; // Cloudflare Pages Free file-count limit

const failures = [];
const check = (ok, msg) => (ok ? console.log(`  ✓ ${msg}`) : failures.push(msg));

if (!existsSync(out)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const required = [
  "index.html",
  "404.html",
  "_headers",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "icon.png",
  "apple-icon.png",
  "_next/static",
];
for (const rel of required) check(existsSync(join(out, rel)), `out/${rel} exists`);

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else files.push({ p, size: s.size });
  }
})(out);

check(files.length <= MAX_FILES, `${files.length} files (limit ${MAX_FILES})`);
const big = files.filter((f) => f.size > MAX_FILE_BYTES);
check(
  big.length === 0,
  `no file over 25 MiB${big.length ? `: ${big.map((f) => f.p).join(", ")}` : ""}`,
);

const serverArtifacts = ["server", "standalone", "middleware-manifest.json"];
for (const name of serverArtifacts) {
  check(!existsSync(join(out, name)), `no server artifact out/${name}`);
}

const index = readFileSync(join(out, "index.html"), "utf8");
check(/<html[^>]*lang="id"/.test(index), 'index.html has lang="id"');
check(
  !/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(index),
  "fonts are self-hosted (no Google Fonts requests)",
);
check(!/\/_next\/image\?/.test(index), "no runtime image optimizer URLs");

// Every responsive photo derivative listed in the manifest is exported.
const photos = JSON.parse(
  readFileSync(new URL("../src/config/image-assets.json", import.meta.url), "utf8"),
);
const expected = Object.entries(photos).flatMap(([name, photo]) =>
  photo.widths.flatMap((w) => [`images/${name}-${w}.avif`, `images/${name}-${w}.webp`]),
);
const missing = expected.filter((rel) => !existsSync(join(out, rel)));
check(
  missing.length === 0,
  `${expected.length} photo derivatives exported${missing.length ? `; missing: ${missing.join(", ")}` : ""}`,
);

if (failures.length) {
  console.error("\nStatic export verification FAILED:");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nStatic export verified: out/ is ready for Cloudflare Pages.");
