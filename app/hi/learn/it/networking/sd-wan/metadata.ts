import type { Metadata } from "next";
import { sdWanMetadata } from "@/content/sd-wan/metadata.hi";
import { sdWanContent } from "@/content/sd-wan/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(sdWanMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/networking/sd-wan",
    languages: {
      en: "https://behindthetech.in/learn/it/networking/sd-wan",
      hi: "https://behindthetech.in/hi/learn/it/networking/sd-wan",
      "x-default": "https://behindthetech.in/learn/it/networking/sd-wan",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/it/networking/sd-wan", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: sdWanMetadata.title,
  description: sdWanMetadata.seoDescription,
  authorName: sdWanMetadata.authorName,
  canonicalUrl: sdWanMetadata.canonicalUrl,
  datePublished: sdWanMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Networking", url: "https://behindthetech.in/learn/it/networking" },
  { name: "SD-WAN", url: sdWanMetadata.canonicalUrl },
]);

export const faqSchema =
  sdWanContent.faq.length > 0 ? buildFaqSchema(sdWanContent.faq) : null;
