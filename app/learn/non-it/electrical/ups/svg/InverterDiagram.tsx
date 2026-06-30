"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/InverterDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 4 — Inverter converting DC bus voltage to clean sine wave AC output"
// ═══════════════════════════════════════════════════════════════════════════

export default function InverterDiagram() {
  return (
    <svg viewBox="0 0 1000 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg4-title">
      <title id="svg4-title">Inverter Diagram</title>
      <rect width="1000" height="380" fill="#ffffff" />
      <text x="500" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">INVERTER — DC TO AC CONVERSION</text>

      <rect x="80" y="100" width="160" height="160" rx="8" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
      <text x="160" y="175" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#166534" textAnchor="middle">DC BUS</text>
      <text x="160" y="195" fontFamily="Arial,sans-serif" fontSize="12" fill="#475569" textAnchor="middle">~380-410VDC</text>

      <line x1="240" y1="180" x2="380" y2="180" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG4)" />

      <rect x="380" y="90" width="220" height="180" rx="10" fill="#eaf4ff" stroke="#222222" strokeWidth="2.5" />
      <text x="490" y="160" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#222222" textAnchor="middle">IGBT</text>
      <text x="490" y="182" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#222222" textAnchor="middle">INVERTER</text>
      <text x="490" y="208" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">PWM Switching</text>

      <line x1="600" y1="180" x2="740" y2="180" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG4)" />

      {/* Clean sine wave output */}
      <rect x="740" y="100" width="200" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <path d="M 760 180 q 25 -40 50 0 q 25 40 50 0 q 25 -40 50 0 q 25 40 30 0" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <text x="840" y="240" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#166534" textAnchor="middle">Pure Sine Wave</text>

      <text x="500" y="320" fontFamily="Arial,sans-serif" fontSize="12" fill="#64748b" textAnchor="middle">THD (Total Harmonic Distortion) output typically below 3% in modern UPS</text>

      <defs>
        <marker id="arrowG4" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
