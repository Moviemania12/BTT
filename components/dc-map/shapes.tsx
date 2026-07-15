// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/shapes.tsx
//
// Presentational shape library for the Interactive Data Center Map.
// One pure function per equipment kind, all consuming iso.ts projection
// helpers and map-data.ts footprints. No state, no handlers — the
// interaction layer (ComponentHotspot) wraps these.
//
// Visual language matches the homepage illustration system: white/slate
// premium palette, soft shading (top brightest, right face darkest),
// dark rack silhouettes, and system accents used sparingly. Animated
// details (fans, LEDs) are driven purely by CSS classes defined in
// dc-map.css, which respect prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";
import { TILE_W, TILE_H, iso, isoBox, pts, type Pt } from "./iso";
import type { DcComponentDef } from "./map-data";

// ─── Palettes ────────────────────────────────────────────────────────────────

interface Palette {
  top: string;
  left: string;
  right: string;
  stroke: string;
}

const P_LIGHT: Palette = { top: "#f5f8fb", left: "#e4eaf1", right: "#cfd8e3", stroke: "#9aa9ba" };
const P_METAL: Palette = { top: "#eef2f7", left: "#d9e1ea", right: "#c2cdda", stroke: "#93a3b5" };
const P_DARK: Palette = { top: "#3b4a5f", left: "#26323f", right: "#161e28", stroke: "#0f172a" };
const P_RED: Palette = { top: "#f3626b", left: "#dc3545", right: "#b02a37", stroke: "#8a1f2b" };
const P_GREEN: Palette = { top: "#d9f0e2", left: "#bfe3cd", right: "#a3d4b7", stroke: "#5f9e77" };
const P_AMBER: Palette = { top: "#fcd34d", left: "#f6b73c", right: "#d99a23", stroke: "#a9761a" };

// ─── Tiny helpers ────────────────────────────────────────────────────────────

/** Standard three-face isometric box. */
function Box({
  x,
  y,
  w,
  d,
  h,
  zBase = 0,
  p = P_LIGHT,
  sw = 0.8,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  zBase?: number;
  p?: Palette;
  sw?: number;
}) {
  const b = isoBox(x, y, w, d, h, zBase);
  return (
    <g>
      <polygon points={b.left} fill={p.left} stroke={p.stroke} strokeWidth={sw} strokeLinejoin="round" />
      <polygon points={b.right} fill={p.right} stroke={p.stroke} strokeWidth={sw} strokeLinejoin="round" />
      <polygon points={b.top} fill={p.top} stroke={p.stroke} strokeWidth={sw} strokeLinejoin="round" />
    </g>
  );
}

/** Soft ground shadow under a footprint. */
function Shadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  const c = iso(x + w / 2, y + d / 2 + 0.18);
  return (
    <ellipse
      cx={c.x}
      cy={c.y}
      rx={((w + d) / 2) * TILE_W * 0.72}
      ry={((w + d) / 2) * TILE_H * 0.72}
      fill="#0f172a"
      opacity="0.07"
    />
  );
}

/** Vertical cylinder (projected): body + elliptical cap. */
function Cylinder({
  cx,
  cy,
  r,
  h,
  zBase = 0,
  body = "#dbe3ec",
  side = "#c3cfdc",
  cap = "#f2f6fa",
  stroke = "#93a3b5",
}: {
  cx: number;
  cy: number;
  r: number;
  h: number;
  zBase?: number;
  body?: string;
  side?: string;
  cap?: string;
  stroke?: string;
}) {
  const rx = r * TILE_W * 1.414;
  const ry = r * TILE_H * 1.414;
  const top = iso(cx, cy, zBase + h);
  const bot = iso(cx, cy, zBase);
  return (
    <g>
      <path
        d={`M ${bot.x - rx} ${bot.y} A ${rx} ${ry} 0 0 0 ${bot.x + rx} ${bot.y} L ${top.x + rx} ${top.y} A ${rx} ${ry} 0 0 1 ${top.x - rx} ${top.y} Z`}
        fill={body}
        stroke={stroke}
        strokeWidth="0.8"
      />
      <path
        d={`M ${bot.x} ${bot.y - ry} L ${bot.x} ${top.y - ry}`}
        stroke={side}
        strokeWidth={rx * 0.9}
        opacity="0.35"
      />
      <ellipse cx={top.x} cy={top.y} rx={rx} ry={ry} fill={cap} stroke={stroke} strokeWidth="0.8" />
    </g>
  );
}

/** Rotating fan inside a circular shroud on a top face. */
function Fan({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const rx = r * TILE_W * 1.414;
  const ry = r * TILE_H * 1.414;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#33415522" stroke="#64748b" strokeWidth="0.9" />
      <g className="dcm-fan">
        {[0, 120, 240].map((a) => (
          <ellipse
            key={a}
            cx={cx}
            cy={cy}
            rx={rx * 0.82}
            ry={ry * 0.3}
            fill="#64748b"
            opacity="0.85"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r={ry * 0.28} fill="#334155" />
      </g>
    </g>
  );
}

/** Column of blinking status LEDs (used on racks). */
function Leds({ at, n, color }: { at: Pt; n: number; color: string }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <circle
          key={i}
          className="dcm-led"
          style={{ animationDelay: `${(i * 0.7 + at.x * 0.01) % 2}s` }}
          cx={at.x}
          cy={at.y + i * 3.2}
          r="0.9"
          fill={color}
        />
      ))}
    </g>
  );
}

// ─── Kind renderers ──────────────────────────────────────────────────────────

function pylon(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const base = [
    iso(x + 0.3, y + 0.3),
    iso(x + w - 0.3, y + 0.3),
    iso(x + w - 0.3, y + d - 0.3),
    iso(x + 0.3, y + d - 0.3),
  ];
  const top = iso(cx, cy, c.h);
  const armL = iso(cx - 1.7, cy, c.h - 8);
  const armR = iso(cx + 1.7, cy, c.h - 8);
  const arm2L = iso(cx - 1.3, cy, c.h - 18);
  const arm2R = iso(cx + 1.3, cy, c.h - 18);
  const mid = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {base.map((b, i) => (
        <path key={i} d={`M ${b.x} ${b.y} L ${top.x} ${top.y}`} stroke="#8a99ab" strokeWidth="1.1" fill="none" />
      ))}
      {[0.25, 0.5, 0.75].map((t) => (
        <g key={t} stroke="#a9b6c5" strokeWidth="0.7">
          <path d={`M ${mid(base[0], top, t).x} ${mid(base[0], top, t).y} L ${mid(base[2], top, t).x} ${mid(base[2], top, t).y}`} />
          <path d={`M ${mid(base[1], top, t).x} ${mid(base[1], top, t).y} L ${mid(base[3], top, t).x} ${mid(base[3], top, t).y}`} />
        </g>
      ))}
      <path d={`M ${armL.x} ${armL.y} L ${armR.x} ${armR.y}`} stroke="#8a99ab" strokeWidth="1.4" />
      <path d={`M ${arm2L.x} ${arm2L.y} L ${arm2R.x} ${arm2R.y}`} stroke="#8a99ab" strokeWidth="1.2" />
      {[armL, armR, arm2L, arm2R].map((p, i) => (
        <path key={i} d={`M ${p.x} ${p.y} L ${p.x} ${p.y + 4.5}`} stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <circle cx={top.x} cy={top.y} r="1.6" fill="#64748b" />
    </g>
  );
}

function gantry(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const h = c.h;
  const legAt = (gx: number, gy: number) => {
    const g0 = iso(gx, gy);
    const g1 = iso(gx, gy, h);
    return <path d={`M ${g0.x} ${g0.y} L ${g1.x} ${g1.y}`} stroke="#8a99ab" strokeWidth="1.5" />;
  };
  const beamA = iso(x + 0.5, y + 0.7, h);
  const beamB = iso(x + w - 0.5, y + 0.7, h);
  const beam2A = iso(x + 0.5, y + d - 0.7, h);
  const beam2B = iso(x + w - 0.5, y + d - 0.7, h);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* fenced pad */}
      <polygon
        points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])}
        fill="#e9edf2"
        stroke="#b6c2cf"
        strokeWidth="0.7"
      />
      {legAt(x + 0.5, y + 0.7)}
      {legAt(x + w - 0.5, y + 0.7)}
      {legAt(x + 0.5, y + d - 0.7)}
      {legAt(x + w - 0.5, y + d - 0.7)}
      <path d={`M ${beamA.x} ${beamA.y} L ${beamB.x} ${beamB.y}`} stroke="#8a99ab" strokeWidth="1.8" />
      <path d={`M ${beam2A.x} ${beam2A.y} L ${beam2B.x} ${beam2B.y}`} stroke="#8a99ab" strokeWidth="1.8" />
      {/* hanging insulator strings */}
      {[0.3, 0.55, 0.8].map((t) => {
        const px = beamA.x + (beamB.x - beamA.x) * t;
        const py = beamA.y + (beamB.y - beamA.y) * t;
        return (
          <g key={t}>
            <path d={`M ${px} ${py} L ${px} ${py + 6}`} stroke="#64748b" strokeWidth="1.3" />
            <circle cx={px} cy={py + 7} r="1.1" fill="#475569" />
          </g>
        );
      })}
      {/* CT/PT + breaker cabinets on the pad */}
      <Box x={x + 1.2} y={y + 2.2} w={1.2} d={1.1} h={7} p={P_METAL} />
      <Box x={x + 3.1} y={y + 2.2} w={1.2} d={1.1} h={9} p={P_METAL} />
      <Box x={x + w - 2.4} y={y + 2.2} w={1.2} d={1.1} h={7} p={P_METAL} />
    </g>
  );
}

function transformer(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const unitW = (w - 0.8) / 2;
  const unit = (ux: number) => {
    const b = isoBox(ux, y + 0.5, unitW, d - 1, c.h - 6);
    const finTop = iso(ux + unitW, y + 0.7, c.h - 7);
    const finBot = iso(ux + unitW, y + d - 1.2, 1);
    return (
      <g key={ux}>
        <Box x={ux} y={y + 0.5} w={unitW} d={d - 1} h={c.h - 6} p={P_METAL} />
        {/* radiator fins on the right face */}
        {[0.18, 0.36, 0.54, 0.72, 0.9].map((t) => {
          const tx = finTop.x + (finBot.x - finTop.x) * 0;
          const a = { x: finTop.x, y: finTop.y + (finBot.y - finTop.y) * t };
          void tx;
          return (
            <path
              key={t}
              d={`M ${a.x} ${a.y} l ${TILE_W * 0.22} ${TILE_H * 0.22}`}
              stroke="#93a3b5"
              strokeWidth="1.4"
              opacity="0.8"
            />
          );
        })}
        {/* HV bushings */}
        {[0.25, 0.5, 0.75].map((t) => {
          const p = iso(ux + unitW * t, y + 1.1, c.h - 6);
          return (
            <g key={t}>
              <path d={`M ${p.x} ${p.y} L ${p.x} ${p.y - 6}`} stroke="#64748b" strokeWidth="1.4" />
              <circle cx={p.x} cy={p.y - 6.6} r="1.4" fill="#94a3b8" stroke="#64748b" strokeWidth="0.6" />
            </g>
          );
        })}
        {/* conservator tank */}
        <Cylinder cx={ux + unitW - 0.5} cy={y + 0.9} r={0.34} h={2.4} zBase={c.h - 5} />
        <polygon points={b.base} fill="none" stroke="#b6c2cf" strokeWidth="0.5" />
      </g>
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {unit(x)}
      {unit(x + unitW + 0.8)}
    </g>
  );
}

function genset(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const unitW = (w - 1) / 2;
  const unit = (ux: number) => (
    <g key={ux}>
      <Box x={ux} y={y + 0.4} w={unitW} d={d - 0.8} h={2.2} p={P_METAL} />
      <Box x={ux + 0.2} y={y + 0.6} w={unitW - 0.4} d={d - 1.2} h={c.h - 4} zBase={2.2} p={{ top: "#f0f4e8", left: "#dbe4cc", right: "#c2cfa8", stroke: "#8fa06e" }} />
      {/* radiator grille (front-right face) */}
      {[0.25, 0.45, 0.65, 0.85].map((t) => {
        const a = iso(ux + unitW - 0.2, y + 0.6 + (d - 1.2) * t, c.h - 5);
        return <path key={t} d={`M ${a.x} ${a.y} l 0 ${(c.h - 8) * 0.6}`} stroke="#8fa06e" strokeWidth="1" opacity="0.7" />;
      })}
      {/* exhaust stack */}
      <Cylinder cx={ux + 0.7} cy={y + 1.1} r={0.28} h={9} zBase={c.h - 3} body="#b9c4d1" cap="#e6ecf2" />
      {/* control cabinet */}
      <Box x={ux + unitW - 1.1} y={y + d - 1.5} w={0.9} d={0.9} h={c.h - 8} zBase={2.2} p={P_DARK} sw={0.5} />
    </g>
  );
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {unit(x)}
      {unit(x + unitW + 1)}
    </g>
  );
}

function tank(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const r = w / 2 - 0.25;
  const endA = iso(cx, y + 0.5, 3 + r * TILE_H * 0.09);
  const endB = iso(cx, y + d - 0.5, 3 + r * TILE_H * 0.09);
  const rx = r * TILE_W * 1.1;
  const ry = r * TILE_H * 2.1;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* saddles */}
      <Box x={x + 0.3} y={y + 0.6} w={w - 0.6} d={0.6} h={3} p={P_METAL} />
      <Box x={x + 0.3} y={y + d - 1.2} w={w - 0.6} d={0.6} h={3} p={P_METAL} />
      {/* horizontal cylinder body */}
      <path
        d={`M ${endA.x - rx} ${endA.y - c.h / 2} L ${endB.x - rx} ${endB.y - c.h / 2} A ${rx} ${(c.h / 2) * 1.05} 0 0 0 ${endB.x + rx} ${endB.y - c.h / 2} L ${endA.x + rx} ${endA.y - c.h / 2} Z`}
        fill="#e7edf3"
        stroke="#93a3b5"
        strokeWidth="0.9"
      />
      <ellipse cx={endA.x} cy={endA.y - c.h / 2} rx={rx} ry={(c.h / 2) * 1.05} fill="#f4f8fb" stroke="#93a3b5" strokeWidth="0.9" />
      <ellipse cx={endA.x} cy={endA.y - c.h / 2} rx={rx * 0.55} ry={(c.h / 2) * 0.58} fill="none" stroke="#b6c2cf" strokeWidth="0.7" />
      {/* manhole + vent */}
      <circle cx={(endA.x + endB.x) / 2} cy={(endA.y + endB.y) / 2 - c.h - 1} r="1.5" fill="#cfd8e3" stroke="#93a3b5" strokeWidth="0.7" />
      <path d={`M ${endB.x} ${endB.y - c.h} l 0 -4`} stroke="#93a3b5" strokeWidth="1.2" />
      {void ry}
    </g>
  );
}

function watertank(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Cylinder cx={cx} cy={cy} r={w / 2 - 0.3} h={c.h} body="#dce9f4" side="#bcd4e8" cap="#eef6fc" stroke="#7fa3c0" />
      {/* level band + ladder */}
      <ellipse
        cx={iso(cx, cy, c.h * 0.62).x}
        cy={iso(cx, cy, c.h * 0.62).y}
        rx={(w / 2 - 0.3) * TILE_W * 1.414}
        ry={(w / 2 - 0.3) * TILE_H * 1.414}
        fill="none"
        stroke="#7fa3c0"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d={`M ${iso(cx + w / 2 - 0.3, cy).x} ${iso(cx + w / 2 - 0.3, cy).y} L ${iso(cx + w / 2 - 0.3, cy).x} ${iso(cx + w / 2 - 0.3, cy).y - c.h}`}
        stroke="#7fa3c0"
        strokeWidth="1"
      />
    </g>
  );
}

function tower(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cellW = (w - 0.6) / 2;
  const cell = (ux: number) => {
    const topC = iso(ux + cellW / 2, y + d / 2, c.h + 1.5);
    return (
      <g key={ux}>
        <Box x={ux} y={y} w={cellW} d={d} h={c.h} p={P_METAL} />
        {/* louvers on faces */}
        {[0.3, 0.5, 0.7].map((t) => {
          const a = iso(ux, y + d, c.h * t);
          const b = iso(ux + cellW, y + d, c.h * t);
          return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#9fb0c0" strokeWidth="0.8" opacity="0.8" />;
        })}
        {/* fan shroud ring */}
        <Box x={ux + 0.4} y={y + 0.4} w={cellW - 0.8} d={d - 0.8} h={2} zBase={c.h} p={P_LIGHT} sw={0.6} />
        <Fan cx={topC.x} cy={topC.y - 1.2} r={Math.min(cellW, d) / 2 - 0.75} />
      </g>
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {cell(x)}
      {cell(x + cellW + 0.6)}
    </g>
  );
}

function chiller(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={3} p={P_METAL} />
      {/* twin vessels (evaporator + condenser) */}
      {[y + 0.9, y + d - 0.9].map((vy, i) => {
        const a = iso(x + 0.6, vy, 3 + (c.h - 4) / 2);
        const b = iso(x + w - 1.6, vy, 3 + (c.h - 4) / 2);
        const rr = (c.h - 5) / 2;
        return (
          <g key={i}>
            <path
              d={`M ${a.x} ${a.y - rr} L ${b.x} ${b.y - rr} A ${rr * 0.7} ${rr} 0 0 1 ${b.x} ${b.y + rr} L ${a.x} ${a.y + rr} A ${rr * 0.7} ${rr} 0 0 1 ${a.x} ${a.y - rr} Z`}
              fill={i === 0 ? "#dfe7f0" : "#d3dde8"}
              stroke="#8fa0b2"
              strokeWidth="0.9"
            />
            <ellipse cx={b.x} cy={b.y} rx={rr * 0.7} ry={rr} fill="#eef3f8" stroke="#8fa0b2" strokeWidth="0.9" />
          </g>
        );
      })}
      {/* compressor + control panel */}
      <Box x={x + w - 1.7} y={y + d / 2 - 0.7} w={1.3} d={1.4} h={c.h - 3.5} zBase={3} p={P_DARK} sw={0.5} />
      <rect
        x={iso(x + w - 1.05, y + d / 2, 3 + (c.h - 3.5) * 0.55).x - 3}
        y={iso(x + w - 1.05, y + d / 2, 3 + (c.h - 3.5) * 0.55).y - 2}
        width="6"
        height="4"
        rx="0.6"
        fill="#7dd3fc"
        opacity="0.9"
      />
    </g>
  );
}

function pumps(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const n = w > 3.5 ? 3 : 2;
  const pw = (w - 0.4 * (n + 1)) / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={1.6} p={P_METAL} />
      {Array.from({ length: n }).map((_, i) => {
        const px = x + 0.4 + i * (pw + 0.4);
        return (
          <g key={i}>
            <Cylinder cx={px + pw / 2} cy={y + d * 0.32} r={pw * 0.32} h={c.h - 3} zBase={1.6} body="#c9d6e4" cap="#e8eff6" />
            <Box x={px + pw * 0.12} y={y + d * 0.52} w={pw * 0.76} d={d * 0.34} h={c.h - 4} zBase={1.6} p={P_METAL} sw={0.6} />
          </g>
        );
      })}
    </g>
  );
}

function panelRow(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const n = Math.max(3, Math.round(w / 2));
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} p={P_LIGHT} />
      {/* cabinet seams + handles on the front-left face */}
      {Array.from({ length: n - 1 }).map((_, i) => {
        const gx = x + ((i + 1) * w) / n;
        const a = iso(gx, y + d, 0);
        const b = iso(gx, y + d, c.h);
        return <path key={i} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#b3c0cd" strokeWidth="0.8" />;
      })}
      {Array.from({ length: n }).map((_, i) => {
        const p = iso(x + ((i + 0.7) * w) / n, y + d, c.h * 0.55);
        return <circle key={i} cx={p.x} cy={p.y} r="0.8" fill="#64748b" />;
      })}
      {/* status strip */}
      {Array.from({ length: n }).map((_, i) => {
        const p = iso(x + ((i + 0.3) * w) / n, y + d, c.h * 0.8);
        return <circle key={i} className="dcm-led" style={{ animationDelay: `${i * 0.5}s` }} cx={p.x} cy={p.y} r="0.7" fill="#22c55e" />;
      })}
      {/* top cable tray */}
      <Box x={x + 0.3} y={y + d * 0.35} w={w - 0.6} d={0.5} h={1} zBase={c.h} p={P_METAL} sw={0.5} />
    </g>
  );
}

function battery(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const rows = 2;
  const rowD = (d - 0.6) / rows;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {Array.from({ length: rows }).map((_, r) => {
        const ry = y + 0.2 + r * (rowD + 0.2);
        return (
          <g key={r}>
            <Box x={x} y={ry} w={w} d={rowD} h={c.h} p={P_METAL} sw={0.6} />
            {/* shelves of cells on the front face */}
            {[0.3, 0.62].map((lvl) =>
              Array.from({ length: 6 }).map((_, i) => {
                const p = iso(x + (i + 0.5) * (w / 6), ry + rowD, c.h * lvl);
                return (
                  <rect key={`${lvl}-${i}`} x={p.x - 2.6} y={p.y - 2.2} width="5.2" height="4" rx="0.5" fill="#334155" stroke="#1e293b" strokeWidth="0.4" />
                );
              })
            )}
          </g>
        );
      })}
    </g>
  );
}

function rackRows(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const rows = 3;
  const perRow = 5;
  const rackW = 2.15;
  const gap = (w - perRow * rackW) / (perRow - 1);
  const rackD = 2.55;
  const rowGap = (d - rows * rackD) / (rows - 1);
  const out: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const ry = y + r * (rackD + rowGap);
    // perforated cold-aisle tiles in front of each row
    if (r < rows) {
      out.push(
        <polygon
          key={`aisle-${r}`}
          points={pts([iso(x - 0.3, ry + rackD + 0.15), iso(x + w + 0.3, ry + rackD + 0.15), iso(x + w + 0.3, ry + rackD + 0.85), iso(x - 0.3, ry + rackD + 0.85)])}
          fill="#dfe6ee"
          opacity={r === rows - 1 ? 0 : 0.9}
        />
      );
    }
    for (let i = 0; i < perRow; i++) {
      const rx = x + i * (rackW + gap);
      const ledAnchor = iso(rx + rackW * 0.82, ry + rackD, c.h * 0.86);
      out.push(
        <g key={`${r}-${i}`}>
          <Box x={rx} y={ry} w={rackW} d={rackD} h={c.h} p={P_DARK} sw={0.55} />
          {/* server slot lines on the front face */}
          {[0.2, 0.34, 0.48, 0.62, 0.76].map((t) => {
            const a = iso(rx, ry + rackD, c.h * t);
            const b = iso(rx + rackW, ry + rackD, c.h * t);
            return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#3f4f63" strokeWidth="0.55" />;
          })}
          <Leds at={{ x: ledAnchor.x, y: ledAnchor.y }} n={4} color={i % 2 ? "#38bdf8" : "#34d399"} />
        </g>
      );
    }
  }
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {out}
    </g>
  );
}

function netrack(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const n = 3;
  const rackW = (w - 0.6 * (n - 1)) / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {Array.from({ length: n }).map((_, i) => {
        const rx = x + i * (rackW + 0.6);
        const led = iso(rx + rackW * 0.8, y + d, c.h * 0.82);
        return (
          <g key={i}>
            <Box x={rx} y={y} w={rackW} d={d} h={c.h} p={P_DARK} sw={0.55} />
            {[0.25, 0.45, 0.65].map((t) => {
              const a = iso(rx, y + d, c.h * t);
              const b = iso(rx + rackW, y + d, c.h * t);
              return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#7c3aed" strokeWidth="0.6" opacity="0.65" />;
            })}
            <Leds at={{ x: led.x, y: led.y }} n={3} color="#a78bfa" />
          </g>
        );
      })}
    </g>
  );
}

function crah(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const n = w > 5 ? 2 : 1;
  const uw = (w - 0.5 * (n - 1)) / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {Array.from({ length: n }).map((_, i) => {
        const ux = x + i * (uw + 0.5);
        const fanC = iso(ux + uw / 2, y + d / 2, c.h + 0.8);
        const scr = iso(ux + uw * 0.5, y + d, c.h * 0.72);
        return (
          <g key={i}>
            <Box x={ux} y={y} w={uw} d={d} h={c.h} p={P_LIGHT} />
            {/* supply grille */}
            {[0.18, 0.32, 0.46].map((t) => {
              const a = iso(ux + uw * 0.12, y + d, c.h * t);
              const b = iso(ux + uw * 0.88, y + d, c.h * t);
              return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#0ea5e9" strokeWidth="0.7" opacity="0.55" />;
            })}
            <rect x={scr.x - 3.4} y={scr.y - 2.4} width="6.8" height="4.2" rx="0.7" fill="#0ea5e9" opacity="0.25" stroke="#0ea5e9" strokeWidth="0.5" />
            <Fan cx={fanC.x} cy={fanC.y} r={Math.min(uw, d) * 0.26} />
          </g>
        );
      })}
    </g>
  );
}

function cylinders(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isVesda = c.id === "vesda";
  if (isVesda) {
    const top = iso(x + w / 2, y + d / 2, c.h);
    return (
      <g>
        <Shadow x={x} y={y} w={w} d={d} />
        <Box x={x} y={y} w={w} d={d} h={c.h * 0.6} p={P_RED} sw={0.6} />
        {/* sampling pipe with holes */}
        <path d={`M ${top.x} ${top.y - c.h * 0.6 + 4} L ${top.x} ${top.y - c.h - 16} L ${top.x + 26} ${top.y - c.h - 29}`} stroke="#dc3545" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {[0.35, 0.6, 0.85].map((t) => (
          <circle key={t} cx={top.x + 26 * t} cy={top.y - c.h - 16 - 13 * t} r="1" fill="#dc3545" />
        ))}
        <rect x={top.x - 3} y={top.y - c.h * 0.6 - 1} width="6" height="3.4" rx="0.6" fill="#fff" stroke="#b02a37" strokeWidth="0.5" />
      </g>
    );
  }
  const n = 3;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={1.2} p={P_METAL} />
      {Array.from({ length: n }).map((_, i) => (
        <Cylinder
          key={i}
          cx={x + w / 2}
          cy={y + 0.6 + i * ((d - 1.2) / (n - 1))}
          r={0.62}
          h={c.h - 2}
          zBase={1.2}
          body="#e35d67"
          side="#c13a46"
          cap="#f2848c"
          stroke="#8a1f2b"
        />
      ))}
      {/* manifold */}
      <path
        d={`M ${iso(x + w / 2, y + 0.6, c.h - 0.5).x} ${iso(x + w / 2, y + 0.6, c.h - 0.5).y} L ${iso(x + w / 2, y + d - 0.6, c.h - 0.5).x} ${iso(x + w / 2, y + d - 0.6, c.h - 0.5).y}`}
        stroke="#8a1f2b"
        strokeWidth="1.4"
      />
    </g>
  );
}

function consoleRoom(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isBig = w > 4.5;
  const screens = isBig ? 3 : 1;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* video wall panel */}
      <Box x={x + 0.2} y={y + 0.2} w={w - 0.4} d={0.5} h={c.h} p={P_DARK} sw={0.5} />
      {Array.from({ length: screens }).map((_, i) => {
        const p = iso(x + 0.4 + ((i + 0.5) * (w - 0.8)) / screens, y + 0.7, c.h * 0.55);
        const sw = ((w - 1.2) / screens) * TILE_W * 0.62;
        return (
          <g key={i}>
            <rect x={p.x - sw / 2} y={p.y - 5} width={sw} height="9" rx="0.8" fill="#0ea5e9" opacity="0.28" stroke="#38bdf8" strokeWidth="0.6" />
            <path d={`M ${p.x - sw / 2 + 1.5} ${p.y + 1.5} l ${sw * 0.3} -2.5 l ${sw * 0.25} 1.2 l ${sw * 0.25} -3`} stroke="#38bdf8" strokeWidth="0.8" fill="none" className="dcm-trace" />
          </g>
        );
      })}
      {/* operator desk */}
      <Box x={x + 0.6} y={y + d - 1.5} w={w - 1.2} d={1} h={c.h * 0.4} p={P_LIGHT} sw={0.6} />
    </g>
  );
}

function building(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isFire = c.id === "fire-pump";
  const p = isFire ? { top: "#f6dfe1", left: "#eec5c9", right: "#dfa6ac", stroke: "#b3747c" } : P_LIGHT;
  const winRows = c.h > 22 ? 2 : 1;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} p={p} />
      {/* windows on both visible faces */}
      {Array.from({ length: winRows }).map((_, r) =>
        [0.2, 0.42, 0.64, 0.86].map((t) => {
          if (t * w > w - 0.3) return null;
          const lvl = c.h * (winRows === 2 ? (r === 0 ? 0.62 : 0.28) : 0.5);
          const pl = iso(x + w * t, y + d, lvl);
          const pr = iso(x + w, y + d * t, lvl);
          return (
            <g key={`${r}-${t}`}>
              <rect x={pl.x - 2} y={pl.y - 2.6} width="4" height="5.2" rx="0.4" fill="#cfe3f5" stroke={p.stroke} strokeWidth="0.4" />
              <rect x={pr.x - 2} y={pr.y - 2.6} width="4" height="5.2" rx="0.4" fill="#bcd5ea" stroke={p.stroke} strokeWidth="0.4" />
            </g>
          );
        })
      )}
      {/* entrance */}
      <rect x={iso(x + w * 0.5, y + d, 0).x - 2.6} y={iso(x + w * 0.5, y + d, 0).y - 7.5} width="5.2" height="7.5" rx="0.5" fill="#94a3b8" opacity="0.6" />
      {/* roof parapet */}
      <polygon points={isoBox(x, y, w, d, 1.4, c.h).top} fill={p.left} stroke={p.stroke} strokeWidth="0.6" />
    </g>
  );
}

function dock(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d * 0.55} h={c.h} p={P_LIGHT} />
      {/* roller shutter */}
      {[0.25, 0.4, 0.55, 0.7, 0.85].map((t) => {
        const a = iso(x + w * 0.15, y + d * 0.55, c.h * t);
        const b = iso(x + w * 0.85, y + d * 0.55, c.h * t);
        return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#9aa9ba" strokeWidth="0.9" />;
      })}
      {/* dock platform + ramp */}
      <Box x={x + 0.3} y={y + d * 0.55} w={w - 0.6} d={d * 0.28} h={3} p={P_METAL} />
      <polygon
        points={pts([iso(x + 0.3, y + d * 0.83, 3), iso(x + w - 0.3, y + d * 0.83, 3), iso(x + w - 0.3, y + d, 0), iso(x + 0.3, y + d, 0)])}
        fill="#d4dce5"
        stroke="#9aa9ba"
        strokeWidth="0.6"
      />
      {/* bollards */}
      {[0.25, 0.75].map((t) => (
        <Cylinder key={t} cx={x + w * t} cy={y + d - 0.15} r={0.16} h={4} body="#f6b73c" cap="#fcd34d" stroke="#a9761a" />
      ))}
    </g>
  );
}

function mesh(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const lines: ReactNode[] = [];
  for (let i = 0; i <= 4; i++) {
    const t = i / 4;
    const a1 = iso(x + w * t, y);
    const b1 = iso(x + w * t, y + d);
    const a2 = iso(x, y + d * t);
    const b2 = iso(x + w, y + d * t);
    lines.push(<path key={`v${i}`} d={`M ${a1.x} ${a1.y} L ${b1.x} ${b1.y}`} stroke="#4d9e6f" strokeWidth="1" opacity="0.85" />);
    lines.push(<path key={`h${i}`} d={`M ${a2.x} ${a2.y} L ${b2.x} ${b2.y}`} stroke="#4d9e6f" strokeWidth="1" opacity="0.85" />);
  }
  return (
    <g>
      <polygon points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])} fill={P_GREEN.top} stroke={P_GREEN.stroke} strokeWidth="0.8" />
      {lines}
      {/* earth pits at corners */}
      {[
        [x + 0.4, y + 0.4],
        [x + w - 0.4, y + d - 0.4],
      ].map(([px, py], i) => {
        const p = iso(px, py);
        return <ellipse key={i} cx={p.x} cy={p.y} rx="3.4" ry="1.7" fill="#bfe3cd" stroke="#4d9e6f" strokeWidth="0.9" />;
      })}
    </g>
  );
}

function mast(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const base = iso(cx, cy, c.zBase ?? 0);
  const top = iso(cx, cy, (c.zBase ?? 0) + c.h);
  return (
    <g>
      <Box x={x} y={y} w={w} d={d} h={2} zBase={(c.zBase ?? 0) - 2} p={P_METAL} sw={0.6} />
      <path d={`M ${base.x} ${base.y} L ${top.x} ${top.y}`} stroke="#8a99ab" strokeWidth="1.6" />
      {[[-9, 6], [9, 6]].map(([dx, dy], i) => (
        <path key={i} d={`M ${base.x + dx} ${base.y + dy} L ${top.x} ${top.y + 10}`} stroke="#aab7c5" strokeWidth="0.7" />
      ))}
      <path d={`M ${top.x} ${top.y} l 0 -5`} stroke="#64748b" strokeWidth="1.2" />
      <circle cx={top.x} cy={top.y - 6} r="1.5" fill="#f6b73c" stroke="#a9761a" strokeWidth="0.6" />
    </g>
  );
}

function busway(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const zb = c.zBase ?? 0;
  return (
    <g>
      <Box x={x} y={y} w={w} d={d} h={c.h} zBase={zb} p={P_AMBER} sw={0.7} />
      {/* tap-off boxes + drop rods */}
      {[0.18, 0.5, 0.82].map((t) => {
        const bx = x + w * t;
        const boxTop = iso(bx, y + d / 2, zb - 2.4);
        const rodTop = iso(bx, y + d / 2, zb);
        return (
          <g key={t}>
            <path d={`M ${rodTop.x} ${rodTop.y} L ${boxTop.x} ${boxTop.y}`} stroke="#a9761a" strokeWidth="1" />
            <Box x={bx - 0.45} y={y + d / 2 - 0.45} w={0.9} d={0.9} h={2.2} zBase={zb - 4.6} p={P_METAL} sw={0.5} />
          </g>
        );
      })}
      {/* hanger rods to structure */}
      {[0.05, 0.95].map((t) => {
        const p = iso(x + w * t, y + d / 2, zb + c.h);
        return <path key={t} d={`M ${p.x} ${p.y} L ${p.x} ${p.y - 10}`} stroke="#b6c2cf" strokeWidth="0.8" strokeDasharray="2 1.6" />;
      })}
    </g>
  );
}

function floorShape(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  if (c.id === "server-hall") {
    // The hall's visuals come from its zone; the hotspot just needs a
    // subtle marker so the whole floor is discoverable.
    const p = iso(x + 2.6, y + 2.1);
    return (
      <g>
        <circle cx={p.x} cy={p.y} r="3.1" fill="#ffffff" stroke="#8a99ab" strokeWidth="0.9" />
        <circle cx={p.x} cy={p.y} r="1" fill="#155eef" />
      </g>
    );
  }
  // Raised-floor cutaway: two tiles on pedestals, one tile lifted.
  const t1 = isoBox(x, y, w / 2 - 0.1, d, 0.8, c.h);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* pedestals */}
      {[
        [x + 0.25, y + 0.25],
        [x + w / 2 - 0.35, y + 0.25],
        [x + 0.25, y + d - 0.45],
        [x + w / 2 - 0.35, y + d - 0.45],
        [x + w - 0.45, y + d - 0.45],
      ].map(([px, py], i) => {
        const a = iso(px, py);
        const b = iso(px, py, c.h);
        return <path key={i} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#8a99ab" strokeWidth="1.4" />;
      })}
      <polygon points={t1.top} fill="#eef2f7" stroke="#9aa9ba" strokeWidth="0.7" />
      <polygon points={t1.left} fill="#dde4ec" stroke="#9aa9ba" strokeWidth="0.7" />
      <polygon points={t1.right} fill="#cbd5e1" stroke="#9aa9ba" strokeWidth="0.7" />
      {/* lifted tile leaning */}
      <polygon
        points={pts([
          iso(x + w / 2 + 0.35, y + d - 0.2, c.h + 0.8),
          iso(x + w - 0.15, y + d - 0.2, c.h + 5),
          iso(x + w - 0.15, y + 0.35, c.h + 5),
          iso(x + w / 2 + 0.35, y + 0.35, c.h + 0.8),
        ])}
        fill="#e4eaf1"
        stroke="#9aa9ba"
        strokeWidth="0.7"
      />
    </g>
  );
}

function duct(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} p={P_METAL} />
      {[0.32, 0.68].map((t) => {
        const p = iso(x + w * t, y + d, c.h * 0.5);
        return <ellipse key={t} cx={p.x} cy={p.y} rx="2.1" ry="1.5" fill="#7c3aed" opacity="0.25" stroke="#7c3aed" strokeWidth="0.7" />;
      })}
    </g>
  );
}

function gate(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const glass = (gx: number) => {
    const a = iso(gx, y + 0.3, 0);
    const b = iso(gx, y + d - 0.3, 0);
    const a2 = iso(gx, y + 0.3, c.h - 2);
    const b2 = iso(gx, y + d - 0.3, c.h - 2);
    return (
      <polygon
        points={pts([a2, b2, b, a])}
        fill="#bfdbfe"
        opacity="0.55"
        stroke="#7fa3c0"
        strokeWidth="0.7"
      />
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* two interlocked door frames (mantrap) */}
      <Box x={x} y={y} w={0.5} d={d} h={c.h} p={P_METAL} sw={0.6} />
      <Box x={x + w - 0.5} y={y} w={0.5} d={d} h={c.h} p={P_METAL} sw={0.6} />
      <Box x={x + 0.5} y={y} w={w - 1} d={0.4} h={c.h} p={P_METAL} sw={0.5} />
      {glass(x + w * 0.32)}
      {glass(x + w * 0.68)}
      {/* card reader */}
      <rect x={iso(x + w + 0.15, y + d * 0.5, c.h * 0.45).x - 1.2} y={iso(x + w + 0.15, y + d * 0.5, c.h * 0.45).y - 1.8} width="2.4" height="3.6" rx="0.5" fill="#10b981" opacity="0.85" />
    </g>
  );
}

function genericBox(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isFire = c.category === "fire";
  const p = isFire ? P_RED : P_LIGHT;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} p={p} />
      {/* front display / door detail */}
      <rect
        x={iso(x + w * 0.5, y + d, c.h * 0.62).x - 3}
        y={iso(x + w * 0.5, y + d, c.h * 0.62).y - 2.2}
        width="6"
        height="4"
        rx="0.6"
        fill={isFire ? "#ffffff" : "#0ea5e9"}
        opacity={isFire ? 0.9 : 0.22}
        stroke={isFire ? "#b02a37" : "#7fa3c0"}
        strokeWidth="0.5"
      />
      <circle cx={iso(x + w * 0.82, y + d, c.h * 0.3).x} cy={iso(x + w * 0.82, y + d, c.h * 0.3).y} r="0.8" fill="#64748b" />
    </g>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

export function renderShape(c: DcComponentDef): ReactNode {
  switch (c.kind) {
    case "pylon":
      return pylon(c);
    case "gantry":
      return gantry(c);
    case "transformer":
      return transformer(c);
    case "genset":
      return genset(c);
    case "tank":
      return tank(c);
    case "watertank":
      return watertank(c);
    case "tower":
      return tower(c);
    case "chiller":
      return chiller(c);
    case "pumps":
      return pumps(c);
    case "panel-row":
      return panelRow(c);
    case "battery":
      return battery(c);
    case "rack-rows":
      return rackRows(c);
    case "netrack":
      return netrack(c);
    case "crah":
      return crah(c);
    case "cylinders":
      return cylinders(c);
    case "console":
      return consoleRoom(c);
    case "building":
      return building(c);
    case "dock":
      return dock(c);
    case "mesh":
      return mesh(c);
    case "mast":
      return mast(c);
    case "busway":
      return busway(c);
    case "floor":
      return floorShape(c);
    case "duct":
      return duct(c);
    case "gate":
      return gate(c);
    case "box":
    default:
      return genericBox(c);
  }
}
