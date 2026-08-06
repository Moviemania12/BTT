"use client";
export default function TransformerArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ta-title">
      <title id="ta-title">Complete Transformer Block Architecture: Input Embedding, Positional Encoding, Multi-Head Attention, FFN, Residual Connections, Layer Norm</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TRANSFORMER BLOCK — COMPLETE ARCHITECTURE (× N layers)</text>

      {/* Input */}
      <rect x="290" y="380" width="240" height="28" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="398" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Input Tokens → Embeddings + RoPE Position Encoding</text>
      <line x1="410" y1="380" x2="410" y2="358" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Pre-norm 1 */}
      <rect x="315" y="326" width="190" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="344" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">RMSNorm (Pre-Norm)</text>
      <line x1="410" y1="326" x2="410" y2="304" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Multi-Head Attention */}
      <rect x="255" y="240" width="310" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="265" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">Multi-Head Grouped-Query Attention</text>
      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Q·Kᵀ/√dₖ → Softmax → ×V (parallel heads)</text>
      <text x="410" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Flash Attention — O(n) memory · KV Cache during inference</text>

      {/* Residual 1 */}
      <circle cx="215" cy="270" r="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="215" y="274" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ea580c" textAnchor="middle">+</text>
      <line x1="215" y1="340" x2="215" y2="270" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />
      <line x1="215" y1="270" x2="253" y2="270" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" markerEnd="url(#ta2)" />
      <line x1="215" y1="380" x2="215" y2="340" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />
      <line x1="410" y1="240" x2="410" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Pre-norm 2 */}
      <rect x="315" y="188" width="190" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="206" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">RMSNorm (Pre-Norm)</text>
      <line x1="410" y1="188" x2="410" y2="166" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* FFN */}
      <rect x="255" y="100" width="310" height="62" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="124" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Feed-Forward Network (FFN)</text>
      <text x="410" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Linear → SwiGLU/GELU → Linear (4× expansion)</text>
      <text x="410" y="154" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Knowledge storage · Per-token transformation · 2/3 of compute</text>

      {/* Residual 2 */}
      <circle cx="605" cy="131" r="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="605" y="135" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ea580c" textAnchor="middle">+</text>
      <line x1="605" y1="210" x2="605" y2="131" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />
      <line x1="605" y1="131" x2="567" y2="131" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" markerEnd="url(#ta2)" />
      <line x1="605" y1="380" x2="605" y2="210" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />

      {/* Output */}
      <line x1="410" y1="100" x2="410" y2="78" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />
      <rect x="290" y="46" width="240" height="28" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">Block Output → Next Block or LM Head</text>

      {/* Labels */}
      <text x="175" y="308" fontFamily="Arial,sans-serif" fontSize="8" fill="#ea580c" textAnchor="middle">Residual</text>
      <text x="175" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#ea580c" textAnchor="middle">connection</text>
      <text x="640" y="180" fontFamily="Arial,sans-serif" fontSize="8" fill="#ea580c" textAnchor="middle">Residual</text>
      <text x="640" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#ea580c" textAnchor="middle">connection</text>

      <defs>
        <marker id="ta1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" /></marker>
        <marker id="ta2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#ea580c" /></marker>
      </defs>
    </svg>
  );
}
