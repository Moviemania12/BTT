"use client";

import { useState, useMemo } from "react";
import type { Standard } from "@/content/reference/standards";

const S = {
  label: { fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#94a3b8", marginBottom: "0.25rem", display: "block" as const } as const,
  value: { fontSize: "0.93rem", color: "#1f2937", lineHeight: 1.7, marginBottom: "0.75rem" } as const,
};

function StandardCard({ std }: { std: Standard }) {
  return (
    <div id={std.id} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", marginBottom: "1.25rem", overflow: "hidden" }}>
      <div style={{ padding: "0.9rem 1.25rem", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", borderLeft: `3px solid ${std.categoryColor}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem", flexWrap: "wrap" as const }}>
          <span style={{ background: std.categoryColor, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: "20px" }}>{std.category}</span>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Published by {std.body}</span>
          {std.certificationRequired && (
            <span style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", fontSize: "0.68rem", fontWeight: 700, padding: "1px 8px", borderRadius: "10px" }}>Certification Available</span>
          )}
        </div>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#111827", margin: 0 }}>{std.name}</h2>
        <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.2rem 0 0", fontStyle: "italic" }}>{std.fullName}</p>
      </div>
      <div style={{ padding: "1.1rem 1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <span style={S.label}>What It Is</span>
            <div style={S.value}>{std.what}</div>
          </div>
          <div>
            <span style={S.label}>Why It Matters</span>
            <div style={S.value}>{std.whyMatters}</div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <span style={S.label}>Where It Is Used</span>
          <div style={S.value}>{std.whereUsed}</div>
        </div>
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0.9rem 1rem", marginBottom: "1rem" }}>
          <span style={{ ...S.label, color: "#155eef" }}>Key Requirements</span>
          <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
            {std.keyRequirements.map((req, i) => (
              <li key={i} style={{ fontSize: "0.88rem", color: "#1f2937", lineHeight: 1.65, marginBottom: "0.3rem" }}>{req}</li>
            ))}
          </ul>
        </div>
        <div style={{ background: "#fffbf5", border: "1px solid #fed7aa", borderRadius: "8px", padding: "0.9rem 1rem" }}>
          <span style={{ ...S.label, color: "#92400e" }}>Real Data Center Example</span>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#1f2937", lineHeight: 1.7, fontStyle: "italic" }}>{std.dcExample}</p>
        </div>
      </div>
    </div>
  );
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface Props {
  standards: Standard[];
  categories: string[];
}

export default function StandardsClient({ standards, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return standards.filter(std => {
      const catMatch = activeCategory === "All" || std.category === activeCategory;
      const textMatch =
        q === "" ||
        std.name.toLowerCase().includes(q) ||
        std.fullName.toLowerCase().includes(q) ||
        std.what.toLowerCase().includes(q) ||
        std.whyMatters.toLowerCase().includes(q) ||
        (std.aliases ?? []).some(a => a.toLowerCase().includes(q));
      return catMatch && textMatch;
    });
  }, [search, activeCategory, standards]);

  const activeLetters = useMemo(
    () => new Set(filtered.map(s => s.name[0].toUpperCase())),
    [filtered]
  );

  const scrollTo = (letter: string) => {
    const target = filtered.find(s => s.name[0].toUpperCase() === letter);
    if (target) document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input type="search" placeholder="Search standards, acronyms, requirements…"
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {["All", ...categories].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ fontSize: "0.78rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: `1.5px solid ${activeCategory === cat ? "#155eef" : "#e2e8f0"}`, background: activeCategory === cat ? "#eff6ff" : "#fff", color: activeCategory === cat ? "#155eef" : "#475569", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{filtered.length} standard{filtered.length !== 1 ? "s" : ""} found</p>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "4px", marginBottom: "2rem", padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "10px" }}>
        {ALPHABET.map(letter => (
          <button key={letter} onClick={() => activeLetters.has(letter) && scrollTo(letter)}
            style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, border: "none", background: activeLetters.has(letter) ? "#155eef" : "transparent", color: activeLetters.has(letter) ? "#fff" : "#cbd5e1", cursor: activeLetters.has(letter) ? "pointer" : "default" }}>
            {letter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No standards match your search.</p>
        </div>
      ) : (
        filtered.map(std => <StandardCard key={std.id} std={std} />)
      )}
    </>
  );
}
