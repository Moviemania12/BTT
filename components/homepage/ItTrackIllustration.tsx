// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/ItTrackIllustration.tsx
//
// Small flat-vector icon cluster for the IT Infrastructure track card —
// server rack + monitor — matching the visual language established in
// HeroIllustration.tsx. Server Component.
// ═══════════════════════════════════════════════════════════════════════════

export default function ItTrackIllustration() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="it-icon-title">
      <title id="it-icon-title">Server rack and monitor icon cluster</title>

      {/* Server rack — left */}
      <g transform="translate(6, 18)">
        <rect x="0" y="0" width="34" height="60" rx="3" fill="#1e293b" />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="5" y={7 + r * 13} width="24" height="9" rx="1.5" fill="#16a34a" opacity={0.55 + r * 0.1} />
            <circle cx="26" cy={11.5 + r * 13} r="1.3" fill="#bbf7d0" />
          </g>
        ))}
      </g>

      {/* Monitor — right */}
      <g transform="translate(48, 30)">
        <rect x="0" y="0" width="42" height="30" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="4" y="4" width="34" height="22" rx="1.5" fill="#16a34a" opacity="0.15" />
        <path d="M8 10 L16 10 M8 14 L24 14 M8 18 L20 18" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="16" y="30" width="10" height="6" fill="#334155" />
        <rect x="10" y="36" width="22" height="3" rx="1.5" fill="#334155" />
      </g>
    </svg>
  );
}
