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
import { ShapeDefs } from "./shapes";
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
  { x: 1.7, y: 10.8, s: 0.9 },
  { x: 2.1, y: 15.6, s: 1 },
  { x: 1.8, y: 20.4, s: 0.85 },
  { x: 2.2, y: 25.2, s: 1.05 },
  { x: 1.8, y: 30.1, s: 0.9 },
  { x: 2.1, y: 35, s: 0.95 },
  { x: 65.1, y: 9.4, s: 0.85 },
  { x: 65.3, y: 34.6, s: 0.9 },
  { x: 60, y: 8.9, s: 0.8 },
  { x: 2, y: 38.7, s: 0.95 },
  { x: 33.6, y: 44.9, s: 0.9 },
  { x: 41.2, y: 40.9, s: 0.8 },
  { x: 46.5, y: 44.8, s: 0.85 },
  { x: 26.6, y: 44.9, s: 0.9 },
  { x: 61.6, y: 41.4, s: 0.95 },
  { x: 63.8, y: 43.1, s: 0.85 },
  { x: 62.4, y: 45.2, s: 0.9 },
  { x: 17.2, y: 44.9, s: 0.8 },
  { x: 5.3, y: 44.6, s: 0.85 },
  { x: 44.3, y: 41.1, s: 0.75 },
  { x: 64.9, y: 6.2, s: 0.8 },
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
    <g className="dcm-static">
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
    <g className="dcm-static" stroke="#d5dce6" strokeWidth="0.5" opacity="0.85">
      {lines}
    </g>
  );
}

function Car({ x, y, tint }: { x: number; y: number; tint: string }) {
  const body = isoBox(x, y, 2.25, 1.45, 2.1, 0.55);
  const cab = pts([
    iso(x + 0.55, y + 0.12, 2.65),
    iso(x + 1.75, y + 0.12, 2.65),
    iso(x + 1.75, y + 1.33, 2.65),
    iso(x + 0.55, y + 1.33, 2.65),
  ]);
  return (
    <g>
      <ellipse cx={iso(x + 1.1, y + 0.75).x} cy={iso(x + 1.1, y + 0.75).y} rx="9" ry="4" fill="#0f172a" opacity="0.08" />
      <polygon points={body.left} fill={tint} stroke="#8a97a6" strokeWidth="0.6" />
      <polygon points={body.right} fill="#c8d2dd" stroke="#8a97a6" strokeWidth="0.6" />
      <polygon points={body.top} fill="#eef2f7" stroke="#8a97a6" strokeWidth="0.6" />
      <polygon points={cab} fill="#a9c6e2" opacity="0.85" />
      {[0.45, 1.8].map((t) => {
        const p = iso(x + t, y + 1.5, 0.35);
        return <ellipse key={t} cx={p.x} cy={p.y} rx="1.5" ry="0.85" fill="#334155" />;
      })}
    </g>
  );
}

function Crate({ x, y, s, z = 0, dark = false }: { x: number; y: number; s: number; z?: number; dark?: boolean }) {
  const p = dark
    ? { top: "#cba578", left: "#b8905f", right: "#9d7748", stroke: "#7d5c33" }
    : { top: "#e0bd8e", left: "#cda772", right: "#b28d56", stroke: "#8a6a3d" };
  const b = isoBox(x, y, s, s, s * 1.7, z);
  return (
    <g>
      <polygon points={b.left} fill={p.left} stroke={p.stroke} strokeWidth="0.5" />
      <polygon points={b.right} fill={p.right} stroke={p.stroke} strokeWidth="0.5" />
      <polygon points={b.top} fill={p.top} stroke={p.stroke} strokeWidth="0.5" />
      <path
        d={`M ${iso(x, y + s, z + s * 0.85).x} ${iso(x, y + s, z + s * 0.85).y} L ${iso(x + s, y + s, z + s * 0.85).x} ${iso(x + s, y + s, z + s * 0.85).y}`}
        stroke={p.stroke}
        strokeWidth="0.45"
        opacity="0.7"
      />
    </g>
  );
}

const GRAVEL: Array<[number, number]> = [
  [6.9, 2.3], [8.1, 4.9], [9.4, 2.1], [10.6, 4.2], [11.8, 2.6], [7.6, 3.7],
  [12.4, 4.8], [9.9, 5.3], [11.1, 3.3], [6.6, 5.1], [12.9, 2.9], [8.8, 3.1],
  [28.9, 6.1], [31.4, 6.4], [34.2, 6], [36.8, 6.3], [39.5, 6.1], [42.1, 6.4],
  [30.1, 1.5], [35.4, 1.4], [40.8, 1.5],
];

function Scenery() {
  const fence = pts([iso(0.35, 0.35), iso(65.65, 0.35), iso(65.65, 47.65), iso(0.35, 47.65)]);
  const roadA = iso(0, 47.3);
  const roadB = iso(66, 47.3);
  const gateA = iso(31.4, 46.6);
  const gateB = iso(34.6, 46.6);
  // parking drive centreline + bays
  const bays = Array.from({ length: 8 }).map((_, i) => 11.4 + i * 2.62);
  return (
    <g className="dcm-static">
      {/* internal paving: gate spur, service road (east), parking drive */}
      <polygon points={isoZone(31.1, 40.7, 3.8, 5.9)} fill="#dde2e8" stroke="#c4cbd4" strokeWidth="0.7" />
      <polygon points={isoZone(58.35, 8.8, 2, 37.8)} fill="#dde2e8" stroke="#c4cbd4" strokeWidth="0.7" />
      <path
        d={`M ${iso(33, 41.2).x} ${iso(33, 41.2).y} L ${iso(33, 46.4).x} ${iso(33, 46.4).y}`}
        stroke="#ffffff" strokeWidth="1" strokeDasharray="6 6" opacity="0.9"
      />
      <path
        d={`M ${iso(59.35, 9.4).x} ${iso(59.35, 9.4).y} L ${iso(59.35, 46.2).x} ${iso(59.35, 46.2).y}`}
        stroke="#ffffff" strokeWidth="1" strokeDasharray="6 6" opacity="0.9"
      />
      {/* zebra crossing at the gate */}
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon
          key={i}
          points={isoZone(31.5 + i * 0.62, 45.4, 0.34, 1.1)}
          fill="#ffffff"
          opacity="0.85"
        />
      ))}
      {/* gatehouse + barrier arm */}
      <g>
        {(() => {
          const b = isoBox(35.15, 44.55, 1.5, 1.3, 6.5);
          const win = iso(35.9, 45.85, 3.6);
          const armA = iso(35.1, 44.4, 3);
          const armB = iso(31.4, 44.4, 3);
          return (
            <>
              <polygon points={b.left} fill="#e7ecf2" stroke="#9aa9ba" strokeWidth="0.7" />
              <polygon points={b.right} fill="#d5dde6" stroke="#9aa9ba" strokeWidth="0.7" />
              <polygon points={b.top} fill="#f3f6f9" stroke="#9aa9ba" strokeWidth="0.7" />
              <rect x={win.x - 2.2} y={win.y - 1.6} width="4.4" height="3" rx="0.4" fill="#bfdbfe" opacity="0.8" />
              <path d={`M ${armA.x} ${armA.y} L ${armB.x} ${armB.y}`} stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round" />
              {[0.15, 0.45, 0.75].map((t) => (
                <path
                  key={t}
                  d={`M ${armA.x + (armB.x - armA.x) * t} ${armA.y + (armB.y - armA.y) * t} l ${(armB.x - armA.x) * 0.12} ${(armB.y - armA.y) * 0.12}`}
                  stroke="#dc3545" strokeWidth="1.6" strokeLinecap="round"
                />
              ))}
            </>
          );
        })()}
      </g>
      {/* parking bays + cars */}
      {bays.map((by, i) => (
        <g key={i} stroke="#ffffff" strokeWidth="0.8" opacity="0.9" fill="none">
          <path d={`M ${iso(62.3, by).x} ${iso(62.3, by).y} L ${iso(65.15, by).x} ${iso(65.15, by).y}`} />
          {i === bays.length - 1 && (
            <path d={`M ${iso(62.3, by + 2.62).x} ${iso(62.3, by + 2.62).y} L ${iso(65.15, by + 2.62).x} ${iso(65.15, by + 2.62).y}`} />
          )}
        </g>
      ))}
      <Car x={62.6} y={12.1} tint="#dbe4ee" />
      <Car x={62.6} y={17.35} tint="#e8d8d8" />
      <Car x={62.6} y={22.6} tint="#d6e2d6" />
      <Car x={62.6} y={27.85} tint="#dde3ec" />
      {/* staging crates */}
      <Crate x={35.1} y={42} s={1.2} />
      <Crate x={36.7} y={42.2} s={1.05} dark />
      <Crate x={35.4} y={43.7} s={1.15} dark />
      <Crate x={37} y={43.9} s={0.95} />
      <Crate x={38.3} y={42.4} s={1.1} />
      <Crate x={35.35} y={42.15} s={0.95} z={2.05} dark />
      <Crate x={38.5} y={44.1} s={0.85} />
      {/* hedges along the building's south face + office frontage */}
      {[5.6, 7.7, 9.8, 11.9, 14, 16.1].map((hx) => {
        const p = iso(hx, 40.35);
        return <ellipse key={hx} cx={p.x} cy={p.y - 2} rx="7" ry="3.4" fill="#8cc096" stroke="#5f9e77" strokeWidth="0.5" />;
      })}
      {[25.9, 27.4].map((hx) => {
        const p = iso(hx, 41.5);
        return <ellipse key={hx} cx={p.x} cy={p.y - 2} rx="6" ry="3" fill="#98cba1" stroke="#5f9e77" strokeWidth="0.5" />;
      })}
      {/* gravel texture in the switchyard + DG pad */}
      {GRAVEL.map(([gx, gy], i) => {
        const p = iso(gx, gy);
        return <circle key={i} cx={p.x} cy={p.y} r="0.55" fill="#c3cdd8" opacity="0.9" />;
      })}
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

// ─── Interior partition walls ────────────────────────────────────────────────
// Thin room-forming walls (h=11, lighter than the 30-unit shell) with door
// gaps, depth-merged with the equipment nodes so occlusion stays correct.
// Purely visual: pointer-events disabled via .dcm-static.

interface WallSpec { x: number; y: number; w: number; d: number }
const WT = 0.28; // wall thickness
const WH = 11;   // wall height

const DC_WALLS_RAW: WallSpec[] = [
  // West electrical wing — corridor wall (door per room)
  { x: 16.3, y: 11.5, w: WT, d: 4.6 },
  { x: 16.3, y: 17.3, w: WT, d: 3.8 },
  { x: 16.3, y: 22.3, w: WT, d: 3.8 },
  { x: 16.3, y: 27.3, w: WT, d: 3.8 },
  { x: 16.3, y: 32.3, w: WT, d: 1 },
  // West wing — room dividers (LT / UPS / Battery / STS)
  { x: 4.4, y: 16.55, w: 9, d: WT },
  { x: 4.4, y: 21.55, w: 9, d: WT },
  { x: 4.4, y: 26.55, w: 9, d: WT },
  { x: 4.4, y: 31.55, w: 9, d: WT },
  // Server hall — west wall (door at the PDU)
  { x: 18.62, y: 11.5, w: WT, d: 8.9 },
  { x: 18.62, y: 23.6, w: WT, d: 9.7 },
  // Server hall — east wall (service door)
  { x: 44, y: 11.5, w: WT, d: 16.1 },
  { x: 44, y: 29.2, w: WT, d: 4.1 },
  // Server hall — south wall (door to operations corridor)
  { x: 18.62, y: 33.45, w: 5.78, d: WT },
  { x: 26.2, y: 33.45, w: 18.08, d: WT },
  // East network wing — west wall (service corridor door)
  { x: 45.42, y: 11.5, w: WT, d: 2.7 },
  { x: 45.42, y: 15.6, w: WT, d: 19.3 },
  // East wing — east wall (door to Parking)
  { x: 57.62, y: 11.5, w: WT, d: 11.1 },
  { x: 57.62, y: 24.2, w: WT, d: 10.7 },
  // East wing — room dividers (MMR / Core / Distribution / SAN / Backup)
  { x: 45.7, y: 16.5, w: 9.9, d: WT },
  { x: 45.7, y: 21.1, w: 9.9, d: WT },
  { x: 45.7, y: 25.7, w: 9.9, d: WT },
  { x: 45.7, y: 30.3, w: 9.9, d: WT },
  { x: 45.7, y: 35.05, w: 11.64, d: WT },
  // South operations wing — north wall (four corridor doors)
  { x: 4.4, y: 34.05, w: 4.2, d: WT },
  { x: 10, y: 34.05, w: 9.6, d: WT },
  { x: 21, y: 34.05, w: 11.6, d: WT },
  { x: 34, y: 34.05, w: 7.4, d: WT },
  { x: 42.8, y: 34.05, w: 6.1, d: WT },
  // South wing — room dividers
  { x: 11.2, y: 34.3, w: WT, d: 4.8 },
  { x: 14.95, y: 34.3, w: WT, d: 4.8 },
  { x: 17.9, y: 34.3, w: WT, d: 4.8 },
  { x: 21.6, y: 34.3, w: WT, d: 4.8 },
  { x: 29.95, y: 34.3, w: WT, d: 4.8 },
  { x: 34.75, y: 34.3, w: WT, d: 4.8 },
  { x: 39.6, y: 34.3, w: WT, d: 4.8 },
  { x: 43.65, y: 34.3, w: WT, d: 4.8 },
  { x: 49, y: 34.3, w: WT, d: 4.9 },
  // Fire-suppression niche inside the hall (FM200 + VESDA)
  { x: 40.35, y: 24.9, w: WT, d: 4.4 },
  { x: 40.35, y: 24.9, w: 3.65, d: WT },
];

// Long thin walls defeat the box depth heuristic against adjacent tall
// equipment — subdivide any segment over 5.5 tiles so each chunk sorts
// like a compact local box. Exported for QA.
export const DC_WALLS: WallSpec[] = DC_WALLS_RAW.flatMap((wl) => {
  const MAX = 5.5;
  const out: WallSpec[] = [];
  if (wl.d > MAX) {
    const n = Math.ceil(wl.d / MAX);
    const step = wl.d / n;
    for (let i = 0; i < n; i++) out.push({ x: wl.x, y: wl.y + i * step, w: wl.w, d: step });
  } else if (wl.w > MAX) {
    const n = Math.ceil(wl.w / MAX);
    const step = wl.w / n;
    for (let i = 0; i < n; i++) out.push({ x: wl.x + i * step, y: wl.y, w: step, d: wl.d });
  } else {
    out.push(wl);
  }
  return out;
});

function Wall({ spec }: { spec: WallSpec }) {
  const b = isoBox(spec.x, spec.y, spec.w, spec.d, WH);
  return (
    <g className="dcm-static dcm-wall">
      <polygon points={b.left} fill="#e6ebf1" stroke="#b9c4d1" strokeWidth="0.6" />
      <polygon points={b.right} fill="#d7dee7" stroke="#b9c4d1" strokeWidth="0.6" />
      <polygon points={b.top} fill="#f2f5f9" stroke="#b9c4d1" strokeWidth="0.6" />
    </g>
  );
}

type SceneItem =
  | { kind: "node"; depth: number; c: (typeof DC_COMPONENTS)[number] }
  | { kind: "wall"; depth: number; w: WallSpec };

const SCENE_ITEMS: SceneItem[] = [
  ...DC_COMPONENTS.map((c): SceneItem => ({
    kind: "node",
    depth: c.grid.x + c.grid.w + c.grid.y + c.grid.d + (c.zBase ?? 0) * 0.2,
    c,
  })),
  ...DC_WALLS.map((w): SceneItem => ({
    kind: "wall",
    depth: w.x + w.w + w.y + w.d,
    w,
  })),
].sort((a, b) => a.depth - b.depth);

const ZONE_LABELS = DC_ZONES.filter((z) => z.label && z.id !== "z-hall").map((z) => ({
  label: z.label as string,
  at: iso(z.grid.x + 1.2, z.grid.y + 1),
}));

// Small-caps engineering captions for rooms/areas that have no equipment label.
const ROOM_CAPTIONS: Array<{ label: string; at: { x: number; y: number } }> = [
  { label: "Network Rooms", at: iso(46.1, 12.35) },
  { label: "Operations Wing", at: iso(4.9, 39.5) },
  { label: "Fire Suppression", at: iso(40.6, 24.55) },
  { label: "Cold Aisle", at: iso(23, 14.5) },
  { label: "Hot Aisle", at: iso(23.2, 17.85) },
  { label: "Fresh Air", at: iso(47.9, 38.55) },
];

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
      {/* shared gradient / pattern / glow library, rendered once */}
      <ShapeDefs />

      {/* ─── Master engineering plate (opt-in background artwork) ────────────
       * Drop a single ultra-high-resolution isometric render at
       *   public/images/dc-map-plate.png  (or .webp / .svg)
       * and the SVG artwork below hides itself via <body data-dcm-plate="1">.
       * The image is anchored to DC_WORLD so every hotspot lands exactly on
       * its equipment. When the file is absent the SVG artwork stays visible
       * unchanged. Set the flag on <body> from your page/layout when you
       * ship a plate; nothing else in the app changes. */}
      <image
        className="dcm-plate"
        href="/images/dc-map-plate.png"
        x={DC_WORLD.x}
        y={DC_WORLD.y}
        width={DC_WORLD.w}
        height={DC_WORLD.h}
        preserveAspectRatio="none"
      />

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

      {/* equipment nodes + partition walls in painter's order */}
      {SCENE_ITEMS.map((item, i) =>
        item.kind === "wall" ? (
          <Wall key={`w${i}`} spec={item.w} />
        ) : (
          <ComponentHotspot
            key={item.c.id}
            component={item.c}
            emphasis={nodeEmphasis[item.c.id] ?? "normal"}
            selected={selectedId === item.c.id}
            hovered={hoveredId === item.c.id}
            onHover={onHover}
            onSelect={onSelect}
            onFocusRequest={onFocusRequest}
          />
        )
      )}

      {/* elevated routes: busway runs + overhead network trays */}
      <EdgeGroup edges={elevatedEdges} state={edgeState} />

      {/* zone + room captions */}
      <g className="dcm-static">
        {ZONE_LABELS.map((z) => (
          <Fragment key={z.label}>
            <text className="dcm-zone-label" x={z.at.x} y={z.at.y}>
              {z.label}
            </text>
          </Fragment>
        ))}
        {ROOM_CAPTIONS.map((r) => (
          <text key={r.label} className="dcm-room-label" x={r.at.x} y={r.at.y}>
            {r.label}
          </text>
        ))}
      </g>
    </g>
  );
}

const DcMapCanvas = memo(DcMapCanvasBase);
export default DcMapCanvas;
