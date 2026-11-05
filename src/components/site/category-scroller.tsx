"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

interface CategoryScrollerProps {
  label: string;
  labels: { previous: string; next: string; position: string };
  className: string;
  children: ReactNode;
}

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
    focusable="false"
    style={flip ? { transform: "scaleX(-1)" } : undefined}
  >
    <path d="m9 5 7 7-7 7" />
  </svg>
);

/**
 * The category row (motion M17): a native, snap-aligned swipe carousel below
 * 1024px and a mosaic above it (layout in CSS). Previous and next buttons give
 * a non-swipe alternative; the meter and the "1 dari 5" position follow the
 * card at the scroller's start through an IntersectionObserver.
 */
export function CategoryScroller({
  label,
  labels,
  className,
  children,
}: CategoryScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;
    const cards = Array.from(scroller.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(cards.indexOf(entry.target as HTMLElement));
        }
      },
      { root: scroller, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));

    const measure = () => setScrollable(scroller.scrollWidth > scroller.clientWidth + 1);
    const resize = new ResizeObserver(measure);
    resize.observe(scroller);
    measure();

    return () => {
      observer.disconnect();
      resize.disconnect();
    };
  }, []);

  const go = (index: number) => {
    const scroller = ref.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const padding = parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0;
    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft - padding,
      behavior: reduce ? "auto" : "smooth",
    });
    setActive(index);
  };

  const position = labels.position
    .replace("{current}", String(active + 1))
    .replace("{total}", String(count));

  return (
    <>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
        className={className}
      >
        {children}
      </div>
      <div className="mt-7 flex items-center gap-4 lg:hidden">
        <div className="meter" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <i key={i} data-active={i === active} />
          ))}
        </div>
        <p className="text-label text-slate tabular-nums" aria-live="polite">
          {position}
        </p>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="carousel-btn"
            aria-label={labels.previous}
            disabled={active === 0}
            onClick={() => go(Math.max(0, active - 1))}
          >
            <Chevron flip />
          </button>
          <button
            type="button"
            className="carousel-btn"
            aria-label={labels.next}
            disabled={active === count - 1}
            onClick={() => go(Math.min(count - 1, active + 1))}
          >
            <Chevron />
          </button>
        </div>
      </div>
    </>
  );
}
