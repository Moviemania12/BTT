"use client";
export default function TraditionalVsAiDiagram() {
  const rows = [
    ["Primary Compute",   "CPU (8-128 cores)",        "GPU (10,000-16,896 cores)"],
    ["Power per Rack",    "5–15 kW",                  "40–100+ kW"],
    ["Networking",        "10–25 GbE",                "400 GbE / NDR InfiniBand"],
    ["Storage Throughput","GB/s range",               "TB/s range (parallel FS)"],
    ["Cooling",           "Air cooling (CRAC/CRAH)",  "Liquid cooling (DLC/Immersion)"],
    ["GPU Utilisation",   "15–25% server util.",      "80–95%+ GPU util. target"],
    ["Workload Type",     "Diverse (DB, web, ERP)",   "Single: matrix math at scale"],
    ["Failure Model",     "N+1 hardware redundancy",  "Checkpointing + hardware HA"],
    ["Networking Protocol","Ethernet (TCP/IP)",       "RDMA (InfiniBand / RoCE)"],
    ["Cost Profile",      "Balanced across infra",    "GPU dominates (60–70%)"],
    ["Job Duration",      "Minutes to hours",         "Days to weeks (training)"],
    ["Scale Unit",        "Single server / VM",       "Thousands of GPUs as one system"],
  ];
  return (
    <svg viewBox="0 0 820 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tvsa-title">
      <title id="tvsa-title">Traditional IT vs AI Infrastructure — Key Differences</title>
      <rect width="820" height="430" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">TRADITIONAL IT vs AI INFRASTRUCTURE</text>

      {/* Header */}
      <rect x="20" y="34" width="250" height="30" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="145" y="53" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#475569" textAnchor="middle">Dimension</text>
      <rect x="275" y="34" width="250" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="53" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0369a1" textAnchor="middle">Traditional IT DC</text>
      <rect x="530" y="34" width="270" height="30" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="665" y="53" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AI Infrastructure DC</text>

      {rows.map(([dim, trad, ai], i) => {
        const y = 64 + i * 30;
        const bg = i % 2 === 0 ? "#f8fafc" : "#ffffff";
        return (
          <g key={i}>
            <rect x="20" y={y} width="250" height="30" fill={bg} stroke="#e2e8f0" strokeWidth="0.5" />
            <text x="145" y={y + 19} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#374151" textAnchor="middle">{dim}</text>
            <rect x="275" y={y} width="250" height="30" fill={i % 2 === 0 ? "#f0f9ff" : "#ffffff"} stroke="#bae6fd" strokeWidth="0.5" />
            <text x="400" y={y + 19} fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1" textAnchor="middle">{trad}</text>
            <rect x="530" y={y} width="270" height="30" fill={i % 2 === 0 ? "#eff6ff" : "#fff"} stroke="#bfdbfe" strokeWidth="0.5" />
            <text x="665" y={y + 19} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#1e40af" textAnchor="middle">{ai}</text>
          </g>
        );
      })}

      <text x="410" y="418" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Every dimension is different. AI infrastructure is not an upgrade — it is a different engineering discipline.</text>
    </svg>
  );
}
