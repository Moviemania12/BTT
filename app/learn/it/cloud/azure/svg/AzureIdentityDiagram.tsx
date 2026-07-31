"use client";
export default function AzureIdentityDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ai-title">
      <title id="ai-title">Azure Identity: Microsoft Entra ID, RBAC, Managed Identity</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE IDENTITY: ENTRA ID, RBAC AND MANAGED IDENTITY</text>

      {/* Entra ID */}
      <rect x="20" y="36" width="380" height="200" rx="8" fill="#eff6ff" stroke="#0078D4" strokeWidth="2" />
      <text x="210" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0078D4" textAnchor="middle">MICROSOFT ENTRA ID (formerly Azure AD)</text>
      <text x="210" y="72" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Cloud Identity Provider — NOT a domain controller</text>
      {[
        ["Users", "Employees, guests, service accounts"],
        ["Groups", "Role assignments at group level (scalable)"],
        ["App Registrations", "OAuth2/OIDC apps authenticating via Entra"],
        ["Enterprise Apps", "SaaS (Salesforce, ServiceNow) + custom SAML"],
        ["Conditional Access", "MFA, device compliance, location-based"],
        ["Privileged Identity Mgmt", "Just-in-time admin role activation"],
      ].map(([label, desc], i) => (
        <g key={label}>
          <rect x={32} y={84 + i * 24} width={356} height={21} rx="3" fill={i % 2 === 0 ? "#dbeafe" : "#eff6ff"} />
          <text x={40} y={99 + i * 24} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af">{label}:</text>
          <text x={130} y={99 + i * 24} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{desc}</text>
        </g>
      ))}
      <rect x="32" y="232" width="356" height="0" />
      <text x="32" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8">Protocols: OAuth 2.0, OpenID Connect, SAML 2.0, WS-Federation</text>

      {/* RBAC */}
      <rect x="420" y="36" width="380" height="200" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="610" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">AZURE RBAC — Role-Based Access Control</text>
      <text x="610" y="72" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Who (Security Principal) + What (Role) + Where (Scope)</text>
      {[
        { label: "Security Principal", desc: "User, Group, Service Principal, Managed Identity" },
        { label: "Role Definition", desc: "Set of permissions: actions, notActions, dataActions" },
        { label: "Scope", desc: "Management Group → Subscription → Resource Group → Resource" },
        { label: "Built-in Roles", desc: "Owner, Contributor, Reader, + 200+ service-specific roles" },
        { label: "Custom Roles", desc: "Exact permission sets for your requirements" },
        { label: "Inheritance", desc: "Assignment at parent scope inherited by child scopes" },
      ].map(({ label, desc }, i) => (
        <g key={label}>
          <rect x={432} y={84 + i * 24} width={356} height={21} rx="3" fill={i % 2 === 0 ? "#fed7aa" : "#fff7ed"} />
          <text x={440} y={99 + i * 24} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412">{label}:</text>
          <text x={562} y={99 + i * 24} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{desc}</text>
        </g>
      ))}

      {/* Managed Identity */}
      <rect x="20" y="248" width="380" height="96" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="210" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">MANAGED IDENTITY (Workload Identity)</text>
      <text x="210" y="283" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Azure resource ko Entra ID identity milti hai — no credentials in code</text>
      <text x="32" y="301" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• System-assigned: resource ke saath create/delete hoti hai (1:1)</text>
      <text x="32" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• User-assigned: independently managed, multiple resources pe assign possible</text>
      <text x="32" y="331" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534">• Example: VM ko Key Vault se secrets read karne ke liye Managed Identity + RBAC use karo</text>

      {/* Hybrid */}
      <rect x="420" y="248" width="380" height="96" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="610" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">HYBRID IDENTITY — On-Prem + Cloud</text>
      <text x="610" y="283" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce" textAnchor="middle">On-prem AD DS + Entra ID together via Azure AD Connect</text>
      <text x="432" y="301" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce">• Password Hash Sync: fastest, most resilient</text>
      <text x="432" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce">• Pass-through Auth: on-prem validates credentials in real-time</text>
      <text x="432" y="331" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8">• Entra ID = cloud identity; AD DS = on-prem; Connect = bridge</text>
    </svg>
  );
}
