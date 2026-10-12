"use client";
export default function VirtTroubleshootFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, c: string, bg: string, a: string, b?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + (b ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{a}</text>
      {b && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{b}</text>}
    </g>
  );
  const arr = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" markerEnd="url(#vtArr)" />;
  return (
    <svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Virtualisation troubleshooting flow: is it one VM or many, guest OS check, host CPU ready, memory pressure, storage latency, network, then fix and validate" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="vtArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
      <rect width="860" height="480" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">VM Troubleshooting Flow — Slow or Down</text>
      {box(330, 42, 200, 36, "#dc2626", "#fef2f2", "Complaint: VM slow / down")}
      {arr(430, 78, 430, 102)}
      {box(290, 102, 280, 44, "#2563eb", "#eff6ff", "One VM, or many on a host / cluster?", "check scope first")}
      {arr(290, 124, 170, 124)}
      <text x="230" y="117" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#2563eb">ONE VM</text>
      {box(30, 102, 140, 44, "#2563eb", "#dbeafe", "Inside the guest", "process CPU, memory, disk, logs")}
      {arr(100, 146, 100, 178)}
      {box(20, 178, 160, 64, "#2563eb", "#fff", "Guest healthy but slow?", "then look at host-side view of that VM (ready, ballooning, latency)")}
      {arr(570, 124, 680, 124)}
      <text x="625" y="117" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">MANY</text>
      {box(680, 102, 160, 44, "#dc2626", "#fee2e2", "Host / cluster level", "events, alarms, HA state")}
      {arr(760, 146, 760, 172)}
      {box(640, 172, 200, 40, "#d97706", "#fffbeb", "CPU: ready time high?", "overcommit, big VMs, noisy VM")}
      {arr(740, 212, 740, 238)}
      {box(640, 238, 200, 40, "#7c3aed", "#f5f3ff", "Memory: balloon / swap / compression?", "host RAM, reservations")}
      {arr(740, 278, 740, 304)}
      {box(640, 304, 200, 40, "#0891b2", "#ecfeff", "Storage: latency, datastore space?", "paths, array, snapshots")}
      {arr(740, 344, 740, 370)}
      {box(640, 370, 200, 40, "#16a34a", "#f0fdf4", "Network: uplinks, VLAN, drops?", "teaming, switch ports")}
      {arr(640, 390, 560, 428)}
      {arr(180, 230, 320, 440)}
      {box(310, 420, 260, 44, "#059669", "#ecfdf5", "Fix → validate → document", "metrics back to baseline, ticket closed")}
      <text x="430" y="476" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Look at the host view of the VM, not only the guest view: ready time, balloon and datastore latency are invisible inside the guest.</text>
    </svg>
  );
}
