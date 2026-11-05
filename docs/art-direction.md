# Art direction: Concept C · Presisi Terang (binding spec for Phase 4)

Status: **approved by the owner on 2026-11-05.** This document, [motion-spec.md](motion-spec.md)
and [image-assets.md](image-assets.md) are binding for Phases 4 and 5. They override generic
guidance in [design-standards.md](design-standards.md) and the project skills.

| Reference                    | Where                                                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approved board               | [design/concepts/c-presisi-terang.html](design/concepts/c-presisi-terang.html). Start the `design-board` launch config, then open `/docs/design/concepts/c-presisi-terang` |
| Approved screenshots         | [390](design/concepts/screens/C-mobile-390-hero.webp), [360](design/concepts/screens/C-mobile-360-hero.webp), [1440](design/concepts/screens/C-desktop-1440-hero.webp)     |
| Rationale and sourcing tests | [design/phase-3-photographic-direction.md](design/phase-3-photographic-direction.md)                                                                                       |
| Photo provenance             | [design/concepts/photos/SOURCES.md](design/concepts/photos/SOURCES.md)                                                                                                     |

The board is a reference, not production code. **Where this spec and the board differ, this spec
wins.** Every difference is listed with its reason in [§12](#12-deltas-from-the-approved-board).

The rejected "Kop" direction is archived at
[design/archive/kop-board-rejected.html](design/archive/kop-board-rejected.html). Its spec lives
only in git history.

---

## 1. Concept

**Presisi Terang** means "precise and bright". LATANSA supplies real equipment to institutions, so
the page shows real equipment, photographed well, and marks it with the precision of a technical
catalogue.

It draws on two sources:

- **Presisi (precision):**
  - navy and brass;
  - Archivo Expanded headlines;
  - measuring details: annotation markers, a ruler, crop marks, a letterhead rule, a flow
    diagram and a contour locator.
- **Terang (bright):**
  - an ivory canvas;
  - generous, purposeful negative space;
  - a Newsreader editorial statement;
  - a calm rhythm.

**The signature is annotated photography.** Thin brass markers on the hero photograph name what
LATANSA supplies ("Komputer & TI", "Alat tulis & kantor"), and the photograph is labelled "Foto
ilustrasi". Boldness is spent there; everything around it stays disciplined.

**Why it fits procurement.** Procurement officers look for order, a verifiable identity and
clarity. The page shows the categories plainly and routes procurement to the client's real SIPLah
store. It sets out the company's identity like a document, with no claims, numbers or badges it
cannot substantiate.

## 2. Identity rules

**Each precision device appears once, in a fixed place:**

| Device                                    | Where                                    | Rule                         |
| ----------------------------------------- | ---------------------------------------- | ---------------------------- |
| Annotation markers                        | Hero photograph only                     | Maximum two; specified in §8 |
| Ruler                                     | Directly under the hero, full width      | Nowhere else                 |
| Letterhead rule (3px, 3px gap, 1px; navy) | Top of the data sheet; top of the footer | Nowhere else                 |
| Crop-mark corners                         | Data sheet only                          | 10px arms, 2px navy          |
| Dashed flow line with diamonds            | Procurement flow only                    | Joins the diamond centers    |
| Contour locator                           | Contact only                             | Labelled as a diagram        |

**Color mass, top to bottom:**

1. ivory header and hero;
2. ivory profile;
3. paper catalogue;
4. navy procurement band;
5. ivory data sheet section;
6. midnight contact band;
7. ivory footer.

There are exactly two dark bands.

**Other rules:**

- **Brass** is an accent: buttons, markers, the flow line, and labels on dark. As text it appears
  only on navy or midnight. On light surfaces use **brass-deep** for labels, icons and the focus
  ring.
- **Logo:** the official full-color artwork only, on ivory (header and footer). Never on navy,
  midnight or a photograph. No monochrome variant is needed.
- **Shape:**
  - a 4px radius on buttons only; photographs and panels are square;
  - circles only for the menu button and the markers;
  - no drop shadows (the header hairline is a 1px line), no blur, no glass;
  - the only gradient is the functional scrim behind the mobile hero actions.
- **Photography** follows §7: one graded family, crop-only, always labelled illustrative.
- **Section labels** (brass-deep, a 24px rule, then the sentence-case section name) repeat the
  navigation names, so the menu and the page share one vocabulary. They are the only text placed
  above a heading.
- **Template tells, rejected:**
  - uppercase or tracked eyebrows;
  - numbering of things that are not a sequence;
  - middle-dot meta strings;
  - `→` appended to text (the external-link glyph `↗` is allowed);
  - one italic or colored word inside a headline;
  - identical rounded cards with soft shadows;
  - stats or counters, badges and seals;
  - logo walls, testimonials, pricing UI;
  - looping decorative animation.
- **Copy** is Indonesian and comes only from `src/content/` (see §13).

## 3. Typography

| Family     | Designer and license | Axes used                     | Role                                 |
| ---------- | -------------------- | ----------------------------- | ------------------------------------ |
| Archivo    | Omnibus-Type, OFL    | `wdth` 62–125, `wght` 100–900 | Display, headings, text, UI and data |
| Newsreader | Production Type, OFL | `opsz` 6–72, `wght`           | The profile statement only           |

Width is part of the voice: **125%** (Expanded) for display and section headings, **118%** for
titles and values, **112%** for labels, buttons and navigation, and **100%** for running text.

**Loading (Phase 4):** `next/font/google`, self-hosted at build, `latin` subset, `display: "swap"`.

```ts
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false, // below the fold
});
```

Geist (provisional since Phase 1) is removed.

### Type scale

Fluid sizes run from 360px to their cap. The line height is 1.6 unless stated.

| Token       | Family, width, weight              | Size at 360 → cap           | CSS                                        | Line height | Tracking |
| ----------- | ---------------------------------- | --------------------------- | ------------------------------------------ | ----------- | -------- |
| `display`   | Archivo 125% 600                   | 32 → 54px                   | `clamp(2rem, 1.3rem + 2.9vw, 3.4rem)`      | 1.03        | −0.032em |
| `h2`        | Archivo 125% 600                   | 30 → 56px                   | `clamp(1.875rem, 1.15rem + 2.9vw, 3.5rem)` | 1.03        | −0.032em |
| `statement` | Newsreader 300, optical size auto  | 26 → 48px                   | `clamp(1.625rem, 1.1rem + 2.15vw, 3rem)`   | 1.18        | −0.012em |
| `menu`      | Archivo 125% 600                   | 28px                        | `1.75rem`                                  | 1.2         | −0.03em  |
| `title`     | Archivo 118% 600                   | 20px; 24px ≥ 1024           | `1.25rem` / `1.5rem`                       | 1.15        | −0.02em  |
| `step`      | Archivo 118% 600                   | 19px                        | `1.1875rem`                                | 1.25        | −0.015em |
| `value`     | Archivo 118% 600                   | 17px                        | `1.0625rem`                                | 1.4         | −0.01em  |
| `data`      | Archivo 100% 500, tabular figures  | 17px                        | `1.0625rem`                                | 1.5         | 0        |
| `body`      | Archivo 100% 400                   | 16px; hero line 17px ≥ 1024 | `1rem` / `1.0625rem`                       | 1.6         | 0        |
| `ui`        | Archivo 112% 600 (desktop nav 500) | 15px; menu button 14px      | `0.9375rem` / `0.875rem`                   | 1.2         | 0        |
| `label`     | Archivo 112% 500                   | 13px                        | `0.8125rem`                                | 1.35        | +0.01em  |

`display` reaches its cap at about 1160px and `h2` at about 1300px.

**Rules:**

- **Wrapping:** headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
  Hyphenation stays manual, because browser hyphenation for Indonesian is unreliable.
- **Headline lines:** the hero headline sets in 5 lines at 360px, 4 lines at 390–430px, 3 lines
  at 768px, 5 lines at 1024px and 4 lines at 1440px. A replacement headline must stay at or under
  62 characters and at or under 5 lines at 360px.
- **Measure:** running text ≤ 34rem; hero line ≤ 30rem; ledes ≤ 32rem.
- **Headings:** there is one `h1` (hero). Each section has one `h2`; the profile statement is that
  section's `h2`. Category titles are `h3`.
- **No emphasis tricks:** no italics or color accents inside headings.
- **Labels:** sentence case, never uppercase.
- **Minimums:** the smallest running text on mobile is 16px; labels are 13px.

## 4. Color

| Token          | Hex       | Role                                                               |
| -------------- | --------- | ------------------------------------------------------------------ |
| `ivory`        | `#F2EEE6` | Page ground: header, hero, profile, data section, footer           |
| `paper`        | `#FAF8F4` | Catalogue band; the data sheet                                     |
| `stone`        | `#DED8CC` | Loading tone behind light photographs                              |
| `navy`         | `#0E1D2D` | Text; procurement band; primary buttons on light; letterhead rule  |
| `midnight`     | `#08131F` | Contact band; photo plates and scrim; loading tone behind the hero |
| `raised`       | `#142A3F` | Navy-button hover; locator panel                                   |
| `brass`        | `#C9A060` | Brass buttons; markers; flow line; labels and focus on dark        |
| `brass-hi`     | `#DDB979` | Brass-button hover                                                 |
| `brass-deep`   | `#7A5A28` | Section labels, icons and focus ring on light                      |
| `slate`        | `#4E6175` | Secondary text and labels on light                                 |
| `mist`         | `#A9B6C4` | Secondary text and labels on dark                                  |
| `hair`         | navy 14%  | Dividers on light (decorative)                                     |
| `hair-inverse` | ivory 14% | Dividers on dark (decorative)                                      |

**Overlays on photographs**, always midnight:

| Overlay     | Value                                                       | Use                            |
| ----------- | ----------------------------------------------------------- | ------------------------------ |
| Label plate | midnight 82%                                                | Annotation labels              |
| Chip plate  | midnight 75%                                                | "Foto ilustrasi" chip          |
| Scrim       | midnight 92% → 55% (at 55% height) → 0, over the bottom 46% | Mobile and tablet hero actions |
| Ghost fill  | midnight 18%                                                | Ghost button at rest           |

**Semantic aliases for `src/app/globals.css` (Phase 4).** These replace the Phase 1 tokens
(`ink`, `porcelain`, `champagne`, and so on):

| Alias             | Value        | Alias                     | Value              |
| ----------------- | ------------ | ------------------------- | ------------------ |
| `surface`         | ivory        | `text`                    | navy               |
| `surface-alt`     | paper        | `text-muted`              | slate              |
| `surface-inverse` | navy         | `text-inverse`            | ivory              |
| `surface-deep`    | midnight     | `text-muted-inverse`      | mist               |
| `surface-raised`  | raised       | `accent`                  | brass              |
| `line`            | hair         | `accent-text`             | brass-deep         |
| `line-inverse`    | hair-inverse | `focus` / `focus-inverse` | brass-deep / brass |

### Contrast (measured, WCAG 2.x)

| Pair                                           | Ratio  | Use                                        |
| ---------------------------------------------- | ------ | ------------------------------------------ |
| navy on ivory                                  | 14.7:1 | Headings, body                             |
| navy on paper                                  | 16.1:1 | Catalogue, data sheet                      |
| slate on ivory                                 | 5.5:1  | Secondary text, labels                     |
| slate on paper                                 | 6.0:1  | Card summaries, data labels                |
| brass-deep on ivory                            | 5.5:1  | Section labels, focus ring                 |
| brass-deep on paper                            | 6.0:1  | Section labels, focus ring                 |
| navy on brass                                  | 7.0:1  | Brass button                               |
| navy on brass-hi                               | 9.2:1  | Brass button, hovered                      |
| ivory on navy                                  | 14.7:1 | Navy band, navy button                     |
| ivory on raised                                | 12.7:1 | Navy button hovered, locator caption       |
| ivory on midnight                              | 16.2:1 | Contact band                               |
| mist on navy                                   | 8.3:1  | Ledes and labels on navy                   |
| mist on midnight                               | 9.1:1  | Ledes and labels on midnight               |
| mist on raised                                 | 7.1:1  | Locator caption                            |
| brass on navy                                  | 7.0:1  | Section labels, focus ring on dark         |
| brass on midnight                              | 7.7:1  | Section labels, focus ring on dark         |
| ivory on label plate (worst case: white photo) | 9.5:1  | Annotation labels                          |
| ivory on chip plate (worst case: white photo)  | 7.3:1  | "Foto ilustrasi" chip                      |
| Line-button outline (navy 55%) on ivory        | 3.7:1  | Non-text boundary                          |
| Ghost-button outline (ivory 42%) on midnight   | 3.7:1  | Non-text boundary                          |
| ~~brass on ivory~~                             | 2.1:1  | **Never** for text, focus or meaningful UI |

## 5. Layout, spacing and grid

| Token           | 360 → cap        | CSS                                      |
| --------------- | ---------------- | ---------------------------------------- |
| Page margin     | 20 → 72px        | `clamp(1.25rem, 0.2rem + 4.3vw, 4.5rem)` |
| Frame           | 1440px, centered | `max-width: 90rem`                       |
| Section padding | 76 → 160px       | `clamp(4.75rem, 2.7rem + 8.4vw, 10rem)`  |
| Gutter (≥ 1024) | 32px             | `2rem`                                   |

The page margin is 20px at 390, 36px at 768, 47px at 1024 and 65px at 1440.

**Grid:**

- **Below 1024:** a single column. Photographs bleed edge to edge by negating the page margin.
- **From 1024:** 12 columns with 32px gutters, in asymmetric splits:

  | Section     | Copy        | Media                      |
  | ----------- | ----------- | -------------------------- |
  | Hero        | columns 1–6 | photo in columns 7–12      |
  | Profile     | columns 1–6 | photo in columns 8–12      |
  | Procurement | columns 1–5 | flow panel in columns 7–12 |
  | Contact     | columns 1–5 | locator in columns 7–12    |
  | Data        | columns 1–4 | sheet in columns 6–12      |

  Hero and profile photographs bleed to the right edge of the frame.

- **At 1920:** the frame stays 1440px wide and centered. The hero photograph ends at the frame
  edge, leaving ivory beyond it, as approved.

**Other rules:**

- **Breakpoints:** the existing Tailwind tokens: base 360, `xs` 430, `md` 768, `lg` 1024, `2xl`
  1440 and `3xl` 1920.
- **Alignment:** everything is left-aligned. Button labels are centered within their buttons.
- **Touch targets:**
  - buttons are 54px tall;
  - text links have 48px hit areas;
  - the menu button, footer links and the desktop header button are 44–46px.
- **Anchor offset:** `scroll-padding-top` is 72px below 1024 and 88px from 1024.

## 6. Sections (mobile first)

Copy keys refer to `src/content/` as it will be after Phase 4 (§13).

### 6.1 Header and menu

**Header:**

- **Bar:** sticky, ivory, 64px tall (80px from 1024). A 1px `hair` line appears once the page
  has scrolled (motion M6).
- **Logo:** official horizontal artwork linking to the top, with the label "LATANSA, ke beranda".
  It is 140px wide from 360, 148px from 430 and 168px from 1024.
- **Below 1024:** a "Menu" button: a `ui` 14px label, then a 44px navy circle with two 1.5px
  ivory bars. It toggles to "Tutup".
- **From 1024:** an inline nav (Profil, Bidang usaha, Pengadaan, Data perusahaan), `ui` 500, 32px
  apart, with an underline that draws on hover. It is followed by a 46px navy "Hubungi kami"
  button that scrolls to `#kontak`. The menu button is hidden.

**Menu sheet (below 1024):**

- **Layout:** fixed under the header down to the bottom of the viewport, navy. Padding is 24px
  top, the page margin at the sides and 32px bottom.
- **Links:** five links in `menu` type, in 64px rows with `hair-inverse` dividers. Each has a
  right-aligned `label` sub-label in mist:

  | Link            | Sub-label       |
  | --------------- | --------------- |
  | Profil          | Tentang kami    |
  | Bidang usaha    | Lima kategori   |
  | Pengadaan       | SIPLah          |
  | Data perusahaan | Identitas usaha |
  | Kontak          | Bantul, DIY     |

- **Foot:** the primary contact action (§6.9), then the address in 14px mist.
- **Behavior:**
  - dialog semantics;
  - focus is trapped inside;
  - Esc, "Tutup" and link activation close it;
  - body scroll is locked and the rest of the page is inert;
  - focus returns to the Menu button on close.

### 6.2 Hero

**Mobile (360–767):**

1. **Copy:** 28px top padding. The `display` headline is the `h1`. The hero line follows 14px
   below, in `body` slate, at most 30rem wide.
2. **Photo H:**
   - 24px below the line, full bleed, 4:5;
   - focal point (`object-position`) 55% 50%;
   - midnight loading tone.
3. **Overlays on the photo:**
   - **Chip:** "Foto ilustrasi", 14px from the top, at the page margin. It uses `label` type in
     ivory on the chip plate (5px × 9px padding) with an 11px brass crosshair glyph.
   - **Annotation A1:** "Komputer & TI" (§8).
   - **Scrim:** over the bottom 46%.
   - **Actions:** on the scrim, 20px from the bottom, inset by the page margin. They stack with a
     10px gap, full width:
     - the primary contact action in brass;
     - the ghost "Buka toko SIPLah" (external).
4. **Meta row:** under the photo, in `label` slate. It shows a brass-deep pin with "Kabupaten
   Bantul, DIY" on the left and "SIPLah Toko Ladang" on the right. Padding is 16px top and 20px
   bottom.
5. **Ruler:** full viewport width, 14px tall, bottom-aligned:
   - major ticks every 48px: 1px, navy 55%, 14px tall;
   - minor ticks every 8px: 1px, navy 28%, 7px tall.

**First screens:**

- **390×844:** the headline, hero line, photograph, A1 and both actions.
- **360×780:** the headline, line, photograph, A1 and the primary action.

**Tablet (768–1023):**

- The photograph becomes **3:2** with focal point 55% 50% (delta D6).
- The actions sit side by side on the scrim, at their natural width, left-aligned.
- At 768×1024 the whole hero, including the meta row and ruler, is in the first screen.

**Desktop (≥ 1024):**

- **Grid:** 12 columns, items vertically centered, 40px top and 48px bottom padding.
- **Copy (columns 1–6, 16px right padding):**
  - the headline;
  - the hero line in 17px, 20px below;
  - the actions 36px below, 12px apart: the primary contact action in navy, then the outlined
    "Buka toko SIPLah" (external);
  - a location row 40px below: a `hair` top rule, 20px top padding and two pairs 32px apart.
    Each pair is a `label` slate caption over a 15px Archivo 118% 600 navy value:
    "Berkedudukan di / Kabupaten Bantul, DIY" and "Kanal pengadaan / SIPLah Toko Ladang".
- **Photo H (columns 7–12):** bleeds to the frame's right edge at 6:5.4, focal point 100% 50%.
  There is no scrim and no actions on the photo. The chip sits 20px from the left, and both
  annotations, A1 and A2, show.
- **Below the hero:** the meta row is hidden, because the location row replaces it. The ruler
  remains.
- **First screen:** at 1440×900, the whole hero with both annotations.

### 6.3 Profil

**Mobile:**

- **Section label** "Profil perusahaan".
- **Statement:** the `statement` `h2`, 20px below, from `positioning.profile[0]`.
- **Photo E1:** 36px below, full bleed, 3:2, focal point 50% 30%, with a photo reveal.
- **Body:** `positioning.profile[1]`, 32px below, in slate, at most 34rem wide.
- **Facts:** a `<dl>` 32px below, under a 1px navy top rule. Rows have 18px padding and `hair`
  dividers. Each row is a `label` slate term over a `value` description:

  | Term            | Value                                         |
  | --------------- | --------------------------------------------- |
  | Berkedudukan di | `address.regionShort`                         |
  | Bentuk usaha    | `legalForm`                                   |
  | Kanal pengadaan | Publishable channel names, joined with commas |

**From 768:** the facts sit in three columns, 32px apart.

**From 1024:**

- The statement takes columns 1–6. The body and facts take columns 1–6 in the next row.
- The photo takes columns 8–12 across all rows. It bleeds to the frame edge at 4:5, focal point
  40% 50%, offset 72px down.

### 6.4 Bidang usaha

The band is paper.

**Mobile:**

- **Heading block:**
  - section label "Bidang usaha";
  - `h2` "Lima kategori untuk kebutuhan kerja instansi.";
  - lede in slate.
- **Catalogue:** a horizontal scroll-snap row, 40px below the heading block.
  - The scroller bleeds to the viewport edges, padded and snap-padded by the page margin.
  - Cards are 80% wide (74% from 430, 44% from 768), 16px apart.
  - Each card is an `<article>`: a 4:5 photo with a photo reveal, the `title` (`h3`) 18px below,
    and a 16px slate summary 8px below.
- **Meter:** 28px below the row, `aria-hidden`.
  - Five 2px bars: inactive bars are 24px of `hair`; the active bar is 48px of navy.
  - A `label` "Geser" sits at the right.
- **Accessibility:** the scroller is a focusable region (`tabindex="0"`) labelled "Kategori bidang
  usaha, geser untuk melihat". It scrolls with the keyboard. There is no auto-advance.

**From 1024:**

- **Heading block:** the section label and `h2` take columns 1–7. The lede takes columns 9–12,
  aligned to the bottom.
- **Mosaic:** the row becomes a mosaic, 64px below, with 72px between rows. The meter is hidden,
  titles are 24px and 20px below the photo, and summaries are at most 30rem.

| Card | Category                         | Columns | Photo ratio | Vertical offset |
| ---- | -------------------------------- | ------- | ----------- | --------------- |
| C1   | Komputer & Teknologi Informasi   | 1–7     | 3:2         | 0               |
| C2   | Alat Tulis & Perlengkapan Kantor | 8–12    | 1:1         | 96px            |
| C3   | Elektronik & Perlengkapan Teknis | 1–4     | 4:5         | 0               |
| C4   | Peralatan Umum Kelembagaan       | 5–9     | 4:3         | 80px            |
| C5   | Barang & Jasa Pendukung Terpilih | 10–12   | 3:4         | 24px            |

Titles and summaries come from `categories[]`, in content order. The heading says "Lima" because
there are five categories; if the count changes, the heading copy changes with it.

### 6.5 Pengadaan (navy band)

**Mobile:**

- **Heading block:**
  - section label "Kanal pengadaan" in brass;
  - `h2` "Pengadaan melalui SIPLah Toko Ladang.";
  - lede in mist.
- **Flow:** an `<ol>` 40px below, labelled "Alur pengadaan melalui SIPLah".
  - Three steps, 28px apart.
  - Each step has a 15px diamond (1px brass outline, navy fill) and a dashed brass line (6px
    dash, 5px gap) joining the **diamond centers** vertically. The middle diamond is filled
    brass.
  - Each step has a `step` title over a mist `label`:

  | Step title             | Label                     |
  | ---------------------- | ------------------------- |
  | CV. Latansa Jogjakarta | Pemasok                   |
  | SIPLah Toko Ladang     | Toko resmi kami           |
  | Satuan pendidikan      | Pengadaan barang dan jasa |

- **Actions:** 40px below, 8px apart:
  - the brass button "Buka toko di SIPLah Toko Ladang" with an external glyph, full width (auto
    from 768);
  - the text link "Diskusikan kebutuhan lain", which scrolls to `#kontak`.

**From 1024:**

- The heading block takes columns 1–5 in row 1 and the actions take columns 1–5 in row 2.
- **Flow panel:** columns 7–12 across both rows, vertically centered.
  - A 1px `hair-inverse` frame with 40px, 36px and 44px padding (top, sides, bottom).
  - The caption "Alur pengadaan" (`label` mist) is set into the top edge.
  - The steps sit in three columns, and the dashed line runs horizontally **through the diamond
    centers**, from the first to the last (delta D7).

**Channel rules:**

- The section renders only while SIPLah is publishable.
- The flow describes SIPLah only.
- Other verified channels, such as Mbizmarket, appear as extra external text links under the
  button, for example "Lihat profil di Mbizmarket". They never appear in the flow.

### 6.6 Data perusahaan

**Mobile:**

- **Heading block:**
  - section label "Data perusahaan";
  - `h2` "Identitas usaha.";
  - lede "Informasi identitas perusahaan untuk keperluan administrasi pengadaan."
- **Sheet:** 36px below.
  - A paper panel with a 1px `hair` frame and 10px crop-mark corners (2px navy).
  - Padding is 20px at the top and sides and 8px at the bottom.
  - The letterhead rule runs along its top.
- **Rows:** a `<dl>` with 16px row padding and `hair` dividers. Each row is a `label` slate term
  over a `data` description.

  | Term              | Description                                             | Emphasis         |
  | ----------------- | ------------------------------------------------------- | ---------------- |
  | Nama perusahaan   | `legalName`                                             | Archivo 118% 600 |
  | Bentuk usaha      | `legalForm`                                             | —                |
  | Status Perpajakan | `taxStatus` value: exactly "Pengusaha Kena Pajak (PKP)" | Archivo 118% 600 |
  | Alamat            | Full `address`                                          | —                |
  | Kanal pengadaan   | Publishable channel names                               | —                |

  There is no NPWP row, ever, and no badge, seal or checkmark anywhere in the sheet.

**From 768:** each row becomes a grid of a 14rem term and the description, baseline-aligned, 24px
apart.

**From 1024:** the heading block takes columns 1–4. The sheet takes columns 6–12, with 32px top,
40px side and 16px bottom padding.

### 6.7 Kontak (midnight band)

**Mobile:**

- **Heading block:**
  - section label "Kontak" in brass;
  - `h2` "Diskusikan kebutuhan pengadaan Anda.";
  - lede in mist.
- **Actions:** 32px below, stacked 10px apart, following §6.9:
  - the primary contact action in brass;
  - a ghost "Kirim email" when both WhatsApp and email are publishable.

  Each action is omitted while its fact is missing.

- **Address block:** 32px below.
  - The `label` "Alamat kantor" in mist.
  - An `<address>` at 17px in ivory, on two lines: street, village and district, then regency,
    province and postal code.
  - "Buka di Google Maps", an external text link, only when `mapsUrl` is publishable.
  - "Jam operasional" rows, only when `officeHours` is publishable.
- **Locator:** 44px below.
  - A raised panel with a 1px `hair-inverse` frame, at 4:3.
  - The contour diagram: 16 rings with every fourth stronger, a faint 50-unit grid and a brass
    crosshair at the center.
  - A caption at the bottom left: "Penanda lokasi (diagram)" in mist. The coordinates follow in
    ivory with tabular figures, only when the `coordinates` fact is publishable.
  - The locator is `aria-hidden`; the address is the accessible location.

**From 768:** the actions sit side by side.

**From 1024:** the copy takes columns 1–5 and the locator takes columns 7–12, top-aligned.

### 6.8 Footer

- **Band:** ivory, with 40px top and 32px bottom padding. The letterhead rule closes the
  document at the top.
- **Logo:** 152px, 28px below the rule.
- **Nav:** Profil, Bidang usaha, Pengadaan, Data perusahaan, Kontak. It is a two-column grid of
  44px rows on mobile, and inline and right-aligned from 1024, 36px apart.
- **Legal lines:** 32px below, under a `hair` rule with 20px padding, in 13px slate:
  - "© {build year} CV. Latansa Jogjakarta. Kabupaten Bantul, Daerah Istimewa Yogyakarta."
  - "Foto pada situs ini bersifat ilustratif (Unsplash License) dan bukan dokumentasi kegiatan
    perusahaan."

  From 1024 the two lines sit in two columns. An optional photo-credit line follows §7.

### 6.9 Contact action logic (all placements)

The same rule applies in the hero, the menu sheet and the contact band:

- **WhatsApp publishable:** "Hubungi via WhatsApp", with the WhatsApp glyph, linking to
  `https://wa.me/<number>` in a new tab.
- **Otherwise, email publishable:** "Kirim email", with a mail glyph, linking to `mailto:`.
- **Launch gate:** at least one must exist; `content:check --strict` enforces it.

External links use `target="_blank"` and `rel="noopener noreferrer"`. They show the `↗` glyph
(`aria-hidden`) and announce "(membuka situs eksternal)" to screen readers. `mailto:` links open in
place.

## 7. Imagery

All photographs are licensed under the **Unsplash License**. Provenance, photographers, image IDs
and the exact grade are in [SOURCES.md](design/concepts/photos/SOURCES.md) and
[image-assets.md](image-assets.md). Every photo page is re-verified before launch (Phase 6).

**Slots.** The focal point applies at every breakpoint unless stated. "Rendered width" is the
cover-scaled image width in CSS pixels, measured on the board; it drives `sizes`.

| Slot | Master           | Mobile | Tablet | Desktop | Focal point               | Rendered width at 390 / 1024 / 1440 | `sizes`                                                                                |
| ---- | ---------------- | ------ | ------ | ------- | ------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| H    | `hero-desk-crop` | 4:5    | 3:2    | 6:5.4   | 55% 50%; desktop 100% 50% | 627 / 566 / 807                     | `(min-width: 1440px) 815px, (min-width: 1024px) 56vw, (min-width: 768px) 100vw, 161vw` |
| E1   | `arch-atrium`    | 3:2    | 3:2    | 4:5     | 50% 30%; desktop 40% 50%  | 390 / 768 / 1099                    | `(min-width: 1440px) 1113px, (min-width: 1024px) 76vw, 100vw`                          |
| C1   | `it-keyboard`    | 4:5    | 4:5    | 3:2     | 50% 50%                   | 525 / 520 / 742                     | `(min-width: 1440px) 785px, (min-width: 1024px) 54vw, (min-width: 768px) 74vw, 135vw`  |
| C2   | `office-ruler`   | 4:5    | 4:5    | 1:1     | 55% 40%                   | 525 / 543 / 781                     | same as C1                                                                             |
| C3   | `elec-board`     | 4:5    | 4:5    | 4:5     | 62% 50%                   | 525 / 532 / 769                     | same as C1                                                                             |
| C4   | `inst-chairs`    | 4:5    | 4:5    | 4:3     | 38% 50%                   | 622 / 483 / 694                     | `(min-width: 1440px) 695px, (min-width: 1024px) 48vw, (min-width: 768px) 87vw, 160vw`  |
| C5   | `goods-boxes`    | 4:5    | 4:5    | 3:4     | 45% 50%                   | 525 / 409 / 600                     | `(min-width: 1440px) 600px, (min-width: 1024px) 42vw, (min-width: 768px) 74vw, 135vw`  |

The spare `it-laptop` is not used on the page.

**Alt text** is in Indonesian and starts with "Foto ilustrasi:":

| Slot | Alt text                                                                            |
| ---- | ----------------------------------------------------------------------------------- |
| H    | Foto ilustrasi: laptop, cangkir, buku catatan, dan pensil di atas meja kerja gelap. |
| E1   | Foto ilustrasi: atrium kaca modern dengan cahaya alami.                             |
| C1   | Foto ilustrasi: papan ketik putih di atas permukaan hitam.                          |
| C2   | Foto ilustrasi: buku catatan, pena, penggaris baja, dan papan ketik.                |
| C3   | Foto ilustrasi: detail papan sirkuit elektronik.                                    |
| C4   | Foto ilustrasi: kursi rapat di sisi meja konferensi.                                |
| C5   | Foto ilustrasi: dua kotak kardus polos bertumpuk.                                   |

**Rules:**

- **Loading:** only H is high priority (`fetchpriority="high"`, preloaded); every other photo is
  lazy. Every `<img>` carries its intrinsic `width` and `height`. The frame shows its loading tone
  (stone, or midnight for H) only until the image decodes. No empty frame ever remains at rest.
- **Format and budgets:** derivatives, formats and byte budgets are in
  [image-assets.md](image-assets.md). Derivatives never upscale.
- **Labelling:** photographs are illustrative and never documentary. The hero chip and the footer
  line say so.
- **Credits:** a credit line ("Foto: [photographer] / Unsplash") is optional. Unsplash appreciates
  it but does not require it. If used, it goes in the footer.

## 8. Annotation system

**Parts:**

- **Marker:**
  - a 14px circle with a 1.5px brass ring;
  - a brass 25% fill and a 4px brass 12% halo;
  - an 8px brass core.
- **Leader:** a 12px, 1px brass line that leaves a 6px gap between the marker and the label.
- **Label:**
  - `label` type at 600 in ivory, no wrapping;
  - on the label plate, with a 2px brass left edge and 8px × 12px padding;
  - placed left of its marker by default, or right of it (variant `r`).

**Anchors** are defined in the hero master's pixels (1508 × 1172). They are converted to box
percentages for each crop with the `object-fit: cover` math, so every marker stays on its object.

| Marker | Label               | Object              | Source anchor                    | Mobile 4:5 (55% 50%) | Tablet 3:2 (55% 50%) | Desktop 6:5.4 (100% 50%) |
| ------ | ------------------- | ------------------- | -------------------------------- | -------------------- | -------------------- | ------------------------ |
| A1     | Komputer & TI       | Laptop keyboard     | (1040, 300); desktop (1075, 300) | 77.5% / 25.6%        | 69.0% / 21.6%        | 66.7% / 25.6%            |
| A2     | Alat tulis & kantor | Pencil and notebook | (774, 871), label to the right   | —                    | —                    | 43.6% / 74.3%            |

**Rules:**

- **Count:** two markers at most, on the hero only. Below 1024 only A1 shows, because A2 would
  collide with the actions.
- **What a marker may name:** each marker names a category in short form and points at an object
  of that category. Never the mug, never something LATANSA does not supply.
- **Photo changes:** if the hero photograph or its crop changes, the anchors are re-measured. A
  marker that cannot sit on a matching object is removed rather than misplaced.
- **Accessibility:** the annotation layer is `aria-hidden`; the categories are listed in full in
  Bidang usaha.

## 9. Accessibility (WCAG 2.2 AA)

**Structure:**

- `lang="id"`.
- A skip link, "Langsung ke konten utama", is the first focusable element. It becomes visible on
  focus as a navy button at the top left.
- Landmarks: `header`, the nav "Utama", the menu nav, `main`, and the footer nav "Navigasi
  bawah". Each section is labelled by its `h2`.
- **Headline split:** the `h1` words are split into masked spans at build time for motion M3. The
  spans are `aria-hidden`, and a visually hidden copy of the full sentence is the accessible text.

**Interaction:**

- **Focus:** a 2px solid ring with a 3px offset, in brass-deep on light surfaces and brass on dark
  surfaces and on the photo scrim. It is never removed.
- **Targets:** every target is at least 44 × 44px; most are 48px or more.
- **Decorative elements** are `aria-hidden`: the ruler, letterhead rules, crop corners, annotation
  layer, locator diagram and meter.

**Display and media:**

- Reduced motion shows final states ([motion-spec.md §5](motion-spec.md#5-reduced-motion)).
- The page reflows at 320px and at 200% zoom without horizontal scrolling. Sizes use rem units.
- Every text pair comes from the §4 contrast table.
- The logo alt text is "LATANSA — CV Latansa Jogjakarta". Photo alt texts are in §7.

## 10. Performance budgets

Measured on the exported `out/` build in Phase 6.

| Metric                                | Target                                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| LCP (mobile, Lighthouse simulated)    | ≤ 2.5s. The LCP element is the hero photograph on mobile and desktop                          |
| CLS                                   | < 0.05                                                                                        |
| INP                                   | < 200ms                                                                                       |
| JavaScript beyond the Next.js runtime | ≤ 15 KB gzip (menu, reveals, meter, header sentinel)                                          |
| Fonts                                 | Archivo (latin; `wdth` + `wght`) preloaded; Newsreader (latin; `opsz` + `wght`) not preloaded |
| First-view transfer (mobile)          | ≤ 500 KB target, including the hero derivative                                                |
| Images                                | Per [image-assets.md](image-assets.md)                                                        |

## 11. Acceptance criteria (Phase 4 and 5 sign-off)

A build is accepted only when **all** of these hold:

1. **First screens:**
   - 390×844: the headline, line, photograph, A1 and both actions;
   - 360×780: the headline, line, photograph, A1 and the primary action;
   - 768×1024: the whole hero;
   - 1440×900: the whole hero with both annotations.
2. **Fidelity:** side-by-side screenshots against the approved board at 360, 390, 768 and 1440
   match it, except for the deltas in §12.
3. **Annotations:** the markers sit on their objects at every width from 360 to 1920.
4. **No template tells** (§2): no cards with shadows, no gradients except the scrim, no uppercase
   eyebrows, no stats or badges.
5. **Color:** only the tokens are used, brass text appears only on dark, and the §4 table holds.
6. **Content:**
   - every fact is rendered through the provenance rules;
   - the PKP wording is exact, and no NPWP appears;
   - no prices or commerce language;
   - hidden facts leave no empty UI, and no stand-in links remain.
7. **Responsive ladder:** screenshots at 360, 390, 430, 768, 1024, 1440 and 1920 show intentional
   compositions with no horizontal overflow.
8. **Motion:**
   - only the motions in [motion-spec.md](motion-spec.md) exist;
   - reduced motion shows final states;
   - there is no layout shift and no scroll listener.
9. **Logo integrity:** the official artwork, in the right variant, only on ivory.
10. **Budgets:** the §10 budgets are met on `out/`.
11. **Accessibility:**
    - a keyboard-only walkthrough works: skip link, menu trap and focus return, visible focus,
      the carousel reachable;
    - axe-core reports no serious or critical issues.

## 12. Deltas from the approved board

The build follows the board except in these places. Each change fixes a defect, meets a project
rule or replaces a stand-in.

| #   | Board                                                                            | Build                                                                                                                         | Why                                                                 |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| D1  | Brass focus ring everywhere                                                      | Brass-deep on light surfaces, brass on dark                                                                                   | Brass on ivory is 2.1:1, below the 3:1 needed for a focus indicator |
| D2  | Chip plate at midnight 62%, text at ivory 90%                                    | Plate at midnight 75%, solid ivory text                                                                                       | 4.0:1 in the worst case; now 7.3:1 over any photograph              |
| D3  | Line-button outline at navy 40%                                                  | Navy 55%                                                                                                                      | 2.4:1; now 3.7:1 for the button boundary                            |
| D4  | Card summaries at 15px on mobile                                                 | 16px                                                                                                                          | Running text on mobile is at least 16px                             |
| D5  | Annotation labels and menu sub-labels at 12px                                    | 13px, the single label size                                                                                                   | Legibility; one label size                                          |
| D6  | Tablet hero photo at 4:5                                                         | 3:2 from 768 to 1023                                                                                                          | At 768×1024 the board pushed both actions below the first screen    |
| D7  | Desktop flow line floats 40px above the diamonds; step titles at line height 1.6 | The line runs through the diamond centers; titles at 1.25                                                                     | Board defect; the line should join the steps                        |
| D8  | Menu sub-label "Legalitas"                                                       | "Identitas usaha"                                                                                                             | "Legalitas" suggests that legal documents are published             |
| D9  | Scroll padding 72px at all widths                                                | 72px below 1024, 88px from 1024                                                                                               | The desktop header is 80px tall                                     |
| D10 | Nearly every block fades in on scroll                                            | Only heading groups and photographs reveal. Facts, the data sheet, actions, the address and flow steps are present on arrival | Identity data must never perform; less generic motion               |
| D11 | Desktop motion values on mobile                                                  | Shorter distances and smaller scale on mobile                                                                                 | Project rule: lighter mobile motion                                 |
| D12 | Scroll listeners for the header line and the meter                               | IntersectionObserver; the meter's bar-width change is contained (`contain: layout paint`)                                     | No scroll listeners; no page-level layout work during motion        |
| D13 | Stand-in contact buttons, Maps link and coordinates                              | Rendered only from publishable facts                                                                                          | Content policy: no stand-ins or empty links                         |
| D14 | Headline split into words by runtime JavaScript                                  | Split at build time with an accessible full-sentence alternative                                                              | No layout shift, no JS dependency, clean screen-reader output       |
| D15 | —                                                                                | Browser theme color and touch-icon background in ivory                                                                        | Matches the header                                                  |

## 13. Content changes for Phase 4 (no facts invented)

**Copy entries.** These are copy, not facts, and are taken from the approved board. Group them in
`src/content/` (for example a `copy` object):

| Group             | Entries                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero              | Headline (pending confirmation, see §14) and the hero line                                                                                                                                                 |
| Section labels    | Profil perusahaan, Bidang usaha, Kanal pengadaan, Data perusahaan, Kontak                                                                                                                                  |
| Section headings  | The Bidang usaha, Pengadaan, Data perusahaan and Kontak `h2`s and their ledes (§6)                                                                                                                         |
| Flow              | The three step titles and labels; the caption "Alur pengadaan"                                                                                                                                             |
| Actions and links | "Hubungi via WhatsApp", "Kirim email", "Buka toko SIPLah", "Buka toko di SIPLah Toko Ladang", "Diskusikan kebutuhan lain", "Buka di Google Maps", "Hubungi kami"                                           |
| Interface         | The menu labels and sub-labels, "Menu" / "Tutup", the skip link, "(membuka situs eksternal)", "Geser", "Foto ilustrasi", "Penanda lokasi (diagram)", "Alamat kantor", "Jam operasional", "Berkedudukan di" |
| Footer            | The imagery note                                                                                                                                                                                           |

**Changes to `company.ts`:**

- **`positioning.headline`:** replace it with the Concept C headline once the owner confirms it
  (§14). The current headline stays until then.
- **`address.regionShort`:** add "Kabupaten Bantul, DIY", a presentational short form of the
  client-provided address.
- **`mapsUrl` (new optional fact):** the Google Maps listing "Latansa Jogjakarta", with status
  `needs-confirmation` and `launch: "optional"`.
- **`coordinates` (new optional fact):** 7°57′41″ LS, 110°20′58″ BT, read from the same listing,
  with status `needs-confirmation` and `launch: "optional"`.
- **`officeHours`:** restructure into day-group rows. It stays `needs-confirmation`.

**Image manifest (`src/content/images.ts`):** one entry per slot. Each entry holds the file, alt
text, photographer, photo page, license and the date its page was last verified, so that imagery
has provenance like facts.

## 14. Open items for the owner

| Item                                                                                | Needed for                        |
| ----------------------------------------------------------------------------------- | --------------------------------- |
| Confirm the headline "Perangkat dan perlengkapan kerja untuk instansi dan lembaga." | Before Phase 6                    |
| Confirm the office coordinates, or drop them from the locator caption               | Optional                          |
| The official WhatsApp number and/or email address                                   | **Launch blocker** (at least one) |
| Confirm the Google Maps listing as the company's own                                | Optional                          |
| Confirm the office hours                                                            | Optional                          |
| Verify the Mbizmarket profile                                                       | Optional                          |
| Keep the Unsplash photographs at launch, or replace some later                      | Optional                          |

## 15. Phase 4 build notes

- **Tokens:** rewrite the `@theme` block in `src/app/globals.css` with §3–§5 (colors, aliases,
  fonts, easing). Remove the Phase 1 palette.
- **Fonts:** in `src/app/layout.tsx`, load Archivo and Newsreader as in §3 and remove Geist. Set
  `themeColor` to ivory `#F2EEE6`.
- **Icons:** update `scripts/brand-assets.mjs` so the apple-touch-icon background is ivory, then
  run `npm run brand:assets`.
- **Images:** add a sharp script that turns the masters into derivatives with the exact grade from
  [image-assets.md](image-assets.md).
- **Components:** server components by default. The only client components are the menu sheet,
  the reveal observer, the catalogue meter and the header sentinel (see
  [motion-spec.md §4](motion-spec.md#4-implementation)).
