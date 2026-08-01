"use client";
export default function SecurityArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sad-title" style={{ width: "100%", height: "auto" }}>
      <title id="sad-title">Multi-Cloud Security Architecture: Zero Trust, PAM, encryption and secrets management</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD SECURITY ARCHITECTURE</text>

      {/* Zero Trust center */}
      <rect x="280" y="30" width="260" height="52" rx="8" fill="#dc2626" />
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">ZERO TRUST PRINCIPLE</text>
      <text x="410" y="68" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca" textAnchor="middle">Never trust, always verify — across ALL clouds</text>
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fca5a5" textAnchor="middle">Identity + Device + Context — network location gives NO trust</text>

      {/* Identity Security */}
      <rect x="10" y="98" width="370" height="100" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="195" y="116" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#6b21a8" textAnchor="middle">IDENTITY SECURITY (Multi-Cloud)</text>
      <rect x="18" y="122" width="174" height="32" rx="4" fill="#e9d5ff" />
      <text x="105" y="136" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">Central IdP + MFA</text>
      <text x="105" y="150" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">Entra ID / Okta + FIDO2</text>
      <rect x="200" y="122" width="174" height="32" rx="4" fill="#e9d5ff" />
      <text x="287" y="136" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">PAM + JIT Access</text>
      <text x="287" y="150" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">CyberArk / Azure PIM / SSM</text>
      <rect x="18" y="160" width="356" height="30" rx="4" fill="#f3e8ff" />
      <text x="196" y="174" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#6b21a8" textAnchor="middle">Workload Identity: no hardcoded creds. AWS IRSA / Azure Managed Identity / GCP WIF</text>
      <text x="196" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">External Secrets Operator / HashiCorp Vault — cross-cloud consistent secret access</text>

      {/* Encryption */}
      <rect x="440" y="98" width="370" height="100" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="625" y="116" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#14532d" textAnchor="middle">ENCRYPTION (All Layers)</text>
      <rect x="448" y="122" width="174" height="32" rx="4" fill="#bbf7d0" />
      <text x="535" y="136" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">At Rest</text>
      <text x="535" y="150" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">AES-256 / CMEK / BYOK</text>
      <rect x="630" y="122" width="174" height="32" rx="4" fill="#bbf7d0" />
      <text x="717" y="136" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">In Transit</text>
      <text x="717" y="150" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">TLS 1.3 / mTLS / IPsec</text>
      <rect x="448" y="160" width="356" height="30" rx="4" fill="#dcfce7" />
      <text x="626" y="174" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">KMS per cloud: AWS KMS · Azure Key Vault · GCP Cloud KMS</text>
      <text x="626" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">Cross-cloud: HashiCorp Vault (BYOK/HYOK). On-prem HSM: Thales/Entrust.</text>

      {/* Network Security */}
      <rect x="10" y="212" width="370" height="100" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="195" y="230" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#9a3412" textAnchor="middle">NETWORK SECURITY (Per Cloud)</text>
      <rect x="18" y="236" width="108" height="30" rx="4" fill="#fed7aa" />
      <text x="72" y="250" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">AWS</text>
      <text x="72" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">SG + NACL + WAF</text>
      <rect x="134" y="236" width="108" height="30" rx="4" fill="#fed7aa" />
      <text x="188" y="250" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Azure</text>
      <text x="188" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">NSG + Firewall + WAF</text>
      <rect x="250" y="236" width="122" height="30" rx="4" fill="#fed7aa" />
      <text x="311" y="250" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">GCP</text>
      <text x="311" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">FW Rules + Cloud Armor</text>
      <rect x="18" y="272" width="354" height="32" rx="4" fill="#ffedd5" />
      <text x="195" y="286" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412" textAnchor="middle">Microsegmentation: east-west traffic control within each cloud</text>
      <text x="195" y="300" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c" textAnchor="middle">Cross-cloud: Bastion hosts (AWS SSM / Azure Bastion / GCP IAP). No open RDP/SSH.</text>

      {/* Compliance & SIEM */}
      <rect x="440" y="212" width="370" height="100" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="625" y="230" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e40af" textAnchor="middle">COMPLIANCE + SIEM</text>
      <rect x="448" y="236" width="166" height="30" rx="4" fill="#bfdbfe" />
      <text x="531" y="250" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Cloud CSPM</text>
      <text x="531" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Defender / SCC / GuardDuty</text>
      <rect x="622" y="236" width="180" height="30" rx="4" fill="#bfdbfe" />
      <text x="712" y="250" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Central SIEM</text>
      <text x="712" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Sentinel / Splunk / Chronicle</text>
      <rect x="448" y="272" width="354" height="32" rx="4" fill="#dbeafe" />
      <text x="625" y="286" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">All cloud audit logs → central SIEM. Unified threat detection.</text>
      <text x="625" y="300" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">PCI-DSS, SOC2, ISO27001, GDPR, DPDPA — cross-cloud evidence collection.</text>

      {/* Bottom ZT arrows */}
      <line x1="280" y1="72" x2="195" y2="98" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="410" y1="82" x2="410" y2="98" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="540" y1="72" x2="625" y2="98" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Bottom bar */}
      <rect x="10" y="322" width="800" height="30" rx="6" fill="#1e293b" />
      <text x="410" y="340" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">Security posture = weakest cloud matters. Consistent policies across all clouds mandatory. One misconfigured SG = entire multi-cloud compromised.</text>
    </svg>
  );
}
