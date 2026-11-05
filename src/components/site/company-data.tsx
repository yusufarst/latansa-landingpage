import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { addressLine } from "@/lib/format";
import { publishedChannels } from "@/lib/links";
import { SectionHeading } from "./section-heading";

/**
 * Data perusahaan (art-direction §6.6): the company's identity set like a
 * document — letterhead rule, crop-mark corners, defined terms. The PKP line
 * uses the exact approved wording. There is no NPWP row and no badge.
 */
export function CompanyData() {
  const channels = publishedChannels().map((c) => c.name);
  const rows = [
    { term: copy.data.terms.name, value: company.legalName.value, strong: true },
    { term: copy.data.terms.legalForm, value: company.legalForm.value },
    {
      term: company.taxStatus.value.label,
      value: company.taxStatus.value.value,
      strong: true,
    },
    { term: copy.data.terms.address, value: addressLine(company.address.value) },
    ...(channels.length
      ? [{ term: copy.data.terms.channels, value: channels.join(", ") }]
      : []),
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

        <div className="doc-sheet mt-10 px-5 pt-5 pb-2 md:px-8 md:pt-7 md:pb-3 lg:col-span-8 lg:col-start-5 lg:mt-0 lg:px-10 lg:pt-9 lg:pb-4 xl:col-span-7 xl:col-start-6">
          <span className="corner corner-tl" aria-hidden="true" />
          <span className="corner corner-tr" aria-hidden="true" />
          <span className="corner corner-bl" aria-hidden="true" />
          <span className="corner corner-br" aria-hidden="true" />
          <div className="kop" aria-hidden="true" />
          <dl className="mt-2">
            {rows.map((row) => (
              <div
                key={row.term}
                className="grid gap-1 border-b border-hair py-4 last:border-b-0 md:grid-cols-[13rem_1fr] md:items-baseline md:gap-6 md:py-[1.125rem] lg:grid-cols-[10.5rem_1fr] xl:grid-cols-[13rem_1fr]"
              >
                <dt className="text-label text-slate">{row.term}</dt>
                <dd
                  className={
                    row.strong
                      ? "text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em]"
                      : "text-[1.0625rem] leading-snug font-medium tabular-nums"
                  }
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
