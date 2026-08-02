"use client";

import { useState, useMemo } from "react";
import type { CaseStudy } from "@/content/study/case-studies";

const S = {
  label: { fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#94a3b8", marginBottom: "0.3rem", display: "block" as const } as const,
  p: { fontSize: "0.95rem", lineHeight: 1.75, color: "#374151", margin: 0 } as const,
  li: { fontSize: "0.93rem", lineHeight: 1.65, color: "#1f2937", marginBottom: "0.35rem" } as const,
  step: { display: "flex" as const, gap: "0.75rem", marginBottom: "0.5rem", alignItems: "flex-start" as const } as const,
};

const ACTOR_COLOR: Record<string, string> = {
  System: "#dc2626",
  Engineer: "#2563EB",
  Customer: "#f97316",
  Management: "#7c3aed",
};

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const [open, setOpen] = useState(false);

  return (
    <div id={cs.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "1.5rem", overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{ padding: "1.1rem 1.5rem", background: "#fafafa", borderBottom: "1px solid #e2e8f0", borderLeft: `4px solid ${cs.categoryColor}`, cursor: "pointer" }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem", flexWrap: "wrap" as const }}>
          <span style={{ background: cs.categoryColor, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: "20px" }}>{cs.category}</span>
          <span style={{ background: cs.severityColor + "15", color: cs.severityColor, border: `1px solid ${cs.severityColor}40`, fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: "20px" }}>{cs.severity}</span>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginLeft: "auto" }}>{cs.impactDuration}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", margin: 0, flex: 1 }}>{cs.title}</h2>
          <span style={{ fontSize: "1.2rem", color: "#94a3b8", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
        </div>
        <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem", color: "#64748b" }}>Scope: {cs.impactScope}</p>
      </div>

      {open && (
        <div style={{ padding: "1.5rem" }}>
          {/* Background */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={S.label}>Background</span>
            <p style={S.p}>{cs.background}</p>
          </div>

          {/* Infrastructure */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={S.label}>Infrastructure Involved</span>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              {cs.infrastructure.map((item, i) => <li key={i} style={S.li}>{item}</li>)}
            </ul>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={S.label}>Incident Timeline</span>
            <div style={{ border: "1px solid #f1f5f9", borderRadius: "8px", overflow: "hidden" }}>
              {cs.timeline.map((ev, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 0, borderBottom: i < cs.timeline.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ padding: "0.55rem 0.75rem", background: "#f8fafc", borderRight: "1px solid #f1f5f9", fontSize: "0.78rem", fontWeight: 700, color: "#475569", fontFamily: "monospace" }}>{ev.time}</div>
                  <div style={{ padding: "0.55rem 0.75rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "1px 6px", borderRadius: "8px", background: ACTOR_COLOR[ev.actor] + "20", color: ACTOR_COLOR[ev.actor], flexShrink: 0, marginTop: "1px" }}>{ev.actor}</span>
                    <span style={{ fontSize: "0.88rem", color: "#1f2937", lineHeight: 1.5 }}>{ev.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Symptoms + Investigation 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div>
              <span style={S.label}>Symptoms Observed</span>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>{cs.symptoms.map((s, i) => <li key={i} style={S.li}>{s}</li>)}</ul>
            </div>
            <div>
              <span style={S.label}>Investigation Steps</span>
              {cs.investigation.map((step, i) => (
                <div key={i} style={S.step}>
                  <div style={{ minWidth: "1.3rem", height: "1.3rem", borderRadius: "50%", background: "#0369a1", color: "#fff", fontSize: "0.65rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{i + 1}</div>
                  <span style={{ fontSize: "0.88rem", color: "#1f2937", lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RCA boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "1rem" }}>
              <span style={{ ...S.label, color: "#c2410c" }}>Root Cause</span>
              <p style={{ ...S.p, fontSize: "0.9rem" }}>{cs.rootCause}</p>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "1rem" }}>
              <span style={{ ...S.label, color: "#991b1b" }}>Contributing Factors</span>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>{cs.contributingFactors.map((f, i) => <li key={i} style={{ ...S.li, fontSize: "0.88rem" }}>{f}</li>)}</ul>
            </div>
          </div>

          {/* Corrective + Preventive */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "1rem" }}>
              <span style={{ ...S.label, color: "#1e40af" }}>Corrective Actions</span>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>{cs.correctiveActions.map((a, i) => <li key={i} style={{ ...S.li, fontSize: "0.88rem" }}>{a}</li>)}</ul>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "1rem" }}>
              <span style={{ ...S.label, color: "#15803d" }}>Preventive Actions</span>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>{cs.preventiveActions.map((a, i) => <li key={i} style={{ ...S.li, fontSize: "0.88rem" }}>{a}</li>)}</ul>
            </div>
          </div>

          {/* Lessons Learned */}
          <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "8px", padding: "1rem" }}>
            <span style={{ ...S.label, color: "#6b21a8" }}>Lessons Learned</span>
            {cs.lessonsLearned.map((l, i) => (
              <div key={i} style={S.step}>
                <div style={{ minWidth: "1.3rem", height: "1.3rem", borderRadius: "50%", background: "#7c3aed", color: "#fff", fontSize: "0.65rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>{i + 1}</div>
                <span style={{ fontSize: "0.9rem", color: "#4c1d95", lineHeight: 1.65 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  cases: CaseStudy[];
  categories: string[];
}

export default function CaseStudiesClient({ cases, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return cases.filter(cs => {
      const catMatch = activeCategory === "All" || cs.category === activeCategory;
      const textMatch =
        q === "" ||
        cs.title.toLowerCase().includes(q) ||
        cs.background.toLowerCase().includes(q) ||
        cs.rootCause.toLowerCase().includes(q) ||
        cs.lessonsLearned.some(l => l.toLowerCase().includes(q)) ||
        cs.symptoms.some(s => s.toLowerCase().includes(q));
      return catMatch && textMatch;
    });
  }, [search, activeCategory, cases]);

  return (
    <>
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input
          type="search"
          placeholder="Search incidents, root causes, lessons…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {["All", ...categories].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ fontSize: "0.8rem", fontWeight: 600, padding: "4px 14px", borderRadius: "20px", border: `1.5px solid ${activeCategory === cat ? "#155eef" : "#e2e8f0"}`, background: activeCategory === cat ? "#eff6ff" : "#fff", color: activeCategory === cat ? "#155eef" : "#475569", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{filtered.length} case{filtered.length !== 1 ? "s" : ""} found</p>}
      </div>

      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#fffbf5", border: "1px solid #fed7aa", borderRadius: "10px" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#92400e", lineHeight: 1.65 }}>
          These case studies are based on real incident patterns from production DC environments. Site names, exact capacities, and identifying details have been anonymised. The technical details, timelines, and lessons learned are accurate.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No case studies match your search.</p>
        </div>
      ) : (
        filtered.map(cs => <CaseStudyCard key={cs.id} cs={cs} />)
      )}
    </>
  );
}
