"use client";
export default function ParallelStorageArchitecture() {
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="psa-title">
      <title id="psa-title">Parallel Storage Architecture: Multiple GPU compute nodes connect through a high-speed storage network to multiple storage nodes. Each GPU node can read from all storage nodes simultaneously — aggregate throughput scales with number of storage nodes. A metadata server handles directory and file metadata separately from data nodes.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">PARALLEL FILE SYSTEM ARCHITECTURE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Each GPU node reads from ALL storage nodes simultaneously — aggregate throughput = sum of all storage node bandwidths</text>

      {/* GPU nodes */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={30 + i * 130} y="50" width="110" height="50" rx="6" fill="#7c3aed" />
          <text x={85 + i * 130} y="70" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU Node {i + 1}</text>
          <text x={85 + i * 130} y="82" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">8× GPUs</text>
          <text x={85 + i * 130} y="93" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Data Loader</text>
        </g>
      ))}
      <text x="590" y="75" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">… more nodes</text>

      {/* Storage network switch */}
      <rect x="180" y="140" width="460" height="32" rx="5" fill="#0f172a" />
      <text x="410" y="159" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">High-Speed Storage Network (100–400 GbE / InfiniBand)</text>

      {/* Lines GPU to switch */}
      {[85, 215, 345, 475].map(x => (
        <line key={x} x1={x} y1={100} x2={x} y2={140} stroke="#7c3aed" strokeWidth="1.5" />
      ))}

      {/* Storage nodes */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <rect x={30 + i * 150} y="210" width="130" height="55" rx="6" fill="#ca8a04" />
          <text x={95 + i * 150} y="228" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Storage Node {i + 1}</text>
          <text x={95 + i * 150} y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">NVMe SSDs</text>
          <text x={95 + i * 150} y="251" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Object Storage Targets (OST)</text>
          <text x={95 + i * 150} y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">~10–20 GB/s each</text>
          <line x1={95 + i * 150} y1={172} x2={95 + i * 150} y2={210} stroke="#ca8a04" strokeWidth="1.5" />
        </g>
      ))}

      {/* Metadata server */}
      <rect x="660" y="210" width="140" height="55" rx="6" fill="#2563eb" />
      <text x="730" y="228" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Metadata Server</text>
      <text x="730" y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">(MDS / MDT)</text>
      <text x="730" y="251" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Directory, namespace</text>
      <text x="730" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">file attributes</text>
      <line x1="730" y1="172" x2="730" y2="210" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* Aggregate throughput callout */}
      <rect x="180" y="278" width="460" height="22" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="410" y="293" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Aggregate Throughput = 5 nodes × 15 GB/s = ~75 GB/s (add more nodes to scale further)</text>
    </svg>
  );
}
