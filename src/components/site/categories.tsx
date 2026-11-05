import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { categoryPhoto } from "@/content/images";
import { cx } from "@/lib/cx";
import { countWord, fill } from "@/lib/format";
import { CategoryScroller } from "./category-scroller";
import { Photo } from "./photo";
import { SectionHeading } from "./section-heading";

/**
 * Desktop mosaic placement per card (art-direction §6.4): deliberately
 * different sizes and vertical offsets, never a uniform card grid.
 */
const MOSAIC = [
  { card: "lg:col-span-7", photo: "lg:aspect-[3/2]" },
  { card: "lg:col-span-5 lg:col-start-8 lg:mt-24", photo: "lg:aspect-square" },
  { card: "lg:col-span-4 lg:col-start-1", photo: "lg:aspect-[4/5]" },
  {
    card: "lg:col-span-4 lg:col-start-5 lg:mt-20 xl:col-span-5",
    photo: "lg:aspect-[4/3]",
  },
  {
    card: "lg:col-span-4 lg:col-start-9 lg:mt-6 xl:col-span-3 xl:col-start-10",
    photo: "lg:aspect-[3/4]",
  },
];

/** Focal point per photograph (all breakpoints). */
const FOCAL: Record<string, string> = {
  computers: "50% 50%",
  office: "55% 40%",
  electronics: "62% 50%",
  institutional: "38% 50%",
  supporting: "45% 50%",
};

const SIZES: Record<string, string> = {
  computers:
    "(min-width: 1440px) 785px, (min-width: 1024px) 54vw, (min-width: 768px) 74vw, 135vw",
  office:
    "(min-width: 1440px) 785px, (min-width: 1024px) 54vw, (min-width: 768px) 74vw, 135vw",
  electronics:
    "(min-width: 1440px) 785px, (min-width: 1024px) 54vw, (min-width: 768px) 74vw, 135vw",
  institutional:
    "(min-width: 1440px) 695px, (min-width: 1024px) 48vw, (min-width: 768px) 87vw, 160vw",
  supporting:
    "(min-width: 1440px) 600px, (min-width: 1024px) 42vw, (min-width: 768px) 74vw, 135vw",
};

/** Bidang usaha (art-direction §6.4): five categories with real photography. */
export function Categories() {
  const { categories } = company;
  const heading = fill(copy.categories.heading, { count: countWord(categories.length) });

  return (
    <section id="bidang" aria-labelledby="bidang-heading" className="bg-cloud py-section">
      <div className="frame">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <SectionHeading
            id="bidang-heading"
            label={copy.categories.label}
            heading={heading}
            className="lg:col-span-7"
          />
          <p
            data-reveal="group"
            className="mt-5 max-w-[32rem] text-body text-slate lg:col-span-4 lg:col-start-9 lg:mt-0 lg:mb-1.5 lg:text-lead"
          >
            {copy.categories.lede}
          </p>
        </div>

        <CategoryScroller
          label={copy.categories.scrollerLabel}
          swipeHint={copy.categories.swipeHint}
          className="-mx-page mt-10 flex snap-x snap-mandatory scroll-px-page [scrollbar-width:none] gap-4 overflow-x-auto px-page pb-1 md:mt-12 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-[4.5rem] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category, i) => {
            const slot = categoryPhoto[category.id];
            const place = MOSAIC[i % MOSAIC.length];
            return (
              <article
                key={category.id}
                className={cx(
                  "shrink-0 grow-0 basis-[80%] snap-start xs:basis-[74%] md:basis-[44%] lg:basis-auto",
                  place.card,
                )}
              >
                <figure
                  data-reveal="photo"
                  className={cx("photo aspect-[4/5]", place.photo)}
                >
                  <Photo
                    slot={slot}
                    sizes={SIZES[slot]}
                    style={{ objectPosition: FOCAL[slot] }}
                  />
                </figure>
                <h3 className="mt-[1.125rem] text-title font-semibold lg:mt-5 lg:text-[1.375rem]">
                  {category.title}
                </h3>
                <p className="mt-2 max-w-[30rem] text-[1rem] leading-relaxed text-slate lg:text-body">
                  {category.summary}
                </p>
              </article>
            );
          })}
        </CategoryScroller>
      </div>
    </section>
  );
}
