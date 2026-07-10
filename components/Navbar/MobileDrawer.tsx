"use client";

/**
 * components/Navbar/MobileDrawer.tsx
 *
 * Mobile navigation drawer — slides in from the right on screens < lg (1024px).
 * All accordion and leaf-link logic is imported from MobileAccordion.tsx.
 * This file owns only the drawer chrome: header, status strip, nav list, CTA.
 *
 * ─── STRUCTURE ────────────────────────────────────────────────────────────────
 *
 *   <aside>                  drawer shell — slide animation + overlay
 *     Header                 logo + close button
 *     Status strip           "Data Center Knowledge Platform"
 *     <nav>                  scrollable section list
 *       L1 items             rendered via renderL1Section()
 *         badge variant      DC Map pill (Link, no accordion)
 *         direct link        leaf L1 item (no children)
 *         accordion          <AccordionItem depth=0> controlled by openL1Id
 *           <AccordionItem depth=1>  L2 — uncontrolled (self-manages open state)
 *             <LeafLink>             L3 — topic leaf, coming-soon aware
 *     Footer                 Subscribe CTA
 *
 * ─── ACCORDION RULES ──────────────────────────────────────────────────────────
 *
 *   L1: single-open — openL1Id state enforces one section at a time.
 *       Passed to AccordionItem as controlled props (isOpen + onToggle).
 *   L2: multi-open — AccordionItem used in uncontrolled mode (no isOpen prop).
 *       Multiple L2 sections can be open simultaneously within one L1.
 *
 * ─── COMING SOON ──────────────────────────────────────────────────────────────
 *
 *   LeafLink from MobileAccordion handles coming-soon detection internally
 *   via isComingSoon(id). No coming-soon logic exists in this file.
 *
 * ─── DOES NOT ─────────────────────────────────────────────────────────────────
 *   - Contain any accordion expand/collapse logic (all in MobileAccordion.tsx)
 *   - Contain LeafLink (imported from MobileAccordion.tsx)
 *   - Contain isComingSoon (imported from MobileAccordion.tsx)
 *   - Render on desktop (hidden by index.tsx via lg:hidden breakpoint on overlay)
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { MOBILE_NAV, type MobileSection } from "@/lib/nav-config";
import AccordionItem, { LeafLink } from "./MobileAccordion";

// ─── Props ────────────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeNavId: string | null;
}

// ─── L1 renderer ─────────────────────────────────────────────────────────────
//
// Handles the three L1 variants before delegating to AccordionItem / LeafLink:
//   "badge"   → DC Map pill
//   no children → direct Link
//   has children → AccordionItem (depth=0, controlled)

function renderL1Section(
  section: MobileSection,
  openL1Id: string | null,
  handleL1Toggle: (id: string) => void,
  activeNavId: string | null,
  onClose: () => void
) {
  const isActive     = activeNavId === section.id;
  const isOpen       = openL1Id === section.id;
  const hasChildren  = !!section.children?.length;
  const isBadge      = section.variant === "badge";

  // ── Badge variant: DC Map flagship pill ───────────────────────────────────
  if (isBadge && section.href) {
    return (
      <div
        key={section.id}
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          borderBottom: "1px solid var(--hp-border)",
        }}
      >
        <Link
          href={section.href}
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            margin: "6px 16px",
            padding: "10px 16px",
            borderRadius: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            color:       isActive ? "#ffffff" : "var(--hp-accent)",
            background:  isActive ? "var(--hp-accent)" : "var(--hp-accent-subtle)",
            border:      "1px solid",
            borderColor: isActive ? "var(--hp-accent)" : "var(--hp-border)",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background:  isActive ? "#ffffff" : "var(--hp-accent)",
              animation:   "pulseBlue 2.5s ease-in-out infinite",
              flexShrink:  0,
            }}
          />
          <span aria-hidden="true">{section.icon}</span>
          {section.label}
        </Link>
      </div>
    );
  }

  // ── Direct link: no children ───────────────────────────────────────────────
  if (!hasChildren && section.href) {
    return (
      <div
        key={section.id}
        style={{ borderBottom: "1px solid var(--hp-border)" }}
      >
        <Link
          href={section.href}
          onClick={onClose}
          style={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            padding:         "14px 20px",
            fontFamily:      "var(--font-body)",
            fontSize:        15,
            fontWeight:      500,
            color:           isActive ? "var(--hp-accent)" : "var(--hp-text-primary)",
            textDecoration:  "none",
            transition:      "color 0.15s ease",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span aria-hidden="true" style={{ fontSize: 16 }}>
              {section.icon}
            </span>
            {section.label}
          </span>
          <span
            aria-hidden="true"
            style={{
              fontSize: 11,
              color: "var(--hp-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            →
          </span>
        </Link>
      </div>
    );
  }

  // ── Accordion: has children ────────────────────────────────────────────────
  // L1 is always controlled (single-open enforced by openL1Id in MobileDrawer).
  // L2 children are rendered as uncontrolled AccordionItem (depth=1).
  if (!hasChildren) return null; // guard: no href + no children = nothing to render

  return (
    <AccordionItem
      key={section.id}
      id={section.id}
      label={section.label}
      icon={section.icon}
      depth={0}
      isOpen={isOpen}
      isActive={isActive}
      onToggle={() => handleL1Toggle(section.id)}
      maxHeightOpen="2000px"
    >
      {section.children!.map((child) => {
        // L2: has its own children → another AccordionItem (depth=1, uncontrolled)
        if (child.children?.length) {
          return (
            <AccordionItem
              key={child.id}
              id={child.id}
              label={child.label}
              icon={child.icon}
              depth={1}
              maxHeightOpen="800px"
            >
              {child.children.map((leaf) => (
                <LeafLink
                  key={leaf.id}
                  id={leaf.id}
                  label={leaf.label}
                  icon={leaf.icon}
                  href={leaf.href}
                  depth={2}
                  onClose={onClose}
                />
              ))}
            </AccordionItem>
          );
        }

        // L2: no children → leaf link directly inside L1 panel
        return (
          <LeafLink
            key={child.id}
            id={child.id}
            label={child.label}
            icon={child.icon}
            href={child.href}
            depth={1}
            onClose={onClose}
          />
        );
      })}
    </AccordionItem>
  );
}

// ─── Main MobileDrawer ────────────────────────────────────────────────────────

export default function MobileDrawer({
  isOpen,
  onClose,
  activeNavId,
}: MobileDrawerProps) {

  // Single-open L1 state — only one top-level section expands at a time
  const [openL1Id, setOpenL1Id] = useState<string | null>(null);

  const handleL1Toggle = useCallback((id: string) => {
    setOpenL1Id((prev) => (prev === id ? null : id));
  }, []);

  // Separate CTA from nav sections — CTA renders in footer, not in the list
  const navSections = MOBILE_NAV.filter((s) => s.variant !== "cta");
  const ctaSection  = MOBILE_NAV.find((s)  => s.variant === "cta");

  return (
    <aside
      id="mobile-drawer"
      role="navigation"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      style={{
        position:    "fixed",
        top:         0,
        right:       0,
        bottom:      0,
        zIndex:      50,
        width:       "min(85vw, 360px)",
        background:  "rgba(255,255,255,0.99)",
        borderLeft:  "1px solid var(--hp-border)",
        boxShadow:   "-20px 0 60px rgba(16,24,40,0.12)",
        transform:   isOpen ? "translateX(0)" : "translateX(100%)",
        transition:  isOpen
          ? "transform 320ms cubic-bezier(0.16,1,0.3,1)"
          : "transform 260ms cubic-bezier(0.4,0,1,1)",
        display:        "flex",
        flexDirection:  "column",
        overflowY:      "auto",
        overflowX:      "hidden",
        visibility:     isOpen ? "visible" : "hidden",
      }}
    >

      {/* ── Header ── */}
      <div
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          padding:         "16px 20px",
          borderBottom:    "1px solid var(--hp-border)",
          flexShrink:      0,
        }}
      >
        <Link
          href="/"
          onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          aria-label="Behind The Tech — Home"
        >
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            style={{ filter: "brightness(1)" }}
          />
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "1rem",
              letterSpacing: "0.14em",
              color:         "var(--hp-text-primary)",
              lineHeight:    1,
            }}
          >
            BEHIND THE TECH
          </span>
        </Link>

        <button
          onClick={onClose}
          aria-label="Close navigation"
          style={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            width:           36,
            height:          36,
            borderRadius:    8,
            background:      "var(--hp-accent-subtle)",
            border:          "1px solid var(--hp-border)",
            color:           "var(--hp-accent)",
            cursor:          "pointer",
            flexShrink:      0,
            transition:      "background 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--hp-bg-subtle)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--hp-accent-subtle)"; }}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {/* ── Status strip ── */}
      <div
        aria-hidden="true"
        style={{
          display:      "flex",
          alignItems:   "center",
          gap:          6,
          padding:      "7px 20px",
          borderBottom: "1px solid var(--hp-border)",
          background:   "var(--hp-bg-subtle)",
          flexShrink:   0,
        }}
      >
        <span
          style={{
            width:      5,
            height:     5,
            borderRadius: "50%",
            background:  "var(--hp-accent)",
            flexShrink:  0,
          }}
        />
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      9,
            letterSpacing: "0.24em",
            color:         "var(--hp-text-muted)",
            textTransform: "uppercase",
          }}
        >
          Data Center Knowledge Platform
        </span>
      </div>

      {/* ── Navigation list ── */}
      <nav
        role="menu"
        aria-label="Site sections"
        style={{ flex: 1, overflowY: "auto" }}
      >
        {navSections.map((section) =>
          renderL1Section(section, openL1Id, handleL1Toggle, activeNavId, onClose)
        )}
      </nav>

      {/* ── Footer CTA ── */}
      {ctaSection?.href && (
        <div
          style={{
            padding:      "16px 20px",
            borderTop:    "1px solid var(--hp-border)",
            flexShrink:   0,
          }}
        >
          <Link
            href={ctaSection.href}
            onClick={onClose}
            className="btn-primary"
            style={{
              display:       "block",
              textAlign:     "center",
              borderRadius:  10,
              padding:       "13px 20px",
              fontSize:      12,
              letterSpacing: "0.14em",
              textDecoration: "none",
            }}
          >
            {ctaSection.icon} {ctaSection.label}
          </Link>
        </div>
      )}
    </aside>
  );
}
