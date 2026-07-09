// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/NonItTrackIllustration.tsx
//
// Small flat-vector icon cluster for the Non-IT Infrastructure track card —
// transformer, cooling fan unit, fire extinguisher — matching the visual
// language established in HeroIllustration.tsx. Server Component.
// ═══════════════════════════════════════════════════════════════════════════

export default function NonItTrackIllustration() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nonit-icon-title">
      <title id="nonit-icon-title">Transformer, cooling fan, and fire extinguisher icon cluster</title>

      {/* Transformer — left */}
      <g transform="translate(4, 30)">
        <rect x="0" y="0" width="30" height="34" rx="3" fill="#64748b" />
        <rect x="5" y="6" width="20" height="9" rx="1.5" fill="#fbbf24" />
        <path d="M12 15 L12 6 M18 15 L18 6" stroke="#334155" strokeWidth="1.2" />
        <circle cx="8" cy="-2" r="3" fill="none" stroke="#334155" strokeWidth="1.5" transform="translate(0,4)" />
        <circle cx="22" cy="-2" r="3" fill="none" stroke="#334155" strokeWidth="1.5" transform="translate(0,4)" />
      </g>

      {/* Cooling fan unit — center */}
      <g transform="translate(38, 14)">
        <rect x="0" y="0" width="36" height="36" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="12" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
        <path d="M18 8 L18 28 M8 18 L28 18 M11 11 L25 25 M25 11 L11 25" stroke="#94a3b8" strokeWidth="1" />
      </g>

      {/* Fire extinguisher — right */}
      <g transform="translate(78, 40)">
        <rect x="0" y="0" width="10" height="24" rx="4" fill="#dc2626" />
        <rect x="3" y="-5" width="4" height="6" rx="1" fill="#334155" />
      </g>
    </svg>
  );
}
