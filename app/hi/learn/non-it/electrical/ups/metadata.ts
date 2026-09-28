// Hindi (/hi) route metadata for the UPS article.
// Reuses the shared content metadata and overrides only the language-specific
// fields (description, canonical, hreflang, FAQ source).

import type { Metadata } from "next";
import { upsMetadata } from "@/content/ups/metadata";
import { upsFaqHi } from "@/content/ups/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/ups";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/ups";

const upsMetadataHi = {
  ...upsMetadata,
  seoDescription:
    "UPS kaise kaam karta hai? Online vs Offline vs Line Interactive, battery sizing, N+1 vs 2N redundancy, Tier III/IV design — complete Hinglish guide with 60+ diagrams, 18 calculators aur 100 FAQs.",
  canonicalUrl: HI_URL,
};

const baseMetadata = buildPageMetadata(upsMetadataHi);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: HI_URL,
    languages: {
      en: EN_URL,
      hi: HI_URL,
      "x-default": EN_URL,
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: upsMetadataHi.title,
  description: upsMetadataHi.seoDescription,
  authorName: upsMetadataHi.authorName,
  canonicalUrl: HI_URL,
  datePublished: upsMetadataHi.datePublished,
  dateModified: upsMetadataHi.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "UPS", url: HI_URL },
]);

export const faqSchema = upsFaqHi.length > 0 ? buildFaqSchema(upsFaqHi) : null;
