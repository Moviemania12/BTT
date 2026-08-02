import type { Metadata } from "next";
import { CHECKLISTS } from "@/content/study/checklists";
import ChecklistsClient from "@/components/study/ChecklistsClient";

export const metadata: Metadata = {
  title: "Data Center Checklists — Behind The Tech",
  description:
    "Engineer-grade Data Center checklists — Daily, Weekly, Monthly, UPS, DG, Cooling, Fire, Network, Pre-Shutdown, Commissioning. Production-ready templates for DC operations teams.",
  alternates: { canonical: "https://behindthetech.in/study/checklists" },
};

export default function ChecklistsPage() {
  const totalItems = CHECKLISTS.reduce(
    (sum, cl) => sum + cl.sections.reduce((s2, sec) => s2 + sec.items.length, 0),
    0
  );

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          STUDY → Checklists
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Operations Checklists
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {CHECKLISTS.length} checklists, {totalItems} total checks — production-ready templates. ★ items critical. Search karo ya frequency filter use karo.
        </p>
        <ChecklistsClient checklists={CHECKLISTS} />
      </div>
    </main>
  );
}
