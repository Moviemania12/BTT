"use client";
export default function Ikev2NegotiationFlow() {
  return (
    <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IKEv2 negotiation flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="380" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">IKEv2 Negotiation Flow</text>
      <text x="240" y="34" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">IKEv2 does NOT use IKEv1 Phase 1/Phase 2 terminology</text>
      <rect x="20" y="44" width="90" height="24" rx="5" fill="#0ea5e9"/>
      <text x="65" y="59" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Initiator</text>
      <rect x="370" y="44" width="90" height="24" rx="5" fill="#16a34a"/>
      <text x="415" y="59" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Responder</text>
      <line x1="65" y1="68" x2="65" y2="360" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="415" y1="68" x2="415" y2="360" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,2"/>
      {[
        { y:90, label:"IKE_SA_INIT →", desc:"Propose algorithms, DH material, nonce", dir:"right", color:"#8b5cf6" },
        { y:130, label:"← IKE_SA_INIT response", desc:"Selected algorithms, DH material, nonce — shared keying material derivable", dir:"left", color:"#8b5cf6" },
        { y:170, label:"IKE_AUTH →", desc:"Initiator identity + auth material, first CHILD SA proposal", dir:"right", color:"#0ea5e9" },
        { y:210, label:"← IKE_AUTH response", desc:"Responder identity + auth material, CHILD SA accepted", dir:"left", color:"#0ea5e9" },
        { y:260, label:"CREATE_CHILD_SA → (when needed)", desc:"Additional/replacement SAs, rekey", dir:"right", color:"#f59e0b" },
        { y:295, label:"INFORMATIONAL →", desc:"Notifications, delete messages, control (not keepalive)", dir:"right", color:"#6b7280" },
      ].map((m, i) => (
        <g key={i}>
          {m.dir==="right"
            ? <line x1="65" y1={m.y} x2="415" y2={m.y} stroke={m.color} strokeWidth="1.5" markerEnd="url(#arr)"/>
            : <line x1="415" y1={m.y} x2="65" y2={m.y} stroke={m.color} strokeWidth="1.5" markerEnd="url(#arrl)"/>}
          <text x="240" y={m.y-6} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={m.color}>{m.label}</text>
          <text x="240" y={m.y+12} textAnchor="middle" fontSize="7.5" fill="#6b7280">{m.desc}</text>
        </g>
      ))}
      <rect x="100" y="228" width="280" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="240" y="242" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">IKE SA: AUTHENTICATED. First CHILD SA: ESTABLISHED. Data can flow.</text>
      <rect x="10" y="316" width="460" height="52" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="330" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">IKE_SA_INIT: algorithm selection + DH keying material — peers NOT yet authenticated.</text>
      <text x="240" y="344" textAnchor="middle" fontSize="8" fill="#92400e">IKE_AUTH: authenticates peers and completes authenticated IKE SA. First CHILD SA normally created here.</text>
      <text x="240" y="358" textAnchor="middle" fontSize="8" fill="#92400e">SA lifetime: locally configured per peer — not a negotiated IKEv2 protocol parameter. EAP may add exchanges before CHILD SA.</text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#6b7280"/></marker>
        <marker id="arrl" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L6,6 L0,3 z" fill="#6b7280"/></marker>
      </defs>
    </svg>
  );
}
