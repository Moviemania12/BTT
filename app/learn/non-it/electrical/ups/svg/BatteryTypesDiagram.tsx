"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/svg/BatteryTypesDiagram.tsx
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx.
// Caption (for reference, rendered by the calling section via <Figure>):
// "Fig 9 — Visual comparison of common UPS battery form factors"
// ═══════════════════════════════════════════════════════════════════════════

export default function BatteryTypesDiagram() {
  return (
    <svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="svg9-title">
      <title id="svg9-title">Battery Types Diagram</title>
      <rect width="1200" height="300" fill="#ffffff" />
      <text x="600" y="36" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#0f172a" textAnchor="middle">UPS BATTERY TYPES</text>
      {[
        { label: "VRLA / SMF", sub: "Sealed, maintenance-free", color: "#0066CC" },
        { label: "Flooded (Vented)", sub: "Liquid electrolyte", color: "#f97316" },
        { label: "Tubular", sub: "Long-life flooded variant", color: "#16a34a" },
        { label: "Lithium-ion", sub: "High energy density", color: "#a855f7" },
        { label: "Nickel Cadmium", sub: "Extreme temperature tolerant", color: "#dc2626" },
      ].map((b, i) => {
        const x = 40 + i * 230;
              return (
          <g key={b.label}>
            <rect x={x} y="80" width="190" height="120" rx="8" fill="#ffffff" stroke={b.color} strokeWidth="2.5" />
            <rect x={x + 20} y="100" width="150" height="55" rx="4" fill={`${b.color}15`} stroke={b.color} strokeWidth="1.5" />
            <rect x={x + 158} y="108" width="10" height="15" fill={b.color} opacity="0.6" />
            <text x={x + 95} y="215" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill={b.color} textAnchor="middle">{b.label}</text>
            <text x={x + 95} y="232" fontFamily="Arial,sans-serif" fontSize="10" fill="#64748b" textAnchor="middle">{b.sub}</text>
          </g>
              );
            })}
          </svg>
  );
}
