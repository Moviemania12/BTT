"use client";
export default function ObservabilityDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="obs-title">
      <title id="obs-title">AWS Observability: CloudWatch vs CloudTrail</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">OBSERVABILITY: CLOUDWATCH vs CLOUDTRAIL</text>

      {/* CloudWatch */}
      <rect x="30" y="42" width="370" height="236" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="215" y="66" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af" textAnchor="middle">CLOUDWATCH</text>
      <text x="215" y="82" fontFamily="Arial,sans-serif" fontSize="9" fill="#3730a3" textAnchor="middle">Operational Observability — "How is my system performing?"</text>

      <rect x="48" y="96" width="160" height="56" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="128" y="116" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Metrics</text>
      <text x="128" y="132" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">EC2 CPU, Network I/O</text>
      <text x="128" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">LB request count, latency</text>

      <rect x="220" y="96" width="160" height="56" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="300" y="116" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Logs</text>
      <text x="300" y="132" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Application logs</text>
      <text x="300" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">VPC Flow Logs, ALB logs</text>

      <rect x="48" y="162" width="160" height="56" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="128" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Alarms</text>
      <text x="128" y="198" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Threshold-based alerts</text>
      <text x="128" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">SNS / Auto Scaling trigger</text>

      <rect x="220" y="162" width="160" height="56" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="300" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Dashboards</text>
      <text x="300" y="198" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Custom monitoring views</text>
      <text x="300" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Cross-service correlation</text>

      <rect x="48" y="228" width="332" height="36" rx="6" fill="#1e40af" />
      <text x="214" y="244" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Use Case: EC2 CPU high → alarm → scale out</text>
      <text x="214" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">LB 5xx errors → investigate target health</text>

      {/* CloudTrail */}
      <rect x="420" y="42" width="370" height="236" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="605" y="66" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#9a3412" textAnchor="middle">CLOUDTRAIL</text>
      <text x="605" y="82" fontFamily="Arial,sans-serif" fontSize="9" fill="#c2410c" textAnchor="middle">API Audit Trail — "Who did what, when, from where?"</text>

      <rect x="438" y="96" width="160" height="56" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="518" y="116" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">API Activity</text>
      <text x="518" y="132" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Every AWS API call logged</text>
      <text x="518" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Console, CLI, SDK</text>

      <rect x="610" y="96" width="160" height="56" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="690" y="116" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Event Details</text>
      <text x="690" y="132" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Who (principal)</text>
      <text x="690" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">What (API action) + When</text>

      <rect x="438" y="162" width="160" height="56" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="518" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Security</text>
      <text x="518" y="198" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Unauthorized access detect</text>
      <text x="518" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">IAM changes, key usage</text>

      <rect x="610" y="162" width="160" height="56" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1" />
      <text x="690" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Compliance</text>
      <text x="690" y="198" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Audit history</text>
      <text x="690" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Regulatory evidence</text>

      <rect x="438" y="228" width="332" height="36" rx="6" fill="#9a3412" />
      <text x="604" y="244" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Use Case: Who deleted the S3 bucket?</text>
      <text x="604" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">Which IAM role launched this EC2 at 3am?</text>
    </svg>
  );
}
