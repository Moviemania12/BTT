"use client";
export default function CdnaEvolutionTimeline() {
  const gens = [
    { name: "GCN", year: "2012–19", node: "28–7nm", key: "GPU becomes programmable", sub: "Graphics + compute, foundation era", color: "#94a3b8", product: "Various Radeon" },
    { name: "CDNA 1", year: "2020", node: "7nm", key: "Graphics removed — AI compute only", sub: "First compute-only design", color: "#3b82f6", product: "MI100" },
    { name: "CDNA 2", year: "2021", node: "6nm", key: "Dual-die — 2× memory", sub: "128 GB HBM2e, FP64 Matrix Cores", color: "#6366f1", product: "MI200 series" },
    { name: "CDNA 3", year: "2023", node: "5nm", key: "3D chiplets — 192 GB memory", sub: "Biggest memory advantage era", color: "#ef4444", product: "MI300X / MI300A" },
    { name: "CDNA 4", year: "2025", node: "3/4nm", key: "FP8 focus — inference era", sub: "Verify specs at amd.com/instinct", color: "#f59e0b", product: "MI350 series" },
  ];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cet-title">
      <title id="cet-title">AMD CDNA Architecture Evolution Timeline from GCN (2012, graphics era) through CDNA 1 MI100 (2020, AI compute only), CDNA 2 MI200 (2021, dual-die 128GB), CDNA 3 MI300X (2023, 3D chiplets 192GB), to CDNA 4 MI350 (2025, FP8 inference). AI accelerator era started at CDNA 1.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD ARCHITECTURE EVOLUTION — GCN (2012) to CDNA 4 (2025)</text>
      <text x="410" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">AI Accelerator era started with CDNA 1 (2020) — when AMD removed graphics and focused 100% on compute.</text>

      {/* Timeline rail */}
      <line x1="30" y1="145" x2="790" y2="145" stroke="#e2e8f0" strokeWidth="2.5" />

      {gens.map((g, i) => {
        const x = 60 + i * 175;
        const up = i % 2 === 0;
        const isAI = i >= 1;
        return (
          <g key={g.name}>
            <circle cx={x} cy="145" r="9" fill={g.color} />
            <line x1={x} y1={up ? 136 : 154} x2={x} y2={up ? 68 : 222} stroke={g.color} strokeWidth="1.5" />
            {/* Card */}
            <rect x={x - 74} y={up ? 34 : 222} width="148" height="34" rx="6"
              fill={isAI ? g.color : "#f8fafc"} stroke={g.color} strokeWidth="1.5" />
            <text x={x} y={up ? 50 : 238} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800"
              fill={isAI ? "#fff" : "#1e293b"} textAnchor="middle">{g.name}</text>
            <text x={x} y={up ? 63 : 251} fontFamily="Arial,sans-serif" fontSize="7"
              fill={isAI ? "#f1f5f9" : "#64748b"} textAnchor="middle">{g.year} · {g.node}</text>
            {/* Key label */}
            <text x={x} y={up ? 90 : 190} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={g.color} textAnchor="middle">{g.key}</text>
            <text x={x} y={up ? 103 : 205} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">{g.sub}</text>
            <text x={x} y={up ? 116 : 218} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#334155" textAnchor="middle">Product: {g.product}</text>
          </g>
        );
      })}

      {/* AI Era bracket */}
      <rect x="190" y="262" width="600" height="16" rx="5" fill="#fef3c7" />
      <text x="490" y="274" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">
        AI COMPUTE ERA — CDNA 1 onwards: graphics removed, pure AI/HPC compute focus
      </text>
    </svg>
  );
}
