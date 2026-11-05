import { Fragment, type CSSProperties } from "react";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { contactActions, siplahStore } from "@/lib/links";
import { ContactButton, ExternalButton } from "./actions";
import { Photo } from "./photo";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Hero (art-direction §6.2): a full-bleed photograph with the headline, the
 * company line and both actions set on its quiet, navy-graded side — the
 * bottom on phones, the left from 768px. The photograph is the composition,
 * not a picture next to text.
 */
export function Hero() {
  const headline = company.positioning.headline.text;
  const words = headline.split(/\s+/);
  const [primary] = contactActions();
  const store = siplahStore();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="hero on-dark relative isolate flex overflow-hidden bg-midnight text-white"
    >
      <figure className="hero-media photo absolute inset-0 -z-20 bg-midnight">
        <Photo
          slot="hero"
          priority
          sizes="170vw"
          art={{
            media: "(min-width: 768px)",
            slot: "hero-wide",
            sizes: "(min-width: 1440px) 102vw, (min-width: 1024px) 135vw, 175vw",
          }}
        />
      </figure>
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="hero-veil absolute inset-0 -z-10 bg-midnight opacity-0"
        aria-hidden="true"
      />

      <div className="frame flex flex-col justify-end pt-16 pb-9 md:pb-14 lg:justify-center lg:pt-12 lg:pb-32 2xl:pb-36">
        <div className="hero-copy max-w-[36rem] md:max-w-[29rem] lg:max-w-[40rem]">
          <h1
            id="hero-heading"
            className="text-display font-semibold md:text-[2.875rem] lg:text-[length:clamp(3rem,1.2rem+2.8vw,3.75rem)]"
          >
            <span className="sr-only">{headline}</span>
            <span aria-hidden="true">
              {words.map((word, k) => (
                <Fragment key={k}>
                  <span className="hero-word">
                    <span style={{ "--k": k } as Vars}>{word}</span>
                  </span>
                  {k < words.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          </h1>
          <p className="hero-in mt-4 max-w-[32rem] text-body text-white/80 md:mt-5 lg:mt-6 lg:text-lead">
            {copy.hero.line}
          </p>
          <div
            className="hero-in mt-7 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3 md:w-max lg:mt-9"
            style={{ "--d": "850ms" } as Vars}
          >
            {primary && <ContactButton action={primary} variant="brass" />}
            {store && (
              <ExternalButton href={store.url} variant="ghost">
                {copy.actions.siplahShort}
              </ExternalButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
