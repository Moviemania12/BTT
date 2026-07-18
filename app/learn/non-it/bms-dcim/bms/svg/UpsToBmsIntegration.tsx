"use client";

export default function UpsToBmsIntegration() {
  return (
    <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UPS to BMS integration workflow showing steps from OEM documentation through physical wiring, BMS configuration, point mapping, HMI, alarms and testing">
      <rect width="900" height="500" fill="#ffffff" />
      <text x="450" y="28" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">UPS to BMS Integration — Complete Workflow</text>

      {/* Left column: Physical / UPS side */}
      <rect x="20" y="48" width="200" height="400" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="120" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">UPS / EQUIPMENT SIDE</text>

      {[
        { y: 82, title: "1. Identify UPS", sub: "Make · Model · Firmware\nAvailable comm interfaces" },
        { y: 148, title: "2. OEM Docs", sub: "Modbus register map\nBACnet object list\nSNMP MIB\nComm manual" },
        { y: 234, title: "3. Physical Comm", sub: "RS-485: polarity A/B,\nbaud, parity, slave ID\nEthernet: IP, subnet,\nport, connectivity" },
        { y: 330, title: "4. Test Locally", sub: "OEM software or\nModbus tool confirms\ncorrect register reads" },
      ].map((s, i) => (
        <g key={i}>
          <rect x="30" y={s.y} width="180" height={i === 1 ? 78 : i === 2 ? 88 : 56} rx="6" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="120" y={s.y + 16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">{s.title}</text>
          {s.sub.split("\n").map((t, j) => (
            <text key={j} x="120" y={s.y + 30 + j * 12} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{t}</text>
          ))}
        </g>
      ))}

      {/* Middle arrows */}
      <line x1="220" y1="250" x2="290" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#upArr)" strokeDasharray="5,3" />
      <text x="255" y="244" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">comm</text>

      {/* Right column: BMS side */}
      <rect x="290" y="48" width="590" height="400" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="585" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d">BMS SIDE</text>

      {/* Step boxes on BMS side — 3 columns */}
      {[
        { x: 300, y: 82, title: "5. BMS Driver / Device", sub: "Create device in BMS\nSelect protocol\nEnter device address" },
        { x: 500, y: 82, title: "6. Discover / Create Points", sub: "Auto-discover (BACnet)\nor manually add points\n(Modbus: FC03, reg addr)" },
        { x: 700, y: 82, title: "7. Point Mapping", sub: "Register / object → Tag\nData type: INT16/UINT16\nByte order: Big/Little" },
        { x: 300, y: 188, title: "8. Scaling + Eng. Units", sub: "Raw → engineering unit\ne.g. 0–32767 → 0–100%\nOffset, multiplier, EGU" },
        { x: 500, y: 188, title: "9. HMI Graphics", sub: "Create graphic page\nBind point to display\nColor / status logic" },
        { x: 700, y: 188, title: "10. Alarm Config", sub: "High/low limits\nPriority, delay/debounce\nAck required?" },
        { x: 300, y: 294, title: "11. Trend Config", sub: "Log interval\nHistorian retention\nReport generation" },
        { x: 500, y: 294, title: "12. Point-to-Point Test", sub: "BMS value vs\nUPS local display\nOEM software cross-check" },
        { x: 700, y: 294, title: "13. Commission + Document", sub: "Points list sign-off\nLoop test records\nAs-built drawings" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="185" height="88" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x={b.x + 92} y={b.y + 16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">{b.title}</text>
          {b.sub.split("\n").map((t, j) => (
            <text key={j} x={b.x + 92} y={b.y + 31 + j * 13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{t}</text>
          ))}
        </g>
      ))}

      {/* UPS points reference */}
      <rect x="300" y="392" width="570" height="46" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="585" y="410" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0c4a6e">Typical UPS BMS Points (verify with OEM register map):</text>
      <text x="585" y="424" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Input V/A/Hz · Output V/A/Hz · Load % · Battery V · Battery SOC % · Battery Runtime · Bypass status · Operating mode · Common alarm · Critical alarm</text>

      <text x="450" y="490" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Register addresses, object instances and scaling vary by UPS make, model and firmware. Always verify against OEM documentation.</text>

      <defs>
        <marker id="upArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0,7 3.5,0 7" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
