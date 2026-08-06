"use client";
export default function EnterpriseLlmStack() {
  const layers = [
    { label: "BUSINESS APPLICATIONS", sub: "Customer service · Code assistant · Document AI · Analytics · Internal knowledge base", bg: "#fef3c7", border: "#f59e0b", tc: "#92400e" },
    { label: "AI AGENTS + ORCHESTRATION", sub: "LangChain · LlamaIndex · AutoGen · CrewAI · OpenAI Assistants · MCP Servers", bg: "#fce7f3", border: "#ec4899", tc: "#831843" },
    { label: "ENTERPRISE AI GATEWAY", sub: "LiteLLM · Kong · Envoy AI Gateway — Auth · Rate limit · Caching · Model routing · Cost tracking", bg: "#fff7ed", border: "#ea580c", tc: "#7c2d12" },
    { label: "LLM SERVING LAYER", sub: "vLLM · TensorRT-LLM · SGLang · Triton — PagedAttention · Continuous batching · Speculative decoding", bg: "#ede9fe", border: "#7c3aed", tc: "#4c1d95" },
    { label: "FOUNDATION MODELS", sub: "GPT-4o · Claude 3.5 · Llama 3.1 405B · Mistral · Mixtral MoE · DeepSeek · Phi-4 · IBM Granite", bg: "#dbeafe", border: "#2563eb", tc: "#1e40af" },
    { label: "GPU COMPUTE INFRASTRUCTURE", sub: "NVIDIA H100/B200 · NVLink/NVSwitch · DGX/HGX · AMD MI300X · CUDA · FP8 Mixed Precision", bg: "#dcfce7", border: "#16a34a", tc: "#14532d" },
    { label: "AI DATA CENTER FABRIC", sub: "InfiniBand NDR 400G · Non-blocking fat-tree · Parallel FS (Lustre/Weka/VAST) · 40-100kW/rack DLC", bg: "#f1f5f9", border: "#94a3b8", tc: "#1e293b" },
  ];
  return (
    <svg viewBox="0 0 820 346" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="els-title">
      <title id="els-title">Enterprise LLM Stack: AI Data Center to GPU Compute to Foundation Models to Serving to Gateway to Agents to Applications</title>
      <rect width="820" height="346" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ENTERPRISE LLM STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={32 + i * 44} width="780" height="36" rx="6" fill={l.bg} stroke={l.border} strokeWidth="1.5" />
          <text x="30" y={47 + i * 44} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x="30" y={61 + i * 44} fontFamily="Arial,sans-serif" fontSize="8" fill={l.tc}>{l.sub}</text>
        </g>
      ))}
      <text x="410" y="342" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Every LLM capability ultimately constrained by physical infrastructure — GPU HBM, networking bandwidth, cooling capacity</text>
    </svg>
  );
}
