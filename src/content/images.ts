import imageAssets from "@/config/image-assets.json";

/**
 * Photography with provenance (docs/image-assets.md,
 * docs/design/concepts/photos/SOURCES.md).
 *
 * Every photo is licensed under the Unsplash License. Photos are editorial
 * imagery for the business categories: no caption or alt text may present one
 * as LATANSA's own office, staff, inventory, deliveries, customers or projects.
 * By the owner's decision (2026-11-05) the site shows no visible photo
 * disclaimer; provenance stays here and in docs/design/concepts/photos/SOURCES.md.
 * Alt text is Indonesian and describes what is visible.
 * Sizes and widths come from `npm run images:build`.
 */
export type PhotoSlot = keyof typeof imageAssets;

export interface Photo {
  slot: PhotoSlot;
  alt: string;
  photographer: string;
  page: string;
  license: "Unsplash License";
  /** Last date the photo page showed "Free to use under the Unsplash License". */
  licenseVerified: string;
  width: number;
  height: number;
  widths: readonly number[];
}

type PhotoMeta = Omit<Photo, "slot" | "width" | "height" | "widths" | "license">;

const META: Record<PhotoSlot, PhotoMeta> = {
  hero: {
    alt: "Laptop, cangkir, buku catatan, dan pensil di atas meja kerja gelap.",
    photographer: "Dhony Koswara",
    page: "https://unsplash.com/photos/laptop-mug-and-notebooks-on-a-dark-workspace-uxxGF7g754U",
    licenseVerified: "2026-11-05",
  },
  "hero-wide": {
    alt: "Laptop, cangkir, buku catatan, dan pensil di atas meja kerja kulit gelap.",
    photographer: "Dhony Koswara",
    page: "https://unsplash.com/photos/laptop-mug-and-notebooks-on-a-dark-workspace-uxxGF7g754U",
    licenseVerified: "2026-11-05",
  },
  profile: {
    alt: "Atrium kaca modern dengan cahaya alami.",
    photographer: "LYCS Architecture",
    page: "https://unsplash.com/photos/clear-glass-building-interior-during-daytime-aKij95Mmus8",
    licenseVerified: "2026-11-05",
  },
  computers: {
    alt: "Papan ketik putih di atas permukaan hitam.",
    photographer: "Wesley Tingey",
    page: "https://unsplash.com/photos/apple-magic-keyboard-FNhyekndnSM",
    licenseVerified: "2026-11-05",
  },
  office: {
    alt: "Buku catatan, pena, penggaris baja, dan papan ketik.",
    photographer: "Jess Bailey",
    page: "https://unsplash.com/photos/notebook-ruler-and-keyboard-on-white-surface-OXQVfxXORJ0",
    licenseVerified: "2026-11-05",
  },
  electronics: {
    alt: "Detail papan sirkuit elektronik.",
    photographer: "Alexandre Debiève",
    page: "https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU",
    licenseVerified: "2026-11-05",
  },
  institutional: {
    alt: "Kursi rapat di sisi meja konferensi.",
    photographer: "Michael Fousert",
    page: "https://unsplash.com/photos/office-chairs-at-conference-table-RNsKphkdBTk",
    licenseVerified: "2026-11-05",
  },
  supporting: {
    alt: "Dua kotak kardus polos bertumpuk.",
    photographer: "Mediamodifier",
    page: "https://unsplash.com/photos/brown-cardboard-box-on-white-table-jpQs15STZZ4",
    licenseVerified: "2026-11-05",
  },
};

export const photos = {} as Record<PhotoSlot, Photo>;
for (const slot of Object.keys(META) as PhotoSlot[]) {
  photos[slot] = {
    slot,
    license: "Unsplash License",
    ...META[slot],
    ...imageAssets[slot],
  };
}

/** Business category id (company.ts) → its photograph. */
export const categoryPhoto: Record<string, PhotoSlot> = {
  "komputer-ti": "computers",
  "perlengkapan-kantor": "office",
  "elektronik-teknis": "electronics",
  "peralatan-kelembagaan": "institutional",
  "barang-jasa-pendukung": "supporting",
};
