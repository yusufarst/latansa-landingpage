import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { site } from "@/config/site";
import { company } from "@/content/company";
import "./globals.css";

// Fonts are downloaded at build time and self-hosted from /_next/static —
// no runtime requests to Google. Typography is provisional until Phase 3.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
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
  themeColor: "#172b36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      className={`${newsreader.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
