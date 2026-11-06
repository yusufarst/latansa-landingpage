# Deploying to Cloudflare Pages (Free)

> **Not done yet.** Nothing in this guide is executed without explicit approval from the
> project owner. This is a runbook for the deployment step after Phase 6.

The site is a pure static export (`out/`). Cloudflare Pages builds it from GitHub on every push
to `main` and creates preview deployments for other branches/PRs. No server, functions,
database or paid add-on is needed.

## Free plan limits that matter

| Limit                                  | Free plan                                | This site                                 |
| -------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| Builds                                 | 500 / month (account-wide), 1 concurrent | A few per week                            |
| Build timeout                          | 20 minutes                               | < 2 minutes                               |
| Files per deployment                   | 20,000                                   | ~130 (checked by `npm run verify:export`) |
| Max file size                          | 25 MiB                                   | Largest file 388 KB (a photo)             |
| Bandwidth / requests for static assets | Unmetered                                | —                                         |

Re-check the current limits on [Cloudflare's limits page](https://developers.cloudflare.com/pages/platform/limits/)
before deploying. No credit card is required for Pages Free.

## One-time setup (owner, in the Cloudflare dashboard)

1. Create a free Cloudflare account (or use the existing one).
2. **Workers & Pages → Create → Pages → Connect to Git.**
3. Authorize the **Cloudflare Pages GitHub app** for `yusufarst/latansa-landingpage` only
   (private repo access is supported on the free plan).
4. Build settings:

   | Setting                | Value                                    |
   | ---------------------- | ---------------------------------------- |
   | Production branch      | `main`                                   |
   | Framework preset       | None (or "Next.js (Static HTML Export)") |
   | Build command          | `npm run build`                          |
   | Build output directory | `out`                                    |
   | Root directory         | _(empty)_                                |
   | Environment variable   | `NODE_VERSION` = `24`                    |

   `NODE_VERSION` is set explicitly so the build does not depend on the default image Node
   version (`.nvmrc` also says 24).

5. **Preview deployments:** keep enabled for non-production branches. Previews get a
   `*.pages.dev` URL. Every `*.pages.dev` URL, the production alias included, sends
   `X-Robots-Tag: noindex` (`public/_headers`). Only the custom domain is indexed, even with
   `launchReady: true`.
6. Save and deploy. Confirm the `*.pages.dev` URL works before attaching the domain.

Do **not** enable paid add-ons (Web Analytics is free and optional; Images, Workers Paid,
Load Balancing etc. are not needed).

## What Cloudflare serves

- `out/index.html` at `/`, `out/404.html` for unknown paths (HTTP 404).
- `out/_headers` applies security and cache headers (see `public/_headers`). The
  Content-Security-Policy allows this origin only, plus the Cloudflare Web Analytics beacon that
  Pages injects (`static.cloudflareinsights.com/beacon.min.js/…`, by path, in `script-src`). Its
  reports go to `/cdn-cgi/rum` on this origin, which `connect-src 'self'` covers. Adding another
  third-party script, font or embed means extending the CSP in the same PR; `verify:export`
  fails on any other origin.
- `www` → apex redirect: configure as a free **Redirect Rule** in the zone (see the DNS guide),
  not in `next.config.ts` (static export cannot redirect).

`npm run preview` serves `out/` the same way: `_headers` applied, brotli/gzip, 404 status. Check
headers and CSP locally before any deploy.

Host-specific rules apply only on their host. To see the `*.pages.dev` noindex locally, run
`curl -sI -H "Host: latansa.pages.dev" http://localhost:4173/`. `verify:export` fails if the
rule disappears or if the real domain ever gets `noindex`.

## Before the first production deploy (Phase 6 gate)

```bash
npm run check
npm run content:check -- --strict   # fails only on required launch information
```

Then set `launchReady: true` in `src/config/site.ts` (enables indexing and the sitemap entry in
robots.txt) in its own reviewed PR.

After the first deploy to the `*.pages.dev` preview, run PageSpeed Insights (mobile) on it and
record LCP against the 2.5s budget. Phase 6 measured 2.2–2.3s under applied throttling, but
3.4s with Lighthouse's localhost simulation, which cannot model Cloudflare's HTTP/2 and HTTP/3
prioritization ([qa/phase-6](qa/phase-6/README.md)).

## Rollback

Cloudflare dashboard → the Pages project → **Deployments** → pick a previous production
deployment → **Rollback to this deployment**. Or revert the commit on `main` and let it rebuild.

## Alternative

Cloudflare now also offers static sites on **Workers (static assets)**. Pages remains supported
and is the chosen target; the same `out/` folder would deploy to either without code changes.
