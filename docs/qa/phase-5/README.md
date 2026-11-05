# Phase 5 QA record

Browser visual testing and refinement of the merged Phase 4 site, mobile first. Dates:
2026-11-05, with the final run on 2026-11-06. Everything below was measured on the **static
export** (`npm run build`, `out/`) served by the `static-export` launch config on port 4173.

**Browser:** Chromium (headless shell, Playwright build 1243) driven over the DevTools Protocol.
Phone sizes emulate a mobile device (touch, `mobile: true`, 2× scale). Real iOS Safari, Samsung
Internet and Firefox were not available (see [Not verified](#not-verified)).

## Method

- **Ladder:**
  - phones: 320×568, 360×560*, 360×780, 375×547*, 375×667, 390×844, 430×932;
  - tablet and desktop: 768×1024, 1024×768, 1440×900, 1920×1080.

  \* Real visible areas with browser toolbars: an iPhone SE in Safari and a small Android phone.
  The ladder alone emulates full windows.

- **Per size:**
  - horizontal overflow;
  - layout shift through the entrance and a full scroll;
  - hero actions in the first screen;
  - broken images, unfinished reveals, console errors.
- **Interaction:**
  - menu: focus trap, Esc, focus return, anchor offsets;
  - carousel: swipe, buttons, keys;
  - scroll spy and every link.
- **Keyboard:** every Tab stop at 390 and 1440.
- **Accessibility:**
  - axe-core 4.14 with the WCAG 2.0–2.2 A/AA and best-practice rules;
  - a computed contrast for every text element;
  - the hero text measured on the rendered photograph (text hidden, backdrop pixels read, 5th
    percentile per word or line).
- **Robustness:**
  - the browser's default text size at 20px and 24px, from 320 to 1440;
  - forced dark mode;
  - reduced motion.

## Findings and fixes

| #   | Finding                                                                                                                                                                                                                                    | Fix                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | On short phone screens (375×547, 360×560, 320×568) the hero's first line rose over the bright laptop lid: "dan" measured **2.6:1**.                                                                                                        | A phone-only navy grade that follows the copy (`.hero-copy::before`). Every headline word now measures at least **6.8:1**.                                                                                                            |
| 2   | Forced dark mode (Chrome's "darken websites", Samsung Internet) darkened the header: logo on black, navy Menu button and outline button nearly invisible.                                                                                  | `color-scheme: only light` in CSS and the `color-scheme` meta.                                                                                                                                                                        |
| 3   | With a 20px or 24px default text size, phones scrolled sideways by 7–117px. Causes: `body` min-width in rem, the carousel controls row, and the header row at 320.                                                                         | `min-width: 320px` in px. The meter compresses, then gives way to "1 dari 5" below 17rem. The logo may scale down proportionally.                                                                                                     |
| 4   | The locator's "↗" icon sat on the caption's first letter at every width, and was missing after "Buka di Google Maps". A descendant rule (`.locator svg`) also positioned the icon.                                                         | The rule is scoped to the diagram (`.locator > svg`).                                                                                                                                                                                 |
| 5   | Contour lines ran through the locator caption.                                                                                                                                                                                             | A navy fade under the caption.                                                                                                                                                                                                        |
| 6   | axe (serious): the identity sheet's `dl` nested its `dt`/`dd` groups one level too deep (`definition-list`, `dlitem`).                                                                                                                     | The `dl` is the grid; each pair is a direct `div` child.                                                                                                                                                                              |
| 7   | axe (serious): the locator link's accessible name did not contain its visible caption (`label-content-name-mismatch`, WCAG 2.5.3).                                                                                                         | The name is the visible caption plus "(membuka situs eksternal)".                                                                                                                                                                     |
| 8   | Footer and overview link and text sizes were 15px on phones (minimum 16px).                                                                                                                                                                | 16px on phones; 15px from 1024px.                                                                                                                                                                                                     |
| 9   | The footer "Profil" link was 39px wide (minimum 44px).                                                                                                                                                                                     | Footer navigation links are at least 44px wide.                                                                                                                                                                                       |
| 10  | Phone details: grey tap flash on links; no pressed state on text links; the skip link could exceed a 320px screen; the menu sheet ignored iOS toolbars and the home indicator.                                                             | No tap flash; links dim while pressed; the skip link fits; the sheet uses `100dvh` and the bottom safe area.                                                                                                                          |
| 11  | Found in the email check (2026-11-06): the footer's "SIPLah Toko Ladang" wrapped at 1024–1290px. A wrapped text link drew its underline through its second line, with the "↗" floating at the right; at 320 with 24px text, six links did. | The underline sits on the label's inline span, so each line gets its own; the "↗" stays on the last line. At 1024–1279 the footer drops its spacer column, so the procurement group gets three columns and the link fits on one line. |
| 12  | With reduced motion, hovering a text link still removed its underline (instantly). Motion M11 keeps it shown.                                                                                                                              | The hover retract runs only with `prefers-reduced-motion: no-preference`.                                                                                                                                                             |

The spec records these as D36–D43 and the Phase 5 blocks in
[art-direction.md](../../art-direction.md) and [motion-spec.md](../../motion-spec.md).

## Owner update: email active (2026-11-06)

The owner confirmed that Cloudflare Email Routing (Free) delivers `info@latansajogja.co.id`: an
inbound test reached the destination inbox. `contact.email` is now `client-confirmed`, with that
confirmation as its source.

- **Shown in Kontak and the footer only:**
  - Kontak: the ghost "Kirim email" action after WhatsApp, and an "Email" line after the WhatsApp
    number;
  - footer: the address after the WhatsApp number, with a mail glyph.
- **Unchanged elsewhere:** the hero, header and menu keep WhatsApp as their only action.
- **Links:** all three `mailto:info@latansajogja.co.id` links open in place, with no new tab. The
  address may wrap after the "@", which it does only at 320 with 24px text.
- **No other address:** the personal forwarding inbox is recorded nowhere. A test rejects any
  other address in `src/`, and `verify:export` rejects any in the 12 exported pages.
- **Receive-only:** Email Routing receives and forwards; it sends nothing. No copy promises a reply
  from this address, and there is no form.
- **Checks on the same build:** every result below includes the email and the text-link fix.

## Results on the finished build

| Size      | Overflow | Layout shift | Hero actions in the first screen    | Headline      | Weakest headline word |
| --------- | -------- | ------------ | ----------------------------------- | ------------- | --------------------- |
| 320×568   | 0        | 0            | 2 of 2                              | 4 lines, 30px | 7.0:1                 |
| 360×560\* | 0        | 0            | 2 of 2                              | 4 lines, 30px | 6.9:1                 |
| 360×780   | 0        | 0            | 2 of 2                              | 4 lines, 30px | 17.5:1                |
| 375×547\* | 0        | 0            | 1 of 2; the second shows 39 of 48px | 4 lines, 31px | 6.8:1                 |
| 375×667   | 0        | 0            | 2 of 2                              | 4 lines, 31px | 11.2:1                |
| 390×844   | 0        | 0            | 2 of 2                              | 4 lines, 32px | 17.4:1                |
| 430×932   | 0        | 0            | 2 of 2                              | 3 lines, 33px | 15.9:1                |
| 768×1024  | 0        | 0            | 2 of 2                              | 4 lines, 46px | 13.7:1                |
| 1024×768  | 0        | 0            | 2 of 2                              | 3 lines, 48px | 11.4:1                |
| 1440×900  | 0        | 0            | 2 of 2                              | 4 lines, 60px | 16.4:1                |
| 1920×1080 | 0        | 0            | 2 of 2                              | 4 lines, 60px | 16.0:1                |

\* Real visible areas with browser toolbars. At 375×547 the second action's last 9px sit under
Safari's toolbar until the first scroll collapses it.

At every size there are no broken images, no reveals left pending and no console errors. The
smallest visible text is 14px for labels and 13px for the footer's legal line, as the spec
allows; running text on phones is 16px. The weakest-word column is the 5th percentile of the
photo pixels behind each headline word.

## Interaction, keyboard and accessibility

- **Links:** 37 links, none dead, and every internal anchor has a target.
  - External links open in a new tab with `rel="noopener noreferrer"`: WhatsApp ×5
    (`https://wa.me/6281802681183`), Google Maps ×3 and SIPLah ×3.
  - Email ×3 (`mailto:info@latansajogja.co.id`) opens in place.
  - `verify:export` now checks these against the published facts on every build.
- **Menu:**
  - opens with focus on the first link and the page behind it inert;
  - Tab cycles inside it;
  - Esc closes it and returns focus to the button;
  - a link closes it and lands its section at 72px.
- **Carousel:** swipe, the previous and next buttons, and the arrow keys each move one card, and
  "1 dari 5" follows.
- **Scroll spy:** no link is current at the top. After navigation, the header and menu link of
  that section are current; sections land at 88px on desktop.
- **Keyboard:** 29 stops at 390 and 31 at 1440, including the three email links.
  - Every stop matches `:focus-visible`, shows a ring and is scrolled into view.
  - The order follows reading order, column by column.
  - Rings are brass-deep on light surfaces and brass on dark ones.
- **axe-core:** 0 violations at 390 (menu closed and open), at 1440 and on the 404 page.
  - axe reports text over pseudo-elements, gradients and the carousel's clipped cards as
    "incomplete".
  - Those were verified by computing every text colour against its solid surface: 86 elements at
    390 and 90 at 1440, none below AA.
  - The lowest pair is brass-deep on the grey surface at 5.84:1.
- **Hero contrast** (backdrop pixels, 5th percentile):
  - headline words ≥ 6.8:1 on every phone size and ≥ 11.4:1 from 768px;
  - the hero line ≥ 10.3:1.
- **Reduced motion:** 150ms after load, nothing is hidden, offset or animating at 390 or 1440.
  Hovering a text link keeps its underline. With normal motion, the underline retracts and
  returns (M11).
- **Text links:** at default text sizes no text link wraps from 320 to 1920. At 320 with 24px
  text, three wrap and are underlined line by line.
- **404:** an unknown path returns HTTP 404 with the Indonesian page.

## Robustness

- **Default text 20px and 24px:** no horizontal overflow at 320, 360, 390, 430, 768, 1024 and
  1440, with either size.
  - At 360 with 24px the logo is 114px wide.
  - The carousel shows "1 dari 5" without the meter.
  - The menu sheet scrolls.
- **Forced dark mode:** with a dark preference and Chromium's force-dark, the page renders as
  designed. Chromium skips forced darkening for `only light` pages.
- **Reflow:** `body` keeps a 320px minimum in px, matching WCAG 1.4.10.

## Not verified

- **Real devices and engines:** iOS Safari (WebKit), Samsung Internet's own dark mode and
  Firefox. All checks ran in Chromium with device emulation. Safari's visible area was emulated
  as 375×547.
- **Screen readers:** VoiceOver and TalkBack were not tested. Structure and names were checked
  with axe and the accessibility tree.
- **Phase 6 scope:** performance budgets (Lighthouse, LCP, transfer size), and a dedicated title
  for the 404 page (it uses the site title).

## Screenshots

Real Chromium, exported build, reduced motion (final states). Phones at 2×.

- **First screens, phones:** [320×568](first-320x568.webp) · [360×560\*](first-360x560.webp) ·
  [360×780](first-360x780.webp) · [375×547\*](first-375x547.webp) ·
  [375×667](first-375x667.webp) · [390×844](first-390x844.webp) ·
  [430×932](first-430x932.webp)
- **First screens, tablet and desktop:** [768×1024](first-768x1024.webp) ·
  [1024×768](first-1024x768.webp) · [1440×900](first-1440x900.webp) ·
  [1920×1080](first-1920x1080.webp)
- **Full pages:** [390](full-390.webp) · [1440](full-1440.webp)
- **Email (2026-11-06):** [Kontak and footer at 390](email-contact-390.webp) ·
  [Kontak and footer at 1440](email-contact-1440.webp)
- **Fixes, before and after:**
  - [hero at 320×568](hero-short-before-after.webp);
  - [locator caption](locator-before-after.webp);
  - [forced dark mode](forced-dark-before-after.webp);
  - [footer at 1024](footer-1024-before-after.webp);
  - [wrapped text links at 320 with 24px text](text-link-wrap.webp) (after only).
- **Robustness and interaction:**
  - [larger default text](large-text.webp): header, carousel controls and menu at 360 with
    16px, 320 with 20px and 360 with 24px;
  - [focus rings](focus-rings.webp);
  - [menu](menu-390.webp);
  - [carousel](carousel-390.webp).
