"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import MapViewport, { type MapViewportHandle } from "./MapViewport";
import DcMapCanvas, { DC_WORLD, type EdgeState } from "./DcMapCanvas";
import MapToolbar from "./MapToolbar";
import InfoPanel from "./InfoPanel";
import DcMapLegend from "./DcMapLegend";
import Minimap from "./Minimap";
import { iso } from "./iso";
import {
  DC_COMPONENTS,
  DC_COMPONENT_INDEX,
  DC_EDGES,
  DC_LEARNING_MODES,
  DC_NEIGHBORS,
  DC_CATEGORY_LABELS,
  searchComponents,
  type DcCategory,
  type DcLearningMode,
} from "./map-data";
import type { NodeEmphasis } from "./ComponentHotspot";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/DcMapExperience.tsx
//
// The stateful brain of the Interactive Data Center Map. Owns every
// piece of UI state — selection, hover, learning mode, discipline
// filters, search query — derives per-node and per-edge emphasis from
// them, and wires the toolbar, canvas, viewport, legend, minimap,
// tooltip and info panel together.
//
// Emphasis rules (in priority order):
//   1. Discipline filter off        → component dimmed everywhere
//   2. Search query active          → matches highlighted, rest faded
//   3. Learning mode active         → that system highlighted + animated
//   4. Hover / selection            → node + direct connections lifted
//   5. Otherwise                    → calm default, all flows animating
// ═══════════════════════════════════════════════════════════════════════════

const ALL_CATEGORY_IDS = Object.keys(DC_CATEGORY_LABELS) as DcCategory[];

export default function DcMapExperience() {
  const viewportRef = useRef<MapViewportHandle | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mode, setMode] = useState<DcLearningMode | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<DcCategory>>(
    () => new Set(ALL_CATEGORY_IDS)
  );

  // ── Derived: which component ids the current learning mode covers ──
  const modeSet = useMemo(() => {
    if (!mode) return null;
    const def = DC_LEARNING_MODES.find((m) => m.id === mode);
    if (!def) return null;
    const ids = new Set<string>();
    for (const c of DC_COMPONENTS) {
      if (def.system && c.systems.includes(def.system)) ids.add(c.id);
      if (def.category && c.category === def.category) ids.add(c.id);
    }
    return ids;
  }, [mode]);

  const modeSystem = useMemo(
    () => (mode ? DC_LEARNING_MODES.find((m) => m.id === mode)?.system ?? null : null),
    [mode]
  );

  // Debounce search so the scene doesn't recompute on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 120);
    return () => clearTimeout(t);
  }, [query]);

  const searchHits = useMemo(
    () => (debouncedQuery.trim() ? searchComponents(debouncedQuery) : null),
    [debouncedQuery]
  );

  // ── Derived: per-node emphasis ──
  const nodeEmphasis = useMemo(() => {
    const out: Record<string, NodeEmphasis> = {};
    const focusId = hoveredId ?? selectedId;
    const neighbors = focusId ? new Set(DC_NEIGHBORS[focusId] ?? []) : null;

    for (const c of DC_COMPONENTS) {
      if (!activeCategories.has(c.category)) {
        out[c.id] = "dim";
        continue;
      }
      if (searchHits) {
        out[c.id] = searchHits.has(c.id) ? "active" : "dim";
        continue;
      }
      if (modeSet) {
        out[c.id] = modeSet.has(c.id) ? "active" : "dim";
        continue;
      }
      if (focusId) {
        out[c.id] = c.id === focusId || neighbors?.has(c.id) ? "active" : "normal";
        continue;
      }
      out[c.id] = "normal";
    }
    return out;
  }, [activeCategories, searchHits, modeSet, hoveredId, selectedId]);

  // ── Derived: per-edge visibility / emphasis / animation ──
  const edgeState = useMemo(() => {
    const out: Record<string, EdgeState> = {};
    const focusId = hoveredId ?? selectedId;
    const calm = !searchHits && !modeSet;

    for (const e of DC_EDGES) {
      const fromE = nodeEmphasis[e.from];
      const toE = nodeEmphasis[e.to];
      const touchesFocus = focusId !== null && (e.from === focusId || e.to === focusId);

      const visible =
        !e.modeOnly || modeSystem === e.system || touchesFocus;

      let emphasis: EdgeState["emphasis"];
      if (fromE === "dim" || toE === "dim") emphasis = "dim";
      else if (modeSystem) emphasis = e.system === modeSystem ? "active" : "dim";
      else if (modeSet) emphasis = "active"; // category mode: both ends qualified
      else if (searchHits) emphasis = "active"; // both ends matched the search
      else if (touchesFocus) emphasis = "active";
      else emphasis = "normal";

      const animate =
        visible &&
        e.flow === true &&
        (emphasis === "active" || (calm && emphasis === "normal"));

      out[e.id] = { emphasis, animate, visible };
    }
    return out;
  }, [nodeEmphasis, modeSystem, modeSet, searchHits, hoveredId, selectedId]);

  // ── Tooltip: imperative positioning so it tracks 60fps pan/zoom ──
  const positionTooltip = useCallback(() => {
    const el = tooltipRef.current;
    const handle = viewportRef.current;
    const id = hoveredRef.current;
    if (!el) return;
    if (!id || !handle) {
      el.style.opacity = "0";
      return;
    }
    const c = DC_COMPONENT_INDEX[id];
    const v = handle.getView();
    const anchor = iso(
      c.grid.x + c.grid.w / 2,
      c.grid.y + c.grid.d / 2,
      (c.zBase ?? 0) + c.h
    );
    const px = anchor.x * v.scale + v.tx;
    const py = anchor.y * v.scale + v.ty;
    el.style.opacity = "1";
    el.style.transform = `translate(${Math.round(px)}px, ${Math.round(py)}px) translate(-50%, calc(-100% - 12px))`;
  }, []);

  useEffect(() => {
    hoveredRef.current = hoveredId;
    positionTooltip();
  }, [hoveredId, positionTooltip]);

  useEffect(() => {
    const handle = viewportRef.current;
    if (!handle) return;
    return handle.subscribe(() => positionTooltip());
  }, [positionTooltip]);

  // ── Actions ──
  const focusComponent = useCallback((id: string) => {
    const c = DC_COMPONENT_INDEX[id];
    if (!c) return;
    const center = iso(
      c.grid.x + c.grid.w / 2,
      c.grid.y + c.grid.d / 2,
      ((c.zBase ?? 0) + c.h) / 2
    );
    viewportRef.current?.focusWorldPoint(center.x, center.y);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleSelectRelated = useCallback(
    (id: string) => {
      setSelectedId(id);
      focusComponent(id);
    },
    [focusComponent]
  );

  const handleToggleCategory = useCallback((c: DcCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }, []);

  const handleStageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      if (selectedId) setSelectedId(null);
      else if (mode) setMode(null);
    }
  };

  const hovered = hoveredId ? DC_COMPONENT_INDEX[hoveredId] : null;

  return (
    <div className="dcm-experience" data-homepage-theme="light">
      <MapToolbar
        query={query}
        onQueryChange={setQuery}
        mode={mode}
        onModeChange={setMode}
        activeCategories={activeCategories}
        onToggleCategory={handleToggleCategory}
        matchCount={searchHits ? searchHits.size : debouncedQuery.trim() ? 0 : null}
      />

      <div className="dcm-stage" onKeyDown={handleStageKeyDown}>
        <MapViewport
          ref={viewportRef}
          world={DC_WORLD}
          onBackgroundClick={() => setSelectedId(null)}
          ariaLabel="Interactive data center map. Arrow keys pan, plus and minus zoom, Tab moves between components."
        >
          <DcMapCanvas
            nodeEmphasis={nodeEmphasis}
            edgeState={edgeState}
            hoveredId={hoveredId}
            selectedId={selectedId}
            onHover={setHoveredId}
            onSelect={handleSelect}
            onFocusRequest={focusComponent}
          />
        </MapViewport>

        {/* zoom controls */}
        <div className="dcm-controls" role="group" aria-label="Map zoom controls">
          <button type="button" onClick={() => viewportRef.current?.zoomBy(1.25)} aria-label="Zoom in">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4 V16 M4 10 H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button type="button" onClick={() => viewportRef.current?.zoomBy(1 / 1.25)} aria-label="Zoom out">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10 H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button type="button" onClick={() => viewportRef.current?.reset()} aria-label="Reset view">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8 A6.5 6.5 0 1 1 5.4 14.6 M4 8 V4 M4 8 H8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <DcMapLegend />
        <Minimap viewportRef={viewportRef} />

        {/* hover tooltip — always mounted so opacity transition works,
             hidden when showing panel for same component */}
        <div
          ref={tooltipRef}
          className={[
            "dcm-tooltip",
            hoveredId && hoveredId === selectedId ? "dcm-tooltip--hidden" : "",
          ].filter(Boolean).join(" ")}
          aria-hidden="true"
        >
          {hovered && (
            <>
              <strong>{hovered.label}</strong>
              <span>{DC_CATEGORY_LABELS[hovered.category]} · Click to explore</span>
            </>
          )}
        </div>

        <InfoPanel
          componentId={selectedId}
          onClose={() => setSelectedId(null)}
          onSelectRelated={handleSelectRelated}
        />
      </div>

      <p className="dcm-hint">
        Drag to pan · Scroll or pinch to zoom · Double-click any equipment to focus ·{" "}
        <kbd>Tab</kbd> + <kbd>Enter</kbd> for keyboard exploration · <kbd>Esc</kbd> closes the panel
      </p>
    </div>
  );
}
