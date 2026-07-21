"use client";
// Diagram 2 — NAS File Access: Complete Request and Response Flow
// Future image: /public/images/articles/nas/nas-request-flow.png
export default function NasRequestFlow() {
  const layers = [
    { label: "Client Application / User", sub: "double-click file", bg: "#dbeafe", border: "#2563eb", fg: "#1e40af" },
    { label: "Operating System", sub: "UNC path \\\\nas01\\engineering detected", bg: "#ede9fe", border: "#7c3aed", fg: "#5b21b6" },
    { label: "Protocol Layer", sub: "SMB (Port 445) / NFS (Port 2049)", bg: "#fef3c7", border: "#d97706", fg: "#92400e" },
    { label: "TCP/IP Stack + NIC", sub: "DNS resolution: nas01 → IP", bg: "#dcfce7", border: "#16a34a", fg: "#166534" },
    { label: "Ethernet Switch", sub: "Frame forwarded to NAS port", bg: "#f0fdf4", border: "#16a34a", fg: "#166534" },
    { label: "NAS Network Interface", sub: "Packet received", bg: "#fef9c3", border: "#ca8a04", fg: "#92400e" },
    { label: "NAS OS — Auth + Permission Check", sub: "User authenticated? Share/export allowed?", bg: "#fee2e2", border: "#dc2626", fg: "#991b1b" },
    { label: "NAS File System", sub: "ZFS / WAFL / OneFS / Btrfs — file located", bg: "#fce7f3", border: "#db2777", fg: "#9d174d" },
    { label: "Storage Pool + RAID", sub: "RAID protection — data read from drives", bg: "#e0e7ff", border: "#4f46e5", fg: "#3730a3" },
    { label: "Physical Drives (HDD / SSD / NVMe)", sub: "Data retrieved", bg: "#1e293b", border: "#334155", fg: "#e2e8f0" },
  ];
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="NAS file access — complete request and response flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="440" fill="#f8fafc" rx="12"/>
      <text x="430" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">NAS File Access — Complete Request &amp; Response Flow</text>
      <text x="430" y="40" textAnchor="middle" fontSize="9.5" fill="#6b7280">Every layer must succeed for a file access to complete</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="100" y={55 + i * 36} width="560" height="28" rx="5" fill={l.bg} stroke={l.border} strokeWidth="1"/>
          <text x="390" y={72 + i * 36} textAnchor="middle" fontSize="9.5" fontWeight="600" fill={l.fg}>{l.label}</text>
          <text x="675" y={72 + i * 36} fontSize="8.5" fill="#6b7280">{l.sub}</text>
          {i < layers.length - 1 && <text x="390" y={90 + i * 36} textAnchor="middle" fontSize="10" fill="#6b7280">↓</text>}
          <text x="90" y={72 + i * 36} textAnchor="end" fontSize="9" fill="#9ca3af">{i + 1}</text>
        </g>
      ))}
      <text x="430" y="428" textAnchor="middle" fontSize="8.5" fill="#9ca3af">Response travels back up same path. Future image: nas-request-flow.png</text>
    </svg>
  );
}
