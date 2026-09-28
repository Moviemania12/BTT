import type { FaqItem } from "@/lib/schemas";

export const aiStorageFaq: FaqItem[] = [
  {
    question: "What is the fundamental difference between AI storage and normal enterprise storage?",
    answer:
      "The fundamental difference is in workload characteristics. Enterprise storage is typically designed for transactional workloads — high IOPS, small random reads/writes, latency-sensitive. AI storage is predominantly a sequential workload — extremely high throughput, large contiguous reads, with multiple concurrent GPU nodes simultaneously reading data from the same dataset. A GPU cluster with 100+ GPUs reads training data simultaneously — the aggregate bandwidth requirement can reach terabytes per second. Object storage's scale-out architecture, parallel file systems' aggregate throughput, and using local NVMe as cache — these are all design choices fundamentally different from enterprise storage, required for AI workloads.",
  },
  {
    question: "What is the difference between a parallel file system and NFS?",
    answer:
      "NFS (Network File System) serves files from a single server. An NFS server's bandwidth and IOPS capacity is bounded by that single server's hardware limits. If 100 GPU nodes read data from NFS simultaneously, they all end up waiting on the one server — a classic bottleneck. A parallel file system (Lustre, GPFS/Spectrum Scale) distributes data across multiple storage nodes. Each GPU node can read directly from multiple storage nodes simultaneously — aggregate throughput = sum of all storage nodes' throughput. Metadata is also handled on separate dedicated servers. You can scale out to increase aggregate bandwidth. This is why production AI training clusters use parallel file systems, not NFS.",
  },
  {
    question: "Why is object storage different from a POSIX file system, and when should it be used in AI?",
    answer:
      "A POSIX file system (Lustre, ext4, NFS) maintains a hierarchical directory structure, supports file locking, and supports standard open/read/write/close operations. Object storage (S3, GCS, Azure Blob) maintains a flat namespace — buckets and objects, no directories. Objects are typically immutable or append-only. A standard HTTP API is used. When to use object storage in AI: long-term archival/storage of raw datasets, storing trained model artifacts, experiment logs, backup. When the data access pattern is primarily large sequential reads and POSIX semantics aren't required. For active data reading during training, a parallel file system is typically better because object storage's latency and API overhead aren't suited for frequent small operations.",
  },
  {
    question: "What is GPU starvation and how do you identify it?",
    answer:
      "GPU starvation happens when GPUs wait for data to compute because the storage pipeline can't deliver data fast enough. The GPU could theoretically compute, but the input data isn't available — idle time increases, training throughput drops. How to identify it: monitor GPU utilization with nvidia-smi or rocm-smi — if utilization is intermittently 0 or very low while the job is running, starvation is likely. Compare data loading time vs compute time with PyTorch Profiler or similar tools. Check storage I/O metrics — if GPU utilization drops along with storage read IOPS, storage is the bottleneck. Experimentally increase data loader worker count — if throughput improves, data loading is the bottleneck. Check network storage bandwidth utilization — saturation indicates a storage network bottleneck.",
  },
  {
    question: "What is NVMe-oF and why is it different from NVMe?",
    answer:
      "NVMe (Non-Volatile Memory Express) is an interface protocol used to access NVMe SSDs on the local PCIe bus — a device physically present inside the server. NVMe-oF (NVMe over Fabrics) extends the NVMe protocol over the network — accessing remote NVMe devices as if they were local. NVMe-oF can be implemented over multiple fabrics: NVMe/TCP (over standard Ethernet), NVMe/RoCE (RDMA over Converged Ethernet), NVMe/FC (Fibre Channel). Key distinction: NVMe-oF accesses a remote device with an NVMe-like command set and potentially low latency (especially with RDMA fabrics), but network latency and bandwidth constraints are different from local NVMe — it doesn't guarantee local-NVMe-like performance. Use case: disaggregated storage architectures where a shared NVMe pool serves multiple servers.",
  },
  {
    question: "How do you decide checkpoint frequency in AI training?",
    answer:
      "Checkpoint frequency balances two competing factors: recovery exposure (how much training work you lose if there's a failure) and checkpoint overhead (the time/compute/storage cost of writing a checkpoint). A framework for thinking about it: what's an acceptable re-training time after a failure? If the job is 7 days long and losing 4 hours of work to a checkpoint gap is acceptable, checkpoint every 4 hours. How long does writing a checkpoint take? Writing a large model's checkpoint (potentially hundreds of GBs) can take minutes — a synchronous checkpoint pauses training. Mitigation: asynchronous checkpointing — copy training state to CPU memory, continue training, let a background thread write to disk. Multiple checkpoint retention: keeping the last 2-3 checkpoints is good practice — so you can resume from the previous one if the latest checkpoint is corrupted. Hardware reliability history: more frequent failures mean more frequent checkpoints.",
  },
  {
    question: "Why is the small files problem serious in AI storage?",
    answer:
      "Imaging datasets, NLP tokenized files, or fine-grained data shards can create millions/billions of small files. The small files problem is serious across multiple dimensions. Metadata overhead: parallel file system metadata servers (Lustre MDS, GPFS) handle metadata operations for every file — directory listings, stat calls, and open operations across millions of files can overload metadata servers even when the aggregate data size is manageable. Storage efficiency: every file has a minimum block allocation — a 1KB file can end up stored in a 4KB block — massive space waste. Inefficient I/O: SSDs and HDDs are much less efficient at small random I/O compared to large sequential I/O. Solutions: dataset packing — pack many small files into larger archive files (HDF5, WebDataset, TFRecord) before storage. Use caching layers. Design dataset sharding carefully.",
  },
  {
    question: "What is the exact difference between IOPS, throughput and latency in AI storage?",
    answer:
      "These are three different metrics that often get confused. IOPS (Input/Output Operations Per Second): how many individual I/O operations can complete in a second, regardless of size. High IOPS is critical for random small I/O workloads (database transactions, metadata operations). Throughput (Bandwidth): how much data can be transferred in a second, typically measured in GB/s or MB/s. High throughput is critical for large sequential reads/writes — AI training data loading is a throughput-dominant workload. Latency: how long a single I/O operation takes to complete, typically measured in microseconds/milliseconds. Low latency is critical for interactive workloads. Important: high throughput doesn't automatically guarantee low latency, and vice versa. High IOPS and high throughput are also different — 1M IOPS of 4KB = 4 GB/s, but 1M IOPS of 1MB = 1 TB/s (an impractical example). AI training is primarily throughput-sensitive, not IOPS-sensitive.",
  },
  {
    question: "What are the main differences between AI inference and AI training storage requirements?",
    answer:
      "Training storage requirements: very high aggregate throughput — continuously feeding large training batches to multiple GPUs. Large dataset storage — potentially petabytes. Frequent checkpoint writes — saving training progress. Sequential-read-dominant pattern. Failures are tolerable (can restart from checkpoint). Inference storage requirements: reading model weights (one-time or infrequent) — the model is typically loaded into GPU memory once and then reused. Very low latency for model loading. High IOPS if there's dynamic batching and multiple concurrent requests serving different models. Smaller active storage footprint (just the deployed model versions). Durability is important — model artifacts are precious. Net result: high-throughput parallel storage is essential for training. For inference, fast model loading, durability, and multiple model version management matter — absolute peak throughput is less critical.",
  },
  {
    question: "What is the difference between erasure coding and replication, and which is better for AI storage?",
    answer:
      "Replication: store N identical copies of data in different locations. 3-way replication = 3 copies. Simple recovery — if one copy fails, serve from another. Space overhead: needs N × data's worth of storage for N copies. Reads can potentially be parallelized across multiple copies. Erasure coding: divide data into chunks, create additional parity chunks. In a K+M scheme, K data chunks + M parity chunks — any M chunks can be lost and recovered from. Space overhead: (K+M)/K × original size. Example: 8+3 erasure coding = 11 chunks stored, any 3 can fail and still recover — storage overhead = 11/8 = 1.375× vs 3-way replication's 3×. In AI storage: erasure coding typically gives better storage efficiency for large datasets. Replication writes faster (no parity calculation). Erasure coding is preferred for cold/archival data, while replication or higher-performance storage tiers are preferred for hot training data. The choice depends on performance requirements, failure tolerance needs, and storage cost constraints.",
  },
];
