import type { Metadata } from "next";
import UpsLoadCalculatorClient from "./UpsLoadCalculatorClient";

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
    "Calculate the right UPS size for your Data Center load. Add servers, storage, network, and lighting load — get a final kVA recommendation with demand factor and growth headroom.",
  keywords: ["ups load calculator", "ups sizing calculator", "data center ups sizing", "ups kva calculator"],
  alternates: { canonical: "https://behindthetech.in/tools/ups-load-calculator" },
};

export default function UpsLoadCalculatorPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <UpsLoadCalculatorClient />
      </div>
    </main>
  );
}
