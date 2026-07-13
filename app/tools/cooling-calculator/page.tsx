import type { Metadata } from "next";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/cooling-calculator/page.tsx
//
// Placeholder page — this calculator is on the roadmap but not yet built.
// The route already exists in lib/nav-config.ts (TOOLS_MENU), so this page
// prevents a 404 while the real calculator is developed. Once a real
// "Cooling Load Sizing" entry is added to
// lib/engineering/registry/calculatorRegistry.ts, this file should be
// replaced following the same pattern as the other /tools/*/page.tsx files
// (generateMetadata from the registry entry + the real calculator component).
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Cooling Calculator — Coming Soon | Behind The Tech",
  description: "Size your Data Center cooling requirements. This calculator is coming soon to Behind The Tech.",
  alternates: { canonical: "https://behindthetech.in/tools/cooling-calculator" },
  robots: { index: false, follow: true },
};

export default function CoolingCalculatorPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#EFF6FF",
          border: "2px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          margin: "0 auto 1.5rem",
        }}
        aria-hidden="true"
      >
        🌡️
      </div>

      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#2563EB",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        Coming Soon
      </p>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
        Cooling Calculator
      </h1>

      <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.5rem" }}>
        Size your Data Center cooling requirements.
      </p>

      <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "2.5rem" }}>
        We&apos;re building this calculator. In the meantime, explore the engineering calculators
        already available.
      </p>

      <Link
        href="/tools"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          background: "#2563EB",
          color: "#ffffff",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        ← Back to All Calculators
      </Link>
    </div>
    </main>
  );
}
