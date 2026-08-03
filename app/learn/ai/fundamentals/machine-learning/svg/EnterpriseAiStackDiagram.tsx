"use client";
export default function EnterpriseAiStackDiagram() {
  const layers = [
    { label: "BUSINESS APPLICATIONS", sub: "Fraud detection · Recommendations · Forecasting · NLP · Vision", bg: "#fef3c7", border: "#f59e0b", tc: "#92400e" },
    { label: "AI/ML SERVICES", sub: "Model APIs · Prediction services · Batch scoring · LLM endpoints", bg: "#fce7f3", border: "#ec4899", tc: "#831843" },
    { label: "MLOps PLATFORM", sub: "MLflow · Kubeflow · Airflow · W&B · CI/CD pipelines · Model registry", bg: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { label: "ML FRAMEWORKS & RUNTIMES", sub: "PyTorch · TensorFlow · JAX · scikit-learn · XGBoost · Triton · vLLM", bg: "#e0f2fe", border: "#0369a1", tc: "#075985" },
    { label: "COMPUTE INFRASTRUCTURE", sub: "GPU clusters (H100/A100) · TPU pods · CPU inference · Kubernetes · Slurm", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { label: "DATA INFRASTRUCTURE", sub: "Data Lake (S3/GCS) · Feature Store · Data Warehouse · Streaming (Kafka) · Spark", bg: "#dcfce7", border: "#16a34a", tc: "#14532d" },
    { label: "PHYSICAL INFRASTRUCTURE", sub: "Data Center · Power (40-100kW/rack) · Liquid Cooling · InfiniBand · Parallel Storage", bg: "#f1f5f9", border: "#94a3b8", tc: "#1e293b" },
  ];
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="eas-title">
      <title id="eas-title">Enterprise AI Stack: Physical Infrastructure to Business Applications</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE AI STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={36 + i * 47} width="780" height="40" rx="6" fill={l.bg} stroke={l.border} strokeWidth="1.5" />
          <text x="30" y={52 + i * 47} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x="30" y={66 + i * 47} fontFamily="Arial,sans-serif" fontSize="8" fill={l.tc}>{l.sub}</text>
        </g>
      ))}
      <text x="410" y="372" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Each layer depends on all layers below it. Physical infrastructure is the foundation — every AI initiative ultimately constrained by it.</text>
    </svg>
  );
}
