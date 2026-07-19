import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TOPICS, getTopicUrl } from "@/lib/topics";
import type { Topic } from "@/lib/topics";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Infrastructure — Learning Track | Behind The Tech",
  description:
    "Master the infrastructure powering AI — Fundamentals, Hardware, AI Data Centers, Platforms and Operations. From AI basics to GPU clusters and MLOps.",
  keywords: [
    "AI infrastructure",
    "GPU cluster",
    "machine learning infrastructure",
    "AI data center",
    "MLOps",
    "learn AI",
    "Behind The Tech",
  ],
  openGraph: {
    title: "AI Infrastructure Learning Track | Behind The Tech",
    description: "Master AI Fundamentals, Hardware, Data Centers, Platforms and Operations.",
    url: "https://behindthetech.in/learn/ai",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infrastructure Track — Behind The Tech",
    description: "AI Fundamentals, Hardware, Data Centers, Platforms and Operations — complete learning track.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/ai" },
};

// ─── Category definitions ─────────────────────────────────────────────────────

interface CategoryDef {
  key: string;
  label: string;
  icon: string;
  accentColor: string;
  accentBg: string;
  description: string;
}

const CATEGORY_DEFS: CategoryDef[] = [
  {
    key: "fundamentals",
    label: "AI Fundamentals",
    icon: "🧠",
    accentColor: "#7c3aed",
    accentBg: "#faf5ff",
    description: "The conceptual foundation — what AI is, how machine learning works, deep learning principles, generative AI and large language models.",
  },
  {
    key: "hardware",
    label: "AI Hardware",
    icon: "⚙️",
    accentColor: "#155eef",
    accentBg: "#eff6ff",
    description: "The silicon behind intelligence — GPUs, TPUs, AI accelerators and the architectures from NVIDIA and AMD that power training and inference.",
  },
  {
    key: "data-centers",
    label: "AI Data Centers",
    icon: "🏢",
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
    description: "Purpose-built infrastructure for AI workloads — GPU clusters, high-bandwidth networking, AI-optimised storage and liquid cooling at scale.",
  },
  {
    key: "platforms",
    label: "AI Platforms",
    icon: "🤖",
    accentColor: "#dc2626",
    accentBg: "#fef2f2",
    description: "The major AI platforms shaping the industry — OpenAI, Anthropic, Google Gemini, Meta AI and Mistral.",
  },
  {
    key: "operations",
    label: "AI Operations",
    icon: "🔧",
    accentColor: "#059669",
    accentBg: "#f0fdf4",
    description: "Running AI in production — MLOps pipelines, AI monitoring, security considerations and governance frameworks.",
  },
];

// ─── Data helpers ─────────────────────────────────────────────────────────────
// Source of truth: ALL_TOPICS registry (lib/topics.ts).
// topic.status === "published" → clickable link.
// Any other status            → Coming Soon badge, non-clickable.
// Future: flip status in topics.ts → page auto-updates, no edits needed here.

function getAiTopicsByCategory(category: string): Topic[] {
  return ALL_TOPICS
    .filter((t) => t.track === "ai" && t.category === category)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

function getAiStats() {
  const all = ALL_TOPICS.filter((t) => t.track === "ai");
  const published = all.filter((t) => t.status === "published");
  return { total: all.length, published: published.length };
}

// ─── Topic row — Server Component safe, no event handlers ────────────────────

function TopicRow({ topic }: { topic: Topic }) {
  const isPublished = topic.status === "published";

  if (!isPublished) {
    return (
      <div className="nit-topic-row--soon">
        <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span aria-hidden="true" style={{ fontSize: 15, flexShrink: 0 }}>{topic.icon}</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {topic.title}
          </span>
        </span>
        <span className="nit-soon-badge">Soon</span>
      </div>
    );
  }

  return (
    <Link
      href={getTopicUrl(topic)}
      className="nit-topic-row"
      style={{ "--nit-accent": "#7c3aed" } as React.CSSProperties}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span aria-hidden="true" style={{ fontSize: 15, flexShrink: 0 }}>{topic.icon}</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {topic.title}
        </span>
      </span>
      <span aria-hidden="true" className="nit-topic-arrow">→</span>
    </Link>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

function CategoryCard({ def }: { def: CategoryDef }) {
  const topics = getAiTopicsByCategory(def.key);
  if (topics.length === 0) return null;
  const publishedCount = topics.filter((t) => t.status === "published").length;

  return (
    // id="cat-{key}" is the scroll-target for "View all" links.
    <div
      id={`cat-${def.key}`}
      className="nit-category-card"
      style={{
        background: "var(--hp-surface)",
        border: "1px solid var(--hp-border)",
        borderRadius: 14,
        padding: "24px 20px 20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 3px rgba(16,24,40,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 9,
            background: def.accentBg,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {def.icon}
        </span>
        <div>
          <h2
            style={{
              fontFamily: "var(--hp-font-heading)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--hp-text-primary)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {def.label}
          </h2>
          <span
            style={{
              fontSize: 11,
              color: def.accentColor,
              fontFamily: "var(--hp-font-mono)",
              letterSpacing: "0.04em",
              opacity: 0.8,
            }}
          >
            {publishedCount === topics.length
              ? `${publishedCount} topics`
              : `${publishedCount} published · ${topics.length - publishedCount} coming soon`}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "var(--hp-text-muted)",
          lineHeight: 1.55,
          margin: "0 0 14px 0",
          fontFamily: "var(--hp-font-body)",
        }}
      >
        {def.description}
      </p>

      {/* Accent rule */}
      <div style={{ height: 1, background: def.accentBg, marginBottom: 10, borderRadius: 1 }} />

      {/* Topic rows */}
      <nav aria-label={`${def.label} topics`}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 1 }}>
          {topics.map((topic) => (
            <li key={topic.slug}>
              <TopicRow topic={topic} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ─── Journey step ─────────────────────────────────────────────────────────────

function JourneyStep({ def, index, isLast }: { def: CategoryDef; index: number; isLast: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, flex: isLast ? "0 0 auto" : "1 1 0" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: def.accentBg,
            border: `2px solid ${def.accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
          aria-hidden="true"
        >
          {def.icon}
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: def.accentColor, fontFamily: "var(--hp-font-mono)", letterSpacing: "0.04em", textAlign: "center", whiteSpace: "nowrap" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-primary)", fontFamily: "var(--hp-font-body)", textAlign: "center", whiteSpace: "nowrap" }}>
          {def.label}
        </span>
      </div>

      {!isLast && (
        <div aria-hidden="true" style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 8px", marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: "var(--hp-border)" }} />
          <span style={{ fontSize: 12, color: "var(--hp-text-muted)", fontFamily: "var(--hp-font-mono)", padding: "0 2px" }}>→</span>
          <div style={{ flex: 1, height: 1, background: "var(--hp-border)" }} />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AiTrackPage() {
  const { total, published } = getAiStats();

  const firstTopic = ALL_TOPICS
    .filter((t) => t.track === "ai" && t.category === "fundamentals" && t.status === "published")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))[0];

  return (
    <main data-homepage-theme="light" style={{ background: "var(--hp-bg)", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        className="hp-section"
        aria-labelledby="ai-hero-heading"
        style={{ background: "var(--hp-bg)", borderBottom: "1px solid var(--hp-border)", padding: "64px 24px 56px" }}
      >
        <div className="hp-container">
          <p style={{ fontFamily: "var(--hp-font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--hp-accent)", fontWeight: 600, marginBottom: 16 }}>
            🤖 Learning Track
          </p>

          <h1
            id="ai-hero-heading"
            style={{ fontFamily: "var(--hp-font-heading)", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "var(--hp-text-primary)", letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 16px 0", maxWidth: 640 }}
          >
            AI Infrastructure
          </h1>

          <p style={{ fontFamily: "var(--hp-font-body)", fontSize: "clamp(15px, 2.5vw, 18px)", color: "var(--hp-text-secondary)", lineHeight: 1.65, margin: "0 0 32px 0", maxWidth: 560 }}>
            Understand the hardware, software and operational systems that power modern
            artificial intelligence — from fundamentals to production-scale deployment.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { value: `${published}`, label: "Topics Published" },
                { value: `${total - published > 0 ? total - published : ""}`, label: total - published > 0 ? "Coming Soon" : undefined },
                { value: "5", label: "Categories" },
                { value: "Basics → Production", label: "Progression" },
              ].filter((s) => s.label).map((stat) => (
                <div
                  key={stat.label}
                  style={{ display: "flex", alignItems: "baseline", gap: 6, background: "var(--hp-bg-subtle)", border: "1px solid var(--hp-border)", borderRadius: 8, padding: "7px 14px" }}
                >
                  <span style={{ fontFamily: "var(--hp-font-mono)", fontSize: 14, fontWeight: 700, color: "var(--hp-accent)" }}>{stat.value}</span>
                  <span style={{ fontFamily: "var(--hp-font-body)", fontSize: 12, color: "var(--hp-text-muted)" }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {firstTopic && (
              <Link href={getTopicUrl(firstTopic)} className="hp-btn hp-btn--primary" style={{ flexShrink: 0, fontSize: 14, padding: "10px 20px", borderRadius: 9 }}>
                Start Learning →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="hp-section hp-section--subtle" style={{ padding: "52px 24px 0" }}>
        <div className="hp-container">
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "var(--hp-font-mono)", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--hp-text-muted)", fontWeight: 600, marginBottom: 8 }}>
              Your Learning Roadmap
            </p>
            <h2 style={{ fontFamily: "var(--hp-font-heading)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: "var(--hp-text-primary)", letterSpacing: "-0.01em", margin: 0 }}>
              Browse topics by category
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, paddingBottom: 52 }}>
            {CATEGORY_DEFS.map((def) => (
              <CategoryCard key={def.key} def={def} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="hp-section" aria-labelledby="ai-journey-heading" style={{ background: "var(--hp-bg)", borderTop: "1px solid var(--hp-border)", padding: "52px 24px 64px" }}>
        <div className="hp-container">
          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <p style={{ fontFamily: "var(--hp-font-mono)", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--hp-text-muted)", fontWeight: 600, marginBottom: 8 }}>
              Suggested Progression
            </p>
            <h2 id="ai-journey-heading" style={{ fontFamily: "var(--hp-font-heading)", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, color: "var(--hp-text-primary)", letterSpacing: "-0.01em", margin: "0 0 8px 0" }}>
              The AI Infrastructure Learning Journey
            </h2>
            <p style={{ fontSize: 14, color: "var(--hp-text-muted)", fontFamily: "var(--hp-font-body)", margin: 0 }}>
              Build AI knowledge from the ground up — concepts, silicon, infrastructure, platforms and operations.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
            {CATEGORY_DEFS.map((def, i) => (
              <JourneyStep key={def.key} def={def} index={i} isLast={i === CATEGORY_DEFS.length - 1} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ fontSize: 13, color: "var(--hp-text-muted)", margin: "0 0 16px" }}>Ready to go deeper?</p>
            {firstTopic && (
              <Link href={getTopicUrl(firstTopic)} className="hp-btn hp-btn--secondary" style={{ fontSize: 14, padding: "10px 22px", borderRadius: 9 }}>
                Begin with {firstTopic.title} →
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
