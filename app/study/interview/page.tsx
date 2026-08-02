import type { Metadata } from "next";
import { INTERVIEW_SECTIONS } from "@/content/study/interview";
import InterviewClient from "@/components/study/InterviewClient";

export const metadata: Metadata = {
  title: "Data Center Interview Questions — Behind The Tech",
  description:
    "Data Center engineer interview preparation — Beginner se Senior tak questions with expected answers, common mistakes, and real industry tips. Non-IT aur IT infrastructure dono covered.",
  alternates: { canonical: "https://behindthetech.in/study/interview" },
};

export default function InterviewPage() {
  const totalQ = INTERVIEW_SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          STUDY → Interview Preparation
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Interview Questions
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "680px" }}>
          {totalQ} questions — har ek real production environment se aaya hai. Expected answers, common mistakes, aur field-tested tips ke saath. Search karo ya category select karo.
        </p>
        <InterviewClient sections={INTERVIEW_SECTIONS} />
        <div style={{ marginTop: "4rem", padding: "2rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>More Questions Coming</h3>
          <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            Phase 2: Vendor interview scenarios, client escalation scenarios, cloud infrastructure interviews, DCIM/BMS specialist questions, electrical engineering deep-dives. Content continuously expanding.
          </p>
        </div>
      </div>
    </main>
  );
}
