import type { Metadata } from "next";
import { dlMetadata } from "@/content/deep-learning/metadata.hi";
import { dlContent } from "@/content/deep-learning/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(dlMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/fundamentals/deep-learning",
    languages: {
      en: "https://behindthetech.in/learn/ai/fundamentals/deep-learning",
      hi: "https://behindthetech.in/hi/learn/ai/fundamentals/deep-learning",
      "x-default": "https://behindthetech.in/learn/ai/fundamentals/deep-learning",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/fundamentals/deep-learning", locale: "hi_IN" },
};

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
