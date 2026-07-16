// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/shapes.tsx
//
// Product-illustration shape library for the Interactive Data Center Map.
// Every equipment kind renders as a detailed engineering illustration in
// the language of Schneider Electric / Vertiv product artwork: gradient-
// shaded isometric faces, edge highlights, ambient occlusion, and real
// product features (perforated rack doors, radiator fins, fan cowls,
// breaker fronts, aspirating pipework) — recognisable without a label.
//
// The public contract is unchanged: renderShape(component) per kind,
// consuming iso.ts projection and map-data footprints. <ShapeDefs/>
// (rendered once by DcMapCanvas) carries the shared gradient / pattern /
// glow library so per-node markup stays lean. Animated details (fans,
// LEDs, screen traces) still use the CSS classes in dc-map.css and
// respect prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";
import { TILE_W, TILE_H, iso, pts, type Pt } from "./iso";
import type { DcComponentDef } from "./map-data";

// ─── Shared material defs (rendered once by the canvas) ─────────────────────

export function ShapeDefs() {
  return (
    <defs>
      {/* painted-steel enclosure */}
      <linearGradient id="dcmM-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e6ebf2" />
      </linearGradient>
      <linearGradient id="dcmM-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eef2f7" />
        <stop offset="1" stopColor="#cfd8e2" />
      </linearGradient>
      <linearGradient id="dcmM-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#cbd4df" />
        <stop offset="1" stopColor="#a7b3c2" />
      </linearGradient>
      {/* brushed structural steel */}
      <linearGradient id="dcmS-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f2f5f9" />
        <stop offset="1" stopColor="#d5dde6" />
      </linearGradient>
      <linearGradient id="dcmS-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#dde4ec" />
        <stop offset="1" stopColor="#b9c4d1" />
      </linearGradient>
      <linearGradient id="dcmS-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b3bfcd" />
        <stop offset="1" stopColor="#8d9aa9" />
      </linearGradient>
      {/* IT-black rack steel */}
      <linearGradient id="dcmD-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4b5b71" />
        <stop offset="1" stopColor="#2e3c4e" />
      </linearGradient>
      <linearGradient id="dcmD-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#33465c" />
        <stop offset="1" stopColor="#1d2836" />
      </linearGradient>
      <linearGradient id="dcmD-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1a2532" />
        <stop offset="1" stopColor="#0c141d" />
      </linearGradient>
      {/* fire-red */}
      <linearGradient id="dcmR-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fb7185" />
        <stop offset="1" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="dcmR-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ef4457" />
        <stop offset="1" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="dcmR-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bE1240" stopOpacity="1" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
      {/* genset industrial green */}
      <linearGradient id="dcmG-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b7d59a" />
        <stop offset="1" stopColor="#8fb56e" />
      </linearGradient>
      <linearGradient id="dcmG-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9dbf7d" />
        <stop offset="1" stopColor="#71954f" />
      </linearGradient>
      <linearGradient id="dcmG-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6f9350" />
        <stop offset="1" stopColor="#4e6d35" />
      </linearGradient>
      {/* busway amber */}
      <linearGradient id="dcmA-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fde68a" />
        <stop offset="1" stopColor="#f6b73c" />
      </linearGradient>
      <linearGradient id="dcmA-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f9cf5e" />
        <stop offset="1" stopColor="#dd9a20" />
      </linearGradient>
      <linearGradient id="dcmA-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d9971f" />
        <stop offset="1" stopColor="#a9721a" />
      </linearGradient>
      {/* cylinder sheens (3-stop, along width) */}
      <linearGradient id="dcmCyl-steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c3cedb" />
        <stop offset="0.45" stopColor="#f2f6fa" />
        <stop offset="1" stopColor="#aab7c6" />
      </linearGradient>
      <linearGradient id="dcmCyl-red" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#be123c" />
        <stop offset="0.45" stopColor="#fb7185" />
        <stop offset="1" stopColor="#9f1239" />
      </linearGradient>
      <linearGradient id="dcmCyl-blue" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7fa3c0" />
        <stop offset="0.45" stopColor="#dbeafe" />
        <stop offset="1" stopColor="#6e93b1" />
      </linearGradient>
      <linearGradient id="dcmCyl-white" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c9d3de" />
        <stop offset="0.42" stopColor="#ffffff" />
        <stop offset="1" stopColor="#b4c0cd" />
      </linearGradient>
      {/* glass + screens */}
      <linearGradient id="dcmGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e0f2fe" stopOpacity="0.95" />
        <stop offset="0.5" stopColor="#93c5fd" stopOpacity="0.8" />
        <stop offset="1" stopColor="#60a5fa" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="dcmScreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="dcmAO" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0f172a" stopOpacity="0" />
        <stop offset="1" stopColor="#0f172a" stopOpacity="0.22" />
      </linearGradient>
      <radialGradient id="dcmShadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#0f172a" stopOpacity="0.24" />
        <stop offset="0.7" stopColor="#0f172a" stopOpacity="0.1" />
        <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dcmGlowB" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#38bdf8" stopOpacity="0.9" />
        <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dcmGlowG" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#34d399" stopOpacity="0.9" />
        <stop offset="1" stopColor="#34d399" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="dcmGlowR" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#f43f5e" stopOpacity="0.9" />
        <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
      </radialGradient>
      {/* rack-door perforation + machine grate */}
      <pattern id="dcmPerf" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
        <circle cx="1.2" cy="1.2" r="0.5" fill="#0a121c" />
      </pattern>
      <pattern id="dcmGrate" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="3.2" height="1.1" fill="#5f7288" opacity="0.55" />
      </pattern>
    </defs>
  );
}

// ─── Material face lookup ────────────────────────────────────────────────────

type Mat = "metal" | "steel" | "dark" | "red" | "green" | "amber";
const FACE: Record<Mat, { t: string; l: string; r: string; s: string }> = {
  metal: { t: "url(#dcmM-top)", l: "url(#dcmM-left)", r: "url(#dcmM-right)", s: "#93a3b5" },
  steel: { t: "url(#dcmS-top)", l: "url(#dcmS-left)", r: "url(#dcmS-right)", s: "#7f8fa0" },
  dark: { t: "url(#dcmD-top)", l: "url(#dcmD-left)", r: "url(#dcmD-right)", s: "#0b1420" },
  red: { t: "url(#dcmR-top)", l: "url(#dcmR-left)", r: "url(#dcmR-right)", s: "#7f1030" },
  green: { t: "url(#dcmG-top)", l: "url(#dcmG-left)", r: "url(#dcmG-right)", s: "#3f5a2a" },
  amber: { t: "url(#dcmA-top)", l: "url(#dcmA-left)", r: "url(#dcmA-right)", s: "#8a5f14" },
};

// ─── Core helpers ────────────────────────────────────────────────────────────

interface BoxProps {
  x: number; y: number; w: number; d: number; h: number;
  zBase?: number; mat?: Mat; sw?: number; ao?: boolean; highlight?: boolean;
}

/** Gradient-shaded isometric box with edge highlight + ambient occlusion. */
function Box({ x, y, w, d, h, zBase = 0, mat = "metal", sw = 0.7, ao, highlight = true }: BoxProps) {
  const f = FACE[mat];
  const A = iso(x, y, zBase + h);
  const B = iso(x + w, y, zBase + h);
  const C = iso(x + w, y + d, zBase + h);
  const D = iso(x, y + d, zBase + h);
  const Bg = iso(x + w, y, zBase);
  const Cg = iso(x + w, y + d, zBase);
  const Dg = iso(x, y + d, zBase);
  const top = pts([A, B, C, D]);
  const left = pts([D, C, Cg, Dg]);
  const right = pts([C, B, Bg, Cg]);
  const showAO = ao ?? h > 5;
  const aoH = Math.min(3.2, h * 0.35);
  const aoL = pts([iso(x, y + d, zBase + aoH), iso(x + w, y + d, zBase + aoH), Cg, Dg]);
  const aoR = pts([iso(x + w, y + d, zBase + aoH), iso(x + w, y, zBase + aoH), Bg, Cg]);
  return (
    <g>
      <polygon points={left} fill={f.l} stroke={f.s} strokeWidth={sw} strokeLinejoin="round" />
      <polygon points={right} fill={f.r} stroke={f.s} strokeWidth={sw} strokeLinejoin="round" />
      {showAO && <polygon points={aoL} fill="url(#dcmAO)" />}
      {showAO && <polygon points={aoR} fill="url(#dcmAO)" />}
      <polygon points={top} fill={f.t} stroke={f.s} strokeWidth={sw} strokeLinejoin="round" />
      {highlight && (
        <path
          d={`M ${D.x} ${D.y} L ${A.x} ${A.y} L ${B.x} ${B.y}`}
          fill="none" stroke="#ffffff" strokeWidth={sw * 0.9} opacity="0.65" strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** Soft radial ground shadow. */
function Shadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  const c = iso(x + w / 2, y + d / 2 + 0.16);
  return (
    <ellipse cx={c.x} cy={c.y} rx={((w + d) / 2) * TILE_W * 0.74} ry={((w + d) / 2) * TILE_H * 0.74} fill="url(#dcmShadow)" />
  );
}

/** Vertical cylinder with sheen gradient. */
function Cyl({ cx, cy, r, h, zBase = 0, grad = "dcmCyl-steel", stroke = "#8b99a9", capLight = "#f3f7fb" }: {
  cx: number; cy: number; r: number; h: number; zBase?: number; grad?: string; stroke?: string; capLight?: string;
}) {
  const rx = r * TILE_W * 1.414;
  const ry = r * TILE_H * 1.414;
  const top = iso(cx, cy, zBase + h);
  const bot = iso(cx, cy, zBase);
  return (
    <g>
      <path
        d={`M ${bot.x - rx} ${bot.y} A ${rx} ${ry} 0 0 0 ${bot.x + rx} ${bot.y} L ${top.x + rx} ${top.y} A ${rx} ${ry} 0 0 1 ${top.x - rx} ${top.y} Z`}
        fill={`url(#${grad})`} stroke={stroke} strokeWidth="0.7"
      />
      <ellipse cx={top.x} cy={top.y} rx={rx} ry={ry} fill={capLight} stroke={stroke} strokeWidth="0.7" />
      <ellipse cx={top.x} cy={top.y} rx={rx * 0.62} ry={ry * 0.62} fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.6" />
    </g>
  );
}

/** Two-tone pipe stroke with sheen. */
function Pipe({ d, w = 2.4, dark = "#7d8ea0", light = "#e7edf4" }: { d: string; w?: number; dark?: string; light?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={dark} strokeWidth={w} />
      <path d={d} stroke={light} strokeWidth={w * 0.42} opacity="0.85" />
    </g>
  );
}

/** Status LED with glow halo. */
function Led({ x, y, color, delay = 0, r = 0.9 }: { x: number; y: number; color: "b" | "g" | "r"; delay?: number; r?: number }) {
  const fill = color === "b" ? "#38bdf8" : color === "g" ? "#34d399" : "#f43f5e";
  const glow = color === "b" ? "url(#dcmGlowB)" : color === "g" ? "url(#dcmGlowG)" : "url(#dcmGlowR)";
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.6} fill={glow} className="dcm-led" style={{ animationDelay: `${delay}s` }} />
      <circle cx={x} cy={y} r={r} fill={fill} className="dcm-led" style={{ animationDelay: `${delay}s` }} />
    </g>
  );
}

/** Rotating industrial fan: hub, 5 tapered blades, cowl ring + guard. */
function Fan({ cx, cy, r, guard = true }: { cx: number; cy: number; r: number; guard?: boolean }) {
  const rx = r * TILE_W * 1.414;
  const ry = r * TILE_H * 1.414;
  const blade = `M 0 0 C ${rx * 0.18} ${-ry * 0.5}, ${rx * 0.42} ${-ry * 0.95}, ${rx * 0.16} ${-ry * 0.98} C ${rx * 0.02} ${-ry * 0.99}, ${-rx * 0.1} ${-ry * 0.45}, 0 0 Z`;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx * 1.08} ry={ry * 1.08} fill="#33415522" stroke="#5b6b7d" strokeWidth="1" />
      <g className="dcm-fan">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d={blade} transform={`translate(${cx} ${cy}) rotate(${a}) scale(1 ${ry / rx})`} fill="#64748b" stroke="#475569" strokeWidth="0.3" opacity="0.92" />
        ))}
        <circle cx={cx} cy={cy} r={ry * 0.3} fill="#2f3d4d" stroke="#1e293b" strokeWidth="0.5" />
      </g>
      {guard && (
        <g stroke="#7d8ea0" strokeWidth="0.5" opacity="0.75" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} />
          <ellipse cx={cx} cy={cy} rx={rx * 0.4} ry={ry * 0.4} />
          {[0, 45, 90, 135].map((a) => (
            <path key={a} d={`M ${cx - rx * 1.05} ${cy} L ${cx + rx * 1.05} ${cy}`} transform={`rotate(${a} ${cx} ${cy}) scale(1 1)`} />
          ))}
        </g>
      )}
    </g>
  );
}

/** Louver band on the front-left face between heights h0..h1. */
function LouversL({ x, y, d, gx2, h0, h1, n = 5, color = "#8fa0b2" }: { x: number; y: number; d: number; gx2: number; h0: number; h1: number; n?: number; color?: string }) {
  const rows: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const h = h0 + ((h1 - h0) * i) / (n - 1);
    const a = iso(x, y + d, h);
    const b = iso(gx2, y + d, h);
    rows.push(<path key={i} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke={color} strokeWidth="0.7" opacity="0.85" />);
  }
  return <g>{rows}</g>;
}

/** Bolt-dot ring for flanges / manways. */
function BoltRing({ cx, cy, rx, ry, n = 8 }: { cx: number; cy: number; rx: number; ry: number; n?: number }) {
  return (
    <g fill="#64748b">
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2;
        return <circle key={i} cx={cx + Math.cos(a) * rx} cy={cy + Math.sin(a) * ry} r="0.45" />;
      })}
    </g>
  );
}

/** Small UI screen with animated trace. */
function Screen({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="0.7" fill="url(#dcmScreen)" stroke="#0c4a6e" strokeWidth="0.4" />
      <path
        d={`M ${x + 1} ${y + h * 0.65} l ${w * 0.22} ${-h * 0.3} l ${w * 0.2} ${h * 0.18} l ${w * 0.22} ${-h * 0.36} l ${w * 0.2} ${h * 0.1}`}
        fill="none" stroke="#e0f2fe" strokeWidth="0.55" className="dcm-trace"
      />
    </g>
  );
}

// ─── Power chain ─────────────────────────────────────────────────────────────

function pylon(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const base = [
    iso(x + 0.3, y + 0.3), iso(x + w - 0.3, y + 0.3),
    iso(x + w - 0.3, y + d - 0.3), iso(x + 0.3, y + d - 0.3),
  ];
  const top = iso(cx, cy, c.h);
  const mid = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const armY = [c.h - 8, c.h - 18];
  const armHalf = [1.9, 1.5];
  /** insulator disc stack hanging from an arm tip */
  const insulator = (p: Pt, key: string) => (
    <g key={key}>
      <path d={`M ${p.x} ${p.y} L ${p.x} ${p.y + 5.4}`} stroke="#5b6b7d" strokeWidth="0.9" />
      {[1.4, 2.9, 4.4].map((dy) => (
        <ellipse key={dy} cx={p.x} cy={p.y + dy} rx="1.5" ry="0.72" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.4" />
      ))}
      <circle cx={p.x} cy={p.y + 5.9} r="0.6" fill="#475569" />
    </g>
  );
  const tips: Pt[] = [];
  armY.forEach((h, r) => {
    tips.push(iso(cx - armHalf[r], cy, h), iso(cx + armHalf[r], cy, h));
  });
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* lattice legs + bracing */}
      {base.map((b, i) => (
        <path key={i} d={`M ${b.x} ${b.y} L ${top.x} ${top.y}`} stroke="#8494a5" strokeWidth="1.1" />
      ))}
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <g key={t} stroke="#a4b1c0" strokeWidth="0.6">
          <path d={`M ${mid(base[0], top, t).x} ${mid(base[0], top, t).y} L ${mid(base[2], top, t + 0.1).x} ${mid(base[2], top, t + 0.1).y}`} />
          <path d={`M ${mid(base[1], top, t).x} ${mid(base[1], top, t).y} L ${mid(base[3], top, t + 0.1).x} ${mid(base[3], top, t + 0.1).y}`} />
          <path d={`M ${mid(base[2], top, t).x} ${mid(base[2], top, t).y} L ${mid(base[0], top, t + 0.1).x} ${mid(base[0], top, t + 0.1).y}`} />
        </g>
      ))}
      {/* cross-arms */}
      {armY.map((h, r) => {
        const a = iso(cx - armHalf[r], cy, h);
        const b = iso(cx + armHalf[r], cy, h);
        return <path key={r} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#7d8ea0" strokeWidth="1.5" />;
      })}
      {tips.map((p, i) => insulator(p, `ins-${i}`))}
      {/* conductor sag hints leaving the frame */}
      {tips.slice(0, 2).map((p, i) => (
        <path key={`c${i}`} d={`M ${p.x} ${p.y + 6} q ${i ? 16 : -16} 7 ${i ? 30 : -30} 5`} stroke="#94a3b8" strokeWidth="0.7" fill="none" opacity="0.8" />
      ))}
      {/* peak + danger plate */}
      <circle cx={top.x} cy={top.y} r="1.4" fill="#5b6b7d" />
      <g transform={`translate(${base[3].x - 1} ${base[3].y - 9})`}>
        <rect x="-2.4" y="-3" width="4.8" height="3.4" rx="0.4" fill="#fde68a" stroke="#a9721a" strokeWidth="0.4" />
        <path d="M 0 -2.5 L 0.9 -0.3 L -0.9 -0.3 Z" fill="#dc2626" />
      </g>
    </g>
  );
}

function gantry(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const h = c.h;
  const leg = (gx: number, gy: number) => {
    const g0 = iso(gx, gy);
    const g1 = iso(gx, gy, h);
    return (
      <g key={`${gx}-${gy}`}>
        <path d={`M ${g0.x} ${g0.y} L ${g1.x} ${g1.y}`} stroke="#8494a5" strokeWidth="1.6" />
        <path d={`M ${g0.x - 1} ${g0.y} L ${g1.x} ${g1.y - 4}`} stroke="#a4b1c0" strokeWidth="0.5" />
      </g>
    );
  };
  const beamA = iso(x + 0.5, y + 0.7, h);
  const beamB = iso(x + w - 0.5, y + 0.7, h);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <polygon points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])} fill="#e9edf2" stroke="#c2ccd8" strokeWidth="0.7" />
      {leg(x + 0.5, y + 0.7)} {leg(x + w - 0.5, y + 0.7)}
      {leg(x + 0.5, y + d - 0.7)} {leg(x + w - 0.5, y + d - 0.7)}
      <path d={`M ${beamA.x} ${beamA.y} L ${beamB.x} ${beamB.y}`} stroke="#7d8ea0" strokeWidth="2" />
      {/* copper busbar tubes under the beam */}
      <Pipe d={`M ${beamA.x + 2} ${beamA.y + 3} L ${beamB.x - 2} ${beamB.y + 3}`} w={1.8} dark="#a05f2c" light="#e8b57e" />
      {/* hanging insulator strings + drop jumpers */}
      {[0.28, 0.52, 0.76].map((t) => {
        const px = beamA.x + (beamB.x - beamA.x) * t;
        const py = beamA.y + (beamB.y - beamA.y) * t;
        return (
          <g key={t}>
            {[1.2, 2.7, 4.2].map((dy) => (
              <ellipse key={dy} cx={px} cy={py + dy} rx="1.3" ry="0.62" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.35" />
            ))}
            <path d={`M ${px} ${py + 5} q 3 6 1 12`} stroke="#94a3b8" strokeWidth="0.7" fill="none" />
          </g>
        );
      })}
      {/* CT / PT posts + isolator blade */}
      <Cyl cx={x + 1.6} cy={y + 2.6} r={0.36} h={6.5} grad="dcmCyl-white" />
      <ellipse cx={iso(x + 1.6, y + 2.6, 7.2).x} cy={iso(x + 1.6, y + 2.6, 7.2).y} rx="2" ry="1" fill="#dbe4ee" stroke="#7f8fa0" strokeWidth="0.5" />
      <Cyl cx={x + 3.4} cy={y + 2.6} r={0.32} h={7.5} grad="dcmCyl-white" />
      {(() => {
        const a = iso(x + 4.6, y + 2.6, 6.4);
        return <path d={`M ${a.x} ${a.y} l 9 -4.5`} stroke="#a05f2c" strokeWidth="1.1" strokeLinecap="round" />;
      })()}
      {/* breaker cabinet */}
      <Box x={x + w - 2.2} y={y + 2.2} w={1.3} d={1.1} h={7.5} mat="steel" />
      <Led x={iso(x + w - 1.55, y + 3.3, 5.4).x} y={iso(x + w - 1.55, y + 3.3, 5.4).y} color="g" r={0.7} />
    </g>
  );
}

function transformer(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const unitW = (w - 0.8) / 2;
  const unit = (ux: number, key: number) => {
    const bodyH = c.h - 6;
    const finN = 6;
    return (
      <g key={key}>
        {/* base rails + drip tray */}
        <Box x={ux - 0.15} y={y + 0.35} w={unitW + 0.3} d={d - 0.7} h={0.8} mat="dark" sw={0.4} highlight={false} />
        <Box x={ux} y={y + 0.5} w={unitW} d={d - 1} h={bodyH} mat="steel" />
        {/* corrugated radiator bank on the right face */}
        {Array.from({ length: finN }).map((_, i) => {
          const t = 0.12 + (i * 0.76) / (finN - 1);
          const a = iso(ux + unitW, y + 0.5 + (d - 1) * t, 1.2);
          const b = iso(ux + unitW, y + 0.5 + (d - 1) * t, bodyH - 1.2);
          return (
            <g key={i}>
              <path d={`M ${a.x} ${a.y} L ${a.x + 2.6} ${a.y + 1.3} L ${b.x + 2.6} ${b.y + 1.3} L ${b.x} ${b.y}`} fill="#c4cfdb" stroke="#8b99a9" strokeWidth="0.35" />
            </g>
          );
        })}
        {/* radiator cooling fan */}
        <Fan cx={iso(ux + unitW + 0.35, y + d / 2, bodyH * 0.45).x + 3} cy={iso(ux + unitW + 0.35, y + d / 2, bodyH * 0.45).y} r={0.55} guard={false} />
        {/* HV bushings: stacked porcelain discs */}
        {[0.24, 0.5, 0.76].map((t) => {
          const p = iso(ux + unitW * t, y + 1, bodyH);
          return (
            <g key={t}>
              <path d={`M ${p.x} ${p.y} L ${p.x} ${p.y - 7.5}`} stroke="#5b6b7d" strokeWidth="1.1" />
              {[1.4, 3, 4.6, 6.2].map((dy) => (
                <ellipse key={dy} cx={p.x} cy={p.y - dy} rx="1.35" ry="0.62" fill="#e5ebf2" stroke="#7f8fa0" strokeWidth="0.35" />
              ))}
              <circle cx={p.x} cy={p.y - 8} r="0.7" fill="#94a3b8" />
            </g>
          );
        })}
        {/* LV bushings (short, front) */}
        {[0.3, 0.5, 0.7].map((t) => {
          const p = iso(ux + unitW * t, y + d - 1.15, bodyH);
          return <path key={t} d={`M ${p.x} ${p.y} l 0 -3.2`} stroke="#7d8ea0" strokeWidth="1.6" strokeLinecap="round" />;
        })}
        {/* conservator + oil gauge + breather */}
        {(() => {
          const ccx = ux + unitW - 0.55;
          const top = iso(ccx, y + 0.95, bodyH + 1.1);
          return (
            <g>
              <Cyl cx={ccx} cy={y + 0.95} r={0.4} h={2.6} zBase={bodyH - 0.4} grad="dcmCyl-steel" />
              <circle cx={top.x - 2.4} cy={top.y + 1.6} r="0.75" fill="#fff" stroke="#7f8fa0" strokeWidth="0.4" />
              <path d={`M ${top.x - 2.4} ${top.y + 1.6} l 0.45 -0.4`} stroke="#dc2626" strokeWidth="0.35" />
              <path d={`M ${top.x + 1.8} ${top.y + 1} l 0 3.4`} stroke="#8b99a9" strokeWidth="0.8" />
              <Cyl cx={ccx + 0.55} cy={y + 0.95} r={0.14} h={1.2} zBase={bodyH - 2.2} grad="dcmCyl-blue" />
            </g>
          );
        })()}
        {/* nameplate */}
        <rect x={iso(ux + unitW * 0.5, y + d - 1, bodyH * 0.55).x - 2.2} y={iso(ux + unitW * 0.5, y + d - 1, bodyH * 0.55).y - 1.4} width="4.4" height="2.6" rx="0.3" fill="#eef2f7" stroke="#8b99a9" strokeWidth="0.35" />
      </g>
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {unit(x, 0)}
      {unit(x + unitW + 0.8, 1)}
    </g>
  );
}

function genset(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const unitW = (w - 1) / 2;
  const unit = (ux: number, key: number) => {
    const canH = c.h - 4;
    return (
      <g key={key}>
        {/* skid base */}
        <Box x={ux} y={y + 0.4} w={unitW} d={d - 0.8} h={2} mat="dark" sw={0.5} highlight={false} />
        {/* acoustic canopy */}
        <Box x={ux + 0.15} y={y + 0.6} w={unitW - 0.3} d={d - 1.2} h={canH} zBase={2} mat="green" />
        {/* roof rib lines */}
        {[0.3, 0.55, 0.8].map((t) => {
          const a = iso(ux + 0.3, y + 0.6 + (d - 1.2) * t, 2 + canH);
          const b = iso(ux + unitW - 0.15, y + 0.6 + (d - 1.2) * t, 2 + canH);
          return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#5d7c40" strokeWidth="0.4" opacity="0.7" />;
        })}
        {/* side louver band */}
        <LouversL x={ux + 0.5} y={y} d={d - 0.6} gx2={ux + unitW - 1.4} h0={2 + canH * 0.25} h1={2 + canH * 0.72} n={6} color="#4e6d35" />
        {/* radiator grate on the right end face */}
        {(() => {
          const A = iso(ux + unitW - 0.15, y + 0.6, 2 + canH * 0.85);
          const B = iso(ux + unitW - 0.15, y + d - 0.6, 2 + canH * 0.85);
          const Cg = iso(ux + unitW - 0.15, y + d - 0.6, 2 + canH * 0.12);
          const Dg = iso(ux + unitW - 0.15, y + 0.6, 2 + canH * 0.12);
          return (
            <g>
              <polygon points={pts([A, B, Cg, Dg])} fill="url(#dcmGrate)" stroke="#3f5a2a" strokeWidth="0.5" />
              <ellipse cx={(A.x + Cg.x) / 2} cy={(A.y + Cg.y) / 2} rx="3.4" ry="4.2" fill="#1e293b" opacity="0.45" />
            </g>
          );
        })()}
        {/* exhaust muffler + curved rain cap */}
        <Cyl cx={ux + 0.85} cy={y + 1.15} r={0.3} h={7} zBase={2 + canH - 1} grad="dcmCyl-steel" />
        {(() => {
          const p = iso(ux + 0.85, y + 1.15, 2 + canH + 6);
          return <path d={`M ${p.x} ${p.y} q 0 -2.4 2.4 -2.4`} stroke="#8b99a9" strokeWidth="1.6" fill="none" strokeLinecap="round" />;
        })()}
        {/* control cabinet with live screen */}
        <Box x={ux + unitW - 1.2} y={y + d - 1.6} w={0.95} d={0.95} h={canH - 3} zBase={2} mat="dark" sw={0.45} />
        {(() => {
          const p = iso(ux + unitW - 0.7, y + d - 0.62, 2 + (canH - 3) * 0.62);
          return <Screen x={p.x - 2.3} y={p.y - 1.6} w={4.6} h={3} />;
        })()}
        <Led x={iso(ux + 0.6, y + d - 0.6, 2 + canH * 0.85).x} y={iso(ux + 0.6, y + d - 0.6, 2 + canH * 0.85).y} color="g" delay={key * 0.6} r={0.7} />
      </g>
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {unit(x, 0)}
      {unit(x + unitW + 1, 1)}
    </g>
  );
}

function tank(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const rr = (c.h - 4) / 2;
  const endA = iso(cx, y + 0.55, 3 + rr);
  const endB = iso(cx, y + d - 0.55, 3 + rr);
  const rx = (w / 2 - 0.2) * TILE_W * 0.9;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* saddles */}
      <Box x={x + 0.3} y={y + 0.7} w={w - 0.6} d={0.55} h={3.2} mat="steel" highlight={false} />
      <Box x={x + 0.3} y={y + d - 1.25} w={w - 0.6} d={0.55} h={3.2} mat="steel" highlight={false} />
      {/* shell with sheen */}
      <path
        d={`M ${endA.x - rx} ${endA.y} L ${endB.x - rx} ${endB.y} A ${rx} ${rr * 1.15} 0 0 0 ${endB.x + rx} ${endB.y} L ${endA.x + rx} ${endA.y} Z`}
        fill="url(#dcmCyl-white)" stroke="#8b99a9" strokeWidth="0.8"
      />
      <ellipse cx={endA.x} cy={endA.y} rx={rx} ry={rr * 1.15} fill="#f4f8fb" stroke="#8b99a9" strokeWidth="0.8" />
      <ellipse cx={endA.x} cy={endA.y} rx={rx * 0.55} ry={rr * 0.62} fill="none" stroke="#b6c2cf" strokeWidth="0.6" />
      {/* strap bands over the shell */}
      {[0.32, 0.68].map((t) => {
        const px = endA.x + (endB.x - endA.x) * t;
        const py = endA.y + (endB.y - endA.y) * t;
        return <path key={t} d={`M ${px - rx} ${py} A ${rx} ${rr * 1.15} 0 0 1 ${px + rx} ${py}`} fill="none" stroke="#7d8ea0" strokeWidth="1" opacity="0.8" />;
      })}
      {/* manway with bolt ring + vent + level gauge + ladder + placard */}
      {(() => {
        const mid = { x: (endA.x + endB.x) / 2, y: (endA.y + endB.y) / 2 - rr * 1.05 };
        return (
          <g>
            <ellipse cx={mid.x} cy={mid.y} rx="2" ry="1.1" fill="#dbe4ee" stroke="#7f8fa0" strokeWidth="0.5" />
            <BoltRing cx={mid.x} cy={mid.y} rx={1.55} ry={0.8} n={8} />
            <path d={`M ${endB.x} ${endB.y - rr * 1.1} l 0 -3.6 l 1.4 0`} stroke="#8b99a9" strokeWidth="1" fill="none" />
            <rect x={endA.x + rx * 0.62} y={endA.y - rr * 0.75} width="1.1" height={rr * 1.5} rx="0.4" fill="#fff" stroke="#8b99a9" strokeWidth="0.35" />
            <rect x={endA.x + rx * 0.62} y={endA.y + rr * 0.05} width="1.1" height={rr * 0.7} rx="0.3" fill="#f6b73c" />
            {[0.25, 0.5, 0.75].map((t) => (
              <path key={t} d={`M ${endA.x - rx - 2.2} ${endA.y + rr * 1.1 - rr * 2.2 * t} l 2.2 0`} stroke="#8b99a9" strokeWidth="0.5" />
            ))}
            <path d={`M ${endA.x - rx - 2.2} ${endA.y + rr * 1.15} L ${endA.x - rx - 2.2} ${endA.y - rr * 1.2}`} stroke="#8b99a9" strokeWidth="0.7" />
            <g transform={`translate(${endB.x - 1} ${endB.y + rr * 0.4})`}>
              <rect x="-1.7" y="-1.7" width="3.4" height="3.4" rx="0.3" transform="rotate(45)" fill="#fde68a" stroke="#a9721a" strokeWidth="0.4" />
            </g>
          </g>
        );
      })()}
    </g>
  );
}

function watertank(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const r = w / 2 - 0.3;
  const rx = r * TILE_W * 1.414;
  const ry = r * TILE_H * 1.414;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Cyl cx={cx} cy={cy} r={r} h={c.h} grad="dcmCyl-blue" stroke="#6e93b1" capLight="#eef6fc" />
      {/* bolted panel rings + vertical seams */}
      {[0.3, 0.62, 0.9].map((t) => {
        const p = iso(cx, cy, c.h * t);
        return <path key={t} d={`M ${p.x - rx} ${p.y} A ${rx} ${ry} 0 0 0 ${p.x + rx} ${p.y}`} fill="none" stroke="#6e93b1" strokeWidth="0.7" opacity="0.85" />;
      })}
      {[-0.62, -0.2, 0.24, 0.66].map((t) => {
        const bx = iso(cx, cy).x + rx * t;
        return <path key={t} d={`M ${bx} ${iso(cx, cy).y + ry * Math.sqrt(Math.max(0, 1 - t * t))} L ${bx} ${iso(cx, cy, c.h).y + ry * Math.sqrt(Math.max(0, 1 - t * t))}`} stroke="#6e93b1" strokeWidth="0.45" opacity="0.6" />;
      })}
      {/* caged ladder + roof vent + inlet pipe */}
      {(() => {
        const gb = iso(cx + r, cy);
        const gt = iso(cx + r, cy, c.h);
        return (
          <g>
            <path d={`M ${gb.x} ${gb.y} L ${gt.x} ${gt.y}`} stroke="#7fa3c0" strokeWidth="1" />
            {[0.2, 0.4, 0.6, 0.8].map((t) => (
              <path key={t} d={`M ${gb.x - 1.4} ${gb.y + (gt.y - gb.y) * t} l 2.8 0`} stroke="#7fa3c0" strokeWidth="0.5" />
            ))}
            {[0.35, 0.6, 0.85].map((t) => (
              <path key={t} d={`M ${gb.x} ${gb.y + (gt.y - gb.y) * t} a 3 3 0 0 1 0 ${-((gt.y - gb.y) * 0.001) - 6}`} stroke="#7fa3c0" strokeWidth="0.4" fill="none" opacity="0.7" />
            ))}
            <Cyl cx={cx} cy={cy} r={0.28} h={1.6} zBase={c.h} grad="dcmCyl-steel" />
            <Pipe d={`M ${iso(cx - r - 1.6, cy + 0.4).x} ${iso(cx - r - 1.6, cy + 0.4).y - 2} L ${iso(cx - r + 0.2, cy + 0.4).x} ${iso(cx - r + 0.2, cy + 0.4).y - 2}`} w={2.2} dark="#b91c1c" light="#fda4af" />
          </g>
        );
      })()}
    </g>
  );
}

// ─── Cooling plant ───────────────────────────────────────────────────────────

function tower(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cells = 3;
  const gap = 0.5;
  const cellW = (w - gap * (cells - 1)) / cells;
  const cell = (ux: number, i: number) => {
    const topC = iso(ux + cellW / 2, y + d / 2, c.h + 2.1);
    const fr = Math.min(cellW, d) / 2 - 0.62;
    const crx = fr * TILE_W * 1.5;
    const cry = fr * TILE_H * 1.5;
    return (
      <g key={i}>
        {/* basin skirt + FRP casing */}
        <Box x={ux - 0.12} y={y - 0.12} w={cellW + 0.24} d={d + 0.24} h={1.6} mat="steel" highlight={false} />
        <Box x={ux} y={y} w={cellW} d={d} h={c.h} zBase={1.6} mat="metal" />
        {/* corner posts */}
        {[[ux, y + d], [ux + cellW, y + d], [ux + cellW, y]].map(([px, py], k) => {
          const a = iso(px, py, 1.6);
          const b = iso(px, py, 1.6 + c.h);
          return <path key={k} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#8b99a9" strokeWidth="0.8" />;
        })}
        {/* tall inlet louver bank */}
        <LouversL x={ux + 0.15} y={y} d={d} gx2={ux + cellW - 0.15} h0={2.6} h1={1.6 + c.h * 0.68} n={8} />
        {/* drift eliminator strip */}
        {(() => {
          const a = iso(ux + 0.15, y + d, 1.6 + c.h * 0.8);
          const b = iso(ux + cellW - 0.15, y + d, 1.6 + c.h * 0.8);
          return <path d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#0ea5e9" strokeWidth="1.4" opacity="0.35" />;
        })()}
        {/* fan cowl torus + fan + motor */}
        <ellipse cx={topC.x} cy={topC.y} rx={crx * 1.16} ry={cry * 1.16} fill="none" stroke="#8b99a9" strokeWidth="1.4" />
        <ellipse cx={topC.x} cy={topC.y} rx={crx * 1.16} ry={cry * 1.16} fill="#eef2f7" opacity="0.9" />
        <Fan cx={topC.x} cy={topC.y} r={fr} />
        <circle cx={topC.x} cy={topC.y - cry * 1.35} r="1" fill="#475569" />
      </g>
    );
  };
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {Array.from({ length: cells }).map((_, i) => cell(x + i * (cellW + gap), i))}
      {/* access ladder + handrail on the first cell */}
      {(() => {
        const gb = iso(x, y + d - 0.4);
        const gt = iso(x, y + d - 0.4, 1.6 + c.h);
        return (
          <g stroke="#7d8ea0" fill="none">
            <path d={`M ${gb.x} ${gb.y} L ${gt.x} ${gt.y}`} strokeWidth="0.9" />
            {[0.25, 0.45, 0.65, 0.85].map((t) => (
              <path key={t} d={`M ${gb.x - 1.4} ${gb.y + (gt.y - gb.y) * t} l 2.8 0`} strokeWidth="0.5" />
            ))}
            <path d={`M ${gt.x} ${gt.y} l -5 2.4`} strokeWidth="0.7" />
          </g>
        );
      })()}
    </g>
  );
}

function chiller(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const baseH = 2.6;
  const vr = (c.h - 6) / 2;
  const vessel = (vy: number, grad: string, key: number) => {
    const a = iso(x + 0.7, vy, baseH + vr + 0.6);
    const b = iso(x + w - 1.9, vy, baseH + vr + 0.6);
    return (
      <g key={key}>
        <path
          d={`M ${a.x} ${a.y - vr} L ${b.x} ${b.y - vr} A ${vr * 0.72} ${vr} 0 0 1 ${b.x} ${b.y + vr} L ${a.x} ${a.y + vr} A ${vr * 0.72} ${vr} 0 0 1 ${a.x} ${a.y - vr} Z`}
          fill={`url(#${grad})`} stroke="#7f8fa0" strokeWidth="0.8"
        />
        <ellipse cx={b.x} cy={b.y} rx={vr * 0.72} ry={vr} fill="#eef3f8" stroke="#7f8fa0" strokeWidth="0.8" />
        <BoltRing cx={b.x} cy={b.y} rx={vr * 0.52} ry={vr * 0.74} n={10} />
        <ellipse cx={a.x} cy={a.y} rx={vr * 0.72} ry={vr} fill="none" stroke="#93a3b5" strokeWidth="0.5" opacity="0.7" />
      </g>
    );
  };
  const compA = iso(x + w * 0.42, y + d / 2, baseH + vr * 2 + 1.2);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={baseH} mat="dark" sw={0.5} highlight={false} />
      {vessel(y + 0.95, "dcmCyl-steel", 0)}
      {vessel(y + d - 0.95, "dcmCyl-blue", 1)}
      {/* screw compressor straddling the vessels */}
      <g>
        <ellipse cx={compA.x + 8} cy={compA.y + 4.5} rx="9" ry="3.6" fill="#0f172a" opacity="0.12" />
        <path d={`M ${compA.x - 6} ${compA.y} L ${compA.x + 12} ${compA.y - 2} A 3.2 4 0 0 1 ${compA.x + 12} ${compA.y + 6} L ${compA.x - 6} ${compA.y + 8} A 3.2 4 0 0 1 ${compA.x - 6} ${compA.y} Z`} fill="url(#dcmCyl-steel)" stroke="#64748b" strokeWidth="0.8" />
        <ellipse cx={compA.x + 12} cy={compA.y + 2} rx="3.2" ry="4" fill="#dde4ec" stroke="#64748b" strokeWidth="0.8" />
        <Pipe d={`M ${compA.x - 2} ${compA.y + 1} q -6 2 -8 7`} w={2.6} />
        <Pipe d={`M ${compA.x + 6} ${compA.y + 6.4} q 4 4 3 9`} w={2.6} dark="#6e93b1" light="#dbeafe" />
      </g>
      {/* VFD / control panel with live screen */}
      <Box x={x + w - 1.6} y={y + d / 2 - 0.75} w={1.25} d={1.5} h={c.h - 3.2} zBase={baseH} mat="dark" sw={0.5} />
      {(() => {
        const p = iso(x + w - 0.95, y + d / 2 + 0.75, baseH + (c.h - 3.2) * 0.58);
        return <Screen x={p.x - 3.2} y={p.y - 2.1} w={6.4} h={4} />;
      })()}
      {/* insulated CHW connections with flanges */}
      <Pipe d={`M ${iso(x + 0.7, y + d - 0.95, baseH + vr).x} ${iso(x + 0.7, y + d - 0.95, baseH + vr).y} l -7 3.4`} w={3} dark="#6e93b1" light="#dbeafe" />
      <ellipse cx={iso(x + 0.7, y + d - 0.95, baseH + vr).x - 7} cy={iso(x + 0.7, y + d - 0.95, baseH + vr).y + 3.4} rx="1.5" ry="1" fill="#dbe4ee" stroke="#6e93b1" strokeWidth="0.5" />
    </g>
  );
}

function pumps(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isFuel = c.id === "fuel-system";
  const isRoom = c.id === "pumps";
  const RH = 10;
  if (isFuel) {
    // Fuel transfer skid: day tank + twin red pumps + valved manifold
    return (
      <g>
        <Shadow x={x} y={y} w={w} d={d} />
        <Box x={x} y={y} w={w} d={d} h={1.4} mat="dark" sw={0.45} highlight={false} />
        <Box x={x + 0.15} y={y + 0.2} w={1.15} d={d - 0.5} h={c.h - 4} zBase={1.4} mat="steel" />
        {[0.42, 0.78].map((t, i) => (
          <g key={i}>
            <Cyl cx={x + w * t} cy={y + d * 0.42} r={0.34} h={c.h - 7} zBase={1.4} grad="dcmCyl-red" stroke="#8a1f2b" capLight="#fecdd3" />
            <Box x={x + w * t - 0.34} y={y + d * 0.62} w={0.68} d={0.6} h={c.h - 8.4} zBase={1.4} mat="dark" sw={0.4} />
          </g>
        ))}
        <Pipe d={`M ${iso(x + 1.35, y + d * 0.42, c.h - 5).x} ${iso(x + 1.35, y + d * 0.42, c.h - 5).y} L ${iso(x + w - 0.2, y + d * 0.42, c.h - 5).x} ${iso(x + w - 0.2, y + d * 0.42, c.h - 5).y}`} w={1.8} dark="#a9721a" light="#fde68a" />
        {[0.42, 0.78].map((t) => {
          const p = iso(x + w * t, y + d * 0.42, c.h - 4.2);
          return (
            <g key={t} stroke="#8a1f2b" strokeWidth="0.6" fill="none">
              <circle cx={p.x} cy={p.y - 1.4} r="1.05" fill="#fda4af" />
              <path d={`M ${p.x - 1.05} ${p.y - 1.4} L ${p.x + 1.05} ${p.y - 1.4} M ${p.x} ${p.y - 2.45} L ${p.x} ${p.y - 0.35}`} />
            </g>
          );
        })}
      </g>
    );
  }
  const n = 3;
  const pw = (w - 0.4 * (n + 1)) / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {isRoom && (
        <g>
          <Box x={x - 0.35} y={y - 0.35} w={w + 0.7} d={0.3} h={RH} mat="metal" sw={0.6} />
          <Box x={x - 0.35} y={y - 0.05} w={0.3} d={d + 0.4} h={RH} mat="metal" sw={0.6} />
          <Box x={x + w + 0.05} y={y - 0.05} w={0.3} d={d + 0.4} h={RH} mat="metal" sw={0.6} />
          <Box x={x - 0.35} y={y - 0.35} w={w + 0.7} d={d + 0.7} h={0.7} zBase={RH} mat="steel" sw={0.5} highlight={false} />
        </g>
      )}
      <Box x={x} y={y} w={w} d={d} h={1.5} mat="dark" sw={0.45} highlight={false} />
      {Array.from({ length: n }).map((_, i) => {
        const px = x + 0.4 + i * (pw + 0.4);
        const volute = iso(px + pw * 0.32, y + d * 0.68, 1.5 + (c.h - 4) * 0.35);
        return (
          <g key={i}>
            {/* motor + coupling + volute (end-suction set) */}
            <Cyl cx={px + pw / 2} cy={y + d * 0.3} r={pw * 0.3} h={c.h - 4.4} zBase={1.5} grad="dcmCyl-steel" />
            <path d={`M ${iso(px + pw / 2, y + d * 0.44, 1.5 + (c.h - 4.4) * 0.4).x} ${iso(px + pw / 2, y + d * 0.44, 1.5 + (c.h - 4.4) * 0.4).y} l 2.2 1.1`} stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx={volute.x} cy={volute.y} r={pw * TILE_W * 0.24} fill="url(#dcmCyl-blue)" stroke="#4c7ba1" strokeWidth="0.7" />
            <circle cx={volute.x} cy={volute.y} r={pw * TILE_W * 0.1} fill="#dbeafe" stroke="#4c7ba1" strokeWidth="0.5" />
            {/* discharge riser + gauge */}
            <Pipe d={`M ${volute.x} ${volute.y} l 0 ${-((c.h - 2) * 1.1)}`} w={2} dark="#6e93b1" light="#dbeafe" />
            <circle cx={volute.x + 1.6} cy={volute.y - (c.h - 2) * 1.1 + 1.2} r="0.8" fill="#fff" stroke="#64748b" strokeWidth="0.35" />
          </g>
        );
      })}
      {/* common CHW header with end flanges */}
      <Pipe
        d={`M ${iso(x + 0.5, y + 0.26 * d, c.h - 1).x} ${iso(x + 0.5, y + 0.26 * d, c.h - 1).y} L ${iso(x + w - 0.5, y + 0.26 * d, c.h - 1).x} ${iso(x + w - 0.5, y + 0.26 * d, c.h - 1).y}`}
        w={2.6} dark="#6e93b1" light="#dbeafe"
      />
      <ellipse cx={iso(x + w - 0.5, y + 0.26 * d, c.h - 1).x} cy={iso(x + w - 0.5, y + 0.26 * d, c.h - 1).y} rx="1.4" ry="0.9" fill="#dbe4ee" stroke="#6e93b1" strokeWidth="0.5" />
    </g>
  );
}

// ─── Electrical rooms ────────────────────────────────────────────────────────

function panelRow(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isUps = c.id === "ups";
  const n = 5;
  const cw = w / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* plinth */}
      <Box x={x - 0.08} y={y - 0.08} w={w + 0.16} d={d + 0.16} h={1} mat="dark" sw={0.4} highlight={false} />
      {Array.from({ length: n }).map((_, i) => {
        const ux = x + i * cw;
        const fMid = iso(ux + cw * 0.5, y + d, 0);
        return (
          <g key={i}>
            <Box x={ux + 0.06} y={y} w={cw - 0.12} d={d} h={c.h} zBase={1} mat={isUps ? "metal" : "steel"} sw={0.5} />
            {isUps ? (
              <g>
                {/* Galaxy-style: lower ventilation grille + upper status window */}
                <LouversL x={ux + 0.28} y={y} d={d} gx2={ux + cw - 0.28} h0={2.2} h1={1 + c.h * 0.42} n={5} color="#9fb0c2" />
                <rect x={fMid.x - cw * 4.2} y={fMid.y - (1 + c.h) * 0.86} width={cw * 8.4} height={c.h * 0.26} rx="0.6" fill="#16202c" stroke="#0b1420" strokeWidth="0.4" />
                <rect x={fMid.x - cw * 3.4} y={fMid.y - (1 + c.h) * 0.82} width={cw * 4.4} height={c.h * 0.1} rx="0.4" fill="#34d399" opacity="0.9" className="dcm-led" style={{ animationDelay: `${i * 0.35}s` }} />
                <Led x={fMid.x + cw * 3.2} y={fMid.y - (1 + c.h) * 0.8} color="g" delay={i * 0.35} r={0.6} />
              </g>
            ) : (
              <g>
                {/* switchboard: rotary handle, pilot lamps, doc pocket, mimic */}
                <circle cx={fMid.x - cw * 2} cy={fMid.y - (1 + c.h) * 0.55} r="1.15" fill="#dde4ec" stroke="#64748b" strokeWidth="0.5" />
                <path d={`M ${fMid.x - cw * 2} ${fMid.y - (1 + c.h) * 0.55} l 0.9 -0.6`} stroke="#334155" strokeWidth="0.6" />
                <Led x={fMid.x + cw * 1.4} y={fMid.y - (1 + c.h) * 0.72} color="g" delay={i * 0.3} r={0.55} />
                <Led x={fMid.x + cw * 2.8} y={fMid.y - (1 + c.h) * 0.72} color="r" delay={i * 0.3 + 0.5} r={0.55} />
                <rect x={fMid.x - cw * 0.6} y={fMid.y - (1 + c.h) * 0.42} width={cw * 3.6} height={c.h * 0.16} rx="0.3" fill="#eef2f7" stroke="#93a3b5" strokeWidth="0.35" />
                <path d={`M ${fMid.x - cw * 3} ${fMid.y - (1 + c.h) * 0.24} l ${cw * 6} 0`} stroke="#f59e0b" strokeWidth="0.7" opacity="0.85" />
              </g>
            )}
          </g>
        );
      })}
      {/* busbar chamber band (LT) / roof cable tray (UPS) */}
      {isUps ? (
        <Box x={x + 0.4} y={y + d * 0.35} w={w - 0.8} d={0.4} h={1} zBase={1 + c.h} mat="amber" sw={0.4} highlight={false} />
      ) : (
        <Box x={x} y={y + 0.1} w={w} d={0.6} h={1.6} zBase={1 + c.h - 0.2} mat="steel" sw={0.4} highlight={false} />
      )}
    </g>
  );
}

function battery(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const tiers = [1.2, c.h * 0.55];
  const perTier = 8;
  const bw = (w - 1.9) / perTier;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* open steel frame */}
      {[x + 0.1, x + w - 1.5].map((fx, i) => (
        <g key={i}>
          {[y + 0.2, y + d - 0.2].map((fy, j) => {
            const a = iso(fx, fy);
            const b = iso(fx, fy, c.h + 1);
            return <path key={j} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#7d8ea0" strokeWidth="1" />;
          })}
        </g>
      ))}
      {tiers.map((tz, ti) => (
        <g key={ti}>
          <Box x={x + 0.1} y={y + 0.15} w={w - 1.5} d={d - 0.3} h={0.5} zBase={tz - 0.5} mat="steel" sw={0.4} highlight={false} />
          {Array.from({ length: perTier }).map((_, i) => {
            const bx = x + 0.25 + i * bw;
            const term = iso(bx + bw * 0.5, y + d - 0.5, tz + 2.6);
            return (
              <g key={i}>
                <Box x={bx} y={y + 0.4} w={bw - 0.14} d={d - 0.8} h={2.6} zBase={tz} mat="dark" sw={0.35} highlight={false} />
                <circle cx={term.x - 1} cy={term.y} r="0.4" fill="#f6b73c" />
                <circle cx={term.x + 1} cy={term.y} r="0.4" fill="#94a3b8" />
              </g>
            );
          })}
          {/* orange inter-cell jumpers */}
          <path
            d={Array.from({ length: perTier - 1 })
              .map((_, i) => {
                const a = iso(x + 0.25 + (i + 0.5) * bw + bw * 0.35, y + d - 0.5, tz + 2.6);
                const b = iso(x + 0.25 + (i + 1.5) * bw - bw * 0.35, y + d - 0.5, tz + 2.6);
                return `M ${a.x + 1} ${a.y} L ${b.x - 1} ${b.y}`;
              })
              .join(" ")}
            stroke="#f97316" strokeWidth="0.7" fill="none" opacity="0.9"
          />
        </g>
      ))}
      {/* end DC breaker cabinet */}
      <Box x={x + w - 1.3} y={y + 0.2} w={1.2} d={d - 0.4} h={c.h + 0.6} mat="metal" sw={0.5} />
      <Led x={iso(x + w - 0.7, y + d - 0.25, (c.h + 0.6) * 0.7).x} y={iso(x + w - 0.7, y + d - 0.25, (c.h + 0.6) * 0.7).y} color="g" r={0.6} />
    </g>
  );
}

// ─── Server hall ─────────────────────────────────────────────────────────────

function rackRows(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const rows = 4;
  const perRow = 6;
  const rackW = 1.95;
  const rackD = 2.15;
  const gap = (w - perRow * rackW) / (perRow - 1);
  const rowGap = (d - rows * rackD) / (rows - 1);
  const out: ReactNode[] = [];

  const band = (key: string, by: number, bd: number, kind: "cold" | "hot") => {
    const quad = pts([
      iso(x - 0.35, by), iso(x + w + 0.35, by),
      iso(x + w + 0.35, by + bd), iso(x - 0.35, by + bd),
    ]);
    const dots: ReactNode[] = [];
    if (kind === "cold") {
      for (let i = 0; i < perRow * 2; i++) {
        const p = iso(x + 0.35 + i * (w / (perRow * 2)), by + bd / 2);
        dots.push(<circle key={i} cx={p.x} cy={p.y} r="0.55" fill="#7fb3e0" opacity="0.55" />);
      }
    }
    return (
      <g key={key} className={`dcm-aisle dcm-aisle--${kind}`}>
        <polygon points={quad} fill={kind === "cold" ? "#dbeafe" : "#fde8df"} opacity={kind === "cold" ? 0.6 : 0.5} />
        {dots}
      </g>
    );
  };

  out.push(band("aisle-front", y - 0.95, 0.85, "cold"));
  for (let r = 0; r < rows - 1; r++) {
    const by = y + (r + 1) * rackD + r * rowGap + 0.12;
    out.push(band(`aisle-${r}`, by, rowGap - 0.24, r % 2 === 0 ? "hot" : "cold"));
  }
  out.push(band("aisle-back", y + d + 0.1, 0.85, "cold"));

  for (let r = 0; r < rows; r++) {
    const ry = y + r * (rackD + rowGap);
    for (let i = 0; i < perRow; i++) {
      const rx = x + i * (rackW + gap);
      // perforated front door inset on the front-left face
      const dA = iso(rx + 0.16, ry + rackD, c.h * 0.92);
      const dB = iso(rx + rackW - 0.34, ry + rackD, c.h * 0.92);
      const dC = iso(rx + rackW - 0.34, ry + rackD, c.h * 0.06);
      const dD = iso(rx + 0.16, ry + rackD, c.h * 0.06);
      const handleT = iso(rx + rackW - 0.24, ry + rackD, c.h * 0.62);
      const handleB = iso(rx + rackW - 0.24, ry + rackD, c.h * 0.34);
      const ledA = iso(rx + rackW, ry + rackD - 0.3, c.h * 0.86);
      out.push(
        <g key={`${r}-${i}`}>
          <Box x={rx} y={ry} w={rackW} d={rackD} h={c.h} mat="dark" sw={0.5} />
          <polygon points={pts([dA, dB, dC, dD])} fill="#101b28" stroke="#0a121c" strokeWidth="0.35" />
          <polygon points={pts([dA, dB, dC, dD])} fill="url(#dcmPerf)" opacity="0.85" />
          <path d={`M ${handleT.x} ${handleT.y} L ${handleB.x} ${handleB.y}`} stroke="#9fb0c2" strokeWidth="0.9" strokeLinecap="round" />
          {[0.14, 0.86].map((t) => {
            const hp = iso(rx + 0.1, ry + rackD, c.h * t);
            return <circle key={t} cx={hp.x} cy={hp.y} r="0.35" fill="#3c4c5f" />;
          })}
          {/* roof vent slits */}
          {[0.3, 0.5, 0.7].map((t) => {
            const a = iso(rx + rackW * t, ry + 0.3, c.h);
            const b = iso(rx + rackW * t, ry + rackD - 0.3, c.h);
            return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#54677c" strokeWidth="0.4" opacity="0.8" />;
          })}
          <Led x={ledA.x} y={ledA.y} color={(r + i) % 2 ? "b" : "g"} delay={(r * perRow + i) * 0.13} r={0.55} />
          <Led x={ledA.x} y={ledA.y + 2} color="g" delay={(r * perRow + i) * 0.13 + 0.4} r={0.45} />
          <Led x={ledA.x} y={ledA.y + 4} color={(r + i) % 3 ? "g" : "r"} delay={(r * perRow + i) * 0.13 + 0.8} r={0.45} />
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
  const rw = (w - 0.8) / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {Array.from({ length: n }).map((_, i) => {
        const rx = x + 0.2 + i * (rw + 0.2);
        const f = (t: number) => iso(rx + rw * 0.5, y + d, c.h * t);
        return (
          <g key={i}>
            <Box x={rx} y={y + 0.25} w={rw - 0.1} d={d - 0.5} h={c.h} mat="dark" sw={0.5} />
            {/* patch panel 1U strips with port hints */}
            {[0.72, 0.56, 0.4, 0.24].map((t) => {
              const a = iso(rx + 0.14, y + d - 0.25, c.h * t);
              const b = iso(rx + rw - 0.24, y + d - 0.25, c.h * t);
              return (
                <g key={t}>
                  <path d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#334458" strokeWidth="1.5" />
                  <path d={`M ${a.x + 0.6} ${a.y + 0.3} L ${b.x - 0.6} ${b.y + 0.3}`} stroke="#67e8f9" strokeWidth="0.45" strokeDasharray="0.7 0.9" opacity="0.9" />
                </g>
              );
            })}
            {/* draped patch cables */}
            <path d={`M ${f(0.72).x - 2} ${f(0.72).y} q -3 4 -1 8`} stroke="#22d3ee" strokeWidth="0.6" fill="none" opacity="0.9" />
            <path d={`M ${f(0.56).x + 1.5} ${f(0.56).y} q 3 3.4 1.4 7`} stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.9" />
            <Led x={f(0.86).x} y={f(0.86).y} color="b" delay={i * 0.3} r={0.55} />
          </g>
        );
      })}
    </g>
  );
}

function crah(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isAhu = c.id === "ahu";
  const isCrac = c.id === "crac";
  const fMid = iso(x + w / 2, y + d, 0);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {isAhu && (
        <g>
          <Box x={x + w - 1.1} y={y + d + 0.15} w={1.05} d={0.6} h={c.h - 3} mat="metal" sw={0.6} />
          {[0.25, 0.42, 0.59, 0.76].map((t) => {
            const a = iso(x + w - 1.02, y + d + 0.75, (c.h - 3) * t);
            const b = iso(x + w - 0.13, y + d + 0.75, (c.h - 3) * t);
            return <path key={t} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#0ea5e9" strokeWidth="0.8" opacity="0.6" />;
          })}
          <Pipe d={`M ${iso(x + w - 0.58, y + d + 0.45, c.h - 3).x} ${iso(x + w - 0.58, y + d + 0.45, c.h - 3).y} L ${iso(x + w - 0.58, y + d + 0.45, c.h + 3.5).x} ${iso(x + w - 0.58, y + d + 0.45, c.h + 3.5).y} L ${iso(x + w - 1.6, y + d * 0.5, c.h + 3.5).x} ${iso(x + w - 1.6, y + d * 0.5, c.h + 3.5).y}`} w={2.6} />
        </g>
      )}
      <Box x={x} y={y} w={w} d={d} h={c.h} mat="metal" />
      {/* brand strip + hinges */}
      <path d={`M ${iso(x + 0.2, y + d, c.h * 0.94).x} ${iso(x + 0.2, y + d, c.h * 0.94).y} L ${iso(x + w - 0.2, y + d, c.h * 0.94).x} ${iso(x + w - 0.2, y + d, c.h * 0.94).y}`} stroke="#0ea5e9" strokeWidth="1.1" opacity="0.8" />
      {[0.22, 0.5, 0.78].map((t) => {
        const p = iso(x + w * t + 0.35, y + d, c.h * 0.06);
        return <circle key={t} cx={p.x} cy={p.y} r="0.35" fill="#7d8ea0" />;
      })}
      {/* glass coil window with diagonal coil hatch */}
      {(() => {
        const A = iso(x + w * 0.14, y + d, c.h * 0.78);
        const B = iso(x + w * 0.6, y + d, c.h * 0.78);
        const Cq = iso(x + w * 0.6, y + d, c.h * 0.34);
        const D = iso(x + w * 0.14, y + d, c.h * 0.34);
        return (
          <g>
            <polygon points={pts([A, B, Cq, D])} fill="url(#dcmGlass)" stroke="#5d87a8" strokeWidth="0.5" />
            {[0.2, 0.45, 0.7].map((t) => (
              <path key={t} d={`M ${A.x + (B.x - A.x) * t} ${A.y + (B.y - A.y) * t} L ${D.x + (Cq.x - D.x) * (t + 0.16)} ${D.y + (Cq.y - D.y) * (t + 0.16)}`} stroke="#2f6690" strokeWidth="0.5" opacity="0.7" />
            ))}
          </g>
        );
      })()}
      {/* bottom discharge grille */}
      <LouversL x={x + 0.25} y={y} d={d} gx2={x + w - 0.25} h0={c.h * 0.08} h1={c.h * 0.24} n={3} />
      {/* dual EC fan decks on the roof */}
      <Fan cx={iso(x + w * 0.3, y + d * 0.5, c.h + 0.8).x} cy={iso(x + w * 0.3, y + d * 0.5, c.h + 0.8).y} r={Math.min(w, d) * 0.21} />
      <Fan cx={iso(x + w * 0.7, y + d * 0.5, c.h + 0.8).x} cy={iso(x + w * 0.7, y + d * 0.5, c.h + 0.8).y} r={Math.min(w, d) * 0.21} />
      <Screen x={fMid.x + w * 2.6} y={fMid.y - c.h * 0.86} w={5} h={3.2} />
      {isCrac && (
        <g transform={`translate(${fMid.x - w * 3.4} ${fMid.y - c.h * 0.9})`} stroke="#0ea5e9" strokeWidth="0.55" fill="none">
          <path d="M 0 -1.6 L 0 1.6 M -1.4 -0.8 L 1.4 0.8 M -1.4 0.8 L 1.4 -0.8" />
        </g>
      )}
    </g>
  );
}

// ─── Fire ────────────────────────────────────────────────────────────────────

function cylinders(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  if (c.id === "vesda") {
    const fMid = iso(x + w / 2, y + d, 0);
    return (
      <g>
        <Shadow x={x} y={y} w={w} d={d} />
        <Box x={x} y={y} w={w} d={d} h={c.h} mat="red" sw={0.6} />
        <rect x={fMid.x - w * 4.4} y={fMid.y - c.h * 0.7} width={w * 6} height={c.h * 0.18} rx="0.5" fill="#16202c" />
        <rect x={fMid.x - w * 3.8} y={fMid.y - c.h * 0.66} width={w * 2.4} height={c.h * 0.09} rx="0.3" fill="#34d399" className="dcm-led" />
        {/* aspirating sampling pipe with hole ticks */}
        <Pipe d={`M ${iso(x + w * 0.5, y + 0.15, c.h).x} ${iso(x + w * 0.5, y + 0.15, c.h).y} l 0 -6 l 14 -7`} w={1.6} dark="#b91c1c" light="#fda4af" />
        {[0.35, 0.55, 0.75, 0.95].map((t) => (
          <circle key={t} cx={iso(x + w * 0.5, y + 0.15, c.h).x + 14 * t} cy={iso(x + w * 0.5, y + 0.15, c.h).y - 6 - 7 * t} r="0.4" fill="#7f1d1d" />
        ))}
        <Led x={fMid.x + w * 4} y={fMid.y - c.h * 0.82} color="r" r={0.6} />
      </g>
    );
  }
  // FM200 / Novec bank: cylinders + manifold + solenoids + discharge nozzle
  const n = 3;
  const step = w / n;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y + d - 0.5} w={w} d={0.4} h={c.h * 0.55} mat="steel" sw={0.4} highlight={false} />
      {Array.from({ length: n }).map((_, i) => {
        const ccx = x + step * (i + 0.5);
        const top = iso(ccx, y + d * 0.45, c.h - 1.6);
        return (
          <g key={i}>
            <Cyl cx={ccx} cy={y + d * 0.45} r={step * 0.32} h={c.h - 2.4} grad="dcmCyl-red" stroke="#8a1f2b" capLight="#fecdd3" />
            <Box x={ccx - 0.22} y={y + d * 0.32} w={0.44} d={0.4} h={1.3} zBase={c.h - 2.3} mat="dark" sw={0.3} highlight={false} />
            <circle cx={top.x + 1.6} cy={top.y - 0.4} r="0.65" fill="#fff" stroke="#8a1f2b" strokeWidth="0.35" />
          </g>
        );
      })}
      <Pipe d={`M ${iso(x + step * 0.5, y + d * 0.45, c.h - 0.6).x} ${iso(x + step * 0.5, y + d * 0.45, c.h - 0.6).y} L ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).x} ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).y}`} w={1.8} dark="#8a1f2b" light="#fda4af" />
      <Pipe d={`M ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).x} ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).y} l 0 -5 l -8 -4`} w={1.8} dark="#8a1f2b" light="#fda4af" />
      <path d={`M ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).x - 8} ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).y - 9} l -1.6 -0.8 M ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).x - 8} ${iso(x + w - step * 0.5, y + d * 0.45, c.h - 0.6).y - 9} l -0.4 1.6`} stroke="#8a1f2b" strokeWidth="0.7" />
    </g>
  );
}

// ─── Operations / security ───────────────────────────────────────────────────

function consoleShape(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  if (c.id === "cctv") {
    // camera mast: pole + two bullet cams + dome + junction box
    const cx = x + w / 2;
    const cy = y + d / 2;
    const base = iso(cx, cy);
    const top = iso(cx, cy, c.h + 4);
    return (
      <g>
        <Shadow x={x} y={y} w={w} d={d} />
        <Box x={cx - 0.5} y={cy - 0.5} w={1} d={1} h={0.8} mat="steel" sw={0.4} highlight={false} />
        <path d={`M ${base.x} ${base.y - 1} L ${top.x} ${top.y}`} stroke="#7d8ea0" strokeWidth="1.7" strokeLinecap="round" />
        <Box x={cx - 0.36} y={cy - 0.36} w={0.72} d={0.6} h={1.6} zBase={2.4} mat="metal" sw={0.35} />
        {/* bullet cameras */}
        {[{ dx: -1, r: 0 }, { dx: 1, r: 180 }].map((cam, i) => (
          <g key={i} transform={`translate(${top.x + cam.dx * 2.2} ${top.y + 1 + i * 1.4}) rotate(${cam.dx < 0 ? -18 : 198})`}>
            <rect x="0" y="-0.9" width="4.6" height="1.8" rx="0.9" fill="url(#dcmCyl-steel)" stroke="#64748b" strokeWidth="0.4" />
            <circle cx="4.4" cy="0" r="0.7" fill="#0f172a" />
            <circle cx="4.55" cy="-0.18" r="0.2" fill="#67e8f9" />
          </g>
        ))}
        <path d={`M ${top.x} ${top.y} l 0 -1.6`} stroke="#7d8ea0" strokeWidth="1" />
        <circle cx={top.x} cy={top.y - 2.6} r="1.15" fill="#1e293b" stroke="#0f172a" strokeWidth="0.4" />
        <circle cx={top.x - 0.3} cy={top.y - 2.9} r="0.35" fill="#93c5fd" opacity="0.9" />
        <Led x={top.x + 1.6} y={top.y - 2.4} color="r" r={0.45} />
      </g>
    );
  }
  const isNoc = c.id === "noc";
  const screens = isNoc ? 3 : 2;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {/* console desk */}
      <Box x={x + 0.3} y={y + d - 1.5} w={w - 0.6} d={1.1} h={3.4} mat="metal" sw={0.5} />
      {/* video wall */}
      <Box x={x + 0.15} y={y + 0.2} w={w - 0.3} d={0.5} h={c.h} mat="dark" sw={0.5} />
      {Array.from({ length: screens }).map((_, i) => {
        const sw2 = (w - 0.9) / screens;
        const p = iso(x + 0.45 + i * sw2 + sw2 / 2, y + 0.75, c.h * 0.58);
        return (
          <g key={i}>
            <Screen x={p.x - sw2 * 3.6} y={p.y - c.h * 0.32} w={sw2 * 7.2} h={c.h * 0.62} />
            {isNoc && i === 1 && (
              <g fill="#e0f2fe" opacity="0.85">
                {[[-3, 0.5], [-1, -0.8], [1.2, 0.2], [3, -0.5], [0, 1.4]].map(([dx, dy], k) => (
                  <circle key={k} cx={p.x + dx} cy={p.y + dy} r="0.35" />
                ))}
              </g>
            )}
          </g>
        );
      })}
      {/* desk monitors + operator chairs */}
      {[0.35, 0.65].map((t) => {
        const p = iso(x + w * t, y + d - 0.95, 3.6);
        const ch = iso(x + w * t, y + d + 0.5, 0);
        return (
          <g key={t}>
            <rect x={p.x - 1.7} y={p.y - 2.3} width="3.4" height="2.2" rx="0.3" fill="url(#dcmScreen)" stroke="#0c4a6e" strokeWidth="0.3" />
            <circle cx={ch.x} cy={ch.y - 1.4} r="1.5" fill="#334155" />
            <path d={`M ${ch.x - 1.5} ${ch.y - 1.4} a 1.5 1.5 0 0 1 3 0`} fill="#1e293b" />
          </g>
        );
      })}
      <Led x={iso(x + w - 0.5, y + 0.5, c.h * 0.94).x} y={iso(x + w - 0.5, y + 0.5, c.h * 0.94).y} color="g" r={0.55} />
    </g>
  );
}

function gate(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const frame = (gx: number) => (
    <g key={gx}>
      <Box x={gx} y={y + 0.2} w={0.34} d={d - 0.4} h={c.h} mat="steel" sw={0.45} />
    </g>
  );
  const paneA = iso(x + 0.5, y + d - 0.55, c.h * 0.88);
  const paneB = iso(x + w - 0.5, y + d - 0.55, c.h * 0.88);
  const paneC = iso(x + w - 0.5, y + d - 0.55, c.h * 0.1);
  const paneD = iso(x + 0.5, y + d - 0.55, c.h * 0.1);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {frame(x)}
      {frame(x + w / 2 - 0.17)}
      {frame(x + w - 0.34)}
      <polygon points={pts([paneA, paneB, paneC, paneD])} fill="url(#dcmGlass)" stroke="#5d87a8" strokeWidth="0.5" opacity="0.92" />
      <path d={`M ${paneA.x + 2} ${paneA.y + 1} L ${paneD.x + 7} ${paneD.y - 1}`} stroke="#ffffff" strokeWidth="1.2" opacity="0.55" />
      {/* lintel + card reader */}
      <Box x={x - 0.1} y={y + 0.15} w={w + 0.2} d={d - 0.3} h={1} zBase={c.h} mat="steel" sw={0.45} highlight={false} />
      <Box x={x + w - 0.25} y={y + d - 0.35} w={0.22} d={0.24} h={2.4} zBase={c.h * 0.36} mat="dark" sw={0.3} />
      <Led x={iso(x + w - 0.14, y + d - 0.11, c.h * 0.36 + 1.9).x} y={iso(x + w - 0.14, y + d - 0.11, c.h * 0.36 + 1.9).y} color="g" r={0.5} />
    </g>
  );
}

// ─── Site infrastructure ─────────────────────────────────────────────────────

function duct(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const lid = iso(cx, cy, 0.7);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={0.7} mat="steel" sw={0.5} highlight={false} />
      <ellipse cx={lid.x} cy={lid.y} rx={w * TILE_W * 0.32} ry={w * TILE_H * 0.32} fill="#cbd5e1" stroke="#7f8fa0" strokeWidth="0.6" />
      <BoltRing cx={lid.x} cy={lid.y} rx={w * TILE_W * 0.24} ry={w * TILE_H * 0.24} n={8} />
      {/* orange innerducts emerging */}
      <Pipe d={`M ${lid.x - 3} ${lid.y} q -4 -1 -6 -5`} w={1.7} dark="#c2540a" light="#fdba74" />
      <Pipe d={`M ${lid.x - 1} ${lid.y + 1} q -3.4 -0.4 -6 -3.4`} w={1.7} dark="#c2540a" light="#fdba74" />
      {/* route marker post */}
      <path d={`M ${iso(x + w - 0.2, y + 0.3).x} ${iso(x + w - 0.2, y + 0.3).y} l 0 -6`} stroke="#f97316" strokeWidth="1.1" />
      <rect x={iso(x + w - 0.2, y + 0.3).x - 1.5} y={iso(x + w - 0.2, y + 0.3).y - 8.4} width="3" height="2.4" rx="0.3" fill="#fdba74" stroke="#c2540a" strokeWidth="0.4" />
    </g>
  );
}

function mesh(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const lines: ReactNode[] = [];
  for (let i = 0; i <= 4; i++) {
    const a = iso(x + (w * i) / 4, y);
    const b = iso(x + (w * i) / 4, y + d);
    lines.push(<path key={`v${i}`} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#3f9e6e" strokeWidth="0.9" opacity="0.85" />);
  }
  for (let j = 0; j <= 3; j++) {
    const a = iso(x, y + (d * j) / 3);
    const b = iso(x + w, y + (d * j) / 3);
    lines.push(<path key={`h${j}`} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#3f9e6e" strokeWidth="0.9" opacity="0.85" />);
  }
  return (
    <g>
      <polygon points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])} fill="#e2efe6" stroke="#9dc4ab" strokeWidth="0.6" />
      {lines}
      {/* earth test pits + striped electrodes */}
      {[[x + 0.7, y + 0.7], [x + w - 1.4, y + d - 1.3]].map(([px, py], i) => (
        <g key={i}>
          <Box x={px} y={py} w={0.9} d={0.8} h={0.9} mat="steel" sw={0.4} highlight={false} />
        </g>
      ))}
      {[[x + w * 0.35, y + d * 0.4], [x + w * 0.7, y + d * 0.7]].map(([px, py], i) => {
        const b = iso(px, py);
        return (
          <g key={i}>
            <path d={`M ${b.x} ${b.y} l 0 -5.4`} stroke="#eab308" strokeWidth="1.2" />
            {[1.2, 2.8, 4.4].map((dy) => (
              <path key={dy} d={`M ${b.x} ${b.y - dy} l 0 -0.8`} stroke="#16a34a" strokeWidth="1.2" />
            ))}
          </g>
        );
      })}
    </g>
  );
}

function mast(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const zb = c.zBase ?? 0;
  const cx = x + w / 2;
  const cy = y + d / 2;
  const baseL = iso(cx - 0.5, cy + 0.3, zb);
  const baseR = iso(cx + 0.5, cy + 0.3, zb);
  const top = iso(cx, cy, zb + c.h);
  return (
    <g>
      <path d={`M ${baseL.x} ${baseL.y} L ${top.x} ${top.y} M ${baseR.x} ${baseR.y} L ${top.x} ${top.y}`} stroke="#8494a5" strokeWidth="1" />
      {[0.22, 0.44, 0.66, 0.85].map((t, i) => {
        const l = { x: baseL.x + (top.x - baseL.x) * t, y: baseL.y + (top.y - baseL.y) * t };
        const r = { x: baseR.x + (top.x - baseR.x) * t, y: baseR.y + (top.y - baseR.y) * t };
        return <path key={t} d={i % 2 ? `M ${l.x} ${l.y} L ${r.x} ${r.y}` : `M ${l.x} ${l.y} L ${r.x} ${r.y - 2}`} stroke="#a4b1c0" strokeWidth="0.5" />;
      })}
      <path d={`M ${top.x} ${top.y} l 0 -6`} stroke="#64748b" strokeWidth="1.1" strokeLinecap="round" />
      <path d={`M ${top.x} ${top.y - 6} l 0 -2.2`} stroke="#94a3b8" strokeWidth="0.55" />
      {/* down-conductor to earth */}
      <path d={`M ${top.x} ${top.y} q 4 10 2.4 ${baseR.y - top.y + 6}`} stroke="#a05f2c" strokeWidth="0.6" fill="none" opacity="0.9" />
      <Led x={top.x} y={top.y - 4.6} color="r" r={0.55} />
    </g>
  );
}

function building(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const isFire = c.id === "fire-pump";
  const fMid = iso(x + w / 2, y + d, 0);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} mat={isFire ? "red" : "metal"} />
      {/* parapet + rooftop HVAC */}
      <Box x={x - 0.08} y={y - 0.08} w={w + 0.16} d={d + 0.16} h={0.7} zBase={c.h} mat="steel" sw={0.4} highlight={false} />
      <Box x={x + w * 0.62} y={y + d * 0.28} w={w * 0.22} d={d * 0.3} h={1.7} zBase={c.h + 0.7} mat="steel" sw={0.4} />
      {isFire ? (
        <g>
          {/* red access door + hose reel + triple breeching inlets + roof vent */}
          <polygon points={pts([iso(x + w * 0.42, y + d, c.h * 0.62), iso(x + w * 0.58, y + d, c.h * 0.62), iso(x + w * 0.58, y + d, 0.2), iso(x + w * 0.42, y + d, 0.2)])} fill="#9f1239" stroke="#7f1d1d" strokeWidth="0.5" />
          <circle cx={fMid.x - w * 3.4} cy={fMid.y - c.h * 0.45} r="2" fill="none" stroke="#fda4af" strokeWidth="1.1" />
          <circle cx={fMid.x - w * 3.4} cy={fMid.y - c.h * 0.45} r="0.7" fill="#fda4af" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={fMid.x + w * (2.4 + i * 1.3)} cy={fMid.y - c.h * 0.3} r="0.85" fill="#fecdd3" stroke="#8a1f2b" strokeWidth="0.5" />
          ))}
          <Cyl cx={x + w * 0.25} cy={y + d * 0.4} r={0.24} h={2} zBase={c.h + 0.7} grad="dcmCyl-steel" />
        </g>
      ) : (
        <g>
          {/* glazing band + mullions + entrance canopy */}
          {(() => {
            const A = iso(x + 0.4, y + d, c.h * 0.72);
            const B = iso(x + w - 0.4, y + d, c.h * 0.72);
            const Cq = iso(x + w - 0.4, y + d, c.h * 0.3);
            const D = iso(x + 0.4, y + d, c.h * 0.3);
            return (
              <g>
                <polygon points={pts([A, B, Cq, D])} fill="url(#dcmGlass)" stroke="#5d87a8" strokeWidth="0.5" />
                {[0.25, 0.5, 0.75].map((t) => (
                  <path key={t} d={`M ${A.x + (B.x - A.x) * t} ${A.y + (B.y - A.y) * t} L ${D.x + (Cq.x - D.x) * t} ${D.y + (Cq.y - D.y) * t}`} stroke="#7fa3c0" strokeWidth="0.4" />
                ))}
              </g>
            );
          })()}
          <polygon points={pts([iso(x + w * 0.36, y + d + 0.55, c.h * 0.28), iso(x + w * 0.64, y + d + 0.55, c.h * 0.28), iso(x + w * 0.64, y + d, c.h * 0.28), iso(x + w * 0.36, y + d, c.h * 0.28)])} fill="#dde4ec" stroke="#93a3b5" strokeWidth="0.4" />
          <polygon points={pts([iso(x + w * 0.44, y + d, c.h * 0.26), iso(x + w * 0.56, y + d, c.h * 0.26), iso(x + w * 0.56, y + d, 0.15), iso(x + w * 0.44, y + d, 0.15)])} fill="url(#dcmGlass)" stroke="#5d87a8" strokeWidth="0.4" />
        </g>
      )}
    </g>
  );
}

function dock(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const fA = iso(x + 0.5, y + d, c.h * 0.9);
  const fB = iso(x + w - 0.5, y + d, c.h * 0.9);
  const fC = iso(x + w - 0.5, y + d, 0.6);
  const fD = iso(x + 0.5, y + d, 0.6);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} w={w} d={d} h={c.h} mat="metal" />
      {/* roller shutter with slats + leveler plate + bumpers + hi-vis edge */}
      <polygon points={pts([fA, fB, fC, fD])} fill="url(#dcmS-left)" stroke="#7f8fa0" strokeWidth="0.5" />
      {[0.18, 0.34, 0.5, 0.66, 0.82].map((t) => (
        <path key={t} d={`M ${fD.x + (fA.x - fD.x) * t} ${fD.y + (fA.y - fD.y) * t} L ${fC.x + (fB.x - fC.x) * t} ${fC.y + (fB.y - fC.y) * t}`} stroke="#93a3b5" strokeWidth="0.5" opacity="0.8" />
      ))}
      <polygon points={pts([iso(x + w * 0.3, y + d + 0.7, 0.5), iso(x + w * 0.7, y + d + 0.7, 0.5), iso(x + w * 0.7, y + d, 0.5), iso(x + w * 0.3, y + d, 0.5)])} fill="#aeb9c6" stroke="#7f8fa0" strokeWidth="0.5" />
      {[0.16, 0.84].map((t) => (
        <polygon key={t} points={pts([iso(x + w * t - 0.12, y + d, 2.4), iso(x + w * t + 0.12, y + d, 2.4), iso(x + w * t + 0.12, y + d, 0.6), iso(x + w * t - 0.12, y + d, 0.6)])} fill="#1e293b" />
      ))}
      <path d={`M ${fD.x} ${fD.y + 0.9} L ${fC.x} ${fC.y + 0.9}`} stroke="#f6b73c" strokeWidth="1" strokeDasharray="2.4 1.6" />
      {/* bollards */}
      {[0.25, 0.75].map((t) => (
        <Cyl key={t} cx={x + w * t} cy={y + d - 0.15} r={0.16} h={4} grad="dcmCyl-white" stroke="#a9761a" capLight="#fcd34d" />
      ))}
      {/* box truck backed onto the ramp */}
      <g>
        <Box x={x + 1.1} y={y + d + 0.15} w={2.5} d={1.35} h={4.6} zBase={1.1} mat="metal" sw={0.6} />
        <Box x={x + 3.65} y={y + d + 0.3} w={1.05} d={1.05} h={3.1} zBase={1.1} mat="steel" sw={0.5} />
        <polygon points={pts([iso(x + 3.7, y + d + 1.36, 3.9), iso(x + 4.66, y + d + 1.36, 3.9), iso(x + 4.66, y + d + 1.36, 2.6), iso(x + 3.7, y + d + 1.36, 2.6)])} fill="#bfdbfe" opacity="0.7" />
        {[1.55, 3.05, 4.2].map((t) => {
          const p = iso(x + t, y + d + 1.5, 0.55);
          return <ellipse key={t} cx={p.x} cy={p.y} rx="2" ry="1.15" fill="#334155" stroke="#1e293b" strokeWidth="0.4" />;
        })}
      </g>
    </g>
  );
}

function busway(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const zb = c.zBase ?? 0;
  return (
    <g>
      {/* hanger rods */}
      {[0.12, 0.38, 0.64, 0.9].map((t) => {
        const a = iso(x + w * t, y + d / 2, zb + c.h);
        return <path key={t} d={`M ${a.x} ${a.y} l 0 -7`} stroke="#93a3b5" strokeWidth="0.7" />;
      })}
      <Box x={x} y={y} w={w} d={d} h={c.h} zBase={zb} mat="amber" sw={0.5} />
      {/* joint collars + tap-off boxes with mini breakers + end feed */}
      {[0.25, 0.5, 0.75].map((t) => (
        <Box key={t} x={x + w * t - 0.12} y={y - 0.06} w={0.24} d={d + 0.12} h={c.h + 0.24} zBase={zb - 0.12} mat="dark" sw={0.35} highlight={false} />
      ))}
      {[0.34, 0.66].map((t, i) => (
        <g key={t}>
          <Box x={x + w * t - 0.35} y={y + d} w={0.7} d={0.35} h={1.9} zBase={zb - 0.5} mat="steel" sw={0.35} />
          <Led x={iso(x + w * t, y + d + 0.36, zb + 1).x} y={iso(x + w * t, y + d + 0.36, zb + 1).y} color={i ? "g" : "b"} r={0.45} />
        </g>
      ))}
      <Box x={x - 0.5} y={y - 0.12} w={0.55} d={d + 0.24} h={c.h + 0.5} zBase={zb - 0.25} mat="dark" sw={0.4} />
    </g>
  );
}

function floor(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  if (c.id === "server-hall") {
    const p = iso(x + 2.6, y + 3.1);
    return (
      <g>
        <circle cx={p.x} cy={p.y} r="2" fill="none" stroke="#94a3b8" strokeWidth="0.6" opacity="0.7" />
        <circle cx={p.x} cy={p.y} r="0.7" fill="#94a3b8" opacity="0.8" />
      </g>
    );
  }
  // raised-floor cutaway: pedestals, stringers, lifted perforated tile + lifter
  const ped: ReactNode[] = [];
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      const p = iso(x + (w * i) / 2, y + (d * j) / 2, 0);
      ped.push(
        <g key={`${i}${j}`}>
          <path d={`M ${p.x} ${p.y} l 0 -2.6`} stroke="#7d8ea0" strokeWidth="0.9" />
          <ellipse cx={p.x} cy={p.y - 2.8} rx="1" ry="0.5" fill="#93a3b5" />
        </g>
      );
    }
  }
  const tile = iso(x + w * 0.52, y + d * 0.45, 5.4);
  return (
    <g>
      <polygon points={pts([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)])} fill="#e8edf3" stroke="#b6c2cf" strokeWidth="0.6" />
      {/* orange underfloor cable tray + blue airflow chevrons */}
      <Pipe d={`M ${iso(x + 0.3, y + d * 0.7, 0.7).x} ${iso(x + 0.3, y + d * 0.7, 0.7).y} L ${iso(x + w - 0.3, y + d * 0.7, 0.7).x} ${iso(x + w - 0.3, y + d * 0.7, 0.7).y}`} w={1.7} dark="#c2540a" light="#fdba74" />
      {[0.3, 0.55].map((t) => {
        const p = iso(x + w * t, y + d * 0.3, 1.2);
        return <path key={t} d={`M ${p.x - 1.4} ${p.y} l 1.4 -1.4 l 1.4 1.4`} stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.9" />;
      })}
      {ped}
      {/* grid stringers */}
      {[1, 2].map((i) => {
        const a = iso(x + (w * i) / 3, y, 2.8);
        const b = iso(x + (w * i) / 3, y + d, 2.8);
        return <path key={i} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} stroke="#a7b3c2" strokeWidth="0.5" />;
      })}
      {/* lifted perforated tile + suction lifter */}
      <g transform={`translate(${tile.x} ${tile.y}) rotate(-14)`}>
        <rect x="-4.6" y="-2.6" width="9.2" height="5.2" rx="0.4" fill="#dde4ec" stroke="#8b99a9" strokeWidth="0.5" />
        <rect x="-4.6" y="-2.6" width="9.2" height="5.2" rx="0.4" fill="url(#dcmPerf)" opacity="0.5" />
        <circle cx="-1.4" cy="0" r="0.8" fill="#334155" />
        <circle cx="1.4" cy="0" r="0.8" fill="#334155" />
        <path d="M -1.4 0 L 1.4 0 M 0 0 l 0 -2.6" stroke="#334155" strokeWidth="0.6" />
      </g>
    </g>
  );
}

// ─── Cabinet family (kind: "box") — per-product fronts ───────────────────────

function cabinet(c: DcComponentDef): ReactNode {
  const { x, y, w, d } = c.grid;
  const fMid = iso(x + w / 2, y + d, 0);
  const H = c.h;
  const body = (mat: Mat = "metal") => <Box x={x} y={y} w={w} d={d} h={H} mat={mat} />;
  switch (c.id) {
    case "rmu":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          <Box x={x - 0.06} y={y - 0.06} w={w + 0.12} d={d + 0.12} h={1.2} mat="dark" sw={0.4} highlight={false} />
          <Box x={x} y={y} w={w} d={d} h={H - 1.2} zBase={1.2} mat="metal" />
          {[0.2, 0.5, 0.8].map((t, i) => (
            <g key={t}>
              <polygon points={pts([iso(x + w * (t - 0.13), y + d, 1.2 + (H - 1.2) * 0.85), iso(x + w * (t + 0.13), y + d, 1.2 + (H - 1.2) * 0.85), iso(x + w * (t + 0.13), y + d, 1.2 + (H - 1.2) * 0.12), iso(x + w * (t - 0.13), y + d, 1.2 + (H - 1.2) * 0.12)])} fill="#dde4ec" stroke="#8b99a9" strokeWidth="0.4" />
              <circle cx={fMid.x + w * (t - 0.5) * 22} cy={fMid.y - (1.2 + (H - 1.2) * 0.5)} r="1" fill="#eef2f7" stroke="#64748b" strokeWidth="0.4" />
              <path d={`M ${fMid.x + w * (t - 0.5) * 22} ${fMid.y - (1.2 + (H - 1.2) * 0.5)} l 0.75 -0.5`} stroke="#334155" strokeWidth="0.5" />
              <Led x={fMid.x + w * (t - 0.5) * 22} y={fMid.y - (1.2 + (H - 1.2) * 0.78)} color={i === 1 ? "r" : "g"} delay={i * 0.4} r={0.45} />
            </g>
          ))}
        </g>
      );
    case "sts":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          {body()}
          <circle cx={fMid.x - w * 2.6} cy={fMid.y - H * 0.72} r="0.8" fill="#f6b73c" />
          <circle cx={fMid.x + w * 2.6} cy={fMid.y - H * 0.72} r="0.8" fill="#38bdf8" />
          <path d={`M ${fMid.x - w * 2.6} ${fMid.y - H * 0.6} q ${w * 2.6} ${H * 0.18} ${w * 2.6} ${H * 0.28} M ${fMid.x + w * 2.6} ${fMid.y - H * 0.6} q ${-w * 2.6} ${H * 0.18} ${-w * 2.6} ${H * 0.28}`} stroke="#64748b" strokeWidth="0.6" fill="none" />
          <path d={`M ${fMid.x} ${fMid.y - H * 0.32} l 0 ${H * 0.14} m -1 -1.4 l 1 1.4 l 1 -1.4`} stroke="#16a34a" strokeWidth="0.7" fill="none" />
          <Screen x={fMid.x - 2.6} y={fMid.y - H * 0.94} w={5.2} h={2.6} />
        </g>
      );
    case "pdu":
    case "remote-pdu":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          {body("steel")}
          {[0.68, 0.5, 0.32].map((t) => (
            <g key={t}>
              {[-2.6, -1.3, 0, 1.3, 2.6].map((dx) => (
                <rect key={dx} x={fMid.x + dx * w - w * 0.45} y={fMid.y - H * t - 0.8} width={w * 0.9} height="1.5" rx="0.2" fill="#16202c" />
              ))}
            </g>
          ))}
          <Screen x={fMid.x - 2.4} y={fMid.y - H * 0.92} w={4.8} h={2.4} />
          <Led x={fMid.x + w * 3.4} y={fMid.y - H * 0.86} color="g" r={0.5} />
        </g>
      );
    case "biometric":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          <Box x={x + w * 0.28} y={y + d * 0.28} w={w * 0.44} d={d * 0.44} h={H} mat="steel" sw={0.45} />
          <rect x={fMid.x - 2.2} y={fMid.y - H * 0.95} width="4.4" height="5.4" rx="0.7" fill="#16202c" stroke="#0b1420" strokeWidth="0.4" />
          {[1.1, 1.7, 2.3].map((r) => (
            <path key={r} d={`M ${fMid.x - r} ${fMid.y - H * 0.62} a ${r} ${r * 1.15} 0 0 1 ${r * 2} 0`} stroke="#67e8f9" strokeWidth="0.4" fill="none" opacity="0.9" />
          ))}
          <Led x={fMid.x} y={fMid.y - H * 0.42} color="g" r={0.5} />
        </g>
      );
    case "bms":
    case "dcim":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          {body("dark")}
          <Screen x={fMid.x - w * 3.2} y={fMid.y - H * 0.8} w={w * 6.4} h={H * 0.44} />
          {c.id === "dcim" ? (
            <g fill="#e0f2fe" opacity="0.95">
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={fMid.x - w * 2.4 + i * w * 1.5} y={fMid.y - H * 0.52 - (2 + i * 1.1)} width={w * 0.9} height={2 + i * 1.1} rx="0.2" />
              ))}
            </g>
          ) : (
            <path d={`M ${fMid.x - w * 1.8} ${fMid.y - H * 0.52} a ${w * 1.8} ${w * 1.8} 0 0 1 ${w * 3.6} 0 M ${fMid.x} ${fMid.y - H * 0.52} l ${w * 1.1} ${-w * 1.2}`} stroke="#e0f2fe" strokeWidth="0.7" fill="none" />
          )}
          <Led x={fMid.x + w * 3.6} y={fMid.y - H * 0.9} color="b" r={0.5} />
        </g>
      );
    case "fire-alarm":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          {body("red")}
          <polygon points={pts([iso(x + w * 0.16, y + d, H * 0.88), iso(x + w * 0.84, y + d, H * 0.88), iso(x + w * 0.84, y + d, H * 0.12), iso(x + w * 0.16, y + d, H * 0.12)])} fill="#f4f7fa" stroke="#8b99a9" strokeWidth="0.4" opacity="0.95" />
          <Screen x={fMid.x - 2.6} y={fMid.y - H * 0.78} w={5.2} h={2.4} />
          {[0, 1, 2, 3].map((i) => (
            <Led key={i} x={fMid.x - 3 + i * 2} y={fMid.y - H * 0.4} color={i === 2 ? "r" : "g"} delay={i * 0.25} r={0.42} />
          ))}
          <circle cx={fMid.x + w * 3.2} cy={fMid.y - H * 0.86} r="1.1" fill="#fecdd3" stroke="#8a1f2b" strokeWidth="0.5" />
        </g>
      );
    default:
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} />
          {body()}
          <Led x={fMid.x + w * 2.6} y={fMid.y - H * 0.8} color="g" r={0.5} />
        </g>
      );
  }
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

export function renderShape(c: DcComponentDef): ReactNode {
  switch (c.kind) {
    case "pylon": return pylon(c);
    case "gantry": return gantry(c);
    case "transformer": return transformer(c);
    case "genset": return genset(c);
    case "tank": return tank(c);
    case "watertank": return watertank(c);
    case "tower": return tower(c);
    case "chiller": return chiller(c);
    case "pumps": return pumps(c);
    case "panel-row": return panelRow(c);
    case "battery": return battery(c);
    case "rack-rows": return rackRows(c);
    case "netrack": return netrack(c);
    case "crah": return crah(c);
    case "cylinders": return cylinders(c);
    case "console": return consoleShape(c);
    case "gate": return gate(c);
    case "duct": return duct(c);
    case "mesh": return mesh(c);
    case "mast": return mast(c);
    case "building": return building(c);
    case "dock": return dock(c);
    case "busway": return busway(c);
    case "floor": return floor(c);
    case "box":
    default:
      return cabinet(c);
  }
}
