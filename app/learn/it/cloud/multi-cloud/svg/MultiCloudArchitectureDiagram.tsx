"use client";
export default function MultiCloudArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mca-title" style={{ width: "100%", height: "auto" }}>
      <title id="mca-title">Multi-Cloud Architecture: AWS, Azure, GCP managed through unified control plane</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD REFERENCE ARCHITECTURE</text>

      {/* Control Plane */}
      <rect x="180" y="30" width="460" height="44" rx="8" fill="#1e293b" />
      <text x="410" y="50" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#e2e8f0" textAnchor="middle">UNIFIED CONTROL PLANE</text>
      <text x="410" y="66" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">Terraform · Ansible · GitOps (ArgoCD/Flux) · Cloud Management Platform</text>

      {/* Lines to clouds */}
      <line x1="280" y1="74" x2="170" y2="100" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="410" y1="74" x2="410" y2="100" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="540" y1="74" x2="650" y2="100" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* AWS Box */}
      <rect x="20" y="100" width="240" height="230" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <rect x="20" y="100" width="240" height="26" rx="7" fill="#f97316" />
      <text x="140" y="118" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">AMAZON WEB SERVICES</text>
      {[
        ["Compute", "EC2 / ECS / Lambda / EKS"],
        ["Storage", "S3 / EBS / EFS / Glacier"],
        ["Database", "RDS / DynamoDB / Redshift"],
        ["Network", "VPC / Direct Connect / Route53"],
        ["Identity", "IAM / IAM Identity Center"],
        ["Monitor", "CloudWatch / CloudTrail / GuardDuty"],
      ].map(([label, services], i) => (
        <g key={label}>
          <rect x="30" y={134 + i * 30} width="220" height="25" rx="4" fill={i % 2 === 0 ? "#ffedd5" : "#fff7ed"} />
          <text x="38" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#c2410c">{label}:</text>
          <text x="88" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{services}</text>
        </g>
      ))}
      <rect x="30" y="315" width="220" height="10" rx="3" fill="#f97316" fillOpacity="0.2" />
      <text x="140" y="323" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">Primary: Compute + ML + Analytics</text>

      {/* Azure Box */}
      <rect x="290" y="100" width="240" height="230" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <rect x="290" y="100" width="240" height="26" rx="7" fill="#2563EB" />
      <text x="410" y="118" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">MICROSOFT AZURE</text>
      {[
        ["Compute", "Azure VM / AKS / Functions"],
        ["Storage", "Blob / Azure Files / Managed Disk"],
        ["Database", "Azure SQL / Cosmos DB / Synapse"],
        ["Network", "VNet / ExpressRoute / Azure DNS"],
        ["Identity", "Entra ID / Azure RBAC"],
        ["Monitor", "Azure Monitor / Sentinel / Defender"],
      ].map(([label, services], i) => (
        <g key={label}>
          <rect x="300" y={134 + i * 30} width="220" height="25" rx="4" fill={i % 2 === 0 ? "#dbeafe" : "#eff6ff"} />
          <text x="308" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af">{label}:</text>
          <text x="358" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{services}</text>
        </g>
      ))}
      <rect x="300" y="315" width="220" height="10" rx="3" fill="#2563EB" fillOpacity="0.2" />
      <text x="410" y="323" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">Primary: Identity + M365 + Enterprise Apps</text>

      {/* GCP Box */}
      <rect x="560" y="100" width="240" height="230" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <rect x="560" y="100" width="240" height="26" rx="7" fill="#34A853" />
      <text x="680" y="118" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">GOOGLE CLOUD (GCP)</text>
      {[
        ["Compute", "GCE / GKE / Cloud Run / Functions"],
        ["Storage", "GCS / Persistent Disk / Filestore"],
        ["Database", "Cloud SQL / Spanner / BigQuery"],
        ["Network", "Global VPC / Interconnect / Cloud DNS"],
        ["Identity", "Cloud IAM / Service Accounts"],
        ["Monitor", "Cloud Monitoring / Logging / SCC"],
      ].map(([label, services], i) => (
        <g key={label}>
          <rect x="570" y={134 + i * 30} width="220" height="25" rx="4" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"} />
          <text x="578" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d">{label}:</text>
          <text x="628" y={150 + i * 30} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{services}</text>
        </g>
      ))}
      <rect x="570" y="315" width="220" height="10" rx="3" fill="#34A853" fillOpacity="0.2" />
      <text x="680" y="323" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">Primary: Analytics + AI/ML + BigQuery</text>

      {/* Cross-cloud connectivity bar */}
      <rect x="20" y="342" width="780" height="48" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="410" y="360" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">CROSS-CLOUD CONNECTIVITY LAYER</text>
      <text x="410" y="375" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">SD-WAN / Equinix Fabric / Megaport · Site-to-Site VPN · Colocation cross-connect · Global Traffic Manager / DNS load balancing</text>
      <text x="410" y="387" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Each provider VPC/VNet connected via private circuits — public Internet NOT used for cross-cloud production traffic</text>
    </svg>
  );
}
