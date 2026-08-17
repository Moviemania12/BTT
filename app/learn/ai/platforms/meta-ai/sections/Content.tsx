"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { metaAiContent } from "@/content/meta-ai";

import MetaComputeStrategy from "../svg/MetaComputeStrategy";
import MtiaArchitectureDiagram from "../svg/MtiaArchitectureDiagram";

void metaAiContent;

export default function Content() {
  return (
    <article>

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Meta AI ek unique position mein hai — yeh Meta ka consumer-facing AI assistant aur product ecosystem hai. Meta ke broader AI model-development efforts mein multiple organizations aur teams involved hain. Llama model family Meta ka open-weight contribution hai — model weights publicly downloadable hain jo enterprises apne infrastructure pe deploy kar sakte hain. Meta AI consumer assistant (meta.ai / Facebook / Instagram / WhatsApp) currently Muse Spark models se powered hai — Llama se alag internally developed model family.
        </p>
        <p style={S.p}>
          Infrastructure perspective se Meta important hai kyunki: (1) Meta apna custom AI silicon (MTIA) develop karta hai, (2) NVIDIA aur AMD GPUs dono heterogeneous fleet mein use karta hai, (3) Large-scale publicly documented AI clusters operate karta hai, aur (4) Llama ki open-weight nature enterprises ko on-premise AI deployment enable karti hai — with appropriate infrastructure, licensing aur compliance considerations.
        </p>
        <Callout type="important" title="Accuracy Note — Official Sources Only">
          Meta ke internal infrastructure details publicly partially documented hain. Is article mein sirf officially documented ya publicly verified information use ki gayi hai. Exact private GPU/MTIA counts, specific data center locations, ya internal serving topology — jo officially confirm nahi hain — invent nahi kiye gaye hain. Announced hardware ko production se clearly distinguish kiya gaya hai.
        </Callout>
      </section>

      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Meta ke AI cluster architecture, Grand Teton, power/cooling aur O&M perspective</li>
          <li><strong>AI Infrastructure Engineers:</strong> MTIA, heterogeneous GPU strategy, Llama training infrastructure</li>
          <li><strong>Enterprise IT Teams:</strong> Llama open-weight deployment — on-premise vs cloud options</li>
          <li><strong>O&M Engineers:</strong> High-density AI racks, liquid cooling, monitoring aur troubleshooting</li>
          <li><strong>Students aur Beginners:</strong> Meta AI ecosystem ka complete infrastructure perspective</li>
        </ul>
      </section>

      <section id="what-is-meta-ai">
        <h2 style={S.h2}>What Is Meta AI?</h2>
        <p style={S.p}>
          Meta AI Meta Platforms (parent company of Facebook, Instagram, WhatsApp) ka AI research aur product division hai. Meta AI Research (FAIR — Fundamental AI Research) foundational AI research karta hai, aur Meta ke product teams consumer AI experiences build karte hain.
        </p>
        <p style={S.p}><strong>Meta AI multiple roles mein kaam karta hai:</strong></p>
        <ul style={S.ul}>
          <li><strong>AI Research (FAIR aur broader):</strong> Foundational research — Llama, image segmentation (SAM), speech recognition (Wav2Vec), aur more. Meta Superintelligence Labs bhi Meta ke frontier AI development mein involved hai.</li>
          <li><strong>Consumer AI Product:</strong> Meta AI assistant — Facebook, Instagram, WhatsApp, Messenger, aur meta.ai pe available. Currently Muse Spark (incl. Muse Spark 1.1) aur Muse Image models se powered hai per Meta announcements.</li>
          <li><strong>Open-Weight Contributor:</strong> Llama model weights publicly release karta hai (open-weight, not fully open-source) — community aur enterprise use ke liye. Llama Meta AI consumer product se alag family hai.</li>
          <li><strong>Internal AI Platform:</strong> Meta ke own products — News Feed ranking, ad targeting, content moderation — sab AI-powered</li>
        </ul>
        <p style={S.p}>
          Infrastructure scale: Meta billions of active users serve karta hai daily across platforms — yeh AI-at-scale ka ek extraordinary example hai. Content ranking, recommendation systems, ad serving — sab AI inference continuously run karta hai at massive scale.
        </p>
      </section>

      <section id="llama-ecosystem">
        <h2 style={S.h2}>Llama Ecosystem — Open-Weight AI</h2>
        <p style={S.p}>
          Llama (Large Language Model Meta AI) Meta ka open-weight AI model family hai. "Open-weight" ka matlab hai model parameters/weights publicly downloadable hain — fully open-source se alag kyunki training code/data publicly released nahi hota. Proprietary closed API models (GPT-4, Claude, Gemini API) se yeh alag hai kuch licensing restrictions ke saath.
        </p>
        <p style={S.p}><strong>Open-weight ka infrastructure significance:</strong></p>
        <ul style={S.ul}>
          <li>Organizations model weights download karke apne GPU servers pe run kar sakte hain</li>
          <li>Inference data apne controlled environment mein rakh sakte ho — lekin yeh architecture aur integrations pe depend karta hai</li>
          <li>Custom fine-tuning apne infrastructure pe possible hai</li>
          <li>Third-party API costs avoid hoti hain — lekin infrastructure CapEx/OpEx operator pe shift hoti hai</li>
          <li>Offline deployment possible in supported configurations — exact requirements verify karo</li>
        </ul>
        <p style={S.p}><strong>Open Compute Project (OCP) connection:</strong> Meta OCP ka co-founder hai — data center hardware aur designs openly share karta hai. Grand Teton GPU server design OCP ke through publicly shared hai. Yeh culture open-weight models ke saath align karta hai — Meta sharing approach ko infrastructure mein bhi apply karta hai.</p>
        <Callout type="best-practice" title="Llama = On-Premise AI Enabler">
          Regulated industries (healthcare, finance, government, defense) ke liye Llama deployment ek path hai jisme inference data aapke controlled environment mein rehta hai — depending on deployment architecture aur integrations. Compliance (HIPAA, GDPR, financial regulations) automatically achieved nahi hoti — on-premise deployment data flows control karta hai lekin regulatory compliance additional controls aur processes require karti hai. Yeh OpenAI/Anthropic/Google managed API alternatives se different tradeoff hai.
        </Callout>
      </section>

      <section id="model-family">
        <h2 style={S.h2}>Llama Model Family</h2>
        <p style={S.p}>
          Llama models multiple generations mein available hain — current models aur specifications verify karo: <a href="https://llama.meta.com" style={{ color: "#2563eb" }}>llama.meta.com</a>
        </p>
        <ComparisonTable
          title="Llama Model Generations — Overview (verify current at llama.meta.com)"
          headers={["Generation", "Release", "Key Characteristic", "Infrastructure Note"]}
          rows={[
            ["Llama 1", "Feb 2023", "First public release — research only", "Historical — for context only"],
            ["Llama 2", "Jul 2023", "Commercial use allowed, up to 70B params", "Research + commercial deployment"],
            ["Llama 3", "Apr 2024+", "8B and 70B initially, 405B later; multimodal variants", "Current widely deployed generation"],
            ["Llama 4", "2025+", "Next generation — verify current at llama.meta.com", "Verify current capabilities and license"],
          ]}
        />
        <Callout type="warning" title="Model Sizes aur Capabilities Rapidly Evolve">
          Llama model versions, parameter counts, context windows, aur multimodal capabilities frequently update hote hain. Always official Meta documentation se current models verify karo: <a href="https://llama.meta.com" style={{ color: "#2563eb" }}>llama.meta.com</a>
        </Callout>
        <p style={S.p}><strong>Model size aur infrastructure requirements:</strong> Larger Llama models more GPU memory require karte hain. Approximate GPU requirements (may vary with quantization):</p>
        <ul style={S.ul}>
          <li>Llama 3 8B (BF16): ~16 GB GPU memory — single mid-range GPU pe possible</li>
          <li>Llama 3 70B (BF16): ~140 GB GPU memory — multiple high-end GPUs required</li>
          <li>Llama 3 405B (BF16): ~810 GB GPU memory — large multi-GPU cluster required</li>
          <li>Quantized versions (GGUF/GPTQ): significantly less memory — quality tradeoff</li>
        </ul>
      </section>

      <section id="meta-ai-products">
        <h2 style={S.h2}>Meta AI Products and Deployment Paths</h2>
        <ComparisonTable
          title="Meta AI — Different Products and Access Paths"
          headers={["Product/Path", "Description", "Infrastructure", "Data Handling"]}
          rows={[
            ["Meta AI Assistant (Muse Spark / Muse Image)", "Consumer AI on Facebook/Instagram/WhatsApp/meta.ai — currently powered by Muse Spark 1.1 and Muse Image per Meta announcements", "Meta's own data centers — exact architecture undisclosed", "Per Meta AI privacy policy — verify at meta.ai/privacy"],
            ["Llama (open-weight)", "Download model weights — self-hosted; separate from Meta AI consumer product", "Your own GPU servers, cloud VMs, or edge devices", "Your infrastructure — data stays within your controlled environment (architecture-dependent)"],
            ["Llama via cloud providers", "AWS, Azure, GCP, together.ai, Fireworks.ai etc.", "Cloud provider infrastructure", "Cloud provider data handling policies"],
            ["Meta AI API (if available)", "Programmatic access — verify current availability", "Meta-hosted — verify current terms", "Verify current Meta API data policies"],
          ]}
        />
        <Callout type="important" title="Consumer Meta AI ≠ Enterprise Llama Deployment">
          Meta AI consumer product (meta.ai, Facebook/Instagram integration) aur Llama open-weight deployment bilkul alag cheezein hain. Consumer Meta AI mein data Meta ke servers pe jaata hai. Enterprise Llama deployment mein data aapke apne infrastructure pe rehta hai. Is distinction ko always clearly maintain karo.
        </Callout>
      </section>

      <section id="compute-strategy">
        <h2 style={S.h2}>Meta Compute Strategy — Heterogeneous Infrastructure</h2>
        <Figure caption="Meta Heterogeneous Compute Strategy: NVIDIA GPUs (large-scale Llama training, H100/H200 documented), AMD GPUs (training, supply diversification), MTIA custom silicon (inference, recommendation ranking). All three simultaneously used — exact workload-to-hardware mapping partially publicly disclosed. Based on publicly available Meta Engineering information.">
          <MetaComputeStrategy />
        </Figure>
        <p style={S.p}>
          Meta ka approach other AI companies se alag hai: NVIDIA GPUs, AMD GPUs, aur apna custom MTIA silicon — teeno simultaneously use karta hai. Yeh intentional heterogeneous strategy hai.
        </p>
        <p style={S.p}><strong>Kyun heterogeneous:</strong></p>
        <ul style={S.ul}>
          <li><strong>Vendor diversification:</strong> Multiple hardware options maintain karna — ek single supplier pe complete dependency avoid karna</li>
          <li><strong>Supply flexibility:</strong> Different vendors available hone se supply disruptions ka risk reduce hota hai</li>
          <li><strong>Workload fit:</strong> Different hardware different workloads ke liye better suited — heterogeneous fleet workload-specific optimization enable karta hai</li>
          <li><strong>Reduced single-vendor dependence:</strong> Custom MTIA development ek supplier pe dependence reduce karta hai over time</li>
        </ul>
        <p style={S.p}>
          Meta publicly ek large AI cluster ka describe kiya hai jo <strong>24,576 NVIDIA H100 GPUs</strong> use karta hai — Llama 3 training ke liye (per Meta Engineering blog). Meta ne actually TWO such 24,576-GPU clusters document kiye hain — ek RoCEv2 400Gbps fabric ke saath, ek NVIDIA Quantum-2 InfiniBand 400Gbps ke saath. Largest Llama model RoCEv2 cluster pe trained kiya gaya per Meta's paper. Cluster evolution: ~4K GPUs → 24K GPUs documented. Future plans: Meta ne ~129K GPU scale clusters mention kiye hain (Prometheus/Hyperion context). Exact specs publicly fully disclosed nahi hain — verify at engineering.fb.com.
        </p>
      </section>

      <section id="mtia">
        <h2 style={S.h2}>MTIA — Meta's Custom Silicon</h2>
        <p style={S.p}>
          MTIA (Meta Training and Inference Accelerator) Meta ka in-house designed custom AI chip hai. Google TPU ya AWS Trainium ki tarah — purpose-built AI accelerator hai general-purpose GPU nahi.
        </p>
        <p style={S.p}><strong>Why Meta built MTIA:</strong></p>
        <ul style={S.ul}>
          <li><strong>Scale economics:</strong> Meta billions of users serve karta hai — inference at this scale NVIDIA GPU cost astronomical hai. Custom chips same workloads cheaper run kar sakte hain.</li>
          <li><strong>Workload specificity:</strong> Meta ke recommendation systems (News Feed, Instagram, Ads) ek specific computation pattern rakhte hain — embedding lookups, matrix multiply, ranking. Custom chip is pattern ke liye optimized ho sakta hai.</li>
          <li><strong>Power efficiency:</strong> Purpose-built chips specific tasks more efficiently run karte hain — per-watt performance better</li>
          <li><strong>Reduced single-vendor dependence:</strong> MTIA development ek accelerator supplier pe complete dependence reduce karta hai gradually</li>
        </ul>
        <p style={S.p}><strong>What MTIA is NOT:</strong> MTIA ne Meta ke NVIDIA ya AMD GPUs completely replace nahi kiya. Llama training primarily large NVIDIA GPU clusters pe hota hai. MTIA ka scope expand ho raha hai — originally recommendation/ranking inference ke liye, ab GenAI workloads aur inference bhi cover karta hai per Meta announcements. Hundreds of thousands of MTIA chips deployed hain per Meta public statements.</p>
        <Callout type="important" title="MTIA Role — Publicly Stated">
          Meta Engineering blog pe publicly documented: MTIA originally recommendation workloads aur inference tasks ke liye designed tha; scope ab GenAI inference aur R&R training bhi include karta hai per Meta announcements. Hundreds of thousands of MTIA chips deployed hain per Meta. Large-scale Llama foundation model training NVIDIA GPU clusters pe continue karta hai. Exact workload-to-hardware mapping publicly fully disclosed nahi hai.
        </Callout>
      </section>

      <section id="mtia-generations">
        <h2 style={S.h2}>MTIA Generations and Roadmap</h2>
        <Figure caption="MTIA Generations: v1/MTIA 100 aur MTIA 200 (production); MTIA 300 (production for R&R training); MTIA 400 (testing completed, deployment underway); MTIA 450 (mass deployment early 2027); MTIA 500 (mass deployment 2027) — per Meta announcements. MTIA scope covers R&R inference/training and GenAI inference. Does not replace NVIDIA/AMD GPUs for large Llama training. Illustrative; verify current status at engineering.fb.com.">
          <MtiaArchitectureDiagram />
        </Figure>
        <ComparisonTable
          title="MTIA Generations — Status as Publicly Documented"
          headers={["Generation", "Status", "Key Focus", "Source"]}
          rows={[
            ["MTIA v1 / MTIA 100", "Production — documented", "First-generation; recommendation/ranking inference", "Meta Engineering blog"],
            ["MTIA 200", "Production — documented", "Performance/efficiency improvements; expanded workloads", "Meta Engineering blog"],
            ["MTIA 300", "Production — R&R training (per Meta announcements)", "Covers recommendation/ranking (R&R) training workloads; GenAI inference expanding", "engineering.fb.com — verify current scope"],
            ["MTIA 400", "Testing completed; deployment underway (per Meta announcements)", "72-accelerator scale-up domain; AALC (Advanced Air/Liquid Cooling) support; GenAI + R&R workloads", "engineering.fb.com — verify current status"],
            ["MTIA 450", "Mass deployment early 2027 (per Meta roadmap)", "Next efficiency/performance tier — verify at engineering.fb.com", "engineering.fb.com"],
            ["MTIA 500", "Mass deployment 2027 (per Meta roadmap)", "Future generation — verify at engineering.fb.com", "engineering.fb.com"],
          ]}
        />
        <Callout type="warning" title="MTIA Status — Verify Current State">
          MTIA 300 R&R training production mein hai; MTIA 400 testing completed aur deployment path pe hai; MTIA 450/500 future roadmap hain per Meta announcements. Hundreds of thousands MTIA chips deployed hain per Meta. Exact per-chip specs, detailed workload assignments aur deployment scale publicly fully disclosed nahi hain. Always current status engineering.fb.com pe verify karo.
        </Callout>
      </section>

      <section id="nvidia-amd">
        <h2 style={S.h2}>NVIDIA and AMD GPU Infrastructure</h2>
        <p style={S.p}><strong>NVIDIA GPUs — Primary Training Infrastructure:</strong></p>
        <ul style={S.ul}>
          <li>Llama 3 training ke liye 24,576 H100 GPU cluster publicly documented (Meta Engineering blog, April 2024)</li>
          <li>H100/H200 class GPUs large-scale Llama training ke primary workhorse hain</li>
          <li>Grand Teton GPU server Meta ka purpose-built NVIDIA GPU server design hai (OCP-shared)</li>
          <li>NVLink intra-server GPU-to-GPU, RoCEv2 inter-server networking documented for large clusters</li>
        </ul>
        <p style={S.p}><strong>AMD GPUs — Training Diversification:</strong></p>
        <ul style={S.ul}>
          <li>Meta publicly ne AMD Instinct MI series GPUs training workloads mein use karne ka document kiya hai</li>
          <li>ROCm software stack AMD GPUs ke liye — PyTorch (Meta-developed) AMD support rakhta hai</li>
          <li>Vendor diversification aur workload fit primary drivers hain</li>
          <li>Exact AMD cluster sizes aur workload assignments publicly fully disclosed nahi hain</li>
        </ul>
        <p style={S.p}><strong>Infrastructure implication:</strong> Heterogeneous GPU fleet complex software management require karta hai — drivers, firmware, monitoring tools sab vendors ke liye maintain karne padte hain. PyTorch ka cross-platform nature yeh enable karta hai lekin operational complexity badhti hai.</p>
      </section>

      <section id="ai-clusters">
        <h2 style={S.h2}>Meta AI Clusters</h2>
        <p style={S.p}><strong>Publicly Documented Clusters:</strong></p>
        <ComparisonTable
          title="Meta AI Clusters — Publicly Documented Information"
          headers={["Cluster / Reference", "Publicly Stated", "Status", "Source"]}
          rows={[
            ["24,576 H100 GPU cluster (RoCEv2)", "NVIDIA H100 SXM 80GB, RoCEv2 400Gbps, Grand Teton servers — Llama 3 largest model trained here per Meta", "Documented (2024)", "Meta Engineering blog / Llama 3 paper"],
            ["24,576 H100 GPU cluster (InfiniBand)", "NVIDIA H100 SXM 80GB, NVIDIA Quantum-2 InfiniBand 400Gbps, Grand Teton servers — same GPU count, different fabric", "Documented (2024)", "Meta Engineering blog"],
            ["Prometheus", "Meta's large-scale AI cluster — ~1 GW capacity publicly stated, underway", "Underway per Meta announcements; exact GPU count not disclosed", "Meta Engineering / newsroom"],
            ["Hyperion", "Multi-site, up to ~5 GW cluster capacity publicly stated — beginning 2028 timeframe", "Announced; verify current build status", "Meta Engineering / newsroom"],
          ]}
        />
        <Callout type="important" title="Cluster Details — What Is and Isn't Publicly Confirmed">
          Meta ne TWO 24,576 H100 clusters document kiye hain — ek RoCEv2 fabric ke saath, ek NVIDIA Quantum-2 InfiniBand ke saath; dono 400Gbps endpoints. Largest Llama model RoCEv2 cluster pe trained tha per Meta's paper. Prometheus (~1 GW, underway) aur Hyperion (up to ~5 GW, beginning-2028 timeframe) publicly discussed hain lekin exact GPU counts, rack configurations aur operational details publicly disclosed nahi hain. Model-to-cluster assignments Meta ne explicitly confirm kiye hain wahi use karo.
        </Callout>
        <p style={S.p}><strong>24K GPU cluster architecture (publicly documented):</strong></p>
        <ul style={S.ul}>
          <li>24,576 NVIDIA H100 SXM 80GB HBM3 GPUs per cluster</li>
          <li>Networking Option A (RoCEv2 cluster): RoCEv2 400Gbps endpoints — RDMA over Converged Ethernet with PFC/ECN congestion management. Yeh standard Ethernet nahi hai — RDMA-capable, lossless fabric require karta hai proper flow control ke saath.</li>
          <li>Networking Option B (InfiniBand cluster): NVIDIA Quantum-2 InfiniBand 400Gbps — purpose-built HPC/AI fabric. Dono clusters 400Gbps endpoints share karte hain lekin fabric technology alag hai.</li>
          <li>Storage: Custom high-throughput storage for training data and checkpoints (details below in storage section)</li>
          <li>Power: Enormous sustained power requirements — specific per-rack figures publicly disclosed nahi</li>
          <li>Server: Grand Teton platform (OCP-shared design)</li>
        </ul>
        <p style={S.p}><strong>Cluster evolution (publicly referenced):</strong> ~4K GPU clusters → 24K GPU clusters documented → ~129K GPU scale mentioned in context of future plans. Exact 129K configuration aur timeline publicly fully confirmed nahi hai.</p>
      </section>

      <section id="grand-teton">
        <h2 style={S.h2}>Grand Teton and OpenRack</h2>
        <p style={S.p}>
          <strong>Grand Teton</strong> Meta ka purpose-built GPU server design hai — specifically NVIDIA H100 SXM GPUs ke liye optimized. Meta ne Grand Teton design Open Compute Project (OCP) ke through publicly shared kiya hai.
        </p>
        <p style={S.p}><strong>Grand Teton key characteristics (per OCP/Meta documentation):</strong></p>
        <ul style={S.ul}>
          <li>High-density GPU packing — 8 GPUs per server</li>
          <li>NVLink aur NVSwitch integration for intra-server GPU communication</li>
          <li>Optimized power delivery for high-wattage H100 GPUs</li>
          <li>Thermal management for sustained high-power GPU operation</li>
          <li>OCP rack compatible — OpenRack standard ke saath integrate hota hai</li>
        </ul>
        <p style={S.p}><strong>OpenRack:</strong> Open Compute Project ka rack standard hai — proprietary vendor racks se alag, community-developed open specification. Meta, Microsoft, aur other hyperscalers OCP mein contribute karte hain. Benefits: vendor lock-in reduce, interoperability increase, community innovation.</p>
        <p style={S.p}><strong>Data center implication:</strong> Grand Teton/OpenRack class servers high power draw create karte hain. Thermal management critical hai. Current Grand Teton specs OCP website pe verify karo: <a href="https://www.opencompute.org" style={{ color: "#2563eb" }}>opencompute.org</a></p>
      </section>

      <section id="networking">
        <h2 style={S.h2}>AI Cluster Networking</h2>
        <p style={S.p}>
          AI training cluster mein networking directly training throughput determine karta hai — <TopicLink slug="ai-networking" variant="inline" /> article mein detail mein covered hai.
        </p>
        <p style={S.p}><strong>Meta's documented networking approach:</strong></p>
        <ul style={S.ul}>
          <li><strong>Intra-server (NVLink):</strong> H100 SXM GPUs ke beech NVSwitch-based NVLink — ~900 GB/s bidirectional per GPU (per NVIDIA H100 specs). Yeh server-internal high-bandwidth fabric hai, separate from external network.</li>
          <li><strong>Inter-server — RoCEv2 cluster:</strong> RoCEv2 (RDMA over Converged Ethernet) at 400Gbps per endpoint. RoCEv2 standard Ethernet packet format use karta hai lekin RDMA (Remote Direct Memory Access) enable karta hai — CPU bypass karke directly memory-to-memory data transfer. Iske liye lossless fabric required hoti hai: PFC (Priority Flow Control) packet drops prevent karta hai; ECN (Explicit Congestion Notification) congestion signal karta hai. Yeh specialist equipment hai — ordinary switched Ethernet nahi.</li>
          <li><strong>Inter-server — InfiniBand cluster:</strong> NVIDIA Quantum-2 InfiniBand 400Gbps — purpose-built HPC/AI interconnect. Native RDMA support, purpose-designed topology aur scheduling. Dono fabrics 400Gbps endpoints share karte hain lekin architecture fundamentally different hai.</li>
          <li><strong>Network topology:</strong> Fat-tree ya similar non-blocking topology — exact private topology publicly detailed nahi. Topology aur scheduling directly AllReduce latency aur training throughput affect karte hain.</li>
        </ul>
        <p style={S.p}><strong>RoCEv2 vs InfiniBand — Meta's dual-fabric approach:</strong> Meta ne dono fabrics deploy kiye hain — yeh single fabric choice nahi hai. RoCEv2: Ethernet ecosystem pe built, RDMA with congestion management (PFC+ECN), potentially more flexibility. InfiniBand: purpose-built HPC interconnect, different operational characteristics. Largest Llama model RoCEv2 cluster pe trained tha per Meta's published paper — dono viable hain is scale pe.</p>
        <p style={S.p}><strong>Collective operations:</strong> AllReduce, AllGather — sab GPUs gradients synchronize karte hain har training step pe. Network bandwidth aur latency directly training throughput limit karte hain. <TopicLink slug="ai-networking" variant="inline" /></p>
      </section>

      <section id="storage">
        <h2 style={S.h2}>Storage and Checkpoints</h2>
        <p style={S.p}><strong>Training data storage:</strong> Llama training massive datasets require karta hai — internet-scale text, code, images. Exact training data storage scale publicly confirmed nahi hai. High-throughput parallel file system required — training GPUs ko data continuously feed karna hota hai. Bottleneck avoid karo: storage I/O rate se training throughput directly affected hoti hai. <TopicLink slug="ai-storage" variant="inline" /></p>
        <p style={S.p}><strong>Checkpoint storage:</strong> 24K GPU cluster training mein regular checkpoints essential hain — hardware failure pe restart. Llama 405B class model checkpoint size enormous hota hai — significant storage capacity required. Checkpoint write time aur storage bandwidth I/O design considerations hain.</p>
        <p style={S.p}><strong>Meta's storage approach (publicly documented concepts):</strong></p>
        <ul style={S.ul}>
          <li><strong>Tectonic:</strong> Meta ka distributed file system — publicly described in Meta Engineering blog aur research papers. Large-scale storage workloads ke liye designed.</li>
          <li><strong>BLOB storage:</strong> Binary Large Object storage training data aur model artifacts ke liye — regional aur GPU-colocated storage configurations described.</li>
          <li><strong>Direct streaming:</strong> Training data directly storage se GPU memory mein stream karna — staging avoid karna where possible.</li>
          <li><strong>Distributed caches aur read-plan caches:</strong> Training data access patterns optimize karne ke liye — prefetch aur data-loading pipeline optimization.</li>
          <li><strong>Flash storage:</strong> High-IOPS requirements ke liye flash deployed — checkpoint write speed aur random I/O ke liye.</li>
          <li><strong>Prefetch aur data-loading optimization:</strong> GPU starvation avoid karna — storage I/O aur compute pipeline ko balanced rakhna critical hai at 24K GPU scale.</li>
        </ul>
        <p style={S.p}>Exact private topology, vendor configurations aur per-cluster storage architecture publicly fully documented nahi hain — Meta Engineering blog aur published papers best public source hain.</p>
      </section>

      <section id="memory-hbm">
        <h2 style={S.h2}>Memory and HBM</h2>
        <p style={S.p}>
          HBM (High Bandwidth Memory) AI GPU performance ka critical determinant hai — <TopicLink slug="ai-gpu" variant="inline" /> article mein covered hai.
        </p>
        <p style={S.p}><strong>H100 GPU memory specs (publicly documented by NVIDIA):</strong></p>
        <ul style={S.ul}>
          <li>H100 SXM: 80 GB HBM3 per GPU (per NVIDIA H100 SXM specs); memory bandwidth ~3.35 TB/s</li>
          <li>Llama 3 70B BF16 model weights: ~140 GB approximate — lekin training ke liye yeh minimum nahi hai</li>
          <li>Training actual memory = weights + gradients + optimizer states (e.g., Adam: 2× parameter memory) + activations + communication buffers — substantially more than weight-only estimate</li>
          <li>Inference actual memory = weights + KV cache (context/batch dependent) + runtime workspace — context length, batch size aur serving architecture pe vary karta hai</li>
        </ul>
        <p style={S.p}><strong>Why HBM matters for Llama:</strong> Training mein model weights, gradients, optimizer states (e.g., Adam ke liye 2× parameter memory), activations aur communication buffers sab HBM mein simultaneously rehte hain — combined requirement weight-only estimate se significantly higher hoti hai. HBM capacity directly determines maximum model size per GPU shard. HBM bandwidth directly determines compute efficiency — memory bandwidth bottleneck se expensive GPU compute underutilized rehta hai.</p>
        <p style={S.p}><strong>MTIA memory:</strong> MTIA custom silicon ke memory configuration publicly fully detailed nahi hai. Meta ne MTIA efficiency inference tasks ke liye highlight ki hai — embedding lookups ke liye memory access patterns different hote hain LLM inference se.</p>
      </section>

      <section id="training-infra">
        <h2 style={S.h2}>Training Infrastructure</h2>
        <p style={S.p}>
          Llama-scale model training ek complex distributed systems problem hai — hardware, networking, software, aur operations sab critical hain.
        </p>
        <p style={S.p}><strong>Publicly documented Llama 3 training infrastructure elements:</strong></p>
        <ul style={S.ul}>
          <li>24,576 H100 GPUs — synchronized distributed training</li>
          <li>Model parallelism + data parallelism + pipeline parallelism simultaneously</li>
          <li>Custom fault tolerance — GPU failures training stall nahi kar sakti is scale pe</li>
          <li>Meta publicly high GPU utilization (90%+ range mentioned in some contexts) training ke liye document kiya hai — exact figures Meta ke papers se verify karo</li>
          <li>Custom storage system for training data aur checkpoints</li>
          <li>PyTorch + FSDP (Fully Sharded Data Parallel) — Meta-developed distributed training</li>
        </ul>
        <p style={S.p}><strong>Fault tolerance at 24K scale:</strong> Ek single GPU failure 24K GPU job ko potentially stall kar sakta hai. Meta ne automatic checkpoint aur restart mechanisms develop kiye — job failed GPU detect karta hai, checkpoint se restore karta hai, resume karta hai. Yeh engineering is scale pe critical hai.</p>
        <Callout type="best-practice" title="FSDP — Meta's Distributed Training Contribution">
          PyTorch FSDP (Fully Sharded Data Parallel) Meta ne develop kiya hai — model parameters, gradients, aur optimizer states sab GPUs mein shard karta hai. Yeh very large models efficiently train karne deta hai without replicating full model on each GPU. Open-source hai — community widely use karta hai Llama-scale training ke liye.
        </Callout>
      </section>

      <section id="inference-infra">
        <h2 style={S.h2}>Inference Infrastructure</h2>
        <p style={S.p}>
          Meta large-scale AI inference operate karta hai across Facebook/Instagram/WhatsApp — billions of interactions, real-time content ranking, ad serving, aur Meta AI assistant requests sab simultaneously. Exact serving volumes publicly disclosed nahi hain.
        </p>
        <p style={S.p}><strong>Two distinct inference domains:</strong></p>
        <ul style={S.ul}>
          <li><strong>Meta AI assistant inference (meta.ai / apps):</strong> LLM-style inference for conversational AI — currently Muse Spark models. Exact current serving hardware assignments are not publicly disclosed.</li>
          <li><strong>Recommendation/ranking/ad-serving inference:</strong> Real-time content ranking, feed personalization, ad targeting. MTIA primarily deployed here. High-volume, latency-critical, embedding-heavy workloads.</li>
        </ul>
        <p style={S.p}><strong>General inference infrastructure characteristics:</strong></p>
        <ul style={S.ul}>
          <li><strong>Heterogeneous serving:</strong> NVIDIA GPUs LLM/GenAI inference ke liye, MTIA recommendation/ranking ke liye, CPUs certain orchestration tasks ke liye</li>
          <li><strong>Latency-critical:</strong> Facebook feed ranking milliseconds mein karna hota hai — inference latency directly user experience affect karta hai</li>
          <li><strong>Scale:</strong> Concurrent user requests at social media scale — capacity planning enormous challenge hai</li>
          <li><strong>Model quantization:</strong> Production models often quantized — INT8 ya lower precision — memory efficiency aur speed ke liye</li>
          <li><strong>Geographic distribution:</strong> Meta ke data centers globally distributed hain — users ke paas inference serve karna</li>
        </ul>
        <p style={S.p}><strong>Open Llama inference (enterprise context):</strong> Organizations jo Llama self-host karte hain unhe apna inference infrastructure manage karna hota hai. Common frameworks: vLLM, TGI (Text Generation Inference), llama.cpp, Ollama — sab Llama models efficient inference ke liye support karte hain.</p>
      </section>

      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference Comparison</h2>
        <ComparisonTable
          title="Training vs Inference — Meta Infrastructure Perspective"
          headers={["Factor", "Training (Llama)", "Inference (Meta products + Llama serving)"]}
          rows={[
            ["Primary hardware", "NVIDIA H100/H200 clusters (AMD supplementing)", "NVIDIA GPUs + MTIA + CPUs (heterogeneous)"],
            ["Scale", "Massive synchronized clusters (24K+ GPUs documented)", "Geographically distributed, many serving nodes"],
            ["Duration", "Weeks to months per training run", "Continuous 24/7 — always-on"],
            ["Optimization target", "Throughput (tokens/sec, GPU utilization)", "Latency (TTFT, tokens/sec) + cost per token"],
            ["Memory pattern", "Weights + gradients + optimizer states + activations + buffers in HBM — substantially more than weight size alone", "Weights + KV cache + runtime workspace — varies with context length, batch size, serving architecture; quantized for efficiency"],
            ["Failure handling", "Checkpoint + restart; automated fault tolerance", "Load balancing — route away from failed nodes"],
            ["Power pattern", "Sustained maximum for weeks", "Variable with load — peaks during business hours globally"],
            ["Networking need", "AllReduce critical — every GPU communicates every step", "Request routing — lower collective communication need"],
          ]}
        />
      </section>

      <section id="power-density">
        <h2 style={S.h2}>Power and High-Density Racks</h2>
        <p style={S.p}>
          Meta ke AI clusters — especially Grand Teton-based NVIDIA H100 clusters — significant power infrastructure require karte hain.
        </p>
        <p style={S.p}><strong>H100 GPU power (publicly documented by NVIDIA):</strong></p>
        <ul style={S.ul}>
          <li>NVIDIA H100 SXM: ~700W TDP per GPU (per NVIDIA public spec)</li>
          <li>Grand Teton server (8x H100 GPUs): GPU-only TDP contribution = 8 × 700W ≈ 5.6 kW. Yeh sirf GPU TDP hai — server TDP mein CPU, memory, storage, networking, VRM losses bhi add hote hain.</li>
          <li>Full server power draw (all components): GPU TDP se substantially more — actual server-level power OEM specification aur configuration pe depend karta hai</li>
          <li>Rack power (multiple servers): Sustained draw above configured/OEM limit avoid karo — rack-level power budgeting facility infrastructure constraints ke anusaar karo</li>
          <li>Multiple servers per rack → rack power density well into tens of kW and potentially much higher</li>
        </ul>
        <Callout type="important" title="Exact Rack Power — Not Publicly Disclosed">
          Meta ke specific per-rack power figures aur complete rack configurations publicly confirmed nahi hain. NVIDIA H100 individual GPU TDP publicly documented hai, lekin full server + cooling + infrastructure overhead ke saath actual rack power facility-specific hota hai. Modern AI accelerator rack designs can reach tens of kW and, depending on configuration, substantially higher densities. <TopicLink slug="ai-cooling" variant="inline" />
        </Callout>
        <p style={S.p}><strong>Meta sustainability:</strong> Meta annually sustainability report publish karta hai — data center PUE, renewable energy, aur water usage publicly report karta hai. Meta ne 100% renewable energy commitment kiya hai. Current figures: <a href="https://sustainability.fb.com" style={{ color: "#2563eb" }}>sustainability.fb.com</a></p>
      </section>

      <section id="cooling">
        <h2 style={S.h2}>Cooling and Thermal Management</h2>
        <p style={S.p}>
          High-density GPU racks (Grand Teton class) significant cooling challenges present karte hain — traditional air cooling higher densities handle karne mein limited hoti hai.
        </p>
        <p style={S.p}><strong>What Meta publicly states about cooling:</strong></p>
        <ul style={S.ul}>
          <li>Meta publicly data center thermal management aur sustainability report karta hai</li>
          <li>Meta OCP ke through cooling innovations contribute karta hai</li>
          <li>Advanced cooling solutions — warm-water cooling, rear-door heat exchangers, Direct Liquid Cooling (DLC), Advanced Air/Liquid Cooling (AALC) — high-density workloads ke liye deployed hain</li>
          <li>MTIA 400 AALC (Advanced Air/Liquid Cooling) support rakhta hai per Meta announcements — high-density MTIA deployments ke liye</li>
          <li>Specific per-facility cooling configurations publicly detailed nahi hain</li>
        </ul>
        <Callout type="important" title="Cooling Technology — OEM aur Facility Dependent">
          Actual cooling technology (air, rear-door HX, direct liquid cooling, immersion) server/GPU OEM design, actual rack density, aur facility capability pe depend karti hai. Liquid cooling universally mandatory nahi hai — high-density AI racks ke liye practical necessity ban sakti hai depending on configuration. <TopicLink slug="ai-cooling" variant="inline" />
        </Callout>
        <p style={S.p}><strong>General high-density AI rack cooling considerations:</strong></p>
        <ul style={S.ul}>
          <li>ASHRAE recommended inlet temperature: 18–27°C typical (verify applicable class aur OEM specs)</li>
          <li>Relative humidity aur dew point: per applicable ASHRAE class aur OEM requirements</li>
          <li>Hot aisle/cold aisle containment: bypass airflow reduce karta hai efficiency improve hoti hai</li>
          <li>High-density racks ke liye liquid cooling options evaluate karo: rear-door HX, DLC (Direct Liquid Cooling), immersion</li>
        </ul>
      </section>

      <section id="liquid-cooling-chain">
        <h2 style={S.h2}>Liquid Cooling Chain</h2>
        <p style={S.p}>
          Jab liquid cooling deployed hoti hai high-density AI racks ke liye, conceptual chain yeh hai — actual implementation OEM design, CDU type, aur facility architecture pe depend karti hai:
        </p>
        <ol style={S.ol}>
          <li><strong>Facility Cooling Plant:</strong> Chiller ya dry cooler → facility-level cold water generate karta hai. Design basis, climate, aur water availability ke anusaar air-cooled ya water-cooled chiller.</li>
          <li><strong>CDU (Cooling Distribution Unit):</strong> Facility water aur IT equipment secondary coolant loop ke beech heat exchanger. Dono loops physically isolate hote hain — chemistry, pressure, aur contamination control ke liye. CDU typically rack ya row level pe installed hota hai.</li>
          <li><strong>Secondary Coolant Loop:</strong> CDU secondary side se cooled fluid rack manifold tak. IT-safe fluid chemistry maintained hoti hai. Flow rate aur temperature CDU controls maintain karta hai.</li>
          <li><strong>Rack Manifold:</strong> Secondary loop fluid individual server cold plates pe distribute karta hai via supply manifold. Return manifold warm fluid wapas CDU pe le jaata hai.</li>
          <li><strong>Server Cold Plates:</strong> GPU chips pe directly mounted — heat chip surface se coolant mein transfer hoti hai. Cold plate design chip thermal specs ke anusaar OEM provide karta hai.</li>
          <li><strong>Heat Removal aur Return:</strong> Warm coolant server se rack manifold → CDU secondary → CDU heat exchanger → facility return → chiller/cooling plant. Cycle repeats.</li>
        </ol>
        <p style={S.p}><strong>Key monitoring parameters for liquid-cooled AI racks:</strong></p>
        <ul style={S.ul}>
          <li>Coolant supply temperature (CDU secondary) — OEM specified range mein hona chahiye</li>
          <li>Coolant return temperature — combined with supply gives ΔT</li>
          <li>ΔT (supply − return): Q = ṁ × Cₚ × ΔT — heat load indicator</li>
          <li>Flow rate — below design spec = inadequate cooling delivery</li>
          <li>Loop pressure — unexpected drop = possible leak</li>
          <li>Leak detection sensors — rack, manifold, CDU, floor level</li>
          <li>CDU pump status — alarm, current, vibration</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2 style={S.h2}>Monitoring</h2>
        <ComparisonTable
          title="AI Data Center Monitoring — Meta-Scale Infrastructure"
          headers={["Parameter", "Why Monitor", "Concern Indicator"]}
          rows={[
            ["GPU junction temperature", "Thermal throttling; hardware health", "Approaching OEM thermal limit → throttling risk"],
            ["GPU clock speed / utilization", "Throttling indicator; efficiency", "Clock drop under load → throttling; low util → inefficiency"],
            ["GPU memory utilization", "OOM risk; model fit", "Near 100% → OOM risk; very low → underutilized"],
            ["GPU power draw", "Cooling load; budgeting; anomaly detection", "Sustained draw above configured/OEM power limit → investigate; sudden drop → correlate with workload and telemetry"],
            ["Rack inlet temperature", "IT equipment thermal envelope", "Above applicable ASHRAE class recommended range"],
            ["RH + dew point", "Condensation aur ESD risk", "Outside applicable ASHRAE class dew-point envelope"],
            ["Coolant supply temp (CDU secondary)", "IT equipment inlet spec compliance", "Above OEM max inlet spec → cooling inadequate"],
            ["Coolant return temp + ΔT", "Heat load calculation; system health", "At approximately constant flow and fluid properties, rising ΔT can indicate increased heat load; falling ΔT may indicate lower load or bypass/flow changes"],
            ["Coolant flow rate", "Adequate cooling delivery", "Below design spec → pump issue, blockage, or leak"],
            ["Coolant loop pressure", "Leak or blockage indicator", "Unexpected drop → investigate for leak"],
            ["Leak detection sensors", "Early warning — prevent damage", "Any trigger → immediate investigation required"],
            ["CDU pump status", "Cooling system health", "Alarm, abnormal current, vibration → switch to standby"],
            ["Training throughput (tokens/sec)", "Training efficiency; infrastructure health", "Below baseline → GPU throttling, network bottleneck, or I/O"],
            ["Network utilization (RoCEv2/NVLink)", "Collective comm bottleneck", "Sustained saturation → training slow; drops → link issues"],
            ["Storage I/O throughput", "Training data feed; checkpoint write speed", "Degraded → GPU starvation; checkpoint delays"],
            ["Inference latency (TTFT, TPS)", "Serving health; user experience", "Above SLO → investigate serving infrastructure"],
          ]}
        />
      </section>

      <section id="reliability">
        <h2 style={S.h2}>Reliability and RAS</h2>
        <p style={S.p}>
          RAS (Reliability, Availability, Serviceability) AI infrastructure ke liye critical hai — especially at Meta's scale.
        </p>
        <p style={S.p}><strong>Training reliability:</strong></p>
        <ul style={S.ul}>
          <li>Meta publicly ne document kiya hai ki 24K GPU cluster mein GPU failures common occurrences hain — scale pe hardware failure expected hai</li>
          <li>Automatic fault detection aur checkpoint-based restart mechanisms essential hain</li>
          <li>Meta publicly high GPU utilization (90%+ range documented) training ke liye mention kiya hai — fault tolerance mechanisms is efficiency achieve karne ke liye critical hain</li>
          <li>Proactive GPU health monitoring — failing GPUs identify karo before they cause job failure</li>
        </ul>
        <p style={S.p}><strong>Inference reliability:</strong></p>
        <ul style={S.ul}>
          <li>Geographic distribution — multiple data centers pe serving → single DC failure = service available</li>
          <li>Load balancing — failed nodes se traffic route away</li>
          <li>Redundant power aur cooling — N+1 ya higher for critical infrastructure</li>
          <li>Warm spare capacity — sudden traffic spikes handle karne ke liye</li>
        </ul>
        <p style={S.p}><strong>HBM ECC (Error Correcting Code):</strong> H100 GPUs HBM ECC rakhte hain — single-bit errors automatically correct hote hain. Multi-bit errors detected aur reported hote hain. HBM degradation monitor karo — increasing ECC errors failing HBM indicate karte hain.</p>
        <p style={S.p}><strong>Application-level reliability for Llama deployments:</strong></p>
        <ul style={S.ul}>
          <li>Retry logic with backoff for inference endpoints</li>
          <li>Circuit breaker pattern — repeated failures pe stop calling</li>
          <li>Health check endpoints aur load balancer integration</li>
          <li>Graceful shutdown — in-flight requests complete karo before maintenance</li>
        </ul>
      </section>

      <section id="failure-troubleshoot">
        <h2 style={S.h2}>Failure Scenarios and Troubleshooting</h2>
        <ComparisonTable
          headers={["Symptom", "Possible Cause", "Checks", "Corrective Action"]}
          rows={[
            [
              "GPU thermal throttling during training",
              "Cooling inadequate, high ambient, coolant supply temp high, high sustained load",
              "GPU junction temp (nvidia-smi dmon / nvidia-smi -q); coolant supply temp; flow rate; CDU status; rack inlet temp",
              "Verify cooling chain end-to-end: CDU operation, flow rate, facility water. Fix cooling root cause first. Training workload adjustment may be considered as temporary measure if hardware at risk — follow site procedures. Do not assume batch size reduction alone solves cooling issues."
            ],
            [
              "Training throughput drops significantly",
              "GPU throttling, network bottleneck, storage I/O, software/framework issue, GPU failure",
              "GPU utilization + clock speed (nvidia-smi); network utilization (RoCEv2 counters); storage I/O metrics; PyTorch profiler; GPU health logs",
              "Profile with PyTorch profiler to identify bottleneck layer (compute/network/storage). Single GPU issue → replace. Network saturation → investigate collective comm pattern. Storage → increase I/O capacity."
            ],
            [
              "High coolant supply temperature",
              "Chiller issue, facility water problem, CDU HX fouling, high ambient",
              "Chiller status + alarms; facility water supply temp; CDU HX condition; ambient temperature",
              "Switch to standby chiller if available; check cooling tower/dry cooler; schedule CDU HX inspection; reduce IT load temporarily if GPU temps critical."
            ],
            [
              "Low coolant flow rate",
              "Pump degradation, blockage, leak, valve issue",
              "CDU pump status; loop pressure differential; leak sensors; valve positions",
              "Switch to redundant pump; locate blockage or leak; verify valve open; do not operate below spec — GPU temps will rise."
            ],
            [
              "Leak detection alarm",
              "Fitting, pipe, manifold, CDU internal leak",
              "Which sensor triggered; CDU pressure; visual inspection",
              "Follow site-approved emergency procedure and OEM guidance immediately. General steps typically include: isolate affected section, close isolation valves. Locate leak source. Dry affected areas. Repair per OEM/site procedure. Pressure test before restart. Inspect electronics for moisture exposure before re-power. Incident documentation required."
            ],
            [
              "Abnormal coolant ΔT (high)",
              "Increased IT load, reduced flow, supply temperature drop",
              "Verify flow rate (Q = ṁCpΔT — if ṁ approximately constant, rising ΔT = more heat load; falling ΔT = less load or bypass). Check GPU utilization/power. Check supply temp.",
              "Rising ΔT at constant flow: verify cooling capacity adequate for increased load. Falling ΔT unexpectedly: check for bypass or utilization drop. Confirm flow measurement accuracy."
            ],
            [
              "GPU memory error (HBM ECC)",
              "HBM degradation, thermal damage, cosmic ray bit flip",
              "Supported ECC telemetry via nvidia-smi (e.g., nvidia-smi -q | grep -i ecc) or DCGM — check correctable/uncorrectable error counts; temperature history; workload context",
              "Single event ECC: may be benign, monitor closely. Persistent/increasing ECC errors: take GPU offline, investigate with OEM. Multi-bit uncorrectable: immediate investigation."
            ],
            [
              "Llama inference high latency",
              "Server overload, GPU throttling, network issue, model loading",
              "Inference server metrics; GPU temps + utilization; queue depth; network path",
              "Check GPU health and temps. Verify no throttling. Add serving capacity if overloaded. Check networking. Implement request queuing if needed."
            ],
            [
              "CDU / pump alarm",
              "Mechanical failure, power issue, control fault",
              "CDU controller logs; pump power supply; current draw; physical inspection",
              "Switch to standby pump; alert facilities/mechanical team; reduce IT load if no redundancy available."
            ],
            [
              "Training job failed / checkpoint corrupted",
              "Hardware failure during checkpoint write, storage issue, software bug",
              "Job logs; GPU health; storage health; verify last good checkpoint integrity",
              "Restore from last known good checkpoint. Verify storage health before restart. Replace failed hardware. Review logs to identify root cause."
            ],
          ]}
        />
      </section>

      <section id="enterprise">
        <h2 style={S.h2}>Enterprise and Deployment Considerations</h2>
        <p style={S.p}><strong>Llama deployment options for enterprises:</strong></p>
        <ul style={S.ul}>
          <li><strong>On-premise GPU servers:</strong> Download Llama weights → deploy on organization's own NVIDIA/AMD GPU hardware. Inference data controlled environment mein rehta hai depending on architecture — compliance is not automatic aur additional controls required hain. CapEx-heavy. Regulated industries ke ek viable path hai — due diligence required.</li>
          <li><strong>Private cloud:</strong> Dedicated GPU VMs in customer's cloud VPC. AWS EC2 P5 (H100), Google A3 (H100), Azure NDv5 (H100) — Llama supports these. Data handling depends on cloud provider configuration aur customer controls.</li>
          <li><strong>Managed Llama hosting:</strong> Together.ai, Fireworks.ai, Replicate, AWS Bedrock (Llama available), Azure AI Foundry (Llama available), Google Vertex AI (Llama available) — managed inference, pay per token, yeh providers ke servers pe run hota hai.</li>
          <li><strong>Edge/device:</strong> Quantized Llama (GGUF via llama.cpp) edge servers ya powerful desktop machines pe. Ollama tool easily Llama run karta hai consumer hardware pe.</li>
        </ul>
        <ComparisonTable
          title="Llama Deployment Options Comparison"
          headers={["Option", "Data Control", "Cost Model", "Best For"]}
          rows={[
            ["On-premise GPU servers", "Inference data stays within controlled facility — but integrations/logging can introduce external data flows; architecture review required", "CapEx (hardware) + OpEx (power, cooling, staff) — shifts to operator", "Regulated industries, sensitive workloads — compliance not automatic"],
            ["Private cloud VMs", "Data stays in customer VPC — but cloud provider infrastructure; compliance depends on provider configuration and customer controls", "OpEx (VM rental) — hourly billing", "Cloud-native orgs, flexible scale — verify compliance scope with provider"],
            ["Managed Llama API", "Provider's servers — check their data policies", "Pay per token — no infrastructure management", "Startups, prototyping, variable workloads"],
            ["Edge/quantized", "Complete — device-local", "CapEx (hardware) + low OpEx", "Low-power edge, offline scenarios, consumer devices"],
          ]}
        />
      </section>

      <section id="privacy-security">
        <h2 style={S.h2}>Privacy and Security</h2>
        <p style={S.p}><strong>Consumer Meta AI (meta.ai, Facebook/Instagram/WhatsApp):</strong> Conversations Meta ke servers pe process hoti hain. Meta ki privacy policy apply hoti hai — verify current terms at <a href="https://meta.ai/privacy" style={{ color: "#2563eb" }}>meta.ai/privacy</a>. Training/retention policies current Meta AI terms se verify karo — policies product, region aur configuration ke anusaar vary kar sakti hain.</p>
        <p style={S.p}><strong>Llama open-weight deployment privacy:</strong></p>
        <ul style={S.ul}>
          <li>Supported on-premise deployment configurations mein inference data aapke controlled environment mein rehta hai — exact boundary architecture aur integrations pe depend karti hai</li>
          <li>Third-party API pe inference data send nahi hota (direct Llama self-hosting mein) — lekin logging, monitoring, aur other integrations data flows introduce kar sakte hain</li>
          <li>Fine-tuning data apne infrastructure pe rehta hai — proprietary training data exposure avoid hoti hai</li>
          <li>HIPAA, GDPR, financial regulations — on-premise deployment compliance easier nahi karta automatically. Data controls better hote hain lekin additional technical/organisational controls aur documented processes required hain regulatory compliance ke liye.</li>
        </ul>
        <p style={S.p}><strong>Llama license:</strong> Llama models Meta ke applicable license terms ke under distributed hain — restrictions model/version ke anusaar vary karti hain aur current license se verify karni chahiye. Current license: <a href="https://llama.meta.com" style={{ color: "#2563eb" }}>llama.meta.com</a> — always latest terms verify karo before deployment.</p>
        <p style={S.p}><strong>Security for Llama deployments:</strong></p>
        <ul style={S.ul}>
          <li>Model weights secure karo — unauthorized access ya leakage prevent karo</li>
          <li>Inference endpoints access control — authentication aur authorization</li>
          <li>Prompt injection risks — user input validate karo</li>
          <li>Fine-tuned models proprietary data encode kar sakte hain — protect karo</li>
          <li>GPU servers physical aur network security — standard data center practices</li>
        </ul>
      </section>

      <section id="dc-perspective">
        <h2 style={S.h2}>Practical Data Center and O&M Perspective</h2>
        <p style={S.p}>
          Meta AI infrastructure data center industry ke liye important lessons aur implications rakhti hai.
        </p>
        <p style={S.p}><strong>Open hardware contributions:</strong> Meta OCP ke through Grand Teton, OpenRack, aur other designs openly share karta hai. Data center engineers ke liye: Meta-developed designs publicly available hain — industry mein widely adopted ho rahe hain. OCP community se designs incorporate karne wali facilities meta-scale learnings benefit uthaa sakti hain.</p>
        <p style={S.p}><strong>Dual-fabric strategy at scale:</strong> Meta ne dono RoCEv2 aur InfiniBand clusters deploy kiye hain — is scale pe dono viable hain with proper engineering. RoCEv2 ke liye lossless fabric (PFC+ECN), purpose-built topology aur congestion management essential hain — ordinary Ethernet se fundamentally alag hai. InfiniBand purpose-built HPC fabric hai with its own characteristics. Data center engineers ke liye: fabric choice workload, cost, ecosystem aur operational factors pe depend karta hai — blanket claims avoid karo.</p>
        <p style={S.p}><strong>Heterogeneous compute management:</strong> NVIDIA + AMD + custom silicon simultaneously — complex management challenge hai. O&M teams multiple driver stacks, monitoring tools, aur operational procedures maintain karte hain. PyTorch ka cross-platform support yeh partially simplify karta hai lekin operational complexity real hai.</p>
        <p style={S.p}><strong>Open-weight AI = distributed infrastructure:</strong> Llama ki open nature ka matlab hai ki AI inference increasingly everywhere run karta hai — hyperscale data centers se leke enterprise on-premise servers se leke edge devices tak. Data center industry ke liye: AI workloads more diverse aur distributed honge. Single large provider ke servers ki jagah distributed footprint.</p>
        <p style={S.p}><strong>Power trends:</strong> Grand Teton class servers H100 GPUs ke saath enormous power draw karte hain. Meta's sustainability reports (~energy consumption, water usage, renewable energy) publicly available hain — industry benchmarks provide karte hain. Meta ne net-zero commitments kiye hain — AI energy efficiency improvements continuing research area hai.</p>
      </section>

      <section id="references">
        <h2 style={S.h2}>Technical References</h2>
        <ul style={S.ul}>
          <li>
            <strong>Meta AI Research</strong><br />
            Publisher: Meta<br />
            Covers: FAIR research, Llama papers, technical publications<br />
            <a href="https://ai.meta.com/research/" style={{ color: "#2563eb" }}>ai.meta.com/research/</a>
          </li>
          <li>
            <strong>Meta Engineering Blog</strong><br />
            Publisher: Meta<br />
            Covers: Infrastructure, AI clusters, MTIA, Grand Teton, training details<br />
            <a href="https://engineering.fb.com" style={{ color: "#2563eb" }}>engineering.fb.com</a>
          </li>
          <li>
            <strong>Llama Official Website</strong><br />
            Publisher: Meta<br />
            Covers: Current Llama models, download, license, documentation<br />
            <a href="https://llama.meta.com" style={{ color: "#2563eb" }}>llama.meta.com</a>
          </li>
          <li>
            <strong>The Llama 3 Herd of Models (Technical Paper)</strong><br />
            Publisher: Meta AI<br />
            Covers: Llama 3 architecture, training data, infrastructure details<br />
            <a href="https://arxiv.org/abs/2407.21783" style={{ color: "#2563eb" }}>arxiv.org/abs/2407.21783</a>
          </li>
          <li>
            <strong>Meta's MTIA — Engineering Blog</strong><br />
            Publisher: Meta<br />
            Covers: MTIA v1, v2 design, inference acceleration, chip details<br />
            <a href="https://engineering.fb.com/2023/05/18/production-engineering/meta-training-inference-accelerator-meta-ai/" style={{ color: "#2563eb" }}>engineering.fb.com — MTIA article</a>
          </li>
          <li>
            <strong>Open Compute Project — Grand Teton</strong><br />
            Publisher: OCP<br />
            Covers: Grand Teton GPU server design, OpenRack specifications<br />
            <a href="https://www.opencompute.org" style={{ color: "#2563eb" }}>opencompute.org</a>
          </li>
          <li>
            <strong>Meta Sustainability Report</strong><br />
            Publisher: Meta<br />
            Covers: Data center PUE, water usage, renewable energy, environmental impact<br />
            <a href="https://sustainability.fb.com" style={{ color: "#2563eb" }}>sustainability.fb.com</a>
          </li>
          <li>
            <strong>PyTorch Documentation</strong><br />
            Publisher: PyTorch / Meta<br />
            Covers: FSDP, distributed training, GPU support<br />
            <a href="https://pytorch.org/docs" style={{ color: "#2563eb" }}>pytorch.org/docs</a>
          </li>
          <li>
            <strong>Meta MTIA — Next Generation of Custom Silicon for Inference</strong><br />
            Publisher: Meta Engineering<br />
            Covers: MTIA v2/200 details, inference acceleration, chip design<br />
            <a href="https://engineering.fb.com/2024/05/09/production-engineering/next-generation-meta-training-inference-accelerator-mtia/" style={{ color: "#2563eb" }}>engineering.fb.com — MTIA next generation</a>
          </li>
          <li>
            <strong>Meta AI Infrastructure — Tectonic, BLOB storage (Meta Engineering Blog)</strong><br />
            Publisher: Meta Engineering<br />
            Covers: Tectonic distributed filesystem, BLOB storage, AI training storage architecture<br />
            <a href="https://engineering.fb.com" style={{ color: "#2563eb" }}>engineering.fb.com</a>
          </li>
          <li>
            <strong>NVIDIA H100 SXM Datasheet</strong><br />
            Publisher: NVIDIA<br />
            Covers: H100 SXM specs — 80 GB HBM3, 900 GB/s NVLink bandwidth, ~700W TDP<br />
            <a href="https://www.nvidia.com/en-us/data-center/h100/" style={{ color: "#2563eb" }}>nvidia.com/en-us/data-center/h100/</a>
          </li>
          <li>
            <strong>Meta Muse — AI Model Powering Meta AI</strong><br />
            Publisher: Meta<br />
            Covers: Muse Spark and Muse Image models powering Meta AI assistant<br />
            <a href="https://ai.meta.com" style={{ color: "#2563eb" }}>ai.meta.com</a>
          </li>
        </ul>
      </section>

      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Meta AI = Consumer AI + Open-Weight AI ecosystem:</strong> Meta AI assistant (Muse Spark powered) aur Llama open-weight models two distinct things hain. Llama enterprises ko on-premise AI deployment enable karta hai — inference data controlled environment mein reh sakta hai architecture-dependent. Compliance automatic nahi hoti — additional controls required hain.</li>
          <li><strong>Meta ka compute strategy intentionally heterogeneous hai:</strong> publicly documented examples include NVIDIA and AMD accelerator use for training workloads, while MTIA targets R&R and GenAI workloads. Exact current workload-to-hardware assignments are not fully publicly disclosed. Yeh approach vendor diversification, workload fit, aur reduced single-vendor dependence support kar sakta hai.</li>
          <li><strong>MTIA scope expand ho raha hai:</strong> MTIA 300 R&R training mein production mein hai; MTIA 400 deployment underway with 72-accelerator scale-up and AALC support; 450/500 future roadmap. Hundreds of thousands deployed. GenAI workloads bhi cover ho rahe hain. Large Llama foundation model training primarily NVIDIA GPU clusters pe continue karta hai.</li>
          <li><strong>Meta ne TWO 24K H100 clusters document kiye hain — ek RoCEv2, ek InfiniBand:</strong> Dono 24,576 H100 GPUs, dono 400Gbps endpoints — fabric technology alag. Largest Llama model RoCEv2 cluster pe trained tha. Prometheus (~1 GW underway), Hyperion (up to ~5 GW, 2028 timeframe) publicly stated hain. Exact GPU counts not disclosed.</li>
          <li><strong>Dual-fabric approach = both RoCEv2 and InfiniBand viable at 24K scale:</strong> Meta ne dono deploy kiye hain. RoCEv2 ordinary Ethernet nahi hai — RDMA with PFC/ECN congestion management required hai lossless fabric ke liye. InfiniBand purpose-built HPC fabric hai. Both valid choices with different tradeoffs — context-specific decision.</li>
          <li><strong>Grand Teton + OCP = open hardware ecosystem:</strong> Meta apna GPU server design publicly share karta hai. Data center engineers OCP resources se Meta's learnings directly benefit kar sakte hain without trade secrets.</li>
          <li><strong>Llama inference infrastructure choices alag ho sakte hain training se:</strong> Training ke liye Meta ne large NVIDIA GPU clusters publicly document kiye hain. Inference architectures can use heterogeneous accelerators and CPUs depending on workload; exact current hardware assignments are not fully publicly disclosed. Different hardware, networking aur operational requirements ho sakte hain.</li>
          <li><strong>High-density GPU racks serious thermal challenges present karte hain:</strong> Grand Teton class H100 servers enormous heat generate karte hain. Liquid cooling increasingly necessary at high rack densities. CDU chain (facility → CDU → secondary loop → cold plates) understand karna O&M engineers ke liye essential hai.</li>
          <li><strong>Llama enterprise deployment = data stays within controlled environment (architecture-dependent):</strong> On-premise Llama deployment inference data aapke control mein rakhta hai depending on architecture/integrations. HIPAA/GDPR compliance automatically achieved nahi hoti — additional controls required. License terms model/version-specific hain — always current terms verify karo.</li>
          <li><strong>Meta-scale reliability engineering = lessons for everyone:</strong> 24K GPU pe hardware failures expected hain — fault tolerance engineering critical hai. Automatic checkpoint/restart, proactive health monitoring, aur graceful degradation patterns — yeh lessons smaller deployments ke liye bhi applicable hain.</li>
        </ul>
      </section>

    </article>
  );
}
