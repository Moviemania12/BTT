import type { Metadata } from "next";
import { aiGpuMetadata } from "@/content/ai-gpu/metadata";
import { aiGpuContent } from "@/content/ai-gpu";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiGpuMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/ai/hardware/ai-gpu",
    languages: {
      en: "https://behindthetech.in/learn/ai/hardware/ai-gpu",
      hi: "https://behindthetech.in/hi/learn/ai/hardware/ai-gpu",
      "x-default": "https://behindthetech.in/learn/ai/hardware/ai-gpu",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/ai/hardware/ai-gpu", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: aiGpuMetadata.title,
  description: aiGpuMetadata.seoDescription,
  authorName: aiGpuMetadata.authorName,
  canonicalUrl: aiGpuMetadata.canonicalUrl,
  datePublished: aiGpuMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "AI GPU",            url: aiGpuMetadata.canonicalUrl },
]);

export const faqSchema =
  aiGpuContent.faq.length > 0 ? buildFaqSchema(aiGpuContent.faq) : null;
