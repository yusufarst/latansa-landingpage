# Phase 6 QA record

SEO, accessibility, performance and production verification of the static export, 2026-11-06.
Everything was measured on `out/` served by `npm run preview`. It now serves the way Cloudflare
Pages will: `_headers` applied, brotli/gzip compression, and `404.html` with HTTP 404.

**Launch gate:**

- **Headline:** the owner approved it as the official headline on 2026-11-06.
- **Strict gate:** `content:check --strict` passes. Only optional facts remain open: office hours
  and Mbizmarket.
- **`launchReady`:** stays `false` (noindex) in this PR and flips in its own launch PR, as the
  [deployment guide](../../deployment-cloudflare-pages.md) requires.
- **Guard:** once `launchReady` is `true`, `verify:export` fails the build if any launch blocker
  returns, so indexing can never be on with unconfirmed content.

## SEO

| Item                    | Result                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title, description      | 56 and 159 characters (limits 60 and 160), Indonesian, from `company.seo`                                                                                |
| Canonical               | The domain root                                                                                                                                          |
| Share image             | `public/og/latansa-og.jpg`, 1200×630, 76 KB, with alt text: the official logo, unchanged, on a white plate over the hero photograph (`npm run og:image`) |
| Open Graph, X/Twitter   | `og:image` with size and alt, `summary_large_image`, `id_ID` locale                                                                                      |
| Structured data         | JSON-LD `Organization` + `WebSite` from publishable facts only (see below)                                                                               |
| 404 page                | "Halaman tidak ditemukan — CV. Latansa Jogjakarta", `noindex`, no canonical                                                                              |
| robots.txt, robots meta | Block crawling while `launchReady` is false; `verify:export` checks both match the flag                                                                  |
| Sitemap                 | The domain root; listed in robots.txt once launched                                                                                                      |
| Lighthouse SEO          | 69 now, failing only "Page is blocked from indexing", which is intended before launch                                                                    |

**The JSON-LD includes:** legal and short name, logo (the vertical lock-up), the summary, the
postal address, the email, the SIPLah store as `sameAs`, and the confirmed Maps pin as `location`.

**It never includes:** NPWP or any tax ID, a founding year, ratings, reviews, opening hours (until
confirmed) or `telephone`. The site offers the WhatsApp number for chat, and the owner has not
said it takes calls. `verify:export` fails the build if any of these appear.

## Response headers (`public/_headers`)

- **Content-Security-Policy:**
  - this origin only, with no third-party source anywhere;
  - `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'none'`, `base-uri 'self'`.
  - `script-src` and `style-src` keep `'unsafe-inline'`. Next.js inlines its RSC payload, and a
    static export has no per-request nonce; this is the Next.js guide's static recommendation.
    Inline CSS variables also need it.
- **Other headers:**
  - `Strict-Transport-Security` (1 year), `nosniff`, `X-Frame-Options: DENY`,
    `Referrer-Policy`, `Cross-Origin-Opener-Policy`;
  - `Permissions-Policy` without the retired `interest-cohort`, which Chrome logs as an error.
- **Cache:** build assets immutable for a year. Photos, brand derivatives and the share image
  revalidate daily.
- **Verified with the real headers (Chromium):**
  - no CSP violation and no browser log entry while loading and using the page at 390 and 1440,
    or on the 404 page;
  - the menu, carousel and reveals all work.
- **Guarded by checks:**
  - `verify:export` parses `_headers` and fails if the CSP gains another origin. A deliberate
    test with `https://cdn.example.com` failed the build as expected.
  - Unit tests cover the `_headers` parser.

## Performance

Lighthouse 13.6 on the preview with compression, the same tool the spec names.

| Budget (art-direction §10)               | Result                                                                                                                          | Status                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| LCP ≤ 2.5s, mobile, Lighthouse simulated | **3.42s** median of 5 (3.33–3.49). Applied throttling (real Slow 4G and 4× CPU): **2.20s and 2.34s**                            | Not met when simulated; met under applied throttling |
| CLS < 0.05                               | 0 on every run, phone and desktop                                                                                               | Met                                                  |
| INP < 200ms                              | Lab, 4× CPU, real taps: median **184ms** for the first menu open (128–312), every other interaction ≤ 136ms                     | Met at the median                                    |
| JS beyond the Next.js runtime ≤ 15 KB gz | **7.8 KB** (menu, carousel, reveals, spy); React DOM 71.5 KB and the Next.js runtime 45 KB are the runtime                      | Met                                                  |
| Fonts: one ~27 KB file, preloaded        | One 27 KB WOFF2, preloaded                                                                                                      | Met                                                  |
| First-view transfer ≤ 500 KB (mobile)    | **276 KB** for the first screen. Chrome also prefetches six lazy photos below the fold (290 KB), so the whole load moves 567 KB | Met                                                  |
| Desktop                                  | LCP 0.76s, performance 100                                                                                                      | —                                                    |

**What changed:**

- **Phone hero:** the LCP image is encoded at AVIF q50 4:2:0, 96 → 62 KB. A 1:1 comparison
  showed no visible difference, because the photo is near-monochrome and mostly under the navy
  grade.
- **Logo:** the header and footer logo is a responsive `<picture>`, 480/960/1440, WebP. It was a
  960px PNG (44 KB) shown at 140px; now 20 KB.
- **Menu (INP):** making the page `inert` and locking scroll restyled the whole page before the
  tap's next frame. Both now run just after the sheet paints. The worst interaction went from
  168–272ms to a median of 184ms.

**Why simulated LCP stays above 2.5s:** Lighthouse's simulation averages two graphs.

- The optimistic graph (the document, CSS, font and hero) gives about 1.9s.
- The pessimistic graph adds everything that started before the observed LCP: the Next.js runtime
  (135 KB) and the lazy photos.

On localhost the first frame comes about 200ms late even for a one-image test page (1.2s
simulated). So the runtime and lazy photos always land in that graph. With the scripts blocked,
LCP is 2.64s; the runtime alone costs about 0.8s.

Production should be better: Cloudflare serves HTTP/2 or HTTP/3 with request priorities, which
put the high-priority hero ahead of the low-priority scripts. The local HTTP/1.1 server cannot do
that. **Re-measure on the deployed preview** (`*.pages.dev`) with PageSpeed Insights, which runs
the same simulated Lighthouse, before the domain goes live.

## Accessibility

- **axe-core 4.14** (WCAG 2.0–2.2 A/AA, best practice): 0 violations at 390 (menu closed and
  open), 1440 and on the 404 page.
- **Lighthouse accessibility:** 100 on phone and desktop. Best practices: 100.
- **Keyboard:** 29 stops at 390 and 31 at 1440, each with a visible ring and in reading order.
- **Contrast:** every text element meets AA (lowest 5.84:1), and the hero headline is ≥ 6.8:1 on
  the photograph.
- **Fixed, Safari menu focus:** WebKit does not focus links unless "Press Tab to highlight each
  item" is on. Opening the menu left focus behind the dialog: on the button, or on the page after
  a tap.
  - Now the dialog itself takes focus when the first link cannot (`tabIndex={-1}`).
  - Focus returns to the dialog if it ever falls to the page while the menu is open.
  - With reduced motion, a closed sheet no longer stays visible and focusable for 550ms.
  - Checked in WebKit and Chromium: tap and Enter open, Esc close (focus back on the button),
    rapid reopen at 300, 500 and 1200ms, and a menu link landing its section at 72px.

## Production verification

- **Chromium, 320–1920** (11 sizes, including 375×547 and 360×560 with browser toolbars):
  - no horizontal overflow and zero layout shift;
  - no broken images or pending reveals;
  - no console or browser log errors during load and use. The driver now also captures messages
    logged while the page loads.
- **Larger default text** (20px and 24px, 320–1440): no overflow.
- **WebKit 27.2** (Safari's engine, via Playwright), iPhone 13 and 1440:
  - no errors, no CSP violations, no overflow, no wrapped text links;
  - menu, carousel, JSON-LD and the light-only color scheme all work.
  - This Windows WebKit build serves WebP where real Safari 16+ would pick AVIF.
- **Links:** 37 links, none dead. `verify:export` also checks WhatsApp, Maps, SIPLah and the email
  against the published facts, and that no other email address appears.
- **Photo licenses:** all seven Unsplash pages the site uses were re-verified on 2026-11-06:
  "Free Photo on Unsplash", Unsplash License, none Unsplash+
  ([SOURCES.md](../../design/concepts/photos/SOURCES.md)).
- **Quality gate:** `npm run check` passes: lint, typecheck, format, 43 tests, `content:check`,
  build and `verify:export` (SEO, headers and contact checks).

## Launch PR: indexing on (`launchReady: true`)

The launch PR changes only `src/config/site.ts`, its notes and this record. It is meant to be
merged after PR 5. Verified on its build:

- **robots.txt:** `Allow: /` with `Sitemap: https://latansajogja.co.id/sitemap.xml`; the sitemap
  lists the domain root.
- **Robots meta:** the homepage is `index, follow`; the 404 page stays `noindex`.
- **Lighthouse SEO:** 100 on phone and desktop. All ten SEO audits pass, including
  `is-crawlable`, `robots-txt` and `canonical`. Accessibility and best practices stay 100.
- **`npm run check`** passes (44 tests), and `content:check --strict` passes.
- **Guard:** with the headline set back to pending, `verify:export` failed and named
  `company.positioning.headline`. Restored, it passes.
- **Out of scope:**
  - nothing is deployed, and DNS and Cloudflare Email Routing are unchanged;
  - Search Console verification is not set up; it needs either a DNS record or a file from the
    owner's account, so it is a later, separate step.

## Not verified

- **Lighthouse on Cloudflare:** the deployed preview is not deployed. That is a separate step
  needing explicit approval, and LCP should be re-measured there.
- **Firefox:** Playwright's local Firefox build does not match its client.
- **Real iOS and Android devices, and screen readers** (VoiceOver, TalkBack): structure and
  focus were checked with axe, the accessibility tree and WebKit.
- **Field data** (Core Web Vitals from real users): it exists only after launch.

## Screenshots

- **WebKit, iPhone 13:** [first screen](webkit-iphone-first.webp) · [menu](webkit-iphone-menu.webp)
- **WebKit, 1440:** [first screen](webkit-desktop-first.webp)
- **Share image:** [public/og/latansa-og.jpg](../../../public/og/latansa-og.jpg)
