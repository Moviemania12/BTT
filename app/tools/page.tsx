import type { Metadata } from "next";
import { getAllCalculators } from "@/lib/engineering/registry";
import { CalculatorLink } from "@/components/engineering/CalculatorLink";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/page.tsx
//
// Tools landing page. Lists EVERY calculator on the platform automatically
// by reading lib/engineering/registry/calculatorRegistry.ts via
// getAllCalculators() — never a hardcoded list. Adding a new calculator to
// any future domain (cooling, fire, etc.) means registering it in the
// registry; this page picks it up with zero changes.
//
// Calculators are grouped by domain so the page stays organized as the
// registry grows beyond electrical.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Engineering Calculators — Behind The Tech",
  description:
    "Free Data Center engineering calculators — UPS sizing, battery capacity, redundancy, cable sizing, and more. Built for electrical engineers and facility managers.",
  alternates: { canonical: "https://behindthetech.in/tools" },
};

const DOMAIN_LABELS: Record<string, string> = {
  electrical: "Electrical",
  cooling: "Cooling",
  hvac: "HVAC",
  mechanical: "Mechanical",
  fire: "Fire Protection",
  bms: "BMS",
  dcim: "DCIM",
  networking: "Networking",
  servers: "Servers",
  cloud: "Cloud",
  ai: "AI Infrastructure",
  telecom: "Telecom",
};

export default function ToolsPage() {
  const calculators = getAllCalculators();

  // Group by domain — driven entirely by registry data, no hardcoded domain list
  const byDomain = calculators.reduce<Record<string, typeof calculators>>((acc, calc) => {
    const key = calc.domain;
    if (!acc[key]) acc[key] = [];
    acc[key].push(calc);
    return acc;
  }, {});

  const domains = Object.keys(byDomain).sort();

  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
        Engineering Calculators
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem" }}>
        Free, interactive Data Center engineering calculators — sizing, capacity, redundancy, and
        more. {calculators.length} calculator{calculators.length === 1 ? "" : "s"} available.
      </p>

      {domains.length === 0 && (
        <p style={{ color: "#6B7280" }}>No calculators published yet.</p>
      )}

      {domains.map((domain) => (
        <section key={domain} style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "2px solid #E5E7EB",
            }}
          >
            {DOMAIN_LABELS[domain] ?? domain}
          </h2>
          {byDomain[domain].map((calc) => (
            <CalculatorLink key={calc.id} calculator={calc} />
          ))}
        </section>
      ))}
      </div>
    </main>
  );
}
