import { Categories } from "@/components/site/categories";
import { CompanyData } from "@/components/site/company-data";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { Overview } from "@/components/site/overview";
import { Procurement } from "@/components/site/procurement";
import { Profile } from "@/components/site/profile";
import { RevealObserver } from "@/components/site/reveal-observer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StructuredData } from "@/components/site/structured-data";
import { copy } from "@/content/copy";

/**
 * The single-page site — Concept C · Presisi Terang (docs/art-direction.md).
 * Everything is rendered at build time; the only client components are the
 * menu, the category carousel and the reveal observer.
 */
export default function Home() {
  return (
    <>
      <a href="#konten" className="btn btn-navy skip-link">
        {copy.skipLink}
      </a>
      <div
        id="top-sentinel"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-2"
      />
      <SiteHeader />
      <main id="konten" tabIndex={-1} className="outline-none">
        <Hero />
        <Overview />
        <Profile />
        <Categories />
        <Procurement />
        <CompanyData />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
      <StructuredData />
    </>
  );
}
