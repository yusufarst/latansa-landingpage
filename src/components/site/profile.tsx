import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { Photo } from "./photo";

/**
 * Profil (art-direction §6.3): one statement and one architectural
 * photograph, balanced side by side from 1024px, with generous air.
 */
export function Profile() {
  const [statement, body] = company.positioning.profile;

  return (
    <section id="profil" aria-labelledby="profil-heading" className="py-section">
      <div className="frame lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div data-reveal="group" className="lg:col-span-6 xl:col-span-6">
          <p className="tag">{copy.profile.label}</p>
          <h2
            id="profil-heading"
            className="mt-5 text-statement font-normal text-navy lg:mt-6 lg:font-light"
          >
            {statement}
          </h2>
          <p className="mt-6 max-w-[34rem] text-body text-slate lg:mt-8">{body}</p>
        </div>

        <figure
          data-reveal="photo"
          className="photo -mx-page mt-10 aspect-[3/2] md:mx-0 md:mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:-mr-page lg:aspect-[4/5]"
        >
          <Photo
            slot="profile"
            sizes="(min-width: 1440px) 1113px, (min-width: 1024px) 76vw, (min-width: 768px) 95vw, 100vw"
            className="[object-position:50%_30%] lg:[object-position:40%_50%]"
          />
        </figure>
      </div>
    </section>
  );
}
