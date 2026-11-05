---
name: latansa-visual-qa
description: Visual QA routine for the LATANSA JOGJAKARTA website. Use after any UI, styling, content-layout or animation change, and before calling visual work done or opening a PR. Verifies the exported static build in the browser in strict mobile-first order (360/390 → 430 → 768 → 1024 → 1440 → 1920), checks overflow, touch targets, typography, layout shift, reduced motion, logo integrity and content rules, and records screenshots.
---

# LATANSA visual QA

Never sign off from code alone. Verify the **static export** in a real browser, **mobile
first**. Desktop polish never starts before the mobile screenshots have been reviewed.

Standards: `docs/design-standards.md`, `latansa-art-direction`, and (when present)
`docs/art-direction.md` + `docs/motion-spec.md`.

## 1. Build what production serves

```bash
npm run check          # lint, typecheck, format, tests, content:check, build, verify:export
npm run content:check
```

Then serve `out/` with the `static-export` config in `.claude/launch.json` (port 4173) via the
built-in browser's `preview_start`. On a real phone, open the Network URL that
`npm run preview` prints (same Wi-Fi); `next dev` over the LAN needs `allowedDevOrigins`. Use `dev` (port 3000) only for quick iteration, never for
sign-off.

## 2. Viewport ladder — in this order

| Step | Size (w×h) | Notes                                                         |
| ---- | ---------- | ------------------------------------------------------------- |
| 0    | 320×568    | Stress test. Content must fit; the primary action visible.    |
| 1    | 360×780    | Primary. Smallest common Android.                             |
| 1b   | 375×667    | Short iPhone (SE). Headline, line and both actions visible.   |
| 2    | 390×844    | Primary. Common iPhone.                                       |
| 3    | 430×932    | Large phone (`xs:`).                                          |
| 4    | 768×1024   | Tablet (`md:`), check portrait.                               |
| 5    | 1024×768   | Laptop (`lg:`).                                               |
| 6    | 1440×900   | Desktop (`2xl:`).                                             |
| 7    | 1920×1080  | Large desktop (`3xl:`). Content must not float lost in space. |

At each step: full-page screenshots top to bottom, reviewed visually against the art
direction. Fix mobile issues before moving up the ladder. Reset the viewport to desktop when
finished.

## 3. Automated checks per viewport (run in the page)

```js
// Horizontal overflow — must be [] and scrollWidth === clientWidth
({
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth,
  overflow: [...document.querySelectorAll("body *")]
    .filter((e) => e.getBoundingClientRect().right > innerWidth + 0.5)
    .map((e) => e.tagName + "." + e.className)
    .slice(0, 10),
});
```

```js
// Touch targets under 44×44 on mobile
[...document.querySelectorAll("a, button, [role=button], input, select")]
  .map((e) => ({ t: e.textContent.trim().slice(0, 30), r: e.getBoundingClientRect() }))
  .filter(({ r }) => r.width && (r.width < 44 || r.height < 44))
  .map(({ t, r }) => `${t} ${Math.round(r.width)}×${Math.round(r.height)}`);
```

```js
// Layout shift since load — target < 0.05
new Promise((res) => {
  let cls = 0;
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => !e.hadRecentInput && (cls += e.value)),
  ).observe({ type: "layout-shift", buffered: true });
  setTimeout(() => res(cls), 3000);
});
```

Also confirm: smallest body text ≥ 16px on mobile; no text clipped or overlapping; headings
wrap well in Indonesian (no orphaned single words where avoidable).

## 4. Motion checks

- Scroll the full page at 390px and 1440px: every animation has a purpose, finishes quickly,
  never blocks reading, and never shifts layout.
- Mobile uses the lighter variant (shorter distance, fewer staggered items, no parallax).
- Emulate `prefers-reduced-motion: reduce` (DevTools rendering setting, or Playwright
  `emulateMedia({ reducedMotion: "reduce" })`): content is fully visible with no transforms.
- Final-state screenshots: capture with reduced motion emulated (Chromium
  `--force-prefers-reduced-motion`). This is the production equivalent of the board's `?still`.
- Only the properties in `docs/motion-spec.md` §1 animate (`transform`, `opacity`, `clip-path`,
  plus the two contained exceptions). There are no `scroll` event listeners.

## 5. Brand and content checks

- Logo: correct variant (horizontal in navbar), proportional, sharp, on a light surface, never
  recolored or cropped.
- Colors: only palette tokens (`docs/art-direction.md` §4). Brass text appears only on navy or
  midnight. Focus rings are brass-deep on light surfaces and brass on dark ones.
- Annotations: each hero marker sits on its object at every width (art-direction §8).
- Imagery: the "Foto ilustrasi" chip and the footer imagery note are present. Photos are sharp,
  with no upscaling, and match the slot crops.
- No prices, stock, cart/checkout or pricing language visible.
- PKP line reads exactly "Status Perpajakan: Pengusaha Kena Pajak (PKP)"; no NPWP visible.
- No placeholder text; hidden facts (contacts, office hours, Mbizmarket) are absent until
  publishable — no empty links.
- External links (SIPLah) open correctly with `rel="noopener noreferrer"`.
- Keyboard: Tab through the page; focus ring visible on every interactive element; order
  logical; skip link if a navbar exists.
- 404: an unknown path shows the Indonesian 404 page with HTTP 404.

## 6. Report

Summarize per viewport: pass/fail, issues found, fixes made, remaining risks. Attach or send the
key screenshots (360, 390, 768, 1440) to the user. State plainly anything not verified.
