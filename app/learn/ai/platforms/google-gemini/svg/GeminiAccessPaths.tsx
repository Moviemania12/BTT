"use client";
export default function GeminiAccessPaths() {
  return (
    <svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gap-title">
      <title id="gap-title">Gemini Access Paths: Four paths to access Gemini models. 1) Google AI Studio — web browser playground for prototyping and experimentation, free tier available, direct Gemini API key. 2) Gemini API direct — programmatic REST API access for production apps, pay per token, Google AI Developer platform. 3) Vertex AI — enterprise Google Cloud deployment with IAM, VPC, compliance, SLAs, MLOps. 4) Google Products — Gemini integrated directly in Search, Gmail, Docs, Android, Chrome. All paths ultimately reach Gemini model inference running on Google's TPU/accelerator infrastructure.</title>
      <rect width="820" height="240" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GEMINI ACCESS PATHS</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Four ways to access Gemini — each with different controls, compliance features and use cases</text>

      {/* Paths */}
      {[
        { label: "Google AI Studio", sub: "Web playground\nPrototyping / prompt dev\nFree tier available", color: "#4285f4", x: 14 },
        { label: "Gemini API (Direct)", sub: "REST API / SDK\nProduction apps\nPay per token", color: "#34a853", x: 214 },
        { label: "Vertex AI", sub: "Enterprise Google Cloud\nIAM / VPC / compliance\nMLOps + SLAs", color: "#ea4335", x: 414 },
        { label: "Google Products", sub: "Search, Gmail, Docs\nAndroid, Chrome\nBuilt-in integration", color: "#fbbc04", x: 614 },
      ].map(p => (
        <g key={p.label}>
          <rect x={p.x} y="50" width="185" height="80" rx="7" fill={p.color} />
          <text x={p.x + 92} y="76" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">{p.label}</text>
          {p.sub.split("\n").map((line, li) => (
            <text key={li} x={p.x + 92} y={93 + li * 13} fontFamily="Arial,sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.9)" textAnchor="middle">{line}</text>
          ))}
          <line x1={p.x + 92} y1={130} x2={p.x + 92} y2={155} stroke={p.color} strokeWidth="2" markerEnd="url(#gap-ar)" />
        </g>
      ))}

      {/* Google Infrastructure */}
      <rect x="14" y="155" width="792" height="48" rx="8" fill="#1a1a2e" stroke="#4285f4" strokeWidth="1.5" />
      <text x="410" y="176" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4285f4" textAnchor="middle">Google AI Infrastructure</text>
      <text x="410" y="193" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Gemini model inference running on Google TPU/accelerator infrastructure — globally distributed · exact topology not publicly disclosed</text>

      <text x="410" y="225" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Compliance features, data residency, SLAs — verify current scope at ai.google.dev (API/AI Studio) and cloud.google.com/vertex-ai (Vertex AI)</text>

      <defs>
        <marker id="gap-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#4285f4" /></marker>
      </defs>
    </svg>
  );
}
