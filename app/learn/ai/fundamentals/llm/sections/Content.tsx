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
          Large Language Models (LLMs) woh massive neural networks hain jo natural language ko itne scale pe process karte hain ki unke andar emergent capabilities appear hoti hain — reasoning, coding, math, translation, summarization — jo explicitly train nahi ki gayi thi. "Large" sirf size ka indicator nahi hai — yeh ek qualitative shift hai jahan models genuinely useful ho jaate hain real-world complex tasks ke liye.
        </p>
        <p style={S.p}>
          Modern generative LLMs such as GPT, Llama, Mistral, Claude aur Gemma are primarily decoder-only Transformer architectures. However, Large Language Models also include encoder-only (BERT family) and encoder-decoder (T5/BART/FLAN-T5) architectures for different NLP workloads. Active model weights are loaded into GPU HBM during inference. Training ke liye hazaron H100s weeks to months ke liye. Aur inference ke liye woh continuously serve karte hain — yeh ongoing compute demand hai jo AI Infrastructure industry ko drive kar raha hai.
        </p>
        <Callout type="important" title="Infrastructure Scale">
          Ek 70B parameter model at FP16 = 140GB GPU HBM sirf weights ke liye. Training at Llama 3.1 scale: 16,000+ H100 GPUs, months of continuous compute, InfiniBand NDR fabric, petabytes of storage. Yeh infrastructure reality hai — not future promise.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>DC Engineers:</strong> LLM workloads itni power aur density demand kyon karte hain — aur kya expect karna hai jab aapka DC in workloads host karna shuru kare.</li>
          <li><strong>IT/Infrastructure Engineers:</strong> GPU cluster management, storage requirements, networking topology jo LLM serving ke liye specifically needed hai.</li>
          <li><strong>AI/MLOps Engineers:</strong> LLM training pipelines, fine-tuning strategies, production serving — complete technical picture.</li>
          <li><strong>Cloud Engineers:</strong> GPU instance selection, distributed serving architecture, managed LLM services vs self-hosted.</li>
          <li><strong>Software Engineers:</strong> LLM APIs integrate karna, function calling implement karna, RAG architectures build karna.</li>
          <li><strong>CTOs aur Architects:</strong> LLM infrastructure roadmap planning, build vs buy decisions, cost modeling.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>Transformer architecture ka complete internal diagram — har component ka kya kaam hai</li>
          <li>Parameters, tokens, embeddings, positional encoding, self-attention ka exact mathematical intuition</li>
          <li>Pretraining, distributed training strategies, fine-tuning, instruction tuning, RLHF, DPO — poori training pipeline</li>
          <li>LoRA, QLoRA, Mixture of Experts, quantization, distillation, speculative decoding</li>
          <li>KV cache, Flash Attention, continuous batching — inference optimization ka full picture</li>
          <li>GPU memory requirements per model size — exact numbers with reasoning</li>
          <li>vLLM, TensorRT-LLM, Triton, SGLang — production serving frameworks</li>
          <li>Enterprise LLM stack: gateway, observability, guardrails, cost optimization</li>
          <li>Open source vs closed source comparison with infrastructure implications</li>
          <li>Production troubleshooting — real failure scenarios aur their resolutions</li>
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
          2020 mein GPT-3 release hua. 175 billion parameters. Public estimates suggest training costs ranged between approximately USD 4–12 million. Microsoft ne exclusive license le liya. Aur initially, most researchers ne socha ki yeh ek impressive but ultimately academic achievement hai.
        </p>
        <p style={S.p}>
          Phir OpenAI ne GPT-3.5 fine-tune kiya instruction following ke liye. ChatGPT bana. November 30, 2022 ko launch hua. Aur kuch weeks mein poori industry ka trajectory change ho gayi.
        </p>
        <p style={S.p}>
          Jo actually change hua woh yeh tha: scale pe ek qualitative shift hoti hai. GPT-2 (1.5B parameters) ek coherent paragraph likh sakta tha. GPT-3 (175B parameters) code debug kar sakta tha, essays write kar sakta tha, basic reasoning perform kar sakta tha — explicitly train kiye bina in tasks ke liye. Yeh "emergent capabilities" hain.
        </p>
        <p style={S.p}>
          Engineers ke liye, yeh shift ek clear implication laya: LLMs ek new category of compute-intensive workloads hain. Traditional software applications RAM mein run karti hain. Active model weights are loaded into GPU HBM during inference — multiple servers ke across, continuous inference ke saath. Ek single 70B parameter model 140GB GPU memory maangta hai — sirf weights ke liye.
        </p>
      </section>

      {/* ─── NLP EVOLUTION ─────────────────────────────────────────────── */}
      <section id="nlp-evolution">
        <h2 style={S.h2}>NLP ka Evolution — LLMs se Pehle</h2>
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
          <li><strong>2020-Present Scale aur Emergence:</strong> GPT-3 (175B), Chinchilla, Llama, Mistral, Gemini, Claude. Scaling laws consistently work. Emergent capabilities at scale.</li>
        </ul>
      </section>

      {/* ─── WHAT IS LLM ───────────────────────────────────────────────── */}
      <section id="what-is-llm">
        <h2 style={S.h2}>What is an LLM?</h2>
        <p style={S.p}>
          Large Language Models woh neural networks hain jo natural language ke underlying patterns learn karte hain at massive scale — billions to hundreds of billions of parameters, trained on trillions of tokens of text. "Large" indicate karta hai ki model size ek threshold cross kar gaya hai jahan qualitatively different capabilities emerge hoti hain.
        </p>
        <p style={S.p}>
          Architecture ke perspective se: modern generative LLMs such as GPT, Llama, Mistral, Claude aur Gemma primarily decoder-only Transformer architectures hain. However, the broader LLM family mein encoder-only (BERT, RoBERTa — classification aur embeddings ke liye) aur encoder-decoder (T5, BART, FLAN-T5 — translation aur summarization ke liye) bhi hain. Is article mein primarily decoder-only generative LLMs cover hote hain kyunki woh aaj enterprise production ka dominant use case hain.
        </p>
      </section>

      {/* ─── PARAMETERS ────────────────────────────────────────────────── */}
      <section id="parameters">
        <h2 style={S.h2}>Parameters Explained</h2>
        <p style={S.p}>
          "70 billion parameter model" — yeh number har jagah aata hai. Concretely kya hota hai? Parameters woh learnable numbers hain jo neural network ke connections ko define karte hain. Har weight matrix mein billions of individual floating-point numbers hain. Training process in numbers ko iteratively update karta hai taaki model better predictions kare.
        </p>
        <p style={S.p}>
          Weight matrices ek Transformer block mein: Attention (Q, K, V projections — 3 matrices per head, N heads), Output projection, Feed-forward (two large linear layers, typically 4× embedding dimension), Layer normalization (scale aur shift parameters).
        </p>
        <Callout type="important" title="Infrastructure Math">
          Ek parameter at FP16 = 2 bytes. 70B parameters × 2 bytes = 140GB. Sirf model weights ke liye. Training mein: gradients (140GB) + Adam optimizer states (2× more = 280GB) + activations = 560GB+ total. Inference: sirf weights + KV cache.
        </Callout>
        <p style={S.p}>
          <strong>Parameter count aur quality:</strong> More parameters ≠ always better. Chinchilla paper (Hoffmann et al., 2022) ne show kiya ki given a compute budget, smaller model with more data often beats larger model with less data. Parameters, training tokens, aur compute budget sab together scale karne padte hain — sirf model size badhaana sufficient nahi. Llama 2 7B — carefully trained on high-quality data — many larger models se better perform karta hai specific tasks pe.
        </p>
      </section>

      {/* ─── TOKENS ────────────────────────────────────────────────────── */}
      <section id="tokens">
        <h2 style={S.h2}>Tokens aur Tokenization</h2>
        <p style={S.p}>
          LLMs text ko tokens mein process karte hain — raw characters ya whole words nahi. Byte Pair Encoding (BPE) sabse common tokenization algorithm hai. Training process: start with individual characters, phir iteratively most frequent character pairs merge karo into single tokens.
        </p>
        <ul style={S.ul}>
          <li><strong>Vocabulary size:</strong> Modern LLMs: 32K-128K vocabulary size. Llama 3: 128K. GPT-4: ~100K. Larger vocabulary = fewer tokens per sequence (efficient), larger embedding table (more memory).</li>
          <li><strong>Tokenization aur infrastructure:</strong> Context window length tokens mein measured. KV cache size tokens ke saath grows. API pricing per token. Throughput tokens/second mein. Hindi/Devanagari text: typically 2-4× more tokens per word than English — important for Indian language application cost planning.</li>
          <li><strong>Special tokens:</strong> &lt;BOS&gt; (beginning), &lt;EOS&gt; (end), &lt;PAD&gt; (padding for batching), instruction format tokens. Correct special tokens = correct output. Wrong special tokens = garbage output in production.</li>
        </ul>
      </section>

      {/* ─── EMBEDDINGS ────────────────────────────────────────────────── */}
      <section id="embeddings">
        <h2 style={S.h2}>Embeddings</h2>
        <p style={S.p}>
          Tokenization ke baad, har token ID ek high-dimensional dense vector mein convert hota hai. Embeddings encode contextual numerical representations learned during training — not just static lookup values but learned representations that capture semantic relationships, usage patterns, aur linguistic properties.
        </p>
        <p style={S.p}>
          <strong>Embedding dimension:</strong> GPT-3: 12,288 dimensions. Llama 3 70B: 8,192. Smaller models (7B): 4,096. Dimension size model's "width" — zyada dimensions = zyada representational capacity per token.
        </p>
        <p style={S.p}>
          <strong>Memory implications:</strong> Embedding table: 128K tokens × 8192 dimensions × 2 bytes (FP16) = 2GB. Sirf embedding table ke liye. Small fraction of total model size but always in GPU HBM during inference.
        </p>
      </section>

      {/* ─── POSITIONAL ENCODING ───────────────────────────────────────── */}
      <section id="positional-encoding">
        <h2 style={S.h2}>Positional Encoding</h2>
        <p style={S.p}>
          Self-attention inherently position-agnostic hai — it doesn't know which token came first. Positional encoding position information inject karta hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Sinusoidal (original Transformer):</strong> Fixed mathematical functions (sine/cosine of different frequencies). No learned parameters. Generalizes to longer sequences than seen in training.</li>
          <li><strong>Learned absolute positions:</strong> Trainable position embeddings. Simple lekin max sequence length mein bound. BERT yeh use karta hai.</li>
          <li><strong>RoPE (Rotary Positional Embeddings):</strong> Modern LLMs ka standard (Llama, Mistral, Gemma, PaLM 2). Rotation matrices ke through relative position encode karta hai. Longer contexts pe well generalizes. YaRN extension: context window extend karo bina full retraining ke.</li>
          <li><strong>ALiBi (Attention with Linear Biases):</strong> Attention scores pe linear bias add karo — recent tokens more attention naturally. MPT models use karte hain.</li>
        </ul>
      </section>

      {/* ─── TRANSFORMER ARCH ──────────────────────────────────────────── */}
      <section id="transformer-arch">
        <h2 style={S.h2}>Transformer Architecture — Complete Internals</h2>
        <p style={S.p}>
          Modern LLMs Transformer architecture pe based hain. Har cheez baaki is foundation se build hoti hai. Ek Transformer block do main parts se bana hai: Multi-Head Self-Attention aur Feed-Forward Network. Dono ke aas-paas Residual Connections aur Layer Normalization hain. Yeh block N times stack hoti hai. GPT-3: 96 blocks. Llama 3 70B: 80 blocks.
        </p>
        <Figure caption="Complete Transformer Block: Input → RMSNorm → Multi-Head GQA Attention (Flash Attention + KV Cache) → Residual → RMSNorm → FFN (SwiGLU) → Residual → Output — stacked N times">
          <TransformerArchitectureDiagram />
        </Figure>
        <p style={S.p}>
          Input processing: Raw text → Tokenizer → Token IDs → Embedding Lookup → Positional Encoding (RoPE applied to Q aur K within attention) → First Transformer Block Input. Yeh pipeline simple lagti hai lekin har step critical hai.
        </p>
      </section>

      {/* ─── SELF-ATTENTION ────────────────────────────────────────────── */}
      <section id="self-attention">
        <h2 style={S.h2}>Self-Attention — The Core Mechanism</h2>
        <p style={S.p}>
          Har token apni embedding se teen vectors produce karta hai: Query (Q — "Main kya dhundh raha hoon?"), Key (K — "Mujhe kaise dhundhte hain?"), Value (V — "Mera actual information kya hai?").
        </p>
        <p style={S.p}>
          Attention score: <code style={S.code}>Q × Kᵀ / √d_k → softmax → weighted sum of V</code>. Mathematical insight: yeh ek differentiable database retrieval hai. Query se keys search karo, matching values retrieve karo.
        </p>
        <p style={S.p}>
          <strong>Causal masking:</strong> Decoder-only LLMs causal attention use karte hain — each token sirf apne previous tokens pe attend kar sakta hai. Upper triangular mask: future positions ko -infinity before softmax.
        </p>
        <p style={S.p}>
          <strong>Attention complexity:</strong> Standard attention computation approximately quadratic O(n²) time hai sequence length n mein. 1K tokens: manageable. 128K tokens: impractical without optimization. Flash Attention reduces memory complexity by tiling computation — HBM mein full attention matrix kabhi materialize nahi hoti. Attention computation itself approximately quadratic rehti hai, but memory footprint dramatically reduces.
        </p>
        <p style={S.p}>
          Flash Attention standard hai in most modern production training aur inference frameworks. Flash Attention 2 (2023) aur Flash Attention 3 (2024) ne further improvements diye.
        </p>
      </section>

      {/* ─── MULTI-HEAD ATTENTION ──────────────────────────────────────── */}
      <section id="multi-head-attention">
        <h2 style={S.h2}>Multi-Head Attention</h2>
        <p style={S.p}>
          Single attention head ek type of relationship capture karta hai. Multi-head attention: multiple attention heads simultaneously, each capturing different aspects. H heads parallel mein run karte hain. Each head: d_model/H dimension ke Q, K, V projections. All heads ke outputs concatenate karo → final linear projection.
        </p>
        <p style={S.p}>
          Different heads different linguistic phenomena learn karte hain — syntactic dependencies, semantic relationships, coreference. This specialization automatically emerges during training.
        </p>
        <ul style={S.ul}>
          <li><strong>Head count per model size:</strong> Llama 3 8B: 32 attention heads, 8 KV heads (GQA). Llama 3 70B: 64 attention heads, 8 KV heads (GQA).</li>
          <li><strong>GQA (Grouped-Query Attention):</strong> N query heads, M key heads, M value heads (M &lt; N, typically 8). Multiple query heads share same K aur V. KV cache dramatically smaller. Same quality, faster inference. Llama 2/3, Mistral, Gemma standard choice.</li>
          <li><strong>MQA (Multi-Query Attention):</strong> Extreme version — single K aur V shared by all query heads. Even smaller KV cache, slight quality trade-off.</li>
        </ul>
      </section>

      {/* ─── FFN ───────────────────────────────────────────────────────── */}
      <section id="ffn">
        <h2 style={S.h2}>Feed-Forward Networks</h2>
        <p style={S.p}>
          Har attention sublayer ke baad ek position-wise FFN aata hai: <code style={S.code}>FFN(x) = Linear₂(Activation(Linear₁(x)))</code>
        </p>
        <ul style={S.ul}>
          <li><strong>Dimensions:</strong> Hidden dimension typically 4× embedding dimension. Llama 3 70B: 8192 dim → 28,672 FFN hidden dim.</li>
          <li><strong>Activation:</strong> Modern LLMs: SwiGLU (PaLM, Llama, Mistral) — better performance but three matrices instead of two. GELU (GPT-style). ReLU (original Transformer).</li>
          <li><strong>Knowledge storage:</strong> Research suggests FFN sublayers factual knowledge store karte hain. Knowledge editing techniques often FFN weights target karte hain.</li>
          <li><strong>Computational cost:</strong> FFN operations typically ~2/3 of total compute in a Transformer block. Large hidden dimension = GPU compute dominant here.</li>
        </ul>
      </section>

      {/* ─── RESIDUAL CONNECTIONS ──────────────────────────────────────── */}
      <section id="residual-connections">
        <h2 style={S.h2}>Residual Connections</h2>
        <p style={S.p}>
          Simple lekin critical. Each sublayer ka output uski input se add karo: <code style={S.code}>Output = LayerNorm(x + Sublayer(x))</code>
        </p>
        <p style={S.p}>
          Vanishing gradients se bachao very deep networks mein. Gradients directly skip connections ke through flow kar sakte hain. ResNets ne computer vision mein demonstrate kiya (2015). Transformers ne adopt kiya.
        </p>
        <p style={S.p}>
          <strong>Pre-norm vs Post-norm:</strong> Original Transformer: post-norm. Modern LLMs (Llama, Mistral, PaLM): pre-norm (LayerNorm before sublayer). Pre-norm: training stability better, especially at large scale.
        </p>
      </section>

      {/* ─── LAYER NORMALIZATION ───────────────────────────────────────── */}
      <section id="layer-normalization">
        <h2 style={S.h2}>Layer Normalization</h2>
        <p style={S.p}>
          Training stabilize karna large models ke liye mandatory. Layer Normalization activations ko normalize karta hai mean zero, variance one.
        </p>
        <p style={S.p}>
          <strong>RMSNorm:</strong> LLaMA, Mistral, Gemma use karte hain. Sirf RMS (root mean square) compute karo, mean subtract nahi karo. Slightly faster computation, same empirical performance. Small efficiency gain at large scale matters.
        </p>
      </section>

      {/* ─── DECODER ONLY ──────────────────────────────────────────────── */}
      <section id="decoder-only">
        <h2 style={S.h2}>Decoder-Only Models — The Generative LLM Standard</h2>
        <p style={S.p}>
          GPT family, Llama, Mistral, Gemma, Command R+ — sab decoder-only hain. Sirf causal (masked) self-attention. Next token prediction pe pretrain. No separate encoder. Simple, homogeneous architecture — ek hi block type scale pe. Few-shot prompting naturally works — examples in-context provide karo.
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
          Llama 3.1 405B is a dense model — not MoE. Sabse bade open-source frontier dense model hai. Full 405B parameters active per token. Infrastructure requirement accordingly high hai.
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
          LLM era mein relative decline lekin still relevant: structured task performance often better than equivalent decoder-only for same compute, and typically smaller memory footprint for specialized tasks.
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
          Gemini ka supported context window depends on model version aur deployment. Different Gemini variants (Flash, Pro, Ultra) aur deployment configurations (AI Studio, Vertex AI) alag-alag limits rakhte hain. Always check current documentation.
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
          <strong>Without KV cache:</strong> Token N generate karne ke liye: sab previous N-1 tokens ke through full forward pass. O(n²) total compute. Catastrophically slow.
        </p>
        <p style={S.p}>
          <strong>With KV cache:</strong> Prefill: all input tokens simultaneously process (parallelizable). K aur V tensors GPU HBM mein store. Decode: sirf new token ka Q compute, cached K/V se attend. O(1) per step. 10-50× faster generation.
        </p>
        <ul style={S.ul}>
          <li><strong>PagedAttention (vLLM):</strong> KV cache ko OS virtual memory concepts se manage karo. Fixed-size pages, non-contiguous GPU memory, fragmentation eliminate, dynamic sequence lengths efficiently handle. 2-5× throughput vs naive.</li>
          <li><strong>Prefix caching:</strong> Shared prefix (system prompt, few-shot examples) ka KV cache ek baar compute karo, multiple requests ke liye reuse. Anthropic, Google cloud APIs support. Significant savings for long system prompts.</li>
          <li><strong>KV cache quantization:</strong> INT8 KV cache → 50% memory reduction. Quality: negligible impact for most tasks.</li>
        </ul>
      </section>

      {/* ─── SCALING LAWS ──────────────────────────────────────────────── */}
      <section id="scaling-laws">
        <h2 style={S.h2}>Scaling Laws</h2>
        <p style={S.p}>
          Chinchilla paper (Hoffmann et al., 2022) ne ek fundamental insight provide ki: given a fixed compute budget, optimal performance tab milti hai jab parameters aur training tokens proportionally scale karein — sirf model size badhaana sufficient nahi. "Compute-optimal" training: model size aur data size roughly equal importance rakhte hain.
        </p>
        <p style={S.p}>
          Practical implication: parameters, training tokens, aur compute budget sab together scale karne chahiye. Ek 70B model ko compute-optimally train karne ke liye ~1.4 trillion tokens chahiye. Llama 3 ne yeh further push kiya — 70B model pe 15 trillion tokens — data scaling ke benefits demonstrate karte hue. Infrastructure impact: more training data = more storage, more preprocessing compute, longer training runs.
        </p>
        <p style={S.p}>
          <strong>Emergent capabilities:</strong> Certain abilities ek certain scale ke baad suddenly appear hoti hain — few-shot learning, chain-of-thought reasoning, code generation. Yeh non-linear transitions hain. Predictable nahi tha ki yeh specific scale pe emerge hogi. Yeh aspect LLM scaling ko particularly interesting banata hai aur larger models mein continued investment drive karta hai.
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
            Foundation model banana — raw text se knowledge aur capabilities seekhna. Data: Common Crawl, books, Wikipedia, academic papers, code (GitHub), multilingual text. Deduplication, quality filtering, PII scrubbing, tokenization, shuffling.
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
            <li><strong>Data Parallelism (DDP/FSDP):</strong> Same model, alag data batches on alag GPUs. All-reduce gradients every step via NCCL. Simplest approach. Model single GPU mein fit hona chahiye. PyTorch DDP standard. PyTorch FSDP: parameters + gradients + optimizer states sab sharded across GPUs — effective memory reduction.</li>
            <li><strong>Tensor Parallelism:</strong> Individual layer operations split across GPUs — matrix multiply divided, different GPUs different portions compute karte hain. NVLink bandwidth critical. Megatron-LM yeh efficiently implement karta hai. Best within DGX/HGX node (NVLink available).</li>
            <li><strong>Pipeline Parallelism:</strong> Model layers vertically split in stages — GPU 1 layers 1-32, GPU 2 layers 33-64. Micro-batch pipelining pipeline bubbles reduce karta hai. PipeDream, Megatron-LM yeh implement karte hain.</li>
            <li><strong>Expert Parallelism:</strong> MoE models mein different experts on different GPUs. Router tokens dispatch karta hai — InfiniBand inter-node expert routing handle karta hai. Load balancing critical.</li>
            <li><strong>3D Parallelism:</strong> Frontier models: data + tensor + pipeline combined. Example: 16,000 H100s → 8 tensor parallel × 64 pipeline × 31 data parallel groups. Megatron-LM, DeepSpeed aur PyTorch FSDP yeh coordinate karte hain.</li>
            <li><strong>Enterprise frameworks:</strong> PyTorch FSDP (native, widely used), DeepSpeed (ZeRO optimizer, CPU offload, pipeline parallelism), Megatron-LM (NVIDIA's battle-tested 3D parallel framework for largest models).</li>
          </ul>
        </section>

        <section id="fine-tuning">
          <h3 style={S.h3}>Fine-Tuning</h3>
          <p style={S.p}>
            Pretrained base model ko specific use cases ke liye adapt karna. Supervised Fine-Tuning (SFT): human-written instruction-response pairs. Standard cross-entropy loss. Few thousand to few hundred thousand examples. Hours to days on appropriate GPU cluster.
          </p>
        </section>

        <section id="instruction-tuning">
          <h3 style={S.h3}>Instruction Tuning</h3>
          <p style={S.p}>
            Specific form of SFT. Diverse task instructions: summarize this, translate that, write code for, answer this question. Chat format: system prompt, user turn, assistant turn, repeat. Base model → instruction-following model.
          </p>
        </section>

        <section id="rlhf">
          <h3 style={S.h3}>RLHF aur Alignment Techniques</h3>
          <p style={S.p}>
            ChatGPT, Claude, Gemini — sab RLHF ya similar use karte hain. Step 1: SFT model as starting point. Step 2: Reward model training — human annotators preferred responses select karte hain. Reward model predict karta hai ki kaunsa response better hai. Step 3: PPO optimization — reward maximize karo without diverging from SFT model (KL divergence constraint).
          </p>
          <p style={S.p}>
            <strong>Modern preference optimization techniques:</strong> RLHF + PPO traditional approach hai. DPO (Direct Preference Optimization): reward model ke bina, directly from preferences optimize karo — single training phase, more stable. ORPO (Odds Ratio Preference Optimization): negative examples bhi process karo ek single objective mein — no reference model needed. IPO (Identity Preference Optimization): DPO ka theoretically motivated variant jo overfitting reduce karta hai. Each approach different trade-offs rakhti hai infrastructure requirements aur training stability mein.
          </p>
        </section>

        <section id="dpo">
          <h3 style={S.h3}>DPO</h3>
          <p style={S.p}>
            Direct Preference Optimization RLHF simplification hai — no separate reward model, no PPO. Direct optimization from paired preferred/rejected responses. Used in: Llama 3, Zephyr, many open-source aligned models. Lower infrastructure requirements than RLHF. Single training phase. More stable training.
          </p>
        </section>
      </section>

      {/* ─── LORA ──────────────────────────────────────────────────────── */}
      <section id="lora">
        <h2 style={S.h2}>LoRA — Low-Rank Adaptation</h2>
        <p style={S.p}>
          Mathematical insight: weight updates during fine-tuning ek low-rank structure follow karte hain. <code style={S.code}>dW ≈ A × B</code> jahan A is (d × r) aur B is (r × k) aur r &lt;&lt; min(d,k). Implementation: original weight matrix W freeze karo. Sirf A aur B train karo (typically 0.1-1% of total parameters). Inference: W_effective = W + A×B — adapters merge ho jaate hain, no inference overhead.
        </p>
        <ul style={S.ul}>
          <li><strong>Rank r selection:</strong> r=4 (basic task adaptation), r=16 (good balance, most tasks), r=64 (complex tasks), r=256 (near full fine-tuning).</li>
          <li><strong>Production serving with LoRA:</strong> Multiple LoRA adapters serve karo on single base model. Different customers/departments ke liye different adapters. Memory: base model once + each adapter (MBs). LoRAX framework yeh efficiently handle karta hai.</li>
        </ul>
      </section>

      {/* ─── QLORA ─────────────────────────────────────────────────────── */}
      <section id="qlora">
        <h2 style={S.h2}>QLoRA — Quantized LoRA</h2>
        <p style={S.p}>
          Base model 4-bit NF4 (Normal Float 4) quantization. Double quantization: quantization constants ko bhi quantize karo. LoRA adapters BF16 precision mein. Paged Attention: memory spikes manage karo.
        </p>
        <p style={S.p}>
          <strong>Result:</strong> 65B model fine-tuning on single A100 (40GB). Previously 8 A100s required. 70B model on single H100 (80GB). QLoRA ne LLM fine-tuning har organization ke liye accessible bana diya. Quality: slightly lower than full BF16 LoRA, negligible for most production tasks.
        </p>
      </section>

      {/* ─── MOE ───────────────────────────────────────────────────────── */}
      <section id="moe">
        <h2 style={S.h2}>Mixture of Experts (MoE)</h2>
        <Figure caption="Mixture of Experts: Router selects top-2 of 8 expert FFN networks per token — sparse activation achieves ~70B quality at ~13B active compute but requires all 47B loaded in GPU HBM">
          <MixtureOfExpertsDiagram />
        </Figure>
        <p style={S.p}>
          Traditional dense Transformer: har input ke liye har parameter use hota hai. MoE: sparse activation — sirf kuch parameters per token activate. N expert FFN networks. Router network (small, learned): har token ke liye top-K experts select karo (typically K=1 or K=2). Sirf selected experts compute karo.
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
          <strong>Infrastructure implications:</strong> Expert parallelism: different GPUs par different experts. Load balancing: router uniform distribution ensure karna padta hai (dead expert problem — auxiliary loss). MoE: memory intensive, compute efficient. Best for high-throughput serving, not low-latency single-request.
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
          <strong>FP8 Mixed Precision Training</strong> using NVIDIA Transformer Engine H100 aur newer hardware pe standard ban raha hai. Transformer Engine dynamically determines FP8 vs FP16 per layer per step — quality FP16 training ke comparable, throughput ~2× better. Activation scaling aur delayed scaling algorithms numerical stability ensure karte hain.
        </p>
      </section>

      {/* ─── DISTILLATION ──────────────────────────────────────────────── */}
      <section id="distillation">
        <h2 style={S.h2}>Knowledge Distillation</h2>
        <p style={S.p}>
          Large teacher model se small student model train karo — similar capabilities, dramatically smaller. Teacher: large, high-quality model (e.g., 70B). Student: small model (e.g., 7B). Training: student ko teacher ki outputs pe train karo — not just labels, but soft probability distributions. Teacher's "dark knowledge" contain important information.
        </p>
        <p style={S.p}>
          <strong>Production applications:</strong> DistilBERT: BERT ka 60% size, 97% performance. Many organizations GPT-4 outputs se smaller proprietary models train karti hain. Customer service chatbots: expensive frontier model se synthetic data generate karo, cheaper model train karo. Phi-4 (Microsoft): high-quality synthetic data se distilled small model.
        </p>
      </section>

      {/* ─── SPECULATIVE DECODING ──────────────────────────────────────── */}
      <section id="speculative-decoding">
        <h2 style={S.h2}>Speculative Decoding</h2>
        <p style={S.p}>
          Throughput 2-4× improve karo without quality loss. Draft model (small, fast — typically 7B): K tokens ahead speculate karo. Target model (large — 70B): all K draft tokens verify karo in one forward pass. If draft correct: accept all K tokens. If wrong at position i: reject from i onward, resample. Acceptance rate typically 70-90%.
        </p>
        <p style={S.p}>
          <strong>Infrastructure:</strong> Two models simultaneously in GPU memory. Memory: small model + large model = more total. But throughput: 2-4× better. vLLM, TGI, TensorRT-LLM yeh implement karte hain. Llama 3 8B draft → Llama 3 70B target = common production pairing.
        </p>
      </section>

      {/* ─── CONTEXT ENGINEERING ───────────────────────────────────────── */}
      <section id="context-engineering">
        <h2 style={S.h2}>Context Engineering</h2>
        <p style={S.p}>
          Context engineering prompt engineering se zyada structured discipline hai. Sirf instructions likhna nahi — strategically decide karna ki model ke context window mein kya jaata hai, kya nahi jaata, kis order mein, aur kyun.
        </p>
        <ul style={S.ul}>
          <li><strong>System prompt design:</strong> Model ka base behavior, persona, constraints, safety guardrails. Token budget carefully manage karo — system prompt har request ke saath sent hota hai.</li>
          <li><strong>Conversation history management:</strong> Kya keep karo, kya truncate. Summarization-based compression. Selective retention of key turns.</li>
          <li><strong>Retrieved context placement:</strong> RAG chunks kahan insert ho — before ya after user query? Research: beginning aur end of context better retrieved than middle.</li>
          <li><strong>Lost in the Middle problem:</strong> Models middle-of-context information worse retrieve karte hain. Solution: important information beginning ya end mein rakho. Production implication: RAG chunks ko strategically position karo.</li>
          <li><strong>Context compression:</strong> Long contexts ko meaningful summaries mein reduce karo LLM ki help se. Token cost reduce karo while preserving key information.</li>
          <li><strong>Infrastructure impact:</strong> Every context decision token count affect karta hai — cost aur latency directly. 1000 extra tokens per request × 1M requests/day = significant cost differential.</li>
        </ul>
      </section>

      {/* ─── PROMPT PROCESSING ─────────────────────────────────────────── */}
      <section id="prompt-processing">
        <h2 style={S.h2}>Prompt Processing Pipeline</h2>
        <p style={S.p}>
          User se GPU tak — yeh journey samajhna production debugging ke liye critical hai.
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Tokenization:</strong> Raw text → BPE tokenizer → token IDs. CPU typically. Sub-millisecond.</li>
          <li><strong>Embedding lookup:</strong> Token IDs → embedding vectors. GPU HBM se embedding table lookup. Batch of tokens simultaneously.</li>
          <li><strong>Positional encoding:</strong> RoPE rotation apply karo to Q aur K matrices within attention (not to embeddings directly in modern LLMs).</li>
          <li><strong>Transformer blocks (N times):</strong> RMSNorm → Multi-Head GQA Attention (with KV cache) → Residual Add → RMSNorm → FFN (SwiGLU) → Residual Add. 99% of compute here.</li>
          <li><strong>Final layer norm + LM head:</strong> Last block output → RMSNorm → Linear projection to vocabulary size → logits.</li>
          <li><strong>Sampling:</strong> Logits → probabilities via softmax → temperature scaling, top-k, top-p → token selected.</li>
          <li><strong>Detokenization:</strong> Token ID → text piece → stream to user.</li>
        </ol>
      </section>

      {/* ─── FUNCTION CALLING ──────────────────────────────────────────── */}
      <section id="function-calling">
        <h2 style={S.h2}>Function Calling aur MCP</h2>
        <p style={S.p}>
          Function calling: developer defines tools (JSON Schema). Model decides which tool to call, with what arguments. Application executes tool, returns result. Model synthesizes final response.
        </p>
        <p style={S.p}>
          <strong>MCP (Model Context Protocol):</strong> Anthropic ka open standard jo standardize karta hai AI ↔ tool connectivity. MCP Servers resources aur tools expose karte hain standardized protocol ke through (JSON-RPC 2.0). Ek baar MCP Server build karo → har compatible AI tool use kar sakta hai. Enterprise benefit: per-tool, per-model integration eliminate karo.
        </p>
        <Callout type="best-practice" title="Tool Execution Infrastructure">
          Tool calls sandboxed environments mein run karo. Timeout enforce karo (30s typical). Complete audit logging for compliance. Retry logic — tool failure gracefully handle karo. Token overhead: tool definitions tokens consume karte hain (cost implications).
        </Callout>
      </section>

      {/* ─── RAG INTEGRATION ───────────────────────────────────────────── */}
      <section id="rag-integration">
        <h2 style={S.h2}>RAG Integration</h2>
        <p style={S.p}>
          RAG real-time, organization-specific knowledge inject karta hai inference time pe. Basic flow: Query embedding → vector database ANN search → top-K relevant chunks retrieve karo → augmented prompt → LLM grounded generation.
        </p>
        <ul style={S.ul}>
          <li><strong>Advanced RAG:</strong> Re-ranking (retrieved chunks quality-score karo), hybrid search (vector + BM25), metadata filtering, multi-hop retrieval, contextual compression.</li>
          <li><strong>Infrastructure:</strong> Embedding model: separate inference (CPU for batch indexing, GPU for real-time). Vector database: Qdrant, Weaviate, Pinecone, pgvector. Query latency: 10-100ms ANN search.</li>
        </ul>
      </section>

      {/* ─── AI AGENTS ─────────────────────────────────────────────────── */}
      <section id="ai-agents">
        <h2 style={S.h2}>AI Agents with LLMs</h2>
        <p style={S.p}>
          Agents LLMs ko observation → reasoning → action loops mein embed karte hain. ReAct pattern: Thought → Action → Observation → Thought → Final Answer. 5-20 LLM calls per complex task. Cost proportionally higher. Frameworks: LangChain, AutoGen (Microsoft), CrewAI, OpenAI Assistants.
        </p>
        <p style={S.p}>
          <strong>Infrastructure:</strong> State persistence (database ya vector store), sandboxed execution (code execution, web browsing), loop detection (max steps enforce karo), human-in-loop for high-risk actions, cost monitoring mandatory.
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
          <strong>All-reduce communication:</strong> Every training step. Gradients (~140GB for 70B model) synchronized across all GPUs. Ring all-reduce ya tree all-reduce via NCCL. Communication overlap with computation (gradient compression, pipeline bubble filling) critical for training efficiency.
        </p>
        <p style={S.p}>
          <strong>NVSwitch:</strong> DGX/HGX H100 mein 3 NVSwitch chips connect all 8 GPUs at full NVLink bandwidth. Any GPU → any GPU at 900 GB/s — no bandwidth sharing. Critical for tensor parallelism within node. Without NVSwitch: inter-GPU bandwidth limited to PCIe (64 GB/s) — 14× slower for tensor-parallel operations.
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
            SGLang (Structured Generation Language) ek emerging high-performance LLM serving framework hai jo complex multi-call LLM programs efficiently execute karta hai. RadixAttention: automatic KV cache reuse across multiple requests with shared prefixes — prefix caching vLLM se more aggressive. JSON decoding, constrained generation native support. Multi-model serving aur complex agentic workflows ke liye well-suited. Enterprise mein: agentic applications aur RAG pipelines jahan structured generation aur shared context important hai.
          </p>
        </section>
      </section>

      {/* ─── KUBERNETES ────────────────────────────────────────────────── */}
      <section id="kubernetes">
        <h2 style={S.h2}>Kubernetes for LLM Serving</h2>
        <ul style={S.ul}>
          <li><strong>NVIDIA GPU Operator:</strong> GPU drivers, CUDA toolkit, DCGM, MIG configuration automatically manage karo. GPU resource advertisement to K8s scheduler. Essential for any K8s-based AI cluster.</li>
          <li><strong>Gang scheduling:</strong> Distributed inference (tensor parallel) requires all GPU pods simultaneously start. Volcano ya Run:AI gang scheduling support karte hain. Critical for multi-GPU model deployment.</li>
          <li><strong>HPA (Horizontal Pod Autoscaling):</strong> Scale on GPU utilization (DCGM Prometheus metrics) ya request queue depth. Target: 70-85% GPU utilization. Scale-up fast, scale-down slow.</li>
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
          Enterprise AI Gateway ek central proxy layer hai jo sab AI API traffic manage karta hai — authentication, rate limiting, caching, routing, monitoring, guardrails.
        </p>
        <ul style={S.ul}>
          <li><strong>LiteLLM:</strong> Open-source Python proxy. 100+ model providers unified API. Per-team cost tracking. Fallback routing. Widely adopted for multi-provider enterprise deployments.</li>
          <li><strong>Envoy AI Gateway:</strong> CNCF project Envoy pe built. Cloud-native, production-grade. Rate limiting, auth, observability. AI-specific extensions — streaming support, token-based rate limiting. Enterprise infrastructure teams familiar hai Envoy se.</li>
          <li><strong>Kong AI Gateway:</strong> Kong API Gateway ka AI extension. Plugin ecosystem. Enterprise support. Hybrid deployment (cloud + on-premises). Large organizations jo already Kong use kar rahe hain ke liye natural choice.</li>
          <li><strong>Core functions:</strong> Model routing (cost/quality), prompt caching (prefix + semantic), complete audit trail, cost attribution per team, guardrails, failover.</li>
        </ul>
      </section>

      {/* ─── INFERENCE SCHEDULING ──────────────────────────────────────── */}
      <section id="inference-scheduling">
        <h2 style={S.h2}>Inference Scheduling</h2>
        <p style={S.p}>
          Inference scheduling LLM serving mein ek distinct engineering challenge hai jo traditional ML inference se alag hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Continuous batching vs static batching:</strong> Static batching: fixed batch size, wait for batch to fill. Continuous batching (vLLM, TGI): requests dynamically join aur leave batch. GPU idle time dramatically reduce. 2-4× better throughput.</li>
          <li><strong>Prefill-Decode disaggregation:</strong> Emerging technique — separate GPU pools for prefill (compute-intensive) aur decode (memory-bandwidth-bound). Prefill servers: large models, high compute. Decode servers: optimized for streaming. Different hardware optimal for each phase.</li>
          <li><strong>Priority scheduling:</strong> High-priority requests (paid tiers, SLA-bound) preempt low-priority. Request queuing with priority. Max wait time enforcement.</li>
          <li><strong>Chunked prefill:</strong> Large prompts ko chunks mein process karo — TTFT latency improve karo for other queued requests. vLLM support karta hai. Long-document processing scenarios mein important.</li>
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
          TTFT aur TPOT dono track karo separately. TTFT prefill phase quality indicate karta hai. TPOT decode phase indicate karta hai. Different optimization strategies target different metrics.
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
            ["Prompt Injection", "User input mein malicious instructions jo system prompt override karein", "Input sanitization, instruction hierarchy, output monitoring, NeMo Guardrails"],
            ["Jailbreak Detection", "Creative prompts bypass safety training — roleplay, hypothetical, foreign language", "Multi-layer safety classifiers, pattern monitoring, constitutional training, rate-limit suspicious patterns"],
            ["Prompt Leakage", "User extracts system prompt via clever queries", "System prompt masking, output audit for verbatim repetition"],
            ["Model Poisoning", "Training data ya fine-tuning data mein malicious examples", "Training data provenance tracking, automated quality checks, anomaly detection"],
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
        <h2 style={S.h2}>Alignment aur Safety</h2>
        <p style={S.p}>
          Alignment: model behavior actual human values ke saath align karna. Language model objective (next token prediction) doesn't inherently mean helpful, honest, harmless. RLHF, DPO, ORPO, Constitutional AI — sab is problem address karte hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Constitutional AI (Anthropic):</strong> Explicit principles define karo. Model apne responses in principles ke against critique karta hai. RLAIF (AI Feedback instead of Human Feedback). Scales better than pure human feedback.</li>
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
          GPT-4 exact architecture has not been officially disclosed by OpenAI. Industry estimates suggest it may use a Mixture of Experts (MoE) design, but this remains unconfirmed. Infrastructure planning ke liye: treat as API-only, no GPU requirements, per-token pricing.
        </p>
        <p style={S.p}>
          <strong>Hybrid approach:</strong> Proprietary API for complex reasoning + fine-tuned open source for high-volume routine tasks. Typical savings: 70-80% cost reduction while maintaining quality where needed.
        </p>
      </section>

      {/* ─── HOPPER AND BLACKWELL ──────────────────────────────────────── */}
      <section id="hopper-blackwell">
        <h2 style={S.h2}>Hopper aur Blackwell Infrastructure</h2>
        <h3 style={S.h3}>NVIDIA H100 (Hopper) — Current Production Standard</h3>
        <ul style={S.ul}>
          <li><strong>H100 SXM5 specifications:</strong> 80GB HBM3 (3.35 TB/s bandwidth). FP8 Mixed Precision Training via Transformer Engine. 4th gen Tensor Cores. NVLink 4.0: 900 GB/s bidirectional per GPU. TDP: 700W.</li>
          <li><strong>DGX H100:</strong> 8× H100 SXM5 connected via 3× NVSwitch. 900 GB/s all-to-all GPU bandwidth. 8× ConnectX-7 NICs (3.2 Tbps aggregate IB). 2TB DDR5, 30TB NVMe. 10-11kW server power.</li>
          <li><strong>FP8 training with Transformer Engine:</strong> H100 natively supports FP8 format. NVIDIA Transformer Engine dynamically selects FP8 vs BF16 per layer — automatically manages scaling factors. Quality comparable to BF16 training. Throughput significantly higher.</li>
        </ul>
        <h3 style={S.h3}>NVIDIA Blackwell (B200, GB200) — Next Generation</h3>
        <p style={S.p}>
          Blackwell architecture compared to Hopper: higher compute throughput, higher HBM3e memory capacity, higher memory bandwidth, higher NVLink bandwidth, better inference efficiency per watt. Exact benchmark numbers vary by workload — vendor published benchmarks aur MLPerf results se actual numbers verify karo.
        </p>
        <ul style={S.ul}>
          <li><strong>B200:</strong> 192GB HBM3e. Significantly higher bandwidth than H100. NVLink 5.0. Improved FP8 aur FP4 support. Lower power per FLOP than H100.</li>
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
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Transformer architecture mein attention mechanism kyun important hai?</p>
          <p style={S.p}>Self-attention allow karta hai har token ko sequence mein kisi bhi doosre token se directly relate karne ke liye — distance irrelevant. RNN ka problem: long-range dependencies mein gradient vanishes over many steps. Attention: direct connection. "The cat sat on the mat because it was tired" — "it" ko "cat" se connect karna 6 tokens paar. Attention trivially handle karta hai. Multi-head attention: multiple types of relationships simultaneously capture karta hai. Parallelizable training: unlike RNNs, all attention operations simultaneously compute ho sakte hain — GPU efficiency maximized. Yeh woh reason hai ki Transformers GPU clusters pe efficiently scale karte hain.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: KV cache kya hai aur production mein kyun critical hai?</p>
          <p style={S.p}>Without KV cache: token N generate karne ke liye sab N-1 previous tokens process — O(n²) total compute. With KV cache: prefill phase mein all input tokens process karo, Key aur Value tensors GPU HBM mein store. Decode phase mein: sirf new token ka Query compute, cached K/V se attend. O(1) per step. 10-50× faster generation. Trade-off: memory grows linearly with context aur batch size. Production implications: KV cache + model weights = total GPU memory requirement. PagedAttention (vLLM) KV cache ko OS virtual memory concepts se manage karta hai — fragmentation eliminate, throughput maximize.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: RLHF aur DPO mein kya difference hai?</p>
          <p style={S.p}>RLHF: SFT model → reward model train on human preferences → PPO optimization against reward model. Complex three-stage. Expensive infrastructure: multiple models simultaneously. DPO: paired preferred/rejected responses se directly optimize. No separate reward model. Single training phase. More stable. Lower infrastructure. Quality: DPO RLHF ke comparable ya better on many benchmarks. Modern variants: ORPO (odds ratio, no reference model needed), IPO (theoretically motivated, reduces overfitting). Choose RLHF: nuanced reward modeling, large human preference dataset. Choose DPO/ORPO: simpler pipeline, limited resources.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: 70B model production mein deploy karne ke liye infrastructure planning kaise karein?</p>
          <p style={S.p}>Step 1: precision decide karo. FP16 = 140GB, INT8 = 70GB, INT4 = 35GB. Step 2: KV cache estimate. 4096 context × batch 32 × per-token KV: ~20GB. Step 3: Total = weights + KV cache + 20% buffer. FP16: ~185GB → 3× H100 80GB. INT4: ~63GB → 1× H100 80GB. Step 4: vLLM with PagedAttention. Step 5: Tensor parallelism if multi-GPU — NVLink within node. Step 6: K8s HPA auto-scaling. Step 7: Monitoring — DCGM, vLLM metrics, LangFuse for LLM traces.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Distributed LLM training mein kaunse parallelism strategies use karte hain?</p>
          <p style={S.p}>Data Parallelism (DDP/FSDP): same model, alag data batches. All-reduce gradients via NCCL. Simplest. PyTorch FSDP: params+grads+optimizer sharded. Tensor Parallelism: individual layer operations split across GPUs — NVLink bandwidth critical. Megatron-LM standard. Pipeline Parallelism: model layers vertical split in stages, micro-batch pipelining. Expert Parallelism: MoE models mein different experts on different GPUs. 3D Parallelism: sab combined at frontier scale. DeepSpeed ZeRO: memory-efficient training with CPU offload options. Infrastructure requirement: InfiniBand NDR for inter-node, NVLink for intra-node.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: LLM inference mein latency optimize kaise karein?</p>
          <p style={S.p}>TTFT optimize karo: prompt length reduce karo (prefill time), chunked prefill enable karo (large prompts in chunks), dedicated prefill instances consider karo. TPOT optimize karo: model quantization (INT4 → faster decode, bandwidth-bound), Flash Attention (memory efficient), speculative decoding (small draft model predicts, large model verifies — 2-4× TPOT improvement), reduce tensor parallelism if not memory-constrained (inter-GPU communication overhead). Hardware: higher HBM bandwidth → better decode speed. Network: gRPC vs REST (gRPC lower overhead). Caching: prefix cache → TTFT near-zero for cached prefix.</p>
        </div>
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["Alignment", "Model behavior ko human values ke saath align karna — helpful, harmless, honest."],
            ["Autoregressive Generation", "Token-by-token text generation jahan each token previous tokens pe conditioned hota hai."],
            ["BF16 (Brain Float 16)", "16-bit float with FP32's exponent range — preferred for LLM training. No loss scaling needed."],
            ["BPE (Byte Pair Encoding)", "Tokenization algorithm merging frequent character sequences into subword tokens."],
            ["Causal Attention", "Masked attention — each token only attends to previous tokens. Enables autoregressive LLM generation."],
            ["Chinchilla Scaling Laws", "Parameters, training tokens, aur compute budget sab proportionally scale karne chahiye for optimal compute efficiency."],
            ["Constitutional AI", "Anthropic ka alignment approach — training model with explicit principles to critique its own outputs."],
            ["Context Window", "Maximum tokens model ek time pe process kar sakta hai — input + output combined."],
            ["Continuous Batching", "Dynamic batching jahan new requests in-progress batch mein join karte hain jab tokens complete hote hain."],
            ["CUDA", "NVIDIA's parallel computing platform — enables GPU general compute. Foundation of LLM training."],
            ["DGX", "NVIDIA's purpose-built AI server — 8× H100 GPUs, NVSwitch, ConnectX-7 NICs, 10-11kW."],
            ["DPO (Direct Preference Optimization)", "RLHF alternative — no reward model, directly optimize from preferred/rejected response pairs."],
            ["Embedding", "Dense vector representation encoding contextual numerical representations learned during training."],
            ["Expert Parallelism", "MoE models mein different expert FFN networks on different GPUs."],
            ["Flash Attention", "Memory-efficient attention algorithm — O(n) memory via tiling instead of O(n²). 2-4× speedup."],
            ["FP8 / Transformer Engine", "8-bit float format — H100+ Tensor Cores support karte hain. Mixed precision training with automatic scaling."],
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
            ["Token", "Subword unit — LLM ka atomic input/output unit. ~0.75 English words per token."],
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
          <li>Modern generative LLMs primarily decoder-only Transformer architectures hain — lekin LLM ecosystem mein encoder-only (BERT family) aur encoder-decoder (T5/FLAN-T5) bhi hain jo specific NLP tasks ke liye better suited hain. Woh sari AI infrastructure — H100, NVLink, InfiniBand, liquid cooling — primarily generative LLM workloads ke liye exist karti hai.</li>
          <li>Transformer architecture ka har component ek specific engineering purpose serve karta hai. Self-attention: token relationships capture karo. Multi-head: multiple relationship types simultaneously. FFN: per-token transformations aur knowledge storage. Residual connections: very deep networks train karo. RMSNorm: training stability at scale. In components ka collective understanding = debugging LLM behavior in production.</li>
          <li>KV Cache LLM inference mein sabse important optimization hai. Without it: O(n²) generation compute. With it: O(1) per step. PagedAttention (vLLM) KV cache ko OS virtual memory concepts se manage karta hai. Memory planning: model weights + KV cache peak = total GPU HBM requirement.</li>
          <li>Scaling Laws fundamental hain: parameters, training tokens, aur compute budget sab together scale karein. Sirf model size badhaana sufficient nahi. Llama 3 ne demonstrate kiya ki high-quality data pe longer training dramatically better results deta hai. Infrastructure implication: data pipeline quality aur scale as important as GPU count.</li>
          <li>Distributed training modern LLM development ka backbone hai. Data Parallelism, Tensor Parallelism, Pipeline Parallelism, aur Expert Parallelism — sab combined (3D Parallelism) frontier models train karne ke liye. PyTorch FSDP, DeepSpeed, aur Megatron-LM enterprise standard frameworks hain.</li>
          <li>LoRA aur QLoRA ne LLM fine-tuning democratize kar diya. 70B model QLoRA fine-tuning: single H100 pe possible. Previously 8 A100s required. Production serving mein LoRA adapters enable karte hain different use cases / departments ko same base model pe efficiently serve karna.</li>
          <li>vLLM, TensorRT-LLM, SGLang, aur Triton — yeh serving frameworks enterprise LLM serving ka core hain. vLLM: flexibility, wide model support. TensorRT-LLM: maximum NVIDIA hardware performance. SGLang: aggressive prefix caching aur structured generation. Triton: enterprise multi-model serving.</li>
          <li>AI Gateway (LiteLLM, Envoy, Kong) enterprise mein architectural necessity hai — central governance, cost control, vendor flexibility, security. Without gateway: distributed teams duplicate security aur cost tracking work inconsistently.</li>
          <li>GPT-4 exact architecture officially disclosed nahi hua hai — industry mein MoE speculation hai lekin unconfirmed. Llama 3.1 405B ek dense model hai — sabse bada open-source dense frontier model. Infrastructure planning mein: verified specs pe rely karo, speculation pe nahi.</li>
          <li>DC engineers ke liye: LLM inference is a continuous, memory-intensive workload. 40-100kW per rack for GPU servers. Active model weights loaded in GPU HBM throughout inference — not swapped in and out. DLC mandatory above 40kW/rack. InfiniBand for training, NVLink for inference. These constraints shape AI Data Center design fundamentally.</li>
        </ul>
      </section>

    </article>
  );
}
