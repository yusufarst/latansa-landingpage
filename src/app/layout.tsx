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

/** The share image (scripts/og-image.mjs), for Open Graph and X/Twitter. */
const shareImage = {
  url: "/og/latansa-og.jpg",
  width: 1200,
  height: 630,
  alt: company.seo.ogImageAlt,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: company.seo.title,
    // Other pages (the 404) read "<title> — CV. Latansa Jogjakarta".
    template: `%s — ${company.legalName.value}`,
  },
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
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: company.seo.title,
    description: company.seo.description,
    images: [shareImage],
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
