"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { isoZone } from "./iso";
import { DC_COMPONENTS, DC_ZONES, DC_CATEGORY_COLORS } from "./map-data";
import { DC_WORLD } from "./DcMapCanvas";
import type { MapViewportHandle, ViewTransform } from "./MapViewport";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/Minimap.tsx
//
// Always-on overview in the corner of the map: a simplified footprint
// of the whole facility, a live rectangle showing the current viewport,
// and click-to-navigate. Subscribes to MapViewport's imperative view
// stream, so it stays in sync during 60fps panning without re-rendering
// the main scene.
// ═══════════════════════════════════════════════════════════════════════════

interface MinimapProps {
  viewportRef: React.RefObject<MapViewportHandle | null>;
}

const FOOTPRINTS = DC_COMPONENTS.filter((c) => c.kind !== "floor").map((c) => ({
  id: c.id,
  points: isoZone(c.grid.x, c.grid.y, c.grid.w, c.grid.d),
  color: DC_CATEGORY_COLORS[c.category],
}));

const BASE_ZONES = DC_ZONES.filter((z) => ["site", "slab", "hall"].includes(z.tone)).map((z) => ({
  id: z.id,
  tone: z.tone,
  points: isoZone(z.grid.x, z.grid.y, z.grid.w, z.grid.d),
}));

const TONE: Record<string, string> = { site: "#eef1f6", slab: "#e2e7ee", hall: "#d8dfe9" };

export default function Minimap({ viewportRef }: MinimapProps) {
  const [view, setView] = useState<ViewTransform | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const handle = viewportRef.current;
    if (!handle) return;
    return handle.subscribe(setView);
  }, [viewportRef]);

  // Visible world rect derived from the live transform.
  const rect =
    view && view.cw > 0
      ? {
          x: -view.tx / view.scale,
          y: -view.ty / view.scale,
          w: view.cw / view.scale,
          h: view.ch / view.scale,
        }
      : null;

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const handle = viewportRef.current;
    if (!svg || !handle) return;
    const box = svg.getBoundingClientRect();
    const wx = DC_WORLD.x + ((e.clientX - box.left) / box.width) * DC_WORLD.w;
    const wy = DC_WORLD.y + ((e.clientY - box.top) / box.height) * DC_WORLD.h;
    handle.focusWorldPoint(wx, wy, handle.getView().scale);
  };

  return (
    <div className="dcm-minimap" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox={`${DC_WORLD.x} ${DC_WORLD.y} ${DC_WORLD.w} ${DC_WORLD.h}`}
        onClick={handleClick}
      >
        {BASE_ZONES.map((z) => (
          <polygon key={z.id} points={z.points} fill={TONE[z.tone]} stroke="#c8d1dc" strokeWidth="3" />
        ))}
        {FOOTPRINTS.map((f) => (
          <polygon key={f.id} points={f.points} fill={f.color} opacity="0.55" />
        ))}
        {rect && (
          <rect
            className="dcm-minimap-view"
            x={rect.x}
            y={rect.y}
            width={rect.w}
            height={rect.h}
            fill="rgba(21,94,239,0.08)"
            stroke="#155eef"
            strokeWidth="8"
            rx="10"
          />
        )}
        {/* invisible click target across the full world */}
        <rect
          x={DC_WORLD.x}
          y={DC_WORLD.y}
          width={DC_WORLD.w}
          height={DC_WORLD.h}
          fill="transparent"
        />
      </svg>
    </div>
  );
}
