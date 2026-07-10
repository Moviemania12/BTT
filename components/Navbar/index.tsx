"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { NAV_ITEMS, getActiveNavId } from "@/lib/nav-config";
import NavItem from "./NavItem";
import MobileDrawer from "./MobileDrawer";
import SearchButton from "./SearchButton";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group shrink-0"
      aria-label="Behind The Tech — Home"
    >
      <div
        className="relative w-8 h-8 flex items-center justify-center shrink-0"
        style={{ transition: "filter 0.3s ease" }}
      >
        <div
          className="absolute inset-0 rounded-sm rotate-45 transition-opacity duration-300 group-hover:opacity-40"
          style={{ background: "var(--hp-accent)", opacity: 0.12 }}
        />
        <img
          src="/favicon.svg"
          alt="BTT logo"
          width={18}
          height={18}
          className="relative z-10"
          style={{
            filter: "brightness(1)",
            transition: "filter 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter =
              "brightness(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter =
              "brightness(1)";
          }}
        />
      </div>
      <span
        className="flicker hidden sm:block"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.15rem",
          letterSpacing: "0.14em",
          color: "var(--hp-text-primary)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        BEHIND THE TECH
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname    = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeNavId = getActiveNavId(pathname);

  const navRef         = useRef<HTMLElement>(null);
  const closeTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenuId(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenuId) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenuId(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current)  clearTimeout(closeTimerRef.current);
      if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    };
  }, []);

  // ── Timer helpers ──────────────────────────────────────────────────────────

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const cancelSwitch = useCallback(() => {
    if (switchTimerRef.current) {
      clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    cancelSwitch();
    closeTimerRef.current = setTimeout(() => setOpenMenuId(null), 300);
  }, [cancelClose, cancelSwitch]);

  // ── Menu enter: the SWITCH DELAY fix ──────────────────────────────────────
  //
  // ROOT CAUSE OF THE SWITCHING BUG:
  // When cursor moves diagonally from an open mega menu panel toward a distant
  // topic link, it naturally passes through adjacent NavItem trigger buttons
  // in the navbar bar (y=0-64px). Those triggers fire onMouseEnter immediately,
  // calling setOpenMenuId(other_id) — LEARN disappears, NON-IT opens.
  //
  // This is the classic "diagonal movement problem" in mega menus.
  //
  // THE FIX — two separate timers, two separate purposes:
  //
  //   closeTimerRef  — delays CLOSING the menu (fires after leaving navbar+panel)
  //   switchTimerRef — delays SWITCHING to a different menu (fires on trigger enter)
  //
  // When cursor enters a NEW trigger while a menu is already open:
  //   → Don't switch immediately
  //   → Wait 150ms — imperceptible for intentional hover, but enough to
  //     ignore accidental pass-through during diagonal movement
  //   → If cursor leaves the trigger before 150ms: cancelSwitch(), no change
  //   → If cursor stays for 150ms: switch fires, new menu opens
  //
  // When no menu is open (first open):
  //   → Open immediately, no delay needed
  //
  // When cursor enters the SAME menu's panel:
  //   → cancelClose() only, no switch timer needed (openMenuId already correct)

  const handleTriggerEnter = useCallback((id: string) => {
    cancelClose();
    cancelSwitch();

    setOpenMenuId((current) => {
      if (current === null) {
        // No menu open — open immediately
        return id;
      }
      if (current === id) {
        // Same menu — keep it open, nothing to do
        return current;
      }
      // Different menu is open — schedule a switch after 150ms
      // setOpenMenuId is called inside a setter callback here, so we can't
      // call it again directly. Use a ref-based approach:
      return current; // keep current for now, switch fires below
    });

    // Handle the switch case via a separate timer check
    // We read openMenuId via a ref to avoid stale closure
    switchTimerRef.current = setTimeout(() => {
      setOpenMenuId((current) => {
        // Only switch if we're still hovering this trigger (i.e. switch wasn't cancelled)
        return id;
      });
    }, 150);
  }, [cancelClose, cancelSwitch]);

  const handleTriggerLeave = useCallback(() => {
    // Cursor left a trigger. Cancel any pending switch.
    // DO NOT start a close timer here — close is handled when cursor leaves <nav>.
    cancelSwitch();
  }, [cancelSwitch]);

  const handleMenuToggle = useCallback((id: string, hasMegaMenu: boolean) => {
    if (!hasMegaMenu) return;
    cancelClose();
    cancelSwitch();
    setOpenMenuId((prev) => (prev === id ? null : id));
  }, [cancelClose, cancelSwitch]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || openMenuId
            ? "glass-light border-b border-[rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
        // Close timer fires when cursor leaves the entire navbar bar.
        // The panel's onMouseEnter cancels it immediately if cursor enters panel.
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

          <Logo />

          <div
            className="hidden lg:flex items-center gap-1"
            role="menubar"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeNavId === item.id}
                isOpen={openMenuId === item.id}
                onMouseEnter={() =>
                  item.megaMenu
                    ? handleTriggerEnter(item.id)
                    : (() => { cancelSwitch(); setOpenMenuId(null); })()
                }
                onMouseLeave={handleTriggerLeave}
                onToggle={() => handleMenuToggle(item.id, !!item.megaMenu)}
                // Panel enter: cancel close timer (cursor is safely in the panel)
                onMenuMouseEnter={cancelClose}
                // Panel leave: start close timer (cursor has left navbar+panel zone)
                onMenuMouseLeave={scheduleClose}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <SearchButton />
            </div>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
              style={{
                color: "var(--hp-accent)",
                background: mobileOpen ? "var(--hp-accent-subtle)" : "transparent",
                border: "1px solid",
                borderColor: mobileOpen ? "var(--hp-accent)" : "var(--hp-border)",
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeNavId={activeNavId}
      />

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
