import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { siplahStore } from "@/lib/links";
import { ExternalButton } from "./actions";

/**
 * Pengadaan (art-direction §6.5): the navy band, the page's one centered,
 * symmetrical composition — heading, the three-step flow and the store
 * action on one axis. Renders only while the SIPLah store is publishable;
 * unverified channels (Mbizmarket) never appear.
 */
export function Procurement() {
  const store = siplahStore();
  if (!store) return null;
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
      <div className="frame">
        <div data-reveal="group" className="mx-auto max-w-[46rem] text-center">
          <p className="tag tag-center">{copy.procurement.label}</p>
          <h2 id="pengadaan-heading" className="mt-5 text-h2 font-semibold">
            {copy.procurement.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[38rem] text-body text-mist lg:text-lead">
            {copy.procurement.lede}
          </p>
        </div>

        <div className="relative mx-auto mt-12 w-fit md:w-full md:max-w-[52rem] md:border md:border-hair-inverse md:px-8 md:pt-12 md:pb-11 lg:mt-16 lg:px-12">
          <p className="absolute -top-[0.7rem] left-1/2 hidden -translate-x-1/2 bg-navy px-3 text-label whitespace-nowrap text-mist md:block">
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

        <div className="mt-12 flex flex-col items-center gap-2 lg:mt-14">
          <ExternalButton href={store.url} variant="brass" className="w-full sm:w-auto">
            {copy.actions.siplahLong}
          </ExternalButton>
          <a href="#kontak" className="tlink">
            {copy.actions.otherNeeds}
          </a>
        </div>
      </div>
    </section>
  );
}
