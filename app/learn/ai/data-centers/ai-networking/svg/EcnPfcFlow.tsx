"use client";
export default function EcnPfcFlow() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="epf-title">
      <title id="epf-title">ECN and PFC Congestion Control — Two separate mechanisms. Left panel ECN: Sender transmits packets. Congested switch detects buffer filling, marks ECN bits in packet header (does NOT drop). Receiver sends CNP (Congestion Notification Packet) back to sender. Sender reduces transmission rate. Smooth rate-based control. Right panel PFC: Sender transmits. Receiving switch buffer fills. Switch sends PAUSE frame upstream. Upstream device stops sending that priority class. Risk: head-of-line blocking and congestion propagation cascade. ECN and PFC are different mechanisms that serve complementary roles.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ECN vs PFC — Two Different Congestion Mechanisms</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">ECN = rate-based marking (smooth) · PFC = per-priority pause (stop-and-go) · They are NOT the same mechanism</text>

      {/* ECN Panel */}
      <rect x="14" y="44" width="380" height="240" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="204" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">ECN — Explicit Congestion Notification</text>
      <text x="204" y="76" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">IP-level marking · Rate-based · Does NOT pause traffic</text>

      {[
        { y: 88,  label: "Sender", sub: "Transmits packets at full rate", color: "#2563eb" },
        { y: 128, label: "Congested Switch", sub: "Buffer filling → marks ECN bits in\npacket header (no drop)", color: "#dc2626" },
        { y: 180, label: "Receiver", sub: "Sees ECN mark → sends CNP\n(Congestion Notification Packet) to sender", color: "#0891b2" },
        { y: 228, label: "Sender reduces rate", sub: "Smooth rate reduction →\ncongestion relieved gradually", color: "#16a34a" },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x="50" y={s.y} width="308" height="32" rx="5" fill={s.color} />
          <text x="204" y={s.y + 13} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x="204" y={s.y + 24 + li * 10} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.9)" textAnchor="middle">{line}</text>
          ))}
          {i < 3 && <line x1="204" y1={s.y + 32} x2="204" y2={s.y + 40} stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#epf-g)" />}
        </g>
      ))}
      <text x="204" y="274" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#16a34a" textAnchor="middle">✓ ECN does NOT guarantee zero packet loss — it signals congestion</text>

      {/* PFC Panel */}
      <rect x="426" y="44" width="380" height="240" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="616" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">PFC — Priority Flow Control</text>
      <text x="616" y="76" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Per-priority pause · Stop-and-go · Risk of cascades</text>

      {[
        { y: 88,  label: "Sender", sub: "Transmits packets (specific priority class)", color: "#2563eb" },
        { y: 128, label: "Switch buffer fills", sub: "For that priority class →\nsends PAUSE frame upstream", color: "#dc2626" },
        { y: 180, label: "Upstream device PAUSED", sub: "Stops sending that priority class\n— other priorities may also block (HoL)", color: "#f97316" },
        { y: 228, label: "Risk: Cascade", sub: "Pause propagates further upstream →\nPFC storm possible if misconfigured", color: "#7c3aed" },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x="462" y={s.y} width="308" height="32" rx="5" fill={s.color} />
          <text x="616" y={s.y + 13} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x="616" y={s.y + 24 + li * 10} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.9)" textAnchor="middle">{line}</text>
          ))}
          {i < 3 && <line x1="616" y1={s.y + 32} x2="616" y2={s.y + 40} stroke="#f97316" strokeWidth="1.5" markerEnd="url(#epf-o)" />}
        </g>
      ))}
      <text x="616" y="274" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#dc2626" textAnchor="middle">⚠ PFC does NOT make the entire network universally "lossless"</text>

      <defs>
        <marker id="epf-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
        <marker id="epf-o" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
