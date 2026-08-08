"use client";
export default function EastWestTraffic() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ewt-title">
      <title id="ewt-title">East-West vs North-South traffic comparison. Left panel: Traditional data center uses North-South traffic — users send requests to servers vertically, server responds. Right panel: GPU Cluster uses East-West traffic — during AllReduce collective communication operation, all GPU servers simultaneously exchange gradient data horizontally with each other. This massive peer-to-peer traffic is why GPU cluster networks must be non-blocking.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">EAST-WEST vs NORTH-SOUTH TRAFFIC</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">AllReduce collective communication makes East-West traffic dominant in GPU clusters. Networks must handle this pattern at full speed.</text>

      {/* Left panel: North-South */}
      <rect x="14" y="44" width="374" height="220" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="201" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">Traditional Data Center</text>
      <text x="201" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">NORTH-SOUTH traffic dominant</text>

      {/* User at top */}
      <rect x="154" y="88" width="94" height="24" rx="5" fill="#0f172a" />
      <text x="201" y="104" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">User / Client</text>
      <text x="201" y="120" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Sends request ↓</text>
      <line x1="201" y1="128" x2="201" y2="152" stroke="#0891b2" strokeWidth="2" markerEnd="url(#ewt-da)" />

      {/* Servers */}
      {[100, 165, 230, 295].map((x, i) => (
        <g key={i}>
          <rect x={x} y="160" width="52" height="32" rx="4" fill="#2563eb" />
          <text x={x + 26} y="178" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Server</text>
          <text x={x + 26} y="188" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bae6fd" textAnchor="middle">{i + 1}</text>
        </g>
      ))}
      <text x="201" y="216" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a" textAnchor="middle">Response ↑ back to user</text>
      <text x="201" y="230" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Servers mostly talk to users, not each other</text>
      <text x="201" y="245" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0891b2" textAnchor="middle">Vertical traffic pattern</text>
      <text x="201" y="258" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Standard networks handle this well</text>

      {/* Right panel: East-West */}
      <rect x="432" y="44" width="374" height="220" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="619" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">GPU Cluster — AI Training</text>
      <text x="619" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#a78bfa" textAnchor="middle">EAST-WEST traffic dominant (AllReduce)</text>

      {/* GPU nodes in horizontal line */}
      {[446, 516, 586, 656, 726].map((x, i) => (
        <g key={i}>
          <rect x={x} y="108" width="56" height="60" rx="5" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
          <text x={x + 28} y="126" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
          <text x={x + 28} y="138" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Server</text>
          <text x={x + 28} y="150" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#ddd6fe" textAnchor="middle">{i + 1}</text>
          <text x={x + 28} y="162" fontFamily="Arial,sans-serif" fontSize="6" fill="#c4b5fd" textAnchor="middle">8 GPUs</text>
        </g>
      ))}

      {/* AllReduce hub */}
      <rect x="534" y="192" width="170" height="28" rx="6" fill="#dc2626" />
      <text x="619" y="206" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">AllReduce — Collective Communication</text>
      <text x="619" y="217" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(All nodes share gradients simultaneously)</text>

      {/* Lines from each GPU to AllReduce */}
      {[474, 544, 614, 684, 754].map(x => (
        <line key={x} x1={x} y1={168} x2="619" y2={192} stroke="#f97316" strokeWidth="1.5" opacity="0.8" />
      ))}

      <text x="619" y="236" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">Horizontal traffic between ALL nodes</text>
      <text x="619" y="250" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">Every training step → all GPUs sync simultaneously</text>
      <text x="619" y="263" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#dc2626" textAnchor="middle">Needs non-blocking high-speed fabric!</text>

      <defs>
        <marker id="ewt-da" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
      </defs>
    </svg>
  );
}
