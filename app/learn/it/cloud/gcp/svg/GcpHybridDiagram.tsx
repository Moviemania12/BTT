"use client";
export default function GcpHybridDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ghyb-title">
      <title id="ghyb-title">GCP Hybrid Connectivity: Cloud VPN, Cloud Interconnect, Network Tiers</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP HYBRID CONNECTIVITY: VPN, INTERCONNECT AND NETWORK TIERS</text>

      {/* On-prem */}
      <rect x="20" y="40" width="200" height="180" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="120" y="62" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM DC</text>
      <rect x="36" y="72" width="168" height="28" rx="5" fill="#475569" />
      <text x="120" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Routers / Firewalls</text>
      <rect x="36" y="108" width="168" height="24" rx="4" fill="#334155" />
      <text x="120" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#ffffff" textAnchor="middle">On-prem VPN / BGP peer</text>
      <rect x="36" y="140" width="168" height="24" rx="4" fill="#94a3b8" />
      <text x="120" y="156" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#0f172a" textAnchor="middle">Colocation facility</text>
      <rect x="36" y="172" width="168" height="40" rx="4" fill="#e2e8f0" />
      <text x="120" y="188" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">Meet-me room</text>
      <text x="120" y="202" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">(for Dedicated Interconnect)</text>

      {/* GCP VPC */}
      <rect x="600" y="40" width="200" height="180" rx="8" fill="#eff6ff" stroke="#4285F4" strokeWidth="2" />
      <text x="700" y="62" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">GCP VPC</text>
      <rect x="616" y="72" width="168" height="28" rx="5" fill="#4285F4" />
      <text x="700" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Cloud Router (BGP)</text>
      <rect x="616" y="108" width="168" height="28" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="700" y="122" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af" textAnchor="middle">HA VPN Gateway</text>
      <text x="700" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">2 interfaces, 4 tunnels for 99.99%</text>
      <rect x="616" y="144" width="168" height="28" rx="5" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
      <text x="700" y="158" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af" textAnchor="middle">VLAN Attachment</text>
      <text x="700" y="171" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">(Interconnect endpoint)</text>
      <rect x="616" y="180" width="168" height="32" rx="5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="700" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Private subnets</text>
      <text x="700" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">RFC 1918 only, no public IPs</text>

      {/* VPN path */}
      <rect x="245" y="50" width="330" height="68" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="410" y="70" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">CLOUD VPN (HA VPN)</text>
      <text x="410" y="86" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">IPsec over Internet — ENCRYPTED by default</text>
      <text x="410" y="101" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">3Gbps per tunnel (4 tunnels HA VPN = 12Gbps max) • Variable latency</text>
      <text x="410" y="113" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">99.99% SLA with HA VPN (4 tunnels, 2 interfaces)</text>
      <line x1="220" y1="100" x2="245" y2="84" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="575" y1="84" x2="600" y2="114" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />

      {/* Interconnect paths */}
      <rect x="245" y="136" width="155" height="68" rx="6" fill="#dcfce7" stroke="#34A853" strokeWidth="2" />
      <text x="322" y="156" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">DEDICATED INTERCONNECT</text>
      <text x="322" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Private circuit direct to Google</text>
      <text x="322" y="184" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">10Gbps or 100Gbps per link</text>
      <text x="322" y="196" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a" textAnchor="middle">NOT encrypted by default</text>

      <rect x="420" y="136" width="155" height="68" rx="6" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <text x="497" y="156" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">PARTNER INTERCONNECT</text>
      <text x="497" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Via connectivity provider</text>
      <text x="497" y="184" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">50Mbps – 50Gbps options</text>
      <text x="497" y="196" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a" textAnchor="middle">Good for lower bandwidth needs</text>

      <line x1="220" y1="175" x2="245" y2="168" stroke="#34A853" strokeWidth="1.5" />
      <line x1="575" y1="168" x2="600" y2="158" stroke="#34A853" strokeWidth="1.5" />

      {/* Network Tiers */}
      <rect x="20" y="232" width="780" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="410" y="252" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0f172a" textAnchor="middle">NETWORK SERVICE TIERS — GCP UNIQUE CONCEPT</text>

      <rect x="36" y="262" width="360" height="58" rx="6" fill="#4285F4" />
      <text x="216" y="280" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">PREMIUM TIER (default)</text>
      <text x="216" y="295" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">Traffic enters Google backbone at nearest PoP globally</text>
      <text x="216" y="309" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">Lowest latency, highest reliability, higher cost. Use for user-facing apps.</text>

      <rect x="424" y="262" width="360" height="58" rx="6" fill="#94a3b8" />
      <text x="604" y="280" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">STANDARD TIER</text>
      <text x="604" y="295" fontFamily="Arial,sans-serif" fontSize="8" fill="#e2e8f0" textAnchor="middle">Traffic uses public Internet — similar to AWS/Azure default</text>
      <text x="604" y="309" fontFamily="Arial,sans-serif" fontSize="8" fill="#e2e8f0" textAnchor="middle">Lower cost, higher latency. Use for batch, non-latency-sensitive egress.</text>
    </svg>
  );
}
