"use client";
// D1 — Firewall vs Router vs L3 Switch comparison
export default function FwVsRouterVsL3Switch() {
  const W = 500;
  const cols = [
    { title:"L2 SWITCH", color:"#0ea5e9", bg:"#f0f9ff",
      rows:[["Primary purpose","Frame forwarding"],["OSI layer","L2 (Data Link)"],["Forwarding basis","Destination MAC"],["Stateful inspection","No"],["Session tracking","No"],["Security zones","No (VLANs)"],["App awareness","No"],["Typical use","Campus/DC access layer"]] },
    { title:"ROUTER", color:"#16a34a", bg:"#f0fdf4",
      rows:[["Primary purpose","Best-path IP forwarding"],["OSI layer","L3"],["Forwarding basis","IP + route table"],["Stateful inspection","No (ACL only)"],["Session tracking","No"],["Security zones","No"],["App awareness","No"],["Typical use","WAN edge, border, SP"]] },
    { title:"FIREWALL", color:"#dc2626", bg:"#fff5f5",
      rows:[["Primary purpose","Security policy enforcement"],["OSI layer","L3–L7"],["Forwarding basis","Policy + connection state"],["Stateful inspection","Yes"],["Session tracking","Yes — flow/session state"],["Security zones","Yes (zone-based models)"],["App awareness","NGFW: Yes"],["Typical use","Security boundary, perimeter"]] },
  ];
  const ROW_H = 22; const HEAD_H = 28; const PAD = 8; const GAP = 6;
  const colW = (W - GAP*(cols.length-1)) / cols.length;
  const totalH = 50 + HEAD_H + cols[0].rows.length * ROW_H + PAD*2 + 36;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Firewall vs Router vs L2 Switch comparison"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Firewall vs Router vs L2 Switch</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="9" fill="#6b7280">Primary purpose aur capability comparison — boundaries overlap in modern platforms</text>
      {cols.map((c, ci) => {
        const x = ci * (colW + GAP);
        return (
          <g key={ci}>
            <rect x={x} y="44" width={colW} height={HEAD_H + c.rows.length*ROW_H + PAD*2} rx="7" fill={c.bg} stroke={c.color} strokeWidth="1.5"/>
            <rect x={x} y="44" width={colW} height={HEAD_H} rx="7" fill={c.color}/>
            <rect x={x} y="44+16" width={colW} height="12" fill={c.color}/>
            <text x={x+colW/2} y="44+19" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{c.title}</text>
            {c.rows.map((r,ri) => (
              <g key={ri}>
                <text x={x+6} y={44+HEAD_H+PAD+ri*ROW_H+14} fontSize="8" fontWeight="600" fill={c.color}>{r[0]}:</text>
                <text x={x+6} y={44+HEAD_H+PAD+ri*ROW_H+24} fontSize="8" fill="#374151">{r[1]}</text>
                {ri < c.rows.length-1 && <line x1={x+4} y1={44+HEAD_H+PAD+(ri+1)*ROW_H} x2={x+colW-4} y2={44+HEAD_H+PAD+(ri+1)*ROW_H} stroke={c.color} strokeWidth="0.3" opacity="0.4"/>}
              </g>
            ))}
          </g>
        );
      })}
      <rect x="0" y={totalH-30} width={W} height="28" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y={totalH-15} textAnchor="middle" fontSize="8" fill="#92400e">Capabilities overlap in modern platforms — verify specific platform documentation. One physical platform may enforce multiple logical boundaries.</text>
    </svg>
  );
}
