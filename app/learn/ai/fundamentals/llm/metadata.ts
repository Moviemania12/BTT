import type { Metadata } from "next";
import { llmMetadata } from "@/content/llms/metadata";
import { llmContent } from "@/content/llms";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(llmMetadata);

export const articleSchema = buildArticleSchema({
  headline: llmMetadata.title,
  description: llmMetadata.seoDescription,
  authorName: llmMetadata.authorName,
  canonicalUrl: llmMetadata.canonicalUrl,
  datePublished: llmMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",      url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "Large Language Models", url: llmMetadata.canonicalUrl },
]);

export const faqSchema =
  llmContent.faq.length > 0 ? buildFaqSchema(llmContent.faq) : null;
