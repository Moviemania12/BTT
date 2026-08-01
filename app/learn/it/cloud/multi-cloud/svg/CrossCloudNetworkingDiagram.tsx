"use client";
export default function CrossCloudNetworkingDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ccn-title" style={{ width: "100%", height: "auto" }}>
      <title id="ccn-title">Cross-Cloud Networking: connectivity options between AWS, Azure and GCP</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CROSS-CLOUD NETWORKING OPTIONS</text>

      {/* AWS VPC */}
      <rect x="10" y="36" width="190" height="190" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <rect x="10" y="36" width="190" height="24" rx="7" fill="#f97316" />
      <text x="105" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">AWS VPC (us-east-1)</text>
      <rect x="22" y="68" width="166" height="30" rx="4" fill="#ffedd5" />
      <text x="105" y="83" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#c2410c" textAnchor="middle">Virtual Private Gateway (VGW)</text>
      <text x="105" y="95" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">BGP peer, 2 tunnels</text>
      <rect x="22" y="106" width="166" height="50" rx="4" fill="#fed7aa" />
      <text x="105" y="122" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Direct Connect Location</text>
      <text x="105" y="136" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">10Gbps/100Gbps to colo</text>
      <text x="105" y="149" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">Cross-connect to SD-WAN</text>
      <rect x="22" y="164" width="166" height="28" rx="4" fill="#ffedd5" />
      <text x="105" y="178" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#c2410c" textAnchor="middle">10.1.0.0/16 (non-overlapping)</text>
      <text x="105" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">CIDR planning critical</text>

      {/* Azure VNet */}
      <rect x="315" y="36" width="190" height="190" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <rect x="315" y="36" width="190" height="24" rx="7" fill="#2563EB" />
      <text x="410" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure VNet (West Europe)</text>
      <rect x="327" y="68" width="166" height="30" rx="4" fill="#dbeafe" />
      <text x="410" y="83" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">VPN Gateway / ER Gateway</text>
      <text x="410" y="95" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">BGP peer, ExpressRoute</text>
      <rect x="327" y="106" width="166" height="50" rx="4" fill="#bfdbfe" />
      <text x="410" y="122" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">ExpressRoute Location</text>
      <text x="410" y="136" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">1-100Gbps to colo</text>
      <text x="410" y="149" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Cross-connect to SD-WAN</text>
      <rect x="327" y="164" width="166" height="28" rx="4" fill="#dbeafe" />
      <text x="410" y="178" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">10.2.0.0/16 (non-overlapping)</text>
      <text x="410" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">CIDR planning critical</text>

      {/* GCP VPC */}
      <rect x="620" y="36" width="190" height="190" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <rect x="620" y="36" width="190" height="24" rx="7" fill="#34A853" />
      <text x="715" y="53" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">GCP VPC (Global)</text>
      <rect x="632" y="68" width="166" height="30" rx="4" fill="#dcfce7" />
      <text x="715" y="83" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Cloud Router (BGP)</text>
      <text x="715" y="95" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">HA VPN, 4 tunnels</text>
      <rect x="632" y="106" width="166" height="50" rx="4" fill="#bbf7d0" />
      <text x="715" y="122" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Dedicated Interconnect</text>
      <text x="715" y="136" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">10Gbps/100Gbps to colo</text>
      <text x="715" y="149" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">Cross-connect to SD-WAN</text>
      <rect x="632" y="164" width="166" height="28" rx="4" fill="#dcfce7" />
      <text x="715" y="178" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">10.3.0.0/16 (non-overlapping)</text>
      <text x="715" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">CIDR planning critical</text>

      {/* Central SD-WAN / Exchange */}
      <rect x="245" y="240" width="330" height="76" rx="8" fill="#1e293b" />
      <text x="410" y="262" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#e2e8f0" textAnchor="middle">NEUTRAL EXCHANGE FABRIC</text>
      <text x="410" y="278" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">Equinix Fabric / Megaport / Cologix</text>
      <text x="410" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">SD-WAN overlay OR colocation cross-connect</text>
      <text x="410" y="307" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Private peering — public Internet NOT traversed</text>

      {/* Connection lines */}
      <line x1="105" y1="226" x2="105" y2="256" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="105" y1="256" x2="245" y2="278" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="715" y1="226" x2="715" y2="256" stroke="#34A853" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="715" y1="256" x2="575" y2="278" stroke="#34A853" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="410" y1="226" x2="410" y2="240" stroke="#2563EB" strokeWidth="1.5" />

      {/* VPN fallback option */}
      <rect x="10" y="330" width="800" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="348" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">ALTERNATIVE: Site-to-Site VPN (Internet)</text>
      <text x="410" y="363" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">AWS VGW ↔ Azure VPN GW: IPsec over Internet. Encrypted, lower cost, variable latency. Dev/test ya backup path ke liye acceptable. Production: prefer private fabric.</text>
    </svg>
  );
}
