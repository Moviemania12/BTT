"use client";
export default function VpcArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="vpc-title">
      <title id="vpc-title">AWS VPC Architecture with Subnets, Route Tables, IGW and NAT Gateway</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS VPC ARCHITECTURE (10.0.0.0/16)</text>

      {/* VPC boundary */}
      <rect x="20" y="38" width="780" height="362" rx="10" fill="#f8fafc" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="8,4" />
      <text x="35" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#2563EB">VPC: 10.0.0.0/16 — spans all AZs in Region</text>

      {/* Internet */}
      <rect x="320" y="50" width="180" height="36" rx="6" fill="#0f172a" />
      <text x="410" y="73" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">INTERNET</text>

      {/* IGW */}
      <rect x="340" y="102" width="140" height="30" rx="6" fill="#7c3aed" />
      <text x="410" y="122" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet Gateway (IGW)</text>
      <line x1="410" y1="86" x2="410" y2="102" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowPurple)" />

      {/* AZ-a column */}
      <rect x="35" y="145" width="350" height="240" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="210" y="163" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">Availability Zone A</text>

      {/* Public subnet AZ-a */}
      <rect x="50" y="172" width="155" height="100" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="127" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Public Subnet</text>
      <text x="127" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">10.0.1.0/24 — AZ-a</text>
      <rect x="60" y="208" width="135" height="24" rx="4" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
      <text x="127" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">EC2 (public IP) / NAT GW</text>
      <rect x="60" y="238" width="135" height="22" rx="4" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
      <text x="127" y="253" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Route: 0.0.0.0/0 → IGW</text>

      {/* Private subnet AZ-a */}
      <rect x="215" y="172" width="155" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="292" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Private Subnet</text>
      <text x="292" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">10.0.2.0/24 — AZ-a</text>
      <rect x="225" y="208" width="135" height="24" rx="4" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1" />
      <text x="292" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">EC2 App / DB (private)</text>
      <rect x="225" y="238" width="135" height="22" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="292" y="253" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Route: 0.0.0.0/0 → NAT GW</text>

      {/* AZ-b column */}
      <rect x="435" y="145" width="350" height="240" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
      <text x="610" y="163" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">Availability Zone B</text>

      {/* Public subnet AZ-b */}
      <rect x="450" y="172" width="155" height="100" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
      <text x="527" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Public Subnet</text>
      <text x="527" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">10.0.3.0/24 — AZ-b</text>
      <rect x="460" y="208" width="135" height="24" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
      <text x="527" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">EC2 (public IP)</text>
      <rect x="460" y="238" width="135" height="22" rx="4" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
      <text x="527" y="253" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Route: 0.0.0.0/0 → IGW</text>

      {/* Private subnet AZ-b */}
      <rect x="615" y="172" width="155" height="100" rx="6" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="692" y="188" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">Private Subnet</text>
      <text x="692" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">10.0.4.0/24 — AZ-b</text>
      <rect x="625" y="208" width="135" height="24" rx="4" fill="#e9d5ff" stroke="#c084fc" strokeWidth="1" />
      <text x="692" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8" textAnchor="middle">EC2 App / DB (private)</text>
      <rect x="625" y="238" width="135" height="22" rx="4" fill="#f3e8ff" stroke="#d8b4fe" strokeWidth="1" />
      <text x="692" y="253" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Route: 0.0.0.0/0 → NAT GW</text>

      {/* NAT GW label */}
      <rect x="315" y="300" width="190" height="30" rx="6" fill="#0891b2" />
      <text x="410" y="320" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">NAT Gateway (in public subnet)</text>

      {/* Arrows to IGW */}
      <line x1="127" y1="145" x2="370" y2="118" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="527" y1="145" x2="450" y2="118" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Private → NAT */}
      <line x1="292" y1="272" x2="360" y2="300" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="692" y1="272" x2="460" y2="300" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* NAT → IGW */}
      <line x1="410" y1="300" x2="410" y2="132" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Legend */}
      <text x="35" y="348" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">— — Public subnet: route table has 0.0.0.0/0 → IGW</text>
      <text x="35" y="362" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">— — Private subnet: no IGW route; outbound via NAT Gateway (outbound only)</text>
      <text x="35" y="376" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">Each subnet belongs to ONE AZ. VPC spans multiple AZs within one Region.</text>
    </svg>
  );
}
