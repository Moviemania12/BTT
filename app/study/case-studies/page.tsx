import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from "@/content/study/case-studies";
import CaseStudiesClient from "@/components/study/CaseStudiesClient";

export const metadata: Metadata = {
  title: "Data Center Case Studies — Behind The Tech",
  description:
    "Real-world Data Center incident case studies — UPS failures, DG fault, CRAC overheating, water leakage, FM200 false discharge, ransomware, cloud outages. Full timeline, RCA, and lessons learned for every incident.",
  alternates: {
    canonical: "https://behindthetech.in/study/case-studies",
  },
  ...buildSocialMeta({
    title: "Data Center Case Studies — Behind The Tech",
    description:
      "Real-world Data Center incident case studies — UPS failures, DG fault, CRAC overheating, water leakage, FM200 false discharge, ransomware, cloud outages. Full timeline, RCA, and lessons learned for every incident.",
    url: "https://behindthetech.in/study/case-studies",
  }),
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
          {CASE_STUDIES.length} real-world incidents — each one with a full timeline, investigation steps, root cause analysis, and lessons learned. Straight from production experience. Click any case to expand.
        </p>
        <CaseStudiesClient cases={CASE_STUDIES} categories={CASE_STUDY_CATEGORIES} />
      </div>
    </main>
  );
}
