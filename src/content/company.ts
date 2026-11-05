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
    },
    status: "client-provided",
    source:
      "Client brief, 2026-11-05; matches Google Maps listing “Latansa Jogjakarta” (plus code 28QX+FVV)",
    launch: "required",
  },
  officeHours: {
    value: "Senin–Jumat 09.00–17.00 WIB · Sabtu 09.00–15.00 WIB · Minggu tutup",
    status: "needs-confirmation",
    source: "Google Maps listing “Latansa Jogjakarta”, read 2026-11-05",
    launch: "optional",
    note: "Confirm with the client before publishing (set status to client-confirmed).",
  },
  contact: {
    whatsapp: {
      value: null,
      status: "missing",
      source: "Not provided",
      launch: { atLeastOneOf: "contact" },
      note: "Needs the official WhatsApp number in international format (62…). Contact links are hidden until provided.",
    },
    email: {
      value: null,
      status: "missing",
      source: "Not provided",
      launch: { atLeastOneOf: "contact" },
      note: "Needs the official email address. Contact links are hidden until provided.",
    },
  },
  positioning: {
    headline: "Pemasok barang dan jasa pendukung untuk instansi dan lembaga.",
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
  },
} satisfies CompanyContent;
