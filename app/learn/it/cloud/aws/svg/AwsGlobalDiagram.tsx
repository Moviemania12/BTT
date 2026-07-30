"use client";
export default function AwsGlobalDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ag-title">
      <title id="ag-title">AWS Global Infrastructure: Regions and Availability Zones</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS GLOBAL INFRASTRUCTURE: REGIONS AND AVAILABILITY ZONES</text>

      {/* World outline suggestion */}
      <rect x="20" y="40" width="780" height="280" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Region 1 — ap-south-1 */}
      <rect x="50" y="60" width="220" height="200" rx="10" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="160" y="82" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">REGION: ap-south-1</text>
      <text x="160" y="96" fontFamily="Arial,sans-serif" fontSize="9" fill="#3730a3" textAnchor="middle">Mumbai, India</text>
      {/* AZ-a */}
      <rect x="65" y="108" width="185" height="48" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="157" y="126" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ: ap-south-1a</text>
      <text x="157" y="141" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Isolated failure domain</text>
      {/* AZ-b */}
      <rect x="65" y="164" width="185" height="48" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="157" y="182" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ: ap-south-1b</text>
      <text x="157" y="197" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Separate power, cooling, connectivity</text>
      {/* AZ-c */}
      <rect x="65" y="220" width="185" height="28" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="157" y="238" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ: ap-south-1c</text>

      {/* Region 2 — us-east-1 */}
      <rect x="300" y="60" width="220" height="200" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">REGION: us-east-1</text>
      <text x="410" y="96" fontFamily="Arial,sans-serif" fontSize="9" fill="#15803d" textAnchor="middle">N. Virginia, USA</text>
      <rect x="315" y="108" width="190" height="48" rx="6" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="410" y="126" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">AZ: us-east-1a</text>
      <text x="410" y="141" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Isolated failure domain</text>
      <rect x="315" y="164" width="190" height="48" rx="6" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="410" y="182" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">AZ: us-east-1b</text>
      <text x="410" y="197" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Separate power, cooling, connectivity</text>
      <rect x="315" y="220" width="190" height="28" rx="6" fill="#bbf7d0" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="410" y="238" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">AZ: us-east-1c</text>

      {/* Region 3 — eu-west-1 */}
      <rect x="550" y="60" width="220" height="200" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="660" y="82" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">REGION: eu-west-1</text>
      <text x="660" y="96" fontFamily="Arial,sans-serif" fontSize="9" fill="#c2410c" textAnchor="middle">Ireland, EU</text>
      <rect x="565" y="108" width="190" height="48" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
      <text x="660" y="126" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">AZ: eu-west-1a</text>
      <text x="660" y="141" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Isolated failure domain</text>
      <rect x="565" y="164" width="190" height="48" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
      <text x="660" y="182" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">AZ: eu-west-1b</text>
      <text x="660" y="197" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">Separate power, cooling, connectivity</text>
      <rect x="565" y="220" width="190" height="28" rx="6" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5" />
      <text x="660" y="238" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">AZ: eu-west-1c</text>

      {/* Key notes */}
      <rect x="50" y="278" width="720" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="60" y="293" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569">Key: Region = independent geographic location. AZ = logically isolated failure domain within Region (separate power/cooling/network).</text>
      <text x="60" y="307" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569">AZ is NOT guaranteed to be a single building. Regions do NOT share infrastructure. Data stays in Region unless explicitly moved.</text>
    </svg>
  );
}
