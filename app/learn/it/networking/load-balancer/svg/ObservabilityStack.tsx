"use client";
// D24 — LB Observability Stack
export default function ObservabilityStack() {
  const W = 480;
  const layers = [
    { label: "Metrics", sub: "Trend / Aggregate View", desc: "Connections/sec, active conns, error rate, backend response time, CPU, capacity utilization", fill: "#eff6ff", stroke: "#3b82f6" },
    { label: "Access Logs", sub: "Per-Transaction View", desc: "Client IP, backend selected, status code, duration, bytes, persistence applied — per request detail", fill: "#f0fdf4", stroke: "#16a34a" },
    { label: "Health Logs", sub: "State Change View", desc: "Probe results, state transitions, drain/admin events — when and why backends changed state", fill: "#fef3c7", stroke: "#d97706" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 270`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer observability stack showing metrics access logs and health logs"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="270" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">LB Observability Stack</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">All three layers work together — each reveals different failure modes</text>

      {layers.map((l, i) => (
        <g key={i}>
          <rect x="10" y={42+i*58} width="460" height="50" rx="7" fill={l.fill} stroke={l.stroke} strokeWidth="2"/>
          <rect x="10" y={42+i*58} width="110" height="50" rx="7" fill={l.stroke}/>
          <text x="65" y={64+i*58} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{l.label}</text>
          <text x="65" y={78+i*58} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">{l.sub}</text>
          <text x="130" y={61+i*58} fontSize="8" fill="#374151">{l.desc.split(" — ")[0]}</text>
          {l.desc.includes(" — ") && <text x="130" y={74+i*58} fontSize="7.5" fill="#6b7280">{l.desc.split(" — ")[1]}</text>}
        </g>
      ))}

      <rect x="10" y="218" width="460" height="44" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="234" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Investigation Sequence</text>
      <text x="18" y="248" fontSize="8" fill="#374151">Metric alert (error rate up) → Access logs (which backend returning errors?) → Health logs (did backend fail? when?) → Fix</text>
      <text x="18" y="258" fontSize="8" fontStyle="italic" fill="#dc2626">Metrics alone insufficient — health check passing while application errors = logs needed to detect mismatch</text>
    </svg>
  );
}
