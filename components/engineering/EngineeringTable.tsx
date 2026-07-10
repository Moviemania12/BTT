"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/EngineeringTable.tsx
//
// Shared comparison table — used by every article. Replaces the per-article
// `function ComparisonTable(...)`. Accepts the shared ComparisonTableData
// shape so article-specific table content (UPS tables, Battery tables, etc.)
// lives only in each article's own tables/ folder, never here.
//
// Phase B final polish: header switched from solid dark slate to a light
// documentation-style header (#F8FAFC), matching the Apple/Stripe/Cisco-docs
// reference. Row hover effect added. Borders updated to exact spec (#E5E7EB).
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from "react";
import type { ComparisonTableData } from "@/types/engineering/core";

export interface EngineeringTableProps extends ComparisonTableData {
  /** Optional id for "copy link to this table" / in-page anchoring */
  id?: string;
}

export function EngineeringTable({ id, title, headers, rows, caption }: EngineeringTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div id={id} style={{ margin: "1.5rem 0" }}>
      {title && (
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.6rem" }}>
          {title}
        </p>
      )}
      <div
        style={{ overflowX: "auto", border: "1px solid #E5E7EB", borderRadius: "12px" }}
        role="region"
        aria-label={title ?? "Comparison table"}
        tabIndex={0}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    color: "#111827",
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
              <tr
                key={ri}
                onMouseEnter={() => setHoveredRow(ri)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  background: hoveredRow === ri ? "#EFF6FF" : ri % 2 === 0 ? "#F8FAFC" : "#ffffff",
                  transition: "background 120ms ease",
                }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "0.65rem 1rem",
                      color: "#1f2937",
                      borderBottom: "1px solid #E5E7EB",
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
        <p style={{ fontSize: "0.8rem", color: "#4b5563", marginTop: "0.5rem", fontStyle: "italic" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export default EngineeringTable;
