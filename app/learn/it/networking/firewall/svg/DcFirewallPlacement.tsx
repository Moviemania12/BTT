"use client";
// D6 — Data Center Firewall Placement
export default function DcFirewallPlacement() {
  const W = 480;
  const layers = [
    { label:"Internet / WAN", color:"#dc2626", y:40, w:200 },
    { label:"Edge Router(s)", color:"#6b7280", y:90, w:160 },
    { label:"Perimeter Firewall HA Pair", color:"#dc2626", y:140, w:240, note:"North-South enforcement" },
    { label:"DMZ — Reverse Proxy / Web", color:"#f59e0b", y:196, w:200, note:"Public-facing servers" },
    { label:"Internal Firewall", color:"#8b5cf6", y:246, w:200, note:"DMZ → internal enforcement" },
    { label:"Spine Layer", color:"#0ea5e9", y:296, w:180 },
    { label:"Leaf / ToR Layer", color:"#0ea5e9", y:346, w:180, note:"East-West: micro-seg / distributed FW" },
    { label:"Servers", color:"#16a34a", y:396, w:160 },
  ];
  return (
    <svg viewBox={`0 0 ${W} 470`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data center firewall placement"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="470" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Data Center Firewall Placement</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="9" fill="#6b7280">Common placement patterns — actual topology varies by architecture</text>
      {layers.map((l, i) => {
        const x = (W - l.w) / 2;
        return (
          <g key={i}>
            <rect x={x} y={l.y} width={l.w} height="30" rx="6" fill={l.color} opacity="0.9"/>
            <text x={W/2} y={l.y+18} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{l.label}</text>
            {l.note && <text x={W/2+l.w/2+8} y={l.y+18} fontSize="7.5" fill={l.color} fontStyle="italic">← {l.note}</text>}
            {i < layers.length-1 && <line x1={W/2} y1={l.y+30} x2={W/2} y2={l.y+50} stroke="#9ca3af" strokeWidth="1.5"/>}
          </g>
        );
      })}
      <rect x="10" y="434" width={W-20} height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="448" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">North-South: perimeter firewall handles internet/WAN. East-West: lateral traffic within DC needs separate design.</text>
      <text x={W/2} y="460" textAnchor="middle" fontSize="8" fill="#92400e">Both directions of a flow must encounter compatible state. Asymmetric paths typically cause session misses/drops.</text>
    </svg>
  );
}
