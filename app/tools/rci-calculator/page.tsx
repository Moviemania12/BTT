import type { Metadata } from "next";
import RciCalculatorClient from "./RciCalculatorClient";

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
};

export default function RciCalculatorPage() {
  return <RciCalculatorClient />;
}
