"use client";

/**
 * components/TopicLink.tsx
 *
 * Resolves a topic slug → href via topics.ts and renders a styled link.
 * Every article cross-reference must use this component.
 * URL changes require only updating topics.ts — never hunt through JSX.
 *
 * Usage:
 *   <TopicLink slug="ups" />
 *   <TopicLink slug="ups" label="UPS Systems" />
 *   <TopicLink slug="ups" variant="inline" />
 *   <TopicLink slug="ups" variant="card" />
 *   <TopicLink slug="ups" variant="pill" />
 */

import Link from "next/link";
import { TOPICS, getTopicUrl } from "@/lib/topics";

// ─── Props ────────────────────────────────────────────────────────────────────

interface TopicLinkProps {
  /** Must match a key in TOPICS exactly */
  slug: string;

  /** Override display label. Defaults to topic.title */
  label?: string;

  /**
   * inline  — text link with arrow, used within article body
   * card    — bordered card, used in Related Topics grid
   * pill    — compact badge pill, used in tags/metadata rows
   */
  variant?: "inline" | "card" | "pill";

  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TopicLink({
  slug,
  label,
  variant = "inline",
  className,
}: TopicLinkProps) {
  const topic = TOPICS[slug];

  // Graceful fallback — never breaks the page for an unrecognised slug
  if (!topic) {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.warn(`[TopicLink] Unknown slug: "${slug}". Add it to lib/topics.ts.`);
    }
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-muted)",
          opacity: 0.5,
        }}
      >
        {label ?? slug}
      </span>
    );
  }

  const href        = getTopicUrl(topic);
  const displayLabel = label ?? topic.title;
  const isComingSoon = topic.status !== "published";

  // ── Inline variant ─────────────────────────────────────────────────────────
  // Used inside article body: "➡ Learn More: UPS Systems"

  if (variant === "inline") {
    if (isComingSoon) {
      return (
        <span
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-text-muted)",
            opacity: 0.55,
            cursor: "default",
          }}
          title="Coming Soon"
        >
          <span style={{ color: "var(--color-neon-blue)", opacity: 0.4 }}>➡</span>
          {displayLabel}
          <span
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.18em",
              color: "var(--color-neon-blue)",
              opacity: 0.45,
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 3,
              padding: "1px 5px",
            }}
          >
            SOON
          </span>
        </span>
      );
    }

    return (
      <Link
        href={href}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--color-neon-blue)",
          textDecoration: "none",
          transition: "opacity 0.15s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        <span aria-hidden="true">➡</span>
        {displayLabel}
      </Link>
    );
  }

  // ── Card variant ───────────────────────────────────────────────────────────
  // Used in Related Topics grid — bordered card with icon, title, status

  if (variant === "card") {
    if (isComingSoon) {
      return (
        <div
          className={className}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 8,
            background: "rgba(0,212,255,0.02)",
            border: "1px solid rgba(0,212,255,0.08)",
            opacity: 0.45,
            cursor: "default",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>{topic.icon}</span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayLabel}
            </div>
            <div
              style={{
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.16em",
                color: "var(--color-neon-blue)",
                opacity: 0.5,
                marginTop: 2,
              }}
            >
              COMING SOON
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        href={href}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderRadius: 8,
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.12)",
          textDecoration: "none",
          transition: "background 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,212,255,0.07)";
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.28)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,212,255,0.03)";
          e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>{topic.icon}</span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 12,
              fontFamily: "var(--font-body)",
              color: "var(--color-text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayLabel}
          </div>
          <div
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.16em",
              color: "var(--color-text-muted)",
              marginTop: 2,
            }}
          >
            {topic.breadcrumb.slice(0, -1).join(" › ")}
          </div>
        </div>
        <span
          aria-hidden="true"
          style={{
            marginLeft: "auto",
            fontSize: 10,
            color: "var(--color-neon-blue)",
            fontFamily: "var(--font-mono)",
            flexShrink: 0,
          }}
        >
          →
        </span>
      </Link>
    );
  }

  // ── Pill variant ───────────────────────────────────────────────────────────
  // Compact badge used in metadata rows

  if (isComingSoon) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.10em",
          color: "var(--color-text-muted)",
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.08)",
          opacity: 0.5,
          cursor: "default",
        }}
      >
        {topic.icon} {displayLabel}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.10em",
        color: "var(--color-neon-blue)",
        background: "rgba(0,212,255,0.05)",
        border: "1px solid rgba(0,212,255,0.18)",
        textDecoration: "none",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0,212,255,0.10)";
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0,212,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.18)";
      }}
    >
      {topic.icon} {displayLabel}
    </Link>
  );
}
