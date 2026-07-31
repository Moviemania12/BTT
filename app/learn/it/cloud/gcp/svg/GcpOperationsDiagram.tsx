"use client";
export default function GcpOperationsDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gops-title">
      <title id="gops-title">GCP Operations Suite: Cloud Monitoring, Logging, Trace, Profiler</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP OPERATIONS SUITE (formerly Stackdriver)</text>

      {/* Left: Monitoring + Logging */}
      <rect x="20" y="36" width="390" height="266" rx="8" fill="#eff6ff" stroke="#4285F4" strokeWidth="2" />
      <text x="215" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4285F4" textAnchor="middle">CLOUD MONITORING + LOGGING</text>

      {[
        { title: "Cloud Monitoring", desc: "Metrics: GCP resource metrics auto-collected (CPU, disk, network). Custom metrics via APIs/OpenTelemetry. Dashboards, alerting policies, uptime checks.", color: "#2563EB", bg: "#dbeafe" },
        { title: "Cloud Logging", desc: "Centralized log store. Structured logs. Log-based metrics. Log sinks to BigQuery/GCS/Pub/Sub for export. Admin Activity logs always on, Data Access configurable.", color: "#1e40af", bg: "#bfdbfe" },
        { title: "Alert Policies", desc: "Threshold, absence, metric ratio alerts → Notification channels (email, PagerDuty, Slack, webhook, Pub/Sub). SLO-based alerting possible.", color: "#7c3aed", bg: "#e9d5ff" },
        { title: "Log Router + Sinks", desc: "All logs go through Log Router. Sinks export matching logs to destination. Exclusions reduce log volume/cost. Mandatory: Admin Activity (can't disable).", color: "#0891b2", bg: "#e0f2fe" },
      ].map(({ title, desc, color, bg }, i) => (
        <g key={title}>
          <rect x="36" y={66 + i * 56} width="358" height="48" rx="5" fill={bg} stroke={color} strokeWidth="1" />
          <text x="44" y={84 + i * 56} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={color}>{title}</text>
          <text x="44" y={98 + i * 56} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc}</text>
        </g>
      ))}

      {/* Right: Trace, Profiler, Error Reporting, Debugger */}
      <rect x="430" y="36" width="370" height="266" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <text x="615" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#34A853" textAnchor="middle">TRACE, PROFILER AND AUDIT</text>

      {[
        { title: "Cloud Trace", desc: "Distributed tracing — latency analysis across microservices. Automatically integrates with GKE, App Engine, Cloud Run. AWS X-Ray equivalent." },
        { title: "Cloud Profiler", desc: "Always-on CPU and memory profiler — production safe, low overhead. Identify performance hotspots without separate profiling sessions." },
        { title: "Error Reporting", desc: "Automatic error detection and grouping from logs and crash reports. Stacktraces, first/last occurrence, affected users count." },
        { title: "Cloud Audit Logs", desc: "Admin Activity (always on): who changed what resource config. Data Access: who read/wrote data (configurable). System Event: automatic platform operations. Policy Denied: denied actions. AWS CloudTrail equivalent." },
      ].map(({ title, desc }, i) => (
        <g key={title}>
          <rect x="446" y={66 + i * 56} width="338" height="48" rx="5" fill={i % 2 === 0 ? "#dcfce7" : "#bbf7d0"} stroke="#34A853" strokeWidth="1" />
          <text x="454" y={84 + i * 56} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d">{title}</text>
          <text x="454" y={98 + i * 56} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc}</text>
        </g>
      ))}

      <text x="410" y="312" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Cloud Monitoring ≈ CloudWatch (metrics+alerts). Cloud Logging ≈ CloudWatch Logs. Cloud Audit Logs ≈ CloudTrail. Cloud Trace ≈ X-Ray.</text>
    </svg>
  );
}
