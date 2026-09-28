import type { Metadata } from "next";
import { azureMetadata } from "@/content/azure/metadata.hi";
import { azureContent } from "@/content/azure/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(azureMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/cloud/azure",
    languages: {
      en: "https://behindthetech.in/learn/it/cloud/azure",
      hi: "https://behindthetech.in/hi/learn/it/cloud/azure",
      "x-default": "https://behindthetech.in/learn/it/cloud/azure",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/it/cloud/azure", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: azureMetadata.title,
  description: azureMetadata.seoDescription,
  authorName: azureMetadata.authorName,
  canonicalUrl: azureMetadata.canonicalUrl,
  datePublished: azureMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "Azure", url: azureMetadata.canonicalUrl },
]);

export const faqSchema =
  azureContent.faq.length > 0 ? buildFaqSchema(azureContent.faq) : null;
