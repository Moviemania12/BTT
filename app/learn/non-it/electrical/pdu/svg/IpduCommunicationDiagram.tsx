"use client";
export default function IpduCommunicationDiagram() {
  return (
    <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="comm-title">
      <title id="comm-title">iPDU Communication Architecture — SNMP, Modbus, DCIM, BMS</title>
      <rect width="900" height="420" fill="#fff"/>
      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        iPDU COMMUNICATION ARCHITECTURE
      </text>
      {/* Central iPDU */}
      <rect x="340" y="160" width="220" height="100" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="3"/>
      <text x="450" y="200" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#0066CC" textAnchor="middle">iPDU</text>
      <text x="450" y="218" fontFamily="Arial,sans-serif" fontSize="10" fill="#334155" textAnchor="middle">Rack R-21, PDU-A</text>
      <text x="450" y="233" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">IP: 10.10.5.21</text>
      <text x="450" y="247" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">24 × C13 + 6 × C19 outlets</text>
      {/* Management LAN */}
      <rect x="340" y="60" width="220" height="50" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="450" y="81" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#334155" textAnchor="middle">Management LAN</text>
      <text x="450" y="97" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">VLAN 10 — Out-of-Band Network</text>
      <line x1="450" y1="110" x2="450" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,3"/>
      {/* SNMP/IT side */}
      <rect x="30" y="155" width="180" height="110" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="120" y="178" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">DCIM Platform</text>
      <text x="120" y="194" fontFamily="Arial,sans-serif" fontSize="9" fill="#166534" textAnchor="middle">e.g. CenterScape / Nlyte</text>
      <text x="120" y="212" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#166534" textAnchor="middle">• Rack-level load</text>
      <text x="120" y="226" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#166534" textAnchor="middle">• Outlet utilization</text>
      <text x="120" y="240" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#166534" textAnchor="middle">• Asset mapping</text>
      <text x="120" y="254" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#166534" textAnchor="middle">• Capacity planning</text>
      <text x="210" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">SNMP v3</text>
      <line x1="210" y1="210" x2="340" y2="210" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,2"/>
      {/* Modbus/BMS side */}
      <rect x="690" y="155" width="180" height="110" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2"/>
      <text x="780" y="178" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">BMS / SCADA</text>
      <text x="780" y="194" fontFamily="Arial,sans-serif" fontSize="9" fill="#c2410c" textAnchor="middle">Building Mgmt System</text>
      <text x="780" y="212" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">• Total power (kW)</text>
      <text x="780" y="226" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">• Current per phase</text>
      <text x="780" y="240" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">• Temperature alarm</text>
      <text x="780" y="254" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">• Facility-level view</text>
      <text x="690" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#f97316" textAnchor="middle">Modbus TCP</text>
      <line x1="560" y1="210" x2="690" y2="210" stroke="#f97316" strokeWidth="2" strokeDasharray="4,2"/>
      {/* Sensors below */}
      <rect x="150" y="320" width="160" height="70" rx="6" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5"/>
      <text x="230" y="342" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7e22ce" textAnchor="middle">Environmental</text>
      <text x="230" y="358" fontFamily="Arial,sans-serif" fontSize="9" fill="#7e22ce" textAnchor="middle">T/H Probe at rack inlet</text>
      <text x="230" y="373" fontFamily="Arial,sans-serif" fontSize="9" fill="#7e22ce" textAnchor="middle">Temperature + Humidity</text>
      <line x1="340" y1="260" x2="280" y2="320" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,2"/>
      {/* Outlet monitoring */}
      <rect x="590" y="320" width="160" height="70" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="670" y="342" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#854d0e" textAnchor="middle">Outlet Monitoring</text>
      <text x="670" y="358" fontFamily="Arial,sans-serif" fontSize="9" fill="#854d0e" textAnchor="middle">Per-outlet: A, W, kWh</text>
      <text x="670" y="373" fontFamily="Arial,sans-serif" fontSize="9" fill="#854d0e" textAnchor="middle">Remote on/off switch</text>
      <line x1="560" y1="260" x2="620" y2="320" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="450" y="408" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        IT team DCIM use karta hai rack detail ke liye; Facilities team BMS use karta hai building-level power management ke liye
      </text>
    </svg>
  );
}
