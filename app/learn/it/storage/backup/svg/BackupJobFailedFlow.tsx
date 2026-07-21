"use client";
// Diagram 8 — Backup Job Failed: Systematic Troubleshooting Flowchart
export default function BackupJobFailedFlow() {
  const steps = [
    { q:"Source workload running and accessible?",       fix:"Fix workload, network connectivity, agent communication" },
    { q:"Backup agent running? API accessible?",         fix:"Start/reinstall agent, check authentication, port access" },
    { q:"Snapshot/VSS required — did it succeed?",       fix:"VSS writer state (vssadmin list writers), datastore space, app health" },
    { q:"Proxy / media server reachable?",               fix:"Proxy service, resources (CPU/memory/disk), network path" },
    { q:"Repository accessible? Has capacity?",          fix:"Storage space, network to repo, dedup health, cloud connectivity" },
    { q:"Data transfer completed?",                      fix:"Network bandwidth, timeout settings, proxy resources" },
    { q:"Catalog update succeeded?",                     fix:"Backup server disk space, catalog database health" },
  ];
  return (
    <svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Backup job failed: systematic troubleshooting flowchart"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="430" fill="#f8fafc" rx="12"/>
      <text x="430" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Backup Job Failed — Systematic Troubleshooting Flow</text>

      {/* Start */}
      <rect x="230" y="28" width="400" height="22" rx="11" fill="#1e293b"/>
      <text x="430" y="43" textAnchor="middle" fontSize="9.5" fill="#f8fafc" fontWeight="600">Backup Job shows FAILED or ERROR</text>

      {/* Warning */}
      <rect x="200" y="56" width="460" height="18" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="430" y="68" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="600">Read error message carefully first. Do NOT retry blindly — identify root cause.</text>

      {steps.map((s,i) => (
        <g key={i}>
          <line x1="430" y1={80+i*46} x2="430" y2={90+i*46} stroke="#6b7280" strokeWidth="1.2"/>
          <rect x="180" y={90+i*46} width="500" height="22" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1"/>
          <text x="430" y={105+i*46} textAnchor="middle" fontSize="8.5" fill="#1e40af" fontWeight="500">{i+1}. {s.q}</text>
          {/* No arrow */}
          <line x1="680" y1={101+i*46} x2="706" y2={101+i*46} stroke="#dc2626" strokeWidth="1"/>
          <text x="710" y={98+i*46} fontSize="7" fill="#dc2626">No →</text>
          <rect x="720" y={93+i*46} width="124" height="16" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
          <text x="782" y={104+i*46} textAnchor="middle" fontSize="6.5" fill="#991b1b">{s.fix}</text>
          {/* Yes indicator */}
          <text x="174" y={105+i*46} textAnchor="end" fontSize="7" fill="#16a34a">↓ Yes</text>
        </g>
      ))}

      <line x1="430" y1={80+steps.length*46} x2="430" y2={90+steps.length*46} stroke="#6b7280" strokeWidth="1.2"/>
      <rect x="280" y={90+steps.length*46} width="300" height="22" rx="11" fill="#16a34a"/>
      <text x="430" y={105+steps.length*46} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">Job Complete — Verify catalog + restore point</text>

      {/* Critical note */}
      <rect x="40" y={122+steps.length*46} width="780" height="30" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="430" y={136+steps.length*46} textAnchor="middle" fontSize="8.5" fill="#991b1b" fontWeight="600">AFTER FIX: "Success" status ≠ recoverable. Verify restore point visible in catalog. Consider restore test in isolated environment.</text>
      <text x="430" y={148+steps.length*46} textAnchor="middle" fontSize="8" fill="#374151">Recurring failures: investigate systemic issue (version compatibility, network, hardware). Do not mask with repeated retries.</text>

      <text x="430" y="418" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: backup-job-failed-flowchart.png</text>
    </svg>
  );
}
