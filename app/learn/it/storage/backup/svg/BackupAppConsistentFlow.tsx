"use client";
// D5 — Application-Consistent Backup Flow (mobile-first vertical steps)
export default function BackupAppConsistentFlow() {
  const appSteps = [
    { n: "1", text: "Backup job initiates", sub: "Backup Platform", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { n: "2", text: "Quiesce request", sub: "VSS / VMware Tools / DB plugin → Application", bg: "#ede9fe", border: "#7c3aed", tc: "#5b21b6" },
    { n: "3", text: "App flushes buffers · completes transactions", sub: "Application enters known-consistent state", bg: "#fff7ed", border: "#ea580c", tc: "#c2410c" },
    { n: "4", text: "Snapshot created", sub: "Storage / Hypervisor — at consistent point", bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { n: "5", text: "Application resumes immediately", sub: "Production unblocked — normal operation continues", bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { n: "6", text: "Backup reads data from snapshot", sub: "Backup Proxy / Media Server", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { n: "7", text: "Data written to repository", sub: "Compressed · Deduplicated · Encrypted", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { n: "8", text: "Snapshot released · Catalog updated", sub: "Restore point recorded", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
  ];

  const stepH = 62;
  const arrowH = 20;
  const totalH = 58 + appSteps.length * (stepH + arrowH) + 120;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Application-consistent backup flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>
      <text x="240" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Application-Consistent Backup Flow</text>

      {/* VSS label */}
      <rect x="10" y="32" width="460" height="22" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y="47" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">VSS = coordination framework, not a backup product</text>

      {appSteps.map((step, i) => {
        const y = 62 + i * (stepH + arrowH);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={stepH} rx="8" fill={step.bg} stroke={step.border} strokeWidth="1.5"/>
            {/* Number badge */}
            <rect x="10" y={y} width="44" height={stepH} rx="8" fill={step.border}/>
            <rect x="44" y={y} width="8" height={stepH} fill={step.border}/>
            <text x="32" y={y + stepH / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">{step.n}</text>
            <text x="64" y={y + 23} fontSize="13" fontWeight="600" fill={step.tc}>{step.text}</text>
            <text x="64" y={y + 43} fontSize="11" fill="#6b7280">{step.sub}</text>
            {i < appSteps.length - 1 && (
              <g>
                <line x1="240" y1={y + stepH} x2="240" y2={y + stepH + arrowH - 5}
                  stroke={step.border} strokeWidth="2"/>
                <polygon points={`234,${y + stepH + arrowH - 5} 246,${y + stepH + arrowH - 5} 240,${y + stepH + arrowH}`}
                  fill={step.border}/>
              </g>
            )}
          </g>
        );
      })}

      {/* Warning note */}
      <rect x="10" y={62 + appSteps.length * (stepH + arrowH) + 4} width="460" height="50" rx="7"
        fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="240" y={62 + appSteps.length * (stepH + arrowH) + 22}
        textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">
        ⚠ Application-consistent backup ≠ guaranteed recoverability
      </text>
      <text x="240" y={62 + appSteps.length * (stepH + arrowH) + 38}
        textAnchor="middle" fontSize="11" fill="#dc2626">
        Pre-existing corruption backed up consistently = corrupt restore
      </text>
      <text x="240" y={62 + appSteps.length * (stepH + arrowH) + 52}
        textAnchor="middle" fontSize="11" fill="#dc2626">
        Restore testing still essential
      </text>

      {/* Crash-consistent note */}
      <rect x="10" y={62 + appSteps.length * (stepH + arrowH) + 62} width="460" height="40" rx="6"
        fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={62 + appSteps.length * (stepH + arrowH) + 78}
        textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#92400e">
        Crash-consistent: Steps 2–4 skipped — app NOT quiesced
      </text>
      <text x="240" y={62 + appSteps.length * (stepH + arrowH) + 94}
        textAnchor="middle" fontSize="11" fill="#92400e">
        May require crash recovery on restore — not recommended for databases
      </text>
    </svg>
  );
}
