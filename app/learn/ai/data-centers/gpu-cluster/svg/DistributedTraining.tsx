"use client";
export default function DistributedTraining() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dt-title">
      <title id="dt-title">Distributed Training three strategies side by side. Data Parallelism: full model copy on each GPU, different data batches processed, AllReduce syncs gradients. Tensor Parallelism: one large weight matrix split across multiple GPUs, each holds a portion, requires constant high-bandwidth GPU-to-GPU communication during forward and backward pass. Pipeline Parallelism: model layers split into groups (stages) across GPU sets, first stage processes batch and passes to second stage like an assembly line, micro-batching fills pipeline. Production LLM training combines all three as 3D Parallelism.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DISTRIBUTED TRAINING — Three Parallelism Strategies</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Large model training combines all three strategies simultaneously (3D Parallelism). Each has different communication requirements.</text>

      {/* Panel 1 — Data Parallelism */}
      <rect x="8" y="44" width="260" height="232" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="138" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">Data Parallelism</text>
      <text x="138" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Same model on each GPU, different data</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={16 + i * 60} y="88" width="52" height="80" rx="5" fill="#2563eb" />
          <text x={42 + i * 60} y="105" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i + 1}</text>
          <rect x={20 + i * 60} y="112" width="44" height="26" rx="3" fill="#1e40af" />
          <text x={42 + i * 60} y="125" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bfdbfe" textAnchor="middle">Full Model</text>
          <text x={42 + i * 60} y="135" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">Copy</text>
          <rect x={20 + i * 60} y="142" width="44" height="20" rx="3" fill="#0891b2" />
          <text x={42 + i * 60} y="156" fontFamily="Arial,sans-serif" fontSize="6" fill="#fff" textAnchor="middle">Batch {i + 1}</text>
        </g>
      ))}
      <rect x="50" y="182" width="176" height="24" rx="5" fill="#dc2626" />
      <text x="138" y="198" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">AllReduce — Sync Gradients</text>
      <text x="138" y="220" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">✓ Simplest approach</text>
      <text x="138" y="234" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">✓ Model must fit one GPU</text>
      <text x="138" y="248" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Modern: FSDP/ZeRO shards model states</text>
      <text x="138" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">— allowing larger effective model scale</text>

      {/* Panel 2 — Tensor Parallelism */}
      <rect x="280" y="44" width="260" height="232" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="410" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Tensor Parallelism</text>
      <text x="410" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">One large weight matrix split across GPUs</text>

      {/* Matrix split */}
      <rect x="308" y="88" width="204" height="80" rx="5" fill="#15803d" stroke="#16a34a" strokeWidth="1" />
      <text x="410" y="104" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">One Weight Matrix (very large)</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={316 + i * 48} y="112" width="40" height="48" rx="3" fill={["#7c3aed", "#2563eb", "#dc2626", "#ca8a04"][i]} />
          <text x={336 + i * 48} y="130" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
          <text x={336 + i * 48} y="143" fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">{i + 1}</text>
          <text x={336 + i * 48} y="155" fontFamily="Arial,sans-serif" fontSize="6" fill="#fff" textAnchor="middle">¼ matrix</text>
        </g>
      ))}
      <line x1="356" y1="168" x2="464" y2="168" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2" />
      <text x="410" y="165" fontFamily="Arial,sans-serif" fontSize="7" fill="#15803d" textAnchor="middle">← Constant communication →</text>

      <text x="410" y="195" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">✓ Enables very large layer sizes</text>
      <text x="410" y="209" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">! Needs very high GPU-to-GPU bandwidth</text>
      <text x="410" y="223" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">— often kept within NVLink domain</text>
      <text x="410" y="237" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">— or fast InfiniBand/RoCE inter-server</text>
      <text x="410" y="251" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Communication during every fwd/bwd pass</text>
      <text x="410" y="265" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#15803d" textAnchor="middle">Latency is critical</text>

      {/* Panel 3 — Pipeline Parallelism */}
      <rect x="552" y="44" width="260" height="232" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="682" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">Pipeline Parallelism</text>
      <text x="682" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Model layers split into stages across GPU groups</text>

      {/* Pipeline stages */}
      {[
        { label: "Stage 1", sub: "Layers 1–N\nGPU group 1", color: "#7c3aed" },
        { label: "Stage 2", sub: "Layers N+1–2N\nGPU group 2", color: "#2563eb" },
        { label: "Stage 3", sub: "Layers 2N+1–3N\nGPU group 3", color: "#16a34a" },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x={560} y={88 + i * 52} width={244} height={44} rx="5" fill={s.color} />
          <text x="682" y={108 + i * 52} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x="682" y={120 + i * 52 + li * 11} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">{line}</text>
          ))}
          {i < 2 && <line x1="682" y1={132 + i * 52} x2="682" y2={140 + i * 52} stroke="#f97316" strokeWidth="2" markerEnd="url(#dt-ar)" />}
        </g>
      ))}

      <text x="682" y="252" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Like factory assembly line — micro-batches</text>
      <text x="682" y="264" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">fill pipeline to reduce idle time (bubble)</text>
      <text x="682" y="276" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#f97316" textAnchor="middle">For very large models across many servers</text>

      <defs>
        <marker id="dt-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
