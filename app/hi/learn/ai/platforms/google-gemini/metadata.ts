import type { Metadata } from "next";
import { googleGeminiMetadata } from "@/content/google-gemini/metadata.hi";
import { googleGeminiContent } from "@/content/google-gemini/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(googleGeminiMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/platforms/google-gemini",
    languages: {
      en: "https://behindthetech.in/learn/ai/platforms/google-gemini",
      hi: "https://behindthetech.in/hi/learn/ai/platforms/google-gemini",
      "x-default": "https://behindthetech.in/learn/ai/platforms/google-gemini",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/platforms/google-gemini", locale: "hi_IN" },
};

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
