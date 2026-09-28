"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { nvidiaArchContent } from "@/content/nvidia-architecture";

import ArchEvolutionTimeline from "../svg/ArchEvolutionTimeline";
import GpuDieHierarchy from "../svg/GpuDieHierarchy";
import SmInternalDiagram from "../svg/SmInternalDiagram";
import ThreadBlockGridDiagram from "../svg/ThreadBlockGridDiagram";
import MemoryHierarchyPyramid from "../svg/MemoryHierarchyPyramid";
import NvlinkTopologyDiagram from "../svg/NvlinkTopologyDiagram";
import MigConfigDiagram from "../svg/MigConfigDiagram";
import DgxH100Diagram from "../svg/DgxH100Diagram";
import TrainingDataFlow from "../svg/TrainingDataFlow";
import TensorRtPipeline from "../svg/TensorRtPipeline";

void nvidiaArchContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ──────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          You read about NVIDIA in the AI GPU article — CUDA Cores, HBM, NVLink, basic architecture. In the TPU and AI Accelerators article you understood the rest of the landscape. Now it's time to understand one thing deeply: NVIDIA GPU architecture — from silicon to the data center.
        </p>
        <p style={S.p}>
          This article starts with the die hierarchy (GPC to TPC to SM to individual compute units), then covers the memory hierarchy (registers to HBM), then interconnects (NVLink, NVSwitch, PCIe), then enterprise features (MIG, vGPU), and finally the CUDA ecosystem and data center deployment.
        </p>
        <Callout type="important" title="Note: Building on Previous Articles">
          This article is a deep dive on top of the AI GPU article. Basic CUDA Core and HBM explanations are already covered there. Here we'll go deeper: warp divergence, SM internals, NVSwitch topology, MIG configuration, TensorRT optimization. Reading the previous article first is recommended.
        </Callout>
      </section>

      {/* ── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>AI/ML Engineers:</strong> how PyTorch code executes inside the GPU — warp scheduling, shared memory optimization, Tensor Core utilization, NCCL AllReduce.</li>
          <li><strong>Data Center Engineers:</strong> Power budgeting (kW per GPU, per rack), cooling requirements, NVLink vs PCIe topology, DGX rack design, enterprise GPU deployment.</li>
          <li><strong>System Architects:</strong> Grace+Blackwell unified memory, NVSwitch fabric design, MIG and vGPU strategy.</li>
          <li><strong>Students and Freshers:</strong> a complete mental model of an NVIDIA GPU — zero to engineer, one article.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>NVIDIA architecture evolution — from Tesla to Blackwell, each generation's actual innovation</li>
          <li>GPU die hierarchy: GPC to TPC to SM — physical organization of compute</li>
          <li>SM internals: CUDA Cores, Tensor Cores, RT Cores, Warp Schedulers, Shared Memory</li>
          <li>Thread, Warp, Block, Grid — the hardware mapping of the programming model</li>
          <li>Memory hierarchy: registers to shared memory to L1/L2 to HBM — latency and bandwidth numbers</li>
          <li>NVLink, NVSwitch, PCIe — interconnect technologies and bandwidth comparison</li>
          <li>MIG and GPU virtualization — enterprise multi-tenancy</li>
          <li>Grace CPU + Blackwell — unified memory architecture</li>
          <li>DGX and HGX platforms — NVIDIA's complete AI servers</li>
          <li>Training and inference data flow — step by step</li>
          <li>CUDA ecosystem: TensorRT, NCCL, cuDNN, driver vs toolkit</li>
          <li>Data center deployment: power (kW), cooling, rack design, monitoring</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="ai-accelerators" variant="inline" /> — NPU, DPU, FPGA, ASIC, AWS chips, Intel Gaudi, Cerebras</li>
          <li><strong>Before that:</strong> <TopicLink slug="tpu" variant="inline" /> — Google TPU, systolic array, TPU Pod</li>
          <li><strong>Foundational:</strong> <TopicLink slug="ai-gpu" variant="inline" /> — GPU basics overview</li>
          <li><strong>Current:</strong> NVIDIA Architecture — deep dive into die, SM, memory, interconnects, CUDA stack</li>
          <li><strong>Related:</strong> <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="llm" variant="inline" /></li>
        </ul>
      </section>

      {/* ── INTRODUCTION ───────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          NVIDIA's first chip arrived in 1993: the NV1. It was a graphics chip, for games. In 2006 they released CUDA — and a graphics company became a computing platform.
        </p>
        <p style={S.p}>
          But this transition wasn't an accident. Jensen Huang placed this bet back in the 1990s: a GPU could become a general-purpose parallel computer. It took 13 years to implement that bet. CUDA arrived in 2006, and initially only the scientific computing community used it. Then in 2012 AlexNet arrived — and the world saw that a GPU is perfect for neural network training.
        </p>
        <p style={S.p}>
          Today NVIDIA's data center revenue is 5x its gaming revenue. The H100 GPU had a 6-12 month waitlist in 2023. $30,000 per GPU, and demand still exceeded supply.
        </p>
        <p style={S.p}>
          <strong>But this isn't just a chip.</strong> NVIDIA built a complete stack: silicon architecture to the CUDA programming model to optimized libraries (cuDNN, cuBLAS) to framework integration to enterprise platforms (DGX, HGX) to cloud partnerships. Each layer built the foundation for the next.
        </p>
      </section>

      {/* ── WHY ARCHITECTURE ───────────────────────────────────────────── */}
      <section id="why-architecture">
        <h2 style={S.h2}>Why Architecture Understanding Matters</h2>
        <p style={S.p}>
          Let's start with a simple question: why does a GPU have 10,000+ cores while a CPU has only 8-128?
        </p>
        <p style={S.p}>
          <strong>A CPU is like a city court judge.</strong> One case at a time, but that case can be very complex. The judge is intelligent, fast, but sequential.
        </p>
        <p style={S.p}>
          <strong>A GPU is like an election counting center.</strong> Thousands of counting agents at once, all doing one simple task — count a vote. No single agent is as smart as the judge, but the aggregate throughput is a million times that of the judge for that specific task.
        </p>
        <p style={S.p}>
          In AI training: in one forward pass, the same matrix operation happens millions of times on different data. Perfectly suited for a GPU. This is the fundamental insight the entire NVIDIA architecture is built on.
        </p>
      </section>

      {/* ── EVOLUTION ──────────────────────────────────────────────────── */}
      <section id="evolution">
        <h2 style={S.h2}>Evolution — Tesla to Blackwell</h2>
        <p style={S.p}>
          Every generation solves a specific problem. This isn't just "moar power" evolution — each generation added a new capability for AI computing.
        </p>
        <Figure caption="NVIDIA Architecture Evolution from Tesla 2006 (programmable GPU, CUDA born) to Blackwell 2024 (dual-die FP4, NVLink 5.0). The AI era started with Volta 2017 when Tensor Cores dedicated to matrix multiply changed everything. Performance grew from near zero to 4,500+ TOPS FP4.">
          <ArchEvolutionTimeline />
        </Figure>
        <ComparisonTable
          title="Generation-by-Generation Key Innovations"
          headers={["Architecture", "Year", "Key Innovation", "Why It Mattered for AI", "Process"]}
          rows={[
            ["Tesla", "2006", "Programmable CUDA GPU", "Foundation — made GPU general-purpose compute possible", "90nm"],
            ["Fermi", "2010", "L2 cache + ECC + FP64", "Scientific computing, enterprise reliability", "40nm"],
            ["Kepler", "2012", "Dynamic Parallelism + Hyper-Q", "GPU launches GPU kernels — recursive algorithms enabled", "28nm"],
            ["Maxwell", "2014", "SM redesign, efficiency", "2x performance per watt — power economics improved", "28nm"],
            ["Pascal", "2016", "NVLink 1.0 + HBM2 + FP16", "Multi-GPU training viable; FP16 = faster AI training", "16nm"],
            ["Volta", "2017", "Tensor Cores 1st gen (FP16)", "5x AI speedup — dedicated matrix multiply hardware", "12nm"],
            ["Turing", "2018", "Tensor Cores 2nd gen + RT Cores", "INT8 inference accelerated; T4 inference-focused chip", "12nm"],
            ["Ampere", "2020", "TF32, MIG, 3rd gen TC, A100 80GB", "10x training speed, multi-tenancy, GPT-3 era", "7nm"],
            ["Hopper", "2022", "Transformer Engine + FP8 + H100", "3-6x LLM training speedup — ChatGPT era chip", "4nm"],
            ["Blackwell", "2024", "Dual-die + FP4 + NVLink 5.0", "Trillion-parameter models, 7x FP8 inference", "4nm"],
          ]}
        />
        <p style={S.p}>
          Notice: the game-changing moment for AI was Volta (2017). Tensor Cores moved matrix multiply into dedicated hardware. Philosophy shift: "GPU is primarily for AI now, graphics secondary in data center products."
        </p>
        <p style={S.p}>
          <strong>Tesla (2006):</strong> CUDA was born. The GPU became programmable for the first time. Before this, a GPU had a fixed graphics pipeline — shaders were pre-defined. The unified shader architecture created general-purpose programmable cores. Without Tesla, no CUDA. Without CUDA, no AI GPU revolution.
        </p>
        <p style={S.p}>
          <strong>Pascal (2016):</strong> NVLink 1.0 and HBM2 — multi-GPU training became viable. FP16 support — training 2x faster, 2x less memory. The GTX 1080 became THE GPU for AI researchers in 2016-17.
        </p>
        <p style={S.p}>
          <strong>Volta (2017):</strong> Tensor Cores introduced. V100: 640 Tensor Cores, 120 TFLOPS FP16 (vs P100's 21 TFLOPS). 5x AI speedup. NVIDIA clearly decided "AI is our future." That was the moment.
        </p>
        <p style={S.p}>
          <strong>Ampere (2020):</strong> TF32 (10x faster FP32 training with no code changes), A100 80GB, MIG (multi-tenant GPU), structural sparsity (2:4 — 2x speedup for sparse models). GPT-3 was trained here.
        </p>
        <p style={S.p}>
          <strong>Hopper (2022):</strong> Transformer Engine + FP8. On H100, LLM training is 3-6x faster than A100. FP8 auto-managed by hardware — no code changes needed. H100 had a 6-12 month waitlist in 2023.
        </p>
        <p style={S.p}>
          <strong>Blackwell (2024):</strong> Dual-die design (2 dies on one package via NVLink-C2C), FP4 support (first in industry — 2x faster than FP8), NVLink 5.0 (1,800 GB/s), GB200 NVL72 (36 Grace CPUs + 72 Blackwell GPUs per rack, 1.4 EFLOPS FP4, 120+ kW).
        </p>
      </section>

      {/* ── DIE HIERARCHY ──────────────────────────────────────────────── */}
      <section id="die-hierarchy">
        <h2 style={S.h2}>GPU Die Hierarchy — GPC, TPC, SM</h2>
        <p style={S.p}>
          A GPU die is the physical layout inside the chip. H100 has 80 billion transistors — they don't sit randomly. There's a hierarchical organization, like the structure of a city.
        </p>
        <p style={S.p}>
          <strong>City analogy:</strong> Die = the entire city. GPC = city zones (commercial, residential). TPC = city blocks within each zone. SM = individual buildings. CUDA Core / Tensor Core = individual offices inside buildings. Data flows between buildings, zones, city-wide — just like city infrastructure.
        </p>
        <Figure caption="GPU Die Hierarchy (H100 reference): Die contains 8 GPCs, each GPC has 4 TPCs, each TPC has 2 SMs. Total: 132 SMs. Each SM has 128 CUDA Cores, 4 Tensor Cores (4th gen), 4 Warp Schedulers, 256KB Shared Memory/L1, and 256KB Register File. Total GPU: 16,896 CUDA Cores, 528 4th-gen Tensor Cores.">
          <GpuDieHierarchy />
        </Figure>
      </section>

      {/* ── GPC ────────────────────────────────────────────────────────── */}
      <section id="gpc">
        <h2 style={S.h2}>GPC — Graphics Processing Cluster</h2>
        <p style={S.p}>
          <strong>GPC (Graphics Processing Cluster)</strong> — the biggest functional block on a GPU die. H100 has 8 GPCs. Each GPC can independently execute parallel work.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> a GPC is like a university college with multiple departments (TPCs). Resources are shared within the college. But one college is independent of another — if one college goes down, the other is unaffected.
        </p>
        <ul style={S.ul}>
          <li><strong>Contains:</strong> Multiple TPCs (4 per GPC in H100), Raster Engine (graphics, less AI-relevant), Work distributor (automatically routes thread blocks to TPCs).</li>
          <li><strong>Fault tolerance:</strong> if one GPC is defective, the manufacturer disables it and sells the rest of the chip. This is why some SKUs have slightly less compute than the full die — yield management.</li>
          <li><strong>Work distribution:</strong> the CUDA runtime automatically assigns thread blocks to GPCs. The programmer doesn't have to manage it — GPC selection is transparent.</li>
        </ul>
      </section>

      {/* ── TPC ────────────────────────────────────────────────────────── */}
      <section id="tpc">
        <h2 style={S.h2}>TPC — Texture Processing Cluster</h2>
        <p style={S.p}>
          <strong>TPC (Texture Processing Cluster)</strong> — the next level inside a GPC. A TPC has 2 SMs plus shared texture units and an L1 instruction cache.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> a TPC is like a department in a university. Inside the department there are 2 labs (SMs) that share the same equipment — the department's library, shared tools. The labs work independently but share efficiently.
        </p>
        <ul style={S.ul}>
          <li><strong>Contains:</strong> 2 SMs + Texture units (graphics texture sampling) + L1 instruction cache (shared between the 2 SMs — less redundant storage).</li>
          <li><strong>AI relevance:</strong> texture units aren't directly used in AI training. But a shared instruction cache ensures the same kernel code running on adjacent SMs doesn't need separate copies — area efficient.</li>
          <li><strong>Why this level exists:</strong> Resource sharing efficiency. 2 SMs sharing texture units = more area-efficient than 2 fully independent SMs. Chip area is expensive.</li>
        </ul>
      </section>

      {/* ── SM ─────────────────────────────────────────────────────────── */}
      <section id="sm">
        <h2 style={S.h2}>SM — Streaming Multiprocessor</h2>
        <p style={S.p}>
          <strong>SM (Streaming Multiprocessor)</strong> — the actual compute heart of the GPU. When you do GPU programming, your code executes on an SM. H100 has 132 SMs — all working independently in parallel.
        </p>
        <p style={S.p}>
          <strong>Open-plan office analogy:</strong> an SM is like an open-plan office. CUDA Cores = general workers (any calculation). Tensor Cores = AI matrix specialists (only matrix multiply). Shared Memory = the office whiteboard (team access). Registers = each employee's private notepad. Warp Scheduler = the office manager (decides who works on what each cycle).
        </p>
        <Figure caption="SM (Streaming Multiprocessor) internal architecture (H100): 4 Warp Schedulers pick which 32-thread warp runs each cycle. 128 CUDA Cores do general floating-point math (1 op per core per cycle). 4 Tensor Cores do matrix multiply — AI engine (128+ ops per cycle each). 1 RT Core for ray tracing graphics. 32 Special Function Units for sin/cos/sqrt. 256KB Shared Memory/L1 Cache (team whiteboard, fast, ~1 cycle). 256KB Register File (private per-thread notepad, zero latency). Load/Store Units handle all memory requests and coalescing.">
          <SmInternalDiagram />
        </Figure>
        <p style={S.p}>
          <strong>H100 SM concrete numbers:</strong>
        </p>
        <ul style={S.ul}>
          <li>4 Warp Schedulers — can dispatch 4 warps simultaneously each cycle</li>
          <li>128 CUDA Cores (FP32) — general arithmetic, one op per core per cycle</li>
          <li>4 Tensor Cores (4th gen, H100) — matrix multiply-accumulate, FP8/BF16/FP16/TF32/INT8/INT4</li>
          <li>1 RT Core — ray-triangle intersection (graphics only, removed in pure AI GPUs like A100)</li>
          <li>32 SFUs (Special Function Units) — sin, cos, sqrt, reciprocal</li>
          <li>32 LSUs (Load/Store Units) — handle memory read/write</li>
          <li>256 KB Shared Memory / L1 Cache — configurable split, fast on-chip</li>
          <li>256 KB Register File — 65,536 32-bit registers, per-thread private</li>
        </ul>
      </section>

      {/* ── CUDA CORES ─────────────────────────────────────────────────── */}
      <section id="cuda-cores">
        <h2 style={S.h2}>CUDA Cores — The General Workers</h2>
        <p style={S.p}>
          <strong>CUDA Core</strong> — the GPU's basic floating point arithmetic unit. A CUDA Core performs one operation (add, multiply, or fused multiply-add) per clock cycle. H100: 132 SMs x 128 CUDA Cores = 16,896 CUDA Cores total.
        </p>
        <p style={S.p}>
          <strong>Important clarification:</strong> a CUDA Core is not a "core" like a CPU core. A CPU core is an independent computer — its own instruction decoder, branch predictor, out-of-order execution. A CUDA Core is just an arithmetic logic unit (ALU) — a basic math unit that operates with the warp.
        </p>
        <ul style={S.ul}>
          <li><strong>What CUDA Cores do in AI:</strong> Activation functions (ReLU, GELU, sigmoid — applied element-wise), normalization (layer norm, batch norm), scaling operations, integer address calculations.</li>
          <li><strong>What they don't do primarily:</strong> Matrix multiplication — that is Tensor Cores' job. CUDA Cores can do it but Tensor Cores 64-128x faster per cycle.</li>
          <li><strong>Think of it this way:</strong> Neural network forward pass: Tensor Cores do heavy matrix multiply (90% compute). CUDA Cores do activation function after each layer (10% compute). Both necessary, different specialists.</li>
        </ul>
      </section>

      {/* ── TENSOR CORES ───────────────────────────────────────────────── */}
      <section id="tensor-cores">
        <h2 style={S.h2}>Tensor Cores — The AI Specialists</h2>
        <p style={S.p}>
          <strong>Tensor Core</strong> — dedicated hardware that specifically performs the <code style={S.code}>D = A×B + C</code> matrix multiply-accumulate operation. Introduced in Volta, improved in every generation.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> a CUDA Core is a calculator — press one button, get one result. A Tensor Core is a specialized machine that multiplies a whole 4x4 table with one button, simultaneously — 128 buttons' worth of work in one click.
        </p>
        <ComparisonTable
          title="Tensor Core Generations — Each Generation Added New AI Capabilities"
          headers={["Generation", "Architecture", "Supported Formats", "Key Addition"]}
          rows={[
            ["1st Gen", "Volta (V100)", "FP16 → FP32 accumulation", "First dedicated matrix multiply hardware — 5x AI speedup"],
            ["2nd Gen", "Turing (T4, RTX)", "FP16 + INT8 + INT4", "INT8/INT4 for inference acceleration"],
            ["3rd Gen", "Ampere (A100)", "TF32, BF16, FP16, INT8, INT4", "TF32 (10x FP32 training), structural sparsity 2:4"],
            ["4th Gen", "Hopper (H100)", "FP8, BF16, FP16, TF32, INT8", "FP8 + Transformer Engine automatic precision"],
            ["5th Gen", "Blackwell (B100)", "FP4, FP6, FP8, BF16, FP16", "FP4 for maximum inference quantization"],
          ]}
        />
        <p style={S.p}>
          <strong>Concrete example — how Tensor Core works:</strong> H100 4th gen Tensor Core: Matrix A (16x16, FP8) x Matrix B (16x16, FP8) + Matrix C (16x16, FP32) = Result D (16x16, FP32). This entire operation happens in ONE clock cycle. That is 2 x 16 x 16 x 16 = 8,192 multiply-add operations in one cycle. Compare: CUDA Core = 1 operation per cycle.
        </p>
        <Callout type="important" title="Why FP8 + Transformer Engine is H100's Biggest Deal">
          FP8 Tensor Cores are 2x faster than BF16 per clock. Transformer Engine automatically switches between FP8 and FP16 per-layer based on numerical stability — no manual code changes. For transformer models (BERT, GPT, LLaMA): 3x speedup vs A100 at BF16. This is why every LLM training team upgraded from A100 to H100 — the speedup is that significant for their specific workloads.
        </Callout>
      </section>

      {/* ── RT CORES ───────────────────────────────────────────────────── */}
      <section id="rt-cores">
        <h2 style={S.h2}>RT Cores — Ray Tracing Hardware</h2>
        <p style={S.p}>
          <strong>RT Core (Ray Tracing Core)</strong> — introduced in Turing, specifically for ray tracing acceleration in 3D graphics. Does BVH (Bounding Volume Hierarchy — a 3D spatial data structure) traversal and ray-triangle intersection in hardware.
        </p>
        <p style={S.p}>
          <strong>Not directly used in AI.</strong> RT Cores are removed from A100 and H100 — data center GPUs don't need them. Present in consumer and professional visualization GPUs (RTX 4090, RTX 6000 Ada).
        </p>
        <p style={S.p}>
          <strong>Indirect AI applications:</strong> synthetic training data generation in computer vision research (photo-realistic ray-traced images), scientific visualization, AI-assisted rendering research. Niche — not mainstream AI training/inference.
        </p>
      </section>

      {/* ── WARP SCHEDULER ─────────────────────────────────────────────── */}
      <section id="warp-scheduler">
        <h2 style={S.h2}>Warp and Warp Scheduler</h2>
        <p style={S.p}>
          <strong>Warp</strong> — the fundamental execution unit of the GPU programming model. A warp is a group of 32 threads that execute in lockstep — same instruction, same time, all 32 threads.
        </p>
        <p style={S.p}>
          <strong>Classroom analogy:</strong> 32 students are in a class. The teacher (Warp Scheduler) gives an instruction — "read page 5." All 32 people read page 5 simultaneously. No independent action — everyone waits until the teacher gives the next instruction.
        </p>
        <p style={S.p}>
          <strong>Warp Divergence — the performance killer:</strong> when threads in a warp take different branches: <code style={S.code}>{`if (thread_id % 2 == 0) { path_A(); } else { path_B(); }`}</code>. The GPU serializes: Phase 1 — even threads run path_A, odd idle. Phase 2 — odd threads run path_B, even idle. 2x slower worst case. N distinct paths = N x slowdown. Avoid it: design the data layout so same-warp threads take the same path.
        </p>
        <p style={S.p}>
          <strong>The Warp Scheduler's superpower — latency hiding:</strong> each SM has 4 Warp Schedulers. Up to 64 warps (2,048 threads) are tracked simultaneously on one SM. When one warp is waiting on a memory operation (loading data from HBM — ~200 cycles), the scheduler immediately picks another ready warp and executes it.
        </p>
        <p style={S.p}>
          <strong>Waiter analogy:</strong> a waiter serves 10 tables. Took table 1's order, went to the kitchen. On the way back, gave table 2 water, took table 3's bill, gave table 4 a menu. By the time table 1's food is ready, the waiter was never idle. Same with a GPU — when one warp waits, run another. No idle time.
        </p>
        <Callout type="best-practice" title="Occupancy — More Warps = Better Latency Hiding">
          Occupancy = active warps per SM / maximum possible warps per SM. High occupancy = better latency hiding = better performance. How to improve it: reduce register count per thread (more threads fit per SM), optimize shared memory usage (less shared memory = more blocks per SM). Tool: occupancy analysis is built into Nsight Compute — use it before manual optimization.
        </Callout>
      </section>

      {/* ── THREAD BLOCK GRID ──────────────────────────────────────────── */}
      <section id="thread-block-grid">
        <h2 style={S.h2}>Thread, Block, and Grid</h2>
        <p style={S.p}>
          This is the foundation of the GPU programming model — and it maps directly to hardware.
        </p>
        <Figure caption="GPU Programming Hierarchy: 32 Threads form a Warp (hardware concept, lockstep execution). Multiple Warps form a Block (programmer-defined, up to 1024 threads, shares Shared Memory). Multiple Blocks form a Grid (entire problem). Hardware mapping: each Block runs on one SM; Grid distributed across all SMs automatically by CUDA runtime. Programmer never manages SM assignment directly — CUDA handles it.">
          <ThreadBlockGridDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Thread:</strong> the smallest unit. Its own registers and local memory. A unique thread ID. Hardware: one CUDA Core operation or a fraction of a Tensor Core.</li>
          <li><strong>Warp:</strong> 32 threads — a hardware concept. The programmer mostly doesn't control this directly. Lockstep execution.</li>
          <li><strong>Block (Thread Block):</strong> programmer-defined, 1-1,024 threads. Threads inside a block can access shared memory and synchronize with <code style={S.code}>__syncthreads()</code>. Hardware: one block executes on one SM.</li>
          <li><strong>Grid:</strong> the collection of all blocks — the whole problem. The CUDA runtime automatically distributes blocks across SMs. The programmer doesn't manage GPU hardware details.</li>
        </ul>
        <p style={S.p}>
          <strong>Concrete example — image processing:</strong> processing a 1024x1024 image. Block size = 16x16 = 256 threads. Grid size = 64x64 = 4,096 blocks. Each thread handles one pixel. The GPU automatically assigns blocks to SMs. With 132 SMs, roughly 31 blocks per SM initially, more as blocks finish. The programmer defined this in 2 lines — the GPU handled the rest.
        </p>
      </section>

      {/* ── REGISTERS ──────────────────────────────────────────────────── */}
      <section id="registers">
        <h2 style={S.h2}>Registers — The Fastest Memory</h2>
        <p style={S.p}>
          <strong>Registers</strong> — the fastest level of the GPU memory hierarchy. On-chip, zero additional latency. H100's SM has 65,536 32-bit registers — 256 KB total per SM.
        </p>
        <p style={S.p}>
          <strong>Desk analogy:</strong> registers are items on your desk — instant access. More items = less space for others (crowded = less efficient). If the desk fills up, items go to a cabinet (local memory = register spill — much slower).
        </p>
        <p style={S.p}>
          <strong>Register pressure — a hidden performance issue:</strong> the register file is finite. If a thread uses more registers, fewer concurrent threads fit on one SM. Occupancy drops. Latency hiding ability reduces. Performance suffers. The NVCC compiler automatically manages spilling — but minimizing spilling = better performance.
        </p>
      </section>

      {/* ── SHARED MEMORY ──────────────────────────────────────────────── */}
      <section id="shared-memory">
        <h2 style={S.h2}>Shared Memory — The Team Whiteboard</h2>
        <p style={S.p}>
          <strong>Shared Memory</strong> — the on-chip memory shared by all threads inside one SM. The programmer manages it explicitly. H100: 256 KB per SM (configurable split with L1 cache). ~1-5 cycle latency vs HBM's 200+ cycles.
        </p>
        <p style={S.p}>
          <strong>Whiteboard analogy:</strong> 32 students (threads) are in a class. Each has their own notes (registers). Shared memory is a class whiteboard — anyone can write and read from it. Write a data item to the whiteboard once, everyone uses it — each student doesn't need their own copy.
        </p>
        <p style={S.p}>
          <strong>How shared memory enables fast matrix multiply — tiling:</strong>
        </p>
        <ol style={S.ol}>
          <li>Cooperatively load a tile (sub-matrix) of matrix A into shared memory (all block threads together)</li>
          <li>Load the corresponding tile of matrix B into shared memory</li>
          <li>All threads access data from fast shared memory to do computations (~1 cycle per access)</li>
          <li>Load the next tile, accumulate results</li>
        </ol>
        <p style={S.p}>
          Result: data is loaded from HBM only once per tile, and reused from shared memory. Naive approach: each thread independently loads data from HBM. Tiled approach: load once, compute many times — arithmetic intensity improves dramatically. This is why cuBLAS, cuDNN, and FlashAttention all use tiling.
        </p>
        <Callout type="warning" title="Shared Memory Bank Conflicts">
          Shared memory is internally organized into 32 banks. If multiple threads in a warp access the same bank simultaneously — access becomes serial, slow. Solution: design the access pattern so different threads access different banks. Padding technique: add a stride to the array to avoid alignment-based conflicts. Nsight Compute has a "shared memory bank conflicts" metric — check it.
        </Callout>
      </section>

      {/* ── L1 L2 CACHE ────────────────────────────────────────────────── */}
      <section id="l1-l2-cache">
        <h2 style={S.h2}>L1 and L2 Cache</h2>
        <p style={S.p}>
          <strong>L1 Cache</strong> — a hardware-managed cache inside the SM. Shares the same physical SRAM as shared memory (H100: 256 KB configurable). L1 is managed automatically by hardware — the programmer explicitly controls shared memory, hardware handles L1.
        </p>
        <p style={S.p}>
          L1 cache: caches frequently accessed global memory data. Holds register spills. Hit rate matters — an L1 miss checks L2, an L2 miss goes to HBM access (slow).
        </p>
        <p style={S.p}>
          <strong>L2 Cache</strong> — a GPU-wide unified cache. H100: 50 MB L2 (25% more than A100's 40 MB). Shared by all SMs. L1 miss → check L2 → HBM if L2 also misses.
        </p>
        <ul style={S.ul}>
          <li><strong>L2 hit rate importance:</strong> when multiple SMs access the same data → L2 serves it efficiently without multiple trips to HBM. Small models: weights fit entirely in L2 → effectively infinite bandwidth for those weights.</li>
          <li><strong>H100 50 MB L2:</strong> Some BERT-base class models completely fit. Inference dramatically faster for such models. For large LLMs: L2 as staging buffer between HBM and compute.</li>
          <li><strong>Bandwidth:</strong> L2 to SM aggregate bandwidth much higher than HBM. L2 hit = dramatically faster than HBM miss.</li>
        </ul>
      </section>

      {/* ── HBM ────────────────────────────────────────────────────────── */}
      <section id="hbm">
        <h2 style={S.h2}>HBM — The Main Memory</h2>
        <p style={S.p}>
          <strong>HBM (High Bandwidth Memory)</strong> — the GPU's main DRAM. Model weights, activations, training data, gradients — all stored here. This was covered in detail in the AI GPU article; here we go deeper from an engineering perspective.
        </p>
        <Figure caption="GPU Memory Hierarchy Pyramid (H100): Registers at top (per-thread, 256KB per SM, zero latency). Shared Memory/L1 Cache (per-block, 256KB per SM, 1-5 cycles). L2 Cache (GPU-wide, 50MB, ~100 cycles). HBM Main Memory (80GB, 3.35 TB/s bandwidth, 200+ cycles). CPU DRAM via PCIe (slowest, 128 GB/s). Higher up = faster, smaller, more expensive per bit. AI optimization: maximize data reuse in fast top layers, minimize slow HBM access.">
          <MemoryHierarchyPyramid />
        </Figure>
        <ComparisonTable
          title="HBM Evolution in NVIDIA Data Center GPUs"
          headers={["GPU", "HBM Type", "Capacity", "Bandwidth", "Notes"]}
          rows={[
            ["V100 SXM2", "HBM2", "32 GB", "900 GB/s", "First HBM2 in data center GPU"],
            ["A100 SXM4 80GB", "HBM2e", "80 GB", "2 TB/s", "2x V100 bandwidth"],
            ["H100 SXM5", "HBM3", "80 GB", "3.35 TB/s", "67% more bandwidth vs A100"],
            ["H200 SXM5", "HBM3e", "141 GB", "4.8 TB/s", "Nearly 2x capacity vs H100"],
            ["B100 Blackwell", "HBM3e", "192 GB per die", "8 TB/s", "Dual die = massive capacity"],
          ]}
        />
        <p style={S.p}>
          <strong>Compute-bound vs Memory-bound — critical distinction:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Compute-bound:</strong> Tensor Cores running near 100%, HBM bandwidth underutilized. Large batch dense matrix multiply. Solution: more aggressive quantization (FP8 — more ops per HBM byte loaded).</li>
          <li><strong>Memory-bound:</strong> HBM bandwidth saturated, Tensor Cores waiting for data. LLM inference with small batch (weights loaded repeatedly, little compute per byte). Solution: larger batches, weight compression, H200 (more bandwidth), or architectural tricks (FlashAttention).</li>
        </ul>
        <p style={S.p}>
          <strong>Arithmetic intensity</strong> = FLOPs / bytes from memory. High = compute-bound (efficient). Low = memory-bound (need more bandwidth or less data movement). FlashAttention famously increased arithmetic intensity for attention by recomputing activations on-chip instead of storing them in HBM.
        </p>
      </section>

      {/* ── MEMORY CONTROLLERS ─────────────────────────────────────────── */}
      <section id="memory-controllers">
        <h2 style={S.h2}>Memory Controllers and ECC</h2>
        <p style={S.p}>
          <strong>Memory Controllers</strong> — dedicated hardware units that manage HBM access. H100: 6 HBM stacks, one memory controller per stack. They queue SM requests, optimize burst transfers, and handle simultaneous requests.
        </p>
        <p style={S.p}>
          <strong>ECC (Error Correcting Code) Memory</strong> — a critical feature of enterprise GPUs. Cosmic rays, electrical noise, and hardware aging can flip bits. ECC: extra check bits per memory word. Hardware auto-detects single-bit errors and corrects them in place.
        </p>
        <ul style={S.ul}>
          <li><strong>Single-bit errors (SBE, correctable):</strong> Auto-fixed, logged. Periodic occurrence normal. Increasing SBE rate = hardware degrading, plan replacement.</li>
          <li><strong>Double-bit errors (DBE, uncorrectable):</strong> detected, cannot auto-correct. The training job will crash. A DBE means immediate investigation, GPU replacement is likely needed.</li>
          <li><strong>ECC overhead:</strong> ~5% HBM bandwidth, ~2-3% usable memory. Always worth it for: multi-week training runs, production inference, medical/financial AI.</li>
          <li><strong>Check:</strong> <code style={S.code}>nvidia-smi -q | grep -i ecc</code> or via DCGM monitoring.</li>
        </ul>
      </section>

      {/* ── NVLINK ─────────────────────────────────────────────────────── */}
      <section id="nvlink">
        <h2 style={S.h2}>NVLink — GPU-to-GPU Highway</h2>
        <p style={S.p}>
          <strong>NVLink</strong> — NVIDIA's proprietary high-speed GPU-to-GPU interconnect. Designed as an alternative to PCIe specifically for GPU-to-GPU communication.
        </p>
        <p style={S.p}>
          <strong>Highway analogy:</strong> PCIe is a single-lane national highway — fast but limited. NVLink is a 12-lane expressway dedicated purely to GPU traffic — much higher throughput.
        </p>
        <Figure caption="NVLink + NVSwitch Topology in DGX H100: 8 H100 GPUs (purple) each connected to all 4 NVSwitch chips (green). Any GPU can communicate with any other at full 900 GB/s NVLink 4.0 bandwidth. Aggregate: 7.2 TB/s GPU-to-GPU. Compare to PCIe (thin dashed red line from GPU to CPU) at only 128 GB/s — NVLink is 7x faster for GPU-to-GPU communication.">
          <NvlinkTopologyDiagram />
        </Figure>
        <ComparisonTable
          title="NVLink Generations — Doubling Roughly Every 2 Years"
          headers={["Version", "Year", "Bandwidth (bidirectional)", "Architecture", "vs PCIe (same era)"]}
          rows={[
            ["NVLink 1.0", "2016", "160 GB/s", "Pascal P100", "~5x PCIe 3.0"],
            ["NVLink 2.0", "2017", "300 GB/s", "Volta V100", "~9x PCIe 3.0"],
            ["NVLink 3.0", "2020", "600 GB/s", "Ampere A100", "~9x PCIe 4.0"],
            ["NVLink 4.0", "2022", "900 GB/s", "Hopper H100", "~7x PCIe 5.0"],
            ["NVLink 5.0", "2024", "1,800 GB/s", "Blackwell B100", "~14x PCIe 5.0"],
            ["NVLink-C2C", "2024", "900 GB/s", "Grace-Blackwell", "CPU-GPU coherent link"],
          ]}
        />
        <p style={S.p}>
          <strong>Training impact — concrete numbers:</strong> 70B model gradient sync at BF16 = 280 GB per AllReduce step. NVLink 4.0 (DGX H100): 280 GB / 900 GB/s = ~0.31 seconds. PCIe 5.0 only: 280 GB / 128 GB/s = ~2.2 seconds. Difference: ~1.9 seconds per training step. At millions of training steps: enormous accumulated time difference. NVLink is not optional for serious multi-GPU training.
        </p>
        <Callout type="important" title="SXM vs PCIe Form Factor — NVLink Availability">
          NVLink is only available on SXM (server-class) form factor GPUs. H100 PCIe: no NVLink, PCIe only for GPU-to-GPU communication. H100 SXM5: full NVLink 4.0 (900 GB/s). For multi-GPU training: always the SXM form factor. The cost premium is fully justified by training throughput at scale.
        </Callout>
      </section>

      {/* ── NVSWITCH ───────────────────────────────────────────────────── */}
      <section id="nvswitch">
        <h2 style={S.h2}>NVSwitch — The GPU Fabric</h2>
        <p style={S.p}>
          <strong>NVSwitch</strong> — a dedicated switch chip that connects multiple GPUs at full any-to-any bandwidth.
        </p>
        <p style={S.p}>
          <strong>Without NVSwitch:</strong> 8 GPUs in a daisy-chain. GPU 0 and GPU 7 can't communicate directly — intermediate GPUs have to relay. Bandwidth is shared, latency is high.
        </p>
        <p style={S.p}>
          <strong>With NVSwitch:</strong> a dedicated router. Any GPU to any GPU directly — full NVLink bandwidth, low latency. A non-blocking fabric — all pairs can communicate simultaneously at full speed.
        </p>
        <ul style={S.ul}>
          <li><strong>DGX H100:</strong> 4 NVSwitches, 8 H100 GPUs. Total aggregate: 7.2 TB/s. Any GPU pair: full 900 GB/s simultaneously.</li>
          <li><strong>NVSwitch chip specs (Hopper era):</strong> Each NVSwitch has 64 NVLink ports. Connects up to 8 GPUs in DGX. Non-blocking.</li>
          <li><strong>Scaling beyond DGX:</strong> Multiple DGX nodes via InfiniBand. Within DGX: NVSwitch. Between nodes: IB HDR/NDR. DGX SuperPOD: 20 DGX H100 + IB spine-leaf.</li>
          <li><strong>Blackwell NVSwitch:</strong> 130 TB/s total switch bandwidth — connects up to 576 GPUs in a supercluster.</li>
        </ul>
      </section>

      {/* ── PCIE ───────────────────────────────────────────────────────── */}
      <section id="pcie">
        <h2 style={S.h2}>PCIe — The Standard Interface</h2>
        <p style={S.p}>
          <strong>PCIe (Peripheral Component Interconnect Express)</strong> — the standard interface that connects a GPU to the CPU. Universal — every server uses PCIe for expansion cards.
        </p>
        <ComparisonTable
          headers={["PCIe Gen", "x16 Slot Bandwidth (bidirectional)", "GPU Generation", "Practical AI Limitation"]}
          rows={[
            ["PCIe 3.0", "32 GB/s", "Pascal, Volta", "Major bottleneck for large data transfer"],
            ["PCIe 4.0", "64 GB/s", "Some Ampere configs", "Better but still limited vs NVLink"],
            ["PCIe 5.0", "128 GB/s", "Hopper, Blackwell PCIe", "7x less than NVLink 4.0"],
          ]}
        />
        <p style={S.p}>
          <strong>PCIe bottleneck solutions:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>GPUDirect Storage:</strong> the GPU reads directly from an NVMe SSD — CPU bypass. Significantly reduces the training data IO bottleneck.</li>
          <li><strong>GPUDirect RDMA:</strong> the GPU receives data directly from the InfiniBand network — CPU bypass for network traffic. Accelerates gradient sync and the data pipeline.</li>
          <li><strong>Pinned memory:</strong> <code style={S.code}>cudaMallocHost()</code> — page-locked CPU memory. 2x faster H2D/D2H transfers vs pageable memory.</li>
          <li><strong>Grace-Blackwell solution:</strong> NVLink-C2C — 900 GB/s coherent CPU-GPU link. PCIe completely bypass for CPU-GPU. 7x improvement over PCIe 5.0.</li>
        </ul>
      </section>

      {/* ── MIG ────────────────────────────────────────────────────────── */}
      <section id="mig">
        <h2 style={S.h2}>MIG — Multi-Instance GPU</h2>
        <p style={S.p}>
          <strong>MIG (Multi-Instance GPU)</strong> — introduced with A100. Partitioning a physical H100 into up to 7 hardware-isolated independent instances.
        </p>
        <p style={S.p}>
          <strong>The problem it solves:</strong> H100 is massively powerful. A single inference job uses only 10-15% of the GPU. The rest is wasted. MIG: one GPU serves multiple tenants simultaneously — each hardware-isolated.
        </p>
        <Figure caption="MIG Configurations on H100 80GB: Left shows full GPU (no MIG, one workload). Middle shows 7 smallest instances (1g.10gb each — 1/7 compute, 10GB HBM each, 7 independent users). Right shows mixed configuration: one 3g.40gb (production training) + one 2g.20gb (inference serving) + two 1g.10gb (development). Hardware-isolated — one instance cannot access another's SMs, L2 cache, or HBM memory.">
          <MigConfigDiagram />
        </Figure>
        <ComparisonTable
          title="H100 80GB MIG Profiles"
          headers={["Profile", "Compute (SMs)", "Memory", "Max Instances", "Best Use"]}
          rows={[
            ["1g.10gb", "~16 SMs (1/8)", "10 GB HBM", "7", "Dev, small inference, experiments"],
            ["2g.20gb", "~32 SMs (1/4)", "20 GB HBM", "3", "Medium inference serving"],
            ["3g.40gb", "~48 SMs (3/8)", "40 GB HBM", "2", "Training small models, large inference"],
            ["4g.40gb", "~64 SMs (1/2)", "40 GB HBM", "1", "Training medium models"],
            ["7g.80gb", "~112 SMs (full)", "80 GB HBM", "1", "Full GPU — same as non-MIG"],
          ]}
        />
        <ul style={S.ul}>
          <li><strong>Enable MIG:</strong> <code style={S.code}>nvidia-smi -i 0 -mig 1</code> then <code style={S.code}>nvidia-smi mig -cgi 3g.40gb,2g.20gb,2g.20gb -C</code></li>
          <li><strong>MIG vs Time-Slicing:</strong> MIG = truly simultaneous hardware isolation. Time-slicing = GPU switches between users (latency spikes possible). MIG preferred for latency-sensitive.</li>
          <li><strong>Limitations:</strong> Live migration unsupported (vGPU supports it). GPU restart needed to enable/disable. Cannot resize instances without destroying — plan upfront.</li>
        </ul>
        <Callout type="best-practice" title="MIG Business Case">
          Cloud inference: 1 H100 to 7 isolated customer instances = 7x revenue per GPU vs single-tenant. Research clusters: 7 researchers each get dedicated slice. Mixed workloads: production inference on 3g.40gb, development on two 1g.10gb — all simultaneously, hardware isolated. GPU consistently below 60% utilization? MIG candidate.
        </Callout>
      </section>

      {/* ── GPU VIRTUALIZATION ─────────────────────────────────────────── */}
      <section id="gpu-virtualization">
        <h2 style={S.h2}>GPU Virtualization — vGPU</h2>
        <p style={S.p}>
          <strong>vGPU (Virtual GPU)</strong> — NVIDIA's enterprise GPU virtualization solution for VM environments. On VMware ESXi or KVM, multiple VMs can share one physical GPU.
        </p>
        <ComparisonTable
          title="MIG vs vGPU — Key Differences"
          headers={["Feature", "MIG", "vGPU"]}
          rows={[
            ["Isolation level", "Hardware (complete, silicon-level)", "Software + hardware (driver-enforced)"],
            ["Hypervisor requirement", "None — bare metal or containers", "Required — VMware, KVM, Citrix"],
            ["Live VM migration", "Not supported", "Supported (vMotion compatible)"],
            ["Concurrent execution", "True simultaneous", "True simultaneous (driver managed)"],
            ["Licensing", "Included with GPU", "NVIDIA AI Enterprise subscription"],
            ["When to choose", "Kubernetes, Docker, bare metal", "VMware/KVM VM environments"],
          ]}
        />
        <p style={S.p}>
          <strong>vGPU types:</strong> vCS (vCompute Server) — AI compute only, no graphics. vWS (vWorkstation) — 3D graphics + AI. vDWS — high-end VDI with GPU. For AI data centers: vCS most relevant. NVIDIA AI Enterprise subscription required for production vGPU use — per GPU per year pricing.
        </p>
      </section>

      {/* ── GRACE BLACKWELL ────────────────────────────────────────────── */}
      <section id="grace-blackwell">
        <h2 style={S.h2}>Grace CPU + Blackwell — Unified Architecture</h2>
        <p style={S.p}>
          <strong>Grace CPU</strong> — NVIDIA's ARM-based server processor. 72 Neoverse V2 cores, 512 GB of LPDDR5X memory with 500 GB/s bandwidth. Why did NVIDIA build a CPU? To eliminate the PCIe bottleneck between CPU and GPU.
        </p>
        <p style={S.p}>
          <strong>Traditional server:</strong> CPU (Intel/AMD) ←PCIe 5.0 (128 GB/s)→ GPU. CPU and GPU memory are completely separate address spaces. Data transfer = an explicit cudaMemcpy over PCIe — slow.
        </p>
        <p style={S.p}>
          <strong>GB200 Grace-Blackwell:</strong> Grace CPU + Blackwell GPU in the same package. NVLink-C2C connection: 900 GB/s coherent bandwidth (7x PCIe 5.0). CPU memory (512 GB LPDDR5X) + GPU HBM3e (192 GB) = a unified 704 GB addressable space. No explicit copies needed — the GPU accesses CPU memory directly via NVLink-C2C.
        </p>
        <ul style={S.ul}>
          <li><strong>AI benefit:</strong> 405B parameter model needs ~810 GB at BF16. H100: 80 GB — doesn't fit. GB200: 704 GB unified — fits. Inference possible without complex multi-node sharding.</li>
          <li><strong>GB200 NVL72:</strong> 36 Grace CPUs + 72 Blackwell GPUs per rack, NVLink 5.0 fabric, 1.4 EFLOPS FP4 total, 120+ kW, liquid cooling mandatory.</li>
          <li><strong>Memory coherency:</strong> CPU and GPU in the same cache coherence domain. NUMA-like access — hot data in GPU HBM, warm data in CPU LPDDR5X. No PCIe page table crossing.</li>
        </ul>
        <Callout type="important" title="DC Engineer Alert: GB200 NVL72 Infrastructure">
          Power: 120+ kW per rack — dedicated high-amperage circuits, large UPS. Cooling: direct liquid cooling only, no air option at this density. Floor load: significantly heavier — structural assessment. Network: 400GbE management + IB NDR inter-rack. GB200 NVL72 is not standard DC infrastructure. Design and budget from day 1.
        </Callout>
      </section>

      {/* ── DGX AND HGX ────────────────────────────────────────────────── */}
      <section id="dgx-hgx">
        <h2 style={S.h2}>DGX and HGX Platforms</h2>
        <p style={S.p}>
          <strong>DGX (Data Center GPU Extreme)</strong> — NVIDIA's complete, validated AI server. GPUs, CPUs, interconnects, storage, networking, software stack — all pre-configured and validated.
        </p>
        <Figure caption="DGX H100 Server internals: 8 H100 SXM5 GPUs (purple, 80GB each) connected via 4 NVSwitch chips (green) for all-to-all 7.2 TB/s NVLink fabric. 2 Intel Xeon Platinum CPUs (blue) connected to GPUs via PCIe 5.0. 8 InfiniBand 400Gb/s ports (red) for inter-server cluster networking. 8 NVMe SSDs (yellow) for local storage and checkpointing. Total: ~10.2 kW power draw.">
          <DgxH100Diagram />
        </Figure>
        <ComparisonTable
          title="NVIDIA AI Server Portfolio"
          headers={["Product", "GPUs", "Total GPU Memory", "Power", "Best For"]}
          rows={[
            ["DGX H100", "8x H100 SXM5 80GB", "640 GB HBM3", "~10.2 kW", "Standard AI training, validated stack, NVIDIA direct support"],
            ["DGX B200", "8x B200 Blackwell", "~1.4 TB HBM3e", "~14 kW", "Latest generation, maximum Blackwell performance"],
            ["GB200 NVL72", "72x Blackwell + 36 Grace CPU", "~13.8 TB total", "120+ kW", "Rack-scale AI supercomputer"],
            ["HGX H100 (8-GPU)", "8x H100 SXM5", "640 GB HBM3", "~10 kW", "OEM server — Dell XE9680, HPE XD670, Supermicro"],
          ]}
        />
        <p style={S.p}>
          <strong>DGX vs HGX:</strong> DGX = complete server from NVIDIA, direct support, optimized software. HGX = GPU baseboard design, OEM partners integrate into their server chassis. HGX gives more server customization; DGX gives validated simplicity and NVIDIA-direct support relationship.
        </p>
      </section>

      {/* ── DATA FLOW ──────────────────────────────────────────────────── */}
      <section id="data-flow">
        <h2 style={S.h2}>Data Flow Inside an NVIDIA GPU</h2>
        <p style={S.p}>
          How exactly a tensor operation executes on a single SM — step by step.
        </p>
        <ol style={S.ol}>
          <li><strong>Instruction Dispatch:</strong> the Warp Scheduler selects a ready warp. Decodes the matrix multiply instruction. Assigns it to a Tensor Core.</li>
          <li><strong>Operand Fetch:</strong> calculate input matrix addresses. Check L1 cache — hit? fast. miss? check L2. L2 miss? queue an HBM access.</li>
          <li><strong>Latency Hiding:</strong> HBM access waits ~200 cycles. Meanwhile, the Warp Scheduler runs another ready warp. The GPU is never truly idle.</li>
          <li><strong>Shared Memory Load:</strong> data is tiled from HBM into shared memory. All block threads load cooperatively.</li>
          <li><strong>Tensor Core Execution:</strong> matrices from the tiles go into Tensor Core registers. Matrix multiply-accumulate in one cycle. Multiple cycles for full tile computation.</li>
          <li><strong>Accumulation:</strong> results accumulate with the next tile. Repeat for all tiles of the full matrix.</li>
          <li><strong>Write Back:</strong> the final result is written to HBM. The next layer's input is ready.</li>
        </ol>
        <p style={S.p}>
          <strong>The tiling insight — why this is fast:</strong> naive approach: every element from HBM every time. O(N^3) HBM accesses for an N x N matrix multiply. Tiling: load once to shared memory, compute many times. O(N^2 x N/tile) HBM accesses — tile_size times less. FlashAttention does this for attention: recompute on-chip instead of storing to HBM — 3-6x faster attention.
        </p>
      </section>

      {/* ── TRAINING FLOW ──────────────────────────────────────────────── */}
      <section id="training-flow">
        <h2 style={S.h2}>AI Training Flow</h2>
        <p style={S.p}>
          A complete training iteration — from storage to weight update — step by step.
        </p>
        <Figure caption="AI Training Data Flow (8 steps): Storage (NVMe/GCS) via GPUDirect data load into HBM. Forward Pass on Tensor Cores (layer by layer, tiled shared memory). Loss calculation on CUDA Cores. Backward Pass (gradient computation via chain rule). AllReduce gradient sync via NVLink across all GPUs (NCCL). Optimizer weight update (AdamW). Loop repeats thousands to millions of times.">
          <TrainingDataFlow />
        </Figure>
        <p style={S.p}>
          <strong>Parallelism strategies for large models:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Data Parallel (DDP):</strong> Same model, different data per GPU. AllReduce gradients. Simplest. Use when model fits in one GPU's HBM.</li>
          <li><strong>Tensor Parallel:</strong> One layer's weight matrix split across multiple GPUs. AllReduce within each layer. For models too large for one GPU — Megatron-LM implements this.</li>
          <li><strong>Pipeline Parallel:</strong> Different layers on different GPUs — assembly line. GPU 0 processes batch K, sends activations to GPU 1, while GPU 0 starts batch K+1. Requires micro-batching to keep all GPUs busy.</li>
          <li><strong>ZeRO (Zero Redundancy Optimizer):</strong> Model weights + gradients + optimizer states sharded across GPUs. ZeRO-3: massive models trainable without redundant copies. H100 clusters standard: ZeRO-2 or ZeRO-3 via DeepSpeed or FSDP (PyTorch native).</li>
        </ul>
      </section>

      {/* ── INFERENCE FLOW ─────────────────────────────────────────────── */}
      <section id="inference-flow">
        <h2 style={S.h2}>AI Inference Flow</h2>
        <p style={S.p}>
          Inference = using a trained model on real user requests. Different hardware requirements from training.
        </p>
        <p style={S.p}>
          <strong>LLM autoregressive generation on GPU:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Prefill phase:</strong> process the user's entire prompt at once. Compute Q, K, V matrices, calculate attention. Populate the KV cache. Compute-bound — Tensor Cores are busy with large matrices.</li>
          <li><strong>Decode phase:</strong> generate one token at a time. Compute Q for the new token, fetch previous K, V from the KV cache, compute attention, sample the output token. Memory-bound — the KV cache is repeatedly read from HBM.</li>
          <li><strong>KV Cache memory:</strong> seq_length x num_heads x head_dim x 2 x bytes x num_layers. Long contexts (128K tokens): tens of GB per request. Demand for H200 (141 GB) or MI300X (192 GB) — more memory for the KV cache.</li>
        </ul>
        <p style={S.p}>
          <strong>Key optimizations for LLM inference:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Continuous Batching:</strong> as requests complete, new requests fill the space. Each decode step: the scheduler checks completions and arrivals. GPU utilization is dramatically higher. vLLM and TensorRT-LLM implement this.</li>
          <li><strong>PagedAttention (vLLM):</strong> the KV cache lives in non-contiguous memory blocks — like OS virtual memory pages. Reduces fragmentation, 2-4x throughput improvement. TensorRT-LLM supports this too.</li>
          <li><strong>Speculative Decoding:</strong> Small draft model quickly generates candidate tokens. Large verifier model checks multiple candidates in parallel. 2-3x throughput when draft accuracy high.</li>
        </ul>
      </section>

      {/* ── WHY NVIDIA DOMINATES ───────────────────────────────────────── */}
      <section id="why-nvidia-dominates">
        <h2 style={S.h2}>Why NVIDIA Dominates AI</h2>
        <p style={S.p}>
          The ecosystem matters more than hardware specs. Understanding this is critical to why competitors struggle despite similar specs.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA — an 18+ year ecosystem:</strong> since 2006. 3 million+ registered developers. Every AI researcher learns CUDA. Papers assume CUDA. Code assumes CUDA. Network effects compound every year.</li>
          <li><strong>Hand-optimized libraries:</strong> cuDNN convolution kernels — manually tuned for every GPU generation. FlashAttention 3 specifically for H100 Tensor Cores. cuBLAS GEMM tuned per problem size. Competitors have "correct" but not "deeply optimized."</li>
          <li><strong>Framework integration:</strong> NVIDIA engineers are major PyTorch contributors. When H100 ships, PyTorch Day 1 support + optimizations. Non-NVIDIA chips: community needs time to catch up.</li>
          <li><strong>Hardware-software co-design:</strong> H100 Transformer Engine + PyTorch AMP = FP8 just works. No manual code changes. Competitor chip may support FP8 in hardware but framework integration missing months to years.</li>
          <li><strong>CUDA kernel availability:</strong> FlashAttention (CUDA), Triton (NVIDIA-designed custom kernel language), CUTLASS (matrix ops), cuDNN FlashMHA — years of engineering. Alternative chips need equivalent — time and expertise required.</li>
          <li><strong>Supply chain ecosystem:</strong> Every cloud (AWS, GCP, Azure, Oracle) has massive GPU fleets. Enterprises have GPU contracts. Data scientists trained on GPU. Infrastructure tools (DCGM, monitoring, MIG) mature.</li>
        </ul>
        <Callout type="important" title="Can Anyone Seriously Challenge NVIDIA?">
          AMD ROCm improving significantly — MI300X (192 GB HBM) compelling for memory-heavy LLM inference. Intel Gaudi 3 competitive specs. AWS Trainium cost savings real for specific workloads. But: CUDA ecosystem is an 18+ year head start. Not a technology gap — an ecosystem gap. Matching hardware alone is not sufficient. The challenge is matching library depth, developer tools, framework integration, and enterprise software. Timeline: years, not quarters.
        </Callout>
      </section>

      {/* ── CUDA ECOSYSTEM ─────────────────────────────────────────────── */}
      <section id="cuda-ecosystem">
        <h2 style={S.h2}>CUDA Ecosystem</h2>
        <p style={S.p}>
          <strong>CUDA (Compute Unified Device Architecture)</strong> — the programming model for parallel computation on an NVIDIA GPU. A C/C++ extension, familiar syntax, 18+ years of development.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA Streams:</strong> in-order GPU operation queues. Multiple streams: overlap compute and data transfer. Transfer on stream 1, compute on stream 2 — the GPU is always busy. A key tool for production inference optimization.</li>
          <li><strong>CUDA Events:</strong> timestamps on the GPU timeline. Training profiling, CPU-GPU synchronization points, high-resolution GPU timing.</li>
          <li><strong>NVCC Compilation:</strong> .cu files to PTX (intermediate, architecture-independent) to CUBIN (target GPU machine code). PTX can be JIT-recompiled on future GPUs. First run is slow (JIT), subsequent runs fast (cached CUBIN).</li>
          <li><strong>Unified Memory:</strong> a single pointer both CPU and GPU access. The system migrates data automatically. Less manual memory management — useful for prototyping and complex data structures. Slight overhead vs explicit transfers.</li>
        </ul>
      </section>

      {/* ── TENSORRT ───────────────────────────────────────────────────── */}
      <section id="tensorrt">
        <h2 style={S.h2}>TensorRT — Inference Optimization</h2>
        <p style={S.p}>
          <strong>TensorRT</strong> — NVIDIA's inference optimization engine. Train once, serve billions of times — the return on investment for inference optimization is massive.
        </p>
        <Figure caption="TensorRT Optimization Pipeline: PyTorch Model (FP32, unoptimized, 1x baseline) → ONNX Export (framework-neutral format) → TensorRT Build phase (graph optimization: fuse Conv+BN+ReLU into single kernel; precision calibration: FP32 to INT8/FP8; kernel auto-tuning: benchmark best implementation per your specific GPU and input shape; memory optimization: buffer reuse planning) → Optimized TensorRT Engine (GPU-specific binary) → 3-8x faster production inference with lower memory.">
          <TensorRtPipeline />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Graph optimization:</strong> Unnecessary ops remove, constants fold, subgraph fusion. Conv + BatchNorm + ReLU to single fused kernel — 3 kernel launches to 1, 2 intermediate allocations to 0. Memory bandwidth reduces 3x to 1x.</li>
          <li><strong>Precision calibration:</strong> FP32 to INT8 conversion. Run on a calibration dataset, determine per-layer scale factors. 2-3x faster, minimal accuracy loss. On H100: FP32 to FP8 via Transformer Engine integration.</li>
          <li><strong>Kernel auto-tuning:</strong> Thousands of GEMM implementations available. TensorRT benchmarks on YOUR specific GPU + YOUR specific input shape. Selects fastest. Build on target GPU — A100 engine not optimal on H100.</li>
          <li><strong>Memory planning:</strong> Tensor buffer reuse — output of layer N = input buffer of layer N+2 if safe. Peak memory reduces 20-40%.</li>
        </ul>
        <p style={S.p}>
          <strong>TensorRT-LLM:</strong> Open-source LLM inference library from NVIDIA. Continuous batching, PagedAttention, SpeculativeDecoding, quantization (GPTQ, AWQ, SmoothQuant compatible), custom attention kernels. Best performance for LLM serving on H100.
        </p>
        <p style={S.p}>
          <strong>Triton Inference Server:</strong> NVIDIA's open-source model serving framework. HTTP/gRPC endpoints, multiple backends (TensorRT, ONNX, PyTorch, TF, custom), dynamic batching, model ensemble, concurrent model execution. The production serving standard for NVIDIA GPU deployments.
        </p>
      </section>

      {/* ── NCCL ───────────────────────────────────────────────────────── */}
      <section id="nccl">
        <h2 style={S.h2}>NCCL — Collective Communications</h2>
        <p style={S.p}>
          <strong>NCCL (NVIDIA Collective Communications Library)</strong> — the backbone of distributed GPU training. AllReduce, AllGather, ReduceScatter, Broadcast — across GPU clusters.
        </p>
        <ul style={S.ul}>
          <li><strong>AllReduce:</strong> sum/average the gradients across all GPUs, give the result to all of them. The main operation in data-parallel training. Ring or tree algorithm depending on topology.</li>
          <li><strong>ReduceScatter + AllGather:</strong> AllReduce split into 2 phases. ZeRO-3 and PyTorch FSDP use this — each GPU receives only a gradient shard = less peak memory.</li>
          <li><strong>Topology awareness:</strong> NCCL auto-detects NVLink vs PCIe vs InfiniBand. Different algorithms for different topologies. Debug: <code style={S.code}>NCCL_DEBUG=INFO python train.py 2&gt;&amp;1 | grep NCCL</code></li>
          <li><strong>Overlap with computation:</strong> PyTorch DDP/FSDP overlap gradient communication with the backward pass. Layer N's backward runs while Layer N-1's gradients are on AllReduce. 20-30% additional speedup possible via overlap.</li>
        </ul>
      </section>

      {/* ── CUDA LIBRARIES ─────────────────────────────────────────────── */}
      <section id="cuda-libraries">
        <h2 style={S.h2}>CUDA Libraries</h2>
        <ComparisonTable
          title="Key NVIDIA CUDA Libraries — What They Do Under the Hood"
          headers={["Library", "Purpose", "Used By", "Key Operations"]}
          rows={[
            ["cuDNN", "Deep Neural Network ops", "PyTorch, TF (under the hood)", "Convolutions, pooling, normalization, activation, RNNs"],
            ["cuBLAS", "Dense linear algebra", "PyTorch, NumPy GPU", "GEMM (matrix multiply), BLAS Level 1/2/3"],
            ["NCCL", "Multi-GPU collective communication", "PyTorch Distributed, Horovod", "AllReduce, AllGather, Broadcast, P2P"],
            ["cuSPARSE", "Sparse matrix operations", "Sparse model training", "SpMM, SpGEMM, sparse BLAS"],
            ["cuFFT", "Fast Fourier Transform", "Signal processing, audio AI", "1D/2D/3D FFT, inverse FFT"],
            ["cuRand", "Random number generation on GPU", "Dropout, sampling, augmentation", "Uniform, normal, Poisson"],
            ["TensorRT", "Inference optimization engine", "Production serving", "Graph opt, quantization, kernel tuning"],
            ["CUTLASS", "Custom GPU kernel templates", "Research, specialized ops", "Templated GEMM implementations"],
            ["Thrust", "High-level GPU algorithms", "Data preprocessing", "Sort, scan, reduce, transform"],
          ]}
        />
        <p style={S.p}>
          <strong>cuDNN — the most critical library for AI:</strong> Every convolution, every recurrent layer, every normalization in PyTorch or TensorFlow goes through cuDNN. NVIDIA engineers optimize cuDNN for every new GPU. On H100 launch day, cuDNN H100-optimized kernels were ready. Competitors need equivalent optimization effort — years behind.
        </p>
      </section>

      {/* ── DRIVER VS TOOLKIT ──────────────────────────────────────────── */}
      <section id="driver-toolkit">
        <h2 style={S.h2}>Driver vs CUDA Toolkit</h2>
        <p style={S.p}>
          A common point of confusion in production deployments — an important distinction.
        </p>
        <ComparisonTable
          title="NVIDIA Driver vs CUDA Toolkit — Clear Distinction"
          headers={["Aspect", "NVIDIA Driver", "CUDA Toolkit"]}
          rows={[
            ["What it is", "Kernel-level GPU hardware interface", "User-space development toolkit"],
            ["Contains", "GPU kernel modules, libcuda.so", "nvcc compiler, CUDA libraries, headers, profilers"],
            ["Install location", "System-wide, kernel modules", "Developer machines, containers"],
            ["Versions", "535.x, 545.x, 560.x format", "CUDA 11.8, 12.1, 12.3 format"],
            ["Controls", "GPU hardware communication", "GPU code compilation and execution"],
            ["Required for runtime", "Yes — always needed", "No — only for development/compilation"],
          ]}
        />
        <p style={S.p}>
          <strong>Compatibility rule:</strong> CUDA Toolkit version ≤ driver's maximum supported CUDA version. Driver 535.x: max CUDA 12.2. CUDA Toolkit 12.3 will NOT work. Check compatibility: docs.nvidia.com/deploy/cuda-compatibility.
        </p>
        <p style={S.p}>
          <strong>Container workflow:</strong> container images (nvcr.io/nvidia/pytorch:24.01-py3) include the CUDA Toolkit. Host: just install the driver. The container's CUDA Toolkit communicates with the host driver via an <code style={S.code}>/usr/lib/x86_64-linux-gnu/libcuda.so</code> mount. A driver upgrade on the host benefits all containers.
        </p>
        <Callout type="warning" title="Production Driver Update Protocol">
          Never update GPU driver on production training nodes without: staging environment test first; active jobs checkpoint save; maintenance window schedule; rollback plan ready. Driver update = GPU kernel module reload = all GPU processes terminate immediately. Plan accordingly — unplanned update during training = job lost.
        </Callout>
      </section>

      {/* ── ENTERPRISE DEPLOYMENT ──────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise Deployment</h2>
        <ul style={S.ul}>
          <li><strong>Driver and software stack:</strong> verify driver-CUDA compatibility before ordering hardware. NVIDIA AI Enterprise subscription for vGPU and enterprise support SLA. Install nvidia-container-toolkit for Docker/Kubernetes. A DCGM agent on every GPU node.</li>
          <li><strong>Networking validation:</strong> verify the IB link: <code style={S.code}>ibstat</code> and <code style={S.code}>ibping</code>. NVLink status: <code style={S.code}>nvidia-smi nvlink -s -i 0</code>. Run an NCCL all-reduce benchmark before production: run the nccl-tests package. Verify fat-tree physical cabling — miscabling = asymmetric bandwidth.</li>
          <li><strong>Storage configuration:</strong> enable GPUDirect Storage if NVMe is present. Benchmark the parallel file system before training starts. Checkpoint strategy: fast local NVMe for frequent checkpoints, object storage (S3/GCS) for durability.</li>
          <li><strong>Monitoring:</strong> DCGM Prometheus exporter + Grafana dashboards. Key metrics: GPU utilization, memory utilization, temperature, power, ECC errors, NVLink bandwidth. Alerts: temp greater than 80°C, ECC double-bit errors, GPU utilization consistently less than 60% on training.</li>
          <li><strong>Security:</strong> MIG or vGPU for multi-tenant isolation. Network encryption for gradient communication if compliance required. Model checkpoints encryption at rest.</li>
        </ul>
      </section>

      {/* ── POWER AND COOLING ──────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling</h2>
        <p style={S.p}>
          Power and cooling planning for GPU data centers should come before hardware selection.
        </p>
        <ComparisonTable
          title="Power Requirements — Planning Numbers"
          headers={["Deployment", "Per GPU", "Per Server (8-GPU)", "4 Servers Per Rack", "Cooling"]}
          rows={[
            ["V100 SXM2 DGX", "300W", "~4.5 kW", "~18 kW", "Air sufficient"],
            ["A100 SXM4 DGX", "400W", "~6.5 kW", "~26 kW", "Air OK, liquid preferred"],
            ["H100 SXM5 DGX H100", "700W", "~10.2 kW", "~41 kW", "Liquid strongly recommended"],
            ["B200 Blackwell server", "~1,000W", "~14 kW", "~56 kW", "Liquid required"],
            ["GB200 NVL72 (per rack)", "N/A", "N/A", "120+ kW", "Direct liquid cooling only"],
          ]}
        />
        <ul style={S.ul}>
          <li><strong>Air cooling limit:</strong> ~15-20 kW per rack practically. Above this: heat removal insufficient. GPU TDP high-density racks = liquid cooling territory.</li>
          <li><strong>Direct Liquid Cooling (DLC) — cold plates:</strong> Most efficient. Directly on GPU chips and VRMs. Required for H100 high-density. Mandatory for GB200 NVL72. Requires chilled water loop infrastructure (chillers, piping, manifolds).</li>
          <li><strong>Rear-door heat exchangers:</strong> Retrofit-friendly. Handles up to ~30 kW per rack. Less efficient than cold plates but works with existing air-cooled servers.</li>
          <li><strong>Power capping:</strong> <code style={S.code}>nvidia-smi -pl 600</code> (H100 from 700W to 600W). ~14% power reduction, ~8-12% performance reduction. Useful: thermal throttling happening, electricity cost optimization at scale, power budget constraints.</li>
          <li><strong>PUE targets:</strong> Air cooling high-density: 1.5-2.0. Direct liquid cooling: 1.1-1.3. DLC + water-side economizers: 1.05-1.15 achievable.</li>
        </ul>
      </section>

      {/* ── RACK DESIGN ────────────────────────────────────────────────── */}
      <section id="rack-design">
        <h2 style={S.h2}>Rack Design for GPU Clusters</h2>
        <ul style={S.ul}>
          <li><strong>Standard DGX H100 rack:</strong> Typically 4 DGX H100 per 42U rack (4 x 8U = 32U + switch space). Power: ~41 kW per rack. Liquid cooling recommended.</li>
          <li><strong>Fat-tree network cabling:</strong> Each DGX H100: 8 IB ports to 8 leaf switch ports. Leaf switches to spine switches. Cable management critical — 8+ high-speed cables per server. Plan physical cable runs and bend radius for fiber.</li>
          <li><strong>Hot spare strategy:</strong> GPU MTBF ~100,000 hours. DGX H100 (8 GPUs): statistically at least one GPU failure every ~12,500 hours (~17 months). Maintain 5-10% hot spare DGX nodes for large clusters. GPU replacement: NVIDIA provides field-replaceable GPU trays for DGX.</li>
          <li><strong>Power distribution:</strong> DGX H100: 2x 20A 208V circuits per server. Dual PSU for redundancy. PDU per rack rated for 120%+ of peak load. Breaker coordination planning required.</li>
          <li><strong>Floor load:</strong> GPU servers heavier than standard compute. H100 HBM stacks, large thermal solution, liquid cooling manifolds add weight. Check floor load rating before placement. Facilities structural assessment required.</li>
        </ul>
      </section>

      {/* ── BEST PRACTICES ─────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Always use BF16 or mixed precision:</strong> FP32 training on H100 = 5-10x slower. Default: <code style={S.code}>torch.set_default_dtype(torch.bfloat16)</code> or AMP: <code style={S.code}>with torch.autocast("cuda", dtype=torch.bfloat16):</code></li>
          <li><strong>Profile before optimizing:</strong> look at the Nsight Systems timeline — when is the GPU idle. Data loading? Communication? Compute? Target the specific bottleneck. Don't guess.</li>
          <li><strong>Maximize occupancy:</strong> check SM occupancy with <code style={S.code}>ncu --metrics sm__warps_active.avg.pct_of_peak_sustained_active</code>. Low = register pressure or shared memory pressure. Adjust block size and memory usage.</li>
          <li><strong>TensorRT for production inference:</strong> Always, without exception. Minimum 2x speedup, often 5-8x. Build engine once per GPU per input shape. Rebuild when: model changes, input shape changes, GPU generation changes.</li>
          <li><strong>Monitor ECC errors:</strong> <code style={S.code}>nvidia-smi -q | grep -i ecc</code> or DCGM. Alert on double-bit errors immediately. Track single-bit error rate increase over time.</li>
          <li><strong>Checkpoint frequently:</strong> Preemptible instances: every 30 minutes. On-demand: every hour. Fast local NVMe first, then async copy to durable object storage. Test resume-from-checkpoint before long runs.</li>
          <li><strong>Coalesced memory access:</strong> 32 threads, consecutive addresses = 1 transaction (fast). Random access = 32 transactions (32x slower for memory-bound kernels). Data layout design for access patterns matters.</li>
        </ul>
      </section>

      {/* ── COMMON MISTAKES ────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>FP32 training on H100:</strong> H100 Tensor Cores optimized for FP8/BF16. FP32 uses CUDA Cores = 5-10x slower for matrix ops. Always use BF16 or AMP.</li>
          <li><strong>Small batch sizes:</strong> Tiny batches = Tensor Cores idle. Rule: batch size multiple of 8. Gradient accumulation: if memory-limited, accumulate 8-16 small batches before optimizer step.</li>
          <li><strong>Driver-CUDA version mismatch:</strong> Mysterious crashes, "libcuda not found." Verify compatibility matrix before any upgrade. Staging environment test first.</li>
          <li><strong>gloo instead of NCCL:</strong> Explicitly set: <code style={S.code}>dist.init_process_group("nccl")</code>. gloo 10-100x slower than NCCL for GPU-to-GPU.</li>
          <li><strong>Not monitoring thermal throttling:</strong> H100 silently reduces clock above 83°C. Training slows, nobody notices. Set alert at 80°C. Check: <code style={S.code}>nvidia-smi -q -d CLOCK</code>.</li>
          <li><strong>Memory fragmentation OOM:</strong> Long training sessions: GPU memory fragmented. Technically enough free but not contiguous. Fix: <code style={S.code}>torch.cuda.empty_cache()</code> between major allocations.</li>
          <li><strong>PCIe x8 slot for multi-GPU server:</strong> Verify: <code style={S.code}>lspci -vvv | grep -A5 NVIDIA | grep Width</code>. "Width x8" = half bandwidth. Fix: correct slot assignment.</li>
        </ul>
      </section>

      {/* ── TROUBLESHOOTING ────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          headers={["Problem", "Diagnostic Tool/Command", "Solution"]}
          rows={[
            ["CUDA OOM error", "torch.cuda.memory_summary() + nvidia-smi", "Reduce batch size, gradient checkpointing, ZeRO optimizer, BF16"],
            ["GPU utilization <60% on training", "Nsight Systems timeline", "More DataLoader workers, pin_memory=True, GPUDirect Storage, prefetch"],
            ["Training loss NaN or Inf", "torch.autograd.set_detect_anomaly(True) (slow)", "Gradient clipping, reduce LR, check bad data, use BF16 over FP16"],
            ["Distributed training slower than single", "NCCL_DEBUG=INFO, Nsight AllReduce timeline", "Verify NVLink active, increase gradient accum, use FSDP with compute-comm overlap"],
            ["Inference latency inconsistent", "nvprof or Nsight Compute trace", "Fixed batch size in TRT, CUDA warm-up run, pin tensor shapes"],
            ["GPU temp >80°C sustained", "nvidia-smi -q -d TEMPERATURE -l 1", "Check airflow, clean filters, power cap to 600W, evaluate liquid cooling"],
            ["ECC double-bit errors", "nvidia-smi -q | grep -i ecc", "Save checkpoint, schedule GPU replacement, contact NVIDIA support"],
            ["MIG instance not appearing", "nvidia-smi -L", "Verify MIG mode on, use -cgi and -C flags for instance and compute instance creation"],
            ["NVLink errors in training", "nvidia-smi nvlink -e -i 0", "Check SXM physical connections, restart job, contact NVIDIA support if persistent"],
          ]}
        />
      </section>

      {/* ── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>
        {[
          {
            q: "What is the GPC, TPC, and SM hierarchy in GPU architecture and how does it map at the hardware level?",
            a: "A GPU die is organized hierarchically. GPC (Graphics Processing Cluster) is the biggest functional block — H100 has 8 GPCs. Each GPC has 4 TPCs (Texture Processing Clusters). Each TPC has 2 SMs (Streaming Multiprocessors). The SM is the GPU's actual compute unit — where the programmer's code executes. H100: 8 GPCs x 4 TPCs x 2 SMs = 64 SM units per GPC group... H100 total: 132 SMs. Inside each SM: 128 CUDA Cores, 4 Tensor Cores (4th gen), 4 Warp Schedulers, 1 RT Core, 256 KB Shared Memory/L1, 256 KB Register File. When GPU code runs: thread blocks are distributed to SMs. Warp Schedulers execute warps. Tensor Cores do matrix multiply. CUDA Cores do activation functions. Purpose of the hierarchy: resource sharing efficiency (texture units and instruction cache are shared at the TPC level), fault tolerance (disable a defective GPC, sell the rest of the chip), and scalable design (add more GPCs in future GPUs).",
          },
          {
            q: "What is warp divergence, what's its impact on performance, and how do you avoid it in real AI code?",
            a: "A warp is a group of 32 threads that execute in lockstep on a GPU — the same instruction simultaneously. Warp divergence: threads take different code paths. The GPU serializes both paths: Phase 1 — threads taking path_A execute, the rest idle. Phase 2 — threads taking path_B execute, the rest idle. Performance: worst case 2x slower, N paths = N x slowdown. Real AI examples: attention masking with variable-length sequences, conditional processing based on value thresholds, sparse operations. Mitigation: (1) pad all sequences to the same length — same-warp threads take the same path; (2) branchless code — predicated instructions; (3) sort input by the property determining the branch — similar values end up in the same warp; (4) redesign the algorithm to avoid per-thread conditionals. Tool: Nsight Compute, the branch efficiency metric. LLM: FlashAttention handles masked attention without per-element divergence — careful algorithm design.",
          },
          {
            q: "Why is shared memory critical for GPU performance — explain the tiling technique?",
            a: "Shared Memory is the on-chip memory shared by all threads inside an SM. H100: 256 KB per SM, ~1-5 cycle latency (vs HBM's 200+ cycles). Critical for matrix multiply: naive approach: to calculate one element, access an entire row and column from HBM. An N x N matrix: O(N^3) HBM accesses. Memory bandwidth = the bottleneck. Tiling technique: (1) cooperatively load a tile (e.g., 16x16) of matrix A into shared memory — all block threads together; (2) load the corresponding tile of matrix B; (3) do computations using fast access from shared memory (~1 cycle per access); (4) load the next tile, accumulate results; (5) repeat for all tiles. Result: the same O(N^3) compute but HBM accesses drop to O(N^2 x N/tile_size) — tile_size times less bandwidth. A 16x16 tile: 16x less HBM bandwidth per FLOP. cuBLAS, cuDNN, FlashAttention — all use tiling. FlashAttention specifically: tiles the attention computation through HBM — doesn't store activations, computes everything on-chip. Result: 3-6x faster attention, 10-20x less memory for attention computation.",
          },
          {
            q: "What are NVLink and PCIe — what's their practical impact on multi-GPU training?",
            a: "PCIe (Peripheral Component Interconnect Express): the standard CPU-GPU interface. PCIe 5.0: 128 GB/s bidirectional. Universal — every PCIe device uses it. NVLink: NVIDIA's proprietary GPU-to-GPU interconnect. NVLink 4.0 (H100): 900 GB/s bidirectional. 7x faster than PCIe 5.0. Multi-GPU training impact: in data-parallel training, gradient synchronization (AllReduce) is the main communication cost. A 70B model's gradients at BF16 = 280 GB per AllReduce. NVLink 4.0 (DGX H100, NVSwitch): 280 GB / 900 GB/s = ~0.31 sec per AllReduce. PCIe 5.0 only: 280 GB / 128 GB/s = ~2.2 sec per AllReduce. Difference: 1.9 seconds per training step. Over millions of steps: an enormous time impact. DGX H100: 4 NVSwitches connecting 8 GPUs — any-to-any at full 900 GB/s. All 8 GPU pairs can communicate simultaneously at full bandwidth. PCIe: a CPU hub topology — shared bandwidth. Always use the SXM form factor (NVLink) for multi-GPU training. Never the PCIe form factor for serious distributed training.",
          },
          {
            q: "How does MIG work — what's the technical basis for hardware isolation?",
            a: "MIG (Multi-Instance GPU) was introduced in A100, refined in H100. Partitioning a physical H100 into up to 7 hardware-isolated instances. Technical implementation: H100 has 8 GPCs. MIG divides the GPCs into slices. Each instance gets dedicated: a specific GPC subset (SM isolation), an L2 cache partition (separate address ranges — different instances use different L2 portions), an HBM memory slice (dedicated capacity and memory controller bandwidth), PCIe and NVLink bandwidth allocation. What hardware isolation means: one instance's code can't access another instance's hardware — silicon-level protection. One instance's reads can't evict another instance's L2. HBM address ranges don't overlap. This is different from software isolation (vGPU), where hardware is shared but software prevents unauthorized access. Instance creation: nvidia-smi -mig 1 (enable) then mig -cgi 3g.40gb,2g.20gb -C (create GPU instance and Compute instance). Enterprise value: cloud inference providers can serve 7 isolated tenants per H100 simultaneously — true parallel execution, not time-sliced.",
          },
          {
            q: "How much faster is TensorRT inference than PyTorch eager — what are the technical reasons?",
            a: "Speedup: 2-8x depending on the model and GPU. Multiple optimizations combined: (1) Graph optimization: in PyTorch eager mode, each op executes individually. TensorRT analyzes the whole graph — removes dead ops, folds constants, fuses subgraphs. Conv + BatchNorm + ReLU: 3 kernel launches + 2 intermediate memory allocations become 1 kernel + 0 intermediate. Memory bandwidth: 3x down to 1x. (2) Kernel auto-tuning: NVIDIA has thousands of GEMM implementations (different algorithms, tile sizes, loop unrolling). TensorRT benchmarks on YOUR GPU + YOUR input shape and selects the fastest. Generic PyTorch: heuristic-based. TensorRT: measured-best. (3) Precision calibration: FP32 to INT8. Calibration dataset: determine per-layer dynamic range, quantize. INT8 Tensor Cores are 2x faster than FP16. H100 FP8: an additional 2x. (4) Memory planning: layer N's output tensor is reused as layer N+2's input if safe. Peak memory reduces 20-40%. Combined: 3-8x speedup is realistic. Real example: BERT-base on H100: PyTorch eager BF16 12ms, TensorRT INT8 2ms = 6x faster. The engine must be built on the target GPU — an A100-built engine isn't optimal on H100.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #16a34a", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ── GLOSSARY ───────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Plain English Definition"]}
          rows={[
            ["AMP (Automatic Mixed Precision)", "PyTorch feature — auto-runs some ops in BF16/FP16 and some in FP32. No manual changes needed. use torch.autocast."],
            ["Arithmetic Intensity", "FLOPs / bytes of memory accessed. High = compute-bound (efficient). Low = memory-bound (need more bandwidth)."],
            ["Blackwell", "NVIDIA GPU architecture 2024. Dual-die, FP4, NVLink 5.0, GB200 NVL72. Current generation flagship."],
            ["CUDA Core", "GPU's basic FP32 arithmetic unit. 1 op per cycle. Used for activation functions, normalization, integer ops. Not for matrix multiply."],
            ["CUDA Stream", "In-order GPU operation queue. Multiple streams enable compute-transfer overlap. Improves GPU utilization."],
            ["CUDA Toolkit", "Developer kit: nvcc compiler, CUDA libraries, headers, profilers. Different from driver."],
            ["cuDNN", "CUDA Deep Neural Network library. Every PyTorch/TF convolution uses it under the hood. Manually optimized per GPU generation."],
            ["DCGM", "Data Center GPU Manager. Enterprise GPU monitoring — ECC, temperature, utilization, NVLink bandwidth."],
            ["DGX", "NVIDIA complete AI server product — GPUs, CPUs, interconnects, storage, software validated together."],
            ["ECC Memory", "Error Correcting Code — detects and corrects single-bit memory errors. Always ON in data center GPUs. ~5% bandwidth overhead."],
            ["FP8", "8-bit floating point. H100 4th-gen Tensor Core supports it. 2x faster than BF16, 2x less memory. Managed by Transformer Engine."],
            ["FP4", "4-bit floating point. Blackwell 5th-gen Tensor Core. 2x faster than FP8. Inference quantization."],
            ["GPC (Graphics Processing Cluster)", "Largest functional block in GPU die. H100 has 8 GPCs. Each contains 4 TPCs."],
            ["GPUDirect RDMA", "GPU receives/sends to InfiniBand NIC directly, bypassing CPU."],
            ["GPUDirect Storage", "GPU reads from NVMe SSD directly, bypassing CPU and CPU memory."],
            ["Grace CPU", "NVIDIA's ARM server CPU. 72 Neoverse V2 cores. Used with Blackwell in GB200."],
            ["HBM (High Bandwidth Memory)", "3D-stacked DRAM on GPU package. H100: 80 GB at 3.35 TB/s."],
            ["Hopper", "NVIDIA architecture 2022. H100, Transformer Engine, FP8, NVLink 4.0. LLM training era chip."],
            ["Latency Hiding", "While one warp waits for memory, GPU executes another ready warp. Makes memory latency less painful."],
            ["MIG (Multi-Instance GPU)", "Hardware partition of H100 into up to 7 isolated GPU instances. Enterprise multi-tenancy."],
            ["NCCL", "NVIDIA Collective Communications Library. AllReduce, AllGather for distributed training. Always use as backend for GPU training."],
            ["NVLink", "NVIDIA GPU-to-GPU proprietary interconnect. NVLink 4.0: 900 GB/s. 7x faster than PCIe 5.0."],
            ["NVSwitch", "Dedicated switch chip — connects multiple GPUs all-to-any at full NVLink bandwidth. DGX H100: 4 NVSwitches."],
            ["Occupancy", "Active warps per SM / max possible warps. Higher = better latency hiding = better performance."],
            ["PagedAttention", "Non-contiguous KV cache memory (vLLM). Like OS virtual memory pages — reduces fragmentation."],
            ["Register File", "Per-SM fast storage. H100: 256 KB per SM = 65,536 registers. Thread-private, zero latency."],
            ["RT Core", "Ray Tracing hardware. Turing+ for graphics only. Removed in data center GPUs A100/H100."],
            ["SM (Streaming Multiprocessor)", "GPU's fundamental compute block. H100: 132 SMs. Each: 128 CUDA Cores + 4 Tensor Cores + schedulers + memory."],
            ["Shared Memory", "SM-internal fast on-chip memory. Programmer-managed. ~1-5 cycle latency. Used for tiling optimization."],
            ["Tensor Core", "Matrix multiply-accumulate hardware. D = A x B + C in one cycle. H100 4th gen: FP8/BF16/FP16/TF32."],
            ["TensorRT", "NVIDIA inference optimization engine. Graph fusion, precision calibration, kernel tuning. 3-8x speedup vs PyTorch eager."],
            ["TF32 (TensorFloat-32)", "Ampere format: FP32 range + reduced precision. 10x FP32 Tensor Core performance. Transparent — existing FP32 code accelerated."],
            ["TPC (Texture Processing Cluster)", "Within GPC. Contains 2 SMs + shared texture units + L1 instruction cache."],
            ["Transformer Engine", "H100 hardware feature. Auto-switches FP8/FP16 per transformer layer. 3x LLM training speedup vs A100 at BF16."],
            ["vGPU", "Virtual GPU — multiple VMs share one physical GPU via NVIDIA driver. NVIDIA AI Enterprise license required."],
            ["Volta", "NVIDIA architecture 2017. V100, first Tensor Cores. The AI revolution started here."],
            ["Warp", "32 GPU threads executing same instruction simultaneously. Fundamental scheduling unit."],
            ["Warp Divergence", "When warp threads take different branches — serialized = performance drops. Avoid by uniform branch paths."],
            ["Warp Scheduler", "SM component selecting which warp executes each cycle. H100: 4 per SM. Enables latency hiding."],
            ["ZeRO (Zero Redundancy Optimizer)", "DeepSpeed: shards weights, gradients, optimizer states across GPUs. Enables training very large models."],
          ]}
        />
      </section>

      {/* ── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>NVIDIA GPU architecture is a hierarchy — Die to GPC to TPC to SM. The SM is the real compute unit (132 SMs in H100, all working independently in parallel). Each SM: 128 CUDA Cores (general math, 1 op/cycle) + 4 Tensor Cores (matrix multiply, 8,192 ops/cycle at FP8) + Shared Memory (a fast team whiteboard) + a Register File (private per-thread). This architecture is like a city — offices (cores) organized into buildings (SM) into zones (GPC).</li>
          <li>Tensor Cores and CUDA Cores are fundamentally different. CUDA Core: 1 FP32 op per cycle — activation functions, normalization. Tensor Core: thousands of matrix ops per cycle — neural network layers. AI training is 90%+ matrix multiply — Tensor Cores are the main engine. Introduced in Volta 2017, every generation better precision: FP16 to INT8 to TF32/BF16 to FP8 to FP4. H100's Transformer Engine automatically manages FP8 per layer.</li>
          <li>A warp = 32 threads in lockstep. The GPU's superpower: latency hiding — when one warp waits on memory, another executes. Up to 64 warps tracked per SM simultaneously. Warp divergence (if-else) kills performance — 2x slowdown worst case. Design code so same-warp threads take the same branch. Maximize occupancy: less register pressure, less shared memory per block = more concurrent warps = better latency hiding.</li>
          <li>Memory hierarchy determines performance. Registers (0 ns) to Shared Memory (~1 cycle) to L1/L2 (automatic) to HBM (200+ cycles). Tiling: load from HBM to Shared Memory once, compute many times — arithmetic intensity improves dramatically. FlashAttention recomputes attention on-chip instead of storing to HBM — 3-6x attention speedup. Memory-bound vs compute-bound: profile first, then optimize appropriately.</li>
          <li>NVLink (900 GB/s) vs PCIe (128 GB/s) — 7x difference for GPU-to-GPU. Multi-GPU training gradient sync (AllReduce): NVLink 0.31 sec vs PCIe 2.2 sec for 70B model. Over millions of steps: enormous accumulated difference. DGX H100: NVSwitch enables any-to-any full bandwidth across all 8 GPUs. Always SXM form factor for multi-GPU training — PCIe form factor not viable for serious distributed work.</li>
          <li>MIG partitions one H100 into 7 hardware-isolated instances. True silicon-level isolation — separate SMs, L2 cache, HBM, memory controller. True simultaneous execution. Cloud inference: 1 GPU to 7 revenue streams. Research: 7 independent isolated users. Mixed workloads: production + development simultaneously. Enable when GPU utilization consistently below 60% on single workload.</li>
          <li>CUDA ecosystem is NVIDIA's real competitive moat. 18+ years, millions of developers, hand-optimized cuDNN per GPU generation, major PyTorch contributor, TensorRT production-ready, NCCL for distributed. Matching GPU specs is possible — matching 18 years of ecosystem depth is not quick. The gap is in library optimization, developer tools, framework integration, enterprise tooling. Ecosystem compounding makes it harder to close over time, not easier.</li>
          <li>TensorRT is mandatory for production inference. 3-8x speedup: graph fusion + precision calibration (INT8/FP8) + kernel auto-tuning + memory planning combined. Build once per GPU per input shape. Never use an A100-built engine on H100. TensorRT-LLM for LLMs: continuous batching + PagedAttention + speculative decoding = maximum H100 utilization for serving.</li>
          <li>Data center: H100 = 700W. DGX H100 = ~10.2 kW. 4 DGX per rack = ~41 kW. Liquid cooling above 25 kW/rack recommended, mandatory for GB200 NVL72 (120+ kW). ECC: always ON — single-bit auto-correct, double-bit = GPU replacement schedule. DCGM monitoring: temperature above 80°C alert, ECC double-bit immediate action, GPU utilization below 60% on training = investigate bottleneck. Driver updates: staging first, maintenance window, rollback plan.</li>
          <li>Grace + Blackwell (GB200) architecture changes everything for large model deployment. NVLink-C2C (900 GB/s coherent) eliminates PCIe bottleneck. 704 GB unified CPU+GPU memory — trillion-parameter model inference on single rack without complex sharding. FP4 Tensor Cores: same throughput from fewer GPUs for quantizable workloads. Rack-scale supercomputer (NVL72) becomes the unit of AI infrastructure. Future direction: tighter CPU-GPU integration, more memory per system, higher efficiency per watt per FLOP.</li>
        </ul>
      </section>

    </article>
  );
}
