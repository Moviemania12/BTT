"use client";
export default function AiAgentArchitecture() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aaa-title">
      <title id="aaa-title">AI Agent Architecture: Planner LLM, Memory, Tool Router, Tool Executor with multi-agent collaboration</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI AGENT ARCHITECTURE</text>

      {/* User input */}
      <rect x="320" y="36" width="180" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="55" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">👤 User Request</text>
      <line x1="410" y1="66" x2="410" y2="80" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aaa1)" />

      {/* Gateway */}
      <rect x="280" y="80" width="260" height="30" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="99" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">AI Gateway (Auth · Rate Limit · Logging)</text>
      <line x1="410" y1="110" x2="410" y2="124" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aaa1)" />

      {/* Planner LLM */}
      <rect x="240" y="124" width="340" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="144" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">PLANNER — LLM</text>
      <text x="410" y="160" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Task decomposition · Reasoning · ReAct / CoT · Decides next action</text>
      <line x1="410" y1="174" x2="410" y2="188" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aaa1)" />

      {/* Memory box */}
      <rect x="20" y="124" width="180" height="80" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="110" y="144" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">MEMORY</text>
      <text x="110" y="160" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Short-term: conversation</text>
      <text x="110" y="173" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Long-term: vector store</text>
      <text x="110" y="186" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Episodic: past task results</text>
      <line x1="240" y1="150" x2="202" y2="155" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4,2" markerEnd="url(#aaa2)" />

      {/* Tool Router */}
      <rect x="240" y="188" width="340" height="40" rx="8" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
      <text x="410" y="206" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#075985" textAnchor="middle">TOOL ROUTER</text>
      <text x="410" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">Selects appropriate tool based on planner output · Validates parameters</text>

      {/* Tools row */}
      {[
        { label: "Web Search", icon: "🔍", x: 20 },
        { label: "Code Exec", icon: "💻", x: 155 },
        { label: "Database", icon: "🗄️", x: 290 },
        { label: "REST APIs", icon: "🔗", x: 425 },
        { label: "Files/Docs", icon: "📄", x: 560 },
        { label: "Calculator", icon: "🧮", x: 695 },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y="244" width="110" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x={t.x + 55} y="261" fontFamily="Arial,sans-serif" fontSize="9" textAnchor="middle">{t.icon}</text>
          <text x={t.x + 55} y="276" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">{t.label}</text>
        </g>
      ))}
      <line x1="410" y1="228" x2="410" y2="244" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aaa1)" />

      {/* Response aggregator */}
      <rect x="240" y="300" width="340" height="34" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="410" y="317" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">Response Aggregator + Final LLM Call</text>
      <text x="410" y="329" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Tool results → synthesize → format → stream to user</text>
      <line x1="410" y1="284" x2="410" y2="300" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aaa1)" />

      {/* Multi-agent note */}
      <rect x="622" y="124" width="178" height="80" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
      <text x="711" y="144" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#831843" textAnchor="middle">MULTI-AGENT</text>
      <text x="711" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Orchestrator delegates</text>
      <text x="711" y="171" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">sub-tasks to specialist</text>
      <text x="711" y="184" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">agents in parallel</text>
      <text x="711" y="197" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">CrewAI / AutoGen</text>
      <line x1="580" y1="150" x2="622" y2="155" stroke="#db2777" strokeWidth="1" strokeDasharray="4,2" markerEnd="url(#aaa3)" />

      <text x="410" y="350" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Each tool call = one LLM round trip. Complex tasks = 5-20 LLM calls. Cost monitoring mandatory.</text>

      <defs>
        <marker id="aaa1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="aaa2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
        <marker id="aaa3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#db2777" /></marker>
      </defs>
    </svg>
  );
}
