import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import UpsLoadCalculatorClient from "./UpsLoadCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/ups-load-calculator/page.tsx
//
// Server component: exports SEO metadata (from the calculator's registry
// entry — lib/engineering/registry/calculatorRegistry.ts) and renders the
// interactive client component. Client-side state (useState) cannot live
// here because `metadata` export requires a Server Component — the split
// follows the same pattern as app/study/interview/page.tsx.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "UPS Load Calculator — Data Center UPS Sizing Tool | Behind The Tech",
  description:
    "Calculate the right UPS size in kVA: enter total connected load (kW), demand factor, power factor and future growth headroom to get a recommended rating.",
  keywords: ["ups load calculator", "ups sizing calculator", "data center ups sizing", "ups kva calculator"],
  alternates: { canonical: "https://behindthetech.in/tools/ups-load-calculator" },
  ...buildSocialMeta({
    title: "UPS Load Calculator — Data Center UPS Sizing Tool | Behind The Tech",
    description:
      "Calculate the right UPS size in kVA: enter total connected load (kW), demand factor, power factor and future growth headroom to get a recommended rating.",
    url: "https://behindthetech.in/tools/ups-load-calculator",
  }),
};

export default function UpsLoadCalculatorPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <UpsLoadCalculatorClient />
        <CalculatorGuide slug="ups-load-calculator" />
      </div>
    </main>
  );
}
