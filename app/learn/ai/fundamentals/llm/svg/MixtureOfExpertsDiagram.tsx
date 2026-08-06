"use client";
export default function MixtureOfExpertsDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="moe-title">
      <title id="moe-title">Mixture of Experts Architecture: Router selects top-K experts, sparse activation reduces compute while maintaining quality</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MIXTURE OF EXPERTS (MoE) ARCHITECTURE</text>

      {/* Input token */}
      <rect x="20" y="120" width="120" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="80" y="144" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Input Token</text>
      <line x1="142" y1="140" x2="162" y2="140" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#moe1)" />

      {/* Router */}
      <rect x="162" y="108" width="130" height="64" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="227" y="132" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">ROUTER</text>
      <text x="227" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Softmax over experts</text>
      <text x="227" y="162" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Top-K=2 selected</text>

      {/* Experts */}
      {[0,1,2,3,4,5,6,7].map((i) => {
        const active = i === 2 || i === 5;
        const y = 38 + i * 28;
        return (
          <g key={i}>
            <line x1="294" y1="140" x2={active ? 318 : 314} y2={y + 14} stroke={active ? "#16a34a" : "#e2e8f0"} strokeWidth={active ? 2 : 1} strokeDasharray={active ? "none" : "3,3"} />
            <rect x="318" y={y} width="130" height="24" rx="5" fill={active ? "#dcfce7" : "#f8fafc"} stroke={active ? "#16a34a" : "#e2e8f0"} strokeWidth={active ? 1.5 : 1} />
            <text x="383" y={y + 15} fontFamily="Arial,sans-serif" fontSize="8" fontWeight={active ? "700" : "400"} fill={active ? "#14532d" : "#94a3b8"} textAnchor="middle">
              Expert {i + 1} {active ? "✓ SELECTED" : "— inactive"}
            </text>
          </g>
        );
      })}
      <text x="383" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#16a34a" textAnchor="middle">2 of 8 experts active per token</text>

      {/* Aggregator */}
      <rect x="464" y="120" width="120" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="524" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Weighted Sum</text>
      <text x="524" y="152" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Combine expert outputs</text>
      <line x1="450" y1="140" x2="462" y2="140" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#moe2)" />
      <line x1="586" y1="140" x2="606" y2="140" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#moe1)" />

      {/* Comparison box */}
      <rect x="606" y="50" width="194" height="200" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="703" y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">COMPARISON</text>
      {[
        { label: "Mixtral 8×7B", rows: ["Total params: 47B", "Active params: ~13B", "Memory: 94GB FP16", "Quality: ~70B dense", "Compute: ~13B dense"] },
        { label: "Dense 70B", rows: ["Total params: 70B", "Active params: 70B", "Memory: 140GB FP16", "Quality: baseline", "Compute: 70B ops"] },
      ].map((c, ci) => (
        <g key={ci}>
          <text x="703" y={90 + ci * 80} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={ci === 0 ? "#16a34a" : "#2563eb"} textAnchor="middle">{c.label}</text>
          {c.rows.map((r, ri) => (
            <text key={ri} x="618" y={103 + ci * 80 + ri * 12} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">• {r}</text>
          ))}
        </g>
      ))}
      <text x="703" y="256" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">MoE: load all experts in memory</text>
      <text x="703" y="268" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">but compute only selected ones</text>

      <text x="410" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Expert Parallelism: different GPUs host different experts — InfiniBand routes tokens between GPU nodes</text>

      <defs>
        <marker id="moe1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="moe2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
