"use client";

/**
 * components/Navbar/SearchButton.tsx
 *
 * Search trigger button in the navbar right slot.
 * Currently a visual placeholder — clicking or pressing ⌘K/Ctrl+K
 * fires onSearchOpen() which today is a no-op (search not yet built).
 *
 * ─── INTEGRATION POINTS ───────────────────────────────────────────────────────
 *
 *   When the command palette / global search is ready, two changes only:
 *
 *   1. In this file: replace the no-op body of handleOpen() with:
 *        openSearchPalette()   // from a future SearchContext or zustand store
 *      OR pass an onOpen prop from index.tsx if the palette is a sibling.
 *
 *   2. In index.tsx: extend the existing Escape listener to also close
 *      the palette, and add ⌘K to the same listener:
 *        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
 *          e.preventDefault();
 *          setSearchOpen(v => !v);
 *        }
 *      The keyboard shortcut is NOT registered here — keeping it in
 *      index.tsx means one listener manages all keyboard nav state.
 *
 * ─── VISUAL BEHAVIOUR ─────────────────────────────────────────────────────────
 *
 *   · Icon button: Search icon (lucide-react) + ⌘K hint label on desktop
 *   · Hover: subtle neon-blue border + background lift
 *   · Active: pressed state via CSS :active analog (inline style swap)
 *   · aria-label always present for screen readers
 *   · aria-keyshortcuts="Control+k Meta+k" — advertises shortcut
 *
 * ─── SIZE / PLACEMENT ─────────────────────────────────────────────────────────
 *
 *   Rendered by index.tsx inside:
 *     <div className="hidden sm:block">   ← hidden on xs (< 640px)
 *       <SearchButton />
 *     </div>
 *
 *   The component itself has no responsive classes — sizing is controlled
 *   by index.tsx's slot. This keeps SearchButton unopinionated about context.
 *
 * ─── FUTURE PROPS ─────────────────────────────────────────────────────────────
 *
 *   When palette is built, index.tsx will pass:
 *     <SearchButton onOpen={() => setSearchOpen(true)} isOpen={searchOpen} />
 *   The component already accepts these as optional props with safe defaults.
 *
 * ─── DOES NOT ─────────────────────────────────────────────────────────────────
 *   - Register ⌘K keyboard listener (owned by index.tsx)
 *   - Render the search palette / modal (future separate component)
 *   - Import from topics.ts or nav-config.ts
 *   - Own any persistent state
 */

import { Search } from "lucide-react";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SearchButtonProps {
  /**
   * Called when the button is clicked or ⌘K is pressed.
   * No-op by default — wired up when command palette is built.
   */
  onOpen?: () => void;

  /**
   * Whether the search palette is currently open.
   * When true: button shows active/pressed state.
   * Used in future to toggle aria-expanded.
   */
  isOpen?: boolean;
}

// ─── OS detection for shortcut label ─────────────────────────────────────────

/**
 * Returns true when running on macOS (client-side only).
 * Used to show ⌘K vs Ctrl+K hint label.
 * Safe to call during SSR — window is guarded.
 */
function isMac(): boolean {
  if (typeof window === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchButton({
  onOpen,
  isOpen = false,
}: SearchButtonProps) {

  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }
    // Future: openSearchPalette() or dispatch("OPEN_SEARCH")
    // For now: intentional no-op — button is a visual placeholder
  };

  // Shortcut label — derived at render time (client only, safe fallback)
  const shortcutLabel = isMac() ? "⌘K" : "Ctrl K";

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label="Search"
      aria-keyshortcuts="Control+k Meta+k"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      title={`Search  ${shortcutLabel}`}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            6,
        padding:        "6px 10px",
        borderRadius:   8,
        background:     isOpen ? "rgba(0,212,255,0.10)" : "transparent",
        border:         "1px solid",
        borderColor:    isOpen
          ? "rgba(0,212,255,0.35)"
          : "rgba(0,212,255,0.12)",
        color:          isOpen
          ? "var(--color-neon-blue)"
          : "var(--color-text-muted)",
        cursor:         "pointer",
        transition:     "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
        flexShrink:     0,
        whiteSpace:     "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.background   = "rgba(0,212,255,0.06)";
          e.currentTarget.style.borderColor  = "rgba(0,212,255,0.28)";
          e.currentTarget.style.color        = "var(--color-text-secondary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.background   = "transparent";
          e.currentTarget.style.borderColor  = "rgba(0,212,255,0.12)";
          e.currentTarget.style.color        = "var(--color-text-muted)";
        }
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.background  = "rgba(0,212,255,0.14)";
        e.currentTarget.style.borderColor = "rgba(0,212,255,0.45)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.background  = isOpen
          ? "rgba(0,212,255,0.10)"
          : "rgba(0,212,255,0.06)";
        e.currentTarget.style.borderColor = isOpen
          ? "rgba(0,212,255,0.35)"
          : "rgba(0,212,255,0.28)";
      }}
    >
      {/* Search icon */}
      <Search
        size={14}
        aria-hidden="true"
        strokeWidth={2}
      />

      {/* Keyboard shortcut hint — hidden on mobile, visible on sm+ */}
      <span
        aria-hidden="true"
        style={{
          fontFamily:   "var(--font-mono)",
          fontSize:     9,
          letterSpacing: "0.12em",
          lineHeight:   1,
          opacity:      0.6,
          // Hidden on very small viewports via inline display
          // (index.tsx already wraps this in hidden sm:block)
        }}
      >
        {shortcutLabel}
      </span>
    </button>
  );
}
