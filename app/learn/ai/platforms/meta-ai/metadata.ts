import type { Metadata } from "next";
import { metaAiMetadata } from "@/content/meta-ai/metadata";
import { metaAiContent } from "@/content/meta-ai";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(metaAiMetadata);

export const articleSchema = buildArticleSchema({
  headline: metaAiMetadata.title,
  description: metaAiMetadata.seoDescription,
  authorName: metaAiMetadata.authorName,
  canonicalUrl: metaAiMetadata.canonicalUrl,
  datePublished: metaAiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "Meta AI",           url: metaAiMetadata.canonicalUrl },
]);

export const faqSchema =
  metaAiContent.faq.length > 0
    ? buildFaqSchema(metaAiContent.faq)
    : null;
