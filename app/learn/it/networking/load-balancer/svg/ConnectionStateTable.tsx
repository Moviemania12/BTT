"use client";
// D12 — Load Balancer Connection State Mapping
export default function ConnectionStateTable() {
  const W = 480;
  const headers = ["Client IP:Port", "VIP:Port", "Selected Backend", "State", "Idle Timer"];
  const rows = [
    ["198.51.100.25:54321", "203.0.113.50:443", "10.10.1.22:8443", "ESTAB", "28s"],
    ["198.51.100.11:48000", "203.0.113.50:443", "10.10.1.21:8443", "ESTAB", "4s"],
    ["198.51.100.30:55100", "203.0.113.50:443", "10.10.1.21:8443", "CLOSING", "1s"],
  ];
  return (
    <svg viewBox={`0 0 ${W} 270`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer connection state mapping table"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="270" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Load Balancer Connection / Flow State Table</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">Conceptual — actual fields, state names, and implementation vary by platform</text>

      {/* Table header */}
      <rect x="10" y="42" width="460" height="22" rx="4" fill="#374151"/>
      {headers.map((h, i) => (
        <text key={i} x={[15, 125, 218, 348, 425][i]} y="56" fontSize="8" fontWeight="700" fill="#fff">{h}</text>
      ))}

      {/* Table rows */}
      {rows.map((r, ri) => (
        <g key={ri}>
          <rect x="10" y={64+ri*22} width="460" height="22" rx="0" fill={ri%2===0?"#fff":"#f9fafb"}/>
          {r.map((c, ci) => (
            <text key={ci} x={[15, 125, 218, 348, 425][ci]} y={78+ri*22}
              fontSize="7.5" fontFamily={ci<=2?"monospace":"Arial"} fill={ci===3?(r[3]==="CLOSING"?"#dc2626":"#166534"):"#374151"}>{c}</text>
          ))}
        </g>
      ))}

      {/* Notes */}
      <rect x="10" y="136" width="460" height="124" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="152" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">State Table Engineering Notes</text>
      <text x="18" y="167" fontSize="8" fill="#374151">• State table has finite capacity — resource limits depend on platform (connections, memory, sessions)</text>
      <text x="18" y="180" fontSize="8" fill="#374151">• Not all architectures maintain per-flow state entries — L4 forwarding designs may use simpler tables</text>
      <text x="18" y="193" fontSize="8" fill="#374151">• State names (ESTAB, CLOSING, etc.) are illustrative — actual names are platform-specific</text>
      <text x="18" y="206" fontSize="8" fill="#374151">• Idle timer: entry removed after inactivity — prevents stale connections consuming table space</text>
      <text x="18" y="219" fontSize="8" fill="#374151">• Session state sync to HA peer: separate feature — not all platforms/session types supported</text>

      <rect x="10" y="242" width="460" height="20" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="255" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="600">Diagnostic: state entry present + no return traffic → check return path, backend response, and packet loss</text>
    </svg>
  );
}
