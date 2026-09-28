import type { Metadata } from "next";
import { multiCloudMetadata } from "@/content/multi-cloud/metadata.hi";
import { multiCloudContent } from "@/content/multi-cloud/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(multiCloudMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/cloud/multi-cloud",
    languages: {
      en: "https://behindthetech.in/learn/it/cloud/multi-cloud",
      hi: "https://behindthetech.in/hi/learn/it/cloud/multi-cloud",
      "x-default": "https://behindthetech.in/learn/it/cloud/multi-cloud",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/it/cloud/multi-cloud", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: multiCloudMetadata.title,
  description: multiCloudMetadata.seoDescription,
  authorName: multiCloudMetadata.authorName,
  canonicalUrl: multiCloudMetadata.canonicalUrl,
  datePublished: multiCloudMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "Multi Cloud", url: multiCloudMetadata.canonicalUrl },
]);

export const faqSchema =
  multiCloudContent.faq.length > 0 ? buildFaqSchema(multiCloudContent.faq) : null;
