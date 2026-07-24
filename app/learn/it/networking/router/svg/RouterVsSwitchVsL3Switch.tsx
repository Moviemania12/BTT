"use client";
// D1 — Router vs Switch vs L3 Switch: Forwarding basis, OSI layer, capabilities
export default function RouterVsSwitchVsL3Switch() {
  const cards = [
    {
      title: "L2 SWITCH", border: "#0ea5e9", bg: "#f0f9ff", tc: "#0c4a6e", hBg: "#0ea5e9",
      rows: [
        { label: "Forwarding basis", val: "Destination MAC address" },
        { label: "OSI Layer", val: "Layer 2 (Data Link)" },
        { label: "Broadcast domains", val: "1 per VLAN" },
        { label: "Routing protocols", val: "Typically no" },
        { label: "WAN interfaces", val: "Typically no" },
        { label: "VPN / MPLS", val: "Typically no" },
        { label: "Typical use", val: "Campus/DC access layer" },
      ],
    },
    {
      title: "L3 SWITCH", border: "#8b5cf6", bg: "#faf5ff", tc: "#4c1d95", hBg: "#8b5cf6",
      rows: [
        { label: "Forwarding basis", val: "IP address (+ MAC locally)" },
        { label: "OSI Layer", val: "Layer 2 + Layer 3" },
        { label: "Broadcast domains", val: "1 per SVI/VLAN" },
        { label: "Routing protocols", val: "Yes — platform dependent" },
        { label: "WAN interfaces", val: "Uncommon — platform dependent" },
        { label: "VPN / MPLS", val: "Limited — platform/license dependent" },
        { label: "Typical use", val: "Campus dist / DC aggregation" },
      ],
    },
    {
      title: "ROUTER", border: "#16a34a", bg: "#f0fdf4", tc: "#14532d", hBg: "#16a34a",
      rows: [
        { label: "Forwarding basis", val: "IP address — LPM in FIB" },
        { label: "OSI Layer", val: "Layer 3" },
        { label: "Broadcast domains", val: "1 per L3 interface" },
        { label: "Routing protocols", val: "Full suite — platform dependent" },
        { label: "WAN interfaces", val: "Common capability — varies" },
        { label: "VPN / MPLS", val: "Common — platform/license dependent" },
        { label: "Typical use", val: "WAN edge / border / SP" },
      ],
    },
  ];
  const HEAD_H = 30; const ROW_H = 19; const PAD = 6; const GAP = 10;
  const cardH = (n: number) => HEAD_H + n * ROW_H + PAD * 2;
  const totalH = 50 + cards.reduce((s, c) => s + cardH(c.rows.length) + GAP, 0) + 32;
  let y = 50;
  return (
    <svg viewBox={`0 0 500 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Router vs L2 Switch vs L3 Switch comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="500" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="250" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Router vs L2 Switch vs L3 Switch</text>
      <text x="250" y="36" textAnchor="middle" fontSize="9.5" fill="#6b7280">Forwarding basis, OSI layer, capability comparison</text>
      {cards.map((c, ci) => {
        const h = cardH(c.rows.length); const gy = y;
        const el = (
          <g key={ci}>
            <rect x="10" y={gy} width="480" height={h} rx="7" fill={c.bg} stroke={c.border} strokeWidth="1.5"/>
            <rect x="10" y={gy} width="480" height={HEAD_H} rx="7" fill={c.hBg}/>
            <rect x="10" y={gy + HEAD_H - 5} width="480" height="5" fill={c.hBg}/>
            <text x="250" y={gy + HEAD_H - 9} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">{c.title}</text>
            {c.rows.map((r, ri) => (
              <g key={ri}>
                <text x="20" y={gy + HEAD_H + PAD + ri * ROW_H + 12} fontSize="9" fontWeight="600" fill={c.border}>{r.label}:</text>
                <text x="150" y={gy + HEAD_H + PAD + ri * ROW_H + 12} fontSize="9" fill={c.tc}>{r.val}</text>
              </g>
            ))}
          </g>
        );
        y += h + GAP; return el;
      })}
      <rect x="10" y={y} width="480" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="250" y={y + 14} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#92400e">Capabilities vary by platform, NOS version, and licensing — always verify against hardware documentation</text>
    </svg>
  );
}
