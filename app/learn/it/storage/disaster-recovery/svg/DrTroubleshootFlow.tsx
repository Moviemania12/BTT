"use client";
// DR D8 — DR Failover Troubleshooting Flow
export default function DrTroubleshootFlow() {
  const STEP_H  = 46;
  const ARR_H   = 10;

  const checks = [
    { q: "1. Network / WAN / DR firewall OK?",          fix: "DR WAN link up? Firewall active? Routing correct? OOB access?" },
    { q: "2. DR storage promoted / read-write?",        fix: "Replication status · break replication per runbook · LUN masking" },
    { q: "3. Compute / VMs running at DR?",             fix: "Hypervisor host health · VM registration in DR vCenter / Hyper-V" },
    { q: "4. AD / Identity online at DR?",              fix: "DC replication currency · AD site config · FSMO accessibility" },
    { q: "5. DNS resolving at DR?",                     fix: "Internal DNS records · External DNS updated? · TTL propagation" },
    { q: "6. Database available?",                      fix: "Failover/promotion done? Log apply complete? DBA integrity check" },
    { q: "7. App started in correct sequence?",         fix: "Dependency order · connection strings to DR DB · service start" },
    { q: "8. Traffic reaching DR?",                     fix: "LB configured? GSLB updated? External DNS propagated? Ports?" },
    { q: "9. Validation passed?",                       fix: "Business smoke test · data spot check · integrations · auth" },
  ];

  const totalH = 94 + checks.length * (STEP_H + ARR_H) + 66;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="DR failover troubleshooting systematic flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">DR Failover Troubleshooting</text>
      <rect x="50" y="24" width="380" height="26" rx="13" fill="#1e293b"/>
      <text x="240" y="41" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f8fafc">DR failover in progress — something not working</text>

      <rect x="10" y="56" width="460" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="240" y="68" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400e">⚠ Identify specific symptom FIRST — read all error messages</text>
      <text x="240" y="80" textAnchor="middle" fontSize="9.5" fill="#92400e">Consult runbook owner if any step is unclear — do NOT guess in production failover</text>

      {checks.map((check, i) => {
        const y = 90 + i * (STEP_H + ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
            <text x="18" y={y + 13} fontSize="10" fontWeight="600" fill="#1e40af">{check.q}</text>
            <rect x="16" y={y + 17} width="38" height="15" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
            <text x="35" y={y + 28} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">YES ↓</text>
            <rect x="60" y={y + 17} width="390" height="15" rx="3" fill="#fee2e2" stroke="#ea580c" strokeWidth="1"/>
            <text x="67" y={y + 28} fontSize="8.5" fill="#c2410c">NO → {check.fix}</text>
            <line x1="16" y1={y + 36} x2="464" y2={y + 36} stroke="#dbeafe" strokeWidth="1"/>
            <text x="240" y={y + 44} textAnchor="middle" fontSize="8.5" fill="#6b7280">Resolve per runbook → re-test this layer</text>
            {i < checks.length - 1 && (
              <g>
                <line x1="240" y1={y+STEP_H} x2="240" y2={y+STEP_H+ARR_H-3} stroke="#2563eb" strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-3} 245,${y+STEP_H+ARR_H-3} 240,${y+STEP_H+ARR_H}`} fill="#2563eb"/>
              </g>
            )}
          </g>
        );
      })}

      {(() => {
        const sy = 90 + checks.length * (STEP_H + ARR_H);
        return (
          <g>
            <rect x="70" y={sy} width="340" height="26" rx="13" fill="#16a34a"/>
            <text x="240" y={sy + 17} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">All layers validated — DR operational</text>
            <rect x="10" y={sy + 32} width="460" height="28" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
            <text x="240" y={sy + 44} textAnchor="middle" fontSize="13" fontWeight="800" fill="#991b1b">DR DECLARED ≠ DR COMPLETE</text>
            <text x="240" y={sy + 57} textAnchor="middle" fontSize="9" fill="#dc2626">Business validation + sign-off required before closing incident</text>
          </g>
        );
      })()}
    </svg>
  );
}
