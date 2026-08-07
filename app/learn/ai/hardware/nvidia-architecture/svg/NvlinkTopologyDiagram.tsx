"use client";
export default function NvlinkTopologyDiagram() {
  const gpuPositions = [
    { x: 60, y: 90, label: "GPU 0" },
    { x: 220, y: 90, label: "GPU 1" },
    { x: 380, y: 90, label: "GPU 2" },
    { x: 540, y: 90, label: "GPU 3" },
    { x: 60, y: 220, label: "GPU 4" },
    { x: 220, y: 220, label: "GPU 5" },
    { x: 380, y: 220, label: "GPU 6" },
    { x: 540, y: 220, label: "GPU 7" },
  ];
  const switches = [
    { x: 160, y: 155, label: "SW 1" },
    { x: 310, y: 155, label: "SW 2" },
    { x: 440, y: 155, label: "SW 3" },
    { x: 590, y: 155, label: "SW 4" },
  ];
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nvl-title">
      <title id="nvl-title">NVLink Topology in DGX H100: 8 GPUs connected via 4 NVSwitch chips. Every GPU connects to every NVSwitch. Any GPU can communicate with any other GPU at full 900 GB/s NVLink bandwidth. Total aggregate: 7.2 TB/s GPU-to-GPU. Compare to PCIe (single thin line from GPU to CPU) at only 128 GB/s — NVLink is 7x faster.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NVLINK + NVSWITCH TOPOLOGY — DGX H100 (8 GPUs, 4 NVSwitches)</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Any GPU → Any GPU at full 900 GB/s bandwidth. Total: 7.2 TB/s aggregate. Compare: PCIe CPU-GPU = 128 GB/s only.</text>

      {/* NVSwitch chips */}
      {switches.map((sw) => (
        <g key={sw.label}>
          <rect x={sw.x - 28} y={sw.y - 18} width="56" height="36" rx="6" fill="#16a34a" />
          <text x={sw.x} y={sw.y - 4} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">NVSwitch</text>
          <text x={sw.x} y={sw.y + 10} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bbf7d0" textAnchor="middle">{sw.label}</text>
        </g>
      ))}

      {/* GPU chips */}
      {gpuPositions.map((gpu, i) => (
        <g key={gpu.label}>
          <rect x={gpu.x - 35} y={gpu.y - 22} width="70" height="44" rx="6" fill="#7c3aed" />
          <text x={gpu.x} y={gpu.y - 6} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">{gpu.label}</text>
          <text x={gpu.x} y={gpu.y + 7} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#ddd6fe" textAnchor="middle">H100 · 80GB</text>
          <text x={gpu.x} y={gpu.y + 18} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#c4b5fd" textAnchor="middle">900 GB/s NVLink</text>
        </g>
      ))}

      {/* Connections: each GPU to each switch */}
      {gpuPositions.map((gpu, gi) =>
        switches.map((sw, si) => (
          <line key={`${gi}-${si}`}
            x1={gpu.x} y1={gi < 4 ? gpu.y + 22 : gpu.y - 22}
            x2={sw.x} y2={gi < 4 ? sw.y - 18 : sw.y + 18}
            stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
        ))
      )}

      {/* PCIe to CPU (thin) */}
      <rect x="660" y="80" width="100" height="50" rx="6" fill="#1e293b" />
      <text x="710" y="100" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">CPU</text>
      <text x="710" y="114" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">PCIe 5.0 → 128 GB/s</text>
      <line x1="575" y1="104" x2="660" y2="105" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="618" y="98" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">PCIe (slow)</text>

      {/* Legend */}
      <rect x="660" y="160" width="150" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="735" y="178" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">LEGEND</text>
      <line x1="670" y1="192" x2="700" y2="192" stroke="#a78bfa" strokeWidth="2" />
      <text x="740" y="196" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">NVLink (900 GB/s)</text>
      <line x1="670" y1="210" x2="700" y2="210" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="740" y="214" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">PCIe (128 GB/s)</text>
      <rect x="670" y="222" width="20" height="12" rx="3" fill="#7c3aed" />
      <text x="740" y="232" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">H100 GPU</text>
      <rect x="670" y="238" width="20" height="12" rx="3" fill="#16a34a" />
      <text x="740" y="248" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">NVSwitch</text>
    </svg>
  );
}
