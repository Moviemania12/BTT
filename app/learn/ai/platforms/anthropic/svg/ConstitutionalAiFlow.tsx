"use client";
export default function ConstitutionalAiFlow() {
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cai-title">
      <title id="cai-title">Constitutional AI Training Pipeline: Step 1 - Pretraining on large text corpus (standard LLM pretraining). Step 2 - SL-CAI (Supervised Learning with Constitutional AI) - model generates responses, then critiques and revises them according to the constitution principles. Step 3 - RLAIF (Reinforcement Learning from AI Feedback) - AI model evaluates responses against constitutional principles instead of human raters, generating preference data. Step 4 - RL training using AI-generated preference data to fine-tune the model. Result: Claude model that is helpful, harmless, and honest. This differs from standard RLHF which relies heavily on human raters for all preference data.</title>
      <rect width="820" height="260" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CONSTITUTIONAL AI — TRAINING PIPELINE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Anthropic's approach: AI evaluates responses against a "constitution" of principles — reducing reliance on human raters at scale</text>

      {/* Steps */}
      {[
        { n: "1", label: "Pretraining", sub: "Large text corpus\nStandard LLM pretraining", color: "#1e293b", x: 14 },
        { n: "2", label: "SL-CAI", sub: "Model generates response\nSelf-critiques against constitution\nRevises own output", color: "#7c3aed", x: 190 },
        { n: "3", label: "RLAIF", sub: "AI model evaluates pairs\nagainst constitution principles\n(not human raters)", color: "#0891b2", x: 366 },
        { n: "4", label: "RL Training", sub: "Train on AI-generated\npreference data\n(PPO / similar)", color: "#16a34a", x: 542 },
        { n: "✓", label: "Claude Model", sub: "Helpful · Harmless · Honest\nConstitutionally trained", color: "#ca8a04", x: 680 },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x} y="50" width="128" height="80" rx="7" fill={s.color} />
          <circle cx={s.x + 14} cy="64" r="10" fill="rgba(255,255,255,0.2)" />
          <text x={s.x + 14} y="68" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{s.n}</text>
          <text x={s.x + 64} y="100" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">{s.label}</text>
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={s.x + 64} y={114 + li * 11} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.88)" textAnchor="middle">{line}</text>
          ))}
          {s.x < 680 && <line x1={s.x + 128} y1={90} x2={s.x + 158} y2={90} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cai-ar)" />}
        </g>
      ))}

      {/* Constitution box */}
      <rect x="190" y="160" width="480" height="40" rx="6" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="177" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">CONSTITUTION — Set of Principles</text>
      <text x="430" y="191" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">"Be helpful · Avoid harmful content · Be honest · Respect autonomy · Avoid deception" (simplified)</text>
      <line x1="254" y1="130" x2="254" y2="160" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="430" y1="130" x2="430" y2="160" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* Contrast with RLHF */}
      <rect x="14" y="210" width="792" height="38" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
      <text x="410" y="226" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#475569" textAnchor="middle">vs Standard RLHF: Human raters manually evaluate every response pair → expensive, slow, hard to scale</text>
      <text x="410" y="240" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Constitutional AI uses AI-generated feedback (RLAIF) which scales more efficiently — details in Anthropic's published research</text>

      <defs>
        <marker id="cai-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
