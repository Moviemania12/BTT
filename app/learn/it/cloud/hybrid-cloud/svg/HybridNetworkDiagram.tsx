"use client";
export default function HybridNetworkDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hnd-title" style={{ width: "100%", height: "auto" }}>
      <title id="hnd-title">Hybrid Network Connectivity: VPN, Direct Connect, ExpressRoute, SD-WAN options</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID NETWORK CONNECTIVITY OPTIONS</text>

      {/* On-Prem box */}
      <rect x="10" y="36" width="180" height="240" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="100" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM DC</text>
      <rect x="24" y="66" width="152" height="26" rx="4" fill="#475569" />
      <text x="100" y="83" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#f1f5f9" textAnchor="middle">WAN Router / Firewall</text>
      <rect x="24" y="100" width="152" height="22" rx="4" fill="#64748b" />
      <text x="100" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#f8fafc" textAnchor="middle">BGP Peering</text>
      <rect x="24" y="130" width="152" height="22" rx="4" fill="#94a3b8" />
      <text x="100" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#0f172a" textAnchor="middle">SD-WAN Appliance</text>
      <rect x="24" y="160" width="152" height="22" rx="4" fill="#cbd5e1" />
      <text x="100" y="175" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e293b" textAnchor="middle">VPN Concentrator</text>
      <rect x="24" y="190" width="152" height="22" rx="4" fill="#e2e8f0" />
      <text x="100" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">Colocation Meet-Me Room</text>
      <text x="100" y="238" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">10.0.0.0/8</text>
      <text x="100" y="252" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Private IP Space</text>

      {/* Cloud box */}
      <rect x="630" y="36" width="180" height="240" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="720" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0284c7" textAnchor="middle">PUBLIC CLOUD</text>
      <rect x="644" y="66" width="152" height="26" rx="4" fill="#0284c7" />
      <text x="720" y="83" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">VGW / VNG / Cloud Router</text>
      <rect x="644" y="100" width="152" height="22" rx="4" fill="#0369a1" />
      <text x="720" y="115" fontFamily="Arial,sans-serif" fontSize="8" fill="#f0f9ff" textAnchor="middle">BGP / Static Routes</text>
      <rect x="644" y="130" width="152" height="22" rx="4" fill="#38bdf8" />
      <text x="720" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">VPC / VNet (10.1.0.0/16)</text>
      <rect x="644" y="160" width="152" height="22" rx="4" fill="#7dd3fc" />
      <text x="720" y="175" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Private Subnets</text>
      <rect x="644" y="190" width="152" height="22" rx="4" fill="#bae6fd" />
      <text x="720" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Cloud Endpoints / Private Link</text>
      <text x="720" y="238" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">10.1.0.0/16</text>
      <text x="720" y="252" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">Non-overlapping CIDRs!</text>

      {/* Path 1: VPN */}
      <rect x="200" y="52" width="420" height="56" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#92400e" textAnchor="middle">OPTION 1: IPsec VPN (Internet)</text>
      <text x="410" y="88" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Encrypted · Variable latency · Up to ~1-10Gbps · Hours to setup · Lowest cost</text>
      <text x="410" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">IKEv2/AES-256 · BGP optional · HA: active-active tunnels</text>
      <line x1="190" y1="80" x2="200" y2="80" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4,3" />
      <line x1="620" y1="80" x2="630" y2="80" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4,3" />

      {/* Path 2: Dedicated */}
      <rect x="200" y="122" width="420" height="56" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
      <text x="410" y="142" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#14532d" textAnchor="middle">OPTION 2: Dedicated Interconnect / Direct Connect</text>
      <text x="410" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Private circuit · 10/100Gbps · Consistent low latency · Weeks-months setup</text>
      <text x="410" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">NOT encrypted by default · BGP required · HA: dual circuits dual metros</text>
      <line x1="190" y1="150" x2="200" y2="150" stroke="#15803d" strokeWidth="2" />
      <line x1="620" y1="150" x2="630" y2="150" stroke="#15803d" strokeWidth="2" />

      {/* Path 3: Partner */}
      <rect x="200" y="192" width="420" height="56" rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="410" y="212" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e40af" textAnchor="middle">OPTION 3: Partner Interconnect / Partner Connect</text>
      <text x="410" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Via ISP/carrier · 50Mbps–50Gbps · Medium latency · Days-weeks setup</text>
      <text x="410" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Cost between VPN and Dedicated · Good for medium bandwidth needs</text>
      <line x1="190" y1="220" x2="200" y2="220" stroke="#2563EB" strokeWidth="2" strokeDasharray="6,3" />
      <line x1="620" y1="220" x2="630" y2="220" stroke="#2563EB" strokeWidth="2" strokeDasharray="6,3" />

      {/* SD-WAN note */}
      <rect x="200" y="262" width="420" height="50" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">SD-WAN OVERLAY (over any underlay)</text>
      <text x="410" y="295" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Policy-based path selection · App-aware routing · Brownout detection</text>
      <text x="410" y="307" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Can use VPN + Interconnect simultaneously for WAN optimization</text>

      {/* Production recommendation */}
      <rect x="10" y="295" width="800" height="36" rx="6" fill="#0c4a6e" />
      <text x="410" y="311" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7dd3fc" textAnchor="middle">PRODUCTION RECOMMENDATION: Dedicated/Direct PRIMARY + HA VPN BACKUP</text>
      <text x="410" y="325" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">BGP failover automatic (route preference) · 99.99% hybrid SLA achievable · Add SD-WAN overlay for branch sites</text>

      {/* DNS note */}
      <rect x="10" y="340" width="800" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="356" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="middle">DNS Design: On-Prem DNS → conditional forwarder → Cloud Private DNS (for *.internal.company.com → cloud resolver)</text>
      <text x="410" y="368" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Cloud DNS → on-prem DNS forwarder → AD DNS (for corp.local aur on-prem zones)</text>
    </svg>
  );
}
