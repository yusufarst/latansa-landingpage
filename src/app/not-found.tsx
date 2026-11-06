import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { copy } from "@/content/copy";

/**
 * The 404 page: its own title, no canonical pointing at the homepage, and
 * never indexed (before and after launch; Next.js also adds noindex to 404s).
 */
export const metadata: Metadata = {
  title: copy.notFound.title,
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="frame flex min-h-svh flex-col justify-center gap-8 py-16">
      <Link href="/" aria-label={copy.nav.home} className="self-start">
        <BrandLogo
          variant="horizontal"
          loading="eager"
          sizes="9.5rem"
          className="h-auto w-[9.5rem]"
        />
      </Link>
      <div>
        <p className="tag">{copy.notFound.code}</p>
        <h1 className="mt-5 text-display font-semibold">{copy.notFound.heading}</h1>
      </div>
      <Link href="/" className="btn btn-navy self-start">
        {copy.notFound.back}
      </Link>
    </main>
  );
}
