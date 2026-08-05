"use client";
export default function McpArchitecture() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mcp-title">
      <title id="mcp-title">Model Context Protocol (MCP) Architecture: MCP Client LLM Host connects to multiple MCP Servers exposing Resources and Tools</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MODEL CONTEXT PROTOCOL (MCP) ARCHITECTURE</text>

      {/* MCP Client side */}
      <rect x="20" y="40" width="300" height="220" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="170" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">MCP CLIENT (LLM Host)</text>

      <rect x="40" y="72" width="260" height="50" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="170" y="92" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">AI Application / Agent</text>
      <text x="170" y="106" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Claude Desktop · Cursor · Custom App</text>

      <rect x="40" y="132" width="120" height="40" rx="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
      <text x="100" y="150" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#075985" textAnchor="middle">LLM Engine</text>
      <text x="100" y="163" fontFamily="Arial,sans-serif" fontSize="7" fill="#0c4a6e" textAnchor="middle">Claude / GPT / Llama</text>

      <rect x="180" y="132" width="120" height="40" rx="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
      <text x="240" y="150" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#075985" textAnchor="middle">MCP Client Lib</text>
      <text x="240" y="163" fontFamily="Arial,sans-serif" fontSize="7" fill="#0c4a6e" textAnchor="middle">Protocol handler</text>

      <rect x="40" y="184" width="260" height="62" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x="170" y="202" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">MCP Features Supported</text>
      <text x="170" y="217" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Resources: read files, databases, APIs</text>
      <text x="170" y="231" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Tools: call functions, execute actions</text>
      <text x="170" y="245" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Prompts: reusable prompt templates</text>

      {/* Protocol arrow */}
      <text x="410" y="120" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0f172a" textAnchor="middle">MCP Protocol</text>
      <text x="410" y="134" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">JSON-RPC 2.0</text>
      <text x="410" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">stdio · HTTP/SSE</text>
      <line x1="322" y1="150" x2="500" y2="150" stroke="#0f172a" strokeWidth="1.5" markerEnd="url(#mcp1)" />
      <line x1="500" y1="150" x2="322" y2="150" stroke="#0f172a" strokeWidth="1.5" />

      {/* MCP Servers */}
      <rect x="500" y="40" width="300" height="220" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="650" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">MCP SERVERS</text>

      {[
        { label: "Filesystem MCP", sub: "Read/write local files", y: 72 },
        { label: "Database MCP", sub: "PostgreSQL · SQLite · Redis", y: 122 },
        { label: "GitHub MCP", sub: "Repos · Issues · PRs", y: 172 },
        { label: "Custom API MCP", sub: "Internal tools · REST APIs", y: 222 },
      ].map((s) => (
        <g key={s.y}>
          <rect x="520" y={s.y} width="260" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x="650" y={s.y + 17} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">{s.label}</text>
          <text x="650" y={s.y + 31} fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">{s.sub}</text>
        </g>
      ))}

      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Build once MCP Server → any MCP-compatible AI model can use it. Eliminates per-model integration. Open standard by Anthropic.</text>

      <defs>
        <marker id="mcp1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0f172a" /></marker>
      </defs>
    </svg>
  );
}
