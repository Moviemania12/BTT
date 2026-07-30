"use client";
export default function InternetTrafficDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="it-title">
      <title id="it-title">AWS Internet and NAT Gateway Traffic Paths</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">INTERNET TRAFFIC PATHS: INBOUND vs PRIVATE OUTBOUND</text>

      {/* Path 1: Inbound */}
      <rect x="25" y="42" width="380" height="270" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="215" y="62" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">PATH 1: INBOUND (Internet → Instance)</text>

      <rect x="80" y="78" width="140" height="32" rx="6" fill="#0f172a" />
      <text x="150" y="99" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet User</text>

      <line x1="150" y1="110" x2="150" y2="130" stroke="#2563EB" strokeWidth="2" />
      <rect x="80" y="130" width="140" height="32" rx="6" fill="#7c3aed" />
      <text x="150" y="151" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet Gateway (IGW)</text>

      <line x1="150" y1="162" x2="150" y2="182" stroke="#2563EB" strokeWidth="2" />
      <rect x="65" y="182" width="170" height="44" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="150" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Public Subnet</text>
      <text x="150" y="218" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">EC2 with Public IP — route → IGW</text>

      <line x1="150" y1="226" x2="150" y2="246" stroke="#2563EB" strokeWidth="2" />
      <rect x="75" y="246" width="150" height="50" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="150" y="264" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#14532d" textAnchor="middle">Requirements:</text>
      <text x="150" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">• Public IP on instance</text>
      <text x="150" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">• Route table: 0.0.0.0/0 → IGW</text>

      {/* Path 2: Private outbound */}
      <rect x="415" y="42" width="380" height="270" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="605" y="62" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">PATH 2: PRIVATE OUTBOUND (via NAT)</text>

      <rect x="490" y="78" width="140" height="32" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="560" y="99" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">EC2 (Private Subnet)</text>

      <line x1="560" y1="110" x2="560" y2="130" stroke="#f97316" strokeWidth="2" />
      <rect x="480" y="130" width="160" height="32" rx="6" fill="#0891b2" />
      <text x="560" y="151" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">NAT Gateway (public subnet)</text>

      <line x1="560" y1="162" x2="560" y2="182" stroke="#f97316" strokeWidth="2" />
      <rect x="490" y="182" width="140" height="32" rx="6" fill="#7c3aed" />
      <text x="560" y="203" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet Gateway (IGW)</text>

      <line x1="560" y1="214" x2="560" y2="234" stroke="#f97316" strokeWidth="2" />
      <rect x="490" y="234" width="140" height="32" rx="6" fill="#0f172a" />
      <text x="560" y="255" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">Internet</text>

      <rect x="440" y="278" width="310" height="26" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="595" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">⚠ NAT GW: outbound only — no unsolicited inbound from Internet</text>

      {/* Legend */}
      <text x="25" y="325" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">IGW = IPv4 address translation (public↔private). NAT Gateway: managed, per-AZ, outbound-initiated only.</text>
    </svg>
  );
}
