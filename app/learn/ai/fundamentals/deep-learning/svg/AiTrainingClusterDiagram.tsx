"use client";
export default function AiTrainingClusterDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="atc-title">
      <title id="atc-title">AI Training Cluster Architecture: Users to MLOps to Kubernetes to DGX nodes to InfiniBand to storage</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI TRAINING CLUSTER ARCHITECTURE</text>

      {/* Users */}
      <rect x="310" y="36" width="200" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="55" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">👤 ML Engineers / Researchers</text>

      {/* MLOps */}
      <rect x="260" y="84" width="300" height="30" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="103" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">MLOps Platform — W&B · MLflow · Kubeflow Pipelines</text>

      {/* Kubernetes */}
      <rect x="240" y="132" width="340" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="151" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Kubernetes + NVIDIA GPU Operator · Volcano / Run:AI Scheduler</text>

      {/* DGX nodes */}
      <rect x="40" y="180" width="740" height="80" rx="10" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      <text x="410" y="200" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#075985" textAnchor="middle">DGX / HGX H100 NODES</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <g key={i}>
          <rect x={55 + i * 90} y="210" width="80" height="40" rx="5" fill="#2563eb" />
          <text x={95 + i * 90} y="228" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Node {i + 1}</text>
          <text x={95 + i * 90} y="242" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">8× H100</text>
        </g>
      ))}

      {/* InfiniBand */}
      <rect x="60" y="278" width="700" height="36" rx="8" fill="#1e293b" stroke="#00d4ff" strokeWidth="1.5" />
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">InfiniBand NDR 400Gbps — Non-Blocking Fat-Tree Fabric</text>
      <text x="410" y="308" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">NCCL All-Reduce · RDMA · Sub-microsecond latency</text>

      {/* Storage */}
      <rect x="60" y="332" width="340" height="50" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="240" y="352" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Parallel File System</text>
      <text x="240" y="366" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Lustre / Weka / GPFS · 100s GB/s · Training Data</text>
      <text x="240" y="376" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Feature Store · Dataset Cache</text>

      <rect x="420" y="332" width="340" height="50" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="590" y="352" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Checkpoint Storage</text>
      <text x="590" y="366" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">NVMe SSDs (fast) + Object Store (archive)</text>
      <text x="590" y="376" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Async checkpoint · Model registry</text>

      {/* Arrows */}
      <line x1="410" y1="66" x2="410" y2="84" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />
      <line x1="410" y1="114" x2="410" y2="132" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />
      <line x1="410" y1="162" x2="410" y2="180" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />
      <line x1="410" y1="260" x2="410" y2="278" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />
      <line x1="240" y1="314" x2="240" y2="332" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />
      <line x1="590" y1="314" x2="590" y2="332" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#atc1)" />

      <text x="410" y="412" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Total: 64 nodes × 8 GPUs = 512 H100s · ~5MW power · 100+ TB/s aggregate network bandwidth</text>

      <defs>
        <marker id="atc1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
