"use client";
export default function GcpVsCloudsDiagram() {
  return (
    <svg viewBox="0 0 820 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gvc-title">
      <title id="gvc-title">GCP vs AWS vs Azure: Service Mapping for Data Center Engineers</title>
      <rect width="820" height="440" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP vs AWS vs AZURE — DATA CENTER ENGINEER MAPPING</text>

      {/* Headers */}
      <rect x="20" y="34" width="180" height="26" rx="4" fill="#374151" />
      <text x="110" y="52" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">CATEGORY</text>
      <rect x="206" y="34" width="190" height="26" rx="4" fill="#4285F4" />
      <text x="301" y="52" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">GOOGLE CLOUD (GCP)</text>
      <rect x="402" y="34" width="190" height="26" rx="4" fill="#f97316" />
      <text x="497" y="52" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">AMAZON AWS</text>
      <rect x="598" y="34" width="202" height="26" rx="4" fill="#0078D4" />
      <text x="699" y="52" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">MICROSOFT AZURE</text>

      {[
        ["Virtual Compute", "Compute Engine (GCE)", "Amazon EC2", "Azure Virtual Machines"],
        ["Container Orchestration", "Google Kubernetes Engine (GKE)", "Amazon EKS", "Azure Kubernetes Service (AKS)"],
        ["Serverless Compute", "Cloud Run + Cloud Functions", "AWS Lambda", "Azure Functions"],
        ["Object Storage", "Cloud Storage (GCS)", "Amazon S3", "Azure Blob Storage"],
        ["Block Storage", "Persistent Disk / Hyperdisk", "Amazon EBS", "Azure Managed Disks"],
        ["File Storage", "Filestore (NFS)", "Amazon EFS (NFS)", "Azure Files (SMB/NFS)"],
        ["Managed SQL DB", "Cloud SQL", "Amazon RDS", "Azure SQL Database"],
        ["Global Dist. DB", "Cloud Spanner (UNIQUE)", "No direct equiv.", "Azure Cosmos DB (multi-model)"],
        ["NoSQL", "Firestore / Bigtable", "Amazon DynamoDB", "Azure Cosmos DB"],
        ["Virtual Network", "VPC (GLOBAL)", "VPC (per Region)", "VNet (per Region)"],
        ["Network Security", "Firewall Rules (VPC-level)", "Security Groups + NACLs", "NSG (subnet/NIC)"],
        ["Private Connectivity", "Dedicated/Partner Interconnect", "AWS Direct Connect", "Azure ExpressRoute"],
        ["VPN", "Cloud VPN (HA VPN)", "AWS Site-to-Site VPN", "Azure VPN Gateway"],
        ["Load Balancer (L7)", "Cloud Load Balancing (global anycast)", "AWS ALB", "Azure Application Gateway"],
        ["CDN / Edge", "Cloud CDN / Media CDN + Armor", "Amazon CloudFront + WAF", "Azure Front Door"],
        ["DNS", "Cloud DNS", "Amazon Route 53", "Azure DNS"],
        ["Identity / IAM", "Cloud IAM + Service Accounts", "AWS IAM + IAM Identity Center", "Microsoft Entra ID + Azure RBAC"],
        ["Monitoring + Metrics", "Cloud Monitoring", "Amazon CloudWatch", "Azure Monitor"],
        ["Log Management", "Cloud Logging", "CloudWatch Logs", "Log Analytics (KQL)"],
        ["API Audit Trail", "Cloud Audit Logs", "AWS CloudTrail", "Azure Activity Log"],
        ["IaC Tool (native)", "Deployment Manager / Config Connector", "AWS CloudFormation", "ARM Templates / Bicep"],
        ["Multi-cloud Mgmt", "Anthos / GKE Enterprise", "AWS Outposts", "Azure Arc"],
      ].map(([cat, gcp, aws, azure], i) => (
        <g key={cat}>
          <rect x={20} y={66 + i * 16} width={180} height={15} rx="2" fill={i % 2 === 0 ? "#f8fafc" : "#f1f5f9"} />
          <text x={28} y={78 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#374151">{cat}</text>
          <rect x={206} y={66 + i * 16} width={190} height={15} rx="2" fill={i % 2 === 0 ? "#eff6ff" : "#dbeafe"} />
          <text x={214} y={78 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af">{gcp}</text>
          <rect x={402} y={66 + i * 16} width={190} height={15} rx="2" fill={i % 2 === 0 ? "#fff7ed" : "#ffedd5"} />
          <text x={410} y={78 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412">{aws}</text>
          <rect x={598} y={66 + i * 16} width={202} height={15} rx="2" fill={i % 2 === 0 ? "#eff6ff" : "#dbeafe"} />
          <text x={606} y={78 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0078D4">{azure}</text>
        </g>
      ))}

      <rect x="20" y="422" width="780" height="14" rx="3" fill="#fef3c7" />
      <text x="410" y="432" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">GCP differentiators: Global VPC, Cloud Spanner (unique globally-distributed SQL), Network Tiers, SUDs (automatic discounts), BigQuery, Anthos multi-cloud.</text>
    </svg>
  );
}
