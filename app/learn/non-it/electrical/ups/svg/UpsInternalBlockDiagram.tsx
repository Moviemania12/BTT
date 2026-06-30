"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/UpsInternalBlockDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 1 — UPS Internal Block Diagram showing power flow from input to output"
// ═══════════════════════════════════════════════════════════════════════════

export default function UpsInternalBlockDiagram() {
  return (
    <svg viewBox="0 0 1400 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg1-title svg1-desc">
      <title id="svg1-title">UPS Internal Block Diagram</title>
      <desc id="svg1-desc">Shows AC input through rectifier, battery charging path, inverter, static switch, to AC output load</desc>
      <rect width="1400" height="600" fill="#ffffff" />

      {/* Title */}
      <text x="700" y="40" fontFamily="Arial,sans-serif" fontSize="24" fontWeight="700" fill="#0f172a" textAnchor="middle">UPS INTERNAL BLOCK DIAGRAM</text>

      {/* AC Input */}
      <rect x="40" y="240" width="140" height="70" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="110" y="270" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#0066CC" textAnchor="middle">AC INPUT</text>
      <text x="110" y="290" fontFamily="Arial,sans-serif" fontSize="11" fill="#475569" textAnchor="middle">415V / 50Hz</text>

      {/* Arrow to rectifier */}
      <line x1="180" y1="275" x2="260" y2="275" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowGreen)" />

      {/* Rectifier */}
      <rect x="260" y="240" width="160" height="70" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      <text x="340" y="270" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#222222" textAnchor="middle">RECTIFIER</text>
      <text x="340" y="290" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">AC → DC</text>

      {/* Arrow to DC bus */}
      <line x1="420" y1="275" x2="500" y2="275" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowGreen)" />

      {/* DC Bus (vertical) */}
      <line x1="500" y1="180" x2="500" y2="420" stroke="#222222" strokeWidth="3" />
      <text x="500" y="160" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#222222" textAnchor="middle">DC BUS</text>

      {/* Battery (below DC bus) */}
      <line x1="500" y1="420" x2="500" y2="460" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrowOrange)" />
      <rect x="420" y="460" width="160" height="70" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="500" y="490" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#c2410c" textAnchor="middle">BATTERY</text>
      <text x="500" y="510" fontFamily="Arial,sans-serif" fontSize="11" fill="#ea580c" textAnchor="middle">Backup Energy</text>

      {/* Arrow DC bus to Inverter */}
      <line x1="500" y1="240" x2="620" y2="240" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowGreen)" />

      {/* Inverter */}
      <rect x="620" y="205" width="160" height="70" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2" />
      <text x="700" y="235" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#222222" textAnchor="middle">INVERTER</text>
      <text x="700" y="255" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">DC → AC</text>

      {/* Arrow inverter to static switch */}
      <line x1="780" y1="240" x2="860" y2="240" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowGreen)" />

      {/* Static Switch */}
      <rect x="860" y="205" width="170" height="70" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="945" y="235" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#0066CC" textAnchor="middle">STATIC SWITCH</text>
      <text x="945" y="255" fontFamily="Arial,sans-serif" fontSize="11" fill="#475569" textAnchor="middle">&lt;4ms transfer</text>

      {/* Bypass line (orange, from input directly to static switch) */}
      <path d="M 110 240 L 110 130 L 945 130 L 945 205" fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="8 4" markerEnd="url(#arrowOrange)" />
      <text x="528" y="118" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill="#c2410c" textAnchor="middle">BYPASS PATH (if inverter fails)</text>

      {/* Arrow static switch to output */}
      <line x1="1030" y1="240" x2="1110" y2="240" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowGreen)" />

      {/* AC Output */}
      <rect x="1110" y="205" width="150" height="70" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="1185" y="235" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#166534" textAnchor="middle">AC OUTPUT</text>
      <text x="1185" y="255" fontFamily="Arial,sans-serif" fontSize="11" fill="#15803d" textAnchor="middle">To IT Load</text>

      {/* Legend */}
      <rect x="60" y="550" width="14" height="14" fill="#16a34a" />
      <text x="80" y="561" fontFamily="Arial,sans-serif" fontSize="12" fill="#334155">Normal power flow</text>
      <rect x="280" y="550" width="14" height="14" fill="#f97316" />
      <text x="300" y="561" fontFamily="Arial,sans-serif" fontSize="12" fill="#334155">Backup / Bypass flow</text>

      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" />
        </marker>
        <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,3 L0,6 Z" fill="#f97316" />
        </marker>
      </defs>
    </svg>
  );
}
