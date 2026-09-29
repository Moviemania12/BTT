import type { MetadataRoute } from "next";

// ═══════════════════════════════════════════════════════════════════════════
// app/robots.ts — served by Next.js at /robots.txt
//
// Replaces the old app/robots.txt, which contained this TypeScript code as
// plain text and was served verbatim (invalid robots.txt, unreadable
// Sitemap line).
// ═══════════════════════════════════════════════════════════════════════════

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://behindthetech.in/sitemap.xml",
  };
}
