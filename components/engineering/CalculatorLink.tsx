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
      style={{
        display: "block",
        border: "1.5px solid #bfdbfe",
        borderRadius: "10px",
        padding: "1rem 1.25rem",
        margin: "1rem 0",
        textDecoration: "none",
        background: "#eaf4ff",
        transition: "border-color 0.15s ease",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ fontSize: "1.3rem" }} aria-hidden="true">🧮</span>
        <span>
          <span style={{ display: "block", fontWeight: 700, color: "#0066CC", fontSize: "1rem" }}>
            {calculator.title}
          </span>
          <span style={{ display: "block", color: "#475569", fontSize: "0.9rem", marginTop: "0.2rem" }}>
            {calculator.description}
          </span>
        </span>
        <span style={{ marginLeft: "auto", color: "#0066CC", fontWeight: 700 }} aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

/** Renders a row of CalculatorLink cards for a list of registry entries. */
export function CalculatorLinkList({ calculators }: { calculators: CalculatorRegistryEntry[] }) {
  if (calculators.length === 0) return null;
  return (
    <div style={{ margin: "1.5rem 0" }}>
      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Related Calculators
      </p>
      {calculators.map((calc) => (
        <CalculatorLink key={calc.id} calculator={calc} />
      ))}
    </div>
  );
}

export default CalculatorLink;
