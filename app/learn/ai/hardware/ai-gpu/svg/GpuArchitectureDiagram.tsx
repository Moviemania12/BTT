"use client";
export default function GpuArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gpa-title">
      <title id="gpa-title">GPU Architecture: GPU Chip contains multiple GPU Divisions (GPC), each with multiple Work Units (SM), each with CUDA Cores and Tensor Cores</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU ARCHITECTURE — FROM CHIP TO CORE</text>

      {/* GPU chip boundary */}
      <rect x="20" y="34" width="780" height="330" rx="12" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">GPU CHIP (e.g. H100 — 80 billion transistors)</text>

      {/* GPC blocks */}
      {[0,1,2,3].map(gi => {
        const x = 34 + gi * 192;
        return (
          <g key={gi}>
            <rect x={x} y="60" width="180" height="290" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x={x+90} y="78" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">GPU Division {gi+1}</text>
            <text x={x+90} y="91" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">(GPC — Graphics Processing Cluster)</text>

            {/* SM blocks inside each GPC */}
            {[0,1,2].map(si => {
              const sy = 100 + si * 78;
              return (
                <g key={si}>
                  <rect x={x+8} y={sy} width="164" height="70" rx="5" fill="#1e40af" />
                  <text x={x+90} y={sy+16} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Work Unit {si+1} (SM)</text>
                  <rect x={x+12} y={sy+22} width="70" height="18" rx="3" fill="#60a5fa" />
                  <text x={x+47} y={sy+34} fontFamily="Arial,sans-serif" fontSize="7" fill="#1e3a8a" textAnchor="middle">128 CUDA Cores</text>
                  <rect x={x+90} y={sy+22} width="78" height="18" rx="3" fill="#f59e0b" />
                  <text x={x+129} y={sy+34} fontFamily="Arial,sans-serif" fontSize="7" fill="#451a03" textAnchor="middle">4 Tensor Core units</text>
                  <rect x={x+12} y={sy+44} width="52" height="14" rx="2" fill="#334155" />
                  <text x={x+38} y={sy+54} fontFamily="Arial,sans-serif" fontSize="6" fill="#e2e8f0" textAnchor="middle">Registers</text>
                  <rect x={x+68} y={sy+44} width="52" height="14" rx="2" fill="#334155" />
                  <text x={x+94} y={sy+54} fontFamily="Arial,sans-serif" fontSize="6" fill="#e2e8f0" textAnchor="middle">Shared RAM</text>
                  <rect x={x+124} y={sy+44} width="40" height="14" rx="2" fill="#334155" />
                  <text x={x+144} y={sy+54} fontFamily="Arial,sans-serif" fontSize="6" fill="#e2e8f0" textAnchor="middle">Scheduler</text>
                </g>
              );
            })}
            <text x={x+90} y="343" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">+ L1 Cache · Warp Schedulers</text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x="34" y="355" width="752" height="16" rx="3" fill="#f1f5f9" />
      <rect x="40" y="358" width="12" height="10" rx="2" fill="#60a5fa" />
      <text x="56" y="367" fontFamily="Arial,sans-serif" fontSize="7" fill="#334155">CUDA Cores (general math)</text>
      <rect x="220" y="358" width="12" height="10" rx="2" fill="#f59e0b" />
      <text x="236" y="367" fontFamily="Arial,sans-serif" fontSize="7" fill="#334155">Tensor Core units (AI matrix math)</text>
      <rect x="430" y="358" width="12" height="10" rx="2" fill="#334155" />
      <text x="446" y="367" fontFamily="Arial,sans-serif" fontSize="7" fill="#334155">Registers / Shared RAM / Scheduler</text>
      <text x="680" y="367" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8">H100: 8 GPCs × ~16 SMs each = 132 SMs total</text>
    </svg>
  );
}
