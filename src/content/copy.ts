/**
 * Interface and section copy (Indonesian), approved with Concept C on
 * 2026-11-05 (docs/art-direction.md §6 and §13).
 *
 * Copy labels, describes and directs. It never asserts a company fact: facts
 * (names, address, status, contact details, channels) live in company.ts with
 * provenance and are rendered from there. `{name}` placeholders are filled
 * from facts or counts at render time.
 */
export const copy = {
  skipLink: "Langsung ke konten utama",
  externalHint: "(membuka situs eksternal)",

  nav: {
    home: "LATANSA, ke beranda",
    primaryLabel: "Utama",
    footerLabel: "Navigasi bawah",
    menuOpen: "Menu",
    menuClose: "Tutup",
    menuLabel: "Menu situs",
    headerAction: "Hubungi kami",
    links: [
      { href: "#profil", label: "Profil", hint: "Tentang kami" },
      { href: "#bidang", label: "Bidang usaha", hint: "{count} kategori" },
      { href: "#pengadaan", label: "Pengadaan", hint: "SIPLah" },
      { href: "#data", label: "Data perusahaan", hint: "Identitas usaha" },
      { href: "#kontak", label: "Kontak", hint: "Bantul, DIY" },
    ],
  },

  actions: {
    whatsapp: "Hubungi via WhatsApp",
    email: "Kirim email",
    siplahShort: "Buka toko SIPLah",
    siplahLong: "Buka toko di SIPLah Toko Ladang",
    otherNeeds: "Diskusikan kebutuhan lain",
    maps: "Buka di Google Maps",
  },

  hero: {
    line: "CV. Latansa Jogjakarta memasok komputer, perlengkapan kantor, elektronik, peralatan kelembagaan, dan layanan pendukung terpilih.",
  },

  /** The at-a-glance strip under the hero: what, where to buy, how to reach. */
  overview: {
    label: "Sekilas perusahaan",
    categories: {
      term: "Bidang usaha",
      value: "{count} kategori barang dan jasa",
      link: "Lihat kategori",
    },
    procurement: {
      term: "Kanal pengadaan",
      link: "Lihat alur pengadaan",
    },
    contact: {
      term: "Konsultasi",
      value: "WhatsApp {number}",
      link: "Lihat kontak dan lokasi",
    },
  },

  profile: {
    label: "Profil perusahaan",
  },

  categories: {
    label: "Bidang usaha",
    /** `{count}` becomes the number word for the number of categories. */
    heading: "{count} kategori untuk kebutuhan kerja instansi.",
    lede: "Kategori barang dan layanan yang kami sediakan untuk instansi dan lembaga.",
    scrollerLabel: "Kategori bidang usaha",
    previous: "Kategori sebelumnya",
    next: "Kategori berikutnya",
    position: "{current} dari {total}",
  },

  procurement: {
    label: "Kanal pengadaan",
    heading: "Pengadaan melalui SIPLah Toko Ladang.",
    lede: "Satuan pendidikan dapat melakukan pengadaan melalui toko CV. Latansa Jogjakarta di SIPLah Toko Ladang. Untuk kebutuhan lain, hubungi kami secara langsung.",
    flowLabel: "Alur pengadaan melalui SIPLah",
    flowCaption: "Alur pengadaan",
    steps: {
      supplier: "Pemasok",
      store: "Toko resmi kami",
      buyer: "Satuan pendidikan",
      buyerNote: "Pengadaan barang dan jasa",
    },
  },

  data: {
    label: "Data perusahaan",
    heading: "Identitas usaha.",
    lede: "Informasi identitas perusahaan untuk keperluan administrasi pengadaan.",
    terms: {
      name: "Nama perusahaan",
      legalForm: "Bentuk usaha",
      address: "Alamat",
      channels: "Kanal pengadaan",
      domicile: "Berkedudukan di",
    },
  },

  contact: {
    label: "Kontak",
    heading: "Diskusikan kebutuhan pengadaan Anda.",
    lede: "Sampaikan spesifikasi barang yang dibutuhkan. Kami akan membantu menjelaskan ketersediaan dan proses pengadaannya.",
    addressLabel: "Alamat kantor",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    hoursLabel: "Jam operasional",
    locatorCaption: "Penanda lokasi (diagram)",
  },

  footer: {
    contactHeading: "Kontak dan lokasi",
    navHeading: "Navigasi",
    procurementHeading: "Pengadaan",
    storeNote: "Toko resmi CV. Latansa Jogjakarta",
    backToTop: "Kembali ke atas",
  },

  notFound: {
    code: "404",
    heading: "Halaman tidak ditemukan.",
    back: "Kembali ke beranda",
  },
} as const;
