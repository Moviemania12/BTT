"use client";
export default function MigrationStrategyDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="msd-title" style={{ width: "100%", height: "auto" }}>
      <title id="msd-title">Cloud Migration Strategies: 7Rs framework - Retire, Retain, Rehost, Replatform, Repurchase, Refactor, Relocate</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MIGRATION STRATEGIES — THE 7 Rs FRAMEWORK</text>

      {[
        { x: 10, y: 32, w: 110, color: "#6b7280", bg: "#f1f5f9", title: "RETIRE", effort: "Effort: None", cost: "Cost: Saves $$", detail1: "Decommission app", detail2: "No longer needed", detail3: "Licenses saved", example: "Legacy reporting tool replaced by Power BI" },
        { x: 126, y: 32, w: 110, color: "#64748b", bg: "#f8fafc", title: "RETAIN", effort: "Effort: None", cost: "Cost: Same", detail1: "Keep on-prem", detail2: "Compliance/latency", detail3: "Not ready for cloud", example: "Core banking, real-time trading systems" },
        { x: 242, y: 32, w: 110, color: "#2563EB", bg: "#eff6ff", title: "REHOST", effort: "Effort: Low", cost: "Cost: 20-30% save", detail1: "Lift & Shift", detail2: "VM → Cloud VM", detail3: "Same OS/config", example: "IIS on Windows VM → Azure VM" },
        { x: 358, y: 32, w: 110, color: "#0891b2", bg: "#ecfeff", title: "RELOCATE", effort: "Effort: Low", cost: "Cost: Low", detail1: "VMware → Cloud VMware", detail2: "vCenter → VMware Cloud", detail3: "HCX migration", example: "VMware on Azure / VMware on AWS" },
        { x: 474, y: 32, w: 110, color: "#16a34a", bg: "#f0fdf4", title: "REPLATFORM", effort: "Effort: Medium", cost: "Cost: 40-60% save", detail1: "Lift, Tinker & Shift", detail2: "DB: SQL → RDS", detail3: "IIS → App Service", example: "Oracle → RDS, self-managed DB → Cloud SQL" },
        { x: 590, y: 32, w: 110, color: "#f97316", bg: "#fff7ed", title: "REPURCHASE", effort: "Effort: Medium", cost: "Cost: License switch", detail1: "Move to SaaS", detail2: "CRM → Salesforce", detail3: "Exchange → M365", example: "On-prem SAP → SAP on cloud / SaaS" },
        { x: 706, y: 32, w: 104, color: "#7c3aed", bg: "#faf5ff", title: "REFACTOR", effort: "Effort: High", cost: "Cost: High upfront", detail1: "Re-architect", detail2: "Monolith → microservices", detail3: "Containers / Serverless", example: "Java EAR → Spring Boot on GKE" },
      ].map(({ x, y, w, color, bg, title, effort, cost, detail1, detail2, detail3, example }) => (
        <g key={title}>
          <rect x={x} y={y} width={w} height={298} rx="6" fill={bg} stroke={color} strokeWidth="2" />
          <rect x={x} y={y} width={w} height={24} rx="5" fill={color} />
          <text x={x + w / 2} y={y + 16} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x + w / 2} y={y + 40} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={color} textAnchor="middle">{effort}</text>
          <text x={x + w / 2} y={y + 54} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{cost}</text>
          <line x1={x + 8} y1={y + 63} x2={x + w - 8} y2={y + 63} stroke={color} strokeWidth="0.5" />
          <text x={x + w / 2} y={y + 78} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{detail1}</text>
          <text x={x + w / 2} y={y + 92} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{detail2}</text>
          <text x={x + w / 2} y={y + 106} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{detail3}</text>
          <line x1={x + 8} y1={y + 116} x2={x + w - 8} y2={y + 116} stroke={color} strokeWidth="0.5" />
          <text x={x + w / 2} y={y + 130} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill={color} textAnchor="middle">EXAMPLE:</text>
          {example.split(" / ").map((line, i) => (
            <text key={i} x={x + w / 2} y={y + 144 + i * 13} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      {/* Decision flow */}
      <rect x="10" y="340" width="800" height="14" rx="4" fill="#1e293b" />
      <text x="410" y="351" fontFamily="Arial,sans-serif" fontSize="8" fill="#cbd5e1" textAnchor="middle">Decision sequence: Retire → Retain → Relocate → Rehost → Replatform → Repurchase → Refactor (increasing complexity + ROI)</text>
    </svg>
  );
}
