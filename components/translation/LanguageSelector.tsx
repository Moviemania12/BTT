"use client";

// LanguageSelector
// ────────────────
// Searchable language dropdown for article translation.
//
// Stacking context fix: the container div gets position:relative + zIndex:10
// so the dropdown (zIndex:200) appears above the sticky TOC (which creates
// its own stacking context). Without this the dropdown renders behind the TOC.

import { useState, useRef, useEffect, useCallback } from "react";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/languages";

interface Props {
  currentLang: string;
  onSelect: (lang: Language) => void;
  loading: boolean;
}

const ORIGINAL: Language = { code: "en", name: "English (Original)", native: "English" };

export default function LanguageSelector({ currentLang, onSelect, loading }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? SUPPORTED_LANGUAGES.filter(
        l =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.native.toLowerCase().includes(query.toLowerCase()) ||
          l.code.toLowerCase().includes(query.toLowerCase())
      )
    : SUPPORTED_LANGUAGES;

  const current =
    currentLang === "en"
      ? ORIGINAL
      : SUPPORTED_LANGUAGES.find(l => l.code === currentLang) ?? ORIGINAL;

  const handleOpen = useCallback(() => {
    if (loading) return;
    setOpen(true);
    setQuery("");
    // Focus search input after dropdown renders
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [loading]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleSelect = useCallback(
    (lang: Language) => {
      handleClose();
      onSelect(lang);
    },
    [onSelect, handleClose]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, handleClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-block",
        // Creates own stacking context so dropdown appears above sticky TOC
        zIndex: 10,
      }}
    >
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={loading}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select article language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          fontSize: 11,
          fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: open
            ? "rgba(0,212,255,0.12)"
            : "rgba(0,212,255,0.06)",
          border: "1px solid rgba(0,212,255,0.3)",
          color: loading
            ? "rgba(0,212,255,0.4)"
            : "var(--hp-accent, #2563eb)",
          borderRadius: 4,
          cursor: loading ? "wait" : "pointer",
          transition: "background 0.15s, border-color 0.15s",
          whiteSpace: "nowrap",
          lineHeight: 1,
          height: 30,
        }}
      >
        {loading ? (
          <>
            <SpinIcon />
            <span>Translating…</span>
          </>
        ) : (
          <>
            <GlobeIcon />
            <span>
              {current.code === "en" ? "Language" : current.native}
            </span>
          </>
        )}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            width: 290,
            maxHeight: 380,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            // High zIndex inside our stacking context — above sticky TOC
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: "10px 12px",
              borderBottom: "1px solid #f3f4f6",
              background: "#fafafa",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search language…"
              aria-label="Search languages"
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: 5,
                padding: "6px 10px",
                fontSize: 13,
                color: "#111827",
                fontFamily: "var(--font-body, sans-serif)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* List */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {/* English original always at top when not searching */}
            {!query && (
              <LangRow
                lang={ORIGINAL}
                active={currentLang === "en"}
                onSelect={() => handleSelect(ORIGINAL)}
              />
            )}

            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "14px 16px",
                  fontSize: 13,
                  color: "#9ca3af",
                  fontFamily: "var(--font-body, sans-serif)",
                  textAlign: "center",
                }}
              >
                No languages found
              </div>
            ) : (
              filtered.map(l => (
                <LangRow
                  key={l.code}
                  lang={l}
                  active={currentLang === l.code}
                  onSelect={() => handleSelect(l)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Language row ───────────────────────────────────────────────────────────────
function LangRow({
  lang,
  active,
  onSelect,
}: {
  lang: Language;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "9px 14px",
        background: active ? "#eff6ff" : "transparent",
        border: "none",
        borderBottom: "1px solid #f9fafb",
        cursor: "pointer",
        textAlign: "left",
        gap: 8,
      }}
      onMouseEnter={e => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb";
      }}
      onMouseLeave={e => {
        if (!active)
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: "#111827",
          fontFamily: "var(--font-body, sans-serif)",
          fontWeight: active ? 600 : 400,
        }}
      >
        {lang.name}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "#6b7280",
          fontFamily: "var(--font-body, sans-serif)",
          flexShrink: 0,
        }}
      >
        {lang.native}
      </span>
      {active && (
        <span style={{ color: "#2563eb", fontSize: 14, marginLeft: 2, flexShrink: 0 }}>
          ✓
        </span>
      )}
    </button>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────
function GlobeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ animation: "btt-lang-spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes btt-lang-spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-9-9" />
    </svg>
  );
}
