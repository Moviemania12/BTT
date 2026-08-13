import type { Metadata } from "next";
import { openaiMetadata } from "@/content/openai/metadata";
import { openaiContent } from "@/content/openai";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(openaiMetadata);

export const articleSchema = buildArticleSchema({
  headline: openaiMetadata.title,
  description: openaiMetadata.seoDescription,
  authorName: openaiMetadata.authorName,
  canonicalUrl: openaiMetadata.canonicalUrl,
  datePublished: openaiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "OpenAI",            url: openaiMetadata.canonicalUrl },
]);

export const faqSchema =
  openaiContent.faq.length > 0
    ? buildFaqSchema(openaiContent.faq)
    : null;
