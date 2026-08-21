import type { Metadata } from "next";
import Link from "next/link";
import { getTopicsByCategory, getTopicUrl } from "@/lib/topics";

export const metadata: Metadata = {
  title: "AI Platforms — Behind The Tech",
  description: "OpenAI, Anthropic, Google Gemini, Meta AI — frontier AI platforms ka infrastructure guide.",
};

export default function CategoryPage() {
  const topics = getTopicsByCategory("ai", "platforms");
  const published = topics.filter((t) => t.status === "published");
  const coming    = topics.filter((t) => t.status !== "published");

  return (
    <div data-homepage-theme="light" className="hp-page-root">
      <section className="hp-section hp-section--hero">
        <div className="hp-container hp-container--medium" style={{ textAlign: "center" }}>
          <p
            className="hp-text-sm hp-text-muted"
            style={{ marginBottom: 12, fontFamily: "var(--hp-font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}
          >
            <Link href="/learn" style={{ color: "var(--hp-accent)", textDecoration: "none" }}>Learn</Link>
            {" / "}
            <Link href="/learn/ai" style={{ color: "var(--hp-accent)", textDecoration: "none" }}>
              AI Infrastructure
            </Link>
          </p>
          <h1
            className="hp-h2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: 16 }}
          >
            🤖 AI Platforms
          </h1>
          <p className="hp-body" style={{ margin: "0 auto 20px" }}>
            OpenAI, Anthropic, Google Gemini, Meta AI — frontier AI platforms ka infrastructure guide.
          </p>
        </div>
      </section>

      {published.length > 0 && (
        <section className="hp-section hp-section--subtle">
          <div className="hp-container">
            <h2
              className="hp-h3"
              style={{ marginBottom: 16 }}
            >
              Available Now
            </h2>
            <ul className="hp-chip-row" style={{ marginBottom: 0 }}>
              {published.map((t) => (
                <li key={t.slug}>
                  <Link href={getTopicUrl(t)} className="hp-chip hp-chip--published">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {coming.length > 0 && (
        <section className="hp-section">
          <div className="hp-container">
            <h2
              className="hp-h3"
              style={{ marginBottom: 16 }}
            >
              Coming Soon
            </h2>
            <ul className="hp-chip-row">
              {coming.map((t) => (
                <li key={t.slug}>
                  <span className="hp-chip hp-chip--coming-soon">
                    {t.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="hp-section">
        <div className="hp-container" style={{ textAlign: "center" }}>
          <Link
            href="/learn/ai"
            style={{
              fontFamily: "var(--hp-font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--hp-accent)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            ← Back to AI Infrastructure
          </Link>
        </div>
      </section>
    </div>
  );
}
