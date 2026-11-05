# Deploying to Cloudflare Pages (Free)

> **Not done yet.** Nothing in this guide is executed without explicit approval from the
> project owner. This is a runbook for the deployment step after Phase 6.

The site is a pure static export (`out/`). Cloudflare Pages builds it from GitHub on every push
to `main` and creates preview deployments for other branches/PRs. No server, functions,
database or paid add-on is needed.

## Free plan limits that matter

| Limit                                  | Free plan                                | This site                                |
| -------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Builds                                 | 500 / month (account-wide), 1 concurrent | A few per week                           |
| Build timeout                          | 20 minutes                               | < 2 minutes                              |
| Files per deployment                   | 20,000                                   | ~60 (checked by `npm run verify:export`) |
| Max file size                          | 25 MiB                                   | Largest asset < 100 KB                   |
| Bandwidth / requests for static assets | Unmetered                                | —                                        |

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
   `*.pages.dev` URL; they are noindex as long as `launchReady` is `false`.
6. Save and deploy. Confirm the `*.pages.dev` URL works before attaching the domain.

Do **not** enable paid add-ons (Web Analytics is free and optional; Images, Workers Paid,
Load Balancing etc. are not needed).

## What Cloudflare serves

- `out/index.html` at `/`, `out/404.html` for unknown paths (HTTP 404).
- `out/_headers` applies security and cache headers (see `public/_headers`).
- `www` → apex redirect: configure as a free **Redirect Rule** in the zone (see the DNS guide),
  not in `next.config.ts` (static export cannot redirect).

## Before the first production deploy (Phase 6 gate)

```bash
npm run check
npm run content:check -- --strict   # fails only on required launch information
```

Then set `launchReady: true` in `src/config/site.ts` (enables indexing and the sitemap entry in
robots.txt) in its own reviewed PR.

## Rollback

Cloudflare dashboard → the Pages project → **Deployments** → pick a previous production
deployment → **Rollback to this deployment**. Or revert the commit on `main` and let it rebuild.

## Alternative

Cloudflare now also offers static sites on **Workers (static assets)**. Pages remains supported
and is the chosen target; the same `out/` folder would deploy to either without code changes.
