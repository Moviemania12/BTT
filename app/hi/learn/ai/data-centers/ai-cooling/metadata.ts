import type { Metadata } from "next";
import { aiCoolingMetadata } from "@/content/ai-cooling/metadata.hi";
import { aiCoolingContent } from "@/content/ai-cooling/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiCoolingMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/data-centers/ai-cooling",
    languages: {
      en: "https://behindthetech.in/learn/ai/data-centers/ai-cooling",
      hi: "https://behindthetech.in/hi/learn/ai/data-centers/ai-cooling",
      "x-default": "https://behindthetech.in/learn/ai/data-centers/ai-cooling",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/data-centers/ai-cooling", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: aiCoolingMetadata.title,
  description: aiCoolingMetadata.seoDescription,
  authorName: aiCoolingMetadata.authorName,
  canonicalUrl: aiCoolingMetadata.canonicalUrl,
  datePublished: aiCoolingMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Data Centers",   url: "https://behindthetech.in/learn/ai/data-centers" },
  { name: "AI Cooling",        url: aiCoolingMetadata.canonicalUrl },
]);

export const faqSchema =
  aiCoolingContent.faq.length > 0
    ? buildFaqSchema(aiCoolingContent.faq)
    : null;
