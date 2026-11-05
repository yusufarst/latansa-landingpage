import type { ReactNode } from "react";
import { copy } from "@/content/copy";
import { cx } from "@/lib/cx";
import type { ContactAction } from "@/lib/links";
import { ExternalIcon, MailIcon, WhatsAppIcon } from "./icons";

type Variant = "brass" | "navy" | "ghost" | "line";

const variantClass: Record<Variant, string> = {
  brass: "btn btn-brass",
  navy: "btn btn-navy",
  ghost: "btn btn-ghost",
  line: "btn btn-line",
};

/** A contact action (WhatsApp or email) rendered as a button. */
export function ContactButton({
  action,
  variant,
  className,
}: {
  action: ContactAction;
  variant: Variant;
  className?: string;
}) {
  const Icon = action.kind === "whatsapp" ? WhatsAppIcon : MailIcon;
  return (
    <a
      href={action.href}
      className={cx(variantClass[variant], className)}
      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon />
      {action.label}
      {action.external && <span className="sr-only"> {copy.externalHint}</span>}
    </a>
  );
}

/** A button that opens another site in a new tab. */
export function ExternalButton({
  href,
  variant,
  className,
  children,
}: {
  href: string;
  variant: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(variantClass[variant], className)}
    >
      {children}
      <ExternalIcon />
      <span className="sr-only"> {copy.externalHint}</span>
    </a>
  );
}

/** An underlined text link that opens another site in a new tab. */
export function ExternalTextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("tlink", className)}
    >
      {children}
      <ExternalIcon />
      <span className="sr-only"> {copy.externalHint}</span>
    </a>
  );
}
