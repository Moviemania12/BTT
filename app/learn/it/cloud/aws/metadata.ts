import type { Metadata } from "next";
import { awsMetadata } from "@/content/aws/metadata";
import { awsContent } from "@/content/aws";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(awsMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/it/cloud/aws",
    languages: {
      en: "https://behindthetech.in/learn/it/cloud/aws",
      hi: "https://behindthetech.in/hi/learn/it/cloud/aws",
      "x-default": "https://behindthetech.in/learn/it/cloud/aws",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/it/cloud/aws", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: awsMetadata.title,
  description: awsMetadata.seoDescription,
  authorName: awsMetadata.authorName,
  canonicalUrl: awsMetadata.canonicalUrl,
  datePublished: awsMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "AWS", url: awsMetadata.canonicalUrl },
]);

export const faqSchema =
  awsContent.faq.length > 0 ? buildFaqSchema(awsContent.faq) : null;
