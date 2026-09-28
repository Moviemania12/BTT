import type { Metadata } from "next";
import CoolingCalculatorClient from "./CoolingCalculatorClient";

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
};

export default function CoolingCalculatorPage() {
  return <CoolingCalculatorClient />;
}
