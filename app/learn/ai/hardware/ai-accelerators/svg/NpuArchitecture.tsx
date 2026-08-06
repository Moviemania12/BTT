"use client";
export default function NpuArchitecture() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="npu-title">
      <title id="npu-title">NPU (Neural Processing Unit) architecture: MAC Array does the AI math, SRAM is on-chip fast memory, DMA Engine moves data, Scheduler manages tasks, and Power Manager keeps battery usage low. Compared to cloud GPU which is 100-300W, NPU uses only 1-5W.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NPU — Neural Processing Unit — AI in Your Pocket</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Same job as GPU but designed for battery-powered devices — uses 1–5 Watts instead of 300–700 Watts</text>

      {/* SoC boundary */}
      <rect x="20" y="50" width="500" height="230" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="270" y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7f1d1d" textAnchor="middle">SoC (System on Chip) — everything on one tiny chip (phone/tablet/camera)</text>

      {/* NPU block */}
      <rect x="34" y="80" width="320" height="150" rx="8" fill="#dc2626" />
      <text x="194" y="102" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">NPU — Neural Processing Unit</text>
      <text x="194" y="116" fontFamily="Arial,sans-serif" fontSize="8" fill="#fecaca" textAnchor="middle">(the AI engine inside the chip)</text>

      {[
        { label: "MAC Array", sub: "Multiply-Add hardware — does AI math", x: 44, y: 124 },
        { label: "On-chip SRAM", sub: "Fast memory — stores model weights", x: 184, y: 124 },
        { label: "DMA Engine", sub: "Data mover — loads/stores efficiently", x: 44, y: 172 },
        { label: "Scheduler", sub: "Task manager — plans operations", x: 184, y: 172 },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width={132} height={40} rx="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x={b.x + 66} y={b.y + 15} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{b.label}</text>
          <text x={b.x + 66} y={b.y + 28} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fecaca" textAnchor="middle">{b.sub}</text>
        </g>
      ))}

      {/* Power manager */}
      <rect x="34" y="222" width="320" height="24" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="194" y="237" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fef2f2" textAnchor="middle">Power Manager — keeps battery drain minimal · 1–5W total</text>

      {/* CPU and GPU on same SoC */}
      <rect x="370" y="80" width="136" height="60" rx="6" fill="#2563eb" />
      <text x="438" y="106" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">CPU Cores</text>
      <text x="438" y="120" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">App logic, OS</text>
      <rect x="370" y="152" width="136" height="60" rx="6" fill="#16a34a" />
      <text x="438" y="178" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Mobile GPU</text>
      <text x="438" y="192" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Display, gaming</text>

      {/* Right: comparison */}
      <rect x="540" y="50" width="264" height="230" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="672" y="70" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">NPU vs Cloud GPU</text>
      {[
        { label: "Power", npu: "1–5 Watts", gpu: "300–700 Watts" },
        { label: "Size", npu: "Few mm²", gpu: "Full PCIe card" },
        { label: "Memory", npu: "Shared (4–16GB)", gpu: "Dedicated (40–80GB)" },
        { label: "Speed (AI)", npu: "10–40 TOPS", gpu: "1000–3000 TOPS" },
        { label: "Use case", npu: "On-device inference", gpu: "Cloud training/infer" },
        { label: "Privacy", npu: "Data stays on device", gpu: "Data goes to cloud" },
        { label: "Cost", npu: "Part of phone chip", gpu: "$10K–$35K" },
        { label: "Examples", npu: "Apple A17, Snapdragon", gpu: "H100, A100, RTX 4090" },
      ].map((r, i) => (
        <g key={r.label}>
          <rect x="550" y={80 + i * 24} width="244" height="20" rx="3" fill={i % 2 === 0 ? "#f1f5f9" : "#ffffff"} />
          <text x="558" y={93 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#334155">{r.label}</text>
          <text x="660" y={93 + i * 24} fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626">{r.npu}</text>
          <text x="750" y={93 + i * 24} fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle">{r.gpu}</text>
        </g>
      ))}
      <text x="660" y="281" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">NPU</text>
      <text x="750" y="281" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle">Cloud GPU</text>
    </svg>
  );
}
