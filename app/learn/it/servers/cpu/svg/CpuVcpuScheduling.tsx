"use client";
export default function CpuVcpuScheduling() {
  const f = "Arial,sans-serif";
  const vms = [
    { n: "VM-A  4 vCPU", y: 66, c: "#dbeafe", b: "#2563eb" },
    { n: "VM-B  8 vCPU", y: 112, c: "#dcfce7", b: "#16a34a" },
    { n: "VM-C  4 vCPU", y: 158, c: "#fef3c7", b: "#f59e0b" },
    { n: "VM-D  8 vCPU", y: 204, c: "#f5f3ff", b: "#7c3aed" },
    { n: "VM-E  8 vCPU", y: 250, c: "#fee2e2", b: "#dc2626" },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hypervisor scheduler mapping 32 vCPUs from five virtual machines onto 16 physical cores, showing a 2 to 1 overcommit and a ready queue" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="vsA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">vCPU Scheduling — 32 vCPU, 16 Physical Cores (2:1 Overcommit)</text>
      {vms.map((v, i) => (
        <g key={i}>
          <rect x="30" y={v.y} width="170" height="34" rx="6" fill={v.c} stroke={v.b} strokeWidth="2" />
          <text x="115" y={v.y + 21} textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">{v.n}</text>
          <line x1="202" y1={v.y + 17} x2="330" y2="180" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#vsA)" />
        </g>
      ))}
      <rect x="330" y="60" width="200" height="240" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="430" y="84" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#1e40af">Hypervisor Scheduler</text>
      <text x="430" y="102" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Every few ms it decides:</text>
      <text x="430" y="116" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">which vCPU runs on which core</text>
      <rect x="350" y="132" width="160" height="60" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="430" y="152" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#c2410c">READY QUEUE</text>
      <text x="430" y="168" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">vCPU is ready but no core</text>
      <text x="430" y="181" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">is free → waits (%RDY)</text>
      <text x="430" y="216" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">NUMA-aware placement:</text>
      <text x="430" y="230" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">tries to keep a VM inside one socket</text>
      <line x1="532" y1="180" x2="590" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#vsA)" />
      <rect x="590" y="60" width="240" height="240" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="710" y="82" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#111827">Physical Cores (16)</text>
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 606 + (i % 4) * 54, y = 96 + Math.floor(i / 4) * 48;
        return <g key={i}><rect x={x} y={y} width="44" height="38" rx="4" fill={i < 8 ? "#dbeafe" : "#fef3c7"} stroke={i < 8 ? "#2563eb" : "#f59e0b"} /><text x={x + 22} y={y + 23} textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#111827">C{i}</text></g>;
      })}
      <text x="650" y="296" textAnchor="middle" fontFamily={f} fontSize="9" fill="#1e40af">Socket 0</text>
      <text x="770" y="296" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">(blue = socket 0, amber = socket 1 conceptually)</text>
      <rect x="30" y="316" width="800" height="62" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="337" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">32 vCPU ÷ 16 cores = 2:1 overcommit — works while VMs are not all busy together.</text>
      <text x="430" y="355" textAnchor="middle" fontFamily={f} fontSize="10" fill="#78350f">If all VMs get busy together the ready queue grows → %RDY rises → VMs slow down even if CPU looks low inside the VM.</text>
      <text x="430" y="370" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">A safe overcommit ratio depends on the workload — measure before deciding in production.</text>
    </svg>
  );
}
