"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiStorageContent } from "@/content/ai-storage";

import StorageHierarchy from "../svg/StorageHierarchy";
import TrainingDataPipeline from "../svg/TrainingDataPipeline";
import ParallelStorageArchitecture from "../svg/ParallelStorageArchitecture";
import GpuStarvationFlow from "../svg/GpuStarvationFlow";
import AiStorageArchitecture from "../svg/AiStorageArchitecture";

void aiStorageContent;

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ─────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          In the <TopicLink slug="gpu-cluster" variant="inline" /> article, you understood that GPUs continuously consume data during training. But where does this data come from? How does it reach the GPU? And why does the GPU sit idle when there's a problem in this pipeline, despite being available?
        </p>
        <p style={S.p}>
          AI Storage is the complete infrastructure that stores training data, delivers it to GPUs, saves checkpoints, and preserves trained models. It isn't just "large hard drives" — the specific requirements of AI workloads demand design decisions fundamentally different from conventional enterprise storage.
        </p>
        <p style={S.p}>
          In this article, we'll cover everything from storage hierarchy to parallel file systems, object storage, NVMe-oF, GPU starvation, bottleneck troubleshooting and capacity planning — from zero to engineer level.
        </p>
      </section>

      {/* ── WHO SHOULD READ ───────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> AI storage infrastructure, rack design, networking requirements.</li>
          <li><strong>IT Infrastructure Engineers:</strong> Storage systems, file systems, storage networking, capacity planning.</li>
          <li><strong>AI Infrastructure Engineers:</strong> Training pipelines, storage optimization, GPU starvation troubleshooting.</li>
          <li><strong>O&M Engineers:</strong> Storage monitoring, performance metrics, troubleshooting methodology.</li>
          <li><strong>Students &amp; Beginners:</strong> Complete zero-to-understanding journey for AI storage concepts.</li>
        </ul>
      </section>

      {/* ── LEARNING PATH ─────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="ai-networking" variant="inline" /> — GPU-to-GPU communication fabric, InfiniBand, RoCE</li>
          <li><strong>Current:</strong> AI Storage — how data gets to GPUs and checkpoints get saved</li>
          <li><strong>Next:</strong> <TopicLink slug="ai-cooling" variant="inline" /> — managing extreme heat densities in AI data centers</li>
        </ul>
        <Callout type="important" title="Read GPU Cluster and AI Networking First">
          This article freely references concepts from GPU HBM, parallel file systems, and storage networking. Reading the GPU Cluster and AI Networking articles first will make these concepts easier to understand.
        </Callout>
      </section>

      {/* ── WHAT IS AI STORAGE ────────────────────────────── */}
      <section id="what-is-ai-storage">
        <h2 style={S.h2}>What Is AI Storage?</h2>
        <p style={S.p}>
          AI Storage is an umbrella term for all the storage systems that store, manage and deliver data in an AI data center — from raw training datasets to trained model artifacts.
        </p>
        <p style={S.p}>
          Concretely, AI storage includes: object storage systems (for datasets and models), parallel file systems (for active training data), local NVMe SSDs (for per-node cache), and checkpoint storage (for saving training progress). These are connected to GPU compute nodes through a network fabric.
        </p>
        <p style={S.p}>
          AI storage isn't just a capacity problem — it's primarily a <strong>throughput problem</strong>. A GPU cluster training on hundreds or thousands of GPUs is simultaneously reading data from storage. The aggregate bandwidth requirement can be enormous, and if the storage pipeline can't deliver data as fast as the GPUs consume it, the GPUs sit idle — an expensive waste of compute.
        </p>
      </section>

      {/* ── WHY DIFFERENT ─────────────────────────────────── */}
      <section id="why-different">
        <h2 style={S.h2}>Why AI Workloads Need Different Storage</h2>
        <p style={S.p}>
          Traditional enterprise storage is designed for transactional workloads — databases, email, file servers. These workloads prefer high IOPS, small random I/O, and low latency. AI training is fundamentally different.
        </p>
        <ComparisonTable
          title="Enterprise Storage vs AI Storage Requirements"
          headers={["Factor", "Traditional Enterprise", "AI Training"]}
          rows={[
            ["Primary workload", "Random small reads/writes (transactions)", "Large sequential reads (training batches)"],
            ["I/O pattern", "Mixed random/sequential", "Predominantly sequential"],
            ["Concurrency", "Many users, independent requests", "Many GPU nodes, same dataset"],
            ["Bottleneck concern", "Latency (ms response time)", "Throughput (GB/s aggregate)"],
            ["Data size", "GB to TB range typical", "TB to PB (datasets + checkpoints)"],
            ["File sizes", "Small to medium files", "Mix: huge archives + many small files"],
            ["Access pattern", "Repeated random access", "Sequential scan, multiple epochs"],
            ["Write pattern", "Frequent small writes", "Infrequent large writes (checkpoints)"],
            ["Filesystem need", "POSIX, ACID transactions", "High-throughput, concurrent access"],
          ]}
        />
        <p style={S.p}>
          This is why AI clusters use dedicated parallel file systems, pre-staged hot data tiers, and high-speed storage networks — normal enterprise NAS/SAN solutions aren't sufficient for AI training.
        </p>
      </section>

      {/* ── AI DATA LIFECYCLE ─────────────────────────────── */}
      <section id="ai-data-lifecycle">
        <h2 style={S.h2}>AI Data Lifecycle</h2>
        <p style={S.p}>
          There's a complete journey data goes through before and after an AI model is trained. Each stage has different storage requirements.
        </p>
        <ul style={S.ul}>
          <li><strong>Raw Data:</strong> Web crawls, licensed datasets, sensor data, enterprise data. Typically archived in object storage. Potentially petabytes. Infrequent access — primarily at ingestion time.</li>
          <li><strong>Ingestion:</strong> Loading raw data into storage. ETL pipelines, format conversion, initial validation. A write-heavy phase.</li>
          <li><strong>Preprocessing:</strong> Cleaning, tokenization, deduplication, quality filtering, augmentation. CPU-intensive compute. Output goes into processed dataset storage.</li>
          <li><strong>Training Dataset:</strong> Processed, ready-to-use data. This is the "hot" data during training. Should be pre-staged on the parallel file system. Most I/O happens here.</li>
          <li><strong>Checkpoints:</strong> Model state (weights, optimizer states, RNG state) saved periodically during training. Fast write throughput required. Recent checkpoints on fast storage, older ones in archive.</li>
          <li><strong>Model Artifacts:</strong> Final trained model weights. Stored versioned in object storage. Used for inference serving.</li>
          <li><strong>Inference Data:</strong> Processed while handling user requests — typically small, latency-sensitive. Different from training.</li>
          <li><strong>Logs &amp; Telemetry:</strong> Training metrics (loss, accuracy, throughput), system metrics. Write-only during training, read for analysis. Object storage or a time-series database.</li>
        </ul>
      </section>

      {/* ── STORAGE HIERARCHY ─────────────────────────────── */}
      <section id="storage-hierarchy">
        <h2 style={S.h2}>Storage Hierarchy</h2>
        <p style={S.p}>
          AI storage is like a pyramid — fastest and smallest at the top, slowest and largest at the bottom. Each layer has a different latency, bandwidth, capacity and persistence profile.
        </p>
        <Figure caption="AI Storage Hierarchy: Seven layers from GPU HBM (top — fastest, smallest, most expensive per GB) down to Archival Storage (bottom — slowest, largest, cheapest). Actual speeds and capacities vary by hardware generation and deployment.">
          <StorageHierarchy />
        </Figure>
        <ul style={S.ul}>
          <li><strong>GPU HBM (High Bandwidth Memory):</strong> Memory integrated inside the GPU chip. Model weights, activations, gradients, and optimizer states live here during active compute. Extremely fast (TB/s bandwidth), very small capacity per GPU, completely volatile (power off = data gone). <em>This is not persistent storage.</em></li>
          <li><strong>System RAM (CPU Memory):</strong> Server motherboard RAM. Data loaders stage data here before transferring to the GPU. Fast, volatile, larger than HBM but smaller than NVMe.</li>
          <li><strong>Local NVMe SSD:</strong> Flash storage physically installed in the server. Used as per-node cache. Persistent, fast sequential reads, limited capacity per node (typically 1–30 TB range).</li>
          <li><strong>Shared NVMe / NVMe-oF:</strong> NVMe storage accessible over the network. Slower than local NVMe (network latency) but shared across multiple nodes.</li>
          <li><strong>Parallel File System:</strong> Aggregate throughput from multiple storage servers. The primary home of active training data. POSIX interface — GPU nodes can access it with normal file operations.</li>
          <li><strong>Object Storage:</strong> Flat namespace, HTTP API, effectively unlimited scale. Long-term home for datasets, model artifacts, backups. Not suitable for high-frequency random access.</li>
          <li><strong>Archival / Tape Storage:</strong> Lowest cost per GB, highest latency (minutes to retrieve). Cold data, compliance archives, long-term model preservation.</li>
        </ul>
        <Callout type="important" title="GPU HBM Is Not Persistent Storage">
          A common misconception: GPU HBM is not "storage" in the traditional sense. It's volatile working memory — everything gets erased on power cut or job end. Actual persistent storage (checkpoints, model weights) lives on NVMe or a parallel file system.
        </Callout>
      </section>

      {/* ── LOCAL VS SHARED ───────────────────────────────── */}
      <section id="local-vs-shared">
        <h2 style={S.h2}>Local NVMe vs Shared Storage</h2>
        <p style={S.p}>
          Both types of storage play important roles in AI clusters — they aren't competitors, they're complementary layers.
        </p>
        <ComparisonTable
          title="Local NVMe vs Shared Parallel File System"
          headers={["Factor", "Local NVMe (per node)", "Shared Parallel File System"]}
          rows={[
            ["Location", "Inside each GPU server", "Dedicated storage servers, network-attached"],
            ["Access", "Only that node's workloads", "All GPU nodes simultaneously"],
            ["Latency", "Very low (PCIe)", "Higher (network latency added)"],
            ["Throughput", "High for that single node", "Aggregate: scales with storage nodes"],
            ["Capacity", "Limited (node's installed NVMe)", "Large (add more storage nodes)"],
            ["Primary use", "Dataset cache, OS, temp files", "Training dataset, checkpoints, shared data"],
            ["Data sharing", "Not shared — per-node only", "All nodes see same data simultaneously"],
            ["Failure impact", "Only affects that node's cache", "Affects all nodes (redundancy required)"],
          ]}
        />
        <p style={S.p}>
          Common pattern: training data lives on a shared parallel file system first. Data loaders read it and cache frequently-accessed portions on local NVMe. Subsequent reads are served from local NVMe — much faster than going to network storage every time.
        </p>
      </section>

      {/* ── PARALLEL FILE SYSTEMS ─────────────────────────── */}
      <section id="parallel-file-systems">
        <h2 style={S.h2}>Parallel File Systems</h2>
        <p style={S.p}>
          A parallel file system is the backbone of AI training storage. Let's explain why NFS (single server) isn't enough for AI.
        </p>
        <p style={S.p}>
          <strong>NFS's problem:</strong> An NFS server's bandwidth is bound by its hardware limit. If 100 GPU nodes read data from NFS, they all request the same server — bandwidth saturates, GPU nodes wait, GPU utilization drops.
        </p>
        <p style={S.p}>
          <strong>The parallel file system's solution:</strong> Data is distributed across multiple storage nodes. Each GPU node can read directly from multiple storage nodes simultaneously — aggregate throughput = sum of all storage node bandwidths. Scale out (add more storage nodes) and aggregate throughput scales too.
        </p>
        <Figure caption="Parallel File System Architecture: Multiple GPU nodes connect through a high-speed storage network to multiple storage nodes (Object Storage Targets) AND a separate metadata server. Each GPU node reads from all storage nodes simultaneously — aggregate throughput scales linearly with storage node count.">
          <ParallelStorageArchitecture />
        </Figure>
        <p style={S.p}><strong>Key concepts:</strong></p>
        <ul style={S.ul}>
          <li><strong>Parallel I/O:</strong> Multiple clients (GPU nodes) and multiple servers (storage nodes) transfer data simultaneously.</li>
          <li><strong>Metadata Server (MDS):</strong> A separate dedicated server that manages directory structure, filenames, file attributes, and permissions. Completely separate from data servers. Metadata bottleneck is a real problem — billions of small files can overload the metadata server.</li>
          <li><strong>Object Storage Targets (OST):</strong> The actual data storage servers in Lustre. Each OST serves its own storage independently.</li>
          <li><strong>Stripe:</strong> A file is "striped" (distributed) across multiple OSTs. When reading a large file, a client can read data from multiple OSTs in parallel.</li>
          <li><strong>Aggregate Throughput:</strong> Overall system throughput = sum of all OST bandwidths (theoretically). Real-world network, CPU, and client limitations apply.</li>
          <li><strong>POSIX Interface:</strong> GPU nodes use normal Linux file operations (open, read, write, close) — the application doesn't know the backend is distributed.</li>
        </ul>
        <p style={S.p}><strong>Common parallel file systems:</strong></p>
        <ul style={S.ul}>
          <li><strong>Lustre:</strong> Most widely used in HPC/AI. Open-source base with commercial support options (DDN, WHAMCLOUD). MDS + MDT (metadata) + OSS + OST (data) architecture.</li>
          <li><strong>IBM Spectrum Scale (GPFS):</strong> Enterprise-grade, strong data management features, used in some large HPC installations.</li>
          <li><strong>WekaIO, VAST Data, NetApp:</strong> Newer all-flash parallel/distributed file systems with strong AI cluster support.</li>
        </ul>
        <Callout type="best-practice" title="NFS Is Fine for Development, Not for Production Training">
          NFS can be adequate for small clusters, development, and testing. Benchmark for large-scale AI training production — if GPU utilization is being constrained by storage I/O, evaluate a parallel file system.
        </Callout>
      </section>

      {/* ── OBJECT STORAGE ────────────────────────────────── */}
      <section id="object-storage">
        <h2 style={S.h2}>Object Storage in AI</h2>
        <p style={S.p}>
          Object storage plays an important role in an AI data center — but it's fundamentally different from a parallel file system. Don't confuse the two.
        </p>
        <p style={S.p}>
          <strong>What object storage is:</strong> a flat namespace (no real directory tree), objects stored in buckets. HTTP-based API (S3, GCS API). Objects are typically immutable or append-only. Effectively unlimited scale — petabytes to exabytes. Very durable (typically 11 nines — 99.999999999% durability). Examples: Amazon S3, Google Cloud Storage, MinIO (self-hosted S3-compatible).
        </p>
        <p style={S.p}><strong>Object storage's role in AI:</strong></p>
        <ul style={S.ul}>
          <li><strong>Dataset Archive:</strong> Long-term storage of raw and processed datasets. Petabyte-scale datasets live here. Relevant data is pre-staged on the parallel file system before training.</li>
          <li><strong>Model Artifacts:</strong> Storing trained model weights, versioned. Model registry as object storage. Models are loaded from here for inference deployment.</li>
          <li><strong>Experiment Logs:</strong> Training metrics, TensorBoard logs, experiment tracking data.</li>
          <li><strong>Backup &amp; DR:</strong> Durable backup of checkpoints. A secondary copy of parallel file system data.</li>
        </ul>
        <Callout type="warning" title="Object Storage Is Not a POSIX Filesystem">
          Object storage doesn't support standard file operations (open/read/write/close) — or if it does, it's with significant overhead. PyTorch DataLoader doesn't read directly from S3 at training speed. Typical pattern: Object storage → Pre-stage to parallel file system → Training. Direct training from object storage requires special data loading libraries that typically involve performance tradeoffs.
        </Callout>
      </section>

      {/* ── TRAINING DATA PIPELINE ────────────────────────── */}
      <section id="training-data-pipeline">
        <h2 style={S.h2}>AI Training Data Pipeline</h2>
        <p style={S.p}>
          The complete path from data sources to GPU HBM — it's important to understand storage's role at each stage.
        </p>
        <Figure caption="AI Training Data Pipeline: Data Sources → Ingestion → Data Preparation → Object/Archive Storage → Parallel File System (Hot) → GPU Nodes (Training). Checkpoints flow back from GPU nodes to storage. Final trained model goes to Model Registry.">
          <TrainingDataPipeline />
        </Figure>
        <ol style={S.ol}>
          <li><strong>Data Sources → Object Storage:</strong> Ingesting and storing raw data. ETL pipelines, format conversion, initial validation.</li>
          <li><strong>Object Storage → Data Preparation:</strong> A processing job reads raw data, applies transformations (cleaning, tokenization, dedup), and writes the processed dataset back to object storage or directly to the parallel file system.</li>
          <li><strong>Object Storage → Parallel File System (Pre-staging):</strong> Before training starts, relevant dataset chunks are copied to the fast "hot" parallel file system. This step is critical — reading directly from object storage during training is typically too slow.</li>
          <li><strong>Parallel File System → GPU Nodes (Data Loading):</strong> During training, data loaders (PyTorch DataLoader workers) read batches from the parallel file system, preprocess them (on CPU), and transfer them into GPU memory.</li>
          <li><strong>GPU HBM (Training):</strong> The actual forward/backward pass happens in GPU HBM.</li>
          <li><strong>GPU → Checkpoint Storage:</strong> Periodic checkpoint writes — model state is saved to the parallel file system or dedicated fast storage.</li>
          <li><strong>Training Complete → Model Registry:</strong> Final model weights stored versioned in object storage.</li>
        </ol>
        <Callout type="important" title="Pre-Staging Is Critical">
          Pre-staging data before starting a training run is a critical operational step. If a training job starts while data is still on slow object storage, GPUs will starve immediately. Data engineers and cluster schedulers need to coordinate.
        </Callout>
      </section>

      {/* ── GPU TO STORAGE DATA FLOW ──────────────────────── */}
      <section id="gpu-to-storage">
        <h2 style={S.h2}>GPU-to-Storage Data Flow</h2>
        <p style={S.p}>
          What happens in a GPU training step from a storage perspective:
        </p>
        <ol style={S.ol}>
          <li>The data loader worker (CPU thread) reads the next batch from the parallel file system.</li>
          <li>The data loader does preprocessing on the CPU (normalization, augmentation, etc.).</li>
          <li>The preprocessed batch is buffered in system RAM (CPU memory).</li>
          <li>The GPU transfers the batch into GPU HBM over the PCIe bus or NVLink (DMA transfer).</li>
          <li>The GPU computes the forward pass.</li>
          <li>The GPU does the backward pass (gradient computation).</li>
          <li>AllReduce via the GPU network fabric — gradients sync across GPU nodes.</li>
          <li>Optimizer step — weights get updated.</li>
          <li>Go back to step 1 for the next batch.</li>
        </ol>
        <p style={S.p}>
          <strong>When GPU starvation happens:</strong> If step 1 (data reading from storage) is slower than step 5 (GPU compute), the GPU waits after step 4 for the next batch. GPU idle time = wasted expensive compute. This is "GPU starvation" — the storage pipeline isn't able to feed the GPU.
        </p>
        <p style={S.p}>
          <strong>Double buffering / prefetching:</strong> Modern frameworks allow data loaders to asynchronously prefetch the next batch while the GPU is computing on the current batch. If prefetching is fast enough, the GPU doesn't need to wait.
        </p>
      </section>

      {/* ── THROUGHPUT IOPS LATENCY ───────────────────────── */}
      <section id="throughput-iops-latency">
        <h2 style={S.h2}>Throughput vs IOPS vs Latency</h2>
        <p style={S.p}>
          These three metrics are frequently confused. It's important to clearly distinguish them in the AI storage context.
        </p>
        <ComparisonTable
          title="Storage Performance Metrics — Definitions and AI Relevance"
          headers={["Metric", "Definition", "Unit", "AI Training Relevance"]}
          rows={[
            ["Throughput (Bandwidth)", "Data transfer rate — how much data per second", "GB/s, TB/s", "PRIMARY metric for AI training — data feed rate to GPUs"],
            ["IOPS", "I/O operations per second, regardless of size", "IOPS", "Secondary — important for metadata operations, small-file workloads"],
            ["Latency", "Time to complete one I/O operation", "µs, ms", "Important for checkpoint writes, metadata; less for bulk sequential reads"],
            ["Bandwidth", "Network transmission capacity (not always same as throughput)", "Gb/s, Gbps", "Storage network capacity — throughput cannot exceed network bandwidth"],
            ["Concurrency", "Simultaneous I/O operations in flight", "Queue depth, parallel streams", "High concurrency needed when many GPU nodes access storage simultaneously"],
          ]}
        />
        <Callout type="warning" title="Commonly Confused Relationships">
          High IOPS doesn't automatically guarantee high throughput. 1M IOPS of 4KB = 4 GB/s throughput. 10K IOPS of 1MB = 10 GB/s throughput — 100× fewer IOPS but 2.5× more throughput. AI training is dominated by large sequential reads — throughput is critical, IOPS less so. Higher bandwidth doesn't automatically guarantee lower latency — these are orthogonal metrics.
        </Callout>
      </section>

      {/* ── SEQUENTIAL VS RANDOM ──────────────────────────── */}
      <section id="sequential-vs-random">
        <h2 style={S.h2}>Sequential vs Random I/O</h2>
        <p style={S.p}>
          Storage devices — both SSDs and HDDs — perform much better on sequential I/O compared to random I/O.
        </p>
        <ComparisonTable
          title="Sequential vs Random I/O"
          headers={["Factor", "Sequential I/O", "Random I/O"]}
          rows={[
            ["Pattern", "Contiguous blocks read/written in order", "Arbitrary locations accessed"],
            ["NVMe SSD performance", "High throughput (GB/s range)", "High IOPS, but lower throughput"],
            ["HDD performance", "Reasonably good — no seek needed", "Very poor — mechanical seek latency dominates"],
            ["AI training read", "Dominant pattern — large dataset files read sequentially", "Less common — except metadata, small files"],
            ["Checkpoint writes", "Typically sequential — large model state written", "Less common"],
            ["Metadata operations", "Not applicable", "Random — file open, stat, directory listing"],
          ]}
        />
        <p style={S.p}>
          AI training is primarily a sequential read workload — large dataset files read in order, across multiple epochs. This is why storage throughput (not IOPS) is the primary metric. Organize dataset files into large contiguous files where possible — scattered small files eliminate the benefit of sequential access.
        </p>
      </section>

      {/* ── SMALL FILES PROBLEM ───────────────────────────── */}
      <section id="small-files-problem">
        <h2 style={S.h2}>Small Files Problem</h2>
        <p style={S.p}>
          This is a deceptively serious problem. Imaging datasets (millions of individual JPEG files), NLP datasets (billions of small text files), or creating fine-grained data shards can severely impact storage performance.
        </p>
        <p style={S.p}><strong>Problems caused by millions of small files:</strong></p>
        <ul style={S.ul}>
          <li><strong>Metadata Bottleneck:</strong> Parallel file system metadata servers handle operations for every file — open, stat, close, directory listing. Millions of files = millions of metadata operations per epoch. The MDS can get overloaded even when the aggregate data size is manageable. Throughput drops drastically.</li>
          <li><strong>Storage Efficiency:</strong> Minimum block allocation per file — 4KB file may occupy 64KB block. Millions of small files = massive space waste (write amplification).</li>
          <li><strong>I/O Inefficiency:</strong> Small random reads don't get the full benefit of sequential read bandwidth. Storage device overhead per-operation is high relative to data transferred.</li>
          <li><strong>Directory Listing Overhead:</strong> Millions of files in one directory make directory listing extremely slow.</li>
        </ul>
        <p style={S.p}><strong>Solutions:</strong></p>
        <ul style={S.ul}>
          <li><strong>Dataset Packing:</strong> Pack many small files into larger container formats before storage — WebDataset (tar archives), TFRecord, HDF5, MosaicML's StreamingDataset format, Parquet.</li>
          <li><strong>Sharding:</strong> Divide the dataset into large equal-size shards (next section).</li>
          <li><strong>Caching:</strong> Cache frequently accessed portions on local NVMe.</li>
          <li><strong>Directory Structure:</strong> Don't keep millions of files in one directory — use a hierarchy.</li>
        </ul>
      </section>

      {/* ── DATASET SHARDING ──────────────────────────────── */}
      <section id="dataset-sharding">
        <h2 style={S.h2}>Dataset Sharding</h2>
        <p style={S.p}>
          Dataset sharding is a technique where a large dataset is divided into equal-size "shards" — typically hundreds of MB to a few GB each. This solves several problems.
        </p>
        <p style={S.p}><strong>Benefits:</strong></p>
        <ul style={S.ul}>
          <li><strong>Parallel Loading:</strong> Multiple data loader workers can read from different shards simultaneously — no contention.</li>
          <li><strong>Small Files Problem Mitigation:</strong> Each shard is a single large file — hundreds of large files instead of millions of individual files. Metadata operations reduce drastically.</li>
          <li><strong>Distributed Training:</strong> Different GPU nodes or data loader workers can be assigned different shards — clean partitioning.</li>
          <li><strong>Shuffling:</strong> Do inter-epoch shuffling at the shard level — within-shard shuffle is also possible. Avoids sequential patterns that can bias training.</li>
          <li><strong>Streaming:</strong> Shard-based datasets are better suited for streaming — load a shard, process it, load the next shard — you don't need to hold the full dataset in memory.</li>
        </ul>
        <p style={S.p}>
          Typical shard size: 100 MB – 2 GB depending on dataset type, hardware, and framework. Too small → metadata overhead. Too large → loading granularity is coarse.
        </p>
      </section>

      {/* ── CACHING ───────────────────────────────────────── */}
      <section id="caching">
        <h2 style={S.h2}>Caching in AI Storage</h2>
        <p style={S.p}>
          Caching reduces storage access latency and bandwidth requirements by serving frequently-accessed data from faster storage tiers.
        </p>
        <ul style={S.ul}>
          <li><strong>OS Page Cache (System RAM):</strong> Linux automatically caches recently read file data in system RAM. Free RAM = disk cache. Subsequent reads of the same data are served from the same RAM — much faster than going to NVMe. In AI training, when the dataset is larger than RAM, the working set cycles.</li>
          <li><strong>Local NVMe Cache:</strong> A node-level explicit cache — replicate data read from the parallel file system onto local NVMe. Subsequent epochs are served from the same NVMe. Faster than going to network storage every time.</li>
          <li><strong>Shared Caching Layer:</strong> Dedicated high-speed caching appliances (Alluxio, CacheLib, etc.) provide an intermediate cache between slow object storage and fast compute.</li>
          <li><strong>Dataset Prefetching:</strong> During training, load the next batch from storage asynchronously while the GPU is computing on the current batch. PyTorch DataLoader's prefetch_factor parameter controls exactly this. Effective prefetching can eliminate GPU wait time.</li>
        </ul>
        <Callout type="important" title="Caching Does NOT Eliminate Need for High-Performance Storage">
          A common misconception: "caching will make slow storage work fine." This is only partially true, for repeated access patterns. In the first epoch (cold cache), all data is read from slow storage. Subsequent epochs can be served from cache. But for large datasets (bigger than the cache), the cache benefit is limited. Caching is an optimization, not a replacement for adequate storage throughput.
        </Callout>
      </section>

      {/* ── CHECKPOINT STORAGE ────────────────────────────── */}
      <section id="checkpoint-storage">
        <h2 style={S.h2}>Checkpoint Storage</h2>
        <p style={S.p}>
          Checkpointing is the lifeline of AI training. On hardware failure, job preemption, or a software crash, you can resume from the last checkpoint — no need to restart from zero.
        </p>
        <p style={S.p}><strong>Checkpoint contents:</strong> Model weights (parameters), optimizer states (momentum, variance for Adam, etc.), learning rate scheduler state, RNG states (for reproducibility), current epoch/step number. A large model's checkpoint can be hundreds of GB.</p>
        <p style={S.p}><strong>Checkpoint frequency tradeoff:</strong></p>
        <ul style={S.ul}>
          <li><strong>More frequent:</strong> Less training work lost on failure. More checkpoint write overhead (pauses training). More storage consumed.</li>
          <li><strong>Less frequent:</strong> More training work at risk. Less overhead. Less storage.</li>
        </ul>
        <p style={S.p}>A framework for deciding frequency: <em>Acceptable re-training time on failure × failure rate = checkpoint interval.</em> Multi-day training jobs typically checkpoint every few hours. Shorter jobs, more frequently.</p>
        <p style={S.p}><strong>Checkpoint storage considerations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Write Throughput:</strong> Writing a large model checkpoint (e.g., 200 GB) can take significant time. A synchronous checkpoint pauses training during the write. Asynchronous checkpoint: copy training state to CPU memory, continue training, let a background thread write to disk.</li>
          <li><strong>Storage Tier:</strong> Recent checkpoints on fast NVMe-backed storage (for quick recovery). Older checkpoints on object storage or a slower tier (cheaper).</li>
          <li><strong>Retention Policy:</strong> Keep the last N checkpoints (typically 2-3). So you can recover from the previous one if the latest checkpoint is corrupted.</li>
          <li><strong>Test Restore:</strong> Test checkpoint restore before starting a long run. Otherwise a corrupted checkpoint is only discovered at failure time.</li>
        </ul>
      </section>

      {/* ── STORAGE NETWORKING ────────────────────────────── */}
      <section id="storage-networking">
        <h2 style={S.h2}>Storage Networking</h2>
        <p style={S.p}>
          The storage network is a separate concern from the GPU compute network. Both exist in AI clusters, but they carry different traffic and often use different hardware.
        </p>
        <ComparisonTable
          title="Storage Network vs GPU Compute Network"
          headers={["Factor", "Storage Network", "GPU Compute Network (Fabric)"]}
          rows={[
            ["Purpose", "GPU nodes ↔ storage systems", "GPU ↔ GPU (AllReduce, collective ops)"],
            ["Traffic type", "Large sequential reads, checkpoint writes", "Gradient sync, tensor parallel communication"],
            ["Primary protocol", "Ethernet (100/200/400 GbE)", "InfiniBand or RoCE (for GPU-GPU)"],
            ["Latency sensitivity", "Throughput-primary, latency secondary", "Both latency and bandwidth critical"],
            ["RDMA use", "Yes — NVMe-oF over RDMA fabrics", "Yes — NCCL over InfiniBand/RoCE"],
            ["Physical separation", "Often separate NICs, sometimes shared", "Typically dedicated NICs for GPU fabric"],
          ]}
        />
        <p style={S.p}><strong>Storage networking options:</strong></p>
        <ul style={S.ul}>
          <li><strong>Standard Ethernet (1/10/25 GbE):</strong> Adequate for small clusters or less demanding workloads. Low cost. Limited throughput per node.</li>
          <li><strong>High-Speed Ethernet (100/200/400 GbE):</strong> Current standard for AI storage networking. Can run over RDMA (RoCE) — CPU bypass for storage operations. Higher throughput per node.</li>
          <li><strong>InfiniBand:</strong> High performance, low latency. Used for parallel file system storage access in some HPC environments. NVMe-oF over InfiniBand possible.</li>
          <li><strong>RDMA (Remote Direct Memory Access):</strong> Network operations go directly from GPU/CPU memory to storage without CPU involvement. Reduces CPU overhead for storage I/O. Used with RoCE or InfiniBand fabrics.</li>
        </ul>
        <Callout type="important" title="Storage Network ≠ GPU Compute Network">
          A common confusion: InfiniBand is not "storage networking" — InfiniBand is primarily used for GPU-to-GPU communication in AI clusters. Storage networking can be on a separate fabric (often Ethernet). Both exist simultaneously. Different roles, different design considerations.
        </Callout>
      </section>

      {/* ── NVME-OF ───────────────────────────────────────── */}
      <section id="nvme-of">
        <h2 style={S.h2}>NVMe-oF (NVMe over Fabrics)</h2>
        <p style={S.p}>
          The NVMe protocol was originally designed for the local PCIe bus — to access an NVMe SSD physically present inside the server. NVMe-oF extends this protocol over the network.
        </p>
        <p style={S.p}>
          <strong>Concept:</strong> A remote storage server has NVMe devices. An NVMe-oF client (GPU node) accesses those devices as if they were local — same NVMe command set, same protocol. The network fabric carries the data.
        </p>
        <p style={S.p}><strong>NVMe-oF transport options:</strong></p>
        <ul style={S.ul}>
          <li><strong>NVMe/TCP:</strong> Over standard TCP/IP Ethernet. Simplest to deploy, broadest compatibility. Some CPU overhead for the TCP stack.</li>
          <li><strong>NVMe/RoCE:</strong> Over RDMA over Converged Ethernet. Lower latency, less CPU overhead than TCP. Requires lossless Ethernet (PFC, ECN).</li>
          <li><strong>NVMe/FC:</strong> Over Fibre Channel. Used in enterprise SAN environments.</li>
        </ul>
        <Callout type="warning" title="NVMe-oF Doesn't Guarantee Local-NVMe-Like Performance">
          NVMe-oF provides local-NVMe-like access to remote NVMe in terms of protocol and command set — but network latency isn't eliminated. Local NVMe gives microsecond latency (direct PCIe). NVMe-oF adds network round-trip time — tens of microseconds with a good RDMA fabric. Use case: disaggregated storage architecture where a shared NVMe pool serves multiple servers, or when local NVMe capacity is insufficient. For the lowest possible latency: local NVMe is better.
        </Callout>
      </section>

      {/* ── STORAGE BOTTLENECKS ───────────────────────────── */}
      <section id="storage-bottlenecks">
        <h2 style={S.h2}>AI Storage Bottlenecks</h2>
        <p style={S.p}>
          Bottlenecks can occur at multiple points in the AI storage pipeline. Correctly identifying them is essential — fixing the wrong layer won't improve performance.
        </p>
        <ComparisonTable
          title="Common AI Storage Bottlenecks"
          headers={["Bottleneck", "Symptom", "Root Cause", "Resolution Direction"]}
          rows={[
            ["Insufficient storage bandwidth", "GPU starvation, low utilization during training", "Storage nodes/network cannot deliver enough aggregate throughput", "Add storage nodes, upgrade network, use local NVMe cache"],
            ["Metadata bottleneck", "Slow training with millions of small files, MDS CPU high", "Metadata server overloaded by per-file operations", "Pack small files into large containers, reduce file count"],
            ["Storage network congestion", "High latency, packet loss, retransmissions", "Storage network bandwidth saturated", "Upgrade network, separate storage and compute traffic"],
            ["Small-file workload", "Low throughput despite good hardware", "Storage efficiency lost to per-file overhead", "Dataset packing, sharding into larger files"],
            ["Slow checkpoint writes", "Training pauses during checkpoint, reduced throughput", "Checkpoint size × frequency exceeds write bandwidth", "Async checkpointing, faster storage tier, reduce frequency"],
            ["Insufficient cache", "Every epoch reads from slow backend storage", "Cache too small for working set", "Increase local NVMe, improve prefetching"],
            ["Data loader bottleneck", "CPU at 100%, GPUs waiting for data", "Data preprocessing CPU-bound, not storage-bound", "Increase data loader workers, optimize preprocessing, offload to GPU"],
            ["Storage contention", "Multiple jobs competing, all slowing down", "Shared storage saturated by concurrent workloads", "Storage QoS policies, job scheduling, dedicated storage tiers"],
          ]}
        />
        <Figure caption="GPU Starvation Troubleshooting Flow: Start from GPU utilization being low, check if GPU is waiting for data, then systematically diagnose each layer — data loader, local NVMe cache, storage network, parallel file system — until the bottleneck is identified.">
          <GpuStarvationFlow />
        </Figure>
      </section>

      {/* ── RESILIENCE ────────────────────────────────────── */}
      <section id="resilience">
        <h2 style={S.h2}>Storage Failure and Resilience</h2>
        <p style={S.p}>
          AI storage failures can interrupt training jobs and potentially lose data. It's important to clearly distinguish resilience mechanisms.
        </p>
        <Callout type="important" title="Performance Mechanisms ≠ Data Protection Mechanisms">
          These are commonly confused. RAID, replication, and erasure coding are for data protection — they don't directly guarantee performance (though RAID-0 striping can increase throughput at the cost of reliability). Caching is for performance — it doesn't provide durability. Plan the two separately.
        </Callout>
        <ComparisonTable
          title="Storage Resilience Mechanisms"
          headers={["Mechanism", "What It Does", "Use Case", "Consideration"]}
          rows={[
            ["RAID", "Distributes data across multiple drives within one storage node", "Drive failure protection within a server", "RAID-6 (dual parity) common for HDDs; NVMe often relies on erasure coding"],
            ["Replication", "N identical copies of data on different storage nodes/locations", "Node failure protection; simpler recovery", "3× space overhead for 3-way replication; higher write cost"],
            ["Erasure Coding", "K data + M parity chunks across nodes; any M failures tolerable", "More space-efficient than replication", "More CPU overhead for calculation; higher recovery complexity"],
            ["Snapshots", "Point-in-time copy of filesystem state", "Ransomware protection, accidental deletion recovery", "Storage overhead, typically not instant for large datasets"],
            ["Backup", "Separate copy on different system/location", "Disaster recovery, long-term preservation", "Separate from primary storage; recovery time can be significant"],
            ["Geographic Replication", "Copy on different datacenter/region", "Disaster recovery across facility failure", "High latency, significant bandwidth cost"],
          ]}
        />
        <p style={S.p}><strong>For AI checkpoints specifically:</strong> Robust protection of checkpoints is essential — they can represent potentially weeks of training. A common pattern is recent checkpoints on fast NVMe + periodic replication to durable object storage.</p>
      </section>

      {/* ── CAPACITY PLANNING ─────────────────────────────── */}
      <section id="capacity-planning">
        <h2 style={S.h2}>Storage Capacity Planning</h2>
        <p style={S.p}>
          AI storage capacity planning is complex because there are multiple factors, each sizing differently. Enumerate all of them.
        </p>
        <ComparisonTable
          title="AI Storage Capacity Drivers"
          headers={["Component", "Capacity Driver", "Notes"]}
          rows={[
            ["Raw datasets", "Source data size", "Often 5–100× more raw data than final training set after filtering/dedup"],
            ["Training dataset copies", "Dataset × number of copies", "Original + 1-2 replicas for reliability; hot tier + archive"],
            ["Preprocessing intermediates", "Depends on pipeline", "Temporary data during ETL; can be 2-5× dataset size at peak"],
            ["Active training data", "Working dataset size", "Data pre-staged to hot tier — may be subset of full dataset"],
            ["Checkpoints", "Model size × checkpoints kept × replicas", "Large model: 100–500 GB per checkpoint; 2-3 kept locally"],
            ["Checkpoint archive", "Historical checkpoints", "Long-term retention policy; typically compressed to object storage"],
            ["Trained models", "Model size × model versions", "Multiple fine-tunes, quantized versions, different configurations"],
            ["Experiment artifacts", "TensorBoard logs, metrics, configs", "Often much smaller than data/models"],
            ["Headroom buffer", "~20–30% free space", "Performance degrades and some file systems become unstable near full"],
          ]}
        />
        <p style={S.p}>
          Simple capacity estimate approach: Start with training dataset size. Add checkpoints (model size × retention count × 3 for safety margin). Add 20–30% overhead buffer. Add separate capacity for raw data archive (typically object storage — cheaper). Separate calculation for hot tier vs cold tier.
        </p>
        <Callout type="warning" title="Storage Grows Faster Than Expected">
          Storage growth is typically underestimated in AI projects. Multiple experiments, hyperparameter sweeps, fine-tuning runs, ablations — all create artifacts. Plan retention policies and data lifecycle management up front, not retroactively.
        </Callout>
      </section>

      {/* ── PERFORMANCE PLANNING ──────────────────────────── */}
      <section id="performance-planning">
        <h2 style={S.h2}>Storage Performance Planning</h2>
        <p style={S.p}>
          Determining required storage throughput is complex because workload characteristics are variable. Framework:
        </p>
        <ul style={S.ul}>
          <li><strong>Step 1 — Identify peak concurrent GPU nodes:</strong> Maximum number of GPUs simultaneously training from storage.</li>
          <li><strong>Step 2 — Estimate per-GPU data consumption:</strong> Training speed (samples/second) × batch size × sample size = per-GPU storage read rate. This varies by model, batch size, and GPU utilization.</li>
          <li><strong>Step 3 — Calculate aggregate requirement:</strong> Per-GPU rate × number of GPUs = aggregate read bandwidth needed.</li>
          <li><strong>Step 4 — Add overhead:</strong> Checkpoint write bandwidth, multiple concurrent jobs, metadata operations, cache miss rate. Typically add 20–50% buffer.</li>
          <li><strong>Step 5 — Consider cache hit ratio:</strong> A high cache hit rate effectively reduces storage read requirement. If the working set fits in local NVMe cache, the actual backend storage read rate is much lower after warmup.</li>
          <li><strong>Step 6 — Storage system provisioning:</strong> Ensure storage system's aggregate throughput (sum of all storage node bandwidths) exceeds calculated requirement with headroom.</li>
        </ul>
        <Callout type="best-practice" title="Benchmark, Don't Guess">
          Benchmark actual storage throughput requirements before production deployment. Run storage benchmark tools (fio, IOR) against your specific workload characteristics. Different data types (image vs text vs audio), different batch sizes, different concurrency levels — all show different behavior. Generic rules of thumb often miss actual requirements.
        </Callout>
      </section>

      {/* ── INFERENCE STORAGE ─────────────────────────────── */}
      <section id="inference-storage">
        <h2 style={S.h2}>AI Inference Storage</h2>
        <p style={S.p}>
          Inference — deploying a trained model in production to serve user requests — has very different storage requirements from training.
        </p>
        <p style={S.p}><strong>Inference storage requirements:</strong></p>
        <ul style={S.ul}>
          <li><strong>Model Loading:</strong> When inference starts, model weights load from storage into GPU memory (typically one-time, or infrequently when the model is updated). Fast read bandwidth helpful for quick startup.</li>
          <li><strong>Model Size:</strong> Same as training — depends on model. Quantized models smaller (INT8 vs FP16 reduces size 2×).</li>
          <li><strong>Serving Multiple Models:</strong> Production systems often serve multiple model versions — A/B testing, different task models. Keeping multiple model versions on storage.</li>
          <li><strong>Request Logging:</strong> Logging inference requests and responses for analysis, monitoring, fine-tuning data collection. Write-only stream, object storage or a log system is appropriate.</li>
          <li><strong>Model Hot-Swapping:</strong> Deploying a new model version without downtime. Loading the new version while the old version is still serving.</li>
        </ul>
      </section>

      {/* ── TRAINING VS INFERENCE ─────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference Storage</h2>
        <ComparisonTable
          title="AI Training vs Inference Storage Comparison"
          headers={["Factor", "Training", "Inference"]}
          rows={[
            ["Primary storage need", "High-throughput dataset reads", "Fast model loading, low-latency access"],
            ["Data volume", "Very large (TB to PB datasets)", "Smaller (just model weights + request logs)"],
            ["I/O pattern", "Sequential bulk reads", "Primarily model load (sequential) + log writes"],
            ["Throughput requirement", "Very high (feed all GPU nodes)", "Moderate (model load; once loaded, GPU memory used)"],
            ["Latency sensitivity", "Throughput-primary", "Model load latency, inference startup time"],
            ["Write pattern", "Checkpoint writes (large, periodic)", "Request logs (small, continuous stream)"],
            ["Shared storage access", "All GPU nodes simultaneously access", "Per-inference-node independent access"],
            ["Storage type preferred", "Parallel file system (hot training data)", "Object storage/NAS for model artifacts"],
            ["Failure impact", "Training slows/stops; checkpoint recovery", "Service unavailable until model re-loads"],
            ["Data persistence priority", "Checkpoints: critical. Dataset: reproducible.", "Model artifacts: critical. Logs: important."],
          ]}
        />
      </section>

      {/* ── MONITORING ────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Storage Monitoring</h2>
        <p style={S.p}>
          Effective monitoring, without which problems stay invisible until they become serious.
        </p>
        <ComparisonTable
          title="Key AI Storage Monitoring Metrics"
          headers={["Metric Category", "Specific Metrics", "Why Monitor", "Alert Threshold"]}
          rows={[
            ["Throughput", "Read/write GB/s per storage node, aggregate", "Primary AI training perf indicator; GPU starvation indicator", "Below expected training throughput"],
            ["Latency", "Read/write latency (avg, p95, p99)", "High latency = slow checkpoint, slow metadata", "Above baseline, p99 spikes"],
            ["IOPS", "Read/write IOPS per node", "Metadata-heavy workloads, small-file patterns", "Near device limit"],
            ["Queue Depth", "Outstanding I/O per device", "Storage saturation indicator", "Consistently high"],
            ["Capacity Utilization", "% used per storage tier, per node", "Avoid full storage (performance degradation + failures)", ">80% typically"],
            ["Metadata Performance", "MDS IOPS, MDS latency (Lustre)", "Small-file bottleneck detection", "MDS saturation"],
            ["Network Utilization", "Storage network bandwidth per link", "Network bottleneck for storage", "Near link capacity"],
            ["Cache Hit Ratio", "Local NVMe cache hit %, page cache hit %", "Effectiveness of caching; cold cache periods", "Unexpectedly low after warmup"],
            ["Storage Errors", "Drive errors, ECC, SMART data, filesystem errors", "Early hardware failure detection", "Any errors"],
            ["Checkpoint Performance", "Checkpoint write time, write throughput", "Checkpoint overhead on training", "Increasing over time"],
          ]}
        />
      </section>

      {/* ── TROUBLESHOOTING ───────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting AI Storage Performance</h2>
        <p style={S.p}>
          A systematic approach — diagnose layer by layer:
        </p>
        <ol style={S.ol}>
          <li><strong>Observe symptoms:</strong> GPU utilization low? Training throughput (samples/second) lower than expected? Checkpoint writes taking too long?</li>
          <li><strong>Profile GPU idle time:</strong> Check with PyTorch Profiler or Nsight Systems whether the GPU is actually computing or waiting on data.</li>
          <li><strong>Check data loader:</strong> How many data loader workers are there? Check CPU utilization — if it's pegged at 100%, that's a preprocessing bottleneck. Experimentally increase worker count.</li>
          <li><strong>Check local NVMe:</strong> Check local NVMe read IOPS and throughput. Is the cache warm? What's the hit ratio? Is NVMe bandwidth saturated?</li>
          <li><strong>Check storage network:</strong> Check network utilization — is there saturation? Packet loss? High retransmissions?</li>
          <li><strong>Check parallel file system:</strong> Check aggregate read throughput. Individual storage node utilization. MDS (metadata server) load — if MDS load is high, it's a small files problem or a directory-heavy workload.</li>
          <li><strong>Identify the bottleneck:</strong> Fix the layer where saturation or error is occurring.</li>
          <li><strong>Fix and re-measure:</strong> Measure the same metrics after every change. Change a single variable at a time for clear causality.</li>
        </ol>
        <Callout type="best-practice" title="Profile Pehle, Tune Baad">
          Tuning by guesswork without profiling often fixes the wrong layer. Adding more data loader workers won't fix a storage network problem. Adding NVMe won't fix a metadata bottleneck. Confirm the root cause first.
        </Callout>
      </section>

      {/* ── REAL WORLD ARCHITECTURE ───────────────────────── */}
      <section id="real-world-architecture">
        <h2 style={S.h2}>Real-World AI Storage Architecture</h2>
        <p style={S.p}>
          What a realistic production AI data center storage architecture looks like:
        </p>
        <Figure caption="Real-World AI Data Center Storage Architecture: Complete flow from data sources through object storage, data preparation, parallel file system (hot tier), storage network, to GPU compute nodes with local NVMe cache and GPU HBM. Checkpoints flow back to storage. Trained models go to Model Registry. GPU compute network (NVLink/InfiniBand) is completely separate from storage network.">
          <AiStorageArchitecture />
        </Figure>
        <p style={S.p}><strong>Key architectural decisions in this example:</strong></p>
        <ul style={S.ul}>
          <li><strong>Two separate networks:</strong> GPU compute fabric (InfiniBand/RoCE) for GPU-GPU AllReduce and storage network (high-speed Ethernet) for GPU-to-storage data. These are physically separate — mixing them creates congestion issues.</li>
          <li><strong>Pre-staging step:</strong> Object storage → Parallel file system migration before training starts. Training jobs are submitted only after data is ready on hot tier.</li>
          <li><strong>Local NVMe as L1 cache:</strong> Per-node NVMe caches frequently-accessed dataset portions — especially useful for multi-epoch training where the same data gets read repeatedly.</li>
          <li><strong>Tiered checkpoint storage:</strong> Recent checkpoints on fast NVMe-backed storage. Older checkpoints in object storage. Policy-driven lifecycle.</li>
          <li><strong>Metadata server dedicated:</strong> The parallel file system's metadata server on dedicated hardware — no co-location with data servers or compute.</li>
        </ul>
      </section>

      {/* ── DESIGN CHECKLIST ──────────────────────────────── */}
      <section id="design-checklist">
        <h2 style={S.h2}>AI Storage Design Checklist</h2>
        <ul style={S.ul}>
          <li>☐ <strong>Capacity:</strong> Dataset size + checkpoints + models + headroom calculated. Hot tier vs cold tier separated.</li>
          <li>☐ <strong>Throughput:</strong> Required aggregate throughput calculated. Storage system provisioned with headroom. Benchmarked against actual workload.</li>
          <li>☐ <strong>Parallel file system:</strong> Parallel file system selected and sized for concurrent GPU node access. NFS avoided for production training.</li>
          <li>☐ <strong>Object storage:</strong> S3-compatible object storage for dataset archive, model artifacts, backups. Separate from hot training tier.</li>
          <li>☐ <strong>Local NVMe:</strong> Per-node NVMe cache sized and configured. Cache warm-up procedure defined.</li>
          <li>☐ <strong>Dataset format:</strong> Small files packed into large container formats (WebDataset, TFRecord, HDF5). Dataset sharding designed.</li>
          <li>☐ <strong>Storage network:</strong> Storage network separate from GPU compute network. Bandwidth sufficient for peak concurrent GPU reads.</li>
          <li>☐ <strong>Checkpoint strategy:</strong> Frequency, retention policy, storage tier, async checkpointing. Restore procedure tested.</li>
          <li>☐ <strong>Resilience:</strong> Redundancy mechanism selected (replication/erasure coding). Backup to separate system/location. Recovery procedure documented.</li>
          <li>☐ <strong>Monitoring:</strong> Throughput, latency, IOPS, cache hit ratio, metadata performance, network utilization, capacity all monitored with alerts.</li>
          <li>☐ <strong>Pre-staging procedure:</strong> Data pre-stage to hot tier before training jobs. Scheduler integration for pre-staging step.</li>
          <li>☐ <strong>Data lifecycle:</strong> Retention policies defined. Old checkpoints/experiments automatically archived/deleted.</li>
          <li>☐ <strong>Multi-tenancy:</strong> Storage QoS policies if multiple teams share infrastructure. Storage quota per project.</li>
        </ul>
      </section>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>AI storage is primarily a throughput problem, not IOPS or latency:</strong> GPUs continuously require large sequential reads. Aggregate bandwidth is needed, not just high IOPS. Throughput, IOPS, and latency are distinct metrics — don't confuse them.</li>
          <li><strong>The layers of the storage hierarchy have different roles:</strong> GPU HBM is volatile working memory (not persistent storage). Local NVMe is per-node cache. Parallel file system is for shared hot training data. Object storage is for archive/durability. Every layer's purpose should be clearly defined.</li>
          <li><strong>Parallel file system, not NFS, for production AI training:</strong> NFS creates a single-server bottleneck. A parallel file system (Lustre, GPFS) provides aggregate throughput from multiple storage nodes — scale out to increase throughput.</li>
          <li><strong>GPU starvation is a symptom of a storage pipeline failure:</strong> Low GPU utilization during active training often means storage cannot deliver data fast enough. Profile first, then fix the correct layer. Check every layer systematically — data loader, local NVMe, network, storage system.</li>
          <li><strong>Object storage is not a POSIX filesystem:</strong> Object storage is ideal for large-scale durable storage but doesn't support POSIX file semantics. Direct training from object storage requires special libraries and usually underperforms a parallel file system. Pre-stage data to a hot tier before training.</li>
          <li><strong>The small files problem is serious:</strong> Millions of small files overload the metadata server, waste space, and reduce I/O efficiency. Dataset packing (WebDataset, TFRecord, HDF5) and sharding are essential for large datasets.</li>
          <li><strong>NVMe-oF doesn't guarantee local NVMe's performance:</strong> NVMe-oF accesses remote NVMe with an NVMe-like protocol, but network latency isn't eliminated. Local NVMe still has lower latency. NVMe-oF is useful for disaggregated architecture.</li>
          <li><strong>Checkpointing and resilience are different concerns:</strong> Checkpoint frequency is a recovery-exposure-vs-overhead tradeoff. Replication, erasure coding, and RAID are data protection mechanisms — different from performance mechanisms. Plan the two separately. Test checkpoint restore before long runs.</li>
          <li><strong>Keep the storage network separate from the GPU compute network:</strong> Sharing the same physical network between storage I/O traffic and GPU-to-GPU AllReduce traffic impacts both workloads. A dedicated storage network provides separate bandwidth.</li>
          <li><strong>Inference storage is fundamentally different from training storage:</strong> Inference is primarily model loading and request logging — much less throughput-intensive than training. Different storage tier and architecture are appropriate for inference vs training.</li>
        </ul>
      </section>

    </article>
  );
}
