"use client";
export default function ForwardBackpropDiagram() {
  return (
    <svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fbp-title">
      <title id="fbp-title">Forward Propagation (data flow) and Backpropagation (gradient flow) in a neural network</title>
      <rect width="820" height="240" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">FORWARD PROPAGATION ↔ BACKPROPAGATION</text>

      {/* Forward path boxes */}
      {[
        { label: "INPUT DATA", sub: "Raw pixels / tokens", x: 20,  color: "#2563eb", bg: "#dbeafe" },
        { label: "LAYER 1", sub: "W₁·x + b₁ → ReLU", x: 170, color: "#7c3aed", bg: "#ede9fe" },
        { label: "LAYER 2", sub: "W₂·a₁ + b₂ → ReLU", x: 320, color: "#0369a1", bg: "#e0f2fe" },
        { label: "LAYER N", sub: "Wₙ·aₙ₋₁ + bₙ", x: 470, color: "#0f766e", bg: "#ccfbf1" },
        { label: "OUTPUT", sub: "Softmax / Sigmoid", x: 620, color: "#16a34a", bg: "#dcfce7" },
        { label: "LOSS", sub: "Cross-Entropy", x: 720, color: "#dc2626", bg: "#fef2f2" },
      ].map((b, i, arr) => (
        <g key={i}>
          <rect x={b.x} y="44" width="130" height="64" rx="8" fill={b.bg} stroke={b.color} strokeWidth="1.5" />
          <text x={b.x + 65} y="68" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={b.color} textAnchor="middle">{b.label}</text>
          <text x={b.x + 65} y="84" fontFamily="Arial,sans-serif" fontSize="8" fill={b.color} textAnchor="middle">{b.sub}</text>
          {i < arr.length - 1 && (
            <line x1={b.x + 132} y1="76" x2={arr[i + 1].x - 2} y2="76" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#fwd)" />
          )}
        </g>
      ))}

      {/* Forward label */}
      <text x="375" y="42" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#2563eb" textAnchor="middle">→ FORWARD PASS (Data Flow)</text>

      {/* Backward path */}
      <path d="M 785,145 Q 785,170 410,175 Q 35,170 35,145" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#bwd)" />
      <text x="410" y="166" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#dc2626" textAnchor="middle">← BACKWARD PASS (Gradient Flow via Chain Rule)</text>

      {/* Gradient annotations */}
      <text x="660" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">∂L/∂Wₙ</text>
      <text x="500" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">∂L/∂W₂</text>
      <text x="250" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">∂L/∂W₁</text>

      {/* Optimizer update */}
      <rect x="280" y="210" width="260" height="24" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="410" y="226" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">OPTIMIZER: W = W - lr × ∂L/∂W</text>

      <defs>
        <marker id="fwd" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#2563eb" />
        </marker>
        <marker id="bwd" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}
