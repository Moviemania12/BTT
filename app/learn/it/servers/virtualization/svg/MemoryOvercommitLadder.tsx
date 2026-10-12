"use client";
export default function MemoryOvercommitLadder() {
  const f = "Arial,sans-serif";
  const steps = [
    { y: 56, c: "#16a34a", bg: "#f0fdf4", t: "1. Plenty of free host memory", s: "VMs get what they ask for. Page sharing / large pages may be used.", l: "No visible impact" },
    { y: 120, c: "#65a30d", bg: "#f7fee7", t: "2. Host memory getting low", s: "Hypervisor starts balloon driver inside VMs: it asks guests to give back unused pages.", l: "Small impact — guest OS chooses what to free" },
    { y: 184, c: "#d97706", bg: "#fffbeb", t: "3. Under pressure", s: "Memory compression: hypervisor compresses cold pages in RAM instead of paging them out.", l: "CPU cost, still much faster than disk" },
    { y: 248, c: "#ea580c", bg: "#fff7ed", t: "4. Severe pressure", s: "Hypervisor swapping: VM RAM is written to host disk / swap file.", l: "Huge slowdown (disk is ~1000× slower than RAM)" },
    { y: 312, c: "#dc2626", bg: "#fef2f2", t: "5. Out of options", s: "VMs freeze or are killed; host may become unresponsive. HA may restart VMs elsewhere.", l: "Outage" },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Memory overcommit ladder: from free memory, to ballooning, compression, hypervisor swapping and outage, each step getting more expensive" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Memory Overcommit — What Happens as the Host Runs Out of RAM</text>
      {steps.map((k, i) => (
        <g key={i}>
          <rect x={30 + i * 18} y={k.y} width={560 - i * 18} height="54" rx="7" fill={k.bg} stroke={k.c} strokeWidth="2" />
          <text x={44 + i * 18} y={k.y + 20} fontFamily={f} fontSize="11" fontWeight="700" fill={k.c}>{k.t}</text>
          <text x={44 + i * 18} y={k.y + 38} fontFamily={f} fontSize="9" fill="#374151">{k.s}</text>
          <text x="610" y={k.y + 22} fontFamily={f} fontSize="9.5" fontWeight="700" fill={k.c}>{k.l.split(" — ")[0]}</text>
          <text x="610" y={k.y + 38} fontFamily={f} fontSize="9" fill="#374151">{k.l.includes(" — ") ? k.l.split(" — ")[1] : ""}</text>
        </g>
      ))}
      <text x="30" y="386" fontFamily={f} fontSize="9.5" fill="#374151">Best practice: keep production clusters at step 1. Use reservations for critical VMs. Size RAM for N+1 host failure. Names and techniques vary per hypervisor.</text>
    </svg>
  );
}
