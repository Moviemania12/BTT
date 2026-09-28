import type { Metadata } from "next";
import { amdAiMetadata } from "@/content/amd-ai-platforms/metadata.hi";
import { amdAiContent } from "@/content/amd-ai-platforms/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(amdAiMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/hardware/amd-ai-platforms",
    languages: {
      en: "https://behindthetech.in/learn/ai/hardware/amd-ai-platforms",
      hi: "https://behindthetech.in/hi/learn/ai/hardware/amd-ai-platforms",
      "x-default": "https://behindthetech.in/learn/ai/hardware/amd-ai-platforms",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/hardware/amd-ai-platforms", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: amdAiMetadata.title,
  description: amdAiMetadata.seoDescription,
  authorName: amdAiMetadata.authorName,
  canonicalUrl: amdAiMetadata.canonicalUrl,
  datePublished: amdAiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "AMD AI Platforms",  url: amdAiMetadata.canonicalUrl },
]);

export const faqSchema =
  amdAiContent.faq.length > 0
    ? buildFaqSchema(amdAiContent.faq)
    : null;
