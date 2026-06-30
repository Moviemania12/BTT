"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/BatteryParallelDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 11 — Parallel connection: capacity (Ah) adds up, voltage stays same"
// ═══════════════════════════════════════════════════════════════════════════

export default function BatteryParallelDiagram() {
  return (
    <svg viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg11-title">
      <title id="svg11-title">Parallel Battery Connection</title>
      <rect width="900" height="280" fill="#ffffff" />
      <text x="450" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill="#0f172a" textAnchor="middle">PARALLEL CONNECTION — CAPACITY ADDS UP</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="150" y={70 + i * 60} width="150" height="44" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
          <text x="225" y={97 + i * 60} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">12V / 100Ah</text>
          <line x1="300" y1={92 + i * 60} x2="380" y2={92 + i * 60} stroke="#222222" strokeWidth="2" />
        </g>
      ))}
      <line x1="380" y1="92" x2="380" y2="212" stroke="#222222" strokeWidth="2" />
      <line x1="380" y1="152" x2="460" y2="152" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG11)" />
      <rect x="460" y="120" width="180" height="64" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="550" y="158" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#166534" textAnchor="middle">12V / 300Ah total</text>
      <defs>
        <marker id="arrowG11" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
