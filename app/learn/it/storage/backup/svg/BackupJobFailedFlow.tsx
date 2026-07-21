"use client";
// D8 — Backup Job Failed Flowchart (compact vertical checklist)
export default function BackupJobFailedFlow() {
  const STEP_H  = 46;
  const ARROW_H = 12;

  const checks = [
    { q: "1. Source workload accessible?",
      fix: "Fix workload · network · agent communication" },
    { q: "2. Backup agent running? Version supported/compatible?",
      fix: "Start/reinstall · Check auth · Verify port access (product-specific)" },
    { q: "3. Snapshot / VSS required — did it succeed?",
      fix: "VSS writers (vssadmin list writers) · Datastore space · App health" },
    { q: "4. Proxy / media server reachable?",
      fix: "Proxy service · CPU/memory/disk · Network path" },
    { q: "5. Repository accessible? Capacity available?",
      fix: "Storage space · Network to repo · Dedup health · Cloud connectivity" },
    { q: "6. Data transfer completed?",
      fix: "Network bandwidth · Timeout settings · Proxy resources" },
    { q: "7. Catalog / metadata update succeeded?",
      fix: "Backup server disk space · Catalog database health" },
  ];

  const totalH = 96 + checks.length * (STEP_H + ARROW_H) + 50;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup job failed systematic troubleshooting"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      {/* Title */}
      <text x="240" y="19" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Backup Job Failed — Troubleshooting</text>

      {/* Start */}
      <rect x="50" y="26" width="380" height="28" rx="14" fill="#1e293b"/>
      <text x="240" y="44" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f8fafc">Job shows FAILED or ERROR</text>

      {/* Warning */}
      <rect x="10" y="60" width="460" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="240" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400e">⚠ Read error message carefully FIRST</text>
      <text x="240" y="84" textAnchor="middle" fontSize="9.5" fill="#92400e">Do NOT retry blindly — identify root cause</text>

      {/* Steps */}
      {checks.map((check, i) => {
        const y = 96 + i * (STEP_H + ARROW_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="7" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
            {/* Question */}
            <text x="18" y={y + 13} fontSize="10" fontWeight="600" fill="#1e40af">{check.q}</text>
            {/* YES badge */}
            <rect x="16" y={y + 18} width="38" height="16" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
            <text x="35" y={y + 30} textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">YES ↓</text>
            {/* NO fix */}
            <rect x="60" y={y + 18} width="390" height="16" rx="3" fill="#fee2e2" stroke="#ea580c" strokeWidth="1"/>
            <text x="68" y={y + 30} fontSize="9" fill="#c2410c">NO → {check.fix}</text>
            {/* Bottom note */}
            <line x1="16" y1={y + 38} x2="464" y2={y + 38} stroke="#dbeafe" strokeWidth="1"/>
            <text x="240" y={y + 44} textAnchor="middle" fontSize="9" fill="#6b7280">Resolve → re-run</text>
            {i < checks.length - 1 && (
              <g>
                <line x1="240" y1={y + STEP_H} x2="240" y2={y + STEP_H + ARROW_H - 4} stroke="#2563eb" strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARROW_H-4} 245,${y+STEP_H+ARROW_H-4} 240,${y+STEP_H+ARROW_H}`} fill="#2563eb"/>
              </g>
            )}
          </g>
        );
      })}

      {/* Success */}
      {(() => {
        const sy = 96 + checks.length * (STEP_H + ARROW_H);
        return (
          <g>
            <rect x="80" y={sy} width="320" height="28" rx="14" fill="#16a34a"/>
            <text x="240" y={sy + 18} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">Job Complete</text>
            {/* Critical */}
            <rect x="10" y={sy + 34} width="460" height="32" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="240" y={sy + 49} textAnchor="middle" fontSize="12" fontWeight="800" fill="#991b1b">SUCCESS ≠ RECOVERABLE</text>
            <text x="240" y={sy + 63} textAnchor="middle" fontSize="9.5" fill="#dc2626">Verify restore point in catalog → run restore test</text>
          </g>
        );
      })()}
    </svg>
  );
}
