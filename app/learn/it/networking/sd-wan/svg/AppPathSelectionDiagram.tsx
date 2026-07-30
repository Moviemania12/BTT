"use client";
export default function AppPathSelectionDiagram() {
  const apps = [
    { label: "Voice / Video", color: "#ef4444", bg: "#fef2f2", border: "#ef4444" },
    { label: "ERP / Banking", color: "#d97706", bg: "#fef3c7", border: "#d97706" },
    { label: "Web / SaaS", color: "#16a34a", bg: "#f0fdf4", border: "#16a34a" },
  ];
  const paths = [
    { label: "MPLS", sub: "Low latency, private", color: "#d97706", bg: "#fef3c7" },
    { label: "Internet", sub: "High BW, variable quality", color: "#3b82f6", bg: "#eff6ff" },
    { label: "LTE/5G", sub: "Wireless, backup", color: "#16a34a", bg: "#f0fdf4" },
  ];
  const arrows = [
    { from: 0, to: 0, label: "Primary", dash: false, color: "#ef4444" },
    { from: 0, to: 1, label: "Fallback", dash: true, color: "#ef4444" },
    { from: 1, to: 0, label: "Only path", dash: false, color: "#d97706" },
    { from: 2, to: 1, label: "Direct", dash: false, color: "#16a34a" },
  ];

  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aps-title">
      <title id="aps-title">Application-Aware Traffic Steering in SD-WAN</title>
      <rect width="820" height="340" fill="#ffffff" />

      <text x="410" y="26" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        APPLICATION-AWARE PATH SELECTION
      </text>

      {/* Application boxes */}
      {apps.map((app, i) => (
        <g key={i}>
          <rect x={30} y={60 + i * 80} width={160} height={56} rx="8"
            fill={app.bg} stroke={app.border} strokeWidth="2" />
          <text x={110} y={84 + i * 80} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700"
            fill={app.color} textAnchor="middle">{app.label}</text>
          <text x={110} y={100 + i * 80} fontFamily="Arial,sans-serif" fontSize="8"
            fill={app.color} textAnchor="middle">Traffic Type {i + 1}</text>
        </g>
      ))}

      {/* Policy Engine */}
      <rect x={260} y={100} width={150} height={130} rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
      <text x={335} y={122} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">POLICY</text>
      <text x={335} y={137} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">ENGINE</text>
      <text x={335} y={158} fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">1. Classify traffic</text>
      <text x={335} y={172} fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">2. Match policy</text>
      <text x={335} y={186} fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">3. Check path quality</text>
      <text x={335} y={200} fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">4. Select eligible path</text>
      <rect x={275} y={210} width={120} height={16} rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x={335} y={222} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">Runs continuously</text>

      {/* Arrows: Apps to Policy */}
      {[88, 168, 248].map((y, i) => (
        <line key={i} x1={190} y1={y} x2={260} y2={y} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ap-arr)" />
      ))}

      {/* Path boxes */}
      {paths.map((path, i) => (
        <g key={i}>
          <rect x={500} y={60 + i * 80} width={180} height={56} rx="8"
            fill={path.bg} stroke={path.color} strokeWidth="2" />
          <text x={590} y={82 + i * 80} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700"
            fill={path.color} textAnchor="middle">{path.label}</text>
          <text x={590} y={98 + i * 80} fontFamily="Arial,sans-serif" fontSize="8"
            fill={path.color} textAnchor="middle">{path.sub}</text>
        </g>
      ))}

      {/* Arrows: Policy to Paths */}
      {arrows.map((a, i) => {
        const x1 = 410;
        const y1 = 165;
        const x2 = 500;
        const y2 = 88 + a.to * 80;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={a.color} strokeWidth={a.dash ? 1.5 : 2}
            strokeDasharray={a.dash ? "6,4" : "none"}
            markerEnd="url(#ap-arr)" opacity={a.dash ? 0.6 : 1} />
        );
      })}

      {/* Labels */}
      <text x={452} y={90} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ef4444">Voice primary</text>
      <text x={452} y={138} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ef4444" opacity="0.7">Voice fallback</text>
      <text x={446} y={168} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#d97706">ERP only</text>
      <text x={452} y={245} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a">Web direct</text>

      {/* Quality note */}
      <rect x={30} y={295} width={760} height={32} rx="6" fill="#fef9e7" stroke="#fbbf24" strokeWidth="1" />
      <text x={410} y={313} fontFamily="Arial,sans-serif" fontSize="9" fill="#92400e" textAnchor="middle">
        ⚠️  Policy specifies eligible paths — path quality measurement determines which eligible paths are currently usable
      </text>
      <text x={410} y={325} fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">
        Application classification capabilities vary by platform — first-packet classification is platform-specific
      </text>

      <defs>
        <marker id="ap-arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
