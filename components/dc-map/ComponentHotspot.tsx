"use client";

import { memo, type KeyboardEvent, type MouseEvent } from "react";
import { iso, isoBox, pts, TILE_W, TILE_H } from "./iso";
import { DC_CATEGORY_COLORS, type DcComponentDef } from "./map-data";
import { renderShape } from "./shapes";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/ComponentHotspot.tsx
//
// One interactive equipment node on the map: the isometric artwork
// (delegated to shapes.tsx), an invisible extruded hit area, the label,
// the selection ring, and all interaction wiring — hover, click to open
// the info panel, double-click to focus, Enter/Space for keyboard users.
//
// Visual emphasis states (normal / active / dim) arrive as a prop and
// map to CSS classes; the component holds no state of its own so the
// whole scene stays cheap to re-render.
// ═══════════════════════════════════════════════════════════════════════════

export type NodeEmphasis = "normal" | "active" | "dim";

interface ComponentHotspotProps {
  component: DcComponentDef;
  emphasis: NodeEmphasis;
  selected: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onFocusRequest: (id: string) => void;
}

/** Convex outline of the extruded footprint — the pointer hit area.
 *  Padded to ensure a minimum touch-friendly target on mobile. */
function hitOutline(c: DcComponentDef): string {
  const { x, y, w, d } = c.grid;
  const zb = c.zBase ?? 0;
  // Minimum tile dimension so tiny components (mast, mesh) remain tappable.
  const minW = Math.max(w, 2.2);
  const minD = Math.max(d, 2.2);
  const padW = (minW - w) / 2;
  const padD = (minD - d) / 2;
  const top = zb + Math.max(c.h, 6);
  return pts([
    iso(x - padW, y - padD, top),
    iso(x + w + padW, y - padD, top),
    iso(x + w + padW, y - padD, zb),
    iso(x + w + padW, y + d + padD, zb),
    iso(x - padW, y + d + padD, zb),
    iso(x - padW, y + d + padD, top),
  ]);
}

function ComponentHotspotBase({
  component,
  emphasis,
  selected,
  hovered,
  onHover,
  onSelect,
  onFocusRequest,
}: ComponentHotspotProps) {
  const { x, y, w, d } = component.grid;
  const isHallFloor = component.kind === "floor" && component.id === "server-hall";
  const color = DC_CATEGORY_COLORS[component.category];

  const labelAt = isHallFloor
    ? iso(x + 2.6, y + 3.5)
    : iso(x + w / 2, y + d, component.zBase ?? 0);

  const ringC = iso(x + w / 2, y + d / 2, component.zBase ?? 0);

  const handleClick = (e: MouseEvent<SVGGElement>) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const handleDoubleClick = (e: MouseEvent<SVGGElement>) => {
    e.stopPropagation();
    onFocusRequest(component.id);
  };

  const handleKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(component.id);
      onFocusRequest(component.id);
    }
  };

  const cls = [
    "dcm-node",
    `dcm-node--${emphasis}`,
    hovered ? "dcm-node--hover" : "",
    selected ? "dcm-node--selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g
      data-dcm-node={component.id}
      className={cls}
      role="button"
      tabIndex={0}
      aria-label={`${component.name} — details kholne ke liye select karein`}
      aria-pressed={selected}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => onHover(component.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(component.id)}
      onBlur={() => onHover(null)}
    >
      <g className="dcm-node-art">
        {renderShape(component)}
        {(selected || hovered) && !isHallFloor && (
          <ellipse
            className="dcm-node-ring"
            cx={ringC.x}
            cy={ringC.y}
            rx={Math.max(((w + d) / 2) * TILE_W * 0.84, TILE_W * 1.4)}
            ry={Math.max(((w + d) / 2) * TILE_H * 0.84, TILE_H * 1.4)}
            fill="none"
            stroke={color}
            strokeWidth={selected ? 2 : 1.2}
            strokeDasharray={selected ? undefined : "4 3"}
            opacity={selected ? 1 : 0.85}
          />
        )}
      </g>

      {isHallFloor ? (
        <polygon
          className="dcm-node-hit"
          points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])}
          fill="transparent"
        />
      ) : (
        <polygon className="dcm-node-hit" points={hitOutline(component)} fill="transparent" />
      )}

      <text
        className="dcm-node-label"
        x={labelAt.x}
        y={labelAt.y + (isHallFloor ? 0 : 11)}
        textAnchor="middle"
      >
        {component.label}
      </text>
    </g>
  );
}

const ComponentHotspot = memo(ComponentHotspotBase);
export default ComponentHotspot;
