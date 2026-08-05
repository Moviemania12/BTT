"use client";
export default function InferenceScaling() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="is-title">
      <title id="is-title">Inference Scaling: single GPU to multi-node cluster with load balancer and auto-scaling</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">INFERENCE SCALING — FROM SINGLE GPU TO CLUSTER</text>

      {/* Scale 1: Single GPU */}
      <rect x="20" y="40" width="170" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="105" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">SINGLE GPU</text>
      <text x="105" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">7B model · A10G 24GB</text>
      <rect x="40" y="82" width="130" height="30" rx="5" fill="#16a34a" />
      <text x="105" y="101" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">vLLM Server</text>
      <text x="105" y="125" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">~50-100 req/min</text>
      <text x="105" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">P50 latency: 1-2s</text>
      <text x="105" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Cost: ~$0.5-1/hr</text>
      <text x="105" y="175" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Good for dev/test</text>

      {/* Arrow */}
      <text x="210" y="122" fontFamily="Arial,sans-serif" fontSize="14" fill="#94a3b8" textAnchor="middle">→</text>

      {/* Scale 2: Multi-GPU */}
      <rect x="230" y="40" width="170" height="160" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="315" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">MULTI-GPU (1 node)</text>
      <text x="315" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">70B model · 2-4× H100</text>
      <rect x="250" y="82" width="130" height="30" rx="5" fill="#2563eb" />
      <text x="315" y="101" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">vLLM + TP</text>
      <text x="315" y="125" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">~200-500 req/min</text>
      <text x="315" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Tensor parallelism</text>
      <text x="315" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">NVLink bandwidth</text>
      <text x="315" y="175" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Production minimum</text>

      {/* Arrow */}
      <text x="420" y="122" fontFamily="Arial,sans-serif" fontSize="14" fill="#94a3b8" textAnchor="middle">→</text>

      {/* Scale 3: Cluster */}
      <rect x="440" y="40" width="360" height="160" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <text x="620" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">INFERENCE CLUSTER (K8s)</text>
      <text x="620" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Load Balancer → Multiple vLLM replicas</text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={460 + i * 108} y="82" width="98" height="60" rx="5" fill="#ea580c" />
          <text x={509 + i * 108} y="104" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">vLLM Pod {i + 1}</text>
          <text x={509 + i * 108} y="118" fontFamily="Arial,sans-serif" fontSize="7" fill="#fed7aa" textAnchor="middle">2× H100</text>
          <text x={509 + i * 108} y="131" fontFamily="Arial,sans-serif" fontSize="7" fill="#fed7aa" textAnchor="middle">70B INT4</text>
        </g>
      ))}

      <text x="620" y="162" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">~2000-5000 req/min · HPA auto-scales on GPU util</text>
      <text x="620" y="178" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">Enterprise production scale</text>

      {/* Bottom info */}
      <rect x="20" y="216" width="780" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="234" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">SCALING STRATEGIES</text>
      <text x="410" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Horizontal: more replicas (same model, handle more concurrent requests). Tensor Parallel: one model across multiple GPUs (large model).</text>
      <text x="410" y="264" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PagedAttention: efficiently manage KV cache across requests. Auto-scaling: K8s HPA on GPU utilization target 70-85%. Scale-to-zero for dev.</text>
    </svg>
  );
}
