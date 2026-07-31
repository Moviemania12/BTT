"use client";
export default function GcpVpcDiagram() {
  return (
    <svg viewBox="0 0 820 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gvpc-title">
      <title id="gvpc-title">GCP Global VPC Architecture: Regional Subnets, Firewall Rules, Cloud NAT</title>
      <rect width="820" height="400" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GCP GLOBAL VPC — REGIONAL SUBNETS AND FIREWALL RULES</text>

      {/* Global VPC boundary */}
      <rect x="20" y="36" width="780" height="300" rx="10" fill="#f8fafc" stroke="#4285F4" strokeWidth="2.5" strokeDasharray="8,4" />
      <text x="32" y="54" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4285F4">GLOBAL VPC: my-vpc — automatically spans all Regions</text>
      <text x="32" y="68" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8">Firewall Rules applied at VPC level (not subnet) — target by network tags or Service Accounts</text>

      {/* Internet */}
      <rect x="330" y="74" width="160" height="28" rx="6" fill="#0f172a" />
      <text x="410" y="93" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">INTERNET</text>

      {/* Cloud Armor / LB */}
      <rect x="270" y="112" width="140" height="26" rx="5" fill="#EA4335" />
      <text x="340" y="130" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Cloud Armor + HTTPS LB</text>
      <rect x="420" y="112" width="130" height="26" rx="5" fill="#4285F4" />
      <text x="485" y="130" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">Cloud NAT (outbound)</text>
      <line x1="410" y1="102" x2="340" y2="112" stroke="#EA4335" strokeWidth="1.5" />
      <line x1="410" y1="102" x2="485" y2="112" stroke="#4285F4" strokeWidth="1.5" />

      {/* Region asia-south1 */}
      <rect x="36" y="148" width="350" height="172" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="211" y="167" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Region: asia-south1 (Regional Subnet spans all Zones)</text>

      {/* Web subnet */}
      <rect x="52" y="176" width="150" height="80" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="127" y="194" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Web Subnet</text>
      <text x="127" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">10.0.1.0/24 — regional</text>
      <rect x="62" y="216" width="130" height="18" rx="4" fill="#16a34a" />
      <text x="127" y="229" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Compute Engine VMs</text>
      <rect x="62" y="238" width="130" height="12" rx="3" fill="#bbf7d0" />
      <text x="127" y="248" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Tag: web-server → allow 443</text>

      {/* App subnet */}
      <rect x="220" y="176" width="150" height="80" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="295" y="194" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">App Subnet</text>
      <text x="295" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">10.0.2.0/24 — regional</text>
      <rect x="230" y="216" width="130" height="18" rx="4" fill="#2563EB" />
      <text x="295" y="229" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ffffff" textAnchor="middle">GKE Nodes / App VMs</text>
      <rect x="230" y="238" width="130" height="12" rx="3" fill="#bfdbfe" />
      <text x="295" y="248" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">SA: app-sa → allow from web</text>

      {/* DB subnet */}
      <rect x="52" y="270" width="318" height="38" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="211" y="285" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#6b21a8" textAnchor="middle">DB Subnet — 10.0.3.0/24</text>
      <text x="211" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Cloud SQL (Private IP) — Private Service Access — no public IP</text>

      {/* Region us-central1 */}
      <rect x="434" y="148" width="350" height="172" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
      <text x="609" y="167" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#9a3412" textAnchor="middle">Region: us-central1 (same VPC)</text>

      <rect x="450" y="176" width="150" height="80" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
      <text x="525" y="194" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412" textAnchor="middle">Web Subnet</text>
      <text x="525" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">10.1.1.0/24 — regional</text>
      <rect x="460" y="216" width="130" height="18" rx="4" fill="#f97316" />
      <text x="525" y="229" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Compute Engine VMs</text>
      <rect x="460" y="238" width="130" height="12" rx="3" fill="#ffedd5" />
      <text x="525" y="248" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Same VPC — direct internal routing</text>

      <rect x="618" y="176" width="150" height="80" rx="6" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" />
      <text x="693" y="194" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#9a3412" textAnchor="middle">App Subnet</text>
      <text x="693" y="208" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">10.1.2.0/24 — regional</text>
      <rect x="628" y="216" width="130" height="18" rx="4" fill="#c2410c" />
      <text x="693" y="229" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ffffff" textAnchor="middle">GKE / App VMs</text>
      <rect x="628" y="238" width="130" height="12" rx="3" fill="#fed7aa" />
      <text x="693" y="248" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Same VPC firewall rules apply</text>

      <rect x="450" y="270" width="318" height="38" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="609" y="285" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Cloud Spanner / BigQuery (us-central1)</text>
      <text x="609" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Global routing via VPC — no extra peering config</text>

      {/* Key difference */}
      <rect x="20" y="348" width="780" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="30" y="364" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e">Key GCP Difference:</text>
      <text x="148" y="364" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f">VMs across Regions in the same VPC can communicate via internal IP — no VPC Peering, Transit GW, or additional config needed.</text>
      <text x="30" y="381" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f">Firewall Rules use network tags (strings on VMs) or Service Account identity — not IP CIDRs per rule. Deny rules possible, evaluated by priority (0–65535).</text>
    </svg>
  );
}
