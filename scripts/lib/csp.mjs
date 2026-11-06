/**
 * Content-Security-Policy helpers for `public/_headers` checks.
 *
 * The site allows exactly one third-party source: the Cloudflare Web Analytics beacon that
 * Cloudflare Pages injects into every page. It is allowed by path, never by host:
 * - `…/beacon.min.js` matches the manual snippet's exact URL;
 * - `…/beacon.min.js/` (trailing slash) matches the injected, versioned URL
 *   `…/beacon.min.js/v<version>`.
 * The beacon reports to `/cdn-cgi/rum` on the site's own origin, so `connect-src 'self'` covers
 * it and no reporting origin is allowed.
 */
export const ANALYTICS_BEACON_SOURCES = [
  "https://static.cloudflareinsights.com/beacon.min.js",
  "https://static.cloudflareinsights.com/beacon.min.js/",
];

/** Keyword and scheme sources allowed in any directive. */
export const FIRST_PARTY_SOURCES = ["'self'", "'none'", "'unsafe-inline'", "data:"];

/** `"a b; c d"` → `{ a: ["b"], c: ["d"] }` (directive names lowercased). */
export function parseCsp(csp) {
  return Object.fromEntries(
    csp
      .split(";")
      .map((d) => d.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...values]) => [name.toLowerCase(), values]),
  );
}

/**
 * Whether a host source with a path (`https://host/path`) allows `url`, following CSP's path
 * rule: a path ending in "/" matches as a prefix, any other path must match exactly. Only
 * exact https hosts are supported, which is all this site uses (no wildcards).
 */
export function sourceAllows(source, url) {
  const s = new URL(source);
  const u = new URL(url);
  if (s.protocol !== "https:" || u.protocol !== "https:" || s.host !== u.host)
    return false;
  return s.pathname.endsWith("/")
    ? u.pathname.startsWith(s.pathname)
    : u.pathname === s.pathname;
}
