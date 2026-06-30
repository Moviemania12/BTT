"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/StaticSwitchDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 5 — Static Switch logic between inverter output and bypass source"
// ═══════════════════════════════════════════════════════════════════════════

export default function StaticSwitchDiagram() {
  return (
    <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg5-title">
      <title id="svg5-title">Static Switch Diagram</title>
      <rect width="1000" height="400" fill="#ffffff" />
      <text x="500" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">STATIC SWITCH OPERATION</text>

      {/* Inverter path */}
      <rect x="60" y="90" width="160" height="60" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="140" y="125" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">INVERTER OUTPUT</text>
      <line x1="220" y1="120" x2="400" y2="120" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG5)" />
      <text x="310" y="105" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">PRIMARY (Normal)</text>

      {/* Bypass path */}
      <rect x="60" y="260" width="160" height="60" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="140" y="295" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#c2410c" textAnchor="middle">BYPASS SOURCE</text>
      <line x1="220" y1="290" x2="400" y2="290" stroke="#f97316" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#arrowOr5)" />
      <text x="310" y="310" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">SECONDARY (Fault/Overload)</text>

      {/* Static switch box */}
      <rect x="400" y="160" width="200" height="100" rx="10" fill="#ffffff" stroke="#222222" strokeWidth="2.5" />
      <text x="500" y="205" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#222222" textAnchor="middle">STATIC SWITCH</text>
      <text x="500" y="225" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">Thyristor-based</text>
      <text x="500" y="242" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#dc2626" textAnchor="middle">Transfer: &lt; 4ms</text>

      {/* Output */}
      <line x1="600" y1="210" x2="760" y2="210" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG5)" />
      <rect x="760" y="180" width="160" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="840" y="215" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#166534" textAnchor="middle">LOAD OUTPUT</text>

      <defs>
        <marker id="arrowG5" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
        <marker id="arrowOr5" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
