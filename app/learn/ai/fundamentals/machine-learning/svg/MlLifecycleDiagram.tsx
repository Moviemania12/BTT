"use client";
export default function MlLifecycleDiagram() {
  const steps = [
    { label: "Collect", sub: "Data ingestion\npipelines", color: "#2563eb", bg: "#dbeafe", x: 60 },
    { label: "Clean", sub: "Validate, dedupe\nnormalise", color: "#7c3aed", bg: "#ede9fe", x: 170 },
    { label: "Train", sub: "GPU clusters\ndistributed", color: "#0369a1", bg: "#e0f2fe", x: 280 },
    { label: "Validate", sub: "Metrics, bias\ntesting", color: "#0f766e", bg: "#ccfbf1", x: 390 },
    { label: "Deploy", sub: "Serving, A/B\ncanary", color: "#16a34a", bg: "#dcfce7", x: 500 },
    { label: "Monitor", sub: "Drift, perf\nalerts", color: "#ca8a04", bg: "#fef9c3", x: 610 },
    { label: "Retrain", sub: "Automated\ntriggers", color: "#ea580c", bg: "#ffedd5", x: 720 },
  ];
  return (
    <svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mlc-title">
      <title id="mlc-title">Complete ML Lifecycle: Collect → Clean → Train → Validate → Deploy → Monitor → Retrain</title>
      <rect width="820" height="200" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">COMPLETE ML LIFECYCLE</text>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="40" width="90" height="110" rx="10" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={s.x + 45} cy="66" r="16" fill={s.color} />
          <text x={s.x + 45} y="71" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle">{i + 1}</text>
          <text x={s.x + 45} y="96" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 45} y={112 + li * 13} fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">{line}</text>
          ))}
          {i < steps.length - 1 && (
            <path d={`M${s.x + 92},95 L${s.x + 108},95`} stroke={s.color} strokeWidth="1.5" markerEnd="url(#arr)" />
          )}
        </g>
      ))}
      <path d="M750,160 Q410,190 60,160" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeDasharray="5,3" markerEnd="url(#arr2)" />
      <text x="410" y="188" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Retire → Archive → Version bump → Continuous loop</text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
        <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
