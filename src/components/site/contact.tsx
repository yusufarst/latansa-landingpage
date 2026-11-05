import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedValue } from "@/content/facts";
import { addressLines, formatPhoneId } from "@/lib/format";
import { contactActions, mapsSearchHref } from "@/lib/links";
import { ContactButton, ExternalTextLink } from "./actions";
import { Locator } from "./locator";
import { SectionHeading } from "./section-heading";

/**
 * Kontak (art-direction §6.7): the midnight band. Every action comes from a
 * publishable fact (WhatsApp first); the planned email stays hidden until it
 * is activated. The map link uses the company's own listing once the client
 * confirms it, and a search for the client-provided address until then.
 */
export function Contact() {
  const actions = contactActions();
  const whatsapp = publishedValue(company.contact.whatsapp);
  const email = publishedValue(company.contact.email);
  const hours = publishedValue(company.officeHours);
  const coordinates = publishedValue(company.coordinates);
  const mapsHref =
    publishedValue(company.mapsUrl) ?? mapsSearchHref(company.address.value);
  const [line1, line2] = addressLines(company.address.value);

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-heading"
      className="on-dark bg-midnight py-section text-white"
    >
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <SectionHeading
            id="kontak-heading"
            label={copy.contact.label}
            heading={copy.contact.heading}
            lede={copy.contact.lede}
            dark
          />

          {actions.length > 0 && (
            <div className="mt-9 grid gap-2.5 md:flex md:flex-wrap md:gap-3">
              {actions.map((action, i) => (
                <ContactButton
                  key={action.kind}
                  action={action}
                  variant={i === 0 ? "brass" : "ghost"}
                />
              ))}
            </div>
          )}

          <dl className="mt-11 grid gap-7">
            <div>
              <dt className="text-label text-mist">{copy.contact.addressLabel}</dt>
              <dd className="mt-2">
                <address className="text-[1.0625rem] leading-relaxed not-italic">
                  {line1}
                  <br />
                  {line2}
                </address>
                <ExternalTextLink href={mapsHref} className="mt-1">
                  {copy.actions.maps}
                </ExternalTextLink>
              </dd>
            </div>
            {whatsapp && (
              <div>
                <dt className="text-label text-mist">{copy.contact.whatsappLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] font-medium tabular-nums">
                  {formatPhoneId(whatsapp)}
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt className="text-label text-mist">{copy.contact.emailLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] font-medium">{email}</dd>
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
            caption={copy.contact.locatorCaption}
            coordinates={coordinates?.display}
          />
        </div>
      </div>
    </section>
  );
}
