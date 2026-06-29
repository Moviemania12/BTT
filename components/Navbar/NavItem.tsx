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
          color: isActive ? "var(--color-void)" : "var(--color-neon-blue)",
          background: isActive ? "var(--color-neon-blue)" : "rgba(0,212,255,0.06)",
          border: "1px solid",
          borderColor: isActive ? "var(--color-neon-blue)" : "rgba(0,212,255,0.35)",
          boxShadow: isActive ? "0 0 18px rgba(0,212,255,0.45)" : "none",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(0,212,255,0.12)";
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.65)";
            e.currentTarget.style.boxShadow = "0 0 14px rgba(0,212,255,0.30)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(0,212,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: isActive ? "var(--color-void)" : "var(--color-neon-blue)",
            boxShadow: isActive ? "none" : "0 0 6px rgba(0,212,255,0.8)",
            animation: "pulseBlue 2.5s ease-in-out infinite",
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
            color: isActive || isOpen
              ? "var(--color-text-primary)"
              : "var(--color-text-secondary)",
            background: isOpen ? "rgba(0,212,255,0.05)" : "transparent",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            if (!isActive && !isOpen) {
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }
          }}
        >
          {item.label}

          <ChevronDown
            size={11}
            aria-hidden="true"
            style={{
              color: isActive || isOpen
                ? "var(--color-neon-blue)"
                : "var(--color-text-muted)",
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
              background: "var(--color-neon-blue)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              boxShadow: "0 0 6px rgba(0,212,255,0.6)",
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
                background: "var(--color-neon-blue)",
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
            color: isActive
              ? "var(--color-text-primary)"
              : "var(--color-text-secondary)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.color = "var(--color-text-secondary)";
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
              background: "var(--color-neon-blue)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              boxShadow: "0 0 6px rgba(0,212,255,0.6)",
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
                background: "var(--color-neon-blue)",
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
