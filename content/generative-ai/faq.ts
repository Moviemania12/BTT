import type { FaqItem } from "@/lib/schemas";

export const genAiFaq: FaqItem[] = [
  {
    question: "What is the fundamental difference between generative AI and traditional discriminative AI?",
    answer:
      "Discriminative AI classifies or predicts from an input — it models P(y|x). Generative AI learns the underlying data distribution and generates new samples — it models P(x) or P(x,y). Infrastructure difference: generative models are much larger (billions vs millions of parameters), GPUs are mandatory, and inference is far more compute-intensive because of autoregressive token-by-token generation. A traditional fraud model just says 'fraud/not fraud'. A generative model can create a completely realistic synthetic transaction history that is statistically indistinguishable from real data.",
  },
  {
    question: "Why do hallucinations happen and how do you mitigate them in production?",
    answer:
      "Root cause: the next-token prediction objective gives the model no mechanism to express 'I don't know'. The model pattern-matches its way to confident-sounding text even without factual grounding. Mitigation stack: (1) RAG — ground responses in retrieved facts, (2) structured output with citations, (3) self-consistency — compare multiple generations, (4) output guardrails — factual accuracy checks, (5) human-in-the-loop for high-stakes decisions, (6) production hallucination-rate monitoring via LLM-as-judge evals, (7) domain-specific evals with expert review.",
  },
  {
    question: "When should you choose RAG vs fine-tuning?",
    answer:
      "Choose RAG when: you need factual knowledge injection, information updates frequently, you need to integrate proprietary documents, source attribution is needed, you need an auditable and maintainable solution, or you need a cheaper approach. Choose fine-tuning when: you need consistent behavior and format, domain-specific tone/style is needed, you need to train complex task-specific reasoning patterns, or the application is latency-critical (a smaller fine-tuned model vs prompting a large model). Often the two are complementary: fine-tune for behavior, RAG for knowledge. LoRA/QLoRA have dramatically reduced fine-tuning cost.",
  },
  {
    question: "What are AI Agents and how are they deployed in the enterprise?",
    answer:
      "AI Agents are GenAI systems that can use tools (web search, code execution, APIs), perform multi-step reasoning, make decisions, and complete long-horizon tasks. Core components: Planner (the LLM that decomposes the task), Memory (short-term and long-term context), Tool Executor (external API/system integration), Function Calling (structured tool invocation). Enterprise deployment: sandboxed execution environments, persistent state management, comprehensive audit logging, rate limiting, fallback handling. MCP (Model Context Protocol) standardizes tool integration. Infrastructure: agents make many more LLM calls, need queue management, and cost monitoring is critical.",
  },
  {
    question: "What is Model Context Protocol (MCP)?",
    answer:
      "MCP (Model Context Protocol) is Anthropic's open standard that standardizes how AI models connect to external data sources and tools. The MCP Client sits on the LLM application side, the MCP Server exposes external resources. Resources: files, databases, APIs the model can access. Tools: functions the model can execute. Enterprise benefit: build an MCP server once, and every MCP-compatible AI model can use it — vendor lock-in is reduced. MCP is a universal adapter between AI and the external world.",
  },
  {
    question: "What is the KV cache in LLM inference and why does it matter?",
    answer:
      "In autoregressive generation: generating each token requires processing all previous tokens. Without a KV cache: every step recomputes everything — O(n²) total compute. With a KV cache: store the previously computed Key and Value attention tensors, and only compute the new token. Cost: the KV cache sits in GPU HBM. A 70B model, 4096 context, batch 32: ~20GB KV cache. PagedAttention (vLLM) manages the KV cache efficiently using OS virtual-memory concepts — avoiding fragmentation, achieving higher throughput. Prefix caching: reuse the KV cache for identical system prompts — this dramatically reduces cost.",
  },
  {
    question: "What is an Enterprise AI Gateway and why deploy one?",
    answer:
      "An Enterprise AI Gateway is a central proxy layer that manages all AI API traffic. Functions: (1) authentication and authorization — IAM/RBAC, (2) rate limiting — per-user/team quotas, (3) prompt caching — intercepting identical requests, (4) model routing — different models for cost/quality optimization, (5) request/response logging — a complete audit trail, (6) cost tracking — per-team attribution, (7) guardrails — input/output filtering, (8) failover — use a backup model if the primary fails. Examples: Kong AI Gateway, LiteLLM Proxy, Portkey, Traefik AI. Deploying a single gateway makes centralized governance possible without every application team having to implement security/compliance themselves.",
  },
  {
    question: "What are prompt injection attacks and how do you protect against them?",
    answer:
      "In prompt injection, an attacker injects malicious instructions through user input that override the system prompt or make the model take unintended actions. Types: direct injection (the user directly types malicious text), indirect injection (hidden instructions in retrieved documents), RAG injection (malicious content in the knowledge base), tool poisoning (manipulated tool outputs). Protection: (1) an input sanitization pipeline, (2) instruction hierarchy enforcement (system prompt > user input), (3) content moderation on inputs, (4) sandboxed tool execution, (5) output monitoring for unexpected patterns, (6) principle of least privilege for tool access, (7) human approval for high-risk actions.",
  },
  {
    question: "Open-source LLMs (Llama, Mistral) vs proprietary (GPT-4, Claude) — when should the enterprise choose which?",
    answer:
      "Proprietary APIs (GPT-4, Claude, Gemini): best quality on complex tasks, managed infrastructure, constant updates, simple API, no GPU hardware required. Best for: quality-critical tasks, fast time-to-market, limited ML team. Open-source (Llama 3, Mistral, Mixtral): data privacy, customization, no per-token cost at scale, on-premises deployment. Best for: data sovereignty (banking, healthcare), scale economics, domain-specific fine-tuning, regulated industries. Reality: many enterprises use both — proprietary for complex tasks, open-source fine-tuned models for high-volume simpler tasks. Hybrid approach: open-source model + RAG often beats prompting expensive proprietary model for domain tasks.",
  },
  {
    question: "What are the infrastructure requirements for multimodal AI?",
    answer:
      "Multimodal models (GPT-4V, Gemini 1.5, Claude 3) process images, audio, and video alongside text. Infrastructure implications: (1) Vision — image encoding adds computation (ViT encoder + cross-attention to the LLM), additional GPU memory for image tokens. (2) Audio — an ASR pipeline or audio encoder, high-frequency inference for real-time voice. (3) Video — frame extraction, sampling, temporal modeling — very high compute. (4) OCR — document processing pipeline, layout-aware models (LayoutLM, Donut). Memory: multimodal inputs mean more tokens, which means a larger KV cache. Throughput: image-heavy workloads are GPU-bound differently than text-only workloads. Serving: separate encoding pipeline + text generation pipeline.",
  },
  {
    question: "How do you optimize GenAI costs in production?",
    answer:
      "Five-layer cost optimization: (1) Model routing — simple queries go to a cheap model (Haiku/Flash), complex queries to an expensive model (Opus/GPT-4). 50-70% cost reduction is possible. (2) Caching — prompt cache (Anthropic/Google), semantic cache (similar queries return a cached response). A cache hit means zero LLM cost. (3) Quantization — INT8/INT4 self-hosted models give higher throughput per GPU, lowering cost per request. (4) Batch inference — batch non-real-time tasks, off-peak scheduling gives 40-60% savings. (5) Prompt optimization — remove unnecessary context, set max_tokens. Combined: a 60-80% cost reduction vs a naive deployment is achievable.",
  },
  {
    question: "What should you track for AI observability and LLM monitoring?",
    answer:
      "Infrastructure metrics: GPU utilization (target 70-85% for inference), GPU memory, TTFT (time to first token), TPOT (time per output token), throughput (tokens/sec), queue depth, error rate. Quality metrics: user feedback signals (thumbs up/down), task completion rate, hallucination rate (sampled eval), output toxicity rate, factual accuracy score. Business metrics: cost per request, cost per team/feature, token usage trends. LLM-specific tools: LangFuse (open-source traces + evals), LangSmith (LangChain integrated), Arize Phoenix (LLM observability), W&B Weave, PromptLayer. Essential: end-to-end trace — prompt → retrieval → generation → guardrails — single unified view.",
  },
  {
    question: "What are reasoning models (o3, Gemini 2.0) and what is their infrastructure impact?",
    answer:
      "Reasoning models explicitly perform chain-of-thought thinking before answering — generating 'thinking tokens' or a 'scratchpad'. OpenAI o3, o1, and Gemini 2.0 Flash Thinking use this approach. Impact: (1) output length is dramatically longer — hundreds to thousands of additional thinking tokens. (2) Latency is higher — thinking time adds seconds to minutes. (3) Cost is higher — more tokens means more compute. (4) Quality is dramatically better on complex reasoning, math, science. Infrastructure adjustment: longer timeout thresholds, streaming becomes mandatory (users can't wait), a larger KV cache. Best for: complex problem solving, code generation, math, research. Not ideal for: simple Q&A, high-throughput low-latency applications.",
  },
  {
    question: "What is air-gapped AI deployment and why does it matter in regulated industries?",
    answer:
      "Air-gapped AI deployment: model completely isolated from internet — no data leaves organization's network. Critical for: defense, intelligence, nuclear, financial trading (market-sensitive), highly regulated healthcare. Implementation: on-premises GPU cluster, self-hosted LLM (Llama, Mistral), self-hosted vector database, no cloud API calls. Challenges: no model updates from provider, no cloud scaling, full operational burden. Lighter alternative: private endpoint deployment — dedicated infrastructure in cloud provider's network, network isolated from public internet, data never traverses public internet. AWS PrivateLink, Azure Private Endpoint — standard approach for enterprise banking/healthcare GenAI.",
  },
  {
    question: "What are the selection criteria for a vector database in production?",
    answer:
      "Evaluation dimensions: (1) Scale — number of vectors, query throughput requirement. (2) Latency — P99 query latency requirement. (3) Filtering — metadata filter support (year, category, author). (4) Hybrid search — vector + keyword BM25 combined. (5) Managed vs self-hosted — operational burden trade-off. (6) Pricing — per-vector, per-query, or compute-based. Recommendations: Pinecone — best managed option, simple ops, good scale. Weaviate — best hybrid search, good for complex queries. Qdrant — best performance/cost, Rust-based, self-hosted. pgvector — for existing PostgreSQL users, lower scale. Milvus — highest scale (billions), enterprise features. Decision: start with Qdrant (self-hosted) or Pinecone (managed), migrate if scale demands it.",
  },
];
