import type { Metadata } from "next";
import { GLOSSARY_SECTIONS, ALL_GLOSSARY_TERMS } from "@/content/reference/glossary";
import GlossaryClient from "@/components/reference/GlossaryClient";

export const metadata: Metadata = {
  title: "Data Center Glossary — Behind The Tech",
  description:
    "Complete Data Center glossary — Power, Cooling, Networking, Storage, Cloud, IT terms with practical meanings, real-world context, common confusion, aur related systems. DC engineer ka complete reference.",
  alternates: { canonical: "https://behindthetech.in/reference/glossary" },
};

export default function GlossaryPage() {
  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          REFERENCE → Glossary
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Glossary
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {ALL_GLOSSARY_TERMS.length} terms — Power, Cooling, Networking, Storage, Cloud, Safety, Monitoring. Har term mein meaning, practical importance, real example, aur common confusion. A-Z navigate karo ya search karo.
        </p>
        <GlossaryClient sections={GLOSSARY_SECTIONS} />
        <div style={{ marginTop: "3rem", padding: "2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>Glossary Expanding Continuously</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            Phase 2 mein 200+ more terms — Electrical (HT/LT, Transformer types, RMU, Protection relays), Cooling (AHU, VRF, Economizer variants), Fire (Pre-action, Deluge, VESDA levels), IT (NVMe-oF, VXLAN, EVPN, BGP EVPN), Cloud (Azure specific, GCP specific, K8s ecosystem), Compliance (Tier I-IV, ISO 27001, PCI-DSS, ASHRAE classes).
          </p>
        </div>
      </div>
    </main>
  );
}
