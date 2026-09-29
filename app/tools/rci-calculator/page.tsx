import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import RciCalculatorClient from "./RciCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/rci-calculator/page.tsx
//
// Server component: exports metadata, renders the client calculator.
// RCI (Rack Cooling Index) per ASHRAE TC9.9 thermal guidelines.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "RCI Calculator — Rack Cooling Index | Behind The Tech",
  description:
    "Free online ASHRAE Rack Cooling Index (RCI) calculator for Data Centers. Calculate RCI_HI and RCI_LO from rack inlet temperatures to spot hot spots and over-cooling.",
  alternates: { canonical: "https://behindthetech.in/tools/rci-calculator" },
  keywords: [
    "RCI calculator",
    "Rack Cooling Index",
    "ASHRAE RCI",
    "data center cooling",
    "rack inlet temperature",
    "data center thermal management",
  ],
  ...buildSocialMeta({
    title: "RCI Calculator — Rack Cooling Index | Behind The Tech",
    description:
      "Free online ASHRAE Rack Cooling Index (RCI) calculator for Data Centers. Calculate RCI_HI and RCI_LO from rack inlet temperatures to spot hot spots and over-cooling.",
    url: "https://behindthetech.in/tools/rci-calculator",
  }),
};

export default function RciCalculatorPage() {
  return (
    <>
      <RciCalculatorClient />
      <div style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <CalculatorGuide slug="rci-calculator" />
        </div>
      </div>
    </>
  );
}
