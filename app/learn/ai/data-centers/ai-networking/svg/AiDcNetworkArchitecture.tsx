"use client";
export default function AiDcNetworkArchitecture() {
  return (
    <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="adna-title">
      <title id="adna-title">Complete AI Data Center Network Architecture showing three logically separate networks. AI Compute/Data Network (purple): GPU servers with NVLink internally, connecting via high-speed NICs through Leaf switches to AI Spine switches. Storage Network (blue): Same GPU servers connect via separate storage NICs to Storage Leaf switches and Storage Spine, then to Parallel File System storage servers. Management Network (gray): Separate low-speed management NICs on each server connect to Management switches and Management servers for BMC/IPMI, SSH, monitoring — completely separate from compute and storage traffic.</title>
      <rect width="820" height="350" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">COMPLETE AI DATA CENTER NETWORK ARCHITECTURE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Three logically separate networks — Management, AI Compute, Storage — each with distinct purpose and requirements</text>

      {/* GPU Servers */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={30 + i * 260} y="50" width="230" height="55" rx="6" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
          <text x={145 + i * 260} y="68" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#c4b5fd" textAnchor="middle">GPU Server {i+1}</text>
          <text x={145 + i * 260} y="80" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">GPUs ↔ NVLink/NVSwitch</text>
          <text x={145 + i * 260} y="92" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">AI NIC | Storage NIC | Mgmt NIC</text>
        </g>
      ))}

      {/* AI Compute Network */}
      <rect x="14" y="130" width="792" height="20" rx="3" fill="#7c3aed" opacity="0.1" />
      <text x="14" y="144" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c3aed">AI COMPUTE NETWORK</text>

      <rect x="180" y="158" width="460" height="22" rx="4" fill="#7c3aed" />
      <text x="410" y="173" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Spine Switches (InfiniBand or High-Speed Ethernet)</text>

      <rect x="60" y="190" width="150" height="20" rx="4" fill="#7c3aed" opacity="0.7" />
      <text x="135" y="204" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Leaf Switch 1</text>
      <rect x="335" y="190" width="150" height="20" rx="4" fill="#7c3aed" opacity="0.7" />
      <text x="410" y="204" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Leaf Switch 2</text>
      <rect x="610" y="190" width="150" height="20" rx="4" fill="#7c3aed" opacity="0.7" />
      <text x="685" y="204" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Leaf Switch 3</text>

      {/* Connect servers to AI leaf */}
      {[145,405,665].map((x,i) => (
        <line key={x} x1={x} y1={105} x2={x} y2={190} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="0" opacity="0.8" />
      ))}
      {/* AI leaf to spine */}
      {[135,410,685].map(x => (
        <line key={x} x1={x} y1={180} x2={x} y2={180} stroke="#7c3aed" strokeWidth="1" />
      ))}
      <line x1="135" y1="180" x2="410" y2="158" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />
      <line x1="410" y1="180" x2="410" y2="158" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="685" y1="180" x2="410" y2="158" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />

      {/* Storage Network */}
      <rect x="14" y="228" width="792" height="20" rx="3" fill="#0891b2" opacity="0.1" />
      <text x="14" y="242" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0891b2">STORAGE NETWORK</text>

      <rect x="280" y="258" width="260" height="20" rx="4" fill="#0891b2" />
      <text x="410" y="272" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Storage Switches → Parallel File System</text>

      {/* Management Network */}
      <rect x="14" y="295" width="792" height="20" rx="3" fill="#475569" opacity="0.1" />
      <text x="14" y="309" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#475569">MANAGEMENT NETWORK (separate low-speed)</text>

      <rect x="280" y="320" width="260" height="20" rx="4" fill="#475569" />
      <text x="410" y="334" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Mgmt Switch → BMC/IPMI, SSH, Monitoring</text>

      <text x="410" y="348" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">BMS/DCIM monitors infrastructure — does NOT carry GPU training traffic</text>
    </svg>
  );
}
