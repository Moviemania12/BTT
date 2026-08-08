"use client";
export default function AiDcOverview() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aidc-title">
      <title id="aidc-title">AI Data Center big picture: A facility containing four zones — AI Compute Nodes (GPU servers doing AI math), High-Speed AI Network (ultra-fast connections between servers), AI Storage (training data and models), and Cooling and Power Systems (life support). Raw data enters the building, trained AI models exit for deployment.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI DATA CENTER — The AI Production Facility</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">When you use ChatGPT, Google Photos AI, or Spotify recommendations — an AI Data Center like this is doing the work.</text>

      {/* Building outline */}
      <rect x="140" y="42" width="540" height="252" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <text x="410" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">AI DATA CENTER BUILDING</text>

      {/* Zone 1 — Compute */}
      <rect x="152" y="68" width="246" height="100" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="275" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">AI Compute Nodes</text>
      <text x="275" y="101" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#5b21b6" textAnchor="middle">(GPU Servers — doing AI math)</text>
      <text x="275" y="116" fontFamily="Arial,sans-serif" fontSize="7" fill="#6d28d9" textAnchor="middle">Thousands of Graphics Processing</text>
      <text x="275" y="128" fontFamily="Arial,sans-serif" fontSize="7" fill="#6d28d9" textAnchor="middle">Units computing simultaneously</text>
      <text x="275" y="142" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#7c3aed" textAnchor="middle">40–120+ kW heat per rack</text>
      <text x="275" y="156" fontFamily="Arial,sans-serif" fontSize="7" fill="#6d28d9" textAnchor="middle">Where AI models are trained</text>

      {/* Zone 2 — Network */}
      <rect x="410" y="68" width="258" height="100" rx="6" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="539" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0c4a6e" textAnchor="middle">High-Speed AI Network</text>
      <text x="539" y="101" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">(The Nervous System)</text>
      <text x="539" y="116" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">Ultra-fast connections between</text>
      <text x="539" y="128" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">all GPU servers (InfiniBand)</text>
      <text x="539" y="142" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#0891b2" textAnchor="middle">200–400 Gb/s per port</text>
      <text x="539" y="156" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">Lets GPUs share training progress</text>

      {/* Zone 3 — Storage */}
      <rect x="152" y="180" width="246" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="275" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">AI Storage</text>
      <text x="275" y="213" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">(The Memory — data warehouse)</text>
      <text x="275" y="228" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Training datasets (terabytes+)</text>
      <text x="275" y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Model checkpoints + final models</text>
      <text x="275" y="256" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#16a34a" textAnchor="middle">Must feed GPUs at TB/s speeds</text>
      <text x="275" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Parallel file systems + object storage</text>

      {/* Zone 4 — Cooling/Power */}
      <rect x="410" y="180" width="258" height="100" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="539" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">Cooling and Power Systems</text>
      <text x="539" y="213" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">(The Life Support)</text>
      <text x="539" y="228" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Liquid cooling removes GPU heat</text>
      <text x="539" y="240" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">UPS + generators: no power loss</text>
      <text x="539" y="256" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#f97316" textAnchor="middle">100 MW+ power for large AI facilities</text>
      <text x="539" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Keeps everything running 24/7</text>

      {/* Data in arrow */}
      <rect x="14" y="160" width="118" height="36" rx="6" fill="#1e293b" />
      <text x="73" y="177" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Raw Data</text>
      <text x="73" y="190" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">(Text, Images, Videos)</text>
      <line x1="132" y1="178" x2="148" y2="178" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#aidc-ar)" />
      <text x="73" y="208" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">enters facility →</text>

      {/* Model out arrow */}
      <rect x="688" y="160" width="118" height="36" rx="6" fill="#16a34a" />
      <text x="747" y="177" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Trained AI Model</text>
      <text x="747" y="190" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">ready for deployment</text>
      <line x1="670" y1="178" x2="686" y2="178" stroke="#16a34a" strokeWidth="2" markerEnd="url(#aidc-ar2)" />
      <text x="747" y="208" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">← exits facility</text>

      <defs>
        <marker id="aidc-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
        <marker id="aidc-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
