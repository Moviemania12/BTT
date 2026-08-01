"use client";
export default function FederatedIdentityDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fid-title" style={{ width: "100%", height: "auto" }}>
      <title id="fid-title">Multi-Cloud Federated Identity: Central IdP federating to AWS, Azure and GCP</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD FEDERATED IDENTITY — SINGLE LOGIN, ALL CLOUDS</text>

      {/* Central IdP */}
      <rect x="260" y="30" width="300" height="80" rx="8" fill="#6b21a8" />
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff" textAnchor="middle">CENTRAL IDENTITY PROVIDER (IdP)</text>
      <text x="410" y="68" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#e9d5ff" textAnchor="middle">Option A: Microsoft Entra ID (best for Microsoft shops)</text>
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#e9d5ff" textAnchor="middle">Option B: Okta / Ping Identity (vendor-neutral)</text>
      <text x="410" y="96" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">SAML 2.0 · OAuth 2.0 · OIDC · SCIM provisioning</text>

      {/* Arrows to clouds */}
      <line x1="310" y1="110" x2="175" y2="150" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="173,146 167,154 181,155" fill="#7c3aed" />
      <line x1="410" y1="110" x2="410" y2="150" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="406,148 410,156 414,148" fill="#7c3aed" />
      <line x1="510" y1="110" x2="645" y2="150" stroke="#7c3aed" strokeWidth="2" />
      <polygon points="639,146 653,147 647,155" fill="#7c3aed" />

      {/* Protocol labels */}
      <text x="230" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7c3aed" textAnchor="middle">SAML 2.0</text>
      <text x="425" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7c3aed">SAML/OIDC</text>
      <text x="592" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7c3aed" textAnchor="middle">SAML/OIDC</text>

      {/* AWS IAM Identity Center */}
      <rect x="20" y="154" width="290" height="140" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="165" y="174" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c2410c" textAnchor="middle">AWS IAM Identity Center (SSO)</text>
      <text x="165" y="188" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">SAML federation → maps groups to Permission Sets</text>
      {[
        ["DevOps-Team group", "→ PowerUserAccess (prod)"],
        ["DBA-Team group", "→ DatabaseAdministrator"],
        ["ReadOnly-Auditors", "→ ReadOnlyAccess (all accounts)"],
        ["Break-glass SA", "→ AdministratorAccess (vaulted)"],
      ].map(([group, role], i) => (
        <g key={i}>
          <rect x="30" y={198 + i * 24} width="270" height="20" rx="3" fill={i % 2 === 0 ? "#ffedd5" : "#fff7ed"} />
          <text x="38" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412">{group}</text>
          <text x="150" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c">{role}</text>
        </g>
      ))}
      <text x="165" y="286" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">SCIM: users auto-provisioned from IdP</text>

      {/* Azure RBAC */}
      <rect x="315" y="154" width="190" height="140" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="410" y="174" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Azure RBAC (via Entra ID)</text>
      <text x="410" y="188" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Groups → Roles at Scope</text>
      {[
        ["DevOps-Team", "→ Contributor"],
        ["DBA-Team", "→ SQL DB Contributor"],
        ["Network-Team", "→ Network Contributor"],
        ["Auditors", "→ Reader (all)"],
      ].map(([group, role], i) => (
        <g key={i}>
          <rect x="325" y={198 + i * 24} width="170" height="20" rx="3" fill={i % 2 === 0 ? "#dbeafe" : "#eff6ff"} />
          <text x="333" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af">{group}</text>
          <text x="333" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563EB" dx="60">{role}</text>
        </g>
      ))}
      <text x="410" y="286" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">If Entra ID is IdP: native. Else SAML.</text>

      {/* GCP IAM */}
      <rect x="510" y="154" width="290" height="140" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <text x="655" y="174" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">GCP Cloud IAM (via Cloud Identity)</text>
      <text x="655" y="188" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">GCDS sync from IdP → Cloud Identity groups</text>
      {[
        ["devops@company.com", "→ roles/compute.admin"],
        ["dba@company.com", "→ roles/cloudsql.admin"],
        ["network@company.com", "→ roles/compute.networkAdmin"],
        ["auditors@company.com", "→ roles/viewer"],
      ].map(([group, role], i) => (
        <g key={i}>
          <rect x="520" y={198 + i * 24} width="270" height="20" rx="3" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"} />
          <text x="528" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d">{group}</text>
          <text x="528" y={212 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" dx="108">{role}</text>
        </g>
      ))}
      <text x="655" y="286" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">SCIM or GCDS for user lifecycle mgmt</text>

      {/* Result */}
      <rect x="10" y="306" width="800" height="46" rx="6" fill="#1e293b" />
      <text x="410" y="326" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#e2e8f0" textAnchor="middle">RESULT: One corporate login → AWS Console + Azure Portal + GCP Console + all SaaS apps</text>
      <text x="410" y="342" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Group membership in central IdP drives permissions across all clouds. Offboarding: disable user in IdP → access revoked everywhere. SCIM propagation: typically within 40 minutes.</text>
    </svg>
  );
}
