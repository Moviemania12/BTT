"use client";
// D9 — STP Port States and Root Bridge Election
export default function StpElection() {
  const states = [
    { state:"BLOCKING",    data:"No data · Listen BPDUs only",   bg:"#fee2e2", b:"#dc2626", tc:"#991b1b" },
    { state:"LISTENING",   data:"No data · No learning · 15 sec", bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { state:"LEARNING",    data:"No data · MAC learning · 15 sec", bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
    { state:"FORWARDING",  data:"Data + learning — normal state", bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { state:"DISABLED",    data:"Admin/STP disabled — no traffic", bg:"#f1f5f9", b:"#64748b", tc:"#374151" },
  ];
  return (
    <svg viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="STP root bridge election and port states"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height="520" fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Spanning Tree Protocol — Election aur Port States</text>

      {/* Root bridge election */}
      <rect x="10" y="26" width="460" height="22" rx="5" fill="#1e293b"/>
      <text x="240" y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc">ROOT BRIDGE ELECTION: Lowest Bridge ID wins (Priority + MAC Address)</text>

      {/* Switch diagram */}
      {/* Root bridge */}
      <rect x="165" y="56" width="150" height="36" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
      <text x="240" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Root Bridge</text>
      <text x="240" y="84" textAnchor="middle" fontSize="8.5" fill="#15803d">Priority 4096 (manually set) · All ports = Designated</text>

      {/* Lines to distribution */}
      <line x1="190" y1="92" x2="120" y2="140" stroke="#16a34a" strokeWidth="2"/>
      <line x1="290" y1="92" x2="360" y2="140" stroke="#16a34a" strokeWidth="2"/>

      {/* Dist switch A */}
      <rect x="50" y="140" width="140" height="36" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="120" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Switch-A</text>
      <text x="120" y="168" textAnchor="middle" fontSize="8" fill="#1e40af">Root Port: toward root · Designated: toward access</text>

      {/* Dist switch B */}
      <rect x="290" y="140" width="140" height="36" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="360" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">Switch-B</text>
      <text x="360" y="168" textAnchor="middle" fontSize="8" fill="#1e40af">Root Port: toward root · Designated: toward access</text>

      {/* Link between A-B — one blocked */}
      <line x1="190" y1="162" x2="290" y2="162" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,3"/>
      <rect x="213" y="150" width="54" height="18" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y="162" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">BLOCKED</text>

      {/* Access layer */}
      <line x1="90" y1="176" x2="90" y2="218" stroke="#2563eb" strokeWidth="1.5"/>
      <rect x="30" y="218" width="120" height="28" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
      <text x="90" y="235" textAnchor="middle" fontSize="9.5" fill="#374151">Access-SW-1</text>

      <line x1="360" y1="176" x2="360" y2="218" stroke="#2563eb" strokeWidth="1.5"/>
      <rect x="300" y="218" width="120" height="28" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
      <text x="360" y="235" textAnchor="middle" fontSize="9.5" fill="#374151">Access-SW-2</text>

      {/* Blocked annotation */}
      <rect x="10" y="262" width="460" height="20" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="275" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">Blocked port: data dropped · BPDUs still received · fails over when root path detected lost</text>

      {/* Port states table */}
      <text x="240" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">STP (802.1D) Port States</text>
      {states.map((s, i) => {
        const sy = 310 + i * 36;
        return (
          <g key={i}>
            <rect x="10" y={sy} width="460" height="30" rx="5" fill={s.bg} stroke={s.b} strokeWidth="1.5"/>
            <text x="100" y={sy + 19} textAnchor="middle" fontSize="10" fontWeight="700" fill={s.tc}>{s.state}</text>
            <line x1="180" y1={sy+4} x2="180" y2={sy+26} stroke={s.b} strokeWidth="1" opacity="0.5"/>
            <text x="320" y={sy + 19} textAnchor="middle" fontSize="9.5" fill={s.tc}>{s.data}</text>
          </g>
        );
      })}
      <rect x="10" y="495" width="460" height="18" rx="5" fill="#fef2f2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y="507" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">Classic STP convergence: up to 50 seconds · RSTP (802.1w): sub-second to seconds</text>
    </svg>
  );
}
