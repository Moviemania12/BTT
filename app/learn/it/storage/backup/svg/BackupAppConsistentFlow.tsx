"use client";
// D5 — Application-Consistent Backup Flow (compact vertical steps)
export default function BackupAppConsistentFlow() {
  const STEP_H  = 36;
  const ARROW_H = 10;

  const steps = [
    { n:"1", text:"Backup job initiates",                          sub:"Backup Platform",                              bg:"#dbeafe", border:"#2563eb", tc:"#1e40af" },
    { n:"2", text:"Quiesce request sent",                          sub:"VSS / VMware Tools / DB plugin → Application",  bg:"#ede9fe", border:"#7c3aed", tc:"#5b21b6" },
    { n:"3", text:"App flushes buffers · completes transactions",  sub:"Application enters known-consistent state",     bg:"#fff7ed", border:"#ea580c", tc:"#c2410c" },
    { n:"4", text:"Snapshot created at consistent point",          sub:"Storage / Hypervisor",                         bg:"#dcfce7", border:"#16a34a", tc:"#15803d" },
    { n:"5", text:"Application resumes immediately",               sub:"Production unblocked — normal operation",      bg:"#dcfce7", border:"#16a34a", tc:"#15803d" },
    { n:"6", text:"Backup reads data from snapshot",               sub:"Backup Proxy / Media Server",                  bg:"#dbeafe", border:"#2563eb", tc:"#1e40af" },
    { n:"7", text:"Data written to repository",                    sub:"Compressed · Deduplicated · Encrypted",        bg:"#dbeafe", border:"#2563eb", tc:"#1e40af" },
    { n:"8", text:"Snapshot released · Catalog updated",           sub:"Restore point recorded",                       bg:"#dbeafe", border:"#2563eb", tc:"#1e40af" },
  ];

  const totalH = 50 + steps.length * (STEP_H + ARROW_H) + 88;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Application-consistent backup flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Application-Consistent Backup Flow</text>
      <rect x="10" y="26" width="460" height="20" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y="40" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#5b21b6">VSS = coordination framework, not a backup product</text>

      {steps.map((s, i) => {
        const y = 52 + i * (STEP_H + ARROW_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="7" fill={s.bg} stroke={s.border} strokeWidth="1.5"/>
            <rect x="10" y={y} width="38" height={STEP_H} rx="7" fill={s.border}/>
            <rect x="38" y={y} width="6" height={STEP_H} fill={s.border}/>
            <text x="29" y={y + STEP_H / 2 + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">{s.n}</text>
            <text x="54" y={y + 13} fontSize="10" fontWeight="600" fill={s.tc}>{s.text}</text>
            <text x="54" y={y + 26} fontSize="9" fill="#6b7280">{s.sub}</text>
            {i < steps.length - 1 && (
              <g>
                <line x1="240" y1={y + STEP_H} x2="240" y2={y + STEP_H + ARROW_H - 4} stroke={s.border} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARROW_H-4} 245,${y+STEP_H+ARROW_H-4} 240,${y+STEP_H+ARROW_H}`} fill={s.border}/>
              </g>
            )}
          </g>
        );
      })}

      <rect x="10" y={52 + steps.length * (STEP_H + ARROW_H) + 2} width="460" height="38" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="240" y={52 + steps.length * (STEP_H + ARROW_H) + 18} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#991b1b">
        ⚠ App-consistent backup ≠ guaranteed recoverability
      </text>
      <text x="240" y={52 + steps.length * (STEP_H + ARROW_H) + 33} textAnchor="middle" fontSize="9.5" fill="#dc2626">
        Pre-existing corruption + restore testing still essential
      </text>
      <rect x="10" y={52 + steps.length * (STEP_H + ARROW_H) + 46} width="460" height="32" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={52 + steps.length * (STEP_H + ARROW_H) + 60} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">
        Crash-consistent: Steps 2–4 skipped — app NOT quiesced
      </text>
      <text x="240" y={52 + steps.length * (STEP_H + ARROW_H) + 74} textAnchor="middle" fontSize="9" fill="#92400e">
        May require crash recovery — not recommended for databases
      </text>
    </svg>
  );
}
