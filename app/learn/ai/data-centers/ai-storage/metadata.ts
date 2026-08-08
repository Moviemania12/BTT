import type { Metadata } from "next";
import { aiStorageMetadata } from "@/content/ai-storage/metadata";
import { aiStorageContent } from "@/content/ai-storage";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiStorageMetadata);

export const articleSchema = buildArticleSchema({
  headline: aiStorageMetadata.title,
  description: aiStorageMetadata.seoDescription,
  authorName: aiStorageMetadata.authorName,
  canonicalUrl: aiStorageMetadata.canonicalUrl,
  datePublished: aiStorageMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",                url: "https://behindthetech.in" },
  { name: "AI Infrastructure",   url: "https://behindthetech.in/learn/ai" },
  { name: "AI Data Centers",     url: "https://behindthetech.in/learn/ai/data-centers" },
  { name: "AI Storage",          url: aiStorageMetadata.canonicalUrl },
]);

export const faqSchema =
  aiStorageContent.faq.length > 0
    ? buildFaqSchema(aiStorageContent.faq)
    : null;
