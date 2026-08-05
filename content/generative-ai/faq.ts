import type { FaqItem } from "@/lib/schemas";

export const genAiFaq: FaqItem[] = [
  {
    question: "Generative AI aur traditional discriminative AI mein fundamental difference kya hai?",
    answer:
      "Discriminative AI input se classification ya prediction karta hai — P(y|x) model karta hai. Generative AI underlying data distribution learn karta hai aur new samples generate karta hai — P(x) ya P(x,y) model karta hai. Infrastructure difference: generative models much larger (billions vs millions of params), GPU mandatory, inference much more compute intensive because of autoregressive token-by-token generation. Traditional fraud model sirf 'fraud/not fraud' batata hai. Generative model ek completely realistic synthetic transaction history create kar sakta hai jo real data se statistically indistinguishable ho.",
  },
  {
    question: "Hallucinations kyun hote hain aur production mein kaise mitigate karein?",
    answer:
      "Root cause: next token prediction objective model ko 'I don't know' express karne ka mechanism nahi deta. Model pattern-matching se confident-sounding text generate karta hai even without factual grounding. Mitigation stack: (1) RAG — retrieved facts se ground karo, (2) Structured output with citations, (3) Self-consistency — multiple generations compare karo, (4) Output guardrails — factual accuracy checks, (5) Human-in-loop for high-stakes decisions, (6) Production hallucination rate monitoring via LLM-as-judge evals, (7) Domain-specific evals with expert review.",
  },
  {
    question: "RAG aur fine-tuning mein kab kya choose karein?",
    answer:
      "RAG choose karo jab: factual knowledge injection chahiye, information frequently update hoti hai, proprietary documents integrate karne hain, source attribution needed hai, auditable aur maintainable solution chahiye, cheaper approach needed hai. Fine-tuning choose karo jab: consistent behavior aur format chahiye, domain-specific tone/style needed hai, complex task-specific reasoning patterns train karne hain, latency-critical application hai (smaller fine-tuned model vs prompting large model). Often complementary: fine-tune for behavior, RAG for knowledge. LoRA/QLoRA ne fine-tuning cost dramatically reduce kar diya hai.",
  },
  {
    question: "AI Agents kya hote hain aur enterprise mein kaise deploy karte hain?",
    answer:
      "AI Agents GenAI systems hain jo tools use kar sakte hain (web search, code execution, APIs), multi-step reasoning karte hain, decisions lete hain, aur long-horizon tasks complete karte hain. Core components: Planner (LLM jo task decompose karta hai), Memory (short-term aur long-term context), Tool Executor (external API/system integration), Function Calling (structured tool invocation). Enterprise deployment: sandboxed execution environments, persistent state management, comprehensive audit logging, rate limiting, fallback handling. MCP (Model Context Protocol) standardize karta hai tool integration. Infrastructure: agents use many more LLM calls, need queue management, cost monitoring critical.",
  },
  {
    question: "Model Context Protocol (MCP) kya hai?",
    answer:
      "MCP (Model Context Protocol) Anthropic ka open standard hai jo standardize karta hai ki AI models external data sources aur tools se kaise connect karte hain. MCP Client LLM application side pe hota hai, MCP Server external resources expose karta hai. Resources: files, databases, APIs jo model access kar sakta hai. Tools: functions jo model execute kar sakta hai. Enterprise benefit: once ek MCP server build karo, har MCP-compatible AI model usse use kar sakta hai — vendor lock-in reduce hota hai. MCP ek universal adapter hai AI aur external world ke beech.",
  },
  {
    question: "LLM inference mein KV cache kya hai aur kyun important hai?",
    answer:
      "Autoregressive generation mein: each token generate karne ke liye sab previous tokens process karte hain. Without KV cache: every step pe sab tokens recompute — O(n²) total compute. With KV cache: previously computed Key aur Value attention tensors store karo, sirf new token compute karo. Cost: KV cache GPU HBM mein storage. 70B model, 4096 context, batch 32: ~20GB KV cache. PagedAttention (vLLM) KV cache ko OS virtual memory concepts se efficiently manage karta hai — fragmentation avoid karo, higher throughput achieve karo. Prefix caching: identical system prompts ke KV cache reuse karo — cost dramatically reduce hota hai.",
  },
  {
    question: "Enterprise AI Gateway kya hota hai aur kyun deploy karte hain?",
    answer:
      "Enterprise AI Gateway ek central proxy layer hai jo sab AI API traffic manage karta hai. Functions: (1) Authentication aur authorization — IAM/RBAC, (2) Rate limiting — per-user/team quotas, (3) Prompt caching — identical requests intercept karo, (4) Model routing — cost/quality optimization ke liye alag models, (5) Request/response logging — complete audit trail, (6) Cost tracking — per-team attribution, (7) Guardrails — input/output filtering, (8) Failover — primary model fail ho toh backup use karo. Examples: Kong AI Gateway, LiteLLM Proxy, Portkey, Traefik AI. Single gateway deploy karne se centralized governance possible hoti hai bina har application team ko security/compliance implement karne ke.",
  },
  {
    question: "Prompt injection attacks kya hain aur kaise protect karein?",
    answer:
      "Prompt injection mein attacker user input ke through malicious instructions inject karta hai jo system prompt override kare ya model ko unintended actions karwaye. Types: Direct injection (user directly malicious text input karta hai), Indirect injection (retrieved documents mein hidden instructions), RAG injection (malicious content knowledge base mein), Tool poisoning (tool outputs manipulated). Protection: (1) Input sanitization pipeline, (2) Instruction hierarchy enforcement (system prompt > user input), (3) Content moderation on inputs, (4) Sandboxed tool execution, (5) Output monitoring for unexpected patterns, (6) Principle of least privilege for tool access, (7) Human approval for high-risk actions.",
  },
  {
    question: "Open-source LLMs (Llama, Mistral) vs proprietary (GPT-4, Claude) enterprise mein kab choose karein?",
    answer:
      "Proprietary APIs (GPT-4, Claude, Gemini): best quality on complex tasks, managed infrastructure, constant updates, simple API, no GPU hardware required. Best for: quality-critical tasks, fast time-to-market, limited ML team. Open-source (Llama 3, Mistral, Mixtral): data privacy, customization, no per-token cost at scale, on-premises deployment. Best for: data sovereignty (banking, healthcare), scale economics, domain-specific fine-tuning, regulated industries. Reality: many enterprises use both — proprietary for complex tasks, open-source fine-tuned models for high-volume simpler tasks. Hybrid approach: open-source model + RAG often beats prompting expensive proprietary model for domain tasks.",
  },
  {
    question: "Multimodal AI infrastructure requirements kya hain?",
    answer:
      "Multimodal models (GPT-4V, Gemini 1.5, Claude 3) text ke saath images, audio, video process karte hain. Infrastructure implications: (1) Vision — image encoding adds computation (ViT encoder + cross-attention to LLM), additional GPU memory for image tokens. (2) Audio — ASR pipeline ya audio encoder, high-frequency inference for real-time voice. (3) Video — frame extraction, sampling, temporal modeling — very high compute. (4) OCR — document processing pipeline, layout-aware models (LayoutLM, Donut). Memory: multimodal inputs = more tokens = larger KV cache. Throughput: image-heavy workloads GPU-bound differently than text-only. Serving: separate encoding pipeline + text generation pipeline.",
  },
  {
    question: "GenAI ki cost optimize kaise karein production mein?",
    answer:
      "Five-layer cost optimization: (1) Model routing — simple queries cheap model (Haiku/Flash), complex queries expensive model (Opus/GPT-4). 50-70% cost reduction possible. (2) Caching — prompt cache (Anthropic/Google), semantic cache (similar queries return cached response). Cache hit = zero LLM cost. (3) Quantization — INT8/INT4 self-hosted models → higher throughput per GPU → lower cost per request. (4) Batch inference — non-real-time tasks batch karo, off-peak scheduling → 40-60% cheaper. (5) Prompt optimization — unnecessary context remove karo, max_tokens set karo. Combined: 60-80% cost reduction vs naive deployment achievable.",
  },
  {
    question: "AI Observability aur LLM monitoring mein kya track karna chahiye?",
    answer:
      "Infrastructure metrics: GPU utilization (target 70-85% for inference), GPU memory, TTFT (time to first token), TPOT (time per output token), throughput (tokens/sec), queue depth, error rate. Quality metrics: user feedback signals (thumbs up/down), task completion rate, hallucination rate (sampled eval), output toxicity rate, factual accuracy score. Business metrics: cost per request, cost per team/feature, token usage trends. LLM-specific tools: LangFuse (open-source traces + evals), LangSmith (LangChain integrated), Arize Phoenix (LLM observability), W&B Weave, PromptLayer. Essential: end-to-end trace — prompt → retrieval → generation → guardrails — single unified view.",
  },
  {
    question: "Reasoning models (o3, Gemini 2.0) kya hain aur infrastructure pe kya impact hai?",
    answer:
      "Reasoning models chain-of-thought thinking explicitly perform karte hain before answering — 'thinking tokens' ya 'scratchpad' generate karte hain. OpenAI o3, o1, Gemini 2.0 Flash Thinking yeh approach use karte hain. Impact: (1) Output length dramatically longer — thinking tokens hundreds to thousands additional. (2) Latency higher — thinking time adds seconds to minutes. (3) Cost higher — more tokens = more compute. (4) Quality dramatically better on complex reasoning, math, science. Infrastructure adjustment: longer timeout thresholds, streaming mandatory (users can't wait), KV cache larger. Best for: complex problem solving, code generation, math, research. Not ideal for: simple Q&A, high-throughput low-latency applications.",
  },
  {
    question: "Air-gapped AI deployment kya hai aur regulated industries mein kyun important hai?",
    answer:
      "Air-gapped AI deployment: model completely isolated from internet — no data leaves organization's network. Critical for: defense, intelligence, nuclear, financial trading (market-sensitive), highly regulated healthcare. Implementation: on-premises GPU cluster, self-hosted LLM (Llama, Mistral), self-hosted vector database, no cloud API calls. Challenges: no model updates from provider, no cloud scaling, full operational burden. Lighter alternative: private endpoint deployment — dedicated infrastructure in cloud provider's network, network isolated from public internet, data never traverses public internet. AWS PrivateLink, Azure Private Endpoint — standard approach for enterprise banking/healthcare GenAI.",
  },
  {
    question: "Vector database selection criteria kya hain production deployment ke liye?",
    answer:
      "Evaluation dimensions: (1) Scale — kitne vectors, query throughput requirement. (2) Latency — P99 query latency requirement. (3) Filtering — metadata filters support (year, category, author). (4) Hybrid search — vector + keyword BM25 combined. (5) Managed vs self-hosted — operational burden tradeoff. (6) Pricing — per-vector, per-query, or compute-based. Recommendations: Pinecone — best managed, simple ops, good scale. Weaviate — best hybrid search, good for complex queries. Qdrant — best performance/cost, Rust-based, self-hosted. pgvector — existing PostgreSQL users, lower scale. Milvus — highest scale (billions), enterprise features. Decision: start with Qdrant (self-hosted) or Pinecone (managed), migrate if scale demands it.",
  },
];
