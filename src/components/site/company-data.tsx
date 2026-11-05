import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { addressLine } from "@/lib/format";
import { publishedChannels } from "@/lib/links";
import { SectionHeading } from "./section-heading";

/**
 * Data perusahaan (art-direction §6.6): the company's identity set like a
 * formal document — letterhead rule, crop-mark corners, the legal name as its
 * title and the particulars below. The PKP line uses the exact approved
 * wording. There is no NPWP field and no badge.
 */
export function CompanyData() {
  const channels = publishedChannels().map((c) => c.name);
  const particulars = [
    { term: copy.data.terms.legalForm, value: company.legalForm.value },
    { term: company.taxStatus.value.label, value: company.taxStatus.value.value },
    ...(channels.length
      ? [{ term: copy.data.terms.channels, value: channels.join(", ") }]
      : []),
    { term: copy.data.terms.domicile, value: company.address.value.regionShort },
    {
      term: copy.data.terms.address,
      value: addressLine(company.address.value),
      wide: true,
    },
  ];

  return (
    <section id="data" aria-labelledby="data-heading" className="py-section">
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-x-8">
        <SectionHeading
          id="data-heading"
          label={copy.data.label}
          heading={copy.data.heading}
          lede={copy.data.lede}
          className="lg:col-span-4 lg:pr-4"
        />

        <div className="doc-sheet mt-10 px-5 pt-6 pb-3 md:px-10 md:pt-9 md:pb-5 lg:col-span-8 lg:mt-0 lg:px-12 lg:pt-11 lg:pb-7">
          <span className="corner corner-tl" aria-hidden="true" />
          <span className="corner corner-tr" aria-hidden="true" />
          <span className="corner corner-bl" aria-hidden="true" />
          <span className="corner corner-br" aria-hidden="true" />
          <div className="kop" aria-hidden="true" />

          {/* One grid on the dl itself: every dt/dd pair is a direct div child. */}
          <dl className="mt-7 grid md:mt-9 md:grid-cols-2 md:gap-x-10">
            <div className="border-b border-hair pb-6 md:col-span-2 md:pb-8">
              <dt className="text-label text-slate">{copy.data.terms.name}</dt>
              <dd className="mt-1.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] md:text-[1.875rem]">
                {company.legalName.value}
              </dd>
            </div>
            {particulars.map((item) => (
              <div
                key={item.term}
                className={
                  "grid gap-1 border-b border-hair py-5 last:border-b-0 md:py-6 " +
                  (item.wide ? "md:col-span-2" : "")
                }
              >
                <dt className="text-label text-slate">{item.term}</dt>
                <dd className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] md:text-[1.125rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
