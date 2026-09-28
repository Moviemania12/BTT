import type { Metadata } from "next";
import { genAiMetadata } from "@/content/generative-ai/metadata.hi";
import { genAiContent } from "@/content/generative-ai/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(genAiMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/fundamentals/generative-ai",
    languages: {
      en: "https://behindthetech.in/learn/ai/fundamentals/generative-ai",
      hi: "https://behindthetech.in/hi/learn/ai/fundamentals/generative-ai",
      "x-default": "https://behindthetech.in/learn/ai/fundamentals/generative-ai",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/fundamentals/generative-ai", locale: "hi_IN" },
};

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
