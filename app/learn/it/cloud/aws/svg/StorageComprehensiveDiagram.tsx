"use client";
export default function StorageComprehensiveDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sc-title">
      <title id="sc-title">AWS Storage Comprehensive: EBS, S3, EFS, FSx, Instance Store</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS STORAGE SERVICES — COMPREHENSIVE COMPARISON</text>

      {/* Header row */}
      {["", "Instance Store", "EBS", "EFS", "FSx", "S3"].map((h, i) => (
        <rect key={i} x={i === 0 ? 20 : 130 + (i-1)*135} y={36} width={i === 0 ? 110 : 130} height={28} rx="4"
          fill={i === 0 ? "#f8fafc" : ["#0f172a","#1e40af","#f97316","#7c3aed","#16a34a"][i-1]} />
      ))}
      {["Property", "Instance Store", "EBS (Block)", "EFS (File)", "FSx (Managed FS)", "S3 (Object)"].map((h, i) => (
        <text key={i} x={(i === 0 ? 75 : 195 + (i-1)*135)} y={55} fontFamily="Arial,sans-serif" fontSize="9"
          fontWeight="700" fill={i === 0 ? "#374151" : "#ffffff"} textAnchor="middle">{h}</text>
      ))}

      {/* Rows */}
      {[
        ["DC Equivalent", "Local disk (NVMe)", "SAN LUN (iSCSI)", "NAS (NFS share)", "Managed FS Server", "Object storage"],
        ["Persistence", "Ephemeral (lost on stop)", "Persistent", "Persistent", "Persistent", "Persistent"],
        ["Protocol", "Block (direct)", "Block (network)", "NFS v4", "NFS / SMB", "HTTP REST API"],
        ["Multi-attach", "N/A (local)", "Limited (io2 only)", "Many EC2s", "Many EC2s", "Unlimited (API)"],
        ["AZ scope", "Same host", "Same AZ", "Regional/AZ", "AZ or Regional", "Regional (3+ AZs)"],
        ["Performance", "Highest (NVMe local)", "High (provisioned IOPS)", "Scalable NFS", "Varies by type", "Variable, high throughput"],
        ["Use case", "Temp buffer / cache", "OS, database, boot", "Shared files, CMS", "Windows/.NET/HPC", "Backups, archives, data lake"],
        ["Cost model", "Included with instance", "GB-month + IOPS", "GB-month used", "GB-month + type", "GB-month + requests"],
      ].map(([prop, ...values], ri) => (
        <g key={ri}>
          <rect x={20} y={72 + ri*34} width={110} height={30} rx="3" fill={ri%2===0 ? "#f8fafc" : "#f1f5f9"} />
          <text x={75} y={91 + ri*34} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#374151" textAnchor="middle">{prop}</text>
          {values.map((v, ci) => (
            <g key={ci}>
              <rect x={130 + ci*135} y={72 + ri*34} width={130} height={30} rx="3"
                fill={ri%2===0 ? ["#1e1e2e","#eff6ff","#fff7ed","#faf5ff","#f0fdf4"][ci] : ["#252535","#dbeafe","#fed7aa","#ede9fe","#dcfce7"][ci]} />
              <text x={195 + ci*135} y={91 + ri*34} fontFamily="Arial,sans-serif" fontSize="8"
                fill={ci === 0 ? "#e2e8f0" : "#374151"} textAnchor="middle">{v}</text>
            </g>
          ))}
        </g>
      ))}

      {/* S3 classes note */}
      <rect x="20" y="348" width="780" height="26" rx="5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="30" y="360" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d">S3 Storage Classes:</text>
      <text x="130" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">Standard → Standard-IA → One Zone-IA → Glacier Instant → Glacier Flexible → Glacier Deep Archive (cost ↓, retrieval time ↑)</text>
      <text x="30" y="369" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534">Intelligent-Tiering automatically moves objects between tiers based on access patterns. Lifecycle Policies automate transitions.</text>
    </svg>
  );
}
