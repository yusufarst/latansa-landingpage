# Art direction — Phase 3 (binding spec for Phase 4)

Status: **proposed, awaiting approval.** When approved, this document, [motion-spec.md](motion-spec.md)
and [image-assets.md](image-assets.md) override any generic guidance elsewhere.

Visual reference: [design/phase-3-board.html](design/phase-3-board.html). It's a static mock built
with the real palette, fonts and copy, reviewed at 360 / 390 / 430 / 768 / 1024 / 1440 / 1920 px. Open
it with the `design-board` config in `.claude/launch.json` at
`http://localhost:4174/docs/design/phase-3-board.html` (add `?clean` to hide the review notes).
It is not production code.

---

## 1. Creative concept — "Kop"

**The company introduces itself the way Indonesian institutions do: on letterhead.**

Every procurement officer in Indonesia reads hundreds of _kop surat_ every month: the logo, the
company name and address, then the double line beneath the letterhead (_garis kop_, a thick rule
over a thin one). It is the most familiar sign of an organization that is formally constituted
and accountable.

The site borrows exactly one thing from that vernacular and does it beautifully: **the hero is a
letterhead.** Logo and address sit above a thick-over-thin rule, and the company's positioning is
set beneath it in a large editorial serif. The same rule closes the page in the footer, so the
whole page reads as one composed document: opened by the letterhead, closed by the rule.

Everything between is quiet, precise and typographic:

- a calm profile,
- a typographic list of business sectors,
- one decisive Deep Ink band for procurement channels,
- a Soft Stone "document sheet" for company data, set like the colon-aligned particulars of an
  official letter (`Nama perusahaan : …`),
- a contact close signed with the vertical logo.

**Why it fits.** Procurement credibility comes from order, verifiability and formal correctness,
not from marketing energy. The letterhead conveys that in one glance, without claims, badges or
numbers the company cannot substantiate. It is specific to Indonesia and to this audience, so the
page cannot be mistaken for a generic corporate template.

**Spend boldness in one place.** The kop is the single memorable element. Nothing else competes
with it: no gradients, no textures, no animated counters, no card grids.

## 2. Visual identity rules

1. **Kop rule** = 3px Deep Ink line, 3px gap, 1px Deep Ink line, full content width. It is used
   **only** under the hero letterhead and at the top of the footer. Never anywhere else.
2. **Logo** is always the official full-color artwork on Porcelain. Horizontal in the kop and
   compact header; vertical once, as the sign-off in the contact section; the symbol only for
   icons. It is never placed on Ink or Stone, never recolored, cropped, outlined or animated in
   parts. **No monochrome derivative is needed**, because the logo never sits on a dark surface.
3. **Color mass**: Porcelain ground; exactly one full-bleed Ink band (procurement); exactly one
   full-bleed Stone band (company data). The logo's red is the only saturated warm color on the
   page and appears only inside the logo.
4. **Champagne** is used only on Ink: link underlines, focus ring, and the 1px divider inside the
   band. It never appears on Porcelain (≈ 2.5:1).
5. **Rules and borders**: 1px dividers only where they separate peers (sector list rows, data
   rows, menu rows). There are no boxes around content and no cards.
6. **Shape**: 0 radius everywhere except buttons (2px). No shadows. No blur.
7. **Typography is the image** when no photography is available (see §8).
8. **No template chrome**: no all-caps tracked eyebrows, no "01 / 02" numbering (the sectors are
   not a sequence), no middle-dot meta strings, no `→` appended to links, no single-word italic
   accents in headlines, no stats or badges.
9. **Copy** is sentence case, Indonesian, from `src/content/` only (see §6 for new UI copy).

## 3. Typography

| Role               | Family                                | Why                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display & headings | **Newsreader** (Production Type, OFL) | Editorial serif with a true optical-size axis (6–72), so it is crisp at 84px and readable at 19px. Newspaper-of-record heritage suits a company presenting itself formally. Moderate contrast: dignified rather than fashion-luxe. |
| Text, UI, data     | **Plus Jakarta Sans** (Tokotype, OFL) | Indonesian-designed, originally created for Jakarta's civic city identity. Open apertures, excellent at 14–17px, tabular figures for addresses and postal codes. Replaces the provisional Geist, whose associations are tech/SaaS. |

Both are self-hosted via `next/font/google` (variable, `latin` + `latin-ext` subsets,
`display: swap`). Newsreader is loaded with `axes: ["opsz"]` and `font-optical-sizing: auto`.

### Type scale (fluid from 360px to 1440px, capped above)

| Token         | Family     | 360px → 1440px | Line height | Tracking | Weight  | CSS                                              |
| ------------- | ---------- | -------------- | ----------- | -------- | ------- | ------------------------------------------------ |
| `display`     | Newsreader | 38 → 84px      | 1.02        | −0.018em | 400     | `clamp(2.375rem, 1.417rem + 4.26vw, 5.25rem)`    |
| `h2`          | Newsreader | 30 → 48px      | 1.08        | −0.01em  | 400     | `clamp(1.875rem, 1.5rem + 1.667vw, 3rem)`        |
| `h3`          | Newsreader | 22 → 28px      | 1.2         | 0        | 450     | `clamp(1.375rem, 1.25rem + 0.556vw, 1.75rem)`    |
| `lead`        | Newsreader | 19 → 22px      | 1.5         | 0        | 400     | `clamp(1.1875rem, 1.125rem + 0.278vw, 1.375rem)` |
| `body`        | Plus Jak.  | 16 → 17px      | 1.6         | 0        | 400     | `clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)`     |
| `ui`          | Plus Jak.  | 15 → 16px      | 1.2         | 0        | 500/600 | buttons, nav                                     |
| `small`       | Plus Jak.  | 14px           | 1.5         | 0        | 500     | labels, metadata, footer                         |
| `kop-address` | Plus Jak.  | 13 → 14px      | 1.45        | 0        | 500     | `tabular-nums`                                   |

Rules:

- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`. `hyphens: manual` (browser
  Indonesian hyphenation is unreliable).
- Body measure ≤ 65ch; lead ≤ 38rem. Serif lead gets the more generous line-height (1.5).
- Labels are sentence case at 14px/500 in Slate, never uppercase or tracked.
- The `display` style is used once (hero h1). There is one `h1` per page.
- Italic Newsreader is not used for emphasis inside headlines.

## 4. Final color tokens

Refined from the Phase 2 palette by adding two functional shades. No base color changes.

| Token        | Hex       | Role                                                            |
| ------------ | --------- | --------------------------------------------------------------- |
| `ink`        | `#172B36` | Text, primary buttons, kop rule, the Ink band                   |
| `ink-soft`   | `#24404E` | **new** · hover state of Ink buttons                            |
| `porcelain`  | `#F7F6F2` | Page ground; text on Ink                                        |
| `slate`      | `#526B78` | Secondary text and labels on Porcelain                          |
| `slate-deep` | `#46606C` | **new** · secondary text and labels on Stone                    |
| `champagne`  | `#B69A75` | Accent on Ink only: link underline, focus ring, band divider    |
| `stone`      | `#D9DFDE` | Company-data band; dividers on Porcelain; secondary text on Ink |

Semantic aliases for Phase 4 (`src/app/globals.css`):

| Alias              | Value      | Alias                     | Value                    |
| ------------------ | ---------- | ------------------------- | ------------------------ |
| `surface`          | porcelain  | `text-inverse`            | porcelain                |
| `surface-inverse`  | ink        | `text-muted-inverse`      | stone                    |
| `surface-sheet`    | stone      | `line`                    | stone (decorative)       |
| `text`             | ink        | `line-strong`             | ink                      |
| `text-muted`       | slate      | `line-inverse`            | porcelain at 16% opacity |
| `text-muted-sheet` | slate-deep | `focus` / `focus-inverse` | ink / champagne          |

### Contrast (measured, WCAG 2.x)

| Pair                       | Ratio  | Use                                 |
| -------------------------- | ------ | ----------------------------------- |
| ink on porcelain           | 13.5:1 | All text                            |
| slate on porcelain         | 5.2:1  | Secondary text, labels              |
| ink on stone               | 10.8:1 | Text on the data sheet              |
| slate-deep on stone        | 4.9:1  | Labels on the data sheet            |
| porcelain on ink           | 13.5:1 | Text in the Ink band                |
| stone on ink               | 10.8:1 | Secondary text in the Ink band      |
| champagne on ink           | 5.5:1  | Link underline, focus ring on Ink   |
| porcelain on ink-soft      | 10.1:1 | Hovered primary button              |
| ~~slate on stone~~         | 4.2:1  | **Fails**: use slate-deep           |
| ~~champagne on porcelain~~ | 2.5:1  | **Never** for text or meaningful UI |

Button boundaries meet 3:1 non-text contrast: the secondary button outline is Slate (5.2:1).

## 5. Spacing, layout and grid

| Token           | 360px → 1440px | CSS                                           |
| --------------- | -------------- | --------------------------------------------- |
| page margin     | 20 → 72px      | `clamp(1.25rem, 0.1667rem + 4.815vw, 4.5rem)` |
| gutter          | 16 → 32px      | `clamp(1rem, 0.6667rem + 1.481vw, 2rem)`      |
| section padding | 80 → 160px     | `clamp(5rem, 3.333rem + 7.41vw, 10rem)`       |
| content max     | 1600px         | centered; 160px margins at 1920               |

- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 40, 48, 64, 96, 128, 160.
- Grid: **4 columns** below 768, **8** from 768 (`md`), **12** from 1024 (`lg`).
- Breakpoints (existing tokens): base 360, `xs` 430, `md` 768, `lg` 1024, `2xl` 1440, `3xl` 1920.
  `sm` (640) and `xl` (1280) exist but are not used unless a layout needs them.
- **Alignment**: everything is left-aligned (letter convention). No centered text blocks, except
  that button labels are centered within their buttons.
- **Asymmetry** on desktop: section headings sit in columns 1–5, content in 6/7–12, leaving a
  deliberate gutter of air. This is a letter's margin, not a card grid.
- Touch targets ≥ 48×48px on touch devices (exceeds the 44px floor); buttons 52px tall on mobile
  and 48px on desktop.

## 6. Mobile-first wireframes (360px is the master)

Widths in parentheses are content widths at 360px (320px content). New UI copy is marked
**[copy]**; it goes into `src/content/` in Phase 4 (as copy, not facts).

### 6.1 Navigation

```
360 — at load (inside the kop)            360 — after the kop scrolls away (compact bar, 56px)
┌────────────────────────────────┐        ┌────────────────────────────────┐
│ [LOGO horiz. 184px]   ≡ Menu   │        │ [LOGO 120px]           ≡ Menu  │  porcelain, 1px stone bottom
│ Klisat, Srihardono, Pundong    │        └────────────────────────────────┘
│ Kabupaten Bantul               │
│ Daerah Istimewa Yogyakarta …   │        Menu sheet (full height, porcelain)
│ ══════════════════════════════ │        ┌────────────────────────────────┐
└────────────────────────────────┘        │ [LOGO 120px]          ✕ Tutup │
                                          │ Profil                       ─ │  Newsreader 28px rows, 56px tall
                                          │ Bidang usaha                 ─ │  1px stone dividers
                                          │ Pengadaan                    ─ │
                                          │ Data perusahaan              ─ │
                                          │ Kontak                         │
                                          │                                │
                                          │ [ Hubungi kami melalui WA  ]   │  thumb zone: contact actions
                                          │ [ Kirim email              ]   │  (only publishable ones)
                                          └────────────────────────────────┘
```

- The menu button is labelled **"Menu"** with a two-bar icon; it toggles to **"Tutup"**
  **[copy]**. It is a 48×48px target with `aria-expanded` and `aria-controls`.
- The sheet is `role="dialog"` with `aria-modal="true"`. It traps focus, closes on Esc, on
  "Tutup" and on link activation, locks body scroll, and returns focus to the Menu button.
- The compact bar appears when the kop rule leaves the viewport. It stays visible while
  scrolling: it is short, and hide-on-scroll would add motion without benefit.
- **≥ 1024**: the kop row holds the inline nav (Profil, Bidang usaha, Pengadaan, Data perusahaan,
  ui 15px/500, link underline on hover) plus a primary "Hubungi kami" button (48px). The compact
  bar (64px) repeats the same nav. The Menu button is hidden.

### 6.2 Hero — the kop

```
360
┌────────────────────────────────┐
│ [LOGO 184]             ≡ Menu  │  20px top
│ address (3 lines, 13px slate)  │  14px below logo
│ ══════════════════════════════ │  20px below address · kop rule draws in
│                                │  40px
│ Pemasok barang                 │  display 38/1.02, 4 lines
│ dan jasa pendukung             │
│ untuk instansi                 │
│ dan lembaga.                   │
│                                │  24px
│ CV. Latansa Jogjakarta adalah  │  body 16/1.6, ink, ≤ 34rem
│ perusahaan perdagangan …       │
│                                │  32px
│ [ Hubungi kami melalui WhatsApp]│  primary, full width, 52px
│ [ Buka toko kami di SIPLah    ]│  secondary (slate outline), 12px gap, external
│                                │  48px
│ ┌────────────────────────────┐ │  optional image H1, 4:5, full content width,
│ │        image H1 (4:5)      │ │  only if an approved image exists;
│ └────────────────────────────┘ │  otherwise nothing (no empty frame)
└────────────────────────────────┘
```

- **Primary CTA logic**: WhatsApp if publishable ("Hubungi kami melalui WhatsApp"), otherwise
  email ("Kirim email"). Secondary: "Buka toko kami di SIPLah" when the SIPLah URL is
  publishable. It opens the store (new tab, announced as external), exactly as its label says. A
  CTA never says "visit the store" and then only scrolls the page.
- PKP status is **not** in the hero (kept restrained, in §6.6).
- 430px: logo 200px; otherwise identical. 768px: logo and address side by side (address
  baseline-aligned to the logo bottom), headline columns 1–7 of 8, buttons side by side
  (`white-space: nowrap`).

### 6.3 Profil perusahaan

```
360
│ Profil perusahaan              │  h2 30px
│                                │  32px
│ CV. Latansa Jogjakarta menye-  │  lead (Newsreader 19/1.5) = positioning.profile[0]
│ diakan beragam kategori …      │
│                                │  20px
│ Kami melayani pengadaan …      │  body, slate = positioning.profile[1]
```

Desktop: h2 in columns 1–4; lead and body in 6–11 (≈ 38rem), top-aligned to the h2 cap height.

### 6.4 Bidang usaha (no section padding above; it continues the profile's reading flow)

```
360
│ Bidang usaha                   │  h2
│ Kategori barang dan layanan …  │  body slate, 16px below [copy]
│ ────────────────────────────── │  40px, 1px stone
│ Komputer & Teknologi Informasi │  h3 22px (Newsreader 450)
│ Perangkat komputer, …          │  body slate, 8px below
│ ────────────────────────────── │  24px row padding
│ … (5 rows, same structure)     │
```

- Rows are peers in a list (`<ul>`). They have no numbers, icons or cards.
- **Desktop (≥1024)**: each row becomes a two-column typographic table, with the title in
  columns 1–5 and the summary in 7–11 (32px row padding). The heading and intro split across
  1–5 and 7–11.
- **With approved images (desktop only)**: the summary column narrows to 6–8 and a **sticky image
  panel** occupies 9–12. It crossfades to the image for the row crossing the reading line (see
  motion M7). On mobile, a single editorial image (asset E1, 3:2) follows the list instead; there
  are no per-row thumbnails.
- Hover (pointer devices): the title shifts 6px right. This is optional feedback; rows are not
  links.

### 6.5 Kanal pengadaan — the Ink band (full bleed)

```
360  (background ink, text porcelain)
│ Kanal pengadaan                │  h2 porcelain
│ ────────────────────────────── │  40px · 1px porcelain/16%
│ SIPLah Toko Ladang             │  h3
│ Toko CV. Latansa Jogjakarta …  │  body stone
│ Buka toko di SIPLah Toko Ladang│  link: porcelain text, champagne 1px underline,
│                                │  48px target, opens new tab, sr-only "(situs eksternal)"
│ Untuk kebutuhan pengadaan di   │  small stone [copy], links to #kontak
│ luar kanal ini, hubungi kami.  │
```

- Supports 1–3 channels (Mbizmarket appears automatically once verified). Each channel is a
  block separated by 1px `line-inverse`.
- Desktop: h2 in columns 1–5; channel blocks in 7–12.
- The band has no texture or pattern; a security-paper line texture was tried on the board and
  rejected as decoration.

### 6.6 Data perusahaan — the document sheet (Stone band, full bleed)

```
360  (background stone)
│ Data perusahaan                │  h2
│ ══ 1px ink rule ══════════════ │  40px
│ Nama perusahaan                │  label 14/500 slate-deep
│ CV. Latansa Jogjakarta         │  value 16–17/500 ink
│ ────────────────────────────── │  1px ink/14%
│ Bentuk usaha                   │
│ Persekutuan Komanditer (CV)    │
│ Status Perpajakan              │  exact wording; value "Pengusaha Kena Pajak (PKP)"
│ Pengusaha Kena Pajak (PKP)     │
│ Alamat                         │  full address, tabular-nums
│ Kanal pengadaan                │  publishable channels, comma-separated
```

- `<dl>` semantics. From 768: colon-aligned rows like the particulars of an official letter, in
  a `14rem | 1.25rem ":" | 1fr` grid. Desktop width: columns 1–10.
- No badge, seal, icon or checkmark next to PKP. No NPWP field exists.

### 6.7 Hubungi kami — contact and location

```
360
│ Hubungi kami                   │  h2
│ Sampaikan kebutuhan pengadaan  │  body slate [copy]
│ Anda. Kami akan membantu …     │
│ [ Hubungi kami melalui WhatsApp]│  only if publishable
│ [ Kirim email                 ]│  only if publishable
│                                │  40px
│ Alamat                         │  small slate label
│ Klisat, Srihardono, …          │  <address>
│ Lihat lokasi di Google Maps    │  link (new optional fact mapsUrl)
│ Jam operasional                │  only if officeHours confirmed; one line per day group
│                                │  64px
│ [LOGO vertical 144px]          │  sign-off
```

- Desktop: vertical logo (176px) in columns 1–3, top-aligned with the h2; content in 5–11;
  buttons side by side.
- No map embed (third-party iframe, privacy, CSP, weight). A link to the Google Maps listing
  only.
- WhatsApp link format: `https://wa.me/62…`; email: `mailto:`. Both come only from
  `publishedValue()`.

### 6.8 Footer

```
360
│ ══════════════════════════════ │  kop rule (closing)
│ CV. Latansa Jogjakarta         │  Newsreader 20px
│ Kabupaten Bantul, Daerah …     │  small slate
│ Profil                         │  nav list, 44px rows, no underline at rest
│ Bidang usaha / Pengadaan / …   │
│ © 2026 CV. Latansa Jogjakarta  │  small slate
│ Ilustrasi pada situs ini …     │  only if AI imagery is used [copy]
```

Desktop: name and region on the left; nav inline on the right.

## 7. Desktop adaptation strategy

Desktop expands the mobile composition; it never replaces it.

| Section    | 768 (`md`, 8 col)                      | 1024 (`lg`, 12 col)                                             | 1440 (`2xl`)         | 1920 (`3xl`)             |
| ---------- | -------------------------------------- | --------------------------------------------------------------- | -------------------- | ------------------------ |
| Kop        | logo + address in one row; Menu button | inline nav + CTA in the kop row                                 | logo 224px           | content capped at 1600px |
| Hero       | h1 cols 1–7; buttons in a row          | h1 1–7, body 1–6; image (if any) 9–12, aligned to the h1 top    | display reaches 84px | same, centered           |
| No image   | —                                      | h1 spans 1–9; no placeholder frame                              | —                    | —                        |
| Profil     | stacked                                | h2 1–4 · text 6–11                                              | —                    | —                        |
| Sectors    | stacked rows                           | rows: title 1–5 · summary 7–11 (with images: 6–8 + sticky 9–12) | —                    | —                        |
| Ink band   | stacked                                | h2 1–5 · channels 7–12                                          | —                    | —                        |
| Data sheet | colon-aligned rows                     | cols 1–10                                                       | —                    | —                        |
| Contact    | stacked, buttons in a row              | vertical logo 1–3 · content 5–11                                | —                    | —                        |
| Footer     | stacked                                | name left · nav right                                           | —                    | —                        |

Desktop uses the same type, rules, colors and order as mobile. Only the column spans and the
amount of air change.

## 8. Hero art direction

**Primary (works without any photography): typographic letterhead.** The composition is
logo → address → kop rule → large serif headline → summary → actions, all left-aligned on a
Porcelain ground. It gets its quality from:

- exact spacing and optical alignment of the logo's left edge with the rule and the headline;
- Newsreader at display optical size with tight leading (1.02) and slight negative tracking;
- the rule's draw-in (motion M1) as the single orchestrated moment;
- generous air under the hero on desktop. The hero does not try to fill the viewport.

**Optional enhancement: image H1** (see [image-assets.md](image-assets.md)), if an approved
illustrative image exists:

- a 4:5 portrait still life on desktop (columns 9–12, top aligned to the h1);
- on mobile, below the actions at 4:5 and full content width.

The image is graded toward the palette, with no frame, radius, shadow or overlay text. When there
is no image, nothing stands in for it: the headline gets the space.

## 9. Motion

See [motion-spec.md](motion-spec.md). Summary:

- one orchestrated page-load moment (the kop rule draws, the headline rises from a mask);
- one state change (the compact header);
- otherwise motion only answers the user (menu, hover, press).

There are no per-section fade-ups.

## 10. Imagery

See [image-assets.md](image-assets.md). No image-generation tool is currently available that is
both free and confirmed for commercial use. The design is complete without images; image slots
are additive and never show empty frames.

## 11. Accessibility and performance

**Accessibility (WCAG 2.2 AA):**

- `lang="id"`; a skip link "Langsung ke konten utama" **[copy]** is the first focusable element.
- Landmarks: `header` (compact bar), `main`, `nav` (labelled "Utama" / "Navigasi bawah"),
  `footer`. One `h1` (hero), one `h2` per section, `h3` for list items and channels.
- Focus: 2px solid outline, 3px offset — Ink on light surfaces, Champagne on Ink. Never removed.
- All interactive targets ≥ 48×48px on touch; inline text links have 48px tall hit areas via
  padding.
- External links announce "(membuka situs eksternal)" to screen readers and use
  `rel="noopener noreferrer"`.
- `prefers-reduced-motion` honored for every animation (motion-spec §5).
- Reflow at 320px and at 200% zoom without horizontal scrolling. Respect the user's font size
  (rem units only).
- Logo alt text: "LATANSA — CV Latansa Jogjakarta". Decorative rules are `aria-hidden`.

**Performance budgets (mobile, static export on Cloudflare Pages):**

| Metric                                         | Target                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| LCP (Moto G-class device, 4G)                  | < 2.0s; the LCP element is the hero h1 text                                                             |
| CLS                                            | < 0.05 (all images have intrinsic sizes; fonts use `next/font` size-adjusted fallbacks)                 |
| INP                                            | < 200ms                                                                                                 |
| JavaScript added on top of the Next.js runtime | ≤ 15 KB gzip (menu, header observer)                                                                    |
| Fonts                                          | 2 variable families, latin subsets; preload only Newsreader for the h1                                  |
| Images                                         | AVIF/WebP, sizes per image-assets.md; hero image never `priority` on mobile, where it is below the fold |

## 12. Design quality acceptance criteria (Phase 4/5 sign-off)

A build is accepted when **all** of these hold:

1. **360px stands on its own**: the kop, headline and actions look composed and premium on a
   360×780 screenshot without scrolling past the actions.
2. **The kop is recognizable**: logo, address and thick-over-thin rule align on one left edge at
   every breakpoint.
3. **No template tells**: no uppercase eyebrows, no numbered non-sequences, no cards, no gradients,
   no glass/blur, no shadows, no `→` link suffixes, no middle-dot meta strings, no stats.
4. **Color discipline**: one Ink band, one Stone band; champagne only on Ink; every text pairing
   from the contrast table.
5. **Content discipline**: every fact rendered via the provenance rules; PKP wording exact; no
   NPWP; no prices or commerce language; hidden facts leave no empty UI.
6. **Responsive ladder**: screenshots at 360, 390, 430, 768, 1024, 1440 and 1920 show intentional
   compositions with no horizontal overflow and no orphaned single words in headings where
   avoidable.
7. **Motion**: only the motions in motion-spec.md exist; reduced motion shows final states
   instantly; no layout shift from animation.
8. **Logo integrity**: official artwork, correct variant per context, never on dark surfaces.
9. **Budgets** in §11 are met on the exported `out/` build.
10. **Accessibility**: keyboard-only walkthrough works (skip link, menu trap and return, visible
    focus everywhere); axe-core reports no serious or critical issues.

## 13. Critique log: what was generic, and what changed

The first plan was reviewed against the brief and against today's common "generated website"
patterns. The weak decisions and their fixes:

| #   | First idea                                                         | Problem                                                  | Decision                                                                                                                 |
| --- | ------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | Tracked uppercase eyebrows above headings (from the Phase 2 skill) | Template chrome                                          | Removed. Sentence-case headings only                                                                                     |
| 2   | Categories numbered 01–05                                          | Not a sequence; generic device                           | Removed. Plain typographic list                                                                                          |
| 3   | Champagne hairlines everywhere                                     | Broadsheet cliché; champagne fails contrast on Porcelain | Rules only where they separate peers; champagne only on Ink                                                              |
| 4   | Warm cream ground plus serif display                               | Close to the most common generated look                  | Porcelain kept (brief) but cooled by the Ink and Stone masses; no terracotta; serif paired with an Indonesian civic sans |
| 5   | Geist for text                                                     | Reads as tech/SaaS                                       | Plus Jakarta Sans                                                                                                        |
| 6   | Security-paper line texture in the Ink band                        | Read as wave decoration on the board                     | Removed                                                                                                                  |
| 7   | Kop double rule repeated on the data sheet                         | Diluted the signature                                    | Single 1px Ink rule there; double rule only in hero and footer                                                           |
| 8   | Fade-up reveal on every section                                    | Generic, distracting                                     | One orchestrated hero moment; everything else answers the user                                                           |
| 9   | Grey placeholder frame when no image exists                        | Empty chrome                                             | No frame; the headline takes the space                                                                                   |
| 10  | Monochrome logo for dark surfaces                                  | Unneeded risk to logo integrity                          | Logo never placed on dark surfaces                                                                                       |
| 11  | Hero buttons wrapping to two lines at 768 and 1440                 | Unpolished                                               | `nowrap` from 768; hero body widened to columns 1–6                                                                      |
| 12  | Underlined footer nav links at rest                                | Visual noise                                             | Underline on hover only for nav lists; inline text links stay underlined                                                 |
| 13  | Office hours as one "·"-joined string                              | Middle-dot template string; poor on mobile               | Phase 4: restructure `officeHours` into day-group rows (content change, still `needs-confirmation`)                      |

## 14. Content changes needed in Phase 4 (no facts invented)

- Add UI copy entries (not facts): section headings and intros marked **[copy]** above, the menu
  labels, the skip link, the external-link announcement, and the imagery note.
- Add optional fact `mapsUrl` (Google Maps listing "Latansa Jogjakarta", status
  `needs-confirmation` until the client confirms it is their listing; `launch: "optional"`).
- Restructure `officeHours` into rows (Senin–Jumat / Sabtu / Minggu). It stays
  `needs-confirmation`.
