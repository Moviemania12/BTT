"use client";
export default function ClusterMonitoring() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cm-title">
      <title id="cm-title">GPU Cluster Monitoring Stack: At bottom are the monitored resources — GPU Servers, Network (InfiniBand switches), Storage (parallel file system), and Power plus Cooling systems. Metrics collected by DCGM for GPU health, Network exporters, Storage exporters, and PDU sensors. All metrics flow into Prometheus time-series database for storage and alerting. Grafana provides dashboards for visualization. Alertmanager routes critical alerts to on-call engineers via PagerDuty or Slack. Operations team monitors and responds.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER MONITORING STACK</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Monitor all layers simultaneously. A problem in one layer often surfaces in another — correlate metrics across GPU, network, storage, and power.</text>

      {/* Infrastructure layer — bottom */}
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#475569" textAnchor="middle">WHAT IS MONITORED</text>
      {[
        { label: "GPU Servers", sub: "Utilization, temp,\nECC errors, clock", color: "#7c3aed", x: 30 },
        { label: "Network (IB/RoCE)", sub: "Bandwidth, latency,\nport errors, congestion", color: "#0284c7", x: 222 },
        { label: "Storage", sub: "Throughput, IOPS,\nlatency, drive health", color: "#16a34a", x: 414 },
        { label: "Power + Cooling", sub: "kW per rack, temps,\ncoolant flow, UPS", color: "#ca8a04", x: 606 },
      ].map(c => (
        <g key={c.label}>
          <rect x={c.x} y="58" width="180" height="52" rx="6" fill={c.color} />
          <text x={c.x + 90} y="76" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{c.label}</text>
          {c.sub.split("\n").map((line, li) => (
            <text key={li} x={c.x + 90} y={90 + li * 12} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.9)" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      {/* Collectors */}
      <text x="410" y="130" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#475569" textAnchor="middle">METRICS COLLECTORS</text>
      {[
        { label: "DCGM Exporter", sub: "NVIDIA GPU metrics\nper server", color: "#4c1d95", x: 30 },
        { label: "Node + Net Exporter", sub: "OS + NIC + switch\nmetrics", color: "#1e40af", x: 222 },
        { label: "Storage Exporter", sub: "Lustre/GPFS stats,\ndrive SMART data", color: "#14532d", x: 414 },
        { label: "PDU + BMS", sub: "Power, temp,\ncooling sensors", color: "#713f12", x: 606 },
      ].map(c => (
        <g key={c.label}>
          <line x1={c.x + 90} y1={110} x2={c.x + 90} y2={136} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#cm-ar)" />
          <rect x={c.x} y="136" width="180" height="44" rx="5" fill={c.color} />
          <text x={c.x + 90} y="153" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{c.label}</text>
          {c.sub.split("\n").map((line, li) => (
            <text key={li} x={c.x + 90} y={165 + li * 11} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      {/* Prometheus */}
      <line x1="410" y1="180" x2="410" y2="198" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cm-ar)" />
      <rect x="270" y="198" width="280" height="34" rx="6" fill="#dc2626" />
      <text x="410" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Prometheus — Metrics Store + Alerting</text>
      <text x="410" y="226" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fecaca" textAnchor="middle">Time-series database · Alert rules · Scrapes all exporters</text>

      {/* Grafana + Alertmanager */}
      <line x1="340" y1="232" x2="200" y2="244" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#cm-ar)" />
      <line x1="480" y1="232" x2="620" y2="244" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#cm-ar)" />

      <rect x="80" y="244" width="230" height="30" rx="5" fill="#0891b2" />
      <text x="195" y="258" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Grafana Dashboards</text>
      <text x="195" y="269" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">GPU health · training progress · network BW · job queue</text>

      <rect x="510" y="244" width="230" height="30" rx="5" fill="#ca8a04" />
      <text x="625" y="258" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Alertmanager → On-Call</text>
      <text x="625" y="269" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">PagerDuty · Slack · GPU failure · network error · temp high</text>

      <defs>
        <marker id="cm-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
