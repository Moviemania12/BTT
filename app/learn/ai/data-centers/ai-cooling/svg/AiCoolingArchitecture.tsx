"use client";
export default function AiCoolingArchitecture() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aca-title">
      <title id="aca-title">Complete AI Data Center Cooling Architecture: Outdoor infrastructure includes cooling tower (rejects heat to atmosphere via evaporation) connected to chiller plant (mechanical refrigeration). Chiller provides cold facility water to CDU room. CDU room contains multiple CDU units each serving a cooling zone. Each CDU connects to rack manifolds in the AI server room. GPU server racks have cold plates on GPU chips. Warm fluid returns from racks through manifold back to CDU, which transfers heat to facility water, which goes to chiller, which rejects heat via cooling tower. Separate: CRAC/CRAH air cooling for networking and lower-density equipment in same or adjacent rooms.</title>
      <rect width="820" height="340" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">COMPLETE AI DATA CENTER COOLING ARCHITECTURE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Liquid cooling for high-density AI racks + air cooling for networking/lower-density equipment</text>

      {/* Outdoor Infrastructure */}
      <rect x="14" y="44" width="130" height="120" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="79" y="62" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="middle">OUTDOOR</text>
      <rect x="24" y="70" width="110" height="36" rx="4" fill="#64748b" />
      <text x="79" y="86" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Cooling Tower</text>
      <text x="79" y="98" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#e2e8f0" textAnchor="middle">Heat rejection to atmosphere</text>
      <rect x="24" y="114" width="110" height="36" rx="4" fill="#0f172a" />
      <text x="79" y="130" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">Chiller Plant</text>
      <text x="79" y="142" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#64748b" textAnchor="middle">Mechanical refrigeration</text>

      {/* Arrow outdoor to CDU */}
      <line x1="144" y1="110" x2="195" y2="110" stroke="#0891b2" strokeWidth="2" markerEnd="url(#aca-ar-b)" />
      <line x1="195" y1="130" x2="144" y2="130" stroke="#dc2626" strokeWidth="2" markerEnd="url(#aca-ar-r)" />
      <text x="170" y="104" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#0891b2" textAnchor="middle" fontWeight="700">Cold</text>
      <text x="170" y="145" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#dc2626" textAnchor="middle" fontWeight="700">Warm return</text>

      {/* CDU Room */}
      <rect x="195" y="44" width="140" height="220" rx="6" fill="#1e293b" stroke="#0891b2" strokeWidth="1.5" />
      <text x="265" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">CDU ROOM</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="208" y={74 + i * 58} width="114" height="46" rx="5" fill="#0c4a6e" stroke="#0891b2" strokeWidth="1" />
          <text x="265" y={92 + i * 58} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7dd3fc" textAnchor="middle">CDU {i + 1}</text>
          <text x="265" y={104 + i * 58} fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Heat exchanger</text>
          <text x="265" y={114 + i * 58} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#64748b" textAnchor="middle">Pump + controls</text>
        </g>
      ))}

      {/* Arrows CDU to Manifolds */}
      <line x1="335" y1="97" x2="380" y2="97" stroke="#16a34a" strokeWidth="2" markerEnd="url(#aca-ar-g)" />
      <line x1="380" y1="113" x2="335" y2="113" stroke="#f97316" strokeWidth="2" markerEnd="url(#aca-ar-o)" />
      <line x1="335" y1="155" x2="380" y2="155" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#aca-ar-g)" />
      <line x1="380" y1="171" x2="335" y2="171" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#aca-ar-o)" />
      <line x1="335" y1="213" x2="380" y2="213" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#aca-ar-g)" />
      <line x1="380" y1="229" x2="335" y2="229" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#aca-ar-o)" />

      {/* AI Server Room */}
      <rect x="380" y="44" width="280" height="220" rx="6" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="520" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c4b5fd" textAnchor="middle">AI SERVER ROOM</text>

      {/* GPU Racks */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="393" y={74 + i * 58} width="240" height="46" rx="5" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1" />
          <text x="520" y={92 + i * 58} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">GPU Rack {i + 1} — DLC Cooling</text>
          <text x="520" y={104 + i * 58} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">GPU servers with cold plates on GPU chips</text>
          <text x="520" y={114 + i * 58} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#a78bfa" textAnchor="middle">Rack manifold + leak detection sensors</text>
        </g>
      ))}

      {/* Air cooling section */}
      <rect x="672" y="44" width="134" height="220" rx="6" fill="#0c1a2e" stroke="#0284c7" strokeWidth="1.5" />
      <text x="739" y="64" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7dd3fc" textAnchor="middle">AIR COOLING</text>
      <text x="739" y="78" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">CRAC / CRAH units</text>
      {["Network\nSwitches", "Storage\nServers", "Mgmt\nServers"].map((item, i) => (
        <g key={item}>
          <rect x="684" y={90 + i * 52} width="110" height="40" rx="4" fill="#1e3a5f" stroke="#0284c7" strokeWidth="0.5" />
          {item.split("\n").map((line, li) => (
            <text key={li} x="739" y={105 + i * 52 + li * 13} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7dd3fc" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}
      <text x="739" y="256" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Lower density</text>
      <text x="739" y="267" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">equipment</text>

      {/* Bottom labels */}
      <text x="410" y="300" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0891b2" textAnchor="middle">FACILITY WATER LOOP: Chiller → CDU → Chiller (closed loop, chemical treatment)</text>
      <text x="410" y="315" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#16a34a" textAnchor="middle">IT SECONDARY LOOP: CDU → Rack Manifold → GPU Cold Plates → Manifold → CDU (closed loop, IT-safe fluid)</text>
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Actual architecture varies by facility design — CDU type, fluid specification, pipe routing per vendor guidance</text>

      <defs>
        <marker id="aca-ar-b" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
        <marker id="aca-ar-r" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
        <marker id="aca-ar-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
        <marker id="aca-ar-o" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
