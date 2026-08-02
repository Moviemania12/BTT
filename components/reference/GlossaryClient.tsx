"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { GlossarySection } from "@/content/study/types";

const S = {
  label: { fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#94a3b8", marginBottom: "0.2rem", display: "block" as const } as const,
  value: { fontSize: "0.93rem", color: "#1f2937", lineHeight: 1.65, marginBottom: "0.75rem" } as const,
  tag: { display: "inline-block" as const, fontSize: "0.7rem", fontWeight: 600, padding: "1px 8px", borderRadius: "10px", background: "#f1f5f9", color: "#475569", marginRight: "4px", marginBottom: "4px" } as const,
  articleTag: { display: "inline-block" as const, fontSize: "0.7rem", fontWeight: 600, padding: "1px 8px", borderRadius: "10px", background: "#eff6ff", color: "#2563EB", border: "1px solid #bfdbfe", marginRight: "4px", marginBottom: "4px", textDecoration: "none" as const } as const,
};

/**
 * ARTICLE_ROUTE_MAP — validated against lib/topics.ts published routes.
 * Key = slug used in GlossaryTerm.articles[].
 * Value = { href, label } — the actual URL and display name.
 *
 * ONLY add entries here that exist as published topics in lib/topics.ts.
 * Routes verified against topics scan on 2025-08-01.
 */
const ARTICLE_ROUTE_MAP: Record<string, { href: string; label: string }> = {
  // non-it / electrical
  "ups":              { href: "/learn/non-it/electrical/ups",           label: "UPS" },
  "dg-set":           { href: "/learn/non-it/electrical/dg-set",        label: "DG Set" },
  "battery-bank":     { href: "/learn/non-it/electrical/battery-bank",  label: "Battery Bank" },
  "sts":              { href: "/learn/non-it/electrical/sts",            label: "STS" },
  "pdu":              { href: "/learn/non-it/electrical/pdu",            label: "PDU" },
  "transformer":      { href: "/learn/non-it/electrical/transformer",    label: "Transformer" },
  "rmu":              { href: "/learn/non-it/electrical/rmu",            label: "RMU" },
  "ht-yard":          { href: "/learn/non-it/electrical/ht-yard",        label: "HT Yard" },
  "grid-supply":      { href: "/learn/non-it/electrical/grid-supply",    label: "Grid Supply" },
  "earthing":         { href: "/learn/non-it/electrical/earthing",       label: "Earthing" },
  "lightning-protection": { href: "/learn/non-it/electrical/lightning-protection", label: "Lightning Protection" },
  // non-it / cooling
  "pac":              { href: "/learn/non-it/cooling/pac",               label: "PAC" },
  "crac":             { href: "/learn/non-it/cooling/crac",              label: "CRAC" },
  "chiller":          { href: "/learn/non-it/cooling/chiller",           label: "Chiller" },
  "cooling-tower":    { href: "/learn/non-it/cooling/cooling-tower",     label: "Cooling Tower" },
  "containment":      { href: "/learn/non-it/cooling/containment",       label: "Containment" },
  "airflow-management": { href: "/learn/non-it/cooling/airflow-management", label: "Airflow Management" },
  "rci":              { href: "/learn/non-it/cooling/rci",               label: "RCI" },
  // non-it / fire
  "vesda":            { href: "/learn/non-it/fire/vesda",                label: "VESDA" },
  "fm200":            { href: "/learn/non-it/fire/fm200",                label: "FM200" },
  "novec":            { href: "/learn/non-it/fire/novec",                label: "Novec" },
  "novec-1250":       { href: "/learn/non-it/fire/novec-1250",           label: "Novec 1250" },
  "hydrant":          { href: "/learn/non-it/fire/hydrant",              label: "Hydrant" },
  "sprinkler":        { href: "/learn/non-it/fire/sprinkler",            label: "Sprinkler" },
  // non-it / security
  "cctv":             { href: "/learn/non-it/security/cctv",             label: "CCTV" },
  "access-control":   { href: "/learn/non-it/security/access-control",   label: "Access Control" },
  "biometrics":       { href: "/learn/non-it/security/biometrics",       label: "Biometrics" },
  "mantrap":          { href: "/learn/non-it/security/mantrap",          label: "Mantrap" },
  "visitor-management": { href: "/learn/non-it/security/visitor-management", label: "Visitor Mgmt" },
  // non-it / bms-dcim
  "bms":              { href: "/learn/non-it/bms-dcim/bms",              label: "BMS" },
  "ems":              { href: "/learn/non-it/bms-dcim/ems",              label: "EMS" },
  "dcim":             { href: "/learn/non-it/bms-dcim/dcim",             label: "DCIM" },
  "scada":            { href: "/learn/non-it/bms-dcim/scada",            label: "SCADA" },
  "sensors":          { href: "/learn/non-it/bms-dcim/sensors",          label: "Sensors" },
  // it / servers
  "server-basics":    { href: "/learn/it/servers/server-basics",         label: "Server Basics" },
  "cpu":              { href: "/learn/it/servers/cpu",                   label: "CPU" },
  "ram":              { href: "/learn/it/servers/ram",                   label: "RAM" },
  "gpu":              { href: "/learn/it/servers/gpu",                   label: "GPU" },
  "blade-server":     { href: "/learn/it/servers/blade-server",          label: "Blade Server" },
  "virtualization":   { href: "/learn/it/servers/virtualization",        label: "Virtualization" },
  // it / storage
  "das":              { href: "/learn/it/storage/das",                   label: "DAS" },
  "nas":              { href: "/learn/it/storage/nas",                   label: "NAS" },
  "san":              { href: "/learn/it/storage/san",                   label: "SAN" },
  "backup":           { href: "/learn/it/storage/backup",                label: "Backup" },
  "disaster-recovery": { href: "/learn/it/storage/disaster-recovery",    label: "DR" },
  // it / networking
  "switch":           { href: "/learn/it/networking/switch",             label: "Switch" },
  "router":           { href: "/learn/it/networking/router",             label: "Router" },
  "firewall":         { href: "/learn/it/networking/firewall",           label: "Firewall" },
  "load-balancer":    { href: "/learn/it/networking/load-balancer",      label: "Load Balancer" },
  "sd-wan":           { href: "/learn/it/networking/sd-wan",             label: "SD-WAN" },
  // it / cloud
  "aws":              { href: "/learn/it/cloud/aws",                     label: "AWS" },
  "azure":            { href: "/learn/it/cloud/azure",                   label: "Azure" },
  "gcp":              { href: "/learn/it/cloud/gcp",                     label: "GCP" },
  "hybrid-cloud":     { href: "/learn/it/cloud/hybrid-cloud",            label: "Hybrid Cloud" },
  "multi-cloud":      { href: "/learn/it/cloud/multi-cloud",             label: "Multi-Cloud" },
  // learn / basics
  "how-the-internet-works": { href: "/learn/how-the-internet-works",     label: "How Internet Works" },
  "cloud-vs-data-center":   { href: "/learn/cloud-vs-data-center",       label: "Cloud vs DC" },
  "data-center-types":      { href: "/learn/data-center-types",          label: "DC Types" },
  "ai-infrastructure-basics": { href: "/learn/ai-infrastructure-basics", label: "AI Infra" },
};

function TermCard({ term, color }: {
  term: { term: string; full?: string; aliases?: string[]; meaning: string; whyMatters: string; whereSeen: string; confusion?: string; example: string; related: string[]; articles?: string[] };
  color: string;
}) {
  return (
    <div id={`term-${term.term.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()}`} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", marginBottom: "1rem", overflow: "hidden" }}>
      <div style={{ padding: "0.9rem 1.25rem", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" as const, borderLeft: `3px solid ${color}` }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 800, color }}>{term.term}</span>
        {term.full && <span style={{ fontSize: "0.85rem", color: "#64748b", fontStyle: "italic" }}>{term.full}</span>}
        {term.aliases && term.aliases.length > 0 && (
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Also: {term.aliases.join(", ")}</span>
        )}
      </div>
      <div style={{ padding: "1rem 1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <span style={S.label}>Meaning</span>
            <div style={S.value}>{term.meaning}</div>
          </div>
          <div>
            <span style={S.label}>Why It Matters</span>
            <div style={S.value}>{term.whyMatters}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <span style={S.label}>Where You See It</span>
            <div style={S.value}>{term.whereSeen}</div>
          </div>
          {term.confusion && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "0.75rem" }}>
              <span style={{ ...S.label, color: "#991b1b" }}>Common Confusion</span>
              <div style={{ ...S.value, marginBottom: 0 }}>{term.confusion}</div>
            </div>
          )}
        </div>
        <div style={{ background: "#f8fafc", borderRadius: "6px", padding: "0.75rem", marginBottom: "0.75rem" }}>
          <span style={{ ...S.label, color: "#64748b" }}>Example</span>
          <div style={{ ...S.value, marginBottom: 0, fontStyle: "italic" }}>{term.example}</div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" as const }}>
          {term.related.length > 0 && (
            <div>
              <span style={S.label}>Related Terms</span>
              <div>{term.related.map(r => <span key={r} style={S.tag}>{r}</span>)}</div>
            </div>
          )}
          {term.articles && term.articles.length > 0 && (
            <div>
              <span style={S.label}>Related Articles</span>
              <div>
                {term.articles.map(slug => {
                  const entry = ARTICLE_ROUTE_MAP[slug];
                  if (!entry) return null; // never render broken links
                  return (
                    <Link key={slug} href={entry.href} style={S.articleTag}>
                      {entry.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface Props {
  sections: GlossarySection[];
}

export default function GlossaryClient({ sections }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allTerms = useMemo(
    () => sections.flatMap(s => s.terms.map(t => ({ ...t, category: s.heading, color: s.color }))),
    [sections]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const byCat = activeCategory === "All"
      ? sections
      : sections.filter(s => s.heading === activeCategory);

    return byCat.map(s => ({
      ...s,
      terms: s.terms.filter(t =>
        q === "" ||
        t.term.toLowerCase().includes(q) ||
        (t.full ?? "").toLowerCase().includes(q) ||
        (t.aliases ?? []).some(a => a.toLowerCase().includes(q)) ||
        t.meaning.toLowerCase().includes(q) ||
        t.whyMatters.toLowerCase().includes(q) ||
        t.example.toLowerCase().includes(q) ||
        (t.confusion ?? "").toLowerCase().includes(q)
      ),
    })).filter(s => s.terms.length > 0);
  }, [search, activeCategory, sections]);

  const totalFiltered = filtered.reduce((sum, s) => sum + s.terms.length, 0);

  const activeLetters = useMemo(() => {
    const terms = search || activeCategory !== "All"
      ? filtered.flatMap(s => s.terms)
      : allTerms;
    return new Set(terms.map(t => t.term[0].toUpperCase()));
  }, [filtered, allTerms, search, activeCategory]);

  const scrollToLetter = (letter: string) => {
    const terms = filtered.flatMap(s => s.terms);
    const target = terms.find(t => t.term[0].toUpperCase() === letter);
    if (target) {
      const id = `term-${target.term.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()}`;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input
          type="search"
          placeholder="Search terms, acronyms, synonyms, meanings…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {["All", ...sections.map(s => s.heading)].map(cat => {
            const sec = sections.find(s => s.heading === cat);
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ fontSize: "0.78rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: `1.5px solid ${active && sec ? sec.color : "#e2e8f0"}`, background: active && sec ? sec.color + "15" : "#fff", color: active && sec ? sec.color : "#475569", cursor: "pointer" }}
              >
                {cat.split(" ").slice(0, 2).join(" ")}
              </button>
            );
          })}
        </div>
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{totalFiltered} term{totalFiltered !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;</p>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "4px", marginBottom: "2rem", padding: "1rem", background: "#f8fafc", borderRadius: "10px" }}>
        {ALPHABET.map(letter => (
          <button
            key={letter}
            onClick={() => activeLetters.has(letter) && scrollToLetter(letter)}
            style={{
              width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, border: "none",
              background: activeLetters.has(letter) ? "#155eef" : "transparent",
              color: activeLetters.has(letter) ? "#fff" : "#cbd5e1",
              cursor: activeLetters.has(letter) ? "pointer" : "default",
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No terms match your search.</p>
        </div>
      ) : (
        filtered.map(section => (
          <div key={section.heading}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: section.color, marginTop: "2.5rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "2px solid #e2e8f0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: "4px", height: "1.4em", background: section.color, borderRadius: "2px", display: "block" }} />
              {section.heading}
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginLeft: "auto" }}>{section.terms.length} terms</span>
            </h2>
            {section.terms.map(term => (
              <TermCard key={term.term} term={term} color={section.color} />
            ))}
          </div>
        ))
      )}
    </>
  );
}
