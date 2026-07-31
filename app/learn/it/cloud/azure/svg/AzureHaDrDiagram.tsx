"use client";
export default function AzureHaDrDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ahd-title">
      <title id="ahd-title">Azure High Availability and Disaster Recovery Architecture</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE HA + DISASTER RECOVERY ARCHITECTURE</text>

      {/* Left: HA within region */}
      <rect x="20" y="36" width="380" height="300" rx="8" fill="#eff6ff" stroke="#0078D4" strokeWidth="2" />
      <text x="210" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0078D4" textAnchor="middle">HIGH AVAILABILITY — Within Region</text>

      <rect x="36" y="66" width="348" height="28" rx="5" fill="#0078D4" />
      <text x="210" y="84" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Traffic Manager / Front Door (DNS/Anycast LB)</text>

      <line x1="210" y1="94" x2="140" y2="110" stroke="#0078D4" strokeWidth="1.5" />
      <line x1="210" y1="94" x2="280" y2="110" stroke="#0078D4" strokeWidth="1.5" />

      <rect x="48" y="110" width="152" height="80" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="124" y="128" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ 1</text>
      <rect x="60" y="136" width="128" height="22" rx="4" fill="#2563EB" />
      <text x="124" y="151" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">VM Scale Set (2 VMs)</text>
      <rect x="60" y="162" width="128" height="22" rx="4" fill="#1e40af" />
      <text x="124" y="177" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure SQL (primary)</text>

      <rect x="220" y="110" width="152" height="80" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="296" y="128" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ 2</text>
      <rect x="232" y="136" width="128" height="22" rx="4" fill="#2563EB" />
      <text x="296" y="151" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">VM Scale Set (2 VMs)</text>
      <rect x="232" y="162" width="128" height="22" rx="4" fill="#1e40af" />
      <text x="296" y="177" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure SQL (geo-sec)</text>

      <line x1="188" y1="184" x2="232" y2="184" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
      <text x="210" y="199" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">sync replication</text>

      <rect x="36" y="208" width="348" height="50" rx="5" fill="#bfdbfe" />
      <text x="210" y="226" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Azure Load Balancer (Standard) — Zone-redundant</text>
      <text x="210" y="241" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Zone-redundant: single frontend, serves all AZs</text>
      <text x="210" y="254" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563eb" textAnchor="middle">Availability Sets: Fault Domains (2-3) + Update Domains (up to 20)</text>

      <rect x="36" y="266" width="348" height="60" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="210" y="284" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">SLA Targets (indicative — always verify with Microsoft SLA docs)</text>
      <text x="50" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• Single VM (Premium SSD): 99.9%</text>
      <text x="50" y="314" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• Availability Set: 99.95%</text>
      <text x="250" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• Availability Zones: 99.99%</text>
      <text x="250" y="314" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d">• Zone-redundant services: 99.99%+</text>

      {/* Right: DR */}
      <rect x="420" y="36" width="380" height="300" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="610" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">DISASTER RECOVERY — Cross-Region</text>

      <rect x="436" y="66" width="348" height="36" rx="5" fill="#f97316" />
      <text x="610" y="82" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Site Recovery (ASR)</text>
      <text x="610" y="96" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">Continuous replication: Primary Region → DR Region (Pair)</text>

      {[
        ["RPO", "Azure VMs: as low as 30 seconds"],
        ["RTO", "Minutes (automated failover orchestration)"],
        ["Replication", "Continuous block-level replication to DR region"],
        ["Failover", "Test failover (no production impact) before real event"],
        ["Failback", "Re-protect + failback after primary restored"],
      ].map(([label, desc], i) => (
        <g key={label}>
          <rect x={436} y={110 + i * 26} width={348} height={23} rx="3" fill={i % 2 === 0 ? "#ffedd5" : "#fff7ed"} />
          <text x={444} y={126 + i * 26} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412">{label}:</text>
          <text x={490} y={126 + i * 26} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">{desc}</text>
        </g>
      ))}

      <rect x="436" y="244" width="348" height="84" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="610" y="262" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#92400e" textAnchor="middle">DR Patterns (same as industry standard)</text>
      <text x="444" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">• Backup/Restore: Azure Backup → Recovery Vault. Lowest cost, higher RTO.</text>
      <text x="444" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">• Pilot Light: minimal DR infra (DB only) + ASR. Scale up on DR event.</text>
      <text x="444" y="308" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">• Warm Standby: scaled-down replica always running in DR region.</text>
      <text x="444" y="323" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">• Active-Active: Traffic Manager routes to both regions simultaneously.</text>

      {/* Pair arrow */}
      <line x1="400" y1="186" x2="420" y2="186" stroke="#374151" strokeWidth="2" strokeDasharray="5,3" />
      <polygon points="418,182 426,186 418,190" fill="#374151" />
    </svg>
  );
}
