import type { FaqItem } from "@/lib/schemas";

export const aiDcFaq: FaqItem[] = [
  {
    question: "What is the most fundamental difference between an AI Data Center and a Traditional Data Center?",
    answer:
      "The most fundamental difference is power density and cooling requirements. Traditional DC: 3-15 kW per rack, air cooling adequate. AI DC: 40-120+ kW per rack, liquid cooling increasingly mandatory at high density. The second big difference is the purpose of the networking - in a traditional DC the network is for user traffic, in an AI DC the network is for GPU-to-GPU gradient synchronization, where bandwidth directly determines training speed. The third difference is workload duration - a traditional DC runs variable spiky loads, an AI DC runs sustained compute continuously for days or weeks.",
  },
  {
    question: "What is the difference between an AI Factory and an AI Data Center?",
    answer:
      "An AI Data Center is a physical infrastructure facility - building, power, cooling, network, servers. An AI Factory is a complete AI production environment in which the AI Data Center is one component. An AI Factory includes: the AI Data Center (physical facility), compute infrastructure (GPU clusters), storage (training data and models), networking (high-speed fabric), data pipelines (ETL and preprocessing), AI frameworks (PyTorch, TensorFlow), model training systems, model deployment and inference, and operations. A factory can use one or more data centers. Microsoft Azure AI facilities, Google TPU-based training facilities, Meta dedicated AI infrastructure - these are all real-world examples of the AI Factory concept.",
  },
  {
    question: "What are the design differences between AI Training infrastructure and AI Inference infrastructure?",
    answer:
      "Training: large GPU clusters (10,000+ GPUs possible), days to weeks of continuous operation, maximum compute throughput priority, large memory per GPU (model + gradients + optimizer states), ultra-fast GPU-to-GPU networking for gradient sync, massive storage bandwidth for training data, fault tolerance via checkpointing. Inference: low latency (millisecond response), high throughput (thousands of simultaneous users), cost efficiency priority, smaller memory footprint (only model weights), autoscaling with traffic patterns, stateless servers. Many companies keep training and inference infrastructure separate - different GPU types, different configurations.",
  },
  {
    question: "Why is checkpointing critical in an AI Data Center?",
    answer:
      "AI training jobs are quite long-running - days to weeks. Any component can fail during this duration: GPU hardware failure, node crash, power event, software bug. A checkpoint means periodically saving the current model weights to storage. Without checkpointing: a 14-day training run, failure on day 12 means 12 days of compute completely lost. With checkpointing (every 30 min): a maximum of 30 minutes of work lost. Economic argument: 1,000 H100 GPUs x 12 days x approximate cost = potentially hundreds of thousands of dollars lost without checkpointing. Checkpoint storage cost: negligible by comparison. That is why checkpointing in large AI data centers is a policy, not a suggestion.",
  },
  {
    question: "What is GPU utilization in an AI DC, and why is 100% not always achieved?",
    answer:
      "GPU utilization is the percentage of time a GPU is actually computing (vs idle/waiting). Target during training: 85-95%. Low utilization (under 60%) during training is a problem signal. Idle GPUs are expensive. But 100% utilization is only a measure of GPU compute, and AI training has three phases: compute (GPU busy), data loading (waiting for the next batch), communication (waiting for AllReduce gradient sync). If there is a network or storage bottleneck, the GPU will not be at 100% compute, but that is not the actual problem - the bottleneck should be fixed. So GPU utilization is an important metric but only one metric, not the whole picture.",
  },
  {
    question: "What is an AI Pod - is it only an NVIDIA concept?",
    answer:
      "AI Pod is an industry-wide concept, not NVIDIA-specific. AI Pod = a standardized, pre-validated computing unit - a fixed set of GPU servers + networking + storage + software stack that together form a complete AI infrastructure unit. Multiple vendors provide AI Pod solutions: NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod, Supermicro AI Pod, and others. The main benefit of the Pod concept: pre-validated design, faster deployment, known performance. Scaling is simple - deploy one Pod, then add more Pods as needed.",
  },
  {
    question: "What is East-West traffic in an AI DC, and why does it matter?",
    answer:
      "Traditional data center traffic pattern: North-South - a client (user) requests data from a server, the server responds. Vertical flow. AI data center traffic pattern: East-West - GPU servers constantly communicate with each other for gradient synchronization (AllReduce). Horizontal flow between peers. At scale: in a 1,000-GPU cluster, at every training step all GPUs share their gradients - massive horizontal traffic. This East-West traffic is the core challenge of AI networking design - fabric design, bandwidth, and latency are all optimized for this pattern. We will do a deep dive on this topic in the dedicated AI Networking article.",
  },
  {
    question: "What does a GPU scheduler do - why is it needed in an AI DC?",
    answer:
      "A GPU scheduler is a system that decides which job runs when and on which GPU resources. Without a scheduler: all teams would work directly on GPUs directly → conflicts, unfair usage, resource waste. With a scheduler: every team submits its job → it goes into a queue → the scheduler allocates it when resources are available → fair and efficient usage. Common schedulers: Slurm (HPC standard), Kubernetes (containerized workloads), Ray (Python-native distributed), Volcano (Kubernetes GPU jobs). A GPU scheduler is essential in multi-team environments.",
  },
  {
    question: "What storage types exist in an AI DC?",
    answer:
      "Hot Storage: frequently accessed training data. Fast access, high bandwidth, expensive. Parallel file systems (Lustre, GPFS) live here. Cold Storage: rarely accessed data - old datasets, archived models. Slow access, cheap. Object storage (S3, GCS) lives here. Checkpoint Storage: training checkpoints - needs to be fast (write quickly during training) and durable (do not lose checkpoints). Typically all-flash NVMe with redundancy. Object Storage: scalable, durable, cloud-native. Training data archive, final model weights, experiment artifacts. Data locality is important - storage being physically and logically close to the GPU cluster reduces latency and improves throughput.",
  },
  {
    question: "What is PUE in an AI DC, and why does it matter?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. Ideal: PUE 1.0 (100% power goes to compute). Modern AI facilities often target PUE 1.1-1.3, although the actual value depends on climate, cooling architecture, and operational conditions. PUE 1.5 means: for a 100 kW IT load, 150 kW total power - 50 kW cooling/lighting/UPS overhead. PUE 1.1: only 10 kW overhead. At scale: a 10 MW AI facility, the difference between PUE 1.5 and PUE 1.1 = 4 MW power savings = tens of millions of rupees annually. Liquid cooling achieves dramatically lower PUE in an AI DC vs air cooling.",
  },
  {
    question: "What is multi-tenancy in an AI DC?",
    answer:
      "Multi-tenancy means the same physical GPU cluster is securely shared by multiple teams or users. One large GPU cluster is used simultaneously by multiple teams within a company: the research team runs experiments. The production team runs the inference service. The development team does model fine-tuning. Everyone shares the same physical hardware but is logically isolated. The scheduler manages resource allocation. Chargeback/showback systems track which team used how much GPU compute. Container isolation (Kubernetes namespaces) provides data and workload isolation.",
  },
  {
    question: "Is it worth building your own AI DC, or is cloud better?",
    answer:
      "General rule of thumb: Under approximately 100–200 GPUs at consistent utilization — cloud economics usually better. 200–1,000 GPUs at sustained utilization — evaluate carefully, on-prem TCO might be better. 1,000+ GPUs at high utilization — on-premises typically economically favorable over 2–3 year period. But additional factors: capital availability (on-prem high upfront cost), data governance (some data can't go to cloud), team expertise, time-to-production, regulatory compliance. Most companies use hybrid approach — train on cloud, inference on-prem, or vice versa. Early-stage startups: cloud. Established enterprises with consistent heavy AI workloads: evaluate on-prem seriously.",
  },
];
