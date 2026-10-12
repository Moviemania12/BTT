"use client";
export default function CrossChassisPlacement() {
  const f = "Arial,sans-serif";
  const vm = (x: number, y: number, c: string, t: string) => (
    <g><rect x={x} y={y} width="52" height="22" rx="4" fill={c} /><text x={x + 26} y={y + 15} textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#fff">{t}</text></g>
  );
  const chassis = (x: number, name: string, dead: boolean) => (
    <g>
      <rect x={x} y="60" width="360" height="220" rx="10" fill={dead ? "#fee2e2" : "#f8fafc"} stroke={dead ? "#dc2626" : "#222"} strokeWidth="2.5" strokeDasharray={dead ? "6 4" : "0"} />
      <text x={x + 180} y="82" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill={dead ? "#991b1b" : "#111827"}>{name}{dead ? " — FAILED / IN MAINTENANCE" : ""}</text>
      {[0, 1, 2].map((b) => (
        <g key={b}>
          <rect x={x + 16 + b * 112} y="96" width="104" height="100" rx="5" fill={dead ? "#fecaca" : "#eff6ff"} stroke={dead ? "#dc2626" : "#2563eb"} />
          <text x={x + 68 + b * 112} y="112" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#111827">Blade {b + 1}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-chassis placement: two clusters where web, app and database VM pairs are split across two chassis so that one chassis failure leaves one copy running" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Cross-Chassis Placement — Survive a Whole Chassis Outage</text>
      {chassis(30, "Chassis 1", false)}
      {chassis(470, "Chassis 2", false)}
      {vm(48, 126, "#16a34a", "Web-1")}{vm(48, 154, "#7c3aed", "DB-1")}
      {vm(160, 126, "#d97706", "App-1")}{vm(160, 154, "#0891b2", "Cache-1")}
      {vm(272, 126, "#16a34a", "Web-3")}
      {vm(488, 126, "#16a34a", "Web-2")}{vm(488, 154, "#7c3aed", "DB-2")}
      {vm(600, 126, "#d97706", "App-2")}{vm(600, 154, "#0891b2", "Cache-2")}
      {vm(712, 126, "#16a34a", "Web-4")}
      <text x="210" y="226" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Each service has copies on both chassis</text>
      <text x="650" y="226" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">(anti-affinity rule: never put both on one chassis)</text>
      <text x="210" y="248" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Total load per chassis ≤ 50% of the surviving capacity</text>
      <rect x="30" y="296" width="800" height="104" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="318" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#78350f">What happens when Chassis 1 fails</text>
      <text x="430" y="338" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">① Hypervisor cluster detects lost hosts → HA restarts VMs on Chassis 2 (or the load balancer drops dead nodes).</text>
      <text x="430" y="354" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">② Services with copies on Chassis 2 (Web-2, DB-2…) keep serving; clusters stay quorate if witness/quorum is outside the chassis.</text>
      <text x="430" y="370" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">③ Chassis 2 needs spare CPU/RAM to absorb the restarted VMs — that is the N+1 chassis capacity rule.</text>
      <text x="430" y="388" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Same idea applies to bare-metal clusters and Kubernetes nodes: spread across chassis with topology / anti-affinity labels.</text>
    </svg>
  );
}
