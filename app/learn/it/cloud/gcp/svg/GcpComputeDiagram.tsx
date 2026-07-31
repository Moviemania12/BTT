"use client";
export default function GcpComputeDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gcomp-title">
      <title id="gcomp-title">GCP Compute Services: Compute Engine, GKE, Cloud Run, Cloud Functions</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP COMPUTE SERVICES — ABSTRACTION LEVELS</text>

      {[
        { x: 20, title: "Compute Engine (IaaS)", color: "#4285F4", bg: "#eff6ff", sub: "Full VM control", you: "OS, runtime, app, patches", gcp: "Hardware, hypervisor", dc: "Physical server → KVM VM" },
        { x: 220, title: "GKE (Managed K8s)", color: "#34A853", bg: "#f0fdf4", sub: "Managed control plane", you: "Node pools, workloads", gcp: "K8s control plane, upgrades", dc: "K8s cluster on bare metal" },
        { x: 420, title: "Cloud Run (Serverless)", color: "#FBBC04", bg: "#fefce8", sub: "Container, no servers", you: "Container image only", gcp: "Infra, scaling, network", dc: "Ephemeral container runtime" },
        { x: 620, title: "Cloud Functions (FaaS)", color: "#EA4335", bg: "#fef2f2", sub: "Function, fully managed", you: "Function code only", gcp: "Everything else", dc: "Lambda-equivalent ephemeral" },
      ].map(({ x, title, color, bg, sub, you, gcp, dc }) => (
        <g key={x}>
          <rect x={x} y={36} width={190} height={160} rx="8" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={36} width={190} height={28} rx="7" fill={color} />
          <text x={x + 95} y={54} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x + 95} y={80} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={color} textAnchor="middle">{sub}</text>
          <text x={x + 10} y={100} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">You manage:</text>
          <text x={x + 10} y={114} fontFamily="Arial,sans-serif" fontSize="7.5" fill={color}>{you}</text>
          <text x={x + 10} y={132} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">GCP manages:</text>
          <text x={x + 10} y={146} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">{gcp}</text>
          <text x={x + 10} y={164} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9ca3af">DC: {dc}</text>
          <rect x={x} y={172} width={190} height={4} rx="2" fill={color} fillOpacity="0.2" />
        </g>
      ))}

      {/* Compute Engine detail */}
      <rect x="20" y="210" width="380" height="136" rx="8" fill="#eff6ff" stroke="#4285F4" strokeWidth="1.5" />
      <text x="210" y="228" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">COMPUTE ENGINE — VM DETAILS</text>
      {[
        "Machine families: E2 (general), N2/N4 (balanced), C3 (compute opt), M3 (memory opt), A3 (GPU/AI)",
        "Preemptible VMs: up to 91% cheaper, 30-sec notice, max 24hr — batch/fault-tolerant workloads",
        "Spot VMs: up to 91% cheaper, 30-sec notice, no 24hr limit — prefer Spot over Preemptible for new",
        "Sustained Use Discounts (SUDs): automatic, no commitment — up to 30% for full-month usage",
        "Committed Use Discounts (CUDs): 1yr/3yr commitment — up to 57%/70% — resource or spend-based",
        "Managed Instance Groups (MIGs): autoscaling, autohealing, rolling updates — like AWS ASG",
      ].map((line, i) => (
        <text key={i} x="32" y={246 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.8" fill="#374151">• {line}</text>
      ))}

      {/* GKE detail */}
      <rect x="420" y="210" width="380" height="136" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="1.5" />
      <text x="610" y="228" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">GKE — KUBERNETES DETAILS</text>
      {[
        "GKE Standard: you manage node pools (machine type, count, OS). Full control.",
        "GKE Autopilot: Google manages nodes. You deploy pods. Billed per pod (CPU+mem requested).",
        "Cluster types: Zonal (single zone, dev/test), Regional (3 zones, HA — recommended for prod)",
        "Node pools: different machine types per pool — system pool + app pool best practice",
        "GKE Autopilot limitations: no DaemonSets, privileged pods restricted — check workload compat",
        "Workload Identity: pods assume GCP Service Account without JSON key — preferred pattern",
      ].map((line, i) => (
        <text key={i} x="432" y={246 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.8" fill="#374151">• {line}</text>
      ))}
    </svg>
  );
}
