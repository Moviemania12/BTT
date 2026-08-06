// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/AiTrackIllustration.tsx
//
// Small flat-vector icon cluster for the AI Infrastructure track card —
// GPU chip + neural network nodes — matching the visual language of
// NonItTrackIllustration and ItTrackIllustration. Server Component.
// ═══════════════════════════════════════════════════════════════════════════

export default function AiTrackIllustration() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ai-icon-title">
      <title id="ai-icon-title">GPU chip and neural network icon cluster</title>

      {/* GPU chip — left */}
      <g transform="translate(4, 20)">
        <rect x="0" y="0" width="40" height="40" rx="4" fill="#1e1b4b" />
        <rect x="5" y="5" width="30" height="30" rx="2" fill="#4f46e5" opacity="0.6" />
        {/* Core grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={9 + col * 9}
              y={9 + row * 9}
              width="6"
              height="6"
              rx="1"
              fill="#818cf8"
              opacity={0.5 + (row + col) * 0.08}
            />
          ))
        )}
        {/* Pins */}
        {[8, 18, 28].map((y) => (
          <g key={y}>
            <rect x="-4" y={y} width="4" height="3" rx="1" fill="#6366f1" />
            <rect x="40" y={y} width="4" height="3" rx="1" fill="#6366f1" />
          </g>
        ))}
        {[8, 28].map((x) => (
          <g key={x}>
            <rect x={x} y="-4" width="3" height="4" rx="1" fill="#6366f1" />
            <rect x={x} y="40" width="3" height="4" rx="1" fill="#6366f1" />
          </g>
        ))}
      </g>

      {/* Neural network nodes — right */}
      <g transform="translate(52, 18)">
        {/* Connections */}
        <line x1="8" y1="10" x2="28" y2="4"  stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="8" y1="10" x2="28" y2="20" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="8" y1="30" x2="28" y2="20" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="8" y1="30" x2="28" y2="36" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="28" y1="4"  x2="42" y2="18" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="28" y1="20" x2="42" y2="18" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        <line x1="28" y1="36" x2="42" y2="18" stroke="#a5b4fc" strokeWidth="1.2" opacity="0.5" />
        {/* Input nodes */}
        <circle cx="8"  cy="10" r="5" fill="#4f46e5" />
        <circle cx="8"  cy="30" r="5" fill="#4f46e5" />
        {/* Hidden nodes */}
        <circle cx="28" cy="4"  r="4.5" fill="#6366f1" opacity="0.85" />
        <circle cx="28" cy="20" r="4.5" fill="#6366f1" />
        <circle cx="28" cy="36" r="4.5" fill="#6366f1" opacity="0.85" />
        {/* Output node */}
        <circle cx="42" cy="18" r="5.5" fill="#818cf8" />
        <circle cx="42" cy="18" r="2.5" fill="#e0e7ff" />
      </g>
    </svg>
  );
}
