"use client";
export default function EnterpriseDeepLearningStackDiagram() {
  const layers = [
    { label: "BUSINESS APPLICATIONS", sub: "Fraud detection · Medical AI · Recommendations · NLP · Vision · Autonomous systems", bg: "#fef3c7", border: "#f59e0b", tc: "#92400e" },
    { label: "MODEL SERVING / APIs", sub: "REST/gRPC endpoints · Triton Inference Server · vLLM · TorchServe · KServe", bg: "#fce7f3", border: "#ec4899", tc: "#831843" },
    { label: "MLOps PLATFORM", sub: "MLflow · Kubeflow · W&B · Airflow · ArgoCD · Model Registry · CI/CD", bg: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { label: "DL FRAMEWORKS + CUDA STACK", sub: "PyTorch · TF · JAX · CUDA Runtime · cuDNN · cuBLAS · NCCL · TensorRT", bg: "#e0f2fe", border: "#0369a1", tc: "#075985" },
    { label: "COMPUTE — GPU CLUSTERS", sub: "H100/B200/A100 · NVLink/NVSwitch · DGX/HGX · CUDA Cores + Tensor Cores", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { label: "DATA + STORAGE INFRASTRUCTURE", sub: "Parallel FS (Lustre/Weka/GPFS) · Feature Store · Data Lake (S3/GCS) · NVMe Cache", bg: "#dcfce7", border: "#16a34a", tc: "#14532d" },
    { label: "NETWORKING FABRIC", sub: "InfiniBand NDR 400G · Non-Blocking Fat-Tree · RDMA · NCCL All-Reduce", bg: "#ccfbf1", border: "#0f766e", tc: "#134e4a" },
    { label: "PHYSICAL INFRASTRUCTURE", sub: "AI Data Center · 40-100kW/rack Power · Liquid Cooling (DLC/Immersion) · Fire · BMS", bg: "#f1f5f9", border: "#94a3b8", tc: "#1e293b" },
  ];
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="edls-title">
      <title id="edls-title">Enterprise Deep Learning Stack: Physical infrastructure to business applications — 8 layers</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE DEEP LEARNING STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={32 + i * 42} width="780" height="34" rx="6" fill={l.bg} stroke={l.border} strokeWidth="1.5" />
          <text x="30" y={46 + i * 42} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x="30" y={59 + i * 42} fontFamily="Arial,sans-serif" fontSize="8" fill={l.tc}>{l.sub}</text>
        </g>
      ))}
      <text x="410" y="374" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Physical infrastructure is the foundation — every AI capability is constrained by it. Deep Learning workloads touch every layer.</text>
    </svg>
  );
}
