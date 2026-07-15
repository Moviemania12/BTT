// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/iso.ts
//
// Pure isometric projection math for the DC Map scene. No React, no DOM,
// no state — only functions that turn logical grid coordinates into
// projected screen-space coordinates and SVG path strings.
//
// Why this file exists as its own layer: when the SVG renderer is one day
// replaced by a Three.js scene, the logical grid in map-data.ts stays the
// single source of truth and THIS projection simply stops being used —
// nothing else has to change. Keeping the math pure also lets it be
// exercised outside React (layout QA scripts, tests) with zero setup.
//
// Convention: the facility is laid out on a top-down logical grid where
// x grows toward the south-east edge and y grows toward the south-west
// edge. One grid unit ≈ one floor tile. z is height in pixels (already
// projected — vertical on screen).
// ═══════════════════════════════════════════════════════════════════════════

/** Horizontal half-width of one projected grid tile, in px. */
export const TILE_W = 22;

/** Vertical half-height of one projected grid tile, in px (2:1 isometric). */
export const TILE_H = 11;

export interface Pt {
  x: number;
  y: number;
}

/**
 * Project a logical grid coordinate (gx, gy) with optional height z (px)
 * into screen space. Classic 2:1 isometric projection.
 */
export function iso(gx: number, gy: number, z = 0): Pt {
  return {
    x: (gx - gy) * TILE_W,
    y: (gx + gy) * TILE_H - z,
  };
}

/** Format a point list into an SVG polygon/path "points" string. */
export function pts(list: Pt[]): string {
  return list.map((p) => `${round(p.x)},${round(p.y)}`).join(" ");
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * The three visible faces of an isometric box footprint (gx, gy, w, d)
 * extruded to height h (px). Face order: top, left (south-west wall),
 * right (south-east wall).
 */
export interface IsoBoxFaces {
  top: string;
  left: string;
  right: string;
  /** Projected outline of the footprint at ground level (for shadows). */
  base: string;
  /** Projected centre of the top face — used to anchor labels/tooltips. */
  topCenter: Pt;
  /** Projected centre of the footprint at ground level. */
  center: Pt;
}

export function isoBox(
  gx: number,
  gy: number,
  w: number,
  d: number,
  h: number,
  zBase = 0
): IsoBoxFaces {
  const top = zBase + h;
  const a = iso(gx, gy, top); // back corner (top)
  const b = iso(gx + w, gy, top); // right corner (top)
  const c = iso(gx + w, gy + d, top); // front corner (top)
  const e = iso(gx, gy + d, top); // left corner (top)

  const bg = iso(gx + w, gy, zBase);
  const cg = iso(gx + w, gy + d, zBase);
  const eg = iso(gx, gy + d, zBase);
  const ag = iso(gx, gy, zBase);

  return {
    top: pts([a, b, c, e]),
    right: pts([b, bg, cg, c]),
    left: pts([e, c, cg, eg]),
    base: pts([ag, bg, cg, eg]),
    topCenter: iso(gx + w / 2, gy + d / 2, top),
    center: iso(gx + w / 2, gy + d / 2, zBase),
  };
}

/** Flat isometric ground polygon for a rectangular zone. */
export function isoZone(gx: number, gy: number, w: number, d: number): string {
  return pts([iso(gx, gy), iso(gx + w, gy), iso(gx + w, gy + d), iso(gx, gy + d)]);
}

/**
 * Build an SVG path through logical grid waypoints at a fixed height.
 * Corners are softened with small quadratic curves so conduit/pipe runs
 * read as engineered routing rather than hard zig-zags.
 */
export function isoPath(waypoints: Array<[number, number]>, z = 0, cornerRadius = 6): string {
  if (waypoints.length === 0) return "";
  const projected = waypoints.map(([gx, gy]) => iso(gx, gy, z));
  if (projected.length === 1) {
    const p = projected[0];
    return `M ${round(p.x)} ${round(p.y)}`;
  }
  if (projected.length === 2) {
    const [p0, p1] = projected;
    return `M ${round(p0.x)} ${round(p0.y)} L ${round(p1.x)} ${round(p1.y)}`;
  }

  let d = `M ${round(projected[0].x)} ${round(projected[0].y)}`;
  for (let i = 1; i < projected.length - 1; i++) {
    const prev = projected[i - 1];
    const corner = projected[i];
    const next = projected[i + 1];

    const inVec = norm(sub(corner, prev));
    const outVec = norm(sub(next, corner));
    const inLen = len(sub(corner, prev));
    const outLen = len(sub(next, corner));
    const r = Math.min(cornerRadius, inLen / 2, outLen / 2);

    const entry = { x: corner.x - inVec.x * r, y: corner.y - inVec.y * r };
    const exit = { x: corner.x + outVec.x * r, y: corner.y + outVec.y * r };

    d += ` L ${round(entry.x)} ${round(entry.y)}`;
    d += ` Q ${round(corner.x)} ${round(corner.y)} ${round(exit.x)} ${round(exit.y)}`;
  }
  const last = projected[projected.length - 1];
  d += ` L ${round(last.x)} ${round(last.y)}`;
  return d;
}

function sub(a: Pt, b: Pt): Pt {
  return { x: a.x - b.x, y: a.y - b.y };
}

function len(v: Pt): number {
  return Math.sqrt(v.x * v.x + v.y * v.y) || 1;
}

function norm(v: Pt): Pt {
  const l = len(v);
  return { x: v.x / l, y: v.y / l };
}

/**
 * Auto-route an orthogonal elbow between two grid points: travel along x
 * first, then along y (or the reverse). `lane` nudges the bend line so
 * parallel system runs don't overlap each other.
 */
export function elbow(
  from: [number, number],
  to: [number, number],
  order: "xy" | "yx" = "xy",
  lane = 0
): Array<[number, number]> {
  const [fx, fy] = from;
  const [tx, ty] = to;
  if (order === "xy") {
    return [
      [fx, fy],
      [tx + lane, fy],
      [tx + lane, ty],
    ];
  }
  return [
    [fx, fy],
    [fx, ty + lane],
    [tx, ty + lane],
  ];
}
