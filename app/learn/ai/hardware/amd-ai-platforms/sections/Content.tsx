"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { amdAiContent } from "@/content/amd-ai-platforms";

import CdnaEvolutionTimeline from "../svg/CdnaEvolutionTimeline";
import ComputeUnitDiagram from "../svg/ComputeUnitDiagram";
import Mi300xChipletDiagram from "../svg/Mi300xChipletDiagram";
import MemoryComparisonDiagram from "../svg/MemoryComparisonDiagram";
import RocmSoftwareStack from "../svg/RocmSoftwareStack";
import WavefrontVsWarp from "../svg/WavefrontVsWarp";
import InfinityFabricDiagram from "../svg/InfinityFabricDiagram";
import AmdTrainingFlow from "../svg/AmdTrainingFlow";
import MiSeriesTimeline from "../svg/MiSeriesTimeline";
import AmdVsNvidiaStrengths from "../svg/AmdVsNvidiaStrengths";

void amdAiContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ──────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          NVIDIA ke baare mein aapne detail mein padh liya. Ab ek cheez aur samajhni hai jo AI hardware landscape mein increasingly important ho rahi hai: AMD ka AI ecosystem.
        </p>
        <p style={S.p}>
          AMD — Advanced Micro Devices — woh company hai jisne CPUs aur GPUs banane mein decades laga diye. Gaming mein Radeon. Servers mein EPYC. Aur ab AI mein: Instinct MI series. MI300X abhi market mein ek aise competitor ke roop mein hai jo seriously NVIDIA ke paas jaata hai — especially ek area mein jahan NVIDIA actually peeche hai: memory capacity.
        </p>
        <p style={S.p}>
          Yeh article AMD ki AI architecture ko zero se cover karta hai. GCN se CDNA 4 tak evolution. Compute Units kya hote hain. Dedicated Matrix Core hardware kaise kaam karta hai. ROCm ecosystem — CUDA ka AMD alternative. MI300X kyun 192 GB HBM3 ke saath interesting hai large model inference ke liye. Aur honestly — kab AMD consider karo aur kab NVIDIA hi sahi choice hai.
        </p>
        <Callout type="important" title="Ek Line Reality Check">
          Hardware pe: MI300X impressive hai. Software ecosystem pe: ROCm, CUDA se kaafi peeche hai lekin rapidly improving. Enterprise adoption: growing, lekin early stages. Yeh article aapko wo sab batayega jo actually decision-relevant hai — marketing nahi.
        </Callout>
      </section>

      {/* ── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>AI/ML Engineers</strong> — ROCm pe PyTorch kaise run hota hai, HIP programming model kya hai, NVIDIA se migration mein kya challenges hain, kab AMD accelerators seriously evaluate karein.</li>
          <li><strong>Data Center Engineers</strong> — MI300X power requirements, cooling, rack density, Infinity Fabric topology, chiplet architecture ke DC implications.</li>
          <li><strong>System Architects</strong> — MI300/MI350 cluster design, ROCm vs CUDA ecosystem tradeoffs, enterprise AMD AI deployment strategy.</li>
          <li><strong>Students aur Freshers</strong> — AMD GPU architecture ka complete overview, NVIDIA se kaise compare karta hai, aur AI hardware landscape mein AMD ka actual role.</li>
        </ul>
      </section>

      {/* ── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>AMD AI chip evolution — GCN se CDNA 4 tak, har generation ka specific improvement</li>
          <li>Compute Unit (CU) architecture — AMD GPU ka fundamental building block</li>
          <li>Stream Processors, Matrix Cores — NVIDIA ke CUDA Core aur Tensor Core equivalents</li>
          <li>Infinity Cache — AMD ka unique on-chip cache innovation</li>
          <li>HBM memory in AMD context — bandwidth aur capacity comparison</li>
          <li>Infinity Fabric (internal) aur xGMI (external) — AMD ke chip connections</li>
          <li>Chiplet architecture — MI300X kyun 3D stacked chiplets use karta hai</li>
          <li>MI100, MI200, MI300, MI350 — product evolution aur specs</li>
          <li>ROCm ecosystem — AMD ka CUDA alternative, kya work karta hai aur kya nahi</li>
          <li>HIP programming model — CUDA code AMD pe kaise chalate hain</li>
          <li>RCCL — AMD ka NCCL equivalent for distributed training</li>
          <li>AMD AI software stack — complete picture</li>
          <li>Training aur inference workflows on AMD hardware</li>
          <li>AMD vs NVIDIA — honest technical comparison</li>
          <li>Enterprise deployment, rack design, power aur cooling</li>
          <li>Best practices, common mistakes, troubleshooting</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous articles covered:</strong> <TopicLink slug="ai-gpu" variant="inline" /> (NVIDIA basics), <TopicLink slug="tpu" variant="inline" /> (Google&apos;s chip), <TopicLink slug="ai-accelerators" variant="inline" /> (landscape overview), <TopicLink slug="nvidia-architecture" variant="inline" /> (deep die-level dive)</li>
          <li><strong>Current:</strong> AMD AI Architecture — CDNA design, ROCm ecosystem, MI series, practical deployment</li>
          <li><strong>Related concepts:</strong> <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="llm" variant="inline" /></li>
        </ul>
        <p style={S.p}>
          <em>Note: Yeh article NVIDIA Architecture pe build karta hai. Agar aapne woh padh liya hai toh AMD ka comparison perspective zyada clear hoga. Lekin yeh article standalone bhi complete hai.</em>
        </p>
      </section>

      {/* ── INTRODUCTION ───────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          2020 mein ek interesting cheez hui. AMD ne MI100 launch kiya — pehla accelerator specifically for AI aur HPC (High Performance Computing — data centers mein scientific calculations ke liye). Tab tak NVIDIA V100 dominant tha. MI100 ne compete kiya lekin match nahi kiya.
        </p>
        <p style={S.p}>
          2021 mein MI200 aaya. Yahan AMD ne ek interesting bet lagai: double-die design, 128 GB HBM2e memory per card. Market ne notice kiya.
        </p>
        <p style={S.p}>
          2023 mein MI300X aaya. 192 GB HBM3. Ek single accelerator card pe. NVIDIA H100 ke paas 80 GB tha. Memory capacity mein AMD ek saath 2.4× aage nikal gayi.
        </p>
        <p style={S.p}>
          Yeh sirf numbers ki baat nahi hai. LLM inference ke liye memory capacity ek critical constraint hai — ek large model ko GPU memory mein fit karna padta hai inference ke liye. MI300X pe, jo model H100 pe do cards chahiye tha, woh ek card pe fit ho jaata hai. Simpler deployment, less communication overhead, potentially lower cost.
        </p>
        <Callout type="best-practice" title="AMD Serious Player Hai?">
          Honestly — depends on use case. Hardware pe: MI300X impressive hai. Software ecosystem pe: ROCm CUDA se kaafi peeche hai lekin rapidly improving. Enterprise adoption: growing lekin early stages. Yeh article aapko wo sab batayega jo actually decision-relevant hai.
        </Callout>
      </section>

      {/* ── WHY AMD MATTERS ────────────────────────────────────────────── */}
      <section id="why-amd-matters">
        <h2 style={S.h2}>Why AMD AI Architecture Matters</h2>
        <p style={S.p}>
          AMD ek "GPU company" nahi hai — yeh ek semiconductor company hai jo CPUs, GPUs, aur now AI accelerators banati hai. Yeh vertical integration AMD ko kuch unique advantages deta hai.
        </p>
        <p style={S.p}>
          <strong>CPU side:</strong> EPYC processors server market mein strong — Intel Xeon ke serious competitor. AMD ke paas CPU design expertise hai.
        </p>
        <p style={S.p}>
          <strong>GPU side:</strong> Radeon gaming GPUs — NVIDIA GeForce ke competitors. Woh foundation data center chips ke liye use hoti hai.
        </p>
        <p style={S.p}>
          <strong>AI accelerators:</strong> Instinct MI series — specifically for AI training aur inference. Consumer GPU se completely separate product line, separate architecture (CDNA).
        </p>
        <p style={S.p}>
          <strong>The unified vision:</strong> AMD ka bet yeh hai ki CPU + GPU + memory tightly integrated karo. MI300A (APU variant) mein CPU, GPU, aur HBM sab ek package mein hain. AMD aur NVIDIA alag bets laga rahe hain: NVIDIA world&apos;s best standalone GPU accelerator; AMD tight CPU-GPU integration, large memory, chiplet-based scalability.
        </p>
      </section>

      {/* ── EVOLUTION ──────────────────────────────────────────────────── */}
      <section id="evolution">
        <h2 style={S.h2}>Evolution — GCN to CDNA 4</h2>
        <p style={S.p}>
          Har generation ek problem solve karta hai. AMD ki AI chip evolution samajhne ke liye starting point hai GCN — jo gaming GPU ka foundation tha — aur journey hai CDNA 4 tak jo pure AI computing hai.
        </p>
        <Figure caption="AMD CDNA Architecture Evolution: GCN (2012-19) was the programmable GPU foundation. CDNA 1 (2020, MI100) removed graphics entirely — first compute-only AMD chip. CDNA 2 (2021, MI250X) added dual-die design with 128GB HBM2e and FP64 Matrix Cores — used in Frontier supercomputer. CDNA 3 (2023, MI300X) introduced 3D chiplets with 192GB HBM3 — the memory revolution. CDNA 4 (2025, MI350) focuses on FP8 inference — verify specs at amd.com/instinct.">
          <CdnaEvolutionTimeline />
        </Figure>
        <ComparisonTable
          title="Architecture Evolution — Generation by Generation"
          headers={["Architecture", "Year", "Product", "Memory", "Key Innovation"]}
          rows={[
            ["GCN", "2012-19", "Various Radeon", "GDDR5/HBM", "Unified compute + graphics baseline, foundation era"],
            ["CDNA 1", "2020", "MI100", "32 GB HBM2", "Graphics removed, dedicated AI compute focus, 300W"],
            ["CDNA 2", "2021", "MI200 series", "128 GB HBM2e", "Dual-die MCM, FP64 Matrix Cores, exascale HPC win"],
            ["CDNA 3", "2023", "MI300 series", "192 GB HBM3", "3D chiplets, massive memory, AI inference revolution"],
            ["CDNA 4", "2025", "MI350 series", "Higher (verify)", "FP8 improvements, inference focus — verify amd.com"],
          ]}
        />

        <p style={S.p}><strong>GCN — Graphics Core Next (2012–2019):</strong> AMD ka unified shader architecture tha. NVIDIA ke Fermi/Maxwell jaisa period. GCN ne ek programmable GPU architecture define kiya jo both graphics aur compute ke liye use ho sakti thi. Compute Units (CUs) as primary building blocks introduced kiye. AI ke liye technically use hoti thi — ROCm ka initial support GCN pe tha. Lekin yeh architecture AI ke liye optimized nahi tha — graphics-first design.</p>

        <p style={S.p}><strong>CDNA 1 (2020) — MI100:</strong> Woh moment jab AMD ne decide kiya ki AI/HPC aur gaming chips alag honge. Consumer GPUs RDNA (Radeon DNA) architecture pe rahe. Data center AI chips CDNA pe gaye. Graphics components completely removed. Dedicated Matrix Core hardware introduced for matrix operations. 32 GB HBM2, 300W. MI100 market ko prove kiya ki AMD compute-only chips bana sakta hai.</p>

        <p style={S.p}><strong>CDNA 2 (2021) — MI200 Series:</strong> AMD ka &quot;fix the memory problem&quot; generation. MCM (Multi-Chip Module) design — ek single card pe do GPU dies. MI250X: 220 CUs total, 128 GB HBM2e, 3.2 TB/s, FP64 dedicated Matrix Cores — pehli baar. Frontier supercomputer (world&apos;s first exascale system, 2022) AMD MI250X pe build hua. Scientific computing mein MI250X clearly won on FP64 performance.</p>

        <p style={S.p}><strong>CDNA 3 (2023) — MI300 Series:</strong> Yeh woh generation hai jisne AMD ko seriously relevant banaya AI market mein. Three major innovations: 3D Chiplet Architecture (8 XCDs + 1 AID + 4 HBM stacks), massive 192 GB HBM3 memory, aur MI300A (APU variant with CPU + GPU + unified HBM). Microsoft Azure, Oracle OCI, aur others ne MI300X adopt kiya.</p>

        <p style={S.p}><strong>CDNA 4 (2025) — MI350 Series:</strong> Details limited at time of writing.</p>
        <Callout type="warning" title="MI350 Specifications">
          Specifications may change. Verify current specifications from AMD official documentation at amd.com/instinct before procurement.
        </Callout>
      </section>

      {/* ── COMPUTE UNIT ───────────────────────────────────────────────── */}
      <section id="compute-unit">
        <h2 style={S.h2}>Compute Unit (CU) — AMD's Building Block</h2>
        <p style={S.p}>
          <strong>CU (Compute Unit)</strong> — yeh AMD GPU ka fundamental compute building block hai. NVIDIA ke SM (Streaming Multiprocessor) ka AMD equivalent. Jab aap sunate ho &quot;MI300X has 304 Compute Units&quot; — yeh 304 independently parallel kaam karne wali compute units hain.
        </p>
        <p style={S.p}>
          <strong>Factory analogy:</strong> Socho ek badi factory hai — AMD GPU. Factory mein 304 departments hain (CUs). Har department independently apna kaam karta hai. Sab simultaneously. Department manager (Scheduler) decide karta hai kaun kab kya kare.
        </p>
        <Figure caption="GPU Compute Unit (CU) — AMD's Main Processing Block: 4 groups of 32 Parallel Math Units (SIMD32) handle regular calculations. AI Math Engine (Matrix Core hardware) does dedicated matrix multiply for AI. Fast Shared Memory (Local Data Share, 64KB) is the team whiteboard. Task Scheduler (Wavefront Scheduler) decides what 64-thread group runs next. Private Working Memory (Vector Registers, 256KB) stores each thread's data. Automatic Fast Buffer (L1 Cache, 16KB) speeds up repeat access.">
          <ComputeUnitDiagram />
        </Figure>
        <p style={S.p}><strong>What is inside a single CU (CDNA 3 reference):</strong></p>
        <ul style={S.ul}>
          <li><strong>4 SIMD32 units</strong> — har ek mein 32 Stream Processors = 128 Stream Processors per CU total</li>
          <li><strong>Dedicated Matrix Core hardware</strong> — integrated inside each CU for matrix operations (AI math engine)</li>
          <li><strong>64 KB LDS (Local Data Share)</strong> — shared memory equivalent (programmer-managed fast memory, "team whiteboard")</li>
          <li><strong>Scalar ALU</strong> — control flow, address calculations</li>
          <li><strong>L1 Cache</strong> — automatic hardware-managed cache, 16 KB per CU</li>
          <li><strong>Wavefront Scheduler</strong> — decides which wavefront executes ("task scheduler — chooses what runs next")</li>
          <li><strong>Vector Registers</strong> — 256 KB per CU — thread-private fast storage ("private working memory")</li>
        </ul>
      </section>

      {/* ── STREAM PROCESSORS ──────────────────────────────────────────── */}
      <section id="stream-processors">
        <h2 style={S.h2}>Stream Processors — The Compute Workers</h2>
        <p style={S.p}>
          <strong>Stream Processors (SPs)</strong> — AMD ka CUDA Core equivalent. Yeh individual floating-point arithmetic units hain. Ek Stream Processor ek clock cycle mein ek FP32 operation karta hai.
        </p>
        <p style={S.p}>
          <strong>Critical distinction — same as NVIDIA:</strong> Stream Processor ek &quot;CPU core&quot; nahi hai. CPU core ke paas apna instruction decoder, branch predictor, out-of-order execution hota hai. SP sirf ek basic ALU (Arithmetic Logic Unit — Math Unit) hai — math karta hai, wavefront ke saath kaam karta hai, independent nahi.
        </p>
        <ul style={S.ul}>
          <li><strong>What Stream Processors do in AI:</strong> Element-wise operations (activation functions — ReLU, GELU, sigmoid), normalization operations (layer norm, batch norm per element), scale and add operations, data type conversions.</li>
          <li><strong>What they don&apos;t primarily do:</strong> Matrix multiplication — dedicated Matrix Core hardware ka kaam hai.</li>
          <li><strong>Think of it this way:</strong> Stream Processors = general workers. Matrix Cores = AI specialists. Neural network forward pass: Matrix Cores do heavy matrix multiply (90% compute), Stream Processors do activation function after each layer (10% compute). Both necessary.</li>
          <li><strong>MI300X count:</strong> 304 CUs × 128 Stream Processors per CU = 19,456 Stream Processors total.</li>
        </ul>
        <Callout type="important" title="Performance Numbers — Important Note">
          Peak AI throughput is measured differently by AMD and NVIDIA. Direct TFLOPS comparison alone should not be used for performance evaluation. Always benchmark your specific workload on target hardware.
        </Callout>
      </section>

      {/* ── WAVEFRONT ──────────────────────────────────────────────────── */}
      <section id="wavefront">
        <h2 style={S.h2}>Wavefront — AMD's Warp Equivalent</h2>
        <p style={S.p}>
          <strong>Wavefront</strong> — NVIDIA ke warp ka AMD equivalent. Ek wavefront 64 work items (threads) ka group hai. CDNA mein yeh 64 items hain — NVIDIA warp ke 32 threads se 2× wider.
        </p>
        <Figure caption="AMD Wavefront vs NVIDIA Warp: Both concepts are identical — lockstep parallel execution of multiple threads. NVIDIA Warp has 32 threads. AMD Wavefront has 64 work items (twice as wide). Critical for code migration: never hardcode warpSize = 32 — use the warpSize variable. On AMD it returns 64, on NVIDIA it returns 32.">
          <WavefrontVsWarp />
        </Figure>
        <p style={S.p}><strong>Same concept, different width — practical implications:</strong></p>
        <ul style={S.ul}>
          <li>Wavefront divergence: Same concept as warp divergence. Agar wavefront ke threads alag if-else paths lein — serialize hoga. 2× slowdown worst case. Same mitigation strategies.</li>
          <li><strong>Why 64 vs 32:</strong> AMD SIMD units wider hain. Theoretically more throughput per scheduling event.</li>
          <li><strong>Code migration critical point:</strong> Code jo <code style={S.code}>warpSize = 32</code> hardcode kare — AMD pe wrong. Always use <code style={S.code}>warpSize</code> macro — returns 64 on AMD, 32 on NVIDIA.</li>
          <li>Warp-level primitives (<code style={S.code}>__shfl_sync</code>, <code style={S.code}>__ballot_sync</code>) — AMD equivalents exist but behavior slightly different for 64-wide wavefront. Test carefully.</li>
        </ul>
      </section>

      {/* ── MATRIX CORES ───────────────────────────────────────────────── */}
      <section id="matrix-cores">
        <h2 style={S.h2}>Matrix Cores — The AI Math Engine</h2>
        <p style={S.p}>
          <strong>Matrix Cores</strong> — dedicated hardware integrated inside each Compute Unit that accelerates matrix multiply-accumulate operations. CDNA 1 mein introduced. NVIDIA ke Tensor Core ka AMD equivalent.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Stream Processor ek regular calculator hai — ek button dabao, ek answer. Matrix Core hardware ek specialized machine hai jo ek operation mein puri matrix multiply kar deta hai simultaneously — bahut zyada buttons ka kaam ek click mein.
        </p>
        <p style={S.p}>
          <strong>D = A × B + C:</strong> Yeh fundamental matrix multiply-accumulate operation hai. Neural network layer = this operation. Dedicated Matrix Core hardware yeh accelerate karta hai — much faster than Stream Processors doing the same work element by element.
        </p>
        <ComparisonTable
          title="Matrix Core Generations in CDNA Architecture"
          headers={["Generation", "Architecture", "Supported Formats", "Key Addition"]}
          rows={[
            ["CDNA 1", "MI100 (2020)", "FP16 matrix ops", "First dedicated matrix hardware in AMD data center GPU"],
            ["CDNA 2", "MI200 (2021)", "FP64 Matrix Cores, BF16, FP16", "FP64 Matrix Cores — why Frontier supercomputer chose AMD"],
            ["CDNA 3", "MI300X (2023)", "FP8, BF16, FP16, INT8, INT4", "FP8 + improved throughput + structured sparsity support"],
            ["CDNA 4", "MI350 (2025)", "Verify at amd.com/instinct", "FP8 improvements, better inference — specs may change"],
          ]}
        />
        <Callout type="important" title="Peak Performance Comparison — Read Carefully">
          Peak AI throughput is measured differently by AMD and NVIDIA. AMD and NVIDIA use different measurement methodologies for peak TFLOPS/TOPS numbers. Direct comparison of these numbers alone should not be used for performance evaluation. Always benchmark your specific model and workload on target hardware before making deployment decisions.
        </Callout>
      </section>

      {/* ── INFINITY CACHE ─────────────────────────────────────────────── */}
      <section id="infinity-cache">
        <h2 style={S.h2}>Infinity Cache — AMD's Cache Innovation</h2>
        <p style={S.p}>
          <strong>Infinity Cache</strong> — AMD ka unique on-chip large cache innovation. Originally gaming GPUs ke liye introduce hua (RDNA 2 mein), aur concept data center chips mein bhi exists in different form.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Socho normal memory ek warehouse hai — bahut bada storage lekin door. L1/L2 cache ek counter pe rakhei kuch items hain — fast access. Infinity Cache ek bade in-store storage room ki tarah hai — warehouse se chhota lekin counter se bahut bada, aur bahut fast.
        </p>
        <ul style={S.ul}>
          <li><strong>Gaming GPU mein (RDNA):</strong> 128 MB Infinity Cache RX 6000 series mein — gaming workloads mein 2× effective bandwidth improvement. GDDR memory ki effective bandwidth dramatically increase karta hai for repetitive access patterns.</li>
          <li><strong>Data center mein (CDNA):</strong> CDNA chips primarily HBM pe rely karte hain — jo already very high bandwidth hai. Infinity Cache ka same role nahi hai. Lekin large on-chip cache concepts persist in L3 cache form across CDNA architecture.</li>
          <li><strong>AI relevance:</strong> Large on-chip caches reduce HBM pressure for repeated access patterns. Model layers jo frequently accessed hain — higher level cache mein fit hone se HBM bandwidth free hoti hai for new data.</li>
        </ul>
      </section>

      {/* ── HBM AMD ────────────────────────────────────────────────────── */}
      <section id="hbm-amd">
        <h2 style={S.h2}>HBM Memory in AMD Context</h2>
        <p style={S.p}>
          <strong>HBM (High Bandwidth Memory)</strong> — AMD aur NVIDIA dono same HBM technology use karte hain (same vendors: SK Hynix, Micron, Samsung). Lekin AMD ne capacity pe different bets lagayi hain.
        </p>
        <Figure caption="Memory Comparison: NVIDIA H100 has 80GB HBM3 at 3.35 TB/s — a 70B LLaMA model at FP16 (140GB) does not fit on one card, needs 2 cards. AMD MI300X has 192GB HBM3 at 5.3 TB/s — same 70B model fits with 52GB spare for KV cache on ONE card. Important: peak AI throughput is measured differently by AMD and NVIDIA — memory capacity alone does not determine overall performance.">
          <MemoryComparisonDiagram />
        </Figure>
        <ComparisonTable
          title="HBM Strategy Comparison"
          headers={["GPU", "HBM Type", "Capacity", "Bandwidth", "70B Model (FP16 = 140GB)"]}
          rows={[
            ["NVIDIA H100 SXM5", "HBM3", "80 GB", "3.35 TB/s", "Does NOT fit — needs 2 cards"],
            ["NVIDIA H200", "HBM3e", "141 GB", "4.8 TB/s", "Fits with 1 GB spare"],
            ["AMD MI300X", "HBM3", "192 GB", "5.3 TB/s", "Fits with 52 GB spare for KV cache"],
            ["AMD MI350", "Higher (verify)", "Verify at amd.com", "Verify at amd.com", "Likely fits larger models"],
          ]}
        />
        <Callout type="warning" title="MI350 Memory Specifications">
          Specifications may change. Verify current specifications from AMD official documentation before procurement.
        </Callout>
        <ul style={S.ul}>
          <li><strong>AMD ka HBM strategy:</strong> AMD ka thesis — memory capacity AI inference ke liye increasingly critical constraint hai. Agar ek card pe poora large model fit ho jaaye — simpler deployment, no inter-card communication overhead, lower latency.</li>
          <li><strong>Memory bandwidth:</strong> MI300X 5.3 TB/s vs H100 3.35 TB/s — 58% more bandwidth. LLM inference mein memory-bandwidth-bound workloads pe AMD compelling advantage.</li>
          <li><strong>ECC support:</strong> MI300X mein ECC (Error Correcting Code) memory hai — same enterprise reliability requirement. Single-bit errors auto-correct. Double-bit errors detected.</li>
        </ul>
      </section>

      {/* ── INFINITY FABRIC ────────────────────────────────────────────── */}
      <section id="infinity-fabric">
        <h2 style={S.h2}>Infinity Fabric — AMD's Interconnect</h2>
        <p style={S.p}>
          <strong>Infinity Fabric</strong> — AMD ka proprietary internal chip interconnect technology. Yeh AMD ke sab chips ka internal connection system hai — chip ke andar dies ko ek dusre se aur memory controllers se connect karta hai. Infinity Fabric NVLink ka equivalent nahi hai — yeh ek internal chip-level interconnect hai, external GPU-to-GPU link nahi.
        </p>
        <p style={S.p}>
          <strong>xGMI (external Global Memory Interface)</strong> — yeh Infinity Fabric ka external variant hai jo GPU cards ke beech communication ke liye use hota hai. Do alag cheezein hain: Infinity Fabric = internal chip connections, xGMI = external inter-card connections.
        </p>
        <Figure caption="AMD Interconnect Architecture: Inside the MI300X, Infinity Fabric (High-Speed Internal Chip Connection) links all Compute Modules (XCDs) to the Base Controller Chip (AID) and Ultra-Fast Memory (HBM3). For external GPU-to-GPU connections between cards, xGMI (external Global Memory Interface) is used. For large multi-server clusters, standard InfiniBand network is required — AMD does not have a dedicated GPU switch chip equivalent to NVIDIA NVSwitch.">
          <InfinityFabricDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Infinity Fabric inside MI300X:</strong> 8 XCD dies aur 1 AID die ke beech ultra-high bandwidth connections. Die-to-die bandwidth: hundreds of GB/s. All XCDs AID ke through memory controllers access karte hain.</li>
          <li><strong>xGMI for external GPU communication:</strong> Multiple MI300X cards server mein — xGMI links via server topology. AMD ke paas NVSwitch jaisa dedicated switch chip nahi hai. xGMI bandwidth NVLink 4.0 se kam hai for raw any-to-any connectivity.</li>
          <li><strong>Multi-GPU connectivity gap:</strong> AMD clusters rely karte hain InfiniBand ya RoCE Ethernet for inter-GPU communication — same as NVIDIA for inter-node. Intra-node: AMD less optimized than NVSwitch-equipped DGX clusters. Yeh AMD ka current gap hai for large-scale distributed training.</li>
        </ul>
      </section>

      {/* ── MEMORY CONTROLLERS ─────────────────────────────────────────── */}
      <section id="memory-controllers">
        <h2 style={S.h2}>Memory Controllers</h2>
        <p style={S.p}>
          <strong>Memory Controllers</strong> — dedicated hardware units jo HBM access manage karte hain. MI300X mein 6 HBM3 stacks hain, har stack ke liye dedicated memory controller (AID die mein).
        </p>
        <p style={S.p}>
          Memory controllers SM/CU requests queue karte hain, burst transfers optimize karte hain, aur multiple CUs ke simultaneous requests handle karte hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Unified Memory in MI300A:</strong> MI300A (APU variant) mein CPU aur GPU same HBM memory share karte hain — ek unified memory pool. Memory controller sab access manage karta hai. CPU pointer aur GPU pointer same address space mein — no explicit data copies needed.</li>
          <li><strong>ECC:</strong> MI300X pe ECC default ON. Production AI deployments ke liye mandatory. Single-bit errors auto-correct. Double-bit errors: detect karta hai, job may crash. Monitor via <code style={S.code}>rocm-smi --showmeminfo</code>.</li>
        </ul>
      </section>

      {/* ── CHIPLET ARCHITECTURE ───────────────────────────────────────── */}
      <section id="chiplet-architecture">
        <h2 style={S.h2}>Chiplet Architecture</h2>
        <p style={S.p}>
          <strong>Chiplet</strong> — ek chhota chip jo ek specific function perform karta hai. Ek &quot;chiplet-based design&quot; mein multiple chiplets ek package mein combine hote hain, interconnect se linked.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Traditional monolithic chip ek hi badi building mein sab offices. Agar ek office mein koi problem hai (manufacturing defect) — poori building useless. Chiplet approach: alag-alag chhoti buildings (chiplets), ek campus pe connected. Agar ek building mein problem hai — sirf woh replace karo. Baaki campus chalti rehti hai.
        </p>
        <Figure caption="MI300X Chiplet Architecture (3D stacked): Bottom layer = Silicon Interposer (the connection platform). Middle layer = AID (Base Controller Chip with memory controllers, PCIe, inter-die switching). Top layer = 8 GPU Compute Modules (XCDs, 38 Compute Units each). Sides = 4 stacks of Ultra-Fast Memory (HBM3, 48GB each = 192GB total at 5.3 TB/s). All connected by high-density wiring through the interposer.">
          <Mi300xChipletDiagram />
        </Figure>
        <p style={S.p}><strong>MI300X chiplet layout:</strong></p>
        <ul style={S.ul}>
          <li><strong>Silicon Interposer (bottom):</strong> Passive substrate jo sab chiplets ko physically connect karta hai with high-density interconnect wiring — like a very dense printed circuit board.</li>
          <li><strong>AID (Active Interposer Die, middle):</strong> Base controller chip. Memory controllers, PCIe interface, inter-die switching sab yahan. Traffic controller ki tarah.</li>
          <li><strong>8 XCDs (top layer):</strong> Accelerator Complex Dies — yeh actual GPU compute chiplets hain. Har XCD mein 38 active CUs, L1/L2 cache, local compute.</li>
          <li><strong>4 HBM3 stacks (sides):</strong> Ultra-Fast Memory. 48 GB each = 192 GB total. High-density interconnect through interposer.</li>
        </ul>
        <p style={S.p}><strong>Why chiplets for AI chips:</strong></p>
        <ul style={S.ul}>
          <li><strong>Yield improvement:</strong> Ek 192 GB monolithic chip banana mushkil hai — agar ek corner mein defect hai, poori chip waste. 8 small XCDs alag banao — higher yield per chiplet.</li>
          <li><strong>Heterogeneous integration:</strong> Different dies different process nodes pe. Compute dies (XCDs) advanced node pe for maximum performance. AID older cheaper node pe. HBM 3D stacked.</li>
          <li><strong>Memory capacity breakthrough:</strong> 192 GB HBM3 monolithic approach se achieve karna practically impossible tha.</li>
          <li><strong>NUMA-like challenge:</strong> Die boundary crossing latency exists. Careful workload placement aur memory distribution needed for peak performance.</li>
        </ul>
      </section>

      {/* ── MI SERIES ──────────────────────────────────────────────────── */}
      <section id="mi-series">
        <h2 style={S.h2}>MI Series — Product Line Overview</h2>
        <Figure caption="AMD Instinct MI Series: MI100 (2020, CDNA 1, 32GB, first compute-only AMD chip). MI200 family (2021, CDNA 2, 128GB, dual-die, FP64 Matrix Cores — used in Frontier supercomputer). MI300 family (2023, CDNA 3): MI300A (CPU+GPU+128GB unified for HPC scientific), MI300X (192GB HBM3, current AI flagship). MI350 (2025, CDNA 4, verify specs at amd.com/instinct before procurement).">
          <MiSeriesTimeline />
        </Figure>

        <p style={S.p}><strong>MI100 (CDNA 1, 2020):</strong> Target: Scientific computing, initial AI training. Key specs: 120 CUs, 7,680 Stream Processors, 32 GB HBM2, 1.23 TB/s bandwidth, 300W, PCIe 4.0. Significance: AMD ka pehla dedicated AI accelerator. First to prove CDNA concept. Limitation: 32 GB HBM2 small for large models. ROCm ecosystem immature.</p>

        <p style={S.p}><strong>MI250X (CDNA 2, 2021):</strong> 220 CUs (110 per die × 2 dies), 14,080 Stream Processors, 128 GB HBM2e, 3.2 TB/s, 500W TDP. FP64 dedicated Matrix Cores — first time. Used in Frontier supercomputer at Oak Ridge. Scientific computing mein MI250X clearly won on FP64 performance.</p>

        <p style={S.p}><strong>MI300X (CDNA 3, 2023) — Current Flagship:</strong> 304 CUs (38 × 8 XCDs), 19,456 Stream Processors, 192 GB HBM3, 5.3 TB/s bandwidth, 750W TDP, PCIe 5.0 x16. Who is using: Microsoft Azure (ND MI300X v5), Oracle OCI, Meta (reported), various AI companies for inference.</p>

        <p style={S.p}><strong>MI300A (CDNA 3, 2023) — APU Variant:</strong> 24 EPYC CPU cores (Zen 4) + 228 GPU CUs + 128 GB HBM3 unified memory. CPU aur GPU same memory share karte hain. Target: HPC scientific computing. Grace-Blackwell ka AMD answer.</p>

        <Callout type="warning" title="MI350 — Verify Before Procurement">
          MI350 series (CDNA 4) announced hai lekin specifications may change. Verify current specifications, availability, and pricing from AMD official documentation at amd.com/instinct before any procurement decision.
        </Callout>
      </section>

      {/* ── INSTINCT ACCELERATORS ──────────────────────────────────────── */}
      <section id="instinct-accelerators">
        <h2 style={S.h2}>Instinct Accelerators — Complete Family</h2>
        <p style={S.p}>
          AMD &quot;Instinct&quot; brand name hai specifically data center AI/HPC accelerators ke liye. Consumer Radeon (gaming) se completely separate product line.
        </p>
        <ComparisonTable
          title="AMD Instinct Product Family — Data Center Only"
          headers={["Product", "Architecture", "Memory", "TDP", "Primary Use"]}
          rows={[
            ["MI60 / MI50 (pre-CDNA)", "GCN-based", "32 GB HBM2", "250W", "Early HPC, now retired"],
            ["MI100", "CDNA 1 (2020)", "32 GB HBM2", "300W", "First compute-only, scientific"],
            ["MI210", "CDNA 2 (2021)", "64 GB HBM2e", "300W", "Entry HPC/AI"],
            ["MI250", "CDNA 2 (2021)", "128 GB HBM2e", "500W", "HPC + AI training"],
            ["MI250X", "CDNA 2 (2021)", "128 GB HBM2e", "500W", "Flagship HPC (Frontier)"],
            ["MI300A", "CDNA 3 (2023)", "128 GB HBM3 (shared CPU+GPU)", "760W", "Scientific HPC, unified memory"],
            ["MI300X", "CDNA 3 (2023)", "192 GB HBM3", "750W", "AI inference + training (flagship)"],
            ["MI350 (verify)", "CDNA 4 (2025)", "Verify amd.com", "Verify", "FP8 inference focus"],
          ]}
        />
        <p style={S.p}><strong>Form factors:</strong></p>
        <ul style={S.ul}>
          <li><strong>OAM (Open Accelerator Module):</strong> High-power server form factor. AMD ka NVLink SXM equivalent. HPE Cray EX234a, Supermicro servers support OAM format. Highest performance.</li>
          <li><strong>PCIe form factor:</strong> Standard PCIe servers mein. Lower power, lower performance vs OAM equivalent. More flexible deployment.</li>
        </ul>
      </section>

      {/* ── ROCM ECOSYSTEM ─────────────────────────────────────────────── */}
      <section id="rocm-ecosystem">
        <h2 style={S.h2}>ROCm Ecosystem — AMD's CUDA Alternative</h2>
        <p style={S.p}>
          <strong>ROCm (Radeon Open Compute platform)</strong> — yeh AMD ka open-source GPU computing platform hai. CUDA ka AMD equivalent — lekin important differences hain.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> CUDA ek proprietary highway system hai — NVIDIA ka. Every driver learns NVIDIA&apos;s roads. Infrastructure best in class. AMD wali side pe: ROCm ek open-standard highway system hai jo build ho rahi hai. Roads mostly ready hain, signs kaafi hain lekin kuch remote exits still missing. Improving every month.
        </p>
        <Figure caption="ROCm Software Stack: AMD GPU Hardware at bottom. ROCm Driver + Runtime translates software commands to GPU hardware. Core Libraries (hipBLAS for math, MIOpen for AI ops, RCCL for multi-GPU, hipFFT for signal). Framework Layer — PyTorch uses torch.cuda API for compatibility while ROCm provides the backend implementation. AI Application Libraries (vLLM, DeepSpeed, Hugging Face). Your Application at top. All open-source.">
          <RocmSoftwareStack />
        </Figure>
        <ComparisonTable
          title="ROCm Component Libraries"
          headers={["ROCm Library", "NVIDIA Equivalent", "Purpose"]}
          rows={[
            ["HIP Runtime", "CUDA Runtime", "GPU execution API"],
            ["hipBLAS", "cuBLAS", "Dense linear algebra — matrix multiply"],
            ["MIOpen", "cuDNN", "Deep learning primitives — convolutions, attention"],
            ["RCCL", "NCCL", "Multi-GPU collective communication"],
            ["hipFFT", "cuFFT", "Fast Fourier Transform"],
            ["hipRand", "cuRand", "Random number generation"],
            ["rocProfiler", "Nsight Systems", "Performance profiling"],
            ["rocm-smi", "nvidia-smi", "GPU monitoring tool"],
          ]}
        />
        <p style={S.p}><strong>Framework support status (as of 2024):</strong></p>
        <ul style={S.ul}>
          <li><strong>PyTorch:</strong> Official ROCm support. Most standard operations work. PyTorch uses torch.cuda API for compatibility while ROCm provides the backend implementation. Custom CUDA extensions need HIP conversion.</li>
          <li><strong>TensorFlow:</strong> ROCm support available. Slightly less maintained than PyTorch path.</li>
          <li><strong>JAX:</strong> ROCm support via XLA, less mature than CUDA path.</li>
          <li><strong>Hugging Face Transformers:</strong> Most models work on ROCm with PyTorch backend.</li>
        </ul>
        <Callout type="warning" title="Honest ROCm Assessment">
          Works well: Standard PyTorch training on standard architectures (BERT, GPT, LLaMA fine-tuning), MIOpen-accelerated operations, basic distributed training. Challenging: Custom CUDA kernels (need HIP rewrite), cutting-edge research code, FlashAttention latest versions (AMD port lags), inference optimizers (no TensorRT equivalent). Improving monthly — AMD heavy investment kar raha hai ROCm mein.
        </Callout>
      </section>

      {/* ── HIP PROGRAMMING ────────────────────────────────────────────── */}
      <section id="hip-programming">
        <h2 style={S.h2}>HIP Programming Model</h2>
        <p style={S.p}>
          <strong>HIP (Heterogeneous-compute Interface for Portability)</strong> — AMD ka answer to CUDA programming. HIP code AMD GPU pe run karta hai natively, aur NVIDIA GPU pe bhi compile ho sakta hai (via CUDA backend). &quot;Write once, run on both&quot; theory.
        </p>
        <p style={S.p}>
          <strong>Syntax almost identical to CUDA:</strong>
        </p>
        <ul style={S.ul}>
          <li><code style={S.code}>cudaMalloc()</code> → <code style={S.code}>hipMalloc()</code></li>
          <li><code style={S.code}>cudaMemcpy()</code> → <code style={S.code}>hipMemcpy()</code></li>
          <li><code style={S.code}>__global__</code> kernel functions → same in HIP</li>
          <li><code style={S.code}>cudaStream_t</code> → <code style={S.code}>hipStream_t</code></li>
        </ul>
        <p style={S.p}>
          <strong>hipify-perl migration tool:</strong> Automatic CUDA-to-HIP conversion. Most standard CUDA code: 90%+ automated conversion. CUDA-specific intrinsics: manual conversion needed. Run: <code style={S.code}>hipify-perl --inplace source_file.cu</code>
        </p>
        <p style={S.p}>
          <strong>Critical wavefront width difference:</strong> AMD wavefront = 64 work items. Code jo <code style={S.code}>warpSize</code> hardcode kare as 32 — AMD pe wrong. Always use <code style={S.code}>warpSize</code> macro.
        </p>
        <ComparisonTable
          title="CUDA vs HIP Migration Guide"
          headers={["Scenario", "Works on AMD", "Notes"]}
          rows={[
            ["Standard matrix ops, memory mgmt", "Yes — automatic via hipify", "hipMalloc, hipMemcpy, etc."],
            ["Kernel launches (<<<...>>>)", "Yes", "Same syntax"],
            ["Standard library calls (cuBLAS)", "Yes — use hipBLAS equivalent", "Function name changes"],
            ["Warp-level primitives (__shfl_sync)", "Partial — need testing", "Wavefront width difference (64 vs 32)"],
            ["Custom CUDA kernels (.cu files)", "Need HIP conversion", "hipify-perl automates most"],
            ["Custom PTX (NVIDIA assembly)", "No — full rewrite needed", "No HIP equivalent"],
            ["CUDA-specific hardware features", "No direct equivalent", "TMA, Transformer Engine etc."],
          ]}
        />
      </section>

      {/* ── RCCL ───────────────────────────────────────────────────────── */}
      <section id="rccl">
        <h2 style={S.h2}>RCCL — AMD's Collective Communications</h2>
        <p style={S.p}>
          <strong>RCCL (ROCm Collective Communications Library)</strong> — NVIDIA NCCL ka AMD equivalent. Distributed GPU training ke liye AllReduce, AllGather, Broadcast, ReduceScatter operations.
        </p>
        <p style={S.p}><strong>RCCL operations:</strong></p>
        <ul style={S.ul}>
          <li><strong>AllReduce:</strong> Sab GPUs ke gradients average karo, result sab ko do. Gradient synchronization ke liye main operation.</li>
          <li><strong>AllGather:</strong> Har GPU apna tensor share kare, sab ko full concatenated tensor mile.</li>
          <li><strong>ReduceScatter:</strong> AllReduce ko 2 phases mein (ZeRO/FSDP ke liye).</li>
          <li><strong>Broadcast:</strong> Ek GPU se sab ko same data.</li>
        </ul>
        <p style={S.p}>
          <strong>PyTorch integration:</strong> PyTorch distributed training mein <code style={S.code}>dist.init_process_group(backend=&quot;nccl&quot;)</code> likhne pe — PyTorch automatically maps this to RCCL on AMD systems. Alag code likhne ki zaroorat nahi.
        </p>
        <Callout type="best-practice" title="RCCL Maturity Note">
          RCCL standard operations ke liye mature hai. Debugging less tools available vs NCCL. Multi-node distributed training pe thoroughly test karo before production. NCCL_DEBUG=INFO environment variable RCCL pe bhi kaam karta hai for debugging.
        </Callout>
      </section>

      {/* ── AMD SOFTWARE STACK ─────────────────────────────────────────── */}
      <section id="amd-software-stack">
        <h2 style={S.h2}>AMD AI Software Stack</h2>
        <p style={S.p}>
          Ek complete view of what you need to run AI on AMD:
        </p>
        <ul style={S.ul}>
          <li><strong>Layer 1 — Hardware:</strong> AMD Instinct MI300X accelerator, AMD EPYC CPU server, InfiniBand or RoCE networking</li>
          <li><strong>Layer 2 — Driver aur Runtime:</strong> AMD GPU PRO driver (production), amdkfd kernel driver, ROCm runtime (hipRuntime)</li>
          <li><strong>Layer 3 — Low-level Libraries:</strong> hipBLAS (matrix math), MIOpen (deep learning primitives), hipFFT, RCCL (collective communications)</li>
          <li><strong>Layer 4 — Framework:</strong> PyTorch + ROCm backend (torch.cuda API, ROCm provides implementation), TensorFlow + ROCm, JAX (partial)</li>
          <li><strong>Layer 5 — Application:</strong> Your training/inference code, Hugging Face Transformers, DeepSpeed (ROCm support), vLLM (ROCm support growing)</li>
        </ul>
        <p style={S.p}><strong>Key tools:</strong></p>
        <ul style={S.ul}>
          <li><code style={S.code}>rocm-smi</code>: nvidia-smi ka AMD equivalent — GPU utilization, temperature, memory, power monitoring</li>
          <li><code style={S.code}>rocProfiler</code>: Performance profiling — kernel timing, memory bandwidth analysis</li>
          <li><code style={S.code}>rocgdb</code>: GPU debugging</li>
          <li><code style={S.code}>hipify-perl</code>: CUDA-to-HIP code migration tool</li>
        </ul>
        <p style={S.p}><strong>Container support:</strong> AMD official Docker images — <code style={S.code}>rocm/pytorch</code>, <code style={S.code}>rocm/tensorflow</code>. Production recommendation: use AMD official containers — driver compatibility managed, libraries pre-validated. Self-building ROCm stack complex.</p>
      </section>

      {/* ── TRAINING WORKFLOW ──────────────────────────────────────────── */}
      <section id="training-workflow">
        <h2 style={S.h2}>Training Workflow on AMD</h2>
        <Figure caption="AMD AI Training Flow (8 steps): Storage to Data Loader to GPU HBM3 Memory (192GB), Forward Pass on Matrix Core hardware (layer by layer), Loss Calculation, Backward Pass (error signal computation), RCCL AllReduce (PyTorch maps backend='nccl' to RCCL on AMD systems — all GPUs sync gradients), Optimizer Weight Update. Loop repeats until model converges.">
          <AmdTrainingFlow />
        </Figure>
        <p style={S.p}><strong>Environment setup:</strong></p>
        <ul style={S.ul}>
          <li>Check GPU: <code style={S.code}>rocm-smi --showgpu</code></li>
          <li>Install PyTorch ROCm: <code style={S.code}>pip install torch torchvision --index-url https://download.pytorch.org/whl/rocm6.0</code></li>
          <li>Verify: <code style={S.code}>python -c &quot;import torch; print(torch.cuda.is_available())&quot;</code> — True on ROCm</li>
          <li>Note: <code style={S.code}>torch.cuda</code> API works — PyTorch uses torch.cuda API for compatibility while ROCm provides the backend implementation</li>
        </ul>
        <p style={S.p}><strong>Distributed training setup:</strong></p>
        <ul style={S.ul}>
          <li>Single node 8 GPUs: <code style={S.code}>torchrun --nproc_per_node=8 train.py</code></li>
          <li>Backend setting: <code style={S.code}>dist.init_process_group(backend=&quot;nccl&quot;)</code> — PyTorch automatically maps this to RCCL on AMD systems</li>
        </ul>
        <p style={S.p}><strong>Memory management advantage:</strong> MI300X ke 192 GB available hain. Batch sizes larger possible. Gradient checkpointing less often needed. ZeRO optimizer still useful for very large models.</p>
        <p style={S.p}><strong>Common training bottlenecks on AMD:</strong></p>
        <ul style={S.ul}>
          <li>Custom CUDA extensions: If training code uses custom CUDA kernels — biggest blocker. Needs HIP conversion.</li>
          <li>torch.compile() on AMD ROCm: Works but may be slower first compile vs NVIDIA.</li>
          <li>MIOpen kernel cache cold: First run always slow — warmup needed. Subsequent runs fast (cached).</li>
        </ul>
      </section>

      {/* ── INFERENCE WORKFLOW ─────────────────────────────────────────── */}
      <section id="inference-workflow">
        <h2 style={S.h2}>Inference Workflow on AMD</h2>
        <p style={S.p}>
          <strong>LLM inference on MI300X — the sweet spot:</strong> MI300X ka 192 GB HBM3 large model inference ke liye specifically compelling hai. 70B LLaMA model single MI300X pe serve karo — no model parallelism needed.
        </p>
        <ul style={S.ul}>
          <li><strong>vLLM on AMD:</strong> ROCm compatible version available. Large LLaMA-70B model single MI300X pe serve karo. Same vLLM API, ROCm backend.</li>
          <li><strong>Quantization:</strong> INT8 quantization through bitsandbytes (ROCm support growing). FP8 quantization: AMD CDNA 3 hardware support hai lekin software tooling less mature than NVIDIA&apos;s Transformer Engine.</li>
          <li><strong>ONNX Runtime:</strong> ROCm execution provider available. Standard vision/NLP models inference.</li>
        </ul>
        <p style={S.p}><strong>What AMD lacks for inference vs NVIDIA:</strong></p>
        <ul style={S.ul}>
          <li><strong>TensorRT equivalent:</strong> AMD ke paas comparable production inference optimizer nahi hai yet. MIOpen kuch optimizations provide karta hai lekin comprehensive TensorRT-level tool missing.</li>
          <li><strong>Continuous batching maturity:</strong> vLLM ROCm support tha lekin less polished than NVIDIA. Improving.</li>
          <li><strong>Speculative decoding:</strong> Less testing on AMD.</li>
        </ul>
      </section>

      {/* ── AMD VS NVIDIA ──────────────────────────────────────────────── */}
      <section id="amd-vs-nvidia">
        <h2 style={S.h2}>AMD vs NVIDIA — Technical Comparison</h2>
        <p style={S.p}>
          Yeh comparison honest hai — marketing nahi. Actual technical strengths aur weaknesses.
        </p>
        <Callout type="important" title="Performance Numbers — Important Caveat">
          Peak AI throughput is measured differently by AMD and NVIDIA. Direct TFLOPS/TOPS comparison alone should not be used for performance evaluation. Actual performance depends on workload type, software optimization, compiler efficiency, and many other factors. Always benchmark your specific model before making deployment decisions.
        </Callout>
        <Figure caption="AMD vs NVIDIA Strengths: AMD leads on memory capacity (192GB vs 80GB), memory bandwidth (5.3 vs 3.35 TB/s), single-card large LLM inference, and FP64 scientific computing. NVIDIA leads on software ecosystem (CUDA dominance), multi-GPU scale-out (NVSwitch + NVLink), large cluster training, and inference optimization tools. Choose based on your specific workload — neither is universally better.">
          <AmdVsNvidiaStrengths />
        </Figure>
        <ComparisonTable
          title="AMD MI300X vs NVIDIA H100 — Technical Comparison"
          headers={["Category", "AMD MI300X", "NVIDIA H100 SXM5", "Note"]}
          rows={[
            ["HBM Capacity", "192 GB HBM3", "80 GB HBM3", "AMD 2.4× more"],
            ["Memory Bandwidth", "5.3 TB/s", "3.35 TB/s", "AMD 1.6× more"],
            ["AI Compute (FP16)", "Varies by workload", "Varies by workload", "Measured differently — benchmark your model"],
            ["FP64 Compute", "~95 TFLOPS", "~60 TFLOPS", "AMD stronger for scientific"],
            ["Inter-GPU (intra-node)", "xGMI via server topology", "NVLink 4.0 900 GB/s", "NVIDIA faster per-link"],
            ["Multi-GPU switch", "No native switch chip", "NVSwitch — any-to-any", "NVIDIA advantage for clusters"],
            ["Software ecosystem", "ROCm (growing)", "CUDA (dominant, 18+ years)", "NVIDIA significant lead"],
            ["Custom kernel support", "HIP (migration needed)", "CUDA (mature, native)", "NVIDIA easier"],
            ["LLM inference (single card)", "Excellent (fits bigger models)", "Good (limited by memory)", "AMD advantage for 70B+"],
            ["Large cluster training", "Good (InfiniBand needed)", "Excellent (NVSwitch native)", "NVIDIA advantage"],
            ["Price (list)", "Typically lower", "Higher", "Verify current pricing"],
            ["On-premises availability", "Via OEM partners", "Direct + OEM", "Both available"],
            ["Open-source software", "Yes (ROCm fully open)", "No (CUDA proprietary)", "AMD advantage"],
          ]}
        />
        <ComparisonTable
          title="When to Choose AMD vs NVIDIA"
          headers={["Your Scenario", "Best Choice", "Key Reason"]}
          rows={[
            ["Large model inference (70B+ at FP16)", "AMD MI300X", "192 GB fits models H100 cannot"],
            ["FP64 scientific computing", "AMD MI300X", "Strong FP64 Matrix Cores (Frontier use case)"],
            ["Open-source compliance required", "AMD MI300X", "ROCm fully open-source"],
            ["Cost-sensitive deployment", "AMD MI300X", "Typically lower list price"],
            ["Standard PyTorch workloads (no custom CUDA)", "AMD MI300X viable", "ROCm handles standard ops well"],
            ["Large-scale distributed training (100+ GPUs)", "NVIDIA H100", "NVSwitch + NVLink clear advantage"],
            ["Custom CUDA kernels needed", "NVIDIA H100", "AMD requires HIP rewrite"],
            ["Cutting-edge LLM research", "NVIDIA H100", "FlashAttention latest, TensorRT, ecosystem"],
            ["Production inference optimizer needed", "NVIDIA H100", "TensorRT-LLM much more mature"],
            ["Multi-cloud / on-premises both needed", "NVIDIA H100", "GPU universally available everywhere"],
            ["Data sovereignty / on-premises only", "Both viable", "Both available via OEM servers"],
            ["PyTorch + custom CUDA extensions", "NVIDIA H100", "Extensions need HIP rewrite for AMD"],
          ]}
        />
      </section>

      {/* ── ENTERPRISE DEPLOYMENT ──────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise Deployment</h2>
        <p style={S.p}><strong>Hardware choices:</strong></p>
        <ul style={S.ul}>
          <li><strong>OAM form factor:</strong> Highest performance, highest power. HPE Cray EX234a, Supermicro servers support OAM.</li>
          <li><strong>PCIe form factor:</strong> Standard PCIe servers. Lower power, lower performance vs OAM. More flexible.</li>
        </ul>
        <p style={S.p}><strong>Cloud options:</strong></p>
        <ul style={S.ul}>
          <li><strong>Microsoft Azure:</strong> ND MI300X v5 instances — 8× MI300X per node, InfiniBand. Best AMD AI cloud option for enterprise currently.</li>
          <li><strong>Oracle OCI:</strong> BM.GPU.MI300X.8 — 8 MI300X per bare metal node.</li>
        </ul>
        <p style={S.p}><strong>Driver installation:</strong></p>
        <ul style={S.ul}>
          <li><code style={S.code}>sudo apt install amdgpu-dkms rocm</code> then <code style={S.code}>sudo reboot</code></li>
          <li>Verify: <code style={S.code}>rocm-smi</code></li>
          <li>User groups: <code style={S.code}>usermod -a -G render,video $USER</code> + logout/login</li>
        </ul>
        <p style={S.p}><strong>Container setup:</strong></p>
        <ul style={S.ul}>
          <li>Pull: <code style={S.code}>docker pull rocm/pytorch:rocm6.0_ubuntu22.04_py3.9_pytorch_2.1.1</code></li>
          <li>Run: <code style={S.code}>docker run --device=/dev/kfd --device=/dev/dri --group-add video rocm/pytorch:latest</code></li>
        </ul>
        <p style={S.p}><strong>Monitoring setup:</strong> rocm-smi Prometheus exporter available on GitHub. Grafana dashboards community-maintained. Less mature than DCGM but functional. Key metrics: GPU utilization, memory utilization, temperature, power, ECC errors.</p>
      </section>

      {/* ── RACK DESIGN ────────────────────────────────────────────────── */}
      <section id="rack-design">
        <h2 style={S.h2}>Rack Design for AMD Instinct Clusters</h2>
        <ul style={S.ul}>
          <li><strong>Standard MI300X server rack:</strong> MI300X per card: 750W. 8-GPU server: ~10-12 kW. 4 servers per rack: ~40-48 kW. Liquid cooling strongly recommended.</li>
          <li><strong>Network topology:</strong> AMD clusters primarily use InfiniBand networking — HDR (200 Gb/s) ya NDR (400 Gb/s) per port. Fat-tree topology recommended. AMD ke paas NVSwitch equivalent nahi hai — InfiniBand extra important for AMD multi-node clusters.</li>
          <li><strong>Within-server GPU connectivity:</strong> Multiple MI300X cards PCIe switch ya direct PCIe lanes through server architecture pe connected. xGMI links via server topology for intra-node GPU-to-GPU.</li>
          <li><strong>Sparing strategy:</strong> AMD ke paas DGX jaisi own server ecosystem nahi hai. OEM vendor replacement procedures follow karo. 3-5% spare MI300X cards maintain karo for field replacement.</li>
          <li><strong>Power distribution:</strong> Redundant PSU recommended. PDU per rack rated for 120%+ of peak load. Dedicated high-amperage circuits per server.</li>
          <li><strong>Floor load:</strong> AMD OAM servers heavier than standard compute — structural assessment required. Verify with OEM server specifications.</li>
        </ul>
      </section>

      {/* ── POWER AND COOLING ──────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling</h2>
        <ComparisonTable
          title="Power Requirements — AMD Instinct Planning Numbers"
          headers={["Deployment", "Per Card", "8-Card Server", "Per Rack (4 servers)", "Cooling"]}
          rows={[
            ["MI100", "300W", "~4 kW", "~16 kW", "Air sufficient"],
            ["MI250X (OAM)", "500W", "~6.5 kW", "~26 kW", "Air OK, liquid preferred"],
            ["MI300X (OAM)", "750W", "~10-12 kW", "~40-48 kW", "Liquid cooling recommended"],
            ["MI350 (estimated)", "~800-1000W (verify)", "~12-15 kW", "~50-60 kW", "Liquid cooling required"],
          ]}
        />
        <Callout type="warning" title="MI350 Power Specifications">
          MI350 power estimates are approximate. Specifications may change. Verify current specifications from AMD official documentation before planning infrastructure.
        </Callout>
        <ul style={S.ul}>
          <li><strong>Air cooling limit:</strong> ~15-20 kW per rack practically. Above this: liquid cooling territory. MI300X rack (40-48 kW) = liquid cooling strongly recommended.</li>
          <li><strong>Direct Liquid Cooling (DLC) — cold plates:</strong> Most efficient. Directly on chip surface. Required for high-density MI300X deployments. Requires chilled water loop infrastructure.</li>
          <li><strong>Rear-door heat exchangers:</strong> Retrofit-friendly. Handles up to ~30 kW per rack. Less efficient than cold plates.</li>
          <li><strong>Power monitoring:</strong> <code style={S.code}>rocm-smi --showpower</code> per card actual draw. Power capping: <code style={S.code}>rocm-smi --setpoweroverdrive 0 -p 600</code> — set to 600W from 750W if needed.</li>
          <li><strong>PUE targets:</strong> Air cooling high density: 1.5-2.0. Direct liquid cooling: 1.1-1.3. Same targets as NVIDIA GPU deployments — physics same.</li>
        </ul>
      </section>

      {/* ── DATA CENTER CONSIDERATIONS ─────────────────────────────────── */}
      <section id="dc-considerations">
        <h2 style={S.h2}>Data Center Considerations</h2>
        <ul style={S.ul}>
          <li><strong>ROCm Driver Stability:</strong> AMD ROCm drivers historically less stable than NVIDIA on certain OS versions. Always test new ROCm versions on staging before production rollout. Kernel version compatibility important. amd.com/support pe compatibility matrix check karo.</li>
          <li><strong>Vendor Support:</strong> NVIDIA direct enterprise support strong aur global. AMD enterprise AI support improving but thinner. OEM server vendor (HPE, Dell) through which AMD purchased — good support path. Factor into deployment planning.</li>
          <li><strong>Software Validation:</strong> Run your specific model/framework stack end-to-end on AMD before committing. Don&apos;t assume NVIDIA performance equals AMD performance for same code without testing. Profile with rocProfiler to identify AMD-specific bottlenecks.</li>
          <li><strong>Mixed AMD-NVIDIA Environments:</strong> Some enterprises trying AMD for inference (memory advantage) and NVIDIA for training (ecosystem). Mixed clusters complex to manage — different drivers, different monitoring, different tooling. Consider whether complexity is worth it for your organization.</li>
          <li><strong>Open-Source Advantage:</strong> ROCm fully open-source (GitHub: RadeonOpenCompute). Enterprise can contribute, fork, inspect. For organizations with open-source requirements (government, research), AMD&apos;s approach a genuine advantage.</li>
        </ul>
      </section>

      {/* ── BEST PRACTICES ─────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Use official AMD containers:</strong> <code style={S.code}>rocm/pytorch</code> Docker images — pre-validated, save setup time. Custom ROCm builds complex and error-prone.</li>
          <li><strong>Check ROCm compatibility first:</strong> Before major framework upgrade, check rocm.docs.amd.com supported matrix. Not all framework versions work on all ROCm versions.</li>
          <li><strong>BF16 training:</strong> Same as NVIDIA — switch from FP32. <code style={S.code}>torch.cuda.amp.autocast()</code> works on AMD ROCm via torch.cuda API.</li>
          <li><strong>Wavefront size awareness:</strong> Search for <code style={S.code}>warpSize = 32</code> hardcodes in codebase before AMD migration. AMD wavefront = 64 — this will break if hardcoded.</li>
          <li><strong>Large batch sizes on MI300X:</strong> 192 GB available — utilize the memory advantage. Larger batches = better GPU utilization. Gradient accumulation less necessary than on H100.</li>
          <li><strong>RCCL for distributed:</strong> <code style={S.code}>dist.init_process_group(&quot;nccl&quot;)</code> — PyTorch automatically maps to RCCL on AMD. Test AllReduce performance specifically before production.</li>
          <li><strong>Profile before optimizing:</strong> <code style={S.code}>rocProfiler</code> use karo — identify actual bottlenecks. AMD performance characteristics differ from NVIDIA — don&apos;t assume same optimization applies.</li>
          <li><strong>Leverage memory capacity for inference:</strong> Load larger models without quantization for better quality. Fit models that H100 cannot on single card.</li>
          <li><strong>MIOpen kernel cache warmup:</strong> First run always slow (compilation). Run dummy batch at start before timing. <code style={S.code}>MIOPEN_FIND_ENFORCE=3</code> forces aggressive caching.</li>
        </ul>
      </section>

      {/* ── COMMON MISTAKES ────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Assuming CUDA code runs unchanged on ROCm:</strong> Most standard PyTorch works. Custom CUDA extensions (.cu files): won&apos;t work — need HIP conversion. Check codebase for .cu files, CUDA-specific library calls before migration planning.</li>
          <li><strong>Wavefront size hardcoded as 32:</strong> AMD wavefront = 64 — <code style={S.code}>#define WARP_SIZE 32</code> is wrong. Use <code style={S.code}>warpSize</code> macro. Common in research code from NVIDIA-focused researchers.</li>
          <li><strong>Wrong Docker image:</strong> CPU-only PyTorch in AMD container = GPU not used. Verify: <code style={S.code}>python -c &quot;import torch; print(torch.version.hip)&quot;</code> — should show ROCm version.</li>
          <li><strong>Not testing at cluster scale before production:</strong> Single GPU works fine. 8-GPU RCCL issues possible. 16-node cluster: networking edge cases. Always test end-to-end before committing.</li>
          <li><strong>Auto-upgrading ROCm in production:</strong> ROCm major versions have breaking changes. Container images version-pin karo. Test upgrade on staging with your specific workload first.</li>
          <li><strong>Ignoring thermal management:</strong> MI300X 750W TDP — same as H100 roughly. Don&apos;t assume standard air-cooled rack handles MI300X properly. Check OEM thermal specifications.</li>
          <li><strong>Expecting equivalent performance for all workloads:</strong> &quot;MI300X has 5.3 TB/s bandwidth so it must be faster&quot; — only if workload is memory-bandwidth-bound. Compute-bound workloads: NVIDIA software optimizations often ahead. Benchmark your specific model.</li>
          <li><strong>Treating torch.cuda as CUDA-specific:</strong> On AMD ROCm, PyTorch uses torch.cuda API for compatibility while ROCm provides the backend — <code style={S.code}>torch.cuda.is_available()</code> returns True on AMD. This is by design, not an error.</li>
        </ul>
      </section>

      {/* ── TROUBLESHOOTING ────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          headers={["Problem", "Diagnostic", "Solution"]}
          rows={[
            ["rocm-smi not showing GPUs", "lspci | grep -i amd; dmesg | grep amdgpu", "Check amdgpu driver: modprobe amdgpu. User permissions: usermod -a -G render,video $USER + logout."],
            ["PyTorch not using AMD GPU", "python -c 'import torch; print(torch.cuda.is_available())'", "Wrong PyTorch installed (CUDA variant). pip uninstall torch → pip install torch --index-url .../rocm6.0"],
            ["Training slower than expected", "rocProfiler — identify slow kernels. Check MIOpen launch times.", "MIOpen cache cold (warmup needed). FP32 instead of BF16. Batch size too small. Custom ops not optimized for AMD."],
            ["RCCL AllReduce hanging", "NCCL_DEBUG=INFO env variable. Check ibstat for InfiniBand.", "InfiniBand misconfigured. NCCL_SOCKET_IFNAME, NCCL_IB_HCA env vars. Version mismatch between nodes."],
            ["GPU OOM despite 192 GB available", "rocm-smi --showmeminfo all", "Model loading multiple copies. Optimizer states not sharded (use ZeRO). torch.cuda.empty_cache() on AMD too."],
            ["Thermal throttling", "rocm-smi --showtemp; rocm-smi --showclktype", "Check cooling. Power cap: rocm-smi --setpoweroverdrive 0 -p 600. Liquid cooling upgrade."],
            ["First training iteration very slow", "Time first iteration separately. Check if 10-30 minutes: MIOpen compilation.", "MIOpen warmup: run dummy batch first. MIOPEN_FIND_ENFORCE=3 for aggressive caching."],
            ["torch.cuda.is_available() False", "Check ROCm install: rocm-smi", "PyTorch torch.cuda uses ROCm backend on AMD — must have ROCm-version PyTorch installed, not CPU-only or CUDA variant."],
            ["Custom .cu file not compiling", "Check for CUDA-specific intrinsics", "Run hipify-perl, fix remaining issues. PTX code needs full rewrite. Wavefront size (64 not 32) must be handled."],
          ]}
        />
      </section>

      {/* ── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>
        {[
          {
            q: "AMD CDNA architecture aur NVIDIA CUDA architecture mein fundamental design philosophy kya hai — kahan agree karte hain aur kahan differ?",
            a: "Both architectures fundamental agreement mein hain: massively parallel compute, high-bandwidth memory (HBM), dedicated matrix multiply hardware (Matrix Cores vs Tensor Cores), memory hierarchy (L1/L2 cache + main memory). Key philosophical differences: Memory strategy: AMD bets on higher memory capacity (192 GB MI300X vs 80 GB H100). NVIDIA bets on higher compute throughput optimization per byte. AMD thesis: model ek single accelerator pe fit karna simpler aur more efficient hai. Chiplet approach: AMD aggressively chiplets pe — MI300X mein 8 GPU compute dies + interposer + HBM. NVIDIA H100 monolithic (Blackwell first step to dual-die). AMD's yield aur scalability argument vs simpler programming. Open vs proprietary: ROCm open-source. CUDA proprietary. AMD's open ecosystem attracts diverse developers, allows customization. Execution width: AMD wavefront = 64 work items. NVIDIA warp = 32 threads. AMD's wider SIMD theoretically more throughput per scheduling event, different divergence characteristics. CPU integration: AMD has MI300A (CPU+GPU+HBM integrated). NVIDIA Grace-Blackwell equivalent. Both converging on same integrated approach.",
          },
          {
            q: "ROCm aur CUDA ecosystem mein practical gap exactly kahan hai — ek engineer ke perspective se?",
            a: "Custom kernels: Sabse bada gap. CUDA pe custom kernels 18+ years of optimization tools, examples, community knowledge. HIP pe migration possible lekin less documented, less community support, less mature profiling. FlashAttention: FlashAttention 3 CUDA-only originally, ROCm support lag karta hai. LLM training critical optimization. AMD community port available lekin days-to-weeks behind CUDA releases. Profiling depth: Nsight Systems visual timeline, bottleneck identification, warp efficiency analysis — sehr polished. rocProfiler functional lekin less visual, less intuitive. Triton compiler: NVIDIA Triton primarily targets CUDA. ROCm backend exists lekin less tested. cuDNN depth: Manually tuned convolution kernels for every NVIDIA GPU generation. MIOpen has automated tuning lekin less hand-optimization depth. Framework edge cases: 95% of PyTorch works. Remaining 5% — custom CUDA ops in model code, specialized attention variants, quantization kernels — AMD-specific testing aur often fixes needed. Practical impact: Standard model training on standard architectures (BERT, GPT, LLaMA fine-tuning) — ROCm gap small. Research code with custom kernels — significant migration effort.",
          },
          {
            q: "MI300X ke 192 GB memory advantage ka actual LLM serving pe kya impact hai — kab matters aur kab nahi?",
            a: "When it matters significantly: Model size 80-192 GB (FP16): Models in this range — 70B LLaMA at FP16 = 140 GB. Fits MI300X single card, needs 2x H100. Single-card inference: lower latency (no inter-card communication), simpler serving infrastructure, potentially lower cost. Long context inference: KV cache grows with sequence length. 128K context 70B model: KV cache alone tens of GB. More base memory = more room for KV cache = longer contexts possible without model parallelism. Batch size: More memory = larger batch sizes at same model size = better GPU utilization = higher throughput. When it doesn't matter: Models under 80 GB (FP16): Fit on both H100 and MI300X — memory advantage not realized. Quantized models: INT4 quantized 70B = ~35 GB. Fits on both easily — AMD advantage disappears. Training large clusters: Memory per card less important when 100s or 1000s of cards available. NVSwitch advantage (NVIDIA) more critical for gradient sync. Highest compute throughput: NVIDIA software optimizations (Transformer Engine) often ahead. Memory is not the only factor. Practical recommendation: MI300X memory advantage most valuable for inference of unquantized 70B class models or very long context serving.",
          },
          {
            q: "Chiplet architecture AMD ke AI chips mein kyun hai — ek system design perspective se kya advantages aur challenges hain?",
            a: "Advantages: Yield improvement: 7nm/5nm process pe large monolithic die pe defect density high hoti hai. Small chiplets pe: higher yield per die, assemble only passing dies. Manufacturing cost reduces significantly at scale. Heterogeneous integration: Compute dies (XCDs) aggressive node pe (TSMC N5P). IO die (AID) ya interposer older cheaper node pe. HBM 3D stacked. Each component optimal node pe manufacture hota hai. Scalability: Want more compute? More XCD chiplets add karo to same interposer design. Memory capacity breakthrough: MI300X ka 192 GB HBM3 — monolithic approach se achieve karna practically impossible given area constraints. Challenges: NUMA-like effects: Die boundary crossing latency. Data on XCD 1 fetch karni hai XCD 5 ke liye — slower than local access. Software pe careful memory placement required for peak performance. Programming complexity: Cache coherency across dies. Workload placement across XCDs for optimal performance. AMD-specific optimization knowledge required. Thermal management: Multiple dies different thermal profiles. OEM server thermal design critical. Industry trend: Blackwell (NVIDIA) dual-die is AMD-like direction. Intel Gaudi chiplet also. AMD ahead in multi-chiplet integration — advantage may not last long.",
          },
          {
            q: "Production AMD Instinct deployment mein kya pre-deployment validation karna zaroori hai?",
            a: "ROCm version validation: Target OS + kernel version + ROCm version compatibility matrix confirm karo (amd.com/support). Test ROCm install on one node before cluster-wide deployment. Framework stack validation: rocm/pytorch:specific_version container mein specific model run karo end-to-end. Not just 'does it run' — profile baseline performance. Compare vs expected benchmarks for AMD hardware. Distributed training validation: RCCL AllReduce correctness test. Intra-node first (single server, 8 GPUs), then multi-node. Record AllReduce bandwidth — if significantly below theoretical, networking issue. Note: PyTorch maps backend='nccl' to RCCL on AMD automatically. Model-specific validation: Run your actual model (not just benchmark). AMD performance profile different from NVIDIA. Custom kernels test specifically. Memory usage profile — 192 GB available but allocation patterns matter. Thermal validation: Run at peak load for 24+ hours. Monitor junction temperatures. Verify cooling infrastructure adequate. Check throttle events. Monitoring setup validation: rocm-smi Prometheus exporter working, Grafana dashboards showing correct metrics, alerting configured.",
          },
          {
            q: "AMD ROCm pe CUDA code migrate karne ka step-by-step process kya hai — aur kab migration worth nahi hai?",
            a: "Step-by-step migration: Step 1: Codebase audit. Find all .cu files, CUDA_VISIBLE_DEVICES, cudaMalloc/cudaMemcpy/cudaStream, library imports (cublas, cudnn direct calls), compiler directives. Step 2: Automated hipify. hipify-perl --inplace source_file.cu converts most standard CUDA syntax. Review diff carefully. Step 3: Fix remaining issues. warpSize hardcodes (AMD wavefront = 64, not 32). __syncwarp() equivalents in HIP. Custom PTX — no equivalent in HIP, must rewrite in HIP C++. Step 4: Compile and test. hipcc --offload-arch=gfx90a (MI300X) source.cpp. Fix compilation errors. Run correctness tests. Step 5: Performance validation. Profile with rocProfiler. Identify AMD-specific slow kernels. Verify AllReduce bandwidth in distributed setup. When migration NOT worth it: Heavy PTX/SASS usage — complete rewrite needed. CUDA-specific hardware features (Transformer Engine, TMA) — no AMD equivalent. Critical path on niche cuDNN functions — MIOpen may lag. Timeline pressure — migration for complex codebases takes weeks to months. Team expertise gap — AMD/HIP learning curve real cost. When worth it: Standard model architectures, memory-bound inference (MI300X advantage), cost sensitivity, open-source requirements, Azure/Oracle already chosen as cloud.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #ef4444", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#7f1d1d", marginBottom: "0.5rem" }}>Q: {item.q}</p>
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
            ["AID (Active Interposer Die)", "The base controller chip in MI300X. Sits on interposer, contains memory controllers, PCIe interface, inter-die switching. 'The Base Chip That Connects Everything.'"],
            ["CDNA (Compute DNA)", "AMD's architecture series specifically for data center AI and HPC. No graphics features — pure compute. Separate from consumer RDNA (gaming)."],
            ["CU (Compute Unit)", "AMD GPU's fundamental parallel processing block. NVIDIA SM equivalent. Each CU has 128 Stream Processors, dedicated Matrix Core hardware, LDS (shared memory), registers, and scheduler."],
            ["Chiplet", "A small specialized chip that performs one specific function. Multiple chiplets combined in one package via interconnect. Like specialized departments in a building instead of one generalist floor."],
            ["Frontier", "World's first exascale supercomputer (2022, Oak Ridge). Built with AMD MI250X + EPYC CPUs. Proved AMD competitive in FP64 scientific computing."],
            ["GCN (Graphics Core Next)", "AMD's older GPU architecture (2012-2019). Both gaming and compute. Foundation before CDNA. Now retired for data center use."],
            ["HIP (Heterogeneous-compute Interface for Portability)", "AMD's CUDA-equivalent programming API. hipMalloc = cudaMalloc, etc. Write code for AMD, can also compile for NVIDIA. Migration tool: hipify-perl."],
            ["hipBLAS", "AMD's cuBLAS equivalent. Dense linear algebra operations — matrix multiply. Used by PyTorch under the hood on AMD."],
            ["hipify-perl", "Automatic code converter — CUDA to HIP. Most standard CUDA auto-converts. Custom/niche CUDA: manual work needed."],
            ["Infinity Cache", "AMD's large on-chip cache innovation (originally gaming, RDNA2). Increases effective memory bandwidth. Different implementation in CDNA data center chips."],
            ["Infinity Fabric (IF)", "AMD's internal chip-to-chip interconnect. Used inside MI300X to connect compute dies (XCDs) to memory controllers (AID). NOT an external GPU-to-GPU link — that is xGMI."],
            ["Instinct", "AMD's data center AI accelerator brand. MI100, MI200, MI300 series. Separate from consumer Radeon gaming GPUs."],
            ["LDS (Local Data Share)", "AMD CU's shared memory. NVIDIA SM's shared memory equivalent. 64 KB per CU. Block threads share this. Programmer explicitly manages. 'Fast Team Whiteboard.'"],
            ["Matrix Core", "Dedicated matrix multiply-accumulate hardware integrated inside AMD Compute Units. AI math engine — accelerates D = A×B + C. NVIDIA Tensor Core equivalent. CDNA 1 onwards."],
            ["MCM (Multi-Chip Module)", "Multiple dies in one package. MI200 had dual-die MCM. MI300X has more complex 3D chiplet MCM. 'Many Specialized Chips in One Box.'"],
            ["MIOpen", "AMD's cuDNN equivalent. Deep neural network primitives — convolutions, attention, pooling, normalization. ROCm stack's critical component for AI performance."],
            ["OAM (Open Accelerator Module)", "High-power server GPU form factor. AMD's SXM equivalent. HPE Cray EX and other servers support OAM format for MI300X. Highest performance."],
            ["RCCL (ROCm Collective Communications Library)", "AMD's NCCL equivalent. AllReduce, AllGather, Broadcast for distributed GPU training. PyTorch automatically maps backend='nccl' to RCCL on AMD systems."],
            ["RDNA (Radeon DNA)", "AMD's consumer/professional graphics architecture. RX 7000 gaming cards. Separate from CDNA — has display output, graphics features. Not for data center AI."],
            ["ROCm (Radeon Open Compute Platform)", "AMD's open-source GPU computing platform. CUDA's AMD alternative. Includes HIP, MIOpen, hipBLAS, RCCL, profiling tools. Fully open-source."],
            ["rocm-smi", "AMD's GPU monitoring tool. nvidia-smi equivalent. Temperature, power, utilization, memory usage, ECC errors."],
            ["rocProfiler", "AMD's GPU performance profiler. Nsight Systems equivalent (less visual but functional). Kernel timing, memory bandwidth analysis."],
            ["SIMD32 (32 Parallel Math Units)", "Single Instruction Multiple Data, width 32. AMD CU's execution units — 32 work items execute same instruction simultaneously. 4 SIMD32 units per CU = 128 Stream Processors."],
            ["Stream Processor (SP)", "AMD's CUDA Core equivalent. Basic FP32 arithmetic unit. 128 per CU. Does element-wise ops (activations, normalization). Not for matrix multiply (Matrix Cores do that)."],
            ["UCIe (Universal Chiplet Interconnect Express)", "Industry standard chiplet-to-chiplet interconnect. AMD MI300X uses proprietary + UCIe-based interfaces between chiplets."],
            ["Wavefront", "AMD's equivalent of NVIDIA's Warp. 64 work items execute together in lockstep (vs NVIDIA's 32). Key for code migration — never hardcode 32, use warpSize variable."],
            ["XCD (Accelerator Complex Die)", "Individual GPU compute chiplet in MI300X. 38 CUs per XCD. 8 XCDs in MI300X = 304 total CUs. 'One GPU Compute Module.'"],
            ["xGMI (external Global Memory Interface)", "Infinity Fabric's external variant used for GPU-to-GPU communication between cards. NVLink's AMD equivalent for inter-card links. Different from internal Infinity Fabric."],
          ]}
        />
      </section>

      {/* ── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>AMD CDNA architecture deliberately graphics-free hai — compute-first design: CDNA 1 (2020) mein AMD ne graphics, display output, rasterization — sab data center chips se remove kar diya. Die area 100% compute ke liye. Dedicated Matrix Core hardware for AI math, HBM for bandwidth, Infinity Fabric for internal chip connections. Yeh NVIDIA ke approach se alag tha — NVIDIA started from graphics and added AI; AMD made a clean break for data center products.</li>
          <li>MI300X ka 192 GB HBM3 LLM inference ke liye game-changing hai: Single card pe 192 GB. 70B LLaMA at FP16 = 140 GB — fits on ONE MI300X. NVIDIA H100 ke liye TWO cards chahiye. Simpler deployment, no inter-card communication overhead, lower latency for single-model inference. Memory bandwidth 5.3 TB/s — 58% more than H100. Memory-bound inference workloads pe AMD compelling advantage. Note: Peak AI throughput is measured differently by AMD and NVIDIA — always benchmark your specific workload.</li>
          <li>Chiplet architecture MI300X ka core innovation hai: 8 XCDs (compute dies) + 1 AID (interposer die) + 4 HBM3 stacks — sab ek package mein. Why chiplets: higher manufacturing yield, heterogeneous integration (different process nodes), modularity, memory capacity scaling. Industry chiplets ki taraf ja raha hai — NVIDIA bhi Blackwell mein dual-die gaya. AMD ka earlier chiplet bet is architecture mein advantage deta hai.</li>
          <li>Infinity Fabric aur xGMI alag hain — yeh samajhna zaroori hai: Infinity Fabric = AMD ka internal chip interconnect (inside MI300X — XCDs to AID to HBM). xGMI = external GPU-to-GPU links between cards. Dono alag hai. AMD ke paas NVSwitch jaisa any-to-any switching fabric nahi hai — large cluster training mein InfiniBand pe depend karna padta hai. Yeh AMD ka current gap hai for distributed training scale-out.</li>
          <li>ROCm improving rapidly lekin CUDA se significant gap hai: Standard PyTorch training on standard architectures — ROCm works well. PyTorch torch.cuda API AMD pe bhi kaam karta hai — PyTorch uses torch.cuda for compatibility while ROCm provides backend. Custom CUDA kernels, cutting-edge optimizations, production inference tools (TensorRT level) — CUDA still ahead. Gap closing monthly as AMD invests heavily. Decision depends on your specific workload mix and organization&apos;s needs.</li>
          <li>Wavefront = 64, not 32 — ek critical AMD-specific detail: AMD wavefront = 64 work items. NVIDIA warp = 32 threads. Same concept, different width. Code jo warpSize = 32 assume kare: AMD pe wrong. Every CUDA to HIP migration mein yeh check zaroori hai. Always use warpSize macro — returns 64 on AMD, 32 on NVIDIA. This is the most common migration bug.</li>
          <li>Multi-GPU training: AMD gap vs NVIDIA NVSwitch: AMD ke paas dedicated switch chip (NVSwitch equivalent) nahi hai. Multi-GPU intra-node connectivity via xGMI through server topology — less any-to-any bandwidth than NVSwitch. Large-scale distributed training (100+ GPUs): NVIDIA NVSwitch + NVLink advantage real hai. AMD clusters rely heavily on InfiniBand for scale-out. This is AMD&apos;s biggest current gap for pure training at scale.</li>
          <li>Data center deployment: AMD aur NVIDIA same power/cooling requirements mein hain: MI300X: 750W. H100 SXM5: 700W. Virtually same. Same cooling engineering needed — air cooling 40+ kW/rack challenging, liquid cooling recommended. Same power distribution planning. Difference: NVIDIA better enterprise support infrastructure, more mature monitoring tools. AMD catching up through OEM partnerships (HPE, Dell, Supermicro).</li>
          <li>AMD&apos;s open-source approach is a genuine differentiator: ROCm fully open-source (GitHub: RadeonOpenCompute). No license fee for software. Full source code available — enterprise can inspect, contribute, fork. Government labs, research institutions, open-source compliance organizations — AMD&apos;s approach real advantage. CUDA proprietary — no source, NVIDIA controls roadmap. For organizations where software freedom and auditability important: AMD&apos;s open approach valuable beyond just technical specs.</li>
          <li>Future direction: AMD CPU + GPU + memory integration is compelling: MI300A (CPU+GPU+HBM ek package mein) AMD ka unique bet hai. Same direction as Grace-Blackwell (NVIDIA). Unified memory (CPU pointer = GPU pointer, no copies) simplifies heterogeneous workloads dramatically. Future AMD chips likely continue this integration path. For organizations using AMD EPYC CPUs already + needing AI acceleration: MI300A integrated approach worth evaluating. Always verify current MI350 specifications at amd.com/instinct before procurement planning.</li>
        </ul>
      </section>

    </article>
  );
}
