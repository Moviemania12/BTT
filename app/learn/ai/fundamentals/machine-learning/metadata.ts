import type { Metadata } from "next";
import { mlMetadata } from "@/content/machine-learning/metadata";
import { mlContent } from "@/content/machine-learning";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(mlMetadata);

export const articleSchema = buildArticleSchema({
  headline: mlMetadata.title,
  description: mlMetadata.seoDescription,
  authorName: mlMetadata.authorName,
  canonicalUrl: mlMetadata.canonicalUrl,
  datePublished: mlMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",      url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "Machine Learning",  url: mlMetadata.canonicalUrl },
]);

export const faqSchema =
  mlContent.faq.length > 0 ? buildFaqSchema(mlContent.faq) : null;
