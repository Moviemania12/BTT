"use client";
// D10 — Router Interface Types taxonomy with admin/operational state model
export default function RouterInterfaceTypes() {
  const W = 480;
  const physical = ["Ethernet (routed) — LAN/WAN IP connectivity","Management port (dedicated OOB)","Serial (legacy WAN — historical context)"];
  const logical = ["Subinterface — child of physical, 802.1Q/VLAN","Loopback — always up independent of physical links","Tunnel — GRE/IPsec/VPN encapsulation","SVI — VLAN-associated L3 gateway (platforms supporting it)","Null — black-hole routing"];
  const states = [
    { adm:"Up", opr:"Up", meaning:"Normal — interface forwarding", color:"#16a34a" },
    { adm:"Up", opr:"Down", meaning:"Physical/L2 problem — check cable, SFP, remote end, PHY", color:"#dc2626" },
    { adm:"Down", opr:"Down", meaning:"Operator shutdown — not a fault", color:"#6b7280" },
    { adm:"Up", opr:"Err-disabled", meaning:"Platform auto-disabled (security/error) — investigate root cause", color:"#f59e0b" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 440`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Router interface types and admin/operational state model"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="440" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Router Interface Types</text>
      <text x="14" y="40" fontSize="9.5" fontWeight="700" fill="#374151">Physical Interfaces:</text>
      {physical.map((p, i) => (
        <g key={i}>
          <rect x="10" y={46+i*22} width={W-20} height="18" rx="4" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1"/>
          <text x="20" y={46+i*22+12} fontSize="8.5" fill="#1e3a8a">📡 {p}</text>
        </g>
      ))}
      <text x="14" y="122" fontSize="9.5" fontWeight="700" fill="#374151">Logical Interfaces:</text>
      {logical.map((l, i) => (
        <g key={i}>
          <rect x="10" y={128+i*22} width={W-20} height="18" rx="4" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1"/>
          <text x="20" y={128+i*22+12} fontSize="8.5" fill="#4c1d95">🔷 {l}</text>
        </g>
      ))}
      {/* Admin vs operational state */}
      <text x="14" y="252" fontSize="9.5" fontWeight="700" fill="#374151">Admin State × Operational State:</text>
      <rect x="10" y="258" width={W-20} height="18" rx="3" fill="#e5e7eb"/>
      <text x="50" y="270" fontSize="8.5" fontWeight="700" fill="#374151">Admin</text>
      <text x="130" y="270" fontSize="8.5" fontWeight="700" fill="#374151">Operational</text>
      <text x="280" y="270" fontSize="8.5" fontWeight="700" fill="#374151">Meaning</text>
      {states.map((s, i) => (
        <g key={i}>
          <rect x="10" y={276+i*22} width={W-20} height="20" rx="3" fill="#fff" stroke={s.color} strokeWidth="0.8"/>
          <text x="50" y={276+i*22+13} fontSize="8.5" fontWeight="700" fill={s.color}>{s.adm}</text>
          <text x="130" y={276+i*22+13} fontSize="8.5" fontWeight="700" fill={s.color}>{s.opr}</text>
          <text x="280" y={276+i*22+13} fontSize="8" fill="#374151">{s.meaning}</text>
        </g>
      ))}
      <rect x="10" y="368" width={W-20} height="28" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="381" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#92400e">Interface types, naming conventions, and state behavior: platform and NOS dependent</text>
      <text x={W/2} y="393" textAnchor="middle" fontSize="8" fill="#92400e">Verify hardware documentation for supported interface types on your specific platform</text>
    </svg>
  );
}
