import type { FaqItem } from "@/lib/schemas";

export const dlFaq: FaqItem[] = [
  {
    question: "What is the practical difference between Deep Learning and Machine Learning?",
    answer:
      "Both learn from data, but Deep Learning specifically uses multi-layer neural networks and needs GPU infrastructure. Traditional ML (XGBoost, SVM) is often just as good or better on structured tabular data — faster, cheaper, more interpretable. Choose Deep Learning when you have unstructured data (images, text, audio), very large datasets, end-to-end learning is beneficial, or state-of-the-art performance is required. From an infrastructure perspective: ML typically runs on CPUs, with KB to MB model sizes. Deep Learning runs on GPUs, with GB to hundreds of GB model sizes.",
  },
  {
    question: "How does backpropagation work?",
    answer:
      "It is an application of the chain rule of calculus. Starting from the output, calculate the gradient of the loss with respect to the output layer weights. Then propagate this gradient back to the previous layer via the chain rule — layer by layer, from output to input, computing the gradient for every weight. The gradient measures how much that weight affects the loss. The optimizer uses these gradients to update the weights so the loss decreases. Infrastructure perspective: the backward pass is 2-3x more computationally expensive than the forward pass. Training requires storing the forward pass's activations — gradient checkpointing trades memory for compute.",
  },
  {
    question: "Why did the Transformer architecture become so dominant?",
    answer:
      "Parallelizable training — RNNs were sequential, Transformers are parallel, and can effectively use GPU clusters. Scales with compute and data — more GPUs, more data, consistent improvement. Global context — attention allows any-to-any position relationships regardless of distance. The pre-training and fine-tuning paradigm works naturally. It enables self-supervised learning on massive unlabeled data. This combination — parallelism, scalability, long-range dependencies, and self-supervised pre-training — is why Transformers spread from NLP into computer vision, audio, video, and multimodal domains.",
  },
  {
    question: "Why is a GPU better than a CPU for Deep Learning?",
    answer:
      "The core operation of neural network training is matrix multiplication — inherently parallel. A GPU has 10,000-16,000+ cores that perform these operations simultaneously. A CPU has only 8-128 powerful general-purpose cores. An H100 GPU is 60-80x faster than a top-end CPU at matrix multiplication. For large model training, thousands of GPUs work simultaneously. Tensor Cores are dedicated hardware units for matrix multiply-accumulate operations — supporting FP8, BF16, FP16, TF32. HBM3 memory provides 3.35 TB/s bandwidth — critical for weight loading.",
  },
  {
    question: "What is CUDA and why is it important in Deep Learning?",
    answer:
      "CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform and programming model that enables GPUs for general-purpose computation. In Deep Learning, CUDA is the foundation — PyTorch and TensorFlow internally make CUDA calls. The CUDA stack: Application → PyTorch/TF → CUDA Runtime → cuDNN (optimized DL primitives) → NCCL (collective communications) → CUDA Driver → GPU. cuDNN provides GPU-optimized implementations for convolution, attention, normalization. Modern Deep Learning is practically impossible without CUDA — that's why NVIDIA's ecosystem dominance is so strong.",
  },
  {
    question: "What is the difference between data parallelism and model parallelism in distributed training?",
    answer:
      "Data Parallelism: same model, different data batches, different GPUs. All-reduce gradients every step via NCCL. Simplest approach. The model needs to fit on a single GPU. Model Parallelism: model layers split across GPUs — GPU 1 gets layers 1-32, GPU 2 gets layers 33-64. Layer-by-layer data transfers. Suitable when the model doesn't fit on a single GPU. Tensor Parallelism: individual layer operations split across GPUs — the matrix multiplication itself is split, with different GPUs computing different portions. NVLink bandwidth is critical. Pipeline Parallelism: vertical slices of the model, with micro-batches passing through the pipeline. FSDP/ZeRO: parameters + gradients + optimizer states are all sharded — effective memory reduction.",
  },
  {
    question: "What is Flash Attention and why is it important?",
    answer:
      "Standard attention uses O(n²) memory in sequence length — the full attention matrix has to be stored in HBM. At 32K tokens that's 4GB+ memory for a single attention layer. Flash Attention (Dao et al., 2022) minimizes HBM traffic by computing attention in tiles — the full attention matrix is never materialized. Result: 2-4x speed improvement for attention computation, O(n) memory instead of O(n²). Flash Attention 2 and 3 bring further improvements. Virtually all modern LLM training uses it. Long context windows (128K tokens) were practically infeasible without Flash Attention.",
  },
  {
    question: "What is mixed precision training and how do you implement it?",
    answer:
      "Convert FP32 (32-bit) parameters to FP16 or BF16 (16-bit) for training. Memory is reduced 2x. You get Tensor Core acceleration. BF16 is preferred over FP16 — same exponent range as FP32 (no loss scaling needed), more numerically stable. Implementing it in PyTorch is one line: the torch.cuda.amp.autocast() context manager or a trainer flag. Maintain FP32 master weights for the optimizer. Result: same quality, 2x faster training, 2x less memory. On an H100, BF16 is approximately 4x faster than FP32 because of Tensor Core utilization.",
  },
  {
    question: "Should you fine-tune a foundation model or train from scratch?",
    answer:
      "Training from scratch: random weights, massive data requirement, massive compute requirement (GPT-3 scale: $4-12M). Rarely necessary for applications. Fine-tuning: start from pre-trained weights, continue on task-specific data. Much less data, much less compute, much faster. LoRA and QLoRA have democratized this further — fine-tuning a 70B model on a single H100 is possible. Choose fine-tuning when: custom domain knowledge is needed, specific behavior is consistently required, proprietary data is available, vernacular language support. Only consider training from scratch when you have a truly unique architecture or data that existing foundation models don't cover.",
  },
  {
    question: "What is the checklist for deploying a Deep Learning model to production?",
    answer:
      "Pre-deployment: (1) Latency profiling — is inference time on target hardware within SLA? (2) Memory footprint — do model + KV cache + batch overhead fit in GPU memory? (3) Quantization impact — is the quality vs speed trade-off acceptable? (4) Stress test — stable under peak load? (5) Training-serving consistency — same preprocessing? (6) Monitoring configured — drift detection, performance metrics? (7) Rollback plan — is the previous version deployable? (8) Model card documented. Infrastructure checklist: Triton/vLLM inference server configured, health checks set, auto-scaling configured, GPU utilization targets defined (70-85% for serving), alert thresholds set.",
  },
  {
    question: "What are GPU ECC errors and how do you handle them in production?",
    answer:
      "ECC (Error Correcting Code) memory detects and corrects single-bit errors — it detects but cannot correct double-bit errors. Correctable ECC errors: single-bit flips that get fixed automatically. Logged during training but not immediately critical. An increasing trend of correctable errors: the GPU memory is degrading — schedule proactive replacement. Uncorrectable ECC errors: immediate — abort the training job, isolate the GPU, contact OEM support. Track per-GPU ECC error counts via DCGM monitoring. Configure alerts: correctable errors >100/hour = warning, any uncorrectable = P1 alert.",
  },
  {
    question: "InfiniBand or Ethernet — which should you choose for Deep Learning training?",
    answer:
      "InfiniBand NDR (400Gbps): sub-microsecond latency, native RDMA, hardware-level flow control. Natively optimized by NCCL. Preferred for large training clusters. All-reduce communication latency directly affects training throughput. High-speed Ethernet (RoCE): RDMA over Ethernet, 400GbE available. Potentially lower hardware cost. More complex to configure (PFC, ECN tuning). Viable for smaller clusters or cost-sensitive deployments. Rule of thumb: 100+ GPU training cluster → InfiniBand. Smaller deployments → high-speed Ethernet with RoCE is acceptable. Never use standard Ethernet for serious distributed training — too slow.",
  },
  {
    question: "What are MLPerf benchmarks and how are they used?",
    answer:
      "MLPerf is a set of industry-standard benchmarks that measure ML hardware and software performance. MLPerf Training: the time to train standard models (ResNet, BERT, GPT-3) on standard datasets. Hardware vendors (NVIDIA, AMD, Google, Intel) submit results — an apples-to-apples comparison. MLPerf Inference: latency and throughput benchmarks across different scenarios (server, edge). Use it in hardware procurement decisions — to verify vendor claims. NVIDIA consistently posts top training results. MLPerf results are public at mlcommons.org. Caveat: benchmark performance can differ from real workload performance.",
  },
  {
    question: "How do you fix a CUDA Out of Memory error in Deep Learning production?",
    answer:
      "Immediate: reduce batch size (halve it). Enable gradient checkpointing: model.gradient_checkpointing_enable(). Use mixed precision (BF16/FP16). Use gradient accumulation to maintain effective batch size with a smaller actual batch. Diagnosis: check the memory breakdown with torch.cuda.memory_summary(). Common causes: batch size too large, model too large for a single GPU, memory fragmentation, activation memory in the backward pass. Solutions: FSDP/ZeRO distribution across GPUs, CPU offloading (DeepSpeed ZeRO-Infinity), a smaller model architecture, DeepSpeed memory optimization. Prevention: always test with a realistic batch size before launching a full training run.",
  },
  {
    question: "How do you control hallucination in an LLM in production?",
    answer:
      "Mitigation strategies: RAG (Retrieval Augmented Generation) — retrieve from an external knowledge base for factual queries, let the model generate grounded responses. Temperature control: lower temperature = more conservative, fewer hallucinations. RLHF/RLAIF fine-tuning: factuality improves with human/AI feedback. Self-consistency: multiple generations, majority vote. Output verification: a separate fact-checking model or retrieval-based verification. Constitutional AI: explicit factuality rules during training. Structured output enforcement: JSON schema, function calling — constrain the output format. None of these fully eliminate hallucination — it's an active research problem. In production: always keep a human in the loop for high-stakes decisions.",
  },
];
