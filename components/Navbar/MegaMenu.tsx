"use client";

/**
 * components/Navbar/MegaMenu.tsx
 *
 * KEY ARCHITECTURE CHANGE — hover fix:
 *
 * Previously: position:fixed, top:64, left:0, right:0
 *   → Panel was OUTSIDE the NavItem DOM tree
 *   → Cursor crossing from trigger to panel left the <nav> element
 *   → <nav onMouseLeave> fired scheduleClose → menu closed
 *
 * Now: position:absolute, top:100%, left:50%, transform:translateX(-50%), width:100vw
 *   → Panel is a DOM CHILD of the NavItem wrapper div
 *   → Cursor moves from trigger → panel without leaving the wrapper
 *   → onMouseLeave (scheduleClose) never fires mid-transition
 *   → Visual result is identical: full-width panel below the navbar
 *
 * The trick: NavItem wrapper has position:static. The panel uses
 * position:absolute which climbs up to the nearest positioned ancestor —
 * the <nav> element (position:fixed). top:100% = bottom of <nav> bar.
 * left:50% + translateX(-50%) + width:100vw = full viewport width, centered.
 */

import Link from "next/link";
import type { MegaMenu as MegaMenuType, MegaMenuColumn, NavLink } from "@/lib/nav-config";
import ComingSoonBadge from "./ComingSoonBadge";

// ─── Props ────────────────────────────────────────────────────────────────────

interface MegaMenuProps {
  menu: MegaMenuType;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ─── Width map ────────────────────────────────────────────────────────────────

const WIDTH_CLASSES: Record<MegaMenuType["width"], string> = {
  full:   "max-w-7xl",
  medium: "max-w-4xl",
  narrow: "max-w-xs",
};

// ─── Column ───────────────────────────────────────────────────────────────────

function Column({ column }: { column: MegaMenuColumn }) {
  return (
    <div className="flex flex-col min-w-0">
      <div
        role="none"
        className="flex items-center gap-2 mb-3 pb-2"
        style={{ borderBottom: "1px solid rgba(0,212,255,0.10)" }}
      >
        {column.categoryHref ? (
          <Link
            href={column.categoryHref}
            className="flex items-center gap-1.5 group/heading"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.30em",
                textTransform: "uppercase",
                color: "var(--color-neon-blue)",
                fontWeight: 600,
                transition: "opacity 0.15s ease",
              }}
              className="group-hover/heading:opacity-70"
            >
              {column.icon} {column.heading}
            </span>
            <span
              className="opacity-0 group-hover/heading:opacity-60 transition-opacity duration-150"
              style={{ fontSize: 8, color: "var(--color-neon-blue)", fontFamily: "var(--font-mono)" }}
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ) : (
          <span
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "var(--color-neon-blue)",
              fontWeight: 600,
            }}
          >
            {column.icon} {column.heading}
          </span>
        )}
      </div>

      <ul role="none" className="flex flex-col gap-0.5">
        {column.links.map((link) => (
          <li key={link.href} role="none">
            <NavLinkItem link={link} accentRgb={column.accentRgb} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── NavLinkItem ──────────────────────────────────────────────────────────────

function NavLinkItem({
  link,
  accentRgb,
  compact = false,
}: {
  link: NavLink;
  accentRgb: string;
  compact?: boolean;
}) {
  const sharedStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: compact ? "3px 0 3px 10px" : "5px 0 5px 10px",
    borderLeft: "2px solid transparent",
    borderRadius: "0 4px 4px 0",
    fontFamily: "var(--font-body)",
    fontSize: compact ? 12 : 13,
    lineHeight: 1.4,
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    transition: "color 0.15s ease, border-color 0.15s ease, padding-left 0.15s ease, background 0.15s ease",
    opacity: link.comingSoon ? 0.42 : 1,
    pointerEvents: link.comingSoon ? "none" : "auto",
    cursor: link.comingSoon ? "default" : "pointer",
    userSelect: link.comingSoon ? "none" : "auto",
  };

  const inner = (
    <>
      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {link.label}
      </span>
      {link.comingSoon ? (
        <ComingSoonBadge />
      ) : (
        <span
          className="link-arrow"
          aria-hidden="true"
          style={{
            fontSize: 10,
            color: `rgba(${accentRgb},0)`,
            transition: "color 0.15s ease",
            flexShrink: 0,
            fontFamily: "var(--font-mono)",
          }}
        >
          →
        </span>
      )}
    </>
  );

  if (link.comingSoon) {
    return (
      <span role="menuitem" aria-disabled="true" style={sharedStyle} title={`${link.label} — Coming Soon`}>
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      role="menuitem"
      style={sharedStyle}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--color-text-primary)";
        el.style.borderLeftColor = `rgba(${accentRgb},0.7)`;
        el.style.paddingLeft = "14px";
        el.style.background = `rgba(${accentRgb},0.04)`;
        const arrow = el.querySelector<HTMLSpanElement>(".link-arrow");
        if (arrow) arrow.style.color = `rgba(${accentRgb},0.8)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--color-text-secondary)";
        el.style.borderLeftColor = "transparent";
        el.style.paddingLeft = "10px";
        el.style.background = "transparent";
        const arrow = el.querySelector<HTMLSpanElement>(".link-arrow");
        if (arrow) arrow.style.color = `rgba(${accentRgb},0)`;
      }}
    >
      {inner}
    </Link>
  );
}

// ─── BottomBanner ─────────────────────────────────────────────────────────────

function BottomBanner({ banner }: { banner: NonNullable<MegaMenuType["bottomBanner"]> }) {
  return (
    <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
      <div className="flex items-start gap-6 flex-wrap">
        <span
          style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--color-neon-blue)",
            fontWeight: 600,
            paddingTop: 4,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          role="none"
        >
          {banner.icon} {banner.heading}
        </span>
        <div role="none" className="flex flex-wrap gap-x-1 gap-y-1">
          {banner.links.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" style={{ color: "var(--color-text-muted)", fontSize: 10, margin: "0 4px" }}>·</span>
              )}
              {link.comingSoon ? (
                <span
                  role="menuitem"
                  aria-disabled="true"
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-muted)",
                    opacity: 0.45,
                    pointerEvents: "none",
                    cursor: "default",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {link.label}
                  <ComingSoonBadge compact />
                </span>
              ) : (
                <Link
                  href={link.href}
                  role="menuitem"
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────

function FeaturedCard({ card }: { card: NonNullable<MegaMenuType["featuredCard"]> }) {
  return (
    <Link
      href={card.href}
      role="menuitem"
      className="flex flex-col gap-3 p-4 rounded-xl self-start"
      style={{
        minWidth: 200,
        maxWidth: 240,
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.12)",
        textDecoration: "none",
        transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.28)";
        e.currentTarget.style.background = "rgba(0,212,255,0.07)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
        e.currentTarget.style.background = "rgba(0,212,255,0.04)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span style={{ fontSize: 22 }} aria-hidden="true">{card.icon}</span>
      <span style={{ fontSize: 12, fontFamily: "var(--font-display)", letterSpacing: "0.08em", color: "var(--color-text-primary)", lineHeight: 1.2 }}>
        {card.title.toUpperCase()}
      </span>
      <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
        {card.description}
      </span>
      <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--color-neon-blue)", marginTop: "auto" }} aria-hidden="true">
        {card.cta}
      </span>
    </Link>
  );
}

// ─── Main MegaMenu ────────────────────────────────────────────────────────────

export default function MegaMenu({
  menu,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {

  const maxWidthClass = WIDTH_CLASSES[menu.width];

  return (
    /*
     * POSITIONING STRATEGY — the key change:
     *
     * position: "absolute"
     *   Anchors to the nearest positioned ancestor above this element.
     *   NavItem wrapper is position:static, so it climbs to <nav> (position:fixed).
     *   top: "100%" = exactly the bottom edge of the <nav> bar. ✅
     *
     * left: "50%"  +  transform: "translateX(-50%)"
     *   Centers the panel on the viewport regardless of which NavItem triggered it.
     *
     * width: "100vw"
     *   Full viewport width — visually identical to the previous fixed layout.
     *
     * This keeps the panel IN the DOM tree of NavItem's wrapper div.
     * Cursor movement from trigger → panel never leaves the wrapper.
     * onMouseLeave (scheduleClose) never fires mid-transition. ✅
     */
    <div
      role="menu"
      aria-orientation="vertical"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        width: "100vw",
        zIndex: 49,

        // Visibility
        //
        // CRITICAL FIX — pointer hit-testing of closed panels:
        //
        // pointerEvents:"none" on this panel does NOT stop its child links
        // (which set pointerEvents:"auto") from intercepting the mouse.
        // Per the CSS spec, a descendant with pointer-events:auto receives
        // pointer events even when an ancestor has pointer-events:none.
        //
        // Every NavItem renders its panel into the DOM (even when closed).
        // All panels stack at the same location (position:absolute, top:100%,
        // width:100vw). Closed panels that appear LATER in DOM order paint
        // ON TOP of the open panel. Their invisible (opacity:0) links still
        // had pointerEvents:auto, so they intercepted the hover and their
        // mouseenter bubbled to a DIFFERENT NavItem wrapper — switching menus.
        //
        // visibility:"hidden" removes the element AND its entire subtree from
        // pointer hit-testing. Unlike pointer-events, a child CANNOT override
        // visibility:hidden back to visible unless it explicitly sets
        // visibility:visible (none of the links do). This fully neutralises
        // closed panels while preserving the opacity/transform animation.
        //
        // visibility is delayed on close so the exit animation can play first.
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transform: isOpen
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-6px)",
        transition: isOpen
          ? "opacity 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1), visibility 0s"
          : "opacity 150ms ease-in, transform 150ms ease-in, visibility 0s 150ms",

        // Panel background
        background: "rgba(7,12,18,0.97)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        borderBottom: "1px solid rgba(0,212,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.60), 0 1px 0 rgba(0,212,255,0.06) inset",
      }}
    >
      {/* Inner wrapper — centered, max-width controlled by variant */}
      <div className={`${maxWidthClass} mx-auto px-8 py-7`}>
        <div className="flex gap-8">
          <div
            className="flex-1 min-w-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))`,
              gap: "0 32px",
            }}
          >
            {menu.columns.map((column) => (
              <Column key={column.heading} column={column} />
            ))}
          </div>

          {menu.featuredCard && <FeaturedCard card={menu.featuredCard} />}
        </div>

        {menu.bottomBanner && <BottomBanner banner={menu.bottomBanner} />}
      </div>

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.20) 30%, rgba(0,212,255,0.20) 70%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
