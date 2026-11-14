import type { Listing } from "@/content/listings";
import { site } from "@/content/site";

/** Renders schema.org structured data. `<` is escaped so the JSON can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function agentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    url: site.url,
    telephone: `+1-${site.phone}`,
    image: `${site.url}/images/billy/billy-headshot.png`,
    description: site.description,
    areaServed: site.serviceAreas.map((city) => ({ "@type": "City", name: `${city}, VA` })),
    parentOrganization: { "@type": "RealEstateAgent", name: site.brokerage },
  };
}

export function listingJsonLd(listing: Listing) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: `${listing.street}, ${listing.city}, ${listing.state}`,
    url: `${site.url}/listings/${listing.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.street,
      addressLocality: listing.city,
      addressRegion: listing.state,
      ...(listing.zip && { postalCode: listing.zip }),
      addressCountry: "US",
    },
  };
  if (listing.image) data.image = `${site.url}${listing.image.src}`;
  if (listing.beds != null) data.numberOfRooms = listing.beds;
  if (listing.baths != null) data.numberOfBathroomsTotal = listing.baths;
  if (listing.sqft != null) data.floorSize = { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" };
  if (listing.yearBuilt != null) data.yearBuilt = listing.yearBuilt;
  return data;
}
