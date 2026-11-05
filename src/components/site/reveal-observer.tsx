"use client";

import { useEffect } from "react";

/**
 * Scroll reveals (motion M13–M16) and the header line (M6), each with one
 * IntersectionObserver and no scroll listeners.
 *
 * The server HTML never hides content. After hydration this marks only the
 * elements entirely below the viewport as pending (CSS hides those), then
 * reveals each once it is 16% visible. Elements already in view, and
 * everything under reduced motion, are left untouched.
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
