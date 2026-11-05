import { company } from "@/content/company";
import { copy } from "@/content/copy";
import { publishedValue } from "@/content/facts";

export interface ContactAction {
  kind: "whatsapp" | "email";
  href: string;
  label: string;
  external: boolean;
}

/** WhatsApp click-to-chat link for an international number ("62…"). */
export const whatsappHref = (number: string) => `https://wa.me/${number}`;

/**
 * Every publishable contact action, WhatsApp first (art-direction §6.9). The
 * email follows automatically while its status allows publishing.
 */
export function contactActions(): ContactAction[] {
  const actions: ContactAction[] = [];
  const whatsapp = publishedValue(company.contact.whatsapp);
  if (whatsapp) {
    actions.push({
      kind: "whatsapp",
      href: whatsappHref(whatsapp),
      label: copy.actions.whatsapp,
      external: true,
    });
  }
  const email = publishedValue(company.contact.email);
  if (email) {
    actions.push({
      kind: "email",
      href: `mailto:${email}`,
      label: copy.actions.email,
      external: false,
    });
  }
  return actions;
}

/** The SIPLah store link and name, when both are publishable. */
export function siplahStore() {
  const channel = company.procurementChannels.find((c) => c.id === "siplah-toko-ladang");
  if (!channel) return null;
  const name = publishedValue(channel.name);
  const url = publishedValue(channel.url);
  return name && url ? { name, url } : null;
}

/** Publishable procurement channels (name + url). */
export function publishedChannels() {
  return company.procurementChannels.flatMap((c) => {
    const name = publishedValue(c.name);
    const url = publishedValue(c.url);
    return name && url ? [{ id: c.id, name, url }] : [];
  });
}
