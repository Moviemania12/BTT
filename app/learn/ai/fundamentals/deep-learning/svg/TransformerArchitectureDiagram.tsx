"use client";
export default function TransformerArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ta-title">
      <title id="ta-title">Transformer Architecture: Multi-Head Self-Attention, Feed-Forward, Layer Norm, Residual Connections</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TRANSFORMER BLOCK (× N layers)</text>

      {/* Input */}
      <rect x="300" y="340" width="220" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="359" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Input Embeddings + Positional Encoding</text>
      <line x1="410" y1="340" x2="410" y2="310" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Layer Norm 1 */}
      <rect x="330" y="278" width="160" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Layer Normalization</text>
      <line x1="410" y1="278" x2="410" y2="248" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Multi-head attention */}
      <rect x="270" y="196" width="280" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="218" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">Multi-Head Self-Attention</text>
      <text x="410" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Q · Kᵀ / √dₖ → Softmax → × V (h heads parallel)</text>

      {/* Residual add 1 */}
      <circle cx="410" cy="178" r="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="410" y="182" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ea580c" textAnchor="middle">+</text>
      <line x1="550" y1="310" x2="550" y2="178" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />
      <line x1="550" y1="178" x2="424" y2="178" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" markerEnd="url(#ta2)" />
      <text x="570" y="245" fontFamily="Arial,sans-serif" fontSize="8" fill="#ea580c">Residual</text>
      <line x1="410" y1="196" x2="410" y2="192" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />
      <line x1="410" y1="166" x2="410" y2="138" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* Layer Norm 2 */}
      <rect x="330" y="106" width="160" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="124" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Layer Normalization</text>
      <line x1="410" y1="106" x2="410" y2="78" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ta1)" />

      {/* FFN */}
      <rect x="280" y="38" width="260" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Feed-Forward Network</text>
      <text x="410" y="68" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Linear → GELU → Linear (4× expansion)</text>

      {/* Residual add 2 */}
      <circle cx="250" cy="56" r="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="250" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ea580c" textAnchor="middle">+</text>
      <line x1="250" y1="138" x2="250" y2="56" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" />
      <line x1="250" y1="56" x2="278" y2="56" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5,3" markerEnd="url(#ta2)" />

      <defs>
        <marker id="ta1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
        <marker id="ta2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#ea580c" />
        </marker>
      </defs>
    </svg>
  );
}
