"use client";
// Diagram 6 — Generic Educational NAS Management Interface Dashboard
// IMPORTANT: This is a generic educational illustration — NOT an OEM screenshot.
// Future image: /public/images/articles/nas/nas-management-dashboard.png
export default function NasManagementUI() {
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Generic educational NAS management interface — not an OEM screenshot"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="380" fill="#f1f5f9" rx="12"/>

      {/* Watermark label */}
      <rect x="160" y="6" width="540" height="18" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="430" y="19" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">
        GENERIC EDUCATIONAL INTERFACE — NOT AN OEM SCREENSHOT
      </text>

      {/* Top bar */}
      <rect x="10" y="30" width="840" height="30" rx="4" fill="#1e293b"/>
      <text x="24" y="50" fontSize="11" fontWeight="700" fill="#f8fafc">NAS Management Console</text>
      <text x="380" y="50" fontSize="9" fill="#94a3b8">nas01.dc.company.local</text>
      <circle cx="720" cy="45" r="5" fill="#22c55e"/>
      <text x="730" y="49" fontSize="9" fill="#94a3b8">System Healthy</text>
      <rect x="770" y="36" width="18" height="18" rx="3" fill="#374151"/>
      <text x="779" y="49" textAnchor="middle" fontSize="9" fill="#f8fafc">🔔</text>
      <text x="800" y="49" fontSize="9" fill="#94a3b8">2 warn</text>

      {/* Sidebar */}
      <rect x="10" y="62" width="140" height="308" rx="4" fill="#0f172a"/>
      {["Dashboard","Storage","Shares","NFS Exports","Network","Sessions","Users","Quotas","Snapshots","Replication","Logs","Settings"].map((item, i) => (
        <g key={i}>
          <rect x="12" y={66 + i * 23} width="136" height="21" rx="3" fill={i === 0 ? "#2563eb" : "transparent"}/>
          <text x="22" y={81 + i * 23} fontSize="9" fill={i === 0 ? "#fff" : "#94a3b8"}>{item}</text>
        </g>
      ))}

      {/* Main content area */}
      <rect x="158" y="62" width="692" height="308" rx="4" fill="#fff"/>

      {/* Dashboard cards row 1 */}
      {[
        { x: 168, title: "System Health", content: ["Controller A  ✓", "Controller B  ✓", "Drives: 24 / 24 OK", "PSU A & B  ✓"], color: "#22c55e" },
        { x: 368, title: "Capacity", content: ["Used: 68%", "Free: 3.2 TB", "Snapshots: 420 GB", "Quota usage: 71%"], color: "#2563eb" },
        { x: 568, title: "Performance", content: ["IOPS: 12,400", "Throughput: 1.8 GB/s", "Avg Latency: 2.1 ms", "Cache Hit: 84%"], color: "#7c3aed" },
      ].map((card, i) => (
        <g key={i}>
          <rect x={card.x} y={72} width={185} height={105} rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
          <rect x={card.x} y={72} width={185} height={22} rx="6" fill={card.color} opacity="0.12"/>
          <text x={card.x + 10} y={88} fontSize="9.5" fontWeight="700" fill="#111827">{card.title}</text>
          {card.content.map((line, li) => (
            <text key={li} x={card.x + 10} y={104 + li * 16} fontSize="8.5" fill="#374151">{line}</text>
          ))}
        </g>
      ))}

      {/* Active Sessions card */}
      <rect x="168" y="186" width="280" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="178" y="202" fontSize="9.5" fontWeight="700" fill="#111827">Active Sessions</text>
      <text x="178" y="220" fontSize="8.5" fill="#374151">SMB Sessions: 142</text>
      <text x="178" y="236" fontSize="8.5" fill="#374151">NFS Mounts: 38</text>
      <text x="178" y="252" fontSize="8.5" fill="#374151">Auth failures (last hour): 3</text>

      {/* Replication Status */}
      <rect x="460" y="186" width="280" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="470" y="202" fontSize="9.5" fontWeight="700" fill="#111827">Replication / Backup</text>
      <text x="470" y="220" fontSize="8.5" fill="#22c55e">● Replication: Running (lag: 4 min)</text>
      <text x="470" y="236" fontSize="8.5" fill="#374151">Last snapshot: 2 hours ago</text>
      <text x="470" y="252" fontSize="8.5" fill="#374151">Snapshot space: 420 GB</text>

      {/* Alerts */}
      <rect x="168" y="276" width="572" height="84" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="178" y="292" fontSize="9.5" fontWeight="700" fill="#111827">Active Alerts &amp; Recent Events</text>
      <circle cx="180" cy="308" r="4" fill="#f59e0b"/>
      <text x="190" y="312" fontSize="8.5" fill="#374151">Drive Bay 14 — predictive failure (S.M.A.R.T.) — Schedule replacement</text>
      <circle cx="180" cy="326" r="4" fill="#f59e0b"/>
      <text x="190" y="330" fontSize="8.5" fill="#374151">Storage pool capacity at 68% — monitor growth</text>
      <circle cx="180" cy="344" r="4" fill="#22c55e"/>
      <text x="190" y="348" fontSize="8.5" fill="#374151">Snapshot completed successfully — 2 hours ago</text>

      <text x="430" y="373" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: nas-management-dashboard.png</text>
    </svg>
  );
}
