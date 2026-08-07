"use client";
export default function MigConfigDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mig-title">
      <title id="mig-title">MIG (Multi-Instance GPU) configurations on H100: One physical GPU can be split into up to 7 hardware-isolated slices. Example 1: Seven 1g.10gb instances (each gets 1/7 compute, 10GB memory). Example 2: Mixed — one 3g.40gb + one 2g.20gb + two 1g.10gb. Each instance has dedicated SMs, L2 cache, memory bandwidth, and HBM — complete hardware isolation.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MIG — Multi-Instance GPU — Hardware Slice an H100 Into Up to 7 Independent GPUs</text>

      {/* Full GPU view */}
      <rect x="20" y="30" width="200" height="258" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="120" y="52" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">Physical H100 GPU</text>
      <text x="120" y="66" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#818cf8" textAnchor="middle">80 GB HBM3 · 132 SMs</text>
      <rect x="30" y="76" width="180" height="200" rx="6" fill="#7c3aed" />
      <text x="120" y="176" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">ONE GPU</text>
      <text x="120" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">Single workload</text>
      <text x="120" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">utilizes full GPU</text>
      <text x="120" y="270" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">No MIG (normal mode)</text>

      {/* Arrow */}
      <text x="232" y="158" fontFamily="Arial,sans-serif" fontSize="18" fill="#7c3aed">→</text>
      <text x="232" y="172" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">MIG</text>
      <text x="232" y="184" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">split</text>

      {/* Config 1: 7×1g.10gb */}
      <rect x="255" y="30" width="165" height="258" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="337" y="50" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00d4ff" textAnchor="middle">Config 1: All Smallest</text>
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <rect x="263" y={56 + i * 33} width="149" height="29" rx="4" fill={`hsl(${260 + i * 12},70%,45%)`} />
          <text x="337" y={70 + i * 33} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Instance {i + 1} · 1g.10gb</text>
          <text x="337" y={82 + i * 33} fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.8)" textAnchor="middle">~16 SMs · 10 GB · isolated</text>
        </g>
      ))}
      <text x="337" y="287" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">7 customers / researchers</text>

      {/* Config 2: Mixed */}
      <rect x="432" y="30" width="180" height="258" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="522" y="50" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00d4ff" textAnchor="middle">Config 2: Mixed Sizes</text>
      <rect x="440" y="58" width="164" height="86" rx="5" fill="#dc2626" />
      <text x="522" y="82" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">3g.40gb</text>
      <text x="522" y="97" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fecaca" textAnchor="middle">~48 SMs · 40 GB HBM</text>
      <text x="522" y="111" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Production training job</text>
      <text x="522" y="138" fontFamily="Arial,sans-serif" fontSize="7" fill="#fca5a5" textAnchor="middle">3/7 of GPU compute</text>

      <rect x="440" y="152" width="164" height="60" rx="5" fill="#2563eb" />
      <text x="522" y="172" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">2g.20gb</text>
      <text x="522" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">~32 SMs · 20 GB HBM</text>
      <text x="522" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Inference serving</text>

      {[0, 1].map(i => (
        <g key={i}>
          <rect x="440" y={220 + i * 30} width="164" height="26" rx="4" fill="#16a34a" />
          <text x="522" y={232 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">1g.10gb — Development</text>
          <text x="522" y={242 + i * 30} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bbf7d0" textAnchor="middle">~16 SMs · 10 GB · experiments</text>
        </g>
      ))}
      <text x="522" y="287" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">Train + Serve + Dev simultaneously!</text>

      {/* Key benefits */}
      <rect x="626" y="30" width="180" height="258" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="716" y="52" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">MIG KEY FACTS</text>
      {[
        { label: "Isolation", val: "Hardware level — complete" },
        { label: "Max instances", val: "7 per H100/A100" },
        { label: "Profiles", val: "1g, 2g, 3g, 4g, 7g" },
        { label: "Memory", val: "Dedicated HBM slice" },
        { label: "Compute", val: "Dedicated SM slice" },
        { label: "Cache", val: "Dedicated L2 slice" },
        { label: "Live migration", val: "NOT supported" },
        { label: "vs vGPU", val: "Hardware vs software" },
        { label: "Enable via", val: "nvidia-smi -mig 1" },
        { label: "Best for", val: "Multi-tenant inference" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="634" y={62 + i * 22} width="164" height="19" rx="3" fill={i % 2 === 0 ? "#f1f5f9" : "#fff"} />
          <text x="642" y={75 + i * 22} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#334155">{item.label}:</text>
          <text x="790" y={75 + i * 22} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="end">{item.val}</text>
        </g>
      ))}
    </svg>
  );
}
