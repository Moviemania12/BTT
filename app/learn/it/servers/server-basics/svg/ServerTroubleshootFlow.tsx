"use client";
export default function ServerTroubleshootFlow() {
  const f = "Arial,sans-serif";
  const steps = [
    { t: "1. Alert / Ticket", s: "Read the exact alarm,\nhostname, rack, U", c: "#fef2f2", b: "#dc2626" },
    { t: "2. Scope It", s: "One server or many?\nSame rack / feed / VLAN?", c: "#fff7ed", b: "#f97316" },
    { t: "3. Out-of-Band", s: "BMC: SEL, sensors,\nvirtual console", c: "#eff6ff", b: "#2563eb" },
    { t: "4. Physical Check", s: "LEDs, PSU, fans,\ncables, airflow", c: "#fef3c7", b: "#f59e0b" },
    { t: "5. Isolate", s: "Last change? Swap\nknown-good part", c: "#f5f3ff", b: "#7c3aed" },
    { t: "6. Fix + Verify", s: "Replace, rebuild,\nconfirm alarm clear", c: "#f0fdf4", b: "#16a34a" },
    { t: "7. Record + RCA", s: "Ticket, asset DB,\nlesson learned", c: "#f8fafc", b: "#64748b" },
  ];
  return (
    <svg viewBox="0 0 860 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven step server troubleshooting flow from alert to root cause record" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="230" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Server Troubleshooting Flow — Alert to Root Cause</text>
      {steps.map((s, i) => {
        const x = 12 + i * 120;
        return (
          <g key={i}>
            <rect x={x} y="50" width="108" height="112" rx="9" fill={s.c} stroke={s.b} strokeWidth="2" />
            <text x={x + 54} y="76" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#111827">{s.t}</text>
            {s.s.split("\n").map((l, j) => <text key={j} x={x + 54} y={98 + j * 15} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{l}</text>)}
            {i < steps.length - 1 && <line x1={x + 108} y1="106" x2={x + 120} y2="106" stroke="#64748b" strokeWidth="2" markerEnd="url(#tArr)" />}
          </g>
        );
      })}
      <rect x="12" y="180" width="836" height="38" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.4" />
      <text x="430" y="203" textAnchor="middle" fontFamily={f} fontSize="10" fill="#1e40af" fontWeight="700">Golden rule: change one thing at a time, and always know how to roll it back.</text>
      <defs><marker id="tArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0,7 3.5,0 7" fill="#64748b" /></marker></defs>
    </svg>
  );
}
