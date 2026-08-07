"use client";
export default function AmdVsNvidiaStrengths() {
  const dims = [
    { label: "Memory Capacity\n(per card)", amd: 95, nv: 42, amdNote: "192 GB", nvNote: "80 GB" },
    { label: "Memory Bandwidth\n(per card)", amd: 88, nv: 55, amdNote: "5.3 TB/s", nvNote: "3.35 TB/s" },
    { label: "Software Ecosystem\n(libraries, tools, community)", amd: 38, nv: 95, amdNote: "ROCm (growing)", nvNote: "CUDA (dominant)" },
    { label: "Multi-GPU Scale-Out\n(large cluster training)", amd: 45, nv: 90, amdNote: "InfiniBand only", nvNote: "NVSwitch + NVLink" },
    { label: "Large LLM Inference\n(single card)", amd: 90, nv: 55, amdNote: "Fits 70B+ models", nvNote: "Smaller capacity" },
    { label: "FP64 Scientific\nComputing", amd: 88, nv: 72, amdNote: "Strong (Frontier)", nvNote: "Good" },
  ];
  const barW = 280;
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="avn-title">
      <title id="avn-title">AMD vs NVIDIA strengths comparison: AMD wins on memory capacity (192GB vs 80GB), memory bandwidth (5.3 vs 3.35 TB/s), single-card large LLM inference, and FP64 scientific computing. NVIDIA wins on software ecosystem (CUDA dominance), multi-GPU scale-out (NVSwitch), and training large clusters. Note: peak AI throughput measured differently — do not compare TFLOPS directly.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD vs NVIDIA — Where Each Is Stronger</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Neither is universally better. Choose based on your specific workload. Peak AI throughput numbers are measured differently — do not compare directly.</text>

      {/* Legend */}
      <rect x="560" y="40" width="14" height="10" rx="2" fill="#ef4444" />
      <text x="578" y="50" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155">AMD MI300X</text>
      <rect x="650" y="40" width="14" height="10" rx="2" fill="#16a34a" />
      <text x="668" y="50" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155">NVIDIA H100</text>

      {dims.map((d, i) => {
        const y = 62 + i * 38;
        return (
          <g key={d.label}>
            {/* Label */}
            {d.label.split("\n").map((line, li) => (
              <text key={li} x="8" y={y + 10 + li * 11} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#334155">{line}</text>
            ))}
            {/* AMD bar */}
            <rect x="220" y={y} width={(d.amd / 100) * barW} height="12" rx="3" fill="#ef4444" />
            <text x={220 + (d.amd / 100) * barW + 4} y={y + 10} fontFamily="Arial,sans-serif" fontSize="7" fill="#ef4444">{d.amdNote}</text>
            {/* NVIDIA bar */}
            <rect x="220" y={y + 15} width={(d.nv / 100) * barW} height="12" rx="3" fill="#16a34a" />
            <text x={220 + (d.nv / 100) * barW + 4} y={y + 25} fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a">{d.nvNote}</text>
          </g>
        );
      })}

      {/* Bottom guidance */}
      <rect x="14" y="294" width="370" height="14" rx="4" fill="#fef2f2" />
      <text x="199" y="305" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7f1d1d" textAnchor="middle">Choose AMD: Large model inference, FP64 HPC, open-source, cost</text>
      <rect x="436" y="294" width="370" height="14" rx="4" fill="#f0fdf4" />
      <text x="621" y="305" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Choose NVIDIA: Distributed training, custom CUDA, max ecosystem</text>
    </svg>
  );
}
