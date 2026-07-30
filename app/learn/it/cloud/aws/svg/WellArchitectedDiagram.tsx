"use client";
export default function WellArchitectedDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="wa-title">
      <title id="wa-title">AWS Well-Architected Framework: Six Pillars</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS WELL-ARCHITECTED FRAMEWORK — SIX PILLARS</text>

      {[
        {
          x: 20, y: 36, w: 250, h: 130,
          title: "1. OPERATIONAL EXCELLENCE", color: "#2563EB", bg: "#eff6ff",
          points: ["Run and monitor systems", "Continual improvement", "IaC for consistent deployments", "Runbooks and playbooks", "Learn from failures (post-mortem)"],
        },
        {
          x: 285, y: 36, w: 250, h: 130,
          title: "2. SECURITY", color: "#dc2626", bg: "#fef2f2",
          points: ["Strong identity foundation (IAM)", "Enable traceability (CloudTrail)", "Apply security at all layers", "Protect data in transit + at rest", "Prepare for security events"],
        },
        {
          x: 550, y: 36, w: 250, h: 130,
          title: "3. RELIABILITY", color: "#7c3aed", bg: "#faf5ff",
          points: ["Recover from failures automatically", "Test recovery procedures", "Scale horizontally", "Stop guessing capacity", "Manage change in automation"],
        },
        {
          x: 20, y: 178, w: 250, h: 130,
          title: "4. PERFORMANCE EFFICIENCY", color: "#f97316", bg: "#fff7ed",
          points: ["Select right resource types", "Monitor performance", "Use serverless where applicable", "Go global in minutes", "Experiment more often"],
        },
        {
          x: 285, y: 178, w: 250, h: 130,
          title: "5. COST OPTIMIZATION", color: "#16a34a", bg: "#f0fdf4",
          points: ["Adopt consumption model", "Measure overall efficiency", "Avoid paying for undifferentiated work", "Analyze and attribute expenditure", "Use managed services"],
        },
        {
          x: 550, y: 178, w: 250, h: 130,
          title: "6. SUSTAINABILITY", color: "#0891b2", bg: "#ecfeff",
          points: ["Use managed services (better utilization)", "Right-size workloads", "Use efficient instance types", "Minimize data movement", "Graviton (ARM) for energy efficiency"],
        },
      ].map(({ x, y, w, h, title, color, bg, points }) => (
        <g key={title}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={y} width={w} height={26} rx="7" fill={color} />
          <text x={x + w/2} y={y + 17} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          {points.map((pt, i) => (
            <text key={i} x={x + 10} y={y + 44 + i*18} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">• {pt}</text>
          ))}
        </g>
      ))}

      <rect x="20" y="318" width="780" height="16" rx="4" fill="#f1f5f9" />
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Well-Architected Tool in AWS Console: review workloads against these pillars, get improvement recommendations.</text>
    </svg>
  );
}
