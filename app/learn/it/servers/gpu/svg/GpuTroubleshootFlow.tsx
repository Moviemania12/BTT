"use client";
export default function GpuTroubleshootFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, c: string, bg: string, l1: string, l2?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + (l2 ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{l1}</text>
      {l2 && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{l2}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 860 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GPU troubleshooting flow: alert, check GPU visibility, check XID and ECC errors, throttling, performance, isolate, fix and validate" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="tfArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
      <rect width="860" height="470" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">GPU Troubleshooting Flow</text>
      {box(330, 44, 200, 38, "#dc2626", "#fef2f2", "Alert / job failed / slow job")}
      <line x1="430" y1="82" x2="430" y2="104" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      {box(300, 104, 260, 44, "#2563eb", "#eff6ff", "nvidia-smi: all GPUs visible?", "count matches inventory?")}
      <line x1="300" y1="126" x2="170" y2="126" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="235" y="119" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">NO</text>
      {box(30, 104, 140, 44, "#dc2626", "#fee2e2", "GPU missing", "XID 79 / fell off bus")}
      <line x1="100" y1="148" x2="100" y2="176" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      {box(20, 176, 160, 78, "#dc2626", "#fff", "Check in order:", "power cable → riser/seat → BIOS → BMC log → thermal → swap")}
      <line x1="430" y1="148" x2="430" y2="176" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="446" y="166" fontFamily={f} fontSize="9" fontWeight="700" fill="#059669">YES</text>
      {box(300, 176, 260, 44, "#7c3aed", "#f5f3ff", "dmesg / DCGM: XID or ECC errors?", "XID 48, 63/64, 74, 94/95")}
      <line x1="560" y1="198" x2="650" y2="198" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="605" y="191" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">YES</text>
      {box(650, 170, 190, 58, "#7c3aed", "#ede9fe", "Memory / NVLink fault", "drain node → reset GPU → if repeats: RMA")}
      <line x1="430" y1="220" x2="430" y2="248" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="446" y="238" fontFamily={f} fontSize="9" fontWeight="700" fill="#059669">NO</text>
      {box(300, 248, 260, 44, "#d97706", "#fffbeb", "Throttle reasons set?", "thermal / power cap / HW slowdown")}
      <line x1="560" y1="270" x2="650" y2="270" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="605" y="263" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">YES</text>
      {box(650, 244, 190, 52, "#d97706", "#fef3c7", "Cooling / power issue", "inlet temp, coolant flow, PSU, cap")}
      <line x1="430" y1="292" x2="430" y2="320" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      <text x="446" y="310" fontFamily={f} fontSize="9" fontWeight="700" fill="#059669">NO</text>
      {box(260, 320, 340, 52, "#0891b2", "#ecfeff", "Slow but healthy? Look outside the GPU", "data loader, NCCL, topology (nvidia-smi topo -m), driver/CUDA versions")}
      <line x1="430" y1="372" x2="430" y2="398" stroke="#475569" strokeWidth="2" markerEnd="url(#tfArr)" />
      {box(250, 398, 360, 44, "#059669", "#ecfdf5", "Fix → validate: dcgmi diag -r 3 + nccl-tests", "then return to pool and write the ticket")}
      <text x="430" y="460" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Isolate the node from the scheduler first — never debug under live jobs.</text>
    </svg>
  );
}
