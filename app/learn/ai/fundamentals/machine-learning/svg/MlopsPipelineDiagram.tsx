"use client";
export default function MlopsPipelineDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mlops-title">
      <title id="mlops-title">MLOps CI/CD Pipeline: Code commit to shadow deploy to canary to production with rollback</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MLOPS CI/CD PIPELINE</text>

      {/* Stages */}
      {[
        { label: "Code\nCommit", x: 30, color: "#2563eb", bg: "#dbeafe" },
        { label: "Automated\nTests", x: 140, color: "#7c3aed", bg: "#ede9fe" },
        { label: "Train +\nValidate", x: 250, color: "#0369a1", bg: "#e0f2fe" },
        { label: "Model\nRegistry", x: 360, color: "#0f766e", bg: "#ccfbf1" },
        { label: "Shadow\nDeploy", x: 470, color: "#16a34a", bg: "#dcfce7" },
        { label: "Canary\n10%→50%", x: 580, color: "#ca8a04", bg: "#fef9c3" },
        { label: "Production\n100%", x: 690, color: "#ea580c", bg: "#ffedd5" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="38" width="95" height="80" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={s.x + 47} cy="62" r="14" fill={s.color} />
          <text x={s.x + 47} y="67" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">{i + 1}</text>
          {s.label.split("\n").map((line, li) => (
            <text key={li} x={s.x + 47} y={88 + li * 14} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < 6 && <line x1={s.x + 97} y1="78" x2={s.x + 138} y2="78" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a2)" />}
        </g>
      ))}

      {/* Rollback arrow */}
      <path d="M785,120 Q785,155 410,165 Q35,155 35,120" stroke="#dc2626" strokeWidth="1.5" fill="none" strokeDasharray="6,3" markerEnd="url(#a3)" />
      <text x="410" y="182" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">↑ ROLLBACK — Triggered on metric degradation or alert</text>

      {/* Monitoring feedback */}
      <rect x="200" y="200" width="420" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
      <text x="410" y="220" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">CONTINUOUS MONITORING</text>
      <text x="410" y="236" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Prediction distribution · Data drift (KS test, PSI) · Business KPIs · Latency SLA</text>
      <text x="410" y="250" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Grafana · Prometheus · Evidently AI · Whylogs · Model performance vs baseline</text>

      <defs>
        <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
        <marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}
