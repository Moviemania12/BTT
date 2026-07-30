"use client";
export default function ArchitecturePlanesDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ap-title">
      <title id="ap-title">SD-WAN Three Planes: Management, Control, Data</title>
      <rect width="820" height="320" fill="#ffffff" />

      <text x="410" y="26" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        SD-WAN ARCHITECTURE — THREE PLANES
      </text>
      <text x="410" y="42" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">
        (Actual plane co-location varies significantly by platform)
      </text>

      {/* Management Plane */}
      <rect x="60" y="55" width="700" height="68" rx="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <text x="160" y="80" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#701a75">MANAGEMENT PLANE</text>
      <text x="160" y="96" fontFamily="Arial,sans-serif" fontSize="9" fill="#86198f">Orchestrator / Management System / UI / API / Analytics</text>
      <text x="160" y="111" fontFamily="Arial,sans-serif" fontSize="9" fill="#86198f">Configuration, monitoring, zero-touch provisioning, reporting, software lifecycle</text>
      <rect x="580" y="64" width="148" height="50" rx="5" fill="#fae8ff" stroke="#d946ef" strokeWidth="1" />
      <text x="654" y="82" fontFamily="Arial,sans-serif" fontSize="9" fill="#701a75" textAnchor="middle">Cloud-hosted</text>
      <text x="654" y="96" fontFamily="Arial,sans-serif" fontSize="9" fill="#701a75" textAnchor="middle">OR on-premises</text>
      <text x="654" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#a21caf" textAnchor="middle">(platform-specific)</text>

      {/* Down arrow */}
      <line x1="410" y1="123" x2="410" y2="143" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr2)" />

      {/* Control Plane */}
      <rect x="60" y="147" width="700" height="68" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="160" y="172" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af">CONTROL PLANE</text>
      <text x="160" y="188" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">Controller / Route distribution / Policy distribution / Path computation</text>
      <text x="160" y="203" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">May be centralized, distributed across edges, or hybrid — varies by platform</text>
      <rect x="580" y="156" width="148" height="50" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="654" y="174" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">Centralized</text>
      <text x="654" y="188" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af" textAnchor="middle">OR distributed</text>
      <text x="654" y="202" fontFamily="Arial,sans-serif" fontSize="8" fill="#2563EB" textAnchor="middle">(platform-specific)</text>

      {/* Down arrow */}
      <line x1="410" y1="215" x2="410" y2="235" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arr2)" />

      {/* Data Plane */}
      <rect x="60" y="239" width="700" height="68" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="160" y="264" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#14532d">DATA PLANE</text>
      <text x="160" y="280" fontFamily="Arial,sans-serif" fontSize="9" fill="#14532d">SD-WAN Edge devices at every site — Branch / Data Center / Cloud</text>
      <text x="160" y="295" fontFamily="Arial,sans-serif" fontSize="9" fill="#14532d">Packet forwarding, tunnel, path measurement, policy enforcement, NAT (where configured)</text>

      {/* Edge device boxes */}
      {[{ label: "Branch A\nEdge", x: 580 }, { label: "Branch B\nEdge", x: 638 }, { label: "DC\nEdge", x: 696 }].map((e, i) => (
        <g key={i}>
          <rect x={e.x} y={248} width={50} height={50} rx="4" fill="#d1fae5" stroke="#34d399" strokeWidth="1" />
          {e.label.split("\n").map((line, li) => (
            <text key={li} x={e.x + 25} y={268 + li * 14} fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
