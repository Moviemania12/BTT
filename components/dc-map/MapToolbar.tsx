"use client";

import { useId } from "react";
import {
  DC_CATEGORY_LABELS,
  DC_CATEGORY_COLORS,
  DC_LEARNING_MODES,
  type DcCategory,
  type DcLearningMode,
} from "./map-data";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/MapToolbar.tsx
//
// The control surface above the map: instant search, learning-mode
// chips (Power / Cooling / Fire / Security / Networking / Monitoring /
// Mechanical / Electrical) and discipline filter toggles. Pure
// controlled component — all state lives in DcMapExperience.
// ═══════════════════════════════════════════════════════════════════════════

const ALL_CATEGORIES = Object.keys(DC_CATEGORY_LABELS) as DcCategory[];

interface MapToolbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  mode: DcLearningMode | null;
  onModeChange: (m: DcLearningMode | null) => void;
  activeCategories: Set<DcCategory>;
  onToggleCategory: (c: DcCategory) => void;
  matchCount: number | null;
}

export default function MapToolbar({
  query,
  onQueryChange,
  mode,
  onModeChange,
  activeCategories,
  onToggleCategory,
  matchCount,
}: MapToolbarProps) {
  const searchId = useId();
  const allActive = activeCategories.size === ALL_CATEGORIES.length;

  return (
    <div className="dcm-toolbar">
      <div className="dcm-toolbar-row">
        <div className="dcm-search">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="dcm-search-icon">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.2 13.2 L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search — UPS, cooling, fiber…"
            aria-label="Search data center components"
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <>
              <span className="dcm-search-count" aria-live="polite" aria-atomic="true">
                {matchCount === null ? "…" : matchCount === 0 ? "No match" : `${matchCount} found`}
              </span>
              <button
                type="button"
                className="dcm-search-clear"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        <div className="dcm-modes" role="group" aria-label="Learning modes">
          <button
            type="button"
            className={`dcm-chip ${mode === null ? "dcm-chip--on" : ""}`}
            aria-pressed={mode === null}
            onClick={() => onModeChange(null)}
          >
            Full Facility
          </button>
          {DC_LEARNING_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`dcm-chip ${mode === m.id ? "dcm-chip--on" : ""}`}
              aria-pressed={mode === m.id}
              onClick={() => onModeChange(mode === m.id ? null : m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dcm-toolbar-row dcm-toolbar-row--filters">
        <span className="dcm-filter-caption">Filters</span>
        <div className="dcm-filters" role="group" aria-label="Discipline filters">
          {ALL_CATEGORIES.map((c) => {
            const on = activeCategories.has(c);
            return (
              <button
                key={c}
                type="button"
                className={`dcm-filter ${on ? "dcm-filter--on" : ""}`}
                aria-pressed={on}
                onClick={() => onToggleCategory(c)}
              >
                <span
                  className="dcm-filter-dot"
                  style={{ backgroundColor: DC_CATEGORY_COLORS[c] }}
                  aria-hidden="true"
                />
                {DC_CATEGORY_LABELS[c]}
              </button>
            );
          })}
        </div>
        {!allActive && (
          <button
            type="button"
            className="dcm-filter-reset"
            onClick={() => ALL_CATEGORIES.forEach((c) => !activeCategories.has(c) && onToggleCategory(c))}
          >
            Show all
          </button>
        )}
      </div>
    </div>
  );
}
