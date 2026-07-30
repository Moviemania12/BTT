"use client";
export default function SgNaclDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sn-title">
      <title id="sn-title">Security Group vs Network ACL: Stateful vs Stateless</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">SECURITY GROUP (STATEFUL) vs NETWORK ACL (STATELESS)</text>

      {/* Security Group panel */}
      <rect x="20" y="38" width="380" height="340" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="210" y="60" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af" textAnchor="middle">SECURITY GROUP</text>
      <text x="210" y="76" fontFamily="Arial,sans-serif" fontSize="9" fill="#3730a3" textAnchor="middle">Instance-level · STATEFUL · Allow only</text>

      <rect x="35" y="88" width="350" height="20" rx="3" fill="#dbeafe" />
      <text x="210" y="102" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">INBOUND RULE: Allow TCP 443 from 0.0.0.0/0</text>

      {/* Traffic flow */}
      <rect x="60" y="118" width="120" height="28" rx="6" fill="#0f172a" />
      <text x="120" y="137" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Client Request</text>

      <line x1="180" y1="132" x2="240" y2="132" stroke="#2563EB" strokeWidth="2" markerEnd="url(#a1)" />
      <rect x="240" y="118" width="120" height="28" rx="6" fill="#2563EB" />
      <text x="300" y="137" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 Instance</text>

      <text x="210" y="164" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">✓ Inbound TCP 443 → ALLOWED</text>

      <line x1="300" y1="170" x2="300" y2="188" stroke="#16a34a" strokeWidth="2" />
      <line x1="300" y1="188" x2="120" y2="188" stroke="#16a34a" strokeWidth="2" />
      <line x1="120" y1="188" x2="120" y2="170" stroke="#16a34a" strokeWidth="2" />
      <text x="210" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">✓ Return traffic AUTOMATICALLY allowed</text>
      <text x="210" y="218" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">(no separate outbound rule needed — stateful)</text>

      <rect x="35" y="232" width="350" height="70" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="210" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">KEY PROPERTIES</text>
      <text x="45" y="265" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d">• ALLOW rules only — no explicit DENY</text>
      <text x="45" y="280" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d">• Stateful: return traffic auto-permitted</text>
      <text x="45" y="295" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d">• Applied at instance (ENI) level</text>

      <rect x="35" y="312" width="350" height="50" rx="6" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="210" y="330" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e" textAnchor="middle">Default SG: allows all outbound, denies all inbound</text>
      <text x="210" y="345" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e" textAnchor="middle">(unless you add rules)</text>
      <text x="210" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Multiple SGs can be applied to one instance</text>

      {/* NACL panel */}
      <rect x="420" y="38" width="380" height="340" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="610" y="60" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#9a3412" textAnchor="middle">NETWORK ACL</text>
      <text x="610" y="76" fontFamily="Arial,sans-serif" fontSize="9" fill="#c2410c" textAnchor="middle">Subnet-level · STATELESS · Allow and Deny</text>

      <rect x="435" y="88" width="350" height="20" rx="3" fill="#fed7aa" />
      <text x="610" y="102" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">INBOUND Rule 100: Allow TCP 443 — OUTBOUND Rule 100: Allow TCP 1024-65535</text>

      <rect x="460" y="118" width="120" height="28" rx="6" fill="#0f172a" />
      <text x="520" y="137" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Client Request</text>

      <line x1="580" y1="132" x2="640" y2="132" stroke="#f97316" strokeWidth="2" />
      <rect x="640" y="118" width="120" height="28" rx="6" fill="#f97316" />
      <text x="700" y="137" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 Instance</text>

      <text x="610" y="164" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">✓ Inbound TCP 443 → checked against rules</text>

      <line x1="700" y1="170" x2="700" y2="188" stroke="#dc2626" strokeWidth="2" />
      <line x1="700" y1="188" x2="520" y2="188" stroke="#dc2626" strokeWidth="2" />
      <line x1="520" y1="188" x2="520" y2="170" stroke="#dc2626" strokeWidth="2" />
      <text x="610" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">⚠ Return traffic MUST be explicitly allowed</text>
      <text x="610" y="218" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">(ephemeral ports outbound — stateless!)</text>

      <rect x="435" y="232" width="350" height="70" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="610" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">KEY PROPERTIES</text>
      <text x="445" y="265" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• ALLOW and DENY rules supported</text>
      <text x="445" y="280" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• Stateless: return traffic must be separately allowed</text>
      <text x="445" y="295" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">• Rules evaluated in numbered order (lowest first)</text>

      <rect x="435" y="312" width="350" height="50" rx="6" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="610" y="330" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e" textAnchor="middle">Default NACL: allows all inbound and outbound</text>
      <text x="610" y="345" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e" textAnchor="middle">Custom NACL: denies all by default</text>
      <text x="610" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Applied at subnet level — all instances in subnet affected</text>
    </svg>
  );
}
