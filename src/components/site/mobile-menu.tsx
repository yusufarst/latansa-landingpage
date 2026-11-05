"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

interface MenuLink {
  href: string;
  label: string;
  hint: string;
}

interface MobileMenuProps {
  links: readonly MenuLink[];
  labels: { open: string; close: string; menu: string };
  /** The primary contact action, rendered on the server. */
  action?: ReactNode;
  address: string;
  className?: string;
}

/**
 * Mobile and tablet menu (motion M7–M9). The sheet stays mounted and its
 * transitions are CSS. While open it is a modal dialog: focus is trapped,
 * Esc closes it, the page behind is inert and does not scroll, and focus
 * returns to the button on close.
 */
export function MobileMenu({
  links,
  labels,
  action,
  address,
  className,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    if (!open) {
      // Navigate after the page is interactive again (not inert, scrollable).
      const hash = pendingHash.current;
      pendingHash.current = null;
      if (hash) {
        if (window.location.hash === hash) {
          document.querySelector(hash)?.scrollIntoView({ block: "start" });
        } else {
          window.location.hash = hash;
        }
      }
      return;
    }

    const outside = [document.getElementById("konten"), document.querySelector("footer")];
    for (const el of outside) el?.setAttribute("inert", "");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current
      ?.querySelector<HTMLElement>("a[href]")
      ?.focus({ preventScroll: true });

    const focusables = () =>
      [
        buttonRef.current,
        ...(sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
      ].filter((el): el is HTMLElement => el !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      for (const el of outside) el?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const onSheetClick = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (href?.startsWith("#")) {
      event.preventDefault();
      pendingHash.current = href;
    }
    setOpen(false);
  };

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center gap-3 pl-3 text-[0.9375rem] font-semibold"
      >
        <span>{open ? labels.close : labels.open}</span>
        <span className="menu-icon" aria-hidden="true" />
      </button>

      <div
        id={sheetId}
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        data-open={open}
        onClick={onSheetClick}
        className="menu-sheet on-dark"
      >
        <nav aria-label={labels.menu}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="menu-link" data-spy>
                  {link.label}
                  <small>{link.hint}</small>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 pt-10">
          {action}
          <p className="mt-1 text-[0.875rem] leading-relaxed text-mist">{address}</p>
        </div>
      </div>
    </div>
  );
}
