"use client";
export default function AwsEdgeInfraDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aei-title">
      <title id="aei-title">AWS Extended Infrastructure: Edge Locations, Local Zones, Outposts</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS GLOBAL REACH: BEYOND REGIONS AND AZs</text>

      {/* AWS Region */}
      <rect x="20" y="36" width="200" height="170" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="120" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">AWS REGION</text>
      <text x="120" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">ap-south-1 (Mumbai)</text>
      <rect x="36" y="80" width="168" height="36" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="120" y="96" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">AZ-a / AZ-b / AZ-c</text>
      <text x="120" y="110" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1d4ed8" textAnchor="middle">Core compute, storage, databases</text>
      <rect x="36" y="124" width="168" height="24" rx="4" fill="#bfdbfe" />
      <text x="120" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Backbone services available</text>
      <rect x="36" y="155" width="168" height="42" rx="4" fill="#e0f2fe" />
      <text x="120" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#075985" textAnchor="middle">Region Selection Factors:</text>
      <text x="120" y="183" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">Latency • Data residency</text>
      <text x="120" y="195" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">Service availability • Cost</text>

      {/* Edge Locations */}
      <rect x="240" y="36" width="170" height="120" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="325" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">EDGE LOCATIONS</text>
      <text x="325" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">450+ worldwide</text>
      <rect x="256" y="80" width="138" height="28" rx="4" fill="#bbf7d0" />
      <text x="325" y="94" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">CloudFront CDN</text>
      <text x="325" y="106" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">Cache content close to users</text>
      <rect x="256" y="114" width="138" height="28" rx="4" fill="#dcfce7" />
      <text x="325" y="128" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Route 53 Resolver</text>
      <text x="325" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#15803d" textAnchor="middle">DNS resolution at edge</text>

      {/* Local Zones */}
      <rect x="240" y="168" width="170" height="80" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="325" y="186" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#9a3412" textAnchor="middle">LOCAL ZONES</text>
      <text x="325" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#c2410c" textAnchor="middle">AWS infra in metro areas</text>
      <rect x="256" y="208" width="138" height="32" rx="4" fill="#fed7aa" />
      <text x="325" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Single-digit ms latency</text>
      <text x="325" y="235" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Media, gaming, realtime apps</text>

      {/* Wavelength */}
      <rect x="430" y="36" width="170" height="100" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" />
      <text x="515" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8" textAnchor="middle">WAVELENGTH ZONES</text>
      <text x="515" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Telecom 5G networks</text>
      <rect x="446" y="80" width="138" height="44" rx="4" fill="#e9d5ff" />
      <text x="515" y="96" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b21a8" textAnchor="middle">Sub-10ms to 5G devices</text>
      <text x="515" y="110" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b21a8" textAnchor="middle">Edge compute on carrier network</text>
      <text x="515" y="124" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">IoT, AR/VR, realtime streaming</text>

      {/* Outposts */}
      <rect x="430" y="148" width="170" height="100" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="515" y="166" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">AWS OUTPOSTS</text>
      <text x="515" y="180" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">AWS rack in YOUR data center</text>
      <rect x="446" y="188" width="138" height="52" rx="4" fill="#e2e8f0" />
      <text x="515" y="204" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">Same AWS APIs on-premises</text>
      <text x="515" y="218" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">Regulatory/latency requirements</text>
      <text x="515" y="232" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">Managed by AWS, in your facility</text>

      {/* Global Accelerator */}
      <rect x="620" y="36" width="180" height="212" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="710" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">GLOBAL ACCELERATOR</text>
      <text x="710" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">AWS backbone routing</text>
      <rect x="636" y="80" width="148" height="60" rx="4" fill="#fde68a" />
      <text x="710" y="96" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">Anycast IPs globally</text>
      <text x="710" y="110" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Traffic enters AWS network at</text>
      <text x="710" y="122" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">nearest edge location</text>
      <text x="710" y="134" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Routed via AWS backbone</text>
      <rect x="636" y="148" width="148" height="88" rx="4" fill="#fef3c7" />
      <text x="710" y="164" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">vs CloudFront:</text>
      <text x="710" y="178" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">CloudFront = content caching</text>
      <text x="710" y="192" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Global Accelerator = network</text>
      <text x="710" y="206" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">path optimization + failover</text>
      <text x="710" y="220" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Good for TCP/UDP apps,</text>
      <text x="710" y="232" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">gaming, VoIP</text>

      {/* Legend */}
      <rect x="20" y="260" width="780" height="64" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="30" y="278" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#0f172a">DC Engineer Mapping:</text>
      <text x="30" y="293" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Edge Location ≈ CDN PoP (Point of Presence) in your existing DC world</text>
      <text x="30" y="308" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Local Zone ≈ AWS micro-DC in a metro area — lower latency than main Region</text>
      <text x="30" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569">Outposts ≈ AWS-managed hardware in your private data center — same APIs</text>
    </svg>
  );
}
