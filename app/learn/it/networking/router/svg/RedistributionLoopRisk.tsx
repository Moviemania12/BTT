"use client";
// D16 — Route Redistribution Loop Risk with prevention
export default function RedistributionLoopRisk() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 360`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Route redistribution loop risk and prevention"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="360" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Route Redistribution — Loop Risk</text>
      {/* Loop scenario */}
      <text x={W/2} y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">Without Filtering — Feedback Loop Risk</text>
      <rect x="20" y="44" width="140" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="90" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">Router-A (ASBR)</text>
      <text x="90" y="73" textAnchor="middle" fontSize="8" fill="#374151">OSPF → BGP</text>
      <rect x="320" y="44" width="140" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="390" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">Router-B (ASBR)</text>
      <text x="390" y="73" textAnchor="middle" fontSize="8" fill="#374151">BGP → OSPF</text>
      <text x={W/2} y="60" textAnchor="middle" fontSize="8.5" fill="#374151">← BGP →</text>
      <line x1="160" y1="62" x2="320" y2="62" stroke="#dc2626" strokeWidth="1.5"/>
      {[
        "1. OSPF 10.1.0.0/24 → Router-A redistributes into BGP",
        "2. BGP carries route to Router-B",
        "3. Router-B redistributes BGP route back into OSPF (as external)",
        "4. OSPF re-learns 10.1.0.0/24 as external — potential loop / suboptimal path",
        "5. Without tagging+filtering: route oscillates, metrics inflate",
      ].map((s, i) => (
        <text key={i} x="16" y={96+i*16} fontSize="8.5" fill={i>=3?"#dc2626":"#374151"}>• {s}</text>
      ))}
      {/* Prevention */}
      <text x={W/2} y="190" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">Prevention Strategies</text>
      <rect x="10" y="196" width={W-20} height="100" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      {[
        { t:"Route Tagging:", d:"Tag routes at Router-A redistribution → filter tagged at Router-B re-entry point" },
        { t:"Prefix Filtering:", d:"Only redistribute specific prefixes — never redistribute all" },
        { t:"Minimize points:", d:"One-way redistribution preferred — two-way at multiple points = highest risk" },
        { t:"AD manipulation:", d:"Make redistributed routes less preferred than native routes (reduce loop probability)" },
      ].map((p, i) => (
        <g key={i}>
          <text x="18" y={212+i*22} fontSize="8.5" fontWeight="700" fill="#16a34a">{p.t}</text>
          <text x="120" y={212+i*22} fontSize="8.5" fill="#374151">{p.d}</text>
        </g>
      ))}
      <rect x="10" y="306" width={W-20} height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="320" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Important: Route tags do not automatically prevent loops</text>
      <text x={W/2} y="334" textAnchor="middle" fontSize="8" fill="#92400e">They are policy tools requiring explicit filter rules referencing the tag</text>
      <text x={W/2} y="344" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#a16207">Tag implementation varies by protocol and platform</text>
    </svg>
  );
}
