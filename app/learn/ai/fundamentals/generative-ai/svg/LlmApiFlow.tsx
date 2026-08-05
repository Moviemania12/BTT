"use client";
export default function LlmApiFlow() {
  return (
    <svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="laf-title">
      <title id="laf-title">LLM API Flow: Function calling with structured outputs — tool selection, JSON schema, tool execution, result synthesis</title>
      <rect width="820" height="260" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">FUNCTION CALLING — STRUCTURED OUTPUT FLOW</text>

      {/* User request */}
      <rect x="20" y="45" width="120" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="80" y="63" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">User Request</text>
      <text x="80" y="77" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">"Current stock price"</text>
      <line x1="142" y1="65" x2="160" y2="65" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#laf1)" />

      {/* LLM Tool decision */}
      <rect x="160" y="36" width="170" height="110" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="245" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">LLM + Tool Schema</text>
      <text x="245" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Available tools:</text>
      <rect x="172" y="76" width="146" height="16" rx="3" fill="#1e40af" />
      <text x="245" y="87" fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">get_stock_price(ticker: str)</text>
      <rect x="172" y="96" width="146" height="16" rx="3" fill="#3b82f6" />
      <text x="245" y="107" fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">search_web(query: str)</text>
      <rect x="172" y="116" width="146" height="16" rx="3" fill="#3b82f6" />
      <text x="245" y="127" fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">create_chart(data: dict)</text>
      <text x="245" y="142" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">→ Selects: get_stock_price</text>
      <line x1="332" y1="90" x2="352" y2="90" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#laf1)" />

      {/* Tool call JSON */}
      <rect x="352" y="36" width="200" height="110" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="452" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">TOOL CALL (JSON)</text>
      <rect x="364" y="62" width="176" height="78" rx="4" fill="#1e293b" />
      <text x="380" y="78" fontFamily="monospace,Arial" fontSize="7.5" fill="#00d4ff">{"{"}</text>
      <text x="380" y="91" fontFamily="monospace,Arial" fontSize="7.5" fill="#86efac">{"  \"name\": \"get_stock_price\","}</text>
      <text x="380" y="104" fontFamily="monospace,Arial" fontSize="7.5" fill="#86efac">{"  \"arguments\": {"}</text>
      <text x="380" y="117" fontFamily="monospace,Arial" fontSize="7.5" fill="#fde68a">{"    \"ticker\": \"NVDA\""}</text>
      <text x="380" y="130" fontFamily="monospace,Arial" fontSize="7.5" fill="#86efac">{"  }"}</text>
      <text x="380" y="133" fontFamily="monospace,Arial" fontSize="7.5" fill="#00d4ff">{"}"}</text>
      <line x1="554" y1="90" x2="574" y2="90" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#laf1)" />

      {/* Tool execution */}
      <rect x="574" y="45" width="120" height="90" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="634" y="63" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Tool Execution</text>
      <text x="634" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Stock API call</text>
      <text x="634" y="91" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">NVDA: $875.40</text>
      <text x="634" y="106" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">+2.3% today</text>
      <text x="634" y="119" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Vol: 42M shares</text>
      <line x1="696" y1="90" x2="716" y2="90" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#laf1)" />

      {/* Final LLM response */}
      <rect x="716" y="36" width="88" height="110" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="760" y="56" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">LLM Synthesis</text>
      <text x="760" y="72" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">"NVIDIA is</text>
      <text x="760" y="84" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">currently at</text>
      <text x="760" y="96" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">$875.40, up</text>
      <text x="760" y="108" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">2.3% today</text>
      <text x="760" y="120" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">on volume of</text>
      <text x="760" y="132" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">42M shares"</text>

      {/* Parallel tool calls */}
      <rect x="20" y="165" width="780" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="185" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">PARALLEL TOOL CALLING (advanced pattern)</text>
      <text x="410" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">LLM can invoke multiple tools simultaneously in one step. Results returned as array, LLM synthesizes all.</text>
      <text x="410" y="215" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Example: "Compare NVDA and AMD" → [get_stock_price(NVDA), get_stock_price(AMD)] called in parallel</text>
      <text x="410" y="230" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Infrastructure: tool calls sandboxed, timeout enforced (typically 30s), results logged, error handling mandatory</text>

      <defs>
        <marker id="laf1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
