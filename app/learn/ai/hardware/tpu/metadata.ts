import type { Metadata } from "next";
import { tpuMetadata } from "@/content/tpu/metadata";
import { tpuContent } from "@/content/tpu";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(tpuMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/ai/hardware/tpu",
    languages: {
      en: "https://behindthetech.in/learn/ai/hardware/tpu",
      hi: "https://behindthetech.in/hi/learn/ai/hardware/tpu",
      "x-default": "https://behindthetech.in/learn/ai/hardware/tpu",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/ai/hardware/tpu", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: tpuMetadata.title,
  description: tpuMetadata.seoDescription,
  authorName: tpuMetadata.authorName,
  canonicalUrl: tpuMetadata.canonicalUrl,
  datePublished: tpuMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "TPU",               url: tpuMetadata.canonicalUrl },
]);

export const faqSchema =
  tpuContent.faq.length > 0 ? buildFaqSchema(tpuContent.faq) : null;
