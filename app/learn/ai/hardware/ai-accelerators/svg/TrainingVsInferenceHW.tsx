"use client";
export default function TrainingVsInferenceHW() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tvi-title">
      <title id="tvi-title">Training vs Inference hardware: Training needs high memory capacity, high bandwidth, and backward pass support for gradient computation. Inference needs low latency, INT8 support, and cost-efficiency. Different chips are optimized for each — H100/TPU for training, Inferentia/Gaudi-inference for serving.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TRAINING vs INFERENCE — Why Different Hardware Exists for Each</text>

      {/* Training */}
      <rect x="10" y="36" width="390" height="232" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="205" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4c1d95" textAnchor="middle">TRAINING — "Building the Model"</text>

      {[
        { need: "Very high memory capacity", why: "Weights + Gradients + Optimizer states = 4× model size", icon: "💾" },
        { need: "Very high memory bandwidth", why: "Frequent weight reads/writes during backpropagation", icon: "⚡" },
        { need: "Large batch processing", why: "More samples per step = stable gradient, faster convergence", icon: "📦" },
        { need: "Forward + Backward pass", why: "Backpropagation needs both directions — more compute", icon: "↕️" },
        { need: "BF16 / FP16 precision", why: "Training stable with 16-bit; FP32 needed for some ops", icon: "🔢" },
        { need: "Scale-out interconnect", why: "Model too big for one chip — split across many", icon: "🔗" },
      ].map((r, i) => (
        <g key={r.need}>
          <rect x="22" y={66 + i * 33} width="366" height="27" rx="5" fill={i % 2 === 0 ? "#ede9fe" : "#fdf4ff"} />
          <text x="32" y={82 + i * 33} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#4c1d95">{r.icon} {r.need}</text>
          <text x="32" y={94 + i * 33} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#5b21b6">→ {r.why}</text>
        </g>
      ))}
      <rect x="22" y="262" width="366" height="0" />
      <text x="205" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c3aed" textAnchor="middle">Best chips: H100, TPU v4/v5p, AWS Trainium, Gaudi 3</text>

      {/* Inference */}
      <rect x="420" y="36" width="390" height="232" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">INFERENCE — "Using the Model"</text>

      {[
        { need: "Low latency", why: "User is waiting — response in milliseconds required", icon: "⏱️" },
        { need: "High throughput", why: "Thousands of users simultaneously — batch efficiently", icon: "👥" },
        { need: "INT8 / INT4 support", why: "Quantized model = 2–4× faster, lower memory at minimal quality loss", icon: "🔢" },
        { need: "Cost per query optimization", why: "Billions of queries/day — even $0.001 savings matters", icon: "💰" },
        { need: "Lower memory (vs training)", why: "Only weights needed — no gradients/optimizer states", icon: "💾" },
        { need: "Fast startup", why: "Stateless inference pods can start/stop quickly", icon: "🚀" },
      ].map((r, i) => (
        <g key={r.need}>
          <rect x="432" y={66 + i * 33} width="366" height="27" rx="5" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"} />
          <text x="442" y={82 + i * 33} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#14532d">{r.icon} {r.need}</text>
          <text x="442" y={94 + i * 33} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#166534">→ {r.why}</text>
        </g>
      ))}
      <text x="615" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#16a34a" textAnchor="middle">Best chips: AWS Inferentia 2, L4, L40S, TPU v5e, Gaudi 3</text>
    </svg>
  );
}
