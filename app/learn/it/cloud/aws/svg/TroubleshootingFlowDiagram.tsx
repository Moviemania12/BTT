"use client";
export default function TroubleshootingFlowDiagram() {
  return (
    <svg viewBox="0 0 820 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ts-title">
      <title id="ts-title">AWS Troubleshooting: Layered Diagnostic Sequence</title>
      <rect width="820" height="500" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS TROUBLESHOOTING: LAYERED DIAGNOSTIC SEQUENCE</text>
      <text x="410" y="40" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">Problem: Application unreachable</text>

      {/* Steps */}
      {[
        { y: 56, n: "1", label: "DNS resolving correctly?", detail: "nslookup / dig — Route 53 record, TTL, resolver", color: "#0f172a", textColor: "#ffffff" },
        { y: 104, n: "2", label: "Public/private connectivity design correct?", detail: "IGW attached to VPC? Public subnet has IGW route?", color: "#1e40af", textColor: "#ffffff" },
        { y: 152, n: "3", label: "Route table correct?", detail: "Does subnet RT have right route (0.0.0.0/0 → IGW/NAT)?", color: "#2563EB", textColor: "#ffffff" },
        { y: 200, n: "4", label: "Security Group allows traffic?", detail: "Stateful — check inbound rule. Source IP/SG correct?", color: "#7c3aed", textColor: "#ffffff" },
        { y: 248, n: "5", label: "NACL allows traffic AND return?", detail: "Stateless — check both inbound AND outbound (ephemeral ports)", color: "#dc2626", textColor: "#ffffff" },
        { y: 296, n: "6", label: "Load Balancer healthy?", detail: "LB status, listener rules, target group health", color: "#0891b2", textColor: "#ffffff" },
        { y: 344, n: "7", label: "Target registered and healthy?", detail: "Target group health checks passing? Health check port/path correct?", color: "#0891b2", textColor: "#ffffff" },
        { y: 392, n: "8", label: "EC2 instance running? OS/app listening?", detail: "Instance state Running. Port listening (netstat/ss). Not just Running!", color: "#16a34a", textColor: "#ffffff" },
      ].map(({ y, n, label, detail, color, textColor }) => (
        <g key={n}>
          <rect x="30" y={y} width="760" height="40" rx="6" fill={color} />
          <text x="55" y={y + 16} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={textColor}>{n}.</text>
          <text x="75" y={y + 16} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={textColor}>{label}</text>
          <text x="75" y={y + 30} fontFamily="Arial,sans-serif" fontSize="8" fill={textColor === "#ffffff" ? "#d1d5db" : "#374151"}>{detail}</text>
          {y < 392 && <line x1="410" y1={y + 40} x2="410" y2={y + 44} stroke="#94a3b8" strokeWidth="1.5" />}
        </g>
      ))}

      {/* Steps 9-11 as continuation */}
      <rect x="30" y="440" width="370" height="44" rx="6" fill="#f97316" />
      <text x="50" y="458" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff">9. Return routing correct from instance?</text>
      <text x="50" y="474" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa">Instance can reply back — no asymmetric routing</text>

      <rect x="420" y="440" width="370" height="44" rx="6" fill="#475569" />
      <text x="440" y="458" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff">10. IAM permissions relevant?</text>
      <text x="440" y="474" fontFamily="Arial,sans-serif" fontSize="8" fill="#cbd5e1">AccessDenied in logs? Check policy + role attachment</text>

      <text x="410" y="498" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626" textAnchor="middle">⚠ EC2 Running ≠ Application healthy. SG Allow ≠ end-to-end working. Check NACL return path always.</text>
    </svg>
  );
}
