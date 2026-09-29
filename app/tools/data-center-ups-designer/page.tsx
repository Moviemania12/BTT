import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import DataCenterUpsDesignerClient from "./DataCenterUpsDesignerClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/data-center-ups-designer/page.tsx
//
// Server component: exports SEO metadata (from the calculator's registry
// entry — lib/engineering/registry/calculatorRegistry.ts) and renders the
// interactive client component, following the same server/client split as
// app/study/interview/page.tsx.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Data Center UPS Designer — Complete Sizing Tool | Behind The Tech",
  description:
    "First-pass data center UPS design: enter IT load, power factor and redundancy (N, N+1, N+2 or 2N) to get UPS module count, battery string size, required battery Ah and UPS heat load.",
  keywords: ["data center ups designer", "data center sizing tool", "ups design calculator", "tier iii ups sizing"],
  alternates: { canonical: "https://behindthetech.in/tools/data-center-ups-designer" },
  ...buildSocialMeta({
    title: "Data Center UPS Designer — Complete Sizing Tool | Behind The Tech",
    description:
      "First-pass data center UPS design: enter IT load, power factor and redundancy (N, N+1, N+2 or 2N) to get UPS module count, battery string size, required battery Ah and UPS heat load.",
    url: "https://behindthetech.in/tools/data-center-ups-designer",
  }),
};

export default function DataCenterUpsDesignerPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <DataCenterUpsDesignerClient />
        <CalculatorGuide slug="data-center-ups-designer" />
      </div>
    </main>
  );
}
