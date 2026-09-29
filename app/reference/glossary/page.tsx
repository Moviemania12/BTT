import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { GLOSSARY_SECTIONS, ALL_GLOSSARY_TERMS } from "@/content/reference/glossary";
import GlossaryClient from "@/components/reference/GlossaryClient";

export const metadata: Metadata = {
  title: "Data Center Glossary — Behind The Tech",
  description:
    "Complete Data Center glossary — Power, Cooling, Networking, Storage, Cloud, IT terms with practical meanings, real-world context, common confusion, and related systems. The complete reference for a DC engineer.",
  alternates: {
    canonical: "https://behindthetech.in/reference/glossary",
  },
  ...buildSocialMeta({
    title: "Data Center Glossary — Behind The Tech",
    description:
      "Complete Data Center glossary — Power, Cooling, Networking, Storage, Cloud, IT terms with practical meanings, real-world context, common confusion, and related systems. The complete reference for a DC engineer.",
    url: "https://behindthetech.in/reference/glossary",
  }),
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
          {ALL_GLOSSARY_TERMS.length} terms — Power, Cooling, Networking, Storage, Cloud, Safety, Monitoring. Every term includes meaning, practical importance, a real example, and common confusion. Navigate A-Z or search.
        </p>
        <GlossaryClient sections={GLOSSARY_SECTIONS} />
      </div>
    </main>
  );
}
