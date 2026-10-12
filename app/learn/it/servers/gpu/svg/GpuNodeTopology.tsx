"use client";
export default function GpuNodeTopology() {
  const f = "Arial,sans-serif";
  const groups = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topology of an 8-GPU server: two CPUs, four PCIe switches each connecting two GPUs and two NICs, and an NVSwitch fabric linking all eight GPUs" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="440" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">8-GPU Server Topology — PCIe Tree + NVLink/NVSwitch Fabric</text>
      <rect x="150" y="44" width="200" height="34" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="250" y="66" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">CPU 0 (NUMA node 0)</text>
      <rect x="510" y="44" width="200" height="34" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="610" y="66" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">CPU 1 (NUMA node 1)</text>
      <line x1="350" y1="61" x2="510" y2="61" stroke="#64748b" strokeWidth="2.5" strokeDasharray="5 3" />
      <text x="430" y="55" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#6b7280">CPU-CPU link</text>
      {groups.map((g) => {
        const x0 = 30 + g * 205;
        const cpuX = g < 2 ? 250 : 610;
        return (
          <g key={g}>
            <line x1={cpuX} y1="78" x2={x0 + 100} y2="116" stroke="#2563eb" strokeWidth="1.8" />
            <rect x={x0 + 55} y="116" width="90" height="30" rx="5" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.8" />
            <text x={x0 + 100} y="135" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">PCIe switch</text>
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={x0 + k * 105} y="116" width="42" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.6" />
                <text x={x0 + k * 105 + 21} y="135" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#166534">NIC</text>
                <line x1={k === 0 ? x0 + 42 : x0 + 105} y1="131" x2={k === 0 ? x0 + 55 : x0 + 145} y2="131" stroke="#16a34a" strokeWidth="1.5" />
                <line x1={x0 + 76 + k * 48} y1="146" x2={x0 + 21 + k * 105 + 21} y2="190" stroke="#7c3aed" strokeWidth="1.5" />
                <rect x={x0 + k * 105 - 4} y="190" width="50" height="46" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <text x={x0 + k * 105 + 21} y="210" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">GPU {g * 2 + k}</text>
                <text x={x0 + k * 105 + 21} y="226" textAnchor="middle" fontFamily={f} fontSize="8" fill="#374151">HBM</text>
                <line x1={x0 + k * 105 + 21} y1="236" x2={x0 + k * 105 + 21} y2="272" stroke="#dc2626" strokeWidth="2.5" />
              </g>
            ))}
          </g>
        );
      })}
      <rect x="30" y="272" width="800" height="40" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" />
      <text x="430" y="290" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#991b1b">NVSwitch fabric (NVLink) — every GPU can talk to every other GPU at full NVLink speed</text>
      <text x="430" y="305" textAnchor="middle" fontFamily={f} fontSize="9" fill="#7f1d1d">All-to-all inside the node, without going through the CPU or the PCIe tree</text>
      <rect x="30" y="328" width="800" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="44" y="348" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">Three different paths between GPUs / devices:</text>
      <text x="44" y="366" fontFamily={f} fontSize="9.5" fill="#374151"><tspan fontWeight="700" fill="#991b1b">Red (NVLink):</tspan> GPU ↔ GPU inside the node — very high bandwidth, lowest latency. Used by training collectives.</text>
      <text x="44" y="382" fontFamily={f} fontSize="9.5" fill="#374151"><tspan fontWeight="700" fill="#5b21b6">Purple (PCIe):</tspan> GPU ↔ NIC / NVMe / CPU. GPUDirect RDMA lets the NIC read GPU memory straight through the switch.</text>
      <text x="44" y="398" fontFamily={f} fontSize="9.5" fill="#374151"><tspan fontWeight="700" fill="#1e40af">Blue (CPU links):</tspan> CPU ↔ PCIe switches and CPU ↔ CPU. A GPU far from its NIC/CPU pays extra hops (check with nvidia-smi topo -m).</text>
      <text x="44" y="413" fontFamily={f} fontSize="8.5" fill="#94a3b8">Illustrative HGX-class layout. Exact PCIe switch count, NIC count and CPU attachment differ by server model and vendor.</text>
    </svg>
  );
}
