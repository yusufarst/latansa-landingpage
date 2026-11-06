import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { headersFor, parseHeaders } from "../lib/headers.mjs";

const value = (rules, path, name, host = null) =>
  headersFor(rules, path, host)[name.toLowerCase()]?.[1];

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

  it("applies a host rule only on a matching host", () => {
    const rules = parseHeaders(
      ["https://:project.pages.dev/*", "  X-Robots-Tag: noindex"].join("\n"),
    );
    const robots = (host, path = "/") => value(rules, path, "x-robots-tag", host);
    assert.equal(robots("latansa.pages.dev"), "noindex"); // production alias
    assert.equal(robots("3f2a1b9c.latansa.pages.dev"), "noindex"); // preview deployment
    assert.equal(robots("LATANSA.Pages.Dev", "/images/a.avif"), "noindex");
    assert.equal(robots("latansajogja.co.id"), undefined); // the real domain
    assert.equal(robots("localhost"), undefined);
    assert.equal(robots(null), undefined); // no host: host rules never apply
  });

  it("parses the project's public/_headers with a self-only CSP on every page", () => {
    const text = readFileSync(
      fileURLToPath(new URL("../../public/_headers", import.meta.url)),
      "utf8",
    );
    const rules = parseHeaders(text);
    const csp = value(rules, "/", "content-security-policy", "latansajogja.co.id");
    assert.match(csp, /default-src 'self'/);
    assert.match(csp, /frame-ancestors 'none'/);
    assert.doesNotMatch(csp, /https?:/);
    assert.doesNotMatch(value(rules, "/", "permissions-policy"), /interest-cohort/);
    // Only the real domain is indexable; every *.pages.dev copy is noindex.
    assert.equal(value(rules, "/", "x-robots-tag", "latansajogja.co.id"), undefined);
    assert.equal(value(rules, "/", "x-robots-tag", "latansa.pages.dev"), "noindex");
    assert.equal(value(rules, "/", "x-robots-tag", "a1b2.latansa.pages.dev"), "noindex");
  });
});
