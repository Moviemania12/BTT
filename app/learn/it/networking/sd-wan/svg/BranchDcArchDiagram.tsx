"use client";
export default function BranchDcArchDiagram() {
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="bda-title">
      <title id="bda-title">SD-WAN Branch to Data Center Architecture</title>
      <rect width="860" height="400" fill="#ffffff" />

      <text x="430" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        BRANCH → WAN → DATA CENTER ARCHITECTURE
      </text>

      {/* Management plane */}
      <rect x="280" y="36" width="300" height="32" rx="6" fill="#fdf4ff" stroke="#a21caf" strokeWidth="1.5" />
      <text x="430" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#701a75" textAnchor="middle">
        MANAGEMENT / ORCHESTRATION PLANE (Cloud or On-Premises)
      </text>

      {/* Branch A */}
      <rect x="20" y="100" width="140" height="140" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="90" y="120" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">BRANCH A</text>
      <rect x="36" y="130" width="108" height="22" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="90" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Users / LAN</text>
      <rect x="36" y="160" width="108" height="22" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="90" y="175" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">SD-WAN Edge</text>
      <rect x="36" y="190" width="50" height="16" rx="3" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="61" y="202" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">MPLS</text>
      <rect x="94" y="190" width="50" height="16" rx="3" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="119" y="202" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">Internet</text>
      <text x="90" y="226" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280" textAnchor="middle">→ DIA for SaaS</text>

      {/* Branch B */}
      <rect x="20" y="260" width="140" height="120" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="90" y="280" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">BRANCH B</text>
      <rect x="36" y="290" width="108" height="22" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="90" y="305" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Users / LAN</text>
      <rect x="36" y="320" width="108" height="22" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="90" y="335" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">SD-WAN Edge</text>
      <rect x="36" y="350" width="50" height="16" rx="3" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="61" y="362" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Internet</text>
      <rect x="94" y="350" width="50" height="16" rx="3" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="119" y="362" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">LTE</text>

      {/* WAN cloud */}
      <ellipse cx="300" cy="230" rx="80" ry="50" fill="#fef9e7" stroke="#d97706" strokeWidth="1.5" />
      <text x="300" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">WAN / SD-WAN</text>
      <text x="300" y="233" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">OVERLAY</text>
      <text x="300" y="246" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">Multiple paths</text>
      <text x="300" y="258" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">continuously measured</text>

      {/* Arrows: Branches to WAN */}
      <line x1="160" y1="175" x2="220" y2="215" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bda-arr)" />
      <line x1="160" y1="320" x2="222" y2="257" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bda-arr)" />

      {/* DC block */}
      <rect x="450" y="90" width="390" height="290" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="645" y="112" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">DATA CENTER</text>

      {/* DC SD-WAN Edge HA */}
      <rect x="466" y="124" width="168" height="58" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="550" y="144" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">SD-WAN EDGE</text>
      <text x="550" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">(Active / Standby HA Pair)</text>
      <text x="550" y="172" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Tunnel termination + path selection</text>

      {/* Firewall */}
      <rect x="466" y="200" width="168" height="50" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="550" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">FIREWALL</text>
      <text x="550" y="235" fontFamily="Arial,sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle">Security policy enforcement</text>
      <text x="550" y="246" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#991b1b" textAnchor="middle">Stateful inspection / NGFW</text>

      {/* Load Balancer */}
      <rect x="466" y="268" width="168" height="40" rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="550" y="285" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">LOAD BALANCER</text>
      <text x="550" y="299" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Traffic distribution to app pool</text>

      {/* App servers */}
      <rect x="466" y="322" width="168" height="40" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
      <text x="550" y="340" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151" textAnchor="middle">APPLICATION SERVERS</text>
      <text x="550" y="354" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Internal services / databases</text>

      {/* DC internal arrows */}
      <line x1="550" y1="182" x2="550" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bda-arr)" />
      <line x1="550" y1="250" x2="550" y2="268" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bda-arr)" />
      <line x1="550" y1="308" x2="550" y2="322" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bda-arr)" />

      {/* Cloud/SaaS */}
      <rect x="676" y="140" width="148" height="100" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="750" y="162" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0c4a6e" textAnchor="middle">CLOUD / SaaS</text>
      <text x="750" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Office 365, Salesforce</text>
      <text x="750" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">AWS/Azure workloads</text>
      <text x="750" y="212" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">DIA from branch reduces</text>
      <text x="750" y="224" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">DC backhaul for SaaS</text>

      {/* WAN to DC edge arrow */}
      <line x1="380" y1="230" x2="466" y2="155" stroke="#16a34a" strokeWidth="2" markerEnd="url(#bda-arr)" />

      {/* Management to DC */}
      <line x1="430" y1="68" x2="550" y2="124" stroke="#a21caf" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#bda-arr)" />

      <defs>
        <marker id="bda-arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
