"use client";
// DR D6 — DR Recovery Sequence (dependency order)
export default function DrRecoverySequence() {
  const STEP_H  = 38;
  const ARR_H   = 10;

  const phases = [
    {
      phase: "Phase 1 — Infrastructure", phaseColor: "#374151",
      steps: [
        { n:"1", t:"Network / WAN / DR firewall",         s:"DR WAN link · internal switching · firewall rules loaded",    bg:"#f1f5f9", b:"#374151", tc:"#374151" },
        { n:"2", t:"Storage promotion",                   s:"Replication break · volumes promoted read-write · LUN masking",bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
        { n:"3", t:"Compute / hypervisor hosts",          s:"DR servers powered on · VMs registered",                     bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
      ],
    },
    {
      phase: "Phase 2 — Identity (required before all apps)", phaseColor: "#15803d",
      steps: [
        { n:"4", t:"AD Domain Controllers",               s:"Verify replication currency · FSMO accessibility",           bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
        { n:"5", t:"DNS — internal + external",           s:"Internal DNS records · External DNS / GSLB updated · TTL",   bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
        { n:"6", t:"Certificate services / PKI",          s:"CA accessible at DR · Certificate validity verified",         bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
      ],
    },
    {
      phase: "Phase 3 — Database", phaseColor: "#ca8a04",
      steps: [
        { n:"7", t:"Database failover / promotion",       s:"SQL AG / Oracle Data Guard / DB-specific failover",           bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
        { n:"8", t:"Database integrity verification",     s:"Last log applied · integrity check · DBA sign-off",          bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
      ],
    },
    {
      phase: "Phase 4 — Application", phaseColor: "#2563eb",
      steps: [
        { n:"9",  t:"Application servers start",          s:"Dependency order · connection strings to DR DB",             bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
        { n:"10", t:"Application health check",           s:"Services up · no error storms · internal test pass",         bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
      ],
    },
    {
      phase: "Phase 5 — Traffic + Validation", phaseColor: "#7c3aed",
      steps: [
        { n:"11", t:"Load balancer / GSLB update",        s:"Traffic routed to DR endpoints",                             bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
        { n:"12", t:"Business validation",                s:"Smoke test · data spot check · business team sign-off",      bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
      ],
    },
  ];

  const allSteps = phases.reduce((s, p) => s + p.steps.length, 0);
  const phaseLabels = phases.length;
  const PHASE_LABEL_H = 18;
  const totalH = 38 + phaseLabels * PHASE_LABEL_H + allSteps * (STEP_H + ARR_H) + 30;

  let y = 38;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="DR recovery sequence dependency order"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">DR Recovery Sequence</text>
      <text x="240" y="29" textAnchor="middle" fontSize="9.5" fill="#6b7280">Follow dependency order — not just business priority</text>

      {phases.map((phase, pi) => (
        <g key={pi}>
          <text x="18" y={y + 13} fontSize="9.5" fontWeight="700" fill={phase.phaseColor}>{phase.phase}</text>
          {(() => { y += PHASE_LABEL_H; return null; })()}
          {phase.steps.map((step, si) => {
            const stepY = y;
            const isLast = pi === phases.length - 1 && si === phase.steps.length - 1;
            const el = (
              <g key={si}>
                <rect x="10" y={stepY} width="460" height={STEP_H} rx="6" fill={step.bg} stroke={step.b} strokeWidth="1.5"/>
                <rect x="10" y={stepY} width="32" height={STEP_H} rx="6" fill={step.b}/>
                <rect x="32" y={stepY} width="4" height={STEP_H} fill={step.b}/>
                <text x="26" y={stepY + STEP_H/2 + 5} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">{step.n}</text>
                <text x="44" y={stepY + 14} fontSize="10" fontWeight="600" fill={step.tc}>{step.t}</text>
                <text x="44" y={stepY + 28} fontSize="8.5" fill="#6b7280">{step.s}</text>
                {!isLast && (
                  <g>
                    <line x1="240" y1={stepY + STEP_H} x2="240" y2={stepY + STEP_H + ARR_H - 3} stroke={step.b} strokeWidth="1.5"/>
                    <polygon points={`236,${stepY+STEP_H+ARR_H-3} 244,${stepY+STEP_H+ARR_H-3} 240,${stepY+STEP_H+ARR_H}`} fill={step.b}/>
                  </g>
                )}
              </g>
            );
            y += STEP_H + ARR_H;
            return el;
          })}
        </g>
      ))}

      <rect x="10" y={y - ARR_H + 4} width="460" height="20" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y - ARR_H + 17} textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">
        Sequence is application-specific — build from dependency map, not business priority alone
      </text>
    </svg>
  );
}
