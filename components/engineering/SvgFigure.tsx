"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/SvgFigure.tsx
//
// Shared figure wrapper for every inline SVG diagram across the platform.
// Extends the original per-article `Figure` component with the structured
// "Source / Description / Engineering Note" slots requested for every
// diagram, while keeping the simple `caption`-only usage backward
// compatible (existing UPS sections call <SvgFigure caption="...">).
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";

export interface SvgFigureProps {
  /** Short caption shown directly under the diagram (existing behavior, unchanged) */
  caption: string;
  /** Optional: where this diagram's information is sourced from (e.g. "IEC 62040 general architecture") */
  source?: string;
  /** Optional: a longer description for accessibility / SEO context */
  description?: string;
  /** Optional: an engineering note — caveat, assumption, or "varies by project" disclosure */
  engineeringNote?: string;
  /** Stable id so this figure can be deep-linked ("copy heading link" style features later) */
  id?: string;
  children: ReactNode;
}

export function SvgFigure({ caption, source, description, engineeringNote, id, children }: SvgFigureProps) {
  return (
    <figure id={id} style={{ margin: "2rem 0" }}>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {children}
      </div>

      <figcaption
        style={{
          fontSize: "0.85rem",
          color: "#64748b",
          marginTop: "0.6rem",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {caption}
      </figcaption>

      {(source || description || engineeringNote) && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.6 }}>
          {description && <p style={{ margin: "2px 0" }}>{description}</p>}
          {source && <p style={{ margin: "2px 0" }}><strong>Source:</strong> {source}</p>}
          {engineeringNote && (
            <p style={{ margin: "2px 0" }}><strong>Engineering note:</strong> {engineeringNote}</p>
          )}
        </div>
      )}
    </figure>
  );
}

export default SvgFigure;
