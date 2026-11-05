/**
 * Site-level configuration (not company facts — those live in src/content).
 */
export const site = {
  url: "https://latansajogja.co.id",
  locale: "id_ID",
  lang: "id",
  /**
   * Indexing gate. Stays `false` until Phase 6 sign-off (content:check clean,
   * production verification done). While false, every page is `noindex` and
   * robots.txt disallows crawling, so an accidental early deploy is not indexed.
   */
  launchReady: false,
} as const;
