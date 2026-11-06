/**
 * Site-level configuration (not company facts — those live in src/content).
 */
export const site = {
  url: "https://latansajogja.co.id",
  locale: "id_ID",
  lang: "id",
  /**
   * Indexing gate. `true` since the launch PR (2026-11-06): the owner approved
   * the headline, `content:check --strict` passes and Phase 6 verified the
   * export. Pages are `index, follow` (the 404 stays noindex), and robots.txt
   * allows crawling and lists the sitemap. `verify:export` fails the build if
   * a launch blocker returns while this is `true`. Set it back to `false` to
   * take the site out of search engines' indexes before any risky change.
   */
  launchReady: true,
} as const;
