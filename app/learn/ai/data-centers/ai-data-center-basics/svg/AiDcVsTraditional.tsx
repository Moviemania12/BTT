"use client";
export default function AiDcVsTraditional() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dcvs-title">
      <title id="dcvs-title">AI Data Center vs Traditional Data Center comparison: Traditional DC has 3-15 kW per rack, air conditioning cooling, runs websites and databases, 10 Gbps network. AI Data Center has 40-120+ kW per rack, direct liquid cooling on chips, runs AI model training and inference, 400 Gbps network — 40 times faster. These are not the same facility.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI DATA CENTER vs TRADITIONAL DATA CENTER — Not the Same Engineering</text>

      {/* Traditional DC */}
      <rect x="14" y="30" width="374" height="244" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
      <text x="201" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="middle">Traditional Data Center</text>

      {[
        { label: "Power per rack:", val: "3–15 kW", sub: "(like 3–15 electric kettles)", col: "#475569" },
        { label: "Cooling:", val: "Air conditioning", sub: "(large AC units, CRAC)", col: "#475569" },
        { label: "Runs:", val: "Websites, Emails, Databases", sub: "(general-purpose computing)", col: "#475569" },
        { label: "Network speed:", val: "1–10 Gbps", sub: "(standard Ethernet)", col: "#475569" },
        { label: "Server cost/rack:", val: "$50K–200K", sub: "(standard x86 servers)", col: "#475569" },
        { label: "Workload duration:", val: "Variable, spiky", sub: "(traffic comes and goes)", col: "#475569" },
      ].map((r, i) => (
        <g key={r.label}>
          <rect x="22" y={66 + i * 34} width="358" height="30" rx="4" fill={i % 2 === 0 ? "#e2e8f0" : "#f8fafc"} />
          <text x="32" y={82 + i * 34} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155">{r.label}</text>
          <text x="32" y={91 + i * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill={r.col}>{r.val} — {r.sub}</text>
        </g>
      ))}

      {/* AI DC */}
      <rect x="432" y="30" width="374" height="244" rx="10" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="619" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#00d4ff" textAnchor="middle">AI Data Center</text>

      {[
        { label: "Power per rack:", val: "40–120+ kW", sub: "(like 40–120 electric kettles)", col: "#c4b5fd" },
        { label: "Cooling:", val: "Direct Liquid Cooling", sub: "(water pipes on GPU chips)", col: "#c4b5fd" },
        { label: "Runs:", val: "AI Training and Inference", sub: "(specialized AI compute)", col: "#c4b5fd" },
        { label: "Network speed:", val: "200–400 Gbps", sub: "(InfiniBand — 40× faster)", col: "#c4b5fd" },
        { label: "Server cost/rack:", val: "$1M–5M+", sub: "(AI GPU servers)", col: "#c4b5fd" },
        { label: "Workload duration:", val: "Sustained — days to weeks", sub: "(training runs continuously)", col: "#c4b5fd" },
      ].map((r, i) => (
        <g key={r.label}>
          <rect x="440" y={66 + i * 34} width="358" height="30" rx="4" fill={i % 2 === 0 ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.15)"} />
          <text x="450" y={82 + i * 34} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#e2e8f0">{r.label}</text>
          <text x="450" y={91 + i * 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill={r.col}>{r.val} — {r.sub}</text>
        </g>
      ))}

      {/* Center NOT */}
      <rect x="388" y="144" width="44" height="22" rx="5" fill="#dc2626" />
      <text x="410" y="159" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">NOT</text>
      <rect x="388" y="168" width="44" height="22" rx="5" fill="#dc2626" />
      <text x="410" y="183" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">SAME</text>
    </svg>
  );
}
