"use client";
export default function GcpStorageDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gst-title">
      <title id="gst-title">GCP Storage Services: Cloud Storage, Persistent Disk, Filestore, Cloud SQL, Spanner</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP STORAGE SERVICES — TYPES AND USE CASES</text>

      {[
        {
          x: 20, title: "CLOUD STORAGE", color: "#4285F4", bg: "#dbeafe",
          sub: "Object Storage (GCS)", items: [
            "Bucket → Object (key-value at scale)",
            "Globally accessible, not AZ-bound",
            "Classes: Standard, Nearline, Coldline, Archive",
            "Lifecycle policies: auto-tier down by age/access",
            "Versioning, Object Lock (WORM), CMEK",
            "AWS S3 equivalent",
          ],
        },
        {
          x: 218, title: "PERSISTENT DISK", color: "#34A853", bg: "#dcfce7",
          sub: "Block Storage for VMs", items: [
            "Network-attached block storage (like SAN/iSCSI)",
            "Types: Standard HDD, Balanced, SSD, Extreme",
            "Hyperdisk: higher IOPS, configurable throughput",
            "Zonal (default) or Regional (2-zone replication)",
            "Snapshots: incremental, cross-region copy possible",
            "AWS EBS equivalent",
          ],
        },
        {
          x: 416, title: "FILESTORE", color: "#FBBC04", bg: "#fef9c3",
          sub: "Managed NFS File Storage", items: [
            "Fully managed NFS v3/v4.1",
            "Multiple VMs mount simultaneously",
            "Tiers: Basic HDD/SSD, Enterprise, High Scale",
            "Zonal (basic) or Regional (Enterprise)",
            "Traditional NAS / AWS EFS equivalent",
            "Good for media, ML training data, dev/test",
          ],
        },
        {
          x: 614, title: "LOCAL SSD", color: "#EA4335", bg: "#fee2e2",
          sub: "Ephemeral Local NVMe", items: [
            "Physical NVMe directly on host — ultra-fast",
            "LOST when VM stops/terminates — ephemeral",
            "375 GB per SSD, up to 24 per VM",
            "AWS Instance Store / Azure Temp Disk equivalent",
            "Use for: temp cache, Spanner snapshots, Spark",
            "NOT for persistent data — use Persistent Disk",
          ],
        },
      ].map(({ x, title, color, bg, sub, items }) => (
        <g key={x}>
          <rect x={x} y={36} width={192} height={196} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={36} width={192} height={22} rx="5" fill={color} />
          <text x={x + 96} y={51} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x + 96} y={70} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={color} textAnchor="middle">{sub}</text>
          {items.map((item, i) => (
            <text key={i} x={x + 8} y={86 + i * 22} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">• {item}</text>
          ))}
        </g>
      ))}

      {/* Databases row */}
      <text x="410" y="250" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#374151" textAnchor="middle">DATABASE SERVICES</text>

      {[
        { x: 20, title: "Cloud SQL", color: "#4285F4", bg: "#eff6ff", items: ["Managed MySQL/PostgreSQL/SQL Server", "Regional HA with standby, read replicas", "AWS RDS equivalent"] },
        { x: 220, title: "Cloud Spanner", color: "#34A853", bg: "#f0fdf4", items: ["Globally distributed SQL — unique GCP", "Horizontal scale + ACID transactions", "No AWS equivalent — pays for consistency"] },
        { x: 420, title: "Bigtable", color: "#FBBC04", bg: "#fefce8", items: ["Managed wide-column NoSQL (HBase API)", "High throughput, low latency", "AWS DynamoDB / Apache HBase equiv"] },
        { x: 620, title: "Firestore / AlloyDB", color: "#EA4335", bg: "#fef2f2", items: ["Firestore: document NoSQL (AWS DynamoDB)", "AlloyDB: PostgreSQL-compatible, columnar", "AlloyDB ≠ Cloud SQL — columnar engine"] },
      ].map(({ x, title, color, bg, items }) => (
        <g key={x}>
          <rect x={x} y={258} width={190} height={90} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={258} width={190} height={20} rx="5" fill={color} />
          <text x={x + 95} y={272} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          {items.map((item, i) => (
            <text key={i} x={x + 8} y={292 + i * 16} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">• {item}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
