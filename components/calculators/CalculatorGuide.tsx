import Link from "next/link";
import { TOPICS, getTopicUrl } from "@/lib/topics";
import { CALCULATOR_GUIDES } from "./calculatorGuides";

// ═══════════════════════════════════════════════════════════════════════════
// components/calculators/CalculatorGuide.tsx
//
// Server component. Renders the plain-English explanation for a calculator
// (purpose, inputs, formula, worked example, further reading) from
// calculatorGuides.ts. Text only — it never touches calculator logic.
// ═══════════════════════════════════════════════════════════════════════════

const h2: React.CSSProperties = { fontSize: "1.25rem", fontWeight: 800, color: "#111827", margin: "0 0 0.75rem" };
const h3: React.CSSProperties = { fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "1.5rem 0 0.5rem" };
const p: React.CSSProperties = { fontSize: "0.95rem", lineHeight: 1.7, color: "#374151", margin: "0 0 0.75rem" };
const link: React.CSSProperties = { color: "#2563EB", textDecoration: "none", fontWeight: 600 };

export default function CalculatorGuide({ slug }: { slug: string }) {
  const g = CALCULATOR_GUIDES[slug];
  if (!g) return null;

  const topics = g.topics
    .map((s) => TOPICS[s])
    .filter((t) => t && t.status === "published");

  return (
    <section
      aria-labelledby="calc-guide-heading"
      style={{ borderTop: "1px solid #E5E7EB", marginTop: "3rem", paddingTop: "2rem" }}
    >
      <h2 id="calc-guide-heading" style={h2}>
        About this calculator
      </h2>
      <p style={p}>{g.purpose}</p>

      <h3 style={h3}>Inputs</h3>
      <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.25rem" }}>
        {g.inputs.map((i) => (
          <li key={i.name} style={{ ...p, margin: "0 0 0.4rem" }}>
            <strong style={{ color: "#111827" }}>{i.name}:</strong> {i.meaning}
          </li>
        ))}
      </ul>

      <h3 style={h3}>Formula</h3>
      {g.formula.map((f) => (
        <p
          key={f}
          style={{
            ...p,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.88rem",
            background: "#F8FAFC",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            padding: "0.6rem 0.8rem",
            margin: "0 0 0.5rem",
          }}
        >
          {f}
        </p>
      ))}

      <h3 style={h3}>Worked example</h3>
      <p style={p}>{g.example}</p>

      <h3 style={h3}>How to use the result</h3>
      <p style={p}>{g.note}</p>

      {(topics.length > 0 || g.alsoTry.length > 0) && (
        <>
          <h3 style={h3}>Related reading and tools</h3>
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            {topics.map((t) => (
              <li key={t.slug} style={{ ...p, margin: "0 0 0.3rem" }}>
                <Link href={getTopicUrl(t)} style={link}>
                  {t.title}
                </Link>{" "}
                — article
              </li>
            ))}
            {g.alsoTry.map((a) => (
              <li key={a.href} style={{ ...p, margin: "0 0 0.3rem" }}>
                <Link href={a.href} style={link}>
                  {a.label}
                </Link>{" "}
                — calculator
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
