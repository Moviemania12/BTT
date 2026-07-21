"use client";
// D6 — VMware Backup Architecture (compact vertical flow)
export default function BackupVmwareArch() {
  const ITEM_H  = 13;
  const HEAD_H  = 20;
  const PAD_V   = 3;
  const ARROW_H = 10;

  const steps = [
    {
      label: "VMs ON ESXI HOST",
      border: "#2563eb", bg: "#dbeafe", tc: "#1e40af",
      items: ["VM: Oracle DB · VM: Web Server · VM: App Server",
              "VMware Tools → enables guest quiescing",
              "SAN / NAS Datastore stores VM disk files (.vmdk)"],
    },
    {
      label: "VCENTER SERVER — VADP",
      border: "#7c3aed", bg: "#ede9fe", tc: "#5b21b6",
      items: ["vSphere API for Data Protection (VADP)",
              "VM discovery · Snapshot coordination · CBT access",
              "CBT = Changed Block Tracking — tracking mechanism, NOT backup itself"],
    },
    {
      label: "⚠ TEMPORARY VM SNAPSHOT (during backup only)",
      border: "#ea580c", bg: "#fff7ed", tc: "#c2410c",
      items: ["ESXi creates snapshot → freezes current disk state",
              "VM continues running (writes to delta files)",
              "⚠ Must be consolidated after job — long snapshots harm performance",
              "Datastore headroom required — depends on change rate & duration"],
    },
    {
      label: "BACKUP PROXY / MEDIA SERVER",
      border: "#16a34a", bg: "#dcfce7", tc: "#15803d",
      items: ["Reads VM data from snapshot (LAN or SAN transport)",
              "Compression · Deduplication · Encryption"],
    },
    {
      label: "PRIMARY BACKUP REPOSITORY",
      border: "#ca8a04", bg: "#fef9c3", tc: "#92400e",
      items: ["Disk / Dedup Appliance / Object Storage",
              "Backup catalog recorded — separate credentials from production"],
    },
    {
      label: "SECONDARY / IMMUTABLE COPY",
      border: "#dc2626", bg: "#fee2e2", tc: "#991b1b",
      items: ["Object lock / Hardened repo / Tape vault",
              "Automated recovery verification: vendor feature — not universal",
              "(e.g. Veeam SureBackup is one vendor-specific implementation)"],
    },
  ];

  const heights = steps.map(s => HEAD_H + s.items.length * ITEM_H + PAD_V * 2);
  const totalH  = 12 + heights.reduce((s, h, i) => s + h + (i < steps.length - 1 ? ARROW_H : 0), 0) + 42;

  let y = 12;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="VMware backup architecture VADP flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      {steps.map((step, si) => {
        const h = heights[si];
        const el = (
          <g key={si}>
            <rect x="10" y={y} width="460" height={h} rx="7" fill={step.bg} stroke={step.border} strokeWidth="2"/>
            <rect x="10" y={y} width="460" height={HEAD_H} rx="7" fill={step.border}/>
            <rect x="10" y={y + HEAD_H - 5} width="460" height="5" fill={step.border}/>
            <text x="240" y={y + HEAD_H - 8} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{step.label}</text>
            {step.items.map((item, ii) => (
              <text key={ii} x="18" y={y + HEAD_H + PAD_V + ii * ITEM_H + 12}
                fontSize="9.5" fill={step.tc}>{item}</text>
            ))}
            {si < steps.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + ARROW_H - 4} stroke={step.border} strokeWidth="2.5"/>
                <polygon points={`234,${y+h+ARROW_H-4} 246,${y+h+ARROW_H-4} 240,${y+h+ARROW_H}`} fill={step.border}/>
              </g>
            )}
          </g>
        );
        y += h + (si < steps.length - 1 ? ARROW_H : 0);
        return el;
      })}

      <rect x="10" y={y + 6} width="460" height="28" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="240" y={y + 20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">VMware snapshot ≠ long-term backup — independent backup = separate storage</text>
    </svg>
  );
}
