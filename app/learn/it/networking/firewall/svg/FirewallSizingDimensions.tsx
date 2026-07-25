"use client";
export default function FirewallSizingDimensions() {
  const dims = [
    { label:"Baseline Throughput", x:240, y:60, color:"#6b7280" },
    { label:"Threat Inspection Throughput", x:380, y:90, color:"#dc2626" },
    { label:"TLS Decryption Throughput", x:410, y:155, color:"#f59e0b" },
    { label:"VPN Throughput", x:380, y:225, color:"#8b5cf6" },
    { label:"Concurrent Sessions", x:240, y:255, color:"#0ea5e9" },
    { label:"New Session Rate (CPS)", x:100, y:225, color:"#0ea5e9" },
    { label:"Traffic Mix / Packet Size", x:70, y:155, color:"#16a34a" },
    { label:"Enabled Security Services", x:100, y:90, color:"#dc2626" },
    { label:"HA Failure Scenario Capacity", x:240, y:160, color:"#374151" },
  ];
  return (
    <svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Firewall sizing dimensions"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="310" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Firewall Sizing — Multiple Dimensions Required</text>
      <text x="240" y="34" textAnchor="middle" fontSize="9" fill="#6b7280">No arbitrary performance numbers — validate against vendor specs for your actual feature set</text>
      {dims.map((d,i) => {
        const isCenter = d.x===240&&d.y===160;
        if(isCenter) return (
          <g key={i}>
            <rect x="168" y="142" width="144" height="36" rx="8" fill="#374151"/>
            <text x="240" y="163" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">{d.label}</text>
          </g>
        );
        return (
          <g key={i}>
            <line x1="240" y1="160" x2={d.x} y2={d.y} stroke={d.color} strokeWidth="1" strokeDasharray="3,2"/>
            <rect x={d.x-70} y={d.y-12} width="140" height="22" rx="5" fill="#fff" stroke={d.color} strokeWidth="1.5"/>
            <text x={d.x} y={d.y+3} textAnchor="middle" fontSize="8" fontWeight="600" fill={d.color}>{d.label}</text>
          </g>
        );
      })}
      <rect x="10" y="270" width="460" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y="284" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#dc2626">10 Gbps internet circuit ≠ needs a firewall rated at "10 Gbps throughput"</text>
      <text x="240" y="298" textAnchor="middle" fontSize="8" fill="#dc2626">Required: inspected throughput under all enabled features. Circuit line rate ≠ expected firewall load. HA failure: surviving peer handles 100% traffic.</text>
    </svg>
  );
}
