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

// Contact and channel links in the page follow the published facts.
const { company } = await import("../src/content/company.ts");
const { isPublishableFact } = await import("./lib/content-rules.mjs");
const published = (fact) => (fact && isPublishableFact(fact) ? fact.value : null);
const hrefs = [...index.matchAll(/href="([^"]+)"/g)].map((m) =>
  m[1].replaceAll("&amp;", "&"),
);
const count = (href) => hrefs.filter((h) => h === href).length;
const linkCheck = (href, name) =>
  href && check(count(href) > 0, `${name} links → ${href.slice(0, 60)} (${count(href)})`);
const whatsapp = published(company.contact.whatsapp);
linkCheck(whatsapp && `https://wa.me/${whatsapp}`, "WhatsApp");
linkCheck(published(company.mapsUrl), "Google Maps");
const siplah = company.procurementChannels.find((c) => c.id === "siplah-toko-ladang");
linkCheck(published(siplah?.url), "SIPLah");

const email = published(company.contact.email);
const mailtos = hrefs.filter((h) => h.startsWith("mailto:"));
const region = (start, end) => {
  const i = index.indexOf(start);
  return i < 0 ? "" : index.slice(i, index.indexOf(end, i));
};
if (email) {
  check(
    mailtos.length > 0 && mailtos.every((h) => h === `mailto:${email}`),
    `email links → mailto:${email} (${mailtos.length})`,
  );
  check(
    region('id="kontak"', "</section>").includes(`mailto:${email}`),
    "email shown in Kontak",
  );
  check(
    region("<footer", "</footer>").includes(`mailto:${email}`),
    "email shown in the footer",
  );
} else {
  check(mailtos.length === 0, "no mailto: links while the email is unpublished");
}

// No other address anywhere in the exported pages (never a forwarding inbox).
const address = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const pages = files.filter((f) => /\.(html|txt)$/.test(f.p));
const stray = new Set();
for (const f of pages) {
  for (const m of readFileSync(f.p, "utf8").matchAll(address)) {
    if (m[0].toLowerCase() !== email) stray.add(m[0]);
  }
}
check(
  stray.size === 0,
  `no email address but ${email ?? "the published one"} in ${pages.length} pages${stray.size ? `: ${[...stray].join(", ")}` : ""}`,
);

// ── SEO (Phase 6) ──────────────────────────────────────────────────────────
const { site } = await import("../src/config/site.ts");
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const meta = (html, attr, name) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? "");
const title = decode(index.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
check(
  title === company.seo.title && [...title].length <= 60,
  `title is the SEO title, ${[...title].length} ≤ 60 characters`,
);
const description = meta(index, "name", "description");
check(
  description === company.seo.description && [...description].length <= 160,
  `meta description, ${[...description].length} ≤ 160 characters`,
);
check(
  /<link rel="canonical" href="https:\/\/latansajogja\.co\.id\/?"/.test(index),
  "canonical is the domain root",
);
const ogImage = meta(index, "property", "og:image");
check(
  ogImage.startsWith(`${site.url}/`) &&
    existsSync(join(out, ogImage.slice(site.url.length))) &&
    meta(index, "property", "og:image:width") === "1200" &&
    meta(index, "property", "og:image:height") === "630" &&
    meta(index, "property", "og:image:alt") !== "",
  `og:image ${ogImage.slice(site.url.length)} exists, 1200×630, with alt text`,
);
check(
  meta(index, "name", "twitter:card") === "summary_large_image",
  "twitter:card is summary_large_image",
);
const robotsMeta = meta(index, "name", "robots");
check(
  site.launchReady ? robotsMeta === "index, follow" : robotsMeta === "noindex, nofollow",
  `robots meta "${robotsMeta}" matches launchReady=${site.launchReady}`,
);
const robotsTxt = readFileSync(join(out, "robots.txt"), "utf8");
check(
  site.launchReady
    ? /Allow: \//.test(robotsTxt) &&
        robotsTxt.includes(`Sitemap: ${site.url}/sitemap.xml`)
    : /Disallow: \//.test(robotsTxt) && !/Sitemap:/.test(robotsTxt),
  `robots.txt ${site.launchReady ? "allows crawling with the sitemap" : "blocks crawling until launch"}`,
);
if (site.launchReady) {
  // Indexing may only be on when the strict launch gate is clean (CI runs this script).
  const { collectCopy, collectFacts, evaluateLaunch, pendingCopy } =
    await import("./lib/content-rules.mjs");
  const { blocking } = evaluateLaunch(collectFacts(company));
  const pending = pendingCopy(collectCopy(company));
  check(
    blocking.length === 0 && pending.length === 0,
    `launchReady with no launch blockers (content:check --strict)${blocking.length + pending.length ? `: ${[...blocking, ...pending].map((x) => x.path).join(", ")}` : ""}`,
  );
}
const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
check(sitemap.includes(`<loc>${site.url}/</loc>`), "sitemap.xml lists the domain root");

// Structured data: valid JSON-LD built from publishable facts only.
const ldText = index.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];
let ld = null;
try {
  ld = ldText ? JSON.parse(ldText) : null;
} catch {
  ld = null;
}
const organization = ld?.["@graph"]?.find((n) => n["@type"] === "Organization");
const ldString = JSON.stringify(ld ?? {});
const forbiddenKeys = [
  "taxID",
  "vatID",
  "foundingDate",
  "aggregateRating",
  "review",
  "award",
  "telephone",
  ...(published(company.officeHours)
    ? []
    : ["openingHours", "openingHoursSpecification"]),
].filter((key) => ldString.includes(`"${key}"`));
check(
  organization?.name === company.legalName.value &&
    organization?.address?.postalCode === company.address.value.postalCode &&
    (organization?.email ?? null) === email &&
    forbiddenKeys.length === 0 &&
    !/npwp/i.test(ldString),
  `JSON-LD Organization from publishable facts${forbiddenKeys.length ? `; forbidden: ${forbiddenKeys.join(", ")}` : ""}`,
);

// The 404 page: its own title, never indexed, no canonical to the homepage.
const notFound = readFileSync(join(out, "404.html"), "utf8");
check(
  /<title>Halaman tidak ditemukan — /.test(notFound) &&
    /<meta name="robots" content="noindex/.test(notFound) &&
    !/rel="canonical"/.test(notFound),
  "404 page: own title, noindex, no canonical",
);

// ── Response headers (out/_headers, applied by Cloudflare Pages) ──────────
const { parseHeaders, headersFor } = await import("./lib/headers.mjs");
let headerRules = [];
try {
  headerRules = parseHeaders(readFileSync(join(out, "_headers"), "utf8"));
} catch (error) {
  check(false, `_headers parses (${error.message})`);
}
// Headers as served on the real domain (host rules for other hosts do not apply).
const siteHost = new URL(site.url).host;
const pageHeaders = Object.fromEntries(
  Object.entries(headersFor(headerRules, "/", siteHost)).map(([k, [, v]]) => [k, v]),
);
const csp = pageHeaders["content-security-policy"] ?? "";
const directives = Object.fromEntries(
  csp
    .split(";")
    .map((d) => d.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...values]) => [name, values]),
);
const sources = Object.values(directives).flat();
check(
  csp !== "" &&
    sources.every((s) => ["'self'", "'none'", "'unsafe-inline'", "data:"].includes(s)) &&
    directives["default-src"]?.join(" ") === "'self'" &&
    directives["object-src"]?.join(" ") === "'none'" &&
    directives["frame-ancestors"]?.join(" ") === "'none'",
  "Content-Security-Policy allows this origin only, no objects, no framing",
);
check(
  pageHeaders["x-content-type-options"] === "nosniff" &&
    pageHeaders["referrer-policy"] === "strict-origin-when-cross-origin" &&
    /max-age=\d+/.test(pageHeaders["strict-transport-security"] ?? ""),
  "nosniff, referrer policy and HSTS on every page",
);
check(
  !/interest-cohort/.test(pageHeaders["permissions-policy"] ?? "interest-cohort"),
  "Permissions-Policy present, without the retired interest-cohort feature",
);
check(
  /immutable/.test(
    headersFor(headerRules, "/_next/static/x.js", siteHost)["cache-control"]?.[1] ?? "",
  ) &&
    /max-age/.test(
      headersFor(headerRules, "/images/x.avif", siteHost)["cache-control"]?.[1] ?? "",
    ),
  "cache headers: immutable build assets, revalidated photos",
);

// Only the real domain may be indexed: every *.pages.dev copy (the production
// alias and previews) sends noindex, whatever the project is called.
const robotsTag = (host) => headersFor(headerRules, "/", host)["x-robots-tag"]?.[1] ?? "";
check(
  ["latansa-landingpage.pages.dev", "0a1b2c3d.latansa-landingpage.pages.dev"].every(
    (host) => /noindex/.test(robotsTag(host)),
  ) && !/noindex/.test(robotsTag(siteHost)),
  `X-Robots-Tag: noindex on *.pages.dev, none on ${siteHost}`,
);

if (failures.length) {
  console.error("\nStatic export verification FAILED:");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nStatic export verified: out/ is ready for Cloudflare Pages.");
