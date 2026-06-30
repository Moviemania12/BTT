"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/DcBusDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 14 — DC Bus connecting rectifier, battery, and inverter"
// ═══════════════════════════════════════════════════════════════════════════

export default function DcBusDiagram() {
  return (
    <svg viewBox="0 0 1000 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg14-title">
      <title id="svg14-title">DC Bus Diagram</title>
      <rect width="1000" height="320" fill="#ffffff" />
      <text x="500" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill="#0f172a" textAnchor="middle">DC BUS — CENTRAL POWER BACKBONE</text>

      <rect x="60" y="110" width="160" height="70" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="140" y="150" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0066CC" textAnchor="middle">RECTIFIER</text>
      <line x1="220" y1="145" x2="350" y2="145" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG14)" />

      {/* DC bus vertical bar */}
      <rect x="350" y="80" width="40" height="200" rx="4" fill="#f1f5f9" stroke="#222222" strokeWidth="2.5" />
      <text x="370" y="60" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#222222" textAnchor="middle">DC BUS</text>
      <text x="370" y="300" fontFamily="Arial,sans-serif" fontSize="11" fill="#64748b" textAnchor="middle">±192-410VDC typical</text>

      <line x1="390" y1="145" x2="520" y2="145" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG14)" />
      <rect x="520" y="110" width="160" height="70" rx="8" fill="#ffffff" stroke="#222222" strokeWidth="2.5" />
      <text x="600" y="150" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#222222" textAnchor="middle">INVERTER</text>

      <line x1="370" y1="280" x2="370" y2="240" stroke="#f97316" strokeWidth="3" />
      <rect x="290" y="240" width="160" height="60" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" opacity="0" />
      <line x1="290" y1="270" x2="370" y2="270" stroke="#f97316" strokeWidth="2.5" />
      <rect x="150" y="240" width="140" height="56" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="220" y="272" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#c2410c" textAnchor="middle">BATTERY BANK</text>

      <defs>
        <marker id="arrowG14" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
