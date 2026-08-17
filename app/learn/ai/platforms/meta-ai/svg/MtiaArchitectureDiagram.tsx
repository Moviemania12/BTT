"use client";
export default function MtiaArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mtia-title">
      <title id="mtia-title">MTIA (Meta Training and Inference Accelerator) Generations Overview. Illustrative — exact MTIA internal architecture is not publicly fully disclosed; exact workload-to-hardware assignments are not fully disclosed. MTIA v1/100: Production, first generation, inference and R&R focus. MTIA 200: Production, performance/efficiency improvements. MTIA 300: Production for R&R training per Meta announcements. MTIA 400: Testing completed, deployment underway per Meta; 72-accelerator scale-up domain, AALC (Advanced Air/Liquid Cooling) support, GenAI and R&R workloads. MTIA 450: Mass deployment early 2027 per Meta roadmap. MTIA 500: Mass deployment 2027 per Meta roadmap. Hundreds of thousands of MTIA chips deployed per Meta. MTIA does not replace NVIDIA/AMD GPUs for large Llama foundation model training. Verify current status at engineering.fb.com.</title>
      <rect width="820" height="240" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MTIA — GENERATIONS AND STATUS</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Per Meta Engineering announcements — verify current status at engineering.fb.com — exact architecture not publicly fully disclosed</text>

      {/* Six generation boxes */}
      {[
        { gen: "MTIA v1/100", status: "Production", note: "First gen\nInference/R&R", color: "#16a34a", x: 14, w: 120 },
        { gen: "MTIA 200", status: "Production", note: "Perf improved\nExpanded scope", color: "#16a34a", x: 145, w: 120 },
        { gen: "MTIA 300", status: "Production†", note: "R&R training\nGenAI expanding", color: "#0891b2", x: 276, w: 120 },
        { gen: "MTIA 400", status: "Deploying†", note: "72-accel domain\nAALC support", color: "#d97706", x: 407, w: 120 },
        { gen: "MTIA 450", status: "2027 (early)†", note: "Mass deployment\nVerify status", color: "#9333ea", x: 538, w: 120 },
        { gen: "MTIA 500", status: "2027†", note: "Mass deployment\nVerify status", color: "#dc2626", x: 669, w: 137 },
      ].map((g, i) => (
        <g key={g.gen}>
          <rect x={g.x} y="48" width={g.w} height="80" rx="6" fill="#1a1a2e" stroke={g.color} strokeWidth="1.5" />
          <rect x={g.x + 4} y="54" width={g.w - 8} height="16" rx="3" fill={g.color} />
          <text x={g.x + g.w/2} y="66" fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">{g.status}</text>
          <text x={g.x + g.w/2} y="82" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#e2e8f0" textAnchor="middle">{g.gen}</text>
          {g.note.split("\n").map((line, li) => (
            <text key={li} x={g.x + g.w/2} y={96 + li * 13} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#94a3b8" textAnchor="middle">{line}</text>
          ))}
          {i < 5 && <line x1={g.x + g.w} y1={88} x2={g.x + g.w + 10} y2={88} stroke="#475569" strokeWidth="1.5" markerEnd="url(#mtia-ar)" />}
        </g>
      ))}

      <text x="410" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">† Per Meta Engineering announcements — verify current production/deployment status at engineering.fb.com</text>

      {/* Use cases box */}
      <rect x="14" y="158" width="792" height="52" rx="6" fill="#0f172a" stroke="#0866ff" strokeWidth="1" />
      <text x="410" y="175" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#93c5fd" textAnchor="middle">MTIA Workload Coverage (per Meta public statements)</text>
      <text x="164" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">R&R Inference</text>
      <text x="328" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">R&R Training (MTIA 300+)</text>
      <text x="500" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">GenAI Inference (expanding)</text>
      <text x="680" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Embedding lookups</text>
      <text x="410" y="201" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">MTIA does NOT replace NVIDIA/AMD for large Llama foundation model training · Exact workload assignments not fully disclosed</text>

      <text x="410" y="228" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Hundreds of thousands of MTIA chips deployed per Meta · Illustrative diagram based on publicly available Meta Engineering information</text>

      <defs>
        <marker id="mtia-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#475569" /></marker>
      </defs>
    </svg>
  );
}
