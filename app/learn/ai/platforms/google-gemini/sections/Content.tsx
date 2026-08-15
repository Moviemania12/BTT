"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { googleGeminiContent } from "@/content/google-gemini";

import TpuArchitectureDiagram from "../svg/TpuArchitectureDiagram";
import GeminiAccessPaths from "../svg/GeminiAccessPaths";

void googleGeminiContent;

export default function Content() {
  return (
    <article>

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Google Gemini Google DeepMind ka flagship AI model family hai — <TopicLink slug="openai" variant="inline" /> aur <TopicLink slug="anthropic" variant="inline" /> se fundamentally alag kyunki Google apna khud ka AI hardware design karta hai. <TopicLink slug="tpu" variant="inline" /> (Tensor Processing Units) Google ka purpose-built accelerator hai jo training aur inference dono ke liye use hota hai.
        </p>
        <p style={S.p}>
          Is article mein hum Gemini ko infrastructure lens se dekhenge: models, access paths, TPU architecture, training vs inference, data center power aur cooling requirements, aur practical O&M perspective.
        </p>
        <Callout type="important" title="Accuracy Note — Official Sources Only">
          Google ke internal infrastructure details publicly fully disclosed nahi hain. Is article mein sirf officially documented ya publicly verified information use ki gayi hai. Specific TPU counts, exact data center locations, ya internal serving topology — jo officially confirm nahi hain — invent nahi kiye gaye hain. Exact production infrastructure details are not publicly disclosed.
        </Callout>
      </section>

      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Google TPU infrastructure ka perspective, AI DC power/cooling implications</li>
          <li><strong>AI Infrastructure Engineers:</strong> Gemini platform, TPU architecture, training vs inference</li>
          <li><strong>Enterprise IT Teams:</strong> Vertex AI vs Gemini API — deployment aur compliance decisions</li>
          <li><strong>O&M Engineers:</strong> High-density AI racks, cooling management, troubleshooting</li>
          <li><strong>Students aur Beginners:</strong> AI platforms ka infrastructure perspective — zero se samjhenge</li>
        </ul>
      </section>

      <section id="what-is-gemini">
        <h2 style={S.h2}>What Is Google Gemini?</h2>
        <p style={S.p}>
          Google Gemini Google DeepMind ka flagship multimodal AI model family hai — December 2023 mein initially announced, continuously updated. "Multimodal" ka matlab: text, images, audio, video, aur code — sab ek hi model mein natively process kar sakta hai.
        </p>
        <p style={S.p}>
          Google Bard ko rename karke Gemini kiya gaya (February 2024 mein). Gemini sirf ek consumer chatbot nahi hai — yeh Google ke product ecosystem mein deeply integrated hai: Google Search, Gmail, Google Docs, Android, Chrome, aur Google Cloud sab Gemini capabilities use karte hain.
        </p>
        <p style={S.p}><strong>Infrastructure perspective se Google Gemini unique hai kyunki:</strong></p>
        <ul style={S.ul}>
          <li>Google apna custom TPU architecture design karta hai aur Google infrastructure aur Google Cloud ke through deploy karta hai</li>
          <li>Google apna training framework (JAX/XLA) khud develop karta hai</li>
          <li>Google ke apne global data centers mein run karta hai — other major AI providers different combinations of owned, partner aur cloud infrastructure use karte hain</li>
          <li>Consumer scale (large-scale Search aur product queries) aur API scale dono simultaneously serve karta hai</li>
        </ul>
        <Callout type="important" title="Google DeepMind = Research + Product">
          Google Brain aur DeepMind ko 2023 mein merge karke Google DeepMind bana. Gemini Google DeepMind ka primary frontier AI model initiative hai. Yeh Google Research se alag hai — Google DeepMind specifically AI products develop karta hai.
        </Callout>
      </section>

      <section id="model-family">
        <h2 style={S.h2}>Gemini Model Family</h2>
        <p style={S.p}>
          Gemini model family tiered approach use karti hai — different capability, speed, aur cost tradeoffs ke saath. Model versions rapidly evolve karte hain — always official documentation se current lineup verify karo.
        </p>
        <ComparisonTable
          title="Gemini Model Tiers — Category Overview (verify current models at ai.google.dev/gemini-api/docs/models)"
          headers={["Tier / Category", "Characteristics", "Typical Use", "Infrastructure Note"]}
          rows={[
            ["Gemini (flagship/largest)", "Highest capability — most capable generation", "Complex reasoning, difficult tasks, research", "Most compute per request — highest latency/cost"],
            ["Gemini Pro variants", "Balanced — production workhorse", "General tasks, applications, APIs", "Production inference — balance of speed and quality"],
            ["Gemini Flash variants", "Fast, efficient — cost optimized", "High-volume, latency-sensitive applications", "Lower compute per request — faster inference"],
            ["Gemini Nano / on-device", "Very small — on-device deployment", "Mobile/edge inference (Pixel phones, etc.)", "Supported on-device inference can run locally; exact behavior depends on device, feature and implementation"],
          ]}
        />
        <Callout type="warning" title="Model Lineup Rapidly Evolves — Verify Current Models">
          Gemini 1.0, 1.5, 2.0, 2.5, aur beyond — Google regular cadence pe new versions release karta hai. Historical model tiers (Ultra, Pro, Flash, Nano) ek conceptual framework hain — current available models aur their exact names, context windows, aur capabilities official documentation se verify karo: <a href="https://ai.google.dev/gemini-api/docs/models/gemini" style={{ color: "#2563eb" }}>ai.google.dev/gemini-api/docs/models/gemini</a>
        </Callout>
        <p style={S.p}><strong>Gemini 1.5 Pro — historical example:</strong> Long context window (up to 1 million tokens in certain configurations) ek significant engineering achievement tha jo publicly documented hai. Yeh current model capabilities ka indicator nahi hai — current context window specifications official documentation se verify karo. Infrastructure implication: Very long context mein KV cache enormous ho jaata hai — substantial accelerator memory per active session required.</p>
      </section>

      <section id="ai-studio">
        <h2 style={S.h2}>Gemini API and Google AI Studio</h2>
        <Figure caption="Gemini Access Paths: Four ways to access Gemini — AI Studio (prototyping), Gemini API direct (production apps), Vertex AI (enterprise), Google Products (built-in). All paths reach Gemini inference on Google's TPU/accelerator infrastructure. Compliance features and data handling vary by path — verify current scope at official documentation.">
          <GeminiAccessPaths />
        </Figure>
        <p style={S.p}><strong>Google AI Studio</strong> ek web-based development environment hai — browser mein directly Gemini models ke saath experiment karo. Prompt design, model parameter tuning, aur quick prototyping ke liye ideal. Free tier generous hai. AI Studio se directly API keys generate karo production use ke liye.</p>
        <p style={S.p}><strong>Gemini API</strong> programmatic access hai — REST ya client libraries (Python, JavaScript, etc.) se. Pay per token model. Infrastructure design ke liye key parameters:</p>
        <ul style={S.ul}>
          <li><strong>Input/output tokens:</strong> Billing aur latency dono token count pe depend karte hain</li>
          <li><strong>Context window:</strong> Maximum tokens (input + output) per request — model-dependent, verify at official docs</li>
          <li><strong>Rate limits:</strong> RPM (Requests Per Minute), TPM (Tokens Per Minute) — tier-based. Current limits: <a href="https://ai.google.dev/gemini-api/docs/rate-limits" style={{ color: "#2563eb" }}>ai.google.dev/gemini-api/docs/rate-limits</a></li>
          <li><strong>Streaming:</strong> Server-sent events se token-by-token streaming — better perceived TTFT</li>
          <li><strong>Multimodal inputs:</strong> Images, audio, video alongside text — infrastructure pe larger payloads</li>
        </ul>
        <Callout type="best-practice" title="AI Studio → API → Vertex AI — Common Development Path">
          Ek common development progression: Prototype AI Studio mein → API key generate karo → direct Gemini API se production app build karo → enterprise scale ya compliance requirements pe Vertex AI evaluate karo. Exact path project requirements pe depend karta hai.
        </Callout>
      </section>

      <section id="vertex-ai">
        <h2 style={S.h2}>Gemini on Google Cloud Vertex AI</h2>
        <p style={S.p}>
          Vertex AI Google Cloud ka managed ML platform hai — enterprise-grade Gemini deployment ke liye. Yeh wahi role play karta hai jo Azure OpenAI Service ya Amazon Bedrock play karte hain unke respective AI models ke liye.
        </p>
        <ComparisonTable
          title="Gemini API Direct vs Vertex AI"
          headers={["Factor", "Gemini API (ai.google.dev)", "Vertex AI (Google Cloud)"]}
          rows={[
            ["Access", "Google AI developer platform", "Google Cloud project + service account"],
            ["Billing", "Google AI billing (pay per token)", "Google Cloud billing (per token + infrastructure)"],
            ["Data location", "Google-managed — verify current policy", "Supported Google Cloud region/configuration, subject to model availability and current data-residency/ML-processing controls — verify at cloud.google.com/vertex-ai"],
            ["Compliance", "Verify current scope at ai.google.dev", "Google Cloud compliance certifications — verify current scope at cloud.google.com"],
            ["Networking", "Internet access", "VPC Service Controls, Private Service Connect available"],
            ["Identity", "API key", "Cloud IAM — unified with GCP identity"],
            ["Model versions", "Latest — often first", "Managed versions — stability over bleeding edge"],
            ["MLOps", "API only", "Full MLOps: model registry, pipelines, monitoring, evaluation"],
            ["SLA", "Verify current terms", "Vertex AI SLA — verify current at cloud.google.com"],
            ["Best for", "Developers, startups, rapid iteration", "Enterprise, regulated industries, GCP-native orgs"],
          ]}
        />
        <Callout type="important" title="Cloud Platform ≠ Google-Owned Gemini Infrastructure">
          Vertex AI pe Gemini access karna yeh confirm nahi karta ki Google ka Gemini-specific infrastructure specifically us region mein hai. Vertex AI Google Cloud infrastructure pe run karta hai — exact Gemini model serving topology publicly disclosed nahi hai. Data residency options Vertex AI configuration se control hoti hain — verify current scope at official docs.
        </Callout>
      </section>

      <section id="google-infra-overview">
        <h2 style={S.h2}>Google AI Infrastructure Overview</h2>
        <p style={S.p}>
          Google ki AI infrastructure fundamentally alag hai OpenAI ya Anthropic se — kyunki Google hardware-to-software stack khud control karta hai.
        </p>
        <p style={S.p}><strong>Google ka vertical integration:</strong></p>
        <ul style={S.ul}>
          <li><strong>Hardware:</strong> Custom TPUs (Tensor Processing Units) — Google apna custom TPU architecture design karta hai aur Google infrastructure aur Google Cloud ke through deploy karta hai</li>
          <li><strong>Interconnect:</strong> ICI (Inter-Chip Interconnect) — TPUs ke beech custom high-speed network</li>
          <li><strong>Software/Framework:</strong> JAX aur XLA compiler — TPUs ke saath tightly integrated; supported frameworks TPU generation aur current Google Cloud support pe depend karte hain</li>
          <li><strong>Distributed training:</strong> Pathways system — publicly described architecture jo multiple accelerator types/datacenters coordinate kar sakta hai. Exact role in current Gemini training pipelines publicly confirmed nahi hai.</li>
          <li><strong>Storage:</strong> Colossus distributed file system — Google-scale publicly described technology. Exact role in current Gemini training/checkpoint pipelines publicly confirmed nahi hai.</li>
          <li><strong>Data centers:</strong> Global network — Google ke owned aur operated facilities</li>
        </ul>
        <p style={S.p}>
          Google ka highly vertically integrated AI infrastructure stack hai — custom accelerators (TPUs), networking (ICI, Jupiter), aur software (JAX/XLA) sab in-house developed hain. Hardware-software co-optimization is integration ki wajah se possible hoti hai. Other major AI providers different combinations of owned, partner aur cloud infrastructure use karte hain — har provider ka approach alag hai.
        </p>
        <Callout type="important" title="Exact Production Details Not Disclosed">
          Gemini training clusters ka exact scale, specific TPU generations used for specific Gemini versions, per-facility power consumption — yeh sab publicly confirmed nahi hain. Google high-level architecture publicly describes karta hai lekin production specifics proprietary hain.
        </Callout>
      </section>

      <section id="tpu-architecture">
        <h2 style={S.h2}>TPU Architecture</h2>
        <p style={S.p}>
          TPU (Tensor Processing Unit) Google ka purpose-built AI accelerator hai. NVIDIA GPU se fundamentally alag approach hai — TPU specifically neural network matrix operations ke liye optimized hai.
        </p>
        <Figure caption="TPU Architecture Conceptual Overview: MXUs (Matrix Multiply Units) use systolic array architecture for efficient matrix operations. HBM (High Bandwidth Memory) feeds weights and activations to MXUs. On-chip SRAM handles intermediate results. XLA and supported framework tooling compile workloads for TPU execution; framework support depends on TPU generation and current Google Cloud documentation. ICI network connects to other TPU chips in the pod. Host CPU manages orchestration. This is a generalized educational diagram — exact Google TPU implementation is not publicly fully disclosed.">
          <TpuArchitectureDiagram />
        </Figure>
        <p style={S.p}><strong>Systolic Array Architecture:</strong> TPU ka core innovation hai systolic array — ek grid of processing elements jo data rhythmically flow karte hain ek element se doosre tak. Matrix multiplication ke liye ideal: partial products accumulate karte jaate hain jaise data flow karta hai. Very high compute efficiency for matrix operations, low control overhead.</p>
        <p style={S.p}><strong>Key components (publicly described at high level):</strong></p>
        <ul style={S.ul}>
          <li><strong>MXU (Matrix Multiply Unit):</strong> Core compute engine — systolic array based matrix multiplication</li>
          <li><strong>HBM (High Bandwidth Memory):</strong> High-speed stacked DRAM — model weights aur activations store karta hai</li>
          <li><strong>Vector/Scalar Units:</strong> Non-matrix operations (activation functions, normalization, etc.) ke liye</li>
          <li><strong>XLA (Accelerated Linear Algebra) Compiler:</strong> XLA aur supported framework tooling workloads ko TPU execution ke liye compile karte hain; framework support TPU generation aur current Google Cloud documentation pe depend karta hai</li>
          <li><strong>ICI (Inter-Chip Interconnect):</strong> Multiple TPU chips ko pod mein connect karta hai</li>
        </ul>
      </section>

      <section id="tpu-generations">
        <h2 style={S.h2}>TPU Generations and Evolution</h2>
        <p style={S.p}>
          Google TPUs multiple generations mein evolve kiye hain — publicly announced:
        </p>
        <ComparisonTable
          title="Google TPU Generations — Publicly Documented Overview"
          headers={["Generation", "Public Availability", "Notable Characteristic", "Key Update"]}
          rows={[
            ["TPU v1", "2016 (internal), 2017 announced", "Inference only, 8-bit integer", "First dedicated AI accelerator by Google"],
            ["TPU v2", "Cloud available 2018", "Training + inference, 16-bit float, HBM", "Introduced pods; publicly available on GCP"],
            ["TPU v3", "Cloud 2019", "More HBM, liquid-cooled (documented)", "Higher performance, liquid cooling for thermal management"],
            ["TPU v4", "Cloud 2022", "4x v3 performance, optical interconnect in pods", "Optical circuit switching in pod — publicly documented; Gemini 1.0 training documented here"],
            ["TPU v5e / v5p", "Cloud 2023+", "Training and inference optimized variants", "v5e cost-efficient inference; v5p highest training performance; Gemini 1.0 use publicly referenced"],
            ["TPU v6e (Trillium)", "GA announced 2024+", "Next-gen efficiency — 4.7x compute per chip vs v5e per Google announcement", "Publicly GA — verify current availability at cloud.google.com/tpu"],
            ["TPU v7x (Ironwood)", "GA — verify current status", "High-bandwidth ICI, large HBM per chip per Google announcements", "Verify current GA status and specs at cloud.google.com/tpu"],
            ["TPU v8t / v8i", "Announced — verify current status", "v8t for training; v8i for inference/post-training (per Google announcements)", "Announced capacity — verify current availability at cloud.google.com/tpu"],
          ]}
        />
        <Callout type="important" title="Gemini + TPU Generation — What Is Publicly Documented">
          Gemini 1.0 ka TPU v4 aur v5e pe training publicly documented hai (Google technical reports aur announcements). Selected later Gemini versions ke liye TPU usage bhi publicly discussed hai. Lekin complete current model→TPU mapping publicly disclosed nahi hai — exact production configurations proprietary hain. Official Google Cloud documentation pe current available TPU versions verify karo: <a href="https://cloud.google.com/tpu/docs/supported-tpu-configurations" style={{ color: "#2563eb" }}>cloud.google.com/tpu/docs</a>
        </Callout>
      </section>

      <section id="hbm">
        <h2 style={S.h2}>HBM — High Bandwidth Memory</h2>
        <p style={S.p}>
          HBM (High Bandwidth Memory) AI accelerators mein ek critical component hai — conventional DDR/LPDDR se substantially different memory architecture use karta hai.
        </p>
        <p style={S.p}><strong>How HBM works:</strong> Multiple DRAM dies vertically stack ki jaati hain — through-silicon vias (TSVs) se interconnected. Wide data bus (1024-bit ya wider) ke through accelerator se connected. Result: very high memory bandwidth at relatively lower power vs conventional memory.</p>
        <p style={S.p}><strong>Why HBM matters for AI:</strong></p>
        <ul style={S.ul}>
          <li><strong>Bandwidth bottleneck:</strong> AI training aur inference mein compute units constantly memory se data fetch karte hain — model weights, activations, gradients. Agar bandwidth insufficient ho, fast compute units idle wait karte hain.</li>
          <li><strong>Model size:</strong> Large frontier models ke weights billions of parameters hote hain — HBM capacity directly determines maximum model size per accelerator chip.</li>
          <li><strong>Speed:</strong> Prefill phase mein (LLM inference mein input processing) memory bandwidth dominant factor hai.</li>
        </ul>
        <p style={S.p}><strong>HBM generations:</strong> HBM2, HBM2e, HBM3, HBM3e — increasing bandwidth aur capacity per generation. Google TPUs mein HBM use hoti hai — specific HBM versions per TPU generation Google ke public technical specs mein documented hain.</p>
        <p style={S.p}><strong>Data center implication:</strong> HBM high heat density create karti hai — AI accelerators thermal management critical hai. HBM ka thermal performance directly accelerator reliability aur performance affect karta hai.</p>
      </section>

      <section id="tpu-interconnect">
        <h2 style={S.h2}>TPU Interconnect and ICI</h2>
        <p style={S.p}>
          Large-scale AI training ke liye multiple accelerators coordinate karne hote hain — high-speed interconnect essential hai.
        </p>
        <p style={S.p}><strong>ICI (Inter-Chip Interconnect):</strong> Google ka purpose-built TPU-to-TPU communication fabric. Standard Ethernet ya InfiniBand se different — specifically TPU pods ke liye designed. Very high bandwidth, low latency chip-to-chip communication. <TopicLink slug="ai-networking" variant="inline" /> article mein general AI networking concepts covered hain.</p>
        <p style={S.p}><strong>TPU v4 optical switching:</strong> Publicly documented — TPU v4 pods mein Google ne optical circuit switching use kiya interconnect ke liye. Yeh reconfigurable topology allow karta hai — different communication patterns ke liye optimal paths dynamically set kar sakte hain. Data center perspective: optical components fiber aur optical transceivers require karte hain — maintenance, cleaning, aur optical power monitoring different hoti hai electrical interconnects se.</p>
        <p style={S.p}><strong>Collective operations:</strong> Training mein AllReduce, AllGather — sab TPUs gradients synchronize karte hain har step pe. ICI bandwidth directly training throughput determine karta hai. <TopicLink slug="ai-networking" variant="inline" /></p>
      </section>

      <section id="tpu-pods">
        <h2 style={S.h2}>TPU Pods and Scaling</h2>
        <p style={S.p}>
          TPU Pod multiple TPU chips ko high-speed ICI network ke through connect karke ek logical distributed accelerator banata hai.
        </p>
        <p style={S.p}><strong>Why pods:</strong> Frontier-scale training generally distributed across many accelerator chips hoti hai — model, memory aur compute requirements ek single accelerator ki practical capacity exceed karte hain. Pod mein distributed accelerator memory collectively large models accommodate kar sakti hai.</p>
        <p style={S.p}><strong>Pod slices:</strong> Large pods ko smaller "slices" mein partition kar sakte hain — different jobs ko different slices allocate hoti hain. Google Cloud pe yeh publicly documented feature hai — users specific pod slice configurations order kar sakte hain.</p>
        <p style={S.p}><strong>Data center implications of TPU pods:</strong></p>
        <ul style={S.ul}>
          <li><strong>Physical proximity:</strong> Pod ke chips ek specific rack/row/section mein physically close hote hain — interconnect latency aur bandwidth ke liye</li>
          <li><strong>Power:</strong> Ek large TPU pod ka total power consumption enormous hota hai — dedicated power infrastructure required</li>
          <li><strong>Cooling:</strong> High density power = high density heat — specialized cooling (per TPU v3 documentation, liquid cooling used)</li>
          <li><strong>Failure domains:</strong> Pod mein kisi bhi chip ya interconnect link failure training job affect kar sakta hai — redundancy aur fault tolerance design critical hai</li>
        </ul>
        <Callout type="important" title="Pod Scale — Official Google Cloud Numbers">
          Google Cloud publicly available TPU pod configurations (v4 pods up to 4096 chips publicly mentioned) verify karo current Google Cloud documentation pe: <a href="https://cloud.google.com/tpu/docs/system-architecture-tpu-vm" style={{ color: "#2563eb" }}>cloud.google.com/tpu/docs/system-architecture-tpu-vm</a>
        </Callout>
      </section>

      <section id="tpu-vs-gpu">
        <h2 style={S.h2}>TPU vs GPU — Data Center Perspective</h2>
        <ComparisonTable
          title="TPU vs NVIDIA GPU — Data Center and Infrastructure Perspective"
          headers={["Factor", "Google TPU", "NVIDIA GPU"]}
          rows={[
            ["Design purpose", "Purpose-built for AI matrix operations (systolic array)", "General-purpose parallel compute — AI as primary use case now"],
            ["Ecosystem", "Google-proprietary — JAX/XLA, TensorFlow", "Open ecosystem — PyTorch, TensorFlow, CUDA"],
            ["Availability", "Google Cloud (TPU VMs) — not sold separately", "Available from multiple cloud providers + on-premise"],
            ["Interconnect", "Google ICI — custom, high-bandwidth, pod-scale", "NVLink (intra-node), InfiniBand/Ethernet (inter-node)"],
            ["Framework integration", "JAX/XLA tightly optimized for TPUs", "PyTorch/CUDA most mature — broad ecosystem"],
            ["Inference optimization", "Specific TPU variants (v5e) for inference", "TensorRT, quantization tools mature"],
            ["On-premise option", "No — Cloud-only access", "Yes — DGX systems, HGX, etc."],
            ["Cost model", "Cloud rental only", "Cloud rental OR capital purchase"],
            ["Data center control", "Google manages physical infrastructure", "Customer can own/operate GPU hardware"],
          ]}
        />
        <p style={S.p}>
          Practical implication for enterprises: Gemini on TPUs exclusively through Google Cloud. On-premise Gemini deployment possible nahi hai — unlike some open-source alternatives. This is a fundamental difference from NVIDIA GPU-based AI infrastructure where organizations can own hardware.
        </p>
      </section>

      <section id="training-infra">
        <h2 style={S.h2}>Gemini Training Infrastructure</h2>
        <p style={S.p}>
          Gemini jaise frontier models train karna unprecedented compute scale require karta hai. Google ne publicly kuch details share kiye hain technical papers aur blog posts mein.
        </p>
        <p style={S.p}><strong>Publicly documented elements:</strong></p>
        <ul style={S.ul}>
          <li>Gemini 1.0 ka TPU v4 aur v5e pe training publicly documented hai — selected later Gemini versions ke liye bhi TPU usage publicly referenced hai; complete model→TPU mapping not disclosed</li>
          <li>JAX/XLA framework use hota hai — Google ke public papers mein documented; supported frameworks per TPU generation vary kar sakte hain</li>
          <li>Pathways architecture — Google ke 2022 paper mein described, multiple datacenters coordinate kar sakta hai; exact role in current Gemini training pipelines publicly confirmed nahi hai</li>
          <li>Multimodal training — text, image, audio, video data sab ek training run mein</li>
          <li>Gemini Technical Report (2023, updated versions) publicly available hai — describes training approach at high level</li>
        </ul>
        <p style={S.p}><strong>General large-scale training infrastructure elements</strong> (applicable, not Gemini-specific confirmed):</p>
        <ul style={S.ul}>
          <li>Distributed training strategies: data parallelism, model parallelism, pipeline parallelism — all coordinated</li>
          <li>High-speed interconnects (ICI) essential for gradient synchronization — <TopicLink slug="ai-networking" variant="inline" /></li>
          <li>Training data storage — large-scale datasets; Colossus is a publicly described Google-scale distributed file system; its exact role in current Gemini pipelines not publicly confirmed</li>
          <li>Checkpoint storage — significant aur frequent; frontier model checkpoints very large hote hain</li>
          <li>Sustained high power draw — training runs weeks to months</li>
        </ul>
      </section>

      <section id="inference-infra">
        <h2 style={S.h2}>Inference Infrastructure</h2>
        <p style={S.p}>
          Gemini inference ka scale bahut bada hai — Google Search, Gmail, Docs, Android, plus API customers sab simultaneously serve hote hain. Gemini very large scale pe operate karta hai across Google products aur API workloads — exact production volumes publicly disclosed nahi hain.
        </p>
        <p style={S.p}><strong>Key inference infrastructure characteristics:</strong></p>
        <ul style={S.ul}>
          <li><strong>Global distribution:</strong> Google ke worldwide data centers pe — users ke paas low-latency serving. Exact locations aur serving topology publicly undisclosed.</li>
          <li><strong>Model weights in memory:</strong> Inference accelerators pe weights preloaded — cold start eliminate. Large models distributed across multiple TPU chips.</li>
          <li><strong>Quantization:</strong> Inference models often quantized (lower precision weights) — smaller memory footprint, faster computation. Slight accuracy tradeoff. Google TPUs quantization hardware support rakhte hain.</li>
          <li><strong>Prefill vs decode:</strong> LLM inference mein two phases: Prefill (input tokens process) = compute intensive. Decode (output token-by-token generation) = memory bandwidth intensive. Different optimization strategies possible.</li>
          <li><strong>Gemini Nano (on-device):</strong> Android Pixel phones pe directly run kar sakta hai — supported on-device use cases mein inference locally ho sakti hai. Exact behavior device, feature, aur implementation pe depend karta hai. Server inference nahi hoti jab on-device mode active ho.</li>
        </ul>
      </section>

      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference Comparison</h2>
        <ComparisonTable
          title="Training vs Inference Infrastructure"
          headers={["Factor", "Training", "Inference"]}
          rows={[
            ["Duration", "Weeks to months — one long job", "Continuous 24/7 — always-on"],
            ["Scale", "Massive synchronized clusters (TPU pods)", "Distributed globally, many smaller serving units"],
            ["Workload", "Synchronous — all chips must coordinate each step", "Mostly independent requests — high concurrency"],
            ["Storage I/O", "Heavy read (training data) + write (checkpoints)", "Model weights in memory — minimal dataset I/O"],
            ["Failure tolerance", "Checkpoint recovery — restart from last save", "Load balancing — route away from failed nodes"],
            ["Optimize for", "Throughput — maximize compute utilization", "Latency (TTFT, tokens/sec) + cost per token"],
            ["Power pattern", "Sustained maximum power for weeks", "Variable — scales with query volume"],
            ["Cooling requirement", "Sustained extreme thermal load", "Significant — continuous but more distributed"],
          ]}
        />
      </section>

      <section id="networking">
        <h2 style={S.h2}>Networking and Distributed Training</h2>
        <p style={S.p}>
          Large-scale Gemini training mein network performance directly training throughput determine karta hai.
        </p>
        <p style={S.p}><strong>Training network:</strong></p>
        <ul style={S.ul}>
          <li><strong>ICI (intra-pod):</strong> TPU chips ke beech high-speed Google ICI — gradient AllReduce ke liye</li>
          <li><strong>Datacenter network (inter-pod/inter-DC):</strong> Multiple pod ya datacenter communication ke liye — Jupiter network (Google ka datacenter fabric, publicly described) aur Pathways architecture</li>
          <li><strong>Collective operations:</strong> AllReduce, AllGather — distributed gradient aggregation. <TopicLink slug="ai-networking" variant="inline" /></li>
        </ul>
        <p style={S.p}><strong>Jupiter datacenter network:</strong> Google Jupiter publicly documented hai — multiple generations. Software-defined networking, high-bandwidth fabric. Specific configurations for Gemini training not disclosed.</p>
        <p style={S.p}><strong>Pathways:</strong> Google ka publicly described multi-controller distributed training system — multiple datacenters coordinate kar sakte hain ek training job ke liye. Traditional single-datacenter training se more complex fault tolerance aur coordination require karta hai. Exact role in current Gemini training publicly confirmed nahi hai.</p>
      </section>

      <section id="storage">
        <h2 style={S.h2}>Storage and Checkpoints</h2>
        <p style={S.p}><strong>Colossus:</strong> Google ka publicly described large-scale distributed file system — GFS (Google File System) ka successor. Very large scale, high throughput ke liye designed. Exact role in current Gemini training aur checkpoint pipelines publicly confirmed nahi hai — Colossus Google-scale technology hai jo broadly used hai. <TopicLink slug="ai-storage" variant="inline" /></p>
        <p style={S.p}><strong>Training data storage:</strong> Gemini multimodal training data — text, images, audio, video — internet-scale datasets. Exact storage scale publicly confirmed nahi hai. Very large storage requirements, fast I/O for training throughput.</p>
        <p style={S.p}><strong>Checkpoint storage:</strong> Training ke dauran regular checkpoints essential — hardware failure pe restart point. Frontier models ke checkpoints very large hote hain. Frequent checkpointing I/O load significant hai. Multiple checkpoint versions typically retained.</p>
        <p style={S.p}><strong>Model weights storage (production):</strong> Multiple Gemini model variants aur generations — significant storage footprint. Fast access needed for model loading.</p>
      </section>

      <section id="power-density">
        <h2 style={S.h2}>AI Data Center Power and High-Density Racks</h2>
        <p style={S.p}>
          Google TPU-based AI infrastructure data centers mein significant power density create karta hai.
        </p>
        <p style={S.p}><strong>TPU power consumption:</strong> Different TPU generations alag power consume karte hain — Google Cloud documentation mein per-chip aur per-pod power figures kuch versions ke liye available hain. Verify current specs at: <a href="https://cloud.google.com/tpu/docs/tpus-in-gke" style={{ color: "#2563eb" }}>cloud.google.com/tpu/docs</a></p>
        <p style={S.p}><strong>High-density rack implications:</strong></p>
        <ul style={S.ul}>
          <li>Modern AI accelerator rack designs can reach tens of kW and, depending on accelerator generation, rack configuration aur server design, substantially higher densities — <TopicLink slug="ai-cooling" variant="inline" /></li>
          <li>Traditional CRAC/CRAH air cooling sufficiency depends on actual rack density aur facility design — not universally mandatory liquid cooling</li>
          <li>Power distribution: high-current PDUs, redundant A+B feeds for critical systems</li>
          <li>Floor loading: High-density AI racks significantly heavier hote hain — structural assessment required</li>
        </ul>
        <p style={S.p}><strong>Google's energy approach:</strong> Google publicly commits to matching 100% of its global electricity consumption with renewable energy through Power Purchase Agreements (PPAs). Google 24/7 carbon-free energy (CFE) goal bhi pursue karta hai. PUE (Power Usage Effectiveness) — Google ne historically fleet-wide PUE values ~1.1 ke aas paas report kiye hain; current figures latest Google Environmental Report se verify karo. WUE (Water Usage Effectiveness) — Google water usage publicly reports karta hai annual environmental reports mein.</p>
      </section>

      <section id="cooling">
        <h2 style={S.h2}>Cooling and Thermal Management</h2>
        <p style={S.p}>
          Google ke AI data centers cooling ke baare mein publicly documented hai — specific per-facility configurations detailed nahi hain.
        </p>
        <p style={S.p}><strong>What Google publicly states:</strong></p>
        <ul style={S.ul}>
          <li>TPU v3 documentation specifically mentions liquid cooling — yeh publicly documented hai</li>
          <li>Google evaporative cooling aur chilled water extensively use karta hai globally</li>
          <li>Google warm water cooling research aur deployment ka publicly reference karta hai high-density workloads ke liye</li>
          <li>Google ne historically fleet-wide PUE values ~1.1 ke aas paas report kiye hain — current figures latest Google Environmental Report se verify karo</li>
        </ul>
        <Callout type="important" title="Liquid Cooling Universally Mandatory Nahi">
          Cooling technology (air, rear-door HX, direct liquid cooling, immersion) server/TPU OEM design, actual rack density, aur facility capability pe depend karti hai. TPU v3 liquid-cooled documented hai — newer generations ke specific cooling configurations fully publicly disclosed nahi hain. <TopicLink slug="ai-cooling" variant="inline" />
        </Callout>
        <p style={S.p}><strong>General AI data center cooling considerations</strong> (engineering principles — not Google-specific confirmed):</p>
        <ul style={S.ul}>
          <li>ASHRAE recommended inlet temperature: 18–27°C (A1/A2 class equipment ke liye)</li>
          <li>Relative humidity aur dew point — per applicable ASHRAE class aur OEM specs</li>
          <li>Hot aisle/cold aisle containment — bypass airflow reduce karta hai</li>
          <li>High-density racks ke liye: rear-door heat exchangers, direct liquid cooling (CDU-based), ya immersion evaluate karo</li>
        </ul>
      </section>

      <section id="liquid-cooling-chain">
        <h2 style={S.h2}>Liquid Cooling Chain</h2>
        <p style={S.p}>
          Jab liquid cooling deployed hoti hai high-density AI racks ke liye, conceptual chain yeh hai — actual implementation OEM design, CDU type, aur facility architecture pe depend karti hai:
        </p>
        <ol style={S.ol}>
          <li><strong>Facility Cooling Plant:</strong> Chiller ya dry cooler → facility-level cold water. Air-cooled ya water-cooled chiller — climate, water availability, design basis ke anusaar.</li>
          <li><strong>CDU (Cooling Distribution Unit):</strong> Facility water aur IT equipment secondary loop ke beech heat exchanger. Dono loops physically separate — chemistry aur contamination control ke liye.</li>
          <li><strong>Secondary Loop:</strong> CDU se cooled fluid rack manifold tak. IT-safe fluid chemistry.</li>
          <li><strong>Server/Rack Manifold:</strong> Secondary loop fluid individual accelerator cold plates pe distribute karta hai.</li>
          <li><strong>Accelerator Cold Plates:</strong> TPU/GPU chips pe directly mounted — heat chip se coolant mein transfer hoti hai.</li>
          <li><strong>Return:</strong> Warm coolant wapas manifold → CDU → facility return → chiller. Cycle continues.</li>
        </ol>
        <p style={S.p}><strong>Key parameters to monitor:</strong></p>
        <ul style={S.ul}>
          <li>Coolant supply temperature (CDU secondary) — OEM specified range mein hona chahiye</li>
          <li>Coolant return temperature — combined with supply gives ΔT</li>
          <li>ΔT (supply − return): Q = ṁ × Cₚ × ΔT — heat load indicator</li>
          <li>Flow rate — below design spec = inadequate cooling</li>
          <li>Loop pressure — unexpected drop = possible leak</li>
          <li>Leak detection sensors — rack level, manifold, CDU, floor</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2 style={S.h2}>Monitoring</h2>
        <p style={S.p}>Comprehensive monitoring without which problems invisible rehte hain:</p>
        <ComparisonTable
          title="AI Data Center Monitoring — Key Metrics for TPU/GPU Infrastructure"
          headers={["Parameter", "Why Monitor", "Concern Indicator"]}
          rows={[
            ["Accelerator junction temperature", "Thermal throttling trigger; hardware health", "Approaching OEM thermal limit → throttling risk"],
            ["Accelerator clock/utilization", "Throttling aur workload efficiency", "Clock drop during load → throttling; sustained low util → inefficiency"],
            ["Rack inlet temperature", "IT equipment directly affected", "Above applicable ASHRAE class recommended range"],
            ["RH + dew point", "Condensation risk (high) aur ESD risk (low)", "Outside applicable ASHRAE class envelope — verify class"],
            ["Coolant supply temp (CDU secondary)", "IT equipment inlet spec", "Above OEM-specified max inlet temperature"],
            ["Coolant return temp", "Combined with supply gives ΔT", "ΔT abnormally high or low vs design"],
            ["Coolant ΔT", "Q = ṁ × Cₚ × ΔT — heat load", "Rising ΔT at same flow → more load; falling → bypass or low load"],
            ["Flow rate", "Adequate cooling delivery", "Below design spec → pump issue, blockage, or leak"],
            ["Loop pressure", "Leak or blockage indicator", "Unexpected pressure drop → possible leak"],
            ["Leak detection", "Early warning before major damage", "Any sensor trigger → immediate investigation"],
            ["CDU pump status", "Cooling system health", "Alarm, abnormal current, vibration"],
            ["Chiller/facility water temp", "Upstream of CDU", "Above design setpoint → chiller or plant issue"],
            ["Network utilization (ICI/fabric)", "Training throughput bottleneck", "Sustained saturation → training slow; drops → link issues"],
            ["Training throughput (samples/sec)", "End-to-end efficiency", "Below baseline → investigate compute, network, or storage"],
            ["API latency (TTFT, TPS)", "Inference serving health", "Degradation → investigate serving infrastructure"],
          ]}
        />
      </section>

      <section id="failure-troubleshoot">
        <h2 style={S.h2}>Failure Scenarios and Troubleshooting</h2>
        <p style={S.p}>Symptom → Possible Cause → Checks → Corrective Action:</p>
        <ComparisonTable
          headers={["Symptom", "Possible Cause", "Checks", "Corrective Action"]}
          rows={[
            ["Accelerator thermal throttling", "Cooling inadequate, high ambient, high sustained load", "Coolant supply temp; flow rate; CDU status; accelerator temp vs OEM limit; rack inlet temp", "Verify cooling chain end-to-end; check CDU operation; if facility water issue → alert facilities; reduce workload temporarily if hardware at risk"],
            ["High coolant supply temperature", "Chiller issue, facility water problem, CDU HX fouling", "Chiller status + alarms; facility water temp at CDU primary; CDU HX condition; ambient", "Switch to standby chiller if available; check cooling tower/dry cooler; schedule CDU HX inspection"],
            ["Low coolant flow rate", "Pump degradation/failure, blockage, leak, valve", "CDU pump status; loop pressure differential; leak sensors; valve positions", "Switch to redundant pump; locate blockage or leak; verify valve open; do not operate below spec"],
            ["Leak detection alarm", "Fitting, pipe, manifold, or CDU internal leak", "Which sensor triggered; CDU pressure drop; visual inspection", "Isolate section immediately; close valves; locate leak; dry area; repair; pressure test; inspect electronics before re-power"],
            ["Abnormal coolant ΔT (high)", "Higher IT load, reduced flow, supply temperature drop", "Verify flow rate; check workload/utilization increase; check supply temp", "If load increased: verify capacity adequate; if flow reduced: check pump and blockage"],
            ["Abnormal coolant ΔT (low)", "Short-circuit bypass, high flow, low IT load", "Check flow rate; check utilization; inspect loop for bypass", "If bypass: inspect loop configuration; if flow too high: check pump settings"],
            ["Training job slow/stalled", "Network bottleneck, accelerator failure, storage I/O issue, checkpoint corruption", "ICI/fabric utilization; accelerator status; storage I/O rates; training logs for error patterns", "Identify bottleneck layer; replace failed accelerator; check storage throughput; restore from last good checkpoint if corruption"],
            ["API inference high latency", "Server overload, network issue, model loading, accelerator throttling", "Check API status (status.google.com); check serving metrics; check accelerator temps; network path", "Check status.google.com for incidents; implement retry logic; check application-side caching; alert if persistent"],
            ["CDU pump alarm", "Mechanical failure, power issue, control fault", "Pump power supply; current draw; controller logs; physical inspection", "Switch to standby pump; alert facilities/mechanical team; reduce IT load if no redundancy"],
            ["Accelerator memory error (HBM)", "HBM degradation, cosmic ray bit flip, thermal damage", "Error-correcting code (ECC) logs; temperature history; workload context", "If persistent: take accelerator offline; investigate with OEM; thermal damage → inspect cooling; single ECC event may be benign"],
          ]}
        />
      </section>

      <section id="reliability">
        <h2 style={S.h2}>Reliability and Redundancy</h2>
        <p style={S.p}><strong>Google Cloud SLAs:</strong> Vertex AI aur Gemini API ke SLA terms current Google Cloud documentation se verify karo. Service availability ≠ confirmed physical redundancy details — SLA terms specific conditions pe based hote hain.</p>
        <p style={S.p}><strong>Google infrastructure redundancy (publicly stated at high level):</strong></p>
        <ul style={S.ul}>
          <li>Multiple data centers globally — geographic redundancy</li>
          <li>N+1 ya higher redundancy for critical systems — general Google infrastructure design principle</li>
          <li>Automatic failover — Google's serving infrastructure automatically routes around failures</li>
          <li>Checkpoint-based training recovery — failed training jobs restart from last checkpoint</li>
        </ul>
        <p style={S.p}><strong>Application-level reliability design:</strong></p>
        <ul style={S.ul}>
          <li>Retry logic with exponential backoff — 429, 503 errors ke liye</li>
          <li>Timeout handling — especially long context requests ke liye</li>
          <li>Graceful degradation — agar Gemini API unavailable ho toh application kya kare?</li>
          <li>Status monitoring: <a href="https://status.google.com" style={{ color: "#2563eb" }}>status.google.com</a></li>
          <li>Multi-model fallback strategy — critical applications ke liye</li>
        </ul>
      </section>

      <section id="enterprise">
        <h2 style={S.h2}>Enterprise Deployment</h2>
        <p style={S.p}><strong>Deployment options for enterprises:</strong></p>
        <ul style={S.ul}>
          <li><strong>Gemini API (ai.google.dev):</strong> Direct access — developers, startups. Latest models first. Google AI billing.</li>
          <li><strong>Vertex AI:</strong> Enterprise-grade — GCP compliance features, VPC Service Controls, Cloud IAM, audit logging, managed model versions, SLAs. Regulated industries ke liye recommended path. Verify current compliance scope at cloud.google.com.</li>
          <li><strong>Google Workspace + Gemini:</strong> Organizations already using Google Workspace (Gmail, Docs, Sheets) ke liye — Gemini directly integrated. Admin controls, enterprise data protection per Workspace terms.</li>
          <li><strong>Google Cloud (custom models):</strong> Vertex AI pe fine-tuning aur custom model training — organization-specific data pe. Gemini aur other Google foundation models fine-tune kar sakte hain per current Vertex AI documentation.</li>
        </ul>
        <p style={S.p}><strong>Integration patterns:</strong></p>
        <ul style={S.ul}>
          <li><strong>RAG (Retrieval Augmented Generation):</strong> Gemini + Vector Search (Vertex AI feature) + company knowledge base — grounded responses without fine-tuning</li>
          <li><strong>Function calling/tool use:</strong> Gemini structured tool calls kar sakta hai — database queries, API calls, code execution</li>
          <li><strong>Grounding with Google Search:</strong> Gemini responses ko real-time Google Search results se ground kar sakte hain — factual accuracy improve hoti hai</li>
          <li><strong>Internal API proxy:</strong> Centralized auth, rate limiting, logging, cost allocation — enterprise-standard pattern</li>
        </ul>
      </section>

      <section id="privacy-security">
        <h2 style={S.h2}>Privacy and Security</h2>
        <p style={S.p}><strong>Data handling varies by access path — always verify current official policy:</strong></p>
        <ComparisonTable
          title="Gemini — Data Privacy by Access Path"
          headers={["Path", "Training/Retention Policy", "Key Controls"]}
          rows={[
            ["Google AI Studio (unpaid/free tier)", "Data may be used for model improvement per current terms — verify current defaults and opt-out options at ai.google.dev/gemini-api/terms", "Settings to opt out; verify current defaults before use"],
            ["Gemini API (paid tier)", "Training/retention policies differ from free tier — verify current paid API terms at ai.google.dev/gemini-api/terms", "API key management; check current ZDR/data controls if available"],
            ["Vertex AI", "Data not used for training Google models per current Vertex AI terms — verify at cloud.google.com/vertex-ai/docs", "VPC Service Controls; Cloud IAM; audit logs; CMEK available"],
            ["Google Workspace Gemini", "Per Workspace enterprise terms and admin configuration", "Admin console controls; enterprise data protection"],
            ["Gemini Nano (on-device)", "For supported on-device use cases, inference can occur locally; exact behavior depends on device, feature and implementation — verify current product documentation", "Device-level privacy; OS controls"],
          ]}
        />
        <Callout type="warning" title="Policies Vary — Always Verify Current Terms">
          Training aur retention policies product, plan, aur configuration ke basis pe vary karti hain. Kisi bhi deployment ke liye current official Google policy verify karo — policies change ho sakti hain. Regulated industries ke liye Vertex AI recommended hai — current compliance certifications cloud.google.com pe verify karo.
        </Callout>
        <p style={S.p}><strong>Security best practices:</strong></p>
        <ul style={S.ul}>
          <li>API keys environment variables ya Secret Manager mein — never client-side</li>
          <li>Service accounts with minimum required permissions (principle of least privilege)</li>
          <li>VPC Service Controls (Vertex AI) — network-level isolation</li>
          <li>Audit logging enable karo — Cloud Audit Logs for Vertex AI</li>
          <li>Input validation aur prompt injection protection</li>
          <li>Regular API key/service account rotation</li>
        </ul>
      </section>

      <section id="dc-perspective">
        <h2 style={S.h2}>Practical Data Center and O&M Perspective</h2>
        <p style={S.p}>
          Google Gemini aur TPU infrastructure data center industry pe broader implications rakhte hain jo facility engineers ke liye relevant hain.
        </p>
        <p style={S.p}><strong>Custom silicon trend:</strong> Google TPUs demonstrate karte hain ki large-scale AI operators general-purpose GPUs se beyond custom hardware develop karte hain. AWS Trainium/Inferentia, Microsoft Maia, Meta MTIA — yeh trend accelerate ho raha hai. Data center engineers ke liye: future AI infrastructure increasingly diverse accelerator types hogi — different power, cooling, aur operational requirements.</p>
        <p style={S.p}><strong>Optical interconnects:</strong> TPU v4 pods mein optical circuit switching publicly documented hai. Optical components data centers mein increasing role play karenge — different maintenance needs (fiber cleaning, optical power monitoring, transceiver management) vs electrical interconnects.</p>
        <p style={S.p}><strong>Power unprecedented scale:</strong> Google ka total data center power consumption publicly reportable scale pe hai — AI workloads significant portion consume karte hain. Grid-scale renewable energy procurement aur 24/7 CFE (Carbon Free Energy) AI companies ke liye infrastructure planning ka part ban raha hai.</p>
        <p style={S.p}><strong>Water consumption:</strong> Google annually water usage publicly reports karta hai. Evaporative cooling towers significant water use karte hain — water-scarce regions mein dry cooling ya closed-loop alternatives increasingly important.</p>
        <p style={S.p}><strong>On-device AI (Gemini Nano):</strong> Ek interesting trend — inference server se edge device tak shift. Gemini Nano Android Pixel pe demonstrate karta hai ki enough capability on-device possible hai for many tasks. Data center engineers ke liye: edge inference growing trend hai — centralized server infrastructure per task type se zyada diverse.</p>
        <p style={S.p}><strong>Vertical integration advantage:</strong> Google ka hardware-software-infrastructure control enterprise data center managers ko yeh sochne pe majboor karta hai: kya organization ka AI workload bhi custom optimization se benefit kar sakta hai? On-premise custom silicon abhi accessible nahi hai, lekin cloud-based access (Google Cloud TPUs) organizations ko Google ke hardware optimization se benefit karne deta hai.</p>
      </section>

      <section id="references">
        <h2 style={S.h2}>Technical References</h2>
        <ul style={S.ul}>
          <li>
            <strong>Google Gemini Technical Report</strong><br />
            Publisher: Google DeepMind<br />
            Covers: Gemini model architecture, training approach, capabilities at high level<br />
            <a href="https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf" style={{ color: "#2563eb" }}>deepmind.com — Gemini Technical Report</a>
          </li>
          <li>
            <strong>Gemini API Documentation</strong><br />
            Publisher: Google<br />
            Covers: Models, API reference, rate limits, pricing, capabilities<br />
            <a href="https://ai.google.dev/gemini-api/docs" style={{ color: "#2563eb" }}>ai.google.dev/gemini-api/docs</a>
          </li>
          <li>
            <strong>Google AI Studio</strong><br />
            Publisher: Google<br />
            Covers: Web-based Gemini playground, API key generation<br />
            <a href="https://aistudio.google.com" style={{ color: "#2563eb" }}>aistudio.google.com</a>
          </li>
          <li>
            <strong>Vertex AI Documentation</strong><br />
            Publisher: Google Cloud<br />
            Covers: Enterprise Gemini deployment, compliance, MLOps<br />
            <a href="https://cloud.google.com/vertex-ai/docs" style={{ color: "#2563eb" }}>cloud.google.com/vertex-ai/docs</a>
          </li>
          <li>
            <strong>Google TPU System Architecture</strong><br />
            Publisher: Google Cloud<br />
            Covers: TPU VM architecture, pod configuration, ICI<br />
            <a href="https://cloud.google.com/tpu/docs/system-architecture-tpu-vm" style={{ color: "#2563eb" }}>cloud.google.com/tpu/docs/system-architecture-tpu-vm</a>
          </li>
          <li>
            <strong>In-Datacenter Performance Analysis of a Tensor Processing Unit (TPU v1 paper)</strong><br />
            Publisher: Google (ISCA 2017)<br />
            Covers: Original TPU architecture — systolic array, MXU, design philosophy<br />
            <a href="https://arxiv.org/abs/1704.04760" style={{ color: "#2563eb" }}>arxiv.org/abs/1704.04760</a>
          </li>
          <li>
            <strong>Pathways: Asynchronous Distributed AI Training</strong><br />
            Publisher: Google Research<br />
            Covers: Multi-datacenter distributed training architecture<br />
            <a href="https://arxiv.org/abs/2203.12533" style={{ color: "#2563eb" }}>arxiv.org/abs/2203.12533</a>
          </li>
          <li>
            <strong>Google Environmental Report</strong><br />
            Publisher: Google<br />
            Covers: Data center PUE, WUE, renewable energy, carbon footprint<br />
            <a href="https://sustainability.google/reports/" style={{ color: "#2563eb" }}>sustainability.google/reports/</a>
          </li>
          <li>
            <strong>Google Service Status</strong><br />
            Publisher: Google<br />
            Covers: Real-time status of Google Cloud and AI services<br />
            <a href="https://status.google.com" style={{ color: "#2563eb" }}>status.google.com</a>
          </li>
        </ul>
      </section>

      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Google Gemini vertically integrated AI stack pe run karta hai:</strong> Custom TPU hardware, JAX/XLA compiler, aur Google's own data centers. Other major AI providers (OpenAI, Anthropic etc.) different combinations of owned, partner aur cloud infrastructure use karte hain — each provider ka approach alag hai.</li>
          <li><strong>TPU aur GPU different architectural approaches hain:</strong> TPU systolic array matrix multiplication ke liye purpose-built hai. NVIDIA GPU general-purpose parallel compute hai jo AI ke liye widely used hai. TPUs Google Cloud ke through accessible hain — on-premise option nahi hai unlike NVIDIA hardware.</li>
          <li><strong>HBM AI accelerator performance ka critical factor hai:</strong> High Bandwidth Memory accelerator compute units ko data feed karta hai. HBM capacity model size limits, HBM bandwidth inference latency affect karta hai. Thermal management HBM performance aur reliability ke liye essential hai.</li>
          <li><strong>TPU pods massive distributed training enable karte hain:</strong> ICI interconnect TPU chips ko pod mein connect karta hai — effectively ek giant distributed accelerator. Pod scale ke saath power aur cooling requirements dramatically badh ti hain. Data center infrastructure pod ke liye specifically designed honi chahiye.</li>
          <li><strong>Gemini access path choice compliance aur data handling determine karta hai:</strong> AI Studio → prototyping. Direct Gemini API → production apps. Vertex AI → enterprise compliance. Har path ke alag data handling policies hain — always current official documentation verify karo.</li>
          <li><strong>Google Gemini inference ka scale massive hai:</strong> Google Search, Gmail, Docs plus API — enormous query volume across Google products aur API customers simultaneously. Exact query volumes publicly disclosed nahi hain. Gemini Nano on-device inference bhi add karta hai distributed AI serving ka ek dimension.</li>
          <li><strong>Liquid cooling TPU v3 se documented hai lekin universally mandatory nahi:</strong> Actual cooling technology accelerator generation, rack density, server design, aur facility capability pe depend karti hai. AI cooling design <TopicLink slug="ai-cooling" variant="inline" /> article mein detail mein covered hai.</li>
          <li><strong>Training aur inference fundamentally alag infrastructure challenges hain:</strong> Training — massive synchronized pods, weeks-long runs, checkpoint storage. Inference — globally distributed, latency-sensitive, continuous, quantized models.</li>
          <li><strong>Google ka custom silicon trend data center industry ko reshape kar raha hai:</strong> AWS Trainium, Google TPU, Microsoft Maia, Meta MTIA — major AI operators custom hardware develop kar rahe hain. Future AI data centers diverse accelerator ecosystem rakhenge — different power, cooling, aur operational requirements.</li>
          <li><strong>Privacy policies access path pe depend karti hain — absolute claims avoid karo:</strong> AI Studio free tier se Vertex AI enterprise tak — data handling alag hai. Current official Google policies verify karo aur regulated industries ke liye Vertex AI preferred path hai.</li>
        </ul>
      </section>

    </article>
  );
}
