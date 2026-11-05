import { BrandLogo } from "@/components/brand/brand-logo";
import { company } from "@/content/company";

/**
 * Phase 1 placeholder. The premium landing page is built in Phase 4.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-between gap-16 px-6 py-10 xs:px-8 md:px-16 md:py-16">
      <BrandLogo variant="horizontal" priority className="h-auto w-44 md:w-56" />
      <div className="max-w-xl">
        <p className="text-sm tracking-[0.2em] text-text-muted uppercase">
          Dalam pengembangan
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-balance md:text-5xl">
          Situs resmi {company.legalName.value} sedang disiapkan.
        </h1>
      </div>
      <p className="text-sm text-text-muted">latansajogja.co.id</p>
    </main>
  );
}
