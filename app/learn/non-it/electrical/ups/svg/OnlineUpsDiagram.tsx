"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/OnlineUpsDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 7 — Online Double Conversion: load always powered by inverter, grid only charges battery"
// ═══════════════════════════════════════════════════════════════════════════

export default function OnlineUpsDiagram() {
  return (
    <svg viewBox="0 0 1100 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg7-title">
      <title id="svg7-title">Online UPS Working Diagram</title>
      <rect width="1100" height="400" fill="#ffffff" />
      <text x="550" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">ONLINE DOUBLE CONVERSION — NORMAL OPERATION</text>

      <rect x="40" y="160" width="130" height="60" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="105" y="195" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">AC MAINS</text>

      <line x1="170" y1="190" x2="280" y2="190" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG7)" />

      <rect x="280" y="150" width="150" height="80" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2.5" />
      <text x="355" y="195" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#222222" textAnchor="middle">RECTIFIER</text>

      <line x1="430" y1="190" x2="540" y2="190" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG7)" />

      <rect x="540" y="150" width="130" height="80" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="605" y="185" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#166534" textAnchor="middle">DC BUS</text>
      <text x="605" y="203" fontFamily="Arial,sans-serif" fontSize="10" fill="#475569" textAnchor="middle">Always Live</text>

      <line x1="670" y1="190" x2="780" y2="190" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG7)" />

      <rect x="780" y="150" width="150" height="80" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2.5" />
      <text x="855" y="195" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#222222" textAnchor="middle">INVERTER</text>

      <line x1="930" y1="190" x2="1020" y2="190" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG7)" />

      {/* Battery connected to DC bus */}
      <line x1="605" y1="230" x2="605" y2="300" stroke="#f97316" strokeWidth="2.5" />
      <rect x="535" y="300" width="140" height="56" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="605" y="333" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#c2410c" textAnchor="middle">BATTERY</text>
      <text x="605" y="372" fontFamily="Arial,sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">Always being trickle-charged</text>

      <text x="1020" y="170" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#166534">→ LOAD</text>
      <text x="490" y="120" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#16a34a" textAnchor="middle">Continuous AC→DC→AC conversion (ZERO transfer time)</text>

      <defs>
        <marker id="arrowG7" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
