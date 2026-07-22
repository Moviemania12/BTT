"use client";
// D10 — MLAG Architecture: Dual-chassis LAG with peer link
export default function MlagArchitecture() {
  return (
    <svg viewBox="0 0 480 440" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="MLAG multi-chassis link aggregation architecture with peer link and keepalive"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height="440" fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">MLAG — Multi-Chassis Link Aggregation</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Two physical switches act as one logical LAG partner — dual-switch redundancy without STP blocking</text>

      {/* MLAG Pair box */}
      <rect x="10" y="44" width="460" height="130" rx="9" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="240" y="60" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#2563eb">MLAG PAIR (appears as single LAG partner to server)</text>

      {/* Switch A */}
      <rect x="30" y="68" width="170" height="50" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="115" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Switch-A (Primary)</text>
      <text x="115" y="104" textAnchor="middle" fontSize="8.5" fill="#1e40af">MLAG member ports + peer link port</text>
      <text x="115" y="116" textAnchor="middle" fontSize="8" fill="#6b7280">vPC (Cisco) / MLAG (Arista)</text>

      {/* Switch B */}
      <rect x="280" y="68" width="170" height="50" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="365" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Switch-B (Secondary)</text>
      <text x="365" y="104" textAnchor="middle" fontSize="8.5" fill="#1e40af">MLAG member ports + peer link port</text>
      <text x="365" y="116" textAnchor="middle" fontSize="8" fill="#6b7280">MC-LAG (Juniper) / VLT (Dell)</text>

      {/* Peer link */}
      <rect x="200" y="80" width="80" height="30" rx="5" fill="#7c3aed"/>
      <text x="240" y="93" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Peer Link</text>
      <text x="240" y="105" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">ISL — high-speed</text>
      <line x1="200" y1="95" x2="172" y2="95" stroke="#7c3aed" strokeWidth="2"/>
      <line x1="280" y1="95" x2="308" y2="95" stroke="#7c3aed" strokeWidth="2"/>

      {/* Keepalive */}
      <line x1="115" y1="155" x2="240" y2="163" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,2"/>
      <line x1="365" y1="155" x2="240" y2="163" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,2"/>
      <rect x="170" y="158" width="140" height="20" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="171" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#92400e">Keepalive / Heartbeat link</text>

      {/* LACP lines from server */}
      <line x1="160" y1="230" x2="115" y2="182" stroke="#16a34a" strokeWidth="2.5"/>
      <line x1="320" y1="230" x2="365" y2="182" stroke="#16a34a" strokeWidth="2.5"/>
      <text x="115" y="218" fontSize="8.5" fill="#16a34a" fontWeight="600">NIC-1 (Active)</text>
      <text x="310" y="218" fontSize="8.5" fill="#16a34a" fontWeight="600">NIC-2 (Active)</text>

      {/* Server */}
      <rect x="120" y="230" width="240" height="46" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="240" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Server / Hypervisor</text>
      <text x="240" y="266" textAnchor="middle" fontSize="9" fill="#15803d">Dual NIC → single LACP LAG (sees one logical switch)</text>

      {/* Benefits */}
      <text x="240" y="300" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111827">MLAG Advantages vs STP-Based Redundancy</text>
      {[
        { item:"Both MLAG member links active",          stp:"STP blocks redundant links", bg:"#dcfce7", b:"#16a34a" },
        { item:"Switch-A fail → near-hitless failover",  stp:"STP reconvergence: seconds", bg:"#dcfce7", b:"#16a34a" },
        { item:"Full bandwidth utilization",             stp:"50% wasted (blocked path)", bg:"#dcfce7", b:"#16a34a" },
      ].map((r,i) => (
        <g key={i}>
          <rect x="10" y={308+i*32} width="230" height="26" rx="5" fill={r.bg} stroke={r.b} strokeWidth="1"/>
          <text x="125" y={308+i*32+16} textAnchor="middle" fontSize="8.5" fill="#15803d" fontWeight="600">✓ {r.item}</text>
          <rect x="248" y={308+i*32} width="222" height="26" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
          <text x="359" y={308+i*32+16} textAnchor="middle" fontSize="8.5" fill="#991b1b">✗ STP: {r.stp}</text>
        </g>
      ))}

      <rect x="10" y="408" width="460" height="22" rx="5" fill="#fef2f2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y="422" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#991b1b">Split-brain risk: peer link fail → keepalive decides · secondary disables MLAG ports</text>
    </svg>
  );
}
