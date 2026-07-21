"use client";
// Diagram 7 — FC SAN vs iSCSI SAN Architecture Comparison
// Future image: /public/images/articles/san/san-fc-vs-iscsi-architecture.png
export default function SanFcVsIscsi() {
  return (
    <svg viewBox="0 0 860 330" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="FC SAN vs iSCSI SAN architecture comparison"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="330" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">FC SAN vs iSCSI SAN — Architecture Comparison</text>

      {/* FC Column */}
      <rect x="30" y="34" width="380" height="262" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="220" y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Fibre Channel SAN</text>

      {[
        ["FC HBA","Fibre Channel Host Bus Adapter","WWPN-based identity","#dbeafe","#2563eb"],
        ["FC Cable / SFP","Optical fibre + FC-specific transceiver","Speed: 8G/16G/32G/64G — verify interop matrix","#bfdbfe","#2563eb"],
        ["FC SAN Switch","Brocade FOS / Cisco MDS NX-OS","Fabric-native routing; WWPN-based zoning","#93c5fd","#2563eb"],
        ["Storage Array","FC Front-End Ports (WWPN)","Target ports on Fabric A + Fabric B","#3b82f6","#1d4ed8"],
      ].map(([title,sub1,sub2,bg,border],i) => (
        <g key={i}>
          <rect x="48" y={68+i*52} width="344" height="44" rx="5" fill={bg} stroke={border} strokeWidth="0.8"/>
          <text x="220" y={85+i*52} textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="700">{title}</text>
          <text x="220" y={98+i*52} textAnchor="middle" fontSize="8" fill="#374151">{sub1}</text>
          <text x="220" y={108+i*52} textAnchor="middle" fontSize="8" fill="#6b7280">{sub2}</text>
          {i < 3 && <text x="220" y={118+i*52} textAnchor="middle" fontSize="10" fill="#94a3b8">↓</text>}
        </g>
      ))}

      <rect x="48" y="286" width="344" height="18" rx="4" fill="#1e40af"/>
      <text x="220" y="298" textAnchor="middle" fontSize="8" fill="#fff">Identity: WWPN | Purpose-built lossless fabric</text>

      {/* iSCSI Column */}
      <rect x="450" y="34" width="380" height="262" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="640" y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">iSCSI SAN</text>

      {[
        ["iSCSI Initiator","Software initiator (built-in OS) or iSCSI HBA","IQN-based identity","#dcfce7","#16a34a"],
        ["Ethernet Cable / NIC","Standard Ethernet — dedicated storage NIC","10GbE / 25GbE recommended; jumbo frames optional","#bbf7d0","#16a34a"],
        ["Ethernet Switch","Standard Ethernet switch (storage VLAN)","Dedicated storage VLAN / network required","#86efac","#16a34a"],
        ["Storage Array","iSCSI Target Portals (IP:3260)","TCP port 3260 (standard); CHAP auth available","#4ade80","#15803d"],
      ].map(([title,sub1,sub2,bg,border],i) => (
        <g key={i}>
          <rect x="468" y={68+i*52} width="344" height="44" rx="5" fill={bg} stroke={border} strokeWidth="0.8"/>
          <text x="640" y={85+i*52} textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="700">{title}</text>
          <text x="640" y={98+i*52} textAnchor="middle" fontSize="8" fill="#374151">{sub1}</text>
          <text x="640" y={108+i*52} textAnchor="middle" fontSize="8" fill="#6b7280">{sub2}</text>
          {i < 3 && <text x="640" y={118+i*52} textAnchor="middle" fontSize="10" fill="#94a3b8">↓</text>}
        </g>
      ))}

      <rect x="468" y="286" width="344" height="18" rx="4" fill="#15803d"/>
      <text x="640" y="298" textAnchor="middle" fontSize="8" fill="#fff">Identity: IQN | SCSI over TCP/IP — IP networking skills transferable</text>

      <text x="430" y="318" textAnchor="middle" fontSize="8" fill="#9ca3af">Both provide block-level LUN access. Performance depends on infrastructure, workload and configuration — not protocol alone.</text>
    </svg>
  );
}
