import type { Metadata } from "next";
import { mlMetadata } from "@/content/machine-learning/metadata.hi";
import { mlContent } from "@/content/machine-learning/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(mlMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/fundamentals/machine-learning",
    languages: {
      en: "https://behindthetech.in/learn/ai/fundamentals/machine-learning",
      hi: "https://behindthetech.in/hi/learn/ai/fundamentals/machine-learning",
      "x-default": "https://behindthetech.in/learn/ai/fundamentals/machine-learning",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/fundamentals/machine-learning", locale: "hi_IN" },
};

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
