# Content policy

The website exists to build trust with procurement officers. A single invented or unverifiable
claim undermines that trust, so these rules are strict.

## Source of truth

All company facts live in [`src/content/company.ts`](../src/content/company.ts), typed by
[`src/content/types.ts`](../src/content/types.ts). UI components never hard-code company facts.

Every fact is a `Fact<T>` with a `status` and a `source`:

| Status               | Meaning                                                               | Published? |
| -------------------- | --------------------------------------------------------------------- | ---------- |
| `client-confirmed`   | Client explicitly confirmed it for public use                         | Yes        |
| `client-provided`    | Client supplied the value directly                                    | Yes        |
| `needs-confirmation` | A value exists (e.g. from Google Maps) but awaits client confirmation | No         |
| `unverified`         | Mentioned, not yet verified to belong to the company                  | No         |
| `missing`            | No value yet                                                          | No         |

Components **omit the element entirely** when a fact is not publishable. Visitors never see
placeholder text. Optional sections are dropped when their data is missing.

## Launch requirements

Every fact also declares `launch`: whether it must be resolved before production.

| `launch`                    | Meaning at launch                                  | How UI reads it                                          |
| --------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| `"required"`                | Must be publishable; blocks `--strict` otherwise   | Directly (`company.legalName.value`)                     |
| `"optional"`                | May stay unresolved; never blocks launch           | Only via `publishedValue(fact)` → omit when `null`       |
| `{ atLeastOneOf: "group" }` | Optional individually; one member must be resolved | Only via `publishedValue(fact)`; render the ones present |

Current assignment:

| Required                                                         | At least one of             | Optional                                     |
| ---------------------------------------------------------------- | --------------------------- | -------------------------------------------- |
| Legal name, short name, legal form, PKP tax status, full address | WhatsApp, email (`contact`) | Office hours, SIPLah Toko Ladang, Mbizmarket |

A website for procurement credibility cannot launch without the company's identity, legal form,
confirmed tax status, address and **some** way to reach the company. Everything else is useful
but safe to omit until the client confirms it.

## Checks

`npm run content:check` (runs in CI and `npm run check`) fails on:

- **forbidden content** anywhere in `src/` — prices, pricing language, cart/checkout wording,
  stock quantities, NPWP/NIK-like numbers;
- **unguarded fact access** in `src/app` and `src/components` — reading
  `company.<non-required fact>.value` directly instead of through `publishedValue()`, which is
  what guarantees unresolved optional facts are omitted from the UI;
- an **invalid content model** — unknown status, missing source, missing `launch`, or a
  publishable status without a value.

It always lists launch blockers and unresolved optional facts.

`npm run content:check -- --strict` is the Phase 6 production gate: it additionally fails while
any **launch blocker** remains (an unresolved required fact, or a group with no resolved
member). Unresolved optional facts do **not** block launch.

Tests for these rules: `npm test` (`scripts/__tests__/content-rules.test.mjs`).

## Never publish

- Prices, discounts, stock quantities, carts, checkout, "buy now" or other pricing language
- The NPWP number, tax documents, deeds, licenses or other sensitive legal records
- Founding year, completed contracts, client names or logos, testimonials, government
  partnerships, certifications, accreditations or achievements — unless the client provides
  them and confirms them for publication
- Phone numbers or email addresses that the client has not provided
- Any statement that PKP status alone makes the company an approved government supplier

## PKP wording

Use exactly: **Status Perpajakan: Pengusaha Kena Pajak (PKP)** — in a restrained company
information / legal identity section. No badge styling that suggests certification.

## Procurement channels

- SIPLah Toko Ladang — client-provided store URL, publishable.
- Mbizmarket — hidden until the correct profile is verified.

Link out with `rel="noopener noreferrer"`; describe the channel neutrally.

## Imagery

AI-generated imagery is allowed as **illustrative** supporting visuals only (see
[image-assets.md](image-assets.md)). It must never depict or imply real LATANSA staff,
premises, vehicles, deliveries, events, clients or government handovers, and must never be
captioned or positioned as documentary evidence. No fake logos of real brands or agencies.

## Language and tone

Indonesian only. Formal, clear, confident and modest: describe what the company provides and
how to reach it. Avoid superlatives ("terbaik", "nomor satu", "terpercaya") that cannot be
substantiated.
