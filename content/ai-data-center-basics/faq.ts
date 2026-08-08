import type { FaqItem } from "@/lib/schemas";

export const aiDcFaq: FaqItem[] = [
  {
    question: "AI Data Center aur Traditional Data Center mein sabse fundamental difference kya hai?",
    answer:
      "Sabse fundamental difference hai power density aur cooling requirements. Traditional DC: 3–15 kW per rack, air cooling adequate. AI DC: 40–120+ kW per rack, liquid cooling increasingly mandatory at high density. Dusra bada difference hai networking ka purpose — traditional DC mein network user traffic ke liye hai, AI DC mein network GPU-to-GPU gradient synchronization ke liye hai, jahan bandwidth directly training speed determine karta hai. Teesra fark hai workload duration — traditional DC variable spiky loads run karta hai, AI DC sustained compute days ya weeks continuously chalata hai.",
  },
  {
    question: "AI Factory aur AI Data Center mein kya fark hai?",
    answer:
      "AI Data Center ek physical infrastructure facility hai — building, power, cooling, network, servers. AI Factory ek complete AI production environment hai jisme AI Data Center ek component hai. AI Factory mein shamil hain: AI Data Center (physical facility), compute infrastructure (GPU clusters), storage (training data aur models), networking (high-speed fabric), data pipelines (ETL aur preprocessing), AI frameworks (PyTorch, TensorFlow), model training systems, model deployment aur inference, aur operations. Ek factory ek ya zyada data centers use kar sakti hai. Microsoft ke Azure AI facilities, Google ke TPU-based training facilities, Meta ke dedicated AI infrastructure — yeh sab AI Factory concept ke real-world examples hain.",
  },
  {
    question: "AI Training infrastructure aur AI Inference infrastructure mein kya design differences hain?",
    answer:
      "Training: Large GPU clusters (10,000+ GPUs possible), days ya weeks continuous operation, maximum compute throughput priority, large memory per GPU (model + gradients + optimizer states), ultra-fast GPU-to-GPU networking for gradient sync, massive storage bandwidth for training data, fault tolerance via checkpointing. Inference: Low latency (milliseconds mein response), high throughput (thousands of simultaneous users), cost efficiency priority, smaller memory footprint (only model weights), autoscaling with traffic patterns, stateless servers. Many companies training aur inference infrastructure separate rakhte hain — different GPU types, different configurations.",
  },
  {
    question: "AI Data Center mein checkpointing kyun critical hai?",
    answer:
      "AI training jobs kaafi long-running hote hain — days to weeks. Koi bhi component fail ho sakta hai is duration mein: GPU hardware failure, node crash, power event, software bug. Checkpoint = current model weights periodically storage pe save karna. Bina checkpointing: 14-day training run, day 12 pe failure → 12 days of compute completely lost. Checkpointing ke saath (har 30 min): maximum 30 minutes ka work lost. Economic argument: 1,000 H100 GPUs × 12 days × approximate cost = lakhs of dollars potential loss bina checkpointing ke. Checkpoint storage cost: negligible by comparison. Isliye large AI data centers mein checkpointing ek policy hai, suggestion nahi.",
  },
  {
    question: "AI DC mein GPU utilization kya hoti hai aur 100% kyun hamesha achieve nahi hoti?",
    answer:
      "GPU utilization = percentage of time GPU actually computing (vs idle/waiting). Target during training: 85–95%. Low utilization (under 60%) during training = problem signal. Idle GPUs are expensive. Lekin 100% utilization sirf GPU compute ka measure hai, aur AI training mein teen phases hain: compute (GPU busy), data loading (waiting for next batch), communication (waiting for AllReduce gradient sync). Agar network ya storage bottleneck hai, GPU 100% compute mein nahi hogi lekin woh actual problem nahi hai — bottleneck fix karna chahiye. Isliye GPU utilization ek important metric hai lekin sirf ek metric hai, poori picture nahi.",
  },
  {
    question: "AI Pod kya hai — sirf NVIDIA ka concept hai kya?",
    answer:
      "AI Pod ek industry-wide concept hai, NVIDIA-specific nahi. AI Pod = ek standardized, pre-validated computing unit — fixed set of GPU servers + networking + storage + software stack jo sab milke ek complete AI infrastructure unit banate hain. Multiple vendors provide AI Pod solutions: NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod, Supermicro AI Pod, aur others. Pod concept ka main benefit: pre-validated design, faster deployment, known performance. Scale karna simple hai — ek Pod deploy karo, phir aur Pods add karo as needed.",
  },
  {
    question: "AI DC mein East-West traffic kya hai aur kyun important hai?",
    answer:
      "Traditional data center traffic pattern: North-South — client (user) server se data request karta hai, server respond karta hai. Vertical flow. AI data center traffic pattern: East-West — GPU servers ek dusre se constantly communicate karte hain gradient synchronization (AllReduce) ke liye. Horizontal flow between peers. Scale pe: ek 1,000-GPU cluster mein, har training step pe sab GPUs apne gradients share karte hain — massive horizontal traffic. Yeh East-West traffic AI networking design ka core challenge hai — fabric design, bandwidth, latency sab is pattern ke liye optimize kiye jaate hain. AI Networking dedicated article mein is topic ko deep dive karenge.",
  },
  {
    question: "GPU scheduler kya karta hai — AI DC mein kyun zaroori hai?",
    answer:
      "GPU scheduler ek system hai jo decide karta hai ki kaun sa job kab aur kaunse GPU resources pe run kare. Bina scheduler ke: sab teams directly GPUs pe directly kaam karein → conflicts, unfair usage, resource waste. Scheduler ke saath: har team apna job submit karta hai → queue mein jaata hai → scheduler resources available hone pe allocate karta hai → fair aur efficient usage. Common schedulers: Slurm (HPC standard), Kubernetes (containerized workloads), Ray (Python-native distributed), Volcano (Kubernetes GPU jobs). Multi-team environments mein GPU scheduler essential hai.",
  },
  {
    question: "AI DC mein storage types kya hote hain?",
    answer:
      "Hot Storage: Frequently accessed training data. Fast access, high bandwidth, expensive. Parallel file systems (Lustre, GPFS) yahan hote hain. Cold Storage: Rarely accessed data — old datasets, archived models. Slow access, cheap. Object storage (S3, GCS) yahan hoti hai. Checkpoint Storage: Training checkpoints — needs to be fast (write quickly during training) aur durable (don't lose checkpoints). Typically all-flash NVMe with redundancy. Object Storage: Scalable, durable, cloud-native. Training data archive, final model weights, experiment artifacts. Data locality important hai — storage physically aur logically GPU cluster ke paas hone se latency reduces aur throughput improves.",
  },
  {
    question: "AI DC mein PUE kya hai aur kyun important hai?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. Ideal: PUE 1.0 (100% power goes to compute). Modern AI facilities often target PUE 1.1–1.3, although actual value depends on climate, cooling architecture, and operational conditions. PUE 1.5 means: 100 kW IT load ke liye 150 kW total power — 50 kW cooling/lighting/UPS overhead. PUE 1.1: sirf 10 kW overhead. At scale: 10 MW AI facility, PUE 1.5 vs PUE 1.1 ka fark = 4 MW power savings = crores of rupees annually. Liquid cooling AI DC mein dramatically lower PUE achieve karta hai vs air cooling.",
  },
  {
    question: "AI DC mein multi-tenancy kya hai?",
    answer:
      "Multi-tenancy = same physical GPU cluster multiple teams ya users securely share karein. Ek bada GPU cluster ek company ki multiple teams simultaneously use karti hain: Research team experiments run karti hai. Production team inference service chalati hai. Development team model fine-tuning karta hai. Sab log same physical hardware share karte hain lekin logically isolated hote hain. Scheduler resource allocation manage karta hai. Chargeback/showback systems track karte hain — which team used how much GPU compute. Container isolation (Kubernetes namespaces) data aur workload isolation provide karta hai.",
  },
  {
    question: "Khud ka AI DC build karna worth hai ya cloud better hai?",
    answer:
      "General rule of thumb: Under approximately 100–200 GPUs at consistent utilization — cloud economics usually better. 200–1,000 GPUs at sustained utilization — evaluate carefully, on-prem TCO might be better. 1,000+ GPUs at high utilization — on-premises typically economically favorable over 2–3 year period. But additional factors: capital availability (on-prem high upfront cost), data governance (some data can't go to cloud), team expertise, time-to-production, regulatory compliance. Most companies use hybrid approach — train on cloud, inference on-prem, or vice versa. Early-stage startups: cloud. Established enterprises with consistent heavy AI workloads: evaluate on-prem seriously.",
  },
];
