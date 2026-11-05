"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

interface CategoryScrollerProps {
  label: string;
  swipeHint: string;
  className: string;
  children: ReactNode;
}

/**
 * The category row: a swipeable, snap-aligned scroller below 1024px and a
 * mosaic grid above it (layout in CSS). The meter tracks the card at the
 * scroller's start with an IntersectionObserver (motion M17), and the region
 * is focusable only while it actually scrolls.
 */
export function CategoryScroller({
  label,
  swipeHint,
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

  return (
    <>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
        className={className}
      >
        {children}
      </div>
      <div className="meter mt-7 lg:hidden" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <i key={i} data-active={i === active} />
        ))}
        <span className="ml-auto text-label text-slate">{swipeHint}</span>
      </div>
    </>
  );
}
