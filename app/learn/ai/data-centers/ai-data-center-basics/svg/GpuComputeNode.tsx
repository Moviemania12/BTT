"use client";
export default function GpuComputeNode() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gcn-title">
      <title id="gcn-title">AI Compute Node (GPU Server) internals: 8 AI GPUs (Graphics Processing Units doing AI math), 4 internal GPU-to-GPU switches (NVSwitch), 2 CPUs (manage the system), 640 GB ultra-fast GPU memory (HBM3), 8 high-speed network ports (InfiniBand 400 Gb/s each to other servers), and liquid cooling pipes. Total: 10 kW power, $300,000+ cost.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI COMPUTE NODE (GPU Server) — What Is Inside One Server</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">One AI Compute Node = One high-performance server. An AI cluster has many of these connected together.</text>

      {/* Server chassis */}
      <rect x="80" y="44" width="660" height="198" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* 8 GPUs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 90 + col * 140, y = 54 + row * 70;
        return (
          <g key={i}>
            <rect x={x} y={y} width={132} height={62} rx="5" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={x + 66} y={y + 20} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">AI GPU {i + 1}</text>
            <text x={x + 66} y={y + 33} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">(Graphics Processing Unit)</text>
            <text x={x + 66} y={y + 46} fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">80 GB ultra-fast memory</text>
            <text x={x + 66} y={y + 57} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#a78bfa" textAnchor="middle">700W · AI math engine</text>
          </g>
        );
      })}

      {/* Bottom bar: CPU, PSU, Network */}
      <rect x="90" y="196" width="190" height="38" rx="5" fill="#0284c7" />
      <text x="185" y="212" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">2 CPUs (System Managers)</text>
      <text x="185" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">Intel Xeon — manage the server</text>

      <rect x="292" y="196" width="236" height="38" rx="5" fill="#dc2626" />
      <text x="410" y="212" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">8 Network Ports (InfiniBand)</text>
      <text x="410" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">400 Gb/s each — connects to other servers</text>

      <rect x="540" y="196" width="200" height="38" rx="5" fill="#16a34a" />
      <text x="640" y="212" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Liquid Cooling Pipes</text>
      <text x="640" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Water removes GPU heat</text>

      {/* Stats */}
      <rect x="80" y="248" width="660" height="26" rx="5" fill="#fef3c7" />
      <text x="410" y="265" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#78350f" textAnchor="middle">
        Total: 8 AI GPUs · 640 GB Ultra-Fast Memory · 8 Network Ports · ~10 kW Power Draw · $300,000+ Cost
      </text>
    </svg>
  );
}
