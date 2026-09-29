import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import CoolingCalculatorClient from "./CoolingCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/cooling-calculator/page.tsx
//
// Server component — exports metadata and renders the client calculator.
// `metadata` cannot live in a client component (needs useState), so the
// interactive UI lives in the sibling CoolingCalculatorClient.tsx.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Cooling Calculator — Data Center Heat Load Sizing | Behind The Tech",
  description:
    "Free Data Center cooling calculator — convert IT/heat load (kW) into Tons of Refrigeration, BTU/hr, and required supply airflow (CFM) using standard sensible-heat formulas.",
  alternates: { canonical: "https://behindthetech.in/tools/cooling-calculator" },
  keywords: [
    "data center cooling calculator",
    "cooling load calculator",
    "tons of refrigeration calculator",
    "kW to tons",
    "kW to BTU/hr",
    "CFM calculator",
    "data center HVAC sizing",
    "sensible heat load",
  ],
  ...buildSocialMeta({
    title: "Cooling Calculator — Data Center Heat Load Sizing | Behind The Tech",
    description:
      "Free Data Center cooling calculator — convert IT/heat load (kW) into Tons of Refrigeration, BTU/hr, and required supply airflow (CFM) using standard sensible-heat formulas.",
    url: "https://behindthetech.in/tools/cooling-calculator",
  }),
};

export default function CoolingCalculatorPage() {
  return (
    <>
      <CoolingCalculatorClient />
      <div style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <CalculatorGuide slug="cooling-calculator" />
        </div>
      </div>
    </>
  );
}
