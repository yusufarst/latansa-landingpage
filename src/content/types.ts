/**
 * Content provenance model.
 *
 * Every public company fact carries where it came from and whether it may be
 * published. UI components must render a fact only when `isPublishable(fact)`
 * is true, and must omit the element entirely otherwise — never show a
 * placeholder string to visitors.
 *
 * Keep this file free of runtime-only TypeScript features (enums, namespaces):
 * `scripts/content-check.mjs` loads the content with Node's type stripping.
 */

export type FactStatus =
  /** Client explicitly confirmed this fact for public use. */
  | "client-confirmed"
  /** Client supplied this value directly (e.g. a URL or address). */
  | "client-provided"
  /** A value exists but must be confirmed by the client before publishing. */
  | "needs-confirmation"
  /** Mentioned, but not yet verified to belong to the company. */
  | "unverified"
  /** No value available yet. */
  | "missing";

/**
 * Whether a fact must be resolved before production launch
 * (`npm run content:check -- --strict`).
 *
 * - "required": must be publishable at launch. The UI may read it directly.
 * - "optional": may stay unresolved at launch. The UI must read it through
 *   `publishedValue()` / `isPublishable()` so it is omitted while unresolved.
 * - { atLeastOneOf: group }: optional individually, but at least one fact in the
 *   same group must be publishable at launch (e.g. one contact channel).
 */
export type LaunchRequirement = "required" | "optional" | { atLeastOneOf: string };

export interface Fact<T> {
  value: T | null;
  status: FactStatus;
  /** Where the value came from — who said it, or which public source. */
  source: string;
  /** Launch gate for this fact. */
  launch: LaunchRequirement;
  /** Internal note for maintainers. Never rendered. */
  note?: string;
}

export const PUBLISHABLE_STATUSES: readonly FactStatus[] = [
  "client-confirmed",
  "client-provided",
];

export interface BusinessCategory {
  id: string;
  title: string;
  summary: string;
}

export interface ProcurementChannel {
  id: string;
  name: Fact<string>;
  url: Fact<string>;
  description: string;
}

export interface CompanyContent {
  legalName: Fact<string>;
  shortName: Fact<string>;
  legalForm: Fact<string>;
  taxStatus: Fact<{ label: string; value: string }>;
  address: Fact<{
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    country: string;
  }>;
  officeHours: Fact<string>;
  contact: {
    whatsapp: Fact<string>;
    email: Fact<string>;
  };
  positioning: {
    headline: string;
    summary: string;
    profile: string[];
  };
  categories: BusinessCategory[];
  procurementChannels: ProcurementChannel[];
  seo: {
    title: string;
    description: string;
  };
}
