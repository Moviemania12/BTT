"use client";
export default function HybridConnectivityDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hc-title">
      <title id="hc-title">AWS Hybrid Connectivity: Site-to-Site VPN and Direct Connect</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID CONNECTIVITY: SITE-TO-SITE VPN vs DIRECT CONNECT</text>

      {/* On-Prem DC */}
      <rect x="20" y="46" width="220" height="200" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="130" y="70" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM DATA CENTER</text>
      <rect x="40" y="84" width="180" height="30" rx="6" fill="#475569" />
      <text x="130" y="104" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Routers / Firewalls</text>
      <rect x="40" y="124" width="180" height="30" rx="6" fill="#334155" />
      <text x="130" y="144" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Customer Gateway (CGW)</text>
      <rect x="40" y="164" width="180" height="26" rx="4" fill="#94a3b8" />
      <text x="130" y="181" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#0f172a" textAnchor="middle">On-prem servers / network</text>
      <rect x="40" y="198" width="180" height="26" rx="4" fill="#94a3b8" />
      <text x="130" y="215" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#0f172a" textAnchor="middle">Internet connection / private circuit</text>

      {/* AWS VPC */}
      <rect x="580" y="46" width="220" height="200" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="690" y="70" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">AWS VPC</text>
      <rect x="600" y="84" width="180" height="30" rx="6" fill="#2563EB" />
      <text x="690" y="104" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Virtual Private Gateway (VGW)</text>
      <text x="690" y="122" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">or Transit Gateway (TGW)</text>
      <rect x="600" y="136" width="180" height="30" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="690" y="156" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">Private subnets</text>
      <rect x="600" y="176" width="180" height="30" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="690" y="196" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">EC2 / RDS / Services</text>
      <rect x="600" y="216" width="180" height="24" rx="4" fill="#bfdbfe" />
      <text x="690" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Route: on-prem CIDR via VGW/TGW</text>

      {/* VPN path */}
      <rect x="280" y="60" width="260" height="64" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">OPTION 1: SITE-TO-SITE VPN</text>
      <text x="410" y="98" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">IPsec over Internet — ENCRYPTED</text>
      <text x="410" y="112" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">Variable latency • Lower cost • Fast setup</text>
      <line x1="240" y1="136" x2="280" y2="92" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />
      <line x1="540" y1="92" x2="580" y2="116" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />

      {/* Direct Connect path */}
      <rect x="280" y="150" width="260" height="72" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="172" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">OPTION 2: DIRECT CONNECT</text>
      <text x="410" y="188" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Dedicated private circuit — NOT encrypted by default</text>
      <text x="410" y="204" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Predictable latency • High bandwidth • Higher cost</text>
      <text x="410" y="218" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Add IPsec for encryption if needed</text>
      <line x1="240" y1="184" x2="280" y2="186" stroke="#16a34a" strokeWidth="2" />
      <line x1="540" y1="186" x2="580" y2="156" stroke="#16a34a" strokeWidth="2" />

      {/* Transit Gateway */}
      <rect x="280" y="248" width="260" height="52" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">TRANSIT GATEWAY (TGW)</text>
      <text x="410" y="284" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce" textAnchor="middle">Hub for multiple VPCs + on-prem connections</text>
      <text x="410" y="298" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8" textAnchor="middle">Replaces complex point-to-point VPC peering</text>

      <text x="410" y="328" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Common pattern: Direct Connect primary + VPN backup. DX is NOT encrypted by default — add encryption layer separately.</text>
    </svg>
  );
}
