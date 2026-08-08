"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiDcContent } from "@/content/ai-data-center-basics";

import AiDcOverview from "../svg/AiDcOverview";
import AiDcVsTraditional from "../svg/AiDcVsTraditional";
import AiDataFlow from "../svg/AiDataFlow";
import GpuComputeNode from "../svg/GpuComputeNode";
import AiPowerChain from "../svg/AiPowerChain";
import AiClusterNetwork from "../svg/AiClusterNetwork";
import LiquidCoolingSystem from "../svg/LiquidCoolingSystem";
import TrainingVsInference from "../svg/TrainingVsInference";
import AiPodFactory from "../svg/AiPodFactory";
import AiDcMonitoring from "../svg/AiDcMonitoring";

void aiDcContent;

export default function Content() {
  return (
    <article>

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Aapne AI hardware ka poora safar padh liya — NVIDIA GPU architecture, AMD Instinct chips, TPU, AI Accelerators. Ab ek sawaal: yeh sab hardware jata kahan hai? Kahan se duniya ke sab AI services chalte hain?
        </p>
        <p style={S.p}>
          Answer hai: <strong>AI Data Center.</strong>
        </p>
        <p style={S.p}>
          Jab aap ChatGPT se koi sawaal poochte ho — aapka request large-scale AI infrastructure tak pahonchta hai jahan specialized accelerators trained models process karte hain. Yeh sab hota hai AI Data Center mein.
        </p>
        <p style={S.p}>
          Yeh article woh foundation hai jis par hum baaki sab cheezein build karenge — GPU Clusters, AI Networking, AI Storage, AI Cooling.
        </p>
      </section>

      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Students aur Freshers</strong> — Data center kya hoti hai, AI data center kaise alag hai, andar kya hota hai — bilkul zero se.</li>
          <li><strong>IT Engineers moving to AI infrastructure</strong> — Traditional DC experience hai lekin AI-specific challenges naye hain. Yeh article bridge karega.</li>
          <li><strong>Data Center Engineers</strong> — Power density, cooling, rack design, capacity planning — sab AI-specific angle se.</li>
          <li><strong>Cloud Engineers</strong> — AWS, Azure, GCP mein AI services kaise internally build hoti hain.</li>
          <li><strong>System Architects</strong> — AI DC design philosophy, tradeoffs, reliability, scalability — enterprise aur hyperscale dono.</li>
        </ul>
      </section>

      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>AI Data Center exactly kya hai — simple language mein</li>
          <li>Traditional data center se exactly kaise alag hai — engineering level pe</li>
          <li>AI data centers ka evolution — 2012 se aaj tak</li>
          <li>Learning hierarchy — GPU se AI Factory tak</li>
          <li>Training vs Inference infrastructure — dono ke alag requirements kyun hain</li>
          <li>Core building blocks — AI Compute Nodes, network, storage, cooling, power</li>
          <li>East-West traffic aur why it matters</li>
          <li>AI Pod aur AI Factory concepts — clearly distinguished</li>
          <li>Data flow — dataset se final model tak kaise data move hota hai</li>
          <li>GPU scheduling, job queues, multi-tenancy</li>
          <li>Software stack — hardware ke upar kya chalata hai sab kuch</li>
          <li>Enterprise vs Hyperscale AI data centers</li>
          <li>Capacity planning, scalability, reliability, redundancy</li>
          <li>Security, monitoring, common mistakes, best practices</li>
          <li>Future of AI data centers</li>
        </ul>
      </section>

      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Hardware foundation (previous articles):</strong> <TopicLink slug="ai-gpu" variant="inline" /> → <TopicLink slug="tpu" variant="inline" /> → <TopicLink slug="ai-accelerators" variant="inline" /> → <TopicLink slug="nvidia-architecture" variant="inline" /> → <TopicLink slug="amd-ai-platforms" variant="inline" /></li>
          <li><strong>Current article:</strong> AI Data Center Basics — the infrastructure foundation</li>
          <li><strong>Upcoming (building on this):</strong> GPU Cluster Design → AI Networking (InfiniBand, RoCE) → AI Storage → AI Cooling</li>
        </ul>
      </section>

      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          Ek simple scene imagine karo.
        </p>
        <p style={S.p}>
          Aap ek bakery mein kaam karte ho. Ek din mein 100 loaves banana hai. Ek chef, ek oven, ek kitchen — kaam ho jaata hai.
        </p>
        <p style={S.p}>
          Ab socho company grow hoti hai. Ek din mein 1 million loaves chahiye. Ek kitchen nahi chalega. Aapko chahiye: ek dedicated bada facility, specialized equipment, continuous power supply, temperature control, dedicated logistics, aur ek system jo ensure kare ki koi bhi oven band ho toh kaam ruke nahi.
        </p>
        <p style={S.p}>
          Yeh bakery ka jo industrial-scale facility hai — wahi concept AI Data Center ka hai.
        </p>
        <p style={S.p}>
          AI training mein: ek model banana hai jo millions of examples se seekhe. Ek GPU nahi chalega. Aapko chahiye: dedicated high-density facility, many GPU servers, ultra-fast networking, massive storage, custom cooling, reliable power.
        </p>
        <p style={S.p}>
          <strong>AI Data Center = industrial-scale AI compute facility</strong> jahan yeh sab kuch organize kiya jaata hai.
        </p>
        <Figure caption="AI Data Center big picture: Four zones work together — AI Compute Nodes (GPU Servers), High-Speed AI Network, AI Storage, and Cooling and Power Systems. Raw data enters, trained AI models exit.">
          <AiDcOverview />
        </Figure>
      </section>

      <section id="what-is-ai-dc">
        <h2 style={S.h2}>What is an AI Data Center?</h2>
        <p style={S.p}>
          <strong>AI Data Center</strong> ek specialized computing facility hai jo specifically AI workloads ke liye design aur build ki gayi ho — primarily AI model training aur AI inference ke liye.
        </p>
        <p style={S.p}>
          Yeh definition important hai isliye ki <strong>"AI Data Center" aur "regular data center" same nahi hain</strong> — even though dono buildings hain jisme computers hote hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Regular data center:</strong> Websites host karta hai, emails handle karta hai, databases run karta hai, file servers rakhta hai. General-purpose computing.</li>
          <li><strong>AI Data Center:</strong> Neural networks train karta hai, AI models deploy karta hai, inference serve karta hai, research experiments run karta hai. Specialized computing — specifically for AI math (matrix multiplication at massive scale).</li>
        </ul>
        <p style={S.p}><strong>Real-world examples:</strong></p>
        <ul style={S.ul}>
          <li><strong>Microsoft Azure AI Data Centers</strong> — jo OpenAI ke GPT models run karte hain</li>
          <li><strong>Google AI infrastructure</strong> — TPU-based systems for large-scale AI training and inference</li>
          <li><strong>Meta AI Research</strong> — jahan LLaMA models train hue</li>
          <li><strong>AWS AI Infrastructure</strong> — jahan Trainium aur Inferentia chips hain</li>
        </ul>
        <p style={S.p}>
          Har baar jab aap koi AI feature use karte ho — woh kisi AI data center mein hi process hota hai.
        </p>
      </section>

      <section id="why-different">
        <h2 style={S.h2}>Why AI Data Centers Are Different from Traditional Data Centers</h2>
        <Figure caption="Side-by-side comparison: Traditional DC has 3-15 kW per rack, air cooling, general workloads, 10 Gbps network. AI DC has 40-120+ kW per rack, direct liquid cooling on GPU chips, AI-specific workloads, 200-400 Gbps InfiniBand. Not the same engineering challenge.">
          <AiDcVsTraditional />
        </Figure>
        <p style={S.p}>
          <strong>Power Density — The Fundamental Difference:</strong> Traditional data center server: 300–500W per server. Ek rack mein 20–30 servers = roughly 6–15 kW per rack. AI GPU server (DGX H100): ~10 kW sirf ek server se. Ek rack mein 4 DGX H100 = ~40 kW. GB200 NVL72 (NVIDIA ka latest): 120+ kW sirf ek rack se.
        </p>
        <p style={S.p}>
          <strong>Networking — Completely Different Purpose:</strong> Traditional DC networking: 1 GbE, 10 GbE — mostly for user traffic. AI DC networking: 200 GbE, 400 GbE InfiniBand ya RoCE — GPU-to-GPU communication ke liye. Training mein gradients sync karne ke liye. Network bandwidth directly = training speed.
        </p>
        <p style={S.p}>
          <strong>Storage — Completely Different Access Patterns:</strong> Traditional DC: database reads/writes, IOPS-focused. AI DC: training data ko GPUs ko feed karna — massive sequential reads at very high bandwidth. Depending on workload and cluster size, aggregate storage throughput may reach several terabytes per second.
        </p>
        <ComparisonTable
          title="AI DC vs Traditional DC — Engineering Differences"
          headers={["Factor", "Traditional DC", "AI Data Center"]}
          rows={[
            ["Power density per rack", "3–15 kW", "AI racks can range from tens of kilowatts to well over 100 kW depending on the GPU platform and rack architecture"],
            ["Cooling type", "Air cooling (CRAC units)", "Direct Liquid Cooling — increasingly used and commonly required for many high-density AI rack designs"],
            ["Server cost per rack", "$50K–200K", "$1M–5M+"],
            ["Network speed", "1–10 GbE", "200–400 GbE InfiniBand"],
            ["Network purpose", "User traffic", "GPU-to-GPU gradient sync"],
            ["Storage I/O focus", "IOPS (random)", "Bandwidth (GB/s sequential)"],
            ["Workload duration", "Variable, spiky", "Sustained — days to weeks"],
            ["Primary hardware", "CPUs, SSDs", "GPUs, HBM memory"],
            ["Software stack", "Standard IT", "Specialized AI frameworks"],
          ]}
        />
      </section>

      <section id="evolution">
        <h2 style={S.h2}>Evolution of AI Data Centers</h2>
        <p style={S.p}><strong>Era 1 — CPU Clusters (pre-2012):</strong> AI research hoti thi lekin scale limited tha. Data centers normal server rooms thi. Special kuch nahi tha. AI ka compute demand itna zyada nahi tha.</p>
        <p style={S.p}><strong>Era 2 — GPU Discovery (2012–2016):</strong> AlexNet 2012 mein GPU pe train hua. Training weeks se days mein aa gayi. Companies ne GPU servers khareedne shuru kiye. NVIDIA Tesla series (K40, K80) data centers mein aaye. Yeh phase tha "GPU in data center" — proper AI data center nahi.</p>
        <p style={S.p}><strong>Era 3 — Deep Learning Explosion (2016–2020):</strong> NVIDIA DGX-1 (2016) — pehla dedicated AI server. NVLink GPU-to-GPU interconnect introduce hua. InfiniBand networking AI clusters ke liye standard bana. HBM memory GPUs mein aai. 40–100 kW/rack configurations start hue.</p>
        <p style={S.p}><strong>Era 4 — LLM Revolution (2020–present):</strong> GPT-3 (175B parameters), ChatGPT explosion, frontier models requiring tens of thousands of H100 GPUs. Purpose-built AI facilities. Liquid cooling mainstream. InfiniBand NDR (400 Gb/s) deployment. "AI Factory" concept emerged. AI-specific construction — dedicated buildings.</p>
        <p style={S.p}><strong>Where we are now (2024–2025):</strong> Individual AI clusters with 10,000–100,000+ GPUs. Single AI facilities with 100 MW+ power requirements planned. Hundreds of billions of dollars global AI infrastructure investment. Every major tech company building dedicated AI infrastructure.</p>
      </section>

      <section id="learning-hierarchy">
        <h2 style={S.h2}>The Learning Hierarchy — GPU to AI Factory</h2>
        <p style={S.p}>
          Is article mein kaafi nayi terms aayengi. Confused na ho isliye pehle yeh hierarchy clearly samajh lo:
        </p>
        <Figure caption="Scale hierarchy from smallest to largest: GPU chip (the AI math engine) → AI Compute Node (GPU server, 8 GPUs) → Rack (4-8 servers) → AI Pod (multiple racks + networking + storage, an industry concept from NVIDIA, Dell, HPE and others) → AI Cluster (multiple pods connected) → AI Data Center (the physical building) → AI Factory (the complete AI production environment including data center plus software pipelines plus operations).">
          <AiPodFactory />
        </Figure>
        <ComparisonTable
          title="The Hierarchy — From Smallest to Largest"
          headers={["Level", "What It Is", "Scale", "Example"]}
          rows={[
            ["GPU", "Single AI chip — the math engine", "1 chip", "H100, MI300X, TPU v4"],
            ["AI Compute Node", "One server with multiple GPUs (also called GPU Server)", "1 server = 8+ GPUs", "DGX H100, HGX H100, AMD OAM server"],
            ["Rack", "Multiple compute nodes stacked vertically", "4–8 servers = 32–64 GPUs", "42U rack, 40–120 kW"],
            ["AI Pod", "Multiple racks + networking + storage (industry concept)", "Dozens to hundreds of GPUs", "NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod"],
            ["AI Cluster", "Multiple AI Pods connected together", "1,000–100,000+ GPUs", "A training cluster, an inference farm"],
            ["AI Data Center", "The physical building housing clusters", "One facility", "Microsoft Azure AI facility, Google TPU DC"],
            ["AI Factory", "Complete AI production environment (DC + software + ops)", "One or more DCs", "OpenAI + Azure infrastructure combined"],
          ]}
        />
        <Callout type="important" title="AI Compute Node — What the Term Means">
          <strong>AI Compute Node</strong> ek compute server hai jo cluster scheduling ka unit hota hai. AI clusters mein isme commonly ek ya zyada GPUs hote hain, aur isse aksar GPU Server bhi kaha jaata hai. Industry mein dono terms use hote hain.
        </Callout>
      </section>

      <section id="training-vs-inference">
        <h2 style={S.h2}>AI Training vs AI Inference Infrastructure</h2>
        <p style={S.p}>
          Yeh distinction poori article mein baar baar aayegi. Clear karte hain.
        </p>
        <p style={S.p}>
          <strong>AI Training = "Model banana"</strong> — Neural network ko examples se seekhna sikhana. Empty model hai → examples feed karo → predictions wrong hai → error se weights update karo → repeat. Billions of times.
        </p>
        <p style={S.p}>
          <strong>AI Inference = "Model use karna"</strong> — Trained model ko real users pe deploy karna. Jab aap ChatGPT pe sawaal poochte ho — woh inference hai. Model already trained hai, ab woh aapka input process karta hai aur output deta hai.
        </p>
        <Figure caption="Training infrastructure: Large GPU clusters, days to weeks, maximum throughput, creates AI model. Inference infrastructure: Millisecond response, lower latency, serves millions of users. Same AI technology — completely different infrastructure design requirements.">
          <TrainingVsInference />
        </Figure>
        <ComparisonTable
          title="Training vs Inference — Infrastructure Design Comparison"
          headers={["Factor", "Training Infrastructure", "Inference Infrastructure"]}
          rows={[
            ["Compute scale", "Large clusters (10,000+ GPUs possible)", "Smaller pools, cost-efficient GPUs"],
            ["Duration", "Days to months per run", "Continuous, indefinite"],
            ["Speed priority", "Maximum throughput", "Minimum latency (milliseconds)"],
            ["Memory per GPU", "Very large (model + gradients + optimizer)", "Moderate (model weights only)"],
            ["GPU-to-GPU comm", "Critical — constant gradient sync", "Less critical — stateless requests"],
            ["Scaling pattern", "Fixed cluster size for training run", "Autoscales with user traffic"],
            ["Fault tolerance", "Checkpointing — resume from last save", "Load balancer + auto-restart"],
            ["Cost model", "High upfront — amortized per run", "Ongoing per-query cost"],
          ]}
        />
        <Callout type="best-practice" title="Many Companies Separate These">
          Production AI companies training aur inference infrastructure separate rakhte hain. Train karo ek dedicated training cluster pe (H100, MI300X), phir optimized inference setup pe deploy karo (L4, A10G, Inferentia). Different GPU types, different configurations, different cost models.
        </Callout>
      </section>

      <section id="checkpointing-intro">
        <h2 style={S.h2}>Why Checkpointing Saves Training Jobs</h2>
        <p style={S.p}>
          AI training jobs kaafi long-running hote hain — days to weeks. Is entire duration mein koi bhi component fail ho sakta hai: GPU hardware failure, node crash, power event, software bug.
        </p>
        <p style={S.p}>
          <strong>Checkpoint = current model weights periodically storage pe save karna.</strong> Bina checkpoint: 14-day training run, day 12 pe failure → 12 days of compute completely lost, restart from zero. Checkpointing ke saath (har 30 minutes): maximum 30 minutes ka work lost, resume from last checkpoint.
        </p>
        <p style={S.p}>
          Economic argument: ek large cluster pe 12 days of compute = lakhs of dollars potentially lost bina checkpointing ke. Checkpoint storage cost negligible hai by comparison.
        </p>
        <Callout type="important" title="Checkpointing — Policy Nahi, Requirement Hai">
          Large AI data centers mein checkpointing ek enforced policy hai, suggestion nahi. Job scheduler checkpointing require karta hai before long jobs run hone deta hai. Bina checkpointing configure kiye production training cluster pe long job run karna allowed nahi hota.
        </Callout>
      </section>

      <section id="core-building-blocks">
        <h2 style={S.h2}>Core Building Blocks of an AI Data Center</h2>
        <p style={S.p}>
          AI data center ko building blocks ki tarah samajhte hain — har ek block kya karta hai aur kyun zaroori hai. Har block ka detailed article alag se aayega.
        </p>
      </section>

      <section id="gpu-compute-nodes">
        <h2 style={S.h2}>AI Compute Nodes — GPU Servers</h2>
        <p style={S.p}>
          <strong>AI Compute Node</strong> ek compute server hai jo cluster scheduling ka unit hota hai. AI clusters mein isme commonly ek ya zyada GPUs hote hain, aur isse aksar GPU Server bhi kaha jaata hai. Yeh AI data center ka main compute engine hai.
        </p>
        <p style={S.p}>
          Ek AI Compute Node ek high-performance server hai jisme multiple GPUs hote hain plus CPU, RAM, NVMe storage, aur high-speed network cards. Baahar se sirf ek tall server chassis dikhta hai — andar ek extremely powerful parallel compute machine hoti hai.
        </p>
        <Figure caption="Inside one AI Compute Node (GPU Server): 8 AI GPUs, 2 CPUs managing the system, 640 GB ultra-fast HBM3 memory, 8 InfiniBand network ports (400 Gb/s each connecting to other servers), and liquid cooling pipes. Total: ~10 kW power, $300,000+ cost.">
          <GpuComputeNode />
        </Figure>
        <ComparisonTable
          title="Standard AI Compute Node Configurations"
          headers={["Server", "GPUs", "GPU Memory", "Network", "Power", "Cost"]}
          rows={[
            ["DGX H100 (NVIDIA)", "8× H100 SXM5", "640 GB HBM3", "8× InfiniBand 400 Gb/s", "~10.2 kW", "$300K+"],
            ["HGX H100 (OEM)", "8× H100 SXM5", "640 GB HBM3", "8× InfiniBand 400 Gb/s", "~10 kW", "OEM pricing"],
            ["AMD OAM Server", "8× MI300X", "1.5 TB HBM3", "8× InfiniBand 400 Gb/s", "~10-12 kW", "Varies"],
            ["GB200 NVL72 rack", "72 Blackwell GPUs", "13.8 TB HBM3e", "NVLink 5.0 + IB NDR", "120+ kW", "Rack-scale"],
          ]}
        />
      </section>

      <section id="gpu-clusters-overview">
        <h2 style={S.h2}>GPU Clusters — Overview</h2>
        <p style={S.p}>
          Ek single AI Compute Node powerful hai — lekin large model train karne ke liye akela kaafi nahi. <strong>GPU Cluster</strong> multiple AI Compute Nodes ko ek interconnected unit ki tarah kaam karwata hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Ek AI Compute Node ek very powerful factory worker hai. GPU cluster woh entire workforce hai jahan sab workers ek saath ek bade project pe kaam karte hain — aur ek dusre se fast communicate karte hain.
        </p>
        <p style={S.p}><strong>GPU cluster scale progression:</strong></p>
        <ul style={S.ul}>
          <li><strong>Small AI Cluster (8–64 GPUs):</strong> Research lab ya startup. Few AI Compute Nodes. Single InfiniBand switch. Fine for experiments aur smaller models.</li>
          <li><strong>Department Cluster (128–512 GPUs):</strong> AI team ya business unit. Multiple racks. Leaf-spine network. Medium model training possible.</li>
          <li><strong>Enterprise Cluster (1,000+ GPUs):</strong> Company-wide AI infrastructure. Multiple AI Pods. High-speed fabric. Large model training, production inference.</li>
          <li><strong>Hyperscale AI Cluster (10,000+ GPUs):</strong> Google, Meta, Microsoft scale. Entire AI Data Centers. Frontier model training. Only few companies operate at this level.</li>
        </ul>
        <Callout type="important" title="GPU Cluster — Dedicated Article Aayega">
          GPU Cluster ka detailed article alag se cover karega: topology design, InfiniBand fabric configuration, fault tolerance, distributed training setup, multi-node job management. Yahan sirf foundation samjho — cluster = many servers working together as one.
        </Callout>
      </section>

      <section id="east-west-traffic">
        <h2 style={S.h2}>East-West Traffic — AI Networking Ka Core Pattern</h2>
        <p style={S.p}>
          <strong>Traditional data center traffic pattern — North-South:</strong> Client (user) server se data request karta hai, server respond karta hai. Vertical flow. User ← → Server.
        </p>
        <p style={S.p}>
          <strong>AI data center traffic pattern — East-West:</strong> GPU servers ek dusre se constantly communicate karte hain gradient synchronization (AllReduce operation) ke liye. Horizontal flow between peers. Server ← → Server ← → Server.
        </p>
        <p style={S.p}>
          Scale pe: ek 1,000-GPU cluster mein, har training step pe sab GPUs apne gradients share karte hain — massive horizontal traffic between all nodes simultaneously. Yeh traditional networking switches ke design se bahut alag hai.
        </p>
        <p style={S.p}>
          <strong>Why this matters for infrastructure:</strong> North-South traffic ke liye design kiya gaya network AI ke East-West traffic handle nahi kar sakta efficiently. AI DC networking infrastructure specifically is pattern ke liye design hona chahiye — full bisection bandwidth, non-blocking fabric.
        </p>
        <Callout type="best-practice" title="East-West Traffic — AI Networking Article Mein Cover Hoga">
          AI Networking dedicated article mein East-West traffic pattern, fat-tree topology, InfiniBand fabric design, aur RoCE ke baare mein deep dive karenge. Yahan foundation: AI DC ka networking bahut zyada horizontal (peer-to-peer) traffic handle karta hai, traditional DC se fundamentally alag.
        </Callout>
      </section>

      <section id="ai-networking-overview">
        <h2 style={S.h2}>AI Networking — Overview</h2>
        <p style={S.p}>
          GPU servers ko ek dusre se connect karna — aur yeh connection bahut fast honi chahiye.
        </p>
        <p style={S.p}>
          <strong>Why networking matters so much in AI:</strong> Training mein, sab GPUs ek team ki tarah kaam karte hain. Har training step ke baad, sab GPUs ko apne gradients share karne hote hain (AllReduce operation). Agar network slow hai → sab GPUs wait karte hain → training slow hoti hai → expensive GPUs idle baithti hain → waste.
        </p>
        <p style={S.p}>
          <strong>High-Performance Fabric</strong> (also called High-Speed AI Network) — AI clusters mein yeh term use hoti hai GPU-to-GPU network ke liye. Current main technologies:</p>
        <ul style={S.ul}>
          <li><strong>InfiniBand (IB):</strong> Fastest option. 200–400 Gb/s per port. Ultra-low latency. NVIDIA (Mellanox) dominant vendor. Purpose-built for HPC/AI clusters.</li>
          <li><strong>RoCE (RDMA over Converged Ethernet):</strong> RDMA (Remote Direct Memory Access — CPU bypass karte hue direct memory communication) over standard Ethernet. Lower cost than IB. Used by many hyperscalers. AMD Gaudi chips RoCE natively support karte hain.</li>
          <li><strong>NVLink/NVSwitch:</strong> NVIDIA ka proprietary within-server GPU interconnect (900 GB/s per GPU). Same server ke andar GPUs ke beech. InfiniBand inter-server ke liye hai, NVLink intra-server ke liye.</li>
        </ul>
        <Figure caption="AI Cluster Network fat-tree topology: GPU servers (AI Compute Nodes) connect to Leaf Switches (local connection hubs). Leaf switches connect to Spine Switches (main backbone). Any server can communicate with any other at full bandwidth. Separate Management Network (dashed blue) runs independently for admin access — always available even if AI network has issues.">
          <AiClusterNetwork />
        </Figure>
        <p style={S.p}>
          <strong>Fat-tree topology:</strong> Standard AI cluster network design. Leaf switches (server-facing) + spine switches (leaf-facing). Full bisection bandwidth — koi bhi AI Compute Node kisi bhi doosre node se full bandwidth pe communicate kar sake.
        </p>
        <Callout type="important" title="Management Network — Separate Honi Chahiye">
          Har production AI cluster mein ek <strong>Management Network</strong> honi chahiye — AI training network se bilkul alag. Management network (typically 1 GbE IPMI/BMC) admins ko server access deta hai even if AI network ya OS down ho. Out-of-band management yeh ensure karta hai ki hardware issue pe bhi remotely troubleshoot kar sako. Yeh basic hai lekin kaafi clusters mein proper management network nahi hoti — ek expensive mistake.
        </Callout>
      </section>

      <section id="ai-storage-overview">
        <h2 style={S.h2}>AI Storage — Overview</h2>
        <p style={S.p}>
          Training data store karna — aur GPUs ko fast feed karna. Yeh "feeding problem" AI storage ka core challenge hai.
        </p>
        <p style={S.p}>
          Imagine karo ek large AI cluster. Har AI Compute Node ko continuously data chahiye taaki GPUs idle na rahi. Depending on workload and cluster size, aggregate storage throughput may reach several terabytes per second. Yeh number traditional storage systems se possible nahi hai.
        </p>
        <p style={S.p}><strong>Storage types in AI DC:</strong></p>
        <ul style={S.ul}>
          <li><strong>Hot Storage:</strong> Frequently accessed training data. Fast access, high bandwidth, expensive. Parallel file systems (Lustre, GPFS/Spectrum Scale) yahan hote hain. Directly connected to GPU cluster.</li>
          <li><strong>Cold Storage:</strong> Rarely accessed data — old datasets, archived models. Slow access, cheap. Object storage (S3, GCS, Azure Blob) yahan hoti hai.</li>
          <li><strong>Checkpoint Storage:</strong> Training checkpoints — needs to be fast (write quickly during training) aur durable (don't lose checkpoints). Typically all-flash NVMe with redundancy.</li>
          <li><strong>Object Storage:</strong> Scalable, durable, cloud-native. Training data archive, final model weights, experiment artifacts. Essentially infinite scale at low cost.</li>
        </ul>
        <Callout type="important" title="AI Storage — Dedicated Article Aayega">
          AI Storage article mein cover hoga: Lustre parallel file system, GPUDirect Storage (GPU directly NVMe se read karta hai — CPU bypass), RAID aur erasure coding, tiering strategy, checkpoint storage design. Yahan foundation samjho — storage = factory ka raw material supply chain.
        </Callout>
      </section>

      <section id="data-locality">
        <h2 style={S.h2}>Data Locality</h2>
        <p style={S.p}>
          <strong>Data locality</strong> ek important concept hai AI DC design mein. Principle simple hai: storage physically aur logically GPU cluster ke jitna paas hoga, latency utni kam hogi aur throughput utna zyada hoga.
        </p>
        <p style={S.p}>
          Agar training data storage ek alag building mein hai, aur GPU cluster doosri building mein — data network cross karna padega, latency add hogi, bandwidth limited hogi. Agar storage GPU cluster ke same row mein hai, direct high-speed connections available hain — latency minimal, bandwidth maximum.
        </p>
        <p style={S.p}>
          <strong>Design implication:</strong> AI DC design mein storage aur compute closely located karo. "Compute-storage proximity" ek design principle hai. Hyperscalers is ke liye dedicated building layouts plan karte hain. GPUDirect Storage (GPU directly storage se read karta hai — CPU bypass) is principle ko hardware level pe implement karta hai.
        </p>
        <p style={S.p}>
          Jab AI DC capacity plan karo — sirf GPU count count mat karo. Storage ka physical placement aur network path bhi plan karo.
        </p>
      </section>

      <section id="ai-cooling-overview">
        <h2 style={S.h2}>AI Cooling — Overview</h2>
        <p style={S.p}>
          <strong>Sabse highest power challenge AI DC ka hai cooling.</strong>
        </p>
        <p style={S.p}>
          Traditional enterprise air cooling commonly supports around 10–20 kW per rack. Advanced air-cooled designs may support around 30–40 kW under optimized conditions (raised floor, precision cooling, hot aisle containment, etc.). Higher-density AI racks increasingly rely on liquid cooling as power densities push beyond these ranges.
        </p>
        <Figure caption="Direct Liquid Cooling system: Cold water (18-22°C) enters rack, splits to cold plates directly on each GPU chip, absorbs heat (becoming 35-45°C warm water), exits to chiller plant which cools it back down. Continuous loop. Traditional air cooling handles 10-20 kW per rack maximum. Direct liquid cooling handles 120+ kW per rack.">
          <LiquidCoolingSystem />
        </Figure>
        <p style={S.p}><strong>Types of liquid cooling:</strong></p>
        <ul style={S.ul}>
          <li><strong>Cold plates on chips:</strong> Most efficient, highest heat removal. Cold water directly GPU chips ke cold plates se pass hoti hai.</li>
          <li><strong>Rear-door heat exchangers:</strong> Retrofit option for existing racks. Handles partial liquid cooling with existing server chassis.</li>
          <li><strong>Immersion cooling:</strong> Server completely submerged in dielectric fluid. 100+ kW per tank. Growing adoption. Specialty infrastructure.</li>
        </ul>
        <Callout type="important" title="AI Cooling — Dedicated Article Aayega">
          AI Cooling article mein cover hoga: DLC engineering (chilled water plants, cooling towers, distribution piping), immersion cooling design, PUE optimization, redundancy strategies. Foundation: cooling = power your AI DC can actually use safely.
        </Callout>
      </section>

      <section id="ai-power">
        <h2 style={S.h2}>AI Power Infrastructure</h2>
        <p style={S.p}>
          Power aur cooling closely linked hain. Jitna power consume hoti hai, utni heat generate hoti hai, utna cooling chahiye.
        </p>
        <Figure caption="AI Data Center Power Chain: Electricity Grid (high voltage) → Transformer (voltage reducer) → UPS Battery Backup (short-term grid blip protection) → Diesel Generators (longer outage backup, auto-start in 10-15 seconds) → PDU Power Distribution Unit (distributes to each rack) → AI GPU Server. Every step must be redundant — one power interruption crashes training jobs.">
          <AiPowerChain />
        </Figure>
        <ul style={S.ul}>
          <li><strong>UPS (Uninterruptible Power Supply):</strong> Grid power fail ho toh UPS batteries pe temporary switch karta hai. AI training mein ek microsecond power dip = job crash = hours/days of lost training. UPS critical hai.</li>
          <li><strong>Generators:</strong> Long-term power backup. Grid fail pe diesel/gas generators seconds mein start hote hain. AI facilities typically N+1 ya 2N generator redundancy.</li>
          <li><strong>PUE target:</strong> Modern AI facilities often target a PUE around 1.1–1.3, although the actual value depends on climate, cooling architecture, and operational conditions. Actual PUE varies significantly with climate, facility design, cooling architecture and operating conditions.</li>
        </ul>
      </section>

      <section id="rack-design">
        <h2 style={S.h2}>Rack Design in AI Data Centers</h2>
        <p style={S.p}>Traditional rack vs AI rack — bilkul different engineering challenge.</p>
        <p style={S.p}><strong>Traditional rack:</strong> 42U standard. Mix of different server types. Average 3–5 kW per server. Total: 10–15 kW per rack. Air cooled — front-to-back airflow.</p>
        <p style={S.p}><strong>Standard DGX H100 AI rack:</strong> 4× DGX H100 servers (8U each = 32U total). Top-of-rack InfiniBand leaf switches (2U). Total: 32 H100 GPUs per rack. Power: ~41 kW. Cooling: Liquid cooling strongly recommended.</p>
        <ul style={S.ul}>
          <li><strong>Power:</strong> Dedicated high-amperage circuits per rack. DGX H100 needs 2× 20A 208V per server. 4 servers = 8 circuits per rack. PDU must be 120%+ rated.</li>
          <li><strong>Cooling manifold:</strong> Cold plates on GPUs → coolant manifold in rack → distribution pipes → facility cooling plant. Leaks = catastrophic. Leak detection sensors mandatory.</li>
          <li><strong>Cable management:</strong> Each GPU server: 8+ high-speed network cables (InfiniBand). Plus power cables, management cables. Poor cable management = airflow blockage = thermal issues.</li>
          <li><strong>Weight:</strong> AI GPU servers heavy (DGX H100: ~130 kg per chassis). Floor load check mandatory before deployment.</li>
          <li><strong>Service access:</strong> GPU replacement field operation hai. Racks design karo so GPUs accessible hain bina major disassembly ke.</li>
        </ul>
      </section>

      <section id="ai-pod">
        <h2 style={S.h2}>AI Pod Concept</h2>
        <p style={S.p}>
          <strong>AI Pod</strong> ek <em>industry-wide concept</em> hai — sirf NVIDIA ka nahi. AI Pod = ek standardized, pre-validated computing unit — fixed set of AI Compute Nodes + networking + storage + software stack jo sab milke ek complete AI infrastructure unit banate hain.
        </p>
        <p style={S.p}><strong>Multiple vendors provide AI Pod solutions:</strong></p>
        <ul style={S.ul}>
          <li><strong>NVIDIA DGX SuperPOD</strong> — 20 DGX H100 nodes + InfiniBand spine-leaf = 160 H100 GPUs. Pre-validated NVIDIA reference design.</li>
          <li><strong>Dell AI Factory Pod</strong> — Dell EMC servers + PowerSwitch networking + PowerScale storage. Dell-validated.</li>
          <li><strong>HPE AI Pod</strong> — HPE ProLiant servers + HPE networking + Cray ClusterStor storage. HPE-validated.</li>
          <li><strong>Supermicro AI Pod</strong> — Supermicro GPU servers + networking bundles.</li>
        </ul>
        <p style={S.p}><strong>Why Pod concept matters:</strong> Traditional approach: design custom, order components, integrate, troubleshoot, validate — months. Pod approach: standard reference design, pre-validated. Order, deploy, configure software stack. Time to production dramatically reduced.</p>
        <p style={S.p}><strong>Scaling Pods:</strong> 1 Pod → multiple Pods → cluster. Modular, predictable, repeatable. Each Pod adds known compute capacity.</p>
        <p style={S.p}><strong>Pod limitations:</strong> Less flexibility (opinionated design). Premium pricing vs fully custom. Specific vendor dependencies for support.</p>
      </section>

      <section id="ai-factory">
        <h2 style={S.h2}>AI Factory Concept</h2>
        <p style={S.p}>
          <strong>Important distinction — yeh AI Data Center se alag hai:</strong>
        </p>
        <p style={S.p}>
          <strong>AI Data Center</strong> = physical infrastructure. Building, power, cooling, network, servers. Ek facility.
        </p>
        <p style={S.p}>
          <strong>AI Factory</strong> = complete AI production environment. Ek AI Factory mein shamil hain:
        </p>
        <ul style={S.ul}>
          <li>AI Data Center (one or more physical facilities)</li>
          <li>Compute infrastructure (GPU clusters)</li>
          <li>Storage (training data aur model storage)</li>
          <li>Networking (high-performance fabric)</li>
          <li>Data pipelines (ETL, preprocessing, labeling systems)</li>
          <li>AI frameworks (PyTorch, TensorFlow, JAX)</li>
          <li>Model training systems (distributed training frameworks)</li>
          <li>Model deployment and inference infrastructure</li>
          <li>Operations (monitoring, reliability, MLOps)</li>
        </ul>
        <p style={S.p}>
          <strong>AI Factory analogy:</strong> Traditional factory mein raw materials aati hain → machines process karti hain → finished products nikalte hain. AI Factory mein: raw data aati hai → GPU compute process karta hai → trained AI models nikalte hain. Data = raw material. AI Compute Nodes = machines. Models = finished products.
        </p>
        <p style={S.p}><strong>Real examples at AI Factory scale:</strong></p>
        <ul style={S.ul}>
          <li>xAI "Colossus" cluster (Memphis): 100,000 H100 GPUs, entire facility dedicated to AI</li>
          <li>Microsoft dedicated OpenAI infrastructure: Multiple DCs + complete software stack + operations</li>
          <li>Google TPU infrastructure: Custom chips + software (TF, JAX) + deployment pipeline</li>
        </ul>
        <Callout type="important" title="AI Factory — Sirf Infrastructure Nahi Hai">
          Ek baat yaad rakhna: sirf GPU servers khareedne se AI Factory nahi banta. AI Factory mein data collection, preprocessing, training automation, model evaluation, deployment pipeline, aur operations sab kuch shamil hona chahiye. Hardware ek component hai — poori system design zaroori hai.
        </Callout>
      </section>

      <section id="data-flow">
        <h2 style={S.h2}>AI Data Flow — Dataset to Results</h2>
        <p style={S.p}>
          Ek complete AI training job mein data kaise move karta hai — step by step, har hop ke saath engineering detail.
        </p>
        <Figure caption="Complete AI Data Flow: Raw Data (text, images, videos) → Cleaning (remove noise, deduplicate) → Labeling (annotate, categorize) → Preprocessing and Tokenization (format for model) → Training Dataset in Storage → GPU Cluster (AI Compute Nodes) → Model Training (learning from examples) → Checkpoint Storage (saved every ~30 min during training) → Model Registry (versioned, validated) → Inference Deployment (serving users 24/7). Checkpoint loop runs continuously throughout training.">
          <AiDataFlow />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Step 1 — Raw Data:</strong> Text, images, videos, sensor data — various sources se collected. Volume: gigabytes to petabytes.</li>
          <li><strong>Step 2 — Cleaning:</strong> Remove duplicates, filter low-quality data, remove personally identifiable information where required. CPU-based processing — standard servers.</li>
          <li><strong>Step 3 — Labeling:</strong> Supervised learning ke liye data annotate karna. Human labelers ya automated labeling pipelines. Example: images mein objects identify karna, text mein entities tag karna.</li>
          <li><strong>Step 4 — Preprocessing / Tokenization:</strong> Data ko model ke expected format mein convert karna. Language models ke liye: tokenization (text ko numbers mein convert). Vision models ke liye: image normalization, resizing.</li>
          <li><strong>Step 5 — Training Dataset in Storage:</strong> Processed dataset hot storage (parallel file system) pe store hota hai. GPU cluster ke paas physically — data locality important hai.</li>
          <li><strong>Step 6 — GPU Cluster:</strong> AI Compute Nodes storage se training batches continuously pull karte hain. DataLoader (CPU pe) data prepare karta hai aur GPU memory mein transfer karta hai.</li>
          <li><strong>Step 7 — Model Training:</strong> Forward pass → loss calculation → backward pass → AllReduce gradient sync → optimizer update → next batch. Repeat millions of times.</li>
          <li><strong>Step 8 — Checkpoint Storage:</strong> Har ~30 minutes: current model weights fast NVMe storage pe save hote hain. Async copy durable object storage pe. Job crash hone pe yahan se resume hota hai.</li>
          <li><strong>Step 9 — Model Registry:</strong> Training complete hone pe: model versioned aur registered. Metadata: training config, dataset version, performance metrics. Multiple model versions manage karna — kaunsa version production mein jaayega.</li>
          <li><strong>Step 10 — Inference Deployment:</strong> Production model inference servers pe deploy hota hai. TensorRT ya similar optimization, quantization. Load balancer, autoscaling. Users requests serve hone lagte hain.</li>
        </ul>
      </section>

      <section id="gpu-scheduler">
        <h2 style={S.h2}>GPU Scheduling and Job Queues</h2>
        <p style={S.p}>
          AI data center mein GPUs expensive aur shared resources hain. Multiple teams, multiple users, multiple AI jobs ek hi cluster share karte hain. Koi manually decide nahi kar sakta ki kab kaunsa job kaunse GPU pe chalega. Isliye <strong>GPU Scheduler</strong> hota hai.
        </p>
        <p style={S.p}>
          GPU Scheduler ek system hai jo decide karta hai ki kaun sa job kab aur kaunse GPU resources pe run kare. User apna job submit karta hai → job queue mein jaata hai → scheduler resources available hone pe automatically allocate karta hai → job start hoti hai → resources release hoti hain.
        </p>
        <p style={S.p}><strong>AI jobs do not always start immediately.</strong> Agar sab GPUs busy hain, naya job queue mein wait karta hai. Scheduler priority, fair share, aur resource requirements ke basis pe decide karta hai ki kaunsa queued job pehle run hoga. Yeh GPU utilization maximize karta hai aur teams ke beech fair usage ensure karta hai.</p>
        <p style={S.p}><strong>Common GPU schedulers:</strong></p>
        <ul style={S.ul}>
          <li><strong>Slurm:</strong> HPC standard. Most AI research clusters. Command: <code style={S.code}>sbatch job.sh</code></li>
          <li><strong>Kubernetes:</strong> Containerized workloads. GPU device plugin se GPU allocation manage karta hai. Cloud-native.</li>
          <li><strong>Ray:</strong> Python-native distributed computing. Training aur inference dono. Popular in ML community.</li>
          <li><strong>Volcano:</strong> Kubernetes-native batch job scheduler. GPU job scheduling aur gang scheduling ke liye.</li>
        </ul>
      </section>

      <section id="gpu-utilization">
        <h2 style={S.h2}>GPU Utilization</h2>
        <p style={S.p}>
          <strong>GPU utilization</strong> = percentage of time GPU actually computing (vs idle/waiting). Target during training: 85–95%. Low utilization (under 60%) during training = problem signal — kuch bottleneck hai.
        </p>
        <p style={S.p}>
          <strong>Idle GPUs are expensive.</strong> Ek H100 GPU ~$2–3/hour cloud cost hai. 1,000 GPUs × 40% idle = 400 GPUs wasted × $2.50/hr = $1,000/hr wasted. Isliye schedulers continuously GPU utilization maximize karne ki koshish karte hain.
        </p>
        <p style={S.p}>
          Lekin <strong>100% GPU compute utilization hamesha achievable ya even desirable nahi hoti</strong>. AI training mein teen phases hote hain: compute (GPU busy doing math), data loading (waiting for next batch from storage), communication (waiting for AllReduce gradient sync from other GPUs). Agar storage ya network bottleneck hai, GPU 100% compute utilization nahi hogi lekin woh actual bottleneck nahi hai — woh bottleneck fix karna chahiye.
        </p>
        <p style={S.p}>
          Isliye GPU utilization ek important metric hai, lekin sirf ek metric hai. Profile karo — GPU idle hai toh kyun? Data loading slow? Network sync slow? Compute genuinely maxed out? Answer different fix demand karta hai.
        </p>
      </section>

      <section id="multi-tenancy">
        <h2 style={S.h2}>Multi-Tenancy</h2>
        <p style={S.p}>
          <strong>Multi-tenancy</strong> = same physical GPU cluster multiple teams ya users securely share karein.
        </p>
        <p style={S.p}>
          Ek badi company ka GPU cluster multiple teams simultaneously use karti hain: Research team experiments run karti hai. Production team inference service chalati hai. Development team model fine-tuning karta hai. Data science team analysis karta hai. Sab log same physical hardware share karte hain lekin logically isolated hote hain — ek team ki jobs doosri team ke data ya jobs access nahi kar sakti.
        </p>
        <ul style={S.ul}>
          <li><strong>Scheduler resource allocation:</strong> Har team ko GPU quota milta hai. Fair share ensures no single team monopolizes resources.</li>
          <li><strong>Chargeback/showback systems:</strong> Which team used how much GPU compute. Finance team ko accurate billing enable karta hai. Visibility drives efficiency.</li>
          <li><strong>Container isolation (Kubernetes namespaces):</strong> Data aur workload isolation. Ek namespace ki pods doosri namespace ke resources access nahi kar sakti.</li>
          <li><strong>Network isolation:</strong> Training jobs ke beech network traffic isolated. Ek job ka training traffic doosri job ka data access nahi kar sakti.</li>
        </ul>
      </section>

      <section id="software-stack">
        <h2 style={S.h2}>AI Software Stack Overview</h2>
        <p style={S.p}>
          Hardware sirf hardware hai. Software ke bina yeh sab metal aur silicon hai. AI DC ka software stack layered hai — har layer doosri layer pe depend karti hai.
        </p>
        <ComparisonTable
          title="AI Software Stack — Layer by Layer"
          headers={["Layer", "Examples", "What It Does"]}
          rows={[
            ["Application", "Your training script, inference service", "The AI job you actually want to run"],
            ["Framework", "PyTorch, TensorFlow, JAX", "Defines model, training loop; handles GPU ops under the hood"],
            ["CUDA / ROCm", "CUDA Toolkit, ROCm", "GPU programming runtime; framework uses these"],
            ["GPU Drivers", "NVIDIA driver, AMD amdgpu driver", "Kernel-level hardware interface — mandatory"],
            ["Firmware", "GPU BIOS, NIC firmware, BMC firmware", "Hardware-level initialization and management"],
            ["GPU Hardware", "H100, MI300X, TPU v4", "The actual silicon doing the math"],
          ]}
        />
        <p style={S.p}><strong>Layer details:</strong></p>
        <ul style={S.ul}>
          <li><strong>Firmware:</strong> GPU hardware ka lowest-level software. Boot, initialize, hardware management. BMC (Baseboard Management Controller) firmware out-of-band management enable karta hai. Kabhi kabhi firmware update karna padta hai for new hardware features ya bug fixes — yeh production disruption cause kar sakta hai, so change management strict hona chahiye.</li>
          <li><strong>GPU Drivers:</strong> Kernel-level hardware interface. NVIDIA ke liye CUDA driver. AMD ke liye ROCm amdgpu driver. Driver version compatibility critical hai. Driver updates staging pe test karo, phir production pe deploy karo.</li>
          <li><strong>CUDA / ROCm:</strong> GPU programming API aur runtime. Framework developers use karte hain — mostly transparent to ML engineers. Library compatibility (cuDNN, cuBLAS, NCCL) driver version se tied hai.</li>
          <li><strong>Framework:</strong> PyTorch, TensorFlow, JAX. ML engineers yahan kaam karte hain. Model define karo, training loop likho, GPU operations internally handle hote hain.</li>
          <li><strong>Application:</strong> Training jobs, inference services, MLOps pipelines. Specific AI use case ke liye build ki gayi code.</li>
        </ul>
        <Callout type="warning" title="Software Stack Compatibility — Real Engineering Challenge">
          Yeh layers ek saath kaam karni chahiye. Ek incompatible driver version sab kuch break karta hai. Dependency management AI DC mein ek real engineering challenge hai. Containers (Docker, Kubernetes) help karte hain environments isolate karke — har team apna container image use karta hai, driver compatibility infrastructure team manage karti hai.
        </Callout>
        <p style={S.p}><strong>Additional AI-specific software layers:</strong></p>
        <ul style={S.ul}>
          <li><strong>Job Scheduler:</strong> Slurm, Kubernetes, Ray — resource allocation aur job queuing</li>
          <li><strong>Distributed Training:</strong> NCCL/RCCL, DeepSpeed, Megatron-LM — multi-GPU training</li>
          <li><strong>Monitoring:</strong> DCGM, Prometheus, Grafana — GPU health aur training metrics</li>
          <li><strong>MLOps:</strong> MLflow, Weights and Biases — experiment tracking, model versioning</li>
          <li><strong>Inference Serving:</strong> TensorRT-LLM, vLLM, Triton Inference Server — production model serving</li>
        </ul>
      </section>

      <section id="enterprise-ai-dc">
        <h2 style={S.h2}>Enterprise AI Data Centers</h2>
        <p style={S.p}>
          <strong>Enterprise AI DC</strong> woh hai jise ek company apne internal AI needs ke liye build ya operate karti hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Scale:</strong> Smaller than hyperscalers. Typically 100–10,000 GPUs. Multi-tenant (different teams sharing resources).</li>
          <li><strong>Mixed workloads:</strong> Training (new models), inference (production serving), experimentation — sab mixed.</li>
          <li><strong>Compliance requirements:</strong> Healthcare = HIPAA. Finance = SOX, PCI. Government = FedRAMP, FISMA. Data must stay in specific regions.</li>
          <li><strong>Data sovereignty:</strong> Enterprise DC mein data company ke control mein rehta hai — cloud pe nahi jaata. Sensitive data (patient records, financial data, trade secrets) ke liye critical.</li>
          <li><strong>Budget reality:</strong> $1M–$100M range. ROI justification required. Board-level approval for large AI investments.</li>
          <li><strong>Hybrid approach:</strong> Most enterprises don't build 100% on-premises AI DC. Hybrid: sensitive training on-prem, inference on cloud, experimentation on cloud.</li>
        </ul>
      </section>

      <section id="hyperscale-ai-dc">
        <h2 style={S.h2}>Hyperscale AI Data Centers</h2>
        <p style={S.p}>
          <strong>Hyperscale</strong> = building at a scale regular companies don't. Google, Microsoft, Amazon, Meta, Apple — these are hyperscalers.
        </p>
        <ul style={S.ul}>
          <li><strong>Scale:</strong> 10,000–100,000+ GPUs per cluster. Multiple clusters per facility. Multiple facilities globally.</li>
          <li><strong>Custom hardware:</strong> Google TPU, AWS Trainium, Meta MTIA — custom chips. Optimize at silicon level.</li>
          <li><strong>Custom networking:</strong> Don't buy standard InfiniBand at their scale. Build custom optical network fabrics.</li>
          <li><strong>Location strategy:</strong> Near cheap/renewable power (Pacific Northwest hydro, Midwest wind), cool climates, near fiber network hubs.</li>
          <li><strong>Efficiency obsession:</strong> At Google scale, 0.1 PUE improvement = hundreds of millions of dollars saved annually.</li>
        </ul>
        <ComparisonTable
          title="Enterprise vs Hyperscale AI Data Centers"
          headers={["Factor", "Enterprise", "Hyperscale"]}
          rows={[
            ["GPU count", "100–10,000", "10,000–1,000,000+"],
            ["Buying approach", "Standard products", "Custom hardware"],
            ["Software", "Commercial + open-source", "Mostly custom"],
            ["Power scale", "1–50 MW", "100 MW – 1 GW+"],
            ["Data center count", "1–10", "Dozens globally"],
            ["Investment", "Millions–hundreds of millions", "Billions annually"],
          ]}
        />
      </section>

      <section id="capacity-planning">
        <h2 style={S.h2}>Capacity Planning</h2>
        <p style={S.p}>
          AI DC capacity planning traditional DC se fundamentally different hai.
        </p>
        <p style={S.p}><strong>GPU Hours as currency:</strong> Traditional DC: CPU cores, RAM, storage. AI DC: <strong>GPU Hours</strong> primary currency hai. Ek H100 GPU ko 1,000 hours de do = 1,000 H100-hours of compute. Budget allocation: "Q3 mein R&amp;D team ko 50,000 H100-hours milenge."</p>
        <p style={S.p}><strong>Utilization targets:</strong> Training jobs: target 85–95% GPU utilization. Under 70% = investigate. Inference: variable — target burst capacity handle karna, baseline pe over-provisioning avoid karna.</p>
        <p style={S.p}><strong>Storage planning:</strong> Training datasets grow rapidly. Plan: current needs × 3–5× growth factor minimum. Parallel file system significant overhead rakhta hai — raw capacity × 1.5–2× for usable capacity.</p>
        <p style={S.p}><strong>Power planning:</strong> N+1 minimum for every circuit. 2N for critical inference. Power roadmap 3–5 years ahead — AI hardware power density increasing every generation.</p>
        <p style={S.p}><strong>Growth planning:</strong> AI workloads grow faster than traditional IT. Conservative estimate: 2× compute demand per year for an active AI team. Design power, cooling, and network infrastructure for 3–5 year growth.</p>
        <Callout type="best-practice" title="Modular Design — Build in Pods">
          Build in modules (pods). Phase 1: 4 pods. Phase 2 (6 months later): 4 more pods. Modular approach avoids over-building too early. Each pod adds known compute, power, cooling capacity. Future expansion pre-planned in initial infrastructure design.
        </Callout>
      </section>

      <section id="scalability">
        <h2 style={S.h2}>Scalability</h2>
        <p style={S.p}>AI DC must scale gracefully. Training a 7B model today, 70B model next year — infrastructure must scale.</p>
        <ul style={S.ul}>
          <li><strong>Horizontal compute scaling:</strong> Add more AI Compute Nodes to cluster. Relatively easy — add servers, connect to existing network.</li>
          <li><strong>Network scaling:</strong> Fat-tree topology allows horizontal scaling. Add more leaf switches per existing spine → attach more servers. Pre-plan spine capacity for 3× expected growth.</li>
          <li><strong>Storage scaling:</strong> Scale-out parallel file systems — add more storage nodes. Ensure storage bandwidth scales with compute additions.</li>
          <li><strong>Software scalability:</strong> More nodes → distributed training more complex. Gradient sync latency, network congestion management, job fault tolerance (probability of any node failing increases with cluster size).</li>
          <li><strong>Blast radius:</strong> Larger cluster = single point failures affect more jobs. Design for fault isolation — failure in one rack should not cascade to other racks.</li>
        </ul>
      </section>

      <section id="reliability">
        <h2 style={S.h2}>Reliability</h2>
        <p style={S.p}>
          AI data center mein "downtime" ka meaning alag hai. Traditional DC downtime: website unreachable, revenue loss. AI DC training downtime: A 14-day training job ka day 12 pe ek node fail ho → last checkpoint day 10 pe tha → 2 days of computation lost → cost: significant.
        </p>
        <p style={S.p}>
          <strong>Large AI clusters are designed with the assumption that hardware failures happen regularly — they are expected events, not exceptional ones.</strong> GPU failures, NIC (Network Interface Card) failures, disk failures, power supply failures, and even node-level crashes happen with statistical regularity when you have thousands of components. This is one of the biggest differences from traditional enterprise infrastructure thinking, where failures are treated as rare incidents.
        </p>
        <p style={S.p}>
          Cluster software aur job schedulers is for designed hain: automatic job rescheduling when a node fails, checkpoint-based recovery, health monitoring that removes failed nodes from the active pool. Yeh failsafe mechanisms trained hona chahiye — not reactive to individual failures.
        </p>
        <p style={S.p}><strong>What fails (and frequency at scale):</strong></p>
        <ul style={S.ul}>
          <li><strong>GPU failures:</strong> At large cluster scale, even relatively low individual-component failure rates can translate into regular hardware failures.</li>
          <li><strong>Memory errors (ECC):</strong> Correctable single-bit errors: normal. Uncorrectable double-bit errors → GPU replacement.</li>
          <li><strong>InfiniBand cable/transceiver failures:</strong> Network connectivity loss at port level.</li>
          <li><strong>PSU failures:</strong> Server power supply failure — dual PSU prevents outage.</li>
        </ul>
        <p style={S.p}><strong>Reliability strategies:</strong> Mandatory checkpointing, redundant hardware (N+1 PSUs, dual network paths), monitoring with predictive alerts (temperature trends, ECC error rate increase), spare parts inventory (hot spare GPUs for field replacement).</p>
      </section>

      <section id="redundancy">
        <h2 style={S.h2}>Redundancy</h2>
        <p style={S.p}>Redundancy = backup hai har critical component ka. AI DC mein specifically:</p>
        <ul style={S.ul}>
          <li><strong>Power redundancy:</strong> N+1 PSU per AI Compute Node. Dual UPS feeds. Generator redundancy (N+1 minimum, 2N for critical inference). Dual PDUs per rack.</li>
          <li><strong>Network redundancy:</strong> Dual network connections per server to two different leaf switches. Redundant spine switches. Out-of-band management network (separate, always on).</li>
          <li><strong>Storage redundancy:</strong> Erasure coding (data distributed across drives with parity — one drive fails, still accessible). Storage node redundancy (parallel file system distributed, one node fail → rest continue). Critical data replicated to object storage.</li>
          <li><strong>Cooling redundancy:</strong> N+1 cooling circuits. Leak detection sensors. Emergency air cooling backup (if liquid cooling fails, safe GPU shutdown time).</li>
        </ul>
      </section>

      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>
        <p style={S.p}>High Availability (HA) = system available rehna jab single components fail hote hain.</p>
        <ComparisonTable
          title="HA Tiers for AI DC Services"
          headers={["Service", "HA Target", "Strategy"]}
          rows={[
            ["GPU Training Jobs", "Best-effort (checkpoint recovery)", "Checkpointing + job reschedule on failure"],
            ["Production Inference", "99.9%+ uptime", "Load balancer + multiple servers + auto-restart"],
            ["Storage", "99.99%+", "Erasure coding + replication + HA controllers"],
            ["Management systems", "99.9%+", "Clustered control plane, out-of-band backup"],
            ["Power", "99.999%+", "2N UPS + N+1 generators + dual feeds"],
          ]}
        />
      </section>

      <section id="security">
        <h2 style={S.h2}>Security</h2>
        <p style={S.p}>AI DC security traditional DC se alag challenges rakhti hai:</p>
        <ul style={S.ul}>
          <li><strong>Physical security:</strong> GPU servers high-value targets ($300K+ per server). Biometric + badge access, mantrap entry, 24/7 CCTV, hardware inventory management (serial numbers of every GPU).</li>
          <li><strong>Network security:</strong> Training network segmented from management aur user networks. Encryption for data in transit. Unauthorized devices AI fabric mein join nahi kar sakte.</li>
          <li><strong>Data security:</strong> Training data encryption at rest. Access control — who can read which datasets. Data lineage — which model was trained on which data.</li>
          <li><strong>Model security:</strong> Trained models valuable IP. Model registry access control. Model weight encryption. Export controls (some AI models subject to government regulations).</li>
          <li><strong>AI-specific concerns:</strong> Data poisoning (malicious actor manipulates training data), model extraction (competitor queries inference API extensively to steal model), prompt injection (for deployed LLMs).</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2 style={S.h2}>Monitoring</h2>
        <Figure caption="AI Data Center Monitoring Dashboard: 6 panels — GPU Health (all GPUs, one warning, one failure shown), Training Progress (loss curve converging), Power Consumption (38MW of 40MW used, PUE 1.18), Network Traffic (4.2 TB/s AllReduce gradient sync), Cooling Status (all sensors normal), Active Jobs (47 training, 12 inference, 3 queued). Engineers watch all this simultaneously 24/7.">
          <AiDcMonitoring />
        </Figure>
        <p style={S.p}><strong>Hardware monitoring (via DCGM — NVIDIA Data Center GPU Manager):</strong></p>
        <ul style={S.ul}>
          <li>GPU utilization percentage (target greater than 80% during training)</li>
          <li>GPU temperature (H100 throttle at ~83°C)</li>
          <li>Power draw vs TDP</li>
          <li>ECC error rates (single-bit, double-bit)</li>
          <li>NVLink bandwidth utilization</li>
        </ul>
        <p style={S.p}><strong>Software monitoring:</strong></p>
        <ul style={S.ul}>
          <li>Training loss curve (converging?)</li>
          <li>Time per training step (consistency check)</li>
          <li>AllReduce bandwidth (networking bottleneck detection)</li>
          <li>Inference latency (P50, P95, P99 percentiles)</li>
          <li>Request queue depth</li>
        </ul>
        <p style={S.p}><strong>Monitoring stack:</strong> DCGM → Node exporters → Prometheus (metrics collection) → Grafana (dashboards) → PagerDuty / OpsGenie (alerting).</p>
        <ComparisonTable
          title="Key Alert Thresholds"
          headers={["Metric", "Warning", "Critical"]}
          rows={[
            ["GPU temperature", "Greater than 78°C", "Greater than 83°C (H100 throttle)"],
            ["GPU utilization (training)", "Less than 70%", "Less than 50%"],
            ["ECC double-bit errors", "Any occurrence", "Persistent / frequent"],
            ["Cooling inlet temp", "Greater than 22°C", "Greater than 28°C"],
            ["PSU redundancy", "Redundancy lost", "Both PSUs fail"],
            ["AllReduce latency", "2× baseline", "5× baseline"],
          ]}
        />
      </section>

      <section id="common-mistakes">
        <h2 style={S.h2}>Common Design Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Underestimating power density:</strong> "Traditional DC mein 10 kW per rack tha, AI DC mein bhi wahi rahega" — galat. AI racks can range from tens of kilowatts to well over 100 kW depending on the GPU platform and rack architecture. Fix: design from actual GPU server specs, not historical averages. Include 20% headroom.</li>
          <li><strong>Skipping liquid cooling planning:</strong> Air cooling sirf limited density tak adequate hai. High-density AI racks mein air cooling insufficient hoti hai. Retrofitting 3× more expensive aur disruptive hai. Fix: plan liquid cooling from day 1.</li>
          <li><strong>Under-provisioning network:</strong> 10 GbE jo traditional DC mein fine hai, AI training mein GPUs ko idle rakhta hai. Fix: size network for actual GPU-to-GPU bandwidth requirements.</li>
          <li><strong>No checkpointing strategy:</strong> 10 days baad ek GPU fail hui → restart from zero → 10 days compute wasted. Fix: checkpoint every 30 minutes, test checkpoint restoration before long runs.</li>
          <li><strong>Ignoring storage bandwidth:</strong> "We have a lot of storage" — capacity enough, bandwidth too slow → GPUs starved for data → utilization drops. Fix: calculate required storage bandwidth per workload.</li>
          <li><strong>No separate management network:</strong> AI training network down → koi bhi server manage nahi kar sakte. Fix: separate out-of-band management network (IPMI/BMC) on every server.</li>
          <li><strong>Poor cable management:</strong> Cables messy → airflow blocked → temperatures rise → thermal issues over time. Fix: proper cable management at install time.</li>
          <li><strong>No GPU spare parts strategy:</strong> GPU delivery time weeks/months. During that time cluster capacity reduced. Fix: maintain 5% hot spare GPU inventory.</li>
          <li><strong>Software version chaos:</strong> Different teams different CUDA versions, driver conflicts. Fix: container-based workloads, standardized base images, infrastructure team controls driver versions.</li>
          <li><strong>Not planning for failure as normal:</strong> Designing AI cluster assuming hardware rarely fails — at scale it fails regularly. Design recovery systems, not just prevention.</li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Design in modules (AI Pods):</strong> Phase 1: 4 pods. Phase 2: 4 more. Modular design avoids over-building. Each pod complete unit — compute, networking, storage, power, cooling.</li>
          <li><strong>Separate training and inference infrastructure:</strong> Training: max compute, high memory, sustained operation. Inference: low latency, autoscaling, cost efficient. Different GPU types, different configs.</li>
          <li><strong>Plan for 3–5 years growth:</strong> Power, cooling, network — design for 3× current capacity minimum.</li>
          <li><strong>Use reference architectures first:</strong> Validated designs (AI Pod from any major vendor) before going fully custom.</li>
          <li><strong>Mandatory checkpointing policy:</strong> All training jobs must checkpoint. Enforce it in scheduler — not optional.</li>
          <li><strong>GPU utilization visibility:</strong> Every team sees their GPU utilization. Low utilization = waste. Visibility drives efficiency.</li>
          <li><strong>Container-based workloads:</strong> Docker/Kubernetes for all AI jobs. Reproducibility, dependency isolation, easy migration.</li>
          <li><strong>MLOps from day 1:</strong> Experiment tracking (W&B, MLflow) from the start. Model versioning. Reproducible training runs.</li>
          <li><strong>Infrastructure as Code:</strong> Ansible/Terraform for configuration management. Version-controlled, repeatable, auditable.</li>
          <li><strong>Incident response playbooks:</strong> GPU failure → what to do. Network partition → what to do. Power event → what to do. Pre-written, tested, team-trained.</li>
        </ul>
      </section>

      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          headers={["Problem", "Diagnostic", "Solution"]}
          rows={[
            ["Low GPU utilization during training", "DCGM dashboard + Nsight Systems trace — GPU idle mein kya kar rahi?", "Data loading slow: more DataLoader workers. Network bottleneck: check AllReduce latency. Wrong batch size: increase."],
            ["Training loss not converging", "Loss curve monitor, check for NaN values, ECC errors", "Learning rate issue, data quality bug, gradient explosion (add clipping), numerical precision issue"],
            ["GPU temperature rising / throttling", "nvidia-smi / rocm-smi temperature + coolant flow check", "Cooling issue (flow rate, temperature), airflow blockage, power cap, new workload higher power"],
            ["Network errors during distributed training", "NCCL_DEBUG=INFO, ibstat on each node, ping between nodes", "Cable/transceiver failure, switch port issue, firmware bug — replace cable, check switch logs"],
            ["Job scheduler not starting jobs", "squeue/sinfo state, node drain reason, resource requirements", "Node in DOWN/DRAIN state, resource overcommit, fairshare limits, reservation conflicts"],
            ["Storage bandwidth degraded", "Storage system I/O monitoring, other jobs I/O check", "Parallel job I/O interference, storage node failure, network between storage and compute"],
            ["First training iteration very slow", "MIOpen/cuDNN kernel compilation check (first run)", "Warmup dummy batch first, cache kernels, use framework's compilation cache"],
            ["Inference latency spikes", "P95/P99 latency trace, queue depth monitoring", "Autoscaling triggered: add instances. Model too large: quantize. GC pressure: optimize memory."],
          ]}
        />
      </section>

      <section id="future">
        <h2 style={S.h2}>Future of AI Data Centers</h2>
        <p style={S.p}><strong>Near-term (2025–2027):</strong> Liquid cooling is expected to become increasingly common in new high-density AI deployments. Rack power continues increasing (GB200 NVL72 ka 120 kW already today's leading edge). 400G-class and higher-speed networking will become increasingly common in large-scale AI deployments. AI-specific chips dominate (Blackwell, MI350, TPU v6, Trainium 2, Maia).</p>
        <p style={S.p}><strong>Medium-term (2027–2030):</strong> Optical computing in production for certain AI operations (companies like Lightmatter already building photonic AI chips). Near-memory computing — processing directly in memory chips, eliminates HBM bandwidth bottleneck for some ops. Nuclear power for AI — Microsoft + TerraPower, Google + Kairos Power deals already signed for dedicated nuclear capacity.</p>
        <p style={S.p}><strong>Long-term themes:</strong> Efficiency drives everything — energy costs and carbon footprint of AI becoming major societal concerns. Specialization increases — domain-specific inference chips, algorithm-specific accelerators. Global AI infrastructure race — nations building sovereign AI compute capacity. EU AI Factories program, India AI Mission, Gulf Cooperation Council massive investments.</p>
      </section>

      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>
        {[
          {
            q: "AI Data Center aur Traditional Data Center mein sabse fundamental difference kya hai?",
            a: "Sabse fundamental difference hai power density aur cooling requirements. Traditional DC: 3–15 kW per rack, air cooling adequate. AI DC: AI racks can range from tens of kilowatts to well over 100 kW depending on platform and rack architecture. Direct Liquid Cooling increasingly used and commonly required for many high-density AI rack designs. AI DC mein networking ka purpose bhi completely different hai — GPU-to-GPU gradient synchronization (East-West traffic) for training, not just user traffic (North-South). Workload pattern bhi alag: traditional DC variable spiky loads, AI DC sustained compute days to weeks continuously. In differences ki wajah se AI DC ko fundamentally different engineering approach chahiye — power distribution, cooling plant, network fabric, floor structure sab alag hote hain.",
          },
          {
            q: "AI Factory aur AI Data Center mein kya fark hai?",
            a: "AI Data Center ek physical infrastructure facility hai — building, power, cooling, network, servers. Ek location pe hardware. AI Factory ek complete AI production environment hai jo AI Data Center ko ek component ki tarah use karta hai. AI Factory mein shamil hain: AI Data Centers (one or more physical facilities), compute infrastructure (GPU clusters), storage (training data aur models), high-performance networking fabric, data pipelines (ETL, preprocessing), AI frameworks (PyTorch, TensorFlow), distributed training systems, model deployment and inference infrastructure, aur operations (monitoring, reliability, MLOps). Ek AI Factory multiple data centers span kar sakti hai. Practical example: OpenAI ka 'AI Factory' = Microsoft Azure AI data centers (hardware) + OpenAI ke training software + GPT model pipeline + ChatGPT inference serving = complete production environment.",
          },
          {
            q: "GPU cluster mein 'network bottleneck' kya hoti hai aur kaise detect aur fix karte hain?",
            a: "Network bottleneck AI training mein tab hoti hai jab gradient synchronization (AllReduce operation) itna slow ho ki GPUs compute se zyada network ke liye wait karte hain. Training mein sab GPUs parallel kaam karte hain — har training step ke baad sab GPUs gradients share karte hain (AllReduce). Agar network slow hai, GPUs idle wait karte hain is communication ke liye. Detection: DCGM dashboard mein GPU utilization drop during backward pass. Nsight Systems timeline mein AllReduce operations visible — agar AllReduce step time ka 30%+ hai → network bottleneck. NCCL_DEBUG=WARN logs mein slowness indicators. Direct bandwidth test: NCCL tests suite run karo — actual vs theoretical bandwidth compare karo. Causes: InfiniBand cable/transceiver degradation, switch port issue, network congestion, wrong NCCL config. Fixes: cable/transceiver replace, NCCL topology hints, gradient compression, gradient accumulation (sync less frequently), network hardware upgrade.",
          },
          {
            q: "AI DC mein checkpointing kyun critical hai aur frequency kaise decide karte hain?",
            a: "AI training jobs long-running hote hain (days to weeks) aur koi bhi component fail ho sakta hai — GPU hardware failure, node crash, power event, software bug. Checkpoint = current model weights periodically save karna. Bina checkpointing: 14-day training run, day 12 pe failure → 12 days of compute completely lost. Checkpointing ke saath (har 30 min): maximum 30 min ka work lost. Frequency decision — two costs balance karna: Checkpoint overhead (model weights write to storage — large model = slow write = training time lost) vs failure cost (less frequent = more work lost per failure). Checkpoint frequency is selected by balancing checkpoint overhead against the amount of training work the organization is willing to lose after a failure. Large clusters typically checkpoint every 30 minutes. Smaller reliable clusters may checkpoint every 1–2 hours. Additional: checkpoint restore test karo before long training runs — agar restore broken hai toh checkpoint is useless.",
          },
          {
            q: "AI DC mein PUE kya hai aur kyun important hai?",
            a: "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. Ideal PUE 1.0 (100% power goes to compute). Modern AI facilities often target PUE 1.1–1.3, although actual value depends on climate, cooling architecture, and operational conditions. Actual PUE varies significantly with climate, facility design, cooling architecture and operating conditions. PUE 1.5 means: 100 kW IT load ke liye 150 kW total — 50 kW cooling/lighting/UPS overhead. PUE 1.1: sirf 10 kW overhead. At scale: 10 MW AI facility, PUE difference = significant power savings annually. Liquid cooling AI DC mein dramatically lower PUE achieve karne mein help karta hai — cold plates efficiently remove heat, CRAC units load dramatically reduces. Why engineers track PUE: energy cost, carbon footprint, operational efficiency — sab PUE se tied hai.",
          },
          {
            q: "AI DC mein GPU utilization 100% achieve karna hamesha best practice nahi hai — kyun?",
            a: "GPU utilization = percentage of time GPU actually computing. Training target: 85–95%. Lekin 100% GPU compute utilization hamesha achievable ya desirable nahi hoti. AI training mein teen phases hote hain: compute (GPU busy doing matrix math), data loading (waiting for next batch from storage/CPU), communication (waiting for AllReduce gradient sync from other GPUs). Agar storage bandwidth slow hai, GPU data wait karti hai — GPU compute utilization low hogi lekin woh actually storage bottleneck hai — fix storage, not GPU. Agar network slow hai, GPU AllReduce wait karti hai — GPU compute utilization low hogi lekin fix network, not GPU. Isliye GPU utilization ek important metric hai lekin sirf ek metric hai. Profile karo — GPU idle hai toh kyun? Data loading slow? Network sync slow? Compute genuinely maxed? Answer different fix demand karta hai. 60% GPU utilization with 30% data loading wait = fix data pipeline, not GPU.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #0891b2", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#0c4a6e", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Plain English Definition"]}
          rows={[
            ["AI Compute Node", "A high-performance server equipped with one or more GPUs (also called GPU Server). The fundamental compute unit in an AI data center."],
            ["AI Factory", "Complete AI production environment — AI Data Center(s) + storage + networking + data pipelines + AI frameworks + model training + deployment + operations. Not just hardware."],
            ["AI Pod", "Industry-wide concept: a standardized, pre-validated unit of AI infrastructure (multiple AI Compute Nodes + networking + storage). Examples: NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod."],
            ["AllReduce", "Distributed computing operation where all GPUs share their gradients and receive the averaged result. Core operation in distributed AI training."],
            ["BMC (Baseboard Management Controller)", "Server chip that handles out-of-band management. Even if server OS crashes, BMC allows remote power on/off and console access via management network."],
            ["Checkpoint", "Periodic save of model weights during training. Failure pe here se resume karo — last checkpoint se. Typically every 30 minutes."],
            ["CRAC (Computer Room Air Conditioning)", "Data center cooling unit using air. Traditional DC standard. Insufficient at AI density above ~20 kW per rack."],
            ["Data Locality", "Principle: keep storage physically and logically close to GPU clusters to minimize latency and maximize throughput."],
            ["DLC (Direct Liquid Cooling)", "Cold plates on GPU chips removing heat via water. Increasingly used and commonly required for many high-density AI rack designs. Much more efficient than air cooling."],
            ["East-West Traffic", "Network traffic pattern where servers communicate horizontally with each other (peer-to-peer). Dominant in AI training (gradient sync). Very different from traditional North-South (client-server) traffic."],
            ["ECC (Error Correcting Code)", "Memory error detection and correction. Single-bit errors auto-corrected. Double-bit errors detected — GPU replacement needed. Always ON in enterprise AI servers."],
            ["Fat-tree topology", "Network design: leaf switches (server-facing) + spine switches (interconnecting leafs). Full bisection bandwidth — any server can communicate with any other at full speed."],
            ["GPU Hour", "Unit of AI compute. One GPU running for one hour. Budget and pricing metric for shared GPU clusters."],
            ["High-Performance Fabric", "High-speed GPU-to-GPU network in AI clusters. Includes InfiniBand, RoCE, and similar technologies. Also called AI Network Fabric."],
            ["InfiniBand (IB)", "High-speed networking technology. 200–400 Gb/s per port. Ultra-low latency. Purpose-built for HPC/AI. NVIDIA (Mellanox) dominant vendor."],
            ["IOPS", "Input/Output Operations Per Second. Storage metric. Traditional DC focus. AI DC focuses more on bandwidth (GB/s) than IOPS."],
            ["Kubernetes", "Container orchestration system. Used for AI workloads with GPU device plugins. Manages containerized jobs, scaling, and resource allocation."],
            ["Management Network", "Separate out-of-band network for server administration (IPMI/BMC). Always available even if AI training network or OS is down. Typically 1 GbE."],
            ["MTBF (Mean Time Between Failures)", "Average time before a component fails. At large cluster scale, even relatively low individual-component failure rates can translate into regular hardware failures."],
            ["Multi-tenancy", "Multiple teams or users sharing the same physical GPU cluster securely. Scheduler manages fair allocation, containers provide isolation."],
            ["NCCL", "NVIDIA Collective Communications Library. AllReduce, AllGather, etc. for distributed GPU training. Core of multi-GPU communication."],
            ["North-South Traffic", "Traditional data center traffic pattern: client-server communication (user → server). Contrasts with AI DC's East-West GPU-to-GPU traffic."],
            ["Object Storage", "Scalable, durable storage for unstructured data (S3, GCS, Azure Blob). AI DC: training dataset archive, model checkpoints, experiment artifacts."],
            ["PDU (Power Distribution Unit)", "Rack-level power distribution. Branch circuits from PDU to each server. Rated for expected power load."],
            ["Parallel File System", "Distributed storage designed for high aggregate bandwidth — many clients simultaneously reading/writing. Lustre, GPFS/Spectrum Scale. AI training data standard."],
            ["PUE (Power Usage Effectiveness)", "Total facility power / IT equipment power. 1.0 = perfect. Modern AI facilities often target 1.1–1.3 with liquid cooling."],
            ["Ray", "Python-native distributed computing framework. Supports distributed AI training and inference. Popular in ML community."],
            ["RoCE (RDMA over Converged Ethernet)", "RDMA (Remote Direct Memory Access) over standard Ethernet. AI cluster networking alternative to InfiniBand. AMD Gaudi natively uses RoCE."],
            ["Slurm", "Standard HPC and AI job scheduler. Queue management, resource allocation, fair share. Most AI research clusters use it."],
            ["TDP (Thermal Design Power)", "Maximum power a chip is designed to dissipate. H100: 700W TDP. Design cooling for TDP, not average power."],
            ["UPS (Uninterruptible Power Supply)", "Battery backup between grid power and servers. Provides ride-through during grid momentary events. Buys time for generators to start."],
            ["GPU Utilization", "Percentage of time a GPU is actively computing. Target during training: 85–95%. Low utilization = bottleneck (data, network, or compute issue)."],
            ["Volcano", "Kubernetes-native batch job scheduler for GPU workloads. Gang scheduling — all pods of a job start together or none do."],
          ]}
        />
      </section>

      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>AI Data Center ek specialist facility hai — traditional DC nahi. Power density 5–10× traditional DC. Networking completely different purpose (GPU sync, not user traffic). Software stack specialized. Engineer jo traditional DC manage karta hai, usse AI DC ke liye additional specialized knowledge chahiye — power, cooling, GPU-specific networking sab alag.</li>
          <li>AI Data Center (physical infrastructure) aur AI Factory (complete AI production environment) alag concepts hain. AI Factory mein AI Data Center ek component hai — plus data pipelines, AI frameworks, model training, deployment, aur operations. Sirf GPU servers khareedne se AI Factory nahi banta — poora ecosystem build karna padta hai.</li>
          <li>Training aur Inference fundamentally different infrastructure demand karte hain. Training: large clusters, days to weeks, maximum throughput, large GPU memory, checkpointing. Inference: low latency, autoscaling, cost efficiency, stateless. Many production companies yeh separate rakhte hain — different hardware, different configurations, different cost models.</li>
          <li>Power aur cooling AI DC ki jad hai. Traditional enterprise air cooling commonly supports around 10–20 kW per rack, with advanced designs reaching 30–40 kW. AI GPU racks often demand 40–120+ kW, making liquid cooling increasingly necessary. Plan liquid cooling from Day 1. Retrofitting 3× more expensive. PUE improvement at scale = millions of dollars saved annually.</li>
          <li>East-West traffic AI networking ka core pattern hai. GPUs continuously gradient sync karte hain — massive horizontal (peer-to-peer) traffic between all GPU servers. Traditional North-South (client-server) design is ke liye inadequate hai. Fat-tree topology standard hai — full bisection bandwidth ensure karta hai.</li>
          <li>Scale pe failures normal hain — design accordingly. At large cluster scale, even relatively low individual-component failure rates can translate into regular hardware failures. Hardware failures expected events hain, exceptional nahi. Checkpointing, redundancy, automated job recovery — mandatory, optional nahi. This is one of the biggest mindset differences from traditional enterprise IT.</li>
          <li>AI Pod ek industry-wide concept hai, sirf NVIDIA ka nahi. NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod, Supermicro AI Pod — sab yeh concept implement karte hain. Standardized, pre-validated compute unit. Faster deployment, known performance. Scaling simple — ek Pod add karo.</li>
          <li>GPU utilization important hai lekin 100% sirf compute ka measure hai. Data loading, AllReduce communication, aur compute sab parallel aur sequential phases hote hain. Low utilization → profile first → find actual bottleneck (storage? network? compute?) → fix specifically. Generic "GPU utilization improve karo" advice misleading ho sakti hai bina profiling ke.</li>
          <li>Software stack compatibility real engineering challenge hai. Driver-framework-CUDA compatibility matrix carefully manage karo. Container-based workloads isolation provide karte hain. Infrastructure team driver versions control karti hai, ML teams containers manage karte hain. Incompatible versions sab kuch break karte hain.</li>
          <li>Yeh article remaining AI DC track ka foundation hai. GPU Cluster Design, AI Networking (InfiniBand, RoCE, fat-tree deep dive), AI Storage (parallel file systems, object storage, GPUDirect), AI Cooling (liquid cooling engineering, immersion cooling) — sab agle articles mein cover honge. Yahan jo concepts samajhe — power density, PUE, East-West traffic, training vs inference, checkpointing, data locality — woh poore track mein reuse honge.</li>
        </ul>
      </section>

    </article>
  );
}
