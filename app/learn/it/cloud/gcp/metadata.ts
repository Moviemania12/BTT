import type { Metadata } from "next";
import { gcpMetadata } from "@/content/gcp/metadata";
import { gcpContent } from "@/content/gcp";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(gcpMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/it/cloud/gcp",
    languages: {
      en: "https://behindthetech.in/learn/it/cloud/gcp",
      hi: "https://behindthetech.in/hi/learn/it/cloud/gcp",
      "x-default": "https://behindthetech.in/learn/it/cloud/gcp",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/it/cloud/gcp", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: gcpMetadata.title,
  description: gcpMetadata.seoDescription,
  authorName: gcpMetadata.authorName,
  canonicalUrl: gcpMetadata.canonicalUrl,
  datePublished: gcpMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "GCP", url: gcpMetadata.canonicalUrl },
]);

export const faqSchema =
  gcpContent.faq.length > 0 ? buildFaqSchema(gcpContent.faq) : null;
