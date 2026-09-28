import type { FaqItem } from "@/lib/schemas";

export const llmFaq: FaqItem[] = [
  {
    question: "How important is the context window for LLM infrastructure?",
    answer:
      "Context window length is directly related to GPU memory. More context = more KV cache = more GPU HBM. 70B model at FP16: model weights 140GB + KV cache at 128K context ~43GB per request = ~183GB per concurrent long-context request. 3× H100 minimum. Short-context (2-4K) workloads: same model, much lower memory — many more concurrent requests. Infrastructure planning: know your typical context length distribution. Use the 90th percentile context length for GPU sizing, not the maximum theoretical. Context window selection should balance capability and infrastructure cost.",
  },
  {
    question: "When should you choose self-hosted LLMs vs cloud API?",
    answer:
      "Cloud API: fast start, no GPU expertise needed, automatic updates, managed compliance. On-premises: data sovereignty (RBI, HIPAA), high-volume economics, customization (fine-tuning), offline operation, no rate limits. Decision framework: check sensitivity first (can data leave the org?). If yes, experiment with a cloud API. Then calculate volume × cost per token at 12-month scale. If >Rs. 2-3 crore/year on APIs: analyze on-premises TCO. Typically: a hybrid — a proprietary API for complex tasks, self-hosted for high-volume routine tasks.",
  },
  {
    question: "Are open source LLMs safe for commercial use?",
    answer:
      "Depends on the license. Llama 3: Llama 3 Community License — commercial use allowed, some restrictions (no competing AI services). Mistral 7B, Gemma 2, Qwen 2.5, Falcon: Apache 2.0 — fully open, commercial use unrestricted. Legal review is mandatory for production deployment. IP indemnification: closed APIs (OpenAI Enterprise, Anthropic Enterprise) offer this — open source models don't. Training data copyright: ongoing litigation risk for all large models (open and closed). Always review license terms before production deployment.",
  },
  {
    question: "What is the minimum infrastructure needed for LLM fine-tuning?",
    answer:
      "QLoRA (most efficient): fine-tuning a 70B model is possible on a single NVIDIA A100 80GB or H100 80GB. 7B model: on a single A10G (24GB). Dataset: typically 1,000-100,000 instruction pairs. Training time: 7B model, 10K examples, single A100 → a few hours. Software: Hugging Face TRL library, PEFT library, bitsandbytes quantization. For production-quality fine-tuning: 4-8× A100/H100, curated high-quality data, a proper evaluation framework. QLoRA has democratized fine-tuning — making it feasible even for organizations without hyperscale budgets.",
  },
  {
    question: "How do you control LLM costs in production?",
    answer:
      "Five-layer approach: (1) Model routing — simple queries to a cheap model (7B), complex ones to an expensive model (70B). 50-70% savings. (2) Prefix caching — compute shared system prompts once. 60-80% savings on prefix tokens. (3) Quantization — INT4 self-hosted models give 4× more throughput per GPU. (4) Output length control — explicit length instructions, set max_tokens. (5) Semantic caching — a cached response for similar queries. Combined: 60-80% total cost reduction vs a naive deployment. Monitor cost per request per feature to identify optimization opportunities.",
  },
  {
    question: "What are the specific compliance considerations for deploying an LLM in India?",
    answer:
      "DPDP Act 2023: consent and purpose limitation for personal data processing. Patient data (healthcare): keep on-premises, de-identify before the LLM call. Financial data (banking, NBFC): RBI guidelines on data localization, explainability for credit decisions. Government projects: NIC/MeghRaj cloud preference, data residency mandatory. GDPR applicability: if you're serving European users. Practically: a PII stripping pipeline before any LLM call. Audit logs for every inference (data retention as per sector). Preference for on-premises deployment in regulated sectors. Legal review for each use case.",
  },
  {
    question: "Is it possible to completely eliminate LLM hallucinations?",
    answer:
      "No. Hallucination is a fundamental property of how LLMs work — next token prediction doesn't inherently encode factual accuracy. Mitigation stack: RAG grounding (most effective for factual tasks), citation requirements, self-consistency, confidence estimation, chain-of-thought, RLHF with factuality rewards, output verification pipeline. Production target: define an 'acceptable hallucination rate' for the use case. Medical diagnosis: near-zero tolerance. Creative writing: acceptable. Customer service FAQ: low tolerance. Build an evaluation framework, measure baseline, track improvement.",
  },
  {
    question: "Why is the attention mechanism important in Transformer architecture?",
    answer:
      "Self-attention allows every token in a sequence to relate directly to any other token — distance is irrelevant. RNN's problem: gradients vanish over many steps in long-range dependencies. Attention: a direct connection. Multi-head attention: captures multiple types of relationships simultaneously. Parallelizable training: unlike RNNs, all attention operations can be computed simultaneously — maximizing GPU efficiency. This is the reason Transformers scale so efficiently on GPU clusters.",
  },
  {
    question: "What is the KV cache and why is it critical in production?",
    answer:
      "In autoregressive generation, generating token N requires processing all N-1 previous tokens. Without a KV cache: O(n²) total compute. With a KV cache: process all input tokens in the prefill phase, store the Key and Value tensors in GPU HBM. In the decode phase: compute the Query for only the new token, attend to the cached K and V. O(1) per step. 10-50× faster generation. Trade-off: memory cost grows linearly with context length and batch size. PagedAttention (vLLM) manages the KV cache using virtual memory concepts — eliminating fragmentation, maximizing throughput.",
  },
  {
    question: "What's the difference between RLHF and DPO, and when should you choose which?",
    answer:
      "RLHF: SFT model → train a reward model on human preferences → PPO/alternative optimization. A complex multi-stage process. Infrastructure: multiple models simultaneously, expensive. DPO: optimizes directly from paired preferred/rejected responses. No separate reward model. A single training phase. More stable. Lower infrastructure requirements. Quality: DPO is comparable to or better than RLHF on many benchmarks. Choose RLHF: when nuanced reward modeling is required and a large human preference dataset is available. Choose DPO: when a simpler pipeline is preferred, resources are limited, or faster iteration is needed. ORPO and IPO further simplify alignment without explicit negative examples in some formulations.",
  },
  {
    question: "How do you plan infrastructure for deploying a 70B model in production?",
    answer:
      "Step 1: decide precision. FP16 = 140GB, INT8 = 70GB, INT4 = 35GB. Step 2: estimate KV cache. Expected context length × batch size × per-token KV cache. Llama 3 70B at 4096 context, batch 32: ~20GB. Step 3: total GPU memory = weights + KV cache + 20% buffer. FP16: ~185GB → 3× H100 80GB. INT4: ~63GB → 1× H100 80GB (with some KV headroom). Step 4: vLLM with PagedAttention. Step 5: tensor parallelism if multi-GPU. NVLink within the node. Step 6: load balancing + auto-scaling. K8s HPA on GPU utilization. Step 7: monitoring — DCGM, vLLM metrics, LangFuse for LLM traces.",
  },
  {
    question: "What is the infrastructure impact of Mixture of Experts architecture?",
    answer:
      "MoE: N expert FFN networks, a router selects the top-K for each token (typically K=2). Mixtral 8×7B — 47B total parameters, ~13B active per token. Quality: approaches 70B dense. Compute: similar to 13B. Memory: all 47B need to be loaded (94GB FP16). Expert parallelism: different experts on different GPUs. Load balancing: the router has to ensure a uniform distribution (the dead expert problem). Best for high-throughput serving, not low-latency single-request scenarios. DeepSeek-V3 and similar large MoE models demonstrate modern frontier capabilities.",
  },
  {
    question: "How do you optimize latency in LLM inference?",
    answer:
      "Optimize TTFT: reduce prompt length (prefill time), enable chunked prefill, consider dedicated prefill instances. Optimize TPOT: model quantization (INT4 → faster decode), Flash Attention, speculative decoding (a small draft model predicts, the large model verifies — 2-4× TPOT improvement), reduce tensor parallelism if not memory-constrained. Hardware: H100 to H200 → higher bandwidth → better decode speed. Network: gRPC vs REST (gRPC has lower overhead). Caching: prefix cache → TTFT of 0 for a cached prefix.",
  },
  {
    question: "What parallelism strategies are used in distributed LLM training?",
    answer:
      "Data Parallelism (DDP/FSDP): the same model, different data batches on different GPUs. All-reduce gradients every step. The simplest approach. Tensor Parallelism: individual layer operations split across GPUs — matrix multiply divided. NVLink bandwidth is critical. Pipeline Parallelism: model layers split vertically — GPU 1 layers 1-32, GPU 2 layers 33-64. Micro-batch pipelining. Expert Parallelism: in MoE models, different experts on different GPUs. PyTorch FSDP: parameters + gradients + optimizer states sharded. DeepSpeed ZeRO: similar sharding with additional CPU offload. Megatron-LM: combines tensor + pipeline + data parallelism. Large models: 3D parallelism — all combined.",
  },
  {
    question: "What is Context Engineering and how does it impact LLM performance?",
    answer:
      "Context Engineering is a more structured discipline than prompt engineering. It's not just about writing instructions — it's strategically deciding what goes into the model's context window, what doesn't, in what order, and why. Key elements: system prompt design (defining the model's base behavior), conversation history management (what to keep, what to truncate), retrieved context placement (where to insert RAG chunks), tool results formatting (structured or natural), and context compression (reducing long contexts into meaningful summaries). The Lost in the Middle problem: models retrieve middle-of-context information worse. Solution: put important information at the beginning or end. Infrastructure impact: every context decision affects token count — directly affecting cost and latency.",
  },
];
