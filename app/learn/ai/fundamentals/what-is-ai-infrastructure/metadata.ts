import type { Metadata } from "next";
import { aiInfraMetadata } from "@/content/what-is-ai-infrastructure/metadata";
import { aiInfraContent } from "@/content/what-is-ai-infrastructure";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiInfraMetadata);

export const articleSchema = buildArticleSchema({
  headline: aiInfraMetadata.title,
  description: aiInfraMetadata.seoDescription,
  authorName: aiInfraMetadata.authorName,
  canonicalUrl: aiInfraMetadata.canonicalUrl,
  datePublished: aiInfraMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",               url: "https://behindthetech.in" },
  { name: "AI Infrastructure",  url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",       url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "What is AI Infrastructure", url: aiInfraMetadata.canonicalUrl },
]);

export const faqSchema =
  aiInfraContent.faq.length > 0 ? buildFaqSchema(aiInfraContent.faq) : null;
