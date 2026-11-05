"use client";

import { useEffect } from "react";

/**
 * Page-level observers, each an IntersectionObserver (no scroll listeners):
 *
 * - Header line (motion M6): shows once the page leaves the top.
 * - Section highlighting (M19): marks the navigation link of the section that
 *   crosses the middle of the viewport with `data-current`.
 * - Scroll reveals (M13–M16): the server HTML never hides content. After
 *   hydration this marks only elements entirely below the viewport as pending
 *   (CSS hides those) and reveals each once it is 16% visible. Elements already
 *   in view, and everything under reduced motion, are left untouched.
 */
export function RevealObserver() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const sentinel = document.getElementById("top-sentinel");
    if (header && sentinel) {
      const lineObserver = new IntersectionObserver(([entry]) => {
        header.dataset.scrolled = String(!entry.isIntersecting);
      });
      lineObserver.observe(sentinel);
      observers.push(lineObserver);
    }

    const spyLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[data-spy]"),
    );
    const sections = Array.from(
      new Set(spyLinks.map((a) => a.getAttribute("href"))),
      (href) => (href ? document.querySelector<HTMLElement>(href) : null),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length) {
      const setCurrent = (href: string | null) => {
        for (const link of spyLinks) {
          link.dataset.current = String(link.getAttribute("href") === href);
        }
      };
      const spy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
            // Back above the first section (the hero): no link is current.
            else if (entry.target === sections[0] && entry.boundingClientRect.top > 0)
              setCurrent(null);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      sections.forEach((section) => spy.observe(section));
      observers.push(spy);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.revealState = "in";
            revealObserver.unobserve(entry.target);
          }
        },
        { threshold: 0.16 },
      );
      const fold = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (el.dataset.revealState === "in") continue;
        if (el.getBoundingClientRect().top >= fold) {
          el.dataset.revealState = "pending";
          revealObserver.observe(el);
        }
      }
      observers.push(revealObserver);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
