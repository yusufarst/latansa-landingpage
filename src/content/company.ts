import type { CompanyContent } from "./types";

/**
 * Public company content for CV. Latansa Jogjakarta.
 *
 * RULES (see docs/content-policy.md and .claude/skills/latansa-public-content):
 * - Only verified or client-supplied facts. Never invent founding year,
 *   contracts, clients, testimonials, partnerships, certifications,
 *   achievements, phone numbers or email addresses.
 * - Never add NPWP numbers, tax documents or sensitive legal records.
 * - No prices, stock quantities, carts or checkout — anywhere.
 * - Copy is Indonesian only.
 * - Facts that are not publishable are omitted from the UI, not shown as
 *   placeholders. Run `npm run content:check` to list open items.
 * - `launch` marks what must be resolved before production: "required" facts
 *   block `content:check --strict`; "optional" facts never block and are read
 *   in UI only via `publishedValue()`; `{ atLeastOneOf }` needs one publishable
 *   fact per group (at least one contact channel).
 */
export const company = {
  legalName: {
    value: "CV. Latansa Jogjakarta",
    status: "client-confirmed",
    source: "Client brief, 2026-11-05",
    launch: "required",
  },
  shortName: {
    value: "LATANSA",
    status: "client-confirmed",
    source: "Official logo wordmark (assets/brand)",
    launch: "required",
  },
  legalForm: {
    value: "Persekutuan Komanditer (CV)",
    status: "client-confirmed",
    source: "Legal name prefix “CV.” in client brief",
    launch: "required",
  },
  taxStatus: {
    value: { label: "Status Perpajakan", value: "Pengusaha Kena Pajak (PKP)" },
    status: "client-confirmed",
    source: "Client explicitly confirmed valid PKP status for public use, 2026-11-05",
    launch: "required",
    note: "Exact wording required. Do not publish the NPWP number or tax documents. Do not imply PKP status alone means approved government supplier.",
  },
  address: {
    value: {
      street: "Klisat",
      village: "Srihardono",
      district: "Kecamatan Pundong",
      regency: "Kabupaten Bantul",
      province: "Daerah Istimewa Yogyakarta",
      postalCode: "55771",
      country: "Indonesia",
      regionShort: "Kabupaten Bantul, DIY",
    },
    status: "client-provided",
    source:
      "Client brief, 2026-11-05; matches Google Maps listing “Latansa Jogjakarta” (plus code 28QX+FVV)",
    launch: "required",
  },
  officeHours: {
    value: [
      { days: "Senin–Jumat", hours: "09.00–17.00 WIB" },
      { days: "Sabtu", hours: "09.00–15.00 WIB" },
      { days: "Minggu", hours: "Tutup" },
    ],
    status: "needs-confirmation",
    source: "Google Maps listing “Latansa Jogjakarta”, read 2026-11-05",
    launch: "optional",
    note: "Confirm with the client before publishing (set status to client-confirmed).",
  },
  mapsUrl: {
    value:
      "https://www.google.com/maps/place/Latansa+Jogjakarta/@-7.9615341,110.3495675,17z/data=!4m6!3m5!1s0x2e7a551bac26733d:0xc5bd5460133408a8!8m2!3d-7.9615341!4d110.3495675!16s%2Fg%2F11t4gybf5_",
    status: "client-confirmed",
    source:
      "Google Maps listing “Latansa Jogjakarta”, confirmed by the owner in chat as the company's official location, 2026-11-05",
    launch: "optional",
  },
  coordinates: {
    value: {
      latitude: -7.9615341,
      longitude: 110.3495675,
      display: "7°57′41″ LS, 110°20′58″ BT",
    },
    status: "client-confirmed",
    source:
      "Pin of the Google Maps listing the owner confirmed as the official location, 2026-11-05 (the coordinates are part of the listing URL)",
    launch: "optional",
  },
  contact: {
    whatsapp: {
      value: "6281802681183",
      status: "client-provided",
      source:
        "Official WhatsApp 081802681183, supplied by the client in chat, 2026-11-05",
      launch: { atLeastOneOf: "contact" },
    },
    email: {
      value: "info@latansajogja.co.id",
      status: "client-confirmed",
      source:
        "Domain address supplied by the client in chat, 2026-11-05; the owner confirmed in chat, 2026-11-06, that Cloudflare Email Routing (Free) is active and an inbound test email reached the destination inbox",
      launch: { atLeastOneOf: "contact" },
      note: "Receive-only: Email Routing forwards inbound mail and does not send mail from this address, so no copy may promise replies from it and no form may send from it. The personal forwarding inbox is never recorded or published.",
    },
  },
  positioning: {
    headline: {
      text: "Perangkat dan perlengkapan kerja untuk instansi dan lembaga.",
      confirmation: "client-confirmed",
      source:
        "Approved by the owner in chat as the official website headline, 2026-11-06 (the Concept C headline, used provisionally since Phase 4, 2026-11-05)",
      note: "A replacement needs the owner's approval and must stay ≤ 62 characters and ≤ 5 lines at 360px (docs/art-direction.md §3).",
    },
    summary:
      "CV. Latansa Jogjakarta adalah perusahaan perdagangan dan pemasok yang berkedudukan di Kabupaten Bantul, Daerah Istimewa Yogyakarta.",
    profile: [
      "CV. Latansa Jogjakarta menyediakan beragam kategori barang serta layanan pendukung terpilih untuk menunjang kebutuhan operasional instansi, lembaga, dan organisasi.",
      "Kami melayani pengadaan melalui kanal resmi yang tersedia, dengan komunikasi yang jelas mengenai spesifikasi, ketersediaan, dan proses pengiriman sesuai kesepakatan.",
    ],
  },
  categories: [
    {
      id: "komputer-ti",
      title: "Komputer & Teknologi Informasi",
      summary:
        "Perangkat komputer, perangkat pendukung, dan kebutuhan teknologi informasi untuk menunjang administrasi dan pelayanan.",
    },
    {
      id: "perlengkapan-kantor",
      title: "Alat Tulis & Perlengkapan Kantor",
      summary:
        "Alat tulis, perlengkapan, dan peralatan kantor untuk kebutuhan operasional sehari-hari.",
    },
    {
      id: "elektronik-teknis",
      title: "Elektronik & Perlengkapan Teknis",
      summary:
        "Perangkat elektronik dan perlengkapan teknis sesuai spesifikasi kebutuhan.",
    },
    {
      id: "peralatan-kelembagaan",
      title: "Peralatan Umum Kelembagaan",
      summary:
        "Peralatan umum untuk menunjang fungsi dan fasilitas instansi maupun lembaga.",
    },
    {
      id: "barang-jasa-pendukung",
      title: "Barang & Jasa Pendukung Terpilih",
      summary:
        "Barang dan layanan pendukung lainnya yang disediakan berdasarkan kebutuhan dan ketersediaan.",
    },
  ],
  procurementChannels: [
    {
      id: "siplah-toko-ladang",
      name: {
        value: "SIPLah Toko Ladang",
        status: "client-provided",
        source: "Client brief, 2026-11-05",
        launch: "optional",
      },
      url: {
        value:
          "https://siplah.tokoladang.co.id/m/cv-latansa-jogjakarta.21163?page=1&etalase=&keyword=",
        status: "client-provided",
        source: "Official store link supplied by the client, 2026-11-05",
        launch: "optional",
      },
      description:
        "Toko CV. Latansa Jogjakarta di SIPLah Toko Ladang untuk pengadaan oleh satuan pendidikan.",
    },
    {
      id: "mbizmarket",
      name: {
        value: "Mbizmarket",
        status: "unverified",
        source: "Client brief, 2026-11-05",
        launch: "optional",
        note: "Verify the correct company profile on Mbizmarket before publishing.",
      },
      url: {
        value: null,
        status: "missing",
        source: "Not provided",
        launch: "optional",
        note: "Needs the verified Mbizmarket profile URL.",
      },
      description: "Profil CV. Latansa Jogjakarta di Mbizmarket.",
    },
  ],
  seo: {
    title: "CV. Latansa Jogjakarta — Pemasok Barang & Jasa Pendukung",
    description:
      "CV. Latansa Jogjakarta, perusahaan perdagangan dan pemasok di Kabupaten Bantul, DIY: komputer & TI, perlengkapan kantor, elektronik, dan peralatan kelembagaan.",
    ogImageAlt:
      "Logo LATANSA, CV. Latansa Jogjakarta, di atas foto laptop dan cangkir di meja kerja gelap.",
  },
} satisfies CompanyContent;
