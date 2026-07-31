"use client";
export default function AzureStorageDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="as-title">
      <title id="as-title">Azure Storage Services: Blob, File, Queue, Table, Managed Disks</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE STORAGE SERVICES — TYPES AND USE CASES</text>

      {/* Storage Account wrapper */}
      <rect x="20" y="36" width="780" height="176" rx="8" fill="#eff6ff" stroke="#0078D4" strokeWidth="2" strokeDasharray="6,3" />
      <text x="32" y="54" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0078D4">AZURE STORAGE ACCOUNT (container for Blob, File, Queue, Table)</text>
      <text x="32" y="67" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8">Redundancy: LRS (3 copies same DC) → ZRS (3 AZs) → GRS (+ paired region) → GZRS (ZRS + GRS)</text>

      {[
        { x: 36, title: "BLOB STORAGE", color: "#0078D4", bg: "#dbeafe", sub: "Object / unstructured data", items: ["Block Blob: files, images, videos", "Append Blob: log streaming", "Page Blob: VHD disk images", "Tiers: Hot / Cool / Cold / Archive"] },
        { x: 232, title: "AZURE FILES", color: "#16a34a", bg: "#dcfce7", sub: "Managed NFS/SMB shares", items: ["SMB 3.0 / NFS 4.1", "Mount on Windows/Linux/macOS", "AD authentication support", "Azure File Sync (on-prem cache)"] },
        { x: 428, title: "QUEUE STORAGE", color: "#f97316", bg: "#ffedd5", sub: "Message queue (async)", items: ["Up to 64KB per message", "7-day retention (max)", "Decouple app components", "64TB per queue max"] },
        { x: 624, title: "TABLE STORAGE", color: "#7c3aed", bg: "#f3e8ff", sub: "NoSQL key-value store", items: ["Schemaless entities", "Partition + Row key", "Cheaper than Cosmos DB", "Good for structured non-relational"] },
      ].map(({ x, title, color, bg, sub, items }) => (
        <g key={x}>
          <rect x={x} y={76} width={186} height={128} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={76} width={186} height={22} rx="5" fill={color} />
          <text x={x + 93} y={91} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x + 93} y={110} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={color} textAnchor="middle">{sub}</text>
          {items.map((item, i) => (
            <text key={i} x={x + 8} y={126 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">• {item}</text>
          ))}
        </g>
      ))}

      {/* Managed Disks */}
      <rect x="20" y="224" width="380" height="140" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="210" y="244" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="middle">AZURE MANAGED DISKS (Block Storage for VMs)</text>
      <text x="210" y="258" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#475569" textAnchor="middle">Microsoft manages storage accounts — you just create disk + attach to VM</text>
      <text x="210" y="272" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#475569" textAnchor="middle">Traditional DC analogy: SAN LUN managed by vendor</text>
      {[
        ["Ultra Disk", "Up to 160K IOPS, sub-ms", "Mission-critical DB"],
        ["Premium SSD v2", "High IOPS, configurable", "Prod databases"],
        ["Premium SSD", "Reliable, predictable", "Most prod workloads"],
        ["Standard SSD", "Cost-effective SSD", "Dev/test, light prod"],
        ["Standard HDD", "Lowest cost", "Backup, archive, infrequent"],
      ].map(([type, perf, use], i) => (
        <g key={type}>
          <rect x={30} y={282 + i * 15} width={360} height={13} rx="2" fill={i % 2 === 0 ? "#e2e8f0" : "#f8fafc"} />
          <text x={38} y={293 + i * 15} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#334155">{type}</text>
          <text x={155} y={293 + i * 15} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569">{perf}</text>
          <text x={290} y={293 + i * 15} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569">{use}</text>
        </g>
      ))}

      {/* Data Lake / other */}
      <rect x="420" y="224" width="380" height="140" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="610" y="244" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">SPECIALIZED STORAGE</text>
      {[
        { title: "Azure Data Lake Storage Gen2", desc: "Blob + hierarchical namespace. Big data analytics, Spark, Databricks." },
        { title: "Azure NetApp Files", desc: "Managed NetApp ONTAP. NFS/SMB. HPC, SAP, low-latency enterprise." },
        { title: "Azure Backup", desc: "Backup Vault. VM, disk, SQL, file share, on-prem backup. Policy-driven." },
        { title: "Azure File Sync", desc: "Cache Azure Files on-prem Windows Server. Cloud tiering saves space." },
      ].map(({ title, desc }, i) => (
        <g key={title}>
          <text x={434} y={266 + i * 34} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412">{title}</text>
          <text x={434} y={280 + i * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c2410c">{desc}</text>
          {i < 3 && <line x1={434} y1={292 + i * 34} x2={790} y2={292 + i * 34} stroke="#fdba74" strokeWidth="0.5" />}
        </g>
      ))}
    </svg>
  );
}
