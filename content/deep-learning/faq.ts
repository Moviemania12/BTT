import type { FaqItem } from "@/lib/schemas";

export const dlFaq: FaqItem[] = [
  {
    question: "Deep Learning aur Machine Learning mein kya practical difference hai?",
    answer:
      "Both data se learn karte hain, lekin Deep Learning specifically multi-layer neural networks use karta hai aur GPU infrastructure chahiye. Traditional ML (XGBoost, SVM) structured tabular data pe often equally good ya better hai — faster, cheaper, more interpretable. Deep Learning tabhi choose karo jab unstructured data ho (images, text, audio), very large datasets ho, end-to-end learning beneficial ho, ya state-of-the-art performance required ho. Infrastructure perspective se: ML typically CPUs pe chalta hai, KB to MB model size. Deep Learning GPUs pe chalta hai, GB to hundreds of GB model size.",
  },
  {
    question: "Backpropagation kaise kaam karta hai?",
    answer:
      "Chain rule of calculus ka application hai. Output se starting, loss ke gradient output layer weights ke respect mein calculate karo. Phir yeh gradient previous layer tak chain rule se propagate karo — layer by layer, output se input tak, har weight ka gradient computed hota hai. Gradient measure karta hai ki woh weight loss ko kitna affect karta hai. Optimizer in gradients use karke weights update karta hai taaki loss reduce ho. Infrastructure perspective: backward pass forward pass se 2-3x more computationally expensive hai. Training mein activations store karne padte hain forward pass ki — gradient checkpointing se trade memory for compute.",
  },
  {
    question: "Transformer architecture kyun itna dominant ban gaya?",
    answer:
      "Parallelizable training — RNNs sequential the, Transformers parallel hain, GPU clusters effectively use ho sakte hain. Scale with compute aur data — more GPUs, more data, consistent improvement. Global context — attention allows any-to-any position relationships regardless of distance. Pre-training aur fine-tuning paradigm naturally work karta hai. Self-supervised learning massive unlabeled data pe enable karta hai. Yeh combination — parallelism, scalability, long-range dependencies, aur self-supervised pre-training — woh reason hai ki Transformers NLP se computer vision, audio, video, aur multimodal domains mein phail gaye.",
  },
  {
    question: "GPU Deep Learning ke liye CPU se kyun better hai?",
    answer:
      "Neural network training ka core operation matrix multiplication hai — inherently parallel. GPU mein 10,000-16,000+ cores hain jo simultaneously yeh operations perform karte hain. CPU mein sirf 8-128 powerful general-purpose cores hain. H100 GPU matrix multiplication mein top-end CPU se 60-80x faster hai. Large model training ke liye thousands of GPUs simultaneously kaam karte hain. Tensor Cores dedicated hardware units hain matrix multiply-accumulate operations ke liye — FP8, BF16, FP16, TF32 support. HBM3 memory 3.35 TB/s bandwidth provide karta hai — weight loading ke liye critical.",
  },
  {
    question: "CUDA kya hai aur Deep Learning mein kyun important hai?",
    answer:
      "CUDA (Compute Unified Device Architecture) NVIDIA ka parallel computing platform aur programming model hai jo GPUs ko general-purpose computation ke liye enable karta hai. Deep Learning mein CUDA foundation hai — PyTorch aur TensorFlow internally CUDA calls karte hain. CUDA stack: Application → PyTorch/TF → CUDA Runtime → cuDNN (optimized DL primitives) → NCCL (collective communications) → CUDA Driver → GPU. cuDNN GPU-optimized implementations provide karta hai convolution, attention, normalization ke liye. bina CUDA ke modern Deep Learning practically impossible hai — isliye NVIDIA ka ecosystem dominance itna strong hai.",
  },
  {
    question: "Distributed training mein data parallelism aur model parallelism mein kya difference hai?",
    answer:
      "Data Parallelism: same model, alag data batches, alag GPUs. All-reduce gradients every step via NCCL. Simplest approach. Model single GPU mein fit hona chahiye. Model Parallelism: model layers split across GPUs — GPU 1 layers 1-32, GPU 2 layers 33-64. Layer-by-layer data transfers. Suitable jab model single GPU mein fit nahi hota. Tensor Parallelism: individual layer operations split across GPUs — matrix multiplication split, different GPUs different portions compute karte hain. NVLink bandwidth critical. Pipeline Parallelism: model vertical slices, micro-batches pipeline ke through. FSDP/ZeRO: parameters + gradients + optimizer states sab sharded — effective memory reduction.",
  },
  {
    question: "Flash Attention kya hai aur kyun important hai?",
    answer:
      "Standard attention O(n²) memory use karta hai sequence length mein — full attention matrix HBM mein store karna padta hai. 32K tokens pe yeh 4GB+ memory ek attention layer ke liye. Flash Attention (Dao et al., 2022) HBM traffic minimize karta hai by computing attention in tiles — full attention matrix kabhi materialize nahi hota. Result: 2-4x speed improvement for attention computation, O(n) memory instead of O(n²). Flash Attention 2 aur 3 further improvements. Virtually all modern LLM training yeh use karta hai. Long context windows (128K tokens) Flash Attention ke bina practically infeasible the.",
  },
  {
    question: "Mixed precision training kya hai aur kaise implement karte hain?",
    answer:
      "FP32 (32-bit) parameters ko FP16 ya BF16 (16-bit) mein convert karo training ke liye. Memory 2x reduce hoti hai. Tensor Cores acceleration milti hai. BF16 preferred hai FP16 over — same exponent range as FP32 (no loss scaling needed), more numerically stable. PyTorch mein implement karna ek line: torch.cuda.amp.autocast() context manager ya trainer flag. FP32 master weights maintain karo optimizer ke liye. Result: same quality, 2x faster training, 2x less memory. H100 pe BF16 approximately 4x faster than FP32 because of Tensor Core utilization.",
  },
  {
    question: "Foundation models fine-tune karna aur training from scratch mein kya choose karein?",
    answer:
      "Training from scratch: random weights, massive data requirement, massive compute requirement (GPT-3 scale: $4-12M). Rarely necessary for applications. Fine-tuning: pre-trained weights se start karo, task-specific data pe continue. Much less data, much less compute, much faster. LoRA aur QLoRA ne further democratize kiya — 70B model fine-tuning ek H100 pe possible. Choose fine-tuning when: custom domain knowledge needed, specific behavior consistently required, proprietary data available, vernacular language support. Training from scratch tabhi consider karo jab truly unique architecture ya data hai jo existing foundation models cover nahi karte.",
  },
  {
    question: "Deep Learning model production mein deploy karne ki checklist kya hai?",
    answer:
      "Pre-deployment: (1) Latency profiling — inference time on target hardware within SLA? (2) Memory footprint — model + KV cache + batch overhead GPU memory mein fit? (3) Quantization impact — quality vs speed acceptable? (4) Stress test — peak load pe stable? (5) Training-serving consistency — same preprocessing? (6) Monitoring configured — drift detection, performance metrics? (7) Rollback plan — previous version deployable? (8) Model card documented. Infrastructure checklist: Triton/vLLM inference server configured, health checks set, auto-scaling configured, GPU utilization targets defined (70-85% for serving), alert thresholds set.",
  },
  {
    question: "GPU ECC errors kya hote hain aur production mein kaise handle karein?",
    answer:
      "ECC (Error Correcting Code) memory single-bit errors detect aur correct karta hai — double-bit errors detect karta hai but correct nahi kar sakta. Correctable ECC errors: single-bit flips jo automatically fixed hote hain. Training mein log hote hain lekin immediately critical nahi. Increasing correctable errors trend: GPU memory degrading — proactive replacement schedule karo. Uncorrectable ECC errors: immediate — training job abort karo, GPU isolate karo, OEM support contact karo. DCGM monitoring se per-GPU ECC error counts track karo. Alert configure karo: correctable errors >100/hour = warning, any uncorrectable = P1 alert.",
  },
  {
    question: "InfiniBand vs Ethernet Deep Learning training ke liye kya choose karein?",
    answer:
      "InfiniBand NDR (400Gbps): sub-microsecond latency, native RDMA, hardware-level flow control. NCCL natively optimized. Large training clusters ke liye preferred. All-reduce communication latency directly training throughput affect karta hai. High-speed Ethernet (RoCE): RDMA over Ethernet, 400GbE available. Lower hardware cost potentially. More complex to configure (PFC, ECN tuning). Viable for smaller clusters ya cost-sensitive deployments. Rule of thumb: 100+ GPU training cluster → InfiniBand. Smaller deployments → high-speed Ethernet with RoCE acceptable. Never standard Ethernet for serious distributed training — too slow.",
  },
  {
    question: "MLPerf benchmarks kya hain aur kaise use karte hain?",
    answer:
      "MLPerf industry-standard benchmarks hain jo ML hardware aur software performance measure karte hain. MLPerf Training: standard models (ResNet, BERT, GPT-3) standard datasets pe train karne ka time. Hardware vendors (NVIDIA, AMD, Google, Intel) results submit karte hain — apples-to-apples comparison. MLPerf Inference: latency aur throughput benchmarks different scenarios mein (server, edge). Use karo hardware procurement decisions mein — vendor claims verify karo. NVIDIA consistently top results training mein. MLPerf results public hain at mlcommons.org. Caveat: benchmark performance real workload performance se different ho sakti hai.",
  },
  {
    question: "Deep Learning production mein CUDA Out of Memory error kaise fix karein?",
    answer:
      "Immediate: batch size reduce karo (halve it). Gradient checkpointing enable karo: model.gradient_checkpointing_enable(). Mixed precision use karo (BF16/FP16). Gradient accumulation se effective batch size maintain karo with smaller actual batch. Diagnosis: torch.cuda.memory_summary() se memory breakdown dekho. Common causes: too large batch size, model too large for single GPU, memory fragmentation, activation memory in backward pass. Solutions: FSDP/ZeRO distribution across GPUs, CPU offloading (DeepSpeed ZeRO-Infinity), smaller model architecture, DeepSpeed memory optimization. Prevention: always test with realistic batch size before launching full training run.",
  },
  {
    question: "Production mein hallucination control kaise karein LLM ke?",
    answer:
      "Mitigation strategies: RAG (Retrieval Augmented Generation) — factual queries ke liye external knowledge base retrieve karo, model ko grounded responses generate karne do. Temperature control: lower temperature = more conservative, fewer hallucinations. RLHF/RLAIF fine-tuning: human/AI feedback se factuality improve hoti hai. Self-consistency: multiple generations, majority vote. Output verification: separate fact-checking model ya retrieval-based verification. Constitutional AI: explicit factuality rules during training. Structured output enforcement: JSON schema, function calling — constrain output format. None of yeh fully eliminate hallucination — active research problem. Production mein: always human-in-loop for high-stakes decisions.",
  },
];
