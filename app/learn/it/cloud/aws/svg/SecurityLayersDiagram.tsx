"use client";
export default function SecurityLayersDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sl-title">
      <title id="sl-title">AWS Security Layers: IAM, KMS, WAF, GuardDuty, Shield</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS SECURITY LAYERS — DEFENSE IN DEPTH</text>

      {/* Perimeter */}
      <rect x="20" y="36" width="780" height="330" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" strokeDasharray="8,4" />
      <text x="32" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#dc2626">AWS ACCOUNT + ORGANIZATION BOUNDARY</text>

      {/* Layer 1: Org/SCP */}
      <rect x="36" y="62" width="748" height="52" rx="6" fill="#dc2626" />
      <text x="410" y="80" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">LAYER 1: ACCOUNT GOVERNANCE</text>
      <text x="70" y="98" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca">AWS Organizations → SCPs (Service Control Policies) → Control Tower → Landing Zone → Multi-Account Strategy</text>
      <text x="70" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#fca5a5">SCPs = maximum permission boundary for entire OU/account. Cannot grant more than SCP allows.</text>

      {/* Layer 2: Edge */}
      <rect x="36" y="122" width="748" height="52" rx="6" fill="#b91c1c" />
      <text x="410" y="140" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">LAYER 2: EDGE AND NETWORK PROTECTION</text>
      <text x="70" y="158" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca">AWS Shield (Standard: always on DDoS protection) | Shield Advanced (enhanced) | AWS WAF (Layer 7 rules: SQLi, XSS, geo-block)</text>
      <text x="70" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#fca5a5">CloudFront + WAF: inspect HTTP before reaching your origin. Shield Advanced: DRT support, cost protection during attack.</text>

      {/* Layer 3: VPC */}
      <rect x="36" y="182" width="748" height="52" rx="6" fill="#9a3412" />
      <text x="410" y="200" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">LAYER 3: VPC NETWORK SECURITY</text>
      <text x="70" y="218" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fed7aa">NACLs (stateless, subnet) + Security Groups (stateful, instance) + VPC Flow Logs (network audit)</text>
      <text x="70" y="230" fontFamily="Arial,sans-serif" fontSize="8" fill="#fdba74">Security Groups: allow-only, stateful. NACLs: allow+deny, stateless. VPC Flow Logs → CloudWatch/S3 for network forensics.</text>

      {/* Layer 4: IAM */}
      <rect x="36" y="242" width="748" height="52" rx="6" fill="#7f1d1d" />
      <text x="410" y="260" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">LAYER 4: IDENTITY AND ACCESS</text>
      <text x="70" y="278" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca">IAM Roles + Policies + Permission Boundaries | IAM Identity Center (SSO) | Identity Federation (SAML/OIDC)</text>
      <text x="70" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#fca5a5">Least privilege: grant only what's needed. Permission Boundaries: max permissions a role can have. MFA on root + humans.</text>

      {/* Layer 5: Data */}
      <rect x="36" y="302" width="748" height="52" rx="6" fill="#450a0a" />
      <text x="410" y="320" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">LAYER 5: DATA PROTECTION AND DETECTION</text>
      <text x="70" y="338" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#fecaca">KMS (key management, envelope encryption) | Secrets Manager (rotate secrets) | ACM (TLS certs)</text>
      <text x="70" y="350" fontFamily="Arial,sans-serif" fontSize="8" fill="#fca5a5">GuardDuty (threat detection — CloudTrail/DNS/VPC Flow) | Inspector (EC2/container vuln scanning) | Security Hub (aggregator)</text>
    </svg>
  );
}
