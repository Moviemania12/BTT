"use client";
export default function GuardrailPipeline() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gp-title">
      <title id="gp-title">AI Guardrail Pipeline: Input guardrails before LLM, output guardrails after — PII, toxicity, hallucination, policy checks</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI GUARDRAIL PIPELINE</text>

      {/* User input */}
      <rect x="20" y="50" width="130" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="85" y="74" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">User Input</text>
      <line x1="152" y1="70" x2="168" y2="70" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#gp1)" />

      {/* Input guardrails */}
      <rect x="168" y="36" width="200" height="130" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="268" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">INPUT GUARDRAILS</text>
      {["PII Detection + Masking", "Toxicity Filter", "Prompt Injection Check", "Topic Policy Filter", "Rate Limit Check"].map((g, i) => (
        <g key={i}>
          <circle cx="185" cy={68 + i * 18} r="4" fill="#dc2626" />
          <text x="196" y={72 + i * 18} fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b">{g}</text>
        </g>
      ))}
      <line x1="370" y1="100" x2="386" y2="100" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#gp1)" />

      {/* LLM */}
      <rect x="386" y="60" width="140" height="80" rx="8" fill="#0f172a" stroke="#00d4ff" strokeWidth="2" />
      <text x="456" y="95" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#00d4ff" textAnchor="middle">LLM</text>
      <text x="456" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Foundation Model</text>
      <text x="456" y="125" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">+ System Prompt</text>
      <line x1="528" y1="100" x2="544" y2="100" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#gp1)" />

      {/* Output guardrails */}
      <rect x="544" y="36" width="200" height="130" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <text x="644" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">OUTPUT GUARDRAILS</text>
      {["Hallucination Detection", "PII Leakage Check", "Toxic Content Filter", "Copyright Filter", "Factual Accuracy Score"].map((g, i) => (
        <g key={i}>
          <circle cx="561" cy={68 + i * 18} r="4" fill="#ea580c" />
          <text x="572" y={72 + i * 18} fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412">{g}</text>
        </g>
      ))}
      <line x1="746" y1="100" x2="762" y2="100" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#gp1)" />

      {/* Final response */}
      <rect x="762" y="60" width="40" height="80" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="782" y="103" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle" style={{ writingMode: "vertical-rl" } as React.CSSProperties}>Response</text>

      {/* Reject path */}
      <rect x="168" y="185" width="576" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="456" y="203" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#dc2626" textAnchor="middle">BLOCK / REJECT → Return safe error message → Log violation → Alert security team</text>

      {/* Policy engine */}
      <rect x="168" y="224" width="576" height="40" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
      <text x="456" y="242" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">POLICY ENGINE</text>
      <text x="456" y="257" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Llama Guard · Azure Content Safety · Perspective API · Custom classifiers · Nemo Guardrails</text>

      <defs>
        <marker id="gp1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
