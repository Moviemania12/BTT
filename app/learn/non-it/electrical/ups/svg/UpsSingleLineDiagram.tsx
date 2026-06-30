"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/UpsSingleLineDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 2 — Typical UPS Single Line Diagram from incoming supply to rack PDU"
// ═══════════════════════════════════════════════════════════════════════════

export default function UpsSingleLineDiagram() {
  return (
    <svg viewBox="0 0 1400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg2-title">
      <title id="svg2-title">UPS Single Line Diagram</title>
      <rect width="1400" height="500" fill="#ffffff" />
      <text x="700" y="36" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="700" fill="#0f172a" textAnchor="middle">UPS SINGLE LINE DIAGRAM (SLD)</text>

      {/* Source A */}
      <rect x="40" y="100" width="130" height="56" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="105" y="133" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">SOURCE A (Grid)</text>

      {/* Source B */}
      <rect x="40" y="320" width="130" height="56" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="105" y="353" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#c2410c" textAnchor="middle">SOURCE B (DG)</text>

      {/* Lines to ATS */}
      <line x1="170" y1="128" x2="260" y2="128" stroke="#222222" strokeWidth="2" />
      <line x1="170" y1="348" x2="260" y2="348" stroke="#222222" strokeWidth="2" />
      <line x1="260" y1="128" x2="260" y2="348" stroke="#222222" strokeWidth="2" />

      {/* ATS box */}
      <rect x="260" y="208" width="90" height="60" rx="6" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      <text x="305" y="234" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#222222" textAnchor="middle">ATS /</text>
      <text x="305" y="250" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#222222" textAnchor="middle">Panel</text>
      <line x1="260" y1="238" x2="260" y2="238" />

      {/* line from sources mid to ATS */}
      <line x1="260" y1="238" x2="260" y2="238" stroke="#222222" />
      <line x1="170" y1="238" x2="260" y2="238" stroke="#222222" strokeWidth="2" strokeDasharray="0" />

      {/* ATS to UPS */}
      <line x1="350" y1="238" x2="430" y2="238" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowG2)" />

      {/* UPS box */}
      <rect x="430" y="203" width="140" height="70" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="500" y="233" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#0066CC" textAnchor="middle">UPS</text>
      <text x="500" y="253" fontFamily="Arial,sans-serif" fontSize="11" fill="#475569" textAnchor="middle">Double Conversion</text>

      {/* Battery below UPS */}
      <line x1="500" y1="273" x2="500" y2="320" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOr2)" />
      <rect x="430" y="320" width="140" height="50" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="500" y="350" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#c2410c" textAnchor="middle">BATTERY BANK</text>

      {/* UPS to Output Panel */}
      <line x1="570" y1="238" x2="650" y2="238" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowG2)" />
      <rect x="650" y="203" width="130" height="70" rx="6" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      <text x="715" y="233" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#222222" textAnchor="middle">UPS OUTPUT</text>
      <text x="715" y="253" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">Panel / RPP</text>

      {/* to PDU */}
      <line x1="780" y1="238" x2="860" y2="238" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowG2)" />
      <rect x="860" y="203" width="120" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="920" y="233" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#166534" textAnchor="middle">PDU</text>
      <text x="920" y="253" fontFamily="Arial,sans-serif" fontSize="11" fill="#15803d" textAnchor="middle">Rack Distribution</text>

      {/* to Rack */}
      <line x1="980" y1="238" x2="1060" y2="238" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowG2)" />
      <rect x="1060" y="190" width="110" height="96" rx="6" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="1072" y={202 + i * 20} width="86" height="14" rx="2" fill="#eaf4ff" stroke="#0066CC" strokeWidth="1" />
      ))}
      <text x="1115" y="298" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#222222" textAnchor="middle">SERVER RACK</text>

      <text x="700" y="450" fontFamily="Arial,sans-serif" fontSize="12" fill="#64748b" textAnchor="middle">Note: Actual SLD varies by project — this shows a simplified single-path reference</text>

      <defs>
        <marker id="arrowG2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
        <marker id="arrowOr2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
