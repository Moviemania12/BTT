"use client";
export default function GcpResourceHierarchyDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="grh-title">
      <title id="grh-title">GCP Resource Hierarchy: Organization, Folders, Projects, Resources</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP RESOURCE HIERARCHY AND IAM INHERITANCE</text>

      {/* Organization */}
      <rect x="260" y="36" width="300" height="44" rx="8" fill="#4285F4" />
      <text x="410" y="55" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">ORGANIZATION</text>
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#bfdbfe" textAnchor="middle">example.com — Root node. IAM policies here = all resources.</text>

      {/* Lines to folders */}
      <line x1="360" y1="80" x2="200" y2="106" stroke="#4285F4" strokeWidth="1.5" />
      <line x1="410" y1="80" x2="410" y2="106" stroke="#4285F4" strokeWidth="1.5" />
      <line x1="460" y1="80" x2="620" y2="106" stroke="#4285F4" strokeWidth="1.5" />

      {/* Folders */}
      {[
        { x: 60, label: "Folder: Production", color: "#34A853", bg: "#f0fdf4" },
        { x: 310, label: "Folder: Development", color: "#FBBC04", bg: "#fefce8" },
        { x: 560, label: "Folder: Shared Services", color: "#EA4335", bg: "#fef2f2" },
      ].map(({ x, label, color, bg }) => (
        <g key={x}>
          <rect x={x} y={106} width={200} height={36} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <text x={x + 100} y={129} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={color} textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* Projects under Production */}
      {[
        { x: 36, label: "Project: prod-web", id: "proj-123" },
        { x: 186, label: "Project: prod-data", id: "proj-456" },
      ].map(({ x, label, id }) => (
        <g key={x}>
          <line x1={160} y1={142} x2={x + 82} y2={168} stroke="#34A853" strokeWidth="1" strokeDasharray="4,2" />
          <rect x={x} y={168} width={155} height={44} rx="6" fill="#1e40af" />
          <text x={x + 77} y={186} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          <text x={x + 77} y={202} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">{id}</text>
        </g>
      ))}

      {/* Projects under Dev */}
      {[
        { x: 310, label: "Project: dev-env", id: "proj-789" },
        { x: 468, label: "Project: staging", id: "proj-012" },
      ].map(({ x, label, id }) => (
        <g key={x}>
          <line x1={410} y1={142} x2={x + 76} y2={168} stroke="#FBBC04" strokeWidth="1" strokeDasharray="4,2" />
          <rect x={x} y={168} width={148} height={44} rx="6" fill="#92400e" />
          <text x={x + 74} y={186} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          <text x={x + 74} y={202} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fde68a" textAnchor="middle">{id}</text>
        </g>
      ))}

      {/* Projects under Shared */}
      <line x1={660} y1={142} x2={660} y2={168} stroke="#EA4335" strokeWidth="1" strokeDasharray="4,2" />
      <rect x={580} y={168} width={160} height={44} rx="6" fill="#991b1b" />
      <text x={660} y={186} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Project: shared-net</text>
      <text x={660} y={202} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fecaca" textAnchor="middle">Host Project (Shared VPC)</text>

      {/* Resources level */}
      <text x="410" y="232" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151" textAnchor="middle">RESOURCES (within Projects)</text>

      {[
        { x: 20, label: "VM Instances", icon: "Compute Engine" },
        { x: 168, label: "Cloud Storage Buckets", icon: "Storage" },
        { x: 316, label: "Cloud SQL Instances", icon: "Database" },
        { x: 464, label: "GKE Clusters", icon: "Kubernetes" },
        { x: 612, label: "Pub/Sub Topics", icon: "Messaging" },
      ].map(({ x, label, icon }) => (
        <g key={x}>
          <rect x={x} y={242} width={138} height={48} rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x={x + 69} y={260} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#374151" textAnchor="middle">{icon}</text>
          <text x={x + 69} y={276} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280" textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* IAM inheritance note */}
      <rect x="20" y="302" width="780" height="48" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="30" y="320" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8">IAM Inheritance (top-down):</text>
      <text x="30" y="335" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce">Org → Folder → Project → Resource. Role assigned at parent = inherited by all children. Cannot REMOVE inherited roles at child level — only ADD more.</text>
      <text x="30" y="345" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce">Labels: user-defined key-value (billing, filtering). Tags: for network firewall rules and IAM conditions. Billing Account: attached to Projects — not Org directly.</text>
    </svg>
  );
}
