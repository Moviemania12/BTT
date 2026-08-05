"use client";
export default function VectorSearchFlow() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="vsf-title">
      <title id="vsf-title">RAG Vector Search Flow: Query embedding, vector similarity search, chunk retrieval, augmented generation</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">RAG — VECTOR SEARCH FLOW</text>

      {/* Query path */}
      <rect x="20" y="50" width="120" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="80" y="72" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">User Query</text>
      <line x1="142" y1="68" x2="162" y2="68" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#vsf1)" />

      <rect x="162" y="42" width="140" height="52" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="232" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Embedding Model</text>
      <text x="232" y="76" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Query → [0.12, -0.43,</text>
      <text x="232" y="88" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">0.87, ... 1536 dims]</text>
      <line x1="304" y1="68" x2="324" y2="68" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#vsf1)" />

      {/* Vector DB search */}
      <rect x="324" y="36" width="160" height="120" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="404" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">VECTOR DATABASE</text>
      <text x="404" y="74" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">HNSW Index</text>
      <text x="404" y="87" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">ANN Search</text>
      <text x="404" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Cosine Similarity</text>
      <text x="404" y="113" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Top-K retrieval</text>
      <text x="404" y="126" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">(K=3-10 chunks)</text>
      <text x="404" y="143" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">Latency: 10-100ms</text>
      <line x1="486" y1="96" x2="506" y2="96" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#vsf1)" />

      {/* Retrieved chunks */}
      <rect x="506" y="36" width="160" height="116" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="586" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">RETRIEVED CHUNKS</text>
      {["Chunk 1 (score: 0.94)", "Chunk 2 (score: 0.91)", "Chunk 3 (score: 0.87)"].map((c, i) => (
        <g key={i}>
          <rect x="520" y={66 + i * 26} width="132" height="20" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.5" />
          <text x="586" y={79 + i * 26} fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">{c}</text>
        </g>
      ))}
      <text x="586" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">+ Re-ranking optional</text>
      <line x1="668" y1="96" x2="688" y2="96" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#vsf1)" />

      {/* LLM */}
      <rect x="688" y="50" width="112" height="92" rx="8" fill="#0f172a" stroke="#00d4ff" strokeWidth="2" />
      <text x="744" y="78" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">LLM</text>
      <text x="744" y="94" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Augmented</text>
      <text x="744" y="107" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Prompt</text>
      <text x="744" y="120" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">= Query +</text>
      <text x="744" y="133" fontFamily="Arial,sans-serif" fontSize="8" fill="#7dd3fc" textAnchor="middle">Context Chunks</text>

      {/* Indexing pipeline below */}
      <rect x="20" y="185" width="780" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="205" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">DOCUMENT INDEXING PIPELINE (offline batch)</text>
      {[
        { label: "Raw Docs", sub: "PDF/Word/Web", x: 35 },
        { label: "Chunking", sub: "512-1024 tokens", x: 155 },
        { label: "Embedding", sub: "Batch embed model", x: 285 },
        { label: "Index Build", sub: "HNSW construction", x: 430 },
        { label: "Vector Store", sub: "Qdrant/Weaviate", x: 580 },
        { label: "Metadata", sub: "Filters + attributes", x: 700 },
      ].map((s, i, arr) => (
        <g key={i}>
          <rect x={s.x} y="215" width="110" height="38" rx="4" fill="#e2e8f0" />
          <text x={s.x + 55} y="231" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">{s.label}</text>
          <text x={s.x + 55} y="245" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">{s.sub}</text>
          {i < arr.length - 1 && <line x1={s.x + 112} y1="234" x2={s.x + 151} y2="234" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#vsf1)" />}
        </g>
      ))}

      <text x="410" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Hybrid search: vector similarity + BM25 keyword → combine scores → better retrieval than either alone</text>

      <defs>
        <marker id="vsf1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
