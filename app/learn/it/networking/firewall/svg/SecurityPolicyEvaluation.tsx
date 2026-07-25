"use client";
// D4 — Security Policy Evaluation (first-match model)
export default function SecurityPolicyEvaluation() {
  const W = 480;
  const rules = [
    { num:"1", src:"any", dst:"8.8.8.8", svc:"DNS", action:"PERMIT", color:"#16a34a" },
    { num:"2", src:"Trust", dst:"any", svc:"HTTPS", action:"PERMIT", color:"#16a34a" },
    { num:"3", src:"Trust", dst:"DMZ", svc:"HTTP/HTTPS", action:"PERMIT", color:"#16a34a" },
    { num:"4", src:"Untrust", dst:"DMZ", svc:"HTTPS", action:"PERMIT", color:"#16a34a" },
    { num:"5", src:"Untrust", dst:"Trust", svc:"any", action:"DENY", color:"#dc2626" },
    { num:"IMP", src:"any", dst:"any", svc:"any", action:"Default action", color:"#6b7280" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 390`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Security policy evaluation first-match model"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="390" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Security Policy Evaluation</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="9" fill="#6b7280">Ordered top-down / first-applicable rule — common model (other models exist — verify platform)</text>
      <rect x="10" y="42" width={W-20} height="20" rx="3" fill="#374151"/>
      {["Rule","Source","Destination","Service","Action"].map((h,i) => (
        <text key={i} x={[18,58,160,258,346][i]} y="55" fontSize="8" fontWeight="700" fill="#fff">{h}</text>
      ))}
      {rules.map((r, i) => (
        <g key={i}>
          <rect x="10" y={62+i*32} width={W-20} height="28" rx="3"
            fill={r.num==="IMP"?"#f1f5f9":i%2===0?"#fff":"#f9fafb"}
            stroke={r.color} strokeWidth={r.num==="IMP"?"1":"0.5"}
            strokeDasharray={r.num==="IMP"?"4,2":"none"}/>
          <text x="18" y={62+i*32+17} fontSize="8.5" fontWeight="700" fill={r.color}>{r.num}</text>
          <text x="58" y={62+i*32+17} fontSize="8" fill="#374151">{r.src}</text>
          <text x="160" y={62+i*32+17} fontSize="8" fill="#374151">{r.dst}</text>
          <text x="258" y={62+i*32+17} fontSize="8" fill="#374151">{r.svc}</text>
          <rect x="340" y={62+i*32+4} width="70" height="18" rx="4" fill={r.action==="PERMIT"?"#dcfce7":r.action==="DENY"?"#fee2e2":"#e5e7eb"}/>
          <text x="375" y={62+i*32+16} textAnchor="middle" fontSize="8.5" fontWeight="700"
            fill={r.action==="PERMIT"?"#15803d":r.action==="DENY"?"#991b1b":"#6b7280"}>{r.action}</text>
        </g>
      ))}
      {/* Example packet */}
      <rect x="10" y="258" width={W-20} height="68" rx="7" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x={W/2} y="274" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0ea5e9">Packet Example: Trust zone, dst=1.2.3.4, HTTPS</text>
      <text x="18" y="290" fontSize="8.5" fill="#374151">Rule 1: Dst=8.8.8.8 — does NOT match 1.2.3.4</text>
      <text x="18" y="304" fontSize="8.5" fill="#374151">Rule 2: Trust→any, HTTPS — <tspan fontWeight="700" fill="#16a34a">MATCH → PERMIT → Rules 3,4,5 never evaluated</tspan></text>
      <text x="18" y="318" fontSize="7.5" fontStyle="italic" fill="#6b7280">Shadow rule example: if Rule 2 were changed to ANY service, Rule 3 would never be evaluated</text>
      {/* Notes */}
      <rect x="10" y="334" width={W-20} height="48" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="348" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Implicit/default action: behavior is platform-specific — many enterprise platforms deny unmatched traffic.</text>
      <text x={W/2} y="362" textAnchor="middle" fontSize="8" fill="#92400e">Verify per platform. Configure explicit visible default rule for clarity and logging.</text>
      <text x={W/2} y="376" textAnchor="middle" fontSize="8" fill="#92400e">Other policy models exist (rule sections, priorities, special precedence). First-match top-down is most common in traditional firewalls.</text>
    </svg>
  );
}
