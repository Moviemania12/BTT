"use client";
export default function RequestFlowDiagram() {
  const steps = [
    { label: "Your Application", sub: "HTTPS POST request\nwith API key + prompt", color: "#1e293b", x: 14 },
    { label: "API Gateway", sub: "Auth · Rate limit\nRouting · Logging", color: "#0284c7", x: 164 },
    { label: "Load Balancer", sub: "Route to available\ninference cluster", color: "#0891b2", x: 314 },
    { label: "Inference Cluster", sub: "GPU servers\nModel weights in VRAM", color: "#7c3aed", x: 464 },
    { label: "Token Generation", sub: "Autoregressive decode\n1 token at a time", color: "#6d28d9", x: 614 },
    { label: "Response", sub: "Streaming or batch\nToken count → billing", color: "#16a34a", x: 764 },
  ];

  return (
    <svg viewBox="0 0 960 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rfd-title">
      <title id="rfd-title">AI Request Flow: Application sends HTTPS request to API Gateway (authentication, rate limiting, routing). Load Balancer routes to available Inference Cluster (GPU servers with model weights in VRAM). Token Generation runs autoregressively one token at a time. Response returns as streaming or batch with token count for billing.</title>
      <rect width="960" height="200" fill="#fff" />
      <text x="480" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI REQUEST FLOW — APPLICATION TO INFERENCE</text>
      <text x="480" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Each step adds latency — total response time = sum of all layers. Streaming sends tokens as they are generated.</text>

      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="50" width="136" height="60" rx="6" fill={s.color} />
          <text x={s.x + 68} y="72" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 68} y={85 + li * 12} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.88)" textAnchor="middle">{line}</text>
          ))}
          {i < steps.length - 1 && (
            <line x1={s.x + 136} y1={80} x2={s.x + 150} y2={80} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#rfd-ar)" />
          )}
        </g>
      ))}

      {/* Return path */}
      <path d="M 900 118 Q 900 155 480 155 Q 60 155 60 118" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#rfd-ar-g)" />
      <text x="480" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle" fontWeight="700">← Response returns through same path (streaming: token-by-token via Server-Sent Events)</text>

      <text x="480" y="192" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Latency factors: model size, input/output token count, server load, geographic distance, tier (shared vs dedicated capacity)</text>

      <defs>
        <marker id="rfd-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="rfd-ar-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
