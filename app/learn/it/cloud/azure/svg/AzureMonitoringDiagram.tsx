"use client";
export default function AzureMonitoringDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="am-title">
      <title id="am-title">Azure Monitor, Log Analytics, Defender for Cloud</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE OBSERVABILITY AND SECURITY MONITORING</text>

      {/* Azure Monitor */}
      <rect x="20" y="36" width="500" height="280" rx="8" fill="#eff6ff" stroke="#0078D4" strokeWidth="2" />
      <text x="270" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0078D4" textAnchor="middle">AZURE MONITOR — Operational Observability</text>

      {[
        { title: "Metrics", desc: "Near-real-time numeric data — CPU, network, disk, custom. Stored 93 days.", color: "#2563EB", bg: "#dbeafe" },
        { title: "Logs (Log Analytics)", desc: "KQL-queryable log store. Application logs, activity logs, diagnostics, security events.", color: "#1e40af", bg: "#bfdbfe" },
        { title: "Alerts", desc: "Metric/log/activity alerts → Action Groups (email, SMS, webhook, ITSM, Logic App).", color: "#7c3aed", bg: "#e9d5ff" },
        { title: "Application Insights", desc: "APM for web apps — request rate, failures, latency, distributed tracing, availability tests.", color: "#16a34a", bg: "#dcfce7" },
        { title: "Workbooks", desc: "Interactive dashboards. Azure Monitor data + Log Analytics queries visualized.", color: "#0891b2", bg: "#e0f2fe" },
        { title: "Diagnostic Settings", desc: "Route resource logs/metrics to Log Analytics, Storage, Event Hub, Partner solutions.", color: "#475569", bg: "#f1f5f9" },
      ].map(({ title, desc, color, bg }, i) => (
        <g key={title}>
          <rect x={32} y={68 + i * 40} width={476} height={36} rx="5" fill={bg} stroke={color} strokeWidth="1" />
          <text x={44} y={83 + i * 40} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={color}>{title}</text>
          <text x={44} y={97 + i * 40} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc}</text>
        </g>
      ))}

      {/* Defender for Cloud */}
      <rect x="540" y="36" width="260" height="280" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="670" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">DEFENDER FOR CLOUD</text>
      <text x="670" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">(formerly Security Center)</text>

      {[
        ["CSPM", "Cloud Security Posture Management — Secure Score, compliance"],
        ["CWP", "Cloud Workload Protection — VMs, containers, SQL, storage"],
        ["Threat Detection", "ML-based alerts: anomalous access, lateral movement"],
        ["Regulatory Compliance", "CIS, NIST, PCI-DSS, ISO dashboards"],
        ["Just-in-Time VMs", "On-demand port access — block RDP/SSH by default"],
        ["Adaptive App Ctrl", "Allowlist for running processes on VMs"],
        ["Integration", "Sentinel SIEM, Logic Apps, third-party SOC"],
      ].map(([label, desc], i) => (
        <g key={label}>
          <rect x={552} y={84 + i * 32} width={236} height={29} rx="4" fill={i % 2 === 0 ? "#fee2e2" : "#fef2f2"} />
          <text x={560} y={98 + i * 32} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#991b1b">{label}</text>
          <text x={560} y={108 + i * 32} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc}</text>
        </g>
      ))}

      <text x="410" y="328" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Activity Log: ARM-level API audit (who did what in subscription). Equivalent to AWS CloudTrail.</text>
    </svg>
  );
}
