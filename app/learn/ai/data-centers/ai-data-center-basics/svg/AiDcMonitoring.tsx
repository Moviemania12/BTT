"use client";
export default function AiDcMonitoring() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="adm-title">
      <title id="adm-title">AI Data Center Monitoring Dashboard showing 6 panels: GPU Health (all GPUs monitored, one warning, one failure), Training Progress (loss curve decreasing — model improving), Power Consumption (38 MW of 40 MW budget used), Network Traffic (AllReduce gradient sync traffic), Cooling Status (inlet and outlet temperatures, coolant flow normal, no leaks), and Active Jobs (47 training jobs running, 12 inference services, 3 jobs queued, 2 GPUs in maintenance).</title>
      <rect width="820" height="300" fill="#0f172a" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#e2e8f0" textAnchor="middle">AI DATA CENTER MONITORING — What Engineers Watch 24/7</text>
      <text x="410" y="30" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">All metrics collected every second. Alerts fire automatically when thresholds crossed.</text>

      {/* Panel 1 — GPU Health */}
      <rect x="14" y="38" width="258" height="118" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="143" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">GPU Health (All Compute Nodes)</text>
      <text x="143" y="67" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Every GPU monitored every second via DCGM</text>
      {Array.from({ length: 60 }).map((_, i) => {
        const col = i % 12, row = Math.floor(i / 12);
        const status = i === 25 ? "#fbbf24" : i === 42 ? "#dc2626" : "#22c55e";
        return <rect key={i} x={22 + col * 19} y={74 + row * 16} width="14" height="12" rx="2" fill={status} opacity={0.85} />;
      })}
      <text x="22" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#22c55e">● Normal</text>
      <text x="90" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24">● Warning (temp high)</text>
      <text x="200" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626">● Failed</text>

      {/* Panel 2 — Training Progress */}
      <rect x="282" y="38" width="254" height="118" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="409" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Training Progress (Active Job #1)</text>
      <text x="409" y="67" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Training loss — lower = model improving</text>
      {/* Loss curve */}
      <polyline points="294,138 320,126 346,118 372,110 398,105 424,100 450,97 476,95 502,94 528,93" fill="none" stroke="#22c55e" strokeWidth="2" />
      <text x="409" y="153" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#22c55e" textAnchor="middle">Training converging — model improving ✓</text>
      <text x="294" y="90" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b">High loss</text>
      <text x="294" y="145" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b">Low loss</text>

      {/* Panel 3 — Power */}
      <rect x="546" y="38" width="260" height="118" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="676" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Power Consumption</text>
      <rect x="556" y="62" width="240" height="20" rx="4" fill="#334155" />
      <rect x="556" y="62" width="228" height="20" rx="4" fill="#f97316" />
      <text x="676" y="76" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">38 MW / 40 MW budget</text>
      <text x="676" y="100" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">PUE: 1.18</text>
      <text x="676" y="115" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">(Total facility: 44.8 MW)</text>
      <text x="676" y="148" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#22c55e" textAnchor="middle">Within budget ✓</text>

      {/* Panel 4 — Network */}
      <rect x="14" y="166" width="258" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="143" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Network Traffic</text>
      <text x="143" y="195" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">AllReduce gradient sync (East-West)</text>
      <polyline points="22,255 50,240 78,248 106,238 134,242 162,236 190,243 218,235 246,239 264,237" fill="none" stroke="#00d4ff" strokeWidth="2" />
      <text x="143" y="272" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">4.2 TB/s aggregate · InfiniBand NDR</text>
      <text x="22" y="218" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#64748b">High BW</text>

      {/* Panel 5 — Cooling */}
      <rect x="282" y="166" width="254" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="409" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Cooling Status</text>
      {[
        { label: "Coolant Inlet Temp", val: "19°C", ok: true },
        { label: "Coolant Outlet Temp", val: "43°C", ok: true },
        { label: "Coolant Flow Rate", val: "Normal", ok: true },
        { label: "Leak Detection", val: "No Leaks", ok: true },
        { label: "Chiller Status", val: "Running ×4", ok: true },
      ].map((c, i) => (
        <g key={c.label}>
          <text x="296" y={200 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8">{c.label}:</text>
          <text x="422" y={200 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={c.ok ? "#22c55e" : "#dc2626"}>{c.val} {c.ok ? "✓" : "✗"}</text>
        </g>
      ))}
      <text x="409" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#22c55e" textAnchor="middle">All cooling systems normal ✓</text>

      {/* Panel 6 — Jobs */}
      <rect x="546" y="166" width="260" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="676" y="182" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Active Jobs</text>
      {[
        { label: "Training Jobs Running", val: "47", color: "#a78bfa" },
        { label: "Inference Services", val: "12 active", color: "#22c55e" },
        { label: "Jobs in Queue", val: "3 waiting", color: "#fbbf24" },
        { label: "GPUs in Maintenance", val: "2", color: "#f97316" },
        { label: "GPU Utilization (avg)", val: "89%", color: "#22c55e" },
      ].map((j, i) => (
        <g key={j.label}>
          <text x="558" y={200 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b">{j.label}:</text>
          <text x="786" y={200 + i * 16} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={j.color} textAnchor="end">{j.val}</text>
        </g>
      ))}
      <text x="676" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#22c55e" textAnchor="middle">Cluster healthy — 89% GPU utilization ✓</text>
    </svg>
  );
}
