import type { CSSProperties } from "react";
import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedValue } from "@/content/facts";
import { countWord, fill, formatPhoneId } from "@/lib/format";
import { siplahStore } from "@/lib/links";
import { TextLinkLabel } from "./actions";

/**
 * At-a-glance strip under the hero (art-direction §6.2a): what LATANSA
 * supplies, where to buy, how to reach it. From 1024px it is a white panel
 * overlapping the photograph's lower edge, tying the hero to the page.
 */
export function Overview() {
  const store = siplahStore();
  const whatsapp = publishedValue(company.contact.whatsapp);
  const items = [
    {
      term: copy.overview.categories.term,
      value: fill(copy.overview.categories.value, {
        count: countWord(company.categories.length),
      }),
      href: "#bidang",
      link: copy.overview.categories.link,
    },
    ...(store
      ? [
          {
            term: copy.overview.procurement.term,
            value: store.name,
            href: "#pengadaan",
            link: copy.overview.procurement.link,
          },
        ]
      : []),
    ...(whatsapp
      ? [
          {
            term: copy.overview.contact.term,
            value: fill(copy.overview.contact.value, {
              // Non-breaking hyphens keep the number on one line.
              number: formatPhoneId(whatsapp).replaceAll("-", "‑"),
            }),
            href: "#kontak",
            link: copy.overview.contact.link,
          },
        ]
      : []),
  ];

  return (
    <section aria-label={copy.overview.label} className="relative z-10">
      <div className="frame">
        <dl
          className="hero-in grid border-b border-hair md:grid-cols-3 lg:-mt-24 lg:border lg:bg-white"
          style={{ "--d": "1000ms" } as CSSProperties}
        >
          {items.map((item, i) => (
            <div
              key={item.term}
              className={
                "flex flex-col py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 " +
                (i > 0
                  ? "border-t border-hair md:border-t-0 md:border-l"
                  : "md:pl-0 lg:pl-10")
              }
            >
              <dt className="text-label font-semibold text-brass-deep">{item.term}</dt>
              <dd className="mt-2 text-[1.125rem] leading-snug font-semibold tracking-[-0.01em] lg:text-[1.25rem]">
                {item.value}
              </dd>
              <dd className="mt-auto pt-1">
                <a
                  href={item.href}
                  className="tlink text-base text-slate lg:text-[0.9375rem]"
                >
                  <TextLinkLabel>{item.link}</TextLinkLabel>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
