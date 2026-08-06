"use client";
export default function CpuVsGpuDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cvg-title">
      <title id="cvg-title">CPU has few powerful cores for complex tasks. GPU has thousands of simple cores for parallel AI math.</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CPU vs GPU — Why AI Needs GPU</text>

      {/* CPU side */}
      <rect x="20" y="36" width="370" height="260" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">CPU — Few Powerful Cores</text>
      <text x="205" y="74" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">"8 brilliant workers"</text>

      {[0,1,2,3,4,5,6,7].map(i => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 50 + col * 80;
        const y = 90 + row * 90;
        return (
          <g key={i}>
            <rect x={x} y={y} width="68" height="72" rx="8" fill="#2563eb" />
            <text x={x+34} y={y+22} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">CORE {i+1}</text>
            <text x={x+34} y={y+36} fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">Complex Logic</text>
            <text x={x+34} y={y+48} fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">Branch Predict</text>
            <text x={x+34} y={y+60} fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">Large Cache</text>
          </g>
        );
      })}
      <text x="205" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Best for: OS, databases, web servers</text>
      <text x="205" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Clock: 3–5 GHz · Cores: 8–128</text>

      {/* GPU side */}
      <rect x="430" y="36" width="370" height="260" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">GPU — Thousands of Simple Cores</text>
      <text x="615" y="74" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">"16,896 simple workers (H100)"</text>

      {/* Grid of tiny cores */}
      {Array.from({length: 120}).map((_, i) => {
        const col = i % 20;
        const row = Math.floor(i / 20);
        return (
          <rect key={i} x={448 + col * 16} y={84 + row * 32}
            width="13" height="28" rx="2"
            fill={i % 7 === 0 ? "#16a34a" : "#86efac"}
            stroke="#14532d" strokeWidth="0.3" />
        );
      })}
      <text x="615" y="250" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Green = CUDA Cores · Dark green = Tensor Core groups</text>
      <text x="615" y="265" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Best for: AI math, matrix multiply, parallel compute</text>
      <text x="615" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Clock: 1.5–2 GHz · CUDA Cores: 16,896 (H100)</text>
      <text x="615" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Memory Bandwidth: 3.35 TB/s (HBM3)</text>
    </svg>
  );
}
