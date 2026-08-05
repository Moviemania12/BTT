"use client";
export default function CudaSoftwareStackDiagram() {
  const layers = [
    { label: "APPLICATION", sub: "Training scripts · Notebooks · APIs", color: "#ca8a04", bg: "#fef9c3" },
    { label: "PyTorch / TensorFlow / JAX", sub: "High-level DL framework", color: "#7c3aed", bg: "#ede9fe" },
    { label: "CUDA Runtime (libcudart)", sub: "Memory management · Kernel launch · Streams", color: "#2563eb", bg: "#dbeafe" },
    { label: "cuDNN + cuBLAS + NCCL", sub: "Deep learning primitives · Linear algebra · Collective communications", color: "#0369a1", bg: "#e0f2fe" },
    { label: "CUDA Driver (libcuda)", sub: "Kernel scheduling · Context management", color: "#0f766e", bg: "#ccfbf1" },
    { label: "GPU HARDWARE", sub: "SM Cores · Tensor Cores · HBM3 · NVLink", color: "#111827", bg: "#f1f5f9" },
  ];
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="css-title">
      <title id="css-title">CUDA Software Stack: Application to GPU Hardware — layers of abstraction in Deep Learning compute</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CUDA SOFTWARE STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="80" y={38 + i * 48} width="660" height="38" rx="8" fill={l.bg} stroke={l.color} strokeWidth="1.5" />
          <text x="410" y={53 + i * 48} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={l.color} textAnchor="middle">{l.label}</text>
          <text x="410" y={67 + i * 48} fontFamily="Arial,sans-serif" fontSize="8" fill={l.color} textAnchor="middle">{l.sub}</text>
          {i < layers.length - 1 && (
            <line x1="410" y1={76 + i * 48} x2="410" y2={84 + i * 48} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#cs1)" />
          )}
        </g>
      ))}
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PyTorch calls cuDNN for convolution → cuDNN calls CUDA Runtime → CUDA Driver schedules on GPU SM cores</text>
      <defs>
        <marker id="cs1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
