"use client";
export default function TokenGenerationFlow() {
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tgf-title">
      <title id="tgf-title">Token Generation Process: Autoregressive decoding step by step — prompt tokens in, one token out per step</title>
      <rect width="820" height="260" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TOKEN GENERATION — AUTOREGRESSIVE DECODING</text>

      {/* Input prompt tokens */}
      <rect x="20" y="38" width="480" height="42" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="260" y="55" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">INPUT PROMPT (Tokenized)</text>
      {["▼Tell", "▼me", "▼about", "▼deep", "▼learn"].map((t, i) => (
        <g key={i}>
          <rect x={28 + i * 92} y="62" width="84" height="10" rx="2" fill="#2563eb" />
          <text x={70 + i * 92} y="70" fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">{t}</text>
        </g>
      ))}

      {/* LLM box */}
      <rect x="20" y="96" width="480" height="60" rx="8" fill="#0f172a" stroke="#00d4ff" strokeWidth="2" />
      <text x="260" y="120" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#00d4ff" textAnchor="middle">LLM — 70B TRANSFORMER</text>
      <text x="260" y="136" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">96 Transformer layers · Multi-Head Attention · Feed-Forward</text>
      <text x="260" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">KV Cache: previous tokens cached in HBM · Only new token computed</text>

      {/* Logits */}
      <rect x="20" y="172" width="480" height="34" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="260" y="187" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">LOGITS over Vocabulary (128K tokens)</text>
      <text x="260" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">SoftMax → Probabilities · Sampling (temperature, top-p, top-k)</text>

      {/* Sampled token */}
      <rect x="20" y="218" width="480" height="30" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="260" y="237" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">SAMPLED TOKEN: "▼ing" → Append → Feed back as input → Repeat</text>

      {/* Loop arrow */}
      <path d="M502,156 Q560,156 560,237 Q560,248 502,248" stroke="#16a34a" strokeWidth="1.5" fill="none" markerEnd="url(#tgf1)" strokeDasharray="5,3" />
      <text x="578" y="204" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#16a34a">LOOP</text>
      <text x="575" y="218" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a">until EOS</text>
      <text x="575" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a">or max_len</text>

      {/* Cost annotation */}
      <rect x="620" y="38" width="184" height="152" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="712" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">COMPUTE COST</text>
      <text x="712" y="76" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">70B model forward pass:</text>
      <text x="712" y="90" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ea580c" textAnchor="middle">~70B FLOPs per token</text>
      <text x="712" y="106" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">H100: ~2 PFLOPS BF16</text>
      <text x="712" y="120" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">→ 35ms per token</text>
      <text x="712" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">1000 tokens/sec target</text>
      <text x="712" y="154" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ea580c" textAnchor="middle">→ 70 TFLOPS dedicated</text>
      <text x="712" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">100K concurrent users:</text>
      <text x="712" y="184" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">→ 7 PFLOPS needed</text>

      <text x="410" y="254" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Sequential dependency: token N requires all tokens 1..N-1 → KV cache critical for throughput</text>

      <defs>
        <marker id="tgf1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#16a34a" />
        </marker>
      </defs>
    </svg>
  );
}
