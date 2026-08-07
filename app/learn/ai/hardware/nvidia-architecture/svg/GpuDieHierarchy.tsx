"use client";
export default function GpuDieHierarchy() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gdh-title">
      <title id="gdh-title">GPU Die Hierarchy (H100 reference): Die contains 8 GPCs. Each GPC contains 4 TPCs. Each TPC contains 2 SMs. Each SM contains 128 CUDA Cores plus 4 Tensor Cores plus 1 RT Core plus Warp Schedulers plus Shared Memory and Register File. Total: 16,896 CUDA Cores, 528 Tensor Cores, 132 SMs.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU DIE HIERARCHY — From the Full Chip Down to Individual Compute Units (H100 Reference)</text>

      {/* Die */}
      <rect x="20" y="26" width="780" height="282" rx="10" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
      <text x="410" y="44" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0f172a" textAnchor="middle">DIE — The Full H100 GPU Chip (80 Billion Transistors, 4nm)</text>

      {/* 2 GPC columns */}
      {[0, 1].map(col => (
        <g key={col}>
          <rect x={28 + col * 390} y={50} width={378} height={250} rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x={28 + col * 390 + 189} y={66} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">
            GPC {col * 4 + 1}–{col * 4 + 4} (Graphics Processing Cluster — 4 GPCs shown as group)
          </text>

          {/* 2 TPC rows */}
          {[0, 1].map(row => (
            <g key={row}>
              <rect x={36 + col * 390} y={72 + row * 116} width={362} height={108} rx="6" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1" />
              <text x={36 + col * 390 + 181} y={88 + row * 116} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#4c1d95" textAnchor="middle">
                TPC (Texture Processing Cluster) — contains 2 SMs
              </text>

              {/* 2 SM boxes per TPC */}
              {[0, 1].map(sm => (
                <g key={sm}>
                  <rect x={44 + col * 390 + sm * 178} y={93 + row * 116} width={170} height={80} rx="5" fill="#7c3aed" />
                  <text x={44 + col * 390 + sm * 178 + 85} y={111 + row * 116} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">SM (Streaming Multiprocessor)</text>
                  <text x={44 + col * 390 + sm * 178 + 85} y={125 + row * 116} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#c4b5fd" textAnchor="middle">128 CUDA Cores  ·  4 Tensor Cores</text>
                  <text x={44 + col * 390 + sm * 178 + 85} y={137 + row * 116} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#c4b5fd" textAnchor="middle">4 Warp Schedulers  ·  1 RT Core</text>
                  <text x={44 + col * 390 + sm * 178 + 85} y={149 + row * 116} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#c4b5fd" textAnchor="middle">256 KB Shared Mem/L1  ·  256 KB Regs</text>
                  <text x={44 + col * 390 + sm * 178 + 85} y={161 + row * 116} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fbbf24" textAnchor="middle">Where YOUR code actually runs</text>
                </g>
              ))}
            </g>
          ))}
        </g>
      ))}

      {/* Totals footer */}
      <rect x="20" y="308" width="780" height="10" rx="3" fill="#e2e8f0" />
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">
        H100 Total: 8 GPCs · 4 TPCs/GPC · 2 SMs/TPC = 64 TPCs · 128 SMs · 16,896 CUDA Cores · 528 Tensor Cores (4th gen) · 80 GB HBM3
      </text>
      <text x="410" y="308" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">
        (Diagram shows simplified 2-GPC×2-TPC subset — actual H100 has 8 GPCs × 4 TPCs × 2 SMs = 64 SM units per 4-TPC-group)
      </text>
    </svg>
  );
}
