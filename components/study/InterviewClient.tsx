"use client";

import { useState, useMemo } from "react";
import type { InterviewSection, InterviewQuestion } from "@/content/study/types";

const S = {
  qBlock: { border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "1.5rem", overflow: "hidden" } as const,
  qHeader: { background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "1rem 1.25rem" } as const,
  qNum: { fontSize: "0.75rem", fontWeight: 700, color: "#155eef", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.25rem" } as const,
  qText: { fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: 0 } as const,
  qBody: { padding: "1.25rem" } as const,
  label: { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#155eef", marginBottom: "0.35rem", display: "block" as const } as const,
  answer: { fontSize: "0.97rem", lineHeight: 1.75, color: "#1f2937", marginBottom: 0, whiteSpace: "pre-wrap" as const } as const,
  tip: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "0.9rem 1rem", marginTop: "0.75rem", fontSize: "0.9rem", color: "#1e40af", lineHeight: 1.65 } as const,
  mistake: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.9rem 1rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "#991b1b", lineHeight: 1.65 } as const,
  why: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "0.9rem 1rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "#14532d", lineHeight: 1.65 } as const,
  expectation: { background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "8px", padding: "0.9rem 1rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "#6b21a8", lineHeight: 1.65 } as const,
};

function QuestionBlock({ q, label, color }: { q: InterviewQuestion; label: string; color: string }) {
  return (
    <div style={S.qBlock}>
      <div style={S.qHeader}>
        <div style={{ ...S.qNum, color }}>{`Q${q.n} · ${label}`}</div>
        <p style={S.qText}>{q.q}</p>
      </div>
      <div style={S.qBody}>
        <span style={S.label}>Expected Answer</span>
        <p style={S.answer}>{q.answer}</p>
        <div style={{ ...S.why, marginTop: "1rem" }}>
          <strong>Why Interviewer Asked This:</strong><br />{q.why}
        </div>
        {q.expectation && (
          <div style={S.expectation}>
            <strong>Interviewer Expects:</strong><br />{q.expectation}
          </div>
        )}
        <div style={S.mistake}>
          <strong>Common Mistake:</strong><br />{q.mistake}
        </div>
        <div style={S.tip}>
          <strong>Real Industry Tip:</strong><br />{q.tip}
        </div>
      </div>
    </div>
  );
}

interface Props {
  sections: InterviewSection[];
}

export default function InterviewClient({ sections }: Props) {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return sections
      .filter(s => activeSection === "All" || s.label === activeSection)
      .map(s => ({
        ...s,
        questions: s.questions.filter(
          qs =>
            q === "" ||
            qs.q.toLowerCase().includes(q) ||
            qs.answer.toLowerCase().includes(q) ||
            qs.tip.toLowerCase().includes(q) ||
            (qs.expectation ?? "").toLowerCase().includes(q)
        ),
      }))
      .filter(s => s.questions.length > 0);
  }, [search, activeSection, sections]);

  const totalFiltered = filtered.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <>
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input
          type="search"
          placeholder="Search questions, answers, tips…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827", background: "#fff" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {["All", ...sections.map(s => s.label)].map(label => {
            const sec = sections.find(s => s.label === label);
            const active = activeSection === label;
            return (
              <button
                key={label}
                onClick={() => setActiveSection(label)}
                style={{ fontSize: "0.8rem", fontWeight: 600, padding: "4px 14px", borderRadius: "20px", border: `1.5px solid ${active && sec ? sec.color : "#e2e8f0"}`, background: active && sec ? sec.bg : "#fff", color: active && sec ? sec.color : "#475569", cursor: "pointer" }}
              >
                {label}
              </button>
            );
          })}
        </div>
        {search && (
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            {totalFiltered} result{totalFiltered !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No questions match your search.</p>
        </div>
      ) : (
        filtered.map(section => (
          <div key={section.label}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginTop: "2.5rem", marginBottom: "0.75rem", borderBottom: "2px solid #e2e8f0", paddingBottom: "0.75rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", margin: 0 }}>{section.label}</h2>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 10px", borderRadius: "20px", background: section.bg, color: section.color, border: `1px solid ${section.color}` }}>
                {section.questions.length} Questions
              </span>
            </div>
            {activeSection === "All" && (
              <p style={{ color: "#475569", marginBottom: "1.5rem", fontSize: "0.93rem" }}>{section.desc}</p>
            )}
            {section.questions.map(q => (
              <QuestionBlock key={q.n} q={q} label={section.label} color={section.color} />
            ))}
          </div>
        ))
      )}
    </>
  );
}
