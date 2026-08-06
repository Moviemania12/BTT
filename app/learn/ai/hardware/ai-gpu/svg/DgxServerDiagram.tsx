"use client";
export default function DgxServerDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dgx-title">
      <title id="dgx-title">DGX H100 Server: 8 H100 GPUs connected via NVSwitch for fast GPU-to-GPU communication, plus CPU, System RAM, NVMe storage, and InfiniBand network cards</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DGX H100 — INSIDE THE AI SERVER</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Specifications may vary depending on DGX generation and configuration</text>

      {/* Server chassis */}
      <rect x="20" y="48" width="780" height="278" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* 8 GPUs */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <g key={i}>
          <rect x={30 + i*94} y="62" width="86" height="100" rx="6" fill="#2563eb" />
          <text x={73 + i*94} y="90" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">H100</text>
          <text x={73 + i*94} y="103" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">GPU {i+1}</text>
          <text x={73 + i*94} y="116" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">80GB HBM3</text>
          <text x={73 + i*94} y="128" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">700W TDP</text>
          <text x={73 + i*94} y="140" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">ConnectX-7</text>
          <text x={73 + i*94} y="152" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">400G IB NIC</text>
        </g>
      ))}

      {/* NVSwitch layer */}
      <rect x="30" y="174" width="760" height="40" rx="6" fill="#f59e0b" />
      <text x="410" y="189" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#451a03" textAnchor="middle">NVSwitch (GPU Interconnect Switch — NOT Ethernet) × 3 chips</text>
      <text x="410" y="206" fontFamily="Arial,sans-serif" fontSize="8" fill="#451a03" textAnchor="middle">Any GPU → Any GPU at 900 GB/s bidirectional · All-to-all at full bandwidth simultaneously</text>

      {/* Bottom row */}
      {/* CPUs */}
      <rect x="30" y="226" width="180" height="80" rx="6" fill="#475569" />
      <text x="120" y="248" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">2× Intel Xeon CPU</text>
      <text x="120" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">Manages server OS</text>
      <text x="120" y="275" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">Data loading &amp; prep</text>
      <text x="120" y="288" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">CPU-side tasks only</text>

      {/* System RAM */}
      <rect x="220" y="226" width="160" height="80" rx="6" fill="#334155" />
      <text x="300" y="248" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">System RAM</text>
      <text x="300" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">2 TB DDR5</text>
      <text x="300" y="275" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">CPU working memory</text>
      <text x="300" y="288" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">(not GPU HBM)</text>

      {/* NVMe */}
      <rect x="390" y="226" width="160" height="80" rx="6" fill="#334155" />
      <text x="470" y="248" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">NVMe SSDs</text>
      <text x="470" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">4× SSDs = 30TB</text>
      <text x="470" y="275" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">Local checkpoint</text>
      <text x="470" y="288" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">storage</text>

      {/* Network */}
      <rect x="560" y="226" width="230" height="80" rx="6" fill="#334155" />
      <text x="675" y="248" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">InfiniBand Network Cards</text>
      <text x="675" y="262" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">8× ConnectX-7 NICs (1 per GPU)</text>
      <text x="675" y="275" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">Each: 400 Gbps InfiniBand</text>
      <text x="675" y="288" fontFamily="Arial,sans-serif" fontSize="7" fill="#cbd5e1" textAnchor="middle">Total: 3.2 Tbps external bandwidth</text>
      <text x="675" y="301" fontFamily="Arial,sans-serif" fontSize="7" fill="#00d4ff" textAnchor="middle">Connects to other servers in cluster</text>
    </svg>
  );
}
