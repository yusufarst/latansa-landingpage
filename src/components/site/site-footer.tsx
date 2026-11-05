import { BrandLogo } from "@/components/brand/brand-logo";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { navLinks } from "./site-header";

/** Footer (art-direction §6.8): the letterhead rule closes the document. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { regency, province } = company.address.value;

  return (
    <footer className="pt-10 pb-8 lg:pt-12 lg:pb-10">
      <div className="frame">
        <div className="kop" aria-hidden="true" />
        <div className="mt-8 grid gap-7 lg:grid-cols-[auto_1fr] lg:items-center">
          <a
            href="#top"
            aria-label={copy.nav.home}
            className="flex min-h-11 items-center justify-self-start"
          >
            <BrandLogo variant="horizontal" className="h-auto w-[9.5rem]" />
          </a>
          <nav aria-label={copy.nav.footerLabel}>
            <ul className="grid grid-cols-2 gap-x-4 lg:flex lg:justify-end lg:gap-9">
              {navLinks().map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="navlink flex min-h-11 items-center font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 grid gap-2 border-t border-hair pt-5 text-small text-slate lg:grid-cols-[1fr_auto] lg:gap-10">
          <p>
            © {year} {company.legalName.value}. {regency}, {province}.
          </p>
          <p className="max-w-[40rem]">{copy.footer.imageryNote}</p>
        </div>
      </div>
    </footer>
  );
}
