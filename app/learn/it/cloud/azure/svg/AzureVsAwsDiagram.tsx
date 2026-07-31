"use client";
export default function AzureVsAwsDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ava-title">
      <title id="ava-title">Azure vs AWS Service Comparison for Data Center Engineers</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE vs AWS — DATA CENTER ENGINEER MAPPING</text>

      {/* Headers */}
      <rect x="20" y="34" width="200" height="28" rx="4" fill="#374151" />
      <text x="120" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">CATEGORY</text>
      <rect x="226" y="34" width="280" height="28" rx="4" fill="#0078D4" />
      <text x="366" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">MICROSOFT AZURE</text>
      <rect x="512" y="34" width="288" height="28" rx="4" fill="#f97316" />
      <text x="656" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">AMAZON AWS</text>

      {[
        ["Virtual Compute", "Azure Virtual Machines", "Amazon EC2"],
        ["Container Orch.", "Azure Kubernetes Service (AKS)", "Amazon EKS"],
        ["Serverless", "Azure Functions", "AWS Lambda"],
        ["Object Storage", "Azure Blob Storage", "Amazon S3"],
        ["Block Storage", "Azure Managed Disks", "Amazon EBS"],
        ["File Storage", "Azure Files (SMB/NFS)", "Amazon EFS (NFS)"],
        ["Managed SQL DB", "Azure SQL Database", "Amazon RDS"],
        ["NoSQL / Multi-model", "Azure Cosmos DB", "Amazon DynamoDB"],
        ["Virtual Network", "Azure Virtual Network (VNet)", "Amazon VPC"],
        ["Network Security", "NSG + Azure Firewall", "Security Groups + NACLs"],
        ["Private Connectivity", "Azure ExpressRoute", "AWS Direct Connect"],
        ["VPN", "Azure VPN Gateway", "AWS Site-to-Site VPN"],
        ["Load Balancer (L4)", "Azure Load Balancer", "AWS NLB"],
        ["Load Balancer (L7)", "Azure Application Gateway", "AWS ALB"],
        ["Identity / IAM", "Microsoft Entra ID + Azure RBAC", "AWS IAM + IAM Identity Center"],
        ["Monitoring + Logs", "Azure Monitor + Log Analytics", "CloudWatch + CloudTrail"],
        ["Infrastructure as Code", "ARM Templates + Bicep", "CloudFormation"],
        ["Hybrid Connectivity", "Azure Arc", "AWS Outposts"],
        ["CDN / Edge", "Azure Front Door / CDN", "Amazon CloudFront + Global Accelerator"],
        ["DNS", "Azure DNS + Private DNS Zones", "Route 53"],
      ].map(([cat, azure, aws], i) => (
        <g key={cat}>
          <rect x={20} y={68 + i * 17} width={200} height={16} rx="2" fill={i % 2 === 0 ? "#f8fafc" : "#f1f5f9"} />
          <text x={28} y={80 + i * 17} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#374151">{cat}</text>
          <rect x={226} y={68 + i * 17} width={280} height={16} rx="2" fill={i % 2 === 0 ? "#eff6ff" : "#dbeafe"} />
          <text x={234} y={80 + i * 17} fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af">{azure}</text>
          <rect x={512} y={68 + i * 17} width={288} height={16} rx="2" fill={i % 2 === 0 ? "#fff7ed" : "#ffedd5"} />
          <text x={520} y={80 + i * 17} fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412">{aws}</text>
        </g>
      ))}

      <rect x="20" y="410" width="780" height="0" />
    </svg>
  );
}
