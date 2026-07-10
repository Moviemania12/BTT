"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/Callout.tsx
//
// Shared callout box — used by every article (UPS, Battery Bank, Transformer,
// DG Set, PDU, STS, RMU, HT Yard, Chiller, BMS, DCIM, Fire, etc.)
//
// Replaces the per-article `function Callout(...)` that was duplicated in
// the UPS article's shared.tsx. Behavior and visual output are identical —
// only the location and color-source have changed (now reads from
// lib/engineering/colors.ts instead of inline hex).
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";
import { CALLOUT_COLORS, type CalloutType } from "@/lib/engineering/core/colors";

export interface CalloutProps {
  type: CalloutType;
  title: string;
  children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const s = CALLOUT_COLORS[type];
  return (
    <div
      role="note"
      aria-label={`${type.replace("-", " ")}: ${title}`}
      style={{
        background: s.bg,
        borderLeft: `4px solid ${s.border}`,
        borderRadius: "8px",
        padding: "1.1rem 1.3rem",
        margin: "1.5rem 0",
      }}
    >
      <p style={{ fontWeight: 700, color: s.titleColor, marginBottom: "0.4rem", fontSize: "0.95rem" }}>
        <span aria-hidden="true">{s.icon}</span> {title}
      </p>
      <div style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "#374151" }}>{children}</div>
    </div>
  );
}

export default Callout;
