"use client";
export default function AzureComputeDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ac-title">
      <title id="ac-title">Azure Compute Services: VMs, App Service, AKS, Functions</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE COMPUTE SERVICES — ABSTRACTION LEVELS</text>

      {[
        { x: 20, title: "Azure VM (IaaS)", color: "#475569", bg: "#f8fafc", sub: "Full OS control", you: "OS, runtime, app, patches", azure: "Hardware, hypervisor, host", dc: "Physical server → Hyper-V VM" },
        { x: 220, title: "VM Scale Set", color: "#2563EB", bg: "#eff6ff", sub: "Auto-scale VMs", you: "App, OS config, scale rules", azure: "Scaling orchestration", dc: "Server farm + autoscaler" },
        { x: 420, title: "App Service (PaaS)", color: "#7c3aed", bg: "#faf5ff", sub: "Managed web/API", you: "Code + config only", azure: "OS, runtime, scaling, SSL", dc: "Web server farm managed" },
        { x: 620, title: "Azure Functions", color: "#16a34a", bg: "#f0fdf4", sub: "Serverless", you: "Function code only", azure: "Everything including scaling", dc: "Ephemeral compute units" },
      ].map(({ x, title, color, bg, sub, you, azure, dc }) => (
        <g key={x}>
          <rect x={x} y={36} width={190} height={160} rx="8" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={36} width={190} height={28} rx="7" fill={color} />
          <text x={x + 95} y={54} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x + 95} y={79} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={color} textAnchor="middle">{sub}</text>
          <text x={x + 10} y={98} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">You manage:</text>
          <text x={x + 10} y={113} fontFamily="Arial,sans-serif" fontSize="7.5" fill={color}>{you}</text>
          <text x={x + 10} y={132} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">Azure manages:</text>
          <text x={x + 10} y={147} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">{azure}</text>
          <text x={x + 10} y={166} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9ca3af">DC: {dc}</text>
          <rect x={x} y={172} width={190} height={4} rx="2" fill={color} fillOpacity="0.3" />
        </g>
      ))}

      {/* AKS */}
      <rect x="20" y="210" width="380" height="150" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="210" y="230" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">AKS — Azure Kubernetes Service</text>
      <rect x="36" y="240" width="348" height="32" rx="5" fill="#dbeafe" />
      <text x="210" y="254" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af" textAnchor="middle">Azure manages Kubernetes control plane (API server, etcd, scheduler)</text>
      <text x="210" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">You manage: worker node pools (VM size, count, OS)</text>
      {[
        "Node Pool 1: System (D4s_v3) — cluster services",
        "Node Pool 2: User (D8s_v3) — app workloads",
        "Cluster Autoscaler: scale node pools by demand",
        "Azure CNI: pods get real VNet IPs (NSG applies)",
        "Managed Identity: no credential management",
      ].map((item, i) => (
        <text key={i} x={36} y={290 + i * 14} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">• {item}</text>
      ))}

      {/* Container Instances */}
      <rect x="420" y="210" width="380" height="150" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="610" y="230" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#6b21a8" textAnchor="middle">Azure Container Instances (ACI) + Batch</text>
      <rect x="436" y="240" width="348" height="32" rx="5" fill="#e9d5ff" />
      <text x="610" y="254" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#6b21a8" textAnchor="middle">ACI: serverless containers — no cluster management</text>
      <text x="610" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Per-second billing. Dev/test, burst workloads, CI runners.</text>
      {[
        "Azure Batch: large-scale parallel HPC workloads",
        "Azure Container Apps: managed K8s with Dapr/KEDA",
        "VM Sizes: B (burstable), D (general), E (memory)",
        "N-series: GPU (NVIDIA T4/V100/A100) for ML/HPC",
        "Spot VMs: 60-90% discount, can be evicted",
      ].map((item, i) => (
        <text key={i} x={436} y={290 + i * 14} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">• {item}</text>
      ))}
    </svg>
  );
}
