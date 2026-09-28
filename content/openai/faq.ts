import type { FaqItem } from "@/lib/schemas";

export const openaiFaq: FaqItem[] = [
  {
    question: "What is OpenAI and why is it more than just the ChatGPT company?",
    answer:
      "OpenAI is an AI research and deployment company founded in San Francisco in 2015. In public perception it's mainly known for ChatGPT, but from an infrastructure perspective OpenAI is much more: a frontier AI research lab that trains large language models, a commercial API platform that gives developers programmatic access, an enterprise solution provider, and an organization that actively does AI safety research. ChatGPT is just one of OpenAI's consumer products — the actual platform has a complete ecosystem of frontier/general-purpose models, reasoning models, embeddings, image/audio models, APIs, fine-tuning capabilities, and developer tools. Verify the current model portfolio at official documentation: platform.openai.com/docs/models. OpenAI matters for data center professionals because it demonstrates how dramatically different modern AI workloads are from traditional compute infrastructure.",
  },
  {
    question: "What is the fundamental difference between ChatGPT and the OpenAI API?",
    answer:
      "ChatGPT is a consumer-facing web application and mobile app — built by OpenAI, used directly by end users, has a conversational interface, and is hosted on OpenAI's servers. The OpenAI API is a programmatic interface used by developers and businesses to integrate OpenAI models into their own applications. With the API: you choose specific models, send requests programmatically, process responses, and pay per token. Important distinctions: ChatGPT conversations can be used in OpenAI's training by default (opt-out is available), whereas API usage is not used for training by default — an important distinction for enterprise data sensitivity. Context management also differs: ChatGPT maintains conversation within a session; the standard Chat Completions API is stateless and the developer manages the messages array. OpenAI's newer Responses API and conversation state features are also available — verify current capabilities from official documentation: platform.openai.com/docs. Model versions, configurations, and features available on ChatGPT and the API aren't exactly the same — OpenAI maintains different defaults and lineups across different surfaces.",
  },
  {
    question: "How is OpenAI connected to Microsoft Azure?",
    answer:
      "There's a significant strategic partnership between OpenAI and Microsoft. Microsoft is a major cloud infrastructure partner for OpenAI — substantial training and inference capacity runs on Azure-based infrastructure. Azure OpenAI Service is a separate Microsoft product that lets enterprises access OpenAI models through Azure — data stays in Azure regions, Azure compliance certifications apply, and billing happens through enterprise Azure contracts. Important clarification: OpenAI's infrastructure isn't limited to Azure alone. OpenAI has announced the Stargate project — a significant infrastructure initiative in which OpenAI, SoftBank, and other partners are building dedicated AI infrastructure. Exact details — locations, capacity, technical architecture — are not publicly confirmed beyond high-level announcements. This pattern demonstrates that AI labs depend on major cloud providers for frontier infrastructure while simultaneously building independent capacity as well.",
  },
  {
    question: "How does an AI request flow through the infrastructure on the OpenAI API, exactly?",
    answer:
      "Note: this is a generalized AI-serving architecture description — OpenAI's internal production architecture is not publicly confirmed. When you call the OpenAI API: (1) The HTTPS request reaches the API gateway — authentication (API key verification), rate limiting, and routing happen here. (2) The request routes to inference infrastructure — GPU servers where model weights are already loaded in memory. (3) Model inference runs — input tokens are processed, output tokens are generated autoregressively (one token at a time). (4) A streaming response is possible — reaching the client via server-sent events as each token is generated, or the complete response is buffered and returned at once. (5) Token usage is tracked for billing. Total latency depends on: the model (larger/reasoning models = slower), input length, output length, current server load, and geographic distance. The enterprise tier typically provides more consistent latency.",
  },
  {
    question: "What are the main differences between training and inference infrastructure at OpenAI-like scale?",
    answer:
      "Training infrastructure: massive scale — frontier model training requires enormous compute, over weeks to months. Exact hardware specifications are not publicly disclosed. High-speed interconnects are essential for GPU-to-GPU gradient exchange. Checkpoint storage is significant — frontier-scale model checkpoints are very large. A one-time or periodic compute job. Inference infrastructure: a fundamentally different pattern. Many serving clusters — the exact architecture is publicly undisclosed. Low latency is a priority. High concurrency — millions of simultaneous users. Model weights are preloaded in memory. Autoscaling with demand. Quantization is often used. Cost economics differ: training is a large upfront cost, inference is a continuous per-request cost that needs to be matched to revenue. OpenAI's internal infrastructure details aren't officially disclosed beyond general statements — specific GPU counts or exact locations aren't publicly confirmed.",
  },
  {
    question: "How are OpenAI's reasoning models different from standard models on infrastructure?",
    answer:
      "OpenAI's o-series reasoning models (verify the current lineup: platform.openai.com/docs/models) use a different inference pattern — extended thinking/chain-of-thought reasoning that lets models spend more compute on complex problems before the final answer. Infrastructure implications: longer generation time per request. Higher compute per request. More expensive per request — correspondingly higher API pricing. Different timeout requirements — applications have to be designed to handle longer response times. Streaming is especially important for UX. This demonstrates that 'inference' isn't a monolithic concept — different model architectures create dramatically different resource profiles.",
  },
  {
    question: "For enterprise use, what should you choose between the OpenAI API and Azure OpenAI Service?",
    answer:
      "OpenAI API directly: simpler setup, latest models typically available first, direct billing with OpenAI, OpenAI's terms apply. Azure OpenAI Service: billing through Azure subscription, the Azure compliance portfolio (SOC 2, ISO 27001, HIPAA eligibility, etc.), data stays in the Azure region, Azure networking integration (VNet, private endpoints), leverage your existing Azure enterprise agreement. Recommendation framework: already an Azure enterprise customer and compliance/data residency is critical → Azure OpenAI Service. A startup or developer wanting simplicity → direct OpenAI API. Regulated industry (healthcare, finance, government) → Azure OpenAI Service is typically better aligned. Note: both products serve OpenAI models but exact model availability, versions, and features can differ — Azure deployment lags and feature parity isn't exact. Current Azure OpenAI model availability: learn.microsoft.com/azure/ai-services/openai/",
  },
  {
    question: "How does data privacy work for OpenAI models?",
    answer:
      "Per official OpenAI policy: data sent through the API is not used to train OpenAI's models by default. Data may be retained for some period for abuse monitoring — exact retention details are in the current privacy policy. A Zero Data Retention (ZDR) option is available in some configurations. In the ChatGPT consumer product: conversations can contribute to training data — you can opt out in settings. The enterprise tier provides additional protections. Practical guidance: handle sensitive data carefully. Consider Azure OpenAI Service for data residency requirements. Always verify current official policy — policies can update: openai.com/policies/privacy-policy",
  },
  {
    question: "How do rate limits and quotas impact AI infrastructure design?",
    answer:
      "OpenAI API rate limits exist across multiple dimensions: RPM (Requests Per Minute), TPM (Tokens Per Minute), RPD (Requests Per Day), and model-specific limits. These limits are tier-based — the free tier is quite limited, paid tiers get more capacity, enterprise agreements get custom limits. Impact on infrastructure design: applications should implement rate limit handling — exponential backoff with jitter, retry logic. High-volume applications should consider batching. Rate limits drive architecture decisions. Caching becomes important — cache responses instead of repeatedly sending the same queries to OpenAI. Cost optimization: optimize token usage — keep system prompts concise, control output length. Current tier limits update frequently — check official docs: platform.openai.com/docs/guides/rate-limits",
  },
  {
    question: "What are the infrastructure considerations for embedding with OpenAI models (embeddings)?",
    answer:
      "The OpenAI Embeddings API converts text into dense vector representations useful for semantic similarity search. Current embedding models (text-embedding-3-large, text-embedding-3-small — verify at platform.openai.com/docs/guides/embeddings). Infrastructure implications: vector storage — embeddings have to be stored in vector databases — Pinecone, Weaviate, pgvector, Qdrant, etc. Scale: storage requirements depend on corpus size, dimensions, and document count — project-specific planning is necessary. Index updates: when new documents are added, embeddings need to be generated and the index updated. Retrieval latency: vector similarity search latency depends on the vector DB implementation, index size, and hardware — low latency is possible on well-configured systems. RAG (Retrieval Augmented Generation) architecture: embeddings → vector search → retrieve relevant context → pass to LLM for generation. Cost: embedding models are relatively cheap per token but cumulative cost can be significant in large-scale indexing projects.",
  },
];
