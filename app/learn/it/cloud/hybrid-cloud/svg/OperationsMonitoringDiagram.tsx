"use client";
export default function OperationsMonitoringDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="omd-title" style={{ width: "100%", height: "auto" }}>
      <title id="omd-title">Hybrid Cloud Operations: Unified monitoring, logging and management across on-prem and cloud</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID CLOUD OPERATIONS — UNIFIED OBSERVABILITY</text>

      {/* Data Sources */}
      <rect x="10" y="32" width="220" height="260" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="120" y="50" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#334155" textAnchor="middle">DATA SOURCES</text>

      {[
        { label: "On-Prem Servers", sub: "CPU / Mem / Disk / Network" },
        { label: "Network Devices", sub: "Router / Switch / Firewall SNMP" },
        { label: "VMware / Hyper-V", sub: "vCenter / SCVMM metrics" },
        { label: "Cloud VMs", sub: "CloudWatch / Azure Monitor agents" },
        { label: "Kubernetes", sub: "Prometheus / node-exporter" },
        { label: "Databases", sub: "Slow query / connection pool" },
        { label: "Application Logs", sub: "App + access + error logs" },
        { label: "Cloud Audit Logs", sub: "CloudTrail / Activity Log / Audit" },
      ].map(({ label, sub }, i) => (
        <g key={label}>
          <rect x="18" y={58 + i * 29} width="204" height="24" rx="3" fill={i % 2 === 0 ? "#e2e8f0" : "#f1f5f9"} />
          <text x="120" y={69 + i * 29} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">{label}</text>
          <text x="120" y={79 + i * 29} fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">{sub}</text>
        </g>
      ))}

      {/* Central monitoring */}
      <rect x="246" y="32" width="328" height="260" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="410" y="50" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#0284c7" textAnchor="middle">UNIFIED OBSERVABILITY PLATFORM</text>

      {[
        { y: 58, color: "#0284c7", bg: "#e0f2fe", title: "Metrics / APM", desc: "Prometheus + Grafana / Azure Monitor / Datadog / Dynatrace" },
        { y: 100, color: "#7c3aed", bg: "#f3e8ff", title: "Log Aggregation", desc: "ELK Stack / Splunk / Cloud Logging + Log Analytics / Loki" },
        { y: 142, color: "#16a34a", bg: "#dcfce7", title: "Tracing", desc: "Jaeger / Zipkin / AWS X-Ray / Azure App Insights / Cloud Trace" },
        { y: 184, color: "#f97316", bg: "#ffedd5", title: "Alerting", desc: "PagerDuty / OpsGenie / AlertManager / Azure Alerts / CloudWatch Alarms" },
        { y: 226, color: "#dc2626", bg: "#fee2e2", title: "SIEM / Security", desc: "Microsoft Sentinel / Splunk SOAR / Chronicle / IBM QRadar" },
      ].map(({ y, color, bg, title, desc }) => (
        <g key={y}>
          <rect x="254" y={y} width="312" height="36" rx="5" fill={bg} stroke={color} strokeWidth="1.5" />
          <text x="262" y={y + 14} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={color}>{title}</text>
          <text x="262" y={y + 28} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc}</text>
        </g>
      ))}

      {/* Arrows from sources */}
      {[70, 99, 128, 157, 186, 215, 244, 273].map((y, i) => (
        <g key={i}>
          <line x1="232" y1={y} x2="254" y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="3,2" />
          <polygon points={`251,${y - 3} 257,${y} 251,${y + 3}`} fill="#475569" />
        </g>
      ))}

      {/* Outputs */}
      <rect x="590" y="32" width="220" height="260" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="700" y="50" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#15803d" textAnchor="middle">OUTPUTS / ACTIONS</text>

      {[
        { label: "Dashboards", sub: "Executive + Ops views" },
        { label: "Incident Alerts", sub: "PagerDuty → On-call eng" },
        { label: "Auto-Remediation", sub: "Lambda / Runbooks / Ansible" },
        { label: "Cost Reports", sub: "Daily cloud spend summary" },
        { label: "Compliance Reports", sub: "SOC2 / ISO / CIS evidence" },
        { label: "Capacity Planning", sub: "Trend → right-sizing recs" },
        { label: "Change Events", sub: "Deploy / config diff tracking" },
        { label: "SLO Reports", sub: "Error budget consumed" },
      ].map(({ label, sub }, i) => (
        <g key={label}>
          <rect x="598" y={58 + i * 29} width="204" height="24" rx="3" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"} />
          <text x="700" y={69 + i * 29} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">{label}</text>
          <text x="700" y={79 + i * 29} fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle">{sub}</text>
        </g>
      ))}

      {[70, 99, 128, 157, 186, 215, 244, 273].map((y, i) => (
        <g key={i}>
          <line x1="574" y1={y} x2="598" y2={y} stroke="#16a34a" strokeWidth="1" />
          <polygon points={`596,${y - 3} 601,${y} 596,${y + 3}`} fill="#16a34a" />
        </g>
      ))}

      {/* Key insight */}
      <rect x="10" y="300" width="800" height="14" rx="4" fill="#0c4a6e" />
      <text x="410" y="311" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">Hybrid ops maturity: Single pane of glass → unified alerts → automated remediation → SLO-based operations → FinOps cost governance</text>
    </svg>
  );
}
