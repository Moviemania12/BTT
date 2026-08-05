"use client";
export default function MultiGpuTopologyDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mgt-title">
      <title id="mgt-title">Multi-GPU topology comparison: PCIe vs NVLink vs NVSwitch vs InfiniBand vs Ethernet</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-GPU INTERCONNECT TOPOLOGY COMPARISON</text>

      {[
        { label: "PCIe Gen5", bw: "64 GB/s", latency: "~1µs", scope: "Host to GPU", color: "#475569", bg: "#f1f5f9", x: 20 },
        { label: "NVLink 4.0", bw: "900 GB/s", latency: "<1µs", scope: "GPU-to-GPU (intra-node)", color: "#2563eb", bg: "#dbeafe", x: 180 },
        { label: "NVSwitch", bw: "900 GB/s all-to-all", latency: "<1µs", scope: "All-to-all (8 GPUs)", color: "#7c3aed", bg: "#ede9fe", x: 340 },
        { label: "InfiniBand NDR", bw: "400 Gbps/port", latency: "<1µs", scope: "Inter-node cluster", color: "#0369a1", bg: "#e0f2fe", x: 510 },
        { label: "Ethernet (RoCE)", bw: "400 GbE", latency: "1-5µs", scope: "Inter-node cluster", color: "#16a34a", bg: "#dcfce7", x: 670 },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y="38" width="130" height="160" rx="8" fill={t.bg} stroke={t.color} strokeWidth="1.5" />
          <text x={t.x + 65} y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={t.color} textAnchor="middle">{t.label}</text>
          <line x1={t.x + 10} y1="68" x2={t.x + 120} y2="68" stroke={t.color} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={t.x + 65} y="84" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Bandwidth</text>
          <text x={t.x + 65} y="98" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={t.color} textAnchor="middle">{t.bw}</text>
          <text x={t.x + 65} y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Latency</text>
          <text x={t.x + 65} y="129" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={t.color} textAnchor="middle">{t.latency}</text>
          <text x={t.x + 65} y="146" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Scope</text>
          <text x={t.x + 65} y="160" fontFamily="Arial,sans-serif" fontSize="8" fill={t.color} textAnchor="middle" style={{ fontSize: "7.5px" }}>{t.scope}</text>
        </g>
      ))}

      {/* Use case row */}
      <rect x="20" y="214" width="130" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="85" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">CPU-GPU data</text>
      <text x="85" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">transfer. Not</text>
      <text x="85" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">sufficient alone</text>

      <rect x="180" y="214" width="130" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="245" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Tensor parallel</text>
      <text x="245" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">within node.</text>
      <text x="245" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Optimal intra-node</text>

      <rect x="340" y="214" width="130" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="405" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">All 8 GPUs full</text>
      <text x="405" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">bandwidth to each</text>
      <text x="405" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">other. DGX/HGX</text>

      <rect x="510" y="214" width="130" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="575" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Large clusters.</text>
      <text x="575" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">RDMA. Preferred</text>
      <text x="575" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">for 100+ GPUs</text>

      <rect x="670" y="214" width="130" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="735" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Cost-effective.</text>
      <text x="735" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">RoCE needed.</text>
      <text x="735" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#ca8a04" textAnchor="middle">Needs tuning</text>

      <text x="410" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">NVLink within node + InfiniBand between nodes = standard large-scale training topology</text>
    </svg>
  );
}
