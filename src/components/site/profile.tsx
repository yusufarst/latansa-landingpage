import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedChannels } from "@/lib/links";
import { Photo } from "./photo";

/**
 * Profil (art-direction §6.3): one statement, one architectural photograph
 * and a ruled row of facts, with generous air around each.
 */
export function Profile() {
  const [statement, body] = company.positioning.profile;
  const channels = publishedChannels().map((c) => c.name);
  const facts = [
    { term: copy.profile.facts.location, value: company.address.value.regionShort },
    { term: copy.profile.facts.legalForm, value: company.legalForm.value },
    ...(channels.length
      ? [{ term: copy.profile.facts.channels, value: channels.join(", ") }]
      : []),
  ];

  return (
    <section id="profil" aria-labelledby="profil-heading" className="py-section">
      <div className="frame lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8">
        <div data-reveal="group" className="lg:col-span-6">
          <p className="tag">{copy.profile.label}</p>
          <h2
            id="profil-heading"
            className="mt-5 text-statement font-normal text-navy lg:mt-6 lg:font-light"
          >
            {statement}
          </h2>
        </div>

        <figure
          data-reveal="photo"
          className="photo -mx-page mt-10 aspect-[3/2] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-18 lg:-mr-page lg:ml-0 lg:aspect-[4/5]"
        >
          <Photo
            slot="profile"
            sizes="(min-width: 1440px) 1113px, (min-width: 1024px) 76vw, 100vw"
            className="[object-position:50%_30%] lg:[object-position:40%_50%]"
          />
        </figure>

        <div className="lg:col-span-6 lg:row-start-2">
          <p className="mt-9 max-w-[34rem] text-body text-slate lg:mt-10">{body}</p>
          <dl className="mt-9 grid border-t border-navy md:grid-cols-3 md:gap-x-8 lg:grid-cols-1">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="grid gap-1 border-b border-hair py-[1.125rem] lg:grid-cols-[11rem_1fr] lg:items-baseline lg:gap-6"
              >
                <dt className="text-label text-slate">{fact.term}</dt>
                <dd className="text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
