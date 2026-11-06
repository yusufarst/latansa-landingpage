import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { headersFor, parseHeaders } from "../lib/headers.mjs";

const value = (rules, path, name) => headersFor(rules, path)[name.toLowerCase()]?.[1];

describe("_headers parsing (Cloudflare Pages rules)", () => {
  it("applies every matching rule, splats and placeholders included", () => {
    const rules = parseHeaders(
      [
        "# comment",
        "/*",
        "  X-Frame-Options: DENY",
        "/_next/static/*",
        "  Cache-Control: public, max-age=31536000, immutable",
        "/docs/:page",
        "  X-Robots-Tag: noindex",
      ].join("\n"),
    );
    assert.equal(value(rules, "/", "x-frame-options"), "DENY");
    assert.equal(
      value(rules, "/_next/static/chunks/a.js", "cache-control"),
      "public, max-age=31536000, immutable",
    );
    assert.equal(value(rules, "/images/a.avif", "cache-control"), undefined);
    assert.equal(value(rules, "/docs/intro", "x-robots-tag"), "noindex");
    assert.equal(value(rules, "/docs/intro/deeper", "x-robots-tag"), undefined);
  });

  it("joins a header set twice and detaches with '!'", () => {
    const rules = parseHeaders(
      ["/*", "  Link: </a.css>", "/x", "  Link: </b.css>", "/y", "  ! Link"].join("\n"),
    );
    assert.equal(value(rules, "/x", "link"), "</a.css>, </b.css>");
    assert.equal(value(rules, "/y", "link"), undefined);
  });

  it("rejects a header line before any URL pattern", () => {
    assert.throws(() => parseHeaders("  X-Test: 1"), /before any URL pattern/);
  });

  it("parses the project's public/_headers with a self-only CSP on every page", () => {
    const text = readFileSync(
      fileURLToPath(new URL("../../public/_headers", import.meta.url)),
      "utf8",
    );
    const rules = parseHeaders(text);
    const csp = value(rules, "/", "content-security-policy");
    assert.match(csp, /default-src 'self'/);
    assert.match(csp, /frame-ancestors 'none'/);
    assert.doesNotMatch(csp, /https?:/);
    assert.doesNotMatch(value(rules, "/", "permissions-policy"), /interest-cohort/);
  });
});
