"use client";
export default function AzureNetworkingDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="an-title">
      <title id="an-title">Azure Virtual Network: VNet, Subnets, NSG, Route Tables, Peering</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AZURE VIRTUAL NETWORK (VNet) ARCHITECTURE</text>

      {/* Internet */}
      <rect x="330" y="34" width="160" height="28" rx="6" fill="#0f172a" />
      <text x="410" y="53" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">INTERNET</text>

      {/* Azure Firewall / App Gateway */}
      <rect x="250" y="72" width="160" height="28" rx="5" fill="#dc2626" />
      <text x="330" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Firewall / App Gateway</text>
      <rect x="420" y="72" width="150" height="28" rx="5" fill="#7c3aed" />
      <text x="495" y="91" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure Load Balancer</text>
      <line x1="410" y1="62" x2="330" y2="72" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="410" y1="62" x2="495" y2="72" stroke="#7c3aed" strokeWidth="1.5" />

      {/* VNet boundary */}
      <rect x="20" y="110" width="780" height="280" rx="10" fill="#f8fafc" stroke="#0078D4" strokeWidth="2.5" strokeDasharray="8,4" />
      <text x="32" y="128" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0078D4">VNet: 10.0.0.0/16 — spans entire Region (not tied to single AZ)</text>

      {/* Hub subnet */}
      <rect x="300" y="136" width="220" height="56" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="410" y="156" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Hub / Gateway Subnet</text>
      <text x="410" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">10.0.0.0/27 — VPN GW, ExpressRoute GW</text>
      <text x="410" y="182" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">NSG not allowed on GatewaySubnet</text>

      {/* Lines to subnets */}
      <line x1="330" y1="100" x2="380" y2="136" stroke="#374151" strokeWidth="1.5" />
      <line x1="495" y1="100" x2="440" y2="136" stroke="#374151" strokeWidth="1.5" />

      {/* Web subnet */}
      <rect x="36" y="210" width="220" height="100" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="146" y="230" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Web Subnet (Public-facing)</text>
      <text x="146" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">10.0.1.0/24</text>
      <rect x="48" y="252" width="196" height="20" rx="4" fill="#bbf7d0" />
      <text x="146" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">NSG: Allow 443 inbound (Internet)</text>
      <rect x="48" y="276" width="196" height="28" rx="4" fill="#16a34a" />
      <text x="146" y="289" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">VMs / VMSS / App GW</text>
      <text x="146" y="302" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dcfce7" textAnchor="middle">Public IP optional</text>

      {/* App subnet */}
      <rect x="300" y="210" width="220" height="100" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="410" y="230" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">App Subnet (Private)</text>
      <text x="410" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">10.0.2.0/24</text>
      <rect x="312" y="252" width="196" height="20" rx="4" fill="#dbeafe" />
      <text x="410" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">NSG: Allow 8080 from Web Subnet only</text>
      <rect x="312" y="276" width="196" height="28" rx="4" fill="#2563EB" />
      <text x="410" y="289" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">App VMs / AKS Nodes</text>
      <text x="410" y="302" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">No public IP</text>

      {/* DB subnet */}
      <rect x="564" y="210" width="220" height="100" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="674" y="230" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">DB Subnet (Private)</text>
      <text x="674" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">10.0.3.0/24</text>
      <rect x="576" y="252" width="196" height="20" rx="4" fill="#fed7aa" />
      <text x="674" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">NSG: Allow 1433 from App Subnet only</text>
      <rect x="576" y="276" width="196" height="28" rx="4" fill="#f97316" />
      <text x="674" y="289" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">Azure SQL / Cosmos DB</text>
      <text x="674" y="302" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fff7ed" textAnchor="middle">Private Endpoint preferred</text>

      {/* Service Endpoint / Private Link note */}
      <rect x="36" y="322" width="748" height="56" rx="6" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="410" y="340" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6b21a8" textAnchor="middle">NSG (Network Security Group) — Azure's stateful subnet/NIC-level firewall</text>
      <text x="410" y="356" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Inbound + Outbound rules. Priority 100–4096 (lower = higher priority). Default rules allow VNet traffic, deny Internet inbound.</text>
      <text x="410" y="371" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">VNet Peering: connect two VNets (same or different Region/subscription). Service Tags: simplify rules (AzureLoadBalancer, Internet, VirtualNetwork).</text>

      {/* Connections */}
      <line x1="410" y1="192" x2="146" y2="210" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="410" y1="192" x2="410" y2="210" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="410" y1="192" x2="674" y2="210" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,3" />
    </svg>
  );
}
