"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/BatteryMonitoringDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 13 — Battery Monitoring System architecture across a string"
// ═══════════════════════════════════════════════════════════════════════════

export default function BatteryMonitoringDiagram() {
  return (
    <svg viewBox="0 0 1100 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg13-title">
      <title id="svg13-title">Battery Monitoring System Diagram</title>
      <rect width="1100" height="320" fill="#ffffff" />
      <text x="550" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill="#0f172a" textAnchor="middle">BATTERY MONITORING SYSTEM (BMS)</text>

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={60 + i * 150} y="80" width="120" height="60" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
          <text x={120 + i * 150} y="115" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0066CC" textAnchor="middle">Battery {i + 1}</text>
          <line x1={120 + i * 150} y1="140" x2={120 + i * 150} y2="190" stroke="#f97316" strokeWidth="2" />
          <circle cx={120 + i * 150} cy="195" r="6" fill="#f97316" />
        </g>
      ))}
      <text x="550" y="220" fontFamily="Arial,sans-serif" fontSize="11" fill="#c2410c" textAnchor="middle">Cell-level voltage/temp/impedance sensors</text>

      <line x1="550" y1="225" x2="550" y2="250" stroke="#222222" strokeWidth="2" markerEnd="url(#arrowBms13)" />
      <rect x="400" y="250" width="300" height="56" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2.5" />
      <text x="550" y="284" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#222222" textAnchor="middle">BMS Controller → Alerts to DCIM/BMS-Building</text>

      <defs>
        <marker id="arrowBms13" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#222222" /></marker>
      </defs>
    </svg>
  );
}
