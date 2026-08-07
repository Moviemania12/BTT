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
          Aapne AI GPU article mein NVIDIA ka overview padha — CUDA Cores, HBM, NVLink, basic architecture. TPU aur AI Accelerators mein baaki landscape samjha. Ab time hai ek cheez deeply samajhne ka: NVIDIA GPU architecture — silicon se data center tak.
        </p>
        <p style={S.p}>
          Yeh article die hierarchy se shuru karta hai (GPC to TPC to SM to individual compute units), phir memory hierarchy cover karta hai (registers se HBM tak), phir interconnects (NVLink, NVSwitch, PCIe), phir enterprise features (MIG, vGPU), aur finally CUDA ecosystem aur data center deployment.
        </p>
        <Callout type="important" title="Note: Building on Previous Articles">
          Yeh article AI GPU article ka deep dive hai. Basic CUDA Core aur HBM explanations wahan cover ho chuki hain. Yahan hum deeper jaayenge: warp divergence, SM internals, NVSwitch topology, MIG configuration, TensorRT optimization. Previous article padh lena recommended hai.
        </Callout>
      </section>

      {/* ── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>AI/ML Engineers:</strong> PyTorch code GPU ke andar kaise execute hota hai — warp scheduling, shared memory optimization, Tensor Core utilization, NCCL AllReduce.</li>
          <li><strong>Data Center Engineers:</strong> Power budgeting (kW per GPU, per rack), cooling requirements, NVLink vs PCIe topology, DGX rack design, enterprise GPU deployment.</li>
          <li><strong>System Architects:</strong> Grace+Blackwell unified memory, NVSwitch fabric design, MIG aur vGPU strategy.</li>
          <li><strong>Students aur Freshers:</strong> Complete mental model of NVIDIA GPU — zero to engineer, one article.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>NVIDIA architecture evolution — Tesla se Blackwell tak, har generation ka actual innovation</li>
          <li>GPU die hierarchy: GPC to TPC to SM — physical organization of compute</li>
          <li>SM internals: CUDA Cores, Tensor Cores, RT Cores, Warp Schedulers, Shared Memory</li>
          <li>Thread, Warp, Block, Grid — programming model ka hardware mapping</li>
          <li>Memory hierarchy: registers to shared memory to L1/L2 to HBM — latency aur bandwidth numbers</li>
          <li>NVLink, NVSwitch, PCIe — interconnect technologies aur bandwidth comparison</li>
          <li>MIG aur GPU Virtualization — enterprise multi-tenancy</li>
          <li>Grace CPU + Blackwell — unified memory architecture</li>
          <li>DGX aur HGX platforms — NVIDIA ke complete AI servers</li>
          <li>Training aur inference data flow — step by step</li>
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
          1993 mein NVIDIA ka pehla chip aaya: NV1. Graphics chip tha, games ke liye. 2006 mein unhone CUDA release kiya — aur ek graphics company ek computing platform ban gayi.
        </p>
        <p style={S.p}>
          Lekin yeh transition accident nahi tha. Jensen Huang ne 1990s mein hi bet lagayi thi: GPU ek general-purpose parallel computer ban sakta hai. Woh bet implement karne mein 13 saal lage. CUDA 2006 mein aaya, pehle sirf scientific computing community use karti thi. Phir 2012 mein AlexNet aaya — aur duniya ne dekha ki GPU neural network training ke liye perfect hai.
        </p>
        <p style={S.p}>
          Aaj NVIDIA ka datacenter revenue gaming revenue se 5x zyada hai. H100 GPU 2023 mein 6-12 month waitlist tha. $30,000 per GPU, phir bhi demand supply se zyada thi.
        </p>
        <p style={S.p}>
          <strong>Lekin yeh sirf chip nahi hai.</strong> NVIDIA ne ek complete stack banaya: silicon architecture to CUDA programming model to optimized libraries (cuDNN, cuBLAS) to framework integration to enterprise platforms (DGX, HGX) to cloud partnerships. Har layer ne next layer ka foundation banaya.
        </p>
      </section>

      {/* ── WHY ARCHITECTURE ───────────────────────────────────────────── */}
      <section id="why-architecture">
        <h2 style={S.h2}>Why Architecture Understanding Matters</h2>
        <p style={S.p}>
          Ek simple sawaal se shuru karte hain: GPU mein 10,000+ cores kyun hote hain jabki CPU mein sirf 8-128?
        </p>
        <p style={S.p}>
          <strong>CPU ek city court judge ki tarah hai.</strong> Ek time pe ek case, lekin woh case bohot complex ho sakta hai. Judge intelligent hai, fast hai, lekin sequential hai.
        </p>
        <p style={S.p}>
          <strong>GPU ek election counting center ki tarah hai.</strong> Ek saath hazaron counting agents, sab ek simple kaam kar rahe hain — ek vote count karo. Koi bhi agent judge jitna smart nahi hai, lekin aggregate throughput judge se million times zyada hai for that specific task.
        </p>
        <p style={S.p}>
          AI training mein: ek forward pass mein same matrix operation millions of times different data pe hoti hai. GPU ke liye perfectly suited. Yahi fundamental insight hai jis pe poori NVIDIA architecture build hai.
        </p>
      </section>

      {/* ── EVOLUTION ──────────────────────────────────────────────────── */}
      <section id="evolution">
        <h2 style={S.h2}>Evolution — Tesla to Blackwell</h2>
        <p style={S.p}>
          Har generation ek specific problem solve karta hai. Yeh sirf "moar power" evolution nahi hai — har generation ne AI computing ke liye ek nayi capability add ki.
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
          Notice karo: AI ke liye game-changing moment Volta (2017) tha. Tensor Cores ne matrix multiply dedicated hardware mein move kiya. Philosophy shift: "GPU is primarily for AI now, graphics secondary in data center products."
        </p>
        <p style={S.p}>
          <strong>Tesla (2006):</strong> CUDA born. GPU pehli baar programmable hua. Pehle GPU fixed graphics pipeline tha — shaders pre-defined. Unified shader architecture ne general-purpose programmable cores banaye. Bina Tesla, CUDA nahi. Bina CUDA, AI GPU revolution nahi.
        </p>
        <p style={S.p}>
          <strong>Pascal (2016):</strong> NVLink 1.0 aur HBM2 — multi-GPU training viable hua. FP16 support — training 2x faster, 2x less memory. GTX 1080 became THE GPU for AI researchers in 2016-17.
        </p>
        <p style={S.p}>
          <strong>Volta (2017):</strong> Tensor Cores introduced. V100: 640 Tensor Cores, 120 TFLOPS FP16 (vs P100 ka 21 TFLOPS). 5x AI speedup. NVIDIA clearly decided "AI is our future." Yeh woh moment tha.
        </p>
        <p style={S.p}>
          <strong>Ampere (2020):</strong> TF32 (10x faster FP32 training with no code changes), A100 80GB, MIG (multi-tenant GPU), structural sparsity (2:4 — 2x speedup for sparse models). GPT-3 yahan train hua.
        </p>
        <p style={S.p}>
          <strong>Hopper (2022):</strong> Transformer Engine + FP8. H100 pe LLM training 3-6x faster than A100. FP8 auto-managed by hardware — no code changes needed. H100 ki 6-12 month waitlist 2023 mein.
        </p>
        <p style={S.p}>
          <strong>Blackwell (2024):</strong> Dual-die design (2 dies on one package via NVLink-C2C), FP4 support (first in industry — 2x faster than FP8), NVLink 5.0 (1,800 GB/s), GB200 NVL72 (36 Grace CPUs + 72 Blackwell GPUs per rack, 1.4 EFLOPS FP4, 120+ kW).
        </p>
      </section>

      {/* ── DIE HIERARCHY ──────────────────────────────────────────────── */}
      <section id="die-hierarchy">
        <h2 style={S.h2}>GPU Die Hierarchy — GPC, TPC, SM</h2>
        <p style={S.p}>
          Ek GPU die chip ke andar ka physical layout hai. H100 mein 80 billion transistors hain — yeh randomly nahi baithte. Ek hierarchical organization hai jaise ek city ka structure.
        </p>
        <p style={S.p}>
          <strong>City analogy:</strong> Die = poori city. GPC = city zones (commercial, residential). TPC = city blocks within each zone. SM = individual buildings. CUDA Core / Tensor Core = individual offices inside buildings. Data flow building se buildings mein, zones mein, city-wide — just like city infrastructure.
        </p>
        <Figure caption="GPU Die Hierarchy (H100 reference): Die contains 8 GPCs, each GPC has 4 TPCs, each TPC has 2 SMs. Total: 132 SMs. Each SM has 128 CUDA Cores, 4 Tensor Cores (4th gen), 4 Warp Schedulers, 256KB Shared Memory/L1, and 256KB Register File. Total GPU: 16,896 CUDA Cores, 528 4th-gen Tensor Cores.">
          <GpuDieHierarchy />
        </Figure>
      </section>

      {/* ── GPC ────────────────────────────────────────────────────────── */}
      <section id="gpc">
        <h2 style={S.h2}>GPC — Graphics Processing Cluster</h2>
        <p style={S.p}>
          <strong>GPC (Graphics Processing Cluster)</strong> — GPU die ka sabse bada functional block. H100 mein 8 GPCs hain. Har GPC independently parallel work execute kar sakta hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> GPC ek university college hai jisme multiple departments (TPC) hain. College ke andar resources share hote hain. Lekin ek college doosri college se independent hai — ek college down hone pe doosri unaffected.
        </p>
        <ul style={S.ul}>
          <li><strong>Contains:</strong> Multiple TPCs (4 per GPC in H100), Raster Engine (graphics, less AI-relevant), Work distributor (automatically routes thread blocks to TPCs).</li>
          <li><strong>Fault tolerance:</strong> Ek GPC defective ho toh manufacturer woh disable karta hai aur baaki chip sell karta hai. Yahi wajah hai ki kuch SKUs mein full die se slightly less compute hota hai — yield management.</li>
          <li><strong>Work distribution:</strong> CUDA runtime automatically assigns thread blocks to GPCs. Programmer ko manage nahi karna padta — GPC selection transparent hai.</li>
        </ul>
      </section>

      {/* ── TPC ────────────────────────────────────────────────────────── */}
      <section id="tpc">
        <h2 style={S.h2}>TPC — Texture Processing Cluster</h2>
        <p style={S.p}>
          <strong>TPC (Texture Processing Cluster)</strong> — GPC ke andar ka next level. Ek TPC mein 2 SMs hote hain plus shared texture units aur L1 instruction cache.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> TPC ek department hai university mein. Department ke andar 2 labs (SM) hain jo same equipment share karte hain — department ki library, shared tools. Labs independently kaam karte hain lekin efficiently share karte hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Contains:</strong> 2 SMs + Texture units (graphics texture sampling) + L1 instruction cache (shared between the 2 SMs — less redundant storage).</li>
          <li><strong>AI relevance:</strong> Texture units directly AI training mein use nahi hote. Lekin shared instruction cache ensures same kernel code running on adjacent SMs doesn't need separate copies — area efficient.</li>
          <li><strong>Why this level exists:</strong> Resource sharing efficiency. 2 SMs sharing texture units = more area-efficient than 2 fully independent SMs. Chip area is expensive.</li>
        </ul>
      </section>

      {/* ── SM ─────────────────────────────────────────────────────────── */}
      <section id="sm">
        <h2 style={S.h2}>SM — Streaming Multiprocessor</h2>
        <p style={S.p}>
          <strong>SM (Streaming Multiprocessor)</strong> — GPU ka actual compute heart. Jab aap GPU programming karte ho, aapka code SM pe execute hota hai. H100 mein 132 SMs hain — sab independently parallel kaam karte hain.
        </p>
        <p style={S.p}>
          <strong>Open-plan office analogy:</strong> SM ek open-plan office hai. CUDA Cores = general workers (any calculation). Tensor Cores = AI matrix specialists (only matrix multiply). Shared Memory = office whiteboard (team access). Registers = each employee's private notepad. Warp Scheduler = office manager (decides who works on what each cycle).
        </p>
        <Figure caption="SM (Streaming Multiprocessor) internal architecture (H100): 4 Warp Schedulers pick which 32-thread warp runs each cycle. 128 CUDA Cores do general floating-point math (1 op per core per cycle). 4 Tensor Cores do matrix multiply — AI engine (128+ ops per cycle each). 1 RT Core for ray tracing graphics. 32 Special Function Units for sin/cos/sqrt. 256KB Shared Memory/L1 Cache (team whiteboard, fast, ~1 cycle). 256KB Register File (private per-thread notepad, zero latency). Load/Store Units handle all memory requests and coalescing.">
          <SmInternalDiagram />
        </Figure>
        <p style={S.p}>
          <strong>H100 SM concrete numbers:</strong>
        </p>
        <ul style={S.ul}>
          <li>4 Warp Schedulers — har cycle pe 4 warps simultaneously dispatch kar sakte hain</li>
          <li>128 CUDA Cores (FP32) — general arithmetic, ek op per core per cycle</li>
          <li>4 Tensor Cores (4th gen, H100) — matrix multiply-accumulate, FP8/BF16/FP16/TF32/INT8/INT4</li>
          <li>1 RT Core — ray-triangle intersection (graphics only, removed in pure AI GPUs like A100)</li>
          <li>32 SFUs (Special Function Units) — sin, cos, sqrt, reciprocal</li>
          <li>32 LSUs (Load/Store Units) — memory read/write handle karte hain</li>
          <li>256 KB Shared Memory / L1 Cache — configurable split, fast on-chip</li>
          <li>256 KB Register File — 65,536 32-bit registers, per-thread private</li>
        </ul>
      </section>

      {/* ── CUDA CORES ─────────────────────────────────────────────────── */}
      <section id="cuda-cores">
        <h2 style={S.h2}>CUDA Cores — The General Workers</h2>
        <p style={S.p}>
          <strong>CUDA Core</strong> — GPU ka basic floating point arithmetic unit. Ek CUDA Core ek clock cycle mein ek operation (add ya multiply ya fused multiply-add) karta hai. H100: 132 SMs x 128 CUDA Cores = 16,896 CUDA Cores total.
        </p>
        <p style={S.p}>
          <strong>Important clarification:</strong> CUDA Core ek "core" nahi hai CPU core ki tarah. CPU core ek independent computer hai — apna instruction decoder, branch predictor, out-of-order execution. CUDA Core sirf ek arithmetic logic unit (ALU) hai — basic math unit, warp ke saath operate karta hai.
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
          <strong>Tensor Core</strong> — dedicated hardware unit jo specifically <code style={S.code}>D = A×B + C</code> matrix multiply-accumulate operation karta hai. Volta mein introduced, har generation mein improved.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> CUDA Core ek calculator hai — ek button dabao, ek result. Tensor Core ek specialized machine hai jo ek button se 4x4 table multiply kar deta hai simultaneously — 128 buttons ka kaam ek click mein.
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
          <strong>RT Core (Ray Tracing Core)</strong> — Turing mein introduce hua, specifically 3D graphics ke liye ray tracing acceleration. BVH (Bounding Volume Hierarchy — 3D spatial data structure) traversal aur ray-triangle intersection hardware mein karta hai.
        </p>
        <p style={S.p}>
          <strong>AI mein directly use nahi hote.</strong> A100 aur H100 mein RT Cores removed hain — data center GPUs don't need them. Consumer aur professional visualization GPUs (RTX 4090, RTX 6000 Ada) mein hote hain.
        </p>
        <p style={S.p}>
          <strong>Indirect AI applications:</strong> Computer vision research mein synthetic training data generation (photo-realistic ray-traced images), scientific visualization, AI-assisted rendering research. Niche — not mainstream AI training/inference.
        </p>
      </section>

      {/* ── WARP SCHEDULER ─────────────────────────────────────────────── */}
      <section id="warp-scheduler">
        <h2 style={S.h2}>Warp and Warp Scheduler</h2>
        <p style={S.p}>
          <strong>Warp</strong> — GPU programming model ka fundamental execution unit. Ek warp 32 threads ka group hai jo lockstep mein execute karte hain — same instruction, same time, sab 32 threads.
        </p>
        <p style={S.p}>
          <strong>Classroom analogy:</strong> 32 students ek class mein hain. Teacher (Warp Scheduler) ek instruction de raha hai — "Page 5 padho." Sab 32 log simultaneously page 5 padhte hain. Koi independent action nahi — jab tak teacher next instruction nahi deta, sab wait karte hain.
        </p>
        <p style={S.p}>
          <strong>Warp Divergence — the performance killer:</strong> Jab warp ke threads alag-alag branches lete hain: <code style={S.code}>{`if (thread_id % 2 == 0) { path_A(); } else { path_B(); }`}</code>. GPU serializes: Phase 1 — even threads path_A, odd idle. Phase 2 — odd threads path_B, even idle. 2x slower worst case. N distinct paths = N x slowdown. Avoid: design data layout so same-warp threads take same path.
        </p>
        <p style={S.p}>
          <strong>Warp Scheduler ka superpower — latency hiding:</strong> Har SM mein 4 Warp Schedulers hain. Ek SM pe simultaneously 64 warps tracked hote hain (2,048 threads). Jab ek warp memory operation pe wait kar raha hota hai (HBM se data load — ~200 cycles), scheduler immediately doosra ready warp pick karta hai aur execute karta hai.
        </p>
        <p style={S.p}>
          <strong>Waiter analogy:</strong> Ek waiter 10 tables serve karta hai. Table 1 ka order liya, kitchen mein gaya. Wapas aate waqt table 2 ka pani diya, table 3 ka bill liya, table 4 ko menu diya. Jab tak table 1 ka khana ready hota hai, waiter idle nahi tha. GPU same — jab ek warp wait kare, doosra execute karo. No idle time.
        </p>
        <Callout type="best-practice" title="Occupancy — More Warps = Better Latency Hiding">
          Occupancy = active warps per SM / maximum possible warps per SM. High occupancy = better latency hiding = better performance. Improve kaise: register count kam karo per thread (more threads fit per SM), shared memory usage optimize karo (less shared mem = more blocks per SM). Tool: Nsight Compute mein occupancy analysis builtin hai — use it before manual optimization.
        </Callout>
      </section>

      {/* ── THREAD BLOCK GRID ──────────────────────────────────────────── */}
      <section id="thread-block-grid">
        <h2 style={S.h2}>Thread, Block, and Grid</h2>
        <p style={S.p}>
          Yeh GPU programming model ka foundation hai — aur yeh hardware ke saath directly map karta hai.
        </p>
        <Figure caption="GPU Programming Hierarchy: 32 Threads form a Warp (hardware concept, lockstep execution). Multiple Warps form a Block (programmer-defined, up to 1024 threads, shares Shared Memory). Multiple Blocks form a Grid (entire problem). Hardware mapping: each Block runs on one SM; Grid distributed across all SMs automatically by CUDA runtime. Programmer never manages SM assignment directly — CUDA handles it.">
          <ThreadBlockGridDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Thread:</strong> Smallest unit. Own registers aur local memory. Unique thread ID. Hardware: ek CUDA Core operation ya fraction of Tensor Core.</li>
          <li><strong>Warp:</strong> 32 threads — hardware concept. Programmer mostly directly control nahi karta. Lockstep execution.</li>
          <li><strong>Block (Thread Block):</strong> Programmer-defined, 1-1,024 threads. Block ke andar threads shared memory access kar sakte hain aur <code style={S.code}>__syncthreads()</code> se synchronize. Hardware: ek block ek SM pe execute hota hai.</li>
          <li><strong>Grid:</strong> Sab blocks ka collection — poora problem. CUDA runtime automatically blocks distribute karta hai SMs mein. Programmer GPU hardware details manage nahi karta.</li>
        </ul>
        <p style={S.p}>
          <strong>Concrete example — image processing:</strong> 1024x1024 image process karna hai. Block size = 16x16 = 256 threads. Grid size = 64x64 = 4,096 blocks. Each thread handles one pixel. GPU automatically assigns blocks to SMs. If 132 SMs, roughly 31 blocks per SM initially, more as blocks finish. Programmer ne 2 lines mein defined — GPU handled rest.
        </p>
      </section>

      {/* ── REGISTERS ──────────────────────────────────────────────────── */}
      <section id="registers">
        <h2 style={S.h2}>Registers — The Fastest Memory</h2>
        <p style={S.p}>
          <strong>Registers</strong> — GPU memory hierarchy ki fastest level. On-chip, zero additional latency. H100 SM mein 65,536 32-bit registers — 256 KB total per SM.
        </p>
        <p style={S.p}>
          <strong>Desk analogy:</strong> Registers aapke desk pe rakhei items hain — instant access. Zyada items = less space for others (crowded = less efficient). Desk bhar jaaye toh items cabinet mein jaate hain (local memory = register spill — much slower).
        </p>
        <p style={S.p}>
          <strong>Register pressure — hidden performance issue:</strong> Register file finite hai. Ek thread zyada registers use kare toh ek SM pe fewer concurrent threads fit hote hain. Occupancy drops. Latency hiding ability reduces. Performance suffers. NVCC compiler automatically manages spilling — lekin spilling minimize karna = better performance.
        </p>
      </section>

      {/* ── SHARED MEMORY ──────────────────────────────────────────────── */}
      <section id="shared-memory">
        <h2 style={S.h2}>Shared Memory — The Team Whiteboard</h2>
        <p style={S.p}>
          <strong>Shared Memory</strong> — ek SM ke andar sab threads ka shared on-chip memory. Programmer explicitly manage karta hai. H100: 256 KB per SM (configurable split with L1 cache). ~1-5 cycle latency vs HBM ka 200+ cycles.
        </p>
        <p style={S.p}>
          <strong>Whiteboard analogy:</strong> 32 students (threads) ek class mein hain. Sab ke paas apne notes hain (registers). Shared memory ek class whiteboard hai — koi bhi likha aur padh sakta hai. Ek data item ek baar whiteboard pe likho, sab use karo — har student ko apna copy nahi chahiye.
        </p>
        <p style={S.p}>
          <strong>How shared memory enables fast matrix multiply — tiling:</strong>
        </p>
        <ol style={S.ol}>
          <li>Matrix A ka ek tile (sub-matrix) shared memory mein cooperative load karo (all block threads together)</li>
          <li>Matrix B ka corresponding tile shared memory mein load karo</li>
          <li>Sab threads fast shared memory se data access karke computations karo (~1 cycle per access)</li>
          <li>Next tile load karo, results accumulate karo</li>
        </ol>
        <p style={S.p}>
          Result: HBM se data sirf ek baar per tile load hota hai, shared memory mein reuse. Naive approach: har thread independently HBM se data load karta. Tiled approach: load once, compute many — arithmetic intensity dramatically improves. This is why cuBLAS, cuDNN, FlashAttention sab tiling use karte hain.
        </p>
        <Callout type="warning" title="Shared Memory Bank Conflicts">
          Shared memory internally 32 banks mein organized hai. Agar warp ke multiple threads same bank simultaneously access karein — serial access hogi, slow. Solution: access pattern design karo so different threads access different banks. Padding technique: array ka stride add karo to avoid alignment-based conflicts. Nsight Compute mein "shared memory bank conflicts" metric hai — check karo.
        </Callout>
      </section>

      {/* ── L1 L2 CACHE ────────────────────────────────────────────────── */}
      <section id="l1-l2-cache">
        <h2 style={S.h2}>L1 and L2 Cache</h2>
        <p style={S.p}>
          <strong>L1 Cache</strong> — SM ke andar hardware-managed cache. Shared memory ke saath same physical SRAM (H100: 256 KB configurable). L1 hardware automatically manage hoti hai — programmer shared memory explicitly control karta hai, L1 hardware karta hai.
        </p>
        <p style={S.p}>
          L1 cache: Frequently accessed global memory data cache karta hai. Register spills hold karta hai. Hit rate important — L1 miss = L2 check, L2 miss = HBM access (slow).
        </p>
        <p style={S.p}>
          <strong>L2 Cache</strong> — GPU-wide unified cache. H100: 50 MB L2 (A100 ka 40 MB se 25% more). Sab SMs share karte hain. L1 miss → L2 check → HBM agar L2 bhi miss.
        </p>
        <ul style={S.ul}>
          <li><strong>L2 hit rate importance:</strong> Multiple SMs same data access karte hain → L2 efficiently serve karta hai without multiple HBM trips. Small models: weights completely fit in L2 → effectively infinite bandwidth for those weights.</li>
          <li><strong>H100 50 MB L2:</strong> Some BERT-base class models completely fit. Inference dramatically faster for such models. For large LLMs: L2 as staging buffer between HBM and compute.</li>
          <li><strong>Bandwidth:</strong> L2 to SM aggregate bandwidth much higher than HBM. L2 hit = dramatically faster than HBM miss.</li>
        </ul>
      </section>

      {/* ── HBM ────────────────────────────────────────────────────────── */}
      <section id="hbm">
        <h2 style={S.h2}>HBM — The Main Memory</h2>
        <p style={S.p}>
          <strong>HBM (High Bandwidth Memory)</strong> — GPU ka main DRAM. Model weights, activations, training data, gradients — sab yahan store hote hain. AI GPU article mein detail mein cover kiya tha; yahan engineering perspective deepen karte hain.
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
          <strong>Memory Controllers</strong> — dedicated hardware units jo HBM access manage karte hain. H100: 6 HBM stacks, ek memory controller per stack. SM requests queue karte hain, burst transfers optimize karte hain, simultaneous requests handle karte hain.
        </p>
        <p style={S.p}>
          <strong>ECC (Error Correcting Code) Memory</strong> — enterprise GPU ka critical feature. Cosmic rays, electrical noise, hardware aging se bits flip ho sakti hain. ECC: extra check bits per memory word. Hardware auto-detects single-bit errors aur corrects in-place.
        </p>
        <ul style={S.ul}>
          <li><strong>Single-bit errors (SBE, correctable):</strong> Auto-fixed, logged. Periodic occurrence normal. Increasing SBE rate = hardware degrading, plan replacement.</li>
          <li><strong>Double-bit errors (DBE, uncorrectable):</strong> Detected, cannot auto-correct. Training job crash hoga. DBE = immediate investigation, GPU replacement needed likely.</li>
          <li><strong>ECC overhead:</strong> ~5% HBM bandwidth, ~2-3% usable memory. Always worth it for: multi-week training runs, production inference, medical/financial AI.</li>
          <li><strong>Check:</strong> <code style={S.code}>nvidia-smi -q | grep -i ecc</code> or via DCGM monitoring.</li>
        </ul>
      </section>

      {/* ── NVLINK ─────────────────────────────────────────────────────── */}
      <section id="nvlink">
        <h2 style={S.h2}>NVLink — GPU-to-GPU Highway</h2>
        <p style={S.p}>
          <strong>NVLink</strong> — NVIDIA ka proprietary high-speed GPU-to-GPU interconnect. PCIe ke alternative ke roop mein design kiya gaya specifically GPU-to-GPU communication ke liye.
        </p>
        <p style={S.p}>
          <strong>Highway analogy:</strong> PCIe ek single-lane national highway hai — fast but limited. NVLink ek 12-lane expressway hai dedicated sirf GPU traffic ke liye — much higher throughput.
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
          NVLink sirf SXM (Server-class) form factor GPU mein available hai. H100 PCIe: No NVLink, PCIe only for GPU-to-GPU communication. H100 SXM5: Full NVLink 4.0 (900 GB/s). For multi-GPU training: always SXM form factor. The cost premium is fully justified by training throughput at scale.
        </Callout>
      </section>

      {/* ── NVSWITCH ───────────────────────────────────────────────────── */}
      <section id="nvswitch">
        <h2 style={S.h2}>NVSwitch — The GPU Fabric</h2>
        <p style={S.p}>
          <strong>NVSwitch</strong> — ek dedicated switch chip jo multiple GPUs ko all-to-any full bandwidth pe connect karta hai.
        </p>
        <p style={S.p}>
          <strong>Without NVSwitch:</strong> 8 GPUs ek daisy-chain mein. GPU 0 aur GPU 7 directly communicate nahi kar sakte — intermediate GPUs relay karne padte hain. Bandwidth shared, latency high.
        </p>
        <p style={S.p}>
          <strong>With NVSwitch:</strong> Dedicated router. Koi bhi GPU kisi bhi GPU se directly — full NVLink bandwidth, low latency. Non-blocking fabric — sab pairs simultaneously communicate kar sakte hain at full speed.
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
          <strong>PCIe (Peripheral Component Interconnect Express)</strong> — standard interface jo GPU ko CPU se connect karta hai. Universal — every server uses PCIe for expansion cards.
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
          <li><strong>GPUDirect Storage:</strong> GPU directly NVMe SSD se read — CPU bypass. Training data IO bottleneck reduces significantly.</li>
          <li><strong>GPUDirect RDMA:</strong> GPU directly InfiniBand network se data receive — CPU bypass for network traffic. Gradient sync aur data pipeline accelerate.</li>
          <li><strong>Pinned memory:</strong> <code style={S.code}>cudaMallocHost()</code> — page-locked CPU memory. 2x faster H2D/D2H transfers vs pageable memory.</li>
          <li><strong>Grace-Blackwell solution:</strong> NVLink-C2C — 900 GB/s coherent CPU-GPU link. PCIe completely bypass for CPU-GPU. 7x improvement over PCIe 5.0.</li>
        </ul>
      </section>

      {/* ── MIG ────────────────────────────────────────────────────────── */}
      <section id="mig">
        <h2 style={S.h2}>MIG — Multi-Instance GPU</h2>
        <p style={S.p}>
          <strong>MIG (Multi-Instance GPU)</strong> — A100 se introduced. Physical H100 ko 7 tak hardware-isolated independent instances mein partition karna.
        </p>
        <p style={S.p}>
          <strong>Problem it solves:</strong> H100 massively powerful hai. Single inference job sirf 10-15% GPU utilize karta hai. Baaki wasted. MIG: ek GPU multiple tenants serve kare simultaneously — each hardware-isolated.
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
          <strong>vGPU (Virtual GPU)</strong> — NVIDIA ka enterprise GPU virtualization solution for VM environments. VMware ESXi ya KVM pe multiple VMs ek physical GPU share kar sakti hain.
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
          <strong>Grace CPU</strong> — NVIDIA ka ARM-based server processor. 72 Neoverse V2 cores, 512 GB LPDDR5X memory with 500 GB/s bandwidth. Why did NVIDIA build a CPU? To eliminate the PCIe bottleneck between CPU and GPU.
        </p>
        <p style={S.p}>
          <strong>Traditional server:</strong> CPU (Intel/AMD) ←PCIe 5.0 (128 GB/s)→ GPU. CPU aur GPU memory completely separate address spaces. Data transfer = explicit cudaMemcpy via PCIe — slow.
        </p>
        <p style={S.p}>
          <strong>GB200 Grace-Blackwell:</strong> Grace CPU + Blackwell GPU same package. NVLink-C2C connection: 900 GB/s coherent bandwidth (7x PCIe 5.0). CPU memory (512 GB LPDDR5X) + GPU HBM3e (192 GB) = unified 704 GB addressable space. No explicit copies needed — GPU directly CPU memory access karta hai via NVLink-C2C.
        </p>
        <ul style={S.ul}>
          <li><strong>AI benefit:</strong> 405B parameter model needs ~810 GB at BF16. H100: 80 GB — doesn't fit. GB200: 704 GB unified — fits. Inference possible without complex multi-node sharding.</li>
          <li><strong>GB200 NVL72:</strong> 36 Grace CPUs + 72 Blackwell GPUs per rack, NVLink 5.0 fabric, 1.4 EFLOPS FP4 total, 120+ kW, liquid cooling mandatory.</li>
          <li><strong>Memory coherency:</strong> CPU aur GPU same cache coherence domain. NUMA-like access — hot data GPU HBM mein, warm data CPU LPDDR5X mein. No PCIe page table crossing.</li>
        </ul>
        <Callout type="important" title="DC Engineer Alert: GB200 NVL72 Infrastructure">
          Power: 120+ kW per rack — dedicated high-amperage circuits, large UPS. Cooling: direct liquid cooling only, no air option at this density. Floor load: significantly heavier — structural assessment. Network: 400GbE management + IB NDR inter-rack. GB200 NVL72 is not standard DC infrastructure. Design and budget from day 1.
        </Callout>
      </section>

      {/* ── DGX AND HGX ────────────────────────────────────────────────── */}
      <section id="dgx-hgx">
        <h2 style={S.h2}>DGX and HGX Platforms</h2>
        <p style={S.p}>
          <strong>DGX (Data Center GPU Extreme)</strong> — NVIDIA ka complete, validated AI server. GPUs, CPUs, interconnects, storage, networking, software stack — sab pre-configured aur validated.
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
          Ek single SM pe ek tensor operation exactly kaise execute hoti hai — step by step.
        </p>
        <ol style={S.ol}>
          <li><strong>Instruction Dispatch:</strong> Warp Scheduler ek ready warp select karta hai. Matrix multiply instruction decode. Tensor Core ko assign kiya jaata hai.</li>
          <li><strong>Operand Fetch:</strong> Input matrix addresses calculate. L1 cache check — hit? fast. miss? L2 check. L2 miss? HBM access queue mein.</li>
          <li><strong>Latency Hiding:</strong> HBM access ~200 cycles wait. Meanwhile, Warp Scheduler doosra ready warp execute karta hai. GPU never truly idle.</li>
          <li><strong>Shared Memory Load:</strong> Data HBM se shared memory mein tile karte hain. All block threads cooperative load.</li>
          <li><strong>Tensor Core Execution:</strong> Tiles se matrices Tensor Core registers mein. Matrix multiply-accumulate in one cycle. Multiple cycles for full tile computation.</li>
          <li><strong>Accumulation:</strong> Results next tile ke saath accumulate. Repeat for all tiles of the full matrix.</li>
          <li><strong>Write Back:</strong> Final result HBM mein write. Next layer ka input ready.</li>
        </ol>
        <p style={S.p}>
          <strong>The tiling insight — why this is fast:</strong> Naive approach: HBM se every element every time. O(N^3) HBM accesses for N x N matrix multiply. Tiling: load once to shared memory, compute many times. O(N^2 x N/tile) HBM accesses — tile_size times less. FlashAttention does this for attention: recompute on-chip instead of storing to HBM — 3-6x faster attention.
        </p>
      </section>

      {/* ── TRAINING FLOW ──────────────────────────────────────────────── */}
      <section id="training-flow">
        <h2 style={S.h2}>AI Training Flow</h2>
        <p style={S.p}>
          Ek complete training iteration — storage se weight update tak — step by step.
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
          Inference = trained model use karna real user requests pe. Different hardware requirements from training.
        </p>
        <p style={S.p}>
          <strong>LLM autoregressive generation on GPU:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Prefill phase:</strong> User ka entire prompt ek saath process karo. Q, K, V matrices compute, attention calculate. KV cache populate. Compute-bound — Tensor Cores busy with large matrices.</li>
          <li><strong>Decode phase:</strong> Ek token at a time generate karo. New token ka Q compute, KV cache se previous K, V fetch, attention, output token sample. Memory-bound — KV cache repeatedly HBM se read hota hai.</li>
          <li><strong>KV Cache memory:</strong> seq_length x num_heads x head_dim x 2 x bytes x num_layers. Long contexts (128K tokens): tens of GB per request. H200 (141 GB) ya MI300X (192 GB) ke liye demand — more memory for KV cache.</li>
        </ul>
        <p style={S.p}>
          <strong>Key optimizations for LLM inference:</strong>
        </p>
        <ul style={S.ul}>
          <li><strong>Continuous Batching:</strong> As requests complete, new requests fill space. Each decode step: scheduler checks completions and arrivals. GPU utilization dramatically higher. vLLM aur TensorRT-LLM implement this.</li>
          <li><strong>PagedAttention (vLLM):</strong> KV cache non-contiguous memory blocks mein — like OS virtual memory pages. Reduces fragmentation, 2-4x throughput improvement. TensorRT-LLM bhi support karta hai.</li>
          <li><strong>Speculative Decoding:</strong> Small draft model quickly generates candidate tokens. Large verifier model checks multiple candidates in parallel. 2-3x throughput when draft accuracy high.</li>
        </ul>
      </section>

      {/* ── WHY NVIDIA DOMINATES ───────────────────────────────────────── */}
      <section id="why-nvidia-dominates">
        <h2 style={S.h2}>Why NVIDIA Dominates AI</h2>
        <p style={S.p}>
          Hardware specs se zyada important ecosystem hai. Yeh samajhna critical hai ki competitors similar specs ke bawajood struggle karte hain.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA — 18+ year ecosystem:</strong> 2006 se. 3 million+ registered developers. Every AI researcher learns CUDA. Papers assume CUDA. Code assumes CUDA. Network effects compound every year.</li>
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
          <strong>CUDA (Compute Unified Device Architecture)</strong> — NVIDIA GPU pe parallel computation ka programming model. C/C++ extension, familiar syntax, 18+ years of development.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA Streams:</strong> In-order GPU operation queues. Multiple streams: overlap compute and data transfer. Transfer on stream 1, compute on stream 2 — GPU always busy. Production inference optimization ka key tool.</li>
          <li><strong>CUDA Events:</strong> GPU timeline pe timestamps. Training profiling, CPU-GPU synchronization points, high-resolution GPU timing.</li>
          <li><strong>NVCC Compilation:</strong> .cu files to PTX (intermediate, architecture-independent) to CUBIN (target GPU machine code). PTX future GPUs pe JIT recompile possible. First run slow (JIT), subsequent fast (cached CUBIN).</li>
          <li><strong>Unified Memory:</strong> Single pointer both CPU aur GPU access karte hain. System migrates data automatically. Less manual memory management — useful for prototyping and complex data structures. Slight overhead vs explicit transfers.</li>
        </ul>
      </section>

      {/* ── TENSORRT ───────────────────────────────────────────────────── */}
      <section id="tensorrt">
        <h2 style={S.h2}>TensorRT — Inference Optimization</h2>
        <p style={S.p}>
          <strong>TensorRT</strong> — NVIDIA ka inference optimization engine. Train once, serve billions of times — inference optimization return on investment is massive.
        </p>
        <Figure caption="TensorRT Optimization Pipeline: PyTorch Model (FP32, unoptimized, 1x baseline) → ONNX Export (framework-neutral format) → TensorRT Build phase (graph optimization: fuse Conv+BN+ReLU into single kernel; precision calibration: FP32 to INT8/FP8; kernel auto-tuning: benchmark best implementation per your specific GPU and input shape; memory optimization: buffer reuse planning) → Optimized TensorRT Engine (GPU-specific binary) → 3-8x faster production inference with lower memory.">
          <TensorRtPipeline />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Graph optimization:</strong> Unnecessary ops remove, constants fold, subgraph fusion. Conv + BatchNorm + ReLU to single fused kernel — 3 kernel launches to 1, 2 intermediate allocations to 0. Memory bandwidth reduces 3x to 1x.</li>
          <li><strong>Precision calibration:</strong> FP32 to INT8 conversion. Calibration dataset pe run karo, per-layer scale factors determine karo. 2-3x faster, minimal accuracy loss. H100 pe: FP32 to FP8 via Transformer Engine integration.</li>
          <li><strong>Kernel auto-tuning:</strong> Thousands of GEMM implementations available. TensorRT benchmarks on YOUR specific GPU + YOUR specific input shape. Selects fastest. Build on target GPU — A100 engine not optimal on H100.</li>
          <li><strong>Memory planning:</strong> Tensor buffer reuse — output of layer N = input buffer of layer N+2 if safe. Peak memory reduces 20-40%.</li>
        </ul>
        <p style={S.p}>
          <strong>TensorRT-LLM:</strong> Open-source LLM inference library from NVIDIA. Continuous batching, PagedAttention, SpeculativeDecoding, quantization (GPTQ, AWQ, SmoothQuant compatible), custom attention kernels. Best performance for LLM serving on H100.
        </p>
        <p style={S.p}>
          <strong>Triton Inference Server:</strong> NVIDIA ke open-source model serving framework. HTTP/gRPC endpoints, multiple backends (TensorRT, ONNX, PyTorch, TF, custom), dynamic batching, model ensemble, concurrent model execution. Production serving standard for NVIDIA GPU deployments.
        </p>
      </section>

      {/* ── NCCL ───────────────────────────────────────────────────────── */}
      <section id="nccl">
        <h2 style={S.h2}>NCCL — Collective Communications</h2>
        <p style={S.p}>
          <strong>NCCL (NVIDIA Collective Communications Library)</strong> — distributed GPU training ka backbone. AllReduce, AllGather, ReduceScatter, Broadcast — GPU clusters mein.
        </p>
        <ul style={S.ul}>
          <li><strong>AllReduce:</strong> Sab GPUs ke gradients sum/average karo, result sab ko do. Main operation in data-parallel training. Ring ya tree algorithm depending on topology.</li>
          <li><strong>ReduceScatter + AllGather:</strong> AllReduce ko 2 phases mein split. ZeRO-3 aur PyTorch FSDP yeh use karte hain — each GPU sirf gradient shard receive karta hai = less peak memory.</li>
          <li><strong>Topology awareness:</strong> NCCL auto-detects NVLink vs PCIe vs InfiniBand. Different algorithms for different topologies. Debug: <code style={S.code}>NCCL_DEBUG=INFO python train.py 2&gt;&amp;1 | grep NCCL</code></li>
          <li><strong>Overlap with computation:</strong> PyTorch DDP/FSDP gradient communication backward pass ke saath overlap karte hain. Layer N backward chal raha hai jab Layer N-1 gradients AllReduce pe. 20-30% additional speedup possible via overlap.</li>
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
          Production deployments mein common confusion — important distinction hai.
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
          <strong>Container workflow:</strong> Container images (nvcr.io/nvidia/pytorch:24.01-py3) include CUDA Toolkit. Host: sirf driver install karo. Container CUDA Toolkit communicates with host driver via <code style={S.code}>/usr/lib/x86_64-linux-gnu/libcuda.so</code> mount. Driver upgrade on host = all containers benefit.
        </p>
        <Callout type="warning" title="Production Driver Update Protocol">
          Never update GPU driver on production training nodes without: staging environment test first; active jobs checkpoint save; maintenance window schedule; rollback plan ready. Driver update = GPU kernel module reload = all GPU processes terminate immediately. Plan accordingly — unplanned update during training = job lost.
        </Callout>
      </section>

      {/* ── ENTERPRISE DEPLOYMENT ──────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise Deployment</h2>
        <ul style={S.ul}>
          <li><strong>Driver aur software stack:</strong> Verify driver-CUDA compatibility before hardware ordering. NVIDIA AI Enterprise subscription for vGPU aur enterprise support SLA. nvidia-container-toolkit install for Docker/Kubernetes. DCGM agent har GPU node pe.</li>
          <li><strong>Networking validation:</strong> IB link verify: <code style={S.code}>ibstat</code> aur <code style={S.code}>ibping</code>. NVLink status: <code style={S.code}>nvidia-smi nvlink -s -i 0</code>. NCCL all-reduce benchmark before production: nccl-tests package run karo. Fat-tree physical cabling verify — miscabling = asymmetric bandwidth.</li>
          <li><strong>Storage configuration:</strong> GPUDirect Storage enable karo agar NVMe present. Parallel file system benchmark karo before training starts. Checkpoint strategy: fast local NVMe for frequent checkpoints, object storage (S3/GCS) for durability.</li>
          <li><strong>Monitoring:</strong> DCGM Prometheus exporter + Grafana dashboards. Key metrics: GPU utilization, memory utilization, temperature, power, ECC errors, NVLink bandwidth. Alerts: temp greater than 80°C, ECC double-bit errors, GPU utilization consistently less than 60% on training.</li>
          <li><strong>Security:</strong> MIG or vGPU for multi-tenant isolation. Network encryption for gradient communication if compliance required. Model checkpoints encryption at rest.</li>
        </ul>
      </section>

      {/* ── POWER AND COOLING ──────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling</h2>
        <p style={S.p}>
          GPU data centers ke liye power aur cooling planning hardware selection se pehle aani chahiye.
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
          <li><strong>Profile before optimizing:</strong> Nsight Systems timeline se dekho — GPU idle kab hai. Data loading? Communication? Compute? Specific bottleneck target karo. Don't guess.</li>
          <li><strong>Maximize occupancy:</strong> <code style={S.code}>ncu --metrics sm__warps_active.avg.pct_of_peak_sustained_active</code> se SM occupancy check karo. Low = register pressure or shared memory pressure. Adjust block size and memory usage.</li>
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
            q: "GPU architecture mein GPC, TPC, aur SM hierarchy kya hai aur hardware level pe kaise map karta hai?",
            a: "GPU die hierarchical organization mein hota hai. GPC (Graphics Processing Cluster) sabse bada functional block — H100 mein 8 GPCs. Har GPC mein 4 TPCs (Texture Processing Clusters). Har TPC mein 2 SMs (Streaming Multiprocessors). SM GPU ka actual compute unit hai — jahan programmer ka code execute hota hai. H100: 8 GPCs x 4 TPCs x 2 SMs = 64 SM units per GPC group... H100 total: 132 SMs. Har SM mein: 128 CUDA Cores, 4 Tensor Cores (4th gen), 4 Warp Schedulers, 1 RT Core, 256 KB Shared Memory/L1, 256 KB Register File. Jab GPU code run hota hai: thread blocks to SMs distribute hote hain. Warp Schedulers warps execute karte hain. Tensor Cores matrix multiply karte hain. CUDA Cores activation functions karte hain. Hierarchy purpose: resource sharing efficiency (TPC level pe texture units aur instruction cache share hote hain), fault tolerance (defective GPC disable karo, baaki chip sell karo), aur scalable design (future GPUs mein more GPCs add karo).",
          },
          {
            q: "Warp divergence kya hai, performance pe kya impact aur real AI code mein kaise avoid karein?",
            a: "Warp 32 threads ka group hai jo GPU mein lockstep execute karte hain — same instruction simultaneously. Warp divergence: threads alag code paths lete hain. GPU serializes both paths: Phase 1 — path_A lene wale threads execute karte hain, baaki idle. Phase 2 — path_B lene wale execute, baaki idle. Performance: worst case 2x slower, N paths = N x slowdown. Real AI examples: attention masking with variable-length sequences, conditional processing based on value thresholds, sparse operations. Mitigation: (1) Pad all sequences to same length — same-warp threads same path; (2) Branchless code — predicated instructions; (3) Sort input by property determining branch — similar values in same warp; (4) Redesign algorithm to avoid per-thread conditionals. Tool: Nsight Compute, branch efficiency metric. LLM: FlashAttention handles masked attention without per-element divergence — careful algorithm design.",
          },
          {
            q: "Shared memory GPU performance mein kyun critical hai — tiling technique explain karo?",
            a: "Shared Memory SM ke andar sab threads ka shared on-chip memory hai. H100: 256 KB per SM, ~1-5 cycle latency (vs HBM 200+ cycles). Matrix multiply ke liye critical: Naive approach: ek element calculate karne ke liye, HBM se entire row aur column access. N x N matrix: O(N^3) HBM accesses. Memory bandwidth = bottleneck. Tiling technique: (1) Matrix A ka tile (e.g., 16x16) shared memory mein cooperative load karo — all block threads together; (2) Matrix B ka corresponding tile load karo; (3) Shared memory se fast access karte hue computations karo (~1 cycle per access); (4) Next tile load, results accumulate; (5) Repeat for all tiles. Result: same O(N^3) compute lekin HBM accesses O(N^2 x N/tile_size) — tile_size times less bandwidth. 16x16 tile: 16x less HBM bandwidth per FLOP. cuBLAS, cuDNN, FlashAttention — sab tiling use karte hain. FlashAttention specifically: attention computation tiles through HBM — activations store nahi karte, sab on-chip compute. Result: 3-6x faster attention, 10-20x less memory for attention computation.",
          },
          {
            q: "NVLink aur PCIe kya hai — multi-GPU training mein kya practical impact hai?",
            a: "PCIe (Peripheral Component Interconnect Express): CPU-GPU standard interface. PCIe 5.0: 128 GB/s bidirectional. Universal — every PCIe device uses it. NVLink: NVIDIA ka GPU-to-GPU proprietary interconnect. NVLink 4.0 (H100): 900 GB/s bidirectional. 7x faster than PCIe 5.0. Multi-GPU training impact: Data-parallel training mein gradient synchronization (AllReduce) hai main communication. 70B model gradients at BF16 = 280 GB per AllReduce. NVLink 4.0 (DGX H100, NVSwitch): 280 GB / 900 GB/s = ~0.31 sec per AllReduce. PCIe 5.0 only: 280 GB / 128 GB/s = ~2.2 sec per AllReduce. Difference: 1.9 seconds per training step. Millions of steps: enormous time impact. DGX H100: 4 NVSwitches connecting 8 GPUs — any-to-any at full 900 GB/s. All 8 GPU pairs simultaneously communicate at full bandwidth. PCIe: CPU hub topology — shared bandwidth. Always use SXM form factor (NVLink) for multi-GPU training. Never PCIe form factor for serious distributed training.",
          },
          {
            q: "MIG kaise kaam karta hai — hardware isolation ka technical basis kya hai?",
            a: "MIG (Multi-Instance GPU) A100 mein introduced, H100 pe refined. Physical H100 ko 7 tak hardware-isolated instances mein partition karna. Technical implementation: H100 mein 8 GPCs. MIG in GPCs ko slices mein divide karta hai. Har instance ko dedicated milta hai: specific GPC subset (SM isolation), L2 cache partition (separate address ranges — different instances different L2 portions use karte hain), HBM memory slice (dedicated capacity aur memory controller bandwidth), PCIe aur NVLink bandwidth allocation. Hardware isolation kya matlab: ek instance ka code doosre instance ke hardware access nahi kar sakta — silicon-level protection. Ek instance ke reads doosre instance ke L2 evict nahi kar sakte. HBM address ranges overlap nahi hote. Yeh software isolation (vGPU) se alag hai jahan shared hardware hai lekin software unauthorized access prevent karta hai. Instance creation: nvidia-smi -mig 1 (enable) phir mig -cgi 3g.40gb,2g.20gb -C (create GPU instance aur Compute instance). Enterprise value: cloud inference providers 7 isolated tenants per H100 serve kar sakte hain simultaneously — true parallel execution, not time-sliced.",
          },
          {
            q: "TensorRT inference PyTorch eager se kitna faster hai — technical reasons kya hain?",
            a: "Speedup: 2-8x depending on model aur GPU. Multiple optimizations combined: (1) Graph optimization: PyTorch eager mode mein har op individually execute. TensorRT poora graph analyze karta hai — dead ops remove, constants fold, subgraphs fuse. Conv + BatchNorm + ReLU: 3 kernel launches + 2 intermediate memory allocations to 1 kernel + 0 intermediate. Memory bandwidth: 3x to 1x. (2) Kernel auto-tuning: NVIDIA ke paas thousands of GEMM implementations (different algorithms, tile sizes, loop unrolling). TensorRT benchmarks on YOUR GPU + YOUR input shape aur fastest select karta hai. Generic PyTorch: heuristic-based. TensorRT: measured-best. (3) Precision calibration: FP32 to INT8. Calibration dataset: per-layer dynamic range determine karo, quantize. INT8 Tensor Cores 2x faster than FP16. H100 FP8: additional 2x. (4) Memory planning: output tensor of layer N reused as input of layer N+2 if safe. Peak memory 20-40% reduce. Combined: 3-8x speedup realistic. Real example: BERT-base on H100: PyTorch eager BF16 12ms, TensorRT INT8 2ms = 6x faster. Engine must be built on target GPU — A100-built engine not optimal on H100.",
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
          <li>NVIDIA GPU architecture ek hierarchy hai — Die to GPC to TPC to SM. SM real compute unit hai (132 SMs in H100, sab independently parallel). Har SM: 128 CUDA Cores (general math, 1 op/cycle) + 4 Tensor Cores (matrix multiply, 8,192 ops/cycle at FP8) + Shared Memory (fast team whiteboard) + Register File (private per-thread). Yeh architecture ek city ki tarah — offices (cores) buildings (SM) zones (GPC) mein organized.</li>
          <li>Tensor Cores aur CUDA Cores fundamentally different hain. CUDA Core: 1 FP32 op per cycle — activation functions, normalization. Tensor Core: thousands of matrix ops per cycle — neural network layers. AI training 90%+ matrix multiply hai — Tensor Cores are the main engine. Volta 2017 pe introduced, har generation better precision: FP16 to INT8 to TF32/BF16 to FP8 to FP4. H100 Transformer Engine FP8 automatically manages per-layer.</li>
          <li>Warp = 32 threads lockstep. GPU superpower: latency hiding — jab ek warp memory wait kare, doosra execute hota hai. 64 warps tracked per SM simultaneously. Warp divergence (if-else) performance kills — 2x slowdown worst case. Design code so same-warp threads take same branch. Occupancy maximize karo: less register pressure, less shared memory per block = more concurrent warps = better latency hiding.</li>
          <li>Memory hierarchy determines performance. Registers (0 ns) to Shared Memory (~1 cycle) to L1/L2 (automatic) to HBM (200+ cycles). Tiling: load from HBM to Shared Memory once, compute many times — arithmetic intensity improves dramatically. FlashAttention recomputes attention on-chip instead of storing to HBM — 3-6x attention speedup. Memory-bound vs compute-bound: profile first, then optimize appropriately.</li>
          <li>NVLink (900 GB/s) vs PCIe (128 GB/s) — 7x difference for GPU-to-GPU. Multi-GPU training gradient sync (AllReduce): NVLink 0.31 sec vs PCIe 2.2 sec for 70B model. Over millions of steps: enormous accumulated difference. DGX H100: NVSwitch enables any-to-any full bandwidth across all 8 GPUs. Always SXM form factor for multi-GPU training — PCIe form factor not viable for serious distributed work.</li>
          <li>MIG partitions one H100 into 7 hardware-isolated instances. True silicon-level isolation — separate SMs, L2 cache, HBM, memory controller. True simultaneous execution. Cloud inference: 1 GPU to 7 revenue streams. Research: 7 independent isolated users. Mixed workloads: production + development simultaneously. Enable when GPU utilization consistently below 60% on single workload.</li>
          <li>CUDA ecosystem is NVIDIA's real competitive moat. 18+ years, millions of developers, hand-optimized cuDNN per GPU generation, major PyTorch contributor, TensorRT production-ready, NCCL for distributed. Matching GPU specs is possible — matching 18 years of ecosystem depth is not quick. The gap is in library optimization, developer tools, framework integration, enterprise tooling. Ecosystem compounding makes it harder to close over time, not easier.</li>
          <li>TensorRT production inference ke liye mandatory. 3-8x speedup: graph fusion + precision calibration (INT8/FP8) + kernel auto-tuning + memory planning combined. Build once per GPU per input shape. Never use A100-built engine on H100. TensorRT-LLM for LLMs: continuous batching + PagedAttention + speculative decoding = maximum H100 utilization for serving.</li>
          <li>Data center: H100 = 700W. DGX H100 = ~10.2 kW. 4 DGX per rack = ~41 kW. Liquid cooling above 25 kW/rack recommended, mandatory for GB200 NVL72 (120+ kW). ECC: always ON — single-bit auto-correct, double-bit = GPU replacement schedule. DCGM monitoring: temperature above 80°C alert, ECC double-bit immediate action, GPU utilization below 60% on training = investigate bottleneck. Driver updates: staging first, maintenance window, rollback plan.</li>
          <li>Grace + Blackwell (GB200) architecture changes everything for large model deployment. NVLink-C2C (900 GB/s coherent) eliminates PCIe bottleneck. 704 GB unified CPU+GPU memory — trillion-parameter model inference on single rack without complex sharding. FP4 Tensor Cores: same throughput from fewer GPUs for quantizable workloads. Rack-scale supercomputer (NVL72) becomes the unit of AI infrastructure. Future direction: tighter CPU-GPU integration, more memory per system, higher efficiency per watt per FLOP.</li>
        </ul>
      </section>

    </article>
  );
}
