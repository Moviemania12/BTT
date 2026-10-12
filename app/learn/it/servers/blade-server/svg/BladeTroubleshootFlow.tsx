"use client";
export default function BladeTroubleshootFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, c: string, bg: string, a: string, b?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + (b ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{a}</text>
      {b && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{b}</text>}
    </g>
  );
  const arr = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" markerEnd="url(#bfArr)" />;
  return (
    <svg viewBox="0 0 860 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blade troubleshooting flow: one blade or many, chassis alarms, power budget, I/O module path, thermal, then fix and validate" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="bfArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
      <rect width="860" height="470" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Blade Environment Troubleshooting Flow</text>
      {box(330, 44, 200, 38, "#dc2626", "#fef2f2", "Alert / outage report")}
      {arr(430, 82, 430, 106)}
      {box(290, 106, 280, 46, "#2563eb", "#eff6ff", "One blade affected, or many?", "check which slots / which chassis")}
      {arr(290, 129, 170, 129)}
      <text x="230" y="122" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#2563eb">ONE</text>
      {box(30, 106, 140, 46, "#2563eb", "#dbeafe", "Blade-level", "BMC log, reseat, swap slot")}
      {arr(100, 152, 100, 184)}
      {box(20, 184, 160, 70, "#2563eb", "#fff", "Compare with known-good", "same slot other blade / same blade other slot → blade or slot?")}
      {arr(570, 129, 680, 129)}
      <text x="625" y="122" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">MANY</text>
      {box(680, 106, 160, 46, "#dc2626", "#fee2e2", "Chassis-level", "CMC alarms first")}
      {arr(760, 152, 760, 184)}
      {box(640, 184, 200, 44, "#7c3aed", "#f5f3ff", "Power: PSUs / feeds / budget?", "PSU fault, A/B feed lost, cap hit")}
      {arr(740, 228, 740, 256)}
      {box(640, 256, 200, 44, "#0891b2", "#ecfeff", "Network: I/O module path?", "module health, uplinks, VLAN, firmware")}
      {arr(740, 300, 740, 328)}
      {box(640, 328, 200, 44, "#d97706", "#fffbeb", "Thermal: fans, blanking panels?", "failed fan, empty slot open, hot aisle")}
      {arr(640, 350, 560, 400)}
      {arr(180, 240, 330, 410)}
      {box(300, 390, 280, 46, "#059669", "#ecfdf5", "Fix → validate → document", "check logs clear, redundancy restored")}
      <text x="430" y="456" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Never reseat or reset a blade in a chassis with an active power or thermal alarm before reading the CMC log.</text>
    </svg>
  );
}
