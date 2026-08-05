"use client";
export default function KubernetesAiPlatformDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="kap-title">
      <title id="kap-title">Kubernetes AI Platform: GPU Operator, Kubeflow, KServe, Helm, ArgoCD for enterprise ML deployment</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">KUBERNETES AI PLATFORM</text>

      {/* Outer K8s border */}
      <rect x="20" y="36" width="780" height="265" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">KUBERNETES CLUSTER</text>

      {/* GPU Operator */}
      <rect x="40" y="66" width="160" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">NVIDIA GPU Operator</text>
      <text x="120" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">GPU drivers · CUDA</text>
      <text x="120" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">DCGM · MIG config</text>

      {/* Kubeflow */}
      <rect x="220" y="66" width="160" height="60" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">Kubeflow</text>
      <text x="300" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Training jobs</text>
      <text x="300" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Pipelines · Notebooks</text>

      {/* KServe */}
      <rect x="400" y="66" width="160" height="60" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="480" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">KServe</text>
      <text x="480" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Model serving</text>
      <text x="480" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Autoscaling · Canary</text>

      {/* ArgoCD / Helm */}
      <rect x="580" y="66" width="200" height="60" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="680" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Helm + ArgoCD</text>
      <text x="680" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">GitOps deployment</text>
      <text x="680" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Chart versioning · CD</text>

      {/* Node pools */}
      <text x="410" y="152" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">NODE POOLS</text>
      <rect x="40" y="160" width="220" height="52" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="150" y="180" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">GPU Training Nodes</text>
      <text x="150" y="195" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">HGX H100 · taint: gpu=training</text>
      <text x="150" y="207" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Resource: nvidia.com/gpu: 8</text>

      <rect x="280" y="160" width="200" height="52" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1" />
      <text x="380" y="180" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">GPU Inference Nodes</text>
      <text x="380" y="195" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">A10G / L4 · Triton pods</text>
      <text x="380" y="207" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">HPA: GPU utilization 70%</text>

      <rect x="500" y="160" width="200" height="52" rx="6" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1" />
      <text x="600" y="180" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#075985" textAnchor="middle">CPU / Control Nodes</text>
      <text x="600" y="195" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Airflow · MLflow · Monitoring</text>
      <text x="600" y="207" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Prometheus · Grafana</text>

      {/* Bottom bar */}
      <rect x="40" y="230" width="740" height="58" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="410" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">GANG SCHEDULING (Volcano / Run:AI)</text>
      <text x="410" y="265" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">All GPUs for a distributed training job allocated atomically — prevents partial allocation deadlock</text>
      <text x="410" y="279" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Queue management · Priority scheduling · Quota enforcement per team/project</text>

      <text x="410" y="310" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Kubernetes + GPU Operator = cloud-native GPU orchestration for production AI at enterprise scale</text>
    </svg>
  );
}
