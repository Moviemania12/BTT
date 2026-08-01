"use client";
export default function DisasterRecoveryDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="drd-title" style={{ width: "100%", height: "auto" }}>
      <title id="drd-title">Hybrid Disaster Recovery Patterns: Cold, Pilot Light, Warm Standby, Active-Active</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">HYBRID DISASTER RECOVERY PATTERNS</text>

      {/* Labels */}
      {[
        { x: 10, label: "COLD / BACKUP-RESTORE", color: "#6b7280", cost: "Cost: ₹", rto: "RTO: Hours-Days", rpo: "RPO: Hours" },
        { x: 210, label: "PILOT LIGHT", color: "#f97316", cost: "Cost: ₹₹", rto: "RTO: 30-60 min", rpo: "RPO: Minutes" },
        { x: 410, label: "WARM STANDBY", color: "#2563EB", cost: "Cost: ₹₹₹", rto: "RTO: Minutes", rpo: "RPO: Seconds-Minutes" },
        { x: 610, label: "ACTIVE-ACTIVE", color: "#16a34a", cost: "Cost: ₹₹₹₹", rto: "RTO: ~0", rpo: "RPO: ~0" },
      ].map(({ x, label, color, cost, rto, rpo }) => (
        <g key={x}>
          <rect x={x} y={30} width={195} height={340} rx="8" fill="#f8fafc" stroke={color} strokeWidth="2" />
          <rect x={x} y={30} width={195} height={26} rx="7" fill={color} />
          <text x={x + 97} y={46} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">{label}</text>
          <text x={x + 97} y={70} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={color} textAnchor="middle">{cost}</text>
          <text x={x + 97} y={84} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">{rto}</text>
          <text x={x + 97} y={98} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">{rpo}</text>
        </g>
      ))}

      {/* Cold DR detail */}
      <rect x="18" y="108" width="179" height="120" rx="5" fill="#e5e7eb" />
      <text x="107" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1f2937" textAnchor="middle">Primary DC (Running)</text>
      <rect x="26" y="130" width="163" height="20" rx="3" fill="#6b7280" />
      <text x="107" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#f9fafb" textAnchor="middle">VM Snapshots → S3/Blob</text>
      <rect x="26" y="154" width="163" height="20" rx="3" fill="#9ca3af" />
      <text x="107" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#1f2937" textAnchor="middle">DB Backups → Cloud Storage</text>
      <rect x="26" y="178" width="163" height="20" rx="3" fill="#d1d5db" />
      <text x="107" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#1f2937" textAnchor="middle">IaC Templates stored (Terraform)</text>
      <text x="107" y="218" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280" textAnchor="middle">DR: restore VMs from snapshots</text>
      <text x="107" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280" textAnchor="middle">+ restore DB + update DNS</text>
      <text x="107" y="248" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#991b1b" textAnchor="middle">Risk: long recovery time</text>
      <text x="107" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#991b1b" textAnchor="middle">Use when: non-critical systems</text>
      <text x="107" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Tools: AWS Backup, Azure Backup,</text>
      <text x="107" y="304" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Veeam, Commvault, rsync</text>
      <text x="107" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Test: Quarterly restore drill</text>

      {/* Pilot Light */}
      <rect x="218" y="108" width="179" height="120" rx="5" fill="#fff7ed" />
      <text x="307" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412" textAnchor="middle">Core DB Replica (Always On)</text>
      <rect x="226" y="130" width="163" height="20" rx="3" fill="#f97316" />
      <text x="307" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle">DB Read Replica → Cloud</text>
      <rect x="226" y="154" width="163" height="20" rx="3" fill="#fdba74" />
      <text x="307" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c2d12" textAnchor="middle">Pre-created VPC/VNet + Subnets</text>
      <rect x="226" y="178" width="163" height="20" rx="3" fill="#fed7aa" />
      <text x="307" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c2d12" textAnchor="middle">AMIs/Images ready (not running)</text>
      <text x="307" y="218" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">DR: promote DB + launch VMs</text>
      <text x="307" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">from images + update DNS</text>
      <text x="307" y="248" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">Good balance: cost vs RTO</text>
      <text x="307" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">Use: critical apps, RTO 30-60 min</text>
      <text x="307" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Tools: AWS DRS, ASR, Cloud SQL</text>
      <text x="307" y="304" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">cross-region replicas</text>
      <text x="307" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Test: Monthly failover test</text>

      {/* Warm Standby */}
      <rect x="418" y="108" width="179" height="120" rx="5" fill="#eff6ff" />
      <text x="507" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Scaled-Down Replica (Running)</text>
      <rect x="426" y="130" width="163" height="20" rx="3" fill="#2563EB" />
      <text x="507" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle">DB Active-Passive replica</text>
      <rect x="426" y="154" width="163" height="20" rx="3" fill="#3b82f6" />
      <text x="507" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle">Min VMs running (t3.small)</text>
      <rect x="426" y="178" width="163" height="20" rx="3" fill="#93c5fd" />
      <text x="507" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e3a8a" textAnchor="middle">Route 53/Traffic Mgr health check</text>
      <text x="507" y="218" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">DR: scale up VMs + promote DB</text>
      <text x="507" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">+ DNS failover (minutes)</text>
      <text x="507" y="248" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">RTO minutes, RPO seconds</text>
      <text x="507" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">Use: business-critical applications</text>
      <text x="507" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Tools: Auto Scaling, VMSS, MIG,</text>
      <text x="507" y="304" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">SQL Always On AG, ASR</text>
      <text x="507" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Test: Bi-weekly automated test</text>

      {/* Active-Active */}
      <rect x="618" y="108" width="179" height="120" rx="5" fill="#f0fdf4" />
      <text x="707" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Both Sites Serving Traffic</text>
      <rect x="626" y="130" width="163" height="20" rx="3" fill="#16a34a" />
      <text x="707" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle">Global LB distributes traffic</text>
      <rect x="626" y="154" width="163" height="20" rx="3" fill="#22c55e" />
      <text x="707" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle">Multi-master DB or read/write split</text>
      <rect x="626" y="178" width="163" height="20" rx="3" fill="#86efac" />
      <text x="707" y="192" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Health checks → auto reroute</text>
      <text x="707" y="218" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">DR: remove failed site from LB</text>
      <text x="707" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">remaining site handles all load</text>
      <text x="707" y="248" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#15803d" textAnchor="middle">Zero RTO, Zero RPO (ideal)</text>
      <text x="707" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">Complex: conflict resolution needed</text>
      <text x="707" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Tools: Route 53 / Traffic Mgr /</text>
      <text x="707" y="304" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Anycast LB, Spanner, CockroachDB</text>
      <text x="707" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">Test: Regular chaos engineering</text>

      {/* RTO/RPO scale bar */}
      <rect x="10" y="378" width="800" height="16" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="10" y="378" width="200" height="16" rx="4" fill="#fee2e2" />
      <rect x="210" y="378" width="200" height="16" fill="#ffedd5" />
      <rect x="410" y="378" width="200" height="16" fill="#dbeafe" />
      <rect x="610" y="378" width="200" height="16" rx="4" fill="#dcfce7" />
      <text x="110" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">Highest Risk → Cost Effective</text>
      <text x="310" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Balanced Trade-off</text>
      <text x="510" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Low Risk, Higher Cost</text>
      <text x="710" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Lowest Risk → Highest Cost</text>
    </svg>
  );
}
