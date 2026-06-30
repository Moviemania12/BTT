"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/BatterySeriesDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 10 — Series connection: voltage adds up, capacity (Ah) stays same"
// ═══════════════════════════════════════════════════════════════════════════

export default function BatterySeriesDiagram() {
  return (
    <svg viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg10-title">
      <title id="svg10-title">Series Battery Connection</title>
      <rect width="900" height="240" fill="#ffffff" />
      <text x="450" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill="#0f172a" textAnchor="middle">SERIES CONNECTION — VOLTAGE ADDS UP</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={60 + i * 190} y="90" width="150" height="70" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
          <text x={135 + i * 190} y="130" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0066CC" textAnchor="middle">12V Battery</text>
          {i < 3 && <line x1={210 + i * 190} y1="125" x2={250 + i * 190} y2="125" stroke="#222222" strokeWidth="2.5" />}
        </g>
      ))}
      <text x="450" y="200" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#166534" textAnchor="middle">Total: 4 × 12V = 48V (same Ah as one battery)</text>
    </svg>
  );
}
