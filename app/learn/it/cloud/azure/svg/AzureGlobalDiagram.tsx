"use client";
export default function AzureGlobalDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ag-title">
      <title id="ag-title">Azure Global Infrastructure: Regions, Availability Zones and Region Pairs</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE GLOBAL INFRASTRUCTURE: REGIONS, AZs AND REGION PAIRS</text>

      {/* Region Pair arrow */}
      <rect x="20" y="36" width="380" height="300" rx="10" fill="#eff6ff" stroke="#0078D4" strokeWidth="2" />
      <text x="210" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0078D4" textAnchor="middle">REGION: East US (Primary)</text>
      <text x="210" y="70" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">Virginia, USA — Region Pair: West US</text>

      {["Zone 1", "Zone 2", "Zone 3"].map((zone, i) => (
        <g key={zone}>
          <rect x={36 + i * 118} y={84} width={110} height={120} rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={91 + i * 118} y={104} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ {i + 1}</text>
          <text x={91 + i * 118} y={118} fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Availability</text>
          <text x={91 + i * 118} y={130} fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Zone {i + 1}</text>
          <rect x={46 + i * 118} y={138} width={90} height={20} rx="3" fill="#bfdbfe" />
          <text x={91 + i * 118} y={152} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">Independent power</text>
          <rect x={46 + i * 118} y={162} width={90} height={20} rx="3" fill="#bfdbfe" />
          <text x={91 + i * 118} y={176} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">Separate cooling</text>
          <rect x={46 + i * 118} y={186} width={90} height={14} rx="3" fill="#bfdbfe" />
          <text x={91 + i * 118} y={197} fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">Isolated network</text>
        </g>
      ))}

      <rect x="36" y="216" width="348" height="36" rx="5" fill="#1e40af" />
      <text x="210" y="231" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Regional Services</text>
      <text x="210" y="245" fontFamily="Arial,sans-serif" fontSize="8" fill="#bfdbfe" textAnchor="middle">VMs, Storage, SQL DB, VNet, Load Balancer…</text>
      <rect x="36" y="260" width="348" height="28" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="210" y="272" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Region Pair: Automatic failover priority</text>
      <text x="210" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Updates rolled out sequentially — not both at once</text>
      <rect x="36" y="296" width="348" height="30" rx="5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="210" y="310" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Edge Locations: CDN PoPs worldwide (Azure CDN / Front Door)</text>
      <text x="210" y="322" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#2563eb" textAnchor="middle">Azure Edge Zones + Azure Orbital for 5G / satellite</text>

      {/* Pair arrow */}
      <line x1="400" y1="186" x2="420" y2="186" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4,3" />
      <polygon points="418,182 426,186 418,190" fill="#f97316" />
      <line x1="420" y1="186" x2="420" y2="186" stroke="#f97316" strokeWidth="2" />

      {/* Region B */}
      <rect x="420" y="36" width="380" height="300" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="610" y="56" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">REGION: West US (Pair)</text>
      <text x="610" y="70" fontFamily="Arial,sans-serif" fontSize="9" fill="#c2410c" textAnchor="middle">California, USA — Region Pair: East US</text>

      {["Zone 1", "Zone 2", "Zone 3"].map((zone, i) => (
        <g key={zone}>
          <rect x={436 + i * 118} y={84} width={110} height={120} rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
          <text x={491 + i * 118} y={104} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">AZ {i + 1}</text>
          <text x={491 + i * 118} y={118} fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Availability</text>
          <text x={491 + i * 118} y={130} fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Zone {i + 1}</text>
          <rect x={446 + i * 118} y={138} width={90} height={20} rx="3" fill="#ffedd5" />
          <text x={491 + i * 118} y={152} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Independent power</text>
          <rect x={446 + i * 118} y={162} width={90} height={20} rx="3" fill="#ffedd5" />
          <text x={491 + i * 118} y={176} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Separate cooling</text>
          <rect x={446 + i * 118} y={186} width={90} height={14} rx="3" fill="#ffedd5" />
          <text x={491 + i * 118} y={197} fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Isolated network</text>
        </g>
      ))}

      <rect x="436" y="216" width="348" height="36" rx="5" fill="#9a3412" />
      <text x="610" y="231" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Paired Region — DR Target</text>
      <text x="610" y="245" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">ASR replication, geo-redundant storage target…</text>
      <rect x="436" y="260" width="348" height="56" rx="5" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
      <text x="610" y="278" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412" textAnchor="middle">Region Pair Benefits:</text>
      <text x="610" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">• Platform updates not simultaneous</text>
      <text x="610" y="307" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">• GRS/GZRS storage replicates to pair</text>
      <text x="610" y="319" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">• ASR uses pair for DR by default</text>

      {/* Key */}
      <rect x="20" y="345" width="780" height="28" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="360" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0f172a">AZ ≠ single building. Region Pair = Microsoft's HA design for platform updates + GRS replication. Not all Regions have AZs.</text>
    </svg>
  );
}
