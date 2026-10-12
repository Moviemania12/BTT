"use client";
export default function VirtualNetworking() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Virtual networking: VM vNICs connect to port groups on a virtual switch, uplinks go to physical NICs and then to trunk ports on two top-of-rack switches, with VLAN tags separating production, management and vMotion traffic" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="430" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Virtual Networking Inside One Host</text>
      <rect x="20" y="44" width="620" height="290" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2.5" />
      <text x="330" y="64" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#6b7280">HYPERVISOR HOST</text>
      {[["Web VM", "#2563eb"], ["App VM", "#16a34a"], ["DB VM", "#7c3aed"]].map(([n, c], i) => (
        <g key={i}>
          <rect x={40 + i * 90} y="80" width="78" height="44" rx="5" fill="#fff" stroke={c} strokeWidth="2" />
          <text x={79 + i * 90} y="100" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill={c}>{n}</text>
          <text x={79 + i * 90} y="114" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">vNIC</text>
        </g>
      ))}
      <rect x="320" y="80" width="150" height="44" rx="5" fill="#fff" stroke="#d97706" strokeWidth="2" />
      <text x="395" y="100" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#d97706">Host services</text>
      <text x="395" y="114" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">mgmt · live migration · storage</text>
      <rect x="40" y="160" width="86" height="30" rx="4" fill="#dbeafe" stroke="#2563eb" />
      <text x="83" y="179" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#1e40af">PG: Prod VLAN 10</text>
      <rect x="130" y="160" width="86" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" />
      <text x="173" y="179" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#166534">PG: App VLAN 20</text>
      <rect x="220" y="160" width="86" height="30" rx="4" fill="#ede9fe" stroke="#7c3aed" />
      <text x="263" y="179" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#5b21b6">PG: DB VLAN 30</text>
      <rect x="320" y="160" width="150" height="30" rx="4" fill="#fef3c7" stroke="#d97706" />
      <text x="395" y="179" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#78350f">VMkernel / mgmt VLANs 99, 98</text>
      <line x1="79" y1="124" x2="83" y2="160" stroke="#2563eb" strokeWidth="1.8" />
      <line x1="169" y1="124" x2="173" y2="160" stroke="#16a34a" strokeWidth="1.8" />
      <line x1="259" y1="124" x2="263" y2="160" stroke="#7c3aed" strokeWidth="1.8" />
      <line x1="395" y1="124" x2="395" y2="160" stroke="#d97706" strokeWidth="1.8" />
      <rect x="40" y="214" width="430" height="44" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="255" y="233" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#713f12">Virtual switch (standard or distributed)</text>
      <text x="255" y="248" textAnchor="middle" fontFamily={f} fontSize="9" fill="#713f12">switches frames in software · teaming policy · security / QoS policies</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <line x1={150 + i * 210} y1="258" x2={150 + i * 210} y2="284" stroke="#475569" strokeWidth="2" />
          <rect x={110 + i * 210} y="284" width="80" height="34" rx="5" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
          <text x={150 + i * 210} y="305" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#075985">Uplink NIC {i + 1}</text>
        </g>
      ))}
      <polyline points="150,318 150,328 620,328 620,160 660,160" fill="none" stroke="#0369a1" strokeWidth="2.5" />
      <line x1="400" y1="301" x2="660" y2="290" stroke="#0369a1" strokeWidth="2.5" />
      <rect x="660" y="110" width="180" height="70" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <text x="750" y="136" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">ToR Switch A</text>
      <text x="750" y="152" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">trunk port: VLANs 10,20,30,98,99</text>
      <rect x="660" y="240" width="180" height="70" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <text x="750" y="266" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">ToR Switch B</text>
      <text x="750" y="282" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">trunk port: same VLANs</text>
      <text x="470" y="296" fontFamily={f} fontSize="9" fontWeight="700" fill="#0369a1">tagged VLAN traffic</text>
      <rect x="20" y="348" width="820" height="68" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="368" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Key points</text>
      <text x="430" y="386" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Two uplinks to two ToR switches = no single NIC/switch failure. Separate VLANs for VM, management, live migration and storage traffic.</text>
      <text x="430" y="402" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">VM-to-VM traffic on the same host and same VLAN never leaves the host — a firewall on the physical network will not see it unless you add microsegmentation.</text>
    </svg>
  );
}
