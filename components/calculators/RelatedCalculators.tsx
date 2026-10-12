import Link from "next/link";
import { CALCULATOR_GUIDES } from "./calculatorGuides";
import { CALCULATOR_META } from "./calculatorMeta";

// ═══════════════════════════════════════════════════════════════════════════
// components/calculators/RelatedCalculators.tsx
//
// Server component. Shown at the end of an article when one or more
// calculators list that article's topic slug in calculatorGuides.ts. It gives
// engineers a direct path from the explanation to the tool, and gives every
// calculator crawlable internal links from the articles it belongs to.
//
// The UPS and battery-bank articles already carry their own calculator
// sections, so they are skipped here to avoid duplicating links.
// ═══════════════════════════════════════════════════════════════════════════

const SKIP_TOPICS = new Set(["ups", "battery-bank"]);

const wrap: React.CSSProperties = {
  margin: "2.5rem 0 0",
  padding: "1.25rem 1.4rem",
  border: "1px solid #BFDBFE",
  background: "#EFF6FF",
  borderRadius: "10px",
};
const h2: React.CSSProperties = { fontSize: "1.1rem", fontWeight: 800, color: "#1E3A8A", margin: "0 0 0.4rem" };
const intro: React.CSSProperties = { fontSize: "0.9rem", lineHeight: 1.6, color: "#1E40AF", margin: "0 0 0.75rem" };
const li: React.CSSProperties = { fontSize: "0.92rem", lineHeight: 1.6, color: "#1F2937", margin: "0 0 0.4rem" };
const a: React.CSSProperties = { color: "#1D4ED8", fontWeight: 700, textDecoration: "none" };

export default function RelatedCalculators({ slug, lang = "en" }: { slug: string; lang?: "en" | "hi" }) {
  if (SKIP_TOPICS.has(slug)) return null;

  const matches = Object.entries(CALCULATOR_GUIDES)
    .filter(([, g]) => g.topics.includes(slug))
    .map(([calcSlug]) => ({ calcSlug, meta: CALCULATOR_META[calcSlug] }))
    .filter((m) => m.meta);

  if (matches.length === 0) return null;

  return (
    <aside aria-labelledby="related-calculators-heading" style={wrap}>
      <h2 id="related-calculators-heading" style={h2}>
        Related Engineering Calculators
      </h2>
      <p style={intro}>
        {lang === "hi"
          ? "Is topic ke numbers khud check karne ke liye ye free calculators use karo (calculators English mein hain)."
          : "Free tools to check the numbers behind this topic."}
      </p>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {matches.map(({ calcSlug, meta }) => (
          <li key={calcSlug} style={li}>
            <Link href={`/tools/${calcSlug}`} style={a}>
              {meta.title}
            </Link>{" "}
            — {meta.description}
          </li>
        ))}
      </ul>
    </aside>
  );
}
