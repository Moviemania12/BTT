"use client";
// D26 — Load Balancer Network Interface Layout
export default function LbNetworkInterfaces() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 280`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer network interface layout showing four interface types"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="280" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Load Balancer Network Interface Layout</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">VLAN numbers are illustrative. May be sub-interfaces, not necessarily separate physical ports.</text>

      {/* Upstream */}
      <rect x="120" y="42" width="240" height="22" rx="5" fill="#374151"/>
      <text x={W/2} y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Internet / Firewall / Upstream</text>

      <line x1={W/2} y1="64" x2={W/2} y2="80" stroke="#374151" strokeWidth="2"/>

      {/* VLAN 100 */}
      <rect x="100" y="80" width="280" height="18" rx="4" fill="#3b82f6"/>
      <text x={W/2} y="92" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">VLAN 100 — Client-facing / DMZ</text>
      <line x1="160" y1="98" x2="160" y2="114" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="320" y1="98" x2="320" y2="114" stroke="#3b82f6" strokeWidth="1.5"/>

      {/* LB-A */}
      <rect x="10" y="114" width="195" height="96" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="107" y="131" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">LB-A</text>
      {[
        { label: "Client IF", vlan: "VLAN 100", color: "#3b82f6" },
        { label: "Server IF", vlan: "VLAN 200", color: "#16a34a" },
        { label: "Mgmt IF", vlan: "VLAN 300", color: "#6b7280" },
        { label: "HA IF", vlan: "VLAN 400", color: "#8b5cf6" },
      ].map((iface, i) => (
        <g key={i}>
          <rect x="18" y={138+i*16} width="80" height="13" rx="3" fill={iface.color}/>
          <text x="58" y={148+i*16} textAnchor="middle" fontSize="7.5" fill="#fff">{iface.label}</text>
          <text x="106" y={148+i*16} fontSize="7.5" fill="#374151">{iface.vlan}</text>
        </g>
      ))}

      {/* LB-B */}
      <rect x="275" y="114" width="195" height="96" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="372" y="131" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">LB-B</text>
      {[
        { label: "Client IF", vlan: "VLAN 100", color: "#3b82f6" },
        { label: "Server IF", vlan: "VLAN 200", color: "#16a34a" },
        { label: "Mgmt IF", vlan: "VLAN 300", color: "#6b7280" },
        { label: "HA IF", vlan: "VLAN 400", color: "#8b5cf6" },
      ].map((iface, i) => (
        <g key={i}>
          <rect x="283" y={138+i*16} width="80" height="13" rx="3" fill={iface.color}/>
          <text x="323" y={148+i*16} textAnchor="middle" fontSize="7.5" fill="#fff">{iface.label}</text>
          <text x="370" y={148+i*16} fontSize="7.5" fill="#374151">{iface.vlan}</text>
        </g>
      ))}

      {/* HA Link */}
      <line x1="205" y1="162" x2="275" y2="162" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,2"/>
      <text x={W/2} y="158" textAnchor="middle" fontSize="7.5" fill="#8b5cf6" fontWeight="700">HA: heartbeat + state sync</text>

      {/* VLAN 200 */}
      <line x1="160" y1="210" x2="160" y2="228" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="320" y1="210" x2="320" y2="228" stroke="#16a34a" strokeWidth="1.5"/>
      <rect x="100" y="228" width="280" height="18" rx="4" fill="#16a34a"/>
      <text x={W/2} y="240" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">VLAN 200 — Server-facing / Application</text>
      <line x1={W/2} y1="246" x2={W/2} y2="260" stroke="#16a34a" strokeWidth="1.5"/>
      <rect x="120" y="260" width="240" height="16" rx="4" fill="#374151"/>
      <text x={W/2} y="271" textAnchor="middle" fontSize="8.5" fill="#fff">Backend Servers</text>
    </svg>
  );
}
