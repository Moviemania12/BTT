"use client";
export default function HybridSecurityDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hsd-title" style={{ width: "100%", height: "auto" }}>
      <title id="hsd-title">Hybrid Cloud Security Layers: Zero Trust, Network, Identity, Data encryption</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID CLOUD SECURITY — LAYERED DEFENCE MODEL</text>

      {/* Zero Trust core */}
      <rect x="280" y="30" width="260" height="64" rx="8" fill="#dc2626" />
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">ZERO TRUST PRINCIPLE</text>
      <text x="410" y="68" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca" textAnchor="middle">"Never trust, always verify" — Identity + Device + Context</text>
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="8" fill="#fca5a5" textAnchor="middle">Network location gives ZERO implicit trust</text>

      {/* Layer 1: Network */}
      <rect x="10" y="108" width="380" height="112" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="200" y="126" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#9a3412" textAnchor="middle">NETWORK SECURITY LAYER</text>
      <rect x="18" y="134" width="178" height="36" rx="4" fill="#fed7aa" />
      <text x="107" y="148" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">On-Prem Perimeter</text>
      <text x="107" y="162" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">NGFW / IDS-IPS / WAF / DDoS</text>
      <rect x="204" y="134" width="178" height="36" rx="4" fill="#fed7aa" />
      <text x="293" y="148" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Cloud Network Security</text>
      <text x="293" y="162" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">NSG / SG / Firewall / Cloud Armor</text>
      <rect x="18" y="178" width="364" height="34" rx="4" fill="#ffedd5" />
      <text x="200" y="193" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Microsegmentation: East-West traffic control within on-prem + cloud</text>
      <text x="200" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">Deny by default, allow specific flows. Zero-trust network segmentation (ZTS).</text>

      {/* Layer 2: Identity */}
      <rect x="430" y="108" width="380" height="112" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="620" y="126" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#6b21a8" textAnchor="middle">IDENTITY SECURITY LAYER</text>
      <rect x="438" y="134" width="178" height="36" rx="4" fill="#e9d5ff" />
      <text x="527" y="148" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">MFA + Conditional Access</text>
      <text x="527" y="162" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">FIDO2 / Authenticator app / SMS OTP</text>
      <rect x="624" y="134" width="178" height="36" rx="4" fill="#e9d5ff" />
      <text x="713" y="148" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">Privileged Access Management</text>
      <text x="713" y="162" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">JIT access / PAW / PIM / CyberArk</text>
      <rect x="438" y="178" width="364" height="34" rx="4" fill="#f3e8ff" />
      <text x="620" y="193" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">Least Privilege: RBAC + IAM Policies across on-prem + cloud</text>
      <text x="620" y="207" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">Service accounts: no shared credentials, workload identity preferred over key files.</text>

      {/* Layer 3: Data */}
      <rect x="10" y="232" width="380" height="100" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="250" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#14532d" textAnchor="middle">DATA SECURITY LAYER</text>
      <rect x="18" y="258" width="178" height="34" rx="4" fill="#bbf7d0" />
      <text x="107" y="272" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Encryption at Rest</text>
      <text x="107" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">AES-256 / CMEK / HSM-backed keys</text>
      <rect x="204" y="258" width="178" height="34" rx="4" fill="#bbf7d0" />
      <text x="293" y="272" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Encryption in Transit</text>
      <text x="293" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">TLS 1.2+ / mTLS / IPsec / MACsec</text>
      <rect x="18" y="298" width="364" height="26" rx="4" fill="#dcfce7" />
      <text x="200" y="311" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Key Management: Cloud KMS / Azure Key Vault / HashiCorp Vault</text>
      <text x="200" y="323" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">BYOK (Bring Your Own Key) for regulated data. Key rotation automated.</text>

      {/* Layer 4: Operations */}
      <rect x="430" y="232" width="380" height="100" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="620" y="250" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e40af" textAnchor="middle">OPERATIONS SECURITY LAYER</text>
      <rect x="438" y="258" width="178" height="34" rx="4" fill="#bfdbfe" />
      <text x="527" y="272" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">SIEM / SOC</text>
      <text x="527" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Splunk / Sentinel / Chronicle / QRadar</text>
      <rect x="624" y="258" width="178" height="34" rx="4" fill="#bfdbfe" />
      <text x="713" y="272" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Vulnerability Management</text>
      <text x="713" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Defender for Cloud / SCC / GuardDuty</text>
      <rect x="438" y="298" width="364" height="26" rx="4" fill="#dbeafe" />
      <text x="620" y="311" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Unified audit logs: Cloud Audit + on-prem SIEM ingestion</text>
      <text x="620" y="323" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Threat detection: anomalous login, lateral movement, data exfiltration signals.</text>

      {/* Connection arrows from Zero Trust */}
      <line x1="280" y1="72" x2="200" y2="108" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="410" y1="94" x2="410" y2="108" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="540" y1="72" x2="620" y2="108" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="200" y1="220" x2="200" y2="232" stroke="#f97316" strokeWidth="1.5" />
      <line x1="620" y1="220" x2="620" y2="232" stroke="#7c3aed" strokeWidth="1.5" />
    </svg>
  );
}
