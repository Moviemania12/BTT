"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CalculatorLink.tsx
//
// The article-side UI for referencing a calculator. Renders a link CARD to
// the calculator's standalone /tools/<slug> page — articles use this
// instead of embedding the calculator component inline. This is the
// concrete fix for "Do not embed calculator implementations inside article
// pages": the article imports this lightweight link component, never the
// stateful calculator itself.
// ═══════════════════════════════════════════════════════════════════════════

import Link from "next/link";
import type { CalculatorRegistryEntry } from "@/types/engineering/registry";

export interface CalculatorLinkProps {
  calculator: CalculatorRegistryEntry;
}

export function CalculatorLink({ calculator }: CalculatorLinkProps) {
  return (
    <Link
      href={calculator.route}
      className="btt-calc-link-card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "1.1rem 1.4rem",
        margin: "1rem 0",
        textDecoration: "none",
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(15,23,42,.06)",
        transition: "border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "10px",
          background: "#EFF6FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        🧮
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#111827", fontSize: "1.02rem" }}>
          {calculator.title}
        </p>
        <p style={{ margin: 0, marginTop: "0.15rem", color: "#374151", fontSize: "0.88rem", lineHeight: 1.5 }}>
          {calculator.description}
        </p>
      </div>
      <span style={{ color: "#2563EB", fontWeight: 700, fontSize: "1.2rem", flexShrink: 0 }} aria-hidden="true">→</span>
      <style>{`
        .btt-calc-link-card:hover {
          border-color: #2563EB;
          box-shadow: 0 12px 40px rgba(37,99,235,.12);
          transform: translateY(-2px);
        }
      `}</style>
    </Link>
  );
}

/** Renders a row of CalculatorLink cards for a list of registry entries. */
export function CalculatorLinkList({ calculators }: { calculators: CalculatorRegistryEntry[] }) {
  if (calculators.length === 0) return null;
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6B7280", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Related Calculators
      </p>
      {calculators.map((calc) => (
        <CalculatorLink key={calc.id} calculator={calc} />
      ))}
    </div>
  );
}

export default CalculatorLink;
