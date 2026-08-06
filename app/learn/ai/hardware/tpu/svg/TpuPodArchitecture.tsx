"use client";
export default function TpuPodArchitecture() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tpa-title">
      <title id="tpa-title">TPU Pod: Individual TPU chips connect via ICI (Inter-Chip Interconnect) into boards, boards into racks, racks into a Pod — up to 4,096 chips in TPU v4 Pod forming a 3D torus network</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TPU POD — How Individual Chips Scale Into a Supercomputer</text>

      {/* Level 1: Single chip */}
      <rect x="20" y="38" width="140" height="90" rx="8" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="90" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">Single TPU Chip</text>
      <rect x="35" y="68" width="110" height="50" rx="5" fill="#7c3aed" />
      <text x="90" y="88" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">MXU + VPU</text>
      <text x="90" y="101" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">+ HBM Memory</text>
      <text x="90" y="117" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">1 chip = ~275 TFLOPS</text>
      <line x1="162" y1="83" x2="190" y2="83" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tpa-ar)" />

      {/* Level 2: Board (4 chips) */}
      <rect x="192" y="38" width="150" height="90" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="267" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">TPU Board</text>
      <text x="267" y="68" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">4 chips on one board</text>
      {[0,1,2,3].map(i => (
        <rect key={i} x={202 + (i%2)*60} y={76 + Math.floor(i/2)*24} width="52" height="18" rx="3" fill="#7c3aed" />
      ))}
      {[0,1,2,3].map(i => (
        <text key={i} x={228 + (i%2)*60} y={88 + Math.floor(i/2)*24} fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">TPU {i+1}</text>
      ))}
      <text x="267" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">Connected by ICI (high-speed)</text>
      <line x1="344" y1="83" x2="372" y2="83" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tpa-ar)" />

      {/* Level 3: Rack (multiple boards) */}
      <rect x="374" y="28" width="150" height="110" rx="8" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="449" y="46" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">TPU Rack</text>
      <text x="449" y="58" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Multiple boards stacked</text>
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x="384" y={66 + i*10} width="130" height="8" rx="2" fill="#7c3aed" opacity={0.6 + i*0.05} />
          <text x="449" y={73 + i*10} fontFamily="Arial,sans-serif" fontSize="5" fill="#fff" textAnchor="middle">Board {i+1} — 4 TPU chips</text>
        </g>
      ))}
      <text x="449" y="130" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">~24 boards per rack</text>
      <line x1="526" y1="83" x2="554" y2="83" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tpa-ar)" />

      {/* Level 4: Pod */}
      <rect x="556" y="18" width="244" height="300" rx="10" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="678" y="40" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">TPU v4 POD</text>
      <text x="678" y="56" fontFamily="Arial,sans-serif" fontSize="8" fill="#818cf8" textAnchor="middle">4,096 TPU chips total</text>
      <text x="678" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#818cf8" textAnchor="middle">3D Torus Interconnect</text>
      {/* 3D torus visualization — grid of small chips */}
      {Array.from({length:64}).map((_,i) => {
        const col = i % 8, row = Math.floor(i/8);
        return (
          <g key={i}>
            <rect x={566 + col*26} y={82 + row*20} width="22" height="15" rx="2" fill="#7c3aed" opacity={0.5 + (col+row)*0.03} />
            {col < 7 && <line x1={588 + col*26} y1={89 + row*20} x2={590 + col*26} y2={89 + row*20} stroke="#a78bfa" strokeWidth="0.5" />}
            {row < 7 && <line x1={577 + col*26} y1={97 + row*20} x2={577 + col*26} y2={100 + row*20} stroke="#a78bfa" strokeWidth="0.5" />}
          </g>
        );
      })}
      <text x="678" y="254" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">~1.1 EFLOPS (exaflop)</text>
      <text x="678" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#818cf8" textAnchor="middle">= 1,100,000 TFLOPS</text>
      <text x="678" y="286" fontFamily="Arial,sans-serif" fontSize="8" fill="#fbbf24" textAnchor="middle">Gemini was trained here</text>
      <rect x="566" y="298" width="224" height="14" rx="4" fill="#7c3aed" opacity="0.4" />
      <text x="678" y="309" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Optical fiber ICI — low latency, high bandwidth</text>

      <defs>
        <marker id="tpa-ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
