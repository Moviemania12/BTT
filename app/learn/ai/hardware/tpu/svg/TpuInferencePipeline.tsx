"use client";
export default function TpuInferencePipeline() {
  return (
    <svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tip-title">
      <title id="tip-title">TPU Inference Pipeline: User sends request, load balancer routes it, XLA-compiled model on TPU processes it, response sent back. TPU better for large batch inference, GPU better for low-latency single requests.</title>
      <rect width="820" height="270" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">INFERENCE ON TPU — Serving AI Predictions to Users</text>

      {/* User */}
      <rect x="20" y="42" width="110" height="100" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="75" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Users</text>
      {["Web App", "Mobile API", "Backend", "Batch Job"].map((u, i) => (
        <g key={i}>
          <rect x="30" y={72 + i*16} width="90" height="13" rx="3" fill="#e2e8f0" />
          <text x="75" y={82 + i*16} fontFamily="Arial,sans-serif" fontSize="7" fill="#334155" textAnchor="middle">{u}</text>
        </g>
      ))}
      <line x1="132" y1="92" x2="150" y2="92" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#tip-ar)" />

      {/* Load balancer */}
      <rect x="152" y="60" width="100" height="64" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="202" y="80" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">Load</text>
      <text x="202" y="93" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">Balancer</text>
      <text x="202" y="108" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Routes to</text>
      <text x="202" y="118" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">best TPU</text>
      <line x1="254" y1="92" x2="272" y2="92" stroke="#ea580c" strokeWidth="1.5" markerEnd="url(#tip-ar2)" />

      {/* TPU Inference cluster */}
      <rect x="274" y="36" width="260" height="200" rx="10" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="404" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">TPU INFERENCE CLUSTER</text>
      <text x="404" y="72" fontFamily="Arial,sans-serif" fontSize="7" fill="#818cf8" textAnchor="middle">Pre-compiled XLA model loaded into TPU HBM</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="284" y={82 + i*50} width="240" height="40" rx="6" fill="#7c3aed" opacity={0.8} />
          <text x="404" y={100 + i*50} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">TPU Slice {i+1} — Running inference</text>
          <text x="404" y={114 + i*50} fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">Model weights in HBM · Systolic array doing forward pass · BF16</text>
        </g>
      ))}
      <text x="404" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#6d28d9" textAnchor="middle">Continuous batching: multiple requests processed together</text>
      <text x="404" y="222" fontFamily="Arial,sans-serif" fontSize="7" fill="#818cf8" textAnchor="middle">High throughput — many users, large batch sizes</text>
      <line x1="536" y1="136" x2="554" y2="136" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#tip-ar3)" />

      {/* Response */}
      <rect x="556" y="80" width="110" height="110" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="611" y="102" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Response</text>
      <text x="611" y="118" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Generated text</text>
      <text x="611" y="131" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Image output</text>
      <text x="611" y="144" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Prediction score</text>
      <text x="611" y="157" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">→ returned to user</text>
      <text x="611" y="178" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#16a34a" textAnchor="middle">✓ Google Search</text>
      <text x="611" y="191" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#16a34a" textAnchor="middle">✓ Google Translate</text>

      {/* TPU vs GPU for inference comparison */}
      <rect x="684" y="42" width="128" height="220" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="748" y="62" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">Inference: TPU vs GPU</text>
      <rect x="692" y="70" width="112" height="80" rx="5" fill="#ede9fe" />
      <text x="748" y="86" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">TPU Better When:</text>
      {["Large batch sizes", "TF/JAX framework", "High throughput", "Standard models"].map((t, i) => (
        <text key={i} x="698" y={100 + i*13} fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6">✓ {t}</text>
      ))}
      <rect x="692" y="158" width="112" height="90" rx="5" fill="#f0fdf4" />
      <text x="748" y="174" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">GPU Better When:</text>
      {["Low latency needed", "Single requests", "Custom ops", "PyTorch model", "On-premises"].map((t, i) => (
        <text key={i} x="698" y={188 + i*13} fontFamily="Arial,sans-serif" fontSize="7" fill="#166534">✓ {t}</text>
      ))}

      <defs>
        <marker id="tip-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="tip-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ea580c" /></marker>
        <marker id="tip-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
