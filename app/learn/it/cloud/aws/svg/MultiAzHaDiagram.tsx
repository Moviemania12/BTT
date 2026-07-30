"use client";
export default function MultiAzHaDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="maz-title">
      <title id="maz-title">AWS Multi-AZ High Availability Architecture</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-AZ HIGH AVAILABILITY ARCHITECTURE</text>

      {/* Internet + Route 53 */}
      <rect x="320" y="36" width="180" height="28" rx="6" fill="#0f172a" />
      <text x="410" y="55" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet Users</text>

      <line x1="410" y1="64" x2="410" y2="80" stroke="#374151" strokeWidth="2" />
      <rect x="310" y="80" width="200" height="28" rx="6" fill="#7c3aed" />
      <text x="410" y="99" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Route 53 (DNS + Health Checks)</text>

      <line x1="410" y1="108" x2="410" y2="124" stroke="#374151" strokeWidth="2" />
      <rect x="280" y="124" width="260" height="30" rx="6" fill="#0891b2" />
      <text x="410" y="144" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Application Load Balancer (Multi-AZ)</text>

      {/* AZ-a */}
      <rect x="30" y="170" width="340" height="200" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="1.5" />
      <text x="200" y="190" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">Availability Zone A</text>

      <line x1="370" y1="154" x2="230" y2="170" stroke="#0891b2" strokeWidth="1.5" />

      <rect x="50" y="200" width="140" height="36" rx="6" fill="#2563EB" />
      <text x="120" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 App Instance</text>
      <text x="120" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">ASG managed</text>

      <rect x="210" y="200" width="140" height="36" rx="6" fill="#2563EB" />
      <text x="280" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 App Instance</text>
      <text x="280" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">ASG managed</text>

      <rect x="50" y="256" width="300" height="32" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="200" y="270" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Private Subnet (10.0.2.0/24)</text>
      <text x="200" y="283" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Security Groups applied per instance</text>

      <rect x="50" y="298" width="300" height="56" rx="6" fill="#7c3aed" />
      <text x="200" y="318" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">RDS Primary</text>
      <text x="200" y="334" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#e9d5ff" textAnchor="middle">Multi-AZ: synchronous to standby in AZ-b</text>
      <text x="200" y="348" fontFamily="Arial,sans-serif" fontSize="8" fill="#d8b4fe" textAnchor="middle">DNS-based failover if primary fails</text>

      {/* AZ-b */}
      <rect x="450" y="170" width="340" height="200" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="620" y="190" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">Availability Zone B</text>

      <line x1="450" y1="154" x2="590" y2="170" stroke="#0891b2" strokeWidth="1.5" />

      <rect x="470" y="200" width="140" height="36" rx="6" fill="#f97316" />
      <text x="540" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 App Instance</text>
      <text x="540" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">ASG managed</text>

      <rect x="630" y="200" width="140" height="36" rx="6" fill="#f97316" />
      <text x="700" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 App Instance</text>
      <text x="700" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">ASG managed</text>

      <rect x="470" y="256" width="300" height="32" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="620" y="270" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Private Subnet (10.0.4.0/24)</text>
      <text x="620" y="283" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Security Groups applied per instance</text>

      <rect x="470" y="298" width="300" height="56" rx="6" fill="#7c3aed" strokeDasharray="6,3" stroke="#a855f7" strokeWidth="1.5" />
      <text x="620" y="318" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">RDS Standby</text>
      <text x="620" y="334" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#e9d5ff" textAnchor="middle">Synchronous replica — NOT readable</text>
      <text x="620" y="348" fontFamily="Arial,sans-serif" fontSize="8" fill="#d8b4fe" textAnchor="middle">Promoted on primary failure</text>

      {/* Sync arrow between RDS */}
      <line x1="350" y1="326" x2="470" y2="326" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,3" />
      <text x="410" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">sync replication</text>

      <text x="410" y="385" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Multi-AZ ≠ automatic HA. Application statelessness, DB reconnect logic, and health check config all matter.</text>
    </svg>
  );
}
