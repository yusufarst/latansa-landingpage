import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedValue } from "@/content/facts";
import { addressLines, formatPhoneId } from "@/lib/format";
import { contactActions, whatsappHref } from "@/lib/links";
import { ContactButton, ExternalTextLink } from "./actions";
import { Locator } from "./locator";
import { SectionHeading } from "./section-heading";

/**
 * Kontak (art-direction §6.7): the midnight band. Every action comes from a
 * publishable fact: WhatsApp now; the planned email only once it is activated.
 * Location links open the owner-confirmed Google Maps listing.
 */
export function Contact() {
  const actions = contactActions();
  const whatsapp = publishedValue(company.contact.whatsapp);
  const email = publishedValue(company.contact.email);
  const hours = publishedValue(company.officeHours);
  const coordinates = publishedValue(company.coordinates);
  const mapsHref = publishedValue(company.mapsUrl);
  const [line1, line2] = addressLines(company.address.value);

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className="on-dark bg-midnight py-section text-white"
    >
      <div className="frame lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-5">
          <SectionHeading
            id="kontak-heading"
            label={copy.contact.label}
            heading={copy.contact.heading}
            lede={copy.contact.lede}
            dark
          />

          {actions.length > 0 && (
            <div className="mt-9 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {actions.map((action, i) => (
                <ContactButton
                  key={action.kind}
                  action={action}
                  variant={i === 0 ? "brass" : "ghost"}
                />
              ))}
            </div>
          )}

          <dl className="mt-11 grid gap-8 border-t border-hair-inverse pt-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-label text-mist">{copy.contact.addressLabel}</dt>
              <dd className="mt-2">
                <address className="text-[1.0625rem] leading-relaxed not-italic">
                  {line1}
                  <br />
                  {line2}
                </address>
                {mapsHref && (
                  <ExternalTextLink href={mapsHref} className="mt-1">
                    {copy.actions.maps}
                  </ExternalTextLink>
                )}
              </dd>
            </div>
            {whatsapp && (
              <div>
                <dt className="text-label text-mist">{copy.contact.whatsappLabel}</dt>
                <dd className="mt-1">
                  <a
                    href={whatsappHref(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tlink text-[1.0625rem] tabular-nums"
                  >
                    {formatPhoneId(whatsapp)}
                    <span className="sr-only"> {copy.externalHint}</span>
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt className="text-label text-mist">{copy.contact.emailLabel}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${email}`} className="tlink text-[1.0625rem]">
                    {email}
                  </a>
                </dd>
              </div>
            )}
            {hours && (
              <div>
                <dt className="text-label text-mist">{copy.contact.hoursLabel}</dt>
                <dd className="mt-2 grid gap-1 text-[1.0625rem]">
                  {hours.map((row) => (
                    <span
                      key={row.days}
                      className="flex justify-between gap-6 tabular-nums"
                    >
                      <span>{row.days}</span>
                      <span>{row.hours}</span>
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Locator
            href={mapsHref}
            label={`${copy.actions.maps}: ${company.legalName.value}`}
            caption={copy.contact.locatorCaption}
            coordinates={coordinates?.display}
          />
        </div>
      </div>
    </section>
  );
}
