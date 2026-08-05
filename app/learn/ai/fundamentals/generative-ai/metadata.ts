import type { Metadata } from "next";
import { genAiMetadata } from "@/content/generative-ai/metadata";
import { genAiContent } from "@/content/generative-ai";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(genAiMetadata);

export const articleSchema = buildArticleSchema({
  headline: genAiMetadata.title,
  description: genAiMetadata.seoDescription,
  authorName: genAiMetadata.authorName,
  canonicalUrl: genAiMetadata.canonicalUrl,
  datePublished: genAiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",      url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "Generative AI",     url: genAiMetadata.canonicalUrl },
]);

export const faqSchema =
  genAiContent.faq.length > 0 ? buildFaqSchema(genAiContent.faq) : null;
