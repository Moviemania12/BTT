"use client";
// D7 — VLAN Segmentation: Access Ports, Trunk, Broadcast Domains
export default function VlanSegmentation() {
  const vlans = [
    { id:"10", name:"HR",      color:"#2563eb", bg:"#dbeafe", devices:["PC-HR-1","PC-HR-2","PC-HR-3"] },
    { id:"20", name:"Finance", color:"#16a34a", bg:"#dcfce7", devices:["PC-Fin-1","PC-Fin-2","Server-Finance"] },
    { id:"30", name:"Guest",   color:"#ea580c", bg:"#fff7ed", devices:["Laptop-G1","Laptop-G2"] },
  ];
  const HEAD=28; const ROW=18; const PAD=6; const GAP=8;
  const cardH = (n:number) => HEAD + n*ROW + PAD*2;
  const totalH = 44 + vlans.reduce((s,v)=>s+cardH(v.devices.length)+GAP,0) + 88;
  let y=44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="VLAN segmentation — isolated broadcast domains on single switch"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">VLAN Segmentation — Isolated Broadcast Domains</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">One physical switch · multiple logical networks · inter-VLAN requires L3 routing</text>
      {vlans.map((v, vi) => {
        const h = cardH(v.devices.length); const gy=y;
        const el = (
          <g key={vi}>
            <rect x="10" y={gy} width="460" height={h} rx="7" fill={v.bg} stroke={v.color} strokeWidth="2"/>
            <rect x="10" y={gy} width="460" height={HEAD} rx="7" fill={v.color}/>
            <rect x="10" y={gy+HEAD-5} width="460" height="5" fill={v.color}/>
            <text x="80" y={gy+HEAD-8} fontSize="11" fontWeight="700" fill="#fff">VLAN {v.id} — {v.name}</text>
            <text x="400" y={gy+HEAD-8} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)">Broadcast Domain {vi+1}</text>
            {v.devices.map((d, di) => (
              <g key={di}>
                <rect x="24" y={gy+HEAD+PAD+di*ROW} width="100" height="14" rx="3" fill="white" stroke={v.color} strokeWidth="0.8"/>
                <text x="74" y={gy+HEAD+PAD+di*ROW+10} textAnchor="middle" fontSize="9" fill={v.color}>{d}</text>
                <text x="138" y={gy+HEAD+PAD+di*ROW+10} fontSize="9" fill="#6b7280">← Access Port, untagged, VLAN {v.id}</text>
              </g>
            ))}
          </g>
        );
        y+=h+GAP; return el;
      })}
      {/* Trunk uplink */}
      <rect x="10" y={y} width="460" height="26" rx="6" fill="#1e293b" stroke="#1e293b"/>
      <text x="240" y={y+17} textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc">TRUNK PORT — 802.1Q Tagged · VLAN 10 + 20 + 30 simultaneously</text>
      <rect x="10" y={y+32} width="460" height="20" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y+45} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">VLAN 10 broadcast ≠ reaches VLAN 20 or 30 · Inter-VLAN: L3 switch SVI or router required</text>
    </svg>
  );
}
