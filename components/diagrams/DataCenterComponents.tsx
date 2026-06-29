"use client";

/**
 * components/diagrams/DataCenterComponents.tsx
 *
 * Diagram 2: Data Center Components Overview
 * Split-panel: IT Infrastructure (left) vs Non-IT Infrastructure (right).
 * Shows how both sides serve the servers in the center.
 *
 * Signature element: A central "server rack" column that both sides
 * point toward — making the dependency structure immediately legible.
 * Hovering a component highlights its connection line.
 */

import React, { useState } from "react";

const T = {
  void:    "#030507",
  abyss:   "#070c12",
  surface: "#0d1520",
  panel:   "#111c2a",
  border:  "#1a2d42",
  blue:    "#00d4ff",
  blueDim: "#0099cc",
  cyan:    "#00ffcc",
  amber:   "#ffb800",
  red:     "#ff2244",
  purple:  "#a064ff",
  text1:   "#e8f4ff",
  text2:   "#8baac8",
  muted:   "#4a6580",
} as const;

interface Component {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  side: "it" | "nonit";
  row: number;  // vertical position 0..n
}

function ServerIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {[0,1,2].map(i => (
        <rect key={i} x="2" y={3 + i * 7} width="20" height="5" rx="1" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      ))}
      <circle cx="18" cy="5.5" r="1" fill={color} />
      <circle cx="18" cy="12.5" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function StorageIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="7" rx="8" ry="3" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <rect x="4" y="7" width="16" height="10" fill={`${color}10`} stroke={color} strokeWidth="1.2" />
      <ellipse cx="12" cy="17" rx="8" ry="3" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
    </svg>
  );
}

function NetworkIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="9" width="8" height="6" rx="1" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <rect x="14" y="4" width="8" height="5" rx="1" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <rect x="14" y="15" width="8" height="5" rx="1" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <line x1="10" y1="12" x2="14" y2="6.5" stroke={color} strokeWidth="1" />
      <line x1="10" y1="12" x2="14" y2="17.5" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function UpsIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <path d="M9 13L12 8L15 13" stroke={color} strokeWidth="1.3" fill="none" />
      <line x1="12" y1="13" x2="12" y2="16" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function BatteryIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="18" height="10" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <rect x="20" y="10" width="3" height="4" rx="1" fill={color} opacity="0.5" />
      <rect x="4" y="9" width="5" height="6" rx="1" fill={color} opacity="0.4" />
      <rect x="10" y="9" width="5" height="6" rx="1" fill={color} opacity="0.25" />
    </svg>
  );
}

function GeneratorIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="10" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <circle cx="12" cy="13" r="3" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
      <line x1="12" y1="4" x2="12" y2="8" stroke={color} strokeWidth="1.5" />
      <path d="M8 4 L12 4 L16 4" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

function PacIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <path d="M8 10 Q12 7 16 10 Q12 13 8 16 Q12 13 16 16" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="12" cy="19" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function BmsIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}18`} />
      <polyline points="5,16 8,11 11,14 14,9 17,12 19,8" stroke={color} strokeWidth="1.3" fill="none" />
    </svg>
  );
}

function FireIcon({ s, color }: { s: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3 C12 3 8 8 8 12 C8 14 9 15 12 16 C9 14 10 11 12 10 C12 13 14 14 14 17 C16 15 16 12 14 9 C16 11 17 14 15 17 C16 15.5 16 14 15.5 13 C17 15 17 17 16 19 C14.5 21 9.5 21 8 19 C6 17 7 13 7 12 C7 9 9 6 12 3Z" stroke={color} strokeWidth="1" fill={`${color}20`} />
    </svg>
  );
}

const COMPONENTS: Component[] = [
  // IT side (left)
  { id: "server",    label: "Servers",    sublabel: "Compute Engine", icon: <ServerIcon s={28} color={T.blue} />,     color: T.blue,   side: "it",    row: 0 },
  { id: "storage",   label: "Storage",   sublabel: "Data Repository", icon: <StorageIcon s={28} color={T.blue} />,   color: T.blue,   side: "it",    row: 1 },
  { id: "network",   label: "Networking", sublabel: "Connectivity",   icon: <NetworkIcon s={28} color={T.blue} />,   color: T.blue,   side: "it",    row: 2 },

  // Non-IT side (right)
  { id: "ups",       label: "UPS",        sublabel: "Power Backup",   icon: <UpsIcon s={28} color={T.amber} />,      color: T.amber,  side: "nonit", row: 0 },
  { id: "battery",   label: "Battery",   sublabel: "Energy Store",    icon: <BatteryIcon s={28} color={T.amber} />, color: T.amber,  side: "nonit", row: 1 },
  { id: "generator", label: "DG Set",    sublabel: "Diesel Backup",   icon: <GeneratorIcon s={28} color={T.amber} />,color: T.amber, side: "nonit", row: 2 },
  { id: "pac",       label: "PAC",        sublabel: "Air Cooling",    icon: <PacIcon s={28} color={T.cyan} />,       color: T.cyan,   side: "nonit", row: 3 },
  { id: "bms",       label: "BMS/DCIM",  sublabel: "Management",      icon: <BmsIcon s={28} color={T.purple} />,    color: T.purple, side: "nonit", row: 4 },
  { id: "fire",      label: "Fire",       sublabel: "Protection",     icon: <FireIcon s={28} color={T.red} />,       color: T.red,    side: "nonit", row: 5 },
];

export default function DataCenterComponents({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const itItems    = COMPONENTS.filter(c => c.side === "it");
  const nonitItems = COMPONENTS.filter(c => c.side === "nonit");

  const CARD_H = 58;
  const CARD_W = 180;
  const GAP = 10;
  const CENTER_X_RATIO = 0.48;
  const VW = 860;
  const VH = Math.max(itItems.length, nonitItems.length) * (CARD_H + GAP) + 120;

  const itX   = 16;
  const nonitX = VW - CARD_W - 16;
  const centerX = VW * CENTER_X_RATIO;
  const centerY = VH / 2;
  const rackW = 70;
  const rackH = VH * 0.65;

  const cardCY = (row: number) => 90 + row * (CARD_H + GAP) + CARD_H / 2;

  return (
    <figure className={className} style={{ margin: 0 }} aria-label="Data Center Components Overview Diagram">
      <div style={{ background: T.abyss, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.28em", color: T.blue, textTransform: "uppercase" as const }}>DIAGRAM 2</span>
          <h3 style={{ fontFamily: "var(--font-display,sans-serif)", fontSize: "clamp(14px,1.8vw,18px)", color: T.text1, margin: "4px 0 0", letterSpacing: "0.06em" }}>
            DATA CENTER COMPONENTS OVERVIEW
          </h3>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", padding: "10px 16px 0", gap: 8 }}>
          <div style={{ textAlign: "center" as const }}>
            <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.22em", color: T.blue, textTransform: "uppercase" as const, background: "rgba(0,212,255,0.08)", padding: "3px 12px", borderRadius: 4, border: `1px solid rgba(0,212,255,0.15)` }}>
              IT INFRASTRUCTURE
            </span>
          </div>
          <div style={{ width: 100 }} />
          <div style={{ textAlign: "center" as const }}>
            <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.22em", color: T.amber, textTransform: "uppercase" as const, background: "rgba(255,184,0,0.08)", padding: "3px 12px", borderRadius: 4, border: `1px solid rgba(255,184,0,0.15)` }}>
              NON-IT INFRASTRUCTURE
            </span>
          </div>
        </div>

        {/* SVG */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label="Data center components split between IT and Non-IT infrastructure serving a central server rack"
        >
          <defs>
            <pattern id="dc-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,212,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <filter id="dc-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Rack gradient */}
            <linearGradient id="rack-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,212,255,0.08)" />
              <stop offset="50%" stopColor="rgba(0,212,255,0.18)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0.08)" />
            </linearGradient>
          </defs>

          <rect width={VW} height={VH} fill={T.abyss} />
          <rect width={VW} height={VH} fill="url(#dc-grid)" />

          {/* Central server rack */}
          <rect
            x={centerX - rackW / 2}
            y={centerY - rackH / 2}
            width={rackW}
            height={rackH}
            rx={6}
            fill="url(#rack-grad)"
            stroke={T.blue}
            strokeWidth="1.5"
            opacity={0.85}
          />

          {/* Rack units */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <rect
                x={centerX - rackW / 2 + 6}
                y={centerY - rackH / 2 + 18 + i * (rackH - 36) / 10}
                width={rackW - 12}
                height={(rackH - 36) / 10 - 4}
                rx={2}
                fill="rgba(0,212,255,0.06)"
                stroke="rgba(0,212,255,0.12)"
                strokeWidth="0.5"
              />
              <circle
                cx={centerX + rackW / 2 - 18}
                cy={centerY - rackH / 2 + 18 + i * (rackH - 36) / 10 + (rackH - 36) / 20}
                r={2.5}
                fill={i % 3 === 0 ? T.blue : "rgba(0,212,255,0.25)"}
              />
            </g>
          ))}

          {/* Rack label */}
          <text x={centerX} y={centerY + rackH / 2 + 18} textAnchor="middle" fontFamily="var(--font-mono,monospace)" fontSize="9" fill={T.blue} letterSpacing="1.5">SERVER RACK</text>

          {/* IT component cards + connection lines */}
          {itItems.map((comp) => {
            const cardMidY = cardCY(comp.row);
            const isHov = hovered === comp.id;
            const lineX1 = itX + CARD_W;
            const lineX2 = centerX - rackW / 2;
            const lineMidX = (lineX1 + lineX2) / 2;

            return (
              <g key={comp.id}
                onMouseEnter={() => setHovered(comp.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Connection line */}
                <path
                  d={`M${lineX1},${cardMidY} C${lineMidX},${cardMidY} ${lineMidX},${centerY} ${lineX2},${centerY}`}
                  fill="none"
                  stroke={isHov ? comp.color : T.border}
                  strokeWidth={isHov ? 1.5 : 0.8}
                  strokeDasharray={isHov ? "none" : "4 3"}
                  opacity={isHov ? 1 : 0.4}
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />
                {/* Arrow head at rack */}
                {isHov && (
                  <polygon
                    points={`${lineX2},${centerY} ${lineX2 - 8},${centerY - 4} ${lineX2 - 8},${centerY + 4}`}
                    fill={comp.color}
                  />
                )}
                {/* Card */}
                <rect
                  x={itX}
                  y={cardCY(comp.row) - CARD_H / 2}
                  width={CARD_W}
                  height={CARD_H}
                  rx={6}
                  fill={isHov ? `${comp.color}12` : "rgba(0,212,255,0.04)"}
                  stroke={isHov ? comp.color : T.border}
                  strokeWidth={isHov ? 1.5 : 1}
                  filter={isHov ? "url(#dc-glow)" : undefined}
                  style={{ transition: "fill 0.2s, stroke 0.2s" }}
                />
                {/* Icon */}
                <foreignObject x={itX + 14} y={cardCY(comp.row) - 14} width={28} height={28}>
                  {comp.icon}
                </foreignObject>
                {/* Labels */}
                <text x={itX + 52} y={cardMidY - 4} fontFamily="var(--font-body,sans-serif)" fontSize="12" fontWeight="600" fill={isHov ? T.text1 : T.text2}>{comp.label}</text>
                <text x={itX + 52} y={cardMidY + 11} fontFamily="var(--font-mono,monospace)" fontSize="9" fill={T.muted} letterSpacing="0.5">{comp.sublabel}</text>
              </g>
            );
          })}

          {/* Non-IT component cards + connection lines */}
          {nonitItems.map((comp) => {
            const cardMidY = cardCY(comp.row);
            const isHov = hovered === comp.id;
            const lineX1 = nonitX;
            const lineX2 = centerX + rackW / 2;
            const lineMidX = (lineX1 + lineX2) / 2;

            return (
              <g key={comp.id}
                onMouseEnter={() => setHovered(comp.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Connection line */}
                <path
                  d={`M${lineX1},${cardMidY} C${lineMidX},${cardMidY} ${lineMidX},${centerY} ${lineX2},${centerY}`}
                  fill="none"
                  stroke={isHov ? comp.color : T.border}
                  strokeWidth={isHov ? 1.5 : 0.8}
                  strokeDasharray={isHov ? "none" : "4 3"}
                  opacity={isHov ? 1 : 0.4}
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />
                {/* Arrow head at rack */}
                {isHov && (
                  <polygon
                    points={`${lineX2},${centerY} ${lineX2 + 8},${centerY - 4} ${lineX2 + 8},${centerY + 4}`}
                    fill={comp.color}
                  />
                )}
                {/* Card */}
                <rect
                  x={nonitX}
                  y={cardCY(comp.row) - CARD_H / 2}
                  width={CARD_W}
                  height={CARD_H}
                  rx={6}
                  fill={isHov ? `${comp.color}12` : "rgba(255,184,0,0.03)"}
                  stroke={isHov ? comp.color : T.border}
                  strokeWidth={isHov ? 1.5 : 1}
                  filter={isHov ? "url(#dc-glow)" : undefined}
                  style={{ transition: "fill 0.2s, stroke 0.2s" }}
                />
                {/* Icon */}
                <foreignObject x={nonitX + 14} y={cardCY(comp.row) - 14} width={28} height={28}>
                  {comp.icon}
                </foreignObject>
                {/* Labels */}
                <text x={nonitX + 52} y={cardMidY - 4} fontFamily="var(--font-body,sans-serif)" fontSize="12" fontWeight="600" fill={isHov ? T.text1 : T.text2}>{comp.label}</text>
                <text x={nonitX + 52} y={cardMidY + 11} fontFamily="var(--font-mono,monospace)" fontSize="9" fill={T.muted} letterSpacing="0.5">{comp.sublabel}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ padding: "10px 20px 14px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, margin: 0, letterSpacing: "0.08em" }}>
            Hover any component to see its connection to the central server rack.
          </p>
        </div>
      </div>
      <figcaption style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, marginTop: 8, letterSpacing: "0.08em" }}>
        Fig. 2 — IT and Non-IT infrastructure both serve the central server rack
      </figcaption>
    </figure>
  );
}
