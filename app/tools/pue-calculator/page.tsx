import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import PueCalculatorClient from "./PueCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/pue-calculator/page.tsx
//
// Server component: exports metadata, renders the client calculator.
// PUE = Total Facility Power / IT Equipment Power (Uptime Institute).
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "PUE Calculator — Power Usage Effectiveness | Behind The Tech",
  description:
    "Free online PUE (Power Usage Effectiveness) calculator for Data Centers. Calculate PUE and DCiE using the Uptime Institute standard formula, with instant efficiency rating.",
  alternates: { canonical: "https://behindthetech.in/tools/pue-calculator" },
  keywords: [
    "PUE calculator",
    "Power Usage Effectiveness",
    "data center efficiency",
    "DCiE calculator",
    "Uptime Institute PUE",
    "data center power efficiency",
  ],
  ...buildSocialMeta({
    title: "PUE Calculator — Power Usage Effectiveness | Behind The Tech",
    description:
      "Free online PUE (Power Usage Effectiveness) calculator for Data Centers. Calculate PUE and DCiE using the Uptime Institute standard formula, with instant efficiency rating.",
    url: "https://behindthetech.in/tools/pue-calculator",
  }),
};

export default function PueCalculatorPage() {
  return (
    <>
      <PueCalculatorClient />
      <div style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <CalculatorGuide slug="pue-calculator" />
        </div>
      </div>
    </>
  );
}
