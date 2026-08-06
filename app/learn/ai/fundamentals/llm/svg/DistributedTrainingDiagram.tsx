"use client";
export default function DistributedTrainingDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dtp-title">
      <title id="dtp-title">Distributed LLM Training: Data Parallelism, Tensor Parallelism, Pipeline Parallelism, Expert Parallelism — 3D parallelism for large models</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DISTRIBUTED LLM TRAINING — PARALLELISM STRATEGIES</text>

      {/* Data Parallelism */}
      <rect x="20" y="38" width="186" height="140" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="113" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">DATA PARALLELISM</text>
      <text x="113" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">(DDP / FSDP / ZeRO)</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="34" y={82 + i * 28} width="158" height="22" rx="4" fill="#2563eb" />
          <text x="113" y={96 + i * 28} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i*2+1}/{i*2+2} — Full model + data batch {i+1}</text>
        </g>
      ))}
      <text x="113" y="163" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">All-reduce gradients (NCCL)</text>
      <text x="113" y="175" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">FSDP: shard params+grads+optim</text>

      {/* Tensor Parallelism */}
      <rect x="216" y="38" width="186" height="140" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="309" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">TENSOR PARALLELISM</text>
      <text x="309" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">(Megatron-LM style)</text>
      <rect x="230" y="82" width="158" height="60" rx="4" fill="#16a34a" />
      <text x="309" y="105" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Single layer split across GPUs</text>
      <text x="309" y="119" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">GPU1: rows 1..N/2 of weight</text>
      <text x="309" y="133" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">GPU2: rows N/2..N of weight</text>
      <text x="309" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">NVLink bandwidth critical</text>
      <text x="309" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">All-reduce per layer step</text>

      {/* Pipeline Parallelism */}
      <rect x="412" y="38" width="186" height="140" rx="8" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="505" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">PIPELINE PARALLELISM</text>
      <text x="505" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">(Layer vertical split)</text>
      {[["GPU 1", "Layers 1–32"], ["GPU 2", "Layers 33–64"], ["GPU 3", "Layers 65–80"]].map(([g, l], i) => (
        <g key={i}>
          <rect x="426" y={82 + i * 30} width="158" height="24" rx="4" fill="#ca8a04" />
          <text x="505" y={97 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{g}: {l}</text>
        </g>
      ))}
      <text x="505" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Micro-batch pipelining</text>

      {/* Expert Parallelism */}
      <rect x="608" y="38" width="192" height="140" rx="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="1.5" />
      <text x="704" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#701a75" textAnchor="middle">EXPERT PARALLELISM</text>
      <text x="704" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#a21caf" textAnchor="middle">(MoE models)</text>
      {[["GPU 1/2", "Expert 1-2"], ["GPU 3/4", "Expert 3-4"], ["GPU 5-8", "Expert 5-8"]].map(([g, e], i) => (
        <g key={i}>
          <rect x="622" y={82 + i * 30} width="164" height="24" rx="4" fill="#a21caf" />
          <text x="704" y={97 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{g}: {e}</text>
        </g>
      ))}
      <text x="704" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#a21caf" textAnchor="middle">Router dispatches tokens via IB</text>

      {/* 3D Parallelism */}
      <rect x="20" y="192" width="780" height="100" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="410" y="212" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">3D PARALLELISM — FOR FRONTIER MODELS (Llama 3.1 405B scale)</text>
      <text x="410" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Combine Data + Tensor + Pipeline parallelism simultaneously across thousands of GPUs</text>
      <text x="410" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Megatron-LM: battle-tested 3D parallel implementation · DeepSpeed: ZeRO optimizer + offload · PyTorch FSDP: native sharding</text>
      <text x="410" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Example: 16,000 H100s — 8 tensor parallel × 64 pipeline × 31 data parallel groups</text>
      <text x="410" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">InfiniBand NDR 400G fabric: gradient sync · Expert routing · Pipeline bubble minimization</text>

      <text x="410" y="312" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Communication bottleneck: tensor parallelism needs NVLink bandwidth; pipeline parallelism needs low-latency IB; data parallelism needs IB bandwidth</text>
    </svg>
  );
}
