# Motion specification — Phase 3 (binding spec for Phase 4)

Status: **proposed, awaiting approval.** Companion to [art-direction.md](art-direction.md).

## 1. Principles

1. **One orchestrated moment.** The kop draws itself once, on page load. Nothing else on the page
   animates by itself.
2. **Motion answers people.** Opening the menu, hovering a link and pressing a button get short,
   precise feedback that shows what changed.
3. **No reveal-on-scroll choreography.** Sections do not fade or slide in. Content is simply there,
   as in a printed document. (Fade-up on every section is the most common generated-site tell, and
   it slows reading.)
4. **Calm, never springy.** No overshoot and no bounce. Institutional audiences read bounce as
   frivolous.
5. **Cheap to run.** Only `transform`, `opacity` and `clip-path`. No scroll listeners, no scroll
   hijacking, no parallax, no 3D, no smooth-scroll library (Lenis is not justified).

## 2. Tokens

| Token                  | Value                            | Use                                  |
| ---------------------- | -------------------------------- | ------------------------------------ |
| `--ease-institutional` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, draws, reveals (ease-out) |
| `--ease-standard`      | `cubic-bezier(0.65, 0, 0.35, 1)` | State toggles that reverse (menu)    |
| `--duration-press`     | 80ms                             | Button press                         |
| `--duration-quick`     | 160ms                            | Color and background changes         |
| `--duration-base`      | 280ms                            | Header, underline, small moves       |
| `--duration-sheet`     | 320ms                            | Menu sheet open (close: 200ms)       |
| `--duration-slow`      | 720ms                            | Kop rule draw, headline rise         |

## 3. Catalog

| ID      | Element                                            | Trigger                                                                          | Animation                                                                                                                                              | Timing                                   | Mobile (< 768)                                  | Reduced motion                      |
| ------- | -------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| **M1**  | Kop rule (thick, then thin)                        | Page load, once                                                                  | `transform: scaleX(0 → 1)`, origin left                                                                                                                | 720ms, institutional; thin line +120ms   | 560ms                                           | Drawn, no animation                 |
| **M2**  | Logo + address                                     | Page load                                                                        | `opacity 0 → 1` (no movement)                                                                                                                          | 400ms, +120ms                            | same                                            | Visible                             |
| **M3**  | Hero h1                                            | Page load                                                                        | `clip-path: inset(0 0 100% 0) → inset(0)` and `translateY(24px → 0)` as one block                                                                      | 720ms, institutional, +200ms             | translate 16px, 600ms                           | Visible, no clip                    |
| **M4**  | Hero summary, then actions                         | Page load                                                                        | `opacity 0 → 1`                                                                                                                                        | 400ms at +440ms; actions 320ms at +520ms | same                                            | Visible                             |
| **M5**  | Hero image H1 (if present)                         | Page load                                                                        | `clip-path: inset(6% 0 0 0) → inset(0)` and `scale(1.03 → 1)`                                                                                          | 900ms, institutional, +400ms             | no scale; it is below the fold, so no animation | Visible                             |
| **M6**  | Compact header                                     | Kop rule leaves / re-enters the viewport (IntersectionObserver)                  | `translateY(-100% → 0)`                                                                                                                                | 280ms, institutional                     | same                                            | Appears instantly                   |
| **M7**  | Sector image panel (desktop, only if images exist) | Row crosses the reading line (IntersectionObserver, `rootMargin: -45% 0 -45% 0`) | Crossfade, `opacity` of stacked images                                                                                                                 | 320ms, standard                          | not used                                        | Instant swap                        |
| **M8**  | Mobile menu sheet                                  | Menu / Tutup / Esc / link                                                        | Open: `clip-path: inset(0 0 100% 0) → inset(0)`; links `opacity` and `translateY(8px → 0)`, 30ms stagger from +80ms. Close: reverse, 200ms, no stagger | 320ms open / 200ms close, standard       | (mobile only)                                   | Opacity 120ms, no clip or translate |
| **M9**  | Menu icon                                          | Same as M8                                                                       | The two bars rotate ±45° into a cross                                                                                                                  | 200ms, standard                          | —                                               | Instant                             |
| **M10** | Text link underline                                | Hover (pointer: fine), focus-visible                                             | `background-size: 0% → 100%` 1px underline from the left                                                                                               | 220ms, institutional                     | Underline always visible (touch)                | Underline always visible            |
| **M11** | Primary / secondary button                         | Hover; press                                                                     | Background `ink → ink-soft` (secondary: `transparent → stone`); press `translateY(1px)`                                                                | 160ms; press 80ms linear                 | Press only                                      | Color only                          |
| **M12** | Sector title                                       | Row hover (pointer: fine)                                                        | `translateX(0 → 6px)`                                                                                                                                  | 240ms, institutional                     | —                                               | None                                |
| **M13** | Anchor navigation                                  | Nav link click                                                                   | Native `scroll-behavior: smooth` with `scroll-margin-top: 72px`                                                                                        | browser                                  | same                                            | `scroll-behavior: auto`             |

**Total page-load sequence:** about 1.2s. The h1 is fully visible by ~920ms. There is no
animation after load unless the user acts.

**Deliberately excluded:** section and heading fade-ups, number counters, marquees, parallax,
cursor followers, magnetic buttons, text scrambles, page-transition curtains, looping
backgrounds, hover tilt on images.

## 4. Implementation plan (Phase 4)

| Motion  | Tool                                                                                                           | Why                                                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| M1–M5   | **CSS `@keyframes`** with `animation-fill-mode: both`, inside `@media (prefers-reduced-motion: no-preference)` | Runs before hydration, so the page never waits on JavaScript. Zero JS cost                                                              |
| M6, M7  | CSS transitions toggled by **one shared IntersectionObserver** hook                                            | No scroll listeners                                                                                                                     |
| M8, M9  | **Motion for React**: `AnimatePresence` + `m` components in `LazyMotion` (`domAnimation`, loaded async)        | The sheet needs an exit animation on unmount and clean interruption when toggled quickly. `LazyMotion` keeps the initial cost near 5 KB |
| M10–M13 | CSS                                                                                                            | Simple state transitions                                                                                                                |

- Install `motion` (MIT) in Phase 4 for M8/M9 only. If the CSS-only alternative (a persistent
  `<dialog>` with `@starting-style`) proves equally robust across Safari and Chrome, Motion can be
  dropped; that is decided during Phase 4 and recorded there.
- Put `<MotionConfig reducedMotion="user">` at the root of the Motion island.
- Import from `motion/react` and `motion/react-m` only. Never `framer-motion` or `motion-plus`
  (`splitText` is paid; the h1 reveal masks the whole block instead of splitting lines).

## 5. Reduced motion

`@media (prefers-reduced-motion: reduce)`:

- every keyframe animation is off, so final states render immediately;
- transitions limited to color/opacity ≤ 120ms;
- no transforms or clip-path changes;
- `scroll-behavior: auto`.

The global safety net already in `src/app/globals.css` stays.

## 6. LCP and hydration safety

- The h1 starts animating at +200ms and is fully visible by ~920ms. It is server-rendered text,
  so the reveal does not depend on JavaScript.
- Never set initial hidden states from JavaScript. If CSS fails to load, content is visible.
- Phase 6 verifies that LCP stays under 2.0s on a mid-range mobile profile. If the M3 delay
  measurably hurts LCP, M3's delay drops to 0 and its duration to 560ms.

## 7. Performance checklist

- Only `transform`, `opacity` and `clip-path` animate; no `width`, `height`, `top`, `left` or
  `filter` blur.
- `will-change` only during M8, removed after.
- One IntersectionObserver instance for M6 and M7.
- No animation runs while the tab is hidden (CSS pauses automatically; Motion respects page
  visibility).
- Verified in Phase 5 with the Performance panel: no long tasks > 50ms caused by animation, CLS
  from animation = 0.
