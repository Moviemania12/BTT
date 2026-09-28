import type { Metadata } from "next";
import DataCenterUpsDesignerClient from "./DataCenterUpsDesignerClient";

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
    "Full first-pass Data Center UPS design: enter rack count and Tier level, get UPS modules, battery count, generator size, transformer size, PDU quantity, and cable sizing.",
  keywords: ["data center ups designer", "data center sizing tool", "ups design calculator", "tier iii ups sizing"],
  alternates: { canonical: "https://behindthetech.in/tools/data-center-ups-designer" },
};

export default function DataCenterUpsDesignerPage() {
  return (
    <main
      data-homepage-theme="light"
      style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <DataCenterUpsDesignerClient />
      </div>
    </main>
  );
}
