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

Components call `isPublishable(fact)` and **omit the element entirely** when it is false.
Visitors never see placeholder text. Optional sections are dropped when their data is missing.

`npm run content:check` lists every open item and scans `src/` for forbidden content.
`npm run content:check -- --strict` fails while anything is unresolved; it is the Phase 6 gate.

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
