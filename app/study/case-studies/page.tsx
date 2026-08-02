import type { Metadata } from "next";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from "@/content/study/case-studies";
import CaseStudiesClient from "@/components/study/CaseStudiesClient";

export const metadata: Metadata = {
  title: "Data Center Case Studies — Behind The Tech",
  description:
    "Real-world Data Center incident case studies — UPS failures, DG fault, CRAC overheating, water leakage, FM200 false discharge, ransomware, cloud outages. Full timeline, RCA, and lessons learned for every incident.",
  alternates: { canonical: "https://behindthetech.in/study/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          STUDY → Case Studies
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Incident Case Studies
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {CASE_STUDIES.length} real-world incidents — har ek mein full timeline, investigation steps, root cause analysis, aur lessons learned. Production experience se seedha. Click any case to expand.
        </p>
        <CaseStudiesClient cases={CASE_STUDIES} categories={CASE_STUDY_CATEGORIES} />
        <div style={{ marginTop: "3rem", padding: "2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>More Case Studies Coming</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            Phase 2: Storage controller failure, battery thermal runaway, VESDA false alarm cascade, DG parallel operation failure, BGP routing loop, hybrid cloud latency event, PDU busbar failure, and post-earthquake DC recovery case studies.
          </p>
        </div>
      </div>
    </main>
  );
}
