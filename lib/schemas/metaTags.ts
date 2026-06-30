// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/metaTags.ts
//
// Reusable Next.js Metadata fragment builders — robots, OpenGraph, Twitter.
// These return plain objects spreadable into a page's `Metadata` export,
// generated from the same ArticleMetadata content every article supplies.
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import type { ArticleMetadata } from "@/types/engineering/content";

export function buildRobotsMeta(): Metadata["robots"] {
  return {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  };
}

export function buildOpenGraphMeta(meta: ArticleMetadata, siteName = "Behind The Tech"): Metadata["openGraph"] {
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    url: meta.canonicalUrl,
    type: "article",
    siteName,
  };
}

export function buildTwitterMeta(meta: ArticleMetadata): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: meta.seoTitle,
    description: meta.seoDescription,
  };
}

/** Assembles a complete Next.js Metadata object from one ArticleMetadata source. */
export function buildPageMetadata(meta: ArticleMetadata): Metadata {
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonicalUrl },
    robots: buildRobotsMeta(),
    openGraph: buildOpenGraphMeta(meta),
    twitter: buildTwitterMeta(meta),
  };
}
