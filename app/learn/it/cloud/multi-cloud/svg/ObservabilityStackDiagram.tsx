"use client";
export default function ObservabilityStackDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="osd-title" style={{ width: "100%", height: "auto" }}>
      <title id="osd-title">Multi-Cloud Observability Stack: unified monitoring, logging and alerting across clouds</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD OBSERVABILITY STACK</text>

      {/* Data sources row */}
      <text x="410" y="42" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#475569" textAnchor="middle">DATA SOURCES</text>
      {[
        { x: 10, label: "AWS", subs: ["CloudWatch", "CloudTrail", "X-Ray", "VPC Flow Logs"], color: "#f97316" },
        { x: 170, label: "Azure", subs: ["Azure Monitor", "Activity Log", "App Insights", "NSG Flow Logs"], color: "#2563EB" },
        { x: 330, label: "GCP", subs: ["Cloud Monitoring", "Cloud Logging", "Cloud Trace", "VPC Flow Logs"], color: "#34A853" },
        { x: 490, label: "K8s", subs: ["Prometheus", "kube-state-metrics", "node-exporter", "Loki logs"], color: "#7c3aed" },
        { x: 650, label: "On-Prem", subs: ["Zabbix/Nagios", "Syslog/SNMP", "Custom exporters", "SNMP traps"], color: "#475569" },
      ].map(({ x, label, subs, color }) => (
        <g key={x}>
          <rect x={x} y={48} width={150} height={96} rx="6" fill="#f8fafc" stroke={color} strokeWidth="1.5" />
          <rect x={x} y={48} width={150} height={20} rx="5" fill={color} />
          <text x={x + 75} y={62} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          {subs.map((s, i) => (
            <text key={s} x={x + 75} y={82 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{s}</text>
          ))}
        </g>
      ))}

      {/* Collection layer */}
      <rect x="10" y="158" width="800" height="32" rx="6" fill="#334155" />
      <text x="410" y="172" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#e2e8f0" textAnchor="middle">COLLECTION LAYER</text>
      <text x="410" y="184" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Fluent Bit / Fluentd / OpenTelemetry Collector / Prometheus remote_write → central aggregation</text>

      {/* Arrows */}
      {[85, 245, 405, 565, 725].map(cx => (
        <g key={cx}>
          <line x1={cx} y1={144} x2={cx} y2={158} stroke="#94a3b8" strokeWidth="1" />
          <polygon points={`${cx - 4},154 ${cx},161 ${cx + 4},154`} fill="#94a3b8" />
        </g>
      ))}

      {/* Analysis layer */}
      <rect x="10" y="202" width="244" height="88" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="132" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0284c7" textAnchor="middle">METRICS / APM</text>
      <text x="132" y="236" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">Prometheus + Grafana</text>
      <text x="132" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">Datadog / Dynatrace / New Relic</text>
      <text x="132" y="264" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">SLO dashboards, latency p99</text>
      <text x="132" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Cross-cloud unified views</text>

      <rect x="264" y="202" width="244" height="88" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="386" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">LOG AGGREGATION</text>
      <text x="386" y="236" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Elasticsearch + Kibana (ELK)</text>
      <text x="386" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Splunk / Azure Log Analytics</text>
      <text x="386" y="264" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">All clouds → single query plane</text>
      <text x="386" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Retention: 90d hot, 1yr cold</text>

      <rect x="518" y="202" width="292" height="88" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="664" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">ALERTING + INCIDENT</text>
      <text x="664" y="236" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">AlertManager / PagerDuty / OpsGenie</text>
      <text x="664" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">ITSM: ServiceNow → auto-ticket</text>
      <text x="664" y="264" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">On-call: L1 SRE → L2 cloud eng</text>
      <text x="664" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">War room: Slack/Teams per incident</text>

      {/* Collection to analysis arrows */}
      <line x1="132" y1="190" x2="132" y2="202" stroke="#0284c7" strokeWidth="1.5" />
      <line x1="386" y1="190" x2="386" y2="202" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="664" y1="190" x2="664" y2="202" stroke="#f97316" strokeWidth="1.5" />

      {/* Bottom insight */}
      <rect x="10" y="300" width="800" height="32" rx="6" fill="#1e293b" />
      <text x="410" y="315" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7dd3fc" textAnchor="middle">Key Multi-Cloud Observability Challenge: correlate events across clouds by timestamp + request ID + trace ID</text>
      <text x="410" y="328" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">OpenTelemetry W3C trace context propagation enables distributed tracing across AWS → Azure → GCP in a single request</text>
    </svg>
  );
}
