"use client";
export default function VpcAdvancedDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="vad-title">
      <title id="vad-title">AWS VPC Advanced: Endpoints, Peering, Private Link</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">VPC CONNECTIVITY OPTIONS: ENDPOINTS, PEERING, TRANSIT GATEWAY</text>

      {/* VPC A */}
      <rect x="20" y="38" width="230" height="280" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="135" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">VPC A (10.0.0.0/16)</text>
      <rect x="36" y="68" width="198" height="36" rx="5" fill="#2563EB" />
      <text x="135" y="82" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 App Instances</text>
      <text x="135" y="96" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">Private subnet: 10.0.1.0/24</text>
      <rect x="36" y="112" width="198" height="36" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="135" y="126" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Gateway Endpoint</text>
      <text x="135" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">S3 / DynamoDB — no NAT needed</text>
      <rect x="36" y="156" width="198" height="36" rx="5" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
      <text x="135" y="170" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#075985" textAnchor="middle">Interface Endpoint (PrivateLink)</text>
      <text x="135" y="184" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">EC2 API, STS, Secrets Manager…</text>
      <rect x="36" y="200" width="198" height="36" rx="5" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1" />
      <text x="135" y="214" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0369a1" textAnchor="middle">VPC Peering</text>
      <text x="135" y="228" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0284c7" textAnchor="middle">Direct to VPC B — not transitive</text>
      <rect x="36" y="244" width="198" height="60" rx="5" fill="#bfdbfe" />
      <text x="135" y="260" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">CIDR Planning:</text>
      <text x="135" y="274" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">No overlapping CIDRs (peering/TGW)</text>
      <text x="135" y="287" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Reserve /16 per VPC — subnet from it</text>
      <text x="135" y="298" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Plan for future expansion</text>

      {/* Transit Gateway */}
      <rect x="310" y="100" width="200" height="140" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="410" y="120" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#6b21a8" textAnchor="middle">TRANSIT GATEWAY</text>
      <text x="410" y="136" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce" textAnchor="middle">Regional hub (≈ WAN router)</text>
      <rect x="326" y="146" width="168" height="28" rx="4" fill="#e9d5ff" />
      <text x="410" y="160" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8" textAnchor="middle">Attach: VPC-A, VPC-B, VPC-C</text>
      <text x="410" y="172" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">+ VPN / Direct Connect</text>
      <rect x="326" y="180" width="168" height="44" rx="4" fill="#f3e8ff" />
      <text x="410" y="196" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b21a8" textAnchor="middle">TGW Route Tables control</text>
      <text x="410" y="210" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b21a8" textAnchor="middle">which VPCs can talk to which</text>
      <text x="410" y="224" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">Transitive routing supported</text>

      {/* VPC B */}
      <rect x="570" y="38" width="230" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="685" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">VPC B (10.1.0.0/16)</text>
      <rect x="586" y="68" width="198" height="36" rx="5" fill="#16a34a" />
      <text x="685" y="82" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Shared Services VPC</text>
      <text x="685" y="96" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bbf7d0" textAnchor="middle">AD, DNS, monitoring tools</text>
      <rect x="586" y="112" width="198" height="36" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="685" y="126" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">No overlapping CIDR with A</text>
      <text x="685" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">Required for peering/TGW</text>
      <rect x="586" y="156" width="198" height="32" rx="5" fill="#bbf7d0" />
      <text x="685" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">VPC Peering: non-transitive</text>
      <text x="685" y="182" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">A↔B direct; A↔C via TGW</text>

      {/* VPC C */}
      <rect x="570" y="215" width="230" height="103" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="685" y="235" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">VPC C (10.2.0.0/16)</text>
      <rect x="586" y="245" width="198" height="36" rx="5" fill="#f97316" />
      <text x="685" y="259" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Production App VPC</text>
      <text x="685" y="273" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fed7aa" textAnchor="middle">Isolated by TGW route table</text>
      <rect x="586" y="290" width="198" height="20" rx="4" fill="#fed7aa" />
      <text x="685" y="304" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Different AWS account possible</text>

      {/* Arrows */}
      <line x1="250" y1="218" x2="310" y2="180" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="510" y1="160" x2="570" y2="130" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="510" y1="190" x2="570" y2="265" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* S3 endpoint target */}
      <rect x="20" y="335" width="780" height="36" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="350" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0f172a">DC Engineer Mapping:</text>
      <text x="130" y="350" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Gateway Endpoint ≈ Internal route to avoid Internet path. Interface Endpoint ≈ private DNS alias for AWS service.</text>
      <text x="30" y="364" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Transit Gateway ≈ Core WAN router for your multi-VPC network. VPC Peering ≈ point-to-point L3 link (not transitive).</text>
    </svg>
  );
}
