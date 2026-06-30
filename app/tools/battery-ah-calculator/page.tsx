import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCalculator } from "@/lib/engineering/registry";
import { buildPageMetadata } from "@/lib/schemas";
import BatteryAhCalculator from "@/components/calculators/BatteryAhCalculator";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/battery-ah-calculator/page.tsx
//
// Standalone calculator page. SEO metadata is generated from the
// calculator's own registry entry (lib/engineering/registry/
// calculatorRegistry.ts) — never hardcoded here, and never duplicated from
// any article's metadata. The calculator UI itself lives in
// components/calculators/BatteryAhCalculator.tsx (shared, reusable,
// route-independent) — this file only wires registry data to the page.
// ═══════════════════════════════════════════════════════════════════════════

const REGISTRY_ID = "ups.battery-ah-calculator";

export function generateMetadata(): Metadata {
  const entry = getCalculator(REGISTRY_ID);
  if (!entry) return {};
  return buildPageMetadata({
    slug: entry.id,
    title: entry.title,
    seoTitle: entry.seoTitle,
    seoDescription: entry.seoDescription,
    canonicalUrl: `https://behindthetech.in${entry.route}`,
    keywords: entry.keywords,
    authorName: "Behind The Tech",
    datePublished: entry.lastReviewed,
    readingTimeMinutes: 1,
  });
}

export default function BatteryAhCalculatorPage() {
  const entry = getCalculator(REGISTRY_ID);
  if (!entry) notFound();

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.25rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
        {entry.title}
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#475569", marginBottom: "2rem" }}>
        {entry.description}
      </p>
      <BatteryAhCalculator />
    </main>
  );
}
