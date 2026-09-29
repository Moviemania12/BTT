import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import UpsRedundancyCalculatorClient from "./UpsRedundancyCalculatorClient";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/ups-redundancy-calculator/page.tsx
//
// Server component: exports SEO metadata (from the calculator's registry
// entry — lib/engineering/registry/calculatorRegistry.ts) and renders the
// interactive client component, following the same server/client split as
// app/study/interview/page.tsx.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "UPS Redundancy Calculator — N+1 vs 2N Sizing Tool | Behind The Tech",
  description:
    "Calculate UPS module count, spares, and capacity utilization for N, N+1, N+2, and 2N redundancy architectures. Free Data Center engineering calculator.",
  keywords: ["ups redundancy calculator", "n+1 calculator", "2n architecture calculator", "ups module sizing"],
  alternates: { canonical: "https://behindthetech.in/tools/ups-redundancy-calculator" },
  ...buildSocialMeta({
    title: "UPS Redundancy Calculator — N+1 vs 2N Sizing Tool | Behind The Tech",
    description:
      "Calculate UPS module count, spares, and capacity utilization for N, N+1, N+2, and 2N redundancy architectures. Free Data Center engineering calculator.",
    url: "https://behindthetech.in/tools/ups-redundancy-calculator",
  }),
};

export default function UpsRedundancyCalculatorPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <UpsRedundancyCalculatorClient />
        <CalculatorGuide slug="ups-redundancy-calculator" />
      </div>
    </main>
  );
}
