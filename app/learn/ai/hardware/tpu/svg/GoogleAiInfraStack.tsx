"use client";
export default function GoogleAiInfraStack() {
  const layers = [
    { label: "GOOGLE AI PRODUCTS", sub: "Search, Translate, Photos, Gmail, Workspace, Bard/Gemini App, Maps, YouTube AI", bg: "#fef3c7", border: "#f59e0b", tc: "#92400e" },
    { label: "FOUNDATION MODELS", sub: "Gemini Ultra / Pro / Flash · PaLM 2 · Gemma (open-source) · Codey · Imagen · MusicLM", bg: "#fce7f3", border: "#ec4899", tc: "#831843" },
    { label: "MODEL FRAMEWORK", sub: "JAX (primary) · TensorFlow · Keras · T5X · Flax · MaxText — all XLA-compiled for TPU", bg: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { label: "TPU POD CLUSTERS", sub: "v4 Pods (4,096 chips each) · v5e / v5p · Multiple Pods across data centers · ~1 EFLOPS per Pod", bg: "#1e1b4b", border: "#7c3aed", tc: "#00d4ff" },
    { label: "TPU CHIP LAYER", sub: "MXU (Matrix Multiply) · VPU (Vector Unit) · HBM Memory · ICI Interconnect · BFloat16", bg: "#4c1d95", border: "#7c3aed", tc: "#ddd6fe" },
    { label: "DATA CENTER PHYSICAL LAYER", sub: "Liquid cooling · Custom power distribution · Optical ICI cables · Google's own facilities worldwide · Colossus storage", bg: "#1e293b", border: "#334155", tc: "#94a3b8" },
  ];
  return (
    <svg viewBox="0 0 820 318" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gais-title">
      <title id="gais-title">Google AI Infrastructure Stack from bottom to top: Data Center Physical Layer, TPU Chip Layer, TPU Pod Clusters, Model Framework (JAX/TF), Foundation Models (Gemini/PaLM), Google AI Products</title>
      <rect width="820" height="318" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GOOGLE AI INFRASTRUCTURE STACK — From Silicon to Products</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={32 + i*46} width="780" height="38" rx="6" fill={l.bg} stroke={l.border} strokeWidth="1.5" />
          <text x="30" y={47 + i*46} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x="30" y={61 + i*46} fontFamily="Arial,sans-serif" fontSize="8" fill={l.tc} opacity={0.85}>{l.sub}</text>
        </g>
      ))}
      <text x="410" y="312" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Every Google AI product you use flows through this stack — from a user query all the way down to the TPU systolic array doing matrix multiplication</text>
    </svg>
  );
}
