"use client";
// D7 — BGP Peering Model: iBGP, eBGP, Route Reflector, conceptual RIB model note
export default function BgpPeeringModel() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 440`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="BGP peering model with iBGP, eBGP, and Route Reflector"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="440" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">BGP Peering Model — iBGP, eBGP, Route Reflector</text>
      {/* ISPs */}
      <rect x="10" y="40" width="100" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="60" y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">ISP-A</text>
      <text x="60" y="68" textAnchor="middle" fontSize="8" fill="#991b1b">AS 100</text>
      <rect x="370" y="40" width="100" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="420" y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">ISP-B</text>
      <text x="420" y="68" textAnchor="middle" fontSize="8" fill="#92400e">AS 200</text>
      {/* Enterprise AS box */}
      <rect x="10" y="100" width={W-20} height="200" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,3"/>
      <text x={W/2} y="118" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0ea5e9">Enterprise AS 65001</text>
      {/* Edge routers */}
      <rect x="30" y="130" width="100" height="28" rx="5" fill="#0ea5e9"/>
      <text x="80" y="145" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Edge-1</text>
      <text x="80" y="155" textAnchor="middle" fontSize="7.5" fill="#e0f2fe">eBGP → ISP-A</text>
      <rect x="350" y="130" width="100" height="28" rx="5" fill="#0ea5e9"/>
      <text x="400" y="145" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Edge-2</text>
      <text x="400" y="155" textAnchor="middle" fontSize="7.5" fill="#e0f2fe">eBGP → ISP-B</text>
      {/* Route Reflector */}
      <rect x="185" y="178" width="110" height="36" rx="7" fill="#8b5cf6"/>
      <text x="240" y="194" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Route Reflector</text>
      <text x="240" y="206" textAnchor="middle" fontSize="7.5" fill="#e9d5ff">RR1 (+ RR2 for redundancy)</text>
      {/* Core router */}
      <rect x="185" y="244" width="110" height="28" rx="5" fill="#1e40af"/>
      <text x="240" y="258" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Core-1</text>
      <text x="240" y="270" textAnchor="middle" fontSize="7.5" fill="#bfdbfe">iBGP client → RR</text>
      {/* iBGP lines */}
      {[[80,158,240,178],[400,158,240,178],[240,214,240,244],[80,158,240,214]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,2"/>
      ))}
      {/* eBGP lines */}
      <line x1="60" y1="76" x2="60" y2="130" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="30" y="107" fontSize="7.5" fill="#dc2626">eBGP</text>
      <line x1="420" y1="76" x2="420" y2="130" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="390" y="107" fontSize="7.5" fill="#f59e0b">eBGP</text>
      {/* RR annotation */}
      <rect x="10" y="310" width={W-20} height="60" rx="7" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1"/>
      <text x={W/2} y="326" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b5cf6">Route Reflector — iBGP Scale Solution</text>
      <text x={W/2} y="340" textAnchor="middle" fontSize="8.5" fill="#4c1d95">Clients peer only with RR — eliminates iBGP full-mesh requirement</text>
      <text x={W/2} y="354" textAnchor="middle" fontSize="8.5" fill="#4c1d95">Loop prevention: ORIGINATOR_ID + CLUSTER_LIST attributes</text>
      <text x={W/2} y="366" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#7c3aed">RR does not automatically guarantee optimal routing — placement matters</text>
      {/* Conceptual RIB note */}
      <rect x="10" y="380" width={W-20} height="46" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="396" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">BGP Conceptual Information Bases (per BGP architecture spec)</text>
      <text x={W/2} y="410" textAnchor="middle" fontSize="8" fill="#92400e">Adj-RIBs-In (received) → Loc-RIB (best-path selected) → Adj-RIBs-Out (to advertise)</text>
      <text x={W/2} y="422" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#a16207">These are logical constructs — actual storage/representation is vendor/platform dependent</text>
    </svg>
  );
}
