"use client";
// D13 — End-to-End Load Balancer Traffic Verification
export default function E2eTrafficVerification() {
  const W = 480;
  const steps = [
    { n: "1", q: "Client traffic reach VIP?", check: "DNS correct? Network path to VIP?" },
    { n: "2", q: "LB match & accept connection?", check: "VIP active? Service listening? Port/protocol?" },
    { n: "3", q: "Which backend selected?", check: "Connection table — member selected? Eligible at time?" },
    { n: "4", q: "Traffic leave LB toward backend?", check: "Capture LB egress — correct addresses after SNAT?" },
    { n: "5", q: "Backend receive traffic?", check: "Capture on backend NIC — application listening?" },
    { n: "6", q: "Backend response path?", check: "→ LB (expected) OR → direct to client (DSR/bypass?)" },
    { n: "7", q: "Response traverse expected path?", check: "Return via LB? NAT reversed? Or intended DSR?" },
    { n: "8", q: "Client receive response?", check: "Correct src address? Expected content? Full response?" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 350`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End to end load balancer traffic verification 8 step method"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a13" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="350" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">End-to-End Traffic Verification</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#dc2626">Diagnostic sequence — locate where the break occurs, segment by segment</text>

      {steps.map((s, i) => (
        <g key={i}>
          <circle cx="30" cy={50+i*36} r="11" fill="#374151"/>
          <text x="30" y={54+i*36} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{s.n}</text>
          <rect x="46" y={39+i*36} width="425" height="22" rx="5" fill={i===5?"#fef3c7":i%2===0?"#fff":"#f9fafb"} stroke="#e5e7eb" strokeWidth="1"/>
          <text x="54" y={52+i*36} fontSize="8.5" fontWeight="700" fill={i===5?"#92400e":"#111827"}>{s.q}</text>
          <text x="250" y={52+i*36} fontSize="8" fill={i===5?"#92400e":"#6b7280"} fontStyle="italic">{s.check}</text>
          {i < steps.length - 1 && (
            <line x1="30" y1={61+i*36} x2="30" y2={67+i*36} stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#a13)"/>
          )}
        </g>
      ))}

      <rect x="10" y="340" width="460" height="0" rx="4" fill="#e0f2fe"/>
    </svg>
  );
}
