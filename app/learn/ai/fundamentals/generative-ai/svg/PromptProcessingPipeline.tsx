"use client";
export default function PromptProcessingPipeline() {
  return (
    <svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ppp-title">
      <title id="ppp-title">Prompt Processing Pipeline: System prompt construction, tokenization, embedding, KV cache, generation</title>
      <rect width="820" height="230" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">PROMPT PROCESSING PIPELINE</text>

      {[
        { label: "System Prompt", sub: "Developer instructions\nPersona · Constraints\n~1000-5000 tokens", color: "#7c3aed", bg: "#ede9fe", x: 20 },
        { label: "Few-Shot Examples", sub: "Task examples\nFormat guidance\n~0-2000 tokens", color: "#0369a1", bg: "#e0f2fe", x: 168 },
        { label: "Retrieved Context", sub: "RAG chunks\nTop-K documents\n~500-10,000 tokens", color: "#16a34a", bg: "#dcfce7", x: 316 },
        { label: "User Message", sub: "Actual request\nConversation history\n~50-5000 tokens", color: "#ca8a04", bg: "#fef9c3", x: 464 },
        { label: "Tokenizer", sub: "Text → token IDs\nBPE encoding\nContext window check", color: "#0f766e", bg: "#ccfbf1", x: 612 },
        { label: "LLM + KV Cache", sub: "Prefill + Decode\nPaged Attention\nStreaming output", color: "#2563eb", bg: "#dbeafe", x: 700 },
      ].map((s, i, arr) => (
        <g key={i}>
          <rect x={s.x} y="40" width="136" height="100" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x + 68} y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 68} y={76 + li * 14} fontFamily="Arial,sans-serif" fontSize="8" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < arr.length - 2 && (
            <line x1={s.x + 138} y1="90" x2={arr[i + 1].x - 2} y2="90" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ppp1)" />
          )}
          {i === arr.length - 3 && (
            <line x1={s.x + 138} y1="90" x2={arr[i + 1].x - 2} y2="90" stroke="#0f766e" strokeWidth="1.5" markerEnd="url(#ppp2)" />
          )}
        </g>
      ))}

      {/* Context window bar */}
      <rect x="20" y="155" width="776" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
      <rect x="20" y="155" width="194" height="30" rx="0" fill="#ede9fe" />
      <rect x="214" y="155" width="97" height="30" fill="#e0f2fe" />
      <rect x="311" y="155" width="243" height="30" fill="#dcfce7" />
      <rect x="554" y="155" width="122" height="30" fill="#fef9c3" />
      <rect x="676" y="155" width="120" height="30" rx="0" fill="#fef2f2" />
      <text x="108" y="174" fontFamily="Arial,sans-serif" fontSize="8" fill="#4c1d95" textAnchor="middle">System (1500 tok)</text>
      <text x="262" y="174" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Examples (750)</text>
      <text x="432" y="174" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">RAG Context (2000 tok)</text>
      <text x="614" y="174" fontFamily="Arial,sans-serif" fontSize="8" fill="#713f12" textAnchor="middle">User (950 tok)</text>
      <text x="736" y="174" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">Output budget</text>

      <text x="410" y="205" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">CONTEXT WINDOW: 128K tokens total · Input tokens = cost · Output tokens = cost × 3 typically</text>
      <text x="410" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Prefix caching: system prompt + examples KV computed once, reused across requests → 60-80% latency + cost reduction</text>

      <defs>
        <marker id="ppp1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="ppp2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0f766e" /></marker>
      </defs>
    </svg>
  );
}
