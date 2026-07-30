"use client";
export default function UnderlayOverlayDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="uo-title">
      <title id="uo-title">SD-WAN Underlay vs Overlay Architecture</title>
      <rect width="820" height="380" fill="#ffffff" />

      {/* Title */}
      <text x="410" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        SD-WAN: UNDERLAY (PHYSICAL) vs OVERLAY (LOGICAL)
      </text>

      {/* Branch Edge */}
      <rect x="30" y="100" width="130" height="180" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="95" y="126" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">BRANCH</text>
      <text x="95" y="142" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">SD-WAN EDGE</text>
      <rect x="50" y="155" width="90" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="95" y="174" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">LAN Users</text>
      <rect x="50" y="195" width="90" height="22" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="95" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#065f46" textAnchor="middle">WAN Interfaces</text>
      <rect x="50" y="225" width="90" height="22" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="95" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Policy Engine</text>
      <rect x="50" y="255" width="90" height="16" rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="95" y="267" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Path Quality Monitor</text>

      {/* DC Edge */}
      <rect x="660" y="100" width="130" height="180" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="725" y="126" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">DATA CENTER</text>
      <text x="725" y="142" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">SD-WAN EDGE</text>
      <rect x="680" y="155" width="90" height="30" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="725" y="174" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">DC Network</text>
      <rect x="680" y="195" width="90" height="22" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="725" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#065f46" textAnchor="middle">WAN Interfaces</text>
      <rect x="680" y="225" width="90" height="22" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="725" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Tunnel Termination</text>
      <rect x="680" y="255" width="90" height="16" rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="725" y="267" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Path Quality Monitor</text>

      {/* Underlay paths */}
      {/* MPLS */}
      <rect x="280" y="110" width="260" height="40" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="410" y="128" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">MPLS UNDERLAY</text>
      <text x="410" y="143" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">Provider network — private, QoS-capable, predictable</text>
      <line x1="160" y1="130" x2="280" y2="130" stroke="#d97706" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="540" y1="130" x2="660" y2="130" stroke="#d97706" strokeWidth="2" strokeDasharray="5,3" />

      {/* Internet */}
      <rect x="280" y="170" width="260" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="410" y="188" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">INTERNET UNDERLAY</text>
      <text x="410" y="203" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Public routing — variable quality, high bandwidth</text>
      <line x1="160" y1="190" x2="280" y2="190" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="540" y1="190" x2="660" y2="190" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />

      {/* LTE */}
      <rect x="280" y="230" width="260" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">LTE/5G UNDERLAY</text>
      <text x="410" y="263" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Wireless — mobility, backup, remote sites</text>
      <line x1="160" y1="250" x2="280" y2="250" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3" />
      <line x1="540" y1="250" x2="660" y2="250" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3" />

      {/* Overlay label */}
      <rect x="280" y="308" width="260" height="50" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="410" y="328" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e" textAnchor="middle">SD-WAN OVERLAY (LOGICAL)</text>
      <text x="410" y="344" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Policy-driven logical paths over physical transports</text>
      <text x="410" y="356" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Continuously measured: latency / jitter / loss</text>

      {/* Legend */}
      <text x="30" y="360" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">--- Physical underlay transport</text>
      <text x="30" y="372" fontFamily="Arial,sans-serif" fontSize="8" fill="#0284c7">SD-WAN overlay = logical abstraction above underlay</text>
    </svg>
  );
}
