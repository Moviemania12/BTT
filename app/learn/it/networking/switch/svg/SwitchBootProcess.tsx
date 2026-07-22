"use client";
// D14 — Switch Boot Process: Power On to Ready State
export default function SwitchBootProcess() {
  const steps = [
    { n:"1", t:"Power On",                    s:"PSU initializes · voltage rails stable · components receive power",                             bg:"#dbeafe", b:"#2563eb", tc:"#1e40af", w:false },
    { n:"2", t:"POST — Power-On Self Test",   s:"CPU · RAM · Flash · ASIC · fans · PSU · temperature sensors · POST fail → boot stops",        bg:"#dbeafe", b:"#2563eb", tc:"#1e40af", w:false },
    { n:"3", t:"Boot Loader",                 s:"Minimal boot environment · checks boot variable · loads NOS image · provides ROMMON access",   bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6", w:false },
    { n:"4", t:"Load NOS",                    s:"Network Operating System loaded from flash to RAM · IOS/NX-OS/EOS/Junos/AOS-CX etc.",          bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6", w:false },
    { n:"5", t:"Load Startup Configuration", s:"startup-config from flash applied · VLANs · interfaces · protocols · passwords configured",    bg:"#dcfce7", b:"#16a34a", tc:"#15803d", w:false },
    { n:"6", t:"Initialize Interfaces",       s:"Ports come up · STP starts · LACP negotiates · routing protocols establish neighbors",         bg:"#dcfce7", b:"#16a34a", tc:"#15803d", w:false },
    { n:"7", t:"Ready State",                 s:"Switch operational · forwarding traffic · management accessible via SSH/Console/SNMP",         bg:"#16a34a", b:"#16a34a", tc:"#fff",   w:true  },
  ];
  const STEP_H = 42; const ARR_H = 12;
  const totalH = 48 + steps.length * (STEP_H + ARR_H) + 48;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Switch boot sequence from power on to ready state"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Switch Boot Process</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Boot duration depends on hardware architecture, software image, installed modules and platform design</text>
      {steps.map((step, i) => {
        const y = 42 + i * (STEP_H + ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill={step.bg} stroke={step.b} strokeWidth={step.w ? 2.5 : 1.5}/>
            <rect x="10" y={y} width="30" height={STEP_H} rx="6" fill={step.b}/>
            <rect x="30" y={y} width="4" height={STEP_H} fill={step.b}/>
            <text x="25" y={y + STEP_H / 2 + 5} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">{step.n}</text>
            <text x="45" y={y + 15} fontSize="10" fontWeight={step.w ? "700" : "600"} fill={step.tc}>{step.t}</text>
            <text x="45" y={y + 31} fontSize="8.5" fill={step.w ? "rgba(255,255,255,0.9)" : "#6b7280"}>{step.s}</text>
            {i < steps.length - 1 && (
              <g>
                <line x1="240" y1={y + STEP_H} x2="240" y2={y + STEP_H + ARR_H - 4} stroke={step.b} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-4} 245,${y+STEP_H+ARR_H-4} 240,${y+STEP_H+ARR_H}`} fill={step.b}/>
              </g>
            )}
          </g>
        );
      })}
      {(() => { const sy = 42 + steps.length * (STEP_H + ARR_H) + 4; return (
        <g>
          <rect x="10" y={sy} width="220" height="34" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
          <text x="120" y={sy + 13} textAnchor="middle" fontSize="9" fontWeight="700" fill="#c2410c">Boot Interrupt → ROMMON</text>
          <text x="120" y={sy + 26} textAnchor="middle" fontSize="8" fill="#c2410c">Password recovery · TFTP image boot · boot var set</text>
          <rect x="250" y={sy} width="220" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
          <text x="360" y={sy + 13} textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">No startup-config found</text>
          <text x="360" y={sy + 26} textAnchor="middle" fontSize="8" fill="#991b1b">Boots factory defaults · restore from backup</text>
        </g>
      ); })()}
    </svg>
  );
}
