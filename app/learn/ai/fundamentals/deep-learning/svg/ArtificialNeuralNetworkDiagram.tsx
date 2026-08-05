"use client";
export default function ArtificialNeuralNetworkDiagram() {
  const layers = [
    { label: "INPUT", nodes: 4, x: 60,  color: "#2563eb", bg: "#dbeafe" },
    { label: "HIDDEN 1", nodes: 5, x: 220, color: "#7c3aed", bg: "#ede9fe" },
    { label: "HIDDEN 2", nodes: 5, x: 380, color: "#0369a1", bg: "#e0f2fe" },
    { label: "OUTPUT", nodes: 3, x: 540, color: "#16a34a", bg: "#dcfce7" },
  ];
  const nodeY = (total: number, i: number) => 60 + (200 - (total - 1) * 38) / 2 + i * 38;
  return (
    <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ann-title">
      <title id="ann-title">Artificial Neural Network: Input Layer, Hidden Layers, Output Layer with weighted connections</title>
      <rect width="640" height="300" fill="#ffffff" />
      <text x="320" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ARTIFICIAL NEURAL NETWORK</text>
      {/* Connections */}
      {layers.slice(0, -1).map((layer, li) => {
        const next = layers[li + 1];
        return Array.from({ length: layer.nodes }).map((_, ni) =>
          Array.from({ length: next.nodes }).map((_, nj) => (
            <line key={`${li}-${ni}-${nj}`}
              x1={layer.x + 20} y1={nodeY(layer.nodes, ni)}
              x2={next.x - 20}  y2={nodeY(next.nodes, nj)}
              stroke="#e2e8f0" strokeWidth="0.8" />
          ))
        );
      })}
      {/* Nodes */}
      {layers.map((layer) =>
        Array.from({ length: layer.nodes }).map((_, ni) => (
          <g key={`${layer.label}-${ni}`}>
            <circle cx={layer.x} cy={nodeY(layer.nodes, ni)} r="18" fill={layer.bg} stroke={layer.color} strokeWidth="2" />
            <text x={layer.x} y={nodeY(layer.nodes, ni) + 4} fontFamily="Arial,sans-serif" fontSize="8" fill={layer.color} textAnchor="middle" fontWeight="700">
              {layer.label === "INPUT" ? `x${ni + 1}` : layer.label === "OUTPUT" ? `y${ni + 1}` : ""}
            </text>
          </g>
        ))
      )}
      {/* Labels */}
      {layers.map((layer) => (
        <g key={layer.label + "-label"}>
          <rect x={layer.x - 36} y="252" width="72" height="22" rx="4" fill={layer.bg} stroke={layer.color} strokeWidth="1" />
          <text x={layer.x} y="267" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={layer.color} textAnchor="middle">{layer.label}</text>
        </g>
      ))}
      {/* Weight label */}
      <text x="148" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle" transform="rotate(-30,148,148)">w₁₁</text>
      <text x="305" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle" transform="rotate(-30,305,148)">w₂₁</text>
      <text x="320" y="290" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Each connection has a learned weight. Activation = σ(Σ wᵢxᵢ + b)</text>
    </svg>
  );
}
