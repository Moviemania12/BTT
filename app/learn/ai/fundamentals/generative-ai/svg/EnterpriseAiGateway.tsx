"use client";
export default function EnterpriseAiGateway() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="eag-title">
      <title id="eag-title">Enterprise AI Gateway: central proxy layer for auth, rate limiting, caching, routing, monitoring across multiple LLM providers</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE AI GATEWAY</text>

      {/* Users side */}
      <rect x="20" y="40" width="140" height="240" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="90" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">CONSUMERS</text>
      {["Web App", "Mobile App", "Internal API", "Data Pipeline", "AI Agents", "IDE Plugin"].map((u, i) => (
        <g key={i}>
          <rect x="35" y={68 + i * 34} width="110" height="26" rx="4" fill="#e2e8f0" />
          <text x="90" y={84 + i * 34} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">{u}</text>
        </g>
      ))}

      {/* Gateway */}
      <rect x="200" y="40" width="220" height="240" rx="10" fill="#1e293b" stroke="#00d4ff" strokeWidth="2" />
      <text x="310" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">AI GATEWAY</text>
      {[
        { label: "Authentication / RBAC", color: "#fef9c3", border: "#ca8a04", tc: "#713f12" },
        { label: "Rate Limiter (per user/team)", color: "#fce7f3", border: "#ec4899", tc: "#831843" },
        { label: "Prompt Cache (prefix/semantic)", color: "#dcfce7", border: "#16a34a", tc: "#14532d" },
        { label: "Model Router (cost/quality)", color: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
        { label: "Guardrails (input + output)", color: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
        { label: "Audit Log + Cost Tracking", color: "#fff7ed", border: "#ea580c", tc: "#7c2d12" },
      ].map((g, i) => (
        <g key={i}>
          <rect x="215" y={72 + i * 34} width="190" height="26" rx="5" fill={g.color} stroke={g.border} strokeWidth="1" />
          <text x="310" y={88 + i * 34} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={g.tc} textAnchor="middle">{g.label}</text>
        </g>
      ))}

      {/* LLM Providers */}
      <rect x="460" y="40" width="340" height="240" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="630" y="58" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">LLM PROVIDERS</text>
      {[
        ["OpenAI GPT-4/4o", "#dbeafe", "#2563eb"],
        ["Anthropic Claude 3.x", "#fce7f3", "#db2777"],
        ["Google Gemini 1.5", "#dcfce7", "#16a34a"],
        ["Meta Llama 3 (self-hosted)", "#fff7ed", "#ea580c"],
        ["Mistral (self-hosted)", "#ede9fe", "#7c3aed"],
        ["Azure OpenAI (private)", "#e0f2fe", "#0369a1"],
      ].map(([label, bg, border], i) => (
        <g key={i}>
          <rect x="475" y={68 + i * 34} width="310" height="26" rx="5" fill={bg} stroke={border} strokeWidth="1" />
          <text x="630" y={84 + i * 34} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={border} textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* Arrows */}
      <line x1="162" y1="160" x2="198" y2="160" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#eag1)" />
      <line x1="422" y1="160" x2="458" y2="160" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#eag1)" />

      <text x="410" y="300" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Benefits: single governance layer · cost visibility · model flexibility · no vendor lock-in · centralized security</text>
      <text x="410" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Tools: LiteLLM Proxy · Kong AI Gateway · Portkey · HelixML · custom NGINX/Envoy</text>

      <defs>
        <marker id="eag1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
