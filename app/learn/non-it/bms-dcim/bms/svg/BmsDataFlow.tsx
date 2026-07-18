"use client";

export default function BmsDataFlow() {
  const steps = [
    { icon: "⚡", title: "Physical\nEquipment", sub: "UPS / PAC / DG / Meter", col: "#fee2e2", border: "#ef4444", tc: "#7f1d1d" },
    { icon: "📡", title: "Sensor /\nController", sub: "Measures & exposes value\nlocal display / output", col: "#fef3c7", border: "#f59e0b", tc: "#78350f" },
    { icon: "🔌", title: "Comm\nInterface", sub: "RS-485 / Ethernet\nDry Contact / 4-20mA", col: "#fff7ed", border: "#f97316", tc: "#7c2d12" },
    { icon: "🔄", title: "Gateway\n(if required)", sub: "Protocol conversion\nModbus → BACnet", col: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { icon: "🖥️", title: "BMS\nController/Server", sub: "Polls / receives data\ndriver / integration svc", col: "#e0f2fe", border: "#0ea5e9", tc: "#0c4a6e" },
    { icon: "🗄️", title: "Database /\nHistorian", sub: "Point value stored\nwith timestamp", col: "#f0fdf4", border: "#16a34a", tc: "#14532d" },
    { icon: "🏷️", title: "Tag / Point\nObject", sub: "Address mapped\nScaled to eng. units", col: "#faf5ff", border: "#a855f7", tc: "#6b21a8" },
    { icon: "📊", title: "HMI\nGraphic", sub: "Live value displayed\non operator screen", col: "#f0f9ff", border: "#2563eb", tc: "#1e3a8a" },
    { icon: "🔔", title: "Alarm /\nTrend / Report", sub: "Alerts on limit breach\nHistorical log", col: "#fef2f2", border: "#dc2626", tc: "#991b1b" },
  ];

  return (
    <svg viewBox="0 0 920 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BMS data flow from physical equipment through sensor, gateway, controller, database, tag, HMI graphic to alarm and trend">
      <rect width="920" height="340" fill="#ffffff" />
      <text x="460" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">BMS Data Flow — Physical Equipment to HMI</text>

      {steps.map((s, i) => {
        const x = 15 + i * 100;
        return (
          <g key={i}>
            <rect x={x} y="45" width="90" height="130" rx="8" fill={s.col} stroke={s.border} strokeWidth="1.5" />
            <text x={x + 45} y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="18">{s.icon}</text>
            {s.title.split("\n").map((t, j) => (
              <text key={j} x={x + 45} y={90 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={s.tc}>{t}</text>
            ))}
            {s.sub.split("\n").map((t, j) => (
              <text key={j} x={x + 45} y={124 + j * 12} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{t}</text>
            ))}
            {i < steps.length - 1 && (
              <line x1={x + 90} y1="110" x2={x + 98} y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#dfArr)" />
            )}
          </g>
        );
      })}

      {/* Data quality annotation */}
      <rect x="15" y="190" width="890" height="36" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="460" y="207" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#374151">Data Quality Tags (at BMS point):</text>
      <text x="460" y="220" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">Good · Bad · Uncertain · Communication Timeout · Stale · Override · Out-of-Range</text>

      {/* Annotation boxes below */}
      <text x="60" y="248" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">Physical\nworld</text>
      <text x="360" y="248" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">Protocol\nlayer</text>
      <text x="560" y="248" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">Address →\nTag mapping</text>
      <text x="760" y="248" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">Operator\ninterface</text>

      {/* Key terms row */}
      <rect x="15" y="265" width="890" height="62" rx="6" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="1" />
      <text x="30" y="282" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af">Key Terms:</text>
      <text x="30" y="295" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">• Point / Tag: Named reference to one data value in BMS  • Object: BACnet representation (AI, AO, BI, BO, AV …)  • Register: Modbus data location (Holding, Input, Coil, Discrete Input)</text>
      <text x="30" y="308" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">• Scaling: raw count → engineering unit (e.g. 0–4095 raw → 0–100 % load)  • COV: BACnet Change of Value subscription — controller notifies BMS when value changes by deadband</text>
      <text x="30" y="321" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">• Polling interval: BMS reads at fixed period (Modbus)  • Timeout: no response → data quality "Bad" / "Communication Failure" status</text>

      <defs>
        <marker id="dfArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0,7 3.5,0 7" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
