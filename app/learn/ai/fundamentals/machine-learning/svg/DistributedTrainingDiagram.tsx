"use client";
export default function DistributedTrainingDiagram() {
  const gpus = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dt-title">
      <title id="dt-title">Distributed Training: Data Parallelism with NCCL All-Reduce across GPU nodes</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DISTRIBUTED ML TRAINING — DATA PARALLELISM + NCCL ALL-REDUCE</text>

      {/* Node 1 */}
      <rect x="20" y="38" width="370" height="170" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">NODE 1 — HGX H100 (8× GPU)</text>
      {gpus.slice(0, 4).map((_, i) => (
        <g key={i}>
          <rect x={30 + i * 87} y="68" width="77" height="40" rx="5" fill="#2563eb" />
          <text x={68 + i * 87} y="84" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i}</text>
          <text x={68 + i * 87} y="98" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Batch + grad</text>
        </g>
      ))}
      {gpus.slice(0, 4).map((_, i) => (
        <g key={i}>
          <rect x={30 + i * 87} y="118" width="77" height="40" rx="5" fill="#3b82f6" />
          <text x={68 + i * 87} y="134" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i + 4}</text>
          <text x={68 + i * 87} y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Batch + grad</text>
        </g>
      ))}
      <rect x="30" y="168" width="350" height="28" rx="5" fill="#1e293b" />
      <text x="205" y="186" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00d4ff" textAnchor="middle">NVSwitch — 900 GB/s intra-node all-to-all</text>

      {/* Node 2 */}
      <rect x="430" y="38" width="370" height="170" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">NODE 2 — HGX H100 (8× GPU)</text>
      {gpus.slice(0, 4).map((_, i) => (
        <g key={i}>
          <rect x={440 + i * 87} y="68" width="77" height="40" rx="5" fill="#16a34a" />
          <text x={478 + i * 87} y="84" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i}</text>
          <text x={478 + i * 87} y="98" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Batch + grad</text>
        </g>
      ))}
      {gpus.slice(0, 4).map((_, i) => (
        <g key={i}>
          <rect x={440 + i * 87} y="118" width="77" height="40" rx="5" fill="#22c55e" />
          <text x={478 + i * 87} y="134" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU {i + 4}</text>
          <text x={478 + i * 87} y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Batch + grad</text>
        </g>
      ))}
      <rect x="440" y="168" width="350" height="28" rx="5" fill="#1e293b" />
      <text x="615" y="186" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00ffcc" textAnchor="middle">NVSwitch — 900 GB/s intra-node all-to-all</text>

      {/* InfiniBand between nodes */}
      <rect x="200" y="222" width="420" height="34" rx="8" fill="#1e293b" stroke="#00d4ff" strokeWidth="1.5" />
      <text x="410" y="237" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">InfiniBand NDR 400 Gbps — NCCL All-Reduce</text>
      <text x="410" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Gradients synchronized every step across all nodes</text>
      <line x1="205" y1="208" x2="300" y2="222" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="4,2" />
      <line x1="615" y1="208" x2="520" y2="222" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="4,2" />

      {/* Strategy labels */}
      <rect x="20" y="270" width="780" height="38" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="285" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#374151">Strategies:</text>
      <text x="100" y="285" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">DDP — data parallel, gradients all-reduce</text>
      <text x="290" y="285" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">FSDP/ZeRO — shard params+grads+optimizer</text>
      <text x="500" y="285" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Megatron — tensor+pipeline parallelism</text>
      <text x="680" y="285" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">DeepSpeed — ZeRO</text>
      <text x="100" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Horovod — ring all-reduce</text>
      <text x="290" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">NCCL — collective communications library</text>
    </svg>
  );
}
