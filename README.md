# latansa-landingpage

Corporate website for **CV. Latansa Jogjakarta** — [latansajogja.co.id](https://latansajogja.co.id).

Next.js (App Router) · TypeScript · Tailwind CSS v4 · static export → Cloudflare Pages (Free).

> Status: **Phase 2 — foundation and skills.** The landing page itself is built in Phase 4.
> Not deployed. See [docs/roadmap.md](docs/roadmap.md).

## Requirements

- Node.js 24 (see `.nvmrc`) and npm

## Commands

| Command                                   | What it does                                                                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm ci`                                  | Install exact dependencies                                                                     |
| `npm run dev`                             | Local dev server at http://localhost:3000                                                      |
| `npm run build`                           | Static production build into `out/`                                                            |
| `npm run verify:export`                   | Assert `out/` is a valid static site for Cloudflare Pages                                      |
| `npm run preview`                         | Serve `out/` at http://localhost:4173 (like production)                                        |
| `npm run lint` / `npm run typecheck`      | ESLint / TypeScript                                                                            |
| `npm run format` / `npm run format:check` | Prettier (with Tailwind class sorting)                                                         |
| `npm run content:check`                   | Content safety scan; list launch blockers and optional open facts (`-- --strict`: launch gate) |
| `npm test`                                | Unit and CLI tests for the content rules (Node test runner)                                    |
| `npm run brand:assets`                    | Regenerate logo derivatives and icons from `assets/brand/`                                     |
| `npm run check`                           | Everything CI runs: lint, typecheck, format, tests, content check, build, verify               |

## Structure

```
assets/brand/      official logo originals (never edited)
public/            static files copied into out/ (brand derivatives, _headers)
scripts/           build-time tooling (Node, no extra services)
src/app/           routes, icons, global styles and design tokens
src/components/    UI components
src/config/        site configuration
src/content/       company content with provenance (single source of truth)
docs/              project documentation
.claude/skills/    project-specific Claude Code skills
```

## Documentation

- [Project brief](docs/project-brief.md)
- [Roadmap and phases](docs/roadmap.md)
- [Content policy](docs/content-policy.md)
- [Design standards (palette, typography, mobile-first)](docs/design-standards.md)
- [Brand assets](docs/brand-assets.md)
- [Image assets (AI pipeline)](docs/image-assets.md)
- [Deploying to Cloudflare Pages](docs/deployment-cloudflare-pages.md)
- [Connecting the Hostinger domain](docs/domain-hostinger-dns.md)
- [Claude Code tooling](docs/claude-code-tooling.md)

## Rules in brief

No prices, stock, carts or checkout. No invented company claims. No NPWP or tax documents.
Static export only, zero recurring hosting cost. Mobile-first. Full rules in [CLAUDE.md](CLAUDE.md).
