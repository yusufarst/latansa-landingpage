import brandAssets from "@/config/brand-assets.json";
import { site } from "@/config/site";
import { company } from "@/content/company";
import { publishedValue } from "@/content/facts";
import { siplahStore } from "@/lib/links";

/**
 * Schema.org JSON-LD for search engines (Phase 6): the organization and the
 * website. Built only from publishable facts, like the visible page: no NPWP
 * or tax ID, no opening hours until confirmed, no founding year, no claims.
 * The WhatsApp number is not given as a `telephone`: the site offers it for
 * chat, and the owner has not said it takes calls.
 */
export function StructuredData() {
  const email = publishedValue(company.contact.email);
  const coordinates = publishedValue(company.coordinates);
  const mapsUrl = publishedValue(company.mapsUrl);
  const store = siplahStore();
  const a = company.address.value;
  const logo = brandAssets["latansa-logo-vertical"]["960"];
  const organizationId = `${site.url}/#organization`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: `${a.street}, ${a.village}, ${a.district}`,
    addressLocality: a.regency,
    addressRegion: a.province,
    postalCode: a.postalCode,
    addressCountry: "ID",
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: company.legalName.value,
        legalName: company.legalName.value,
        alternateName: company.shortName.value,
        url: `${site.url}/`,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}${logo.png}`,
          width: logo.width,
          height: logo.height,
        },
        description: company.positioning.summary,
        address,
        ...(email && { email }),
        ...(store && { sameAs: [store.url] }),
        ...((coordinates || mapsUrl) && {
          location: {
            "@type": "Place",
            address,
            ...(coordinates && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              },
            }),
            ...(mapsUrl && { hasMap: mapsUrl }),
          },
        }),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: company.legalName.value,
        inLanguage: "id-ID",
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
