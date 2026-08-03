"use client";
export default function MlInfraArchDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mlia-title">
      <title id="mlia-title">ML Infrastructure Architecture: Data Lake to Feature Store to Training Cluster to Model Registry to Serving</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ML INFRASTRUCTURE ARCHITECTURE</text>

      {/* Data Lake */}
      <rect x="20" y="40" width="150" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="95" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">DATA LAKE</text>
      <text x="95" y="84" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">S3 / GCS / ADLS</text>
      <text x="95" y="97" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Raw + processed data</text>
      <text x="95" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Petabyte scale</text>

      {/* Feature Store */}
      <rect x="20" y="150" width="150" height="80" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="95" y="178" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">FEATURE STORE</text>
      <text x="95" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Online: Redis</text>
      <text x="95" y="207" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Offline: BigQuery/Hive</text>
      <text x="95" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Feast / Tecton / Vertex</text>

      {/* Training Cluster */}
      <rect x="230" y="80" width="180" height="120" rx="8" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      <text x="320" y="108" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#075985" textAnchor="middle">TRAINING CLUSTER</text>
      <text x="320" y="124" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">GPU / TPU / Custom ASIC</text>
      <text x="320" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">InfiniBand / NVLink</text>
      <text x="320" y="150" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">PyTorch / TF / JAX</text>
      <text x="320" y="163" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">FSDP / DeepSpeed / Megatron</text>
      <text x="320" y="176" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Slurm / Kubernetes</text>
      <text x="320" y="189" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Experiment Tracking (W&amp;B)</text>

      {/* Model Registry */}
      <rect x="470" y="80" width="150" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="545" y="108" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">MODEL REGISTRY</text>
      <text x="545" y="124" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">MLflow / SageMaker</text>
      <text x="545" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Version control</text>
      <text x="545" y="150" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Model cards + lineage</text>

      {/* Model Serving */}
      <rect x="470" y="190" width="150" height="80" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="545" y="218" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">MODEL SERVING</text>
      <text x="545" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Triton / vLLM / TorchServe</text>
      <text x="545" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">A/B test · Canary · Shadow</text>
      <text x="545" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">REST / gRPC endpoints</text>

      {/* Monitoring */}
      <rect x="680" y="80" width="120" height="80" rx="8" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
      <text x="740" y="108" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">MONITORING</text>
      <text x="740" y="124" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Data drift detection</text>
      <text x="740" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Model performance</text>
      <text x="740" y="150" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Prometheus + Grafana</text>

      {/* Retraining */}
      <rect x="680" y="190" width="120" height="80" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
      <text x="740" y="218" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#831843" textAnchor="middle">RETRAINING</text>
      <text x="740" y="234" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Airflow / Kubeflow</text>
      <text x="740" y="247" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Drift triggers</text>
      <text x="740" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Automated pipelines</text>

      {/* Arrows */}
      <line x1="170" y1="80" x2="228" y2="120" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="170" y1="190" x2="228" y2="155" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="410" y1="140" x2="468" y2="120" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="410" y1="140" x2="468" y2="230" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="620" y1="120" x2="678" y2="120" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="620" y1="230" x2="678" y2="230" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <line x1="740" y1="270" x2="740" y2="300" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="740" y1="300" x2="320" y2="300" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="320" y1="300" x2="320" y2="202" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a1)" />
      <text x="530" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Automated retraining loop</text>

      <defs>
        <marker id="a1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
