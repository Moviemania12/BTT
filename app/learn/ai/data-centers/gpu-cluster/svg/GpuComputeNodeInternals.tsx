"use client";
export default function GpuComputeNodeInternals() {
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gcni-title">
      <title id="gcni-title">GPU Compute Node internals: 8 GPU chips with HBM, 2 CPUs, System RAM, PCIe bus, optional NVLink intra-server (platform specific), management and high-speed compute NICs, NVMe SSDs, dual PSUs, BMC chip.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU COMPUTE NODE — What Is Inside One Server</text>

      {/* Chassis */}
      <rect x="20" y="28" width="780" height="272" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* 8 GPUs — 2 rows of 4 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 28 + col * 186, y = 36 + row * 80;
        return (
          <g key={i}>
            <rect x={x} y={y} width={178} height={72} rx="5" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={x + 89} y={y + 20} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">AI GPU {i + 1}</text>
            <text x={x + 89} y={y + 33} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">(Graphics Processing Unit)</text>
            <rect x={x + 10} y={y + 40} width={158} height="16" rx="3" fill="#4c1d95" />
            <text x={x + 89} y={y + 52} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">80 GB HBM — Ultra-Fast Memory</text>
            <text x={x + 89} y={y + 64} fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">3.35 TB/s bandwidth</text>
          </g>
        );
      })}

      {/* Bottom row: CPU, RAM, PCIe, NICs, SSD, PSU, BMC */}
      <rect x="28" y="200" width="130" height="90" rx="5" fill="#0284c7" />
      <text x="93" y="222" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">2 CPUs</text>
      <text x="93" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">Manage server,</text>
      <text x="93" y="246" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">load training data</text>
      <text x="93" y="260" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">Intel Xeon / AMD EPYC</text>
      <text x="93" y="282" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">PCIe 5.0 bus →</text>

      <rect x="166" y="200" width="130" height="90" rx="5" fill="#0369a1" />
      <text x="231" y="222" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">System RAM</text>
      <text x="231" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">256 GB–2 TB</text>
      <text x="231" y="248" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">CPU working memory</text>
      <text x="231" y="261" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">Data staging before GPU</text>
      <text x="231" y="275" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">DDR5 ~500 GB/s</text>

      <rect x="304" y="200" width="170" height="90" rx="5" fill="#dc2626" />
      <text x="389" y="218" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">High-Speed Network Cards</text>
      <text x="389" y="230" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(NICs — Network Interface Cards)</text>
      <text x="389" y="244" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">2 ports → Management (1 GbE)</text>
      <text x="389" y="256" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">2–8 ports → AI Compute Net</text>
      <text x="389" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(InfiniBand or 400 GbE)</text>
      <text x="389" y="282" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">GPUDirect RDMA supported</text>

      <rect x="482" y="200" width="116" height="90" rx="5" fill="#16a34a" />
      <text x="540" y="222" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">NVMe SSDs</text>
      <text x="540" y="237" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Fast local storage</text>
      <text x="540" y="250" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">OS, framework,</text>
      <text x="540" y="263" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">local checkpoints</text>
      <text x="540" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">NOT primary training store</text>

      <rect x="606" y="200" width="104" height="90" rx="5" fill="#ca8a04" />
      <text x="658" y="222" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Dual PSUs</text>
      <text x="658" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">Redundant power</text>
      <text x="658" y="248" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">One fails → other</text>
      <text x="658" y="261" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">takes over, no</text>
      <text x="658" y="274" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">interruption</text>

      <rect x="718" y="200" width="74" height="90" rx="5" fill="#475569" />
      <text x="755" y="222" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#e2e8f0" textAnchor="middle">BMC</text>
      <text x="755" y="237" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">Remote mgmt</text>
      <text x="755" y="249" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">chip. Access</text>
      <text x="755" y="261" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">even if OS</text>
      <text x="755" y="273" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">crashed.</text>
      <text x="755" y="285" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">Out-of-band</text>
    </svg>
  );
}
