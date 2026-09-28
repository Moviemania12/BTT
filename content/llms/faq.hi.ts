import type { FaqItem } from "@/lib/schemas";

export const llmFaq: FaqItem[] = [
  {
    question: "LLM ka context window kitna important hai infrastructure ke liye?",
    answer:
      "Context window length directly GPU memory ke saath related hai. Zyada context = zyada KV cache = more GPU HBM. 70B model at FP16: model weights 140GB + KV cache at 128K context ~43GB per request = ~183GB per concurrent long-context request. 3× H100 minimum. Short-context (2-4K) workloads: same model much lower memory — zyada concurrent requests. Infrastructure planning: know your typical context length distribution. 90th percentile context length use karo GPU sizing ke liye, not maximum theoretical. Context window selection should balance capability aur infrastructure cost.",
  },
  {
    question: "Self-hosted LLMs aur cloud API mein kab choose karein?",
    answer:
      "Cloud API: fast start, no GPU expertise, automatic updates, managed compliance. On-premises: data sovereignty (RBI, HIPAA), high volume economics, customization (fine-tuning), offline operation, no rate limits. Decision framework: sensitivity check karo pehle (can data leave org?). Agar haan, cloud API experiment karo. Phir volume × cost per token calculate karo at 12-month scale. Agar >Rs. 2-3 crore/year on APIs: on-premises TCO analyze karo. Typically: hybrid — proprietary API for complex tasks, self-hosted for high-volume routine tasks.",
  },
  {
    question: "Open source LLMs commercial use ke liye safe hain?",
    answer:
      "Depends on license. Llama 3: Llama 3 Community License — commercial use allowed, some restrictions (no competing AI services). Mistral 7B, Gemma 2, Qwen 2.5, Falcon: Apache 2.0 — fully open, commercial use unrestricted. Legal review mandatory for production deployment. IP indemnification: closed APIs (OpenAI Enterprise, Anthropic Enterprise) offer this — open source models mein nahi. Training data copyright: ongoing litigation risk for all large models (open aur closed). Always review license terms before production deployment.",
  },
  {
    question: "LLM fine-tuning ke liye minimum infrastructure kya chahiye?",
    answer:
      "QLoRA (most efficient): single NVIDIA A100 80GB ya H100 80GB pe 70B model fine-tune karna possible. 7B model: single A10G (24GB) pe. Dataset: 1,000-100,000 instruction pairs typically. Training time: 7B model, 10K examples, single A100 → few hours. Software: Hugging Face TRL library, PEFT library, bitsandbytes quantization. For production-quality fine-tuning: 4-8× A100/H100, curated high-quality data, proper evaluation framework. QLoRA ne fine-tuning democratize kar diya — organizations without hyperscale budgets ke liye bhi feasible.",
  },
  {
    question: "Production mein LLM costs control kaise karein?",
    answer:
      "Five-layer approach: (1) Model routing — simple queries cheap model (7B), complex expensive (70B). 50-70% savings. (2) Prefix caching — shared system prompts ek baar compute. 60-80% savings on prefix tokens. (3) Quantization — INT4 self-hosted models → 4× more throughput per GPU. (4) Output length control — explicit length instructions, max_tokens set karo. (5) Semantic caching — similar queries cached response. Combined: 60-80% total cost reduction vs naive deployment. Monitor cost per request per feature to identify optimization opportunities.",
  },
  {
    question: "India mein LLM deploy karne ke specific compliance considerations kya hain?",
    answer:
      "DPDP Act 2023: personal data processing consent aur purpose limitation. Patient data (healthcare): keep on-premises, de-identify before LLM. Financial data (banking, NBFC): RBI guidelines on data localization, explainability for credit decisions. Government projects: NIC/MeghRaj cloud preference, data residency mandatory. GDPR applicability: agar European users serve kar rahe ho. Practical: PII stripping pipeline before any LLM call. Audit logs for every inference (data retention as per sector). Preference for on-premises deployment in regulated sectors. Legal review for each use case.",
  },
  {
    question: "LLM hallucinations completely eliminate karna possible hai?",
    answer:
      "No. Hallucination ek fundamental property hai how LLMs work — next token prediction doesn't inherently encode factual accuracy. Mitigation stack: RAG grounding (most effective for factual tasks), citation requirements, self-consistency, confidence estimation, chain-of-thought, RLHF with factuality rewards, output verification pipeline. Production target: 'acceptable hallucination rate' define karo use-case ke liye. Medical diagnosis: near-zero tolerance. Creative writing: acceptable. Customer service FAQ: low tolerance. Build evaluation framework, measure baseline, track improvement.",
  },
  {
    question: "Transformer architecture mein attention mechanism kyun important hai?",
    answer:
      "Self-attention allow karta hai har token ko sequence mein kisi bhi doosre token se directly relate karne ke liye — distance irrelevant. RNN ka problem: long-range dependencies mein gradient vanishes over many steps. Attention: direct connection. Multi-head attention: multiple types of relationships simultaneously capture karta hai. Parallelizable training: unlike RNNs, all attention operations simultaneously compute ho sakte hain — GPU efficiency maximized. Yeh woh reason hai ki Transformers GPU clusters pe efficiently scale karte hain.",
  },
  {
    question: "KV cache kya hai aur production mein kyun critical hai?",
    answer:
      "Autoregressive generation mein, token N generate karne ke liye sab N-1 previous tokens process karne padte hain. Without KV cache: O(n²) total compute. With KV cache: prefill phase mein sab input tokens process karo, Key aur Value tensors GPU HBM mein store karo. Decode phase mein: sirf new token ka Query compute karo, cached K aur V se attend karo. O(1) per step. 10-50× faster generation. Trade-off: memory cost grows linearly with context length aur batch size. PagedAttention (vLLM) KV cache ko virtual memory concepts se manage karta hai — fragmentation eliminate karo, throughput maximize karo.",
  },
  {
    question: "RLHF aur DPO mein kya difference hai aur kab kaunsa choose karein?",
    answer:
      "RLHF: SFT model → reward model train on human preferences → PPO/alternative optimization. Complex multi-stage process. Infrastructure: multiple models simultaneously, expensive. DPO: paired preferred/rejected responses se directly optimize. No separate reward model. Single training phase. More stable. Lower infrastructure requirements. Quality: DPO RLHF ke comparable ya better on many benchmarks. Choose RLHF: nuanced reward modeling required, large human preference dataset available. Choose DPO: simpler pipeline preferred, limited resources, faster iteration needed. ORPO aur IPO further simplify alignment without explicit negative examples in some formulations.",
  },
  {
    question: "70B model production mein deploy karne ke liye infrastructure planning kaise karein?",
    answer:
      "Step 1: precision decide karo. FP16 = 140GB, INT8 = 70GB, INT4 = 35GB. Step 2: KV cache estimate. Expected context length × batch size × per-token KV cache. Llama 3 70B at 4096 context, batch 32: ~20GB. Step 3: Total GPU memory = weights + KV cache + 20% buffer. FP16: ~185GB → 3× H100 80GB. INT4: ~63GB → 1× H100 80GB (with some KV headroom). Step 4: vLLM with PagedAttention. Step 5: Tensor parallelism if multi-GPU. NVLink within node. Step 6: Load balancing + auto-scaling. K8s HPA on GPU utilization. Step 7: Monitoring — DCGM, vLLM metrics, LangFuse for LLM traces.",
  },
  {
    question: "Mixture of Experts architecture ka infrastructure pe kya impact hai?",
    answer:
      "MoE: N expert FFN networks, router har token ke liye top-K select karta hai (typically K=2). Mixtral 8×7B — 47B total parameters, ~13B active per token. Quality: approaches 70B dense. Compute: similar to 13B. Memory: 47B load karne padte hain (94GB FP16). Expert parallelism: different GPUs par different experts. Load balancing: router uniform distribution ensure karna padta hai (dead expert problem). Best for high-throughput serving, not low-latency single-request scenarios. DeepSeek-V3 aur similar large MoE models modern frontier capabilities demonstrate karte hain.",
  },
  {
    question: "LLM inference mein latency optimize kaise karein?",
    answer:
      "TTFT optimize karo: prompt length reduce karo (prefill time), chunked prefill enable karo, dedicated prefill instances consider karo. TPOT optimize karo: model quantization (INT4 → faster decode), Flash Attention, speculative decoding (small draft model predicts, large model verifies — 2-4× TPOT improvement), tensor parallelism reduce karo if not memory-constrained. Hardware: H100 se H200 → higher bandwidth → better decode speed. Network: gRPC vs REST (gRPC lower overhead). Caching: prefix cache → TTFT 0 for cached prefix.",
  },
  {
    question: "Distributed LLM training mein kaunse parallelism strategies use karte hain?",
    answer:
      "Data Parallelism (DDP/FSDP): same model, alag data batches on alag GPUs. All-reduce gradients every step. Simplest approach. Tensor Parallelism: individual layer operations split across GPUs — matrix multiply divided. NVLink bandwidth critical. Pipeline Parallelism: model layers vertically split — GPU 1 layers 1-32, GPU 2 layers 33-64. Micro-batch pipelining. Expert Parallelism: MoE models mein different experts on different GPUs. PyTorch FSDP: parameters + gradients + optimizer states sharded. DeepSpeed ZeRO: similar sharding with additional CPU offload. Megatron-LM: combines tensor + pipeline + data parallelism. Large models: 3D parallelism — all combined.",
  },
  {
    question: "Context Engineering kya hai aur LLM performance pe kaise impact karta hai?",
    answer:
      "Context Engineering prompt engineering se zyada structured discipline hai. Sirf instructions likhna nahi — strategically decide karna ki model ke context window mein kya jaata hai, kya nahi jaata, kis order mein, aur kyun. Key elements: system prompt design (model ka base behavior define), conversation history management (kya keep karo, kya truncate), retrieved context placement (RAG chunks kahan insert ho), tool results formatting (structured ya natural), aur context compression (long contexts ko meaningful summaries mein reduce karo). Lost in the Middle problem: models middle-of-context information worse retrieve karte hain. Solution: important information beginning ya end mein rakho. Infrastructure impact: every context decision token count affect karta hai — cost aur latency directly.",
  },
];
