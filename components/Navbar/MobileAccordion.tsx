"use client";

/**
 * components/Navbar/MobileAccordion.tsx
 *
 * Reusable accordion primitives for the BTT mobile navigation system.
 * Extracted from MobileDrawer so they can be imported cleanly and
 * reused across the platform (sidebar, FAQ, article TOC, etc.).
 *
 * ─── EXPORTS ──────────────────────────────────────────────────────────────────
 *
 *   <AccordionItem />    — single accordion row with trigger + collapsible panel
 *   <LeafLink />         — deepest-level nav link (topic item, no children)
 *   isComingSoon()       — helper: checks topic status from TOPICS registry
 *
 * ─── ACCORDION BEHAVIOUR ──────────────────────────────────────────────────────
 *
 *   · Self-contained open/close state (useState inside AccordionItem)
 *   · Controlled mode: pass isOpen + onToggle to override internal state
 *     (used by MobileDrawer L1 level for single-open enforcement)
 *   · Uncontrolled mode: omit isOpen/onToggle → manages its own state
 *     (used by L2 sections where multiple can be open simultaneously)
 *   · Transition: CSS max-height 0 ↔ maxHeightOpen
 *     No JS height measurement. maxHeightOpen defaults are generous
 *     (800px for L2, 2000px for L1) — overshoot has no visual effect.
 *   · Chevron rotates 180° when open
 *
 * ─── DEPTH SYSTEM ─────────────────────────────────────────────────────────────
 *
 *   depth=0  L1 trigger: 20px left padding, 15px font, bold chevron
 *   depth=1  L2 trigger: 30px left padding, 13px font, muted chevron
 *   depth=2  L3 leaf:    44px left padding (16 + 2*14), 13px font
 *
 *   paddingLeft for leaf: 16 + (depth * 14)
 *   This creates a consistent visual indent hierarchy.
 *
 * ─── COMING SOON ──────────────────────────────────────────────────────────────
 *
 *   isComingSoon(id) looks up TOPICS[id]?.status.
 *   Returns false for any id not in TOPICS (static pages are always live).
 *   LeafLink uses this to render a non-interactive span + <ComingSoonBadge />
 *   instead of a clickable <Link>.
 *
 * ─── USAGE IN MobileDrawer ────────────────────────────────────────────────────
 *
 *   // L1 — controlled (single-open enforced by parent)
 *   <AccordionItem
 *     id="non-it"
 *     label="Non-IT Infrastructure"
 *     icon="🏭"
 *     depth={0}
 *     isOpen={openL1Id === "non-it"}
 *     onToggle={() => handleL1Toggle("non-it")}
 *     maxHeightOpen="2000px"
 *   >
 *     // L2 — uncontrolled (manages own state)
 *     <AccordionItem id="electrical" label="Electrical" icon="⚡" depth={1}>
 *       <LeafLink id="ups" label="UPS" icon="🔋" href="/learn/non-it/electrical/ups" onClose={onClose} />
 *       <LeafLink id="dg-set" label="DG Set" icon="🛢️" href="/learn/non-it/electrical/dg-set" onClose={onClose} />
 *     </AccordionItem>
 *   </AccordionItem>
 *
 * ─── DOES NOT ─────────────────────────────────────────────────────────────────
 *   - Import from MegaMenu.tsx or NavItem.tsx
 *   - Know anything about the desktop navbar
 *   - Contain drawer chrome (header, overlay, CTA footer)
 */

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { TOPICS } from "@/lib/topics";
import ComingSoonBadge from "./ComingSoonBadge";

// ─── Coming-soon helper ───────────────────────────────────────────────────────

/**
 * Returns true if the topic with the given slug is not yet published.
 * Returns false for any id not in the TOPICS registry (static pages).
 *
 * Exported so MobileDrawer (and any future consumer) can use it directly
 * without re-importing from topics.ts.
 */
export function isComingSoon(id: string): boolean {
  const topic = TOPICS[id];
  if (!topic) return false;
  return topic.status !== "published";
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  /** Unique id — used as React key and for controlled mode matching */
  id: string;

  /** Display label */
  label: string;

  /** Emoji icon shown left of label */
  icon: string;

  /**
   * Nesting depth.
   *   0 = L1 (top-level section trigger in MobileDrawer)
   *   1 = L2 (sub-category trigger)
   * Controls padding, font size, and chevron size.
   */
  depth?: 0 | 1;

  /**
   * CONTROLLED MODE — pass both isOpen + onToggle to control from parent.
   * Used by MobileDrawer L1 to enforce single-open rule.
   */
  isOpen?: boolean;
  onToggle?: () => void;

  /**
   * Max-height of the open panel.
   * Default: "800px"  for depth=1 (L2)
   * Default: "2000px" for depth=0 (L1)
   * Override if content is unusually tall or short.
   */
  maxHeightOpen?: string;

  /** Whether this section's route is currently active */
  isActive?: boolean;

  /** Accordion content — typically <LeafLink> and/or nested <AccordionItem> */
  children: React.ReactNode;

  /**
   * Optional left-side accent line color for the open panel.
   * Defaults to var(--hp-border) — flat, non-glow accent.
   */
  accentBorderColor?: string;
}

export interface LeafLinkProps {
  /** Topic slug — used for isComingSoon() lookup */
  id: string;

  /** Display label */
  label: string;

  /** Emoji icon */
  icon: string;

  /**
   * Target URL.
   * If undefined, renders as non-interactive span.
   */
  href?: string;

  /**
   * Nesting depth — determines left padding.
   * depth=1 → paddingLeft: 30px (direct child of L1 accordion)
   * depth=2 → paddingLeft: 44px (child of L2 accordion)
   * Default: 2
   */
  depth?: 1 | 2;

  /** Called when a published link is tapped — used to close the drawer */
  onClose: () => void;
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

/**
 * Single accordion section: trigger button + collapsible children panel.
 *
 * Supports both controlled mode (isOpen + onToggle from parent) and
 * uncontrolled mode (manages own useState).
 */
export function AccordionItem({
  id,
  label,
  icon,
  depth = 1,
  isOpen: isOpenProp,
  onToggle: onToggleProp,
  maxHeightOpen,
  isActive = false,
  children,
  accentBorderColor = "var(--hp-border)",
}: AccordionItemProps) {

  // Uncontrolled internal state — ignored when controlled props are passed
  const [internalOpen, setInternalOpen] = useState(false);

  // Resolve controlled vs uncontrolled
  const isControlled = isOpenProp !== undefined && onToggleProp !== undefined;
  const isOpen       = isControlled ? isOpenProp : internalOpen;
  const handleToggle = isControlled
    ? onToggleProp
    : () => setInternalOpen((v) => !v);

  // Depth-driven visual values
  const isL1 = depth === 0;
  const resolvedMaxHeight = maxHeightOpen ?? (isL1 ? "2000px" : "800px");
  const fontSize      = isL1 ? 15 : 13;
  const fontWeight    = isL1 ? 500 : 500;
  const paddingLeft   = isL1 ? 20 : 30;
  const paddingY      = isL1 ? 14 : 9;
  const chevronSize   = isL1 ? 16 : 13;
  const iconSize      = isL1 ? 16 : 14;
  const iconGap       = isL1 ? 12 : 8;
  const borderBottom  = isL1 ? "1px solid var(--hp-border)" : "none";
  const childIndent   = isL1 ? 36 : 28;

  const triggerColor = isActive
    ? "var(--hp-accent)"
    : "var(--hp-text-primary)";

  const chevronColor = isOpen
    ? "var(--hp-accent)"
    : "var(--hp-text-muted)";

  return (
    <div
      data-accordion-id={id}
      style={{ borderBottom }}
    >
      {/* ── Trigger button ── */}
      <button
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        onClick={handleToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft,
          paddingRight: 20,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          minHeight: isL1 ? 52 : 40,
          background: isOpen && isL1 ? "var(--hp-bg-subtle)" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s ease",
        }}
      >
        {/* Label row */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: iconGap,
            fontFamily: "var(--font-body)",
            fontSize,
            fontWeight,
            color: triggerColor,
            transition: "color 0.15s ease",
          }}
        >
          <span aria-hidden="true" style={{ fontSize: iconSize, flexShrink: 0 }}>
            {icon}
          </span>
          {label}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={chevronSize}
          aria-hidden="true"
          style={{
            color: chevronColor,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease, color 0.2s ease",
            flexShrink: 0,
          }}
        />
      </button>

      {/* ── Collapsible panel ── */}
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        style={{
          maxHeight: isOpen ? resolvedMaxHeight : "0px",
          overflow: "hidden",
          transition: "max-height 0.26s ease",
        }}
      >
        {/* Indent line + children */}
        <div
          style={{
            borderLeft: `1px solid ${accentBorderColor}`,
            marginLeft: childIndent,
            marginBottom: isL1 ? 8 : 2,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── LeafLink ─────────────────────────────────────────────────────────────────

/**
 * Deepest-level nav item — individual topic link.
 *
 * Renders as:
 *   <Link>  when published  → clickable, calls onClose, shows → arrow
 *   <span>  when comingSoon → grayed, non-interactive, shows <ComingSoonBadge />
 */
export function LeafLink({
  id,
  label,
  icon,
  href,
  depth = 2,
  onClose,
}: LeafLinkProps) {
  const coming     = href ? isComingSoon(id) : false;
  const paddingLeft = 16 + depth * 14;  // depth=1→30px, depth=2→44px

  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingLeft,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: 40,
    fontFamily: "var(--font-body)",
    fontSize: 13,
    lineHeight: 1.3,
    borderLeft: "2px solid transparent",
    transition: "color 0.15s ease, background 0.15s ease, border-color 0.15s ease",
  };

  // ── Coming Soon — non-interactive ─────────────────────────────────────────
  if (coming) {
    return (
      <span
        role="menuitem"
        aria-disabled="true"
        style={{
          ...base,
          color: "var(--hp-text-muted)",
          opacity: 0.6,
          cursor: "default",
          pointerEvents: "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span aria-hidden="true" style={{ fontSize: 13, flexShrink: 0 }}>
            {icon}
          </span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {label}
          </span>
        </span>
        <ComingSoonBadge compact />
      </span>
    );
  }

  // ── Published — clickable link ────────────────────────────────────────────
  return (
    <Link
      href={href ?? "/"}
      role="menuitem"
      onClick={onClose}
      style={{
        ...base,
        color: "var(--hp-text-secondary)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color          = "var(--hp-text-primary)";
        e.currentTarget.style.background     = "var(--hp-bg-subtle)";
        e.currentTarget.style.borderLeftColor = "var(--hp-accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color          = "var(--hp-text-secondary)";
        e.currentTarget.style.background     = "transparent";
        e.currentTarget.style.borderLeftColor = "transparent";
      }}
    >
      {/* Icon + Label */}
      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span aria-hidden="true" style={{ fontSize: 13, flexShrink: 0 }}>
          {icon}
        </span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
      </span>

      {/* Arrow */}
      <span
        aria-hidden="true"
        style={{
          fontSize: 10,
          color: "var(--hp-text-muted)",
          fontFamily: "var(--font-mono)",
          flexShrink: 0,
        }}
      >
        →
      </span>
    </Link>
  );
}

// ─── Default export: AccordionItem ───────────────────────────────────────────
// Named exports above are the primary API.
// Default export provided for convenience when only AccordionItem is needed.

export default AccordionItem;
