import type { Metadata } from "next";
import { earthingMetadata } from "@/content/earthing/metadata";
import { earthingContent } from "@/content/earthing";
import { buildPageMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schemas";

const baseMetadata = buildPageMetadata(earthingMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: earthingMetadata.canonicalUrl,
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/earthing",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/earthing",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/earthing",
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: earthingMetadata.title,
  description: earthingMetadata.seoDescription,
  authorName: earthingMetadata.authorName,
  canonicalUrl: earthingMetadata.canonicalUrl,
  datePublished: earthingMetadata.datePublished,
  dateModified: earthingMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",       url: "https://behindthetech.in" },
  { name: "Non-IT",     url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "Earthing",   url: earthingMetadata.canonicalUrl },
]);

export const faqSchema = earthingContent.faq.length > 0 ? buildFaqSchema(earthingContent.faq) : null;
