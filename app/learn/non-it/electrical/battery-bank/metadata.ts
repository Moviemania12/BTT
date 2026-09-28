// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/metadata.ts
//
// Generates all SEO metadata and JSON-LD schemas from the content layer.
// Zero hardcoding — all values come from content/battery-bank/*.ts.
// page.tsx re-exports `metadata` so Next.js App Router picks it up.
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { batteryBankMetadata } from "@/content/battery-bank/metadata";
import { batteryBankContent } from "@/content/battery-bank";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(batteryBankMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: batteryBankMetadata.canonicalUrl,
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/battery-bank",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/battery-bank",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/battery-bank",
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: batteryBankMetadata.title,
  description: batteryBankMetadata.seoDescription,
  authorName: batteryBankMetadata.authorName,
  canonicalUrl: batteryBankMetadata.canonicalUrl,
  datePublished: batteryBankMetadata.datePublished,
  dateModified: batteryBankMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "Battery Bank", url: batteryBankMetadata.canonicalUrl },
]);

export const faqSchema =
  batteryBankContent.faq.length > 0 ? buildFaqSchema(batteryBankContent.faq) : null;
