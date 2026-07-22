"use client";
// D1 — Hub vs Bridge vs Switch: Collision/Broadcast Domain Evolution
export default function HubBridgeSwitch() {
  const cards = [
    {
      title: "HUB",           border: "#dc2626", bg: "#fef2f2", tc: "#991b1b", hBg: "#dc2626",
      rows: [
        { label: "Layer",             val: "Layer 1 — Physical" },
        { label: "Intelligence",      val: "None — dumb repeater" },
        { label: "Collision Domains", val: "1 shared — all devices compete" },
        { label: "Broadcast Domain",  val: "1 — all devices receive all" },
        { label: "Bandwidth",         val: "Shared — contention-based" },
        { label: "Duplex",            val: "Half-duplex only — CSMA/CD" },
        { label: "Status",            val: "Dead in enterprise" },
      ],
    },
    {
      title: "BRIDGE",         border: "#ca8a04", bg: "#fffbeb", tc: "#92400e", hBg: "#ca8a04",
      rows: [
        { label: "Layer",             val: "Layer 2 — Data Link" },
        { label: "Intelligence",      val: "Basic MAC learning per segment" },
        { label: "Collision Domains", val: "1 per port/segment" },
        { label: "Broadcast Domain",  val: "1 — broadcasts cross bridge" },
        { label: "Bandwidth",         val: "Shared within segment" },
        { label: "Duplex",            val: "Half — segment-based" },
        { label: "Status",            val: "Replaced by switch" },
      ],
    },
    {
      title: "SWITCH",         border: "#16a34a", bg: "#f0fdf4", tc: "#15803d", hBg: "#16a34a",
      rows: [
        { label: "Layer",             val: "Layer 2 (L3 switch also routes)" },
        { label: "Intelligence",      val: "Full MAC/CAM table per port" },
        { label: "Collision Domains", val: "1 per port — microsegmented" },
        { label: "Broadcast Domain",  val: "1 default; VLANs create more" },
        { label: "Bandwidth",         val: "Dedicated per port — full speed" },
        { label: "Duplex",            val: "Full-duplex — no collisions" },
        { label: "Status",            val: "Universal enterprise standard" },
      ],
    },
  ];
  const HEAD_H = 30; const ROW_H = 18; const PAD = 5; const GAP = 10;
  const cardH = (rows: number) => HEAD_H + rows * ROW_H + PAD * 2;
  const totalH = 44 + cards.reduce((s, c) => s + cardH(c.rows.length) + GAP, 0) + 24;
  let y = 44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Hub vs Bridge vs Switch collision domain comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Hub vs Bridge vs Switch</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Network device evolution — collision domains, broadcast domains, intelligence</text>
      {cards.map((c, ci) => {
        const h = cardH(c.rows.length); const gy = y;
        const el = (
          <g key={ci}>
            <rect x="10" y={gy} width="460" height={h} rx="7" fill={c.bg} stroke={c.border} strokeWidth="2"/>
            <rect x="10" y={gy} width="460" height={HEAD_H} rx="7" fill={c.hBg}/>
            <rect x="10" y={gy + HEAD_H - 5} width="460" height="5" fill={c.hBg}/>
            <text x="240" y={gy + HEAD_H - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{c.title}</text>
            {c.rows.map((r, ri) => (
              <g key={ri}>
                <text x="20" y={gy + HEAD_H + PAD + ri * ROW_H + 13} fontSize="9.5" fontWeight="600" fill={c.border}>{r.label}:</text>
                <text x="120" y={gy + HEAD_H + PAD + ri * ROW_H + 13} fontSize="9.5" fill={c.tc}>{r.val}</text>
              </g>
            ))}
          </g>
        );
        y += h + GAP; return el;
      })}
      <rect x="10" y={y} width="460" height="18" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">Switch = per-port collision domain + VLAN support for multiple broadcast domains</text>
    </svg>
  );
}
