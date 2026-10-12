"use client";
export default function ChassisRedundancy() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, c: string, bg: string, a: string, b?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + (b ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{a}</text>
      {b && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">{b}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chassis redundancy: A and B power feeds into PSU groups, N+1 fan modules, dual management modules and dual I/O modules all serving the blades" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="440" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Redundancy Inside and Around the Chassis</text>
      {box(30, 50, 150, 44, "#dc2626", "#fef2f2", "Feed A (UPS A)", "PDU A → C19/C20")}
      {box(30, 110, 150, 44, "#2563eb", "#eff6ff", "Feed B (UPS B)", "PDU B → C19/C20")}
      <rect x="230" y="44" width="600" height="360" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2.5" />
      <text x="530" y="64" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#6b7280">BLADE CHASSIS</text>
      {[0, 1, 2].map((i) => <g key={i}>{box(250 + i * 62, 80, 54, 54, "#dc2626", "#fee2e2", "PSU " + (i + 1), "Feed A")}</g>)}
      {[3, 4, 5].map((i) => <g key={i}>{box(250 + i * 62, 80, 54, 54, "#2563eb", "#dbeafe", "PSU " + (i + 1), "Feed B")}</g>)}
      <line x1="180" y1="72" x2="250" y2="100" stroke="#dc2626" strokeWidth="2" />
      <line x1="180" y1="132" x2="436" y2="104" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="152" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Shared 12 V power bus — any surviving PSU group keeps all blades up (if load fits)</text>
      <rect x="250" y="164" width="560" height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="530" y="188" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#713f12">Power bus + midplane distribution</text>
      <rect x="250" y="218" width="260" height="64" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="380" y="238" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#166534">Blades (up to N)</text>
      <text x="380" y="256" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">draw power, cooling, network</text>
      <text x="380" y="270" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">and management from chassis</text>
      {box(530, 218, 130, 64, "#0891b2", "#ecfeff", "Fan modules", "N+1 — one can fail")}
      {box(676, 218, 134, 64, "#7c3aed", "#f5f3ff", "Mgmt modules", "active + standby")}
      {box(250, 300, 260, 44, "#d97706", "#fffbeb", "I/O module Bay 1 (Fabric A)", "uplinks → ToR 1")}
      {box(530, 300, 280, 44, "#d97706", "#fffbeb", "I/O module Bay 2 (Fabric B)", "uplinks → ToR 2")}
      <text x="530" y="368" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Chassis-level redundancy protects against ONE component failing.</text>
      <text x="530" y="384" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">It does not protect against losing the whole chassis (firmware bug, midplane fault, maintenance).</text>
      <rect x="30" y="180" width="170" height="110" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="115" y="202" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#78350f">Check before relying on it</text>
      <text x="115" y="222" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Total load must fit on</text>
      <text x="115" y="236" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">the surviving PSUs.</text>
      <text x="115" y="256" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Mode (N+1 / grid / 2N)</text>
      <text x="115" y="270" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">is set in chassis config.</text>
      <text x="530" y="424" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">PSU counts, ratings and redundancy modes are illustrative — verify per OEM chassis.</text>
    </svg>
  );
}
