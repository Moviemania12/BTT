"use client";
export default function HybridVsMultiCloudDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hvmc-title" style={{ width: "100%", height: "auto" }}>
      <title id="hvmc-title">Hybrid Cloud vs Multi-Cloud vs Private Cloud comparison for enterprise architects</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID vs MULTI-CLOUD vs PRIVATE CLOUD — DECISION GUIDE</text>

      {/* Private Cloud */}
      <rect x="10" y="32" width="250" height="310" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
      <rect x="10" y="32" width="250" height="26" rx="7" fill="#334155" />
      <text x="135" y="49" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#f1f5f9" textAnchor="middle">PRIVATE CLOUD</text>
      <text x="135" y="74" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#334155" textAnchor="middle">Definition: Dedicated infrastructure</text>
      <text x="135" y="88" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">On-prem OR hosted, single-tenant</text>
      {[
        ["✓", "Full control + customization"],
        ["✓", "Regulatory/data sovereignty"],
        ["✓", "Predictable performance"],
        ["✗", "High CapEx + OpEx"],
        ["✗", "No elastic scaling"],
        ["✗", "You manage everything"],
        ["✗", "Long procurement cycles"],
      ].map(([mark, text], i) => (
        <g key={i}>
          <rect x="18" y={100 + i * 26} width="234" height="22" rx="3" fill={mark === "✓" ? "#f0fdf4" : "#fef2f2"} />
          <text x="28" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="9" fill={mark === "✓" ? "#15803d" : "#dc2626"}>{mark}</text>
          <text x="44" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="8" fill="#334151">{text}</text>
        </g>
      ))}
      <rect x="18" y="286" width="234" height="48" rx="5" fill="#e2e8f0" />
      <text x="135" y="302" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">Best for:</text>
      <text x="135" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">• Regulated industries (banking, defence)</text>
      <text x="135" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">• Sensitive IP + classified workloads</text>

      {/* Hybrid Cloud */}
      <rect x="285" y="32" width="250" height="310" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2.5" />
      <rect x="285" y="32" width="250" height="26" rx="7" fill="#2563EB" />
      <text x="410" y="49" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">HYBRID CLOUD ← RECOMMENDED</text>
      <text x="410" y="74" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af" textAnchor="middle">On-prem + Public cloud, integrated</text>
      <text x="410" y="88" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Shared identity, network, monitoring</text>
      {[
        ["✓", "Keep sensitive data on-prem"],
        ["✓", "Cloud bursting for peak load"],
        ["✓", "Gradual cloud migration"],
        ["✓", "Cloud DR for on-prem apps"],
        ["✓", "Best of both worlds"],
        ["✗", "Connectivity complexity"],
        ["✗", "Dual operations teams"],
      ].map(([mark, text], i) => (
        <g key={i}>
          <rect x="293" y={100 + i * 26} width="234" height="22" rx="3" fill={mark === "✓" ? "#dbeafe" : "#fef2f2"} />
          <text x="303" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="9" fill={mark === "✓" ? "#1e40af" : "#dc2626"}>{mark}</text>
          <text x="319" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="8" fill="#1e293b">{text}</text>
        </g>
      ))}
      <rect x="293" y="286" width="234" height="48" rx="5" fill="#dbeafe" />
      <text x="410" y="302" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Best for:</text>
      <text x="410" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">• Most enterprises (80% of orgs)</text>
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">• Phased cloud adoption journeys</text>

      {/* Multi-Cloud */}
      <rect x="560" y="32" width="250" height="310" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <rect x="560" y="32" width="250" height="26" rx="7" fill="#f97316" />
      <text x="685" y="49" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">MULTI-CLOUD</text>
      <text x="685" y="74" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#9a3412" textAnchor="middle">Multiple public clouds (AWS + Azure etc.)</text>
      <text x="685" y="88" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Not necessarily integrated</text>
      {[
        ["✓", "No vendor lock-in"],
        ["✓", "Best-of-breed services"],
        ["✓", "Geographic coverage"],
        ["✓", "Risk diversification"],
        ["✗", "Cost management complex"],
        ["✗", "Skill set breadth needed"],
        ["✗", "Security posture harder"],
      ].map(([mark, text], i) => (
        <g key={i}>
          <rect x="568" y={100 + i * 26} width="234" height="22" rx="3" fill={mark === "✓" ? "#fff7ed" : "#fef2f2"} />
          <text x="578" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="9" fill={mark === "✓" ? "#f97316" : "#dc2626"}>{mark}</text>
          <text x="594" y={115 + i * 26} fontFamily="Arial,sans-serif" fontSize="8" fill="#1e293b">{text}</text>
        </g>
      ))}
      <rect x="568" y="286" width="234" height="48" rx="5" fill="#ffedd5" />
      <text x="685" y="302" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Best for:</text>
      <text x="685" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">• Large enterprises, regulated sectors</text>
      <text x="685" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">• AWS compute + Azure AD + GCP BigQuery</text>

      {/* Bottom note */}
      <rect x="10" y="352" width="800" height="22" rx="5" fill="#1e293b" />
      <text x="410" y="367" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">Reality: Most enterprises are Hybrid-Multi-Cloud — on-prem + AWS primary + Azure for M365/AD + maybe GCP for analytics. Complexity scales with each addition.</text>
    </svg>
  );
}
