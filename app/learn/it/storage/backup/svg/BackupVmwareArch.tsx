"use client";
// D6 — VMware Backup Architecture (mobile-first vertical flow)
export default function BackupVmwareArch() {
  const steps = [
    {
      label: "VMs ON ESXI HOST",
      items: ["VM: Oracle DB  ·  VM: Web Server  ·  VM: App Server",
              "VMware Tools installed → enables guest quiescing",
              "SAN / NAS Datastore stores VM disk files (.vmdk)"],
      bg: "#dbeafe", border: "#2563eb", tc: "#1e40af",
    },
    {
      label: "VCENTER SERVER — VADP",
      items: ["vSphere API for Data Protection (VADP)",
              "Backup software calls vCenter API to initiate job",
              "VM discovery · Snapshot coordination · CBT access",
              "CBT = Changed Block Tracking — tracking mechanism, NOT backup itself"],
      bg: "#ede9fe", border: "#7c3aed", tc: "#5b21b6",
    },
    {
      label: "⚠ TEMPORARY VM SNAPSHOT",
      items: ["ESXi creates snapshot → freezes current disk state",
              "VM continues running (writes go to delta files)",
              "Backup proxy reads disk data FROM the snapshot",
              "⚠ Snapshot must be consolidated after job completes",
              "Long-running snapshots: datastore space + VM perf impact"],
      bg: "#fff7ed", border: "#ea580c", tc: "#c2410c",
    },
    {
      label: "BACKUP PROXY / MEDIA SERVER",
      items: ["Reads VM data from snapshot (LAN or SAN transport)",
              "Applies compression · deduplication · encryption",
              "Can be a VM or physical server"],
      bg: "#dcfce7", border: "#16a34a", tc: "#15803d",
    },
    {
      label: "PRIMARY BACKUP REPOSITORY",
      items: ["Disk / Dedup Appliance / Object Storage",
              "Backup catalog — restore point recorded",
              "Separate credentials from production AD/admin"],
      bg: "#fef9c3", border: "#ca8a04", tc: "#92400e",
    },
    {
      label: "SECONDARY / IMMUTABLE COPY",
      items: ["Object lock / Hardened repo / Tape vault",
              "Automated recovery verification (vendor feature — not universal)",
              "e.g. Veeam SureBackup: one vendor-specific implementation"],
      bg: "#fee2e2", border: "#dc2626", tc: "#991b1b",
    },
  ];

  const itemH = 20;
  const headerH = 34;
  const padV = 8;
  const arrowH = 26;
  let totalH = 16;
  const heights = steps.map(s => headerH + s.items.length * itemH + padV * 2);
  heights.forEach((h, i) => { totalH += h + (i < steps.length - 1 ? arrowH : 0); });
  totalH += 56;

  let y = 16;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="VMware backup architecture VADP flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>

      {steps.map((step, si) => {
        const h = heights[si];
        const el = (
          <g key={si}>
            <rect x="10" y={y} width="460" height={h} rx="8" fill={step.bg} stroke={step.border} strokeWidth="2"/>
            <rect x="10" y={y} width="460" height={headerH} rx="8" fill={step.border}/>
            <rect x="10" y={y + headerH - 6} width="460" height="6" fill={step.border}/>
            <text x="240" y={y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{step.label}</text>
            {step.items.map((item, ii) => (
              <text key={ii} x="22" y={y + headerH + padV + ii * itemH + 13}
                fontSize="11" fill={step.tc}>{item}</text>
            ))}
            {si < steps.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + arrowH - 6} stroke={step.border} strokeWidth="2.5"/>
                <polygon points={`234,${y + h + arrowH - 6} 246,${y + h + arrowH - 6} 240,${y + h + arrowH}`} fill={step.border}/>
              </g>
            )}
          </g>
        );
        y += h + (si < steps.length - 1 ? arrowH : 0);
        return el;
      })}

      {/* Critical warning */}
      <rect x="10" y={y + 8} width="460" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="240" y={y + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">
        VMware snapshot ≠ long-term backup
      </text>
      <text x="240" y={y + 42} textAnchor="middle" fontSize="11" fill="#dc2626">
        Snapshot same datastore — independent backup = separate storage
      </text>
    </svg>
  );
}
