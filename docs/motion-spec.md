# Motion specification: Concept C · Presisi Terang (binding spec for Phase 4)

Status: **approved with the art direction on 2026-11-05.** This is the companion to
[art-direction.md](art-direction.md). The approved board
([design/concepts/c-presisi-terang.html](design/concepts/c-presisi-terang.html)) is the
reference for feel and timing. Where this spec differs from the board, this spec wins; see
deltas D10, D11, D12 and D14 in [art-direction.md §12](art-direction.md#12-deltas-from-the-approved-board).

> **Owner refinement brief (2026-11-05, second pass).** Binding; it supersedes the rows named here.
>
> - **M1/M2 (hero photograph):** the full-bleed photo settles from a 1.07 scale (1.04 on phones)
>   while a midnight veil fades out (1300ms, +100ms). There is no clip-path reveal, and the image
>   itself never animates opacity, which keeps LCP clean.
> - **M3/M4:** the headline words rise from +250ms, 40ms apart. The line, the actions and the
>   overview strip fade up at 750, 850 and 1000ms.
> - **M5 (annotations):** retired with the annotation markers.
> - **M17 (carousel):** previous/next buttons scroll one card smoothly (instantly under reduced
>   motion). Native swipe and snap are unchanged.
> - **M19 (new), section highlighting:** an IntersectionObserver on the viewport's middle line
>   marks the header and menu link of the section in view (`data-current`). The underline draws
>   in brass-deep.
> - **M20 (new), category hover:** on hover-capable devices the photo scales to 1.04 over 900ms.
> - **Locator:** on hover the marker scales to 1.18 and the frame warms to brass.

> **Phase 5 refinement (2026-11-05).**
>
> - **M17 (meter):** as built, the bars are 20px and 40px. On rows narrower than 17rem (an
>   enlarged default text size) the bars compress; below that the meter is hidden and the
>   "1 dari 5" position carries the state.
> - **Press feedback:** text links dim to 70% opacity while pressed (150ms). Phones show no grey
>   tap flash.

## 1. Principles

1. **One orchestrated moment.** The hero entrance runs once on load. The photograph opens, the
   headline rises word by word, then the brass annotations appear and name the categories.
2. **Quiet scroll choreography.** Photographs open from an inset as they enter, and heading groups
   settle in. The procurement line and the locator rings draw. Each runs once.
3. **Information never performs.** The facts row, the data sheet, actions, the address and flow
   steps are present on arrival. Identity data does not fade in.
4. **Motion answers people.** The menu, hover and press get short, precise feedback that shows
   what changed.
5. **Calm.** Ease-out curves, with no overshoot and no bounce.
6. **Cheap.** Only `transform`, `opacity` and `clip-path` animate, with two contained exceptions:
   `stroke-dashoffset` on the small locator SVG, and the catalogue meter's bar width inside a
   `contain: layout paint` box.

   Ruled out: scroll listeners, scroll hijacking, parallax, 3D and smooth-scroll libraries
   (Lenis is not justified).

7. **Lighter on mobile.** Below 768px, distances are shorter and scales are smaller.
8. **Always optional.** Reduced motion shows final states. No content depends on JavaScript to
   become visible.

## 2. Tokens

| Token         | Value                            | Use                                          |
| ------------- | -------------------------------- | -------------------------------------------- |
| `--ease-out`  | `cubic-bezier(0.16, 1, 0.3, 1)`  | Entrances, reveals, draws, fills, the sheet  |
| `--ease-snap` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Color and outline changes on buttons         |
| `--t-press`   | 120ms, linear                    | Button press                                 |
| `--t-quick`   | 300ms                            | Header line; meter color                     |
| `--t-color`   | 350ms                            | Button text and outline color; menu icon     |
| `--t-line`    | 400ms                            | Underlines; meter bar width                  |
| `--t-fill`    | 450ms                            | Button fill sweep                            |
| `--t-sheet`   | 550ms                            | Menu sheet                                   |
| `--t-text`    | 800ms opacity, 900ms transform   | Heading groups, hero support, headline words |
| `--t-draw`    | 1200ms                           | Photo clip reveals, flow line                |
| `--t-settle`  | 1600ms                           | Photo scale settle, locator rings            |
| `--t-hero`    | 1250ms clip, 2200ms scale        | Hero photograph                              |

## 3. Catalog

| ID  | Element                 | Trigger                                   | Animation (desktop)                                                                                                       | Timing                                                         | Mobile (< 768)                | Reduced motion          |
| --- | ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------- | ----------------------- |
| M1  | Hero photograph         | Load, once                                | `clip-path: inset(0 0 100% 0)` → `inset(0)` on the figure                                                                 | 1250ms, ease-out, +150ms                                       | Same                          | Final state             |
| M2  | Hero image              | Load, once                                | `scale(1.08)` → `1` on the image                                                                                          | 2200ms, ease-out, +150ms                                       | `scale(1.05)`, 1800ms         | None                    |
| M3  | Headline words          | Load, once                                | Each word rises `translateY(105%)` → `0` inside its own mask                                                              | 900ms, ease-out, +100ms + 35ms × word                          | Same (relative distance)      | In place                |
| M4  | Hero support            | Load, once                                | `opacity 0 → 1`, `translateY(10px → 0)`: line, actions, chip, meta or location row                                        | 800ms, ease-out, +700ms                                        | `translateY(8px)`             | Visible                 |
| M5  | Annotations             | Load, once                                | `opacity 0 → 1`, `translateY(6px → 0)`                                                                                    | 700ms, ease-out, +1050ms + 140ms × marker                      | Same (A1 only)                | Visible                 |
| M6  | Header line             | Top sentinel leaves the viewport          | 1px `hair` line (`box-shadow`) fades in                                                                                   | 300ms                                                          | Same                          | Instant                 |
| M7  | Menu sheet              | Menu, Tutup, Esc, link activation         | `clip-path: inset(0 0 100% 0)` ↔ `inset(0)`; `visibility` flips after closing                                             | 550ms, ease-out, both ways                                     | Mobile and tablet only        | Instant, no clip        |
| M8  | Menu links              | Sheet opens                               | `opacity 0 → 1` (400ms), `translateY(14px → 0)` (500ms); +50ms per link from the second                                   | Ease-out; reset with the sheet on close                        | —                             | Visible                 |
| M9  | Menu icon               | Same as M7                                | Bars `translateY(±3px) rotate(±45°)` into a cross                                                                         | 350ms, ease-out                                                | —                             | Instant                 |
| M10 | Buttons                 | Hover (hover-capable devices only); press | Fill sweeps from the left (`scaleX(0 → 1)` on a `::before` layer); text and outline color change; press `translateY(1px)` | Fill 450ms ease-out; color 350ms ease-snap; press 120ms linear | Press only                    | Color only, ≤ 150ms     |
| M11 | Text links              | Hover                                     | The 1px underline retracts to the right, then returns on leave                                                            | 400ms, ease-out                                                | Underline always shown        | Underline always shown  |
| M12 | Desktop nav links       | Hover                                     | The 1px underline grows from the left, and retracts to the right on leave                                                 | 400ms, ease-out                                                | —                             | No transition           |
| M13 | Photographs (E1, C1–C5) | 16% visible, once                         | Figure `clip-path: inset(12% 8%)` → `inset(0)`; image `scale(1.1)` → `1`                                                  | 1200ms and 1600ms, ease-out                                    | `inset(8% 6%)`, `scale(1.06)` | Final state             |
| M14 | Heading groups          | 16% visible, once                         | Section label, heading (or statement) and lede move as one group: `opacity 0 → 1`, `translateY(18px → 0)`                 | 800ms opacity, 900ms transform, ease-out                       | `translateY(12px)`            | Visible                 |
| M15 | Procurement flow line   | Flow 16% visible, once                    | `scaleY` (stacked) or `scaleX` (desktop) `0 → 1`, from the first diamond                                                  | 1200ms, ease-out, +200ms                                       | Same                          | Drawn                   |
| M16 | Locator rings           | Locator 16% visible, once                 | `stroke-dashoffset 1 → 0` (`pathLength="1"`), ring _i_ delayed 40ms × _i_                                                 | 1600ms, ease-out                                               | Same                          | Drawn                   |
| M17 | Catalogue meter         | The card at the scroller's start changes  | The active bar grows from 24 to 48px and turns navy; the previous one returns                                             | 400ms width, 300ms color, ease-out                             | Below 1024 only               | Instant                 |
| M18 | Anchor navigation       | In-page link                              | Native smooth scrolling, with `scroll-padding-top` of 72px (88px from 1024)                                               | Browser                                                        | Same                          | `scroll-behavior: auto` |

**Hero timeline (desktop):**

| Time        | What happens                                                   |
| ----------- | -------------------------------------------------------------- |
| 0ms         | The page paints                                                |
| 100–1245ms  | The headline's eight words rise, 35ms apart                    |
| 150–1400ms  | The photograph opens (M1); its scale settles until 2350ms (M2) |
| 700–1500ms  | The hero line, actions, chip and location row fade up          |
| 1050–1890ms | A1, then A2, appear (A1 only on mobile)                        |

The entrance reads complete at about 1.9s. Nothing else moves unless the user scrolls or acts.

**Deliberately excluded:**

- fade-ups on the facts row, the data sheet, actions, the address or card text;
- number counters, marquees, parallax;
- cursor followers, magnetic buttons, text scrambles;
- page-transition curtains, looping backgrounds;
- hover tilt or zoom on photographs.

## 4. Implementation

| Motion       | Tool                                                                                                                                                                     | Why                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| M1–M5        | CSS `@keyframes` in `globals.css`, inside `@media (prefers-reduced-motion: no-preference)`, with `animation-fill-mode: both`                                             | Runs from the static HTML before hydration, so the hero never waits for JavaScript. Zero JS |
| M3 split     | The server component renders each word as `<span class="w"><span style="--k:n">word</span></span>`, `aria-hidden`, plus a visually hidden full sentence                  | No runtime splitting, no layout shift, clean screen-reader output                           |
| M13–M16      | One client component, `RevealObserver`, with one IntersectionObserver (threshold 0.16, unobserve after the first entry), using the pattern below                         | No scroll listeners; content stays visible without JS                                       |
| M6           | The same observer watches a 1px sentinel at the top of the page and sets `data-scrolled` on the header                                                                   | Replaces the board's scroll listener                                                        |
| M17          | A small client component with an IntersectionObserver whose root is the scroller (threshold 0.6); it sets `data-active` on the meter                                     | Replaces the board's scroll listener                                                        |
| M7–M9        | A client component that keeps the sheet mounted and toggles `data-open`. CSS transitions as on the board; focus trap, Esc, `inert` and scroll lock in the same component | Proven on the board with zero dependencies                                                  |
| M10–M12, M18 | CSS only; hover effects inside `@media (hover: hover)`                                                                                                                   | Simple state transitions                                                                    |

**Reveal pattern (M13–M16).** It keeps content visible without JavaScript and avoids flicker.

1. The server HTML has no hidden states. Elements to reveal carry `data-reveal` (`group`,
   `photo`, `flow` or `rings`).
2. After hydration, `RevealObserver` marks only the elements that are entirely **below** the
   viewport as `data-reveal-state="pending"`; CSS hides only pending elements. Elements already in
   view are left alone, without animation.
3. When a pending element reaches 16% visibility, the observer sets
   `data-reveal-state="in"` and CSS transitions it to its final state.
4. Under reduced motion the observer marks nothing.

**Libraries:**

- No motion library is required.
- Motion for React (`motion/react` with `LazyMotion`, MIT) is a documented fallback for the menu
  only. Use it only if Safari shows interrupted or skipped sheet transitions. If it is used,
  install `motion` and record the reason in the PR.
- Never import `framer-motion` or `motion-plus`.

## 5. Reduced motion

Under `@media (prefers-reduced-motion: reduce)`:

- **Final states:** no keyframes and no `clip-path` or transform transitions. Every element renders
  in its final state: photographs uncropped, lines and rings drawn, words in place.
- **Hover:** feedback is limited to color and opacity changes of 150ms or less.
- **Menu:** the sheet opens and closes instantly, without the clip.
- **Scrolling:** `scroll-behavior: auto`.
- **Reveals:** `RevealObserver` marks nothing as pending.

The global safety net already in `src/app/globals.css` stays.

## 6. LCP and robustness

- **No JavaScript dependency:** the hero entrance is pure CSS and finishes even if JavaScript
  fails. Below-the-fold reveals are added only after hydration, so a failed or slow script leaves
  content visible.
- **LCP fallback:** the hero photograph is the LCP element. If Phase 6 measures LCP above 2.5s
  because of M1 or M2, M1 starts at 0ms and runs 900ms, and M2's scale drops to 1.04.
- **`will-change`:** set only on the menu sheet while it animates.
- **Hidden tabs:** CSS animations pause on their own; no script animates.

## 7. Verification (Phase 5)

- **Final-state screenshots:** capture with reduced motion emulated. Use Chromium
  `--force-prefers-reduced-motion`, or Playwright `reducedMotion: "reduce"`. This replaces the
  board's `?still` mode.
- **Entrance timing:** record the hero entrance at 390 and 1440 with normal motion, and check it
  against the §3 timeline.
- **Performance panel:**
  - no long tasks over 50ms caused by animation;
  - animation-caused CLS is 0;
  - only the properties listed in §1 animate.
- **No scroll listeners:** the shipped JavaScript contains no `scroll` event listener.
