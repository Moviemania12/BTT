"use client";
export default function GpuChipAnatomy() {
  const f = "Arial,sans-serif";
  const sm = (x: number, y: number, k: string) => <rect key={k} x={x} y={y} width="28" height="24" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />;
  const hbm = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="54" height="62" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1.8" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={x + 6} y={y + 6 + i * 13} width="42" height="9" rx="2" fill="#fdba74" />)}
    </g>
  );
  const gpc = (x: number, y: number, n: number) => (
    <g key={n}>
      <rect x={x} y={y} width="150" height="92" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" />
      <text x={x + 75} y={y + 14} textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#1e40af">GPC {n}</text>
      {[0, 1].map((r) => [0, 1, 2].map((c) => sm(x + 10 + c * 46, y + 24 + r * 32, `${n}-${r}-${c}`)))}
    </g>
  );
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data center GPU package: GPCs containing streaming multiprocessors, shared L2 cache, memory controllers with HBM stacks on both sides, NVLink and PCIe interfaces, and a zoom of one streaming multiprocessor" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="440" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Inside a Data Center GPU — Package, GPCs, SMs, L2 and HBM</text>
      <rect x="20" y="44" width="560" height="340" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="300" y="62" textAnchor="middle" fontFamily={f} fontSize="10" fill="#6b7280">GPU package (substrate / interposer)</text>
      {hbm(32, 90, "h1")}{hbm(32, 164, "h2")}{hbm(32, 238, "h3")}
      {hbm(514, 90, "h4")}{hbm(514, 164, "h5")}{hbm(514, 238, "h6")}
      <text x="59" y="312" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#c2410c">HBM</text>
      <text x="541" y="312" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#c2410c">HBM</text>
      <rect x="100" y="76" width="400" height="248" rx="8" fill="#ffffff" stroke="#374151" strokeWidth="2" />
      <text x="300" y="92" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">GPU die</text>
      {gpc(112, 100, 0)}{gpc(338, 100, 1)}
      <rect x="112" y="200" width="376" height="26" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8" />
      <text x="300" y="217" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Shared L2 cache</text>
      {gpc(112, 232, 2)}{gpc(338, 232, 3)}
      <rect x="268" y="108" width="64" height="84" rx="4" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="146" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#5b21b6">Giga-</text>
      <text x="300" y="158" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#5b21b6">Thread</text>
      <text x="300" y="170" textAnchor="middle" fontFamily={f} fontSize="8" fill="#5b21b6">scheduler</text>
      <rect x="100" y="334" width="190" height="42" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.8" />
      <text x="195" y="352" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#991b1b">NVLink ports</text>
      <text x="195" y="367" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">GPU-to-GPU / NVSwitch</text>
      <rect x="310" y="334" width="190" height="42" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
      <text x="405" y="352" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#166534">PCIe interface</text>
      <text x="405" y="367" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">to CPU / NIC / NVMe</text>

      <rect x="600" y="44" width="240" height="340" rx="10" fill="#f8fafc" stroke="#2563eb" strokeWidth="2" />
      <text x="720" y="64" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">Zoom: one SM</text>
      <text x="720" y="78" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">(Streaming Multiprocessor / Compute Unit)</text>
      <rect x="616" y="90" width="208" height="46" rx="5" fill="#fef3c7" stroke="#f59e0b" />
      <text x="720" y="108" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#78350f">Warp schedulers</text>
      <text x="720" y="124" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#78350f">pick which 32-thread group runs</text>
      <rect x="616" y="144" width="100" height="70" rx="5" fill="#dbeafe" stroke="#2563eb" />
      <text x="666" y="170" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">CUDA cores</text>
      <text x="666" y="186" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">FP32 / INT32</text>
      <text x="666" y="199" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">general maths</text>
      <rect x="724" y="144" width="100" height="70" rx="5" fill="#ede9fe" stroke="#7c3aed" />
      <text x="774" y="170" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Tensor cores</text>
      <text x="774" y="186" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">matrix multiply</text>
      <text x="774" y="199" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">FP16/BF16/FP8</text>
      <rect x="616" y="222" width="208" height="40" rx="5" fill="#f0fdf4" stroke="#16a34a" />
      <text x="720" y="239" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#166534">Register file</text>
      <text x="720" y="253" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">huge, per-thread, fastest storage</text>
      <rect x="616" y="270" width="208" height="40" rx="5" fill="#ecfeff" stroke="#0891b2" />
      <text x="720" y="287" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#155e75">Shared memory / L1</text>
      <text x="720" y="301" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">on-chip, shared by the SM's threads</text>
      <text x="720" y="336" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Many SMs (≈100+) × many units each</text>
      <text x="720" y="350" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">= thousands of parallel lanes</text>
      <text x="430" y="410" textAnchor="middle" fontFamily={f} fontSize="9" fill="#94a3b8">Conceptual layout. SM/GPC counts, cache sizes and HBM stack count differ by vendor, model and generation (AMD uses Compute Units and Matrix Cores).</text>
      <text x="430" y="426" textAnchor="middle" fontFamily={f} fontSize="9" fill="#94a3b8">Some newer GPUs are multi-die packages; the logical blocks stay the same.</text>
    </svg>
  );
}
