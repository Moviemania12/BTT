"use client";
export default function GlobalTrafficFlowDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gtf-title" style={{ width: "100%", height: "auto" }}>
      <title id="gtf-title">Multi-Cloud Global Traffic Flow: geo-routing across AWS, Azure and GCP regions</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MULTI-CLOUD GLOBAL TRAFFIC ROUTING</text>

      {/* Users */}
      {[
        { x: 10, label: "India Users", sub: "Mumbai, Bangalore" },
        { x: 310, label: "Europe Users", sub: "London, Frankfurt" },
        { x: 610, label: "US Users", sub: "New York, Chicago" },
      ].map(({ x, label, sub }) => (
        <g key={x}>
          <rect x={x} y={30} width={200} height={44} rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          <text x={x + 100} y={50} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">{label}</text>
          <text x={x + 100} y={65} fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">{sub}</text>
        </g>
      ))}

      {/* Global DNS / GTM */}
      <rect x="180" y="90" width="460" height="42" rx="6" fill="#7c3aed" />
      <text x="410" y="108" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">GLOBAL TRAFFIC MANAGER / DNS LOAD BALANCER</text>
      <text x="410" y="124" fontFamily="Arial,sans-serif" fontSize="8" fill="#e9d5ff" textAnchor="middle">AWS Route 53 (latency-based) · Azure Traffic Manager · GCP Global LB · Cloudflare Load Balancing</text>

      {/* Routing rules */}
      <rect x="10" y="148" width="800" height="32" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="162" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="middle">Routing Logic: Latency-based → nearest healthy endpoint. Failover: if primary unhealthy → secondary cloud. Geo-restriction: EU traffic → Azure West Europe only (GDPR).</text>
      <text x="410" y="175" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">Health checks: all endpoints every 30s. Unhealthy threshold: 3 consecutive failures. DNS TTL: 60 seconds (pre-lowered for fast failover).</text>

      {/* Three regional endpoints */}
      <rect x="10" y="194" width="240" height="100" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <rect x="10" y="194" width="240" height="22" rx="7" fill="#f97316" />
      <text x="130" y="210" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">AWS ap-south-1 (Mumbai)</text>
      <text x="130" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Primary: India + SE Asia users</text>
      <text x="130" y="248" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">EC2 + ALB + RDS (primary DB)</text>
      <text x="130" y="264" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">CloudFront CDN at edge</text>
      <text x="130" y="280" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#f97316" fontWeight="700" textAnchor="middle">Weight: 40% | Latency: lowest for India</text>

      <rect x="290" y="194" width="240" height="100" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <rect x="290" y="194" width="240" height="22" rx="7" fill="#2563EB" />
      <text x="410" y="210" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure West Europe (Amsterdam)</text>
      <text x="410" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Primary: European users (GDPR)</text>
      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Azure VM + App GW + Azure SQL</text>
      <text x="410" y="264" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Azure Front Door CDN</text>
      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563EB" fontWeight="700" textAnchor="middle">Weight: 30% | EU data residency</text>

      <rect x="570" y="194" width="240" height="100" rx="8" fill="#f0fdf4" stroke="#34A853" strokeWidth="2" />
      <rect x="570" y="194" width="240" height="22" rx="7" fill="#34A853" />
      <text x="690" y="210" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">GCP us-central1 (Iowa)</text>
      <text x="690" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Primary: North America users</text>
      <text x="690" y="248" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">GKE + Cloud Run + Cloud SQL</text>
      <text x="690" y="264" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Cloud CDN + Cloud Armor</text>
      <text x="690" y="280" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#34A853" fontWeight="700" textAnchor="middle">Weight: 30% | AI/ML processing</text>

      {/* Arrows */}
      <line x1="110" y1="74" x2="310" y2="110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="410" y1="74" x2="410" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="710" y1="74" x2="510" y2="110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="280" y1="111" x2="140" y2="132" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="410" y1="132" x2="410" y2="148" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="540" y1="111" x2="680" y2="132" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="130" y1="180" x2="130" y2="194" stroke="#f97316" strokeWidth="1.5" />
      <line x1="410" y1="180" x2="410" y2="194" stroke="#2563EB" strokeWidth="1.5" />
      <line x1="690" y1="180" x2="690" y2="194" stroke="#34A853" strokeWidth="1.5" />

      {/* Failover */}
      <rect x="10" y="305" width="800" height="28" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="410" y="322" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e" textAnchor="middle">Failover: AWS Mumbai down → Route 53 health check fails → traffic shifts to Azure West Europe + GCP Iowa. Recovery: automatic when health checks pass again.</text>
    </svg>
  );
}
