import type { Metadata } from "next";
import { nvidiaArchMetadata } from "@/content/nvidia-architecture/metadata.hi";
import { nvidiaArchContent } from "@/content/nvidia-architecture/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(nvidiaArchMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/hardware/nvidia-architecture",
    languages: {
      en: "https://behindthetech.in/learn/ai/hardware/nvidia-architecture",
      hi: "https://behindthetech.in/hi/learn/ai/hardware/nvidia-architecture",
      "x-default": "https://behindthetech.in/learn/ai/hardware/nvidia-architecture",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/hardware/nvidia-architecture", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: nvidiaArchMetadata.title,
  description: nvidiaArchMetadata.seoDescription,
  authorName: nvidiaArchMetadata.authorName,
  canonicalUrl: nvidiaArchMetadata.canonicalUrl,
  datePublished: nvidiaArchMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "NVIDIA Architecture", url: nvidiaArchMetadata.canonicalUrl },
]);

export const faqSchema =
  nvidiaArchContent.faq.length > 0
    ? buildFaqSchema(nvidiaArchContent.faq)
    : null;
