"use client";
export default function GpuTrainingPipelineDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gtp-title">
      <title id="gtp-title">GPU Training Pipeline: Data loading, forward pass, loss, backprop, NCCL all-reduce, optimizer update</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU TRAINING PIPELINE — ONE TRAINING STEP</text>

      {[
        { step:"1", label:"Load Batch", sub:"Storage → NVMe\n→ CPU DRAM\n→ GPU HBM", color:"#475569", bg:"#f1f5f9" },
        { step:"2", label:"Forward Pass", sub:"Input through\nN Transformer\nblocks", color:"#2563eb", bg:"#dbeafe" },
        { step:"3", label:"Compute Loss", sub:"CE / MSE\nagainst labels\n", color:"#0369a1", bg:"#e0f2fe" },
        { step:"4", label:"Backward Pass", sub:"Gradients via\nchain rule\n(2-3× fwd cost)", color:"#7c3aed", bg:"#ede9fe" },
        { step:"5", label:"NCCL All-Reduce", sub:"Gradients synced\nacross all GPUs\nvia InfiniBand", color:"#dc2626", bg:"#fef2f2" },
        { step:"6", label:"Optimizer Step", sub:"AdamW update\nparameters\n(FP32 master)", color:"#16a34a", bg:"#dcfce7" },
        { step:"7", label:"Checkpoint?", sub:"Every N steps\nasync write\nto NVMe/FS", color:"#ca8a04", bg:"#fef9c3" },
      ].map((s, i, arr) => (
        <g key={i}>
          <rect x={20 + i * 114} y="48" width="104" height="96" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={20 + i * 114 + 20} cy="66" r="12" fill={s.color} />
          <text x={20 + i * 114 + 20} y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">{s.step}</text>
          <text x={20 + i * 114 + 52} y="80" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={20 + i * 114 + 52} y={96 + li * 13} fontFamily="Arial,sans-serif" fontSize="8" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < arr.length - 1 && (
            <line x1={126 + i * 114} y1="96" x2={132 + i * 114} y2="96" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#gtp1)" />
          )}
        </g>
      ))}

      {/* Timings */}
      <rect x="20" y="162" width="780" height="56" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="180" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">RELATIVE TIME PER STEP (example: 70B model, 8× H100)</text>
      {[
        { label: "Data Load (async)", pct: "~2%", color: "#475569", x: 30 },
        { label: "Forward Pass", pct: "~28%", color: "#2563eb", x: 160 },
        { label: "Backward Pass", pct: "~50%", color: "#7c3aed", x: 300 },
        { label: "NCCL All-Reduce", pct: "~15%", color: "#dc2626", x: 460 },
        { label: "Optimizer", pct: "~5%", color: "#16a34a", x: 600 },
      ].map((t, i) => (
        <g key={i}>
          <text x={t.x} y="198" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={t.color}>{t.label}</text>
          <text x={t.x} y="210" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill={t.color}>{t.pct}</text>
        </g>
      ))}

      <text x="410" y="252" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">NCCL all-reduce is bottleneck for large models — InfiniBand bandwidth directly determines training throughput</text>
      <text x="410" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">MFU (Model FLOP Utilization) target: 40-60% good · below 30% = optimize data loading or networking</text>

      <defs>
        <marker id="gtp1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
