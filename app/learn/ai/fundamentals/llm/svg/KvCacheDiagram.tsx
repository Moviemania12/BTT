"use client";
export default function KvCacheDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="kvc-title">
      <title id="kvc-title">KV Cache: Prefill Phase processes all input tokens in parallel, Decode Phase reuses cached K and V tensors for O(1) per step</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">KV CACHE — PREFILL PHASE ↔ DECODE PHASE</text>

      {/* Prefill */}
      <rect x="20" y="38" width="375" height="220" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="207" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">PREFILL PHASE (parallel)</text>

      <rect x="35" y="70" width="345" height="32" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="207" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Input Prompt Tokens [Tell] [me] [about] [AI]</text>

      <text x="207" y="120" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">All tokens → Forward pass simultaneously</text>
      <text x="207" y="135" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">(fully parallelizable, compute-bound)</text>

      <rect x="35" y="148" width="345" height="42" rx="6" fill="#1e40af" />
      <text x="207" y="167" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">KV CACHE FILL — GPU HBM</text>
      <text x="207" y="182" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">K₁,V₁ K₂,V₂ K₃,V₃ K₄,V₄ stored per layer</text>

      <text x="207" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Memory: seq_len × n_kv_heads × d_head × n_layers × 2 × 2 bytes</text>
      <text x="207" y="225" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Llama3 70B: ~320KB per token → 41GB at 128K context</text>
      <text x="207" y="244" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Result: First token generated</text>

      {/* Arrow */}
      <line x1="397" y1="148" x2="425" y2="148" stroke="#16a34a" strokeWidth="2" markerEnd="url(#kv1)" />
      <text x="411" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Reuse</text>

      {/* Decode */}
      <rect x="425" y="38" width="375" height="220" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="612" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">DECODE PHASE (sequential)</text>

      <rect x="440" y="70" width="345" height="32" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="612" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">New token [infrastructure] — only this token processed</text>

      <text x="612" y="120" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Q from new token only</text>
      <text x="612" y="135" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">K,V from cached tensors → no recomputation</text>

      <rect x="440" y="148" width="345" height="42" rx="6" fill="#16a34a" />
      <text x="612" y="167" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">O(1) PER STEP — memory-bandwidth bound</text>
      <text x="612" y="182" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">Append new K,V to cache → next step</text>

      <text x="612" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">WITHOUT KV cache: O(n²) total compute</text>
      <text x="612" y="225" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">WITH KV cache: 10-50× faster generation</text>
      <text x="612" y="244" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">PagedAttention (vLLM): virtual memory for KV cache</text>

      <text x="410" y="285" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Prefix caching: shared system prompt KV computed once, reused across thousands of requests — dramatic cost reduction</text>

      <defs>
        <marker id="kv1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
