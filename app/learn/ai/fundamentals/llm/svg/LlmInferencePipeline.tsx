"use client";
export default function LlmInferencePipeline() {
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lip-title">
      <title id="lip-title">LLM Inference Pipeline: Load Balancer to Inference Cluster with PagedAttention and Continuous Batching to Monitoring</title>
      <rect width="820" height="260" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">LLM INFERENCE PIPELINE</text>

      {/* Users */}
      <rect x="20" y="50" width="100" height="120" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="70" y="72" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">CLIENTS</text>
      {["Web App", "Mobile", "API", "Agent"].map((u, i) => (
        <g key={i}>
          <rect x="32" y={82 + i * 22} width="76" height="16" rx="3" fill="#e2e8f0" />
          <text x="70" y={93 + i * 22} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">{u}</text>
        </g>
      ))}
      <line x1="122" y1="110" x2="142" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#lip1)" />

      {/* Gateway */}
      <rect x="142" y="50" width="120" height="120" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="202" y="72" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">AI GATEWAY</text>
      {["Auth / RBAC", "Rate Limit", "Prompt Cache", "Model Router", "Audit Log"].map((g, i) => (
        <g key={i}>
          <rect x="152" y={82 + i * 17} width="100" height="13" rx="2" fill="#fef2f2" />
          <text x="202" y={92 + i * 17} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">{g}</text>
        </g>
      ))}
      <line x1="264" y1="110" x2="284" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#lip1)" />

      {/* LB */}
      <rect x="284" y="70" width="90" height="80" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="329" y="95" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">LOAD</text>
      <text x="329" y="109" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">BALANCER</text>
      <text x="329" y="125" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">L7 · SSE</text>
      <text x="329" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">streaming</text>
      <line x1="376" y1="110" x2="396" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#lip1)" />

      {/* Inference cluster */}
      <rect x="396" y="36" width="240" height="188" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="516" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">INFERENCE CLUSTER</text>
      {[
        { label: "vLLM Pod 1", sub: "PagedAttention · Continuous batch", gpu: "2× H100" },
        { label: "vLLM Pod 2", sub: "Speculative decoding · INT4", gpu: "2× H100" },
        { label: "vLLM Pod 3", sub: "Prefix cache · GQA", gpu: "2× H100" },
      ].map((p, i) => (
        <g key={i}>
          <rect x="408" y={66 + i * 50} width="218" height="42" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="516" y={84 + i * 50} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">{p.label} — {p.gpu}</text>
          <text x="516" y={99 + i * 50} fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">{p.sub}</text>
        </g>
      ))}
      <rect x="408" y="218" width="218" height="0" />
      <text x="516" y="212" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">HPA: auto-scale on GPU util 70-85%</text>
      <line x1="638" y1="130" x2="658" y2="130" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#lip1)" />

      {/* Monitoring */}
      <rect x="658" y="50" width="144" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="730" y="72" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">MONITORING</text>
      {["DCGM (GPU metrics)", "TTFT · TPOT", "Throughput (TPS)", "Queue depth", "Cost/request", "LangFuse traces"].map((m, i) => (
        <g key={i}>
          <text x="668" y={88 + i * 13} fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8">• {m}</text>
        </g>
      ))}

      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Streaming: Server-Sent Events (SSE) or WebSocket — tokens stream as generated, not full response buffered</text>

      <defs>
        <marker id="lip1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
