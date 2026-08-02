"use client";

import { useState, useMemo } from "react";
import type { TroubleshootingGuide } from "@/content/study/types";

const S = {
  p: { fontSize: "0.96rem", lineHeight: 1.75, color: "#374151", marginBottom: "0.75rem" } as const,
  step: { display: "flex" as const, gap: "0.75rem", marginBottom: "0.6rem", alignItems: "flex-start" as const } as const,
  stepNum: { minWidth: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "#155eef", color: "#fff", fontSize: "0.72rem", fontWeight: 800, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const, flexShrink: 0 } as const,
  stepText: { fontSize: "0.95rem", color: "#1f2937", lineHeight: 1.65 } as const,
  sectionLabel: { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "0.4rem" } as const,
};

const WORKFLOW_STEPS = [
  { key: "alarm", label: "A — Alarm", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { key: "isolation", label: "I — Isolation", color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { key: "diagnosis", label: "D — Diagnosis", color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd" },
  { key: "resolution", label: "R — Resolution", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { key: "prevention", label: "P — Prevention", color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff" },
  { key: "rca", label: "RCA — Root Cause Analysis", color: "#475569", bg: "#f8fafc", border: "#e2e8f0" },
] as const;

function TroubleshootingCard({ g }: { g: TroubleshootingGuide }) {
  const hasWorkflow = g.alarm || g.isolation || g.diagnosis || g.resolution || g.rca;

  return (
    <div id={g.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "2rem", overflow: "hidden" }}>
      <div style={{ padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #e2e8f0", borderLeft: `4px solid ${g.categoryColor}`, background: "#fafafa" }}>
        <span style={{ background: g.categoryColor, color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: "20px" }}>{g.category}</span>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", margin: 0, flex: 1 }}>{g.title}</h2>
      </div>
      <div style={{ padding: "1.5rem" }}>
        {/* Symptoms + Causes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ ...S.sectionLabel, color: "#dc2626" }}>Symptoms</div>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>{g.symptoms.map((s, i) => <li key={i} style={{ ...S.p, marginBottom: "0.3rem" }}>{s}</li>)}</ul>
          </div>
          <div>
            <div style={{ ...S.sectionLabel, color: "#f97316" }}>Possible Causes</div>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>{g.causes.map((c, i) => <li key={i} style={{ ...S.p, marginBottom: "0.3rem" }}>{c}</li>)}</ul>
          </div>
        </div>

        {/* Verify steps */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ ...S.sectionLabel, color: "#0369a1" }}>How to Verify</div>
          {g.verify.map((v, i) => (
            <div key={i} style={S.step}>
              <div style={{ ...S.stepNum, background: "#0369a1" }}>{i + 1}</div>
              <div style={S.stepText}>{v}</div>
            </div>
          ))}
        </div>

        {/* Troubleshooting steps */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ ...S.sectionLabel, color: "#155eef" }}>Step-by-Step Troubleshooting</div>
          {g.steps.map((st, i) => (
            <div key={i} style={S.step}>
              <div style={S.stepNum}>{i + 1}</div>
              <div style={S.stepText}>{st}</div>
            </div>
          ))}
        </div>

        {/* A→I→D→R→P→RCA Workflow */}
        {hasWorkflow && (
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ ...S.sectionLabel, color: "#334155", marginBottom: "0.75rem" }}>A → I → D → R → P → RCA Workflow</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              {WORKFLOW_STEPS.map(({ key, label, color, bg, border }) => {
                const value = key === "prevention"
                  ? (g.prevention ?? []).join("; ")
                  : (g as unknown as Record<string, unknown>)[key] as string | undefined;
                if (!value) return null;
                return (
                  <div key={key} style={{ background: bg, border: `1px solid ${border}`, borderRadius: "8px", padding: "0.75rem" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color, marginBottom: "0.35rem" }}>{label}</div>
                    <div style={{ fontSize: "0.88rem", color: "#1f2937", lineHeight: 1.6 }}>{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Legacy root cause + resolution 2-col */}
        {!hasWorkflow && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "1rem" }}>
              <div style={{ ...S.sectionLabel, color: "#c2410c", marginBottom: "0.5rem" }}>Root Cause</div>
              <p style={{ ...S.p, margin: 0 }}>{g.rootCause}</p>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "1rem" }}>
              <div style={{ ...S.sectionLabel, color: "#15803d", marginBottom: "0.5rem" }}>Resolution</div>
              <p style={{ ...S.p, margin: 0 }}>{g.resolution}</p>
            </div>
          </div>
        )}

        {/* Prevention (list) — shown when no workflow */}
        {!hasWorkflow && g.prevention.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ ...S.sectionLabel, color: "#16a34a" }}>Prevention</div>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>{g.prevention.map((pr, i) => <li key={i} style={{ ...S.p, marginBottom: "0.3rem" }}>{pr}</li>)}</ul>
          </div>
        )}

        {/* Escalation + Mistakes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ ...S.sectionLabel, color: "#991b1b", marginBottom: "0.5rem" }}>Escalation Point</div>
            <p style={{ ...S.p, margin: 0 }}>{g.escalation}</p>
          </div>
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ ...S.sectionLabel, color: "#1e40af", marginBottom: "0.5rem" }}>Common Mistakes</div>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>{g.mistakes.map((m, i) => <li key={i} style={{ ...S.p, marginBottom: "0.25rem" }}>{m}</li>)}</ul>
          </div>
        </div>

        {/* Site example */}
        <div style={{ background: "#fafafa", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem" }}>
          <div style={{ ...S.sectionLabel, color: "#475569", marginBottom: "0.4rem" }}>Real Site Example</div>
          <p style={{ ...S.p, margin: 0, fontStyle: "italic" }}>{g.siteExample}</p>
        </div>
      </div>
    </div>
  );
}

interface Props {
  guides: TroubleshootingGuide[];
  categories: string[];
}

export default function TroubleshootingClient({ guides, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return guides.filter(g => {
      const catMatch = activeCategory === "All" || g.category === activeCategory;
      const textMatch =
        q === "" ||
        g.title.toLowerCase().includes(q) ||
        g.symptoms.some(s => s.toLowerCase().includes(q)) ||
        g.causes.some(c => c.toLowerCase().includes(q)) ||
        g.steps.some(s => s.toLowerCase().includes(q)) ||
        g.rootCause.toLowerCase().includes(q) ||
        (g.alarm ?? "").toLowerCase().includes(q) ||
        (g.diagnosis ?? "").toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [search, activeCategory, guides]);

  return (
    <>
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input
          type="search"
          placeholder="Search symptoms, causes, steps…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {["All", ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ fontSize: "0.8rem", fontWeight: 600, padding: "4px 14px", borderRadius: "20px", border: `1.5px solid ${activeCategory === cat ? "#155eef" : "#e2e8f0"}`, background: activeCategory === cat ? "#eff6ff" : "#fff", color: activeCategory === cat ? "#155eef" : "#475569", cursor: "pointer" }}
            >
              {cat}
            </button>
          ))}
        </div>
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{filtered.length} guide{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;</p>}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No guides match your search.</p>
        </div>
      ) : (
        filtered.map(g => <TroubleshootingCard key={g.id} g={g} />)
      )}
    </>
  );
}
