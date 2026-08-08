import type { FaqItem } from "@/lib/schemas";

export const aiStorageFaq: FaqItem[] = [
  {
    question: "AI storage aur normal enterprise storage mein kya fundamental difference hai?",
    answer:
      "Fundamental difference workload characteristics mein hai. Enterprise storage typically transactional workloads ke liye design hoti hai — high IOPS, small random reads/writes, latency-sensitive. AI storage predominantly sequential workload hai — extremely high throughput, large contiguous reads, multiple concurrent GPU nodes simultaneously same dataset se data read kar rahe hain. Ek GPU cluster jisme 100+ GPUs hain woh simultaneously training data read karta hai — aggregate bandwidth requirement terabytes per second tak ja sakti hai. Object storage ka scale-out architecture, parallel file systems ki aggregate throughput, aur local NVMe ka cache use — yeh sab enterprise storage se fundamentally alag design choices hain jo AI workloads ke liye required hain.",
  },
  {
    question: "Parallel file system aur NFS mein kya difference hai?",
    answer:
      "NFS (Network File System) ek single server se files serve karta hai. NFS server ki bandwidth aur IOPS capacity uski single-server hardware limit tak bounded hai. 100 GPU nodes simultaneously NFS se data read karein toh sab ek hi server ka wait karenge — classic bottleneck. Parallel file system (Lustre, GPFS/Spectrum Scale) multiple storage nodes pe data distribute karta hai. Har GPU node directly multiple storage nodes se simultaneously read kar sakta hai — aggregate throughput = sum of all storage nodes' throughput. Metadata bhi alag dedicated servers pe handle hoti hai. Scale out karke aggregate bandwidth badha sakte hain. Yahi reason hai ki production AI training clusters parallel file systems use karte hain, NFS nahi.",
  },
  {
    question: "Object storage POSIX file system se kyun alag hai aur AI mein kab use karna chahiye?",
    answer:
      "POSIX file system (Lustre, ext4, NFS) hierarchical directory structure maintain karta hai, file locking support karta hai, aur standard open/read/write/close operations support karta hai. Object storage (S3, GCS, Azure Blob) flat namespace maintain karta hai — buckets aur objects, koi directories nahi. Objects immutable ya append-only hain typically. Standard HTTP API use hoti hai. Object storage AI mein kab use karein: raw dataset long-term archival/storage, trained model artifacts storage, experiment logs, backup. Jab data access pattern primarily large sequential reads ho aur POSIX semantics required na ho. Training ke dauran active data reading ke liye typically parallel file system better hai kyunki object storage ki latency aur API overhead frequent small operations ke liye suitable nahi hai.",
  },
  {
    question: "GPU starvation kya hota hai aur kaise identify karein?",
    answer:
      "GPU starvation tab hota hai jab GPUs compute ke liye data ka wait karein kyunki storage pipeline fast enough data deliver nahi kar sakti. GPU theoretically compute kar sakta hai lekin input data available nahi hai — idle time badhta hai, training throughput drops karta hai. Identify kaise karein: nvidia-smi ya rocm-smi se GPU utilization monitor karo — agar utilization intermittently 0 ya bahut low ho while job running hai toh starvation possible. PyTorch Profiler ya similar tools se data loading time vs compute time compare karo. Storage I/O metrics check karo — agar GPU utilization drops ke saath storage read IOPS bhi drop ho toh storage is bottleneck. Data loader worker count increase karo experimentally — agar throughput improve ho toh data loading is bottleneck. Network storage bandwidth utilization check karo — saturation indicates storage network bottleneck.",
  },
  {
    question: "NVMe-oF kya hai aur yeh NVMe se alag kyun hai?",
    answer:
      "NVMe (Non-Volatile Memory Express) ek interface protocol hai jo local PCIe bus pe NVMe SSDs access karne ke liye use hota hai — server ke andar physically present device. NVMe-oF (NVMe over Fabrics) NVMe protocol ko network pe extend karta hai — remote NVMe devices ko access karo jaise wo local ho. NVMe-oF multiple fabrics pe implement ho sakta hai: NVMe/TCP (standard Ethernet pe), NVMe/RoCE (RDMA over Converged Ethernet), NVMe/FC (Fibre Channel). Key distinction: NVMe-oF remote device ko access karta hai with NVMe-like command set aur potentially low latency (especially with RDMA fabrics), lekin network latency aur bandwidth constraints local NVMe se alag hain — local NVMe jaisi performance guarantee nahi hoti. Use case: Disaggregated storage architectures jahan shared NVMe pool multiple servers serve kare.",
  },
  {
    question: "AI training mein checkpoint frequency kaise decide karein?",
    answer:
      "Checkpoint frequency do competing factors balance karta hai: recovery exposure (agar failure ho toh kitna training work lose karein) aur checkpoint overhead (checkpoint likhne mein time/compute/storage cost). Sochne ka framework: Ek failure ke baad acceptable re-training time kya hai? Agar job 7 din ka hai aur ek checkpoint loss 4 ghante ka hai — woh acceptable hai toh har 4 ghante mein checkpoint. Checkpoint likhne mein kitna time lagta hai? Large model ka checkpoint (potentially hundreds of GBs) likhne mein minutes lag sakte hain — synchronous checkpoint training pause kar deta hai. Mitigation: Asynchronous checkpointing — training data CPU memory mein copy, training continue karo, background thread disk pe write kare. Multiple checkpoint retention: Recent 2-3 checkpoints rakhna good practice hai — agar latest checkpoint corrupt ho toh previous se resume kar sako. Hardware reliability history: Zyada frequent failures = more frequent checkpoints.",
  },
  {
    question: "Small files problem AI storage mein kyun serious hai?",
    answer:
      "Imaging datasets, NLP tokenized files, ya fine-grained data shards millions/billions of small files create kar sakte hain. Small files problem multiple dimensions mein serious hai. Metadata overhead: Parallel file system metadata servers (Lustre MDS, GPFS) har file ke liye metadata operations handle karte hain — millions of files ka directory listing, stat calls, open operations metadata servers overload kar sakte hain even though aggregate data size manageable ho. Storage efficiency: Har file ka minimum block allocation hota hai — 1KB file 4KB block mein store ho sakti hai — massive space waste. Inefficient I/O: SSDs aur HDDs small random I/O pe much less efficient hain large sequential I/O ke mukable. Solutions: Dataset packing — many small files ko larger archive files (HDF5, WebDataset, TFRecord) mein pack karo before storage. Caching layers use karo. Dataset sharding carefully design karo.",
  },
  {
    question: "AI storage mein IOPS, throughput aur latency mein kya exact difference hai?",
    answer:
      "Yeh tino alag metrics hain jo often confuse ho jaate hain. IOPS (Input/Output Operations Per Second): Ek second mein kitne individual I/O operations complete ho sakte hain, regardless of size. High IOPS critical hoti hai random small I/O workloads ke liye (database transactions, metadata operations). Throughput (Bandwidth): Ek second mein kitna data transfer ho sakta hai, typically GB/s ya MB/s mein. High throughput critical hai large sequential reads/writes ke liye — AI training data loading is throughput-dominant workload hai. Latency: Ek I/O operation complete hone mein kitna time lagta hai, typically microseconds/milliseconds mein. Low latency critical hai interactive workloads ke liye. Important: High throughput automatically low latency guarantee nahi karta aur vice versa. High IOPS aur high throughput also different — 1M IOPS of 4KB = 4 GB/s, lekin 1M IOPS of 1MB = 1 TB/s (impractical example). AI training primarily throughput-sensitive hai, not IOPS-sensitive.",
  },
  {
    question: "AI inference aur AI training ke storage requirements mein kya main differences hain?",
    answer:
      "Training storage requirements: Very high aggregate throughput — continuously large training batches multiple GPUs ko feed karna. Large dataset storage — potentially petabytes. Frequent checkpoint writes — training progress save karna. Sequential read dominant pattern. Failures are tolerable (checkpoint se restart). Inference storage requirements: Model weights read karna (one-time ya infrequent) — model typically GPU memory mein load hota hai once aur phir reused. Very low latency for model loading. High IOPS agar dynamic batching ho aur multiple concurrent requests different models serve kar rahe hon. Smaller active storage footprint (just deployed model versions). Durability important hai — model artifacts precious hain. Net result: Training ke liye high-throughput parallel storage essential hai. Inference ke liye fast model loading, durability, aur multiple model version management important hai — absolute peak throughput kam critical hai.",
  },
  {
    question: "Erasure coding aur replication mein kya difference hai aur AI storage mein kaunsa better hai?",
    answer:
      "Replication: Data ke N identical copies different locations pe store karo. 3-way replication = 3 copies. Simple recovery — ek copy fail ho to doosri se serve karo. Space overhead: N copies ke liye N × data ka storage needed. Reads potentially parallel ho sakte hain multiple copies se. Erasure coding: Data ko chunks mein divide karo, additional parity chunks create karo. K+M scheme mein K data chunks + M parity chunks — koi bhi M chunks ka loss survive kar sakta hai. Space overhead: (K+M)/K × original size. Example: 8+3 erasure coding = 11 chunks store, koi 3 fail ho toh recover — storage overhead = 11/8 = 1.375× vs 3-way replication ka 3×. AI storage mein: Erasure coding typically better storage efficiency deta hai large datasets ke liye. Replication writes faster hoti hain (koi parity calculation nahi). Cold/archival data ke liye erasure coding, hot training data ke liye replication ya higher-performance storage tiers preferred. Choice depends on performance requirements, failure tolerance needs, aur storage cost constraints.",
  },
];
