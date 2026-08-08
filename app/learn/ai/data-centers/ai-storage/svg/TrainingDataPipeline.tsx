"use client";
export default function TrainingDataPipeline() {
  const steps = [
    { label: "Data Sources", sub: "Web crawls, licensed\ndatasets, sensors,\nenterprise data", color: "#1e293b", x: 30 },
    { label: "Ingestion", sub: "ETL pipelines, data\nvalidation, format\nconversion", color: "#2563eb", x: 160 },
    { label: "Data Preparation", sub: "Cleaning, tokenization,\naugmentation, dedup,\nquality filtering", color: "#0891b2", x: 290 },
    { label: "Object/Archive\nStorage", sub: "Processed dataset\nstored durably at\npetabyte scale", color: "#64748b", x: 420 },
    { label: "Parallel File\nSystem (Hot)", sub: "Pre-staged training\ndata, high-throughput\naccess", color: "#ca8a04", x: 550 },
    { label: "GPU Nodes\n(Training)", sub: "Data loaders feed\nbatches to GPU HBM\nfor compute", color: "#7c3aed", x: 680 },
  ];

  return (
    <svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tdp-title">
      <title id="tdp-title">AI Training Data Pipeline: Data Sources flow through Ingestion, Data Preparation, Object/Archive Storage, Parallel File System (Hot tier), and finally to GPU Nodes for training. Checkpoints flow back from GPU Nodes to storage.</title>
      <rect width="820" height="200" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI TRAINING DATA PIPELINE</text>

      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="30" width="118" height="70" rx="6" fill={s.color} />
          {s.label.split("\n").map((line, li) => (
            <text key={li} x={s.x + 59} y={47 + li * 13} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{line}</text>
          ))}
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 59} y={73 + li * 10} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">{line}</text>
          ))}
          {i < steps.length - 1 && (
            <line x1={s.x + 118} y1={65} x2={s.x + 130} y2={65} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#tdp-ar)" />
          )}
        </g>
      ))}

      {/* Checkpoint back-arrow */}
      <path d="M 739 108 Q 739 150 410 150 Q 81 150 81 108" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#tdp-ar-red)" />
      <text x="410" y="165" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle" fontWeight="700">Checkpoints → Shared/Object Storage</text>

      {/* Final model */}
      <rect x="680" y="115" width="118" height="30" rx="5" fill="#16a34a" />
      <text x="739" y="133" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Trained Model → Model Registry</text>

      <defs>
        <marker id="tdp-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="tdp-ar-red" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}
