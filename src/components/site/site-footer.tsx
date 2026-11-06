import { BrandLogo } from "@/components/brand/brand-logo";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedValue } from "@/content/facts";
import { addressLines, formatPhoneId } from "@/lib/format";
import { siplahStore, whatsappHref } from "@/lib/links";
import { EmailText, TextLinkLabel } from "./actions";
import { ExternalIcon, MailIcon, WhatsAppIcon } from "./icons";
import { navLinks } from "./site-header";

const heading = "text-label font-semibold text-brass-deep";
const extra = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Footer (art-direction §6.8): the letterhead rule closes the document, then
 * four groups — identity, navigation, contact and location, procurement —
 * and a quiet bottom line. The email shows only while its fact is
 * publishable (activated 2026-11-06), with a mail glyph like WhatsApp's.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsapp = publishedValue(company.contact.whatsapp);
  const email = publishedValue(company.contact.email);
  const mapsHref = publishedValue(company.mapsUrl);
  const store = siplahStore();
  const [line1, line2] = addressLines(company.address.value);

  return (
    <footer className="pt-14 pb-8 md:pt-16 lg:pt-20 lg:pb-10">
      <div className="frame">
        <div className="kop" aria-hidden="true" />

        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-4">
            <a
              href="#top"
              aria-label={copy.nav.home}
              className="inline-flex min-h-11 items-center"
            >
              <BrandLogo
                variant="horizontal"
                sizes="(min-width: 1024px) 10.5rem, 9.5rem"
                className="h-auto w-[9.5rem] lg:w-[10.5rem]"
              />
            </a>
            <p className="mt-4 max-w-[26rem] text-base leading-relaxed text-slate lg:text-[0.9375rem]">
              {company.positioning.summary}
            </p>
          </div>

          {/* 1024–1279: no spacer column, so the procurement group gets three
              columns and "SIPLah Toko Ladang" stays on one line. */}
          <nav
            aria-label={copy.nav.footerLabel}
            className="lg:col-span-2 lg:col-start-5 xl:col-start-6"
          >
            <h2 className={heading}>{copy.footer.navHeading}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 md:grid-cols-1">
              {navLinks().map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="navlink flex min-h-11 w-fit min-w-11 items-center font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={heading}>{copy.footer.contactHeading}</h2>
            <div className="mt-3 grid gap-3 text-base lg:text-[0.9375rem]">
              {whatsapp && (
                <a
                  href={whatsappHref(whatsapp)}
                  {...extra}
                  className="inline-flex min-h-11 w-fit items-center gap-2.5 font-semibold"
                >
                  <WhatsAppIcon className="size-[1.125rem] text-brass-deep" />
                  <span className="tabular-nums">{formatPhoneId(whatsapp)}</span>
                  <span className="sr-only"> {copy.externalHint}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 w-fit max-w-full items-center gap-2.5 font-semibold"
                >
                  <MailIcon className="size-[1.125rem] shrink-0 text-brass-deep" />
                  <EmailText address={email} />
                </a>
              )}
              <address className="leading-relaxed text-slate not-italic">
                {line1}
                <br />
                {line2}
              </address>
              {mapsHref && (
                <a
                  href={mapsHref}
                  {...extra}
                  className="tlink w-fit text-base lg:text-[0.9375rem]"
                >
                  <TextLinkLabel>
                    {copy.actions.maps}
                    <ExternalIcon />
                  </TextLinkLabel>
                  <span className="sr-only"> {copy.externalHint}</span>
                </a>
              )}
            </div>
          </div>

          {store && (
            <div className="lg:col-span-3 xl:col-span-2">
              <h2 className={heading}>{copy.footer.procurementHeading}</h2>
              <div className="mt-3 grid gap-1">
                <a
                  href={store.url}
                  {...extra}
                  className="tlink w-fit text-base lg:text-[0.9375rem]"
                >
                  <TextLinkLabel>
                    {store.name}
                    <ExternalIcon />
                  </TextLinkLabel>
                  <span className="sr-only"> {copy.externalHint}</span>
                </a>
                <p className="text-base text-slate lg:text-[0.9375rem]">
                  {copy.footer.storeNote}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hair pt-6 text-small text-slate sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>
            © {year} {company.legalName.value}
          </p>
          <a
            href="#top"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-label font-medium text-navy"
          >
            {copy.footer.backToTop}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
              focusable="false"
              className="size-4"
            >
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
