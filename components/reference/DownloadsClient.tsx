"use client";

import { useState, useMemo } from "react";
import type { DownloadItem } from "@/content/reference/downloads";

const PRINT_STYLE = `
@media print {
  body * { visibility: hidden !important; }
  #dl-print-target, #dl-print-target * { visibility: visible !important; }
  #dl-print-target { position: fixed !important; inset: 0 !important; padding: 1.5rem !important; background: white !important; font-family: Arial, sans-serif !important; }
  .no-print { display: none !important; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #ccc; padding: 6px 8px; font-size: 10pt; }
  th { background: #f0f0f0; font-weight: bold; }
  @page { margin: 1.5cm; size: A4; }
}
`;

let styleInjected = false;

const ROW_TYPE_HINT: Record<string, string> = {
  text: "___________________________",
  reading: "_________",
  date: "____ / ____ / ________",
  checkbox: "☐",
  yesno: "Yes ☐   No ☐",
  signature: "_________________________ Date: ___________",
};

function PrintTemplate({ item }: { item: DownloadItem }) {
  return (
    <div id="dl-print-target" style={{ fontFamily: "Arial, sans-serif", color: "#000" }}>
      <div style={{ borderBottom: "2px solid #000", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 0.2rem" }}>{item.title}</h1>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#444" }}>Behind The Tech — behindthetech.in | {item.pages} page{item.pages > 1 ? "s" : ""} | {item.format}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.85rem", border: "1px solid #ccc", padding: "0.5rem" }}>
        {item.fields.map((f, i) => (
          <div key={i}><strong>{f}:</strong> _____________________</div>
        ))}
      </div>
      {item.sections.map((section, si) => (
        <div key={si} style={{ marginBottom: "1rem" }}>
          <div style={{ background: "#f0f0f0", padding: "4px 8px", fontWeight: 700, fontSize: "0.9rem", border: "1px solid #ccc" }}>{section.heading}</div>
          <table>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} style={{ background: row.critical ? "#fff8f0" : "white" }}>
                  <td style={{ width: "50%", fontWeight: row.critical ? 700 : 400 }}>
                    {row.critical && "★ "}
                    {row.label}
                    {row.note && <div style={{ fontSize: "0.75rem", color: "#666", fontWeight: 400 }}>{row.note}</div>}
                  </td>
                  <td style={{ color: "#555" }}>{ROW_TYPE_HINT[row.type] ?? ""}</td>
                  <td style={{ width: "20%", fontSize: "0.8rem", color: "#888" }}>Remarks</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #ccc", paddingTop: "0.5rem", fontSize: "0.75rem", color: "#888" }}>
        Behind The Tech · behindthetech.in · ★ = Critical item — escalate any deviation before proceeding
      </div>
    </div>
  );
}

function DownloadCard({ item }: { item: DownloadItem }) {
  const [printTarget, setPrintTarget] = useState(false);

  const handlePrint = () => {
    if (!styleInjected && typeof window !== "undefined") {
      const el = document.createElement("style");
      el.textContent = PRINT_STYLE;
      document.head.appendChild(el);
      styleInjected = true;
    }
    setPrintTarget(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintTarget(false), 500);
    }, 100);
  };

  const totalRows = item.sections.reduce((sum, s) => sum + s.rows.length, 0);
  const criticalRows = item.sections.reduce((sum, s) => sum + s.rows.filter(r => r.critical).length, 0);

  return (
    <div id={item.id} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", marginBottom: "1rem", overflow: "hidden" }}>
      {printTarget && <PrintTemplate item={item} />}
      <div style={{ padding: "1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem", flexWrap: "wrap" as const }}>
            <span style={{ background: item.categoryColor, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "2px 9px", borderRadius: "20px" }}>{item.category}</span>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{item.format} · {item.pages} page{item.pages > 1 ? "s" : ""} · {totalRows} fields · {criticalRows} critical</span>
          </div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: "0 0 0.3rem" }}>{item.title}</h3>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569", lineHeight: 1.6 }}>{item.description}</p>
        </div>
        <button
          className="no-print"
          onClick={handlePrint}
          style={{ background: "#155eef", color: "#fff", border: "none", borderRadius: "8px", padding: "0.55rem 1rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0 }}
        >
          🖨 Print / Save PDF
        </button>
      </div>
      <div style={{ padding: "0 1.25rem 1rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" as const }}>
        {item.fields.map((f, i) => (
          <span key={i} style={{ fontSize: "0.72rem", background: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: "8px" }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  items: DownloadItem[];
  categories: string[];
}

export default function DownloadsClient({ items, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter(item => {
      const catMatch = activeCategory === "All" || item.category === activeCategory;
      const textMatch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.sections.some(s =>
          s.rows.some(r => r.label.toLowerCase().includes(q))
        );
      return catMatch && textMatch;
    });
  }, [search, activeCategory, items]);

  return (
    <>
      <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input type="search" placeholder="Search templates, forms, checklists…"
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
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{filtered.length} template{filtered.length !== 1 ? "s" : ""} found</p>}
      </div>

      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "10px" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#0369a1", lineHeight: 1.65 }}>
          Click <strong>Print / Save PDF</strong> on any template to generate a print-ready version with all fields and sign-off rows. ★ marks critical fields — never skip these. Save as PDF from your browser print dialog.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>No templates match your search.</p>
        </div>
      ) : (
        filtered.map(item => <DownloadCard key={item.id} item={item} />)
      )}
    </>
  );
}
