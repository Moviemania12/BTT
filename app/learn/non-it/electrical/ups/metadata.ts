// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/metadata.ts
//
// MIGRATED (Phase 2): No more hardcoded SEO/schema values. Everything here
// is GENERATED from content/ups/metadata.ts (the single source of truth)
// via the reusable lib/schemas builders. Adding FAQ/Breadcrumb/HowTo schema
// is now "wire up the builder", not "write 30 more lines of JSON-LD".
//
// IMPORTANT (Next.js App Router constraint):
// Next.js only auto-detects `export const metadata` when it lives directly
// in page.tsx (or a sibling layout.tsx). page.tsx does:
//     export { metadata } from "./metadata";
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { upsMetadata } from "@/content/ups/metadata";
import { upsContent } from "@/content/ups";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

// ─── Next.js Metadata API — generated from content, zero hardcoding ───────────

export const metadata: Metadata = buildPageMetadata(upsMetadata);

// ─── JSON-LD structured data — generated from content, zero hardcoding ────────

export const articleSchema = buildArticleSchema({
  headline: upsMetadata.title,
  description: upsMetadata.seoDescription,
  authorName: upsMetadata.authorName,
  canonicalUrl: upsMetadata.canonicalUrl,
  datePublished: upsMetadata.datePublished,
  dateModified: upsMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "UPS", url: upsMetadata.canonicalUrl },
]);

/**
 * FAQ schema — generated directly from content/ups/faq.ts. This is the
 * Phase 2 requirement in action: the FAQ Q&A text exists in exactly ONE
 * place (content/ups/faq.ts), and both the rendered page AND this schema
 * read from it. No duplication possible.
 */
export const faqSchema = upsContent.faq.length > 0 ? buildFaqSchema(upsContent.faq) : null;
