import Link from "next/link";
import type { Metadata } from "next";
import {
  getTrackSummary,
  getTopicUrl,
  CATEGORY_LABELS,
} from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/ai/page.tsx — AI Infrastructure Track Index
//
// Server Component. Renders all AI categories and their topics derived
// entirely from lib/topics.ts — no hardcoded slugs, titles, or counts.
//
// Published topics → clickable hp-chip--published link.
// Unpublished topics → disabled hp-chip--coming-soon span.
//
// Uses the same CSS classes and data pattern as PopularTopics so the
// design stays consistent with the rest of the homepage.
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "AI Infrastructure — Behind The Tech",
  description:
    "Learn AI Infrastructure from scratch — GPU clusters, LLMs, Tensor Cores, HBM, NVLink, AI Data Centers, and the hardware powering the AI revolution.",
};

// Category display config — icon only; label comes from CATEGORY_LABELS.
// Order matches AiCategory type declaration in lib/topics.ts.
const CATEGORY_ICONS: Record<string, string> = {
  fundamentals:   "🧠",
  hardware:       "⚙️",
  "data-centers": "🏢",
  platforms:      "🤖",
  operations:     "🛠️",
};

export default function AiTrackPage() {
  const byCategory = getTrackSummary("ai");

  // Preserve the canonical category order from AiCategory type.
  const categoryOrder = [
    "fundamentals",
    "hardware",
    "data-centers",
    "platforms",
    "operations",
  ];

  const categories = categoryOrder
    .filter((cat) => (byCategory[cat]?.length ?? 0) > 0)
    .map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat,
      icon: CATEGORY_ICONS[cat] ?? "📚",
      topics: byCategory[cat],
    }));

  const totalPublished = Object.values(byCategory)
    .flat()
    .filter((t) => t.status === "published").length;

  const totalTopics = Object.values(byCategory).flat().length;

  return (
    <div data-homepage-theme="light">
      {/* ── Hero ── */}
      <section className="hp-section hp-section--hero">
        <div className="hp-container hp-container--medium" style={{ textAlign: "center" }}>
          <p
            className="hp-text-sm hp-text-muted"
            style={{ marginBottom: 12, fontFamily: "var(--hp-font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}
          >
            AI Infrastructure Track
          </p>
          <h1
            className="hp-h2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: 16 }}
          >
            AI Infrastructure
          </h1>
          <p
            className="hp-body"
            style={{ margin: "0 auto 28px" }}
          >
            GPU clusters, Large Language Models, Tensor Cores, HBM, NVLink, and the hardware powering the AI revolution — from beginner to engineer level.
          </p>
          <p
            className="hp-text-sm hp-text-muted"
            style={{ fontFamily: "var(--hp-font-mono)", fontSize: 12 }}
          >
            {totalPublished} of {totalTopics} topics published
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="hp-section hp-section--subtle">
        <div className="hp-container">
          <div className="hp-grid hp-grid--wide">
            {categories.map((cat) => {
              const publishedCount = cat.topics.filter(
                (t) => t.status === "published"
              ).length;

              return (
                <div
                  key={cat.key}
                  className="hp-category-card hp-category-card--v2"
                >
                  <div className="hp-category-header">
                    <span aria-hidden="true" className="hp-category-icon">
                      {cat.icon}
                    </span>
                    <h2 className="hp-category-title">{cat.label}</h2>
                  </div>

                  <p className="hp-category-desc">
                    {publishedCount} of {cat.topics.length} topics published
                  </p>

                  <ul
                    className="hp-chip-row"
                    aria-label={`${cat.label} topics`}
                  >
                    {cat.topics.map((topic) =>
                      topic.status === "published" ? (
                        <li key={topic.slug}>
                          <Link
                            href={getTopicUrl(topic)}
                            className="hp-chip hp-chip--published"
                          >
                            {topic.icon && (
                              <span aria-hidden="true" style={{ marginRight: 5 }}>
                                {topic.icon}
                              </span>
                            )}
                            {topic.title}
                          </Link>
                        </li>
                      ) : (
                        <li key={topic.slug}>
                          <span
                            className="hp-chip hp-chip--coming-soon"
                            aria-label={`${topic.title} — coming soon`}
                          >
                            {topic.title}
                          </span>
                        </li>
                      )
                    )}
                  </ul>


                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Back link ── */}
      <section className="hp-section">
        <div className="hp-container" style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--hp-font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--hp-accent)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
