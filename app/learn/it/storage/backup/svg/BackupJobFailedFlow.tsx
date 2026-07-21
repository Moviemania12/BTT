"use client";
// D8 — Backup Job Failed: Systematic Troubleshooting Flow (mobile-first vertical)
export default function BackupJobFailedFlow() {
  const checks = [
    {
      q: "1. Source workload accessible?",
      fix: "Fix workload, network, agent communication",
      fixColor: "#ea580c",
    },
    {
      q: "2. Backup agent running? Version supported/compatible?",
      fix: "Start/reinstall agent · Check auth · Verify port access",
      fixColor: "#ea580c",
    },
    {
      q: "3. Snapshot / VSS required — did it succeed?",
      fix: "VSS writers (vssadmin list writers) · Datastore space · App health",
      fixColor: "#ea580c",
    },
    {
      q: "4. Proxy / media server reachable?",
      fix: "Proxy service · CPU/memory/disk resources · Network path",
      fixColor: "#ea580c",
    },
    {
      q: "5. Repository accessible? Capacity available?",
      fix: "Storage space · Network to repo · Dedup health · Cloud connectivity",
      fixColor: "#ea580c",
    },
    {
      q: "6. Data transfer completed?",
      fix: "Network bandwidth · Timeout settings · Proxy resources",
      fixColor: "#ea580c",
    },
    {
      q: "7. Catalog / metadata update succeeded?",
      fix: "Backup server disk space · Catalog database health",
      fixColor: "#ea580c",
    },
  ];

  const stepH = 72;
  const arrowH = 20;
  const totalH = 116 + checks.length * (stepH + arrowH) + 96;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup job failed: systematic troubleshooting flowchart"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>

      {/* Title */}
      <text x="240" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Backup Job Failed — Troubleshooting</text>

      {/* Start */}
      <rect x="30" y="34" width="420" height="32" rx="16" fill="#1e293b"/>
      <text x="240" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="#f8fafc">Job shows FAILED or ERROR</text>

      {/* Warning */}
      <rect x="10" y="74" width="460" height="34" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="240" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">⚠ Read error message carefully FIRST</text>
      <text x="240" y="102" textAnchor="middle" fontSize="11" fill="#92400e">Do NOT retry blindly — identify root cause</text>

      {/* Steps */}
      {checks.map((check, i) => {
        const y = 116 + i * (stepH + arrowH);
        return (
          <g key={i}>
            {/* Step card */}
            <rect x="10" y={y} width="460" height={stepH} rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
            {/* Check question */}
            <text x="22" y={y + 20} fontSize="12" fontWeight="600" fill="#1e40af">{check.q}</text>
            {/* YES path */}
            <rect x="18" y={y + 28} width="44" height="20" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
            <text x="40" y={y + 42} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#15803d">YES ↓</text>
            {/* Fix box */}
            <rect x="68" y={y + 28} width="392" height="20" rx="4" fill="#fee2e2" stroke="#ea580c" strokeWidth="1"/>
            <text x="76" y={y + 42} fontSize="10" fill={check.fixColor}>NO → {check.fix}</text>
            {/* Separator */}
            <line x1="22" y1={y + 54} x2="458" y2={y + 54} stroke="#dbeafe" strokeWidth="1"/>
            <text x="240" y={y + 66} textAnchor="middle" fontSize="10" fill="#6b7280">Resolve issue → re-run job</text>
            {/* Arrow */}
            {i < checks.length - 1 && (
              <g>
                <line x1="240" y1={y + stepH} x2="240" y2={y + stepH + arrowH - 5} stroke="#2563eb" strokeWidth="2"/>
                <polygon points={`234,${y + stepH + arrowH - 5} 246,${y + stepH + arrowH - 5} 240,${y + stepH + arrowH}`} fill="#2563eb"/>
              </g>
            )}
          </g>
        );
      })}

      {/* Success box */}
      {(() => {
        const successY = 116 + checks.length * (stepH + arrowH);
        return (
          <g>
            <rect x="60" y={successY} width="360" height="32" rx="16" fill="#16a34a"/>
            <text x="240" y={successY + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Job Complete</text>

            {/* Critical warning */}
            <rect x="10" y={successY + 40} width="460" height="48" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="240" y={successY + 58} textAnchor="middle" fontSize="14" fontWeight="800" fill="#991b1b">SUCCESS ≠ RECOVERABLE</text>
            <text x="240" y={successY + 76} textAnchor="middle" fontSize="11" fill="#dc2626">Verify restore point in catalog → run restore test</text>
          </g>
        );
      })()}
    </svg>
  );
}
