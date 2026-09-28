"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiGpuContent } from "@/content/ai-gpu";

import CpuVsGpuDiagram from "../svg/CpuVsGpuDiagram";
import GpuArchitectureDiagram from "../svg/GpuArchitectureDiagram";
import StreamingMultiprocessorDiagram from "../svg/StreamingMultiprocessorDiagram";
import TensorCoreDiagram from "../svg/TensorCoreDiagram";
import HbmMemoryDiagram from "../svg/HbmMemoryDiagram";
import NvlinkDiagram from "../svg/NvlinkDiagram";
import MigDiagram from "../svg/MigDiagram";
import DgxServerDiagram from "../svg/DgxServerDiagram";
import GpuClusterDiagram from "../svg/GpuClusterDiagram";
import AiFactoryDiagram from "../svg/AiFactoryDiagram";

void aiGpuContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          When an AI model runs — whether it's ChatGPT, image generation, or your company's customer service bot — a GPU is working behind it. The GPU (Graphics Processing Unit) was originally built for video games. But one discovery changed everything: the job the GPU did for graphics — thousands of small calculations simultaneously — turned out to be perfect for AI too.
        </p>
        <p style={S.p}>
          Today's AI GPUs — NVIDIA H100, B200, AMD MI300X — are specifically designed so massive neural networks can train, billions of parameters can fit in memory, and millions of users can be served simultaneously. This isn't "just a chip" — it's the heart of AI infrastructure.
        </p>
        <Callout type="important" title="This Article's Goal">
          By the end of this article you'll know: how a GPU works internally, why it's better than a CPU for AI, and how a production AI factory is built — from the GPU chip all the way to a multi-megawatt data center.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>DC Engineers and Facility Engineers:</strong> Learn why GPU servers consume so much power, why liquid cooling is mandatory, and what a GPU rack's weight, heat, and power draw look like.</li>
          <li><strong>IT Infrastructure Engineers:</strong> GPU cluster planning, server selection (DGX vs HGX), networking requirements, and storage design.</li>
          <li><strong>AI/MLOps Engineers:</strong> Understanding GPU internals — Tensor Cores, HBM, NVLink, CUDA — so training and inference can be optimized.</li>
          <li><strong>Students and Freshers:</strong> The difference between CPU and GPU, the history of GPU computing, and the role of GPUs in AI — a completely beginner-friendly explanation.</li>
          <li><strong>Project Managers and Architects:</strong> A foundation for GPU procurement planning, cost modeling, and enterprise deployment decisions.</li>
          <li><strong>Cloud Engineers:</strong> Understanding GPU instance types — A100, H100, L4, T4 — and when to use which.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>The fundamental difference between CPU and GPU — and why GPU made AI possible</li>
          <li>The GPU's internal architecture — CUDA Cores, Tensor Cores, Streaming Multiprocessors, Warps</li>
          <li>What HBM is and why it's so different from regular RAM</li>
          <li>NVLink, NVSwitch, PCIe — the complete picture of GPU communication</li>
          <li>DGX and HGX servers — building blocks of enterprise AI compute</li>
          <li>MIG (Multi-Instance GPU) — splitting one GPU into multiple isolated instances</li>
          <li>GPU clusters and AI factories — the largest AI infrastructure</li>
          <li>Cooling, power, monitoring, and failure handling</li>
          <li>AMD GPUs and ROCm — a practical assessment of the NVIDIA alternative</li>
          <li>Cost planning and the future GPU roadmap</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ─────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="llm" variant="inline" /> — LLM training and inference workloads that run on GPUs</li>
          <li><strong>Current:</strong> AI GPU — the hardware that runs every AI workload</li>
          <li><strong>Next:</strong> <TopicLink slug="gpu-cluster" variant="inline" /> — how multiple GPUs connect into training clusters</li>
          <li><strong>Related:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="ai-cooling" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ──────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          Imagine a highway.
        </p>
        <p style={S.p}>
          A CPU is a luxury highway — 8 or 16 lanes, each lane has a highly skilled driver who can make complicated decisions. This driver understands traffic lights, plans routes, can take a U-turn in an emergency. Very capable. But only 8-16 cars can go at a time.
        </p>
        <p style={S.p}>
          A GPU is a completely different thing — imagine a 10,000-lane road where every driver does just one simple task: go straight, maintain speed. No single driver is complicated. But 10,000 people are moving simultaneously.
        </p>
        <p style={S.p}>
          AI's job is mostly simple but happens at massive scale — multiply this number, add that number, activate this neuron, pass this value forward. This job doesn't need one genius CPU driver — it needs 10,000 simple workers all working simultaneously. That's a GPU.
        </p>
        <p style={S.p}>
          In 2012, Alex Krizhevsky trained a deep neural network for the ImageNet competition — on two NVIDIA GTX 580 GPUs. The result shocked everyone: 10% better accuracy than the previous best methods. This was the "AlexNet moment" — proof that GPU + deep learning = AI revolution is possible. From that day to today, the GPU remains the foundation of AI infrastructure.
        </p>
      </section>

      {/* ─── HISTORY ───────────────────────────────────────────────────── */}
      <section id="history">
        <h2 style={S.h2}>History of GPU Computing</h2>
        <ul style={S.ul}>
          <li><strong>1990s — Gaming Era:</strong> GPUs were originally built for 3D games. Silicon Graphics, 3dfx, then NVIDIA and AMD built specialized chips that could quickly color millions of pixels — parallel computation, naturally.</li>
          <li><strong>1999 — NVIDIA GeForce 256:</strong> NVIDIA used the term "GPU" for the first time. The first chip that could do geometry calculations on-chip.</li>
          <li><strong>2006 — CUDA Launch:</strong> A game changer. For the first time, developers could write general-purpose programs on a GPU. Scientists and researchers started using the GPU like a supercomputer.</li>
          <li><strong>2012 — AlexNet:</strong> Two GPUs. One result that changed the world. Deep learning + GPU = AI revolution confirmed.</li>
          <li><strong>2016 — NVIDIA Pascal (P100):</strong> The first GPU specifically designed for AI. FP16 support — 2x faster for neural networks vs FP32.</li>
          <li><strong>2017 — Volta (V100) and Tensor Cores:</strong> Specialized hardware for matrix multiplication — AI's most common operation. AI performance improved dramatically.</li>
          <li><strong>2020 — Ampere (A100):</strong> 80GB HBM2e, third-gen Tensor Cores, MIG support. Modern enterprise AI GPU benchmark bana.</li>
          <li><strong>2022 — Hopper (H100):</strong> The current production standard. FP8 via Transformer Engine, 80GB HBM3, NVLink 4.0. Designed for LLM training.</li>
          <li><strong>2024-25 — Blackwell (B100/B200/GB200):</strong> Next generation. Higher compute, 192GB HBM3e, NVLink 5.0, GB200 NVL72 rack-scale solution.</li>
        </ul>
      </section>

      {/* ─── CPU VS GPU ────────────────────────────────────────────────── */}
      <section id="cpu-vs-gpu">
        <h2 style={S.h2}>CPU vs GPU — The Fundamental Difference</h2>
        <p style={S.p}>
          Imagine a math exam. 1000 addition problems to solve.
        </p>
        <p style={S.p}>
          <strong>CPU approach:</strong> There's one very intelligent student. They solve one problem — check it carefully — then move to the next. If the problem is complex, this student will understand it. But only one thing at a time.
        </p>
        <p style={S.p}>
          <strong>GPU approach:</strong> There are 1000 average students. Each student takes exactly one problem. Everyone works simultaneously. Complex problems aren't for them — but simple problems — unbeatable.
        </p>
        <Figure caption="CPU has 8–16 powerful cores for complex sequential tasks. GPU has thousands of simple cores for parallel AI math. Same operation on millions of numbers — GPU wins every time.">
          <CpuVsGpuDiagram />
        </Figure>
        <ComparisonTable
          title="CPU vs GPU — Key Differences"
          headers={["Property", "Intel Xeon (CPU)", "NVIDIA H100 (GPU)"]}
          rows={[
            ["Core Count", "60 (high-end server)", "16,896 CUDA Cores"],
            ["Core Design", "Complex, out-of-order, branch prediction", "Simple, lightweight arithmetic units"],
            ["Memory Bandwidth", "~300 GB/s (DDR5)", "3.35 TB/s (HBM3)"],
            ["AI Performance (FP16 Tensor)", "~6 TFLOPS", "~2,000 TFLOPS (dense)"],
            ["AI Performance (FP8 Tensor)", "Not applicable", "~3,958 TFLOPS (sparse)"],
            ["Power (TDP)", "350W", "700W"],
            ["Memory Capacity", "Up to 4TB (system RAM)", "80GB (HBM3)"],
            ["Best For", "OS, databases, complex logic, web servers", "Matrix math, neural networks, parallel compute"],
          ]}
        />
        <Callout type="important" title="Why Memory Bandwidth Matters So Much">
          LLM inference's primary bottleneck is memory bandwidth, not compute. Generating a token means: reading the model weights (140GB for a 70B model) from GPU memory at every step. The H100's 3.35 TB/s bandwidth delivers data to the cores ~33x faster than a CPU's 100 GB/s. This is exactly why GPUs are essential for AI.
        </Callout>
      </section>

      {/* ─── GPU ARCHITECTURE ──────────────────────────────────────────── */}
      <section id="gpu-architecture">
        <h2 style={S.h2}>GPU Architecture — Inside the Chip</h2>
        <p style={S.p}>
          Now let's go inside the GPU. Let's start with a simple analogy: a large factory.
        </p>
        <p style={S.p}>
          <strong>Factory (GPU chip)</strong> → <strong>Departments (GPC — GPU Division)</strong> → <strong>Teams (SM — Work Unit)</strong> → <strong>Workers (CUDA Cores, Tensor Cores)</strong>
        </p>
        <Figure caption="GPU Architecture: The chip is divided into GPU Divisions (GPC), each containing multiple Work Units (SM). Each SM has CUDA Cores for general math, Tensor Cores for AI matrix operations, and fast local storage.">
          <GpuArchitectureDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>GPC (GPU Division / Graphics Processing Cluster):</strong> The GPU's highest-level organizational unit. The H100 has 8 GPCs. Each GPC has multiple SMs.</li>
          <li><strong>SM (Work Unit / Streaming Multiprocessor):</strong> The GPU's most important unit. This is where the work happens. The H100 has 132 SMs. Each SM is a self-contained mini-processor with its own cores, schedulers, and fast memory.</li>
          <li><strong>L2 Cache:</strong> Shared on-chip storage across all SMs. H100: 40MB. Much faster access than HBM.</li>
        </ul>

        <h3 style={S.h3}>SM — Work Unit (Streaming Multiprocessor)</h3>
        <Figure caption="One Work Unit (SM): Work Manager (Warp Scheduler) assigns groups of 32 threads (Warps) to CUDA Cores and Tensor Cores. Registers and Shared Memory provide ultra-fast per-SM storage. All 132 SMs work simultaneously.">
          <StreamingMultiprocessorDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>CUDA Cores:</strong> General-purpose arithmetic units — FP32, FP64, integer operations. 128 per SM in H100. Total: 132 × 128 = 16,896 CUDA Cores.</li>
          <li><strong>Tensor Core units:</strong> Specialized matrix multiplication hardware for AI. 4 units per SM in H100. Dramatically more efficient than CUDA Cores for neural network math.</li>
          <li><strong>Register File:</strong> Ultra-fast per-thread temporary storage. Fastest memory in the GPU — faster than even shared memory.</li>
          <li><strong>Shared Memory / L1 Cache:</strong> Shared within one SM. Programmers explicitly manage this. Key for optimization.</li>
          <li><strong>Warp Scheduler (Work Manager):</strong> Assigns work to cores. Manages multiple warps simultaneously — when one warp waits for memory, another executes. This "latency hiding" is why GPU is not slowed by memory latency as much as CPU.</li>
        </ul>

        <h3 style={S.h3}>Warp — The GPU's Group of 32</h3>
        <p style={S.p}>
          A Warp = 32 threads that execute the same instruction simultaneously. This is the GPU's SIMT model — Single Instruction, Multiple Threads. It means: one instruction is issued, and all 32 threads execute that same instruction on different data, simultaneously.
        </p>
        <p style={S.p}>
          Just like soldiers in an army move in squads — not individually, but together — threads execute in "warps" on a GPU. One SM can manage multiple warps simultaneously — when one warp is waiting on memory, another warp executes. This is called "latency hiding."
        </p>
        <Callout type="warning" title="Warp Divergence — Code Likhte Waqt Dhyan Rakho">
          If the 32 threads in a warp take different branches (if/else), the GPU has to serialize both branches — performance drops. Use uniform operations in AI code — align batch size to multiples of warp size for best efficiency.
        </Callout>
      </section>

      {/* ─── CUDA CORES ────────────────────────────────────────────────── */}
      <section id="cuda-cores">
        <h2 style={S.h2}>CUDA Cores — The General Workers</h2>
        <p style={S.p}>
          The CUDA Core is the GPU's basic arithmetic unit. Important to understand: a CUDA Core is a lightweight arithmetic execution unit — it's not a CPU core. Comparing it directly to a CPU core would be misleading. A CPU core handles complex logic, branch prediction, large cache management. A CUDA Core simply: does math, fast, simple.
        </p>
        <p style={S.p}>
          A CUDA Core can do one floating-point operation per clock cycle — addition or multiplication (or both together — Fused Multiply-Add, FMA). The H100 has 16,896 CUDA Cores. At 1.98 GHz, theoretical FP32 peak: 16,896 × 2 (FMA) × 1.98 GHz ≈ 67 TFLOPS.
        </p>
        <ul style={S.ul}>
          <li><strong>What CUDA Cores do:</strong> General FP32/FP64 math, integer operations, activation functions (ReLU, GELU), softmax, layer normalization — anything that is not a matrix multiply.</li>
          <li><strong>What CUDA Cores don&apos;t do efficiently:</strong> Large matrix multiplications — that is Tensor Core territory.</li>
          <li><strong>In production:</strong> Both CUDA Cores and Tensor Cores run simultaneously. Tensor Cores do the heavy matrix math, CUDA Cores handle everything else.</li>
        </ul>
      </section>

      {/* ─── TENSOR CORES ──────────────────────────────────────────────── */}
      <section id="tensor-cores">
        <h2 style={S.h2}>Tensor Cores — The AI Accelerators</h2>
        <p style={S.p}>
          Tensor Cores are what set the AI GPU apart from an ordinary GPU. NVIDIA's most important innovation for AI compute.
        </p>
        <p style={S.p}>
          <strong>Simple explanation:</strong> A CUDA Core picks up a brick, weighs it, sets it down — one brick at a time. A Tensor Core takes the blueprint of an entire building and processes it in a single operation — specialized matrix multiplication hardware.
        </p>
        <p style={S.p}>
          Neural network layers are essentially matrix multiplications. Tensor Cores are specifically designed for this operation. The actual speedup depends on architecture, workload, matrix size, and precision (FP16/BF16/FP8) — combined, these factors can produce an improvement anywhere from several times to tens of times faster vs CUDA Cores alone.
        </p>
        <Figure caption="CUDA Core does one number at a time. Tensor Core processes an entire matrix in one specialized hardware operation — much more efficient for neural network layers. Actual performance gain depends on architecture, workload, and precision used.">
          <TensorCoreDiagram />
        </Figure>

        <h3 style={S.h3}>Precision Formats Explained</h3>
        <p style={S.p}>
          AI doesn't run only in FP32. Choosing a precision format is a balance between performance and quality:
        </p>
        <ComparisonTable
          title="Precision Formats — Performance vs Quality"
          headers={["Format", "Bits", "Use Case", "H100 Peak (Tensor Core)"]}
          rows={[
            ["FP32", "32-bit", "Scientific compute, high precision", "~67 TFLOPS (CUDA Cores, no Tensor)"],
            ["TF32", "19-bit effective", "Drop-in FP32 replacement on A100+", "~989 TFLOPS dense (H100)"],
            ["BF16", "16-bit", "LLM training (stable range)", "~1,979 TFLOPS dense (H100)"],
            ["FP16", "16-bit", "LLM inference, training", "~1,979 TFLOPS dense (H100)"],
            ["FP8 (via Transformer Engine)", "8-bit", "H100+ training, inference", "~3,958 TFLOPS sparse (H100)"],
            ["INT8", "8-bit", "Quantized inference (post-training)", "~3,958 TOPS sparse (H100)"],
            ["INT4", "4-bit", "Aggressive quantization", "~7,916 TOPS sparse (H100)"],
            ["FP4/FP6", "4-6 bit", "Blackwell only — emerging", "B200 higher than H100"],
          ]}
        />
        <Callout type="best-practice" title="FP8 Mixed Precision Training">
          On the H100, use FP8 Mixed Precision Training through the NVIDIA Transformer Engine. The Transformer Engine automatically decides FP8 vs BF16 per layer per step — it manages scaling factors automatically. Quality is comparable to BF16 training, throughput is significantly better. It's the emerging standard for production LLM training.
        </Callout>

        <h3 style={S.h3}>Tensor Core Generations</h3>
        <ComparisonTable
          headers={["Generation", "GPU", "New Precision Support", "Notable Change"]}
          rows={[
            ["1st Gen", "V100 (Volta, 2017)", "FP16", "First Tensor Cores — AI performance breakthrough"],
            ["2nd Gen", "A100 (Ampere, 2020)", "FP16, BF16, TF32, INT8, INT4", "Sparsity support — 2× effective performance"],
            ["3rd Gen", "A100 80GB (Ampere)", "Same", "Incremental improvements"],
            ["4th Gen", "H100 (Hopper, 2022)", "FP8 via Transformer Engine", "FP8 training — ~2× vs BF16 for LLMs"],
            ["5th Gen", "B200 (Blackwell, 2024)", "FP4, FP6, FP8, FP16, BF16", "Higher throughput vs H100 across precisions"],
          ]}
        />
      </section>

      {/* ─── RT CORES ──────────────────────────────────────────────────── */}
      <section id="rt-cores">
        <h2 style={S.h2}>RT Cores — The Other Specialist</h2>
        <p style={S.p}>
          RT Cores (Ray Tracing Cores) are for real-time ray tracing — mostly gaming and visualization. They have no direct use in AI training.
        </p>
        <p style={S.p}>
          Worth mentioning because: NVIDIA consumer GeForce GPUs have RT Cores. Data center AI GPUs (A100, H100) don't have RT Cores — unnecessary for AI, and the die area is optimized for AI-useful components instead. If someone recommends buying a data center GPU because of RT Cores, that's the wrong criteria.
        </p>
      </section>

      {/* ─── HBM MEMORY ────────────────────────────────────────────────── */}
      <section id="hbm-memory">
        <h2 style={S.h2}>HBM — The Memory That Makes AI Possible</h2>
        <p style={S.p}>
          Memory is the most critical factor in GPU performance. HBM (High Bandwidth Memory) is the technology that makes modern AI feasible.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> A GPU is a chef and memory is an ingredient shelf. Normal RAM: the ingredients are in another room. The chef has to keep going to that other room. HBM: the ingredients are right on the chef's kitchen counter — no travel time.
        </p>
        <p style={S.p}>
          HBM literally sits in the same package as the GPU chip, using Through-Silicon Vias (TSVs) — microscopic vertical connections through silicon layers. The primary advantage: extremely high memory bandwidth. A latency improvement exists too, but bandwidth is the major benefit.
        </p>
        <Figure caption="HBM Fast GPU Memory is stacked directly next to the GPU chip in the same package — ultra-wide 1024-bit bus gives 3.35 TB/s bandwidth. Regular DDR RAM sits far away on the motherboard with a narrow 32-bit bus — only ~100 GB/s.">
          <HbmMemoryDiagram />
        </Figure>
        <ComparisonTable
          title="HBM Generations — Memory Evolution"
          headers={["Memory Type", "GPU", "Capacity", "Bandwidth", "Key Advantage"]}
          rows={[
            ["GDDR6X", "Consumer GPUs (RTX 4090)", "24GB", "~1 TB/s", "Cost-effective, good for smaller models"],
            ["HBM2e", "A100 (Ampere)", "80GB", "2 TB/s", "First widely deployed HBM in AI servers"],
            ["HBM3", "H100 (Hopper)", "80GB", "3.35 TB/s", "~1.7× bandwidth vs HBM2e"],
            ["HBM3e", "B200 (Blackwell), MI300X", "192GB", "~8 TB/s (B200)", "2× capacity, major LLM serving upgrade"],
          ]}
        />
        <Callout type="important" title="HBM Capacity and LLM Planning">
          A 70B model at FP16 = 140GB. It doesn't fit in an H100 (80GB HBM3) alone — 2 H100s minimum. It fits easily in an AMD MI300X (192GB HBM3e) — the memory capacity advantage is real for large model inference. Check HBM capacity first when selecting a GPU.
        </Callout>
      </section>

      {/* ─── PCIE ──────────────────────────────────────────────────────── */}
      <section id="pcie">
        <h2 style={S.h2}>PCIe — Connection to the Outside World</h2>
        <p style={S.p}>
          PCIe (Peripheral Component Interconnect Express) is the interface that connects the GPU to the CPU and the system. It's the highway between GPU and CPU — data goes in and out on this highway.
        </p>
        <ComparisonTable
          headers={["PCIe Generation", "Bandwidth (each direction)", "Bidirectional Total", "GPU Example"]}
          rows={[
            ["PCIe 3.0 x16", "8 GB/s", "16 GB/s total", "Older GPUs"],
            ["PCIe 4.0 x16", "16 GB/s", "32 GB/s total", "A100 PCIe variant"],
            ["PCIe 5.0 x16", "64 GB/s", "128 GB/s total", "H100, B200 (current standard)"],
          ]}
        />
        <p style={S.p}>
          <strong>H100:</strong> PCIe Gen 5 × 16 = 64 GB/s each direction, 128 GB/s bidirectional aggregate.
        </p>
        <Callout type="warning" title="PCIe Bottleneck for Multi-GPU">
          GPU-to-GPU communication over PCIe is slow: GPU1 → CPU → GPU2. PCIe Gen5's 128 GB/s bidirectional bandwidth is 7x slower than NVLink's 900 GB/s. Avoid PCIe-only systems for large model training — use NVLink-enabled DGX/HGX servers.
        </Callout>
      </section>

      {/* ─── NVLINK ────────────────────────────────────────────────────── */}
      <section id="nvlink">
        <h2 style={S.h2}>NVLink — Direct GPU-to-GPU Communication</h2>
        <p style={S.p}>
          Without NVLink, two GPUs have to go through the CPU to talk to each other — like two people needing an interpreter to talk. With NVLink, two GPUs talk directly to each other — like two people talking directly.
        </p>
        <Figure caption="Without NVLink: GPU 1 must send data through the CPU to reach GPU 2 — slow 128 GB/s bottleneck. With NVLink: GPU 1 and GPU 2 communicate directly via NVSwitch — 900 GB/s bidirectional total. Tensor parallelism enabled.">
          <NvlinkDiagram />
        </Figure>
        <ComparisonTable
          headers={["NVLink Version", "GPU", "Bidirectional Bandwidth (per GPU)", "Notes"]}
          rows={[
            ["NVLink 3.0", "A100", "600 GB/s total", "6× pairs, 12 links"],
            ["NVLink 4.0", "H100", "900 GB/s total", "9× pairs, 18 links — production standard"],
            ["NVLink 5.0", "B200 (Blackwell)", "1.8 TB/s total", "2× H100 bandwidth — GB200 NVL72"],
          ]}
        />
        <p style={S.p}>
          <strong>Why NVLink matters for AI training:</strong> In distributed training, GPUs share their gradients after every step (an All-Reduce operation). 70B model gradients: ~140GB. Over NVLink (900 GB/s), this happens in a fraction of a second. Over PCIe (128 GB/s): multiple seconds per step — days of training time wasted in communication.
        </p>
      </section>

      {/* ─── NVSWITCH ──────────────────────────────────────────────────── */}
      <section id="nvswitch">
        <h2 style={S.h2}>NVSwitch — The GPU Interconnect Switch</h2>
        <p style={S.p}>
          NVSwitch is a dedicated GPU interconnect switch that sits inside a GPU server — it's not an Ethernet switch. NVSwitch routes NVLink connections between all the GPUs in the same server. Ethernet switches handle external network requests — that's a different thing entirely.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> If NVLink is a road between GPUs, NVSwitch is a roundabout (traffic circle) — every road arrives here, and you can go to any road. The DGX H100 has 3 NVSwitch chips. All 8 GPUs are connected — any GPU can talk to any other GPU at the full 900 GB/s NVLink bandwidth, simultaneously. No sharing, no bottleneck.
        </p>
        <p style={S.p}>
          This is critical for tensor parallelism — when a single neural network layer is split across multiple GPUs. GPUs share partial results at every step. NVSwitch makes this possible near-instantly.
        </p>
      </section>

      {/* ─── CUDA SOFTWARE ─────────────────────────────────────────────── */}
      <section id="cuda-software">
        <h2 style={S.h2}>CUDA — The Software Layer</h2>
        <p style={S.p}>
          The hardware is excellent, but it's nothing without software. CUDA is the software framework that lets developers write programs for the GPU.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA C/C++:</strong> An extended C++ language for writing GPU programs. You define "kernels" — GPU functions.</li>
          <li><strong>cuBLAS:</strong> An optimized matrix math library. Neural network layers use cuBLAS internally.</li>
          <li><strong>cuDNN:</strong> Deep learning primitives — convolutions, activations, pooling, attention. PyTorch and TensorFlow call it internally.</li>
          <li><strong>NCCL:</strong> Multi-GPU communication — All-Reduce, Broadcast, Scatter. The backbone of distributed training.</li>
          <li><strong>Thrust:</strong> STL-like parallel algorithms library.</li>
          <li><strong>NVML:</strong> NVIDIA Management Library — programmatic GPU monitoring, health checks, configuration.</li>
        </ul>
        <p style={S.p}>
          When you write <code style={S.code}>model.cuda()</code> in PyTorch, the model moves into GPU HBM. When you call <code style={S.code}>loss.backward()</code>, CUDA kernels execute automatically. The developer doesn't have to manage the low-level details — CUDA handles that.
        </p>
        <Callout type="important" title="CUDA Ecosystem Lock-In">
          CUDA only runs on NVIDIA GPUs. This is an important business reality — the hardware is excellent, but CUDA's libraries, tooling, and developer expertise create an ecosystem that's an equally important competitive advantage. AMD ROCm is an alternative, but a gap from CUDA's maturity remains. This is why most AI workloads still run on NVIDIA GPUs today.
        </Callout>
      </section>

      {/* ─── ROCM ──────────────────────────────────────────────────────── */}
      <section id="rocm">
        <h2 style={S.h2}>ROCm — AMD&apos;s Answer to CUDA</h2>
        <p style={S.p}>
          AMD's GPU portfolio has a growing presence in AI infrastructure. ROCm (Radeon Open Compute) is AMD's open-source alternative to the CUDA ecosystem.
        </p>
        <ul style={S.ul}>
          <li><strong>HIP (Heterogeneous-compute Interface for Portability):</strong> A CUDA-like programming model. Porting CUDA code to ROCm is relatively easy — many CUDA APIs map directly to HIP.</li>
          <li><strong>rocBLAS, MIOpen:</strong> Equivalent libraries to cuBLAS, cuDNN.</li>
          <li><strong>RCCL:</strong> Equivalent to NCCL for multi-GPU communication.</li>
          <li><strong>PyTorch ROCm support:</strong> An official ROCm backend is available and improving.</li>
        </ul>
        <p style={S.p}>
          <strong>AMD Instinct MI300X:</strong> 192GB HBM3 — memory capacity advantage over H100&apos;s 80GB. 5.3 TB/s memory bandwidth. Strong FP16/BF16 performance. Competitive with H100 for memory-intensive LLM inference. Pricing often lower than equivalent NVIDIA.
        </p>
        <Callout type="best-practice" title="ROCm 2024-25 Status">
          The ROCm ecosystem has improved significantly since 2024 — PyTorch support is better, Flash Attention is available, key libraries have been ported. Although CUDA still has broader ecosystem maturity, AMD is closing the gap faster than in previous years. Where 70B+ model inference needs HBM capacity: seriously evaluate the MI300X.
        </Callout>
      </section>

      {/* ─── MIG ───────────────────────────────────────────────────────── */}
      <section id="mig">
        <h2 style={S.h2}>MIG — One GPU, Multiple Isolated Instances</h2>
        <p style={S.p}>
          A GPU is very powerful. But does every user really need a whole GPU? Some workloads are small — testing, small models, development. A full H100 is wasted on a developer's development work.
        </p>
        <p style={S.p}>
          With MIG (Multi-Instance GPU): you can split one physical H100 into up to seven isolated GPU instances depending on the selected MIG profile. Each instance has its own dedicated SM portion, HBM memory slice, compute engines — complete hardware-level isolation.
        </p>
        <Figure caption="MIG splits one H100 into up to seven isolated instances (profile-dependent). Each instance has its own dedicated GPU compute and GPU memory — hardware isolation means one team cannot access another's data. Safe for production multi-tenant use.">
          <MigDiagram />
        </Figure>
        <ComparisonTable
          title="MIG Instance Profiles (H100 Examples)"
          headers={["Profile", "SMs", "GPU Memory", "Use Case"]}
          rows={[
            ["1g.10gb", "16 SMs", "10 GB HBM", "Development, testing, small models"],
            ["2g.20gb", "32 SMs", "20 GB HBM", "Medium development workloads"],
            ["3g.40gb", "48 SMs", "40 GB HBM", "Production small/medium model serving"],
            ["4g.40gb", "64 SMs", "40 GB HBM", "Larger production workloads"],
            ["7g.80gb", "All 132 SMs", "80 GB HBM", "Full GPU — same as no MIG"],
          ]}
        />
        <Callout type="best-practice" title="MIG vs Time-Sharing">
          Traditional GPU sharing (without MIG): no memory isolation — one process can access another's memory. Security risk, unpredictable performance. MIG: hardware-level isolation, memory protected, guaranteed performance. Production multi-tenant deployments: use MIG, not bare time-sharing.
        </Callout>
      </section>

      {/* ─── GPU VIRTUALIZATION ────────────────────────────────────────── */}
      <section id="gpu-virtualization">
        <h2 style={S.h2}>GPU Virtualization</h2>
        <ul style={S.ul}>
          <li><strong>NVIDIA vGPU:</strong> An enterprise virtualization solution (requires a license). Share a GPU across virtual machines — inside the VM, the GPU looks like a physical GPU. Use case: GPU-accelerated virtual desktops (VDI). Less relevant for large AI training.</li>
          <li><strong>GPU Passthrough:</strong> Assign a physical GPU directly to one VM (1:1). Best performance — near-native. No sharing. Common in cloud GPU instances (AWS, GCP, Azure).</li>
          <li><strong>Time-Slicing:</strong> Multiple processes time-share one GPU. No memory isolation. Suitable for dev/test. Not production-grade for sensitive workloads.</li>
        </ul>
        <p style={S.p}>
          <strong>Recommendation for AI production:</strong> Training workloads — physical GPUs preferred. Inference development/testing — MIG where possible. Multi-tenant production inference — MIG or dedicated physical GPUs per tenant.
        </p>
      </section>

      {/* ─── MULTI-GPU ─────────────────────────────────────────────────── */}
      <section id="multi-gpu">
        <h2 style={S.h2}>Multi-GPU Systems</h2>
        <p style={S.p}>
          After a single GPU, how do you scale? Multi-GPU systems use three approaches:
        </p>
        <ul style={S.ul}>
          <li><strong>Data Parallelism:</strong> Same model, different data batches, on different GPUs. Sync gradients at the end of each step. The simplest approach. Works when the model fits on one GPU. All GPUs share their result — this operation is called All-Reduce.</li>
          <li><strong>Tensor Parallelism:</strong> Split one neural network layer across multiple GPUs — GPU 1 gets the left half of the weight matrix, GPU 2 the right half. Combine the results. NVLink bandwidth is critical — there's frequent inter-GPU communication. Use when the model doesn't fit on a single GPU.</li>
          <li><strong>Pipeline Parallelism:</strong> Split the model's layers vertically across GPU groups. GPU 1: layers 1-20. GPU 2: layers 21-40. Data flows in a pipeline style.</li>
        </ul>
        <Callout type="maintenance" title="Full Detail — Next Article">
          The complete picture of distributed training is covered in <TopicLink slug="gpu-cluster" variant="inline" /> — parallelism strategies, NCCL, InfiniBand fabric, and production cluster operations.
        </Callout>
      </section>

      {/* ─── DGX ───────────────────────────────────────────────────────── */}
      <section id="dgx">
        <h2 style={S.h2}>DGX — NVIDIA&apos;s Complete AI Server</h2>
        <p style={S.p}>
          DGX is NVIDIA's purpose-built, fully integrated AI server. A complete turnkey solution — GPUs, networking, storage, cooling, software — all pre-configured in one system. Like a complete kitchen kit for a professional chef — everything included, everything optimized, work can start from day one.
        </p>
        <Figure caption="DGX H100 Server: 8 H100 GPUs connected via NVSwitch (GPU interconnect — not Ethernet) for fast internal communication. Plus 2 Intel CPUs, 2TB System RAM, 4 NVMe SSDs for storage, and 8 InfiniBand network cards to connect to other servers. Specifications vary by DGX generation.">
          <DgxServerDiagram />
        </Figure>
        <ComparisonTable
          title="DGX H100 — Key Specifications"
          headers={["Component", "Detail", "Purpose"]}
          rows={[
            ["GPUs", "8× H100 SXM5 80GB", "AI training and inference compute"],
            ["GPU Interconnect", "NVSwitch × 3 chips — 900 GB/s any-to-any", "Fast GPU-to-GPU — NOT Ethernet switch"],
            ["CPU", "2× Intel Xeon Platinum", "Server OS, data loading, non-GPU tasks"],
            ["System RAM", "2TB DDR5", "CPU working memory"],
            ["Local Storage", "4× NVMe SSDs (~30TB)", "Checkpoints, model artifacts"],
            ["Network Cards", "8× ConnectX-7 (1 per GPU)", "400 Gbps InfiniBand each — 3.2 Tbps aggregate"],
            ["Total GPU Memory", "640GB HBM3", "Holds models up to ~640GB at FP16"],
            ["Power Draw", "~10.2 kW", "High-density — liquid cooling recommended"],
            ["Form Factor", "10U rack server", "DC planning: floor load ~130 kg"],
          ]}
        />
        <Callout type="warning" title="Specifications Vary">
          Specifications depend on DGX generation and configuration. DGX A100, DGX H100, DGX B200 — each has different specs. Always verify current NVIDIA documentation for exact numbers before procurement.
        </Callout>
        <ComparisonTable
          title="DGX vs Custom HGX-Based Server"
          headers={["Aspect", "DGX", "Custom HGX-Based (Dell/Supermicro/HPE)"]}
          rows={[
            ["Time to deploy", "Days", "Weeks to months"],
            ["Software stack", "Pre-configured NVIDIA stack", "Manual configuration"],
            ["Support", "Full NVIDIA enterprise support", "OEM support (multiple vendors)"],
            ["Cost", "Premium", "Often lower"],
            ["Flexibility", "Limited to NVIDIA config", "High — custom CPU, storage, networking"],
            ["Best for", "Fast deployment, standard configs", "Large scale, custom requirements"],
          ]}
        />
      </section>

      {/* ─── HGX ───────────────────────────────────────────────────────── */}
      <section id="hgx">
        <h2 style={S.h2}>HGX — The GPU Baseboard for OEM Servers</h2>
        <p style={S.p}>
          HGX (NVIDIA HGX) is the GPU board that OEM manufacturers (Dell, HPE, Supermicro, Lenovo) use to build their AI servers. Think of HGX as: a complete GPU subsystem. 8 H100s pre-mounted, NVSwitch connected, ready to drop into a server chassis.
        </p>
        <ul style={S.ul}>
          <li><strong>HGX H100 board:</strong> 8× H100 SXM5 GPUs, 3× NVSwitch chips, pre-tested and validated by NVIDIA.</li>
          <li><strong>The OEM then:</strong> Designs its own CPU, DRAM, NVMe, cooling, chassis, and installs the HGX board.</li>
          <li><strong>Who uses HGX:</strong> Dell PowerEdge XE9680, Supermicro SYS-421GE-TNRT, HPE ProLiant DL380 Gen11, Lenovo ThinkSystem SR670 V3.</li>
          <li><strong>Same GPU performance:</strong> Same H100 chips — DGX vs HGX-based OEM: identical GPU compute. Different packaging, support model, customizability.</li>
        </ul>
      </section>

      {/* ─── GB200 NVL72 ───────────────────────────────────────────────── */}
      <section id="gb200-nvl72">
        <h2 style={S.h2}>GB200 NVL72 — AI Supercomputer in a Rack</h2>
        <p style={S.p}>
          GB200 NVL72 is NVIDIA's newest and most powerful configuration. A complete rack (or multi-rack) solution — 36 Grace CPU modules and 72 Blackwell B200 GPU modules, all connected via NVLink 5.0 switch fabric.
        </p>
        <ul style={S.ul}>
          <li><strong>72 GPUs as one logical unit:</strong> Any GPU can do direct NVLink 5.0 communication with any other GPU. No InfiniBand is needed within the rack for GPU-to-GPU.</li>
          <li><strong>13.5 TB total HBM3e:</strong> 72 × 192GB. Frontier models (405B+) can be served comfortably on a single NVL72 rack.</li>
          <li><strong>Infrastructure implications:</strong> Very high power density — hundreds of kW per rack. Liquid cooling mandatory. Specialized facility requirements.</li>
          <li><strong>Advantage over H100:</strong> Previously 8+ H100 nodes with InfiniBand required for 70B; now single NVL72 rack sufficient with NVLink connectivity — simpler topology, lower latency.</li>
        </ul>
      </section>

      {/* ─── AI FACTORY ────────────────────────────────────────────────── */}
      <section id="ai-factory">
        <h2 style={S.h2}>AI Factory — What It Actually Is</h2>
        <p style={S.p}>
          "AI Factory" is a term popularized by NVIDIA CEO Jensen Huang. Traditional factory: raw materials in, finished products out. AI factory: raw data in → GPU Cluster → trained AI models or AI responses out. 24/7 continuous operation.
        </p>
        <Figure caption="AI Factory: Training Data comes in on the left, GPU Cluster (thousands of GPUs) processes it in the center, Trained Models and AI Responses come out on the right — powered by MW-scale electricity and mandatory Direct Liquid Cooling.">
          <AiFactoryDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Compute layer:</strong> GPU servers (DGX/HGX-based), hundreds to thousands of H100/B200 GPUs, InfiniBand networking fabric connecting all servers. Scale: 1,000 to 100,000+ GPUs.</li>
          <li><strong>Storage layer:</strong> Parallel file systems (Lustre, GPFS, Weka, VAST Data), high-throughput object storage, NVMe-based fast storage for checkpoints. Petabytes of total capacity.</li>
          <li><strong>Power infrastructure:</strong> Tens of megawatts. Redundant utility feeds. UPS systems. Backup generators.</li>
          <li><strong>Cooling infrastructure:</strong> Direct Liquid Cooling (primarily Cold Plate Cooling) mandatory at AI density. Rear-door heat exchangers for lower density. Chilled water plant, cooling towers.</li>
          <li><strong>Management:</strong> Job scheduler (Slurm, Kubernetes), monitoring (DCGM, Prometheus, Grafana), model registry, experiment tracking.</li>
        </ul>
        <p style={S.p}>
          <strong>Examples:</strong> xAI Memphis facility "Colossus": 100,000 H100 GPUs. Meta AI: tens of thousands of GPUs across facilities. Microsoft Azure AI: massive GPU clusters globally. India: Reliance Jio, Tata Group, Yotta Data Services — AI factory investments growing.
        </p>
      </section>

      {/* ─── GPU CLUSTER ───────────────────────────────────────────────── */}
      <section id="gpu-cluster">
        <h2 style={S.h2}>GPU Cluster — Connecting Servers Together</h2>
        <p style={S.p}>
          One server has 8 GPUs. That's not enough for frontier model training. That's why GPU clusters exist — hundreds or thousands of servers together.
        </p>
        <Figure caption="GPU Cluster: Multiple servers each with 8 GPUs → connected to InfiniBand Leaf Switches → connected to InfiniBand Spine Switches. Any server can send data to any other server at full speed (non-blocking). Storage servers connect separately.">
          <GpuClusterDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Within server:</strong> NVLink handles GPU-to-GPU (900 GB/s bidirectional total per GPU).</li>
          <li><strong>Between servers:</strong> InfiniBand NDR 400Gbps per port handles server-to-server.</li>
          <li><strong>Fat-tree topology:</strong> Non-blocking — any server to any other server at full bandwidth. Critical for All-Reduce operations where all GPUs communicate simultaneously.</li>
          <li><strong>NCCL:</strong> A software library that handles All-Reduce, Broadcast, All-Gather automatically. PyTorch DDP, FSDP use NCCL internally. The developer doesn't have to manually manage communication.</li>
        </ul>
      </section>

      {/* ─── AI DATA CENTERS ───────────────────────────────────────────── */}
      <section id="ai-data-centers">
        <h2 style={S.h2}>AI Data Centers — Infrastructure at Scale</h2>
        <p style={S.p}>
          AI data centers are fundamentally different from traditional data centers. These differences matter most for DC engineers.
        </p>
        <ComparisonTable
          title="Power Density Comparison"
          headers={["Data Center Type", "Power Density per Rack", "Cooling Method"]}
          rows={[
            ["Traditional IT", "2–5 kW", "Air cooling"],
            ["High-density compute", "10–20 kW", "Air + some liquid"],
            ["AI/GPU servers (air-cooled)", "20–40 kW", "Air cooling — at upper limit"],
            ["AI/GPU servers (liquid-cooled)", "40–100+ kW", "Direct Liquid Cooling mandatory"],
            ["NVL72 AI factory racks", "120–200+ kW", "Advanced liquid cooling required"],
          ]}
        />
        <ul style={S.ul}>
          <li><strong>Floor load:</strong> DGX H100: ~130 kg. Rack of 8 servers: ~1,040+ kg. Traditional DC floor load often insufficient — civil/structural assessment first, before procurement.</li>
          <li><strong>Power infrastructure:</strong> Three-phase power at high amperage. Rack of 8 DGX H100s: ~80kW. 100 racks: ~8MW compute power + 30-40% cooling overhead. Total: ~10-11 MW facility power.</li>
          <li><strong>Cooling — Direct Liquid Cooling (Cold Plate Cooling):</strong> Cold plates directly on GPU die. Cold water (18-22°C) enters, warm water (35-45°C) exits. Much more efficient than air. Requires facility chilled water infrastructure, leak detection, quick-connect plumbing per rack.</li>
        </ul>
      </section>

      {/* ─── GPU POWER ─────────────────────────────────────────────────── */}
      <section id="gpu-power">
        <h2 style={S.h2}>GPU Power — Deep Dive</h2>
        <p style={S.p}>
          Power consumption is the most critical planning factor for GPU infrastructure.
        </p>
        <ul style={S.ul}>
          <li><strong>TDP (Thermal Design Power):</strong> Maximum sustained power under full load. H100 SXM5: 700W. Idle power: 50-100W typical.</li>
          <li><strong>Power capping:</strong> <code style={S.code}>nvidia-smi -pl 400</code> sets the GPU's power limit to 400W. At 400W, the H100 still delivers 80-85% of peak performance — diminishing returns near TDP. More GPUs fit in the same power envelope. Production clusters often run at an 80% TDP cap.</li>
          <li><strong>Real-time monitoring:</strong> <code style={S.code}>nvidia-smi --query-gpu=power.draw --format=csv</code></li>
        </ul>
        <ComparisonTable
          title="Power Budget — DGX H100 Server"
          headers={["Component", "Power Draw", "Notes"]}
          rows={[
            ["8× H100 GPUs", "8 × 700W = 5,600W", "At full TDP"],
            ["2× Intel Xeon CPU", "2 × 350W = 700W", "High-end server CPUs"],
            ["DRAM, Storage, Fans, NICs", "~1,500W", "Estimate — varies"],
            ["Total Server", "~10.2 kW", "Per DGX H100 server"],
            ["Rack of 8 servers", "~80 kW", "Plus cooling overhead"],
            ["100 servers (800 GPUs)", "~1 MW compute", "~1.3-1.4 MW total facility"],
          ]}
        />
      </section>

      {/* ─── GPU COOLING ───────────────────────────────────────────────── */}
      <section id="gpu-cooling">
        <h2 style={S.h2}>GPU Cooling — Engineering Deep Dive</h2>
        <p style={S.p}>
          GPU cooling is the most challenging aspect of data center design because GPU heat density is unprecedented.
        </p>
        <ul style={S.ul}>
          <li><strong>H100 thermal profile:</strong> Junction temperature (Tj) max: 83°C. Optimal operating: 60-75°C. Thermal throttle starts near 83°C. Each watt of heat = same watt of cooling capacity needed.</li>
          <li><strong>Air cooling for GPU servers:</strong> Works at lower densities — high-speed fans (7,000-15,000 RPM), cold/hot aisle containment. At 40kW+ per rack: air cooling struggles. Noise level: 85-90 dB at high fan speed — significant for DC staff working nearby.</li>
          <li><strong>Direct Liquid Cooling (DLC) — Cold Plate Cooling:</strong> DLC primarily uses cold plate cooling. Cold plates sit directly on the GPU die and CPU. Cold water (18-22°C) enters the server via quick-disconnect couplings. Water absorbs GPU heat → warm water (35-45°C) exits. The facility chiller cools the water and returns the cold supply. 40-80% cooling energy reduction vs air. A cooler GPU = no thermal throttling = better sustained performance.</li>
          <li><strong>Immersion cooling (emerging):</strong> Servers submerged in dielectric fluid. Extreme density, silent operation. Not mainstream for GPU servers in 2024-25 — complex maintenance, limited vendor support for GPU servers.</li>
        </ul>
        <ComparisonTable
          headers={["Cooling Method", "Max Density", "Energy Efficiency", "Complexity", "GPU Support"]}
          rows={[
            ["Air cooling", "Up to ~40kW/rack", "Lowest (PUE 1.5-2.0)", "Simple", "Universal"],
            ["Rear-door heat exchanger", "Up to ~60kW/rack", "Medium", "Moderate retrofit", "Universal"],
            ["Direct Liquid Cooling (Cold Plate)", "40-120kW/rack", "High (PUE 1.1-1.3)", "Requires plumbing", "H100, B200, A100 supported"],
            ["Immersion cooling", "120kW+/rack", "Highest", "Complex, specialized", "Limited GPU server support"],
          ]}
        />
      </section>

      {/* ─── GPU MONITORING ────────────────────────────────────────────── */}
      <section id="gpu-monitoring">
        <h2 style={S.h2}>GPU Monitoring — Production Operations</h2>
        <p style={S.p}>
          Monitoring GPUs in production is mandatory. Detect issues early, predict failures, optimize performance.
        </p>
        <p style={S.p}>
          <strong>DCGM (Data Center GPU Manager)</strong> is the standard tool for enterprise GPU monitoring. The DCGM → Prometheus → Grafana stack is the production standard.
        </p>
        <ComparisonTable
          title="Key GPU Metrics and Thresholds"
          headers={["Metric", "Normal Range", "Warning", "Action Required"]}
          rows={[
            ["GPU Utilization (training)", "85–95%", "60–80%", "Below 50%: job config issue — investigate"],
            ["GPU Utilization (inference)", "20–70% (intentional)", "—", "Inference often lower by design — latency priority"],
            ["GPU Temperature", "Below 75°C", "78–82°C", "Above 83°C: throttling — check cooling"],
            ["HBM Memory Utilization", "70–90%", "90–95%", "Above 95%: OOM risk — reduce batch size"],
            ["Power Draw", "Below TDP", "Above 95% TDP", "At TDP: check power cap settings"],
            ["ECC Correctable (SBE)", "0–few per day", "Increasing trend", "Above 100/day: flag for replacement"],
            ["ECC Uncorrectable (DBE)", "0", "Any occurrence", "Immediate investigation — do not ignore"],
            ["NVLink Bandwidth", "Expected utilization", "20% unexpected drop", "Large drop: network or software issue"],
            ["SM Clock Speed", "At rated speed", "Drops unexpectedly", "Clock drop = throttling from thermal/power"],
          ]}
        />
        <Callout type="important" title="Inference Utilization — Don&apos;t Panic">
          In inference workloads, GPU utilization often stays intentionally low because latency matters more than throughput. In training: 95% GPU busy = good. In inference: 30-40% GPU per request is acceptable if the latency target is met. If you push the GPU to 95% in inference, a queue builds up → latency rises → users get unhappy. Don't panic seeing low utilization in DCGM if it's an inference workload.
        </Callout>
      </section>

      {/* ─── GPU FAILURES ──────────────────────────────────────────────── */}
      <section id="gpu-failures">
        <h2 style={S.h2}>GPU Failures — What Goes Wrong</h2>
        <ComparisonTable
          title="Common GPU Failure Types"
          headers={["Failure Type", "Symptoms", "Detection", "Action"]}
          rows={[
            ["ECC Uncorrectable Error (DBE)", "Job crash, GPU error messages", "DCGM real-time alert, nvidia-smi", "Immediate investigation, likely replacement"],
            ["GPU Hang / Soft Hang", "Job stuck, no progress", "DCGM process hang detection", "GPU process reset or reboot, resume from checkpoint"],
            ["Thermal Throttling", "Training 10-30% slower", "SM clock drop in DCGM", "Check cooling: fan health, DLC flow rate, ambient temp"],
            ["NVLink Failure", "Training crash on tensor parallel jobs", "DCGM NVLink error counters", "Check NVLink error count, GPU replacement or reboot"],
            ["GPU Not Detected", "nvidia-smi shows error", "lspci, dmesg | grep nvidia", "Reseat GPU, check PCIe slot, reinstall drivers"],
            ["Permanent Failure", "GPU completely non-functional", "nvidia-smi empty or corrupt output", "Hardware replacement mandatory"],
          ]}
        />
        <Callout type="best-practice" title="Failure Rate at Scale — Plan For It">
          At 10,000 GPU scale: expect few GPU failures per week — normal hardware failure rates. Production design principle: assume failures happen. Frequent checkpointing (every 30 min minimum), automatic job restart from checkpoint, spare capacity (hot spares or N+1), monitoring + automated alerting. Job scheduler should handle node failures gracefully — PyTorch Elastic (torchrun) supports dynamic node membership.
        </Callout>
      </section>

      {/* ─── GPU SECURITY ──────────────────────────────────────────────── */}
      <section id="gpu-security">
        <h2 style={S.h2}>GPU Security</h2>
        <ul style={S.ul}>
          <li><strong>Physical security:</strong> GPU servers physically secured — locked racks, access logs, video surveillance in GPU areas, no unauthorized hardware removal possible.</li>
          <li><strong>Firmware security:</strong> Verify GPU firmware (VBIOS) before deployment. NVIDIA PSID verifies firmware authenticity. Purchase hardware from official NVIDIA channels or authorized distributors — supply chain integrity is critical.</li>
          <li><strong>Software security:</strong> Restrict DCGM and nvidia-smi access (root/privileged only). MIG isolation: hardware-level — cross-instance memory access is impossible. Container isolation: the NVIDIA Container Runtime provides GPU isolation in containers.</li>
          <li><strong>Network security:</strong> Keep the GPU management plane (BMC/IPMI, DCGM) on a completely separate network. InfiniBand network: isolated from the public internet. Training traffic: never traverses the public internet. RDMA networks: require careful access control.</li>
          <li><strong>Multi-tenant considerations:</strong> Dedicated physical GPUs preferred for sensitive workloads. MIG acceptable for most — hardware isolation sufficient. Highest sensitivity use cases (financial, healthcare PII): dedicated hardware, no sharing.</li>
        </ul>
      </section>

      {/* ─── ENTERPRISE DEPLOYMENT ─────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise GPU Deployment — Step by Step</h2>
        <h3 style={S.h3}>Phase 1: Assessment</h3>
        <ul style={S.ul}>
          <li>Workload analysis: Training vs inference? Model sizes? Expected concurrency? Required throughput?</li>
          <li>Scale planning: Start small (4-8 GPUs), validate, then scale. Never buy 1000 GPUs as first purchase.</li>
          <li>Build vs Buy vs Cloud: cloud for a fast start and variable workloads. On-premises at scale for cost optimization and data sovereignty.</li>
          <li>Facility assessment first: does the existing DC have the power capacity? Cooling capacity? Floor load ratings?</li>
        </ul>
        <h3 style={S.h3}>Phase 2: Procurement</h3>
        <ul style={S.ul}>
          <li>GPU server selection: DGX (turnkey) vs OEM HGX-based (cost-flexible). Both same GPU performance.</li>
          <li>Procurement lead time: 3-6 months for large orders — GPU supply chain planning is essential.</li>
          <li>InfiniBand switches: Mellanox QM9700/QM9790 (HDR/NDR). Fat-tree topology design.</li>
        </ul>
        <h3 style={S.h3}>Phase 3: Deployment</h3>
        <ul style={S.ul}>
          <li>Facility preparation first: Power infrastructure (PDUs, UPS), cooling (DLC plumbing if applicable), network cabling, rack installation.</li>
          <li>Software setup: Ubuntu 22.04 LTS (standard), NVIDIA Driver, CUDA toolkit, Docker + NVIDIA Container Runtime, DCGM monitoring.</li>
          <li>Validation: <code style={S.code}>nvidia-smi</code> — all GPUs visible? <code style={S.code}>dcgmi diag -r 3</code> — full GPU diagnostic. InfiniBand test: <code style={S.code}>ibping</code>. NCCL all-reduce bandwidth test.</li>
        </ul>
        <h3 style={S.h3}>Phase 4: Operations</h3>
        <ul style={S.ul}>
          <li>Monitoring: DCGM → Prometheus → Grafana → Alertmanager → PagerDuty/Slack</li>
          <li>Job scheduler: Slurm or Kubernetes + GPU Operator</li>
          <li>Backup power test: quarterly. Cooling system inspection: monthly. Driver/firmware updates: planned maintenance windows.</li>
          <li>Target utilization: 80%+ GPU utilization average for well-run cluster (training). Inference: optimize for latency, not utilization.</li>
        </ul>
      </section>

      {/* ─── COST ANALYSIS ─────────────────────────────────────────────── */}
      <section id="cost-analysis">
        <h2 style={S.h2}>Cost Analysis — GPU Infrastructure Economics</h2>
        <Callout type="warning" title="Pricing Changes Rapidly">
          GPU pricing changes rapidly depending on supply, demand, and generation. The numbers below are indicative for 2024-25 — always verify current market pricing and vendor quotes before procurement decisions.
        </Callout>
        <ComparisonTable
          title="Hardware Costs (Approximate, 2024-25 — Verify Before Purchasing)"
          headers={["Hardware", "Approx. Cost (USD)", "Notes"]}
          rows={[
            ["NVIDIA H100 SXM5 80GB (single)", "$25,000–35,000", "Price varies — supply-demand sensitive"],
            ["DGX H100 (8× H100, complete server)", "$300,000–400,000", "Premium for turnkey solution"],
            ["OEM HGX H100 server", "$250,000–320,000", "Dell/Supermicro/HPE — verify per vendor"],
            ["AMD Instinct MI300X 192GB", "$15,000–20,000", "Lower per unit vs H100"],
            ["Mellanox QM9790 NDR IB Switch", "$50,000–100,000", "Per switch — varies by port count"],
          ]}
        />
        <ComparisonTable
          title="Operating Costs — 100 DGX H100 Servers (India Estimates)"
          headers={["Cost Item", "Annual Estimate", "Notes"]}
          rows={[
            ["Electricity (power)", "~Rs. 70 crore", "At Rs. 8/kWh industrial rate, ~10kW × 100 servers"],
            ["Cooling overhead (PUE 1.3)", "+30% power cost", "~Rs. 21 crore additional"],
            ["AI infrastructure engineer", "Rs. 30–80 lakh/year", "Per experienced engineer — team of 5-10 needed"],
            ["Maintenance contracts", "3-5% of hardware/year", "Varies by vendor and SLA"],
          ]}
        />
        <p style={S.p}>
          <strong>GPU utilization and ROI:</strong> Idle GPUs = wasted money. Target: 80%+ average utilization through Slurm/Kubernetes scheduling, mixed workloads (training + inference on the same cluster at different priorities), MIG for smaller workloads. Chargeback: track per-team GPU usage, create internal accountability.
        </p>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting — Common Problems</h2>
        <ComparisonTable
          headers={["Problem", "Root Cause", "Diagnosis Command", "Resolution"]}
          rows={[
            ["GPU Not Detected", "Driver not installed, PCIe slot issue, power not connected", "lspci | grep -i nvidia\ndmesg | grep -i nvidia", "Reinstall drivers, reseat GPU, check 8-pin PCIe power connectors"],
            ["Temperature Too High / Throttling", "Fan failure, DLC flow rate low, airflow blocked", "nvidia-smi -q -d TEMPERATURE\nnvidia-smi dmon -s pc", "Check fan health, DLC water flow, clean filters, check ambient temp"],
            ["CUDA Out of Memory (OOM)", "Model + batch + sequence too large for HBM", "Check model size × precision × batch size", "Reduce batch, enable gradient checkpointing, use FP16/BF16, quantize"],
            ["Low GPU Utilization (training)", "Data loading bottleneck, small batch, comm overhead", "nvidia-smi dmon, PyTorch Profiler", "Increase DataLoader workers, prefetch data, increase batch size"],
            ["Training Job Hangs", "NCCL initialization failure — network issue", "NCCL_DEBUG=INFO, check ibstat, ping between nodes", "Check IB link status, firewall rules, MASTER_ADDR/PORT env vars"],
            ["NVLink / NCCL Error", "NVLink hardware error, IB cable issue", "nvidia-smi nvlink --errorcounters\nibstat, ibping", "Check NVLink error counters, IB link status, firewall rules"],
            ["Memory Leak (memory grows)", "Hanging requests, KV cache not freed (inference)", "Monitor memory over time, check active processes", "Request timeout enforcement, restart serving instance"],
          ]}
        />
      </section>

      {/* ─── FUTURE GPUS ───────────────────────────────────────────────── */}
      <section id="future-gpus">
        <h2 style={S.h2}>Future GPUs — What&apos;s Coming</h2>
        <ul style={S.ul}>
          <li><strong>B200 (Blackwell) — Current/Near-term:</strong> 192GB HBM3e per GPU, NVLink 5.0 (1.8 TB/s bidirectional total per GPU), higher compute vs H100 across all precisions, FP4 support. GB200 NVL72: rack-scale unified computing.</li>
          <li><strong>Rubin (2025-26):</strong> Next architecture after Blackwell. NVIDIA annual cadence. Expected: higher HBM capacity, further AI precision optimizations.</li>
          <li><strong>AMD MI350 / MI400:</strong> Next AMD generations. Continued ROCm improvement. Genuine competition growing for memory-heavy workloads.</li>
          <li><strong>Intel Gaudi 3:</strong> Competitive for specific LLM training. Lower cost than H100 for some workloads. Intel's pricing advantage + ecosystem improvement strategy.</li>
          <li><strong>Trend — Compute Density Increasing:</strong> H100 era: ~10kW per 8-GPU server. B200 NVL72: hundreds of kW per rack. Future: higher still. DC infrastructure must plan for this trajectory. If designing facility today: plan for 2-3× higher density than current needs.</li>
          <li><strong>Trend — Memory Growing:</strong> H100: 80GB HBM3 → B200: 192GB → future higher. LLM sizes growing → more HBM needed per GPU. 405B model at FP16 = 810GB. Today: needs 11 H100s. Future: potentially fits in 4-5 B200s.</li>
          <li><strong>Trend — GPU-CPU Integration:</strong> GB200 NVL72: Grace CPU + Blackwell GPU in the same package with NVLink — reduces the PCIe bottleneck. Tighter integration is the future — CPU and GPU are increasingly becoming one accelerated computing platform.</li>
        </ul>
      </section>

      {/* ─── INTERVIEW QUESTIONS ───────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        {[
          {
            q: "What is the fundamental difference between CPU and GPU, and why is GPU better for AI?",
            a: "A CPU handles complex, varied workloads with a few powerful cores — low latency per task, complex branching, decision making. A GPU does the same operation at massive parallelism with thousands of lightweight arithmetic execution units. AI neural networks' core operation is matrix multiplication — the same operation applied to millions of numbers simultaneously. This is tailor-made for a GPU's SIMT architecture. A 70B model forward pass on a CPU: impractically slow. On a GPU: seconds. The hardware architecture perfectly matches the workload requirements. HBM memory (3.35 TB/s bandwidth) ensures data reaches the GPU cores fast — memory bandwidth is often the actual bottleneck, not compute.",
          },
          {
            q: "What is a Tensor Core and how is it different from a regular CUDA Core?",
            a: "A CUDA Core is a lightweight arithmetic execution unit — it does general FP32/FP64 or integer math. It's not a CPU core — don't compare it directly to a CPU core. A Tensor Core is specialized matrix multiplication hardware designed specifically into NVIDIA GPUs for neural network acceleration. Neural network layers are essentially matrix multiplications. Tensor Cores significantly accelerated GPU AI performance vs CUDA Cores alone — the actual improvement depends on architecture, workload, matrix size, and precision (FP16/BF16/FP8). On the H100: ~67 TFLOPS FP32 (CUDA Cores) vs ~3,958 TFLOPS FP8 Tensor Core sparse. Both types run simultaneously — Tensor Cores handle heavy matrix math, CUDA Cores handle everything else.",
          },
          {
            q: "What is HBM and why is it critical for a GPU?",
            a: "HBM (High Bandwidth Memory) is a 3D-stacked memory technology integrated into the same package as the GPU chip, using Through-Silicon Vias. Primary advantage: extremely high memory bandwidth. HBM3 (H100): 3.35 TB/s bandwidth. Traditional DDR memory: ~100 GB/s. A latency improvement exists too, but bandwidth is the major benefit. LLM inference is bandwidth-bound — model weights have to be read from memory at every step. Higher bandwidth = more tokens per second = lower cost per inference. HBM capacity (80GB H100, 192GB B200/MI300X) determines which models fit without tensor parallelism.",
          },
          {
            q: "What is the difference between NVLink and PCIe?",
            a: "PCIe is the standard interface for connecting a GPU to the CPU and the system — on the H100, PCIe Gen5 x16: 64 GB/s each direction, 128 GB/s bidirectional total. GPU-to-GPU communication over PCIe: GPU1 → CPU → GPU2 — two hops, slow. NVLink is a direct GPU-to-GPU interconnect — H100 NVLink 4.0: 900 GB/s bidirectional total per GPU. NVSwitch is a GPU interconnect switch that connects all GPUs in a server — it's not an Ethernet switch. NVLink enables tensor parallelism — a single neural network layer can be split across multiple GPUs efficiently. Server-to-server communication uses InfiniBand.",
          },
          {
            q: "What is MIG and when should it be used?",
            a: "MIG (Multi-Instance GPU) is a feature available on the H100 that partitions one physical GPU into up to seven isolated GPU instances depending on the selected profile — hardware-level isolation. Each instance has a dedicated SM portion, HBM memory slice, compute engines. Use MIG when: development and testing workflows, multiple teams are sharing resources, multi-tenant inference serving with isolation. Don't use MIG when: large model training (needs a full GPU or multiple GPUs), maximum single-workload throughput. Traditional GPU sharing without MIG: no memory isolation — security risk, unpredictable performance. MIG: hardware-level isolation, safe for production multi-tenant use.",
          },
          {
            q: "What are the most important metrics in a production GPU cluster?",
            a: "Top metrics: (1) GPU Utilization — training target 80-95%, inference is intentionally lower for latency — don't panic over low inference utilization. (2) GPU Temperature — throttling at 83°C causes performance drops — detect cooling issues early. (3) ECC Uncorrectable Errors (DBE) — any DBE = immediate investigation — hardware degradation. (4) HBM Memory Utilization — above 95% = OOM risk. (5) NVLink Bandwidth drops — communication issues. (6) Power Draw — consistently near TDP. (7) SM Clock Speed drops — indicates thermal or power throttling. DCGM → Prometheus → Grafana is the standard monitoring stack.",
          },
          {
            q: "What's the difference between DGX and HGX?",
            a: "DGX is NVIDIA's complete integrated AI server — GPUs, CPU, DRAM, NVMe, networking, software — all configured and tested. HGX is the GPU baseboard that OEM manufacturers use in their servers. Same GPU performance (same H100 chips). Specifications vary depending on DGX generation and configuration — always verify NVIDIA docs. DGX: turnkey, premium, faster deployment, full NVIDIA support. HGX-based OEM servers: more customizable, often lower cost, vendor support, better for large scale with custom requirements. Both are valid — the choice depends on team capability, scale, and deployment timeline.",
          },
          {
            q: "What do you do when you get a GPU OOM error?",
            a: "Diagnose first: calculate model size × precision × batch size × sequence length = total HBM requirement. Then systematically: (1) reduce batch size — the simplest. (2) enable gradient checkpointing — recompute activations instead of storing them, trades compute for memory. (3) switch to FP16/BF16 from FP32 — 2x memory reduction. (4) quantization for inference — INT8 or INT4. (5) model parallelism — tensor parallel or pipeline parallel. (6) CPU offloading — DeepSpeed ZeRO-Infinity. (7) reduce sequence length. Profile first with the PyTorch memory profiler — understand exactly what is consuming memory before optimizing blindly.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Simple Definition"]}
          rows={[
            ["CUDA", "NVIDIA's software framework that lets developers write programs for the GPU. Runs only on NVIDIA GPUs."],
            ["CUDA Core", "The GPU's lightweight arithmetic execution unit — simple floating-point or integer math. Not a CPU core — a direct comparison would be misleading."],
            ["DGX", "NVIDIA's complete, integrated AI server system — GPUs, CPU, networking, storage, software all included. Specifications vary by generation."],
            ["DLC (Direct Liquid Cooling)", "A cooling method where a cold plate sits directly on the GPU die — primarily cold plate cooling. Mandatory for 40kW+ racks."],
            ["ECC (Error Correcting Code)", "Memory error detection. SBE (single-bit): auto-corrected. DBE (double-bit): hardware error — immediate action needed."],
            ["FLOPS / TFLOPS", "Floating Point Operations Per Second. AI GPU performance measure. Trillion FLOPS = 1 TFLOPS. Note: always check precision (FP16, FP8, etc.) when comparing."],
            ["GPC (GPU Division)", "Graphics Processing Cluster — the GPU chip's highest-level organizational unit. Contains multiple SMs. H100: 8 GPCs."],
            ["HBM (Fast GPU Memory)", "High Bandwidth Memory — 3D-stacked memory directly next to GPU chip. Primary advantage: extremely high bandwidth (3.35 TB/s on H100)."],
            ["HGX", "NVIDIA's GPU baseboard — OEM manufacturers install it in their AI servers. Same GPU chips as DGX, different server packaging."],
            ["InfiniBand", "A high-speed network technology used in GPU clusters for server-to-server communication. NDR: 400 Gbps per port."],
            ["MIG (Multi-Instance GPU)", "An H100 feature — partition a physical GPU into up to seven isolated instances depending on the selected profile. Hardware-level isolation."],
            ["NCCL", "NVIDIA Collective Communications Library — handles multi-GPU communication operations (All-Reduce, Broadcast) automatically."],
            ["NVLink", "NVIDIA GPU-to-GPU direct interconnect — H100: 900 GB/s bidirectional total. Much faster than PCIe for GPU-to-GPU."],
            ["NVSwitch", "Dedicated GPU interconnect switch inside GPU servers — NOT Ethernet switch. Routes NVLink connections between all GPUs in same server."],
            ["PCIe (PCI Express)", "The standard interface connecting a GPU to the CPU — H100: Gen5 x16 = 64 GB/s each direction, 128 GB/s bidirectional total."],
            ["ROCm", "AMD's open-source GPU computing platform — an alternative to CUDA for AMD GPUs. Improving significantly since 2024."],
            ["SM (Work Unit / Streaming Multiprocessor)", "The GPU's fundamental compute unit — contains CUDA Cores, Tensor Cores, register file, shared memory, warp schedulers. H100: 132 SMs."],
            ["SIMT (Single Instruction, Multiple Threads)", "The GPU's execution model — one instruction is issued and 32 threads (a Warp) simultaneously execute that same instruction on different data."],
            ["TDP (Thermal Design Power)", "Maximum sustained power consumption. H100 SXM5: 700W. Plan cooling and power infrastructure accordingly."],
            ["Tensor Core", "Specialized matrix multiplication hardware in NVIDIA GPUs. Key AI accelerator. Actual performance improvement depends on architecture, workload, matrix size, and precision."],
            ["Warp", "A group of 32 GPU threads that execute the same instruction simultaneously — the SIMT model. The basic unit of scheduling."],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>The GPU made AI possible — its parallel architecture (thousands of lightweight arithmetic units) exactly matches the pattern of neural network computation. This wasn't an accident, but it also wasn't originally planned. AlexNet in 2012 demonstrated this connection clearly.</li>
          <li>A CUDA Core is a lightweight arithmetic execution unit — don't compare it directly to a CPU core. A Tensor Core is specialized matrix multiplication hardware that delivers the actual AI performance — an improvement of several to tens of times faster is possible depending on architecture, workload, matrix size, and precision used.</li>
          <li>HBM's primary advantage is extremely high memory bandwidth — 3.35 TB/s vs ~100 GB/s for regular DDR. LLM inference is bandwidth-bound. Higher HBM bandwidth directly means more tokens per second = lower cost per inference. HBM capacity (80GB H100 vs 192GB B200/MI300X) determines which models fit without multi-GPU tensor parallelism.</li>
          <li>NVLink (900 GB/s bidirectional total per GPU) and NVSwitch (a GPU interconnect switch — NOT Ethernet) made multi-GPU training feasible. PCIe Gen5 (128 GB/s bidirectional total) isn't sufficient for GPU-to-GPU in large model training. Use NVLink-enabled DGX/HGX servers for training.</li>
          <li>MIG provides hardware-level isolation — up to seven isolated GPU instances depending on the selected profile (H100). Production multi-tenant inference: MIG is safe. Training: dedicated physical GPUs preferred.</li>
          <li>DGX is a complete server (turnkey), HGX is a GPU baseboard (that OEMs use). Same GPU performance — different packaging, support, flexibility, cost. Specifications vary by generation — always verify NVIDIA documentation. NVSwitch is a GPU interconnect switch, not an Ethernet switch.</li>
          <li>In inference workloads, GPU utilization is intentionally low — latency matters more than throughput. Don't panic seeing low utilization in inference serving. In training: target 80-95% utilization.</li>
          <li>Direct Liquid Cooling (primarily Cold Plate Cooling) is mandatory at 40kW+ rack density. H100 server: ~10kW. One rack: ~80kW. 100 racks: ~8MW of compute power. Do facility assessment — power, cooling, floor load — before GPU procurement, not after.</li>
          <li>GPU pricing changes rapidly depending on supply, demand, and generation. Always verify current market pricing before procurement. ROCm has been improving significantly since 2024 — seriously evaluate the AMD MI300X for memory-heavy LLM inference where 192GB HBM is an advantage.</li>
          <li>For DC engineers: GPU servers demand 40-100kW+ per rack — unprecedented density. DLC is mandatory. Floor load assessment is essential. Plan InfiniBand fabric upfront. AI factory design trajectory: compute density per rack keeps increasing every generation — plan for 2-3x higher density than today's needs.</li>
        </ul>
      </section>

    </article>
  );
}
