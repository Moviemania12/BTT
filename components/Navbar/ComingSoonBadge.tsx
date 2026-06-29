/**
 * components/Navbar/ComingSoonBadge.tsx
 *
 * Reusable status badge for topic publication state.
 * Used across the navbar (mega menu, mobile drawer) and available
 * for reuse on category index pages, learning roadmap, and DC Map.
 *
 * ─── STATUS VARIANTS ──────────────────────────────────────────────────────────
 *
 *   "coming-soon"  — default, neon-blue dim   [SOON]
 *   "in-progress"  — amber                    [IN PROGRESS]
 *   "published"    — neon-green               [LIVE]
 *
 * ─── SIZE VARIANTS ────────────────────────────────────────────────────────────
 *
 *   compact={false} (default)
 *     Pill badge: rounded, padding, uppercase mono text
 *     Used in: MegaMenu column link rows (right-aligned)
 *
 *   compact={true}
 *     Minimal inline tag: tighter padding, same font
 *     Used in: MegaMenu bottom banner, mobile drawer leaf links
 *     (space is too tight for full pill)
 *
 * ─── USAGE ────────────────────────────────────────────────────────────────────
 *
 *   // Default — coming-soon, standard size
 *   <ComingSoonBadge />
 *
 *   // Compact inline — coming-soon
 *   <ComingSoonBadge compact />
 *
 *   // In-progress, standard
 *   <ComingSoonBadge status="in-progress" />
 *
 *   // Published confirmation badge (e.g. category index page)
 *   <ComingSoonBadge status="published" />
 *
 *   // Compact in-progress (mobile drawer)
 *   <ComingSoonBadge status="in-progress" compact />
 *
 * ─── DOES NOT ─────────────────────────────────────────────────────────────────
 *   - Own any state
 *   - Import from topics.ts (status is passed as a prop by the consumer)
 *   - Render anything for published status when compact (returns null)
 */

import type { TopicStatus } from "@/lib/topics";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ComingSoonBadgeProps {
  /**
   * Topic publication status.
   * Defaults to "coming-soon" so callers can write <ComingSoonBadge />
   * without specifying status (the most common case).
   */
  status?: TopicStatus;

  /**
   * Compact mode — smaller padding, same font.
   * Use in tight spaces: bottom banners, mobile leaf links.
   */
  compact?: boolean;
}

// ─── Status config ────────────────────────────────────────────────────────────

interface BadgeConfig {
  label: string;
  color: string;           // text color (CSS var or rgba)
  background: string;      // background (CSS var or rgba)
  border: string;          // border color (CSS var or rgba)
  glow?: string;           // optional box-shadow glow
}

const STATUS_CONFIG: Record<TopicStatus, BadgeConfig> = {
  "coming-soon": {
    label:      "SOON",
    color:      "var(--color-neon-blue)",
    background: "rgba(0,212,255,0.06)",
    border:     "rgba(0,212,255,0.20)",
  },
  "in-progress": {
    label:      "IN PROGRESS",
    color:      "rgba(255,180,0,1)",
    background: "rgba(255,180,0,0.07)",
    border:     "rgba(255,180,0,0.25)",
    glow:       "0 0 6px rgba(255,180,0,0.20)",
  },
  "published": {
    label:      "LIVE",
    color:      "rgba(0,220,100,1)",
    background: "rgba(0,220,100,0.07)",
    border:     "rgba(0,220,100,0.25)",
    glow:       "0 0 6px rgba(0,220,100,0.20)",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComingSoonBadge({
  status = "coming-soon",
  compact = false,
}: ComingSoonBadgeProps) {
  const config = STATUS_CONFIG[status];

  // "published" badge in compact mode adds no value in tight nav spaces —
  // the link itself being clickable already signals availability.
  // Return null to avoid visual noise in the mobile drawer.
  if (status === "published" && compact) {
    return null;
  }

  return (
    <span
      aria-label={
        status === "coming-soon"  ? "Coming soon"   :
        status === "in-progress"  ? "In progress"   :
                                    "Published"
      }
      role="img"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        flexShrink:     0,

        // Size variant
        padding:        compact ? "1px 5px" : "2px 7px",
        borderRadius:   compact ? 3 : 4,

        // Typography
        fontFamily:     "var(--font-mono)",
        fontSize:       compact ? 7 : 8,
        fontWeight:     600,
        letterSpacing:  "0.18em",
        lineHeight:     1.4,
        textTransform:  "uppercase",
        whiteSpace:     "nowrap",

        // Status colors — all from config, no hardcoded values
        color:          config.color,
        background:     config.background,
        border:         `1px solid ${config.border}`,
        boxShadow:      config.glow ?? "none",

        // Prevent badge from inheriting pointer-events from disabled parent
        pointerEvents:  "none",
        userSelect:     "none",
      }}
    >
      {config.label}
    </span>
  );
}
