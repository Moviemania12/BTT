import type { Metadata } from "next";
import { hybridCloudMetadata } from "@/content/hybrid-cloud/metadata";
import { hybridCloudContent } from "@/content/hybrid-cloud";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(hybridCloudMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/it/cloud/hybrid-cloud",
    languages: {
      en: "https://behindthetech.in/learn/it/cloud/hybrid-cloud",
      hi: "https://behindthetech.in/hi/learn/it/cloud/hybrid-cloud",
      "x-default": "https://behindthetech.in/learn/it/cloud/hybrid-cloud",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/it/cloud/hybrid-cloud", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: hybridCloudMetadata.title,
  description: hybridCloudMetadata.seoDescription,
  authorName: hybridCloudMetadata.authorName,
  canonicalUrl: hybridCloudMetadata.canonicalUrl,
  datePublished: hybridCloudMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "Hybrid Cloud", url: hybridCloudMetadata.canonicalUrl },
]);

export const faqSchema =
  hybridCloudContent.faq.length > 0 ? buildFaqSchema(hybridCloudContent.faq) : null;
