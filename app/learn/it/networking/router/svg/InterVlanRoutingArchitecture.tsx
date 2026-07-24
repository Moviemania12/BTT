"use client";
// D12 — Inter-VLAN Routing: 3 approaches comparison
export default function InterVlanRoutingArchitecture() {
  const W = 480;
  const approaches = [
    {
      title:"1. Separate Physical Interfaces",
      color:"#dc2626", bg:"#fff5f5",
      lines:["One cable per VLAN to router","One IP interface per VLAN","Scale: Poor — one port per VLAN","Modern use: Rare"],
    },
    {
      title:"2. Router-on-a-Stick",
      color:"#f59e0b", bg:"#fffbeb",
      lines:["One trunk cable, subinterfaces","All traffic hairpins same link","Scale: Limited — bandwidth bottleneck","Modern use: Lab / small deployments"],
    },
    {
      title:"3. L3 Switch with SVIs (Preferred)",
      color:"#16a34a", bg:"#f0fdf4",
      lines:["Hardware ASIC inter-VLAN routing","Wire-speed — no external router","Scale: Excellent","Modern use: Enterprise / DC standard"],
    },
  ];
  const totalH = 52 + approaches.length * 108 + 80;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Three inter-VLAN routing architecture approaches"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Inter-VLAN Routing — Architecture Comparison</text>
      {approaches.map((a, i) => (
        <g key={i}>
          <rect x="10" y={38+i*110} width={W-20} height="102" rx="7" fill={a.bg} stroke={a.color} strokeWidth="2"/>
          <rect x="10" y={38+i*110} width={W-20} height="22" rx="7" fill={a.color}/>
          <rect x="10" y={38+i*110+14} width={W-20} height="8" fill={a.color}/>
          <text x={W/2} y={38+i*110+14} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{a.title}</text>
          {a.lines.map((l, li) => (
            <text key={li} x="20" y={38+i*110+34+li*16} fontSize="9" fill="#374151">• {l}</text>
          ))}
        </g>
      ))}
      <rect x="10" y={38+approaches.length*110+8} width={W-20} height="50" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y={38+approaches.length*110+24} textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Summary Comparison</text>
      {[
        { prop:"Scale",       v1:"Very poor",    v2:"Limited",    v3:"Excellent" },
        { prop:"Performance", v1:"Good per link", v2:"Bottleneck", v3:"Wire-speed ASIC" },
      ].map((r, ri) => (
        <g key={ri}>
          <text x="18" y={38+approaches.length*110+36+ri*14} fontSize="8" fontWeight="700" fill="#374151">{r.prop}:</text>
          <text x="100" y={38+approaches.length*110+36+ri*14} fontSize="8" fill="#dc2626">{r.v1}</text>
          <text x="220" y={38+approaches.length*110+36+ri*14} fontSize="8" fill="#f59e0b">{r.v2}</text>
          <text x="320" y={38+approaches.length*110+36+ri*14} fontSize="8" fill="#16a34a">{r.v3}</text>
        </g>
      ))}
    </svg>
  );
}
