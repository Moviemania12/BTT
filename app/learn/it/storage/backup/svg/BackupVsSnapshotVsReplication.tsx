"use client";
// Diagram 1 — Backup vs Snapshot vs Replication: Protection Model Comparison
export default function BackupVsSnapshotVsReplication() {
  return (
    <svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Backup vs snapshot vs replication protection model comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="320" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Backup vs Snapshot vs Replication — Protection Model</text>

      {/* Snapshot */}
      <rect x="20" y="34" width="258" height="262" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
      <text x="149" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#c2410c">Snapshot</text>
      <rect x="40" y="64" width="218" height="20" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="149" y="78" textAnchor="middle" fontSize="9" fill="#c2410c" fontWeight="600">Production Storage</text>
      <rect x="40" y="90" width="218" height="20" rx="4" fill="#fdba74" stroke="#ea580c" strokeWidth="1" strokeDasharray="4,2"/>
      <text x="149" y="104" textAnchor="middle" fontSize="9" fill="#c2410c">Snapshot — SAME storage system</text>
      <line x1="149" y1="84" x2="149" y2="90" stroke="#ea580c" strokeWidth="1.5"/>
      <text x="149" y="126" textAnchor="middle" fontSize="8.5" fill="#991b1b" fontWeight="600">⚠ Storage fails → snapshot gone</text>
      <text x="149" y="140" textAnchor="middle" fontSize="8" fill="#9a3412">⚠ Immutability strength varies</text>
      <text x="149" y="154" textAnchor="middle" fontSize="7.5" fill="#9a3412">  by implementation/mode</text>
      <rect x="40" y="164" width="218" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="149" y="177" textAnchor="middle" fontSize="8.5" fill="#166534">✓ Fast operational recovery</text>
      <text x="149" y="190" textAnchor="middle" fontSize="8" fill="#166534">Recent changes, fast rollback</text>
      <rect x="40" y="198" width="218" height="14" rx="3" fill="#fef3c7"/>
      <text x="149" y="209" textAnchor="middle" fontSize="7.5" fill="#92400e" fontWeight="600">NOT a replacement for backup</text>
      <text x="149" y="226" textAnchor="middle" fontSize="7.5" fill="#9ca3af">Immutable/locked snapshots improve</text>
      <text x="149" y="238" textAnchor="middle" fontSize="7.5" fill="#9ca3af">protection — strength depends on</text>
      <text x="149" y="250" textAnchor="middle" fontSize="7.5" fill="#9ca3af">implementation mode and access level</text>
      <rect x="40" y="258" width="218" height="14" rx="3" fill="#fed7aa"/>
      <text x="149" y="269" textAnchor="middle" fontSize="7.5" fill="#c2410c" fontWeight="600">SAME FAILURE DOMAIN</text>

      {/* Backup */}
      <rect x="300" y="34" width="258" height="262" rx="9" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="429" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Backup</text>
      <rect x="320" y="64" width="218" height="20" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="429" y="78" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Production Storage</text>
      <text x="429" y="96" textAnchor="middle" fontSize="9" fill="#6b7280">↓ Independent copy</text>
      <rect x="320" y="102" width="218" height="20" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
      <text x="429" y="116" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="600">Backup Repository — different storage</text>
      <rect x="320" y="130" width="218" height="14" rx="3" fill="#dcfce7"/>
      <text x="429" y="141" textAnchor="middle" fontSize="8" fill="#15803d">Point-in-time copies (historical)</text>
      <rect x="320" y="150" width="218" height="14" rx="3" fill="#dcfce7"/>
      <text x="429" y="161" textAnchor="middle" fontSize="8" fill="#15803d">Different failure domain</text>
      <rect x="320" y="170" width="218" height="14" rx="3" fill="#dcfce7"/>
      <text x="429" y="181" textAnchor="middle" fontSize="8" fill="#15803d">Separate access controls</text>
      <rect x="320" y="190" width="218" height="28" rx="4" fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
      <text x="429" y="204" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">✓ Historical recovery possible</text>
      <text x="429" y="216" textAnchor="middle" fontSize="8" fill="#15803d">Survives source failure</text>
      <text x="429" y="238" textAnchor="middle" fontSize="7.5" fill="#6b7280">Offsite/immutable copy = stronger protection</text>
      <text x="429" y="252" textAnchor="middle" fontSize="7.5" fill="#6b7280">Core properties: different failure domain,</text>
      <text x="429" y="264" textAnchor="middle" fontSize="7.5" fill="#6b7280">separate access, recoverability to past state</text>
      <rect x="320" y="270" width="218" height="14" rx="3" fill="#bbf7d0"/>
      <text x="429" y="281" textAnchor="middle" fontSize="7.5" fill="#15803d" fontWeight="600">INDEPENDENT FAILURE DOMAIN</text>

      {/* Replication */}
      <rect x="580" y="34" width="258" height="262" rx="9" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="709" y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Replication</text>
      <rect x="600" y="64" width="218" height="20" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="709" y="78" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Production Storage</text>
      <text x="709" y="96" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">⇄ Near-real-time or periodic sync</text>
      <rect x="600" y="102" width="218" height="20" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1"/>
      <text x="709" y="116" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Secondary Storage / Site</text>
      <rect x="600" y="130" width="218" height="14" rx="3" fill="#fee2e2"/>
      <text x="709" y="141" textAnchor="middle" fontSize="8" fill="#991b1b">✗ Corruption replicated</text>
      <rect x="600" y="150" width="218" height="14" rx="3" fill="#fee2e2"/>
      <text x="709" y="161" textAnchor="middle" fontSize="8" fill="#991b1b">✗ Deletion replicated</text>
      <rect x="600" y="170" width="218" height="14" rx="3" fill="#fee2e2"/>
      <text x="709" y="181" textAnchor="middle" fontSize="8" fill="#991b1b">✗ Ransomware replicated</text>
      <rect x="600" y="190" width="218" height="28" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="709" y="204" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">✓ Fast failover — availability</text>
      <text x="709" y="216" textAnchor="middle" fontSize="8" fill="#15803d">Site-failure protection</text>
      <text x="709" y="238" textAnchor="middle" fontSize="7.5" fill="#6b7280">No historical restore points.</text>
      <text x="709" y="250" textAnchor="middle" fontSize="7.5" fill="#6b7280">Replication can be near-real-time</text>
      <text x="709" y="262" textAnchor="middle" fontSize="7.5" fill="#6b7280">or periodic — both share this limitation.</text>
      <rect x="600" y="270" width="218" height="14" rx="3" fill="#bfdbfe"/>
      <text x="709" y="281" textAnchor="middle" fontSize="7.5" fill="#1e40af" fontWeight="600">AVAILABILITY — NOT HISTORICAL RECOVERY</text>

      <text x="430" y="308" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: backup-vs-snapshot-vs-replication.png</text>
    </svg>
  );
}
