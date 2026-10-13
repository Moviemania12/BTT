import Link from "next/link";
import { FIX_ANSWERS, FIX_ANSWER_SLUGS } from "@/content/answers/fix";

// ═══════════════════════════════════════════════════════════════════════════
// components/answers/RelatedAnswers.tsx
//
// Server component. Mirrors components/calculators/RelatedCalculators.tsx:
// shown at the end of an article when one or more Fix answer pages list
// that article's topic slug as their relatedTopicSlug. Purely data-driven —
// no article page.tsx needs editing to pick this up.
// ═══════════════════════════════════════════════════════════════════════════

const wrap: React.CSSProperties = {
  margin: "1.5rem 0 0",
  padding: "1.25rem 1.4rem",
  border: "1px solid #FECACA",
  background: "#FEF2F2",
  borderRadius: "10px",
};
const h2: React.CSSProperties = { fontSize: "1.1rem", fontWeight: 800, color: "#991B1B", margin: "0 0 0.4rem" };
const intro: React.CSSProperties = { fontSize: "0.9rem", lineHeight: 1.6, color: "#7F1D1D", margin: "0 0 0.75rem" };
const li: React.CSSProperties = { fontSize: "0.92rem", lineHeight: 1.6, color: "#1F2937", margin: "0 0 0.4rem" };
const a: React.CSSProperties = { color: "#B91C1C", fontWeight: 700, textDecoration: "none" };

export default function RelatedAnswers({ slug }: { slug: string }) {
  const matches = FIX_ANSWER_SLUGS
    .map((s) => FIX_ANSWERS[s])
    .filter((f) => f.relatedTopicSlug === slug);

  if (matches.length === 0) return null;

  return (
    <aside style={wrap} aria-label="Common problems">
      <h2 style={h2}>Common problems with this</h2>
      <p style={intro}>Hit a real issue? Jump straight to the diagnostic steps.</p>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {matches.map((f) => (
          <li key={f.slug} style={li}>
            <Link href={`/answers/fix/${f.slug}`} style={a}>
              {f.title} →
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
