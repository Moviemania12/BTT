"use client";
export default function DecisionMatrixDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dmd-title" style={{ width: "100%", height: "auto" }}>
      <title id="dmd-title">Multi-Cloud Decision Matrix: when to choose single cloud, hybrid or multi-cloud</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CLOUD STRATEGY DECISION MATRIX</text>

      {/* Header row */}
      <rect x="10" y="30" width="170" height="30" rx="4" fill="#1e293b" />
      <text x="95" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Criteria</text>
      <rect x="185" y="30" width="140" height="30" rx="4" fill="#6b7280" />
      <text x="255" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Single Cloud</text>
      <rect x="330" y="30" width="140" height="30" rx="4" fill="#475569" />
      <text x="400" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Private Cloud</text>
      <rect x="475" y="30" width="140" height="30" rx="4" fill="#2563EB" />
      <text x="545" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Hybrid Cloud</text>
      <rect x="620" y="30" width="190" height="30" rx="4" fill="#16a34a" />
      <text x="715" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Multi-Cloud ← This Article</text>

      {[
        ["Team cloud skills", "Deep in one cloud", "VMware/OpenStack ops", "On-prem + cloud skills", "Multiple cloud skills needed"],
        ["Vendor lock-in risk", "High — single provider", "None — you own infra", "Medium — one cloud", "Low — provider-diversified"],
        ["Regulatory requirement", "Flexible by region choice", "Full control mandatory", "On-prem for sensitive data", "Geo-specific provider choice"],
        ["Workload variability", "Good — elastic scaling", "Poor — fixed capacity", "Good — cloud bursting", "Excellent — best provider"],
        ["Management complexity", "Low — one console", "Medium — VMware ops", "Medium-High — dual plane", "High — three+ consoles"],
        ["Data sovereignty", "Cloud provider controls", "Full on-prem control", "Sensitive data on-prem", "Choose provider per region"],
        ["Cost model", "Single bill, easier RI", "CapEx, predictable", "CapEx + cloud OpEx", "Three bills, complex FinOps"],
        ["DR/Availability", "Multi-AZ same provider", "Dual-DC on-prem", "Cloud as DR for on-prem", "Cross-cloud DR possible"],
        ["Best-of-breed services", "One provider's toolset", "Open source / vendor", "On-prem + one cloud", "AWS + Azure + GCP combined"],
        ["Startup / greenfield", "Best choice", "Too expensive", "Rarely needed", "Overkill — start simple"],
        ["Enterprise with M365", "Good (any cloud)", "Possible", "Azure natural fit", "Azure ID + AWS compute common"],
        ["Global 3+ geographies", "Multi-region one cloud", "Not feasible", "Limited global reach", "Optimal — provider per geo"],
      ].map(([criteria, single, priv, hybrid, multi], rowIdx) => {
        const y = 64 + rowIdx * 26;
        const bg = rowIdx % 2 === 0 ? "#f8fafc" : "#ffffff";
        return (
          <g key={criteria}>
            <rect x="10" y={y} width="800" height="24" rx="2" fill={bg} />
            <text x="18" y={y + 16} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155">{criteria}</text>
            <text x="188" y={y + 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{single}</text>
            <text x="333" y={y + 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{priv}</text>
            <text x="478" y={y + 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{hybrid}</text>
            <text x="623" y={y + 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" fontWeight="600">{multi}</text>
            <line x1="180" y1={y} x2="180" y2={y + 24} stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="325" y1={y} x2="325" y2={y + 24} stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="470" y1={y} x2="470" y2={y + 24} stroke="#e2e8f0" strokeWidth="0.5" />
            <line x1="615" y1={y} x2="615" y2={y + 24} stroke="#e2e8f0" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* Bottom recommendation */}
      <rect x="10" y="380" width="800" height="0" rx="4" />
    </svg>
  );
}
