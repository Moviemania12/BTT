"use client";
// D22 — Common Router Engineering Mistakes and Prevention
export default function CommonEngineeringMistakes() {
  const W = 480;
  const rows = [
    { mistake:"Config not saved after change", prevent:"Save immediately → external backup → version control" },
    { mistake:"ACL applied wrong direction/interface", prevent:"Trace traffic flow before applying → verify with hit counters" },
    { mistake:"Implicit deny locks out management", prevent:"Include SSH permit first → verify from second session → maintain console" },
    { mistake:"BGP next-hop-self missing on iBGP", prevent:"Configure on all edge iBGP sessions → verify RIB installation on internal peers" },
    { mistake:"MTU mismatch on tunnel interface", prevent:"Set tunnel MTU = path MTU minus measured overhead → MSS clamp TCP → test large ICMP DF" },
    { mistake:"OSPF Hello/Dead timer mismatch", prevent:"Verify timers match on both sides before expecting adjacency formation" },
    { mistake:"Redistribution without filter", prevent:"Tag + filter → unidirectional where possible → lab test first" },
    { mistake:"Debug left on in production", prevent:"Disable immediately after troubleshooting → use platform debug timeout if available" },
  ];
  const totalH = 50 + rows.length * 34 + 30;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Common router engineering mistakes and prevention"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Common Engineering Mistakes — Quick Reference</text>
      <rect x="10" y="30" width={W-20} height="18" rx="3" fill="#374151"/>
      <text x="18" y="42" fontSize="8.5" fontWeight="700" fill="#fff">Mistake</text>
      <text x="250" y="42" fontSize="8.5" fontWeight="700" fill="#fff">Prevention / Detection</text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="10" y={48+i*34} width={W-20} height="30" rx="3" fill={i%2===0?"#fff":"#fef9f9"} stroke="#e5e7eb" strokeWidth="0.5"/>
          <text x="18" y={48+i*34+12} fontSize="8.5" fontWeight="700" fill="#dc2626">⚠ {r.mistake}</text>
          <text x="18" y={48+i*34+24} fontSize="8" fill="#374151">✓ {r.prevent}</text>
        </g>
      ))}
      <rect x="10" y={48+rows.length*34+4} width={W-20} height="18" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x={W/2} y={48+rows.length*34+15} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#15803d">Most mistakes are operational discipline issues — not protocol complexity</text>
    </svg>
  );
}
