import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import { company } from "@/content/company";
import "./globals.css";

// Plus Jakarta Sans (OFL; Tokotype, Indonesia): one variable family for
// display, text, UI and data. Downloaded at build time and self-hosted from
// /_next/static, so visitors never request Google Fonts.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: company.seo.title,
  description: company.seo.description,
  applicationName: company.legalName.value,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: company.legalName.value,
    title: company.seo.title,
    description: company.seo.description,
  },
  robots: site.launchReady
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
