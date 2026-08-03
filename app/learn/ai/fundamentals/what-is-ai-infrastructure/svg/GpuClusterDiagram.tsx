"use client";
export default function GpuClusterDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gc-title">
      <title id="gc-title">GPU Cluster Architecture: DGX Server internals, NVSwitch, and inter-node InfiniBand fabric</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER ARCHITECTURE</text>

      {/* Server 1 */}
      <rect x="20" y="36" width="370" height="220" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">HGX H100 SERVER (Node 1)</text>
      <text x="205" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#3730a3" textAnchor="middle">2× Intel Xeon / AMD EPYC · 2TB DDR5 · 4× NVMe SSD</text>

      {/* GPUs in Server 1 - 2x4 grid */}
      {[0,1,2,3].map(i => (
        <g key={`g1-${i}`}>
          <rect x={35 + i*88} y="82" width="78" height="36" rx="5" fill="#2563eb" />
          <text x={74 + i*88} y="96" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">H100</text>
          <text x={74 + i*88} y="108" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">80GB HBM3</text>
        </g>
      ))}
      {[0,1,2,3].map(i => (
        <g key={`g2-${i}`}>
          <rect x={35 + i*88} y="128" width="78" height="36" rx="5" fill="#2563eb" />
          <text x={74 + i*88} y="142" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">H100</text>
          <text x={74 + i*88} y="154" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">80GB HBM3</text>
        </g>
      ))}

      {/* NVSwitch */}
      <rect x="50" y="178" width="310" height="28" rx="5" fill="#0f172a" />
      <text x="205" y="192" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">NVSwitch × 3 — 900 GB/s All-to-All GPU Bandwidth</text>
      <text x="205" y="204" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Any GPU to Any GPU at full NVLink 4.0 speed</text>

      {/* ConnectX NICs */}
      <rect x="50" y="215" width="310" height="28" rx="5" fill="#1e293b" />
      <text x="205" y="228" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#94a3b8" textAnchor="middle">8× ConnectX-7 NICs — 400Gbps InfiniBand NDR</text>
      <text x="205" y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">One NIC per GPU — Direct GPU-to-network path</text>

      {/* Server 2 */}
      <rect x="430" y="36" width="370" height="220" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">HGX H100 SERVER (Node 2)</text>
      <text x="615" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">2× Intel Xeon / AMD EPYC · 2TB DDR5 · 4× NVMe SSD</text>

      {[0,1,2,3].map(i => (
        <g key={`g3-${i}`}>
          <rect x={445 + i*88} y="82" width="78" height="36" rx="5" fill="#16a34a" />
          <text x={484 + i*88} y="96" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">H100</text>
          <text x={484 + i*88} y="108" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">80GB HBM3</text>
        </g>
      ))}
      {[0,1,2,3].map(i => (
        <g key={`g4-${i}`}>
          <rect x={445 + i*88} y="128" width="78" height="36" rx="5" fill="#16a34a" />
          <text x={484 + i*88} y="142" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">H100</text>
          <text x={484 + i*88} y="154" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">80GB HBM3</text>
        </g>
      ))}

      <rect x="460" y="178" width="310" height="28" rx="5" fill="#0f172a" />
      <text x="615" y="192" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00ffcc" textAnchor="middle">NVSwitch × 3 — 900 GB/s All-to-All GPU Bandwidth</text>
      <text x="615" y="204" fontFamily="Arial,sans-serif" fontSize="8" fill="#6ee7b7" textAnchor="middle">Any GPU to Any GPU at full NVLink 4.0 speed</text>

      <rect x="460" y="215" width="310" height="28" rx="5" fill="#1e293b" />
      <text x="615" y="228" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#94a3b8" textAnchor="middle">8× ConnectX-7 NICs — 400Gbps InfiniBand NDR</text>
      <text x="615" y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">One NIC per GPU — Direct GPU-to-network path</text>

      {/* InfiniBand Leaf Switch */}
      <rect x="260" y="275" width="300" height="40" rx="8" fill="#1e293b" stroke="#00d4ff" strokeWidth="1.5" />
      <text x="410" y="291" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">InfiniBand NDR Leaf Switch</text>
      <text x="410" y="307" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">400Gbps per port · RDMA · Sub-microsecond latency</text>

      {/* Connections from servers to leaf */}
      <line x1="205" y1="256" x2="300" y2="275" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="615" y1="256" x2="520" y2="275" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* Parallel Storage */}
      <rect x="120" y="330" width="570" height="36" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="410" y="347" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">PARALLEL FILE SYSTEM — Weka / Lustre / VAST Data</text>
      <text x="410" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Multi-TB/s aggregate throughput · POSIX-compatible · Training data + Checkpoint storage</text>

      <line x1="410" y1="315" x2="410" y2="330" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* Bandwidth labels */}
      <text x="205" y="272" fontFamily="Arial,sans-serif" fontSize="8" fill="#2563eb" textAnchor="middle">↑ INTRA-NODE: 900 GB/s NVLink</text>
      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">↔ INTER-NODE: 400 Gbps IB</text>
    </svg>
  );
}
