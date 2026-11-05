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

> **Owner amendments, Phase 4 (2026-11-05).** These override the approved board and earlier
> versions of this spec:
>
> - **White canvas:** pristine white `#FFFFFF` replaces ivory for the main light sections and
>   dominates the composition. Navy and brass stay as controlled accents; the navy procurement
>   band and the midnight contact band remain for contrast and rhythm.
> - **Typography:** readability first. One refined modern sans-serif, **Plus Jakarta Sans**,
>   replaces Archivo and Newsreader.
> - **Contact:** the official WhatsApp is client-provided and live. The planned address
>   `info@latansajogja.co.id` is recorded as `pending-activation` and is not published until it
>   receives email.
> - **Headline:** used provisionally, still pending the client's final confirmation.
>
> The implemented build is the reference for these changes; see §12 (D16–D24).

> **Owner refinement brief, Phase 4 (2026-11-05, second pass).** Binding; it supersedes the
> matching parts of §2, §6, §7 and §8. The implemented build is the reference (D25–D35).
>
> - **Hero (§6.2):** a full-bleed photograph. The headline, line and both actions sit on its
>   navy-graded quiet side: the bottom on phones, the left from 768px. Phones use a tall crop
>   (`hero`, 1508 × 1465), and 768px up uses the wide crop (`hero-wide`, 2600 × 1201).
>   - The chip, the annotation markers and the ruler are removed: the hero carries only what
>     strengthens it. The annotation system (§8) is retired.
>   - On phones the hero is `clamp(33rem, 100svh − 4rem, 40rem)` tall, so the headline, the line
>     and both actions fit the first screen at 320×568, 375×667 and 390×844.
> - **Overview strip (new §6.2a):** under the hero, three entries: categories, the SIPLah channel,
>   WhatsApp. Each links to its section. From 1024px it is a white panel overlapping the
>   photograph's lower edge by 96px.
> - **Profile (§6.3):** the statement, body and atrium photograph only; the facts row moved into
>   the identity sheet.
> - **Categories (§6.4):** the phone and tablet carousel adds previous/next buttons, a "1 dari 5"
>   position and the meter; the cards are 82% wide (76% from 430). Desktop keeps the mosaic with
>   a 1.04 photo zoom on hover.
> - **Procurement (§6.5):** the page's one centered, symmetrical composition. The flow is
>   centered from 768px, with the line joining the three diamond centers.
> - **Identity (§6.6):** the legal name is the sheet's title; the particulars sit in two columns
>   (form and PKP status, channel and domicile), with the address full width.
> - **Contact (§6.7):** the Maps listing is owner-confirmed, so every Maps link opens it.
>   - The locator diagram is a link with a visible "Buka di Google Maps" label and shows the
>     coordinates.
>   - The WhatsApp number is a link.
> - **Footer (§6.8):** the letterhead rule, then identity (logo and the factual descriptor),
>   navigation, contact and location, and procurement, then © and "Kembali ke atas". There is no
>   imagery note. Email appears only once activated.
> - **Imagery (§7):** no visible photo label or disclaimer anywhere, by the owner's decision. Alt
>   text describes the scene without a "Foto ilustrasi:" prefix. Provenance stays in
>   `SOURCES.md` and `src/content/images.ts`, and no copy may present a photo as LATANSA's own
>   premises, staff, stock, deliveries, customers or projects.
> - **Phone calibration:**
>   - section padding `clamp(4.5rem, 2.6rem + 8vw, 10rem)`;
>   - display 30px at 320px, rising to 40px on phones;
>   - body 16px on phones;
>   - `h2` from 28px.
> - **Navigation:** the header and menu links mark the section in view (`data-current`, M19).
> - **Phone testing:** `next.config.ts` allows LAN origins for `next dev`. Next.js blocks dev
>   assets for other hosts, so a phone saw an unstyled, zoomed-out page. Sign-off uses the export
>   (`npm run build && npm run preview`, then the Network URL).

> **Phase 5 refinement (2026-11-05).** Browser QA on the exported build; the record and
> screenshots are in [qa/phase-5/](qa/phase-5/README.md). The implemented build is the reference
> (D36–D41).
>
> - **Hero on short phones:** a second navy grade follows the copy instead of the hero box (phones
>   only). Where the hero sits at its 33rem floor, as on an iPhone SE in Safari (375 × 547 with
>   toolbars), small Android phones (360 × 560) and 320 × 568, the headline rose over the bright
>   laptop lid at 2.6:1. Every headline word now measures at least 6.8:1 on the rendered photo.
> - **Light only:** `color-scheme: only light` (CSS and meta) opts the page out of forced
>   darkening, which put the logo on black and erased the outline button.
> - **Larger default text** (browser setting 20px or 24px): no horizontal overflow from 320px.
>   - The header logo scales down proportionally only when the enlarged Menu button leaves no
>     room. Default sizes are unchanged.
>   - The carousel meter compresses on narrow rows and gives way to "1 dari 5" below 17rem.
> - **Phone text:** footer and overview links and text are 16px on phones (15px from 1024px, the
>   header's `ui` size). Footer navigation links are at least 44px wide.
> - **Locator:**
>   - the caption sits on a navy fade, so contour lines no longer cross it;
>   - the "↗" after "Buka di Google Maps" shows inline (a descendant rule had pinned it over the
>     caption);
>   - the link's accessible name is its visible caption (WCAG 2.5.3).
> - **Identity sheet:** the `dl` holds only `div` groups of `dt` and `dd` (axe:
>   `definition-list`).
> - **Phone details:**
>   - no grey tap flash;
>   - text links dim while pressed;
>   - the skip link never exceeds the screen;
>   - the menu sheet uses `100dvh` and the bottom safe area.
> - **Text links (2026-11-06):** the 1px underline sits on the label's inline span
>   (`TextLinkLabel`), so a wrapped link is underlined line by line, never through the text; the
>   "↗" stays on the last line. Single-line links look as before.
> - **Footer at 1024–1279:** no spacer column before the navigation. The procurement group spans
>   three columns, so "SIPLah Toko Ladang" stays on one line. From 1280 the layout is unchanged.

> **Owner update: email active (2026-11-06).** The owner confirmed that Cloudflare Email Routing
> (Free) delivers `info@latansajogja.co.id` to the destination inbox, so `contact.email` is now
> `client-confirmed` and published in the Kontak band and the footer only (§6.7, §6.9 and §6.8).
>
> - **Kontak:** the ghost "Kirim email" action follows WhatsApp, and an "Email" line follows the
>   WhatsApp number.
> - **Footer:** the address follows the WhatsApp number, with a mail glyph in brass-deep.
> - **Hero, header and menu:** they keep WhatsApp as their single action.
> - **Links:** every `mailto:` opens in place. The address may wrap after the "@" on narrow lines.
> - **Receive-only:** Email Routing forwards inbound mail and sends nothing. No copy may promise a
>   reply from this address, and no form may send from it. The forwarding inbox is never recorded
>   or published.

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
  - confident, tightly set headlines;
  - measuring details: annotation markers, a ruler, crop marks, a letterhead rule, a flow
    diagram and a contour locator.
- **Terang (bright):**
  - a pristine white canvas;
  - generous, purposeful negative space;
  - a light editorial statement;
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

1. white header and hero;
2. white profile;
3. cloud catalogue band (a whisper of grey);
4. navy procurement band;
5. white data section;
6. midnight contact band;
7. white footer.

There are exactly two dark bands.

**Other rules:**

- **Brass** is an accent: buttons, markers, the flow line, and labels on dark. As text it appears
  only on navy or midnight. On light surfaces use **brass-deep** for labels, icons and the focus
  ring.
- **Logo:** the official full-color artwork only, on white (header and footer). Never on navy,
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

**One family: Plus Jakarta Sans** (Tokotype, Indonesia; OFL), variable weight 200–800. It was
designed in Indonesia for Jakarta's civic identity. Its open apertures and comfortable
proportions read well at 16–18px, and it stays polished at display sizes. One family keeps the
system calm and the page fast (one 27 KB font file for the latin subset).

**Loading:** `next/font/google`, self-hosted at build, `latin` subset, `display: "swap"`,
exposed as `--font-jakarta`.

### Type scale

Fluid sizes run from 360px to their cap. Tokens live in `src/app/globals.css`.

| Token       | Weight                | Size at 360 → cap           | CSS                                                                                               | Line height | Tracking |
| ----------- | --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- | ----------- | -------- |
| `display`   | 600                   | 34 → 60px                   | `clamp(2.125rem, 1.42rem + 3vw, 3.75rem)`; from 1024 `clamp(2.875rem, 0.72rem + 3.37vw, 3.75rem)` | 1.06        | −0.024em |
| `h2`        | 600                   | 30 → 48px                   | `clamp(1.875rem, 1.32rem + 2.25vw, 3rem)`                                                         | 1.1         | −0.022em |
| `statement` | 400; 300 from 1024    | 24 → 36px                   | `clamp(1.5rem, 1.15rem + 1.5vw, 2.25rem)`                                                         | 1.32        | −0.014em |
| `menu`      | 600                   | 26px                        | `1.625rem`                                                                                        | 1.2         | −0.025em |
| `title`     | 600                   | 20px; 22px from 1024        | `1.25rem` / `1.375rem`                                                                            | 1.3         | −0.015em |
| `step`      | 600                   | 19px                        | `1.1875rem`                                                                                       | 1.25        | −0.015em |
| `value`     | 600                   | 17px                        | `1.0625rem`                                                                                       | 1.375       | −0.01em  |
| `data`      | 500, tabular figures  | 17px                        | `1.0625rem`                                                                                       | 1.375       | 0        |
| `lead`      | 400                   | 18px (from 1024)            | `1.125rem`                                                                                        | 1.65        | 0        |
| `body`      | 400                   | 17px; hero line 16px phones | `1.0625rem`                                                                                       | 1.7         | 0        |
| `ui`        | 600 (desktop nav 500) | 16px; header 15px           | `1rem`                                                                                            | 1.25        | 0        |
| `label`     | 500–600               | 14px                        | `0.875rem`                                                                                        | 1.4         | +0.01em  |
| `small`     | 400                   | 13px (footer legal only)    | `0.8125rem`                                                                                       | 1.55        | 0        |

**Rules:**

- **Wrapping:** headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
  Hyphenation stays manual, because browser hyphenation for Indonesian is unreliable.
- **Headline lines** (as built, measured in Phase 5): the hero headline sets in 4 lines at
  320–390px, 768px and 1440–1920px, and in 3 lines at 430px and 1024px. A replacement headline
  must stay at or under 62 characters and at or under 5 lines at 360px.
- **Measure:** running text ≤ 34rem; hero line ≤ 30rem; ledes ≤ 34rem.
- **Headings:** there is one `h1` (hero). Each section has one `h2`; the profile statement is that
  section's `h2`. Category titles are `h3`.
- **No emphasis tricks:** no italics or color accents inside headings.
- **Labels:** sentence case, never uppercase.
- **Minimums:** running text is 16px on phones and 17px elsewhere; labels are 14px; only the
  footer's legal lines are 13px.

## 4. Color

White dominates. Navy and brass are controlled accents; the two dark bands carry contrast and
rhythm. Tailwind's default colors are removed (`--color-*: initial`), so only these tokens exist.

| Token          | Hex       | Role                                                               |
| -------------- | --------- | ------------------------------------------------------------------ |
| `white`        | `#FFFFFF` | Page ground: header, hero, profile, data section, footer           |
| `cloud`        | `#F4F6F8` | Catalogue band; the data sheet panel                               |
| `stone`        | `#E7EBEF` | Loading tone behind light photographs                              |
| `navy`         | `#0E1D2D` | Text; procurement band; primary buttons on light; letterhead rule  |
| `midnight`     | `#08131F` | Contact band; photo plates and scrim; loading tone behind the hero |
| `raised`       | `#142A3F` | Navy-button hover; locator panel                                   |
| `brass`        | `#C9A060` | Brass buttons; markers; flow line; labels and focus on dark        |
| `brass-hi`     | `#DDB979` | Brass-button hover                                                 |
| `brass-deep`   | `#7A5A28` | Section labels, icons and focus ring on light                      |
| `slate`        | `#4E6175` | Secondary text and labels on light                                 |
| `mist`         | `#A9B6C4` | Secondary text and labels on dark                                  |
| `hair`         | navy 12%  | Dividers on light (decorative)                                     |
| `hair-inverse` | white 14% | Dividers on dark (decorative)                                      |

**Overlays on photographs**, always midnight:

| Overlay     | Value                                                       | Use                            |
| ----------- | ----------------------------------------------------------- | ------------------------------ |
| Label plate | midnight 82%                                                | Annotation labels              |
| Chip plate  | midnight 75%                                                | "Foto ilustrasi" chip          |
| Scrim       | midnight 92% → 55% (at 55% height) → 0, over the bottom 46% | Mobile and tablet hero actions |
| Ghost fill  | midnight 18%                                                | Ghost button at rest           |

### Contrast (measured, WCAG 2.x)

| Pair                                                | Ratio  | Use                                        |
| --------------------------------------------------- | ------ | ------------------------------------------ |
| navy on white                                       | 17.0:1 | Headings, body                             |
| navy on cloud                                       | 15.7:1 | Catalogue, data sheet                      |
| slate on white                                      | 6.4:1  | Secondary text, labels                     |
| slate on cloud                                      | 5.9:1  | Card summaries, data labels                |
| brass-deep on white                                 | 6.3:1  | Section labels, focus ring                 |
| brass-deep on cloud                                 | 5.8:1  | Section labels on the catalogue band       |
| navy on brass                                       | 7.0:1  | Brass button                               |
| navy on brass-hi                                    | 9.2:1  | Brass button, hovered                      |
| white on navy                                       | 17.0:1 | Navy band, navy button                     |
| white on raised                                     | 14.7:1 | Navy button hovered, locator caption       |
| white on midnight                                   | 18.7:1 | Contact band                               |
| mist on navy                                        | 8.3:1  | Ledes and labels on navy                   |
| mist on midnight                                    | 9.1:1  | Ledes and labels on midnight               |
| mist on raised                                      | 7.1:1  | Locator caption                            |
| brass on navy                                       | 7.0:1  | Section labels, focus ring on dark         |
| brass on midnight                                   | 7.7:1  | Section labels, focus ring on dark         |
| white on label plate (worst case: white photo)      | 10.9:1 | Annotation labels                          |
| white on chip plate (worst case: white photo)       | 8.4:1  | "Foto ilustrasi" chip                      |
| Line-button outline (navy 55%) on white             | 3.9:1  | Non-text boundary                          |
| Ghost-button outline (white 45%) on midnight / navy | 4.5:1  | Non-text boundary                          |
| ~~brass on white~~                                  | 2.4:1  | **Never** for text, focus or meaningful UI |

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
  edge, leaving white beyond it, as approved.

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

- **Bar:** sticky, white, 64px tall (80px from 1024). A 1px `hair` line appears once the page
  has scrolled (motion M6).
- **Logo:** official horizontal artwork linking to the top, with the label "LATANSA, ke beranda".
  It is 140px wide from 360, 148px from 430 and 168px from 1024.
- **Below 1024:** a "Menu" button: a `ui` 14px label, then a 44px navy circle with two 1.5px
  white bars. It toggles to "Tutup".
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
     white on the chip plate (5px × 10px padding) with an 11px brass crosshair glyph.
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
- **Copy (columns 1–7 at 1024–1279, then 1–6; 24px right padding):**
  - the headline;
  - the hero line in 17px, 20px below;
  - the actions 36px below, 12px apart: the primary contact action in navy, then the outlined
    "Buka toko SIPLah" (external);
  - a location row 40px below: a `hair` top rule, 20px top padding and two pairs 32px apart.
    Each pair is a `label` slate caption over a 15px semibold navy value:
    "Berkedudukan di / Kabupaten Bantul, DIY" and "Kanal pengadaan / SIPLah Toko Ladang".
- **Photo H (columns 8–12 at 1024–1279, then 7–12):** bleeds to the frame's right edge at 6:5.4, focal point 100% 50%.
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

The band is cloud, the page's only light-grey band.

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
  - A cloud panel with a 1px `hair` frame and 10px crop-mark corners (2px navy).
  - Padding is 20px at the top and sides and 8px at the bottom.
  - The letterhead rule runs along its top.
- **Rows:** a `<dl>` with 16px row padding and `hair` dividers. Each row is a `label` slate term
  over a `data` description.

  | Term              | Description                                             | Emphasis |
  | ----------------- | ------------------------------------------------------- | -------- |
  | Nama perusahaan   | `legalName`                                             | semibold |
  | Bentuk usaha      | `legalForm`                                             | —        |
  | Status Perpajakan | `taxStatus` value: exactly "Pengusaha Kena Pajak (PKP)" | semibold |
  | Alamat            | Full `address`                                          | —        |
  | Kanal pengadaan   | Publishable channel names                               | —        |

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
  - An `<address>` at 17px in white, on two lines: street, village and district, then regency,
    province and postal code.
  - "Buka di Google Maps", an external text link: the company's listing once `mapsUrl` is
    confirmed, and a search for the client-provided address until then (D23).
  - "WhatsApp" with the number in Indonesian format, when the fact is publishable (D24).
  - "Email" with the address as a `mailto:` link, when the fact is publishable. The address may
    wrap after the "@".
  - "Jam operasional" rows, only when `officeHours` is publishable.
- **Locator:** 44px below.
  - A raised panel with a 1px `hair-inverse` frame, at 4:3.
  - The contour diagram: 16 rings with every fourth stronger, a faint 50-unit grid and a brass
    crosshair at the center.
  - A caption at the bottom left: "Penanda lokasi (diagram)" in mist. The coordinates follow in
    white with tabular figures, only when the `coordinates` fact is publishable.
  - The locator is `aria-hidden`; the address is the accessible location.

**From 768:** the actions sit side by side.

**From 1024:** the copy takes columns 1–5 and the locator takes columns 7–12, top-aligned.

### 6.8 Footer

- **Band:** white, with 40px top and 32px bottom padding. The letterhead rule closes the
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

| Slot | Master           | Mobile | Tablet | Desktop | Focal point               | Rendered width at 390 / 1024 / 1440 | `sizes`                                                                                                          |
| ---- | ---------------- | ------ | ------ | ------- | ------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| H    | `hero-desk-crop` | 4:5    | 3:2    | 6:5.4   | 55% 50%; desktop 100% 50% | 627 / 481 / 807                     | `(min-width: 1440px) 815px, (min-width: 1280px) 56vw, (min-width: 1024px) 47vw, (min-width: 768px) 100vw, 161vw` |
| E1   | `arch-atrium`    | 3:2    | 3:2    | 4:5     | 50% 30%; desktop 40% 50%  | 390 / 768 / 1099                    | `(min-width: 1440px) 1113px, (min-width: 1024px) 76vw, 100vw`                                                    |
| C1   | `it-keyboard`    | 4:5    | 4:5    | 3:2     | 50% 50%                   | 525 / 520 / 742                     | `(min-width: 1440px) 785px, (min-width: 1024px) 54vw, (min-width: 768px) 74vw, 135vw`                            |
| C2   | `office-ruler`   | 4:5    | 4:5    | 1:1     | 55% 40%                   | 525 / 543 / 781                     | same as C1                                                                                                       |
| C3   | `elec-board`     | 4:5    | 4:5    | 4:5     | 62% 50%                   | 525 / 532 / 769                     | same as C1                                                                                                       |
| C4   | `inst-chairs`    | 4:5    | 4:5    | 4:3     | 38% 50%                   | 622 / 483 / 694                     | `(min-width: 1440px) 695px, (min-width: 1024px) 48vw, (min-width: 768px) 87vw, 160vw`                            |
| C5   | `goods-boxes`    | 4:5    | 4:5    | 3:4     | 45% 50%                   | 525 / 409 / 600                     | `(min-width: 1440px) 600px, (min-width: 1024px) 42vw, (min-width: 768px) 74vw, 135vw`                            |

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
  - `label` type at 600 in white, no wrapping;
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
- The page reflows at 320px and at 200% zoom without horizontal scrolling. Sizes use rem units,
  and a browser default text size of 20px or 24px causes no horizontal overflow from 320px
  (`body` keeps a 320px minimum in px).
- The page is light only (`color-scheme: only light`), so forced dark modes leave it as designed.
- Every text pair comes from the §4 contrast table.
- The logo alt text is "LATANSA — CV Latansa Jogjakarta". Photo alt texts are in §7.

## 10. Performance budgets

Measured on the exported `out/` build in Phase 6.

| Metric                                | Target                                                               |
| ------------------------------------- | -------------------------------------------------------------------- |
| LCP (mobile, Lighthouse simulated)    | ≤ 2.5s. The LCP element is the hero photograph on mobile and desktop |
| CLS                                   | < 0.05                                                               |
| INP                                   | < 200ms                                                              |
| JavaScript beyond the Next.js runtime | ≤ 15 KB gzip (menu, reveals, meter, header sentinel)                 |
| Fonts                                 | Plus Jakarta Sans (latin, variable), one 27 KB file, preloaded       |
| First-view transfer (mobile)          | ≤ 500 KB target, including the hero derivative                       |
| Images                                | Per [image-assets.md](image-assets.md)                               |

**Phase 6 results** (2026-11-06, `npm run preview` with compression; record in
[qa/phase-6/](qa/phase-6/README.md)):

- **Met:**
  - CLS 0;
  - lab INP median 184ms under 4× CPU, worst the first menu open;
  - app JavaScript 7.8 KB gzip;
  - one 27 KB font;
  - first-screen transfer 276 KB;
  - desktop LCP 0.76s.
- **LCP, mobile:**
  - 2.20–2.34s under applied throttling (real Slow 4G and 4× CPU);
  - 3.42s median when simulated on localhost, where the Next.js runtime and the lazy photos fall
    into Lighthouse's pessimistic estimate.
  - Re-measure the simulated value with PageSpeed Insights on the deployed preview: Cloudflare's
    HTTP/2 and HTTP/3 prioritize the hero over the low-priority scripts.
- **Changes for the budgets:**
  - the phone hero at AVIF q50 4:2:0 (62 KB);
  - a responsive logo (20 KB, was 44 KB);
  - the menu restyles the page after the sheet paints.

## 11. Acceptance criteria (Phase 4 and 5 sign-off)

A build is accepted only when **all** of these hold:

1. **First screens** (the annotation markers were retired by the refinement brief):
   - 320×568, 360×780, 375×667 and 390×844: the headline, line, photograph and both actions;
   - 768×1024: the whole hero;
   - 1440×900: the whole hero.
2. **Fidelity:** side-by-side screenshots against the approved board at 360, 390, 768 and 1440
   match it, except for the deltas in §12.
3. **Hero legibility:** every headline word measures at least 4.5:1 on the rendered photograph
   at every width, including short phone screens with browser toolbars (375×547, 360×560).
4. **No template tells** (§2): no cards with shadows, no gradients except the legibility scrims
   (the hero grades and the locator caption fade), no uppercase eyebrows, no stats or badges.
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
9. **Logo integrity:** the official artwork, in the right variant, only on white.
10. **Budgets:** the §10 budgets are met on `out/`.
11. **Accessibility:**
    - a keyboard-only walkthrough works: skip link, menu trap and focus return, visible focus,
      the carousel reachable;
    - axe-core reports no serious or critical issues.
12. **Robustness:** forced dark mode leaves the page as designed, and a 20px or 24px default text
    size causes no horizontal overflow from 320px.

## 12. Deltas from the approved board

The build follows the board except in these places. Each change fixes a defect, meets a project
rule or replaces a stand-in.

| #   | Board                                                                            | Build                                                                                                                         | Why                                                                         |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| D1  | Brass focus ring everywhere                                                      | Brass-deep on light surfaces, brass on dark                                                                                   | Brass on a light canvas is 2.1–2.4:1, below the 3:1 a focus indicator needs |
| D2  | Chip plate at midnight 62%, text at ivory 90%                                    | Plate at midnight 75%, solid white text                                                                                       | 4.0:1 in the worst case; now 8.4:1 over any photograph                      |
| D3  | Line-button outline at navy 40%                                                  | Navy 55%                                                                                                                      | 2.4:1; now 3.7:1 for the button boundary                                    |
| D4  | Card summaries at 15px on mobile                                                 | 16px                                                                                                                          | Running text on mobile is at least 16px                                     |
| D5  | Annotation labels and menu sub-labels at 12px                                    | 13px, the single label size                                                                                                   | Legibility; one label size                                                  |
| D6  | Tablet hero photo at 4:5                                                         | 3:2 from 768 to 1023                                                                                                          | At 768×1024 the board pushed both actions below the first screen            |
| D7  | Desktop flow line floats 40px above the diamonds; step titles at line height 1.6 | The line runs through the diamond centers; titles at 1.25                                                                     | Board defect; the line should join the steps                                |
| D8  | Menu sub-label "Legalitas"                                                       | "Identitas usaha"                                                                                                             | "Legalitas" suggests that legal documents are published                     |
| D9  | Scroll padding 72px at all widths                                                | 72px below 1024, 88px from 1024                                                                                               | The desktop header is 80px tall                                             |
| D10 | Nearly every block fades in on scroll                                            | Only heading groups and photographs reveal. Facts, the data sheet, actions, the address and flow steps are present on arrival | Identity data must never perform; less generic motion                       |
| D11 | Desktop motion values on mobile                                                  | Shorter distances and smaller scale on mobile                                                                                 | Project rule: lighter mobile motion                                         |
| D12 | Scroll listeners for the header line and the meter                               | IntersectionObserver; the meter's bar-width change is contained (`contain: layout paint`)                                     | No scroll listeners; no page-level layout work during motion                |
| D13 | Stand-in contact buttons, Maps link and coordinates                              | Rendered only from publishable facts                                                                                          | Content policy: no stand-ins or empty links                                 |
| D14 | Headline split into words by runtime JavaScript                                  | Split at build time with an accessible full-sentence alternative                                                              | No layout shift, no JS dependency, clean screen-reader output               |
| D15 | —                                                                                | Browser theme color and touch-icon background in white                                                                        | Matches the header                                                          |
| D16 | Ivory canvas and paper band                                                      | White dominant; cloud catalogue band and data sheet                                                                           | Owner amendment, Phase 4                                                    |
| D17 | Archivo (expanded widths) and a Newsreader statement                             | Plus Jakarta Sans throughout; the statement is light from 1024                                                                | Owner amendment: readability first                                          |
| D18 | Hero copy in 6 columns at every desktop width                                    | 7 columns with a smaller display size at 1024–1279, then 6                                                                    | At 1024 the headline set in 5 lines and the buttons stacked                 |
| D19 | Profile facts in three columns on desktop                                        | Term-and-value rows from 1024                                                                                                 | Three columns wrapped every value at 1024                                   |
| D20 | Mosaic bottom row 4/5/3 at every desktop width                                   | Even thirds at 1024–1279, then 4/5/3                                                                                          | The 3-column card was 208px wide at 1024                                    |
| D21 | Data sheet in columns 6–12 with a 13rem term column                              | Columns 5–12 and a 10.5rem term column at 1024–1279                                                                           | Values wrapped up to five lines at 1024                                     |
| D22 | Locator at 4:3 when stacked                                                      | 16:9 on tablets                                                                                                               | A 546px-tall diagram at 768                                                 |
| D23 | Maps link only with a confirmed listing                                          | A search for the client-provided address until the listing is confirmed                                                       | Useful without claiming a listing                                           |
| D24 | —                                                                                | The WhatsApp number shown under the address                                                                                   | A client-provided public fact that procurement officers often note          |
| D25 | White hero with the photograph beside the copy                                   | Full-bleed photographic hero; text on its navy-graded quiet side                                                              | Owner brief: an integrated, premium first impression                        |
| D26 | Hero chip, annotation markers and ruler                                          | Removed                                                                                                                       | Owner brief: no labels or decoration that do not strengthen the hero        |
| D27 | Copy, photo and both actions overflowed short phones                             | Hero height clamped to the phone screen; headline, line and actions fit at 320–430px                                          | Mobile first screens failed at 375×667 and 320×568                          |
| D28 | —                                                                                | Overview strip of three entries, overlapping the hero from 1024px                                                             | Who, what, where to buy and how to reach, in seconds                        |
| D29 | Profile facts row                                                                | Moved into the identity sheet                                                                                                 | One home per fact; a calmer profile                                         |
| D30 | Swipe only, meter only                                                           | Previous/next buttons and a "1 dari 5" position; desktop hover zoom                                                           | A non-swipe alternative and clear progress                                  |
| D31 | Procurement split left/right                                                     | Centered, symmetrical composition                                                                                             | The section must feel distinctive and important                             |
| D32 | Identity rows like a table                                                       | Legal name as the title; particulars in two columns                                                                           | A corporate document, not an HTML table                                     |
| D33 | Maps search link; locator not a link                                             | Owner-confirmed listing everywhere; the locator links to it with a visible label                                              | The owner confirmed the listing                                             |
| D34 | Footer with an imagery note                                                      | Four groups plus a bottom line; no photo disclaimer                                                                           | Owner brief                                                                 |
| D35 | Phone section padding 88px; display 34px                                         | 72px; 30px at 320px                                                                                                           | Phone-specific calibration                                                  |
| D36 | Phone hero grade tied to the hero box (Phase 4 build)                            | A second grade follows the copy on phones                                                                                     | Short screens put the headline on the bright lid at 2.6:1; now ≥ 6.8:1      |
| D37 | Default color scheme                                                             | `color-scheme: only light`                                                                                                    | Forced darkening put the logo on black and erased the outline button        |
| D38 | Header logo at a fixed width                                                     | Scales down proportionally only when enlarged text leaves no room                                                             | No horizontal overflow with a 20px or 24px default text size                |
| D39 | Meter always shown                                                               | Compresses on narrow rows; hidden below 17rem, where "1 dari 5" carries the state                                             | Same                                                                        |
| D40 | Footer and overview links and text at 15px                                       | 16px on phones; 15px from 1024px                                                                                              | Phone minimum is 16px                                                       |
| D41 | Locator caption directly on the contours                                         | A navy fade under the caption                                                                                                 | Contour lines crossed the caption                                           |
| D42 | Text-link underline placed from the link box's center                            | An underline per line on the label's inline span; the icon on the last line                                                   | A wrapped link was struck through its second line                           |
| D43 | Footer spacer column at every width from 1024                                    | No spacer at 1024–1279; procurement spans three columns there                                                                 | "SIPLah Toko Ladang" wrapped at 1024–1290px                                 |

## 13. Content model (implemented in Phase 4)

**`src/content/company.ts`:**

- **`contact.whatsapp`:** `6281802681183`, client-provided (2026-11-05). Every WhatsApp action
  links to `https://wa.me/6281802681183`, and the contact band shows "0818-0268-1183".
- **`contact.email`:** `info@latansajogja.co.id`, status **`client-confirmed`** since 2026-11-06.
  Before that it was `pending-activation` and never rendered. The owner confirmed that Cloudflare
  Email Routing (Free) is active and an inbound test arrived. It is published in the Kontak band
  and the footer as `mailto:`.
  - Email Routing is receive-only: it forwards inbound mail and sends none.
  - The personal forwarding inbox is never recorded or published. A test and `verify:export`
    reject any other address in `src/` and in the exported pages.
- **`positioning.headline`:** confirmable copy with `confirmation: "pending"`. It is shown
  provisionally, and `content:check --strict` blocks launch until the client confirms it.
- **Address and location (updated):** `mapsUrl` and `coordinates` are now `client-confirmed`
  (owner, 2026-11-05) and published. Previously: `address.regionShort`; `mapsUrl` and `coordinates` (both
  `needs-confirmation`, hidden); `officeHours` as day-group rows (`needs-confirmation`, hidden).

**Other content:**

- **`src/content/copy.ts`:** all interface and section copy from §6.
- **`src/content/images.ts`:** each photo with alt text, photographer, photo page, license and the
  date its page was verified.

## 14. Open items for the owner

| Item                                                                                | Needed for                                       |
| ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| Confirm the headline "Perangkat dan perlengkapan kerja untuk instansi dan lembaga." | **Launch** (blocks `--strict`)                   |
| Activate `info@latansajogja.co.id`, test delivery, then mark it client-confirmed    | Done 2026-11-06 (published in Kontak and footer) |
| Confirm the office hours                                                            | Optional                                         |
| Verify the Mbizmarket profile                                                       | Optional                                         |
| Re-verify every Unsplash photo page                                                 | Done 2026-11-06 (Phase 6)                        |

## 15. Build notes (implemented in Phase 4)

- **Tokens:** `src/app/globals.css` (`@theme`), including the type scale, spacing, frame and
  easing. Tailwind's default colors are removed.
- **Fonts:** Plus Jakarta Sans in `src/app/layout.tsx`. Theme color white.
- **Icons:** the apple-touch icon background is white (`npm run brand:assets`).
- **Images:** `npm run images:build` turns `assets/images/originals` into graded AVIF/WebP
  derivatives in `public/images` and writes `src/config/image-assets.json`.
- **Components:** `src/components/site/`, server components by default. The client components are
  the mobile menu, the reveal observer and the category scroller (about 7 KB gzip together).
