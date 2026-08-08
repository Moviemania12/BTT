"use client";
export default function AiDataFlow() {
  const steps = [
    { n: "1", label: "Raw Data", sub: "Text, Images,\nVideos", color: "#475569", bg: "#f1f5f9" },
    { n: "2", label: "Cleaning", sub: "Remove noise,\ndeduplicate", color: "#0284c7", bg: "#e0f2fe" },
    { n: "3", label: "Labeling", sub: "Annotate,\ncategorize", color: "#0891b2", bg: "#ecfeff" },
    { n: "4", label: "Preprocess", sub: "Tokenize,\nformat", color: "#7c3aed", bg: "#ede9fe" },
    { n: "5", label: "Storage", sub: "Training\ndataset", color: "#16a34a", bg: "#f0fdf4" },
    { n: "6", label: "GPU Cluster", sub: "AI Compute\nNodes", color: "#9333ea", bg: "#fdf4ff" },
    { n: "7", label: "Model\nTraining", sub: "Learning from\nexamples", color: "#dc2626", bg: "#fef2f2" },
    { n: "8", label: "Checkpoint\nStorage", sub: "Save progress\nevery 30 min", color: "#ca8a04", bg: "#fefce8" },
    { n: "9", label: "Model\nRegistry", sub: "Version,\nvalidate", color: "#0f766e", bg: "#f0fdfa" },
    { n: "10", label: "Inference\nDeployment", sub: "Serve users\n24/7", color: "#16a34a", bg: "#f0fdf4" },
  ];
  return (
    <svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="adf-title">
      <title id="adf-title">AI Data Flow pipeline: Raw Data → Cleaning → Labeling → Preprocessing and Tokenization → Training Dataset in Storage → GPU Cluster (AI Compute Nodes) → Model Training → Checkpoint Storage (saved every 30 minutes) → Model Registry (versioned, validated) → Inference Deployment (serving users 24/7).</title>
      <rect width="820" height="240" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI DATA FLOW — From Raw Data to Deployed AI Model</text>

      {steps.map((s, i) => {
        const x = 12 + i * 79;
        return (
          <g key={s.n}>
            <rect x={x} y={32} width={72} height={155} rx="7" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
            <circle cx={x + 36} cy={56} r="16" fill={s.color} />
            <text x={x + 36} y={61} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle">{s.n}</text>
            {s.label.split("\n").map((line, li) => (
              <text key={li} x={x + 36} y={87 + li * 12} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={s.color} textAnchor="middle">{line}</text>
            ))}
            {s.sub.split("\n").map((line, li) => (
              <text key={li} x={x + 36} y={116 + li * 11} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <line x1={x + 74} y1={109} x2={x + 79} y2={109} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#adf-ar)" />
            )}
          </g>
        );
      })}

      {/* Checkpoint loop arrow */}
      <path d="M 635 187 Q 635 210 463 210 Q 291 210 291 187" stroke="#ca8a04" strokeWidth="1.5" fill="none" strokeDasharray="5,3" markerEnd="url(#adf-ar2)" />
      <text x="463" y="225" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ca8a04" textAnchor="middle">Checkpoints saved automatically every ~30 minutes during training</text>

      <defs>
        <marker id="adf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="adf-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ca8a04" /></marker>
      </defs>
    </svg>
  );
}
