import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { getAllCalculators } from "@/lib/engineering/registry";
import { CalculatorLink, type CalculatorLinkItem } from "@/components/engineering/CalculatorLink";
import JsonLd from "@/components/JsonLd";
import { buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";

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
    "Free data center engineering calculators — UPS load, runtime and redundancy, battery sizing, cooling load, PUE, RCI and unit conversion. Built for electrical engineers and facility managers.",
  alternates: { canonical: "https://behindthetech.in/tools" },
  ...buildSocialMeta({
    title: "Engineering Calculators — Behind The Tech",
    description:
      "Free data center engineering calculators — UPS load, runtime and redundancy, battery sizing, cooling load, PUE, RCI and unit conversion. Built for electrical engineers and facility managers.",
    url: "https://behindthetech.in/tools",
  }),
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

// Standalone tools that have their own /tools/<slug> page but are not (yet) in the
// calculator registry — listed here so the hub shows every tool on the site.
// Anything that is later added to the registry is skipped automatically.
const STANDALONE_TOOLS: { section: string; tool: CalculatorLinkItem }[] = [
  {
    section: "Cooling and Efficiency",
    tool: {
      route: "/tools/cooling-calculator",
      title: "Cooling Calculator",
      description: "Convert IT heat load (kW) into tons of refrigeration, BTU/hr and required supply airflow (CFM).",
    },
  },
  {
    section: "Cooling and Efficiency",
    tool: {
      route: "/tools/rci-calculator",
      title: "RCI Calculator",
      description: "Rack Cooling Index (RCI_HI and RCI_LO) from rack inlet temperatures, to spot hot spots and over-cooling.",
    },
  },
  {
    section: "Cooling and Efficiency",
    tool: {
      route: "/tools/pue-calculator",
      title: "PUE Calculator",
      description: "Power Usage Effectiveness and DCiE from total facility power and IT equipment power.",
    },
  },
  {
    section: "Utilities",
    tool: {
      route: "/tools/unit-converter",
      title: "Unit Converter",
      description: "Convert power, temperature, length and pressure units used in data center work.",
    },
  },
];

const PAGE_URL = "https://behindthetech.in/tools";

export default function ToolsPage() {
  const calculators = getAllCalculators();
  const registryRoutes = new Set(calculators.map((c) => c.route));
  const standalone = STANDALONE_TOOLS.filter((s) => !registryRoutes.has(s.tool.route));
  const standaloneSections = Array.from(new Set(standalone.map((s) => s.section)));
  const totalTools = calculators.length + standalone.length;

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
      <JsonLd data={buildCollectionPageSchema({ name: "Engineering Calculators", description: metadata.description as string, url: PAGE_URL })} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "https://behindthetech.in" },
          { name: "Tools", url: PAGE_URL },
        ])}
      />
      <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
        Engineering Calculators
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem" }}>
        Free, interactive Data Center engineering calculators — sizing, capacity, redundancy, and
        more. {totalTools} tool{totalTools === 1 ? "" : "s"} available.
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

      {standaloneSections.map((section) => (
        <section key={section} style={{ marginBottom: "2.5rem" }}>
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
            {section}
          </h2>
          {standalone
            .filter((s) => s.section === section)
            .map((s) => (
              <CalculatorLink key={s.tool.route} calculator={s.tool} />
            ))}
        </section>
      ))}
      </div>
    </main>
  );
}
