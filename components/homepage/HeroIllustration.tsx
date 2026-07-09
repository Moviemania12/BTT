// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/HeroIllustration.tsx
//
// Premium flat-vector engineering illustration, composition inspired by
// the approved reference image: isometric server room with racks, cooling
// units, an electrical/DG panel, fire extinguishers, cable routing, and
// four labeled callouts (Power / Cooling / Safety & Security / Monitoring).
// Rendered as detailed flat SVG artwork — not a wireframe, not a
// photorealistic render, not a generic icon. Server Component, no client
// JS, fully responsive via viewBox scaling.
// ═══════════════════════════════════════════════════════════════════════════

export default function HeroIllustration() {
  return (
    <svg
      className="hp-illustration"
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="hero-illustration-title"
    >
      <title id="hero-illustration-title">
        Isometric illustration of a data center — power, cooling, fire safety, and monitoring systems
      </title>

      {/* Floor platform */}
      <ellipse cx="280" cy="330" rx="230" ry="40" fill="#f1f5f9" />

      {/* Room shell */}
      <g fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5">
        <path d="M90 120 L280 60 L470 120 L470 260 L280 320 L90 260 Z" />
        <path d="M90 120 L280 60 L280 190 L90 250 Z" fill="#eef2f7" />
        <path d="M470 120 L280 60 L280 190 L470 250 Z" fill="#f8fafc" />
      </g>

      {/* Server racks — row, isometric boxes */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${190 + i * 42}, ${175 + i * 6})`}>
          <rect x="0" y="0" width="34" height="88" rx="3" fill="#1e293b" />
          <rect x="0" y="0" width="34" height="88" rx="3" fill="none" stroke="#334155" strokeWidth="1" />
          {[0, 1, 2, 3, 4].map((r) => (
            <rect key={r} x="5" y={8 + r * 16} width="24" height="9" rx="1.5" fill="#155eef" opacity={0.5 + r * 0.1} />
          ))}
        </g>
      ))}

      {/* Cable routing — orange conduit lines above racks */}
      <g fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
        <path d="M200 150 L200 130 L340 130 L340 150" />
        <path d="M230 148 L230 130" />
        <path d="M270 148 L270 130" />
        <path d="M310 148 L310 130" />
      </g>

      {/* Electrical / DG panel — yellow box, left */}
      <g transform="translate(110, 230)">
        <rect x="0" y="0" width="46" height="34" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <rect x="6" y="6" width="34" height="8" rx="1.5" fill="#fde68a" />
        <rect x="6" y="18" width="18" height="8" rx="1.5" fill="#fde68a" />
      </g>

      {/* Cooling units — rooftop, right */}
      <g transform="translate(360, 75)">
        <rect x="0" y="0" width="52" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="14" cy="15" r="9" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="38" cy="15" r="9" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
        <path d="M14 8 L14 22 M7 15 L21 15" stroke="#94a3b8" strokeWidth="1" />
        <path d="M38 8 L38 22 M31 15 L45 15" stroke="#94a3b8" strokeWidth="1" />
      </g>

      {/* Fire extinguishers — small red cylinders, front */}
      <g transform="translate(350, 260)">
        <rect x="0" y="0" width="8" height="26" rx="3" fill="#dc2626" />
        <rect x="12" y="3" width="8" height="23" rx="3" fill="#dc2626" />
        <rect x="24" y="0" width="8" height="26" rx="3" fill="#dc2626" />
      </g>

      {/* Monitoring panel — small screen, right of racks */}
      <g transform="translate(400, 195)">
        <rect x="0" y="0" width="30" height="40" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
        <rect x="5" y="6" width="20" height="12" rx="1.5" fill="#7c3aed" opacity="0.8" />
      </g>

      {/* Door, back wall */}
      <g transform="translate(280, 150)">
        <rect x="0" y="0" width="26" height="55" rx="2" fill="#334155" />
        <circle cx="21" cy="28" r="1.5" fill="#94a3b8" />
      </g>

      {/* Callout labels — matched to reference image positions */}
      <g fontFamily="system-ui, sans-serif">
        {/* Power Systems — top-left */}
        <g transform="translate(60, 20)">
          <rect x="0" y="0" width="108" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" fill="#fef3c7" />
          <text x="20" y="24" textAnchor="middle" fontSize="12">⚡</text>
          <text x="38" y="17" fontSize="10.5" fontWeight="600" fill="#0f172a">Power</text>
          <text x="38" y="29" fontSize="10.5" fontWeight="600" fill="#0f172a">Systems</text>
        </g>

        {/* Cooling Systems — top-right */}
        <g transform="translate(392, 20)">
          <rect x="0" y="0" width="112" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" fill="#dbeafe" />
          <text x="20" y="24" textAnchor="middle" fontSize="12">❄️</text>
          <text x="38" y="17" fontSize="10.5" fontWeight="600" fill="#0f172a">Cooling</text>
          <text x="38" y="29" fontSize="10.5" fontWeight="600" fill="#0f172a">Systems</text>
        </g>

        {/* Safety & Security — bottom-left */}
        <g transform="translate(30, 305)">
          <rect x="0" y="0" width="112" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" fill="#dcfce7" />
          <text x="20" y="24" textAnchor="middle" fontSize="12">🛡️</text>
          <text x="38" y="17" fontSize="10.5" fontWeight="600" fill="#0f172a">Safety &amp;</text>
          <text x="38" y="29" fontSize="10.5" fontWeight="600" fill="#0f172a">Security</text>
        </g>

        {/* Monitoring & Control — bottom-right */}
        <g transform="translate(400, 295)">
          <rect x="0" y="0" width="130" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" fill="#f3e8ff" />
          <text x="20" y="24" textAnchor="middle" fontSize="12">📡</text>
          <text x="38" y="17" fontSize="10.5" fontWeight="600" fill="#0f172a">Monitoring</text>
          <text x="38" y="29" fontSize="10.5" fontWeight="600" fill="#0f172a">&amp; Control</text>
        </g>
      </g>
    </svg>
  );
}
