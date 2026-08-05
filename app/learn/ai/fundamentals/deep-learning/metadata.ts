import type { Metadata } from "next";
import { dlMetadata } from "@/content/deep-learning/metadata";
import { dlContent } from "@/content/deep-learning";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(dlMetadata);

export const articleSchema = buildArticleSchema({
  headline: dlMetadata.title,
  description: dlMetadata.seoDescription,
  authorName: dlMetadata.authorName,
  canonicalUrl: dlMetadata.canonicalUrl,
  datePublished: dlMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",      url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "Deep Learning",     url: dlMetadata.canonicalUrl },
]);

export const faqSchema =
  dlContent.faq.length > 0 ? buildFaqSchema(dlContent.faq) : null;
