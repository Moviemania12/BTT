import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCalculator } from "@/lib/engineering/registry";
import { buildPageMetadata } from "@/lib/schemas";
import BatteryAhCalculatorClient from "./BatteryAhCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/battery-ah-calculator/page.tsx
//
// Standalone calculator page. SEO metadata is generated from the
// calculator's own registry entry (lib/engineering/registry/
// calculatorRegistry.ts) — never hardcoded here, and never duplicated from
// any article's metadata. The interactive calculator UI lives in the
// sibling client component (BatteryAhCalculatorClient.tsx) — this file
// stays a server component so it can export metadata, and only wires
// registry data to the page.
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
    <main
      data-homepage-theme="light"
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        paddingTop: "2.5rem",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.75rem" }}>
          <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
            Tools
          </Link>{" "}
          / {entry.title}
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.6rem", letterSpacing: "-0.01em" }}>
          {entry.title}
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem", maxWidth: "640px" }}>
          {entry.description}
        </p>
        <BatteryAhCalculatorClient />
        <CalculatorGuide slug="battery-ah-calculator" />
      </div>
    </main>
  );
}
