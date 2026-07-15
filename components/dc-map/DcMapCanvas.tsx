"use client";

import { Fragment, memo, useMemo } from "react";
import { iso, isoBox, isoPath, isoZone, pts } from "./iso";
import {
  DC_COMPONENTS,
  DC_EDGES,
  DC_SYSTEM_COLORS,
  DC_ZONES,
  type DcEdgeDef,
} from "./map-data";
import ComponentHotspot, { type NodeEmphasis } from "./ComponentHotspot";
import type { WorldRect } from "./MapViewport";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/DcMapCanvas.tsx
//
// The isometric scene renderer — and deliberately the ONLY file that
// knows the facility is drawn as SVG. It composes, in painter's order:
//
//   ground zones → building walls & scenery → ground-level system
//   routes → equipment nodes (depth-sorted) → elevated routes
//   (busway / overhead trays) → zone captions
//
// All geometry is precomputed once at module load from map-data.ts;
// per-frame interaction never rebuilds paths. Emphasis (highlight /
// dim), flow animation gating and selection arrive as props from
// DcMapExperience and map onto CSS classes in dc-map.css.
//
// Replacing this renderer with Three.js later means swapping this file
// (and shapes.tsx) — data, viewport, panel and toolbar stay untouched.
// ═══════════════════════════════════════════════════════════════════════════

// ─── World bounds (consumed by MapViewport + Minimap) ────────────────────────

const GRID_W = 66;
const GRID_D = 48;

export const DC_WORLD: WorldRect = (() => {
  const corners = [iso(0, 0), iso(GRID_W, 0), iso(GRID_W, GRID_D), iso(0, GRID_D)];
  const xs = corners.map((p) => p.x);
  const ys = corners.map((p) => p.y);
  const minX = Math.min(...xs) - 30;
  const maxX = Math.max(...xs) + 30;
  const minY = Math.min(...ys) - 96; // headroom for the pylon + labels
  const maxY = Math.max(...ys) + 34;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
})();

// ─── Static scenery geometry (computed once) ─────────────────────────────────

const ZONE_FILL: Record<string, string> = {
  site: "#f4f6f9",
  pad: "#e9edf2",
  slab: "#eef1f5",
  hall: "#e7ebf1",
  room: "#f2f5f9",
  lawn: "#e3efe3",
  road: "#dde2e8",
};

const ZONE_STROKE: Record<string, string> = {
  site: "#d3dbe4",
  pad: "#c9d2dc",
  slab: "#c9d2dc",
  hall: "#c2ccd8",
  room: "#d6dee7",
  lawn: "#c8dfc8",
  road: "#c4cbd4",
};

interface TreeSpec {
  x: number;
  y: number;
  s: number;
}

const TREES: TreeSpec[] = [
  { x: 2.2, y: 6.6, s: 1 },
  { x: 4.9, y: 6.1, s: 0.8 },
  { x: 12.8, y: 6.7, s: 0.9 },
  { x: 18.6, y: 6.6, s: 1.05 },
  { x: 25.4, y: 6.9, s: 0.85 },
  { x: 63.9, y: 11.4, s: 1 },
  { x: 64.3, y: 17.8, s: 0.85 },
  { x: 63.8, y: 24.6, s: 1.05 },
  { x: 64.2, y: 31.2, s: 0.9 },
  { x: 2, y: 38.7, s: 0.95 },
  { x: 26.6, y: 44.9, s: 0.9 },
  { x: 34, y: 44.6, s: 1 },
  { x: 45.6, y: 44.9, s: 0.85 },
  { x: 62.6, y: 39.6, s: 0.9 },
];

function Tree({ x, y, s }: TreeSpec) {
  const b = iso(x, y);
  return (
    <g>
      <ellipse cx={b.x} cy={b.y + 1} rx={7 * s} ry={3.2 * s} fill="#0f172a" opacity="0.06" />
      <path d={`M ${b.x} ${b.y} l 0 ${-7 * s}`} stroke="#8d7355" strokeWidth={1.6 * s} />
      <ellipse cx={b.x} cy={b.y - 11 * s} rx={6.4 * s} ry={5.6 * s} fill="#7fb98a" />
      <ellipse cx={b.x - 2.2 * s} cy={b.y - 13 * s} rx={4.4 * s} ry={3.8 * s} fill="#98cba1" />
    </g>
  );
}

/** Building shell: back walls of the main slab (cutaway view). */
function BuildingWalls() {
  const H = 30;
  const north = isoBox(4, 10.68, 54, 0.34, H);
  const west = isoBox(3.68, 11, 0.34, 29, H);
  // glass band on each visible wall face
  const bandN = pts([
    iso(5.2, 11.02, H * 0.42),
    iso(57.4, 11.02, H * 0.42),
    iso(57.4, 11.02, H * 0.68),
    iso(5.2, 11.02, H * 0.68),
  ]);
  const bandW = pts([
    iso(4.02, 12.2, H * 0.42),
    iso(4.02, 39.4, H * 0.42),
    iso(4.02, 39.4, H * 0.68),
    iso(4.02, 12.2, H * 0.68),
  ]);
  return (
    <g>
      {[west, north].map((b, i) => (
        <g key={i}>
          <polygon points={b.left} fill="#e7ecf2" stroke="#b6c2cf" strokeWidth="0.8" />
          <polygon points={b.right} fill="#d5dde6" stroke="#b6c2cf" strokeWidth="0.8" />
          <polygon points={b.top} fill="#f3f6f9" stroke="#b6c2cf" strokeWidth="0.8" />
        </g>
      ))}
      <polygon points={bandN} fill="#cfe0ef" opacity="0.75" />
      <polygon points={bandW} fill="#c4d8ea" opacity="0.75" />
    </g>
  );
}

/** Faint isometric tile grid inside the server hall. */
function HallGrid() {
  const lines = [];
  for (let gx = 21; gx < 44; gx += 2) {
    const a = iso(gx, 12);
    const b = iso(gx, 33.4);
    lines.push(<path key={`x${gx}`} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} />);
  }
  for (let gy = 14; gy < 33.4; gy += 2) {
    const a = iso(19, gy);
    const b = iso(44, gy);
    lines.push(<path key={`y${gy}`} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} />);
  }
  return (
    <g stroke="#d5dce6" strokeWidth="0.5" opacity="0.85">
      {lines}
    </g>
  );
}

function Scenery() {
  const fence = pts([iso(0.35, 0.35), iso(65.65, 0.35), iso(65.65, 47.65), iso(0.35, 47.65)]);
  const roadA = iso(0, 47.3);
  const roadB = iso(66, 47.3);
  const gateA = iso(31.4, 46.6);
  const gateB = iso(34.6, 46.6);
  return (
    <g>
      <polygon points={fence} fill="none" stroke="#b7c3d0" strokeWidth="1" strokeDasharray="3 3" />
      <path d={`M ${roadA.x} ${roadA.y} L ${roadB.x} ${roadB.y}`} stroke="#ffffff" strokeWidth="1.2" strokeDasharray="8 7" opacity="0.9" />
      {/* site gate posts on the road edge */}
      {[gateA, gateB].map((p, i) => (
        <g key={i}>
          <path d={`M ${p.x} ${p.y} l 0 -8`} stroke="#8a99ab" strokeWidth="2" />
          <circle cx={p.x} cy={p.y - 9} r="1.4" fill="#f6b73c" stroke="#a9761a" strokeWidth="0.5" />
        </g>
      ))}
      {TREES.map((t, i) => (
        <Tree key={i} {...t} />
      ))}
    </g>
  );
}

// ─── Precomputed edge + node geometry ────────────────────────────────────────

interface BuiltEdge {
  def: DcEdgeDef;
  d: string;
  color: string;
  elevated: boolean;
}

const BUILT_EDGES: BuiltEdge[] = DC_EDGES.map((e) => ({
  def: e,
  d: isoPath(e.waypoints, e.z ?? 3, 7),
  color: DC_SYSTEM_COLORS[e.system],
  elevated: (e.z ?? 3) >= 16,
}));

const SORTED_COMPONENTS = [...DC_COMPONENTS].sort((a, b) => {
  const da = a.grid.x + a.grid.w + a.grid.y + a.grid.d + (a.zBase ?? 0) * 0.2;
  const db = b.grid.x + b.grid.w + b.grid.y + b.grid.d + (b.zBase ?? 0) * 0.2;
  return da - db;
});

const ZONE_LABELS = DC_ZONES.filter((z) => z.label && z.id !== "z-hall").map((z) => ({
  label: z.label as string,
  at: iso(z.grid.x + 1.2, z.grid.y + 1),
}));

// ─── Edge state (from the experience orchestrator) ───────────────────────────

export type EdgeEmphasis = "normal" | "active" | "dim";

export interface EdgeState {
  emphasis: EdgeEmphasis;
  animate: boolean;
  visible: boolean;
}

interface DcMapCanvasProps {
  nodeEmphasis: Record<string, NodeEmphasis>;
  edgeState: Record<string, EdgeState>;
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onFocusRequest: (id: string) => void;
}

function EdgeGroup({ edges, state }: { edges: BuiltEdge[]; state: Record<string, EdgeState> }) {
  return (
    <g>
      {edges.map(({ def, d, color }) => {
        const s = state[def.id];
        if (!s || !s.visible) return null;
        return (
          <g key={def.id} className={`dcm-edge dcm-edge--${s.emphasis}`}>
            <path className="dcm-edge-casing" d={d} stroke="#ffffff" fill="none" />
            <path className="dcm-edge-base" d={d} stroke={color} fill="none" />
            {s.animate && (
              <path
                className="dcm-edge-flow"
                d={d}
                stroke={color}
                fill="none"
                style={{ animationDuration: `${def.system === "network" ? 1.6 : 2.6}s` }}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

function DcMapCanvasBase({
  nodeEmphasis,
  edgeState,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
  onFocusRequest,
}: DcMapCanvasProps) {
  const groundEdges = useMemo(() => BUILT_EDGES.filter((e) => !e.elevated), []);
  const elevatedEdges = useMemo(() => BUILT_EDGES.filter((e) => e.elevated), []);

  return (
    <g className="dcm-scene">
      {/* ground zones */}
      {DC_ZONES.map((z) => (
        <polygon
          key={z.id}
          points={isoZone(z.grid.x, z.grid.y, z.grid.w, z.grid.d)}
          fill={ZONE_FILL[z.tone]}
          stroke={ZONE_STROKE[z.tone]}
          strokeWidth={z.tone === "site" ? 1.2 : 0.7}
        />
      ))}

      <HallGrid />
      <Scenery />
      <BuildingWalls />

      {/* ground-level system routes */}
      <EdgeGroup edges={groundEdges} state={edgeState} />

      {/* equipment nodes in painter's order */}
      {SORTED_COMPONENTS.map((c) => (
        <ComponentHotspot
          key={c.id}
          component={c}
          emphasis={nodeEmphasis[c.id] ?? "normal"}
          selected={selectedId === c.id}
          hovered={hoveredId === c.id}
          onHover={onHover}
          onSelect={onSelect}
          onFocusRequest={onFocusRequest}
        />
      ))}

      {/* elevated routes: busway runs + overhead network trays */}
      <EdgeGroup edges={elevatedEdges} state={edgeState} />

      {/* zone captions */}
      {ZONE_LABELS.map((z) => (
        <Fragment key={z.label}>
          <text className="dcm-zone-label" x={z.at.x} y={z.at.y}>
            {z.label}
          </text>
        </Fragment>
      ))}
    </g>
  );
}

const DcMapCanvas = memo(DcMapCanvasBase);
export default DcMapCanvas;
