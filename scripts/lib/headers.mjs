/**
 * Cloudflare Pages `_headers` support for local tooling
 * (https://developers.cloudflare.com/pages/configuration/headers/).
 *
 * - A rule starts with a URL pattern at column 0; indented `Name: value`
 *   lines below it add headers, and `! Name` removes one set by an earlier rule.
 * - `*` (splat) matches anything; `:name` matches one path segment.
 * - An absolute pattern (`https://host/path`) also needs the request's host to
 *   match. A host placeholder may span labels: Cloudflare documents
 *   `https://:project.pages.dev/*` as covering *.pages.dev and *.*.pages.dev.
 *   A rule with a host never applies when no host is given.
 * - Every matching rule applies, in file order. A header set by two rules has
 *   its values joined with ", ", as Pages does.
 */

/** Parses `_headers` text into `[{ pattern, headers: [[name, value]], detach: [name] }]`. */
export function parseHeaders(text) {
  const rules = [];
  let rule = null;
  text.split(/\r?\n/).forEach((raw, index) => {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim() || line.trim().startsWith("#")) return;
    if (!/^\s/.test(line)) {
      rule = { pattern: line.trim(), headers: [], detach: [], line: index + 1 };
      rules.push(rule);
      return;
    }
    if (!rule)
      throw new Error(`_headers line ${index + 1}: header before any URL pattern`);
    const body = line.trim();
    if (body.startsWith("!")) {
      rule.detach.push(body.slice(1).trim().toLowerCase());
      return;
    }
    const colon = body.indexOf(":");
    if (colon < 1) throw new Error(`_headers line ${index + 1}: expected "Name: value"`);
    rule.headers.push([body.slice(0, colon).trim(), body.slice(colon + 1).trim()]);
  });
  return rules;
}

/** `https://host/path` → { host, path }; a bare path has no host. */
const splitPattern = (pattern) => {
  const absolute = pattern.match(/^https?:\/\/([^/]+)(\/.*)?$/);
  return absolute
    ? { host: absolute[1], path: absolute[2] ?? "/*" }
    : { host: null, path: pattern };
};

const toRegExp = (pattern, flags = "") => {
  const source = pattern
    .split(/(\*|:[A-Za-z]\w*)/)
    .map((part) => {
      if (part === "*") return ".*";
      if (/^:[A-Za-z]\w*$/.test(part)) return "[^/]+";
      return part.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("");
  return new RegExp(`^${source}$`, flags);
};

/**
 * The headers Pages would send for `pathname` on `host` (e.g.
 * "latansajogja.co.id"), as `{ lowercased-name: [displayName, value] }`.
 */
export function headersFor(rules, pathname, host = null) {
  const out = {};
  for (const rule of rules) {
    const pattern = splitPattern(rule.pattern);
    // Hosts compare case-insensitively; paths do not.
    if (pattern.host && !(host && toRegExp(pattern.host, "i").test(host))) continue;
    if (!toRegExp(pattern.path).test(pathname)) continue;
    for (const name of rule.detach) delete out[name];
    for (const [name, value] of rule.headers) {
      const key = name.toLowerCase();
      out[key] = out[key] ? [out[key][0], `${out[key][1]}, ${value}`] : [name, value];
    }
  }
  return out;
}
