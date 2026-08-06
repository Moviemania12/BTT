"use client";
export default function DpuDataCenter() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dpu-title">
      <title id="dpu-title">DPU (Data Processing Unit) in AI Data Center: DPU sits between the network and the server, handling network traffic, security, and storage I/O so that CPU is free for GPU orchestration and GPU can focus entirely on AI compute. Without DPU: CPU wastes 30-40% time on I/O. With DPU: GPU utilization improves.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DPU IN AI DATA CENTER — The Traffic Controller for AI Data</text>

      {/* Without DPU */}
      <rect x="10" y="36" width="385" height="250" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="202" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7f1d1d" textAnchor="middle">Without DPU ❌</text>

      <rect x="22" y="65" width="120" height="90" rx="8" fill="#e2e8f0" />
      <text x="82" y="88" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">CPU</text>
      <text x="82" y="102" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">30-40% busy with:</text>
      <text x="82" y="114" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dc2626" textAnchor="middle">• Network I/O</text>
      <text x="82" y="125" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dc2626" textAnchor="middle">• Storage I/O</text>
      <text x="82" y="136" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dc2626" textAnchor="middle">• TLS security</text>
      <text x="82" y="147" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dc2626" textAnchor="middle">• Load balance</text>

      <rect x="155" y="65" width="225" height="90" rx="8" fill="#fecaca" />
      <text x="268" y="88" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">GPU</text>
      <text x="268" y="102" fontFamily="Arial,sans-serif" fontSize="7" fill="#7f1d1d" textAnchor="middle">Waiting for data... 🕐</text>
      <text x="268" y="116" fontFamily="Arial,sans-serif" fontSize="7" fill="#7f1d1d" textAnchor="middle">GPU utilization: 60-70%</text>
      <text x="268" y="130" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9a3412" textAnchor="middle">CPU can't feed GPU fast enough</text>
      <text x="268" y="143" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9a3412" textAnchor="middle">Training bottlenecked by I/O</text>

      <rect x="22" y="168" width="358" height="30" rx="6" fill="#dc2626" opacity="0.15" stroke="#dc2626" strokeWidth="1" />
      <text x="201" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7f1d1d" textAnchor="middle">Network switch → CPU (busy) → GPU (waiting) = wasted money</text>

      {["Problem: GPU $30K/card sitting idle waiting for data",
        "Training jobs 10–20% slower than they could be",
        "CPU overloaded — becomes the bottleneck"
      ].map((t, i) => (
        <text key={i} x="22" y={212 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7f1d1d">✗ {t}</text>
      ))}

      {/* With DPU */}
      <rect x="420" y="36" width="385" height="250" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="613" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">With DPU ✓</text>

      <rect x="432" y="65" width="100" height="90" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="482" y="88" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">CPU</text>
      <text x="482" y="102" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Free to manage</text>
      <text x="482" y="114" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#166534" textAnchor="middle">GPU orchestration</text>

      <rect x="542" y="65" width="100" height="90" rx="8" fill="#0891b2" />
      <text x="592" y="86" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">DPU</text>
      <text x="592" y="100" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#cffafe" textAnchor="middle">Network I/O</text>
      <text x="592" y="112" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#cffafe" textAnchor="middle">Storage I/O</text>
      <text x="592" y="124" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#cffafe" textAnchor="middle">TLS security</text>
      <text x="592" y="136" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#cffafe" textAnchor="middle">Load balance</text>
      <text x="592" y="148" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#cffafe" textAnchor="middle">Offloaded here!</text>

      <rect x="652" y="65" width="138" height="90" rx="8" fill="#22c55e" />
      <text x="721" y="88" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
      <text x="721" y="103" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">AI compute 100%</text>
      <text x="721" y="117" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fef9c3" textAnchor="middle">Utilization: 85–95%</text>
      <text x="721" y="131" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dcfce7" textAnchor="middle">Fed data by DPU</text>
      <text x="721" y="143" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dcfce7" textAnchor="middle">Never waits for I/O</text>

      <rect x="432" y="168" width="358" height="30" rx="6" fill="#16a34a" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="611" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Network → DPU (handles I/O) → GPU (only AI math) = efficient</text>

      {["Training 10–20% faster by removing I/O bottleneck",
        "GPU ROI improved — you bought it for AI, not I/O",
        "DPU examples: NVIDIA BlueField-3, Marvell OCTEON"
      ].map((t, i) => (
        <text key={i} x="432" y={212 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d">✓ {t}</text>
      ))}
    </svg>
  );
}
