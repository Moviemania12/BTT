"use client";
export default function GcpGlobalDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gg-title">
      <title id="gg-title">GCP Global Infrastructure: Regions, Zones and Edge Network</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP GLOBAL INFRASTRUCTURE: REGIONS, ZONES AND GLOBAL VPC</text>

      {/* Region 1 */}
      <rect x="20" y="36" width="240" height="220" rx="8" fill="#eff6ff" stroke="#4285F4" strokeWidth="2" />
      <text x="140" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">REGION: asia-south1</text>
      <text x="140" y="70" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Mumbai, India</text>

      {[["Zone a", "10.0.1.0/24"], ["Zone b", "10.0.2.0/24"], ["Zone c", "10.0.3.0/24"]].map(([zone, cidr], i) => (
        <g key={zone}>
          <rect x="36" y={84 + i * 56} width="208" height="48" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="140" y={104 + i * 56} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">asia-south1-{zone.slice(-1)}</text>
          <text x="140" y={118 + i * 56} fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Subnet regional — {cidr}</text>
          <text x="140" y={130 + i * 56} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563eb" textAnchor="middle">Independent power, cooling, network</text>
        </g>
      ))}

      {/* Region 2 */}
      <rect x="290" y="36" width="240" height="220" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">REGION: us-central1</text>
      <text x="410" y="70" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Iowa, USA</text>

      {[["Zone a", "10.1.1.0/24"], ["Zone b", "10.1.2.0/24"], ["Zone c", "10.1.3.0/24"]].map(([zone, cidr], i) => (
        <g key={zone}>
          <rect x="306" y={84 + i * 56} width="208" height="48" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
          <text x="410" y={104 + i * 56} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">us-central1-{zone.slice(-1)}</text>
          <text x="410" y={118 + i * 56} fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Subnet regional — {cidr}</text>
          <text x="410" y={130 + i * 56} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a" textAnchor="middle">Independent power, cooling, network</text>
        </g>
      ))}

      {/* Region 3 */}
      <rect x="560" y="36" width="240" height="220" rx="8" fill="#fff7ed" stroke="#FBBC04" strokeWidth="2" />
      <text x="680" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">REGION: europe-west1</text>
      <text x="680" y="70" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Belgium, EU</text>

      {[["Zone b", "10.2.1.0/24"], ["Zone c", "10.2.2.0/24"], ["Zone d", "10.2.3.0/24"]].map(([zone, cidr], i) => (
        <g key={zone}>
          <rect x="576" y={84 + i * 56} width="208" height="48" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
          <text x="680" y={104 + i * 56} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">europe-west1-{zone.slice(-1)}</text>
          <text x="680" y={118 + i * 56} fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Subnet regional — {cidr}</text>
          <text x="680" y={130 + i * 56} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#f97316" textAnchor="middle">Independent power, cooling, network</text>
        </g>
      ))}

      {/* Global VPC spanning all */}
      <rect x="20" y="268" width="780" height="52" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6,3" />
      <text x="410" y="288" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">GLOBAL VPC — Spans ALL Regions automatically</text>
      <text x="410" y="304" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce" textAnchor="middle">Single VPC, subnets regional. Internal traffic routed via Google backbone — no explicit peering needed within VPC.</text>
      <text x="410" y="314" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">AWS: VPC per Region. Azure: VNet per Region. GCP: One VPC = all Regions.</text>

      {/* Edge note */}
      <rect x="20" y="330" width="780" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="347" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0f172a">Edge Network:</text>
      <text x="110" y="347" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Cloud CDN / Media CDN PoPs (100+ globally) • Premium Tier: Google backbone, not Internet • Standard Tier: Internet routing • Cloud Armor at edge</text>
      <text x="30" y="362" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">No explicit Region Pairs like Azure. GCP does not guarantee cross-region pairing for DR — engineer chooses DR Region based on requirements.</text>
    </svg>
  );
}
