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
          <TopicLink slug="gpu-cluster" variant="inline" /> article mein aapne samjha ki training ke dauran GPUs continuously data consume karte hain. Lekin yeh data aata kahan se hai? Kaise pahonchta hai GPU tak? Aur kyun is pipeline mein problem aane pe GPU idle baith jaata hai despite being available?
        </p>
        <p style={S.p}>
          AI Storage woh complete infrastructure hai jo training data store karta hai, GPUs ko deliver karta hai, checkpoints save karta hai, aur trained models preserve karta hai. Yeh sirf "large hard drives" nahi hain — AI workloads ki specific requirements ko conventional enterprise storage se fundamentally alag design decisions ki zaroorat hoti hai.
        </p>
        <p style={S.p}>
          Is article mein hum storage hierarchy se lekar parallel file systems, object storage, NVMe-oF, GPU starvation, bottleneck troubleshooting aur capacity planning tak sab cover karenge — zero se engineer level tak.
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
        <Callout type="important" title="GPU Cluster aur AI Networking pehle padho">
          Is article mein GPU HBM, parallel file systems, aur storage networking ke concepts freely reference kiye gaye hain. GPU Cluster aur AI Networking articles pehle padh lene se yeh concepts zyada samajh aayenge.
        </Callout>
      </section>

      {/* ── WHAT IS AI STORAGE ────────────────────────────── */}
      <section id="what-is-ai-storage">
        <h2 style={S.h2}>What Is AI Storage?</h2>
        <p style={S.p}>
          AI Storage ek umbrella term hai un sab storage systems ke liye jo ek AI data center mein data ko store, manage aur deliver karte hain — raw training datasets se lekar trained model artifacts tak.
        </p>
        <p style={S.p}>
          Concretely, AI storage include karta hai: object storage systems (datasets aur models ke liye), parallel file systems (active training data ke liye), local NVMe SSDs (per-node cache ke liye), aur checkpoint storage (training progress save karne ke liye). Inhe ek network fabric ke through GPU compute nodes se connect kiya jaata hai.
        </p>
        <p style={S.p}>
          AI storage sirf capacity ka problem nahi hai — yeh primarily a <strong>throughput problem</strong> hai. Ek GPU cluster hundreds ya thousands of GPUs pe training kar raha hai jab simultaneously storage se data read kar raha hai. Aggregate bandwidth requirement enormous ho sakti hai, aur agar storage pipeline itna fast data deliver na kar sake jitna GPUs consume kar saken, toh GPUs idle baith jaate hain — expensive compute waste.
        </p>
      </section>

      {/* ── WHY DIFFERENT ─────────────────────────────────── */}
      <section id="why-different">
        <h2 style={S.h2}>Why AI Workloads Need Different Storage</h2>
        <p style={S.p}>
          Traditional enterprise storage transactional workloads ke liye design hoti hai — databases, email, file servers. Yeh workloads high IOPS, small random I/O, aur low latency prefer karte hain. AI training fundamentally alag hai.
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
          Yahi reasons hain ki AI clusters dedicated parallel file systems, pre-staged hot data tiers, aur high-speed storage networks use karte hain — normal enterprise NAS/SAN solutions AI training ke liye sufficient nahi hoti.
        </p>
      </section>

      {/* ── AI DATA LIFECYCLE ─────────────────────────────── */}
      <section id="ai-data-lifecycle">
        <h2 style={S.h2}>AI Data Lifecycle</h2>
        <p style={S.p}>
          Ek AI model train hone se pehle aur baad mein data ki ek complete journey hoti hai. Har stage mein different storage requirements hote hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Raw Data:</strong> Web crawls, licensed datasets, sensor data, enterprise data. Typically object storage mein archived. Potentially petabytes. Access infrequent — primarily ingestion ke time.</li>
          <li><strong>Ingestion:</strong> Raw data storage mein load karna. ETL pipelines, format conversion, initial validation. Write-heavy phase.</li>
          <li><strong>Preprocessing:</strong> Cleaning, tokenization, deduplication, quality filtering, augmentation. CPU-intensive compute. Output processed dataset storage mein jaata hai.</li>
          <li><strong>Training Dataset:</strong> Processed, ready-to-use data. Training ke dauran yahi "hot" data hai. Parallel file system mein pre-staged hona chahiye. Most I/O here.</li>
          <li><strong>Checkpoints:</strong> Training ke dauran periodically save ki gayi model state (weights, optimizer states, RNG state). Fast write throughput required. Recent checkpoints fast storage pe, older ones archive mein.</li>
          <li><strong>Model Artifacts:</strong> Final trained model weights. Object storage mein versioned store. Inference serving ke liye used.</li>
          <li><strong>Inference Data:</strong> User requests processed karte waqt — typically small, latency-sensitive. Different from training.</li>
          <li><strong>Logs &amp; Telemetry:</strong> Training metrics (loss, accuracy, throughput), system metrics. Write-only during training, read for analysis. Object storage ya time-series database.</li>
        </ul>
      </section>

      {/* ── STORAGE HIERARCHY ─────────────────────────────── */}
      <section id="storage-hierarchy">
        <h2 style={S.h2}>Storage Hierarchy</h2>
        <p style={S.p}>
          AI storage ek pyramid ki tarah hai — upar fastest aur smallest, neeche slowest aur largest. Har layer ka different latency, bandwidth, capacity aur persistence profile hota hai.
        </p>
        <Figure caption="AI Storage Hierarchy: Seven layers from GPU HBM (top — fastest, smallest, most expensive per GB) down to Archival Storage (bottom — slowest, largest, cheapest). Actual speeds and capacities vary by hardware generation and deployment.">
          <StorageHierarchy />
        </Figure>
        <ul style={S.ul}>
          <li><strong>GPU HBM (High Bandwidth Memory):</strong> GPU chip ke andar integrated memory. Model weights, activations, gradients, optimizer states yahan hoti hain during active compute. Extremely fast (TB/s bandwidth), very small capacity per GPU, completely volatile (power off = data gone). <em>Yeh persistent storage nahi hai.</em></li>
          <li><strong>System RAM (CPU Memory):</strong> Server motherboard RAM. Data loaders yahan data stage karte hain before GPU transfer. Fast, volatile, larger than HBM but smaller than NVMe.</li>
          <li><strong>Local NVMe SSD:</strong> Server mein physically installed flash storage. Per-node cache ke roop mein use hota hai. Persistent, fast sequential reads, limited capacity per node (typically 1–30 TB range).</li>
          <li><strong>Shared NVMe / NVMe-oF:</strong> Network ke through accessible NVMe storage. Local NVMe se slower (network latency) but shared across multiple nodes.</li>
          <li><strong>Parallel File System:</strong> Multiple storage servers se aggregate throughput. Active training data ka primary home. POSIX interface — GPU nodes normal file operations se access kar sakte hain.</li>
          <li><strong>Object Storage:</strong> Flat namespace, HTTP API, effectively unlimited scale. Datasets ka long-term home, model artifacts, backups. Not suitable for high-frequency random access.</li>
          <li><strong>Archival / Tape Storage:</strong> Lowest cost per GB, highest latency (minutes to retrieve). Cold data, compliance archives, long-term model preservation.</li>
        </ul>
        <Callout type="important" title="GPU HBM Persistent Storage Nahi Hai">
          Ek common misconception: GPU HBM "storage" nahi hai in the traditional sense. Yeh volatile working memory hai — power cut ya job end hone pe sab erase ho jaata hai. Actual persistent storage (checkpoints, model weights) NVMe ya parallel file system pe hoti hai.
        </Callout>
      </section>

      {/* ── LOCAL VS SHARED ───────────────────────────────── */}
      <section id="local-vs-shared">
        <h2 style={S.h2}>Local NVMe vs Shared Storage</h2>
        <p style={S.p}>
          AI clusters mein dono types of storage important roles play karte hain — yeh competitors nahi, complementary layers hain.
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
          Common pattern: Training data pehle shared parallel file system pe hoti hai. Data loaders read karte hain aur frequently-accessed portions local NVMe pe cache karte hain. Subsequent reads local NVMe se serve hote hain — much faster than going to network storage every time.
        </p>
      </section>

      {/* ── PARALLEL FILE SYSTEMS ─────────────────────────── */}
      <section id="parallel-file-systems">
        <h2 style={S.h2}>Parallel File Systems</h2>
        <p style={S.p}>
          Parallel file system AI training storage ka backbone hai. Samjhate hain kyun NFS (single server) AI ke liye kaafi nahi hai.
        </p>
        <p style={S.p}>
          <strong>NFS ka problem:</strong> Ek NFS server ki bandwidth uski hardware limit se bound hai. 100 GPU nodes NFS se data read karein toh sab ek server ko request karte hain — bandwidth saturate hoti hai, GPU nodes wait karte hain, GPU utilization drops.
        </p>
        <p style={S.p}>
          <strong>Parallel file system ka solution:</strong> Data multiple storage nodes pe distribute hota hai. Har GPU node directly multiple storage nodes se simultaneously read kar sakta hai — aggregate throughput = sum of all storage node bandwidths. Scale out karo (more storage nodes add karo) toh aggregate throughput bhi scale hoti hai.
        </p>
        <Figure caption="Parallel File System Architecture: Multiple GPU nodes connect through a high-speed storage network to multiple storage nodes (Object Storage Targets) AND a separate metadata server. Each GPU node reads from all storage nodes simultaneously — aggregate throughput scales linearly with storage node count.">
          <ParallelStorageArchitecture />
        </Figure>
        <p style={S.p}><strong>Key concepts:</strong></p>
        <ul style={S.ul}>
          <li><strong>Parallel I/O:</strong> Multiple clients (GPU nodes) aur multiple servers (storage nodes) simultaneously data transfer karte hain.</li>
          <li><strong>Metadata Server (MDS):</strong> Alag dedicated server jo directory structure, filenames, file attributes, aur permissions manage karta hai. Data servers se completely separate. Metadata bottleneck ek real problem hai — billions of small files metadata server overload kar sakte hain.</li>
          <li><strong>Object Storage Targets (OST):</strong> Lustre mein actual data storage servers. Har OST apna storage independent mein serve karta hai.</li>
          <li><strong>Stripe:</strong> Ek file multiple OSTs pe "striped" (distribute) hoti hai. Ek large file read karte waqt client multiple OSTs se parallel mein data read kar sakta hai.</li>
          <li><strong>Aggregate Throughput:</strong> Overall system throughput = sum of all OST bandwidths (theoretically). Real-world network, CPU, aur client limitations apply.</li>
          <li><strong>POSIX Interface:</strong> GPU nodes normal Linux file operations (open, read, write, close) use karte hain — application ko pata nahi hota ki backend distributed hai.</li>
        </ul>
        <p style={S.p}><strong>Common parallel file systems:</strong></p>
        <ul style={S.ul}>
          <li><strong>Lustre:</strong> Most widely used in HPC/AI. Open-source base with commercial support options (DDN, WHAMCLOUD). MDS + MDT (metadata) + OSS + OST (data) architecture.</li>
          <li><strong>IBM Spectrum Scale (GPFS):</strong> Enterprise-grade, strong data management features, used in some large HPC installations.</li>
          <li><strong>WekaIO, VAST Data, NetApp:</strong> Newer all-flash parallel/distributed file systems with strong AI cluster support.</li>
        </ul>
        <Callout type="best-practice" title="NFS Development Ke Liye Theek, Production Training Ke Liye Nahi">
          NFS small clusters, development, aur testing ke liye adequate ho sakta hai. Large-scale AI training production ke liye benchmark karo — agar GPU utilization storage I/O se constrained ho rahi hai toh parallel file system evaluate karo.
        </Callout>
      </section>

      {/* ── OBJECT STORAGE ────────────────────────────────── */}
      <section id="object-storage">
        <h2 style={S.h2}>Object Storage in AI</h2>
        <p style={S.p}>
          Object storage AI data center mein important role play karta hai — lekin parallel file system se fundamentally alag hai. Dono ko confused mat karo.
        </p>
        <p style={S.p}>
          <strong>Object storage kya hai:</strong> Flat namespace (koi real directory tree nahi), objects buckets mein store hote hain. HTTP-based API (S3, GCS API). Objects typically immutable ya append-only. Effectively unlimited scale — petabytes to exabytes. Very durable (typically 11 nines — 99.999999999% durability). Examples: Amazon S3, Google Cloud Storage, MinIO (self-hosted S3-compatible).
        </p>
        <p style={S.p}><strong>AI mein object storage ka role:</strong></p>
        <ul style={S.ul}>
          <li><strong>Dataset Archive:</strong> Raw aur processed datasets long-term store karna. Petabyte-scale datasets yahan live karte hain. Training se pehle relevant data parallel file system pe pre-stage kiya jaata hai.</li>
          <li><strong>Model Artifacts:</strong> Trained model weights versioned store karna. Model registry as object storage. Inference deployment ke liye models yahan se load hote hain.</li>
          <li><strong>Experiment Logs:</strong> Training metrics, TensorBoard logs, experiment tracking data.</li>
          <li><strong>Backup &amp; DR:</strong> Checkpoints ka durable backup. Parallel file system data ka secondary copy.</li>
        </ul>
        <Callout type="warning" title="Object Storage POSIX Filesystem Nahi Hai">
          Object storage standard file operations (open/read/write/close) support nahi karta — ya karta hai toh significant overhead ke saath. PyTorch DataLoader directly S3 se data read nahi karta training speed pe. Typical pattern: Object storage → Pre-stage to parallel file system → Training. Direct object storage se training ke liye special data loading libraries required hain jo typically performance tradeoffs karte hain.
        </Callout>
      </section>

      {/* ── TRAINING DATA PIPELINE ────────────────────────── */}
      <section id="training-data-pipeline">
        <h2 style={S.h2}>AI Training Data Pipeline</h2>
        <p style={S.p}>
          Data sources se lekar GPU HBM tak ka complete path — har stage mein storage ka role samjhna zaruri hai.
        </p>
        <Figure caption="AI Training Data Pipeline: Data Sources → Ingestion → Data Preparation → Object/Archive Storage → Parallel File System (Hot) → GPU Nodes (Training). Checkpoints flow back from GPU nodes to storage. Final trained model goes to Model Registry.">
          <TrainingDataPipeline />
        </Figure>
        <ol style={S.ol}>
          <li><strong>Data Sources → Object Storage:</strong> Raw data ingest aur store karna. ETL pipelines, format conversion, initial validation.</li>
          <li><strong>Object Storage → Data Preparation:</strong> Processing job reads raw data, applies transformations (cleaning, tokenization, dedup), writes processed dataset back to object storage ya directly to parallel file system.</li>
          <li><strong>Object Storage → Parallel File System (Pre-staging):</strong> Training start karne se pehle, relevant dataset chunks ko fast "hot" parallel file system pe copy kiya jaata hai. Yeh step critical hai — training ke dauran object storage se directly read karna typically too slow hota hai.</li>
          <li><strong>Parallel File System → GPU Nodes (Data Loading):</strong> Training ke dauran, data loaders (PyTorch DataLoader workers) parallel file system se batches read karte hain, preprocess karte hain (CPU pe), aur GPU memory mein transfer karte hain.</li>
          <li><strong>GPU HBM (Training):</strong> Actual forward/backward pass GPU HBM mein hota hai.</li>
          <li><strong>GPU → Checkpoint Storage:</strong> Periodic checkpoint writes — model state parallel file system ya dedicated fast storage pe save hoti hai.</li>
          <li><strong>Training Complete → Model Registry:</strong> Final model weights object storage mein versioned store.</li>
        </ol>
        <Callout type="important" title="Pre-Staging Critical Hai">
          Training run start karne se pehle data pre-stage karna ek critical operational step hai. Agar training job start ho aur data abhi bhi slow object storage pe ho, toh GPUs immediately starve ho jaayenge. Data engineers aur cluster schedulers ko coordinate karna padta hai.
        </Callout>
      </section>

      {/* ── GPU TO STORAGE DATA FLOW ──────────────────────── */}
      <section id="gpu-to-storage">
        <h2 style={S.h2}>GPU-to-Storage Data Flow</h2>
        <p style={S.p}>
          Ek GPU training step mein kya hota hai storage perspective se:
        </p>
        <ol style={S.ol}>
          <li>Data loader worker (CPU thread) parallel file system se next batch read karta hai.</li>
          <li>Data loader CPU pe preprocessing karta hai (normalization, augmentation, etc.).</li>
          <li>Preprocessed batch system RAM (CPU memory) mein buffer hota hai.</li>
          <li>GPU PCIe bus ya NVLink ke through batch GPU HBM mein transfer karta hai (DMA transfer).</li>
          <li>GPU forward pass compute karta hai.</li>
          <li>GPU backward pass (gradient computation) karta hai.</li>
          <li>AllReduce via GPU network fabric — gradients sync hote hain across GPU nodes.</li>
          <li>Optimizer step — weights update hote hain.</li>
          <li>Next batch ke liye wapas step 1 pe jaao.</li>
        </ol>
        <p style={S.p}>
          <strong>GPU starvation kab hota hai:</strong> Agar step 1 (data reading from storage) step 5 (GPU compute) se zyada slow ho, toh GPU step 4 ke baad wait karta hai for next batch. GPU idle time = wasted expensive compute. Yeh "GPU starvation" hai — storage pipeline GPU ko feed nahi kar pa rahi.
        </p>
        <p style={S.p}>
          <strong>Double buffering / prefetching:</strong> Modern frameworks data loaders ko asynchronously next batch prefetch karne ki allow karte hain while GPU current batch pe compute kar raha hota hai. Agar prefetching fast enough hai, GPU ko wait nahi karna padta.
        </p>
      </section>

      {/* ── THROUGHPUT IOPS LATENCY ───────────────────────── */}
      <section id="throughput-iops-latency">
        <h2 style={S.h2}>Throughput vs IOPS vs Latency</h2>
        <p style={S.p}>
          Yeh teen metrics frequently confuse kiye jaate hain. AI storage context mein clearly distinguish karna zaruri hai.
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
          High IOPS automatically high throughput guarantee nahi karta. 1M IOPS of 4KB = 4 GB/s throughput. 10K IOPS of 1MB = 10 GB/s throughput — 100× fewer IOPS but 2.5× more throughput. AI training large sequential reads pe dominant hai — throughput critical hai, IOPS less so. Higher bandwidth automatically lower latency guarantee nahi karta — yeh orthogonal metrics hain.
        </Callout>
      </section>

      {/* ── SEQUENTIAL VS RANDOM ──────────────────────────── */}
      <section id="sequential-vs-random">
        <h2 style={S.h2}>Sequential vs Random I/O</h2>
        <p style={S.p}>
          Storage devices — SSDs aur HDDs dono — sequential I/O pe much better perform karte hain random I/O ke mukable.
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
          AI training is primarily a sequential read workload — large dataset files read in order, multiple epochs. Yahi reason hai ki storage throughput (not IOPS) primary metric hai. Dataset files ko large contiguous files mein organize karo jahan possible — scattered small files sequential access ki benefit eliminate karte hain.
        </p>
      </section>

      {/* ── SMALL FILES PROBLEM ───────────────────────────── */}
      <section id="small-files-problem">
        <h2 style={S.h2}>Small Files Problem</h2>
        <p style={S.p}>
          Yeh ek deceptively serious problem hai. Imaging datasets (millions of individual JPEG files), NLP datasets (billions of small text files), ya fine-grained data shards create karne se storage performance severely impact ho sakta hai.
        </p>
        <p style={S.p}><strong>Problems caused by millions of small files:</strong></p>
        <ul style={S.ul}>
          <li><strong>Metadata Bottleneck:</strong> Parallel file system metadata servers har file ke liye operations handle karte hain — open, stat, close, directory listing. Millions of files = millions of metadata operations per epoch. MDS overload ho sakta hai even though aggregate data size manageable ho. Throughput drops drastically.</li>
          <li><strong>Storage Efficiency:</strong> Minimum block allocation per file — 4KB file may occupy 64KB block. Millions of small files = massive space waste (write amplification).</li>
          <li><strong>I/O Inefficiency:</strong> Small random reads sequential read bandwidth ka full benefit nahi lete. Storage device overhead per-operation high hota hai relative to data transferred.</li>
          <li><strong>Directory Listing Overhead:</strong> Millions of files ek directory mein directory listing extremely slow kar deti hai.</li>
        </ul>
        <p style={S.p}><strong>Solutions:</strong></p>
        <ul style={S.ul}>
          <li><strong>Dataset Packing:</strong> Many small files ko larger container formats mein pack karo before storage — WebDataset (tar archives), TFRecord, HDF5, MosaicML's StreamingDataset format, Parquet.</li>
          <li><strong>Sharding:</strong> Dataset ko large equal-size shards mein divide karo (next section).</li>
          <li><strong>Caching:</strong> Local NVMe pe frequently accessed portions cache karo.</li>
          <li><strong>Directory Structure:</strong> Millions of files ek directory mein mat rakhna — hierarchy use karo.</li>
        </ul>
      </section>

      {/* ── DATASET SHARDING ──────────────────────────────── */}
      <section id="dataset-sharding">
        <h2 style={S.h2}>Dataset Sharding</h2>
        <p style={S.p}>
          Dataset sharding ek technique hai jisme large dataset ko equal-size "shards" mein divide kiya jaata hai — typically hundreds of MB se few GB each. Yeh several problems solve karta hai.
        </p>
        <p style={S.p}><strong>Benefits:</strong></p>
        <ul style={S.ul}>
          <li><strong>Parallel Loading:</strong> Multiple data loader workers different shards se simultaneously read kar sakte hain — no contention.</li>
          <li><strong>Small Files Problem Mitigation:</strong> Each shard ek single large file hai — millions of individual files ki jagah hundreds of large files. Metadata operations drastically reduce.</li>
          <li><strong>Distributed Training:</strong> Different GPU nodes ya data loader workers different shards assign kiye ja sakte hain — clean partitioning.</li>
          <li><strong>Shuffling:</strong> Inter-epoch shuffling shard level pe karo — within-shard shuffle bhi possible. Avoids sequential patterns that can bias training.</li>
          <li><strong>Streaming:</strong> Shard-based datasets streaming ke liye better suited hain — ek shard load karo, process karo, next shard load karo — full dataset memory mein hold karna zaruri nahi.</li>
        </ul>
        <p style={S.p}>
          Typical shard size: 100 MB – 2 GB depending on dataset type, hardware, aur framework. Too small → metadata overhead. Too large → loading granularity coarse.
        </p>
      </section>

      {/* ── CACHING ───────────────────────────────────────── */}
      <section id="caching">
        <h2 style={S.h2}>Caching in AI Storage</h2>
        <p style={S.p}>
          Caching storage access latency aur bandwidth requirements reduce karta hai by serving frequently-accessed data from faster storage tiers.
        </p>
        <ul style={S.ul}>
          <li><strong>OS Page Cache (System RAM):</strong> Linux automatically recently read file data system RAM mein cache karta hai. Free RAM = disk cache. Subsequent reads same data ke same RAM se serve hote hain — much faster than going to NVMe. AI training mein dataset larger than RAM hone pe working set cycle karta hai.</li>
          <li><strong>Local NVMe Cache:</strong> Node-level explicit cache — parallel file system se read ki gayi data local NVMe pe replicate karo. Subsequent epochs same NVMe se serve hoti hain. Faster than going to network storage every time.</li>
          <li><strong>Shared Caching Layer:</strong> Dedicated high-speed caching appliances (Alluxio, CacheLib, etc.) slow object storage aur fast compute ke beech intermediate cache provide karte hain.</li>
          <li><strong>Dataset Prefetching:</strong> Training ke dauran, next batch storage se async mein load karo while GPU current batch pe compute kar raha ho. PyTorch DataLoader prefetch_factor parameter yahi control karta hai. Effective prefetching GPU wait time eliminate kar sakta hai.</li>
        </ul>
        <Callout type="important" title="Caching Does NOT Eliminate Need for High-Performance Storage">
          Ek common misconception: "Caching se slow storage chal jaayegi." Yeh partially true hai only for repeated access patterns. First epoch (cold cache) mein sab data slow storage se read hota hai. Subsequent epochs cached data serve kar sakte hain. Lekin large datasets (cache se bade) mein cache benefit limited hota hai. Caching ek optimization hai, not a replacement for adequate storage throughput.
        </Callout>
      </section>

      {/* ── CHECKPOINT STORAGE ────────────────────────────── */}
      <section id="checkpoint-storage">
        <h2 style={S.h2}>Checkpoint Storage</h2>
        <p style={S.p}>
          Checkpointing AI training ki lifeline hai. Hardware failure, job preemption, ya software crash pe last checkpoint se resume kiya ja sakta hai — zero se restart karne ki zaroorat nahi.
        </p>
        <p style={S.p}><strong>Checkpoint contents:</strong> Model weights (parameters), optimizer states (momentum, variance for Adam, etc.), learning rate scheduler state, RNG states (for reproducibility), current epoch/step number. Large models ka checkpoint hundreds of GB tak ho sakta hai.</p>
        <p style={S.p}><strong>Checkpoint frequency tradeoff:</strong></p>
        <ul style={S.ul}>
          <li><strong>More frequent:</strong> Less training work lost on failure. More checkpoint write overhead (pauses training). More storage consumed.</li>
          <li><strong>Less frequent:</strong> More training work at risk. Less overhead. Less storage.</li>
        </ul>
        <p style={S.p}>Frequency decide karne ka framework: <em>Failure pe acceptable re-training time × failure rate = checkpoint interval.</em> Multi-day training jobs typically checkpoint every few hours. Shorter jobs more frequently.</p>
        <p style={S.p}><strong>Checkpoint storage considerations:</strong></p>
        <ul style={S.ul}>
          <li><strong>Write Throughput:</strong> Large model checkpoint (e.g., 200 GB) likhne mein significant time lag sakta hai. Synchronous checkpoint training pause karta hai during write. Asynchronous checkpoint: training state CPU memory mein copy, training continue, background thread disk pe write kare.</li>
          <li><strong>Storage Tier:</strong> Recent checkpoints fast NVMe-backed storage pe (for quick recovery). Older checkpoints object storage ya slower tier pe (cheaper).</li>
          <li><strong>Retention Policy:</strong> Last N checkpoints rakho (typically 2-3). Agar latest checkpoint corrupt ho toh previous se recover kar sako.</li>
          <li><strong>Test Restore:</strong> Long run start karne se pehle checkpoint restore test karo. Corrupted checkpoint ka pata failure pe hi chalta hai otherwise.</li>
        </ul>
      </section>

      {/* ── STORAGE NETWORKING ────────────────────────────── */}
      <section id="storage-networking">
        <h2 style={S.h2}>Storage Networking</h2>
        <p style={S.p}>
          Storage network ek alag concern hai GPU compute network se. Dono exist karte hain AI clusters mein, lekin different traffic carry karte hain aur often different hardware use karte hain.
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
          <li><strong>Standard Ethernet (1/10/25 GbE):</strong> Adequate for small clusters ya less demanding workloads. Low cost. Limited throughput per node.</li>
          <li><strong>High-Speed Ethernet (100/200/400 GbE):</strong> Current standard for AI storage networking. RDMA (RoCE) pe run kar sakta hai — CPU bypass for storage operations. Higher throughput per node.</li>
          <li><strong>InfiniBand:</strong> High performance, low latency. Parallel file system storage access ke liye used in some HPC environments. NVMe-oF over InfiniBand possible.</li>
          <li><strong>RDMA (Remote Direct Memory Access):</strong> Network operations directly GPU/CPU memory se storage tak without CPU involvement. Reduces CPU overhead for storage I/O. Used with RoCE ya InfiniBand fabrics.</li>
        </ul>
        <Callout type="important" title="Storage Network ≠ GPU Compute Network">
          Ek common confusion: InfiniBand "storage networking" hai yeh nahi — InfiniBand primarily GPU-to-GPU communication ke liye use hota hai AI clusters mein. Storage networking alag fabric pe ho sakti hai (often Ethernet). Dono exist simultaneously. Different roles, different design considerations.
        </Callout>
      </section>

      {/* ── NVME-OF ───────────────────────────────────────── */}
      <section id="nvme-of">
        <h2 style={S.h2}>NVMe-oF (NVMe over Fabrics)</h2>
        <p style={S.p}>
          NVMe protocol originally local PCIe bus ke liye design hua tha — server ke andar physically present NVMe SSD access karne ke liye. NVMe-oF is protocol ko network pe extend karta hai.
        </p>
        <p style={S.p}>
          <strong>Concept:</strong> Remote storage server pe NVMe devices hain. NVMe-oF client (GPU node) un devices ko access karta hai as if they were local — same NVMe command set, same protocol. Network fabric data carry karta hai.
        </p>
        <p style={S.p}><strong>NVMe-oF transport options:</strong></p>
        <ul style={S.ul}>
          <li><strong>NVMe/TCP:</strong> Standard TCP/IP Ethernet pe. Simplest to deploy, broadest compatibility. Some CPU overhead for TCP stack.</li>
          <li><strong>NVMe/RoCE:</strong> RDMA over Converged Ethernet pe. Lower latency, less CPU overhead than TCP. Requires lossless Ethernet (PFC, ECN).</li>
          <li><strong>NVMe/FC:</strong> Fibre Channel pe. Enterprise SAN environments mein.</li>
        </ul>
        <Callout type="warning" title="NVMe-oF Local NVMe Jaisi Performance Guarantee Nahi Karta">
          NVMe-oF remote NVMe ko local-NVMe-like access provide karta hai in terms of protocol aur command set — but network latency eliminated nahi hoti. Local NVMe microsecond latency deta hai (direct PCIe). NVMe-oF network round-trip time add karta hai — tens of microseconds with good RDMA fabric. Use case: Disaggregated storage architecture jahan shared NVMe pool multiple servers serve kare, ya jab local NVMe capacity insufficient ho. For lowest possible latency: local NVMe better hai.
        </Callout>
      </section>

      {/* ── STORAGE BOTTLENECKS ───────────────────────────── */}
      <section id="storage-bottlenecks">
        <h2 style={S.h2}>AI Storage Bottlenecks</h2>
        <p style={S.p}>
          AI storage pipeline mein multiple points pe bottlenecks ho sakte hain. Correctly identify karna zaruri hai — wrong layer fix karne se performance improve nahi hoga.
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
          AI storage failures training jobs interrupt kar sakte hain aur potentially data lose kar sakte hain. Resilience mechanisms ko clearly distinguish karna zaruri hai.
        </p>
        <Callout type="important" title="Performance Mechanisms ≠ Data Protection Mechanisms">
          Yeh commonly confused hote hain. RAID, replication, aur erasure coding data protection ke liye hain — yeh performance guarantee nahi dete directly (though RAID-0 striping throughput badha sakta hai at cost of reliability). Caching performance ke liye hai — yeh durability provide nahi karta. Dono separately plan karo.
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
        <p style={S.p}><strong>For AI checkpoints specifically:</strong> Checkpoints ka robust protection essential hai — yeh potentially weeks of training represent karte hain. Recent checkpoints fast NVMe pe + periodic replication to durable object storage common pattern hai.</p>
      </section>

      {/* ── CAPACITY PLANNING ─────────────────────────────── */}
      <section id="capacity-planning">
        <h2 style={S.h2}>Storage Capacity Planning</h2>
        <p style={S.p}>
          AI storage capacity planning complex hai kyunki multiple factors hain jo sabka size alag hota hai. Sab ko enumerate karo.
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
          AI projects mein storage growth typically underestimated hota hai. Multiple experiments, hyperparameter sweeps, fine-tuning runs, ablations — sab artifacts create karte hain. Retention policies aur data lifecycle management plan karo pehle se, not retroactively.
        </Callout>
      </section>

      {/* ── PERFORMANCE PLANNING ──────────────────────────── */}
      <section id="performance-planning">
        <h2 style={S.h2}>Storage Performance Planning</h2>
        <p style={S.p}>
          Required storage throughput determine karna complex hai kyunki workload characteristics variable hain. Framework:
        </p>
        <ul style={S.ul}>
          <li><strong>Step 1 — Identify peak concurrent GPU nodes:</strong> Maximum number of GPUs simultaneously training from storage.</li>
          <li><strong>Step 2 — Estimate per-GPU data consumption:</strong> Training speed (samples/second) × batch size × sample size = per-GPU storage read rate. This varies by model, batch size, aur GPU utilization.</li>
          <li><strong>Step 3 — Calculate aggregate requirement:</strong> Per-GPU rate × number of GPUs = aggregate read bandwidth needed.</li>
          <li><strong>Step 4 — Add overhead:</strong> Checkpoint write bandwidth, multiple concurrent jobs, metadata operations, cache miss rate. Typically add 20–50% buffer.</li>
          <li><strong>Step 5 — Consider cache hit ratio:</strong> High cache hit rate effectively reduces storage read requirement. Agar working set fits in local NVMe cache, actual backend storage read rate much lower after warmup.</li>
          <li><strong>Step 6 — Storage system provisioning:</strong> Ensure storage system's aggregate throughput (sum of all storage node bandwidths) exceeds calculated requirement with headroom.</li>
        </ul>
        <Callout type="best-practice" title="Benchmark, Don't Guess">
          Actual storage throughput requirements benchmark karo before production deployment. Run storage benchmark tools (fio, IOR) against your specific workload characteristics. Different data types (image vs text vs audio), different batch sizes, different concurrency levels — sab alag behavior show karte hain. Generic rules of thumb often miss actual requirements.
        </Callout>
      </section>

      {/* ── INFERENCE STORAGE ─────────────────────────────── */}
      <section id="inference-storage">
        <h2 style={S.h2}>AI Inference Storage</h2>
        <p style={S.p}>
          Inference — trained model ko production mein user requests serve karne ke liye deploy karna — training se very different storage requirements rakhta hai.
        </p>
        <p style={S.p}><strong>Inference storage requirements:</strong></p>
        <ul style={S.ul}>
          <li><strong>Model Loading:</strong> Inference start hone pe model weights storage se GPU memory mein load hote hain (one-time typically, ya infrequently when model updated). Fast read bandwidth helpful for quick startup.</li>
          <li><strong>Model Size:</strong> Same as training — depends on model. Quantized models smaller (INT8 vs FP16 reduces size 2×).</li>
          <li><strong>Serving Multiple Models:</strong> Production systems often multiple model versions serve karte hain — A/B testing, different task models. Multiple model versions storage pe rakhna.</li>
          <li><strong>Request Logging:</strong> Inference requests aur responses log karna for analysis, monitoring, fine-tuning data collection. Write-only stream, object storage ya log system appropriate.</li>
          <li><strong>Model Hot-Swapping:</strong> New model version deploy karna without downtime. New version load karna while old version still serving.</li>
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
          Effective monitoring without which problems invisible rehte hain until they become serious.
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
          Systematic approach — layer by layer diagnose karo:
        </p>
        <ol style={S.ol}>
          <li><strong>Observe symptoms:</strong> GPU utilization low? Training throughput (samples/second) lower than expected? Checkpoint writes taking too long?</li>
          <li><strong>Profile GPU idle time:</strong> PyTorch Profiler ya nsight systems se check karo GPU actually compute kar raha hai ya data wait kar raha hai.</li>
          <li><strong>Check data loader:</strong> Data loader workers kitne hain? CPU utilization check karo — agar 100% pe sar jaa raha hai, preprocessing bottleneck. Worker count badhao experimentally.</li>
          <li><strong>Check local NVMe:</strong> Local NVMe read IOPS aur throughput check karo. Cache warm hai? Hit ratio kya hai? NVMe bandwidth saturated?</li>
          <li><strong>Check storage network:</strong> Network utilization check karo — saturation hai? Packet loss? High retransmissions?</li>
          <li><strong>Check parallel file system:</strong> Aggregate read throughput check karo. Individual storage node utilization. MDS (metadata server) load — agar MDS high hai, small files problem ya directory-heavy workload.</li>
          <li><strong>Identify bottleneck:</strong> Woh layer jahan saturation ya error ho — wahan fix karo.</li>
          <li><strong>Fix aur re-measure:</strong> Har change ke baad same metrics measure karo. Single variable change at a time for clear causality.</li>
        </ol>
        <Callout type="best-practice" title="Profile Pehle, Tune Baad">
          Profiling ke bina guesswork pe tune karna often wrong layer fix karta hai. Data loader workers badhana storage network problem fix nahi karega. NVMe add karna metadata bottleneck fix nahi karega. Root cause confirm karo pehle.
        </Callout>
      </section>

      {/* ── REAL WORLD ARCHITECTURE ───────────────────────── */}
      <section id="real-world-architecture">
        <h2 style={S.h2}>Real-World AI Storage Architecture</h2>
        <p style={S.p}>
          Ek realistic production AI data center storage architecture kaisi dikhti hai:
        </p>
        <Figure caption="Real-World AI Data Center Storage Architecture: Complete flow from data sources through object storage, data preparation, parallel file system (hot tier), storage network, to GPU compute nodes with local NVMe cache and GPU HBM. Checkpoints flow back to storage. Trained models go to Model Registry. GPU compute network (NVLink/InfiniBand) is completely separate from storage network.">
          <AiStorageArchitecture />
        </Figure>
        <p style={S.p}><strong>Key architectural decisions in this example:</strong></p>
        <ul style={S.ul}>
          <li><strong>Two separate networks:</strong> GPU compute fabric (InfiniBand/RoCE) for GPU-GPU AllReduce aur storage network (high-speed Ethernet) for GPU-to-storage data. These are physically separate — mixing them creates congestion issues.</li>
          <li><strong>Pre-staging step:</strong> Object storage → Parallel file system migration before training starts. Training jobs are submitted only after data is ready on hot tier.</li>
          <li><strong>Local NVMe as L1 cache:</strong> Per-node NVMe cache frequently-accessed dataset portions ko — especially useful for multi-epoch training where same data repeatedly read hoti hai.</li>
          <li><strong>Tiered checkpoint storage:</strong> Recent checkpoints fast NVMe-backed storage pe. Older checkpoints object storage mein. Policy-driven lifecycle.</li>
          <li><strong>Metadata server dedicated:</strong> Parallel file system metadata server dedicated hardware pe — no co-location with data servers or compute.</li>
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
          <li><strong>AI storage primarily a throughput problem hai, not IOPS or latency:</strong> GPUs continuously large sequential reads require karte hain. Aggregate bandwidth ki zaroorat hai, not just high IOPS. Throughput, IOPS, aur latency are distinct metrics — don't confuse them.</li>
          <li><strong>Storage hierarchy ke layers ke different roles hain:</strong> GPU HBM volatile working memory hai (not persistent storage). Local NVMe per-node cache hai. Parallel file system shared hot training data ke liye. Object storage archive/durability ke liye. Har layer ka purpose clearly defined hona chahiye.</li>
          <li><strong>Parallel file system, NFS nahi, production AI training ke liye:</strong> NFS single-server bottleneck creates karta hai. Parallel file system (Lustre, GPFS) multiple storage nodes se aggregate throughput provide karta hai — scale out karke throughput badhao.</li>
          <li><strong>GPU starvation storage pipeline failure ki symptom hai:</strong> Low GPU utilization during active training often means storage cannot deliver data fast enough. Profile first, then fix the correct layer. Data loader, local NVMe, network, storage system — har layer check karo systematically.</li>
          <li><strong>Object storage POSIX filesystem nahi hai:</strong> Object storage large-scale durable storage ke liye ideal hai lekin POSIX file semantics support nahi karta. Direct training from object storage requires special libraries aur usually underperforms parallel file system. Pre-stage data to hot tier before training.</li>
          <li><strong>Small files problem serious hai:</strong> Millions of small files metadata server overload karte hain, space waste karte hain, aur I/O efficiency reduce karte hain. Dataset packing (WebDataset, TFRecord, HDF5) aur sharding essential hain large datasets ke liye.</li>
          <li><strong>NVMe-oF local NVMe ki performance guarantee nahi karta:</strong> NVMe-oF remote NVMe ko NVMe-like protocol se access karta hai but network latency eliminate nahi hoti. Local NVMe still lower latency. NVMe-oF disaggregated architecture ke liye useful hai.</li>
          <li><strong>Checkpointing aur resilience alag concerns hain:</strong> Checkpoint frequency recovery exposure vs overhead tradeoff. Replication, erasure coding, aur RAID data protection mechanisms hain — performance mechanisms se different. Dono separately plan karo. Checkpoint restore test karo before long runs.</li>
          <li><strong>Storage network GPU compute network se separate rakhna:</strong> Storage I/O traffic aur GPU-to-GPU AllReduce traffic same physical network share karna both workloads ko impact karta hai. Dedicated storage network separate bandwidth provide karta hai.</li>
          <li><strong>Inference storage training storage se fundamentally different hai:</strong> Inference primarily model loading aur request logging hai — much less throughput intensive than training. Different storage tier aur architecture appropriate hai for inference vs training.</li>
        </ul>
      </section>

    </article>
  );
}
