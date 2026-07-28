"use client";
// D19 — Backend Drain and Ramp-Up Lifecycle
export default function DrainRampLifecycle() {
  const W = 480;
  const phases = [
    { label: "Normal", desc: "APP01 APP02 APP03 all active", fill: "#dcfce7", stroke: "#16a34a" },
    { label: "Drain (APP02)", desc: "APP02: no new work admitted per drain semantics. APP01 + APP03 serving.", fill: "#fef3c7", stroke: "#d97706" },
    { label: "Maintenance", desc: "APP02 offline. APP01 + APP03 handling all load.", fill: "#fee2e2", stroke: "#dc2626" },
    { label: "Re-add + Ramp", desc: "APP02 returns: slow-start (where platform supports). Cold cache, JIT, connections warm up.", fill: "#dbeafe", stroke: "#3b82f6" },
    { label: "Full Operation", desc: "APP01 APP02 APP03 all active again.", fill: "#dcfce7", stroke: "#16a34a" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 320`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Backend drain and ramp up lifecycle showing planned maintenance phases"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a19" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="320" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Backend Drain and Ramp-Up Lifecycle</text>

      {phases.map((p, i) => (
        <g key={i}>
          <rect x="10" y={30+i*50} width="460" height="42" rx="7" fill={p.fill} stroke={p.stroke} strokeWidth="1.5"/>
          <rect x="10" y={30+i*50} width="110" height="42" rx="7" fill={p.stroke}/>
          <text x="65" y={54+i*50} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{p.label}</text>
          <text x="136" y={50+i*50} fontSize="8.5" fill="#374151">{p.desc}</text>
          {i === 1 && <text x="136" y={64+i*50} fontSize="7.5" fontStyle="italic" fill="#dc2626">Drain semantics: new connections/requests/streams — protocol/platform dependent</text>}
          {i === 3 && <text x="136" y={64+i*50} fontSize="7.5" fontStyle="italic" fill="#6b7280">Slow start / ramp-up: platform/config dependent — not universally supported</text>}
          {i < phases.length - 1 && (
            <line x1="65" y1={72+i*50} x2="65" y2={78+i*50} stroke="#374151" strokeWidth="1.5" markerEnd="url(#a19)"/>
          )}
        </g>
      ))}

      <rect x="10" y="284" width="460" height="30" rx="5" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="297" textAnchor="middle" fontSize="8" fontWeight="700" fill="#374151">Drain vs Force-Down</text>
      <text x={W/2} y="308" textAnchor="middle" fontSize="8" fill="#374151">Drain = planned graceful removal (no new work; existing work completes). Force-down = immediate removal (health failure or emergency).</text>
    </svg>
  );
}
