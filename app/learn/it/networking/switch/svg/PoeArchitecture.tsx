"use client";
// D41 — PoE Architecture: Detection, Classification, Power Delivery
export default function PoeArchitecture() {
  const standards = [
    { std:"IEEE 802.3af — PoE",      pse:"15.4W", pd:"12.95W", cls:"Class 0-3", use:"IP phones · basic cameras",    bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { std:"IEEE 802.3at — PoE+",     pse:"30W",   pd:"25.5W",  cls:"Class 4",   use:"PTZ cameras · video phones",   bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { std:"802.3bt Type 3 — PoE++",  pse:"60W",   pd:"51W",    cls:"Class 5-6", use:"High-power APs · conferencing", bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { std:"802.3bt Type 4 — Hi-PoE", pse:"90-100W",pd:"71.3W", cls:"Class 7-8", use:"Thin clients · some laptops",  bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
  ];
  const HEAD=28; const ROW=20; const PAD=5; const GAP=6;
  const tableH = standards.length * (ROW + GAP) + HEAD;
  const totalH = 44 + 80 + 16 + tableH + 64;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="PoE Power over Ethernet standards, detection and power delivery"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Power over Ethernet (PoE) — Architecture</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">PSE (switch) delivers power · PD (device) receives · same Ethernet cable</text>

      {/* Detection flow */}
      <rect x="10" y="40" width="460" height="76" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="240" y="55" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">PoE Negotiation Flow</text>
      {[
        { step:"1. Detection", desc:"PSE applies 2.7–10V signal · PD presents ~25kΩ signature resistance" },
        { step:"2. Classification", desc:"PD advertises power class (0–8) via current draw · LLDP-MED for precise negotiation" },
        { step:"3. Power delivery", desc:"PSE enables power per PD class · monitors continuously · overcurrent protection" },
      ].map((s, i) => (
        <g key={i}>
          <text x="20" y={68+i*18} fontSize="9" fontWeight="700" fill="#15803d">{s.step}:</text>
          <text x="95" y={68+i*18} fontSize="9" fill="#374151">{s.desc}</text>
        </g>
      ))}

      {/* Standards table */}
      <text x="240" y={44+80+12} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#111827">IEEE PoE Standards</text>
      {/* Headers */}
      <rect x="10" y={44+80+18} width="460" height={HEAD} rx="5" fill="#1e293b"/>
      {["Standard","PSE Max","PD Receives","Class","Common Use"].map((h,i) => {
        const xs = [30, 148, 218, 288, 358]; const ws = [118,70,70,70,100];
        return <text key={i} x={xs[i]} y={44+80+18+HEAD-8} fontSize="8.5" fontWeight="700" fill="#fff">{h}</text>;
      })}
      {standards.map((r, i) => {
        const ry = 44+80+18+HEAD+i*(ROW+GAP);
        return (
          <g key={i}>
            <rect x="10" y={ry} width="460" height={ROW} rx="4" fill={r.bg} stroke={r.b} strokeWidth="1"/>
            <text x="20" y={ry+14} fontSize="8" fontWeight="600" fill={r.tc}>{r.std}</text>
            <text x="148" y={ry+14} fontSize="9" fontWeight="700" fill={r.tc}>{r.pse}</text>
            <text x="218" y={ry+14} fontSize="9" fill={r.tc}>{r.pd}</text>
            <text x="288" y={ry+14} fontSize="8.5" fill={r.tc}>{r.cls}</text>
            <text x="358" y={ry+14} fontSize="8" fill={r.tc}>{r.use}</text>
          </g>
        );
      })}

      {/* Budget note */}
      {(() => { const ny = 44+80+18+HEAD+standards.length*(ROW+GAP)+8; return (
        <g>
          <rect x="10" y={ny} width="460" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
          <text x="240" y={ny+14} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">PoE Budget: Sum all device wattages + 20% headroom → must be ≤ switch documented PoE budget</text>
          <rect x="10" y={ny+28} width="460" height="20" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
          <text x="240" y={ny+41} textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">Vendor trade names (UPoE, Hi-PoE, 4PPoE) vary — IEEE standard terminology is authoritative</text>
        </g>
      ); })()}
    </svg>
  );
}
