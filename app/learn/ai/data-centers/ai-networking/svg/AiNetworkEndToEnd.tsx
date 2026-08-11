"use client";
export default function AiNetworkEndToEnd() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ane2e-title">
      <title id="ane2e-title">AI Network End-to-End Architecture: Two GPU servers each containing multiple GPUs connected via NVLink/NVSwitch internally. Each server connects through PCIe to a high-speed NIC or RNIC. NICs connect to Top-of-Rack (Leaf) switches. Leaf switches connect up to Spine switches via multiple uplinks (ECMP). The path from GPU to GPU across the network fabric goes: GPU → PCIe → NIC/RNIC → Leaf Switch → Spine Switch → Leaf Switch → NIC/RNIC → PCIe → GPU.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI NETWORK END-TO-END ARCHITECTURE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">GPU → PCIe → NIC/RNIC → Leaf → Spine → Leaf → NIC/RNIC → PCIe → GPU</text>

      {/* Server A */}
      <rect x="14" y="44" width="220" height="200" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="124" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c4b5fd" textAnchor="middle">GPU SERVER A</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={22 + i*50} y="70" width="42" height="28" rx="4" fill="#7c3aed" />
          <text x={43 + i*50} y="88" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
        </g>
      ))}
      <text x="124" y="115" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">← NVLink / NVSwitch (intra-node) →</text>
      <line x1="124" y1="68" x2="124" y2="100" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
      <rect x="55" y="130" width="138" height="26" rx="4" fill="#0f172a" stroke="#00d4ff" strokeWidth="1" />
      <text x="124" y="147" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">PCIe Bus</text>
      <rect x="55" y="170" width="138" height="28" rx="5" fill="#0284c7" />
      <text x="124" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">NIC / RNIC</text>
      <text x="124" y="198" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">High-Speed Port</text>
      <line x1="124" y1="156" x2="124" y2="170" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#ane-ar)" />
      <line x1="124" y1="198" x2="124" y2="244" stroke="#0284c7" strokeWidth="2" markerEnd="url(#ane-ar)" />

      {/* Server B */}
      <rect x="586" y="44" width="220" height="200" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="696" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c4b5fd" textAnchor="middle">GPU SERVER B</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={594 + i*50} y="70" width="42" height="28" rx="4" fill="#7c3aed" />
          <text x={615 + i*50} y="88" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
        </g>
      ))}
      <text x="696" y="115" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">← NVLink / NVSwitch (intra-node) →</text>
      <rect x="627" y="130" width="138" height="26" rx="4" fill="#0f172a" stroke="#00d4ff" strokeWidth="1" />
      <text x="696" y="147" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">PCIe Bus</text>
      <rect x="627" y="170" width="138" height="28" rx="5" fill="#0284c7" />
      <text x="696" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">NIC / RNIC</text>
      <text x="696" y="198" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">High-Speed Port</text>
      <line x1="696" y1="156" x2="696" y2="170" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#ane-ar)" />
      <line x1="696" y1="198" x2="696" y2="244" stroke="#0284c7" strokeWidth="2" markerEnd="url(#ane-ar)" />

      {/* Leaf switches */}
      <rect x="54" y="244" width="140" height="28" rx="5" fill="#16a34a" />
      <text x="124" y="262" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Leaf / ToR Switch A</text>
      <rect x="626" y="244" width="140" height="28" rx="5" fill="#16a34a" />
      <text x="696" y="262" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Leaf / ToR Switch B</text>

      {/* Spine */}
      <rect x="290" y="244" width="240" height="28" rx="5" fill="#ca8a04" />
      <text x="410" y="262" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">Spine Switches (multiple paths — ECMP)</text>

      {/* Connections leaf to spine */}
      <line x1="194" y1="258" x2="290" y2="258" stroke="#16a34a" strokeWidth="2" markerEnd="url(#ane-ar-g)" />
      <line x1="626" y1="258" x2="530" y2="258" stroke="#16a34a" strokeWidth="2" markerEnd="url(#ane-ar-g)" />
      <line x1="160" y1="272" x2="300" y2="290" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="660" y1="272" x2="520" y2="290" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />

      <text x="410" y="298" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">ECMP distributes traffic across multiple uplink paths — no single bottleneck between leaf and spine</text>
      <text x="410" y="312" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">NVLink = intra-node only (not shown as inter-server path) · InfiniBand or Ethernet = inter-node fabric</text>

      <defs>
        <marker id="ane-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0284c7" /></marker>
        <marker id="ane-ar-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
