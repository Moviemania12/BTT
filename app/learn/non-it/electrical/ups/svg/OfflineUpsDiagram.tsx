"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/OfflineUpsDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 6 — Offline UPS: load normally on mains, switches to inverter on failure"
// ═══════════════════════════════════════════════════════════════════════════

export default function OfflineUpsDiagram() {
  return (
    <svg viewBox="0 0 1000 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg6-title">
      <title id="svg6-title">Offline UPS Working Diagram</title>
      <rect width="1000" height="360" fill="#ffffff" />
      <text x="500" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">OFFLINE (STANDBY) UPS</text>

      <rect x="50" y="80" width="140" height="56" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="120" y="113" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">AC MAINS</text>

      <line x1="190" y1="108" x2="420" y2="108" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG6)" />
      <text x="300" y="95" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">NORMAL PATH (direct)</text>

      {/* Transfer switch */}
      <rect x="420" y="78" width="120" height="60" rx="6" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      <text x="480" y="113" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#222222" textAnchor="middle">TRANSFER</text>
      <text x="480" y="128" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#222222" textAnchor="middle">SWITCH</text>

      <line x1="540" y1="108" x2="700" y2="108" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG6)" />
      <rect x="700" y="78" width="140" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="770" y="113" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#166534" textAnchor="middle">LOAD</text>

      {/* Standby inverter+battery path */}
      <rect x="200" y="220" width="140" height="56" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="270" y="253" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#c2410c" textAnchor="middle">BATTERY</text>

      <line x1="340" y1="248" x2="420" y2="248" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#arrowOr6)" />

      <rect x="420" y="220" width="120" height="56" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="480" y="253" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#c2410c" textAnchor="middle">INVERTER</text>
      <text x="480" y="295" fontFamily="Arial,sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">(standby — activates on failure)</text>

      <line x1="480" y1="220" x2="480" y2="138" stroke="#f97316" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#arrowOr6)" />

      <defs>
        <marker id="arrowG6" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
        <marker id="arrowOr6" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
