"use client";
export default function IdentityFederationDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ifd-title" style={{ width: "100%", height: "auto" }}>
      <title id="ifd-title">Hybrid Identity Federation: Active Directory to Cloud Identity flow</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID IDENTITY FEDERATION — AD DS TO CLOUD</text>

      {/* On-prem Identity */}
      <rect x="10" y="34" width="220" height="230" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
      <text x="120" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM IDENTITY</text>
      {[
        { y: 68, bg: "#334155", text1: "Active Directory (AD DS)", text2: "LDAP + Kerberos + GPO", tc: "#f1f5f9" },
        { y: 108, bg: "#475569", text1: "ADFS (Optional)", text2: "WS-Federation / SAML 2.0", tc: "#f8fafc" },
        { y: 148, bg: "#64748b", text1: "Azure AD Connect", text2: "Sync Agent — runs on-prem", tc: "#f8fafc" },
        { y: 188, bg: "#94a3b8", text1: "Local Kerberos Tokens", text2: "Windows domain login", tc: "#0f172a" },
        { y: 228, bg: "#cbd5e1", text1: "PKI / Smart Cards", text2: "Certificate-based auth", tc: "#1e293b" },
      ].map(({ y, bg, text1, text2, tc }) => (
        <g key={y}>
          <rect x="22" y={y} width="196" height="34" rx="4" fill={bg} />
          <text x="120" y={y + 14} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={tc} textAnchor="middle">{text1}</text>
          <text x="120" y={y + 28} fontFamily="Arial,sans-serif" fontSize="7.5" fill={tc} textAnchor="middle">{text2}</text>
        </g>
      ))}

      {/* Sync arrow */}
      <rect x="236" y="100" width="168" height="160" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,3" />
      <text x="320" y="118" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">SYNC / FEDERATION</text>
      <text x="320" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Password Hash Sync</text>
      <text x="320" y="154" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9333ea" textAnchor="middle">(PHS — simplest, cloud auth)</text>
      <line x1="320" y1="160" x2="320" y2="172" stroke="#9333ea" strokeWidth="1" />
      <text x="320" y="182" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Pass-through Auth</text>
      <text x="320" y="196" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9333ea" textAnchor="middle">(PTA — on-prem validates)</text>
      <line x1="320" y1="202" x2="320" y2="214" stroke="#9333ea" strokeWidth="1" />
      <text x="320" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Federation (ADFS)</text>
      <text x="320" y="238" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9333ea" textAnchor="middle">(complex, max control)</text>

      <line x1="230" y1="172" x2="236" y2="172" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="404" y1="172" x2="414" y2="172" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="412,168 420,172 412,176" fill="#7c3aed" />

      {/* Cloud Identity */}
      <rect x="420" y="34" width="220" height="230" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="530" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0284c7" textAnchor="middle">CLOUD IDENTITY</text>
      {[
        { y: 68, bg: "#0284c7", text1: "Microsoft Entra ID", text2: "OAuth2 / OIDC / SAML", tc: "#f0f9ff" },
        { y: 108, bg: "#0369a1", text1: "AWS IAM Identity Center", text2: "SSO + SCIM provisioning", tc: "#f0f9ff" },
        { y: 148, bg: "#0ea5e9", text1: "GCP Cloud Identity", text2: "GCDS sync tool", tc: "#0c4a6e" },
        { y: 188, bg: "#38bdf8", text1: "Conditional Access / SCP", text2: "MFA + device compliance", tc: "#0c4a6e" },
        { y: 228, bg: "#7dd3fc", text1: "Workload Identity", text2: "Service accounts, no keys", tc: "#0c4a6e" },
      ].map(({ y, bg, text1, text2, tc }) => (
        <g key={y}>
          <rect x="432" y={y} width="196" height="34" rx="4" fill={bg} />
          <text x="530" y={y + 14} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={tc} textAnchor="middle">{text1}</text>
          <text x="530" y={y + 28} fontFamily="Arial,sans-serif" fontSize="7.5" fill={tc} textAnchor="middle">{text2}</text>
        </g>
      ))}

      {/* Applications */}
      <rect x="650" y="34" width="160" height="230" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="730" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#15803d" textAnchor="middle">APPLICATIONS</text>
      {[
        "Microsoft 365",
        "Azure Portal",
        "AWS Console",
        "GCP Console",
        "Salesforce / SaaS",
        "On-prem Web Apps",
        "Kubernetes RBAC",
      ].map((app, i) => (
        <g key={app}>
          <rect x="662" y={68 + i * 28} width="136" height="22" rx="3" fill={i % 2 === 0 ? "#dcfce7" : "#bbf7d0"} />
          <text x="730" y={83 + i * 28} fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">{app}</text>
        </g>
      ))}

      <line x1="640" y1="172" x2="650" y2="172" stroke="#16a34a" strokeWidth="2" />
      <polygon points="648,168 656,172 648,176" fill="#16a34a" />

      {/* Flow explanation */}
      <rect x="10" y="278" width="800" height="72" rx="8" fill="#1e293b" />
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7dd3fc" textAnchor="middle">SINGLE SIGN-ON FLOW: Engineer tries to access Azure Portal</text>
      <text x="20" y="314" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">1. Browser redirects to Entra ID login page</text>
      <text x="20" y="328" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">2. Entra ID checks: PHS = validates cloud hash; PTA = calls on-prem agent; ADFS = redirects to on-prem</text>
      <text x="20" y="342" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">3. Conditional Access: MFA required? Device compliant? Location allowed?</text>
      <text x="460" y="314" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">4. Token issued (JWT) → App validates token signature</text>
      <text x="460" y="328" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">5. User accesses app with same on-prem AD credentials</text>
      <text x="460" y="342" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc">Result: One login → access to on-prem + cloud apps</text>
    </svg>
  );
}
