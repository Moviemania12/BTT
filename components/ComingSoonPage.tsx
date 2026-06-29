/**
 * components/ComingSoonPage.tsx
 *
 * Server Component. Rendered by every dynamic [topic] route when
 * a registered topic has status !== "published".
 *
 * Uses ONLY real topics.ts exports:
 *   Topic (type), getPrevTopic, getNextTopic, getPublishedTopics
 *
 * Does NOT use getTopicBySlug / getNestedTopic / allTopics — those
 * functions do not exist in this project.
 */

import Link from "next/link";
import {
  type Topic,
  getPrevTopic,
  getNextTopic,
  getPublishedTopics,
  getTopicUrl,
  CATEGORY_LABELS,
  TRACK_LABELS,
} from "@/lib/topics";

interface ComingSoonPageProps {
  topic: Topic;
}

export default function ComingSoonPage({ topic }: ComingSoonPageProps) {
  const prev = getPrevTopic(topic.slug);
  const next = getNextTopic(topic.slug);
  const siblings = getPublishedTopics(topic.track, topic.category)
    .filter((t) => t.slug !== topic.slug);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-void)",
        paddingTop: 96,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
          <ol style={{ display: "flex", alignItems: "center", flexWrap: "wrap" as const, gap: 4, listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--color-text-muted)", textDecoration: "none", textTransform: "uppercase" as const }}>
                Home
              </Link>
            </li>
            {topic.breadcrumb.map((crumb, i) => (
              <li key={crumb} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--color-text-muted)", fontSize: 10 }}>›</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: i === topic.breadcrumb.length - 1 ? "var(--color-neon-blue)" : "var(--color-text-muted)", textTransform: "uppercase" as const }}>
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Icon + status badge */}
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.6 }} aria-hidden="true">{topic.icon}</div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 20,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.20em",
              textTransform: "uppercase" as const,
              color: "var(--color-neon-blue)",
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.25)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-neon-blue)", boxShadow: "0 0 5px rgba(0,212,255,0.8)" }} />
            {topic.status === "in-progress" ? "In Progress" : "Coming Soon"}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            letterSpacing: "0.04em",
            color: "var(--color-text-primary)",
            textAlign: "center" as const,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {topic.title.toUpperCase()}
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--color-text-secondary)",
            textAlign: "center" as const,
            maxWidth: 540,
            margin: "0 auto 8px",
          }}
        >
          {topic.description}
        </p>

        {topic.eta && (
          <p style={{ textAlign: "center" as const, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.12em", marginBottom: 40 }}>
            Expected: {topic.eta}
          </p>
        )}

        {/* Learning path position */}
        {(prev || next) && (
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <div style={{ borderTop: "1px solid rgba(0,212,255,0.10)", paddingTop: 24, marginBottom: 16, textAlign: "center" as const }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--color-neon-blue)", fontWeight: 600 }}>
                {TRACK_LABELS[topic.track]} — {CATEGORY_LABELS[topic.category]}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                {prev && (
                  <Link
                    href={getTopicUrl(prev)}
                    style={{
                      display: "block",
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: "rgba(0,212,255,0.03)",
                      border: "1px solid rgba(0,212,255,0.10)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--color-text-muted)", textTransform: "uppercase" as const, marginBottom: 6 }}>← Previous</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
                      <span>{prev.icon}</span>{prev.title}
                    </span>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={getTopicUrl(next)}
                    style={{
                      display: "block",
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: "rgba(0,212,255,0.03)",
                      border: "1px solid rgba(0,212,255,0.10)",
                      textDecoration: "none",
                      textAlign: "right" as const,
                    }}
                  >
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--color-text-muted)", textTransform: "uppercase" as const, marginBottom: 6 }}>Next →</span>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
                      {next.title}<span>{next.icon}</span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Available now in this category */}
        {siblings.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={{ borderTop: "1px solid rgba(0,212,255,0.10)", paddingTop: 24, marginBottom: 16, textAlign: "center" as const }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "var(--color-neon-blue)", fontWeight: 600 }}>
                Available Now in {CATEGORY_LABELS[topic.category]}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={getTopicUrl(s)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 16px",
                    borderRadius: 8,
                    background: "rgba(0,212,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.12)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-text-primary)" }}>{s.title}</span>
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--color-neon-blue)", fontFamily: "var(--font-mono)" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div style={{ textAlign: "center" as const, marginTop: 48 }}>
          <Link
            href="/learn"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--color-neon-blue)",
              textDecoration: "none",
              textTransform: "uppercase" as const,
            }}
          >
            ← Back to All Topics
          </Link>
        </div>
      </div>
    </div>
  );
}
