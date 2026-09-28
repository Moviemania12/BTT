import type { Metadata } from "next";
import { lightningProtectionMetadata } from "@/content/lightning-protection/metadata";
import { lightningProtectionContent } from "@/content/lightning-protection";
import { buildPageMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schemas";

const baseMetadata = buildPageMetadata(lightningProtectionMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: lightningProtectionMetadata.canonicalUrl,
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/lightning-protection",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/lightning-protection",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/lightning-protection",
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: lightningProtectionMetadata.title,
  description: lightningProtectionMetadata.seoDescription,
  authorName: lightningProtectionMetadata.authorName,
  canonicalUrl: lightningProtectionMetadata.canonicalUrl,
  datePublished: lightningProtectionMetadata.datePublished,
  dateModified: lightningProtectionMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",       url: "https://behindthetech.in" },
  { name: "Non-IT",     url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "Lightning Protection", url: lightningProtectionMetadata.canonicalUrl },
]);

export const faqSchema =
  lightningProtectionContent.faq.length > 0 ? buildFaqSchema(lightningProtectionContent.faq) : null;
