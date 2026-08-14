"use client";
export default function ClaudeModelTiers() {
  return (
    <svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cmt-title">
      <title id="cmt-title">Claude Model Tiers: Three tiers within the Claude model family. Haiku (left): fastest and most cost-efficient, ideal for high-volume simple tasks like classification, summarization, chatbots, quick Q&A. Sonnet (center): balanced capability speed and cost, production workhorse for most general tasks, best price-performance ratio. Opus (right): most capable and most expensive, complex reasoning, nuanced analysis, difficult coding, use selectively. All three share the same Claude architecture but differ in size, speed, cost, and capability level.</title>
      <rect width="820" height="220" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CLAUDE MODEL TIERS — CAPABILITY vs SPEED vs COST</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Same family, different tradeoffs — select based on task complexity and volume requirements</text>

      {[
        {
          name: "Claude Haiku",
          tier: "FASTEST · CHEAPEST",
          icon: "⚡",
          color: "#16a34a",
          attrs: [
            "Fastest response time",
            "Lowest cost per token",
            "Best for high-volume tasks",
            "Simple classification",
            "Summarization",
            "Chatbots / Q&A",
            "Real-time applications",
          ],
          x: 30,
          w: 230,
        },
        {
          name: "Claude Sonnet",
          tier: "BALANCED · PRODUCTION",
          icon: "⚖️",
          color: "#0891b2",
          attrs: [
            "Best price-performance",
            "Production workhorse",
            "Complex reasoning",
            "Code generation",
            "Long-form writing",
            "Analysis tasks",
            "Most general use cases",
          ],
          x: 295,
          w: 230,
        },
        {
          name: "Claude Opus",
          tier: "MOST CAPABLE · PREMIUM",
          icon: "🔬",
          color: "#7c3aed",
          attrs: [
            "Highest capability",
            "Complex multi-step reasoning",
            "Nuanced analysis",
            "Difficult coding problems",
            "Research tasks",
            "Use selectively",
            "Highest latency + cost",
          ],
          x: 560,
          w: 230,
        },
      ].map((m) => (
        <g key={m.name}>
          <rect x={m.x} y="44" width={m.w} height="165" rx="8" fill={m.color} />
          <text x={m.x + m.w / 2} y="65" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">{m.icon} {m.name}</text>
          <rect x={m.x + 10} y="72" width={m.w - 20} height="16" rx="3" fill="rgba(0,0,0,0.2)" />
          <text x={m.x + m.w / 2} y="84" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.9)" textAnchor="middle">{m.tier}</text>
          {m.attrs.map((a, i) => (
            <text key={a} x={m.x + 16} y={103 + i * 15} fontFamily="Arial,sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.9)">• {a}</text>
          ))}
        </g>
      ))}

      <text x="410" y="216" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Benchmark on your specific task — exact capabilities and pricing at docs.anthropic.com/en/docs/about-claude/models</text>
    </svg>
  );
}
