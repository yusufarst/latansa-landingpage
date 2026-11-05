import { Fragment, type CSSProperties } from "react";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { contactActions, siplahStore } from "@/lib/links";
import { ContactButton, ExternalButton } from "./actions";
import { PinIcon } from "./icons";
import { Photo } from "./photo";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Hero (art-direction §6.2): headline, company line and actions on white,
 * with the annotated photograph. Mobile and tablet place the actions on the
 * photo's lower third; from 1024px they sit in the copy column.
 */
export function Hero() {
  const headline = company.positioning.headline.text;
  const words = headline.split(/\s+/);
  const [primary] = contactActions();
  const store = siplahStore();
  const region = company.address.value.regionShort;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <div className="frame lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-10 lg:pb-12 2xl:pt-14 2xl:pb-16">
        <div className="pt-5 md:pt-10 lg:col-span-7 lg:pt-0 lg:pr-6 xl:col-span-6">
          <h1
            id="hero-heading"
            className="text-display font-semibold lg:text-[length:clamp(2.875rem,0.72rem+3.37vw,3.75rem)]"
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
          <p className="hero-in mt-3 max-w-[30rem] text-[1rem] leading-[1.55] text-slate md:mt-5 md:text-body lg:mt-6 lg:text-lead">
            {copy.hero.line}
          </p>

          <div className="hero-in mt-9 hidden flex-wrap gap-3 lg:flex">
            {primary && <ContactButton action={primary} variant="navy" />}
            {store && (
              <ExternalButton href={store.url} variant="line">
                {copy.actions.siplahShort}
              </ExternalButton>
            )}
          </div>

          <dl className="hero-in mt-10 hidden gap-10 border-t border-hair pt-5 lg:flex">
            <div>
              <dt className="text-label text-slate">{copy.hero.locationLabel}</dt>
              <dd className="mt-1 text-[0.9375rem] font-semibold">{region}</dd>
            </div>
            {store && (
              <div>
                <dt className="text-label text-slate">{copy.hero.channelLabel}</dt>
                <dd className="mt-1 text-[0.9375rem] font-semibold">{store.name}</dd>
              </div>
            )}
          </dl>
        </div>

        <figure className="hero-fig photo relative -mx-page mt-5 aspect-[4/5] md:mt-8 md:aspect-[3/2] lg:col-span-5 lg:mt-0 lg:-mr-page lg:ml-0 lg:aspect-[6/5.4] xl:col-span-6">
          <Photo
            slot="hero"
            priority
            sizes="(min-width: 1440px) 815px, (min-width: 1280px) 56vw, (min-width: 1024px) 47vw, (min-width: 768px) 100vw, 161vw"
          />
          <p className="chip hero-in">{copy.hero.photoTag}</p>
          <div aria-hidden="true">
            <span
              className="ann"
              style={{ "--x": "var(--a1x)", "--y": "var(--a1y)", "--i": 0 } as Vars}
            >
              <i />
              <b>{copy.hero.annotations.computers}</b>
            </span>
            <span
              className="ann hidden lg:block"
              data-side="right"
              style={{ "--x": "43.6%", "--y": "74.3%", "--i": 1 } as Vars}
            >
              <i />
              <b>{copy.hero.annotations.office}</b>
            </span>
          </div>
          <div className="hero-in on-dark absolute inset-x-page bottom-5 z-[2] grid gap-2.5 md:flex md:flex-wrap md:gap-3 lg:hidden">
            {primary && <ContactButton action={primary} variant="brass" />}
            {store && (
              <ExternalButton href={store.url} variant="ghost">
                {copy.actions.siplahShort}
              </ExternalButton>
            )}
          </div>
        </figure>
      </div>

      <div className="hero-in frame flex items-center justify-between gap-4 pt-4 pb-5 text-label text-slate lg:hidden">
        <span className="inline-flex items-center gap-1.5">
          <PinIcon className="size-[1.05rem] text-brass-deep" />
          {region}
        </span>
        {store && <span>{store.name}</span>}
      </div>
      <div className="ruler" aria-hidden="true" />
    </section>
  );
}
