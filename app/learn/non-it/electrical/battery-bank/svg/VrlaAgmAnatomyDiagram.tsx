"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/svg/VrlaAgmAnatomyDiagram.tsx
//
// Blueprint SVG #2 — VRLA AGM Cell Cross-Section Anatomy
// Shows: positive plate, negative plate, AGM separator, electrolyte,
// pressure relief valve, terminal posts
// ═══════════════════════════════════════════════════════════════════════════

export default function VrlaAgmAnatomyDiagram() {
  return (
    <svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="vrla-title">
      <title id="vrla-title">VRLA AGM Battery Cell — Internal Anatomy</title>
      <rect width="900" height="360" fill="#ffffff" />

      <text x="450" y="30" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#0f172a" textAnchor="middle">
        VRLA AGM BATTERY — INTERNAL ANATOMY
      </text>

      {/* Outer case */}
      <rect x="200" y="55" width="320" height="260" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="3" />

      {/* Terminal posts */}
      <rect x="250" y="40" width="40" height="20" rx="3" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
      <text x="270" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">+</text>
      <rect x="430" y="40" width="40" height="20" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <text x="450" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">−</text>

      {/* Pressure relief valve */}
      <rect x="345" y="42" width="30" height="16" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
      <text x="360" y="53" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">PRV</text>

      {/* Plate stack — alternating positive/AGM/negative */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {/* Positive plate (red) */}
          <rect x={228 + i * 54} y="80" width="16" height="210" rx="2" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
          {/* AGM separator (blue) */}
          <rect x={244 + i * 54} y="80" width="14" height="210" rx="1" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
          {/* Negative plate (grey) */}
          <rect x={258 + i * 54} y="80" width="16" height="210" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
        </g>
      ))}

      {/* Labels with leader lines */}
      {/* Positive plate */}
      <line x1="236" y1="130" x2="140" y2="130" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="135" y="125" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#dc2626" textAnchor="end">Positive Plate</text>
      <text x="135" y="138" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="end">(Lead Dioxide)</text>

      {/* AGM separator */}
      <line x1="251" y1="165" x2="140" y2="165" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="135" y="160" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0066CC" textAnchor="end">AGM Separator</text>
      <text x="135" y="173" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="end">(Absorbed Glass Mat)</text>

      {/* Negative plate */}
      <line x1="266" y1="200" x2="140" y2="200" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="135" y="195" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="end">Negative Plate</text>
      <text x="135" y="208" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="end">(Lead / Sponge Lead)</text>

      {/* Right side labels */}
      <line x1="520" y1="130" x2="570" y2="130" stroke="#0066CC" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="575" y="125" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0066CC">Electrolyte</text>
      <text x="575" y="138" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">(H₂SO₄ — Absorbed in AGM)</text>

      <line x1="520" y1="170" x2="570" y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="575" y="165" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#d97706">Pressure Relief</text>
      <text x="575" y="178" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">Valve (PRV) — Opens</text>
      <text x="575" y="189" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">only at excess pressure</text>

      <line x1="520" y1="240" x2="570" y2="240" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="575" y="235" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155">ABS Plastic</text>
      <text x="575" y="248" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">Case — Sealed, no</text>
      <text x="575" y="259" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">maintenance access</text>

      {/* Key fact box */}
      <rect x="200" y="308" width="320" height="38" rx="5" fill="#eaf4ff" stroke="#bfdbfe" strokeWidth="1" />
      <text x="360" y="324" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">
        Oxygen Recombination Cycle
      </text>
      <text x="360" y="338" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">
        O₂ (positive) → absorbed by AGM → recombines at negative plate → near-zero water loss
      </text>
    </svg>
  );
}
