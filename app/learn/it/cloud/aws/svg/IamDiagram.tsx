"use client";
export default function IamDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="iam-title">
      <title id="iam-title">AWS IAM: Users, Roles, Policies and Least Privilege</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">IAM: AUTHENTICATION, AUTHORIZATION AND LEAST PRIVILEGE</text>

      {/* Auth vs Authz */}
      <rect x="20" y="40" width="190" height="80" rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="1.5" />
      <text x="115" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AUTHENTICATION</text>
      <text x="115" y="78" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">"Kya tum ho jo kehte ho?"</text>
      <text x="115" y="94" fontFamily="Arial,sans-serif" fontSize="8" fill="#3730a3" textAnchor="middle">IAM User credentials / Role STS token</text>
      <text x="115" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#3730a3" textAnchor="middle">MFA adds second factor</text>

      <rect x="220" y="40" width="190" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="315" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">AUTHORIZATION</text>
      <text x="315" y="78" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">"Kya tumhe yeh karne ki permission hai?"</text>
      <text x="315" y="94" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">IAM Policy evaluation</text>
      <text x="315" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Allow / Deny on Action + Resource</text>

      {/* IAM components */}
      <rect x="30" y="140" width="140" height="80" rx="6" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="100" y="160" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">IAM USER</text>
      <text x="100" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Long-term identity</text>
      <text x="100" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Access key + secret</text>
      <text x="100" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">⚠ Avoid embedding in code</text>

      <rect x="195" y="140" width="140" height="80" rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="1.5" />
      <text x="265" y="160" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">IAM ROLE</text>
      <text x="265" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Temporary credentials (STS)</text>
      <text x="265" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Assumed by EC2, Lambda etc</text>
      <text x="265" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">✓ Preferred for workloads</text>

      <rect x="360" y="140" width="140" height="80" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="430" y="160" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">IAM POLICY</text>
      <text x="430" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">JSON document</text>
      <text x="430" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Effect: Allow / Deny</text>
      <text x="430" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Action + Resource + Condition</text>

      {/* Role flow */}
      <rect x="540" y="40" width="260" height="180" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="670" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">ROLE BEST PRACTICE</text>

      <rect x="560" y="74" width="220" height="28" rx="4" fill="#2563EB" />
      <text x="670" y="93" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 Instance</text>

      <line x1="670" y1="102" x2="670" y2="118" stroke="#16a34a" strokeWidth="2" />
      <rect x="560" y="118" width="220" height="28" rx="4" fill="#7c3aed" />
      <text x="670" y="137" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Assumes IAM Role (STS temp credentials)</text>

      <line x1="670" y1="146" x2="670" y2="162" stroke="#16a34a" strokeWidth="2" />
      <rect x="560" y="162" width="220" height="28" rx="4" fill="#16a34a" />
      <text x="670" y="181" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">S3 / DynamoDB / other services</text>

      <text x="670" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">No hard-coded keys in application</text>

      {/* Least privilege */}
      <rect x="30" y="238" width="470" height="60" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="265" y="258" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">LEAST PRIVILEGE PRINCIPLE</text>
      <text x="265" y="274" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626" textAnchor="middle">Grant ONLY the minimum permissions required for the task.</text>
      <text x="265" y="288" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#b91c1c" textAnchor="middle">Broad AdministratorAccess or * permissions = security risk. Start restrictive, expand as needed.</text>

      <rect x="540" y="238" width="260" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="258" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">IAM EVALUATION ORDER</text>
      <text x="670" y="274" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Explicit Deny → wins always</text>
      <text x="670" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">No Allow → implicit deny</text>
    </svg>
  );
}
