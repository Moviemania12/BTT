"use client";
export default function DeploymentPipelineDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dpd-title" style={{ width: "100%", height: "auto" }}>
      <title id="dpd-title">Multi-Cloud Deployment Pipeline: Terraform GitOps CI/CD across AWS, Azure and GCP</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD DEPLOYMENT PIPELINE — GITOPS + IaC</text>

      {/* Git Source */}
      <rect x="10" y="36" width="120" height="70" rx="6" fill="#1e293b" />
      <text x="70" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#e2e8f0" textAnchor="middle">Git Repository</text>
      <text x="70" y="73" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">GitHub / GitLab</text>
      <text x="70" y="87" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Terraform + App code</text>
      <text x="70" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Branch policies</text>

      <line x1="130" y1="71" x2="150" y2="71" stroke="#334155" strokeWidth="2" />
      <polygon points="148,67 155,71 148,75" fill="#334155" />

      {/* CI Pipeline */}
      <rect x="150" y="36" width="160" height="70" rx="6" fill="#0284c7" />
      <text x="230" y="57" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">CI Pipeline</text>
      <text x="230" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">GitHub Actions / GitLab CI</text>
      <text x="230" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">terraform validate + plan</text>
      <text x="230" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">tfsec / Checkov security scan</text>

      <line x1="310" y1="71" x2="330" y2="71" stroke="#0284c7" strokeWidth="2" />
      <polygon points="328,67 335,71 328,75" fill="#0284c7" />

      {/* Approval Gate */}
      <rect x="330" y="36" width="120" height="70" rx="6" fill="#f59e0b" />
      <text x="390" y="57" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Approval Gate</text>
      <text x="390" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#fffbeb" textAnchor="middle">Plan review</text>
      <text x="390" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#fffbeb" textAnchor="middle">Cost estimate</text>
      <text x="390" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#fef3c7" textAnchor="middle">Security review</text>

      <line x1="450" y1="71" x2="470" y2="71" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="468,67 475,71 468,75" fill="#f59e0b" />

      {/* CD Pipeline */}
      <rect x="470" y="36" width="160" height="70" rx="6" fill="#16a34a" />
      <text x="550" y="57" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">CD Pipeline</text>
      <text x="550" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">terraform apply (parallel)</text>
      <text x="550" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">ArgoCD sync (K8s)</text>
      <text x="550" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#86efac" textAnchor="middle">Ansible config management</text>

      <line x1="630" y1="71" x2="650" y2="71" stroke="#16a34a" strokeWidth="2" />
      <polygon points="648,67 655,71 648,75" fill="#16a34a" />

      {/* Post-deploy */}
      <rect x="650" y="36" width="160" height="70" rx="6" fill="#7c3aed" />
      <text x="730" y="57" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Post-Deploy</text>
      <text x="730" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#e9d5ff" textAnchor="middle">Smoke tests</text>
      <text x="730" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#e9d5ff" textAnchor="middle">Integration tests</text>
      <text x="730" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">Rollback on failure</text>

      {/* Parallel deployment targets */}
      <line x1="550" y1="106" x2="550" y2="140" stroke="#16a34a" strokeWidth="1.5" />
      <line x1="550" y1="140" x2="160" y2="140" stroke="#16a34a" strokeWidth="1.5" />
      <line x1="550" y1="140" x2="550" y2="140" stroke="#16a34a" strokeWidth="1.5" />
      <line x1="550" y1="140" x2="810" y2="140" stroke="#16a34a" strokeWidth="1.5" />
      {[160, 410, 680].map(cx => (
        <g key={cx}>
          <line x1={cx} y1="140" x2={cx} y2="160" stroke="#16a34a" strokeWidth="1.5" />
          <polygon points={`${cx - 4},156 ${cx},163 ${cx + 4},156`} fill="#16a34a" />
        </g>
      ))}

      {/* Three cloud targets */}
      {[
        { x: 20, color: "#f97316", bg: "#fff7ed", title: "AWS (terraform apply)", items: ["VPC, EC2, RDS", "EKS clusters", "IAM roles", "Route53 DNS"] },
        { x: 270, color: "#2563EB", bg: "#eff6ff", title: "Azure (terraform apply)", items: ["VNet, VMs, AKS", "Azure SQL, CosmosDB", "Entra ID RBAC", "Azure DNS"] },
        { x: 540, color: "#34A853", bg: "#f0fdf4", title: "GCP (terraform apply)", items: ["VPC, GCE, GKE", "Cloud SQL, Spanner", "IAM bindings", "Cloud DNS"] },
      ].map(({ x, color, bg, title, items }) => (
        <g key={x}>
          <rect x={x} y={163} width={260} height={116} rx="6" fill={bg} stroke={color} strokeWidth="2" />
          <rect x={x} y={163} width={260} height={22} rx="5" fill={color} />
          <text x={x + 130} y={178} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          {items.map((item, i) => (
            <g key={item}>
              <rect x={x + 8} y={191 + i * 22} width={244} height={18} rx="3" fill={i % 2 === 0 ? "white" : bg} />
              <text x={x + 16} y={204 + i * 22} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{item}</text>
            </g>
          ))}
        </g>
      ))}

      {/* State backends */}
      <rect x="10" y="288" width="800" height="26" rx="5" fill="#334155" />
      <text x="410" y="300" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">Terraform State Backends: AWS → S3 + DynamoDB lock | Azure → Azure Blob + lease | GCP → GCS + lock object</text>
      <text x="410" y="311" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Remote state → cross-cloud references (terraform_remote_state). Workspaces per environment (dev/staging/prod).</text>
    </svg>
  );
}
