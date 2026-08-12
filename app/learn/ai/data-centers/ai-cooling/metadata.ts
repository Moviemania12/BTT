import type { Metadata } from "next";
import { aiCoolingMetadata } from "@/content/ai-cooling/metadata";
import { aiCoolingContent } from "@/content/ai-cooling";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiCoolingMetadata);

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
