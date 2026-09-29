import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { INTERVIEW_SECTIONS } from "@/content/study/interview.hi";
import InterviewClient from "@/components/study/InterviewClient";

export const metadata: Metadata = {
  title: "Data Center Interview Questions — Behind The Tech",
  description:
    "Data Center engineer interview preparation — Beginner se Senior tak questions with expected answers, common mistakes, and real industry tips. Non-IT aur IT infrastructure dono covered.",
  alternates: {
    canonical: "https://behindthetech.in/hi/study/interview",
    languages: {
      "en": "https://behindthetech.in/study/interview",
      "hi": "https://behindthetech.in/hi/study/interview",
      "x-default": "https://behindthetech.in/study/interview",
    },
  },
  ...buildSocialMeta({ title: "Data Center Interview Questions — Behind The Tech", description: "Data Center engineer interview preparation — Beginner se Senior tak questions with expected answers, common mistakes, and real industry tips. Non-IT aur IT infrastructure dono covered.", url: "https://behindthetech.in/hi/study/interview" }),
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
      </div>
    </main>
  );
}
