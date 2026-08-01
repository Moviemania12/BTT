"use client";
export default function StorageReplicationDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="srd-title" style={{ width: "100%", height: "auto" }}>
      <title id="srd-title">Multi-Cloud Storage Replication: object storage, database, backup across AWS, Azure, GCP</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD STORAGE REPLICATION PATTERNS</text>

      {/* Object Storage */}
      <rect x="10" y="32" width="380" height="130" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="200" y="50" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">OBJECT STORAGE REPLICATION</text>

      <rect x="20" y="58" width="100" height="50" rx="5" fill="#f97316" />
      <text x="70" y="78" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">AWS S3</text>
      <text x="70" y="92" fontFamily="Arial,sans-serif" fontSize="7" fill="#ffedd5" textAnchor="middle">Primary bucket</text>
      <text x="70" y="104" fontFamily="Arial,sans-serif" fontSize="7" fill="#ffedd5" textAnchor="middle">us-east-1</text>

      <rect x="140" y="58" width="100" height="50" rx="5" fill="#2563EB" />
      <text x="190" y="78" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Blob</text>
      <text x="190" y="92" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Replicated</text>
      <text x="190" y="104" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">West Europe</text>

      <rect x="260" y="58" width="100" height="50" rx="5" fill="#34A853" />
      <text x="310" y="78" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">GCS</text>
      <text x="310" y="92" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">Replicated</text>
      <text x="310" y="104" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">asia-south1</text>

      <line x1="120" y1="83" x2="140" y2="83" stroke="#475569" strokeWidth="1.5" />
      <polygon points="138,80 144,83 138,86" fill="#475569" />
      <line x1="240" y1="83" x2="260" y2="83" stroke="#475569" strokeWidth="1.5" />
      <polygon points="258,80 264,83 258,86" fill="#475569" />

      <text x="200" y="125" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">Tools: rclone, AWS DataSync, AzCopy, Storage Transfer Service</text>
      <text x="200" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Schedule: continuous/hourly. Checksum verification. Immutable backups (Object Lock).</text>
      <text x="200" y="154" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Cost alert: egress fees on source cloud apply to cross-cloud transfers</text>

      {/* Database Replication */}
      <rect x="430" y="32" width="380" height="130" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="620" y="50" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">DATABASE REPLICATION (CROSS-CLOUD)</text>

      {[
        ["AWS RDS (Primary)", "→ Azure SQL (DR)", "Striim / DMS CDC"],
        ["AWS Aurora", "→ GCP Cloud SQL", "pglogical / Attunity"],
        ["Azure SQL", "→ AWS RDS (DR)", "Azure DMS / custom CDC"],
        ["GCP Spanner", "→ AWS / Azure", "Dataflow + Kafka"],
      ].map(([src, dst, tool], i) => (
        <g key={i}>
          <rect x="440" y={58 + i * 24} width="360" height="20" rx="3" fill={i % 2 === 0 ? "#f1f5f9" : "#f8fafc"} />
          <text x="448" y={72 + i * 24} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155">{src}</text>
          <text x="578" y={72 + i * 24} fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">{dst}</text>
          <text x="700" y={72 + i * 24} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b">{tool}</text>
        </g>
      ))}

      <text x="620" y="160" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9ca3af" textAnchor="middle">Note: Native cross-cloud DB replication does not exist. CDC (Change Data Capture) tools bridge the gap.</text>

      {/* Backup strategy */}
      <rect x="10" y="176" width="380" height="110" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="200" y="194" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">CROSS-CLOUD BACKUP STRATEGY</text>
      {[
        ["Primary backup", "AWS S3 (source cloud)", "#f97316"],
        ["Secondary backup", "Azure Blob (WORM locked)", "#2563EB"],
        ["Tertiary / archive", "GCS Coldline (90-day min)", "#34A853"],
        ["Air-gapped", "Cloud Object Lock — all providers", "#6b21a8"],
      ].map(([tier, detail, color], i) => (
        <g key={tier}>
          <rect x="20" y={202 + i * 22} width="360" height="18" rx="3" fill="white" stroke={color} strokeWidth="1" />
          <rect x="20" y={202 + i * 22} width="6" height="18" rx="2" fill={color} />
          <text x="34" y={215 + i * 22} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={color}>{tier}:</text>
          <text x="110" y={215 + i * 22} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{detail}</text>
        </g>
      ))}
      <text x="200" y="292" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b21a8" textAnchor="middle">SureBackup / automated restore test quarterly. 3-2-1-1 rule cross-cloud.</text>

      {/* Data gravity */}
      <rect x="430" y="176" width="380" height="110" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="620" y="194" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">DATA GRAVITY — PLACEMENT DECISIONS</text>
      {[
        ["Dataset size", "Decision"],
        ["< 1TB", "Online transfer OK. Choose closest cloud."],
        ["1-100TB", "Seed with Snowball/Data Box, then CDC."],
        ["> 100TB", "Data stays put. Compute moves to data."],
        ["Active DB", "Primary cloud = where DB is. Burst compute only."],
      ].map(([size, decision], i) => (
        <g key={i}>
          <rect x="440" y={202 + i * 20} width="360" height="17" rx="3" fill={i === 0 ? "#fed7aa" : i % 2 === 0 ? "#ffedd5" : "#fff7ed"} />
          <text x="448" y={214 + i * 20} fontFamily="Arial,sans-serif" fontSize={i === 0 ? 8 : 7.5} fontWeight={i === 0 ? "700" : "400"} fill={i === 0 ? "#9a3412" : "#c2410c"}>{size}</text>
          <text x="520" y={214 + i * 20} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">{decision}</text>
        </g>
      ))}
      <text x="620" y="292" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Egress cost: $0.08/GB. 100TB = $8,000 one-way. Architecture must minimize cross-cloud data movement.</text>
    </svg>
  );
}
