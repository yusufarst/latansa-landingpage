@AGENTS.md

# LATANSA JOGJAKARTA — corporate website

Single-page corporate website for **CV. Latansa Jogjakarta** at **latansajogja.co.id**.
Purpose: establish credibility with government and institutional procurement audiences.
Indonesian only. Design direction: **Modern Institutional Elegance**.

Read before working: [docs/project-brief.md](docs/project-brief.md),
[docs/roadmap.md](docs/roadmap.md), [docs/content-policy.md](docs/content-policy.md),
[docs/design-standards.md](docs/design-standards.md). Design direction: Phase 3 is under review. The current
proposal is the photographic Concept C in
[docs/design/phase-3-photographic-direction.md](docs/design/phase-3-photographic-direction.md).
Photorealistic imagery is mandatory. Do not implement UI until a direction is approved and its
binding spec is written.

## Hard rules

- **No prices, stock quantities, carts or checkout.** No pricing language anywhere.
- **No invented company claims.** Never add founding year, contracts, clients, testimonials,
  government partnerships, certifications, achievements, phone numbers or emails.
- **Never publish** the NPWP number, tax documents or sensitive legal records.
- PKP wording is fixed: **"Status Perpajakan: Pengusaha Kena Pajak (PKP)"**. Never imply PKP
  status alone means approved government supplier.
- Company facts live only in `src/content/` with provenance and a `launch` requirement.
  UI may read `"required"` facts directly; every other fact only via `publishedValue(fact)`,
  omitting the element when it returns `null` (no visible placeholders).
- Contact is via WhatsApp and email links only — no contact form, no backend.
- AI-generated imagery is illustrative only. Never present it as documentary evidence of
  real LATANSA operations, staff, premises, deliveries or clients.
- The official logo is never recolored, redrawn, distorted or re-composed. Originals in
  `assets/brand/` are read-only; derivatives come from `npm run brand:assets`.

## Static-only rules (Cloudflare Pages Free, zero recurring cost)

- `next.config.ts` keeps `output: "export"`; `npm run build` must produce `out/`.
- Do not use: per-request SSR, Server Actions, Route Handlers reading the request,
  `cookies()`/`headers()`, middleware/proxy, rewrites/redirects/headers in next.config, ISR,
  draft mode, or the default `next/image` optimizer. Response headers go in `public/_headers`.
- Metadata routes (`robots.ts`, `sitemap.ts`) must export `dynamic = "force-static"`.
- Fonts via `next/font` (self-hosted at build). Images pre-optimized; `images.unoptimized`.
- Only free, open-source frontend libraries. No paid APIs, SaaS or credit-card services.
- **Never deploy, create Cloudflare projects, or change DNS/nameservers without explicit
  user authorization in chat.** Never merge to `main` without approval.

## Mobile-first (mandatory)

Design, code and review in this order: **360 & 390 → 430 → 768 → 1024 → 1440 → 1920**.

- Unprefixed Tailwind utilities are the 360px design; add `xs:` (430) `md:` (768) `lg:`
  (1024) `2xl:` (1440) `3xl:` (1920) upward. Never start from desktop and shrink.
- Review real mobile screenshots before any desktop refinement.
- Touch targets ≥ 44×44px; body text ≥ 16px on mobile; no horizontal overflow; no layout
  shift (reserve image/video dimensions).
- Mobile motion is lighter than desktop; always honor `prefers-reduced-motion`.
- Final verification runs against the exported `out/` build, not only `next dev`.

## Workflow

- Feature branch → Pull Request into `main`. Production branch is `main`.
- Before pushing: `npm run check` (lint, typecheck, format, tests, content:check, build,
  verify:export).
- `npm run content:check` lists launch blockers and unresolved optional facts and fails on
  forbidden content or unguarded fact access. `--strict` (Phase 6 launch gate) fails only on
  unresolved **required** launch information; optional facts never block. See
  `docs/content-policy.md`.
- `src/config/site.ts` → `launchReady` stays `false` (noindex) until Phase 6 sign-off.

## Effort policy (the user selects the level manually)

| Work                                                              | Effort |
| ----------------------------------------------------------------- | ------ |
| Phases 1–2: setup, docs, skills                                   | Medium |
| Phase 3: art direction & motion spec                              | High   |
| Phases 4–5: frontend build, visual QA & refinement                | MAX    |
| Phase 6: SEO, accessibility, performance, production verification | High   |

## Project skills

Use these before the matching work:

- `frontend-design` (official plugin) — any visual/UI implementation.
- `motion` (Motion AI Kit) — any animation work with the `motion` library.
- `latansa-art-direction` — visual decisions, typography, color, composition, motion intent.
- `latansa-public-content` — any change to public copy or `src/content/`.
- `latansa-visual-qa` — browser verification, screenshots, responsive and motion checks.

## Map

```
assets/brand/        official logo originals (read-only)
public/brand/        generated logo derivatives
public/_headers      Cloudflare Pages headers
scripts/             brand-assets, content-check, verify-export
src/app/             routes (static), icons, globals.css (design tokens)
src/components/      UI components (no company facts hard-coded)
src/config/          site config, generated brand-assets.json
src/content/         typed company content with provenance
docs/                brief, roadmap, policies, deployment and DNS guides
```
