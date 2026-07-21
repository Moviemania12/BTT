"use client";
// Diagram 2 — Complete SAN Data Path: Application to Storage Media
// Future image: /public/images/articles/san/san-complete-data-path.png
export default function SanDataPath() {
  const layers = [
    { n:"1",  label:"Application", sub:"Oracle, SQL Server, VMware, etc. — issues I/O request", bg:"#dbeafe", border:"#2563eb", fg:"#1e40af" },
    { n:"2",  label:"Filesystem / Raw Device", sub:"NTFS, ext4, VMFS, raw device — translates to block I/O", bg:"#ede9fe", border:"#7c3aed", fg:"#5b21b6" },
    { n:"3",  label:"Volume Manager / Logical Disk", sub:"OS presents a single unified block device", bg:"#fce7f3", border:"#db2777", fg:"#9d174d" },
    { n:"4",  label:"Multipath Layer", sub:"MPIO / DM-Multipath / VMware NMP — selects path, manages failover", bg:"#fef9c3", border:"#ca8a04", fg:"#92400e" },
    { n:"5",  label:"HBA / iSCSI NIC", sub:"Physical FC adapter (WWPN) or iSCSI NIC (IQN)", bg:"#dcfce7", border:"#16a34a", fg:"#166534" },
    { n:"6",  label:"SAN Fabric", sub:"FC switches (WWPN-routed) or iSCSI network (TCP/IP)", bg:"#d1fae5", border:"#059669", fg:"#065f46" },
    { n:"7",  label:"Storage Front-End Port", sub:"Target port on array (WWPN or iSCSI portal)", bg:"#fef3c7", border:"#d97706", fg:"#92400e" },
    { n:"8",  label:"Storage Controller", sub:"Processes I/O, manages cache and backend routing", bg:"#fde68a", border:"#d97706", fg:"#92400e" },
    { n:"9",  label:"Write Cache (NVRAM / Flash)", sub:"Fast acknowledge; destages to media in background", bg:"#fed7aa", border:"#ea580c", fg:"#c2410c" },
    { n:"10", label:"RAID / Storage Pool Logic", sub:"Data protection layer — RAID / erasure coding", bg:"#fca5a5", border:"#dc2626", fg:"#991b1b" },
    { n:"11", label:"Physical Media", sub:"NVMe SSD / SAS SSD / SAS HDD", bg:"#374151", border:"#111827", fg:"#f9fafb" },
  ];
  return (
    <svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Complete SAN data path from application to physical media"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="430" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Complete SAN Data Path — Application to Physical Media</text>
      <text x="430" y="38" textAnchor="middle" fontSize="9.5" fill="#6b7280">Each layer must function correctly for I/O to complete</text>
      {layers.map((l,i) => (
        <g key={i}>
          <rect x="90" y={50+i*34} width="580" height="26" rx="4" fill={l.bg} stroke={l.border} strokeWidth="1"/>
          <text x="102" y={67+i*34} fontSize="9" fill={l.fg} fontWeight="700">{l.n}.</text>
          <text x="118" y={67+i*34} fontSize="9.5" fill={l.fg} fontWeight="600">{l.label}</text>
          <text x="118" y={77+i*34} fontSize="0">{/* spacer */}</text>
          <text x="700" y={67+i*34} fontSize="8" fill="#6b7280">{l.sub}</text>
          {i < layers.length-1 && <text x="380" y={83+i*34} textAnchor="middle" fontSize="10" fill="#9ca3af">↓</text>}
        </g>
      ))}
      <text x="65" y="240" textAnchor="middle" fontSize="8" fill="#2563eb" transform="rotate(-90,65,240)">← Read returns data up same path</text>
      <text x="430" y="422" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-complete-data-path.png</text>
    </svg>
  );
}
