import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/HeroV2.tsx — Homepage V2
//
// Layout, illustration column and responsive behaviour unchanged.
// Changes from previous version:
//   • Updated h1 copy
//   • Updated subtitle copy
//   • Author credibility strip below CTAs (no image — none available)
//   • Dynamic published-count stat line replaces the static "84 topics" text
// ═══════════════════════════════════════════════════════════════════════════

import HeroIllustration from "./HeroIllustration";

export default function HeroV2() {
  const publishedTopicCount = ALL_TOPICS.filter((t) => t.status === "published").length;

  return (
    <section data-homepage-theme="light" aria-labelledby="hero-heading" className="hp-section hp-section--hero-compact">
      <div className="hp-container">
        <div className="hp-hero-grid hp-hero-grid--v2">

          {/* ── Left column ── */}
          <div>
            {/*
              Two-line heading strategy:
              - Each line wrapped in display:block + whiteSpace:nowrap
              - Prevents the browser from reflowing either phrase mid-word
              - clamp max capped at 42px so "Digital World Running." fits
                inside the left column (~520px at 1120px container) at all
                normal desktop widths without overflowing
              - On very narrow screens (<480px) whiteSpace reverts to normal
                via the inline min clamp value so text stays readable
            */}
            <h1
              id="hero-heading"
              className="hp-h1 hp-h1--left"
              style={{
                fontSize: "clamp(26px, 4.5vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: "0 0 12px",
              }}
            >
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                Learn What Keeps the
              </span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                Digital World Running.
              </span>
            </h1>

            <p className="hp-body hp-body--left">
              Practical, engineer-authored guides that explain the infrastructure
              and technology behind the digital world — from power and cooling to
              servers, networks, cloud, and AI.
            </p>

            <nav aria-label="Primary actions" className="hp-cta-row hp-cta-row--left">
              <Link href="/learn" className="hp-btn hp-btn--primary hp-btn--icon">
                <span aria-hidden="true">🎓</span> Start Learning
              </Link>
              <Link href="/learn" className="hp-btn hp-btn--secondary hp-btn--icon">
                <span aria-hidden="true">📖</span> Explore Topics
              </Link>
            </nav>

            {/* ── Author credibility strip ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
                marginBottom: 20,
              }}
            >
              {/* Initials avatar — no photo available in project */}
              <div
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--hp-accent-subtle)",
                  border: "1.5px solid var(--hp-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--hp-font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--hp-accent)",
                  letterSpacing: "0.03em",
                }}
              >
                KA
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--hp-font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--hp-text-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  Written by Kumar Anil
                </div>
                <div
                  style={{
                    fontFamily: "var(--hp-font-body)",
                    fontSize: 12,
                    color: "var(--hp-text-muted)",
                    lineHeight: 1.4,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "0 6px",
                  }}
                >
                  <span>Infrastructure &amp; Data Center Professional</span>
                  <span aria-hidden="true" style={{ color: "var(--hp-border-hover)" }}>·</span>
                  <span>10+ Years of Industry Experience</span>
                  <span aria-hidden="true" style={{ color: "var(--hp-border-hover)" }}>·</span>
                  <Link
                    href="/about/kumar-anil"
                    style={{
                      color: "var(--hp-accent)",
                      textDecoration: "none",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    About →
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Dynamic stats line ── */}
            {publishedTopicCount > 0 && (
              <p className="hp-meta hp-meta--left">
                {publishedTopicCount}+ PRACTICAL TOPICS
                {" · "}ENGINEER-AUTHORED
                {" · "}CONTINUOUSLY UPDATED
              </p>
            )}
          </div>

          {/* ── Right column — illustration, unchanged ── */}
          <div className="hp-hero-illustration-col">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
