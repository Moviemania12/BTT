"use client";
export default function AiClusterNetwork() {
  const servers = [
    { x: 30, y: 80 }, { x: 140, y: 80 }, { x: 250, y: 80 }, { x: 360, y: 80 },
    { x: 30, y: 200 }, { x: 140, y: 200 }, { x: 250, y: 200 }, { x: 360, y: 200 },
    { x: 470, y: 80 }, { x: 580, y: 80 }, { x: 690, y: 80 },
    { x: 470, y: 200 }, { x: 580, y: 200 }, { x: 690, y: 200 },
  ];
  const leafSwitches = [
    { x: 195, y: 148, label: "Leaf 1" },
    { x: 520, y: 148, label: "Leaf 2" },
  ];
  const spineSwitches = [
    { x: 310, y: 56, label: "Spine 1" },
    { x: 440, y: 56, label: "Spine 2" },
  ];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="acn-title">
      <title id="acn-title">AI Cluster Network fat-tree topology: GPU servers (AI Compute Nodes) connect to Leaf Switches (local connection hubs at top of each rack). Leaf Switches connect to Spine Switches (main network backbone). This ensures any server can talk to any other server at full speed. A separate Management Network (dashed blue) runs independently for admin access. 400 Gb/s InfiniBand connections.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI CLUSTER NETWORK — Fat-Tree Topology + Management Network</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Every GPU server can communicate with every other at full speed — no bottlenecks. Management network is separate and always available.</text>

      {/* Spine switches */}
      {spineSwitches.map((sw) => (
        <g key={sw.label}>
          <rect x={sw.x - 48} y={sw.y} width="96" height="28" rx="5" fill="#dc2626" />
          <text x={sw.x} y={sw.y + 12} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Spine Switch</text>
          <text x={sw.x} y={sw.y + 22} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fecaca" textAnchor="middle">{sw.label} — Main Backbone</text>
        </g>
      ))}

      {/* Spine to leaf */}
      {leafSwitches.map((l) =>
        spineSwitches.map((sp) => (
          <line key={`${l.label}-${sp.label}`} x1={sp.x} y1={84} x2={l.x} y2={l.y - 2}
            stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
        ))
      )}

      {/* Leaf switches */}
      {leafSwitches.map((lsw) => (
        <g key={lsw.label}>
          <rect x={lsw.x - 56} y={lsw.y} width="112" height="28" rx="5" fill="#f97316" />
          <text x={lsw.x} y={lsw.y + 12} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Leaf Switch — {lsw.label}</text>
          <text x={lsw.x} y={lsw.y + 22} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fef3c7" textAnchor="middle">Local Connection Hub (Top of Rack)</text>
        </g>
      ))}

      {/* Servers */}
      {servers.map((s, i) => {
        const isLeft = i < 8;
        const lsw = isLeft ? leafSwitches[0] : leafSwitches[1];
        return (
          <g key={i}>
            <rect x={s.x} y={s.y} width="80" height="36" rx="4" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={s.x + 40} y={s.y + 14} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Compute</text>
            <text x={s.x + 40} y={s.y + 25} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Node {i + 1}</text>
            <text x={s.x + 40} y={s.y + 34} fontFamily="Arial,sans-serif" fontSize="6" fill="#c4b5fd" textAnchor="middle">8 GPUs · 400 Gb/s</text>
            <line x1={s.x + 40} y1={s.y + i < 4 || (i >= 8 && i < 11) ? 36 : 0}
              x2={lsw.x} y2={s.y < 150 ? lsw.y : lsw.y + 28}
              stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
          </g>
        );
      })}

      {/* Management Network */}
      <rect x="745" y="68" width="70" height="156" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="780" y="85" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Mgmt</text>
      <text x="780" y="97" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">Network</text>
      <text x="780" y="112" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#2563eb" textAnchor="middle">Management</text>
      <text x="780" y="124" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#2563eb" textAnchor="middle">Network</text>
      <text x="780" y="140" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">(Separate,</text>
      <text x="780" y="153" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">always on,</text>
      <text x="780" y="166" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">admin</text>
      <text x="780" y="179" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">access)</text>
      <text x="780" y="195" fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="700" fill="#1e40af" textAnchor="middle">1 GbE</text>
      <text x="780" y="208" fontFamily="Arial,sans-serif" fontSize="6" fill="#64748b" textAnchor="middle">IPMI/BMC</text>
      <text x="780" y="220" fontFamily="Arial,sans-serif" fontSize="6" fill="#64748b" textAnchor="middle">out-of-band</text>

      {/* Legend */}
      <rect x="14" y="252" width="720" height="42" rx="6" fill="#f1f5f9" />
      <line x1="24" y1="268" x2="64" y2="268" stroke="#a78bfa" strokeWidth="2" />
      <text x="70" y="272" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">AI Network — InfiniBand 400 Gb/s (high-speed GPU sync)</text>
      <line x1="24" y1="288" x2="64" y2="288" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="70" y="292" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">Management Network — 1 GbE (admin access, separate, always available)</text>
    </svg>
  );
}
