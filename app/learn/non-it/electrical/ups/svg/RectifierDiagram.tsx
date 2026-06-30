"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/RectifierDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 3 — Rectifier converting 3-phase AC input to regulated DC output"
// ═══════════════════════════════════════════════════════════════════════════

export default function RectifierDiagram() {
  return (
    <svg viewBox="0 0 1000 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg3-title">
      <title id="svg3-title">Rectifier Diagram</title>
      <rect width="1000" height="380" fill="#ffffff" />
      <text x="500" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">RECTIFIER — AC TO DC CONVERSION</text>

      {/* 3-phase AC input lines */}
      {["R", "Y", "B"].map((ph, i) => (
        <g key={ph}>
          <line x1="60" y1={120 + i * 50} x2="200" y2={120 + i * 50} stroke="#0066CC" strokeWidth="2.5" />
          <text x="40" y={125 + i * 50} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC">{ph}</text>
          {/* sine wave hint */}
          <path d={`M 80 ${120 + i * 50} q 15 -12 30 0 q 15 12 30 0`} stroke="#0066CC" strokeWidth="1.3" fill="none" opacity="0.6" />
        </g>
      ))}

      {/* Rectifier block */}
      <rect x="200" y="90" width="220" height="180" rx="10" fill="#eaf4ff" stroke="#222222" strokeWidth="2.5" />
      <text x="310" y="150" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#222222" textAnchor="middle">IGBT PWM</text>
      <text x="310" y="172" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#222222" textAnchor="middle">RECTIFIER</text>
      <text x="310" y="200" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">Active Front End</text>
      <text x="310" y="218" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">PF correction built-in</text>

      {/* Output to DC bus */}
      <line x1="420" y1="180" x2="560" y2="180" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG3)" />
      <text x="490" y="165" fontFamily="Arial,sans-serif" fontSize="11" fill="#166534" textAnchor="middle">+DC</text>

      <rect x="560" y="100" width="160" height="160" rx="8" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
      <text x="640" y="175" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#166534" textAnchor="middle">DC BUS</text>
      <text x="640" y="195" fontFamily="Arial,sans-serif" fontSize="12" fill="#475569" textAnchor="middle">~380-410VDC</text>

      {/* flat DC line illustration */}
      <line x1="600" y1="220" x2="680" y2="220" stroke="#16a34a" strokeWidth="2" />

      <text x="500" y="320" fontFamily="Arial,sans-serif" fontSize="12" fill="#64748b" textAnchor="middle">Modern rectifiers also provide near-unity power factor (0.99) at input</text>

      <defs>
        <marker id="arrowG3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
