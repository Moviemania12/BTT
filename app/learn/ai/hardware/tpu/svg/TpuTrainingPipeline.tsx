"use client";
export default function TpuTrainingPipeline() {
  const steps = [
    { step: "1", label: "Training Data", sub: "Text, images, code\nStored in GCS\n(Google Cloud Storage)", color: "#475569", bg: "#f1f5f9" },
    { step: "2", label: "Data Pipeline", sub: "tf.data / grain\nPrefetch & batch\nFeed chips faster than\nthey can consume", color: "#0369a1", bg: "#e0f2fe" },
    { step: "3", label: "XLA Compile", sub: "Python → XLA graph\nFusion optimization\nMemory layout\nFirst run slower", color: "#7c3aed", bg: "#ede9fe" },
    { step: "4", label: "TPU Forward Pass", sub: "Input through\nall model layers\nSystolic arrays doing\nmatrix multiplications", color: "#9333ea", bg: "#fdf4ff" },
    { step: "5", label: "Loss Calculation", sub: "How wrong was\nthe prediction?\nCross-entropy\nperplexity score", color: "#dc2626", bg: "#fef2f2" },
    { step: "6", label: "Backpropagation", sub: "Gradients computed\nby all TPU chips\nAll-reduce across\nPod (ICI network)", color: "#ca8a04", bg: "#fef9c3" },
    { step: "7", label: "Weight Update", sub: "Optimizer adjusts\nmodel parameters\nAdamW / Adafactor\nBetter next step!", color: "#16a34a", bg: "#dcfce7" },
  ];
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ttp-title">
      <title id="ttp-title">TPU Training Pipeline: Data Storage → Data Pipeline (prefetch) → XLA Compiler → TPU Forward Pass (matrix multiply) → Loss Calculation → Backpropagation (all-reduce across Pod) → Weight Update → repeat</title>
      <rect width="820" height="260" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TRAINING PIPELINE ON TPU — Step by Step</text>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={10 + i*114} y="40" width="106" height="168" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={63 + i*114} cy="64" r="16" fill={s.color} />
          <text x={63 + i*114} y="68" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">{s.step}</text>
          <text x={63 + i*114} y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={63 + i*114} y={108 + li*13} fontFamily="Arial,sans-serif" fontSize="7.5" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < steps.length - 1 && (
            <line x1={117 + i*114} y1="124" x2={120 + i*114} y2="124" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ttp-ar)" />
          )}
        </g>
      ))}
      {/* Loop back arrow */}
      <path d="M 810 208 Q 810 240 410 240 Q 10 240 10 208" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="5,3" markerEnd="url(#ttp-ar2)" />
      <text x="410" y="254" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Repeat thousands of times (iterations) until model converges (loss stops decreasing)</text>
      <defs>
        <marker id="ttp-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="ttp-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
