"use client";
export default function TroubleshootingFlowDiagram() {
  const steps = [
    { n: 1, label: "Edge device healthy?", sub: "CPU, memory, processes, licenses", color: "#dc2626", bg: "#fef2f2" },
    { n: 2, label: "Physical WAN interfaces UP?", sub: "Line protocol, duplex, errors, counters", color: "#d97706", bg: "#fef3c7" },
    { n: 3, label: "Underlay reachability OK?", sub: "Ping ISP gateway, provider neighbor, traceroute", color: "#d97706", bg: "#fef3c7" },
    { n: 4, label: "Overlay tunnels established?", sub: "Tunnel state per underlay path", color: "#eab308", bg: "#fefce8" },
    { n: 5, label: "Expected routes present?", sub: "Route table, overlay route exchange", color: "#16a34a", bg: "#f0fdf4" },
    { n: 6, label: "Traffic classified correctly?", sub: "Application identification, DPI match", color: "#2563EB", bg: "#eff6ff" },
    { n: 7, label: "Correct policy matches?", sub: "Policy hit counters, flow logs", color: "#2563EB", bg: "#eff6ff" },
    { n: 8, label: "Eligible paths for policy?", sub: "Eligible path list per policy", color: "#7c3aed", bg: "#f5f3ff" },
    { n: 9, label: "Path quality within SLA?", sub: "Latency, jitter, loss per path", color: "#7c3aed", bg: "#f5f3ff" },
    { n: 10, label: "Traffic steering event?", sub: "Path change log, steering events", color: "#7c3aed", bg: "#f5f3ff" },
    { n: 11, label: "Return routing correct?", sub: "Check DC/remote end — asymmetric routing", color: "#0891b2", bg: "#ecfeff" },
    { n: 12, label: "Firewall/NAT passing?", sub: "Firewall deny logs, NAT session table", color: "#0891b2", bg: "#ecfeff" },
    { n: 13, label: "Application itself works?", sub: "Direct test from DC, application logs", color: "#475569", bg: "#f8fafc" },
  ];

  const colW = 240;
  const colGap = 30;
  const rowH = 48;
  const boxH = 40;
  const startX = 20;
  const startY = 60;
  const cols = 3;

  return (
    <svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tsf-title">
      <title id="tsf-title">SD-WAN Troubleshooting Sequence</title>
      <rect width="780" height="340" fill="#ffffff" />

      <text x="390" y="22" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        SD-WAN TROUBLESHOOTING SEQUENCE
      </text>
      <text x="390" y="38" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">
        Each step: pass → continue down / fail → investigate that layer
      </text>

      {steps.map((step, i) => {
        const col = Math.floor(i / 5);
        const row = i % 5;
        const x = startX + col * (colW + colGap);
        const y = startY + row * rowH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={colW} height={boxH} rx="5"
              fill={step.bg} stroke={step.color} strokeWidth="1.5" />
            <rect x={x} y={y} width={22} height={boxH} rx="4" fill={step.color} />
            <text x={x + 11} y={y + 25} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700"
              fill="#fff" textAnchor="middle">{step.n}</text>
            <text x={x + 30} y={y + 15} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill={step.color}>{step.label}</text>
            <text x={x + 30} y={y + 29} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569">{step.sub}</text>
            {/* Down arrow (within column) */}
            {row < 4 && i < steps.length - 1 && Math.floor((i + 1) / 5) === col && (
              <line x1={x + colW / 2} y1={y + boxH} x2={x + colW / 2} y2={y + rowH}
                stroke="#94a3b8" strokeWidth="1" markerEnd="url(#tsf-arr)" />
            )}
          </g>
        );
      })}

      {/* Callout */}
      <rect x={520} y={272} width={240} height={50} rx="7" fill="#1e293b" />
      <text x={640} y={292} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#f1f5f9" textAnchor="middle">TUNNEL UP ≠ APPLICATION WORKING</text>
      <text x={640} y={307} fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Check quality + routing + policy + security</text>
      <text x={640} y={318} fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">+ application layer — all separately</text>

      <defs>
        <marker id="tsf-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
