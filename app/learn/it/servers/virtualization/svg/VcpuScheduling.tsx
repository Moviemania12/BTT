"use client";
export default function VcpuScheduling() {
  const f = "Arial,sans-serif";
  const colors = ["#2563eb", "#16a34a", "#d97706", "#7c3aed", "#dc2626", "#0891b2"];
  const slots = [
    [0, 1, 2, 0, 3, 0],
    [1, 2, 3, 4, 0, 5],
    [3, 4, 5, 5, 2, 4],
    [5, 3, 4, 1, 1, 2],
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="vCPU scheduling: 6 VMs sharing 4 physical cores over time slices, with waiting vCPUs counted as CPU ready time" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">vCPU Scheduling — 6 vCPUs Sharing 4 Physical Cores</text>
      <text x="40" y="60" fontFamily={f} fontSize="10" fontWeight="700" fill="#374151">Physical cores (rows) over time →</text>
      {slots.map((row, r) => (
        <g key={r}>
          <text x="36" y={92 + r * 40} textAnchor="end" fontFamily={f} fontSize="10" fontWeight="700" fill="#374151">Core {r}</text>
          {row.map((v, t) => (
            <g key={t}>
              <rect x={50 + t * 80} y={72 + r * 40} width="76" height="32" rx="4" fill={colors[v]} />
              <text x={88 + t * 80} y={93 + r * 40} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#fff">vCPU-{v + 1}</text>
            </g>
          ))}
        </g>
      ))}
      <text x="250" y="244" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">time slice 1 → 6 (milliseconds each in real life)</text>
      <rect x="560" y="60" width="280" height="190" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="700" y="82" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#991b1b">CPU Ready Time</text>
      <text x="700" y="104" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">A vCPU that WANTS to run but</text>
      <text x="700" y="118" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">has no free physical core waits.</text>
      <text x="700" y="136" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">That waiting time = “ready time”.</text>
      <text x="700" y="162" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#991b1b">Guest shows low CPU usage but</text>
      <text x="700" y="176" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#991b1b">the VM feels slow → check ready.</text>
      <text x="700" y="202" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Rule of thumb many teams use:</text>
      <text x="700" y="216" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">investigate when ready is a few % per vCPU</text>
      <text x="700" y="230" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">(thresholds differ by platform and workload)</text>
      <rect x="20" y="266" width="820" height="124" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="286" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Design lessons from this picture</text>
      <text x="430" y="306" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">① Overcommit works because VMs rarely all want CPU at the same moment. If they do, vCPUs queue.</text>
      <text x="430" y="322" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">② More vCPUs ≠ faster. A big VM (e.g. 16 vCPU) needs many cores free at once and can wait longer than a small VM. Right-size.</text>
      <text x="430" y="338" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">③ Keep a VM inside one NUMA node where possible (vNUMA) so its RAM is local to its cores — see CPU article.</text>
      <text x="430" y="354" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">④ Hyperthreads are not full cores: 2 threads on one core share its execution units.</text>
      <text x="430" y="376" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Illustrative schedule; real hypervisors use more complex schedulers.</text>
    </svg>
  );
}
