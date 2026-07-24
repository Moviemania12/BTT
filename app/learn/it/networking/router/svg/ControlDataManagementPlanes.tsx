"use client";
// D3 — Control, Data, and Management Plane model (functional, not physical separation)
export default function ControlDataManagementPlanes() {
  const W = 480;
  const planes = [
    {
      label: "MANAGEMENT PLANE", color: "#8b5cf6", bg: "#faf5ff", y: 52,
      note: "Administrative/operational functions",
      items: ["SSH sessions, NETCONF/RESTCONF", "SNMP agent, Syslog, NTP", "AAA (TACACS+/RADIUS)", "Web management interface"],
      impl: "CPU / management process — management traffic is CPU-bound, arrives on physical interfaces",
    },
    {
      label: "CONTROL PLANE", color: "#0ea5e9", bg: "#f0f9ff", y: 185,
      note: "Routing intelligence — builds and maintains RIB",
      items: ["OSPF, BGP, IS-IS — routing protocols", "ARP/NDP adjacency handling", "ICMP processing", "MPLS LDP/signaling (where applicable)"],
      impl: "CPU or dedicated route processor — programs selected routes into FIB",
    },
    {
      label: "DATA PLANE (FORWARDING PLANE)", color: "#16a34a", bg: "#f0fdf4", y: 318,
      note: "Packet forwarding at line rate",
      items: ["FIB lookup — Longest Prefix Match", "TTL/Hop Limit decrement + L2 header rewrite", "QoS queuing/scheduling, ACL enforcement, NAT"],
      impl: "NPU/ASIC (hardware platforms) or CPU threads (virtual/software routers) — implementation varies",
    },
  ];
  return (
    <svg viewBox={`0 0 ${W} 510`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Control, Data, and Management Plane functional model"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="510" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Three-Plane Model — Functional Description</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#6b7280">Describes functional categories — not separate physical packet paths</text>
      {planes.map((pl) => (
        <g key={pl.label}>
          <rect x="10" y={pl.y} width={W-20} height="115" rx="8" fill={pl.bg} stroke={pl.color} strokeWidth="2"/>
          <rect x="10" y={pl.y} width={W-20} height="22" rx="8" fill={pl.color}/>
          <rect x="10" y={pl.y+14} width={W-20} height="8" fill={pl.color}/>
          <text x={W/2} y={pl.y+14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{pl.label}</text>
          <text x="18" y={pl.y+34} fontSize="8.5" fontStyle="italic" fill={pl.color}>{pl.note}</text>
          {pl.items.map((item, ii) => (
            <text key={ii} x="22" y={pl.y+50+ii*14} fontSize="8.5" fill="#374151">• {item}</text>
          ))}
          <text x="18" y={pl.y+106} fontSize="8" fill="#6b7280" fontStyle="italic">Impl: {pl.impl}</text>
        </g>
      ))}
      <text x={W/2} y="448" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">↓ All traffic (data, control, management) arrives via physical interfaces ↓</text>
      <rect x="10" y="455" width={W-20} height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
      <text x={W/2} y="464" textAnchor="middle" fontSize="8" fontWeight="600" fill="#92400e">CoPP / Control Plane Protection:</text>
      <text x={W/2} y="474" textAnchor="middle" fontSize="8" fill="#92400e">Rate-limits CPU-bound traffic per type — protects routing protocols + management from exhaustion attacks</text>
    </svg>
  );
}
