"use client";
// D8 — EtherChannel / LACP: Link Bundling and Load Balancing
export default function EtherchannelLacp() {
  return (
    <svg viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="EtherChannel LACP link aggregation bundling and load balancing"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height="400" fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">EtherChannel / LACP — Link Aggregation</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">IEEE 802.1AX · Multiple physical links → one logical link · bandwidth + redundancy</text>

      {/* Switch A */}
      <rect x="20" y="50" width="160" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="100" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Switch-A</text>
      <text x="100" y="88" textAnchor="middle" fontSize="9" fill="#1e40af">LACP Active mode</text>
      <rect x="140" y="80" width="40" height="38" rx="4" fill="#2563eb"/>
      <text x="160" y="96" textAnchor="middle" fontSize="7.5" fill="#fff" fontWeight="600">Port-Ch</text>
      <text x="160" y="108" textAnchor="middle" fontSize="7.5" fill="#fff">Po1</text>

      {/* Switch B */}
      <rect x="300" y="50" width="160" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="380" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Switch-B</text>
      <text x="380" y="88" textAnchor="middle" fontSize="9" fill="#1e40af">LACP Active mode</text>
      <rect x="300" y="80" width="40" height="38" rx="4" fill="#2563eb"/>
      <text x="320" y="96" textAnchor="middle" fontSize="7.5" fill="#fff" fontWeight="600">Port-Ch</text>
      <text x="320" y="108" textAnchor="middle" fontSize="7.5" fill="#fff">Po1</text>

      {/* 4 physical links */}
      {[0,1,2,3].map(i => {
        const colors = ["#16a34a","#2563eb","#7c3aed","#ea580c"];
        const labels = ["10G Link-1","10G Link-2","10G Link-3","10G Link-4"];
        return (
          <g key={i}>
            <line x1="180" y1={82+i*8} x2="300" y2={82+i*8} stroke={colors[i]} strokeWidth="2"/>
            <text x="240" y={80+i*8} textAnchor="middle" fontSize="7.5" fill={colors[i]} fontWeight="600">{labels[i]}</text>
          </g>
        );
      })}

      {/* Logical interface */}
      <rect x="80" y="160" width="320" height="28" rx="6" fill="#1e293b"/>
      <text x="240" y="178" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc">Logical Port-Channel Interface → 40G aggregate bandwidth</text>

      {/* LACP modes */}
      <text x="240" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">LACP Modes</text>
      {[
        { mode:"ACTIVE + ACTIVE", result:"✓ LAG forms — both sides initiate", bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
        { mode:"ACTIVE + PASSIVE", result:"✓ LAG forms — Active initiates", bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
        { mode:"PASSIVE + PASSIVE", result:"✗ LAG does NOT form — neither initiates", bg:"#fee2e2", b:"#dc2626", tc:"#991b1b" },
      ].map((m, i) => (
        <g key={i}>
          <rect x="10" y={218+i*34} width="460" height="28" rx="5" fill={m.bg} stroke={m.b} strokeWidth="1.5"/>
          <text x="130" y={218+i*34+18} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={m.tc}>{m.mode}</text>
          <line x1="240" y1={218+i*34+4} x2="240" y2={218+i*34+24} stroke={m.b} strokeWidth="1" opacity="0.5"/>
          <text x="355" y={218+i*34+18} textAnchor="middle" fontSize="9" fill={m.tc}>{m.result}</text>
        </g>
      ))}

      {/* Hash note */}
      <rect x="10" y="326" width="460" height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="340" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">Load Balancing: Deterministic hashing (NOT round-robin)</text>
      <text x="240" y="354" textAnchor="middle" fontSize="9" fill="#92400e">Same flow (same src/dst) → same link always · Multiple flows → distributed across links</text>

      <rect x="10" y="366" width="460" height="24" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y="381" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">{"Hash imbalance: one link >80% util → change hash algorithm (src-dst-ip vs src-dst-mac)"}</text>
    </svg>
  );
}
