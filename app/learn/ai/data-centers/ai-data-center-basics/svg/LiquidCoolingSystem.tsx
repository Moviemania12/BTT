"use client";
export default function LiquidCoolingSystem() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lcs-title">
      <title id="lcs-title">Liquid Cooling System for AI Data Center: Cold water (18-22 degrees C) enters rack from left. Splits to cold plates directly on each GPU chip. Water absorbs GPU heat, becoming warm (35-45 degrees C). Warm water exits rack, goes to chiller plant which removes the heat and cools water back down. Continuous loop. Comparison: old air cooling handles maximum 20 kW per rack. New liquid cooling handles 120+ kW per rack.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DIRECT LIQUID COOLING — How AI Data Centers Remove GPU Heat</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">AI GPU chips produce as much heat as multiple electric ovens. Water removes this heat 25× more efficiently than air.</text>

      {/* Cold water supply */}
      <rect x="14" y="100" width="100" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="64" y="130" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Cold Water</text>
      <text x="64" y="143" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Supply</text>
      <text x="64" y="158" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">18–22°C</text>
      <text x="64" y="170" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">(cold water in)</text>
      <line x1="114" y1="140" x2="145" y2="140" stroke="#2563eb" strokeWidth="3" markerEnd="url(#lcs-ar)" />

      {/* Rack */}
      <rect x="146" y="60" width="390" height="168" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="341" y="78" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">AI GPU SERVER RACK</text>

      {/* 4 servers with cold plates */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x="154" y={86 + i * 34} width="374" height="28" rx="5" fill="#7c3aed" />
          <text x="275" y={103 + i * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">AI GPU Server {i + 1} — 8 GPUs inside</text>
          {/* Cold plates */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(g => (
            <rect key={g} x={154 + g * 46} y={86 + i * 34 + 2} width="40" height="6" rx="2" fill="#2563eb" opacity="0.7" />
          ))}
          <text x="480" y={103 + i * 34} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bfdbfe" textAnchor="middle">← Cold plates on chips</text>
        </g>
      ))}

      {/* Manifold lines inside rack */}
      <rect x="154" y="232" width="374" height="14" rx="3" fill="#ca8a04" opacity="0.8" />
      <text x="341" y="243" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">Coolant Manifold — distributes cold water, collects warm water</text>

      {/* Warm water out */}
      <line x1="536" y1="140" x2="567" y2="140" stroke="#dc2626" strokeWidth="3" markerEnd="url(#lcs-ar2)" />
      <rect x="568" y="100" width="106" height="80" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="621" y="130" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7f1d1d" textAnchor="middle">Warm Water</text>
      <text x="621" y="143" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7f1d1d" textAnchor="middle">Return</text>
      <text x="621" y="158" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">35–45°C</text>
      <text x="621" y="170" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">(absorbed GPU heat)</text>

      {/* Chiller */}
      <line x1="674" y1="140" x2="705" y2="140" stroke="#dc2626" strokeWidth="3" markerEnd="url(#lcs-ar3)" />
      <rect x="706" y="86" width="100" height="108" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="756" y="120" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Chiller</text>
      <text x="756" y="134" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Plant</text>
      <text x="756" y="150" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Removes heat</text>
      <text x="756" y="162" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">cools water</text>
      <text x="756" y="174" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">back to 18°C</text>

      {/* Loop back */}
      <path d="M 756 86 Q 756 50 64 50 Q 64 100 64 100" stroke="#2563eb" strokeWidth="2" fill="none" strokeDasharray="5,3" markerEnd="url(#lcs-ar4)" />
      <text x="410" y="44" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563eb" textAnchor="middle">Cooled water loops back — continuous cycle</text>

      {/* Comparison callout */}
      <rect x="14" y="256" width="792" height="30" rx="5" fill="#f1f5f9" />
      <text x="200" y="272" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Old air cooling: handles ~20 kW/rack maximum</text>
      <text x="410" y="272" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#16a34a" textAnchor="middle">Liquid cooling: handles 120+ kW/rack</text>
      <text x="630" y="272" fontFamily="Arial,sans-serif" fontSize="8" fill="#0891b2" textAnchor="middle">6× more cooling capacity</text>

      <defs>
        <marker id="lcs-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#2563eb" /></marker>
        <marker id="lcs-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
        <marker id="lcs-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
        <marker id="lcs-ar4" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#2563eb" /></marker>
      </defs>
    </svg>
  );
}
