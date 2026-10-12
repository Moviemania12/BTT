"use client";
export default function GpuRailNetwork() {
  const f = "Arial,sans-serif";
  const rails = [
    { c: "#2563eb", n: "Rail 0" }, { c: "#16a34a", n: "Rail 1" }, { c: "#f97316", n: "Rail 2" }, { c: "#7c3aed", n: "Rail 3" },
  ];
  const servers = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 860 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rail-optimised GPU cluster network: four servers each with four GPU NICs, each NIC index connecting to its own leaf switch (rail), and leaf switches connected to spine switches" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="460" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">GPU Cluster Fabric — Rail-Optimised Leaf-Spine (simplified: 4 servers × 4 rails)</text>
      {[0, 1].map((s) => (
        <g key={s}>
          <rect x={250 + s * 220} y="44" width="170" height="36" rx="6" fill="#f8fafc" stroke="#222" strokeWidth="2" />
          <text x={335 + s * 220} y="67" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">Spine {s}</text>
        </g>
      ))}
      {rails.map((r, i) => {
        const lx = 70 + i * 190;
        return (
          <g key={i}>
            <rect x={lx} y="150" width="140" height="40" rx="6" fill="#fff" stroke={r.c} strokeWidth="2.5" />
            <text x={lx + 70} y="168" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill={r.c}>Leaf — {r.n}</text>
            <text x={lx + 70} y="182" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">all GPU-{i} NICs land here</text>
            {[0, 1].map((s) => <line key={s} x1={lx + 70} y1="150" x2={335 + s * 220} y2="80" stroke="#94a3b8" strokeWidth="1.3" />)}
          </g>
        );
      })}
      {servers.map((s) => {
        const sx = 40 + s * 200;
        return (
          <g key={s}>
            <rect x={sx} y="300" width="170" height="90" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="2" />
            <text x={sx + 85} y="318" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">GPU Server {s}</text>
            {rails.map((r, i) => (
              <g key={i}>
                <rect x={sx + 10 + i * 38} y="330" width="32" height="26" rx="3" fill="#dbeafe" stroke={r.c} strokeWidth="2" />
                <text x={sx + 26 + i * 38} y="347" textAnchor="middle" fontFamily={f} fontSize="8.5" fontWeight="700" fill="#111827">G{i}</text>
                <rect x={sx + 10 + i * 38} y="360" width="32" height="16" rx="3" fill={r.c} />
                <text x={sx + 26 + i * 38} y="372" textAnchor="middle" fontFamily={f} fontSize="8" fontWeight="700" fill="#fff">NIC</text>
                <line x1={sx + 26 + i * 38} y1="360" x2={70 + i * 190 + 70 - 30 + s * 20} y2="190" stroke={r.c} strokeWidth="1.5" />
              </g>
            ))}
          </g>
        );
      })}
      <rect x="30" y="404" width="800" height="46" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="422" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#78350f">Same-index GPUs across servers share one leaf → 1 switch hop for that traffic. Different rails use NVLink inside the server first.</text>
      <text x="430" y="439" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Real clusters: 8 rails per server, 400G/800G links, InfiniBand or RoCE Ethernet, often 3-tier. Design depends on vendor reference architecture.</text>
    </svg>
  );
}
