"use client";

export default function BmsPointMappingBinding() {
  return (
    <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BMS point mapping flow from physical address through register or object instance to tag name scaling engineering units alarm limits and trend log">
      <rect width="900" height="460" fill="#ffffff" />
      <text x="450" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">BMS Point Mapping and Data Binding</text>

      {/* Central flow — top horizontal */}
      {[
        { x: 20, col: "#fee2e2", bc: "#ef4444", tc: "#7f1d1d", title: "Physical\nAddress", lines: ["Modbus: Slave ID 1", "Register HR 0x0030", "FC 03 Read"] },
        { x: 160, col: "#fef3c7", bc: "#f59e0b", tc: "#78350f", title: "BMS\nPoint/Tag", lines: ["UPS_1.Output_Load_Pct", "Linked to device:", "UPS-Room-A / Dev-1"] },
        { x: 300, col: "#ede9fe", bc: "#7c3aed", tc: "#4c1d95", title: "Data Type\n& Byte Order", lines: ["UINT16 (unsigned 16-bit)", "Big Endian", "Value: 0 – 32767 raw"] },
        { x: 440, col: "#f0fdf4", bc: "#16a34a", tc: "#14532d", title: "Scaling\nFormula", lines: ["Eng. value =", "(raw × 100) ÷ 32767", "Range: 0.00 – 100.00"] },
        { x: 580, col: "#e0f2fe", bc: "#0ea5e9", tc: "#0c4a6e", title: "Engineering\nUnit", lines: ["% (Percent)", "Display: 0.0 – 100.0 %", "2 decimal places"] },
        { x: 720, col: "#f0f9ff", bc: "#2563eb", tc: "#1e3a8a", title: "HMI\nBinding", lines: ["Graphic: UPS Room A", "Object: LoadBar", "Color: Green/Yellow/Red"] },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="45" width="130" height="110" rx="8" fill={b.col} stroke={b.bc} strokeWidth="1.5" />
          {b.title.split("\n").map((t, j) => (
            <text key={j} x={b.x + 65} y={66 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={b.tc}>{t}</text>
          ))}
          {b.lines.map((t, j) => (
            <text key={j} x={b.x + 65} y={100 + j * 13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{t}</text>
          ))}
          {i < 5 && (
            <line x1={b.x + 130} y1="100" x2={b.x + 158} y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#pmArr)" />
          )}
        </g>
      ))}

      {/* BACnet example row */}
      <text x="450" y="175" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#374151">BACnet Equivalent (same point, different protocol):</text>
      {[
        { x: 20, col: "#fee2e2", bc: "#ef4444", tc: "#7f1d1d", title: "BACnet\nObject", lines: ["Device ID: 1001", "Object: AI 5", "(Analog Input, Instance 5)"] },
        { x: 175, col: "#fef3c7", bc: "#f59e0b", tc: "#78350f", title: "Property", lines: ["Present_Value", "Units: NO_UNITS or %", "Read via ReadProperty"] },
        { x: 330, col: "#f0fdf4", bc: "#16a34a", tc: "#14532d", title: "COV\nSubscription", lines: ["Subscribe to AI 5", "COV Increment: 0.5", "Notify on change ≥ 0.5"] },
        { x: 485, col: "#e0f2fe", bc: "#0ea5e9", tc: "#0c4a6e", title: "Tag in\nBMS", lines: ["UPS_1.Output_Load_Pct", "Source: BACnet AI 5", "Units override: %"] },
        { x: 640, col: "#f0f9ff", bc: "#2563eb", tc: "#1e3a8a", title: "Same\nHMI Binding", lines: ["Identical graphic object", "Protocol-transparent", "to operator"] },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="185" width="145" height="90" rx="8" fill={b.col} stroke={b.bc} strokeWidth="1.5" />
          {b.title.split("\n").map((t, j) => (
            <text key={j} x={b.x + 72} y={204 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={b.tc}>{t}</text>
          ))}
          {b.lines.map((t, j) => (
            <text key={j} x={b.x + 72} y={232 + j * 13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{t}</text>
          ))}
          {i < 4 && (
            <line x1={b.x + 145} y1="230" x2={b.x + 173} y2="230" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pmArr)" />
          )}
        </g>
      ))}

      {/* Alarm limits + trend boxes */}
      <rect x="20" y="295" width="415" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="227" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">Alarm Limits (configured per project policy)</text>
      <text x="35" y="330" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• High-High (Critical): e.g. Load ≥ 95% → Critical alarm</text>
      <text x="35" y="343" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• High (Warning): e.g. Load ≥ 80% → Warning alarm</text>
      <text x="35" y="356" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Normal band: e.g. 0% – 79%</text>
      <text x="35" y="369" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Deadband / Hysteresis: prevents alarm toggling at limit boundary</text>
      <text x="35" y="382" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Delay: alarm must persist N seconds before triggering</text>

      <rect x="460" y="295" width="420" height="100" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="670" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">Trend Logging</text>
      <text x="475" y="330" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Interval-based: store value every N seconds/minutes</text>
      <text x="475" y="343" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• COV-based: store on change (BACnet Trend Log object)</text>
      <text x="475" y="356" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Historian: long-term database storage</text>
      <text x="475" y="369" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Retention policy: project/client defined — not universal</text>
      <text x="475" y="382" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Reports: scheduled export (daily/weekly UPS load report)</text>

      <text x="450" y="415" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Addressing example is illustrative only — actual register/object numbers depend on UPS make, model and firmware. Always verify with OEM documentation.</text>

      <defs>
        <marker id="pmArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0,7 3.5,0 7" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
