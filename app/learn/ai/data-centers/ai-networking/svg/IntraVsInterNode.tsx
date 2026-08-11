"use client";
export default function IntraVsInterNode() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ivn-title">
      <title id="ivn-title">Intra-Node vs Inter-Node GPU Communication. Left panel: Intra-Node — within one server, multiple GPUs connected via NVLink/NVSwitch (high bandwidth, low latency, proprietary NVIDIA technology, not a data center network). PCIe also connects GPUs to CPU and other devices within the server. Right panel: Inter-Node — between different servers, communication goes through NIC/RNIC, then through the data center network fabric using InfiniBand or Ethernet/RoCE (separate technology from NVLink).</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">INTRA-NODE vs INTER-NODE COMMUNICATION</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">These are fundamentally different communication technologies — NVLink is NOT a data center network</text>

      {/* LEFT: Intra-Node */}
      <rect x="14" y="44" width="360" height="220" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="194" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">INTRA-NODE (Within One Server)</text>
      <text x="194" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">NVLink / NVSwitch / PCIe</text>

      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={22 + i*82} y="92" width="72" height="40" rx="5" fill="#7c3aed" />
          <text x={58 + i*82} y="108" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i+1}</text>
          <text x={58 + i*82} y="120" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">HBM</text>
        </g>
      ))}

      {/* NVSwitch box */}
      <rect x="80" y="150" width="228" height="28" rx="5" fill="#4c1d95" stroke="#a78bfa" strokeWidth="1" />
      <text x="194" y="168" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#e9d5ff" textAnchor="middle">NVSwitch (intra-node GPU interconnect)</text>

      {/* Lines GPU to NVSwitch */}
      {[58,140,222,304].map(x => (
        <line key={x} x1={x} y1={132} x2={x} y2={150} stroke="#a78bfa" strokeWidth="1.5" />
      ))}

      <text x="194" y="198" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">NVLink connects these GPUs directly</text>
      <text x="194" y="212" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Very high bandwidth · Very low latency</text>
      <text x="194" y="224" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">NVIDIA platforms only · NOT a DC network</text>
      <text x="194" y="238" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">PCIe also connects GPU → CPU → NIC within server</text>
      <rect x="22" y="248" width="344" height="12" rx="3" fill="#7c3aed" opacity="0.3" />
      <text x="194" y="258" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#c4b5fd" textAnchor="middle">One physical server boundary</text>

      {/* RIGHT: Inter-Node */}
      <rect x="446" y="44" width="360" height="220" rx="8" fill="#0c1a2e" stroke="#0284c7" strokeWidth="2" />
      <text x="626" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">INTER-NODE (Between Servers)</text>
      <text x="626" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">InfiniBand / Ethernet / RoCE</text>

      {/* Server boxes */}
      <rect x="454" y="90" width="148" height="64" rx="5" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1" />
      <text x="528" y="110" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#c4b5fd" textAnchor="middle">Server A</text>
      <text x="528" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">4× GPUs (NVLink)</text>
      <rect x="468" y="132" width="120" height="16" rx="3" fill="#0284c7" />
      <text x="528" y="144" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">NIC / RNIC</text>

      <rect x="630" y="90" width="148" height="64" rx="5" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1" />
      <text x="704" y="110" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#c4b5fd" textAnchor="middle">Server B</text>
      <text x="704" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">4× GPUs (NVLink)</text>
      <rect x="644" y="132" width="120" height="16" rx="3" fill="#0284c7" />
      <text x="704" y="144" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">NIC / RNIC</text>

      {/* Network fabric */}
      <rect x="500" y="180" width="252" height="28" rx="5" fill="#0284c7" />
      <text x="626" y="198" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Data Center Network Fabric</text>

      <line x1="528" y1="148" x2="528" y2="180" stroke="#0284c7" strokeWidth="2" markerEnd="url(#ivn-ar)" />
      <line x1="704" y1="148" x2="704" y2="180" stroke="#0284c7" strokeWidth="2" markerEnd="url(#ivn-ar)" />

      <text x="626" y="228" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#38bdf8" textAnchor="middle">InfiniBand: Dedicated HPC/AI fabric</text>
      <text x="626" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#38bdf8" textAnchor="middle">Ethernet+RoCE: Standard Ethernet with RDMA</text>
      <text x="626" y="252" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">These are inter-server protocols — completely different from NVLink</text>

      <defs>
        <marker id="ivn-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0284c7" /></marker>
      </defs>
    </svg>
  );
}
