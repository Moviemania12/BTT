// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/articleSchema.ts
// Reusable JSON-LD Article schema builder, shared across all articles.
// ═══════════════════════════════════════════════════════════════════════════

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  authorName: string;
  canonicalUrl: string;
  datePublished: string;
  dateModified?: string;
  siteName?: string;
  siteUrl?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const {
    headline, description, authorName, canonicalUrl, datePublished, dateModified,
    siteName = "Behind The Tech", siteUrl = "https://behindthetech.in",
  } = input;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    mainEntityOfPage: canonicalUrl,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
  };
}
