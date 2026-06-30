"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/BatterySeriesParallelDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 12 — Series-Parallel: both voltage and capacity scaled together"
// ═══════════════════════════════════════════════════════════════════════════

export default function BatterySeriesParallelDiagram() {
  return (
    <svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg12-title">
      <title id="svg12-title">Series-Parallel Battery Connection</title>
      <rect width="900" height="320" fill="#ffffff" />
      <text x="450" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700" fill="#0f172a" textAnchor="middle">SERIES-PARALLEL — VOLTAGE × CAPACITY SCALED</text>
      {[0, 1].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={80 + col * 170}
            y={70 + row * 100}
            width="140"
            height="60"
            rx="6"
            fill="#eaf4ff"
            stroke="#0066CC"
            strokeWidth="2"
          />
        ))
      )}
      {[0, 1].map((row) => (
        <text key={row} x="40" y={105 + row * 100} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#475569">String {row + 1}</text>
      ))}
      <text x="450" y="270" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#166534" textAnchor="middle">2 strings × 4 batteries (12V each) = 48V bus, 2× capacity</text>
    </svg>
  );
}
