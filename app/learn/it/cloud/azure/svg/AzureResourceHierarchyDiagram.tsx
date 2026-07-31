"use client";
export default function AzureResourceHierarchyDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="arh-title">
      <title id="arh-title">Azure Resource Hierarchy: Management Groups, Subscriptions, Resource Groups, Resources</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE RESOURCE HIERARCHY AND GOVERNANCE</text>

      {/* Level 1: Management Groups */}
      <rect x="200" y="36" width="420" height="48" rx="8" fill="#0078D4" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">MANAGEMENT GROUPS</text>
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="9" fill="#bfdbfe" textAnchor="middle">Organization-wide policy (Azure Policy) + RBAC applied here → inherited downward</text>

      {/* Lines */}
      <line x1="310" y1="84" x2="210" y2="110" stroke="#0078D4" strokeWidth="1.5" />
      <line x1="510" y1="84" x2="610" y2="110" stroke="#0078D4" strokeWidth="1.5" />
      <line x1="410" y1="84" x2="410" y2="110" stroke="#0078D4" strokeWidth="1.5" />

      {/* Level 2: Subscriptions */}
      {[
        { x: 80, label: "Dev Subscription", detail: "Isolated billing unit" },
        { x: 300, label: "Staging Subscription", detail: "Separate cost center" },
        { x: 520, label: "Prod Subscription", detail: "Blast radius isolation" },
      ].map(({ x, label, detail }) => (
        <g key={x}>
          <rect x={x} y={110} width={180} height={48} rx="6" fill="#1e40af" />
          <text x={x + 90} y={130} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          <text x={x + 90} y={148} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">{detail}</text>
        </g>
      ))}

      {/* Level 3: Resource Groups */}
      <text x="410" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151" textAnchor="middle">RESOURCE GROUPS (within Prod Subscription)</text>

      {[
        { x: 30, label: "RG-Networking", items: ["VNet", "NSGs", "Route Tables", "VPN GW"] },
        { x: 215, label: "RG-WebApp", items: ["VM Scale Set", "App Service", "Public IP", "NIC"] },
        { x: 400, label: "RG-Database", items: ["Azure SQL", "Cosmos DB", "Private DNS", "Backups"] },
        { x: 585, label: "RG-Monitoring", items: ["Log Analytics", "App Insights", "Alerts", "Dashboards"] },
      ].map(({ x, label, items }) => (
        <g key={x}>
          <rect x={x} y={192} width={175} height={110} rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x={x} y={192} width={175} height={22} rx="5" fill="#3b82f6" />
          <text x={x + 87} y={207} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          {items.map((item, i) => (
            <text key={item} x={x + 12} y={228 + i * 17} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">• {item}</text>
          ))}
        </g>
      ))}

      {/* ARM */}
      <rect x="130" y="316" width="560" height="36" rx="6" fill="#0f172a" />
      <text x="410" y="332" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#22d3ee" textAnchor="middle">AZURE RESOURCE MANAGER (ARM) — Consistent Management Layer</text>
      <text x="410" y="346" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Portal, CLI, PowerShell, SDKs, REST API → all go through ARM → Resources</text>
    </svg>
  );
}
