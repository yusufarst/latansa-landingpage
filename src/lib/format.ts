import type { Address } from "@/content/types";

const NUMBER_WORDS = [
  "Nol",
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
];

/** Indonesian number word for small counts ("Lima"), digits otherwise. */
export function countWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** Replace `{name}` placeholders in a copy template. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/**
 * Indonesian display format for an international mobile number:
 * "6281802681183" → "0818-0268-1183".
 */
export function formatPhoneId(international: string): string {
  const national = international.startsWith("62")
    ? `0${international.slice(2)}`
    : international;
  return national.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
}

/** One-line address for data rows and search queries. */
export function addressLine(a: Address): string {
  return `${a.street}, ${a.village}, ${a.district}, ${a.regency}, ${a.province} ${a.postalCode}`;
}

/** Two-line address for the contact block. */
export function addressLines(a: Address): [string, string] {
  return [
    `${a.street}, ${a.village}, ${a.district}`,
    `${a.regency}, ${a.province} ${a.postalCode}`,
  ];
}
