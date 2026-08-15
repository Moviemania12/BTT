import type { Metadata } from "next";
import { googleGeminiMetadata } from "@/content/google-gemini/metadata";
import { googleGeminiContent } from "@/content/google-gemini";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(googleGeminiMetadata);

export const articleSchema = buildArticleSchema({
  headline: googleGeminiMetadata.title,
  description: googleGeminiMetadata.seoDescription,
  authorName: googleGeminiMetadata.authorName,
  canonicalUrl: googleGeminiMetadata.canonicalUrl,
  datePublished: googleGeminiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "Google Gemini",     url: googleGeminiMetadata.canonicalUrl },
]);

export const faqSchema =
  googleGeminiContent.faq.length > 0
    ? buildFaqSchema(googleGeminiContent.faq)
    : null;
