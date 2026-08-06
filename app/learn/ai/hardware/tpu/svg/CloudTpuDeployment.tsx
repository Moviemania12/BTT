"use client";
export default function CloudTpuDeployment() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ctd-title">
      <title id="ctd-title">Cloud TPU Deployment: Developer writes code on laptop, sends to Google Cloud via API, XLA compiles code for TPU, TPU Pod runs training, results return to developer</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CLOUD TPU — How You Actually Use TPU via Google Cloud</text>

      {/* Step 1: Developer */}
      <rect x="20" y="42" width="130" height="190" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="85" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Your Laptop</text>
      <text x="85" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Write TF/JAX code</text>
      <rect x="35" y="88" width="100" height="70" rx="4" fill="#1e40af" />
      <text x="85" y="106" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">Your Python</text>
      <text x="85" y="119" fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">import jax</text>
      <text x="85" y="131" fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">model.train()</text>
      <text x="85" y="143" fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">on TPU</text>
      <text x="85" y="168" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">No GPU needed</text>
      <text x="85" y="180" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">No special</text>
      <text x="85" y="192" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">hardware</text>
      <text x="85" y="220" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#2563eb" textAnchor="middle">Step 1: Write Code</text>
      <line x1="152" y1="137" x2="172" y2="137" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#ctd-ar)" />

      {/* Step 2: Google Cloud API */}
      <rect x="174" y="42" width="130" height="190" rx="8" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="239" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">Google Cloud</text>
      <text x="239" y="74" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">TPU VM / API</text>
      <rect x="184" y="84" width="110" height="80" rx="4" fill="#7c3aed" />
      <text x="239" y="102" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">XLA Compiler</text>
      <text x="239" y="116" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Translates your</text>
      <text x="239" y="128" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Python code into</text>
      <text x="239" y="140" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">TPU instructions</text>
      <text x="239" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24" textAnchor="middle">Auto-optimizes!</text>
      <text x="239" y="172" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">Pay per hour</text>
      <text x="239" y="184" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">Preemptible option</text>
      <text x="239" y="196" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">for lower cost</text>
      <text x="239" y="220" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c3aed" textAnchor="middle">Step 2: Compile</text>
      <line x1="306" y1="137" x2="326" y2="137" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#ctd-ar2)" />

      {/* Step 3: TPU Pod */}
      <rect x="328" y="36" width="170" height="208" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="413" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">TPU Pod</text>
      <text x="413" y="72" fontFamily="Arial,sans-serif" fontSize="7" fill="#818cf8" textAnchor="middle">Google's Data Center</text>
      {Array.from({length:24}).map((_,i) => {
        const col = i%6, row = Math.floor(i/6);
        return (
          <rect key={i} x={336 + col*24} y={80 + row*22} width="20" height="17" rx="2" fill="#7c3aed" opacity={0.6 + i*0.015} />
        );
      })}
      <text x="413" y="182" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">Hundreds to thousands</text>
      <text x="413" y="194" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">of TPU chips</text>
      <text x="413" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24" textAnchor="middle">All working on your job</text>
      <text x="413" y="232" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00d4ff" textAnchor="middle">Step 3: Run Training</text>
      <line x1="500" y1="140" x2="520" y2="140" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#ctd-ar3)" />

      {/* Step 4: Results */}
      <rect x="522" y="42" width="130" height="190" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="587" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Your Results</text>
      <text x="587" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Model checkpoints</text>
      <rect x="532" y="88" width="110" height="80" rx="4" fill="#16a34a" />
      <text x="587" y="108" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Trained Model</text>
      <text x="587" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Saved to Google</text>
      <text x="587" y="137" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Cloud Storage</text>
      <text x="587" y="150" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">(GCS bucket)</text>
      <text x="587" y="172" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Download or</text>
      <text x="587" y="184" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">deploy directly</text>
      <text x="587" y="196" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">from GCP</text>
      <text x="587" y="220" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#16a34a" textAnchor="middle">Step 4: Get Results</text>

      {/* TPU configs */}
      <rect x="670" y="42" width="140" height="190" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="740" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">TPU Options</text>
      {[
        { name: "v5e-1", chips: "1 chip", use: "Development" },
        { name: "v5e-8", chips: "8 chips", use: "Small training" },
        { name: "v5e-256", chips: "256 chips", use: "Medium LLM" },
        { name: "v4-8", chips: "8 chips", use: "Research" },
        { name: "v4-64", chips: "64 chips", use: "Large model" },
        { name: "v4-512", chips: "512 chips", use: "Frontier AI" },
      ].map((c, i) => (
        <g key={i}>
          <rect x="678" y={74 + i*24} width="124" height="19" rx="3" fill="#ede9fe" />
          <text x="686" y={86 + i*24} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#4c1d95">{c.name}</text>
          <text x="686" y={86 + i*24} fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6"><tspan dx="52">{c.chips}</tspan></text>
          <text x="778" y={86 + i*24} fontFamily="Arial,sans-serif" fontSize="6" fill="#6d28d9" textAnchor="end">{c.use}</text>
        </g>
      ))}
      <text x="740" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Charged per chip-hour</text>

      <defs>
        <marker id="ctd-ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#2563eb" /></marker>
        <marker id="ctd-ar2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#7c3aed" /></marker>
        <marker id="ctd-ar3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
