# Roadmap

Each phase starts only after the user approves it. Work happens on feature branches and lands
in `main` by Pull Request. Nothing is deployed and no DNS is changed without explicit approval.

| Phase | Scope                                                                                                                             | Effort | Status      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------- |
| 1     | Repository foundation, Next.js static export, docs, conventions, content baseline                                                 | Medium | Done (PR 1) |
| 2     | frontend-design plugin, Motion AI Kit, LATANSA skills, image pipeline research                                                    | Medium | Done (PR 1) |
| 3     | Premium art direction and motion specification; image-asset plan                                                                  | High   | Done (PR 2) |
| 4     | Frontend implementation, mobile-first; generate images if a suitable free tool exists                                             | MAX    | Done (PR 3) |
| 5     | Browser visual testing and intensive refinement (mobile first)                                                                    | MAX    | Done (PR 4) |
| 6     | SEO, accessibility, performance, `content:check --strict` (required launch info only), production verification, set `launchReady` | High   | —           |

After Phase 6, deployment to Cloudflare Pages and the Hostinger DNS change are separate steps
that each need explicit approval. See [deployment-cloudflare-pages.md](deployment-cloudflare-pages.md)
and [domain-hostinger-dns.md](domain-hostinger-dns.md).

## Phase 3 deliverables (approved direction: Concept C · Presisi Terang)

- [art-direction.md](art-direction.md): typography, color and contrast, grid, section-by-section
  layout from 360px up, imagery slots, the annotation system, deltas from the board, acceptance
  criteria, open owner items and Phase 4 build notes.
- [motion-spec.md](motion-spec.md): every motion with trigger, timing, easing, mobile variant,
  reduced-motion behavior and implementation.
- [image-assets.md](image-assets.md): sourcing decision, selection rules, exact grade,
  derivatives and on-page rules.
- The approved board and its screenshots are in [design/concepts/](design/concepts/). Photo
  provenance is in [design/concepts/photos/SOURCES.md](design/concepts/photos/SOURCES.md).

## Phase 5 results

- [qa/phase-5/README.md](qa/phase-5/README.md): the QA method, every defect found with its fix,
  the per-viewport results and what was not verified, with screenshots.
- Spec updates: the Phase 5 blocks in [art-direction.md](art-direction.md) (D36–D41, §9, §11)
  and [motion-spec.md](motion-spec.md); robustness rules in
  [design-standards.md](design-standards.md) and the `latansa-visual-qa` skill.

## Phase 4 constraints

- The motion spec needs no motion library. Install `motion` (MIT) only if its documented menu
  fallback is needed, and record why. No Lenis.
- Components read company facts from `src/content/` and render only publishable facts.
- Follow the binding spec. Any further departure from the approved board needs the owner's
  approval.
