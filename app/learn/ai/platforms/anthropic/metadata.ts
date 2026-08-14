import type { Metadata } from "next";
import { anthropicMetadata } from "@/content/anthropic/metadata";
import { anthropicContent } from "@/content/anthropic";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(anthropicMetadata);

export const articleSchema = buildArticleSchema({
  headline: anthropicMetadata.title,
  description: anthropicMetadata.seoDescription,
  authorName: anthropicMetadata.authorName,
  canonicalUrl: anthropicMetadata.canonicalUrl,
  datePublished: anthropicMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "Anthropic",         url: anthropicMetadata.canonicalUrl },
]);

export const faqSchema =
  anthropicContent.faq.length > 0
    ? buildFaqSchema(anthropicContent.faq)
    : null;
