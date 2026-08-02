"use client";

import { useState, useMemo } from "react";
import type { Checklist } from "@/content/study/types";

const S = {
  checkRow: { display: "flex" as const, alignItems: "flex-start" as const, gap: "0.75rem", padding: "0.55rem 0", borderBottom: "1px solid #f1f5f9" } as const,
  checkText: { fontSize: "0.94rem", color: "#1f2937", lineHeight: 1.5 } as const,
  note: { fontSize: "0.78rem", color: "#64748b", marginTop: "2px", display: "block" as const } as const,
  sectionDivider: { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#94a3b8", padding: "0.75rem 0 0.25rem", marginTop: "0.5rem" } as const,
};

// Print styles injected once on first render
const PRINT_STYLE = `
@media print {
  body * { visibility: hidden !important; }
  #print-target, #print-target * { visibility: visible !important; }
  #print-target { position: fixed !important; inset: 0 !important; padding: 1.5rem !important; background: white !important; }
  .no-print { display: none !important; }
  .print-checkbox { border: 1.5px solid #333 !important; background: white !important; }
  @page { margin: 1.5cm; }
}
`;

let printStyleInjected = false;

function ChecklistCard({ cl, printMode }: { cl: Checklist; printMode: boolean }) {
  const total = cl.sections.reduce((sum, s) => sum + s.items.length, 0);
  return (
    <div id={cl.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "2rem", overflow: "hidden" }}>
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem", borderLeft: `4px solid ${cl.color}`, background: "#fafafa" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
            <span style={{ background: cl.color, color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: "20px" }}>{cl.freq}</span>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{cl.duration} · {total} checks</span>
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", margin: 0 }}>{cl.title}</h2>
        </div>
        {printMode && (
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            Engineer: _________________ Date: _________
          </div>
        )}
      </div>
      <div style={{ padding: "1rem 1.5rem", background: "#fffbf5", borderBottom: "1px solid #e2e8f0" }}>
        <p style={{ margin: 0, fontSize: "0.93rem", color: "#475569", lineHeight: 1.65 }}>{cl.desc}</p>
      </div>
      <div style={{ padding: "1.25rem 1.5rem" }}>
        {cl.sections.map((section) => (
          <div key={section.heading}>
            <div style={S.sectionDivider}>{section.heading}</div>
            {section.items.map((item, i) => (
              <div key={i} style={{ ...S.checkRow, borderColor: item.critical ? "#fef2f2" : "#f1f5f9" }}>
                <div
                  className="print-checkbox"
                  style={{ width: "18px", height: "18px", border: `2px solid ${item.critical ? "#dc2626" : "#d1d5db"}`, borderRadius: "4px", flexShrink: 0, marginTop: "2px", background: "#fff" }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ ...S.checkText, fontWeight: item.critical ? 600 : 400 }}>
                    {item.critical && <span style={{ color: "#dc2626", marginRight: "4px" }}>★</span>}
                    {item.text}
                  </span>
                  {item.note && <span style={S.note}>{item.note}</span>}
                </div>
                {printMode && (
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap" as const, paddingLeft: "0.5rem" }}>
                    Remarks: ___________________
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {printMode && (
          <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569" }}>
              <strong>Sign-off:</strong> Engineer: _________________________ Supervisor: _________________________ Time: _________
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  checklists: Checklist[];
}

export default function ChecklistsClient({ checklists }: Props) {
  const [search, setSearch] = useState("");
  const [activeFreq, setActiveFreq] = useState("All");
  const [printMode, setPrintMode] = useState(false);
  const [printTarget, setPrintTarget] = useState<string | null>(null);

  // Inject print CSS once
  if (typeof window !== "undefined" && !printStyleInjected) {
    const style = document.createElement("style");
    style.textContent = PRINT_STYLE;
    document.head.appendChild(style);
    printStyleInjected = true;
  }

  const freqs = useMemo(
    () => ["All", ...Array.from(new Set(checklists.map(cl => cl.freq)))],
    [checklists]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return checklists.filter(cl => {
      const freqMatch = activeFreq === "All" || cl.freq === activeFreq;
      const textMatch =
        q === "" ||
        cl.title.toLowerCase().includes(q) ||
        cl.desc.toLowerCase().includes(q) ||
        cl.sections.some(s =>
          s.items.some(item => item.text.toLowerCase().includes(q))
        );
      return freqMatch && textMatch;
    });
  }, [search, activeFreq, checklists]);

  const handlePrint = (clId: string) => {
    setPrintTarget(clId);
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => { setPrintMode(false); setPrintTarget(null); }, 500);
    }, 100);
  };

  const displayList = printTarget ? filtered.filter(cl => cl.id === printTarget) : filtered;

  return (
    <>
      <div className="no-print" style={{ marginBottom: "2rem", display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
        <input
          type="search"
          placeholder="Search checklists and checklist items…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "480px", padding: "0.65rem 1rem", fontSize: "0.95rem", border: "1.5px solid #e2e8f0", borderRadius: "8px", outline: "none", color: "#111827" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {freqs.map(freq => (
            <button
              key={freq}
              onClick={() => setActiveFreq(freq)}
              style={{ fontSize: "0.78rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px", border: `1.5px solid ${activeFreq === freq ? "#155eef" : "#e2e8f0"}`, background: activeFreq === freq ? "#eff6ff" : "#fff", color: activeFreq === freq ? "#155eef" : "#475569", cursor: "pointer" }}
            >
              {freq}
            </button>
          ))}
        </div>
        {search && <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{filtered.length} checklist{filtered.length !== 1 ? "s" : ""} found</p>}
      </div>

      <div className="no-print" style={{ marginBottom: "1.5rem", padding: "1rem", background: "#fffbf5", border: "1px solid #fed7aa", borderRadius: "10px" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#92400e", lineHeight: 1.65 }}>
          <strong>★ Critical items</strong> — Never skip these. Any deviation requires escalation before proceeding. Click 🖨 on any checklist to print a sign-off copy.
        </p>
      </div>

      <div id="print-target">
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#94a3b8" }}>
            <p style={{ fontSize: "1.1rem", margin: 0 }}>No checklists match your search.</p>
          </div>
        ) : (
          displayList.map(cl => (
            <div key={cl.id} style={{ position: "relative" as const }}>
              <button
                className="no-print"
                onClick={() => handlePrint(cl.id)}
                title="Print this checklist"
                style={{ position: "absolute" as const, top: "1rem", right: "1rem", zIndex: 10, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                🖨 Print
              </button>
              <ChecklistCard cl={cl} printMode={printMode && printTarget === cl.id} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
