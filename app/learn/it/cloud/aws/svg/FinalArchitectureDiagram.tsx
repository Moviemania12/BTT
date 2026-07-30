"use client";
export default function FinalArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fa-title">
      <title id="fa-title">Final AWS Architecture: Multi-AZ with On-Prem Connectivity</title>
      <rect width="820" height="520" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">FINAL AWS ARCHITECTURE: MULTI-AZ HA WITH HYBRID CONNECTIVITY</text>

      {/* Internet */}
      <rect x="330" y="28" width="160" height="28" rx="6" fill="#0f172a" />
      <text x="410" y="47" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">INTERNET / USERS</text>

      {/* Route 53 */}
      <rect x="340" y="64" width="140" height="24" rx="5" fill="#7c3aed" />
      <text x="410" y="81" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Route 53 (DNS)</text>
      <line x1="410" y1="56" x2="410" y2="64" stroke="#374151" strokeWidth="1.5" />

      {/* AWS Region box */}
      <rect x="20" y="96" width="680" height="390" rx="10" fill="#f8fafc" stroke="#2563EB" strokeWidth="2" strokeDasharray="8,4" />
      <text x="30" y="114" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#2563EB">AWS REGION — VPC 10.0.0.0/16</text>

      {/* IGW */}
      <rect x="340" y="100" width="140" height="24" rx="5" fill="#7c3aed" />
      <text x="410" y="117" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet Gateway</text>
      <line x1="410" y1="88" x2="410" y2="100" stroke="#7c3aed" strokeWidth="1.5" />

      {/* ALB */}
      <rect x="300" y="132" width="220" height="26" rx="5" fill="#0891b2" />
      <text x="410" y="150" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Application Load Balancer (Multi-AZ)</text>
      <line x1="410" y1="124" x2="410" y2="132" stroke="#0891b2" strokeWidth="1.5" />

      {/* AZ-a */}
      <rect x="35" y="168" width="295" height="210" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="182" y="186" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Availability Zone A</text>
      <line x1="360" y1="158" x2="230" y2="168" stroke="#0891b2" strokeWidth="1.5" />

      <rect x="50" y="196" width="120" height="30" rx="5" fill="#16a34a" />
      <text x="110" y="210" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Public Subnet</text>
      <text x="110" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dcfce7" textAnchor="middle">NAT GW</text>

      <rect x="185" y="196" width="120" height="30" rx="5" fill="#2563EB" />
      <text x="245" y="210" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Private Subnet</text>
      <text x="245" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">EC2 App × 2 (ASG)</text>

      <rect x="50" y="238" width="255" height="60" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="177" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Security Group: port 443/80 allowed</text>
      <text x="177" y="273" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">NACL: inbound + return (ephemeral)</text>
      <text x="177" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Route: 0.0.0.0/0 → NAT GW</text>

      <rect x="50" y="310" width="255" height="54" rx="5" fill="#7c3aed" />
      <text x="177" y="330" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">RDS Primary (Multi-AZ)</text>
      <text x="177" y="346" fontFamily="Arial,sans-serif" fontSize="8" fill="#e9d5ff" textAnchor="middle">Sync replication to AZ-b standby</text>
      <text x="177" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#d8b4fe" textAnchor="middle">Subnet: DB private subnet</text>

      {/* AZ-b */}
      <rect x="390" y="168" width="295" height="210" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
      <text x="537" y="186" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Availability Zone B</text>
      <line x1="460" y1="158" x2="540" y2="168" stroke="#0891b2" strokeWidth="1.5" />

      <rect x="405" y="196" width="120" height="30" rx="5" fill="#16a34a" />
      <text x="465" y="210" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Public Subnet</text>
      <text x="465" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dcfce7" textAnchor="middle">NAT GW</text>

      <rect x="540" y="196" width="120" height="30" rx="5" fill="#f97316" />
      <text x="600" y="210" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Private Subnet</text>
      <text x="600" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fed7aa" textAnchor="middle">EC2 App × 2 (ASG)</text>

      <rect x="405" y="238" width="255" height="60" rx="5" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="532" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Security Group: same rules</text>
      <text x="532" y="273" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">NACL: same subnet-level rules</text>
      <text x="532" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Route: 0.0.0.0/0 → NAT GW (AZ-b)</text>

      <rect x="405" y="310" width="255" height="54" rx="5" fill="#7c3aed" strokeDasharray="5,3" stroke="#a855f7" strokeWidth="1.5" />
      <text x="532" y="330" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">RDS Standby (Auto-promoted)</text>
      <text x="532" y="346" fontFamily="Arial,sans-serif" fontSize="8" fill="#e9d5ff" textAnchor="middle">Not readable during normal operation</text>
      <text x="532" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#d8b4fe" textAnchor="middle">DNS failover on primary failure</text>

      {/* CloudWatch / IAM */}
      <rect x="710" y="168" width="70" height="50" rx="5" fill="#0f172a" />
      <text x="745" y="188" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#22d3ee" textAnchor="middle">Cloud</text>
      <text x="745" y="202" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#22d3ee" textAnchor="middle">Watch</text>
      <text x="745" y="214" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Metrics/Logs</text>

      <rect x="710" y="228" width="70" height="50" rx="5" fill="#0f172a" />
      <text x="745" y="248" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#f97316" textAnchor="middle">IAM</text>
      <text x="745" y="262" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#f97316" textAnchor="middle">Roles</text>
      <text x="745" y="276" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">EC2/Services</text>

      {/* On-prem */}
      <rect x="20" y="388" width="200" height="80" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="120" y="408" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM DATA CENTER</text>
      <text x="120" y="424" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">VPN / Direct Connect</text>
      <text x="120" y="440" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">→ Transit Gateway or VGW</text>
      <text x="120" y="456" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">→ Private subnets in VPC</text>

      <line x1="220" y1="428" x2="260" y2="340" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,3" />

      <text x="410" y="494" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Management: AWS Management Console / CLI / SDK → CloudTrail logs all API calls. On-prem ↔ AWS via VPN or Direct Connect.</text>
      <text x="410" y="508" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">S3/EFS for storage. CloudWatch for operational visibility. IAM Roles on EC2 instances — no embedded keys.</text>
    </svg>
  );
}
