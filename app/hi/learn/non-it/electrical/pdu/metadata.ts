// Hindi (/hi) route metadata. Reuses the shared content metadata and
// overrides only the language-specific fields (description, canonical,
// hreflang, FAQ source).

import type { Metadata } from "next";
import { pduMetadata } from "@/content/pdu/metadata";
import { pduFaqHi } from "@/content/pdu/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/pdu";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/pdu";

const metaHi = {
  ...pduMetadata,
  seoDescription:
    "PDU kya hota hai? Basic se Intelligent PDU (iPDU) tak — types, internal construction, outlet monitoring, SNMP/Modbus/DCIM integration, OEM comparison aur real Data Center example. Complete Hinglish guide.",
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
  { name: "PDU", url: HI_URL },
]);

export const faqSchema = pduFaqHi.length > 0 ? buildFaqSchema(pduFaqHi) : null;
