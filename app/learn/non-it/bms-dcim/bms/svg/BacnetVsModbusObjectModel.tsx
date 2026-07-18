"use client";

export default function BacnetVsModbusObjectModel() {
  return (
    <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side by side comparison of BACnet object model with Device AI AO BI BO AV objects versus Modbus data model with Coil Discrete Input Input Register and Holding Register types">
      <rect width="900" height="460" fill="#ffffff" />
      <text x="450" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">BACnet Object Model vs Modbus Data Model</text>
      <text x="450" y="42" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">How the same UPS "Output Load %" appears in each protocol</text>

      {/* BACnet side */}
      <rect x="20" y="52" width="415" height="370" rx="10" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
      <text x="227" y="74" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0c4a6e">BACnet Model (ASHRAE 135)</text>

      {/* Device object */}
      <rect x="70" y="86" width="310" height="52" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="225" y="107" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e3a8a">Device Object</text>
      <text x="225" y="122" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Object_Identifier: Device 1001  |  Object_Name: "UPS-Room-A"  |  Vendor_Identifier: OEM</text>
      <text x="225" y="134" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Location · Protocol_Services_Supported · Max_APDU_Length</text>

      {/* Object types grid */}
      {[
        { x: 40, y: 155, name: "AI (Analog Input)", inst: "Instance 5", prop: "Present_Value: 72.4", sub: "Output Load %\n(read-only measurement)", col: "#dbeafe" },
        { x: 220, y: 155, name: "AO (Analog Output)", inst: "Instance 1", prop: "Present_Value: 22.0", sub: "Supply temp setpoint\n(commandable)", col: "#dcfce7" },
        { x: 40, y: 250, name: "BI (Binary Input)", inst: "Instance 3", prop: "Present_Value: ACTIVE", sub: "UPS On Bypass\n(status, read-only)", col: "#ede9fe" },
        { x: 220, y: 250, name: "BO (Binary Output)", inst: "Instance 1", prop: "Present_Value: INACTIVE", sub: "Fan start command\n(commandable)", col: "#fef9c3" },
        { x: 40, y: 345, name: "AV (Analog Value)", inst: "Instance 10", prop: "Present_Value: 80.0", sub: "Internal setpoint\n(read/write in controller)", col: "#fff7ed" },
        { x: 220, y: 345, name: "TL (Trend Log)", inst: "Instance 5", prop: "Logs AI 5 every 60s", sub: "Historical trend\n(COV or interval)", col: "#fef2f2" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="168" height="88" rx="6" fill={b.col} stroke="#0ea5e9" strokeWidth="1.5" />
          <text x={b.x + 84} y={b.y + 16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e">{b.name}</text>
          <text x={b.x + 84} y={b.y + 30} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{b.inst}</text>
          <text x={b.x + 84} y={b.y + 44} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">{b.prop}</text>
          {b.sub.split("\n").map((t, j) => (
            <text key={j} x={b.x + 84} y={b.y + 59 + j * 13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">{t}</text>
          ))}
        </g>
      ))}

      {/* Modbus side */}
      <rect x="465" y="52" width="415" height="370" rx="10" fill="#fef9c3" stroke="#f59e0b" strokeWidth="2" />
      <text x="672" y="74" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#78350f">Modbus Data Model</text>

      {/* Register table */}
      {[
        { name: "Coil (FC 01/05/15)", addr: "0x0000 – 0x270E", rw: "Read / Write", type: "1-bit binary\n(ON/OFF, Start/Stop)", ex: "Fan command bit", col: "#dcfce7" },
        { name: "Discrete Input (FC 02)", addr: "0x0000 – 0x270E", rw: "Read Only", type: "1-bit binary\n(status, alarm)", ex: "UPS bypass status", col: "#ede9fe" },
        { name: "Input Register (FC 04)", addr: "0x0000 – 0x270E", rw: "Read Only", type: "16-bit word\n(measurement)", ex: "Output voltage, current", col: "#dbeafe" },
        { name: "Holding Register (FC 03/06/16)", addr: "0x0000 – 0x270E", rw: "Read / Write", type: "16-bit word\n(setpoints, config)", ex: "Output Load %, temp setpoint", col: "#fef3c7" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={476} y={90 + i * 82} width="393" height="74" rx="6" fill={b.col} stroke="#f59e0b" strokeWidth="1.5" />
          <text x={510} y={90 + i * 82 + 18} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">{b.name}</text>
          <text x={510} y={90 + i * 82 + 32} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Address range: {b.addr}  |  Access: {b.rw}</text>
          {b.type.split("\n").map((t, j) => (
            <text key={j} x={510} y={90 + i * 82 + 46 + j * 13} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Type: {t}</text>
          ))}
          <text x={510} y={90 + i * 82 + 70} fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e">Example: {b.ex}</text>
        </g>
      ))}

      {/* Addressing note */}
      <rect x="476" y="425" width="393" height="24" rx="4" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1" />
      <text x="672" y="441" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f">⚠️ OEM docs often use 1-based addresses (40001–49999). Internally Modbus uses 0-based. Verify offset with OEM.</text>

      <text x="450" y="455" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Object instances and register addresses are illustrative — always refer to OEM documentation for actual values</text>
    </svg>
  );
}
