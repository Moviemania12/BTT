"use client";
export default function TpuArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tpu-arch-title">
      <title id="tpu-arch-title">TPU Architecture Overview: A TPU chip contains Matrix Multiply Units (MXUs) using systolic array architecture for efficient matrix operations. High Bandwidth Memory (HBM) provides fast on-chip memory access. XLA and supported framework tooling compile workloads for TPU execution; framework support depends on TPU generation and current Google Cloud documentation. Inter-Chip Interconnect (ICI) connects multiple TPU chips within a pod. The host CPU manages data loading and orchestration. This is a generalized educational diagram — exact Google TPU internal architecture is not publicly fully disclosed.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TPU ARCHITECTURE — CONCEPTUAL OVERVIEW</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Generalized educational diagram — exact Google TPU internal architecture not publicly fully disclosed</text>

      {/* Host CPU */}
      <rect x="14" y="50" width="130" height="80" rx="6" fill="#1e293b" />
      <text x="79" y="78" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Host CPU</text>
      <text x="79" y="93" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Data loading</text>
      <text x="79" y="105" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Orchestration</text>
      <text x="79" y="117" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">PCIe / custom link</text>
      <line x1="144" y1="90" x2="175" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#tpu-ar)" />

      {/* TPU Chip */}
      <rect x="175" y="44" width="460" height="190" rx="8" fill="#1a1a2e" stroke="#4285f4" strokeWidth="2" />
      <text x="405" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4285f4" textAnchor="middle">TPU CHIP</text>

      {/* MXU blocks */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={190 + i*80} y="76" width="68" height="50" rx="4" fill="#4285f4" />
          <text x={224 + i*80} y="98" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">MXU {i+1}</text>
          <text x={224 + i*80} y="110" fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.8)" textAnchor="middle">Systolic</text>
          <text x={224 + i*80} y="120" fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.8)" textAnchor="middle">Array</text>
        </g>
      ))}
      <text x="405" y="142" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">← Matrix Multiply Units (MXUs) — core of TPU compute →</text>

      {/* HBM */}
      <rect x="190" y="152" width="200" height="36" rx="4" fill="#0d47a1" />
      <text x="290" y="168" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#90caf9" textAnchor="middle">HBM — High Bandwidth Memory</text>
      <text x="290" y="181" fontFamily="Arial,sans-serif" fontSize="7" fill="#64b5f6" textAnchor="middle">Fast, stacked — feeds MXUs with weights/activations</text>

      {/* On-chip SRAM */}
      <rect x="400" y="152" width="220" height="36" rx="4" fill="#1a237e" />
      <text x="510" y="168" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#c5cae9" textAnchor="middle">On-Chip SRAM / Scalar/Vector Units</text>
      <text x="510" y="181" fontFamily="Arial,sans-serif" fontSize="7" fill="#9fa8da" textAnchor="middle">Intermediate results, non-matrix operations</text>

      {/* XLA Compiler */}
      <rect x="190" y="198" width="430" height="28" rx="4" fill="#0f172a" stroke="#34a853" strokeWidth="1" />
      <text x="405" y="215" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#34a853" textAnchor="middle">XLA + framework tooling — compiles workloads for TPU execution (framework support depends on TPU generation)</text>

      {/* ICI arrow */}
      <line x1="635" y1="90" x2="666" y2="90" stroke="#fbbc04" strokeWidth="2" markerEnd="url(#tpu-ar-y)" />

      {/* ICI / other TPUs */}
      <rect x="666" y="50" width="140" height="80" rx="6" fill="#0f3460" stroke="#fbbc04" strokeWidth="1.5" />
      <text x="736" y="76" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fbbc04" textAnchor="middle">ICI Network</text>
      <text x="736" y="90" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Inter-Chip</text>
      <text x="736" y="102" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Interconnect</text>
      <text x="736" y="114" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">→ other TPU chips</text>
      <text x="736" y="124" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">in the pod</text>

      <text x="410" y="256" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0f172a" textAnchor="middle">MXU = Matrix Multiply Unit · HBM = High Bandwidth Memory · ICI = Inter-Chip Interconnect · XLA = Accelerated Linear Algebra compiler</text>
      <text x="410" y="270" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Exact TPU internal architecture publicly described at high level — full implementation details not disclosed</text>

      <defs>
        <marker id="tpu-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="tpu-ar-y" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#fbbc04" /></marker>
      </defs>
    </svg>
  );
}
