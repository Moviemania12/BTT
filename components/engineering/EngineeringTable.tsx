"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/EngineeringTable.tsx
//
// Shared comparison table — used by every article. Replaces the per-article
// `function ComparisonTable(...)`. Accepts the shared ComparisonTableData
// shape so article-specific table content (UPS tables, Battery tables, etc.)
// lives only in each article's own tables/ folder, never here.
// ═══════════════════════════════════════════════════════════════════════════

import type { ComparisonTableData } from "@/types/engineering/core";

export interface EngineeringTableProps extends ComparisonTableData {
  /** Optional id for "copy link to this table" / in-page anchoring */
  id?: string;
}

export function EngineeringTable({ id, title, headers, rows, caption }: EngineeringTableProps) {
  return (
    <div id={id} style={{ margin: "1.5rem 0" }}>
      {title && (
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.6rem" }}>
          {title}
        </p>
      )}
      <div style={{ overflowX: "auto" }} role="region" aria-label={title ?? "Comparison table"} tabIndex={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "#1e293b" }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    color: "#ffffff",
                    textAlign: "left",
                    padding: "0.7rem 1rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "0.65rem 1rem",
                      color: "#334155",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.5rem", fontStyle: "italic" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export default EngineeringTable;
