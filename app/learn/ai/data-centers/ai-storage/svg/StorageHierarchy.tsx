"use client";
export default function StorageHierarchy() {
  const layers = [
    { label: "GPU HBM (High Bandwidth Memory)", sub: "80–192 GB per GPU · 3–8 TB/s bandwidth · Not persistent", color: "#7c3aed", w: 220 },
    { label: "System RAM (CPU Memory)", sub: "256 GB – 2 TB per server · ~300–500 GB/s · Volatile", color: "#2563eb", w: 300 },
    { label: "Local NVMe SSD", sub: "1–30 TB per server · 5–14 GB/s · Persistent · Cache layer", color: "#0891b2", w: 390 },
    { label: "Shared NVMe / NVMe-oF", sub: "Disaggregated NVMe over network fabric · Lower latency than HDD/object", color: "#16a34a", w: 480 },
    { label: "Parallel File System (Lustre, GPFS)", sub: "Hundreds of TB – PB · Aggregate GB/s · POSIX · Hot training data", color: "#ca8a04", w: 570 },
    { label: "Object Storage (S3, GCS, MinIO)", sub: "Effectively unlimited · HTTP API · Dataset archive, model storage", color: "#dc2626", w: 660 },
    { label: "Archival / Tape Storage", sub: "Petabytes+ · Very low cost · Very high latency · Cold archive", color: "#64748b", w: 750 },
  ];

  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sh-title">
      <title id="sh-title">AI Storage Hierarchy: Seven layers from GPU HBM at the top (fastest, smallest, most expensive) down to Archival/Tape at the bottom (slowest, largest, cheapest). GPU HBM: 80-192GB, 3-8 TB/s. System RAM: 256GB-2TB, ~500 GB/s. Local NVMe: 1-30TB, 5-14 GB/s. Shared NVMe/NVMe-oF: disaggregated network-attached NVMe. Parallel File System (Lustre/GPFS): hundreds of TB to PB, aggregate GB/s. Object Storage: effectively unlimited, HTTP API. Archival/Tape: petabytes, very low cost, high latency.</title>
      <rect width="820" height="420" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">AI STORAGE HIERARCHY</text>
      <text x="410" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Top = Fastest, Smallest, Most Expensive per GB · Bottom = Slowest, Largest, Cheapest per GB</text>

      {/* Left axis labels */}
      <text x="10" y="80" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" fontWeight="700">FAST</text>
      <text x="10" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" fontWeight="700">SLOW</text>
      <line x1="22" y1="85" x2="22" y2="380" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="6" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle" transform="rotate(-90,6,235)">SPEED</text>

      {/* Right axis */}
      <text x="810" y="80" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" fontWeight="700" textAnchor="end">SMALL</text>
      <text x="810" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" fontWeight="700" textAnchor="end">LARGE</text>
      <line x1="798" y1="85" x2="798" y2="380" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="814" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle" transform="rotate(90,814,235)">CAPACITY</text>

      {layers.map((l, i) => {
        const y = 50 + i * 50;
        const x = (820 - l.w) / 2;
        return (
          <g key={l.label}>
            <rect x={x} y={y} width={l.w} height={38} rx="5" fill={l.color} />
            <text x={410} y={y + 14} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">{l.label}</text>
            <text x={410} y={y + 28} fontFamily="Arial,sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.88)" textAnchor="middle">{l.sub}</text>
          </g>
        );
      })}

      <text x="410" y="408" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Actual capacities and bandwidths vary by deployment and hardware generation. Values shown are illustrative ranges.</text>
    </svg>
  );
}
