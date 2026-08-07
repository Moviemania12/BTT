"use client";
export default function TrainingDataFlow() {
  const steps = [
    { n: "1", label: "Storage", sub: "NVMe / GCS\nTraining data", color: "#475569", bg: "#f1f5f9" },
    { n: "2", label: "Data Load", sub: "GPUDirect\nCPU bypass", color: "#0284c7", bg: "#e0f2fe" },
    { n: "3", label: "HBM Memory", sub: "Batch in GPU\n80 GB buffer", color: "#7c3aed", bg: "#ede9fe" },
    { n: "4", label: "Forward Pass", sub: "Tensor Cores\nLayer by layer", color: "#9333ea", bg: "#fdf4ff" },
    { n: "5", label: "Loss Calc", sub: "Error score\nCUDA Cores", color: "#dc2626", bg: "#fef2f2" },
    { n: "6", label: "Backward", sub: "Gradients\nchain rule", color: "#ca8a04", bg: "#fefce8" },
    { n: "7", label: "AllReduce", sub: "NVLink sync\nall GPUs", color: "#0891b2", bg: "#ecfeff" },
    { n: "8", label: "Optimizer", sub: "Update weights\nAdamW step", color: "#16a34a", bg: "#f0fdf4" },
  ];
  return (
    <svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tdf-title">
      <title id="tdf-title">AI Training Data Flow: 1-Storage (NVMe/GCS) via 2-GPUDirect data load into 3-HBM Memory, then 4-Forward Pass on Tensor Cores layer by layer, 5-Loss Calculation on CUDA Cores, 6-Backward Pass gradient computation, 7-AllReduce gradient sync via NVLink across all GPUs, 8-Optimizer weight update. Loop repeats thousands of times until model converges.</title>
      <rect width="820" height="250" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI TRAINING DATA FLOW — One Complete Training Iteration (Simplified)</text>

      {steps.map((s, i) => {
        const x = 18 + i * 98;
        return (
          <g key={s.n}>
            <rect x={x} y={36} width={88} height={148} rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <circle cx={x + 44} cy={62} r="18" fill={s.color} />
            <text x={x + 44} y={67} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#fff" textAnchor="middle">{s.n}</text>
            <text x={x + 44} y={97} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
            {s.sub.split("\n").map((line, li) => (
              <text key={li} x={x + 44} y={112 + li * 13} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <line x1={x + 90} y1={110} x2={x + 98} y2={110} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#tdf-ar)" />
            )}
          </g>
        );
      })}

      {/* Loop back arrow */}
      <path d="M 800 184 Q 800 210 410 210 Q 18 210 18 184" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="5,3" markerEnd="url(#tdf-ar2)" />
      <text x="410" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Repeat thousands–millions of iterations until loss converges (model is trained)</text>

      {/* Callout boxes */}
      <rect x="18" y="192" width="280" height="22" rx="4" fill="#ede9fe" />
      <text x="158" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#4c1d95" textAnchor="middle">Compute-bound: Steps 4–6 (Tensor Cores busy) — minimize memory ops</text>
      <rect x="310" y="192" width="240" height="22" rx="4" fill="#ecfeff" />
      <text x="430" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0c4a6e" textAnchor="middle">Communication-bound: Step 7 — NVLink bandwidth critical</text>
      <rect x="562" y="192" width="252" height="22" rx="4" fill="#f1f5f9" />
      <text x="688" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">IO-bound: Step 1→2 — GPUDirect Storage reduces CPU overhead</text>

      <defs>
        <marker id="tdf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="tdf-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
