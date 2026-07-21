"use client";
// DR D2 — RPO and RTO Timeline (vertical flow)
export default function DrRpoRtoTimeline() {
  const events = [
    { label: "Last Recovery Point",   sub: "Last consistent backup / replication sync",      bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { label: "◄── RPO WINDOW ──►",   sub: "Data written in this window may be lost",         bg: "#fee2e2", border: "#dc2626", tc: "#991b1b", warn: true },
    { label: "DISASTER OCCURS",       sub: "Site failure / ransomware / major outage",        bg: "#1e293b", border: "#1e293b", tc: "#f8fafc", dark: true },
    { label: "◄── RTO WINDOW (org-defined measurement)", sub: "Define start/end explicitly — detection, decision, recovery, validation all count", bg: "#fff7ed", border: "#ea580c", tc: "#c2410c", warn: true },
    { label: "Detection confirmed",   sub: "Monitoring alerts · human verification",          bg: "#ede9fe", border: "#7c3aed", tc: "#5b21b6" },
    { label: "Disaster declared",     sub: "Formal declaration by authorized personnel",      bg: "#ede9fe", border: "#7c3aed", tc: "#5b21b6" },
    { label: "Infrastructure recovered", sub: "Network · storage · compute · identity",      bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { label: "Data recovered",        sub: "DB failover · replication verify · data mount",   bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { label: "Dependencies started",  sub: "AD → DNS → DB → App → Web (dependency order)",  bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { label: "Validation complete",   sub: "Health checks · data spot check · business OK",  bg: "#dcfce7", border: "#16a34a", tc: "#15803d" },
    { label: "BUSINESS AVAILABLE",    sub: "◄── RTO WINDOW ENDS HERE",                       bg: "#16a34a", border: "#16a34a", tc: "#fff", dark: true },
  ];

  const BOX_H  = 42;
  const ARR_H  = 14;
  const totalH = 42 + events.length * (BOX_H + ARR_H) + 52;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="RPO and RTO timeline disaster recovery"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">RPO &amp; RTO — Disaster Timeline</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">RTO measurement start/end must be explicitly defined — account for detection, decision, recovery, validation</text>

      {events.map((ev, i) => {
        const y = 38 + i * (BOX_H + ARR_H);
        const isWarn = ev.warn;
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={BOX_H} rx="6"
              fill={ev.bg} stroke={ev.border} strokeWidth={isWarn ? 2 : 1.5}/>
            <text x="240" y={y + 16} textAnchor="middle" fontSize={isWarn ? "10.5" : "10"}
              fontWeight={isWarn || ev.dark ? "700" : "600"}
              fill={ev.dark ? ev.tc : ev.tc}>{ev.label}</text>
            <text x="240" y={y + 31} textAnchor="middle" fontSize="9"
              fill={ev.dark ? "rgba(248,250,252,0.8)" : "#6b7280"}>{ev.sub}</text>
            {i < events.length - 1 && (
              <g>
                <line x1="240" y1={y + BOX_H} x2="240" y2={y + BOX_H + ARR_H - 4} stroke={ev.border} strokeWidth="2"/>
                <polygon points={`235,${y+BOX_H+ARR_H-4} 245,${y+BOX_H+ARR_H-4} 240,${y+BOX_H+ARR_H}`} fill={ev.border}/>
              </g>
            )}
          </g>
        );
      })}

      <rect x="10" y={38 + events.length * (BOX_H + ARR_H) + 4} width="460" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y={38 + events.length * (BOX_H + ARR_H) + 18} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#5b21b6">
        After RTO: WRT (Work Recovery Time) — data validation, backlog, business-ready
      </text>
      <text x="240" y={38 + events.length * (BOX_H + ARR_H) + 32} textAnchor="middle" fontSize="9" fill="#5b21b6">
        RTO + WRT ≤ MTD (Maximum Tolerable Downtime)
      </text>
    </svg>
  );
}
