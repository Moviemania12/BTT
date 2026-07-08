"use client";
export default function LightningCurrentFlowDiagram() {
  const stages = [
    { label: "Lightning Strike", sub: "Up to 200 kA, <100μs", y: 40, color: "#f59e0b" },
    { label: "Air Termination", sub: "Intercepts strike", y: 110, color: "#475569" },
    { label: "Down Conductor", sub: "Conducts current down", y: 180, color: "#dc2626" },
    { label: "Earth Termination", sub: "Dissipates into soil", y: 250, color: "#92400e" },
  ];
  return (
    <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="flow-title">
      <title id="flow-title">Lightning Current Flow — Strike to Ground Dissipation</title>
      <rect width="640" height="420" fill="#fff"/>
      <text x="320" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        LIGHTNING CURRENT FLOW PATH
      </text>
      <defs>
        <marker id="flowarw" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
          <path d="M0,0 L4,7 L8,0Z" fill="#94a3b8"/>
        </marker>
      </defs>
      {stages.map((s, i) => (
        <g key={i}>
          <rect x="180" y={s.y} width="280" height="55" rx="6" fill="#fff" stroke={s.color} strokeWidth="2.5"/>
          <text x="320" y={s.y+24} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          <text x="320" y={s.y+42} fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">{s.sub}</text>
          {i < stages.length-1 && (
            <line x1="320" y1={s.y+55} x2="320" y2={s.y+70} stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#flowarw)"/>
          )}
        </g>
      ))}
      {/* Branch to SPD/equipment protection */}
      <line x1="460" y1="207" x2="540" y2="207" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,3"/>
      <rect x="500" y="190" width="120" height="90" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="560" y="212" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">Induced Surge</text>
      <text x="560" y="226" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">on power/data</text>
      <text x="560" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">cables</text>
      <text x="560" y="258" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#166534" textAnchor="middle">→ SPD</text>
      <text x="560" y="272" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#166534" textAnchor="middle">protects</text>

      <rect x="140" y="330" width="360" height="55" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2"/>
      <text x="320" y="354" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">Soil Resistivity Dissipation</text>
      <text x="320" y="371" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#334155" textAnchor="middle">Ground Potential Rise = I × R_earth</text>
      <line x1="320" y1="305" x2="320" y2="330" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#flowarw)"/>

      <text x="320" y="405" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Direct strike: full current down external path. Nearby strike: induced surge on cables — SPD critical here.
      </text>
    </svg>
  );
}
