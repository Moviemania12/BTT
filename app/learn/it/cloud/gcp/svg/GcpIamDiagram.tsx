"use client";
export default function GcpIamDiagram() {
  return (
    <svg viewBox="0 0 820 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="giam-title">
      <title id="giam-title">GCP IAM: Principals, Roles, Service Accounts, Workload Identity</title>
      <rect width="820" height="350" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP CLOUD IAM — WHO + WHAT + WHERE</text>

      {/* Who */}
      <rect x="20" y="36" width="250" height="200" rx="8" fill="#eff6ff" stroke="#4285F4" strokeWidth="2" />
      <text x="145" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4285F4" textAnchor="middle">WHO (Principal)</text>
      {[
        ["Google Account", "engineer@company.com"],
        ["Service Account", "app-sa@proj.iam.gserviceaccount.com"],
        ["Google Group", "devops-team@company.com"],
        ["Google Workspace", "company.com (entire domain)"],
        ["Workload Identity", "K8s pod → SA (no key file)"],
        ["allAuthenticatedUsers", "Any signed-in Google account"],
      ].map(([type, desc], i) => (
        <g key={type}>
          <rect x="32" y={66 + i * 28} width="226" height="24" rx="3" fill={i % 2 === 0 ? "#dbeafe" : "#eff6ff"} />
          <text x="40" y={82 + i * 28} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af">{type}</text>
          <text x="40" y={82 + i * 28} fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" dy="0">
            <tspan x="40" dy="0" fontWeight="700">{type}: </tspan>
            <tspan fill="#475569">{desc}</tspan>
          </text>
        </g>
      ))}

      {/* What */}
      <rect x="285" y="36" width="250" height="200" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#34A853" textAnchor="middle">WHAT (Role)</text>
      {[
        { title: "Basic Roles (avoid in prod)", desc: "Owner / Editor / Viewer — overly broad" },
        { title: "Predefined Roles", desc: "roles/compute.admin, roles/storage.objectViewer…" },
        { title: "Custom Roles", desc: "Exact permissions for your use case" },
        { title: "Role = set of permissions", desc: "compute.instances.start, storage.buckets.get…" },
      ].map(({ title, desc }, i) => (
        <g key={title}>
          <rect x="297" y={66 + i * 42} width="226" height="36" rx="4" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"} />
          <text x="305" y={81 + i * 42} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d">{title}</text>
          <text x="305" y={94 + i * 42} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d">{desc}</text>
        </g>
      ))}

      {/* Where */}
      <rect x="550" y="36" width="250" height="200" rx="8" fill="#fff7ed" stroke="#FBBC04" strokeWidth="2" />
      <text x="675" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#92400e" textAnchor="middle">WHERE (Resource)</text>
      {[
        { level: "Organization", eg: "all-company.com", color: "#EA4335" },
        { level: "Folder", eg: "Production folder", color: "#f97316" },
        { level: "Project", eg: "proj-prod-123", color: "#FBBC04" },
        { level: "Resource", eg: "specific bucket/VM/etc", color: "#34A853" },
      ].map(({ level, eg, color }, i) => (
        <g key={level}>
          <rect x="562" y={66 + i * 42} width="226" height="36" rx="4" fill="#fff7ed" stroke={color} strokeWidth="1.5" />
          <text x="570" y={81 + i * 42} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={color}>{level}</text>
          <text x="570" y={94 + i * 42} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">e.g., {eg}</text>
          <text x="570" y={94 + i * 42} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" dx="0">{i === 0 ? " — broadest scope" : i === 3 ? " — narrowest" : ""}</text>
        </g>
      ))}

      {/* Service Account best practice */}
      <rect x="20" y="248" width="380" height="88" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="210" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">SERVICE ACCOUNTS — Workload Identity</text>
      <text x="32" y="286" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce">• Service Account = machine identity (not human)</text>
      <text x="32" y="301" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce">• Workload Identity Federation: GKE pods assume SA without key file</text>
      <text x="32" y="316" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce">• Avoid SA key files — rotate if must use, prefer Workload Identity</text>
      <text x="32" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8">AWS IAM Role for EC2 ≈ GCP Service Account attached to VM</text>

      {/* Deny policies */}
      <rect x="420" y="248" width="380" height="88" rx="8" fill="#fef2f2" stroke="#EA4335" strokeWidth="2" />
      <text x="610" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">IAM DENY POLICIES (newer feature)</text>
      <text x="432" y="286" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• Deny policies override Allow bindings — explicit deny wins</text>
      <text x="432" y="301" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• Useful for guardrails: deny deleting prod resources to all except break-glass</text>
      <text x="432" y="316" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• Policy troubleshooter: check why access was granted or denied</text>
      <text x="432" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b">Org Policies: constraints on resource configs (not IAM permissions)</text>
    </svg>
  );
}
