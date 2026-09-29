import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildSocialMeta, buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import {
  getTrackSummary,
  getTopicUrl,
  CATEGORY_LABELS,
} from "@/lib/topics";
import TrackExplorer from "@/components/homepage/TrackExplorer";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/it/page.tsx — IT Infrastructure Track Index
//
// Server Component. All categories and topics derived from lib/topics.ts.
// Published topics → clickable hp-chip--published link.
// Unpublished topics → disabled hp-chip--coming-soon span.
// Matches the pattern of app/learn/non-it/page.tsx exactly.
// ═══════════════════════════════════════════════════════════════════════════

const TITLE = "IT Infrastructure — Behind The Tech";
const DESCRIPTION =
  "Learn IT Data Center Infrastructure — Servers, Storage, Networking, Virtualization, and Cloud — from beginner to engineer level.";
const PAGE_URL = "https://behindthetech.in/learn/it";

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  title: TITLE,
  description: DESCRIPTION,
  ...buildSocialMeta({ title: TITLE, description: DESCRIPTION, url: PAGE_URL }),
};

const CATEGORY_ICONS: Record<string, string> = {
  servers:    "🖥️",
  storage:    "💾",
  networking: "🌐",
  cloud:      "☁️",
};

export default function ItTrackPage() {
  const byCategory = getTrackSummary("it");

  const categoryOrder = ["servers", "storage", "networking", "cloud"];

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
    <div data-homepage-theme="light" className="hp-page-root">
      <JsonLd
        data={buildCollectionPageSchema({ name: "IT Infrastructure", description: DESCRIPTION, url: PAGE_URL })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "https://behindthetech.in" },
          { name: "Learn", url: "https://behindthetech.in/learn" },
          { name: "IT Infrastructure", url: PAGE_URL },
        ])}
      />
      {/* ── Hero ── */}
      <section className="hp-section hp-section--hero">
        <div className="hp-container hp-container--medium" style={{ textAlign: "center" }}>
          <p
            className="hp-text-sm hp-text-muted"
            style={{ marginBottom: 12, fontFamily: "var(--hp-font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}
          >
            IT Infrastructure Track
          </p>
          <h1
            className="hp-h2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: 16 }}
          >
            IT Infrastructure
          </h1>
          <p
            className="hp-body"
            style={{ margin: "0 auto 28px" }}
          >
            Servers, Storage, Networking, Virtualization and Cloud — the technology stack that lives inside the data center.
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

                  {publishedCount > 0 && (
                    <p style={{ marginTop: 14 }}>
                      <Link
                        href={`/learn/it/${cat.key}`}
                        style={{
                          fontFamily: "var(--hp-font-mono)",
                          fontSize: 12,
                          letterSpacing: "0.08em",
                          color: "var(--hp-accent)",
                          textDecoration: "none",
                        }}
                      >
                        View all {cat.label} →
                      </Link>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Continue Exploring ── */}
      <TrackExplorer currentTrack="it" />

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
