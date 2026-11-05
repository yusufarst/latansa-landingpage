import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { fill } from "@/lib/format";
import { publishedChannels, siplahStore } from "@/lib/links";
import { ExternalButton, ExternalTextLink } from "./actions";
import { SectionHeading } from "./section-heading";

/**
 * Pengadaan (art-direction §6.5): the navy band. Renders only while the SIPLah
 * store is publishable; the flow describes SIPLah only, and any other verified
 * channel appears as a plain external link.
 */
export function Procurement() {
  const store = siplahStore();
  if (!store) return null;
  const others = publishedChannels().filter((c) => c.id !== "siplah-toko-ladang");
  const { steps } = copy.procurement;
  const flow = [
    { title: company.legalName.value, note: steps.supplier },
    { title: store.name, note: steps.store, current: true },
    { title: steps.buyer, note: steps.buyerNote },
  ];

  return (
    <section
      id="pengadaan"
      aria-labelledby="pengadaan-heading"
      className="on-dark bg-navy py-section text-white"
    >
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-x-8">
        <SectionHeading
          id="pengadaan-heading"
          label={copy.procurement.label}
          heading={copy.procurement.heading}
          lede={copy.procurement.lede}
          dark
          className="lg:col-span-5 lg:row-start-1"
        />

        <div className="relative mt-11 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center lg:border lg:border-hair-inverse lg:px-9 lg:pt-11 lg:pb-12">
          <p className="absolute -top-[0.7rem] left-7 hidden bg-navy px-2 text-label text-mist lg:block">
            {copy.procurement.flowCaption}
          </p>
          <ol data-reveal="flow" aria-label={copy.procurement.flowLabel} className="flow">
            {flow.map((step) => (
              <li key={step.title} data-current={step.current || undefined}>
                <span className="block text-[1.1875rem] leading-tight font-semibold tracking-[-0.015em]">
                  {step.title}
                </span>
                <span className="mt-1.5 block text-label text-mist">{step.note}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-11 grid justify-items-start gap-2 lg:col-span-5 lg:row-start-2 lg:mt-10">
          <ExternalButton href={store.url} variant="brass" className="w-full md:w-auto">
            {copy.actions.siplahLong}
          </ExternalButton>
          <a href="#kontak" className="tlink">
            {copy.actions.otherNeeds}
          </a>
          {others.map((channel) => (
            <ExternalTextLink key={channel.id} href={channel.url}>
              {fill(copy.procurement.otherChannel, { channel: channel.name })}
            </ExternalTextLink>
          ))}
        </div>
      </div>
    </section>
  );
}
