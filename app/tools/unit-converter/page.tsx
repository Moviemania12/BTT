import type { Metadata } from "next";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/unit-converter/page.tsx
//
// Placeholder page — this calculator is on the roadmap but not yet built.
// The route already exists in lib/nav-config.ts (TOOLS_MENU), so this page
// prevents a 404 while the real calculator is developed. Once a real
// "Engineering Unit Conversion" entry is added to
// lib/engineering/registry/calculatorRegistry.ts, this file should be
// replaced following the same pattern as the other /tools/*/page.tsx files
// (generateMetadata from the registry entry + the real calculator component).
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Unit Converter — Coming Soon | Behind The Tech",
  description: "Convert kW, BTU, tons of cooling, and more. This calculator is coming soon to Behind The Tech.",
  alternates: { canonical: "https://behindthetech.in/tools/unit-converter" },
  robots: { index: false, follow: true },
};

export default function UnitConverterPage() {
  return (
    <main style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.25rem", textAlign: "center" }}>
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#eaf4ff",
          border: "2px solid #bfdbfe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          margin: "0 auto 1.5rem",
        }}
        aria-hidden="true"
      >
        🔄
      </div>

      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#0066CC",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        Coming Soon
      </p>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
        Unit Converter
      </h1>

      <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, marginBottom: "0.5rem" }}>
        Convert kW, BTU, tons of cooling, and more.
      </p>

      <p style={{ fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "2.5rem" }}>
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
          background: "#0066CC",
          color: "#ffffff",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        ← Back to All Calculators
      </Link>
    </main>
  );
}
