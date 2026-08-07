"use client";
export default function ArchEvolutionTimeline() {
  const gens = [
    { name: "Tesla", year: "2006", node: "90nm", key: "CUDA born — GPU becomes programmable", color: "#94a3b8", perf: "—" },
    { name: "Fermi", year: "2010", node: "40nm", key: "L2 cache + ECC + FP64", color: "#64748b", perf: "—" },
    { name: "Kepler", year: "2012", node: "28nm", key: "Dynamic Parallelism + Hyper-Q", color: "#6366f1", perf: "—" },
    { name: "Maxwell", year: "2014", node: "28nm", key: "2× efficiency, SM redesign", color: "#8b5cf6", perf: "—" },
    { name: "Pascal", year: "2016", node: "16nm", key: "NVLink 1.0 + HBM2 + FP16", color: "#0284c7", perf: "21T FP16" },
    { name: "Volta", year: "2017", node: "12nm", key: "Tensor Cores born — AI revolution", color: "#7c3aed", perf: "125T BF16" },
    { name: "Turing", year: "2018", node: "12nm", key: "INT8 TC + RT Cores + T4 inference", color: "#7c3aed", perf: "260T INT8" },
    { name: "Ampere", year: "2020", node: "7nm", key: "TF32 + MIG + sparsity + A100 80GB", color: "#059669", perf: "312T TF32" },
    { name: "Hopper", year: "2022", node: "4nm", key: "Transformer Engine + FP8 + H100", color: "#16a34a", perf: "989T FP8" },
    { name: "Blackwell", year: "2024", node: "4nm", key: "Dual-die + FP4 + NVLink 5.0", color: "#ca8a04", perf: "~4500T FP4" },
  ];
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aet-title">
      <title id="aet-title">NVIDIA GPU Architecture Evolution Timeline from Tesla 2006 (CUDA born, programmable GPU) through Fermi, Kepler, Maxwell, Pascal (NVLink+HBM2), Volta (Tensor Cores for AI), Turing, Ampere (MIG+TF32), Hopper (Transformer Engine+FP8), to Blackwell 2024 (dual-die+FP4). Performance grew from nearly nothing to 4500 TOPS FP4.</title>
      <rect width="820" height="340" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NVIDIA ARCHITECTURE EVOLUTION — Tesla (2006) to Blackwell (2024)</text>
      <text x="410" y="34" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Each generation solved a specific bottleneck. The AI revolution started with Volta (2017) — Tensor Cores changed everything.</text>

      {/* Timeline rail */}
      <line x1="40" y1="160" x2="780" y2="160" stroke="#e2e8f0" strokeWidth="2" />

      {gens.map((g, i) => {
        const x = 50 + i * 78;
        const isAI = i >= 5;
        return (
          <g key={g.name}>
            {/* Dot on rail */}
            <circle cx={x} cy="160" r="7" fill={g.color} />
            {/* Vertical line */}
            <line x1={x} y1={i % 2 === 0 ? 153 : 167} x2={x} y2={i % 2 === 0 ? 80 : 240} stroke={g.color} strokeWidth="1.5" />
            {/* Card */}
            <rect x={x - 34} y={i % 2 === 0 ? 46 : 240} width="68" height="32" rx="5"
              fill={isAI ? g.color : "#f8fafc"} stroke={g.color} strokeWidth="1.5" />
            <text x={x} y={i % 2 === 0 ? 60 : 254} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800"
              fill={isAI ? "#fff" : "#1e293b"} textAnchor="middle">{g.name}</text>
            <text x={x} y={i % 2 === 0 ? 72 : 266} fontFamily="Arial,sans-serif" fontSize="7"
              fill={isAI ? "#e2e8f0" : "#64748b"} textAnchor="middle">{g.year} · {g.node}</text>
            {/* Key innovation below/above */}
            {g.key.split(" + ").map((part, pi) => (
              <text key={pi} x={x} y={i % 2 === 0 ? 286 + pi * 11 : 165 + pi * 0}
                fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">
                <tspan x={x} dy={i % 2 !== 0 ? -22 + pi * 11 : pi * 11}>{part}</tspan>
              </text>
            ))}
            {/* Performance badge */}
            {g.perf !== "—" && (
              <text x={x} y={i % 2 === 0 ? 322 : 310} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700"
                fill={g.color} textAnchor="middle">{g.perf}</text>
            )}
          </g>
        );
      })}

      {/* AI era label */}
      <rect x="426" y="170" width="350" height="14" rx="4" fill="#fef3c7" />
      <text x="601" y="181" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">
        ⚡ AI ACCELERATOR ERA — Tensor Cores dedicated to matrix multiply
      </text>
    </svg>
  );
}
