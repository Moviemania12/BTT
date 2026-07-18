"use client";

export default function ModbusRtuVsTcp() {
  return (
    <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side by side comparison of Modbus RTU over RS-485 bus versus Modbus TCP over Ethernet with key configuration parameters">
      <rect width="900" height="440" fill="#ffffff" />
      <text x="450" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">Modbus RTU (RS-485) vs Modbus TCP (Ethernet)</text>

      {/* RTU Side */}
      <rect x="20" y="40" width="410" height="370" rx="10" fill="#fef9c3" stroke="#f59e0b" strokeWidth="2" />
      <text x="225" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#78350f">Modbus RTU — RS-485 Serial</text>

      {/* RS-485 bus line */}
      <line x1="60" y1="160" x2="400" y2="160" stroke="#f59e0b" strokeWidth="3" />
      <line x1="60" y1="170" x2="400" y2="170" stroke="#374151" strokeWidth="3" />
      <text x="80" y="185" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">A (+)</text>
      <text x="80" y="198" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">B (−)</text>

      {/* Termination */}
      <rect x="35" y="148" width="22" height="36" rx="3" fill="#f59e0b" />
      <text x="46" y="195" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">120Ω</text>
      <text x="46" y="205" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">Term.</text>
      <rect x="393" y="148" width="22" height="36" rx="3" fill="#f59e0b" />
      <text x="404" y="195" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">120Ω</text>
      <text x="404" y="205" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">Term.</text>

      {/* BMS Master */}
      <rect x="70" y="80" width="100" height="50" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="120" y="101" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">BMS Master</text>
      <text x="120" y="114" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">RS-485 port</text>
      <text x="120" y="126" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">One master only</text>
      <line x1="120" y1="130" x2="120" y2="160" stroke="#64748b" strokeWidth="1.5" />

      {/* Slaves */}
      {[
        { x: 180, id: "Slave ID: 1", name: "UPS" },
        { x: 270, id: "Slave ID: 2", name: "PDU" },
        { x: 360, id: "Slave ID: 3", name: "PAC" },
      ].map((s, i) => (
        <g key={i}>
          <line x1={s.x + 25} y1="160" x2={s.x + 25} y2="210" stroke="#64748b" strokeWidth="1.5" />
          <rect x={s.x} y="210" width="70" height="46" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x={s.x + 35} y="228" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#78350f">{s.name}</text>
          <text x={s.x + 35} y="240" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e">{s.id}</text>
          <text x={s.x + 35} y="252" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">Modbus RTU</text>
        </g>
      ))}

      {/* RTU Config params */}
      <rect x="40" y="275" width="370" height="120" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="225" y="293" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">RTU Configuration Parameters</text>
      <text x="55" y="308" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Baud rate: typically 9600 or 19200 bps (verify OEM)</text>
      <text x="55" y="321" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Parity: None / Even / Odd  (must match all devices on bus)</text>
      <text x="55" y="334" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Stop bits: 1 or 2</text>
      <text x="55" y="347" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Slave ID: unique per device (1–247)</text>
      <text x="55" y="360" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Termination: 120 Ω at BOTH ends of bus only</text>
      <text x="55" y="373" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Max devices: 32 without repeater (electrical load)</text>
      <text x="55" y="385" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Common fault: A/B polarity swapped → no comms</text>

      {/* TCP Side */}
      <rect x="470" y="40" width="410" height="370" rx="10" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
      <text x="675" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0c4a6e">Modbus TCP — Ethernet</text>

      {/* Switch */}
      <rect x="610" y="80" width="130" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="675" y="100" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">Ethernet Switch</text>
      <text x="675" y="114" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Managed / Unmanaged</text>

      {/* BMS Client */}
      <rect x="484" y="148" width="110" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="539" y="167" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">BMS Client</text>
      <text x="539" y="181" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Modbus TCP master</text>
      <line x1="600" y1="170" x2="620" y2="124" stroke="#64748b" strokeWidth="1.5" />

      {/* TCP Devices */}
      {[
        { x: 484, y: 220, name: "UPS", ip: "192.168.10.11:502" },
        { x: 614, y: 220, name: "PDU", ip: "192.168.10.12:502" },
        { x: 744, y: 220, name: "PAC", ip: "192.168.10.13:502" },
      ].map((s, i) => (
        <g key={i}>
          <line x1={s.x + 55} y1="124" x2={s.x + 55} y2="220" stroke="#64748b" strokeWidth="1.5" />
          <rect x={s.x} y={s.y} width="110" height="56" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x={s.x + 55} y={s.y + 18} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e">{s.name}</text>
          <text x={s.x + 55} y={s.y + 32} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{s.ip}</text>
          <text x={s.x + 55} y={s.y + 46} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1">TCP port 502</text>
        </g>
      ))}

      {/* TCP Config params */}
      <rect x="484" y="295" width="382" height="100" rx="6" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="675" y="313" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e">TCP Configuration Parameters</text>
      <text x="500" y="328" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• IP address: per device (static recommended for BMS)</text>
      <text x="500" y="341" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Port: default 502 (verify OEM — some use non-standard)</text>
      <text x="500" y="354" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Unit ID / Slave ID: typically 1 or 255 (device-specific)</text>
      <text x="500" y="367" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• No baud/parity needed — standard TCP/IP</text>
      <text x="500" y="380" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">• Multiple clients can poll same device (unlike RTU)</text>

      <text x="450" y="425" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Register addressing identical in both variants — 0-based vs 1-based offset must match OEM documentation</text>
    </svg>
  );
}
