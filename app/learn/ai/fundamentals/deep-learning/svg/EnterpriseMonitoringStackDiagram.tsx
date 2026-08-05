"use client";
export default function EnterpriseMonitoringStackDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ems-title">
      <title id="ems-title">Enterprise AI Monitoring Stack: DCGM to Prometheus to Grafana with OpenTelemetry and ELK integration</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE AI MONITORING STACK</text>

      {/* Sources */}
      <rect x="20" y="38" width="200" height="130" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="120" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">DATA SOURCES</text>
      {["DCGM — GPU metrics", "NCCL bandwidth", "Training loss/MFU", "Inference latency", "Storage throughput", "Network I/O"].map((s, i) => (
        <g key={i}>
          <circle cx="38" cy={72 + i * 17} r="4" fill="#94a3b8" />
          <text x="50" y={76 + i * 17} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{s}</text>
        </g>
      ))}

      {/* Prometheus */}
      <rect x="270" y="38" width="160" height="80" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="350" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">Prometheus</text>
      <text x="350" y="76" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Metric scraping</text>
      <text x="350" y="89" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Time-series storage</text>
      <text x="350" y="102" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">AlertManager</text>
      <text x="350" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">PromQL queries</text>

      {/* OpenTelemetry */}
      <rect x="270" y="135" width="160" height="50" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="350" y="157" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">OpenTelemetry</text>
      <text x="350" y="172" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Traces · Metrics · Logs</text>
      <text x="350" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Vendor-neutral SDK</text>

      {/* Grafana */}
      <rect x="490" y="38" width="160" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="570" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Grafana</text>
      <text x="570" y="76" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">GPU dashboards</text>
      <text x="570" y="89" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Training metrics</text>
      <text x="570" y="102" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Inference latency</text>
      <text x="570" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Alerting panels</text>

      {/* ELK */}
      <rect x="490" y="135" width="160" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="570" y="157" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">ELK Stack</text>
      <text x="570" y="172" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Training logs · NCCL errors</text>
      <text x="570" y="182" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Search · Kibana viz</text>

      {/* PagerDuty / Alerts */}
      <rect x="710" y="68" width="100" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="760" y="90" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">ALERTS</text>
      <text x="760" y="105" fontFamily="Arial,sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle">PagerDuty</text>
      <text x="760" y="118" fontFamily="Arial,sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle">Slack · Email</text>

      {/* Arrows */}
      <line x1="220" y1="90" x2="268" y2="78" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ems1)" />
      <line x1="220" y1="130" x2="268" y2="155" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ems1)" />
      <line x1="430" y1="78" x2="488" y2="78" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ems1)" />
      <line x1="430" y1="155" x2="488" y2="160" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ems1)" />
      <line x1="650" y1="78" x2="708" y2="92" stroke="#dc2626" strokeWidth="1.2" markerEnd="url(#ems2)" />

      {/* Key metrics box */}
      <rect x="20" y="202" width="780" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">KEY GPU METRICS TO MONITOR (DCGM)</text>
      {[
        { metric: "GPU Utilization", threshold: ">80% = healthy training", warn: "<50% = data bottleneck", x: 40 },
        { metric: "GPU Temperature", threshold: "<80°C normal", warn: ">85°C = cooling issue", x: 290 },
        { metric: "ECC Errors", threshold: "0 uncorrectable", warn: "Any = P1 alert", x: 540 },
        { metric: "NVLink BW", threshold: ">700 GB/s expected", warn: "Drop = fabric issue", x: 40 },
        { metric: "Memory Usage", threshold: ">90% = check leak", warn: "OOM = job abort", x: 290 },
        { metric: "SM Efficiency", threshold: ">60% healthy", warn: "<30% = kernel issue", x: 540 },
      ].map((m, i) => (
        <g key={i}>
          <text x={m.x} y={238 + Math.floor(i / 3) * 34} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#374151">{m.metric}</text>
          <text x={m.x} y={251 + Math.floor(i / 3) * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a">✓ {m.threshold}</text>
          <text x={m.x} y={263 + Math.floor(i / 3) * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626">⚠ {m.warn}</text>
        </g>
      ))}

      <text x="410" y="325" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">dcgmi dmon -e 1001 — real-time GPU metric stream · Prometheus DCGM exporter — Kubernetes integration</text>

      <defs>
        <marker id="ems1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
        <marker id="ems2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}
