"use client";
export default function StorageSyncDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ssd-title" style={{ width: "100%", height: "auto" }}>
      <title id="ssd-title">Hybrid Storage Sync: On-Premises to Cloud Storage patterns and tools</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID STORAGE SYNC AND REPLICATION PATTERNS</text>

      {/* On-Prem Storage */}
      <rect x="10" y="34" width="190" height="260" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="105" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">ON-PREM STORAGE</text>
      {[
        { label: "NAS / NFS Shares", desc: "\\\\fileserver\\shares" },
        { label: "SAN / Block (iSCSI)", desc: "LUNs for VMs/DBs" },
        { label: "Object Store", desc: "Ceph / NetApp ONTAP S3" },
        { label: "Backup Tapes / VTL", desc: "Veeam / Commvault" },
        { label: "Database Files", desc: "SQL / Oracle data files" },
        { label: "VM Disk Images", desc: "VMDK / VHDX" },
      ].map(({ label, desc }, i) => (
        <g key={label}>
          <rect x="20" y={66 + i * 38} width="170" height="32" rx="4" fill={i % 2 === 0 ? "#e2e8f0" : "#f1f5f9"} stroke="#cbd5e1" strokeWidth="1" />
          <text x="105" y={80 + i * 38} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">{label}</text>
          <text x="105" y={92 + i * 38} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">{desc}</text>
        </g>
      ))}

      {/* Sync Methods */}
      <rect x="210" y="34" width="400" height="260" rx="8" fill="#fafafa" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151" textAnchor="middle">SYNC / TRANSFER METHODS</text>

      {[
        { y: 64, color: "#2563EB", bg: "#dbeafe", title: "Storage Gateway / File Sync Agent", desc1: "AWS Storage Gateway / Azure File Sync / Google Storage Transfer", desc2: "On-prem cache + cloud backend. Files accessible locally + cloud-backed." },
        { y: 118, color: "#16a34a", bg: "#dcfce7", title: "Database Replication", desc1: "SQL Always On / MySQL replication / Oracle Data Guard / DMS", desc2: "Continuous async replication to cloud DB. Used for DR + read replicas." },
        { y: 172, color: "#dc2626", bg: "#fee2e2", title: "Bulk Migration — DataSync / AzCopy / gsutil", desc1: "One-time or scheduled bulk transfer. Handles checksums + retries.", desc2: "DataSync: up to 10Gbps. Transfer 100TB = ~1 day at 10Gbps." },
        { y: 226, color: "#f97316", bg: "#ffedd5", title: "Backup to Cloud (Cloud Tier)", desc1: "Veeam / Commvault / Veritas → cloud object storage", desc2: "3-2-1-1 rule: 3 copies, 2 media, 1 offsite (cloud), 1 air-gapped." },
      ].map(({ y, color, bg, title, desc1, desc2 }) => (
        <g key={y}>
          <rect x="218" y={y} width="384" height="48" rx="5" fill={bg} stroke={color} strokeWidth="1.5" />
          <text x="226" y={y + 14} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={color}>{title}</text>
          <text x="226" y={y + 28} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{desc1}</text>
          <text x="226" y={y + 41} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">{desc2}</text>
        </g>
      ))}

      {/* Arrows */}
      {[88, 142, 196, 250].map(y => (
        <g key={y}>
          <line x1="200" y1={y} x2="218" y2={y} stroke="#475569" strokeWidth="1.5" />
          <polygon points={`215,${y - 4} 222,${y} 215,${y + 4}`} fill="#475569" />
        </g>
      ))}
      {[88, 142, 196, 250].map(y => (
        <g key={y + 500}>
          <line x1="602" y1={y} x2="616" y2={y} stroke="#475569" strokeWidth="1.5" />
          <polygon points={`614,${y - 4} 621,${y} 614,${y + 4}`} fill="#475569" />
        </g>
      ))}

      {/* Cloud Storage */}
      <rect x="620" y="34" width="190" height="260" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="715" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0284c7" textAnchor="middle">CLOUD STORAGE</text>
      {[
        { label: "Object Storage", desc: "S3 / Blob / GCS" },
        { label: "Cloud File Shares", desc: "EFS / Azure Files / Filestore" },
        { label: "Block Storage", desc: "EBS / Managed Disk / PD" },
        { label: "Cloud SQL / NoSQL", desc: "RDS / SQL DB / Spanner" },
        { label: "Archive / Glacier", desc: "Coldline / Archive tier" },
        { label: "Cloud Backup Vault", desc: "AWS Backup / Azure Backup" },
      ].map(({ label, desc }, i) => (
        <g key={label}>
          <rect x="630" y={66 + i * 38} width="170" height="32" rx="4" fill={i % 2 === 0 ? "#e0f2fe" : "#f0f9ff"} stroke="#7dd3fc" strokeWidth="1" />
          <text x="715" y={80 + i * 38} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0369a1" textAnchor="middle">{label}</text>
          <text x="715" y={92 + i * 38} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0284c7" textAnchor="middle">{desc}</text>
        </g>
      ))}

      {/* Key insight */}
      <rect x="10" y="302" width="800" height="30" rx="5" fill="#1e293b" />
      <text x="410" y="317" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7dd3fc" textAnchor="middle">DATA GRAVITY WARNING: Network egress costs money. 100TB at $0.08/GB = $8,000 one-way. Plan data flows carefully — minimize unnecessary cloud egress.</text>
      <text x="410" y="328" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Once data is in cloud, compute follows data (not opposite). Incremental sync + lifecycle tiering = cost control strategy.</text>
    </svg>
  );
}
