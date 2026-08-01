"use client";
export default function HybridCloudArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hca-title" style={{ width: "100%", height: "auto" }}>
      <title id="hca-title">Hybrid Cloud Architecture: On-Premises Data Center connected to Public Cloud</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID CLOUD ARCHITECTURE — ON-PREM + PUBLIC CLOUD</text>

      {/* On-Prem DC */}
      <rect x="10" y="32" width="360" height="350" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
      <rect x="10" y="32" width="360" height="28" rx="9" fill="#334155" />
      <text x="190" y="51" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">ON-PREMISES DATA CENTER</text>

      {/* Core Network */}
      <rect x="26" y="72" width="328" height="36" rx="5" fill="#475569" />
      <text x="190" y="95" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Core Network / DMZ Firewall / WAN Router</text>

      {/* Compute tier */}
      <rect x="26" y="118" width="152" height="78" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="102" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Compute Tier</text>
      <text x="102" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">VMware / Hyper-V VMs</text>
      <text x="102" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Bare Metal Servers</text>
      <text x="102" y="185" fontFamily="Arial,sans-serif" fontSize="8" fill="#2563eb" textAnchor="middle">Physical Kubernetes Nodes</text>

      {/* Storage tier */}
      <rect x="202" y="118" width="152" height="78" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="278" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Storage Tier</text>
      <text x="278" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">SAN / NAS / NFS</text>
      <text x="278" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Object Storage On-Prem</text>
      <text x="278" y="185" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Primary Databases</text>

      {/* Identity */}
      <rect x="26" y="208" width="152" height="64" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="102" y="228" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">Identity</text>
      <text x="102" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Active Directory (AD DS)</text>
      <text x="102" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">LDAP / Kerberos</text>

      {/* Monitoring */}
      <rect x="202" y="208" width="152" height="64" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="278" y="228" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Monitoring</text>
      <text x="278" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">SCOM / Nagios / Zabbix</text>
      <text x="278" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">SIEM / Log Aggregator</text>

      {/* DC Services */}
      <rect x="26" y="284" width="328" height="40" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      <text x="190" y="302" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="middle">DNS (Internal) • DHCP • NTP • PKI / Certificate Authority</text>
      <text x="190" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Backup Infra • Asset Mgmt • Config Management (Ansible/SCCM)</text>

      {/* Connectivity zone */}
      <rect x="26" y="334" width="328" height="40" rx="5" fill="#334155" />
      <text x="190" y="352" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">CONNECTIVITY LAYER</text>
      <text x="190" y="366" fontFamily="Arial,sans-serif" fontSize="8" fill="#cbd5e1" textAnchor="middle">VPN Gateway / MPLS / ExpressRoute / Direct Connect</text>

      {/* Connection lines */}
      <line x1="375" y1="200" x2="445" y2="200" stroke="#334155" strokeWidth="2.5" strokeDasharray="6,4" />
      <polygon points="441,196 449,200 441,204" fill="#334155" />
      <text x="410" y="194" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">Private Link</text>
      <text x="410" y="208" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">Encrypted</text>

      {/* Public Cloud */}
      <rect x="450" y="32" width="360" height="350" rx="10" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2.5" />
      <rect x="450" y="32" width="360" height="28" rx="9" fill="#0284c7" />
      <text x="630" y="51" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">PUBLIC CLOUD (AWS / Azure / GCP)</text>

      {/* VPC/VNet */}
      <rect x="466" y="72" width="328" height="36" rx="5" fill="#0ea5e9" />
      <text x="630" y="95" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">VPC / VNet — Private Network Extension (RFC 1918 CIDRs)</text>

      {/* Cloud Compute */}
      <rect x="466" y="118" width="152" height="78" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="542" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Cloud Compute</text>
      <text x="542" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">EC2 / Azure VM / GCE</text>
      <text x="542" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">EKS / AKS / GKE</text>
      <text x="542" y="185" fontFamily="Arial,sans-serif" fontSize="8" fill="#2563eb" textAnchor="middle">Cloud Run / Lambda</text>

      {/* Cloud Storage */}
      <rect x="642" y="118" width="152" height="78" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="718" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Cloud Storage</text>
      <text x="718" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">S3 / Blob / GCS</text>
      <text x="718" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">EBS / Managed Disks</text>
      <text x="718" y="185" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">RDS / CosmosDB / Spanner</text>

      {/* Cloud Identity */}
      <rect x="466" y="208" width="152" height="64" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="542" y="228" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">Cloud Identity</text>
      <text x="542" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Entra ID / AWS IAM</text>
      <text x="542" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">SAML / OIDC / OAuth2</text>

      {/* Cloud Monitoring */}
      <rect x="642" y="208" width="152" height="64" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="718" y="228" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Cloud Monitoring</text>
      <text x="718" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">CloudWatch / Azure Monitor</text>
      <text x="718" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Cloud Logging / Operations</text>

      {/* Cloud native */}
      <rect x="466" y="284" width="328" height="40" rx="5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
      <text x="630" y="302" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0c4a6e" textAnchor="middle">Managed Services: CDN • WAF/DDoS • Key Vault/KMS • API Gateway</text>
      <text x="630" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">Cloud DNS (Private Zones) • Certificate Manager • Secret Manager</text>

      {/* Cloud connectivity */}
      <rect x="466" y="334" width="328" height="40" rx="5" fill="#0c4a6e" />
      <text x="630" y="352" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7dd3fc" textAnchor="middle">CLOUD CONNECTIVITY</text>
      <text x="630" y="366" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">VPN Endpoint / Virtual Network Gateway / Cloud Router</text>

      {/* Footer */}
      <rect x="10" y="390" width="800" height="24" rx="5" fill="#f1f5f9" />
      <text x="410" y="406" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Hybrid Cloud = On-Prem + Cloud operating as one integrated system. Integration plane: Network + Identity + Monitoring + Data.</text>
    </svg>
  );
}
