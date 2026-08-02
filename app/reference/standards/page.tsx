import type { Metadata } from "next";
import { STANDARDS, STANDARDS_CATEGORIES } from "@/content/reference/standards";
import StandardsClient from "@/components/reference/StandardsClient";

export const metadata: Metadata = {
  title: "Data Center Standards Reference — Behind The Tech",
  description:
    "Complete Data Center standards reference — Uptime Institute Tier, TIA-942, ISO 27001, ISO 20000, ISO 22301, PCI-DSS, SOC 2, EN 50600, ASHRAE TC9.9, NFPA 75, NFPA 76, IEC 60364. What each standard requires and how DCs implement it.",
  alternates: { canonical: "https://behindthetech.in/reference/standards" },
};

export default function StandardsPage() {
  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          REFERENCE → Standards
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Standards Reference
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {STANDARDS.length} standards — Uptime Institute, TIA, ISO, PCI, NFPA, IEC, ASHRAE. Har standard mein: what it is, why it matters, key requirements, aur real DC implementation example. Search ya category filter use karo.
        </p>
        <StandardsClient standards={STANDARDS} categories={STANDARDS_CATEGORIES} />
        <div style={{ marginTop: "3rem", padding: "2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Standards Library Expanding</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            Phase 2: NBC 2016 (National Building Code of India), IS:3043 (Earthing), IS:1646 (Fire Safety), TRAI DC guidelines, RBI IT framework, MEITY data center policy, BICSI 002, Green Globes, LEED for Data Centers, EU Energy Efficiency Directive requirements.
          </p>
        </div>
      </div>
    </main>
  );
}
