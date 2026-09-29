// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/webPageSchema.ts
// JSON-LD for hub / index pages (learning tracks, category indexes, tools list).
// Describes only what the page actually is — a CollectionPage with a name,
// description, URL and language. No ratings, reviews or counts.
// ═══════════════════════════════════════════════════════════════════════════

export interface CollectionPageSchemaInput {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  siteName?: string;
  siteUrl?: string;
}

export function buildCollectionPageSchema(input: CollectionPageSchemaInput) {
  const { name, description, url, inLanguage = "en", siteName = "Behind The Tech", siteUrl = "https://behindthetech.in" } = input;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
  };
}
