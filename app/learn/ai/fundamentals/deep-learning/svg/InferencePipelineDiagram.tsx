"use client";
export default function InferencePipelineDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ip-title">
      <title id="ip-title">Deep Learning Inference Pipeline: Autoregressive token generation with KV Cache</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">LLM INFERENCE — AUTOREGRESSIVE GENERATION WITH KV CACHE</text>

      {/* Steps */}
      {[
        { step: "1", label: "Prompt Tokenize", sub: "Text → token IDs", x: 20, color: "#2563eb", bg: "#dbeafe" },
        { step: "2", label: "Embedding Lookup", sub: "Token → dense vector", x: 160, color: "#7c3aed", bg: "#ede9fe" },
        { step: "3", label: "Forward Pass", sub: "N Transformer blocks\nAttention + FFN", x: 300, color: "#0369a1", bg: "#e0f2fe" },
        { step: "4", label: "Sample Token", sub: "Logits → Softmax\n→ Sampling", x: 460, color: "#16a34a", bg: "#dcfce7" },
        { step: "5", label: "Append Token", sub: "Output → Input\nfor next step", x: 600, color: "#ca8a04", bg: "#fef9c3" },
        { step: "6", label: "Repeat/Stop", sub: "EOS? → Output\nor continue loop", x: 710, color: "#ea580c", bg: "#ffedd5" },
      ].map((s, i, arr) => (
        <g key={i}>
          <rect x={s.x} y="50" width="120" height="80" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={s.x + 20} cy="70" r="12" fill={s.color} />
          <text x={s.x + 20} y="74" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">{s.step}</text>
          <text x={s.x + 60} y="75" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 60} y={91 + li * 13} fontFamily="Arial,sans-serif" fontSize="8" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < arr.length - 1 && (
            <line x1={s.x + 122} y1="90" x2={arr[i + 1].x - 2} y2="90" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ip1)" />
          )}
        </g>
      ))}

      {/* Loop arrow */}
      <path d="M 760,130 Q 760,165 410,170 Q 160,165 160,130" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="6,3" markerEnd="url(#ip2)" />
      <text x="410" y="188" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c3aed" textAnchor="middle">← Loop: next token generation until EOS or max_length</text>

      {/* KV Cache box */}
      <rect x="220" y="210" width="380" height="70" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="410" y="232" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">KV CACHE — GPU HBM</text>
      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Previously computed Key aur Value tensors store karo</text>
      <text x="410" y="262" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Avoid recomputation every step → 10-50x faster generation</text>
      <text x="410" y="275" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Memory cost: seq_len × num_heads × d_head × 2 × num_layers × batch_size</text>

      <defs>
        <marker id="ip1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
        <marker id="ip2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" />
        </marker>
      </defs>
    </svg>
  );
}
