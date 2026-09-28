"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { llmContent } from "@/content/llms";

import NlpEvolutionTimeline from "../svg/NlpEvolutionTimeline";
import TransformerArchitectureDiagram from "../svg/TransformerArchitectureDiagram";
import KvCacheDiagram from "../svg/KvCacheDiagram";
import LlmTrainingPipeline from "../svg/LlmTrainingPipeline";
import LlmInferencePipeline from "../svg/LlmInferencePipeline";
import MixtureOfExpertsDiagram from "../svg/MixtureOfExpertsDiagram";
import EnterpriseLlmStack from "../svg/EnterpriseLlmStack";
import DistributedTrainingDiagram from "../svg/DistributedTrainingDiagram";
import LlmClusterNetworking from "../svg/LlmClusterNetworking";

void llmContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Large Language Models (LLMs) are massive neural networks that process natural language at such scale that emergent capabilities appear within them — reasoning, coding, math, translation, summarization — that weren't explicitly trained for. "Large" isn't just an indicator of size — it's a qualitative shift where models become genuinely useful for real-world complex tasks.
        </p>
        <p style={S.p}>
          Modern generative LLMs such as GPT, Llama, Mistral, Claude and Gemma are primarily decoder-only Transformer architectures. However, Large Language Models also include encoder-only (BERT family) and encoder-decoder (T5/BART/FLAN-T5) architectures for different NLP workloads. Active model weights are loaded into GPU HBM during inference. For training, thousands of H100s for weeks to months. And for inference, they serve continuously — this is the ongoing compute demand driving the AI Infrastructure industry.
        </p>
        <Callout type="important" title="Infrastructure Scale">
          A 70B parameter model at FP16 = 140GB GPU HBM just for the weights. Training at Llama 3.1 scale: 16,000+ H100 GPUs, months of continuous compute, InfiniBand NDR fabric, petabytes of storage. This is infrastructure reality — not a future promise.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>DC Engineers:</strong> why LLM workloads demand so much power and density — and what to expect when your DC starts hosting these workloads.</li>
          <li><strong>IT/Infrastructure Engineers:</strong> GPU cluster management, storage requirements, networking topology specifically needed for LLM serving.</li>
          <li><strong>AI/MLOps Engineers:</strong> LLM training pipelines, fine-tuning strategies, production serving — complete technical picture.</li>
          <li><strong>Cloud Engineers:</strong> GPU instance selection, distributed serving architecture, managed LLM services vs self-hosted.</li>
          <li><strong>Software Engineers:</strong> integrating LLM APIs, implementing function calling, building RAG architectures.</li>
          <li><strong>CTOs and Architects:</strong> LLM infrastructure roadmap planning, build vs buy decisions, cost modeling.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>A complete internal diagram of Transformer architecture — what each component does</li>
          <li>The exact mathematical intuition of parameters, tokens, embeddings, positional encoding, self-attention</li>
          <li>Pretraining, distributed training strategies, fine-tuning, instruction tuning, RLHF, DPO — poori training pipeline</li>
          <li>LoRA, QLoRA, Mixture of Experts, quantization, distillation, speculative decoding</li>
          <li>KV cache, Flash Attention, continuous batching — the full picture of inference optimization</li>
          <li>GPU memory requirements per model size — exact numbers with reasoning</li>
          <li>vLLM, TensorRT-LLM, Triton, SGLang — production serving frameworks</li>
          <li>Enterprise LLM stack: gateway, observability, guardrails, cost optimization</li>
          <li>Open source vs closed source comparison with infrastructure implications</li>
          <li>Production troubleshooting — real failure scenarios and their resolutions</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ─────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="generative-ai" variant="inline" /> — foundation models, inference infrastructure, agents, MCP, enterprise deployment</li>
          <li><strong>Current:</strong> Large Language Models — deep technical internals, training, serving, production engineering</li>
          <li><strong>Next:</strong> <TopicLink slug="ai-gpu" variant="inline" /> — GPU architecture deep dive, Tensor Cores, HBM, PCIe, NVLink, selection guide</li>
          <li><strong>Related:</strong> <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="gpu-cluster" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ──────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          GPT-3 was released in 2020. 175 billion parameters. Public estimates suggest training costs ranged between approximately USD 4–12 million. Microsoft took an exclusive license. And initially, most researchers thought this was an impressive but ultimately academic achievement.
        </p>
        <p style={S.p}>
          Then OpenAI fine-tuned GPT-3.5 for instruction following. ChatGPT was born. It launched on November 30, 2022. And within a few weeks, the entire industry's trajectory changed.
        </p>
        <p style={S.p}>
          What actually changed was this: there's a qualitative shift at scale. GPT-2 (1.5B parameters) could write a coherent paragraph. GPT-3 (175B parameters) could debug code, write essays, perform basic reasoning — without being explicitly trained for these tasks. These are "emergent capabilities."
        </p>
        <p style={S.p}>
          For engineers, this shift carried a clear implication: LLMs are a new category of compute-intensive workloads. Traditional software applications run in RAM. Active model weights are loaded into GPU HBM during inference — across multiple servers, with continuous inference. A single 70B parameter model requires 140GB of GPU memory — just for the weights.
        </p>
      </section>

      {/* ─── NLP EVOLUTION ─────────────────────────────────────────────── */}
      <section id="nlp-evolution">
        <h2 style={S.h2}>The Evolution of NLP — Before LLMs</h2>
        <Figure caption="NLP Evolution: From rule-based systems (1950s) to statistical NLP to word embeddings to sequence models to the Transformer (2017) — foundation of all modern LLMs">
          <NlpEvolutionTimeline />
        </Figure>
        <ul style={S.ul}>
          <li><strong>1950s-1980s Rule-Based:</strong> Manually written linguistic rules. ELIZA (1966) — pattern matching. Brittle — real language infinitely varied.</li>
          <li><strong>1990s-2000s Statistical NLP:</strong> Hidden Markov Models, n-gram language models, statistical machine translation. Better than rules but ceiling clear.</li>
          <li><strong>2013 Word Embeddings:</strong> Word2Vec — words as meaningful dense vectors. "King - Man + Woman ≈ Queen." Semantic relationships automatically emerge.</li>
          <li><strong>2014-2016 Sequence Models:</strong> LSTM, GRU, encoder-decoder. Attention mechanism (Bahdanau 2015). Revolutionary but sequential computation limits GPU parallelism.</li>
          <li><strong>2017 Transformer:</strong> "Attention is All You Need." Recurrence eliminated. Pure attention. Fully parallelizable training. Direct ancestor of GPT-4, Claude, Gemini, Llama.</li>
          <li><strong>2018-2019 BERT + GPT:</strong> BERT: bidirectional encoder, masked LM. GPT: decoder-only, causal LM. Two paths diverge — encoder for understanding, decoder for generation.</li>
          <li><strong>2020-Present Scale and Emergence:</strong> GPT-3 (175B), Chinchilla, Llama, Mistral, Gemini, Claude. Scaling laws consistently hold. Emergent capabilities at scale.</li>
        </ul>
      </section>

      {/* ─── WHAT IS LLM ───────────────────────────────────────────────── */}
      <section id="what-is-llm">
        <h2 style={S.h2}>What is an LLM?</h2>
        <p style={S.p}>
          Large Language Models are neural networks that learn the underlying patterns of natural language at massive scale — billions to hundreds of billions of parameters, trained on trillions of tokens of text. "Large" indicates that model size has crossed a threshold where qualitatively different capabilities emerge.
        </p>
        <p style={S.p}>
          From an architecture perspective: modern generative LLMs such as GPT, Llama, Mistral, Claude and Gemma are primarily decoder-only Transformer architectures. However, the broader LLM family also includes encoder-only (BERT, RoBERTa — for classification and embeddings) and encoder-decoder (T5, BART, FLAN-T5 — for translation and summarization). This article primarily covers decoder-only generative LLMs since they are today's dominant use case in enterprise production.
        </p>
      </section>

      {/* ─── PARAMETERS ────────────────────────────────────────────────── */}
      <section id="parameters">
        <h2 style={S.h2}>Parameters Explained</h2>
        <p style={S.p}>
          "70 billion parameter model" — this number comes up everywhere. What does it concretely mean? Parameters are the learnable numbers that define a neural network's connections. Each weight matrix contains billions of individual floating-point numbers. The training process iteratively updates these numbers so the model makes better predictions.
        </p>
        <p style={S.p}>
          Weight matrices in a Transformer block: Attention (Q, K, V projections — 3 matrices per head, N heads), Output projection, Feed-forward (two large linear layers, typically 4× embedding dimension), Layer normalization (scale and shift parameters).
        </p>
        <Callout type="important" title="Infrastructure Math">
          A parameter at FP16 = 2 bytes. 70B parameters × 2 bytes = 140GB. Just for the model weights. In training: gradients (140GB) + Adam optimizer states (2× more = 280GB) + activations = 560GB+ total. Inference: just weights + KV cache.
        </Callout>
        <p style={S.p}>
          <strong>Parameter count and quality:</strong> More parameters ≠ always better. The Chinchilla paper (Hoffmann et al., 2022) showed that given a compute budget, a smaller model with more data often beats a larger model with less data. Parameters, training tokens, and compute budget all need to scale together — simply increasing model size isn't sufficient. Llama 2 7B — carefully trained on high-quality data — outperforms many larger models on specific tasks.
        </p>
      </section>

      {/* ─── TOKENS ────────────────────────────────────────────────────── */}
      <section id="tokens">
        <h2 style={S.h2}>Tokens and Tokenization</h2>
        <p style={S.p}>
          LLMs process text as tokens — not raw characters or whole words. Byte Pair Encoding (BPE) is the most common tokenization algorithm. Training process: start with individual characters, then iteratively merge the most frequent character pairs into single tokens.
        </p>
        <ul style={S.ul}>
          <li><strong>Vocabulary size:</strong> Modern LLMs: 32K-128K vocabulary size. Llama 3: 128K. GPT-4: ~100K. Larger vocabulary = fewer tokens per sequence (efficient), larger embedding table (more memory).</li>
          <li><strong>Tokenization and infrastructure:</strong> Context window length is measured in tokens. KV cache size grows with tokens. API pricing is per token. Throughput is in tokens/second. Hindi/Devanagari text: typically 2-4× more tokens per word than English — important for cost planning of Indian language applications.</li>
          <li><strong>Special tokens:</strong> &lt;BOS&gt; (beginning), &lt;EOS&gt; (end), &lt;PAD&gt; (padding for batching), instruction format tokens. Correct special tokens = correct output. Wrong special tokens = garbage output in production.</li>
        </ul>
      </section>

      {/* ─── EMBEDDINGS ────────────────────────────────────────────────── */}
      <section id="embeddings">
        <h2 style={S.h2}>Embeddings</h2>
        <p style={S.p}>
          After tokenization, each token ID is converted into a high-dimensional dense vector. Embeddings encode contextual numerical representations learned during training — not just static lookup values but learned representations that capture semantic relationships, usage patterns, and linguistic properties.
        </p>
        <p style={S.p}>
          <strong>Embedding dimension:</strong> GPT-3: 12,288 dimensions. Llama 3 70B: 8,192. Smaller models (7B): 4,096. Dimension size is the model's "width" — more dimensions means more representational capacity per token.
        </p>
        <p style={S.p}>
          <strong>Memory implications:</strong> Embedding table: 128K tokens × 8192 dimensions × 2 bytes (FP16) = 2GB. Just for the embedding table. A small fraction of total model size but always in GPU HBM during inference.
        </p>
      </section>

      {/* ─── POSITIONAL ENCODING ───────────────────────────────────────── */}
      <section id="positional-encoding">
        <h2 style={S.h2}>Positional Encoding</h2>
        <p style={S.p}>
          Self-attention is inherently position-agnostic — it doesn't know which token came first. Positional encoding injects position information.
        </p>
        <ul style={S.ul}>
          <li><strong>Sinusoidal (original Transformer):</strong> Fixed mathematical functions (sine/cosine of different frequencies). No learned parameters. Generalizes to longer sequences than seen in training.</li>
          <li><strong>Learned absolute positions:</strong> Trainable position embeddings. Simple but bound by max sequence length. BERT uses this.</li>
          <li><strong>RoPE (Rotary Positional Embeddings):</strong> The standard for modern LLMs (Llama, Mistral, Gemma, PaLM 2). Encodes relative position through rotation matrices. Generalizes well to longer contexts. YaRN extension: extend the context window without full retraining.</li>
          <li><strong>ALiBi (Attention with Linear Biases):</strong> Add a linear bias to attention scores — recent tokens naturally get more attention. Used by MPT models.</li>
        </ul>
      </section>

      {/* ─── TRANSFORMER ARCH ──────────────────────────────────────────── */}
      <section id="transformer-arch">
        <h2 style={S.h2}>Transformer Architecture — Complete Internals</h2>
        <p style={S.p}>
          Modern LLMs are based on Transformer architecture. Everything else builds on this foundation. A Transformer block is made up of two main parts: Multi-Head Self-Attention and a Feed-Forward Network. Residual Connections and Layer Normalization surround both. This block is stacked N times. GPT-3: 96 blocks. Llama 3 70B: 80 blocks.
        </p>
        <Figure caption="Complete Transformer Block: Input → RMSNorm → Multi-Head GQA Attention (Flash Attention + KV Cache) → Residual → RMSNorm → FFN (SwiGLU) → Residual → Output — stacked N times">
          <TransformerArchitectureDiagram />
        </Figure>
        <p style={S.p}>
          Input processing: Raw text → Tokenizer → Token IDs → Embedding Lookup → Positional Encoding (RoPE applied to Q and K within attention) → First Transformer Block Input. This pipeline looks simple but every step is critical.
        </p>
      </section>

      {/* ─── SELF-ATTENTION ────────────────────────────────────────────── */}
      <section id="self-attention">
        <h2 style={S.h2}>Self-Attention — The Core Mechanism</h2>
        <p style={S.p}>
          Each token produces three vectors from its embedding: Query (Q — "What am I looking for?"), Key (K — "How can I be found?"), Value (V — "What is my actual information?").
        </p>
        <p style={S.p}>
          Attention score: <code style={S.code}>Q × Kᵀ / √d_k → softmax → weighted sum of V</code>. Mathematical insight: this is a differentiable database retrieval. Search the keys with the query, retrieve matching values.
        </p>
        <p style={S.p}>
          <strong>Causal masking:</strong> Decoder-only LLMs use causal attention — each token can only attend to the tokens before it. Upper triangular mask: future positions set to -infinity before softmax.
        </p>
        <p style={S.p}>
          <strong>Attention complexity:</strong> Standard attention computation is approximately quadratic O(n²) time in sequence length n. 1K tokens: manageable. 128K tokens: impractical without optimization. Flash Attention reduces memory complexity by tiling computation — the full attention matrix never materializes in HBM. Attention computation itself remains approximately quadratic, but memory footprint reduces dramatically.
        </p>
        <p style={S.p}>
          Flash Attention is standard in most modern production training and inference frameworks. Flash Attention 2 (2023) and Flash Attention 3 (2024) brought further improvements.
        </p>
      </section>

      {/* ─── MULTI-HEAD ATTENTION ──────────────────────────────────────── */}
      <section id="multi-head-attention">
        <h2 style={S.h2}>Multi-Head Attention</h2>
        <p style={S.p}>
          A single attention head captures one type of relationship. Multi-head attention: multiple attention heads simultaneously, each capturing different aspects. H heads run in parallel. Each head: Q, K, V projections of dimension d_model/H. Concatenate all heads' outputs → a final linear projection.
        </p>
        <p style={S.p}>
          Different heads learn different linguistic phenomena — syntactic dependencies, semantic relationships, coreference. This specialization emerges automatically during training.
        </p>
        <ul style={S.ul}>
          <li><strong>Head count per model size:</strong> Llama 3 8B: 32 attention heads, 8 KV heads (GQA). Llama 3 70B: 64 attention heads, 8 KV heads (GQA).</li>
          <li><strong>GQA (Grouped-Query Attention):</strong> N query heads, M key heads, M value heads (M &lt; N, typically 8). Multiple query heads share the same K and V. The KV cache is dramatically smaller. Same quality, faster inference. The standard choice for Llama 2/3, Mistral, Gemma.</li>
          <li><strong>MQA (Multi-Query Attention):</strong> An extreme version — a single K and V shared by all query heads. Even smaller KV cache, a slight quality trade-off.</li>
        </ul>
      </section>

      {/* ─── FFN ───────────────────────────────────────────────────────── */}
      <section id="ffn">
        <h2 style={S.h2}>Feed-Forward Networks</h2>
        <p style={S.p}>
          A position-wise FFN comes after every attention sublayer: <code style={S.code}>FFN(x) = Linear₂(Activation(Linear₁(x)))</code>
        </p>
        <ul style={S.ul}>
          <li><strong>Dimensions:</strong> Hidden dimension typically 4× embedding dimension. Llama 3 70B: 8192 dim → 28,672 FFN hidden dim.</li>
          <li><strong>Activation:</strong> Modern LLMs: SwiGLU (PaLM, Llama, Mistral) — better performance but three matrices instead of two. GELU (GPT-style). ReLU (original Transformer).</li>
          <li><strong>Knowledge storage:</strong> Research suggests FFN sublayers store factual knowledge. Knowledge editing techniques often target FFN weights.</li>
          <li><strong>Computational cost:</strong> FFN operations typically ~2/3 of total compute in a Transformer block. Large hidden dimension = GPU compute dominant here.</li>
        </ul>
      </section>

      {/* ─── RESIDUAL CONNECTIONS ──────────────────────────────────────── */}
      <section id="residual-connections">
        <h2 style={S.h2}>Residual Connections</h2>
        <p style={S.p}>
          Simple but critical. Add each sublayer's output to its input: <code style={S.code}>Output = LayerNorm(x + Sublayer(x))</code>
        </p>
        <p style={S.p}>
          Protects against vanishing gradients in very deep networks. Gradients can flow directly through skip connections. ResNets demonstrated this in computer vision (2015). Transformers adopted it.
        </p>
        <p style={S.p}>
          <strong>Pre-norm vs Post-norm:</strong> Original Transformer: post-norm. Modern LLMs (Llama, Mistral, PaLM): pre-norm (LayerNorm before sublayer). Pre-norm: training stability better, especially at large scale.
        </p>
      </section>

      {/* ─── LAYER NORMALIZATION ───────────────────────────────────────── */}
      <section id="layer-normalization">
        <h2 style={S.h2}>Layer Normalization</h2>
        <p style={S.p}>
          Stabilizing training is mandatory for large models. Layer Normalization normalizes activations to mean zero, variance one.
        </p>
        <p style={S.p}>
          <strong>RMSNorm:</strong> Used by LLaMA, Mistral, Gemma. Just compute the RMS (root mean square), don't subtract the mean. Slightly faster computation, same empirical performance. A small efficiency gain that matters at large scale.
        </p>
      </section>

      {/* ─── DECODER ONLY ──────────────────────────────────────────────── */}
      <section id="decoder-only">
        <h2 style={S.h2}>Decoder-Only Models — The Generative LLM Standard</h2>
        <p style={S.p}>
          GPT family, Llama, Mistral, Gemma, Command R+ — all decoder-only. Only causal (masked) self-attention. Pretrained on next token prediction. No separate encoder. Simple, homogeneous architecture — one block type at scale. Few-shot prompting naturally works — provide examples in-context.
        </p>
        <ComparisonTable
          title="Key Decoder-Only Models — Infrastructure Requirements"
          headers={["Model", "Size", "Min GPU (FP16)", "Min GPU (INT4)", "Notes"]}
          rows={[
            ["Llama 3 8B (Meta, open)", "8B", "1× A10G 24GB", "1× L4 24GB", "Fast inference, good quality for size"],
            ["Mistral 7B (open, Apache 2.0)", "7B", "1× A10G 24GB", "1× RTX 4090", "Excellent cost-performance ratio"],
            ["Llama 3 70B (Meta, open)", "70B", "2× H100 80GB", "1× H100 80GB", "High quality open model"],
            ["Llama 3.1 405B (Meta, dense)", "405B (dense)", "8× H100 80GB", "4× H100 80GB", "Dense model — largest open-source frontier"],
            ["Mixtral 8×22B (MoE)", "~141B total, ~39B active", "4× A100 80GB", "2× H100 80GB", "MoE — efficient large model"],
            ["GPT-4o / Claude 3.5 / Gemini 1.5", "Undisclosed", "Proprietary API", "Proprietary API", "Closed models, API only"],
          ]}
        />
        <Callout type="important" title="Llama 3.1 405B">
          Llama 3.1 405B is a dense model — not MoE. The largest open-source frontier dense model. Full 405B parameters active per token. Infrastructure requirement accordingly high.
        </Callout>
      </section>

      {/* ─── ENCODER ONLY ──────────────────────────────────────────────── */}
      <section id="encoder-only">
        <h2 style={S.h2}>Encoder-Only Models</h2>
        <p style={S.p}>
          BERT, RoBERTa, DeBERTa — bidirectional encoders. Sees full input simultaneously. Excellent for: text classification, NER, embedding generation. Cannot generate text in standard form.
        </p>
        <p style={S.p}>
          <strong>Still relevant in 2024-25:</strong> Embedding models (for RAG, semantic search) — E5, BGE, GTE — encoder-based. Cross-encoder re-rankers. Classification tasks — encoder fine-tuned on task-specific data. Much smaller models than decoder LLMs — efficient for specific tasks. CPU inference often sufficient for embedding generation.
        </p>
      </section>

      {/* ─── ENCODER-DECODER ───────────────────────────────────────────── */}
      <section id="encoder-decoder">
        <h2 style={S.h2}>Encoder-Decoder Models</h2>
        <p style={S.p}>
          T5, BART, mT5, FLAN-T5 — encoder processes full input, decoder generates output with cross-attention to encoder. Best for: translation, summarization, structured input→output transformations. NLLB (Meta): 200-language translation model. FLAN-T5: instruction-tuned variant of T5.
        </p>
        <p style={S.p}>
          A relative decline in the LLM era but still relevant: structured task performance is often better than an equivalent decoder-only model for the same compute, and typically a smaller memory footprint for specialized tasks.
        </p>
      </section>

      {/* ─── CONTEXT WINDOW ────────────────────────────────────────────── */}
      <section id="context-window">
        <h2 style={S.h2}>Context Window — Engineering Deep Dive</h2>
        <ComparisonTable
          headers={["Model", "Context Window", "What Fits", "KV Cache Impact"]}
          rows={[
            ["GPT-3 (2020)", "4,096 tokens", "A few pages", "Minimal"],
            ["GPT-4 Turbo", "128K tokens", "A full book", "Significant"],
            ["Claude 3 (2024)", "200K tokens", "Entire codebase", "Large"],
            ["Gemini 1.5 Pro", "Up to 2M tokens (version-dependent)", "Hours of transcripts", "Extreme — large HBM mandatory"],
            ["Llama 3.1 (2024)", "128K tokens", "Full book + history", "Significant"],
          ]}
        />
        <Callout type="maintenance" title="Gemini Context Window">
          Gemini's supported context window depends on model version and deployment. Different Gemini variants (Flash, Pro, Ultra) and deployment configurations (AI Studio, Vertex AI) have different limits. Always check current documentation.
        </Callout>
        <p style={S.p}>
          <strong>KV cache size at long context — exact calculation:</strong> KV cache per token per layer: 2 × (d_head × n_kv_heads) × 2 bytes (FP16). Llama 3 70B: 80 layers × 8 KV heads × 128 head_dim × 2 × 2 bytes = 327,680 bytes per token. At 128K context: ~42.9GB per request. Plus model weights (140GB): total 183GB for one request at full context. Need 3× H100 SXM5 (240GB combined) minimum.
        </p>
      </section>

      {/* ─── KV CACHE ──────────────────────────────────────────────────── */}
      <section id="kv-cache">
        <h2 style={S.h2}>KV Cache — The Critical Inference Optimization</h2>
        <Figure caption="KV Cache: Prefill phase processes all input tokens in parallel and fills cache. Decode phase reuses cached K and V tensors — O(1) per step vs O(n²) without cache. PagedAttention manages cache like OS virtual memory.">
          <KvCacheDiagram />
        </Figure>
        <p style={S.p}>
          <strong>Without KV cache:</strong> Generating token N requires a full forward pass through all previous N-1 tokens. O(n²) total compute. Catastrophically slow.
        </p>
        <p style={S.p}>
          <strong>With KV cache:</strong> Prefill: process all input tokens simultaneously (parallelizable). Store K and V tensors in GPU HBM. Decode: compute only the new token's Q, attend to cached K/V. O(1) per step. 10-50× faster generation.
        </p>
        <ul style={S.ul}>
          <li><strong>PagedAttention (vLLM):</strong> Manage the KV cache using OS virtual memory concepts. Fixed-size pages, non-contiguous GPU memory, eliminate fragmentation, efficiently handle dynamic sequence lengths. 2-5× throughput vs naive.</li>
          <li><strong>Prefix caching:</strong> Compute the KV cache for a shared prefix (system prompt, few-shot examples) once, reuse for multiple requests. Anthropic, Google cloud APIs support this. Significant savings for long system prompts.</li>
          <li><strong>KV cache quantization:</strong> INT8 KV cache → 50% memory reduction. Quality: negligible impact for most tasks.</li>
        </ul>
      </section>

      {/* ─── SCALING LAWS ──────────────────────────────────────────────── */}
      <section id="scaling-laws">
        <h2 style={S.h2}>Scaling Laws</h2>
        <p style={S.p}>
          The Chinchilla paper (Hoffmann et al., 2022) provided a fundamental insight: given a fixed compute budget, optimal performance is achieved when parameters and training tokens scale proportionally — simply increasing model size isn't sufficient. "Compute-optimal" training: model size and data size carry roughly equal importance.
        </p>
        <p style={S.p}>
          Practical implication: parameters, training tokens, and compute budget should all scale together. Training a 70B model compute-optimally requires ~1.4 trillion tokens. Llama 3 pushed this further — 15 trillion tokens on a 70B model — demonstrating the benefits of data scaling. Infrastructure impact: more training data means more storage, more preprocessing compute, longer training runs.
        </p>
        <p style={S.p}>
          <strong>Emergent capabilities:</strong> Certain abilities suddenly appear after a certain scale — few-shot learning, chain-of-thought reasoning, code generation. These are non-linear transitions. It wasn't predictable that they would emerge at that specific scale. This aspect makes LLM scaling particularly interesting and drives continued investment in larger models.
        </p>
      </section>

      {/* ─── TRAINING PIPELINE ─────────────────────────────────────────── */}
      <section id="training-pipeline">
        <h2 style={S.h2}>Training Pipeline — Complete Engineering View</h2>
        <Figure caption="LLM Training Pipeline: Data Collection → Pretraining (GPU cluster) → SFT/Instruction Tuning → Alignment (RLHF/DPO) → Evaluation → Serving — with AI infrastructure layer below">
          <LlmTrainingPipeline />
        </Figure>

        <section id="pretraining">
          <h3 style={S.h3}>Pretraining</h3>
          <p style={S.p}>
            Building the foundation model — learning knowledge and capabilities from raw text. Data: Common Crawl, books, Wikipedia, academic papers, code (GitHub), multilingual text. Deduplication, quality filtering, PII scrubbing, tokenization, shuffling.
          </p>
          <p style={S.p}>
            Training objective: next token prediction. Cross-entropy loss over vocabulary. Adam/AdamW optimizer. Learning rate warmup + cosine decay. Gradient clipping (max_norm = 1.0). Llama 3: 15 trillion tokens on 16,000+ H100s.
          </p>
          <p style={S.p}>
            <strong>Training failures at scale:</strong> Loss spike → rollback to previous checkpoint. GPU failure → node replace, restart. NCCL timeout → network issue diagnose. NaN loss → learning rate reduce, gradient clipping check. 24/7 monitoring team mandatory at this scale.
          </p>
        </section>

        <section id="distributed-training">
          <h3 style={S.h3}>Distributed Training Strategies</h3>
          <Figure caption="Distributed Training: Data Parallelism (DDP/FSDP), Tensor Parallelism (layer split), Pipeline Parallelism (stage split), Expert Parallelism (MoE) — combined as 3D Parallelism for frontier models">
            <DistributedTrainingDiagram />
          </Figure>
          <ul style={S.ul}>
            <li><strong>Data Parallelism (DDP/FSDP):</strong> The same model, different data batches on different GPUs. All-reduce gradients every step via NCCL. The simplest approach. The model must fit on a single GPU. PyTorch DDP is standard. PyTorch FSDP: parameters + gradients + optimizer states all sharded across GPUs — an effective memory reduction.</li>
            <li><strong>Tensor Parallelism:</strong> Individual layer operations split across GPUs — matrix multiply divided, different GPUs compute different portions. NVLink bandwidth is critical. Megatron-LM implements this efficiently. Best within a DGX/HGX node (NVLink available).</li>
            <li><strong>Pipeline Parallelism:</strong> Model layers split vertically into stages — GPU 1 layers 1-32, GPU 2 layers 33-64. Micro-batch pipelining reduces pipeline bubbles. PipeDream, Megatron-LM implement this.</li>
            <li><strong>Expert Parallelism:</strong> In MoE models, different experts on different GPUs. The router dispatches tokens — InfiniBand handles inter-node expert routing. Load balancing is critical.</li>
            <li><strong>3D Parallelism:</strong> Frontier models: data + tensor + pipeline combined. Example: 16,000 H100s → 8 tensor parallel × 64 pipeline × 31 data parallel groups. Megatron-LM, DeepSpeed and PyTorch FSDP coordinate this.</li>
            <li><strong>Enterprise frameworks:</strong> PyTorch FSDP (native, widely used), DeepSpeed (ZeRO optimizer, CPU offload, pipeline parallelism), Megatron-LM (NVIDIA's battle-tested 3D parallel framework for largest models).</li>
          </ul>
        </section>

        <section id="fine-tuning">
          <h3 style={S.h3}>Fine-Tuning</h3>
          <p style={S.p}>
            Adapting a pretrained base model for specific use cases. Supervised Fine-Tuning (SFT): human-written instruction-response pairs. Standard cross-entropy loss. A few thousand to a few hundred thousand examples. Hours to days on an appropriate GPU cluster.
          </p>
        </section>

        <section id="instruction-tuning">
          <h3 style={S.h3}>Instruction Tuning</h3>
          <p style={S.p}>
            Specific form of SFT. Diverse task instructions: summarize this, translate that, write code for, answer this question. Chat format: system prompt, user turn, assistant turn, repeat. Base model → instruction-following model.
          </p>
        </section>

        <section id="rlhf">
          <h3 style={S.h3}>RLHF and Alignment Techniques</h3>
          <p style={S.p}>
            ChatGPT, Claude, Gemini — all use RLHF or something similar. Step 1: SFT model as the starting point. Step 2: reward model training — human annotators select preferred responses. The reward model predicts which response is better. Step 3: PPO optimization — maximize reward without diverging from the SFT model (KL divergence constraint).
          </p>
          <p style={S.p}>
            <strong>Modern preference optimization techniques:</strong> RLHF + PPO is the traditional approach. DPO (Direct Preference Optimization): optimizes directly from preferences without a reward model — a single training phase, more stable. ORPO (Odds Ratio Preference Optimization): processes negative examples too in a single objective — no reference model needed. IPO (Identity Preference Optimization): a theoretically motivated variant of DPO that reduces overfitting. Each approach carries different trade-offs in infrastructure requirements and training stability.
          </p>
        </section>

        <section id="dpo">
          <h3 style={S.h3}>DPO</h3>
          <p style={S.p}>
            Direct Preference Optimization is a simplification of RLHF — no separate reward model, no PPO. Directly optimizes from paired preferred/rejected responses. Used in: Llama 3, Zephyr, many open-source aligned models. Lower infrastructure requirements than RLHF. A single training phase. More stable training.
          </p>
        </section>
      </section>

      {/* ─── LORA ──────────────────────────────────────────────────────── */}
      <section id="lora">
        <h2 style={S.h2}>LoRA — Low-Rank Adaptation</h2>
        <p style={S.p}>
          Mathematical insight: weight updates during fine-tuning follow a low-rank structure. <code style={S.code}>dW ≈ A × B</code> where A is (d × r) and B is (r × k) and r &lt;&lt; min(d,k). Implementation: freeze the original weight matrix W. Train only A and B (typically 0.1-1% of total parameters). Inference: W_effective = W + A×B — the adapters get merged in, no inference overhead.
        </p>
        <ul style={S.ul}>
          <li><strong>Rank r selection:</strong> r=4 (basic task adaptation), r=16 (good balance, most tasks), r=64 (complex tasks), r=256 (near full fine-tuning).</li>
          <li><strong>Production serving with LoRA:</strong> Serve multiple LoRA adapters on a single base model. Different adapters for different customers/departments. Memory: base model once + each adapter (MBs). The LoRAX framework handles this efficiently.</li>
        </ul>
      </section>

      {/* ─── QLORA ─────────────────────────────────────────────────────── */}
      <section id="qlora">
        <h2 style={S.h2}>QLoRA — Quantized LoRA</h2>
        <p style={S.p}>
          Base model 4-bit NF4 (Normal Float 4) quantization. Double quantization: also quantize the quantization constants. LoRA adapters in BF16 precision. Paged Attention: manage memory spikes.
        </p>
        <p style={S.p}>
          <strong>Result:</strong> 65B model fine-tuning on a single A100 (40GB). Previously required 8 A100s. 70B model on a single H100 (80GB). QLoRA has made LLM fine-tuning accessible for every organization. Quality: slightly lower than full BF16 LoRA, negligible for most production tasks.
        </p>
      </section>

      {/* ─── MOE ───────────────────────────────────────────────────────── */}
      <section id="moe">
        <h2 style={S.h2}>Mixture of Experts (MoE)</h2>
        <Figure caption="Mixture of Experts: Router selects top-2 of 8 expert FFN networks per token — sparse activation achieves ~70B quality at ~13B active compute but requires all 47B loaded in GPU HBM">
          <MixtureOfExpertsDiagram />
        </Figure>
        <p style={S.p}>
          Traditional dense Transformer: every parameter is used for every input. MoE: sparse activation — only some parameters activate per token. N expert FFN networks. A router network (small, learned): selects the top-K experts for each token (typically K=1 or K=2). Only the selected experts compute.
        </p>
        <ComparisonTable
          headers={["Model", "Total Params", "Active Params", "Memory (FP16)", "Quality", "Compute"]}
          rows={[
            ["Mixtral 8×7B", "~47B", "~13B per token", "94GB", "~70B dense", "~13B dense"],
            ["Mixtral 8×22B", "~141B", "~39B per token", "282GB", ">70B dense", "~39B dense"],
            ["DeepSeek-V3", "671B total", "37B per token", "~1.3TB FP16", "Frontier", "~37B compute"],
            ["Dense 70B (Llama 3)", "70B", "70B (all active)", "140GB", "Baseline", "70B compute"],
          ]}
        />
        <p style={S.p}>
          <strong>Infrastructure implications:</strong> Expert parallelism: different experts on different GPUs. Load balancing: the router has to ensure a uniform distribution (the dead expert problem — auxiliary loss). MoE: memory intensive, compute efficient. Best for high-throughput serving, not low-latency single-request.
        </p>
      </section>

      {/* ─── QUANTIZATION ──────────────────────────────────────────────── */}
      <section id="quantization">
        <h2 style={S.h2}>Quantization</h2>
        <ComparisonTable
          headers={["Method", "Precision", "Compression", "Quality", "Best For"]}
          rows={[
            ["FP32 (baseline)", "32-bit", "1×", "Baseline", "Training (not inference)"],
            ["FP16/BF16", "16-bit", "2×", "Same as FP32", "Standard inference"],
            ["FP8 (NVIDIA Transformer Engine)", "8-bit", "4×", "Near-FP16", "H100+ training + inference — ~2× throughput"],
            ["INT8 (GPTQ/SmoothQuant)", "8-bit", "4×", "Negligible loss", "Production inference — high throughput"],
            ["INT4 (AWQ/GPTQ)", "4-bit", "8×", "1-3% degradation", "Memory-constrained deployment"],
            ["GGUF (llama.cpp)", "Mixed 2-8 bit", "Varies", "Good at Q5+", "CPU/edge inference, local development"],
          ]}
        />
        <p style={S.p}>
          <strong>FP8 Mixed Precision Training</strong> using NVIDIA Transformer Engine is becoming standard on H100 and newer hardware. Transformer Engine dynamically determines FP8 vs FP16 per layer per step — quality comparable to FP16 training, throughput ~2× better. Activation scaling and delayed scaling algorithms ensure numerical stability.
        </p>
      </section>

      {/* ─── DISTILLATION ──────────────────────────────────────────────── */}
      <section id="distillation">
        <h2 style={S.h2}>Knowledge Distillation</h2>
        <p style={S.p}>
          Training a small student model from a large teacher model — similar capabilities, dramatically smaller. Teacher: a large, high-quality model (e.g., 70B). Student: a small model (e.g., 7B). Training: train the student on the teacher's outputs — not just labels, but soft probability distributions. The teacher's "dark knowledge" contains important information.
        </p>
        <p style={S.p}>
          <strong>Production applications:</strong> DistilBERT: 60% the size of BERT, 97% the performance. Many organizations train smaller proprietary models from GPT-4 outputs. Customer service chatbots: generate synthetic data from an expensive frontier model, train a cheaper model. Phi-4 (Microsoft): a small model distilled from high-quality synthetic data.
        </p>
      </section>

      {/* ─── SPECULATIVE DECODING ──────────────────────────────────────── */}
      <section id="speculative-decoding">
        <h2 style={S.h2}>Speculative Decoding</h2>
        <p style={S.p}>
          Improve throughput 2-4× without quality loss. Draft model (small, fast — typically 7B): speculates K tokens ahead. Target model (large — 70B): verifies all K draft tokens in one forward pass. If the draft is correct: accept all K tokens. If wrong at position i: reject from i onward, resample. Acceptance rate is typically 70-90%.
        </p>
        <p style={S.p}>
          <strong>Infrastructure:</strong> Two models simultaneously in GPU memory. Memory: small model + large model = more total. But throughput: 2-4× better. vLLM, TGI, TensorRT-LLM implement this. Llama 3 8B draft → Llama 3 70B target is a common production pairing.
        </p>
      </section>

      {/* ─── CONTEXT ENGINEERING ───────────────────────────────────────── */}
      <section id="context-engineering">
        <h2 style={S.h2}>Context Engineering</h2>
        <p style={S.p}>
          Context engineering is a more structured discipline than prompt engineering. It's not just about writing instructions — it's strategically deciding what goes into the model's context window, what doesn't, in what order, and why.
        </p>
        <ul style={S.ul}>
          <li><strong>System prompt design:</strong> The model's base behavior, persona, constraints, safety guardrails. Carefully manage token budget — the system prompt is sent with every request.</li>
          <li><strong>Conversation history management:</strong> What to keep, what to truncate. Summarization-based compression. Selective retention of key turns.</li>
          <li><strong>Retrieved context placement:</strong> Where do RAG chunks get inserted — before or after the user query? Research: content at the beginning and end of context is retrieved better than the middle.</li>
          <li><strong>Lost in the Middle problem:</strong> Models retrieve middle-of-context information worse. Solution: put important information at the beginning or end. Production implication: strategically position RAG chunks.</li>
          <li><strong>Context compression:</strong> Reduce long contexts into meaningful summaries with the LLM's help. Reduce token cost while preserving key information.</li>
          <li><strong>Infrastructure impact:</strong> Every context decision affects token count — directly affecting cost and latency. 1000 extra tokens per request × 1M requests/day = a significant cost differential.</li>
        </ul>
      </section>

      {/* ─── PROMPT PROCESSING ─────────────────────────────────────────── */}
      <section id="prompt-processing">
        <h2 style={S.h2}>Prompt Processing Pipeline</h2>
        <p style={S.p}>
          Understanding this journey from user to GPU is critical for production debugging.
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Tokenization:</strong> Raw text → BPE tokenizer → token IDs. CPU typically. Sub-millisecond.</li>
          <li><strong>Embedding lookup:</strong> Token IDs → embedding vectors. Embedding table lookup from GPU HBM. A batch of tokens simultaneously.</li>
          <li><strong>Positional encoding:</strong> Apply RoPE rotation to Q and K matrices within attention (not directly to embeddings in modern LLMs).</li>
          <li><strong>Transformer blocks (N times):</strong> RMSNorm → Multi-Head GQA Attention (with KV cache) → Residual Add → RMSNorm → FFN (SwiGLU) → Residual Add. 99% of compute here.</li>
          <li><strong>Final layer norm + LM head:</strong> Last block output → RMSNorm → Linear projection to vocabulary size → logits.</li>
          <li><strong>Sampling:</strong> Logits → probabilities via softmax → temperature scaling, top-k, top-p → token selected.</li>
          <li><strong>Detokenization:</strong> Token ID → text piece → stream to user.</li>
        </ol>
      </section>

      {/* ─── FUNCTION CALLING ──────────────────────────────────────────── */}
      <section id="function-calling">
        <h2 style={S.h2}>Function Calling and MCP</h2>
        <p style={S.p}>
          Function calling: developer defines tools (JSON Schema). Model decides which tool to call, with what arguments. Application executes tool, returns result. Model synthesizes final response.
        </p>
        <p style={S.p}>
          <strong>MCP (Model Context Protocol):</strong> Anthropic's open standard that standardizes AI ↔ tool connectivity. MCP Servers expose resources and tools through a standardized protocol (JSON-RPC 2.0). Build an MCP Server once → every compatible AI tool can use it. Enterprise benefit: eliminate per-tool, per-model integration.
        </p>
        <Callout type="best-practice" title="Tool Execution Infrastructure">
          Run tool calls in sandboxed environments. Enforce timeouts (30s typical). Complete audit logging for compliance. Retry logic — gracefully handle tool failure. Token overhead: tool definitions consume tokens (cost implications).
        </Callout>
      </section>

      {/* ─── RAG INTEGRATION ───────────────────────────────────────────── */}
      <section id="rag-integration">
        <h2 style={S.h2}>RAG Integration</h2>
        <p style={S.p}>
          RAG injects real-time, organization-specific knowledge at inference time. Basic flow: query embedding → vector database ANN search → retrieve top-K relevant chunks → augmented prompt → grounded LLM generation.
        </p>
        <ul style={S.ul}>
          <li><strong>Advanced RAG:</strong> Re-ranking (quality-score the retrieved chunks), hybrid search (vector + BM25), metadata filtering, multi-hop retrieval, contextual compression.</li>
          <li><strong>Infrastructure:</strong> Embedding model: separate inference (CPU for batch indexing, GPU for real-time). Vector database: Qdrant, Weaviate, Pinecone, pgvector. Query latency: 10-100ms ANN search.</li>
        </ul>
      </section>

      {/* ─── AI AGENTS ─────────────────────────────────────────────────── */}
      <section id="ai-agents">
        <h2 style={S.h2}>AI Agents with LLMs</h2>
        <p style={S.p}>
          Agents embed LLMs in observation → reasoning → action loops. ReAct pattern: Thought → Action → Observation → Thought → Final Answer. 5-20 LLM calls per complex task. Cost proportionally higher. Frameworks: LangChain, AutoGen (Microsoft), CrewAI, OpenAI Assistants.
        </p>
        <p style={S.p}>
          <strong>Infrastructure:</strong> State persistence (database or vector store), sandboxed execution (code execution, web browsing), loop detection (enforce max steps), human-in-the-loop for high-risk actions, cost monitoring is mandatory.
        </p>
      </section>

      {/* ─── GPU REQUIREMENTS ──────────────────────────────────────────── */}
      <section id="gpu-requirements">
        <h2 style={S.h2}>GPU Requirements — Exact Numbers</h2>

        <ComparisonTable
          title="Training Requirements"
          headers={["Task", "Model Size", "Min GPU Memory", "Recommended Setup", "Framework"]}
          rows={[
            ["Training from scratch", "7B", "~100GB total", "4-8× H100 80GB", "PyTorch FSDP / DeepSpeed"],
            ["Training from scratch", "70B", "~840GB total", "32-64× H100 80GB", "Megatron-LM + DeepSpeed"],
            ["Training from scratch", "405B (dense)", "~4.8TB total", "16,000+ H100 GPUs", "3D Parallelism"],
            ["LoRA fine-tuning", "70B", "~80-100GB", "2-4× H100 80GB", "HF TRL + PEFT"],
            ["QLoRA fine-tuning", "70B", "~40-80GB", "1-2× H100/A100 80GB", "bitsandbytes + PEFT"],
          ]}
        />

        <ComparisonTable
          title="Inference Requirements"
          headers={["Model", "FP16 Size", "INT4 Size", "Min GPU (FP16)", "Min GPU (INT4)"]}
          rows={[
            ["7B", "14 GB", "3.5 GB", "1× A10G (24GB)", "1× L4 (24GB)"],
            ["13B", "26 GB", "6.5 GB", "1× A100 40GB", "1× A10G (24GB)"],
            ["34B", "68 GB", "17 GB", "1× H100 80GB (tight)", "1× A100 40GB"],
            ["70B", "140 GB", "35 GB", "2× H100 80GB", "1× H100 80GB"],
            ["405B (dense)", "810 GB", "202 GB", "11× H100 80GB minimum", "3× H100 80GB minimum"],
          ]}
        />
      </section>

      {/* ─── MEMORY REQUIREMENTS ───────────────────────────────────────── */}
      <section id="memory-requirements">
        <h2 style={S.h2}>Memory Requirements — Detailed Planning</h2>
        <p style={S.p}>
          <strong>Memory hierarchy for LLM serving:</strong> GPU HBM (primary constraint) → CPU DRAM (larger models, slower) → NVMe SSD (checkpoint storage, model loading) → NVLink (inter-GPU transfers for tensor parallelism).
        </p>
        <ul style={S.ul}>
          <li><strong>Weight quantization:</strong> INT4 → 4× compression. Quality acceptable for most production tasks.</li>
          <li><strong>KV cache quantization:</strong> INT8 KV cache → 50% KV memory reduction.</li>
          <li><strong>Flash Attention:</strong> Activation memory O(n) vs O(n²).</li>
          <li><strong>Gradient checkpointing (training):</strong> Recompute activations vs store → memory vs compute trade-off.</li>
          <li><strong>CPU offloading:</strong> ZeRO-Infinity — optimizer states + parameters to CPU DRAM. Enables training models larger than aggregate GPU memory.</li>
        </ul>
      </section>

      {/* ─── STORAGE ───────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>Storage Requirements</h2>
        <ul style={S.ul}>
          <li><strong>Training data:</strong> 15T token dataset ≈ 30TB compressed. Pipeline: raw data (object storage) → preprocessed (parallel FS) → training (streamed). Throughput: 256 H100s minimum 50-100 GB/s sustained read required. Lustre, GPFS, Weka, VAST Data.</li>
          <li><strong>Checkpoints:</strong> 70B model: ~140GB. Frequency: every 30-60 minutes. Async checkpoint: NVMe local → background copy to object storage.</li>
          <li><strong>Model artifacts for serving:</strong> Multiple precision versions per model. Model registry: versioned storage. Practical: 500GB-5TB per model family.</li>
          <li><strong>Inference serving storage:</strong> Model loading: fast NVMe preferred. Cold start: seconds to minutes. Auto-scaling: model loading time = cold start latency.</li>
        </ul>
      </section>

      {/* ─── NETWORKING ────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>Networking Requirements</h2>
        <Figure caption="LLM Cluster Networking: Training fabric uses InfiniBand NDR 400G (latency + bandwidth critical for gradient sync) — Serving fabric uses 100-400GbE (request routing only, NVLink for tensor-parallel intra-node)">
          <LlmClusterNetworking />
        </Figure>
        <p style={S.p}>
          <strong>Training:</strong> InfiniBand NDR (400Gbps) standard. Non-blocking fat-tree topology. NCCL collective communications. Any bottleneck → GPUs stall. Why InfiniBand over Ethernet: sub-microsecond latency, native RDMA, hardware flow control, NCCL natively optimized.
        </p>
        <p style={S.p}>
          <strong>Inference:</strong> Standard 25-100GbE sufficient for serving. Exception: tensor parallelism for large models requires inter-GPU communication — NVLink within node preferred. Streaming responses: long-lived HTTP connections (SSE or WebSocket). Multi-region: global load balancing → nearest region.
        </p>
      </section>

      {/* ─── GPU COMMUNICATION ─────────────────────────────────────────── */}
      <section id="gpu-communication">
        <h2 style={S.h2}>GPU Communication</h2>
        <ComparisonTable
          headers={["Interconnect", "Bandwidth", "Latency", "Use Case", "Notes"]}
          rows={[
            ["PCIe Gen 5", "64 GB/s", "~1µs", "CPU-GPU data transfer", "Bottleneck for CPU offloading"],
            ["NVLink 4.0 (H100)", "900 GB/s bidirectional", "<1µs", "GPU-GPU within node", "3× NVSwitch for all-to-all in DGX"],
            ["NVLink 5.0 (B200)", "1.8 TB/s bidirectional", "<1µs", "GPU-GPU within node (Blackwell)", "2× NVLink 4.0 bandwidth"],
            ["InfiniBand NDR", "400 Gbps/port", "<1µs", "Inter-node training fabric", "RDMA, NCCL optimized, fat-tree"],
            ["RoCE v2 (Ethernet RDMA)", "400 GbE", "1-5µs", "Alternative to IB for clusters", "More config, viable with tuning"],
          ]}
        />
        <p style={S.p}>
          <strong>All-reduce communication:</strong> Every training step. Gradients (~140GB for a 70B model) synchronized across all GPUs. Ring all-reduce or tree all-reduce via NCCL. Overlapping communication with computation (gradient compression, pipeline bubble filling) is critical for training efficiency.
        </p>
        <p style={S.p}>
          <strong>NVSwitch:</strong> In a DGX/HGX H100, 3 NVSwitch chips connect all 8 GPUs at full NVLink bandwidth. Any GPU → any GPU at 900 GB/s — no bandwidth sharing. Critical for tensor parallelism within a node. Without NVSwitch: inter-GPU bandwidth limited to PCIe (64 GB/s) — 14× slower for tensor-parallel operations.
        </p>
      </section>

      {/* ─── AI SERVING ────────────────────────────────────────────────── */}
      <section id="ai-serving">
        <h2 style={S.h2}>AI Serving Infrastructure</h2>
        <Figure caption="LLM Inference Pipeline: Clients → AI Gateway (auth/rate limit/cache) → Load Balancer → vLLM Cluster (PagedAttention, continuous batching) → Monitoring (DCGM, LangFuse)">
          <LlmInferencePipeline />
        </Figure>

        <section id="vllm">
          <h3 style={S.h3}>vLLM</h3>
          <p style={S.p}>
            Open-source. PagedAttention: KV cache virtual memory management. Continuous batching: new requests join as tokens complete. OpenAI-compatible API. High throughput. Key parameters: <code style={S.code}>--tensor-parallel-size</code>, <code style={S.code}>--max-model-len</code>, <code style={S.code}>--gpu-memory-utilization</code>, <code style={S.code}>--enable-prefix-caching</code>, <code style={S.code}>--quantization</code>. Best for: self-hosted production LLM serving, wide model support.
          </p>
        </section>

        <section id="tensorrt-llm">
          <h3 style={S.h3}>TensorRT-LLM</h3>
          <p style={S.p}>
            NVIDIA's optimized LLM inference library. FP8 quantization support. Kernel fusion. Hardware-specific optimization. Build process: model → TensorRT-LLM compiled engine. Engine pre-optimizes for specific GPU + model + precision. Not as flexible as vLLM but maximum throughput on NVIDIA hardware. Enterprise standard for NVIDIA-only deployments.
          </p>
        </section>

        <section id="triton">
          <h3 style={S.h3}>Triton Inference Server</h3>
          <p style={S.p}>
            Multi-framework serving: PyTorch, TF, ONNX, TensorRT, TensorRT-LLM. Dynamic batching. Model ensembles. Concurrent model execution. gRPC + REST. Enterprise production standard. Works alongside TensorRT-LLM (Triton backend). Kubernetes deployment ready. Best for: multi-model enterprise serving, complex serving pipelines.
          </p>
        </section>

        <section id="sglang">
          <h3 style={S.h3}>SGLang</h3>
          <p style={S.p}>
            SGLang (Structured Generation Language) is an emerging high-performance LLM serving framework that efficiently executes complex multi-call LLM programs. RadixAttention: automatic KV cache reuse across multiple requests with shared prefixes — more aggressive prefix caching than vLLM. Native support for JSON decoding, constrained generation. Well-suited for multi-model serving and complex agentic workflows. In enterprise: useful for agentic applications and RAG pipelines where structured generation and shared context matter.
          </p>
        </section>
      </section>

      {/* ─── KUBERNETES ────────────────────────────────────────────────── */}
      <section id="kubernetes">
        <h2 style={S.h2}>Kubernetes for LLM Serving</h2>
        <ul style={S.ul}>
          <li><strong>NVIDIA GPU Operator:</strong> Automatically manage GPU drivers, CUDA toolkit, DCGM, MIG configuration. GPU resource advertisement to the K8s scheduler. Essential for any K8s-based AI cluster.</li>
          <li><strong>Gang scheduling:</strong> Distributed inference (tensor parallel) requires all GPU pods to start simultaneously. Volcano or Run:AI support gang scheduling. Critical for multi-GPU model deployment.</li>
          <li><strong>HPA (Horizontal Pod Autoscaling):</strong> Scale on GPU utilization (DCGM Prometheus metrics) or request queue depth. Target: 70-85% GPU utilization. Scale up fast, scale down slow.</li>
          <li><strong>Cold start mitigation:</strong> Model pre-loading in CPU memory. Warm pool: minimum replicas always running. Predictive scaling based on traffic patterns.</li>
        </ul>
      </section>

      {/* ─── ENTERPRISE LLM STACK ──────────────────────────────────────── */}
      <section id="enterprise-stack">
        <h2 style={S.h2}>Enterprise LLM Stack</h2>
        <Figure caption="Enterprise LLM Stack: AI Data Center Fabric → GPU Compute → Foundation Models → LLM Serving (vLLM/TRT-LLM/SGLang) → AI Gateway (LiteLLM/Kong/Envoy) → Agents + Orchestration → Business Applications">
          <EnterpriseLlmStack />
        </Figure>
      </section>

      {/* ─── AI GATEWAY ────────────────────────────────────────────────── */}
      <section id="ai-gateway">
        <h2 style={S.h2}>Enterprise AI Gateway</h2>
        <p style={S.p}>
          An Enterprise AI Gateway is a central proxy layer that manages all AI API traffic — authentication, rate limiting, caching, routing, monitoring, guardrails.
        </p>
        <ul style={S.ul}>
          <li><strong>LiteLLM:</strong> Open-source Python proxy. 100+ model providers unified API. Per-team cost tracking. Fallback routing. Widely adopted for multi-provider enterprise deployments.</li>
          <li><strong>Envoy AI Gateway:</strong> A CNCF project built on Envoy. Cloud-native, production-grade. Rate limiting, auth, observability. AI-specific extensions — streaming support, token-based rate limiting. Enterprise infrastructure teams are already familiar with Envoy.</li>
          <li><strong>Kong AI Gateway:</strong> The AI extension of Kong API Gateway. Plugin ecosystem. Enterprise support. Hybrid deployment (cloud + on-premises). A natural choice for large organizations already using Kong.</li>
          <li><strong>Core functions:</strong> Model routing (cost/quality), prompt caching (prefix + semantic), complete audit trail, cost attribution per team, guardrails, failover.</li>
        </ul>
      </section>

      {/* ─── INFERENCE SCHEDULING ──────────────────────────────────────── */}
      <section id="inference-scheduling">
        <h2 style={S.h2}>Inference Scheduling</h2>
        <p style={S.p}>
          Inference scheduling is a distinct engineering challenge in LLM serving that differs from traditional ML inference.
        </p>
        <ul style={S.ul}>
          <li><strong>Continuous batching vs static batching:</strong> Static batching: fixed batch size, wait for the batch to fill. Continuous batching (vLLM, TGI): requests dynamically join and leave the batch. GPU idle time reduces dramatically. 2-4× better throughput.</li>
          <li><strong>Prefill-Decode disaggregation:</strong> An emerging technique — separate GPU pools for prefill (compute-intensive) and decode (memory-bandwidth-bound). Prefill servers: large models, high compute. Decode servers: optimized for streaming. Different hardware is optimal for each phase.</li>
          <li><strong>Priority scheduling:</strong> High-priority requests (paid tiers, SLA-bound) preempt low-priority. Request queuing with priority. Max wait time enforcement.</li>
          <li><strong>Chunked prefill:</strong> Process large prompts in chunks — improve TTFT latency for other queued requests. vLLM supports this. Important in long-document processing scenarios.</li>
          <li><strong>Request routing:</strong> Model version routing (A/B testing). Load balancing (least-connections, GPU-utilization-based). Prefix-aware routing: similar prompts → same server for cache hits.</li>
        </ul>
      </section>

      {/* ─── ENTERPRISE SERVING METRICS ────────────────────────────────── */}
      <section id="enterprise-serving-metrics">
        <h2 style={S.h2}>Enterprise Serving Metrics</h2>
        <ComparisonTable
          headers={["Metric", "Definition", "Target (Production)", "Alert Threshold"]}
          rows={[
            ["TTFT (Time to First Token)", "Latency from request to first output token", "P95 < 2 seconds", "P99 > 5 seconds"],
            ["TPOT (Time Per Output Token)", "Average time between consecutive output tokens", "P50 < 50ms", "P95 > 200ms"],
            ["E2E Latency", "Total request time (TTFT + TPOT × tokens)", "Depends on use case", "SLA breach → alert"],
            ["Throughput (TPS)", "Output tokens per second per GPU", "Maximize for cost", "Drop > 20% baseline → investigate"],
            ["GPU Utilization", "SM utilization during inference", "70-85% target", "< 50% = underutilized, > 95% = saturated"],
            ["KV Cache Utilization", "Fraction of KV cache pages in use", "60-80% healthy", "> 95% = OOM risk"],
            ["Queue Depth", "Requests waiting for GPU", "< 5 typical", "> 20 = scale-up trigger"],
            ["Token Rejection Rate", "Requests rejected due to max length", "< 1%", "> 5% = context limit misconfigured"],
            ["Cost per Request", "Token cost × model rate", "Track trends", "Spike > 2× baseline → investigate"],
            ["Hallucination Rate", "Sampled eval — factual accuracy", "Task-specific", "Drift > 5% → model/prompt review"],
          ]}
        />
        <p style={S.p}>
          Track both TTFT and TPOT separately. TTFT indicates prefill phase quality. TPOT indicates the decode phase. Different optimization strategies target different metrics.
        </p>
      </section>

      {/* ─── MODEL LIFECYCLE ───────────────────────────────────────────── */}
      <section id="model-lifecycle">
        <h2 style={S.h2}>Model Lifecycle</h2>
        <ul style={S.ul}>
          <li><strong>Model Registry:</strong> Har model artifact versioned — weights, config, tokenizer, eval results, training data version. MLflow Model Registry (open-source), SageMaker (AWS), Vertex AI (GCP), Hugging Face Hub.</li>
          <li><strong>Model Cards:</strong> Training data description, intended use, known limitations, evaluation results, ethical considerations, bias analysis. Regulatory requirement becoming in some jurisdictions.</li>
          <li><strong>Promotion workflow:</strong> dev → staging → production. Eval gate at each stage. Human approval for production (high-stakes models).</li>
          <li><strong>A/B testing:</strong> Traffic splitting — 90% current, 10% new version. Quality metrics comparison. Automatic promotion or rollback based on predefined thresholds.</li>
          <li><strong>Rollback:</strong> Any production model instantly revert. Maintain last N versions always deployable. Rollback SLA: &lt;5 minutes for critical issues.</li>
          <li><strong>Deprecation:</strong> Gradual traffic shift to new version. Sunset old version. Maintain API compatibility through version deprecation window.</li>
          <li><strong>Shadow mode:</strong> New model receives real traffic copy, responses not shown to users. Quality comparison without user impact. Pre-deployment validation.</li>
        </ul>
      </section>

      {/* ─── MONITORING ────────────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Monitoring</h2>
        <ul style={S.ul}>
          <li><strong>Infrastructure (DCGM):</strong> GPU utilization, temperature (&gt;85°C alert), power draw, NVLink bandwidth drops, ECC correctable errors (trend monitoring), uncorrectable ECC (immediate P1).</li>
          <li><strong>LLM-specific:</strong> TTFT P50/P95/P99, TPOT, throughput (tokens/sec), queue depth, batch size distribution, KV cache utilization.</li>
          <li><strong>Quality:</strong> User feedback rates, task completion, hallucination rate on sampled outputs, safety filter trigger rate.</li>
          <li><strong>Cost:</strong> Cost per request, per user, per feature, per model. Cache hit rate × savings. Monthly trend analysis.</li>
          <li><strong>Tools:</strong> DCGM → Prometheus → Grafana (GPU), LangFuse/LangSmith/Arize Phoenix (LLM-specific), W&amp;B Weave (experiment + production), ELK (logs).</li>
        </ul>
      </section>

      {/* ─── SECURITY ──────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Security</h2>

        <h3 style={S.h3}>Model-Level Security</h3>
        <ComparisonTable
          headers={["Attack Type", "Description", "Mitigation"]}
          rows={[
            ["Prompt Injection", "Malicious instructions in user input that override the system prompt", "Input sanitization, instruction hierarchy, output monitoring, NeMo Guardrails"],
            ["Jailbreak Detection", "Creative prompts bypass safety training — roleplay, hypothetical, foreign language", "Multi-layer safety classifiers, pattern monitoring, constitutional training, rate-limit suspicious patterns"],
            ["Prompt Leakage", "User extracts system prompt via clever queries", "System prompt masking, output audit for verbatim repetition"],
            ["Model Poisoning", "Malicious examples in training or fine-tuning data", "Training data provenance tracking, automated quality checks, anomaly detection"],
            ["Training Data Poisoning", "Subtle backdoor injection in pre-training corpus", "Data source vetting, deduplication, content filtering, third-party audits"],
            ["Supply Chain Attacks", "Malicious weights via compromised model repositories", "SHA-256 hash verification, signed model artifacts, trusted sources only"],
            ["Data Exfiltration", "LLMs can memorize training data — membership inference attacks", "Differential privacy training, PII scrubbing before training, output filtering"],
            ["Model Theft", "Repeated API queries → model behavior reverse engineer", "Rate limiting, query monitoring, output watermarking, usage anomaly detection"],
          ]}
        />

        <h3 style={S.h3}>Infrastructure Security</h3>
        <ul style={S.ul}>
          <li><strong>API key management:</strong> HashiCorp Vault / AWS Secrets Manager. Never hardcode. Automatic rotation. Least privilege.</li>
          <li><strong>Network segmentation:</strong> Training cluster: no public internet. Serving cluster: only necessary ports. BMC/IPMI: completely separate network.</li>
          <li><strong>RBAC via AI Gateway:</strong> Different roles — different model access, different rate limits. Audit logging: every LLM API call logged.</li>
          <li><strong>GPU server security:</strong> BMC firmware verification. Container image signing (cosign). GPU driver integrity. Physical access controls to server rooms.</li>
        </ul>
      </section>

      {/* ─── HALLUCINATIONS ────────────────────────────────────────────── */}
      <section id="hallucinations">
        <h2 style={S.h2}>Hallucinations — Engineering Deep Dive</h2>
        <p style={S.p}>
          Hallucination: model confidently generates factually incorrect information. Not a bug — a fundamental property of how LLMs work. Next token prediction objective: maximum likelihood over training distribution. Model learns what text patterns look like — not whether statements are true.
        </p>
        <ul style={S.ul}>
          <li><strong>Hallucination taxonomy:</strong> Factual hallucination (wrong facts confidently stated), Faithfulness hallucination (summary contradicts source), Instruction hallucination (model says it did something it didn't), Entity hallucination (invents non-existent people/papers/companies).</li>
          <li><strong>Measurement:</strong> TruthfulQA benchmark. FactScore (per-sentence factual accuracy vs Wikipedia). LLM-as-judge with factuality rubric. Human evaluation (gold standard, expensive).</li>
          <li><strong>Mitigation:</strong> RAG (retrieve verified facts, ground generation), Citation requirement, Self-consistency (multiple generations, majority vote), Confidence estimation, Chain-of-thought, RLHF with factuality rewards.</li>
          <li><strong>Production monitoring:</strong> Automated FactScore on 1% of requests. Alert when hallucination rate increases. Compare model versions on hallucination benchmarks.</li>
        </ul>
      </section>

      {/* ─── ALIGNMENT AND SAFETY ──────────────────────────────────────── */}
      <section id="alignment-safety">
        <h2 style={S.h2}>Alignment and Safety</h2>
        <p style={S.p}>
          Alignment: aligning model behavior with actual human values. The language model objective (next token prediction) doesn't inherently mean helpful, honest, harmless. RLHF, DPO, ORPO, Constitutional AI — all address this problem.
        </p>
        <ul style={S.ul}>
          <li><strong>Constitutional AI (Anthropic):</strong> Define explicit principles. The model critiques its own responses against these principles. RLAIF (AI Feedback instead of Human Feedback). Scales better than pure human feedback.</li>
          <li><strong>Evaluation:</strong> BBQ (bias), TruthfulQA (hallucination), ToxiGen (toxic content), HarmBench (adversarial safety). Continuous eval on production outputs. Red teaming: dedicated adversarial testing team.</li>
          <li><strong>Guardrails:</strong> Llama Guard (Meta): open-source safety classifier. NeMo Guardrails (NVIDIA): programmable safety rules. Azure Content Safety. Custom domain-specific classifiers.</li>
          <li><strong>EU AI Act implications:</strong> GPAI models: transparency requirements. High-risk applications: human oversight, conformity assessment. India: DPDP Act 2023.</li>
        </ul>
      </section>

      {/* ─── COST OPTIMIZATION ─────────────────────────────────────────── */}
      <section id="cost-optimization">
        <h2 style={S.h2}>Cost Optimization</h2>
        <ComparisonTable
          headers={["Strategy", "Mechanism", "Typical Saving", "Implementation"]}
          rows={[
            ["Model routing/cascading", "Simple → cheap model, complex → expensive", "50-70%", "Complexity classifier + gateway routing"],
            ["Prefix caching", "Shared system prompt KV cache reuse", "60-80% on prefix tokens", "Anthropic cache_control, Google Context Caching"],
            ["Semantic caching", "Similar queries return cached response", "20-40% on repetitive tasks", "Redis + embedding similarity lookup"],
            ["Quantization (self-hosted)", "INT4 → 4× more throughput per GPU", "50-75% hardware cost", "GPTQ, AWQ, llama.cpp"],
            ["Speculative decoding", "Draft model generates, large verifies", "2-4× throughput improvement", "vLLM, TGI built-in"],
            ["Batch inference", "Non-real-time tasks batched off-peak", "40-60% vs on-demand", "Queue + Batch API (Anthropic, OpenAI)"],
            ["Output length control", "max_tokens + concise prompt instructions", "20-40%", "Explicit length instructions in system prompt"],
          ]}
        />
      </section>

      {/* ─── OPEN SOURCE LLMS ──────────────────────────────────────────── */}
      <section id="open-source-llms">
        <h2 style={S.h2}>Open Source LLMs</h2>
        <ComparisonTable
          headers={["Model", "Org", "License", "Key Strength", "Infrastructure"]}
          rows={[
            ["Llama 3 / 3.1 (8B, 70B, 405B)", "Meta", "Llama 3 Community", "Best open-source quality, large community", "All sizes, 405B dense needs 8+ H100"],
            ["Mistral 7B / Mixtral 8×7B / 8×22B", "Mistral AI", "Apache 2.0", "European languages, efficiency, MoE", "7B: 1 A10G; Mixtral: 4+ A100"],
            ["Gemma 2 (2B, 9B, 27B)", "Google", "Gemma License", "Multilingual, strong small models", "Small footprint, 2B on CPU viable"],
            ["Qwen 2.5 (0.5B-72B)", "Alibaba", "Apache 2.0", "Chinese language, coding, math", "72B: 2× H100; smaller accessible"],
            ["DeepSeek-V3 (671B MoE)", "DeepSeek", "MIT", "Frontier quality, cost-efficient training", "Very large MoE, 37B active params"],
            ["DBRX (132B MoE)", "Databricks", "Open", "Enterprise focused, Apache Spark integration", "MoE, 36B active"],
            ["Phi-4 (14B)", "Microsoft", "MIT", "Strong reasoning, distilled from large models", "Small, CPU-viable for light tasks"],
            ["OLMo (7B, 13B)", "AI2", "Apache 2.0", "Fully open including training data", "Research, transparency-focused"],
            ["IBM Granite (3B-34B)", "IBM", "Apache 2.0", "Enterprise coding, RAG, low hallucination", "Purpose-built enterprise models"],
            ["Nemotron (8B, 70B, 340B)", "NVIDIA", "Nvidia Open Model License", "NVIDIA-optimized, synthetic data focus", "NVIDIA hardware optimized"],
          ]}
        />
      </section>

      {/* ─── CLOSED SOURCE LLMS ────────────────────────────────────────── */}
      <section id="closed-source-llms">
        <h2 style={S.h2}>Closed Source LLMs</h2>
        <ComparisonTable
          headers={["Model", "Provider", "Context", "Key Strength", "Infrastructure"]}
          rows={[
            ["GPT-4o / o3 / o1", "OpenAI", "128K", "Best general capability, reasoning, vision", "API only — zero GPU required"],
            ["Claude 3.5 Sonnet / Opus", "Anthropic", "200K", "Safety, long context, instruction following", "API — Anthropic or AWS Bedrock"],
            ["Gemini 1.5 Pro / Flash", "Google", "Version-dependent", "Long context, multimodal, Search integration", "Vertex AI or AI Studio"],
            ["GPT-4 via Azure OpenAI", "Microsoft/OpenAI", "128K", "Enterprise SLA, private endpoint, compliance", "Azure — no GPU management"],
            ["Command R+ (Cohere)", "Cohere", "128K", "RAG-optimized, enterprise, grounded generation", "Cohere API or self-hosted"],
          ]}
        />
        <p style={S.p}>
          GPT-4 exact architecture has not been officially disclosed by OpenAI. Industry estimates suggest it may use a Mixture of Experts (MoE) design, but this remains unconfirmed. For infrastructure planning: treat it as API-only, no GPU requirements, per-token pricing.
        </p>
        <p style={S.p}>
          <strong>Hybrid approach:</strong> Proprietary API for complex reasoning + fine-tuned open source for high-volume routine tasks. Typical savings: 70-80% cost reduction while maintaining quality where needed.
        </p>
      </section>

      {/* ─── HOPPER AND BLACKWELL ──────────────────────────────────────── */}
      <section id="hopper-blackwell">
        <h2 style={S.h2}>Hopper and Blackwell Infrastructure</h2>
        <h3 style={S.h3}>NVIDIA H100 (Hopper) — Current Production Standard</h3>
        <ul style={S.ul}>
          <li><strong>H100 SXM5 specifications:</strong> 80GB HBM3 (3.35 TB/s bandwidth). FP8 Mixed Precision Training via Transformer Engine. 4th gen Tensor Cores. NVLink 4.0: 900 GB/s bidirectional per GPU. TDP: 700W.</li>
          <li><strong>DGX H100:</strong> 8× H100 SXM5 connected via 3× NVSwitch. 900 GB/s all-to-all GPU bandwidth. 8× ConnectX-7 NICs (3.2 Tbps aggregate IB). 2TB DDR5, 30TB NVMe. 10-11kW server power.</li>
          <li><strong>FP8 training with Transformer Engine:</strong> H100 natively supports FP8 format. NVIDIA Transformer Engine dynamically selects FP8 vs BF16 per layer — automatically manages scaling factors. Quality comparable to BF16 training. Throughput significantly higher.</li>
        </ul>
        <h3 style={S.h3}>NVIDIA Blackwell (B200, GB200) — Next Generation</h3>
        <p style={S.p}>
          Blackwell architecture compared to Hopper: higher compute throughput, higher HBM3e memory capacity, higher memory bandwidth, higher NVLink bandwidth, better inference efficiency per watt. Exact benchmark numbers vary by workload — verify actual numbers from vendor published benchmarks and MLPerf results.
        </p>
        <ul style={S.ul}>
          <li><strong>B200:</strong> 192GB HBM3e. Significantly higher bandwidth than H100. NVLink 5.0. Improved FP8 and FP4 support. Lower power per FLOP than H100.</li>
          <li><strong>GB200 NVL72:</strong> 36 Grace CPU + 72 Blackwell GPU modules. 6.9TB aggregate HBM3e. 1.8 TB/s NVLink within rack — all GPUs effectively one logical unit. 70B model inference: single NVL72 rack comfortable. No inter-node InfiniBand needed for this configuration.</li>
          <li><strong>Infrastructure implication:</strong> GB200 NVL72 dramatically simplifies large model serving topology. Previously 8+ H100 nodes with InfiniBand required for 70B; now single NVL72 rack sufficient with NVLink connectivity.</li>
        </ul>
        <h3 style={S.h3}>AMD Instinct MI300X</h3>
        <p style={S.p}>
          192GB HBM3 — memory capacity advantage over H100's 80GB. Competitive training performance for specific workloads. ROCm software stack (CUDA alternative). PyTorch ROCm support available. Ecosystem maturity still behind CUDA but improving. Best for: memory-constrained large model deployment.
        </p>
      </section>

      {/* ─── ENTERPRISE CASE STUDIES ───────────────────────────────────── */}
      <section id="enterprise-case-studies">
        <h2 style={S.h2}>Enterprise Case Studies</h2>
        <ul style={S.ul}>
          <li><strong>HDFC Bank — Credit Decision AI:</strong> Fine-tuned Llama 2 70B on internal credit data (LoRA). RAG: underwriting guidelines, RBI regulations. Output: structured credit summary, risk flags, recommendation with citations. Infrastructure: on-premises (RBI data residency), 4× NVIDIA A100 80GB servers, vLLM serving, PII stripping pipeline, audit log per inference. Results: credit review time 2-3 days → 4-6 hours. Officer capacity 3× more applications.</li>
          <li><strong>Tata Consultancy Services — Developer Platform:</strong> GitHub Copilot Enterprise for general coding. Custom internal assistant: fine-tuned CodeLlama on internal codebases, company-specific libraries. Infrastructure: hybrid — Copilot (Microsoft managed) + internal model (Azure NVIDIA GPU). AI Gateway: RBAC, cost tracking, project attribution. Results: 30-40% boilerplate code reduction, 20% faster code review.</li>
          <li><strong>Manipal Hospitals — Clinical Documentation:</strong> Whisper-based transcription + fine-tuned Llama 3 8B on medical documentation format. SOAP note generation from conversation. Infrastructure: on-premises (HIPAA-equivalent), 2× A10G per hospital cluster, edge deployment, de-identification pipeline mandatory. Results: clinician documentation 2-3 hours → 30-45 minutes.</li>
          <li><strong>Jio — Multilingual Customer Service:</strong> Multi-lingual model fine-tuned on Hindi, English, regional languages. RAG on product documentation. Intent classification → appropriate pipeline routing. Infrastructure: hybrid (fine-tuned open-source + commercial API), semantic caching (high query repetition), 8 Indian languages. Results: 65% first-contact resolution by AI.</li>
        </ul>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          headers={["Problem", "Root Cause", "Diagnosis", "Resolution"]}
          rows={[
            ["High TTFT (>5 seconds)", "Prefill too slow — long prompt or batch contention", "Monitor prefill time separately, check batch size", "Reduce prompt length, chunked prefill, dedicated prefill instances"],
            ["NaN/Inf in model outputs", "Numerical instability — quantization or ECC error", "nvidia-smi -q -d ECC, check quantization compatibility", "Check ECC status, try different quantization, verify weights integrity"],
            ["KV Cache OOM", "Too many concurrent long-context requests", "vLLM logs KV cache utilization percentage", "Reduce max_model_len, reduce concurrent limit, add GPUs, KV cache quantization"],
            ["GPU memory leak over time", "Hanging requests, KV not freed", "Memory grows continuously, eventually OOM", "Request timeout enforcement, restart serving instance, check request lifecycle"],
            ["Training job hangs post-GPU failure", "NCCL timeout waiting for failed node", "nvidia-smi on all nodes, ibping between nodes", "Checkpoint from last save, restart on healthy nodes, per-node health checks"],
            ["NCCL initialization failure", "Firewall, wrong MASTER_ADDR, IB not detected", "ibstat, NCCL_DEBUG=INFO, check NCCL_IB_DISABLE", "Verify IB device, check training network connectivity, firewall rules"],
            ["Inference throughput degrading", "KV fragmentation, memory pressure", "vLLM metrics: cache utilization, num_running", "Restart serving instance, reduce max concurrent, tune --max-num-seqs"],
            ["Inconsistent outputs (unintended)", "Temperature > 0, no seed", "Expected behavior or bug — determine first", "Temperature = 0 for deterministic, seed parameter if framework supports"],
          ]}
        />
      </section>

      {/* ─── INTERVIEW QUESTIONS ───────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Why is the attention mechanism important in Transformer architecture?</p> <p style={S.p}>Self-attention allows every token in a sequence to relate directly to any other token — distance is irrelevant. RNN's problem: gradients vanish over many steps in long-range dependencies. Attention: a direct connection. "The cat sat on the mat because it was tired" — connecting "it" to "cat" across 6 tokens. Attention handles this trivially. Multi-head attention: captures multiple types of relationships simultaneously. Parallelizable training: unlike RNNs, all attention operations can be computed simultaneously — maximizing GPU efficiency. This is the reason Transformers scale so efficiently on GPU clusters.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is the KV cache and why is it critical in production?</p> <p style={S.p}>Without KV cache: generating token N requires processing all N-1 previous tokens — O(n²) total compute. With KV cache: process all input tokens in the prefill phase, store Key and Value tensors in GPU HBM. In the decode phase: compute only the new token's Query, attend to the cached K/V. O(1) per step. 10-50× faster generation. Trade-off: memory grows linearly with context and batch size. Production implications: KV cache + model weights = total GPU memory requirement. PagedAttention (vLLM) manages the KV cache using OS virtual memory concepts — eliminating fragmentation, maximizing throughput.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is the difference between RLHF and DPO?</p> <p style={S.p}>RLHF: SFT model → train a reward model on human preferences → PPO optimization against the reward model. A complex three-stage process. Expensive infrastructure: multiple models simultaneously. DPO: optimizes directly from paired preferred/rejected responses. No separate reward model. A single training phase. More stable. Lower infrastructure. Quality: DPO is comparable to or better than RLHF on many benchmarks. Modern variants: ORPO (odds ratio, no reference model needed), IPO (theoretically motivated, reduces overfitting). Choose RLHF: nuanced reward modeling, large human preference dataset. Choose DPO/ORPO: simpler pipeline, limited resources.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: How do you plan infrastructure for deploying a 70B model in production?</p> <p style={S.p}>Step 1: decide precision. FP16 = 140GB, INT8 = 70GB, INT4 = 35GB. Step 2: estimate KV cache. 4096 context × batch 32 × per-token KV: ~20GB. Step 3: Total = weights + KV cache + 20% buffer. FP16: ~185GB → 3× H100 80GB. INT4: ~63GB → 1× H100 80GB. Step 4: vLLM with PagedAttention. Step 5: tensor parallelism if multi-GPU — NVLink within the node. Step 6: K8s HPA auto-scaling. Step 7: monitoring — DCGM, vLLM metrics, LangFuse for LLM traces.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What parallelism strategies are used in distributed LLM training?</p> <p style={S.p}>Data Parallelism (DDP/FSDP): the same model, different data batches. All-reduce gradients via NCCL. Simplest. PyTorch FSDP: params+grads+optimizer sharded. Tensor Parallelism: individual layer operations split across GPUs — NVLink bandwidth critical. Megatron-LM is standard. Pipeline Parallelism: model layers split vertically into stages, micro-batch pipelining. Expert Parallelism: in MoE models, different experts on different GPUs. 3D Parallelism: all combined at frontier scale. DeepSpeed ZeRO: memory-efficient training with CPU offload options. Infrastructure requirement: InfiniBand NDR for inter-node, NVLink for intra-node.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: How do you optimize latency in LLM inference?</p> <p style={S.p}>Optimize TTFT: reduce prompt length (prefill time), enable chunked prefill (large prompts in chunks), consider dedicated prefill instances. Optimize TPOT: model quantization (INT4 → faster decode, bandwidth-bound), Flash Attention (memory efficient), speculative decoding (a small draft model predicts, the large model verifies — 2-4× TPOT improvement), reduce tensor parallelism if not memory-constrained (inter-GPU communication overhead). Hardware: higher HBM bandwidth → better decode speed. Network: gRPC vs REST (gRPC lower overhead). Caching: prefix cache → near-zero TTFT for a cached prefix.</p>
        </div>
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["Alignment", "Aligning model behavior with human values — helpful, harmless, honest."],
            ["Autoregressive Generation", "Token-by-token text generation where each token is conditioned on previous tokens."],
            ["BF16 (Brain Float 16)", "16-bit float with FP32's exponent range — preferred for LLM training. No loss scaling needed."],
            ["BPE (Byte Pair Encoding)", "Tokenization algorithm merging frequent character sequences into subword tokens."],
            ["Causal Attention", "Masked attention — each token only attends to previous tokens. Enables autoregressive LLM generation."],
            ["Chinchilla Scaling Laws", "Parameters, training tokens, and compute budget should all scale proportionally for optimal compute efficiency."],
            ["Constitutional AI", "Anthropic's alignment approach — training a model with explicit principles to critique its own outputs."],
            ["Context Window", "The maximum tokens a model can process at one time — input + output combined."],
            ["Continuous Batching", "Dynamic batching where new requests join an in-progress batch as tokens complete."],
            ["CUDA", "NVIDIA's parallel computing platform — enables GPU general compute. Foundation of LLM training."],
            ["DGX", "NVIDIA's purpose-built AI server — 8× H100 GPUs, NVSwitch, ConnectX-7 NICs, 10-11kW."],
            ["DPO (Direct Preference Optimization)", "RLHF alternative — no reward model, directly optimize from preferred/rejected response pairs."],
            ["Embedding", "Dense vector representation encoding contextual numerical representations learned during training."],
            ["Expert Parallelism", "In MoE models, different expert FFN networks on different GPUs."],
            ["Flash Attention", "Memory-efficient attention algorithm — O(n) memory via tiling instead of O(n²). 2-4× speedup."],
            ["FP8 / Transformer Engine", "An 8-bit float format — supported by H100+ Tensor Cores. Mixed precision training with automatic scaling."],
            ["FSDP (Fully Sharded Data Parallel)", "PyTorch's native sharding — params + gradients + optimizer states sharded across GPUs."],
            ["GQA (Grouped-Query Attention)", "Multiple query heads, fewer KV heads — smaller KV cache, faster inference."],
            ["Hallucination", "LLM confidently generating factually incorrect information."],
            ["HBM (High Bandwidth Memory)", "GPU-integrated 3D-stacked memory. H100: HBM3, 3.35 TB/s. Primary constraint for LLM inference."],
            ["IPO (Identity Preference Optimization)", "DPO variant — theoretically motivated, reduces overfitting in preference optimization."],
            ["KV Cache", "Cached Key-Value attention tensors for inference — avoids O(n²) recomputation. O(1) per decode step."],
            ["Layer Normalization / RMSNorm", "Normalize activations per sample for training stability. RMSNorm: efficient variant used in modern LLMs."],
            ["LoRA", "Low-Rank Adaptation — freeze base model, train small low-rank adapter matrices. Parameter-efficient fine-tuning."],
            ["LLM (Large Language Model)", "Neural network, billions+ parameters, trained on massive text, capable of emergent reasoning and generation."],
            ["Megatron-LM", "NVIDIA's 3D parallel training framework for frontier model training."],
            ["MoE (Mixture of Experts)", "Sparse activation — router selects top-K expert FFNs per token. Efficient large-scale LLM."],
            ["Multi-Head Attention", "Multiple parallel attention heads capturing different relationship types simultaneously."],
            ["NCCL", "NVIDIA Collective Communications Library — all-reduce, broadcast for distributed training."],
            ["NVLink", "NVIDIA GPU-to-GPU interconnect — 900 GB/s bidirectional (H100), 1.8 TB/s (B200)."],
            ["NVSwitch", "NVIDIA chip enabling all-to-all GPU connectivity at full NVLink speed. 3 chips per DGX H100."],
            ["ORPO (Odds Ratio Preference Optimization)", "Alignment technique — combines SFT and preference optimization in single phase without reference model."],
            ["PagedAttention", "KV cache management via OS virtual memory. vLLM's core innovation. Eliminates fragmentation."],
            ["Parameters", "Learnable numbers in neural network connections — model weights. 70B = 70 billion learnable floats."],
            ["Pipeline Parallelism", "Model layers vertically split across GPU groups — each group processes a stage."],
            ["PPO (Proximal Policy Optimization)", "RL algorithm used in RLHF — optimize reward while constraining policy divergence (KL)."],
            ["QLoRA", "Quantized LoRA — 4-bit NF4 base model + BF16 LoRA adapters. 70B fine-tuning on single H100."],
            ["Quantization", "Reducing model weight precision (FP16 → INT8 → INT4) for memory and throughput efficiency."],
            ["RLHF", "Reinforcement Learning from Human Feedback — reward model from human preferences, PPO optimization."],
            ["RMSNorm", "Root Mean Square Layer Normalization — efficient variant, no mean subtraction. LLM standard."],
            ["RoPE", "Rotary Positional Embeddings — encodes relative position via rotation. Modern LLMs standard."],
            ["Self-Attention", "Attention where Q, K, V all from same sequence — tokens attend to each other."],
            ["SGLang", "Structured Generation Language — high-performance LLM serving with RadixAttention for aggressive prefix caching."],
            ["Speculative Decoding", "Small draft model generates, large model verifies — 2-4× throughput without quality loss."],
            ["Tensor Parallelism", "Individual layer operations split across multiple GPUs. NVLink critical."],
            ["TensorRT-LLM", "NVIDIA's LLM inference optimization library — maximum throughput on NVIDIA hardware via compilation."],
            ["Token", "A subword unit — the LLM's atomic input/output unit. ~0.75 English words per token."],
            ["Triton Inference Server", "NVIDIA's multi-framework inference serving platform — enterprise multi-model production."],
            ["vLLM", "Open-source LLM serving framework — PagedAttention, continuous batching, OpenAI-compatible API."],
            ["ZeRO (DeepSpeed)", "Zero Redundancy Optimizer — shards optimizer states, gradients, parameters for memory efficiency."],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Modern generative LLMs are primarily decoder-only Transformer architectures — but the LLM ecosystem also includes encoder-only (BERT family) and encoder-decoder (T5/FLAN-T5) architectures that are better suited for specific NLP tasks. All that AI infrastructure — H100, NVLink, InfiniBand, liquid cooling — exists primarily for generative LLM workloads.</li>
          <li>Every component of Transformer architecture serves a specific engineering purpose. Self-attention: capture token relationships. Multi-head: multiple relationship types simultaneously. FFN: per-token transformations and knowledge storage. Residual connections: train very deep networks. RMSNorm: training stability at scale. A collective understanding of these components is essential for debugging LLM behavior in production.</li>
          <li>KV Cache is the most important optimization in LLM inference. Without it: O(n²) generation compute. With it: O(1) per step. PagedAttention (vLLM) manages the KV cache using OS virtual memory concepts. Memory planning: model weights + peak KV cache = total GPU HBM requirement.</li>
          <li>Scaling Laws are fundamental: parameters, training tokens, and compute budget should all scale together. Simply increasing model size isn't sufficient. Llama 3 demonstrated that longer training on high-quality data delivers dramatically better results. Infrastructure implication: data pipeline quality and scale matter as much as GPU count.</li>
          <li>Distributed training is the backbone of modern LLM development. Data Parallelism, Tensor Parallelism, Pipeline Parallelism, and Expert Parallelism — all combined (3D Parallelism) to train frontier models. PyTorch FSDP, DeepSpeed, and Megatron-LM are the enterprise standard frameworks.</li>
          <li>LoRA and QLoRA have democratized LLM fine-tuning. 70B model QLoRA fine-tuning: possible on a single H100. Previously required 8 A100s. In production serving, LoRA adapters enable efficiently serving different use cases/departments on the same base model.</li>
          <li>vLLM, TensorRT-LLM, SGLang, and Triton — these serving frameworks are the core of enterprise LLM serving. vLLM: flexibility, wide model support. TensorRT-LLM: maximum performance on NVIDIA hardware. SGLang: aggressive prefix caching and structured generation. Triton: enterprise multi-model serving.</li>
          <li>An AI Gateway (LiteLLM, Envoy, Kong) is an architectural necessity in the enterprise — central governance, cost control, vendor flexibility, security. Without a gateway: distributed teams duplicate security and cost tracking work inconsistently.</li>
          <li>GPT-4's exact architecture has not been officially disclosed — there's MoE speculation in the industry but it's unconfirmed. Llama 3.1 405B is a dense model — the largest open-source dense frontier model. For infrastructure planning: rely on verified specs, not speculation.</li>
          <li>For DC engineers: LLM inference is a continuous, memory-intensive workload. 40-100kW per rack for GPU servers. Active model weights loaded in GPU HBM throughout inference — not swapped in and out. DLC mandatory above 40kW/rack. InfiniBand for training, NVLink for inference. These constraints fundamentally shape AI Data Center design.</li>
        </ul>
      </section>

    </article>
  );
}
