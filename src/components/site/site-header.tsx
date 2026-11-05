import { BrandLogo } from "@/components/brand/brand-logo";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { addressLine, countWord, fill } from "@/lib/format";
import { contactActions } from "@/lib/links";
import { ContactButton } from "./actions";
import { MobileMenu } from "./mobile-menu";

/** Navigation links with their hints resolved from content. */
export function navLinks() {
  const count = countWord(company.categories.length);
  return copy.nav.links.map((link) => ({ ...link, hint: fill(link.hint, { count }) }));
}

/**
 * Sticky header (art-direction §6.1): logo, then an inline nav and contact
 * button from 1024px, or the Menu button and sheet below it.
 */
export function SiteHeader() {
  const links = navLinks();
  const [primary] = contactActions();

  return (
    <header data-site-header className="site-header">
      <div className="frame flex h-16 items-center gap-4 lg:h-20 lg:gap-10">
        <a
          href="#top"
          aria-label={copy.nav.home}
          className="flex min-h-11 min-w-0 items-center"
        >
          <BrandLogo
            variant="horizontal"
            loading="eager"
            className="h-auto w-[8.75rem] min-w-0 xs:w-[9.25rem] lg:w-[10.5rem]"
          />
        </a>

        <nav aria-label={copy.nav.primaryLabel} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {links
              .filter((link) => link.href !== "#kontak")
              .map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="navlink" data-spy>
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
        <a
          href="#kontak"
          className="btn btn-navy hidden min-h-[2.875rem] text-[0.9375rem] lg:inline-flex"
        >
          {copy.nav.headerAction}
        </a>

        <MobileMenu
          className="ml-auto lg:hidden"
          links={links}
          labels={{
            open: copy.nav.menuOpen,
            close: copy.nav.menuClose,
            menu: copy.nav.menuLabel,
          }}
          action={
            primary && (
              <ContactButton action={primary} variant="brass" className="w-full" />
            )
          }
          address={addressLine(company.address.value)}
        />
      </div>
    </header>
  );
}
