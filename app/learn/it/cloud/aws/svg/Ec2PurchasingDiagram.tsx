"use client";
export default function Ec2PurchasingDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ep-title">
      <title id="ep-title">EC2 Instance Families and Purchasing Options</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">EC2 INSTANCE FAMILIES AND PURCHASING OPTIONS</text>

      {/* Instance families */}
      <text x="20" y="44" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#374151">INSTANCE FAMILIES (choose by workload):</text>

      {[
        { x: 20,  label: "General Purpose",      family: "t3/t4g, m6i/m7g",  desc: "Balanced CPU/mem — web servers, small DB, dev", color: "#2563EB", bg: "#eff6ff", border: "#93c5fd" },
        { x: 175, label: "Compute Optimized",    family: "c6i/c7g",          desc: "High CPU — batch, HPC, gaming, ML inference", color: "#16a34a", bg: "#f0fdf4", border: "#6ee7b7" },
        { x: 330, label: "Memory Optimized",     family: "r6i, x2idn",       desc: "High RAM — in-memory DB, real-time analytics", color: "#7c3aed", bg: "#faf5ff", border: "#c084fc" },
        { x: 485, label: "Storage Optimized",    family: "i4i, d3en",        desc: "High I/O — NoSQL, data warehousing, Hadoop", color: "#f97316", bg: "#fff7ed", border: "#fdba74" },
        { x: 640, label: "Accel. Computing",     family: "p4, g5, inf2",     desc: "GPU/FPGA — ML training, video, HPC", color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
      ].map(({ x, label, family, desc, color, bg, border }) => (
        <g key={x}>
          <rect x={x} y={52} width={140} height={96} rx="6" fill={bg} stroke={border} strokeWidth="1.5" />
          <rect x={x} y={52} width={140} height={24} rx="5" fill={color} />
          <text x={x+70} y={68} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          <text x={x+70} y={88} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={color} textAnchor="middle">{family}</text>
          <text x={x+70} y={104} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{desc.split(" — ")[0]}</text>
          <text x={x+70} y={118} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{desc.split(" — ")[1]}</text>
          <text x={x+70} y={140} fontFamily="Arial,sans-serif" fontSize="7" fill="#6b7280" textAnchor="middle">{desc.split(" — ")[2] ?? ""}</text>
        </g>
      ))}

      {/* Purchasing options */}
      <text x="20" y="168" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#374151">PURCHASING OPTIONS (choose by commitment/availability need):</text>

      {[
        { x: 20,  title: "On-Demand",          sub: "Pay by second/hour",          points: ["No commitment", "Full price", "Dev, unpredictable"], color: "#0891b2", bg: "#ecfeff" },
        { x: 190, title: "Reserved (RI)",       sub: "1yr or 3yr commitment",       points: ["Up to 72% discount", "Standard/Convertible", "Steady-state production"], color: "#2563EB", bg: "#eff6ff" },
        { x: 360, title: "Savings Plans",       sub: "Flexible commitment ($/hr)",  points: ["Compute or EC2 SP", "Applies across families", "More flexible than RI"], color: "#16a34a", bg: "#f0fdf4" },
        { x: 530, title: "Spot Instances",      sub: "AWS spare capacity",          points: ["Up to 90% discount", "Can be interrupted", "Fault-tolerant workloads"], color: "#dc2626", bg: "#fef2f2" },
        { x: 680, title: "Dedicated Host",      sub: "Physical server dedicated",   points: ["License compliance", "Regulatory isolation", "Highest cost option"], color: "#7c3aed", bg: "#faf5ff" },
      ].map(({ x, title, sub, points, color, bg }) => (
        <g key={x}>
          <rect x={x} y={176} width={135} height={120} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={176} width={135} height={26} rx="5" fill={color} />
          <text x={x+67} y={191} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x+67} y={203} fontFamily="Arial,sans-serif" fontSize="7" fill="#ffffff" textAnchor="middle">{sub}</text>
          {points.map((pt, i) => (
            <text key={i} x={x+10} y={222 + i*18} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">• {pt}</text>
          ))}
        </g>
      ))}

      {/* Additional EC2 features */}
      <rect x="20" y="312" width="780" height="36" rx="6" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="30" y="326" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#92400e">Also important:</text>
      <text x="115" y="326" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">Placement Groups: Cluster (low latency, same rack) | Spread (max AZ isolation) | Partition (large distributed)</text>
      <text x="30" y="341" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">IMDSv2: Instance Metadata Service v2 — token-based access required; prevents SSRF attacks against metadata endpoint.</text>
    </svg>
  );
}
