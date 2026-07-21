"use client";
// DR D4 — Synchronous vs Asynchronous Replication
export default function DrReplicationTypes() {
  const syncSteps = [
    { t: "App write request",          c: "#dbeafe", b: "#2563eb", tc: "#1e40af" },
    { t: "Primary storage write",      c: "#dbeafe", b: "#2563eb", tc: "#1e40af" },
    { t: "Sent to DR site immediately",c: "#ede9fe", b: "#7c3aed", tc: "#5b21b6" },
    { t: "DR site acknowledges",       c: "#ede9fe", b: "#7c3aed", tc: "#5b21b6" },
    { t: "Primary acks to App",        c: "#dcfce7", b: "#16a34a", tc: "#15803d" },
  ];
  const asyncSteps = [
    { t: "App write request",          c: "#dbeafe", b: "#2563eb", tc: "#1e40af" },
    { t: "Primary storage write",      c: "#dbeafe", b: "#2563eb", tc: "#1e40af" },
    { t: "App acknowledged immediately",c:"#dcfce7", b: "#16a34a", tc: "#15803d" },
    { t: "Replicates in background",   c: "#fff7ed", b: "#ea580c", tc: "#c2410c" },
    { t: "DR site receives (lag)",      c: "#fff7ed", b: "#ea580c", tc: "#c2410c" },
  ];

  const STEP_H = 30;
  const ARR_H  = 10;
  const colW   = 222;
  const stepsH = syncSteps.length * (STEP_H + ARR_H);
  const totalH = 74 + stepsH + 100;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Synchronous vs asynchronous replication for DR"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Synchronous vs Asynchronous Replication</text>

      {/* Column headers */}
      <rect x="10" y="26" width={colW} height="26" rx="5" fill="#7c3aed"/>
      <text x={10 + colW/2} y="43" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">SYNCHRONOUS</text>
      <rect x={10+colW+16} y="26" width={colW} height="26" rx="5" fill="#ea580c"/>
      <text x={10+colW+16+colW/2} y="43" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">ASYNCHRONOUS</text>

      {/* Steps */}
      {syncSteps.map((s, i) => {
        const y = 58 + i * (STEP_H + ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width={colW} height={STEP_H} rx="5" fill={s.c} stroke={s.b} strokeWidth="1.5"/>
            <text x={10 + colW/2} y={y + STEP_H/2 + 5} textAnchor="middle" fontSize="9" fontWeight="600" fill={s.tc}>{s.t}</text>
            {i < syncSteps.length - 1 && (
              <g>
                <line x1={10+colW/2} y1={y+STEP_H} x2={10+colW/2} y2={y+STEP_H+ARR_H-3} stroke={s.b} strokeWidth="1.5"/>
                <polygon points={`${10+colW/2-4},${y+STEP_H+ARR_H-3} ${10+colW/2+4},${y+STEP_H+ARR_H-3} ${10+colW/2},${y+STEP_H+ARR_H}`} fill={s.b}/>
              </g>
            )}
          </g>
        );
      })}
      {asyncSteps.map((s, i) => {
        const y = 58 + i * (STEP_H + ARR_H);
        const x = 10 + colW + 16;
        return (
          <g key={i}>
            <rect x={x} y={y} width={colW} height={STEP_H} rx="5" fill={s.c} stroke={s.b} strokeWidth="1.5"/>
            <text x={x + colW/2} y={y + STEP_H/2 + 5} textAnchor="middle" fontSize="9" fontWeight="600" fill={s.tc}>{s.t}</text>
            {i < asyncSteps.length - 1 && (
              <g>
                <line x1={x+colW/2} y1={y+STEP_H} x2={x+colW/2} y2={y+STEP_H+ARR_H-3} stroke={s.b} strokeWidth="1.5"/>
                <polygon points={`${x+colW/2-4},${y+STEP_H+ARR_H-3} ${x+colW/2+4},${y+STEP_H+ARR_H-3} ${x+colW/2},${y+STEP_H+ARR_H}`} fill={s.b}/>
              </g>
            )}
          </g>
        );
      })}

      {/* Result rows */}
      {[
        { lSync: "✓ Near-zero RPO",          lAsync: "⚠ Non-zero RPO (lag = data loss)",  yOff: 0 },
        { lSync: "⚠ Write latency impact",    lAsync: "~ Round-trip not normally in ack path",      yOff: 20 },
        { lSync: "⚠ Distance/latency limited",lAsync: "✓ Greater geographic separation possible",         yOff: 40 },
      ].map((r, i) => {
        const y = 58 + stepsH + 8 + r.yOff;
        return (
          <g key={i}>
            <text x={10 + colW/2} y={y + 13} textAnchor="middle" fontSize="9" fill={r.lSync.startsWith("✓") ? "#15803d" : "#991b1b"} fontWeight="600">{r.lSync}</text>
            <text x={10+colW+16+colW/2} y={y + 13} textAnchor="middle" fontSize="9" fill={r.lAsync.startsWith("✓") ? "#15803d" : "#991b1b"} fontWeight="600">{r.lAsync}</text>
          </g>
        );
      })}

      <rect x="10" y={totalH - 28} width="460" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={totalH - 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">
        Sync: near-zero RPO for acknowledged writes — application consistency still requires proper quiescing at recovery
      </text>
    </svg>
  );
}
