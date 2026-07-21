"use client";
// Diagram 3 — Enterprise NAS Hardware Internal Architecture
// Future image: /public/images/articles/nas/nas-hardware-architecture.png
export default function NasHardwareArch() {
  return (
    <svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Enterprise NAS hardware internal architecture"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="340" fill="#f8fafc" rx="12"/>
      <text x="430" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Enterprise NAS Hardware — Internal Architecture</text>

      {/* Controller box */}
      <rect x="30" y="42" width="520" height="180" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="290" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">NAS Controller</text>

      {/* Components inside controller */}
      {[
        { x: 45, y: 68, w: 100, label: "CPU", sub: "NAS OS + protocol processing" },
        { x: 155, y: 68, w: 100, label: "RAM / Cache", sub: "Read & write buffer" },
        { x: 265, y: 68, w: 120, label: "NVRAM / Flash Cache", sub: "Non-volatile write cache" },
        { x: 395, y: 68, w: 140, label: "Storage Controller", sub: "Disk shelf connectivity" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={46} rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
          <text x={c.x + c.w/2} y={c.y + 18} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1e40af">{c.label}</text>
          <text x={c.x + c.w/2} y={c.y + 34} textAnchor="middle" fontSize="7.5" fill="#1d4ed8">{c.sub}</text>
        </g>
      ))}

      {/* NIC ports */}
      <rect x="45" y="126" width="200" height="42" rx="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="145" y="143" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">Data NICs (10/25/100GbE)</text>
      <text x="145" y="157" textAnchor="middle" fontSize="7.5" fill="#1d4ed8">Data Network — multiple ports, redundant</text>
      <rect x="255" y="126" width="130" height="42" rx="5" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="0.8"/>
      <text x="320" y="143" textAnchor="middle" fontSize="9" fontWeight="600" fill="#3730a3">Management Port</text>
      <text x="320" y="157" textAnchor="middle" fontSize="7.5" fill="#4338ca">Dedicated mgmt network</text>
      <rect x="395" y="126" width="140" height="42" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="465" y="143" textAnchor="middle" fontSize="9" fontWeight="600" fill="#166534">PSU A  |  PSU B</text>
      <text x="465" y="157" textAnchor="middle" fontSize="7.5" fill="#16a34a">Redundant — hot-swap</text>

      {/* Connections to outside */}
      <line x1="145" y1="168" x2="145" y2="240" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="145" y="256" textAnchor="middle" fontSize="8.5" fill="#2563eb" fontWeight="600">Ethernet Switches</text>
      <line x1="320" y1="168" x2="320" y2="240" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="320" y="256" textAnchor="middle" fontSize="8.5" fill="#4338ca" fontWeight="600">Management Switch</text>

      {/* Disk shelves */}
      <rect x="570" y="42" width="270" height="180" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="705" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Disk Shelves</text>
      {[0, 1].map(s => (
        <g key={s}>
          <rect x="582" y={70 + s * 70} width="246" height="54" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
          <text x="705" y={90 + s * 70} textAnchor="middle" fontSize="9" fontWeight="600" fill="#166534">Shelf {s + 1}</text>
          {[0,1,2,3,4,5].map(d => (
            <rect key={d} x={590 + d * 36} y={96 + s * 70} width="30" height="22" rx="3"
              fill={d % 2 === 0 ? "#4ade80" : "#86efac"} stroke="#16a34a" strokeWidth="0.5"/>
          ))}
          <text x="705" y={127 + s * 70} textAnchor="middle" fontSize="7.5" fill="#15803d">SAS / NVMe drives — hot-swap</text>
        </g>
      ))}
      <text x="705" y="175" textAnchor="middle" fontSize="7.5" fill="#6b7280">+ additional shelves for expansion</text>

      <text x="430" y="326" textAnchor="middle" fontSize="8.5" fill="#9ca3af">
        Future image: /public/images/articles/nas/nas-hardware-architecture.png
      </text>
    </svg>
  );
}
