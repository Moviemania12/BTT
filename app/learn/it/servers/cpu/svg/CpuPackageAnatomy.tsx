"use client";
export default function CpuPackageAnatomy() {
  const f = "Arial,sans-serif";
  const core = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="34" height="30" rx="3" fill="#dbeafe" stroke="#2563eb" />
      <text x={x + 17} y={y + 19} textAnchor="middle" fontFamily={f} fontSize="8" fontWeight="700" fill="#1e40af">Core</text>
    </g>
  );
  const mono: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) mono.push([60 + c * 46, 120 + r * 42]);
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inside a server CPU package: monolithic die with cores, L3, memory controller and PCIe versus a chiplet design with core complex dies and a separate IO die" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Inside a CPU Package — Monolithic vs Chiplet Design</text>

      <rect x="30" y="46" width="380" height="330" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="220" y="68" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#111827">A) Monolithic (one large die)</text>
      <rect x="46" y="80" width="348" height="150" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="60" y="97" fontFamily={f} fontSize="9" fontWeight="700" fill="#1e40af">Cores + L1/L2 (private to each core)</text>
      {mono.map(([x, y], i) => core(x, y + 0, "m" + i))}
      <rect x="250" y="112" width="130" height="118" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="315" y="150" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#78350f">Shared L3</text>
      <text x="315" y="166" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">Cache shared by all cores</text>
      <rect x="46" y="244" width="110" height="46" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="101" y="264" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#c2410c">Memory</text>
      <text x="101" y="278" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#c2410c">Controller</text>
      <rect x="165" y="244" width="110" height="46" rx="4" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="220" y="264" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">PCIe Root</text>
      <text x="220" y="278" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Complex</text>
      <rect x="284" y="244" width="110" height="46" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="339" y="264" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#991b1b">Socket</text>
      <text x="339" y="278" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#991b1b">Interconnect</text>
      <text x="220" y="316" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Everything on one silicon die — low core-to-core latency,</text>
      <text x="220" y="330" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">but a big die means lower yield and higher cost.</text>
      <text x="220" y="352" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Example approach: many traditional Intel Xeon generations</text>

      <rect x="450" y="46" width="380" height="330" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="640" y="68" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#111827">B) Chiplet (small dies + I/O die)</text>
      {[0, 1, 2, 3].map((i) => {
        const x = 466 + (i % 2) * 176;
        const y = 82 + Math.floor(i / 2) * 78;
        return (
          <g key={i}>
            <rect x={x} y={y} width="160" height="68" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
            <text x={x + 80} y={y + 16} textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#1e40af">Core Complex Die {i + 1}</text>
            {[0, 1, 2, 3].map((k) => <rect key={k} x={x + 10 + k * 26} y={y + 26} width="22" height="16" rx="2" fill="#dbeafe" stroke="#2563eb" />)}
            <rect x={x + 10} y={y + 46} width="140" height="14" rx="2" fill="#fef3c7" stroke="#f59e0b" />
            <text x={x + 80} y={y + 56} textAnchor="middle" fontFamily={f} fontSize="8" fill="#78350f">L3 slice</text>
          </g>
        );
      })}
      <rect x="466" y="246" width="336" height="52" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="634" y="266" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#c2410c">I/O Die</text>
      <text x="634" y="282" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Memory controllers · PCIe/CXL · Socket interconnect</text>
      <line x1="546" y1="150" x2="546" y2="246" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="722" y1="150" x2="722" y2="246" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
      <text x="634" y="316" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Small dies = better yield, more cores per package.</text>
      <text x="634" y="330" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Die-to-die hops can add some latency.</text>
      <text x="634" y="352" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Example approach: AMD EPYC (CCD + IOD) and newer multi-tile Xeon</text>

      <text x="430" y="402" textAnchor="middle" fontFamily={f} fontSize="9" fill="#94a3b8">Conceptual drawing — actual die count, cache size aur layout differs by generation/SKU.</text>
    </svg>
  );
}
