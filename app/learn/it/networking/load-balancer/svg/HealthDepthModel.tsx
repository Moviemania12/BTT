"use client";
// D14 — Health Depth Model
export default function HealthDepthModel() {
  const W = 480;
  const levels = [
    { n: "L4", label: "Application + Dependencies", fill: "#dcfce7", stroke: "#16a34a", proves: "App functioning + critical deps healthy", notProves: "Non-tested components" },
    { n: "L3", label: "Application Response Verified", fill: "#d1fae5", stroke: "#059669", proves: "Application responds correctly", notProves: "Upstream dependencies" },
    { n: "L2", label: "HTTP / Service Response", fill: "#bfdbfe", stroke: "#3b82f6", proves: "Web process running, returns response", notProves: "Application correctness, dependencies" },
    { n: "L1", label: "TCP Connection", fill: "#dbeafe", stroke: "#60a5fa", proves: "Port open / service listening", notProves: "Application functionality" },
    { n: "L0", label: "ICMP / Host Reachable", fill: "#e0f2fe", stroke: "#0284c7", proves: "Host alive on network", notProves: "Port open, application running, dependencies" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Health depth model pyramid showing four levels of health verification"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Health Depth Model</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">Monitor at the depth appropriate for the service — deeper = more reliable, but platform support varies</text>

      {levels.map((l, i) => {
        const y = 46 + i * 44;
        const indent = i * 30;
        return (
          <g key={i}>
            <rect x={10+indent} y={y} width={W-20-indent*2} height="38" rx="6" fill={l.fill} stroke={l.stroke} strokeWidth="1.5"/>
            <text x={18+indent} y={y+13} fontSize="8" fontWeight="700" fill="#374151">[{l.n}] {l.label}</text>
            <text x={18+indent} y={y+25} fontSize="7.5" fill="#166534">✓ Proves: {l.proves}</text>
            <text x={18+indent} y={y+35} fontSize="7.5" fill="#dc2626">✗ Does NOT prove: {l.notProves}</text>
          </g>
        );
      })}

      <rect x="10" y="268" width="460" height="24" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="280" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">Health endpoint is only as reliable as its implementation — a stub returning 200 is no better than TCP check</text>
    </svg>
  );
}
