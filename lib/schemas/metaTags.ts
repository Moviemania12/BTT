// ═══════════════════════════════════════════════════════════════════════════
// lib/schemas/metaTags.ts
//
// Reusable Next.js Metadata fragment builders — robots, OpenGraph, Twitter.
// These return plain objects spreadable into a page's `Metadata` export,
// generated from the same ArticleMetadata content every article supplies.
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import type { ArticleMetadata } from "@/types/engineering/content";

/** The site-wide social share image (public/og-image.jpg, 1200×630). */
export const SITE_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Behind The Tech",
};

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
    images: [SITE_OG_IMAGE],
  };
}

export function buildTwitterMeta(meta: ArticleMetadata): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: meta.seoTitle,
    description: meta.seoDescription,
    images: [SITE_OG_IMAGE.url],
  };
}

/**
 * OpenGraph + Twitter for a non-article page (hub, tool, policy…).
 * Needed because a page's own `openGraph` replaces the root layout's entirely —
 * without this, a page inherits the homepage title/URL or ends up with no image.
 */
export function buildSocialMeta(input: {
  title: string;
  description: string;
  /** Canonical URL of the page. */
  url: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.url,
      type: input.type ?? "website",
      siteName: "Behind The Tech",
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [SITE_OG_IMAGE.url],
    },
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
