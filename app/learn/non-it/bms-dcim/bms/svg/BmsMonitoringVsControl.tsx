"use client";

export default function BmsMonitoringVsControl() {
  return (
    <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BMS monitoring versus control diagram showing read-only monitoring zone and commandable control zone with permission and interlock boundary">
      <rect width="900" height="400" fill="#ffffff" />
      <text x="450" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">BMS — Monitoring vs Control</text>

      {/* Monitoring zone */}
      <rect x="20" y="42" width="390" height="320" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
      <text x="215" y="66" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#14532d">MONITORING ZONE</text>
      <text x="215" y="82" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#166534">Read-Only · No commands sent to equipment</text>

      {[
        "UPS output voltage (read)",
        "UPS load % (read)",
        "UPS battery SOC % (read)",
        "UPS operating mode (read)",
        "DG run status (read)",
        "Fuel level (read, if sensor present)",
        "PAC supply air temp (read)",
        "Room temperature (read)",
        "Humidity (read)",
        "Energy meter kWh (read)",
        "Fire alarm status (read from FA panel)",
        "Water leak sensor (read)",
      ].map((t, i) => (
        <g key={i}>
          <circle cx="46" cy={100 + i * 22} r="4" fill="#16a34a" />
          <text x="58" y={104 + i * 22} fontFamily="Arial,sans-serif" fontSize="10" fill="#374151">{t}</text>
        </g>
      ))}

      {/* Boundary */}
      <rect x="422" y="42" width="56" height="320" rx="0" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="450" y="180" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" transform="rotate(90 450 200)">AUTHORIZATION · INTERLOCK · DESIGN BOUNDARY</text>
      <line x1="450" y1="42" x2="450" y2="362" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,4" />

      {/* Control zone */}
      <rect x="490" y="42" width="390" height="320" rx="10" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="685" y="66" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#78350f">CONTROL ZONE</text>
      <text x="685" y="82" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#92400e">Requires: design · authorization · risk assessment · interlocks</text>

      {[
        { t: "HVAC setpoint change (read/write)", ok: true },
        { t: "AHU fan speed (commandable)", ok: true },
        { t: "Lighting on/off schedule (write)", ok: true },
        { t: "PAC supply temp setpoint (write)", ok: true },
        { t: "UPS bypass command — careful", ok: false },
        { t: "DG start/stop — requires auth + interlock", ok: false },
        { t: "Fire suppression command — NOT via BMS", ok: false },
        { t: "Access door release — NOT via BMS", ok: false },
      ].map((b, i) => (
        <g key={i}>
          <circle cx="516" cy={100 + i * 24} r="4" fill={b.ok ? "#f59e0b" : "#dc2626"} />
          <text x="528" y={104 + i * 24} fontFamily="Arial,sans-serif" fontSize="10" fill={b.ok ? "#78350f" : "#7f1d1d"}>{b.t}</text>
        </g>
      ))}

      {/* Warning box */}
      <rect x="496" y="300" width="378" height="52" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="318" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b">⚠️ Critical Principle</text>
      <text x="685" y="332" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#7f1d1d">Fire, security, and life-safety functions must NOT</text>
      <text x="685" y="346" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#7f1d1d">be controlled through BMS unless specifically designed and approved.</text>

      <text x="450" y="390" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Control capability and permissions depend on project design, system architecture, OEM platform and client policy</text>
    </svg>
  );
}
