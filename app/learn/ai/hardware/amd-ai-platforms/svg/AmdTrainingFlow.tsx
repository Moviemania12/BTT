"use client";
export default function AmdTrainingFlow() {
  const steps = [
    { n: "1", label: "Storage", sub: "NVMe / Cloud\nTraining Data", color: "#475569", bg: "#f1f5f9" },
    { n: "2", label: "Data Loader", sub: "Feeds GPU\ncontinuously", color: "#0284c7", bg: "#e0f2fe" },
    { n: "3", label: "GPU Memory\n(HBM3 192 GB)", sub: "Batch stored\nhere", color: "#7c3aed", bg: "#ede9fe" },
    { n: "4", label: "Forward Pass", sub: "Matrix Cores\nlayer by layer", color: "#dc2626", bg: "#fef2f2" },
    { n: "5", label: "Loss Calc", sub: "How wrong\nwas answer?", color: "#ca8a04", bg: "#fefce8" },
    { n: "6", label: "Backward", sub: "Error signals\ncomputed", color: "#f97316", bg: "#fff7ed" },
    { n: "7", label: "RCCL\nAllReduce", sub: "All GPUs share\nerrors via RCCL*", color: "#0891b2", bg: "#ecfeff" },
    { n: "8", label: "Optimizer\nUpdate", sub: "Weights\nimproved", color: "#16a34a", bg: "#f0fdf4" },
  ];
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="atf-title">
      <title id="atf-title">AMD AI Training Flow: Storage to Data Loader to GPU HBM Memory, then Forward Pass on Matrix Cores, Loss Calculation, Backward Pass gradient computation, RCCL AllReduce synchronization across all GPUs (PyTorch maps backend=nccl to RCCL on AMD), Optimizer weight update. Loop repeats until model converges.</title>
      <rect width="820" height="260" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD AI TRAINING FLOW — One Complete Training Iteration</text>

      {steps.map((s, i) => {
        const x = 14 + i * 99;
        return (
          <g key={s.n}>
            <rect x={x} y={32} width={92} height={155} rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <circle cx={x + 46} cy={58} r="18" fill={s.color} />
            <text x={x + 46} y={63} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#fff" textAnchor="middle">{s.n}</text>
            {s.label.split("\n").map((line, li) => (
              <text key={li} x={x + 46} y={90 + li * 13} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={s.color} textAnchor="middle">{line}</text>
            ))}
            {s.sub.split("\n").map((line, li) => (
              <text key={li} x={x + 46} y={120 + li * 12} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <line x1={x + 94} y1={109} x2={x + 99} y2={109} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#atf-ar)" />
            )}
          </g>
        );
      })}

      {/* Loop back */}
      <path d="M 806 187 Q 806 210 410 210 Q 14 210 14 187" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="5,3" markerEnd="url(#atf-ar2)" />
      <text x="410" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Repeat until model converges</text>

      {/* Step 7 note */}
      <rect x="630" y="195" width="182" height="22" rx="4" fill="#ecfeff" stroke="#0891b2" strokeWidth="1" />
      <text x="721" y="210" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#0c4a6e" textAnchor="middle">* PyTorch maps backend=&quot;nccl&quot; to RCCL on AMD</text>

      <defs>
        <marker id="atf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="atf-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
