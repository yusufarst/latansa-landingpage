# Roadmap

Each phase starts only after the user approves it. Work happens on feature branches and lands
in `main` by Pull Request. Nothing is deployed and no DNS is changed without explicit approval.

| Phase | Scope                                                                                                                             | Effort | Status                         |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------ |
| 1     | Repository foundation, Next.js static export, docs, conventions, content baseline                                                 | Medium | Done (PR 1)                    |
| 2     | frontend-design plugin, Motion AI Kit, LATANSA skills, image pipeline research                                                    | Medium | Done (PR 1)                    |
| 3     | Premium art direction and motion specification; image-asset plan                                                                  | High   | In review: 2 directions (PR 2) |
| 4     | Frontend implementation, mobile-first; generate images if a suitable free tool exists                                             | MAX    | —                              |
| 5     | Browser visual testing and intensive refinement (mobile first)                                                                    | MAX    | —                              |
| 6     | SEO, accessibility, performance, `content:check --strict` (required launch info only), production verification, set `launchReady` | High   | —                              |

After Phase 6, deployment to Cloudflare Pages and the Hostinger DNS change are separate steps
that each need explicit approval. See [deployment-cloudflare-pages.md](deployment-cloudflare-pages.md)
and [domain-hostinger-dns.md](domain-hostinger-dns.md).

## Phase 3 deliverables (planned)

- `docs/art-direction.md`: final typography (display + text faces, scale, measure), grid and
  composition system per breakpoint, color usage, logo placement (including whether a
  monochrome treatment is approved), section-by-section layout for 360px first, then upward.
- `docs/motion-spec.md`: every animation with purpose, trigger, duration, easing, mobile vs
  desktop variant, and reduced-motion behavior.
- `docs/image-assets.md` updated with the concrete image list and prompts.

## Phase 4 constraints

- Install `motion` (MIT) only now. No Lenis unless technically justified in the motion spec.
- Components read company facts from `src/content/` and render only publishable facts.
