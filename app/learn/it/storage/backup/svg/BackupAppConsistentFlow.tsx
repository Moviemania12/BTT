"use client";
// Diagram 5 — Application-Consistent Backup Flow
export default function BackupAppConsistentFlow() {
  const steps = [
    { n:"1", text:"Backup job initiates", from:"Backup Platform", color:"#2563eb" },
    { n:"2", text:"Quiesce request sent (VSS / VMware Tools / DB plugin)", from:"Backup Platform → Application", color:"#7c3aed" },
    { n:"3", text:"Application flushes write buffers, completes in-flight transactions", from:"Application", color:"#ea580c" },
    { n:"4", text:"Application signals: consistent state ready", from:"Application → Backup Platform", color:"#ea580c" },
    { n:"5", text:"Snapshot / checkpoint created at consistent point", from:"Storage / Hypervisor", color:"#16a34a" },
    { n:"6", text:"Application resumes normal operation (production unblocked)", from:"Application", color:"#16a34a" },
    { n:"7", text:"Backup platform reads data from snapshot", from:"Backup Platform ← Snapshot", color:"#2563eb" },
    { n:"8", text:"Data written to repository (compressed/deduped)", from:"Repository", color:"#2563eb" },
    { n:"9", text:"Snapshot released / consolidated", from:"Storage / Hypervisor", color:"#16a34a" },
    { n:"10", text:"Catalog updated — restore point recorded", from:"Backup Server", color:"#2563eb" },
  ];
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Application-consistent backup flow: quiesce, snapshot, backup, snapshot release"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="380" fill="#f8fafc" rx="12"/>
      <text x="430" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Application-Consistent Backup Flow</text>
      <rect x="120" y="26" width="620" height="12" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
      <text x="430" y="36" textAnchor="middle" fontSize="7.5" fill="#991b1b" fontWeight="700">Application-consistent backup preserves known state at backup time — does NOT guarantee pre-existing corruption absent. Restore testing essential.</text>
      {steps.map((s,i) => (
        <g key={i}>
          <rect x="40" y={44+i*30} width="24" height="20" rx="4" fill={s.color}/>
          <text x="52" y="58" dy={i*30} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">{s.n}</text>
          <rect x="72" y={44+i*30} width="660" height="20" rx="4"
            fill={i===2||i===3 ? "#fff7ed" : i===4||i===5||i===8 ? "#f0fdf4" : "#eff6ff"}
            stroke={s.color} strokeWidth="0.6"/>
          <text x="84" y={59+i*30} fontSize="9" fill="#111827" fontWeight="500">{s.text}</text>
          <text x="740" y={59+i*30} fontSize="7.5" fill="#6b7280" textAnchor="end">{s.from}</text>
          {i < steps.length-1 && <line x1="52" y1={64+i*30} x2="52" y2={74+i*30} stroke={s.color} strokeWidth="1" opacity="0.4"/>}
        </g>
      ))}

      <rect x="40" y="348" width="780" height="20" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.8"/>
      <text x="430" y="362" textAnchor="middle" fontSize="8" fill="#92400e">Crash-consistent: Steps 2-5 skipped — application NOT quiesced. May require crash recovery on restore. Not recommended for databases.</text>
      <text x="430" y="374" textAnchor="middle" fontSize="7.5" fill="#9ca3af">Future image: backup-app-consistent-flow.png</text>
    </svg>
  );
}
