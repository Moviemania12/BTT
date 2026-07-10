"use client";

/**
 * components/Navbar/NavItem.tsx
 *
 * KEY ARCHITECTURE CHANGE — hover fix:
 *
 * MegaMenu was previously position:fixed, which placed it OUTSIDE the
 * NavItem <div> in the DOM. Moving the cursor from trigger → panel crossed
 * the <nav> onMouseLeave boundary, firing scheduleClose and closing the menu.
 *
 * Fix: MegaMenu is now rendered as a DOM child of the NavItem wrapper div.
 * The wrapper div has onMouseEnter/onMouseLeave, so cursor movement between
 * trigger and panel stays INSIDE the wrapper — no close logic fires.
 *
 * MegaMenu uses position:absolute on the wrapper + left:50% + translateX(-50%)
 * + width:100vw to achieve full-viewport-width visually while remaining
 * in the correct DOM tree for hover detection.
 *
 * WHITE THEME MIGRATION (Phase A):
 * All neon-blue glow effects (box-shadow blur) removed — replaced with
 * flat hp-accent colors and opacity-based state changes, matching the
 * homepage's restrained, non-neon design language. Interaction logic,
 * structure, and every prop are unchanged.
 */

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem as NavItemType } from "@/lib/nav-config";
import MegaMenu from "./MegaMenu";

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggle: () => void;
  onMenuMouseEnter: () => void;
  onMenuMouseLeave: () => void;
}

export default function NavItem({
  item,
  isActive,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onToggle,
  onMenuMouseEnter,
  onMenuMouseLeave,
}: NavItemProps) {

  const hasMegaMenu = !!item.megaMenu;
  const isBadge     = item.variant === "badge";

  // ── Badge variant (DC Map) ────────────────────────────────────────────────

  if (isBadge && item.href) {
    return (
      <Link
        href={item.href}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: isActive ? "#ffffff" : "var(--hp-accent)",
          background: isActive ? "var(--hp-accent)" : "var(--hp-accent-subtle)",
          border: "1px solid",
          borderColor: isActive ? "var(--hp-accent)" : "var(--hp-border)",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "var(--hp-accent)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "var(--hp-border)";
          }
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: isActive ? "#ffffff" : "var(--hp-accent)",
          }}
          aria-hidden="true"
        />
        {item.label}
      </Link>
    );
  }

  // ── Default variant ───────────────────────────────────────────────────────
  //
  // The outer <div> is position:relative and owns onMouseEnter/onMouseLeave.
  // Both the trigger button AND the MegaMenu panel are DOM children of this div.
  // This means cursor movement between trigger and panel NEVER leaves this div,
  // so onMouseLeave (scheduleClose) is never triggered mid-transition.

  return (
    <div
      // position:static here — MegaMenu will use position:absolute relative
      // to the nearest positioned ancestor, which we set on the panel itself
      // using a negative left offset + 100vw width trick (see MegaMenu.tsx).
      style={{ position: "static" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Trigger button ── */}
      {hasMegaMenu ? (
        <button
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-current={isActive ? "page" : undefined}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          className="relative flex items-center gap-0.5 px-3 py-2 rounded-md group"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--hp-text-primary)",
            opacity: isActive || isOpen ? 1 : 0.72,
            background: isOpen ? "var(--hp-accent-subtle)" : "transparent",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            if (!isActive && !isOpen) {
              e.currentTarget.style.opacity = "0.72";
            }
          }}
        >
          {item.label}

          <ChevronDown
            size={11}
            aria-hidden="true"
            style={{
              color: isActive || isOpen
                ? "var(--hp-accent)"
                : "var(--hp-text-muted)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease, color 0.2s ease",
              marginLeft: 1,
            }}
          />

          {/* Active underline */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 2,
              left: 12,
              right: 12,
              height: 1.5,
              borderRadius: 1,
              background: "var(--hp-accent)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          />

          {/* Hover underline */}
          {!isActive && (
            <span
              aria-hidden="true"
              className="absolute group-hover:scale-x-100"
              style={{
                bottom: 2,
                left: 12,
                right: 12,
                height: 1,
                borderRadius: 1,
                background: "var(--hp-accent)",
                opacity: 0.4,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.22s ease",
              }}
            />
          )}
        </button>
      ) : (
        <Link
          href={item.href ?? "/"}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
          className="relative flex items-center px-3 py-2 rounded-md group"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--hp-text-primary)",
            opacity: isActive ? 1 : 0.72,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.opacity = "0.72";
            }
          }}
        >
          {item.label}

          {/* Active underline */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 2,
              left: 12,
              right: 12,
              height: 1.5,
              borderRadius: 1,
              background: "var(--hp-accent)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          />

          {/* Hover underline */}
          {!isActive && (
            <span
              aria-hidden="true"
              className="absolute group-hover:scale-x-100"
              style={{
                bottom: 2,
                left: 12,
                right: 12,
                height: 1,
                borderRadius: 1,
                background: "var(--hp-accent)",
                opacity: 0.4,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.22s ease",
              }}
            />
          )}
        </Link>
      )}

      {/* ── MegaMenu Panel ── */}
      {/*
        Rendered as a DOM child of this wrapper.
        Cursor moving from trigger button into panel stays inside this div —
        so onMouseLeave (scheduleClose) never fires mid-transition.
        MegaMenu achieves full-width via position:absolute + 100vw trick.
      */}
      {hasMegaMenu && item.megaMenu && (
        <MegaMenu
          menu={item.megaMenu}
          isOpen={isOpen}
          onMouseEnter={onMenuMouseEnter}
          onMouseLeave={onMenuMouseLeave}
        />
      )}
    </div>
  );
}
