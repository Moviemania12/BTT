"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/UpsSizingFlowDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 8 — UPS sizing flow: from raw load to final kVA decision"
// ═══════════════════════════════════════════════════════════════════════════

export default function UpsSizingFlowDiagram() {
  return (
    <svg viewBox="0 0 1200 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg8-title">
      <title id="svg8-title">UPS Sizing Methodology Flow</title>
      <rect width="1200" height="260" fill="#ffffff" />
      {["Load\nInventory", "Demand\nFactor", "Power\nFactor", "Future\nGrowth", "Redundancy"].map((label, i) => {
        const x = 60 + i * 220;
              return (
          <g key={i}>
            <rect x={x} y="90" width="170" height="80" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
            {label.split("\n").map((line, li) => (
              <text key={li} x={x + 85} y={125 + li * 20} fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0066CC" textAnchor="middle">{line}</text>
            ))}
            <text x={x + 85} y="75" fontFamily="Arial,sans-serif" fontSize="12" fill="#94a3b8" textAnchor="middle">STEP {i + 1}</text>
            {i < 4 && (
              <line x1={x + 170} y1="130" x2={x + 220} y2="130" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowG8)" />
            )}
          </g>
              );
            })}
            <defs>
              <marker id="arrowG8" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
            </defs>
          </svg>
  );
}
