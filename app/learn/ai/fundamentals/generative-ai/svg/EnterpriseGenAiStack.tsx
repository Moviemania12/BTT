"use client";
export default function EnterpriseGenAiStack() {
  const layers = [
    { label: "BUSINESS APPLICATIONS", sub: "Customer service · Code assistant · Document AI · Search · Analytics · Content generation", bg: "#fef3c7", border: "#f59e0b", tc: "#92400e" },
    { label: "AI AGENTS + ORCHESTRATION", sub: "LangChain · LlamaIndex · AutoGen · CrewAI · OpenAI Assistants · Custom agent frameworks", bg: "#fce7f3", border: "#ec4899", tc: "#831843" },
    { label: "ENTERPRISE AI GATEWAY", sub: "LiteLLM · Kong · Portkey — Auth · Rate limiting · Caching · Routing · Cost tracking · Guardrails", bg: "#fff7ed", border: "#ea580c", tc: "#7c2d12" },
    { label: "FOUNDATION MODELS", sub: "GPT-4o · Claude 3.5 · Gemini 1.5 · Llama 3 (self-hosted) · Mistral · Specialized fine-tuned models", bg: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { label: "VECTOR DATABASES + RAG PIPELINE", sub: "Pinecone · Weaviate · Qdrant · Embedding models (E5, BGE) · Chunking · Re-ranking · Hybrid search", bg: "#e0f2fe", border: "#0369a1", tc: "#075985" },
    { label: "MLOps + OBSERVABILITY", sub: "MLflow · W&B · LangFuse · Arize Phoenix · DCGM · Prometheus · Grafana · Cost dashboards · Evals", bg: "#dcfce7", border: "#16a34a", tc: "#14532d" },
    { label: "AI INFERENCE INFRASTRUCTURE", sub: "vLLM · TensorRT-LLM · Triton · KServe · Kubernetes + GPU Operator · Auto-scaling · Load balancing", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { label: "PHYSICAL AI INFRASTRUCTURE", sub: "GPU clusters (H100/B200) · InfiniBand NDR · Parallel FS (Weka/Lustre) · 40-100kW/rack · DLC cooling", bg: "#f1f5f9", border: "#94a3b8", tc: "#1e293b" },
  ];
  return (
    <svg viewBox="0 0 820 388" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="egs-title">
      <title id="egs-title">Enterprise GenAI Stack: Physical infrastructure to business applications — 8 layers</title>
      <rect width="820" height="388" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE GENERATIVE AI STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={32 + i * 44} width="780" height="36" rx="6" fill={l.bg} stroke={l.border} strokeWidth="1.5" />
          <text x="30" y={47 + i * 44} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x="30" y={61 + i * 44} fontFamily="Arial,sans-serif" fontSize="8" fill={l.tc}>{l.sub}</text>
        </g>
      ))}
      <text x="410" y="383" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Physical infrastructure at the bottom is the enabler — every GenAI capability ultimately constrained by GPU compute, memory, networking, and cooling.</text>
    </svg>
  );
}
