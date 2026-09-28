// Hindi (/hi) route metadata. Reuses the shared content metadata and
// overrides only the language-specific fields (description, canonical,
// hreflang, FAQ source).

import type { Metadata } from "next";
import { stsMetadata } from "@/content/sts/metadata";
import { stsFaqHi } from "@/content/sts/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/sts";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/sts";

const metaHi = {
  ...stsMetadata,
  seoDescription:
    "Static Transfer Switch (STS) kya hai? SCR switching, 4ms transfer time, dual UPS architecture, A/B power path, maintenance bypass — complete Hinglish guide for Data Center engineers.",
  canonicalUrl: HI_URL,
};

const baseMetadata = buildPageMetadata(metaHi);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: HI_URL,
    languages: {
      en: EN_URL,
      hi: HI_URL,
      "x-default": EN_URL,
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: metaHi.title,
  description: metaHi.seoDescription,
  authorName: metaHi.authorName,
  canonicalUrl: HI_URL,
  datePublished: metaHi.datePublished,
  dateModified: metaHi.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "STS", url: HI_URL },
]);

export const faqSchema = stsFaqHi.length > 0 ? buildFaqSchema(stsFaqHi) : null;
