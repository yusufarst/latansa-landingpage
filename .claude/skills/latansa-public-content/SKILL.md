---
name: latansa-public-content
description: Public-content rules for the LATANSA JOGJAKARTA website. Use whenever writing or editing Indonesian copy, company facts, SEO text, alt text, or anything in src/content/, and before rendering a company fact in UI. Enforces verified-only facts with provenance, the exact PKP wording, no NPWP or tax documents, no prices/stock/cart/checkout, no invented claims, and hiding unconfirmed items.
---

# LATANSA public content

Trust is the product. One invented or unverifiable claim damages credibility with procurement
officers more than a missing section. Full policy: `docs/content-policy.md`.

## Source of truth

- All facts live in `src/content/company.ts` as `Fact<T>` with `status` + `source`
  (types in `src/content/types.ts`).
- Publishable statuses: `client-confirmed`, `client-provided`. Not publishable:
  `needs-confirmation`, `pending-activation`, `unverified`, `missing`.
- Copy shown provisionally (the hero headline) is `ConfirmableCopy` with
  `confirmation: "pending"`; `--strict` blocks launch until the client confirms it.
- Every fact declares `launch`: `"required"` (must be publishable to launch),
  `"optional"` (may stay unresolved), or `{ atLeastOneOf: "contact" }` (one member of the
  group must be resolved). New facts are `"optional"` unless the site cannot credibly launch
  without them — ask the user before adding a new `"required"` fact.
- In UI, read `"required"` facts directly (`company.legalName.value`). Read every other fact
  only via `publishedValue(fact)` from `src/content/facts.ts` and **omit the element
  entirely** when it returns `null`. `content:check` rejects direct `.value` reads of
  non-required facts in `src/app` and `src/components`. Never render placeholder text, "TBA",
  "segera", or empty links. Drop optional sections whose data is missing.
- Never hard-code company facts in components.
- After any change run `npm run content:check` and `npm test`. Before production,
  `npm run content:check -- --strict` must pass: it blocks only on required launch
  information (currently: identity, legal form, PKP status, address, and at least one of
  WhatsApp/email).

## Current facts (verify in the file — it may have changed)

- Legal name: CV. Latansa Jogjakarta — client-confirmed.
- Address: Klisat, Srihardono, Kecamatan Pundong, Kabupaten Bantul, Daerah Istimewa Yogyakarta
  55771 — client-provided.
- Tax status: client-confirmed. Wording is fixed: **"Status Perpajakan: Pengusaha Kena Pajak
  (PKP)"**.
- Categories: Komputer & TI; Alat Tulis & Perlengkapan Kantor; Elektronik & Perlengkapan
  Teknis; Peralatan Umum Kelembagaan; Barang & Jasa Pendukung Terpilih.
- SIPLah Toko Ladang store URL — client-provided, publishable.
- Mbizmarket — unverified; hidden.
- Office hours (from Google Maps) — needs confirmation; hidden.
- WhatsApp 081802681183 — client-provided; every WhatsApp action links to
  `https://wa.me/6281802681183`.
- Email `info@latansajogja.co.id` — `pending-activation` (Cloudflare Email Routing not set up).
  Never rendered until it receives mail; never publish the personal forwarding inbox.

## PKP rules

- Use the exact wording above, in a restrained company-information / legal-identity block.
- Never publish the NPWP number, tax documents, deeds, licenses or scans.
- Never write or imply that PKP status makes the company an approved/registered/verified
  government supplier, or that it guarantees anything.
- No badge, seal, checkmark or "certified" styling around it.

## Never write

- Prices, "harga", discounts, promos, stock quantities, "stok tersedia", carts, checkout,
  "beli sekarang", "pesan sekarang" (ordering language implying e-commerce).
- Founding year, years of experience, number of clients/projects, completed contracts,
  client or agency names/logos, testimonials, partnerships, certifications (ISO etc.),
  awards, achievements — unless the client supplies and confirms them, and they are added to
  `src/content/` with provenance first.
- Phone numbers, email addresses or social accounts not provided by the client.
- Unsubstantiated superlatives: "terbaik", "nomor satu", "terpercaya", "terlengkap",
  "termurah", "resmi pemerintah".

## Voice (Indonesian only)

- Formal but warm, concise, active voice. Use "kami" for the company, address readers neutrally
  (Bapak/Ibu only where natural).
- Describe what the company provides and how to reach it; let restraint signal confidence.
- Prefer concrete nouns (perangkat komputer, alat tulis kantor) over marketing abstractions.
- Calls to action: "Hubungi kami melalui WhatsApp", "Kirim email", "Buka toko kami di
  SIPLah" — only when the underlying fact is publishable.
- SEO title ≤ 60 chars, description ≤ 160 chars, in Indonesian.

## Images and alt text

- AI-generated images are illustrative; alt text describes what is visible and never claims it
  shows LATANSA's own office, staff, goods in stock, deliveries or clients.
- No captions presenting an image as documentation of real activity.

## Adding or changing a fact

1. Confirm the source (client message, client-supplied link, official public record).
2. Add/update the `Fact` with `status`, `source` (who/where + date), `launch` and an optional
   `note`.
3. Run `npm run content:check` and `npm test`.
4. Mention the change and its source in the PR description.
