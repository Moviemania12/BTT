"use client";

/**
 * components/diagrams/CoolingFlow.tsx
 *
 * Diagram 4: Cooling Flow
 * Shows the thermal cycle: Server → Heat → PAC Unit → Cool Air → Server.
 * Uses a cross-section / floorplan view of a data center aisle.
 *
 * Signature element: Color-temperature gradient — cool air is blue,
 * hot air is amber/red. The gradient itself is the data, making the
 * thermal physics immediately visible without words.
 */

import { useState, useEffect, useRef } from "react";

const T = {
  abyss:   "#070c12",
  surface: "#0d1520",
  border:  "#1a2d42",
  blue:    "#00d4ff",
  cyan:    "#00ffcc",
  amber:   "#ffb800",
  red:     "#ff4422",
  hot1:    "#ff6622",
  hot2:    "#ffaa00",
  cool1:   "#00d4ff",
  cool2:   "#00ffcc",
  text1:   "#e8f4ff",
  text2:   "#8baac8",
  muted:   "#4a6580",
} as const;

export default function CoolingFlow({ className }: { className?: string }) {
  const [animOffset, setAnimOffset] = useState(0);
  const [temp, setTemp] = useState<"hot" | "cool">("cool");
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  // Reduced-motion-aware animation
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const tick = (ts: number) => {
      if (ts - lastRef.current > 40) {
        setAnimOffset(o => (o + 1) % 40);
        lastRef.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const VW = 860;
  const VH = 400;

  // Layout constants — cross-section view
  const FLOOR_Y  = 340;
  const CEIL_Y   = 40;
  const RACK_W   = 55;
  const RACK_H   = 200;
  const RACK_Y   = FLOOR_Y - RACK_H;

  // Three server racks in the center
  const rackPositions = [220, 300, 380];

  // PAC unit on the right
  const PAC_X = 580;
  const PAC_Y = RACK_Y;
  const PAC_W = 90;
  const PAC_H = RACK_H;

  // Raised floor plenum (cool air distribution)
  const PLENUM_H = 40;
  const PLENUM_Y = FLOOR_Y;

  // Hot aisle: between racks and PAC
  // Cool aisle: left of racks

  return (
    <figure className={className} style={{ margin: 0 }} aria-label="Data Center Cooling Flow Diagram">
      <div style={{ background: T.abyss, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10 }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.28em", color: T.blue, textTransform: "uppercase" as const }}>DIAGRAM 4</span>
            <h3 style={{ fontFamily: "var(--font-display,sans-serif)", fontSize: "clamp(14px,1.8vw,18px)", color: T.text1, margin: "4px 0 0", letterSpacing: "0.06em" }}>
              DATA CENTER COOLING CYCLE
            </h3>
          </div>
          {/* Temperature legend */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 24, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${T.cool1}, ${T.cyan})` }} />
              <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, color: T.blue, letterSpacing: "0.12em" }}>COOL AIR ~18°C</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 24, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${T.amber}, ${T.red})` }} />
              <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, color: T.amber, letterSpacing: "0.12em" }}>HOT AIR ~35°C</span>
            </div>
          </div>
        </div>

        {/* SVG cross-section */}
        <svg
          viewBox={`0 0 ${VW} ${VH + 50}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label="Cross-section diagram showing cool air flowing from PAC unit through floor plenum to server racks, and hot exhaust air returning to PAC"
        >
          <defs>
            {/* Grid */}
            <pattern id="cf-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,212,255,0.03)" strokeWidth="0.5" />
            </pattern>

            {/* Cool air gradient */}
            <linearGradient id="cool-grad" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={T.cool1} stopOpacity="0.6" />
              <stop offset="100%" stopColor={T.cyan} stopOpacity="0.2" />
            </linearGradient>

            {/* Hot air gradient */}
            <linearGradient id="hot-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={T.amber} stopOpacity="0.4" />
              <stop offset="100%" stopColor={T.red} stopOpacity="0.2" />
            </linearGradient>

            {/* Plenum gradient */}
            <linearGradient id="plenum-grad" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={T.blue} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T.cyan} stopOpacity="0.05" />
            </linearGradient>

            {/* PAC gradient */}
            <linearGradient id="pac-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.blue} stopOpacity="0.3" />
              <stop offset="100%" stopColor={T.cool1} stopOpacity="0.1" />
            </linearGradient>

            {/* Rack gradient */}
            <linearGradient id="rack-grad-cf" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={T.blue} stopOpacity="0.15" />
              <stop offset="50%" stopColor={T.amber} stopOpacity="0.10" />
              <stop offset="100%" stopColor={T.red} stopOpacity="0.2" />
            </linearGradient>

            {/* Animated flow line */}
            <pattern id="flow-cool" width="40" height="8" patternUnits="userSpaceOnUse"
              patternTransform={`translate(${animOffset},0)`}>
              <line x1="0" y1="4" x2="30" y2="4" stroke={T.blue} strokeWidth="1.5" strokeLinecap="round" />
            </pattern>
            <pattern id="flow-hot" width="40" height="8" patternUnits="userSpaceOnUse"
              patternTransform={`translate(${-animOffset},0)`}>
              <line x1="0" y1="4" x2="30" y2="4" stroke={T.amber} strokeWidth="1.5" strokeLinecap="round" />
            </pattern>

            {/* Glow */}
            <filter id="cf-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect width={VW} height={VH + 50} fill={T.abyss} />
          <rect width={VW} height={VH + 50} fill="url(#cf-grid)" />

          {/* Room ceiling and floor */}
          <rect x={60} y={CEIL_Y} width={VW - 120} height={8} rx={3} fill={T.surface} stroke={T.border} strokeWidth="1" />
          <rect x={60} y={FLOOR_Y + PLENUM_H} width={VW - 120} height={8} rx={3} fill={T.surface} stroke={T.border} strokeWidth="1" />

          {/* Raised floor plenum — cool air distribution */}
          <rect x={60} y={PLENUM_Y} width={VW - 120} height={PLENUM_H}
            fill="url(#plenum-grad)"
            stroke="rgba(0,212,255,0.2)"
            strokeWidth="1"
          />
          <rect x={62} y={PLENUM_Y + 2} width={VW - 124} height={PLENUM_H - 4}
            fill="url(#flow-cool)"
            opacity={0.4}
          />
          <text x={100} y={PLENUM_Y + 26} fontFamily="var(--font-mono,monospace)" fontSize="9" fill={T.blue} letterSpacing="1.5">RAISED FLOOR PLENUM — COOL AIR DISTRIBUTION</text>

          {/* Cool aisle zone (left of racks) */}
          <rect x={60} y={CEIL_Y + 8} width={rackPositions[0] - 60} height={RACK_Y - CEIL_Y - 8}
            fill="rgba(0,212,255,0.03)"
          />
          <text x={(60 + rackPositions[0]) / 2} y={RACK_Y - 20}
            textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.blue} letterSpacing="1">
            COLD AISLE
          </text>

          {/* Hot aisle zone (right of last rack to PAC) */}
          <rect x={rackPositions[rackPositions.length - 1] + RACK_W} y={CEIL_Y + 8}
            width={PAC_X - rackPositions[rackPositions.length - 1] - RACK_W} height={RACK_Y - CEIL_Y - 8}
            fill="rgba(255,184,0,0.04)"
          />
          <text x={(rackPositions[rackPositions.length - 1] + RACK_W + PAC_X) / 2} y={RACK_Y - 20}
            textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.amber} letterSpacing="1">
            HOT AISLE
          </text>

          {/* Server racks */}
          {rackPositions.map((rx, i) => (
            <g key={i}>
              {/* Rack chassis */}
              <rect x={rx} y={RACK_Y} width={RACK_W} height={RACK_H} rx={4}
                fill="url(#rack-grad-cf)"
                stroke={T.border}
                strokeWidth="1.5"
              />
              {/* Rack units */}
              {Array.from({ length: 12 }).map((_, u) => (
                <rect
                  key={u}
                  x={rx + 5} y={RACK_Y + 10 + u * 14}
                  width={RACK_W - 10} height={10} rx={1}
                  fill="rgba(0,212,255,0.06)"
                  stroke="rgba(0,212,255,0.10)"
                  strokeWidth="0.5"
                />
              ))}
              {/* LEDs */}
              {[0, 1, 2].map(u => (
                <circle key={u} cx={rx + RACK_W - 14} cy={RACK_Y + 15 + u * 28} r={2.5}
                  fill={T.blue} opacity={0.6 + u * 0.15} />
              ))}
              {/* Floor perforations (cool air enters) */}
              {Array.from({ length: 4 }).map((_, p) => (
                <rect key={p} x={rx + 6 + p * 11} y={FLOOR_Y - 8} width={8} height={8}
                  rx={1} fill={T.blue} fillOpacity={0.2}
                  stroke="rgba(0,212,255,0.3)" strokeWidth="0.5"
                />
              ))}
              {/* Cool air entering from floor */}
              <path
                d={`M${rx + 25},${FLOOR_Y} L${rx + 25},${RACK_Y + RACK_H - 10}`}
                stroke={T.cool1}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.5}
              />
              <polygon
                points={`${rx + 25},${RACK_Y + RACK_H - 10} ${rx + 20},${RACK_Y + RACK_H} ${rx + 30},${RACK_Y + RACK_H}`}
                fill={T.cool1}
                opacity={0.5}
              />
              {/* Hot exhaust from top */}
              <path
                d={`M${rx + RACK_W - 15},${RACK_Y} L${rx + RACK_W - 15},${CEIL_Y + 40}`}
                stroke={T.amber}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.5}
              />
              <polygon
                points={`${rx + RACK_W - 15},${CEIL_Y + 32} ${rx + RACK_W - 20},${CEIL_Y + 42} ${rx + RACK_W - 10},${CEIL_Y + 42}`}
                fill={T.amber}
                opacity={0.5}
              />
              {/* Rack label */}
              <text x={rx + RACK_W / 2} y={FLOOR_Y + 24}
                textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.muted}>
                RACK {i + 1}
              </text>
            </g>
          ))}

          {/* Hot air ceiling return */}
          <rect x={80} y={CEIL_Y + 8} width={PAC_X + PAC_W / 2 - 80} height={28}
            fill="url(#flow-hot)"
            opacity={0.3}
          />
          <text x={PAC_X + PAC_W / 2 - 10} y={CEIL_Y + 28}
            textAnchor="end" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.amber} letterSpacing="1">
            HOT RETURN →
          </text>

          {/* PAC unit */}
          <rect x={PAC_X} y={PAC_Y} width={PAC_W} height={PAC_H} rx={6}
            fill="url(#pac-grad)"
            stroke={T.blue}
            strokeWidth="2"
            filter="url(#cf-glow)"
          />
          {/* PAC internals */}
          {/* Evaporator coils */}
          {Array.from({ length: 4 }).map((_, i) => (
            <path key={i}
              d={`M${PAC_X + 10} ${PAC_Y + 30 + i * 28} Q${PAC_X + PAC_W / 2} ${PAC_Y + 20 + i * 28} ${PAC_X + PAC_W - 10} ${PAC_Y + 30 + i * 28}`}
              fill="none" stroke={T.blue} strokeWidth="1.5" opacity={0.4}
            />
          ))}
          {/* Fan */}
          <circle cx={PAC_X + PAC_W / 2} cy={PAC_Y + PAC_H - 30} r={18}
            fill="rgba(0,212,255,0.08)" stroke={T.blue} strokeWidth="1.2" />
          <path d={`M${PAC_X + PAC_W / 2 - 12},${PAC_Y + PAC_H - 30} A12,12,0,0,1,${PAC_X + PAC_W / 2 + 12},${PAC_Y + PAC_H - 30}`}
            fill="none" stroke={T.blue} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${PAC_X + PAC_W / 2},${PAC_Y + PAC_H - 42} A12,12,0,0,1,${PAC_X + PAC_W / 2},${PAC_Y + PAC_H - 18}`}
            fill="none" stroke={T.cyan} strokeWidth="3" strokeLinecap="round" />
          {/* PAC label */}
          <text x={PAC_X + PAC_W / 2} y={PAC_Y - 12}
            textAnchor="middle" fontFamily="var(--font-display,sans-serif)" fontSize="11" fill={T.blue} letterSpacing="2">
            PAC UNIT
          </text>
          <text x={PAC_X + PAC_W / 2} y={PAC_Y - 1}
            textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.muted}>
            Precision Air Conditioning
          </text>
          <text x={PAC_X + PAC_W / 2} y={FLOOR_Y + 24}
            textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.blue}>
            COOL OUT
          </text>

          {/* Cool air from PAC to floor plenum */}
          <path
            d={`M${PAC_X + PAC_W / 2},${PAC_Y + PAC_H} L${PAC_X + PAC_W / 2},${FLOOR_Y}`}
            stroke={T.blue} strokeWidth="2" strokeDasharray="5 3" opacity={0.7}
          />
          <polygon
            points={`${PAC_X + PAC_W / 2},${FLOOR_Y + 2} ${PAC_X + PAC_W / 2 - 6},${FLOOR_Y - 8} ${PAC_X + PAC_W / 2 + 6},${FLOOR_Y - 8}`}
            fill={T.blue} opacity={0.7}
          />

          {/* Cycle arrow at the top — ties everything together */}
          <path
            d={`M${rackPositions[1] + RACK_W / 2},${CEIL_Y + 8} Q${(rackPositions[1] + PAC_X) / 2},${CEIL_Y - 10} ${PAC_X + PAC_W / 2},${PAC_Y}`}
            fill="none" stroke={T.amber} strokeWidth="1.5" strokeDasharray="6 3" opacity={0.6}
          />

          {/* Temperature annotations */}
          <g>
            {/* Inlet temp */}
            <rect x={90} y={RACK_Y + 80} width={70} height={28} rx={4}
              fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <text x={125} y={RACK_Y + 93} textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10" fill={T.blue}>18–20°C</text>
            <text x={125} y={RACK_Y + 104} textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.muted}>INLET TEMP</text>

            {/* Outlet temp */}
            <rect x={rackPositions[2] + RACK_W + 8} y={RACK_Y + 80} width={70} height={28} rx={4}
              fill="rgba(255,184,0,0.08)" stroke="rgba(255,184,0,0.2)" strokeWidth="1" />
            <text x={rackPositions[2] + RACK_W + 43} y={RACK_Y + 93} textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10" fill={T.amber}>35–45°C</text>
            <text x={rackPositions[2] + RACK_W + 43} y={RACK_Y + 104} textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="8" fill={T.muted}>OUTLET TEMP</text>
          </g>

          {/* Section label */}
          <text x={VW / 2} y={VH + 36}
            textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="9" fill={T.muted} letterSpacing="1">
            CROSS-SECTION VIEW — DATA CENTER COOLING AISLE
          </text>
        </svg>

        <div style={{ padding: "10px 20px 14px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, margin: 0, letterSpacing: "0.08em" }}>
            Cool air enters through raised floor tiles. Hot exhaust returns to PAC via ceiling. Cycle repeats continuously.
          </p>
        </div>
      </div>
      <figcaption style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, marginTop: 8, letterSpacing: "0.08em" }}>
        Fig. 4 — Closed-loop cooling cycle: PAC unit keeps server inlet temperature at 18–20°C
      </figcaption>
    </figure>
  );
}
