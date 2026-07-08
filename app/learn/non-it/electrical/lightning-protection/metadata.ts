import type { Metadata } from "next";
import { lightningProtectionMetadata } from "@/content/lightning-protection/metadata";
import { lightningProtectionContent } from "@/content/lightning-protection";
import { buildPageMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(lightningProtectionMetadata);

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
