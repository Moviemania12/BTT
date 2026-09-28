import type { FaqItem } from "@/lib/schemas";

export const tpuFaq: FaqItem[] = [
  {
    question: "What is the biggest practical difference between a TPU and a GPU?",
    answer:
      "A GPU is a general-purpose parallel processor — it does everything from rendering graphics to running AI. The TPU is built specifically for matrix multiplication, which is the most common operation in a neural network. Analogy: a GPU is a Swiss Army knife (it can do a lot), a TPU is a surgeon's scalpel (it does one job extremely efficiently). Practical impact: on TensorFlow and JAX workloads a TPU is often 3-5x faster and more cost-efficient than a GPU. But for CUDA-dependent code or custom operations, a GPU is the better choice. Framework support matters too — PyTorch users have to work through the XLA compiler, which adds extra complexity.",
  },
  {
    question: "What is a Systolic Array — explain it simply?",
    answer:
      "Imagine an assembly-line factory. In a car factory one worker does their job (fit the engine), then the car moves to the next worker (fit the doors), then to the next (paint it). Each worker does their specific job and passes the result to the next worker. A Systolic Array works exactly like this. Numbers flow through a grid — each cell does its own calculation (multiply), and passes the result to the next cell. All cells work simultaneously on different numbers — like a pipeline where multiple cars are being assembled at the same time at different stages. This approach is extremely efficient for matrix multiplication because that's exactly the pattern matrix math needs — numbers flowing through rows and columns, multiplying and adding.",
  },
  {
    question: "When should you use a TPU and when is a GPU better?",
    answer:
      "Use a TPU when: you're using TensorFlow or JAX, training large transformer/LLM models, on Google Cloud and want to optimize cost, training standard neural network architectures (BERT, T5, ViT, etc.), and batch processing dominates. Use a GPU when: PyTorch with heavy custom operations, experimenting with novel architectures in research that don't compile on TPU, dependent on CUDA-specific libraries (cuDNN, cuBLAS), you need low-latency single-request inference, or a non-Google cloud or on-premises deployment. Rule of thumb: production TF/JAX training at scale = TPU. Research flexibility + PyTorch = GPU. Latency-sensitive inference = GPU (typically).",
  },
  {
    question: "What is BFloat16 and why is it important for TPUs?",
    answer:
      "BFloat16 (Brain Float 16) is a number format that uses 16 bits — different from regular Float16. Difference: BFloat16's number range equals FP32's (same 8 exponent bits), but has less precision than FP16 (only 7 mantissa bits vs FP16's 10). This is ideal for neural network training because: range matters (avoiding overflow/underflow), while precision doesn't need to be that high (approximate calculations are fine). Google introduced BFloat16 with TPU v2. On GPUs, BFloat16 support arrived with the A100. Today it's the standard format for LLM training — Llama, Gemini, GPT are all trained in BFloat16.",
  },
  {
    question: "What is a TPU Pod and how many TPUs does one Pod contain?",
    answer:
      "A TPU Pod connects multiple TPU chips into a unified supercomputer — through a high-speed custom interconnect. Different versions have different scale: TPU v2 Pod: 512 chips, ~11.5 PFLOPS. TPU v3 Pod: 1,024 chips, ~100 PFLOPS. TPU v4 Pod: 4,096 chips, ~1.1 EFLOPS (exaflop). TPU v5e Pod: in various configurations. TPU v4 Pod is Google's current largest publicly available configuration. Chips inside a Pod are connected via a high-speed 3D torus interconnect — any chip can communicate directly with any other chip at high bandwidth. Google has trained Gemini models on multiple TPU v4 Pods simultaneously.",
  },
  {
    question: "Cloud TPU vs on-premises GPU — when should you choose which?",
    answer:
      "Choose Cloud TPU when: you use TensorFlow/JAX, have variable workloads (pay-per-use is better), already use the Google Cloud ecosystem, do large-scale training on an occasional basis, and want to avoid capital expenditure. Choose on-premises GPU when: you have data sovereignty/compliance concerns (RBI, HIPAA), consistently high utilization (>70%), are deeply invested in the PyTorch ecosystem, need custom hardware control, or the long-term TCO calculation favors on-prem. Hybrid approach: Cloud TPU for training, on-premises GPU for inference serving. Important: TPU is not available on-premises (Google-only hardware) — that's a fundamental constraint in decision-making.",
  },
  {
    question: "What is the XLA compiler and why is it needed with a TPU?",
    answer:
      "XLA (Accelerated Linear Algebra) is a compiler that converts high-level code (TensorFlow, JAX, PyTorch) into the TPU's specific machine language. Analogy: you wrote instructions in Hindi, and XLA is a translator that converts those instructions into the TPU's native language. What XLA does: optimizes the computation graph (removes unnecessary steps), fuses multiple operations together (reduces memory trips), generates code optimal for the TPU's systolic array, and restructures memory layout. For PyTorch: the torch_xla library is used to run PyTorch operations on a TPU through XLA. Limitation: custom ops that XLA doesn't understand won't run on a TPU — that's a key practical difference between GPU and TPU.",
  },
  {
    question: "What changed from TPU v1 to v5e — a quick summary?",
    answer:
      "TPU v1 (2016): inference only, 92 TOPS, 8-bit integer, edge deployment. TPU v2 (2017): training support, HBM memory, BFloat16, 45 TFLOPS per chip, liquid cooling. TPU v3 (2018): 420 TFLOPS per chip, 32GB HBM2, advanced cooling. TPU v4 (2021): 275 TFLOPS BF16 per chip (but 2x with sparsity = ~550), optical interconnect, 4096-chip Pods, Gemini training. TPU v5e (2023): efficiency-focused variant, best performance per dollar for medium workloads, not for the edge, more accessible pricing. TPU v5p (2023): highest-performance variant, large-scale training. Each generation brings: more compute, more memory, better interconnect, better energy efficiency.",
  },
  {
    question: "How much power does a TPU consume and what does a data center specifically need?",
    answer:
      "Individual TPU chip: TPU v4 ~200W. TPU board (4 chips): ~800W. A full TPU v4 Pod rack equivalent: tens of kilowatts. Data center requirements: liquid cooling is mandatory — TPU boards are directly liquid-cooled (air cooling is insufficient at this density). Power density: similar challenge to GPU servers — in the 40-100kW per rack range. Network: high-speed interconnect (ICI — Inter-Chip Interconnect) internally. Storage: Google Colossus distributed storage, fast object storage (GCS). Comparison with GPU: power consumption is similar per FLOP, but TPU often delivers more FLOPS per watt for matrix workloads. Google's data centers: TPU-optimized cooling and power distribution in specifically designed facilities.",
  },
  {
    question: "How do Gemini, PaLM, and Google's AI models get trained on TPU?",
    answer:
      "Google's large models are trained across multiple TPU v4 Pods spanning multiple data centers. Process: model sharding — the model is too big to fit on one chip, so layers are split across different chips. Data parallelism — same model, different data batches, across thousands of chips simultaneously. Pipeline parallelism — the first part of the model on chip group 1, the second part on chip group 2. The JAX/T5X framework is used (Google is shifting from TensorFlow toward JAX). Checkpointing: frequent saves to Google Colossus (every few minutes). Scale: Gemini Ultra training reportedly used 16,000+ TPU v4 chips. Communication: ICI interconnect between chips, data center fiber across pods. Training cost: hundreds of millions of dollars at this scale.",
  },
  {
    question: "How different is using PyTorch on a TPU compared to a GPU?",
    answer:
      "PyTorch on GPU: import torch, model.cuda(), loss.backward() — works directly. PyTorch on TPU: import the torch_xla library, use xm.xla_device(), special synchronization is needed (xm.mark_step()), XLA trace warnings are possible. Differences: compilation step — slow the first time (XLA compiles the graph), fast on subsequent runs. Dynamic shapes issue: XLA prefers static shapes — dynamic tensor shapes trigger recompilation. Custom CUDA kernels: won't run. Debugging: values aren't easily available from print statements — it's a lazy evaluation mode. Community: the GPU PyTorch ecosystem is larger — more tutorials, StackOverflow answers, library support. Recommendation: use JAX if you choose TPU — the native experience is much better.",
  },
  {
    question: "What's the future of the TPU — what is Google planning next?",
    answer:
      "Near-term (2024-25): rollout of TPU v5p and v5e — more accessible pricing, better efficiency. Trillium (TPU v6): next generation, announced at Google IO 2024, claimed 4.7x performance improvement over v5e. Optical interconnects: started with v4, more advanced in future pods. Multi-modal workloads: optimization for text + image + video training. Edge TPUs: already exist (Coral Edge TPU) — more powerful embedded versions in the future. Competitive response: as NVIDIA keeps improving (Blackwell, Rubin), Google's TPU will need to maintain pace. Google's strategy: it uses TPU internally (Gemini, Search AI) and monetizes Cloud TPU through Google Cloud. Open question: will Google sell TPU on-premises? Not yet, but possible in the future.",
  },
];
