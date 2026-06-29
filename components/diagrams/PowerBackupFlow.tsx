"use client";

/**
 * components/diagrams/PowerBackupFlow.tsx
 *
 * Diagram 3: Power Backup Flow
 * Shows the power cascade: Grid → UPS → Battery Bank → DG Set → Servers
 * with animated "power pulse" showing which source is active.
 *
 * Signature element: A vertical timeline that shows what happens
 * SECOND BY SECOND during a power failure — the temporal story
 * makes the engineering meaningful rather than just diagrammatic.
 */

import { useState } from "react";

const T = {
  abyss:  "#070c12",
  border: "#1a2d42",
  blue:   "#00d4ff",
  amber:  "#ffb800",
  green:  "#00dc64",
  red:    "#ff2244",
  text1:  "#e8f4ff",
  text2:  "#8baac8",
  muted:  "#4a6580",
} as const;

interface PowerStage {
  id: string;
  label: string;
  sublabel: string;
  timing: string;
  color: string;
  status: "primary" | "backup" | "emergency" | "protected";
  description: string;
}

const STAGES: PowerStage[] = [
  {
    id: "grid",
    label: "Utility Grid",
    sublabel: "Primary Source",
    timing: "Normal Operation",
    color: T.green,
    status: "primary",
    description: "11kV–33kV supply from electricity board. Stepped down via transformer.",
  },
  {
    id: "ups",
    label: "UPS System",
    sublabel: "Instant Switchover",
    timing: "< 4 milliseconds",
    color: T.amber,
    status: "backup",
    description: "Uninterruptible Power Supply bridges the gap. Zero downtime for servers.",
  },
  {
    id: "battery",
    label: "Battery Bank",
    sublabel: "Energy Buffer",
    timing: "0 sec – 15 min",
    color: T.amber,
    status: "backup",
    description: "VRLA or Lithium batteries power the UPS while DG Set starts up.",
  },
  {
    id: "dg",
    label: "DG Set",
    sublabel: "Diesel Generator",
    timing: "~30 seconds start",
    color: T.blue,
    status: "emergency",
    description: "Diesel generators take over full load. Can run for days with fuel supply.",
  },
  {
    id: "servers",
    label: "Servers",
    sublabel: "Protected Load",
    timing: "Always ON",
    color: T.green,
    status: "protected",
    description: "Zero interruption. Services continue unaffected through the entire event.",
  },
];

const STATUS_COLORS = {
  primary:   T.green,
  backup:    T.amber,
  emergency: T.blue,
  protected: T.green,
} as const;

export default function PowerBackupFlow({ className }: { className?: string }) {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [scenario, setScenario] = useState<"normal" | "outage">("normal");

  const active = STAGES.find(s => s.id === activeStage);

  // Which stages are "live" in each scenario
  const liveInNormal   = new Set(["grid", "ups", "battery", "servers"]);
  const liveInOutage   = new Set(["ups", "battery", "dg", "servers"]);
  const liveSet = scenario === "normal" ? liveInNormal : liveInOutage;

  const VW = 860;
  const VH = 380;
  const NODE_X = 80;    // x center of all nodes (single column)
  const NODE_R = 32;
  const STEP = (VH - 80) / (STAGES.length - 1);

  // Horizontal stagger for visual breathing room
  const xOffset = [0, 60, 110, 60, 0];

  return (
    <figure className={className} style={{ margin: 0 }} aria-label="Power Backup Flow Diagram">
      <div style={{ background: T.abyss, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10 }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.28em", color: T.blue, textTransform: "uppercase" as const }}>DIAGRAM 3</span>
            <h3 style={{ fontFamily: "var(--font-display,sans-serif)", fontSize: "clamp(14px,1.8vw,18px)", color: T.text1, margin: "4px 0 0", letterSpacing: "0.06em" }}>
              POWER BACKUP CASCADE
            </h3>
          </div>

          {/* Scenario toggle */}
          <div style={{ display: "flex", gap: 8 }}>
            {(["normal", "outage"] as const).map(s => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                style={{
                  fontFamily: "var(--font-mono,monospace)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  padding: "5px 12px",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: scenario === s ? (s === "normal" ? T.green : T.red) : T.border,
                  background: scenario === s ? (s === "normal" ? "rgba(0,220,100,0.10)" : "rgba(255,34,68,0.10)") : "transparent",
                  color: scenario === s ? (s === "normal" ? T.green : T.red) : T.muted,
                  cursor: "pointer",
                  textTransform: "uppercase" as const,
                  transition: "all 0.2s ease",
                }}
              >
                {s === "normal" ? "⚡ Grid ON" : "❌ Power Cut"}
              </button>
            ))}
          </div>
        </div>

        {/* Main layout: SVG flow + Info panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 340 }}>

          {/* SVG flow */}
          <svg viewBox={`0 0 ${VW / 2} ${VH}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Power cascade flow diagram">
            <defs>
              <pattern id="pw-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0,212,255,0.03)" strokeWidth="0.5" />
              </pattern>
              <filter id="pw-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect width={VW / 2} height={VH} fill={T.abyss} />
            <rect width={VW / 2} height={VH} fill="url(#pw-grid)" />

            {STAGES.map((stage, i) => {
              const cy = 50 + i * STEP;
              const cx = NODE_X + xOffset[i];
              const isLive    = liveSet.has(stage.id);
              const isActive  = activeStage === stage.id;
              const col       = isLive ? STATUS_COLORS[stage.status] : T.muted;

              // Draw connection line to next stage
              const hasNext = i < STAGES.length - 1;
              const nextCy  = 50 + (i + 1) * STEP;
              const nextCx  = NODE_X + xOffset[i + 1];

              return (
                <g key={stage.id}>
                  {/* Connection line */}
                  {hasNext && (
                    <line
                      x1={cx} y1={cy + NODE_R}
                      x2={nextCx} y2={nextCy - NODE_R}
                      stroke={isLive ? col : T.border}
                      strokeWidth={isLive ? 2 : 1}
                      strokeDasharray={isLive ? "none" : "4 3"}
                      opacity={isLive ? 0.7 : 0.3}
                    />
                  )}

                  {/* Power flow pulse */}
                  {isLive && hasNext && (
                    <circle r={4} fill={col} opacity={0.8}>
                      <animateMotion
                        dur="1.8s"
                        repeatCount="indefinite"
                        path={`M${cx},${cy + NODE_R} L${nextCx},${nextCy - NODE_R}`}
                      />
                    </circle>
                  )}

                  {/* Node circle */}
                  <circle
                    cx={cx} cy={cy} r={NODE_R}
                    fill={isActive ? `${col}20` : isLive ? `${col}10` : "rgba(255,255,255,0.02)"}
                    stroke={col}
                    strokeWidth={isActive ? 2 : 1.5}
                    filter={isActive || isLive ? "url(#pw-glow)" : undefined}
                    style={{ cursor: "pointer", transition: "all 0.25s ease" }}
                    onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                  />

                  {/* Status indicator dot */}
                  <circle cx={cx + NODE_R - 8} cy={cy - NODE_R + 8} r={5}
                    fill={isLive ? col : "transparent"}
                    stroke={isLive ? col : T.muted}
                    strokeWidth="1.2"
                  />
                  {isLive && (
                    <circle cx={cx + NODE_R - 8} cy={cy - NODE_R + 8} r={5} fill={col} opacity={0.4}>
                      <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Label */}
                  <text x={cx + NODE_R + 14} y={cy - 4}
                    fontFamily="var(--font-body,sans-serif)" fontSize="13" fontWeight="600"
                    fill={isLive ? T.text1 : T.muted}
                  >{stage.label}</text>
                  <text x={cx + NODE_R + 14} y={cy + 11}
                    fontFamily="var(--font-mono,monospace)" fontSize="9"
                    fill={isLive ? col : T.muted} letterSpacing="0.5"
                  >{stage.timing}</text>
                </g>
              );
            })}
          </svg>

          {/* Info panel */}
          <div style={{ borderLeft: `1px solid ${T.border}`, padding: "20px 20px", display: "flex", flexDirection: "column" as const }}>
            {active ? (
              <div style={{ animation: "fadeIn 0.2s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: STATUS_COLORS[active.status], boxShadow: `0 0 8px ${STATUS_COLORS[active.status]}` }} />
                  <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, letterSpacing: "0.20em", color: STATUS_COLORS[active.status], textTransform: "uppercase" as const }}>
                    {active.status}
                  </span>
                </div>
                <h4 style={{ fontFamily: "var(--font-display,sans-serif)", fontSize: 20, color: T.text1, margin: "0 0 8px", letterSpacing: "0.04em" }}>
                  {active.label.toUpperCase()}
                </h4>
                <p style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: STATUS_COLORS[active.status], margin: "0 0 14px", letterSpacing: "0.12em" }}>
                  {active.sublabel}
                </p>
                <p style={{ fontFamily: "var(--font-body,sans-serif)", fontSize: 13, color: T.text2, lineHeight: 1.7, margin: 0 }}>
                  {active.description}
                </p>
                <div style={{ marginTop: 20, padding: "10px 12px", background: `${STATUS_COLORS[active.status]}0a`, borderLeft: `2px solid ${STATUS_COLORS[active.status]}`, borderRadius: "0 4px 4px 0" }}>
                  <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: STATUS_COLORS[active.status], letterSpacing: "0.12em" }}>
                    ⏱ {active.timing}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, justifyContent: "center", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, letterSpacing: "0.12em", textAlign: "center" as const }}>
                  Click any stage to learn more
                </p>
                <div style={{ background: "rgba(0,212,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 8, padding: "14px 16px" }}>
                  <p style={{ fontFamily: "var(--font-body,sans-serif)", fontSize: 12, color: T.text2, lineHeight: 1.65, margin: 0 }}>
                    {scenario === "normal"
                      ? "Normal operation: Grid powers everything. UPS and battery on standby. DG Set ready to start."
                      : "Power cut scenario: UPS switches in <4ms. Battery sustains load. DG starts in ~30 seconds. Zero downtime."}
                  </p>
                </div>
                {/* Legend */}
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginTop: 8 }}>
                  {([["primary", "Grid Supply", T.green], ["backup", "Battery / UPS", T.amber], ["emergency", "DG Set", T.blue], ["protected", "Protected Load", T.green]] as const).map(([key, label, color]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                      <span style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 9, color: T.text2, letterSpacing: "0.10em" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "10px 20px 14px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, margin: 0, letterSpacing: "0.08em" }}>
            Switch between scenarios. Click stages to understand each layer of power protection.
          </p>
        </div>
      </div>
      <figcaption style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, color: T.muted, marginTop: 8, letterSpacing: "0.08em" }}>
        Fig. 3 — Power backup cascade ensures zero downtime during grid failures
      </figcaption>
    </figure>
  );
}
