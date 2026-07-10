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

// White-theme (Phase A migration): flat, restrained badge colors —
// no glow/box-shadow, matching the homepage's non-neon design language.
const STATUS_CONFIG: Record<TopicStatus, BadgeConfig> = {
  "coming-soon": {
    label:      "SOON",
    color:      "var(--hp-text-muted)",
    background: "var(--hp-bg-subtle)",
    border:     "var(--hp-border)",
  },
  "in-progress": {
    label:      "IN PROGRESS",
    color:      "#92400e",
    background: "#fffbeb",
    border:     "#fde68a",
  },
  "published": {
    label:      "LIVE",
    color:      "#166534",
    background: "#f0fdf4",
    border:     "#bbf7d0",
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
        
        // Prevent badge from inheriting pointer-events from disabled parent
        pointerEvents:  "none",
        userSelect:     "none",
      }}
    >
      {config.label}
    </span>
  );
}
