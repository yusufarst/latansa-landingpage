#!/usr/bin/env node
/**
 * preview — serves out/ the way Cloudflare Pages will: `out/_headers` applied
 * (security, CSP and cache headers), `/` → index.html, unknown paths →
 * 404.html with HTTP 404, and text compressed with brotli or gzip as the edge
 * does, so Lighthouse measures production-like transfers. No dependencies.
 * For production verification and real phones on the same Wi-Fi (it prints
 * the Network URL).
 *
 *   npm run build && npm run preview       # port 4173 (PORT=… to change)
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { constants, createBrotliCompress, createGzip } from "node:zlib";
import { headersFor, parseHeaders } from "./lib/headers.mjs";

/** Text types the edge compresses; images and fonts are already compressed. */
const COMPRESSIBLE = new Set([
  ".html",
  ".txt",
  ".css",
  ".js",
  ".json",
  ".xml",
  ".svg",
  ".map",
]);

const out = fileURLToPath(new URL("../out", import.meta.url));
const port = Number(process.env.PORT) || 4173;

if (!existsSync(join(out, "index.html"))) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const headersFile = join(out, "_headers");
const rules = existsSync(headersFile)
  ? parseHeaders(readFileSync(headersFile, "utf8"))
  : [];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

/** The file Pages would serve for a URL path, or null. */
function resolve(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const base = join(out, clean);
  if (base !== out && !base.startsWith(out + sep)) return null; // path traversal
  const candidates = pathname.endsWith("/")
    ? [join(base, "index.html")]
    : [base, `${base}.html`, join(base, "index.html")];
  return candidates.find((p) => existsSync(p) && statSync(p).isFile()) ?? null;
}

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  const { pathname } = new URL(req.url, "http://localhost");
  let file = null;
  try {
    file = resolve(pathname);
  } catch {
    file = null; // malformed URL encoding
  }
  const status = file ? 200 : 404;
  file ??= join(out, "404.html");
  const headers = { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" };
  for (const [name, value] of Object.values(headersFor(rules, pathname)))
    headers[name] = value;
  const accepts = String(req.headers["accept-encoding"] ?? "");
  const encoding = !COMPRESSIBLE.has(extname(file))
    ? null
    : /\bbr\b/.test(accepts)
      ? "br"
      : /\bgzip\b/.test(accepts)
        ? "gzip"
        : null;
  if (encoding) {
    headers["Content-Encoding"] = encoding;
    headers["Vary"] = "Accept-Encoding";
  } else {
    headers["Content-Length"] = statSync(file).size;
  }
  res.writeHead(status, headers);
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  const body = createReadStream(file);
  if (encoding === "br") {
    body
      .pipe(createBrotliCompress({ params: { [constants.BROTLI_PARAM_QUALITY]: 6 } }))
      .pipe(res);
  } else if (encoding === "gzip") {
    body.pipe(createGzip({ level: 6 })).pipe(res);
  } else {
    body.pipe(res);
  }
});

server.listen(port, "0.0.0.0", () => {
  const lan = Object.values(networkInterfaces())
    .flat()
    .find((a) => a && a.family === "IPv4" && !a.internal);
  console.log(`Serving out/ with ${rules.length} _headers rules`);
  console.log(`  Local:   http://localhost:${port}`);
  if (lan) console.log(`  Network: http://${lan.address}:${port}`);
});
