"use client";
export default function InfinityFabricDiagram() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="if-title">
      <title id="if-title">AMD Interconnect Architecture: Inside the MI300X chip, Infinity Fabric is the internal high-speed chip connection linking compute modules to memory controllers. For external GPU-to-GPU communication between cards, xGMI (external Global Memory Interface) is used. For large multi-server clusters, standard InfiniBand network is used — AMD does not have a dedicated GPU switch chip like NVIDIA NVSwitch.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD INTERCONNECT ARCHITECTURE — Internal and External Chip Connections</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Infinity Fabric (internal, within chip) and xGMI (external, between chips) are two different things. Both are AMD interconnect technology.</text>

      {/* Inside chip box */}
      <rect x="200" y="44" width="420" height="150" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="410" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">INSIDE ONE MI300X CHIP</text>

      {/* XCDs */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={210 + i * 100} y={72} width="90" height="36" rx="5" fill="#7c3aed" />
          <text x={255 + i * 100} y={88} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU Compute</text>
          <text x={255 + i * 100} y={101} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Module (XCD {i + 1})</text>
        </g>
      ))}

      {/* IF lines inside chip */}
      {[0, 1, 2].map(i => (
        <line key={i} x1={300 + i * 100} y1={108} x2={310 + i * 100} y2={108} stroke="#a78bfa" strokeWidth="2" />
      ))}

      {/* IF label */}
      <rect x="220" y="116" width="380" height="26" rx="5" fill="#4c1d95" />
      <text x="410" y="128" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">High-Speed Internal Chip Connection (Infinity Fabric)</text>
      <text x="410" y="139" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">Links compute modules to memory controllers · Internal only · Part of AMD's chip design</text>

      {/* HBM */}
      <rect x="220" y="150" width="380" height="30" rx="5" fill="#dc2626" />
      <text x="410" y="167" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Ultra-Fast Memory Controllers + HBM3 (192 GB)</text>
      <text x="410" y="179" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Connected to compute modules via Infinity Fabric</text>

      {/* External: two GPUs */}
      <rect x="20" y="214" width="230" height="60" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="135" y="238" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">MI300X Card 1</text>
      <text x="135" y="255" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#818cf8" textAnchor="middle">PCIe 5.0 to server CPU</text>

      <rect x="570" y="214" width="230" height="60" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="685" y="238" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">MI300X Card 2</text>
      <text x="685" y="255" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#818cf8" textAnchor="middle">PCIe 5.0 to server CPU</text>

      {/* xGMI link */}
      <line x1="250" y1="244" x2="570" y2="244" stroke="#f97316" strokeWidth="2.5" strokeDasharray="6,3" />
      <rect x="310" y="233" width="200" height="24" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
      <text x="410" y="246" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">xGMI — External GPU Link</text>
      <text x="410" y="258" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">(external Global Memory Interface)</text>

      {/* Note */}
      <rect x="20" y="278" width="780" height="12" rx="4" fill="#f1f5f9" />
      <text x="410" y="288" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">
        AMD does not have a dedicated GPU switch chip like NVIDIA NVSwitch. Large clusters use InfiniBand network for multi-server GPU communication.
      </text>
    </svg>
  );
}
