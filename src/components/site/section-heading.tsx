import { cx } from "@/lib/cx";

interface SectionHeadingProps {
  id: string;
  label: string;
  heading: string;
  lede?: string;
  /** Text colors for the navy and midnight bands. */
  dark?: boolean;
  className?: string;
}

/**
 * Section label, heading and lede, revealed as one group (motion M14). The
 * label repeats the section's navigation name, so the menu and the page share
 * one vocabulary.
 */
export function SectionHeading({
  id,
  label,
  heading,
  lede,
  dark,
  className,
}: SectionHeadingProps) {
  return (
    <div data-reveal="group" className={className}>
      <p className="tag">{label}</p>
      <h2 id={id} className="mt-5 text-h2 font-semibold">
        {heading}
      </h2>
      {lede && (
        <p
          className={cx(
            "mt-5 max-w-[34rem] text-body lg:text-lead",
            dark ? "text-mist" : "text-slate",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
