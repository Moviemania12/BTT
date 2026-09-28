"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import NasDasComparison from "../svg/NasDasComparison";
import NasRequestFlow from "../svg/NasRequestFlow";
import NasHardwareArch from "../svg/NasHardwareArch";
import NasHaArchitecture from "../svg/NasHaArchitecture";
import NasSmbNfsFlow from "../svg/NasSmbNfsFlow";
import NasManagementUI from "../svg/NasManagementUI";
import NasTroubleshootFlow from "../svg/NasTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* ── Quick Summary ─────────────────────────────────────────────────── */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — NAS in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What NAS is:</strong> Network Attached Storage — a dedicated storage device that is connected to the Ethernet network and provides file-level storage to multiple servers and clients simultaneously.</li> <li><strong>Golden rule:</strong> If storage is attached directly to a host and does not do general-purpose network file sharing — it is typically a DAS pattern. If storage is on the network and multiple systems access it at file level — it is NAS.</li> <li><strong>File-level storage:</strong> NAS shares files and folders — a specialized file system sits on top of the underlying storage pool. Clients access files via the SMB/NFS protocols; the underlying NAS filesystem is not directly visible to clients.</li> <li><strong>Protocols:</strong> Windows clients use SMB (Port 445). Linux/Unix clients use NFS (primarily Port 2049). Both are possible simultaneously on one NAS — but multiprotocol datasets require careful identity mapping and permission design.</li> <li><strong>Data Center use:</strong> Shared file storage, backup targets, log servers, home directories, application data — wherever multiple servers or users access the same files.</li> <li><strong>Primary advantage:</strong> Multiple systems can access one NAS simultaneously — the fundamental difference from DAS.</li> <li><strong>Engineer's daily work:</strong> Health and capacity monitoring, drive health, share accessibility, replication/backup status, alert handling.</li> <li><strong>Most common beginner mistake:</strong> Judging NAS service status by ping — ping working and SMB/NFS working are two different things.</li> <li><strong>Snapshot ≠ Backup:</strong> A NAS snapshot is a data protection tool; an independent backup, preferably offsite/isolated, is required separately.</li> </ul>
      </div>

      {/* ══ SECTION 1 — DEFINITION ══════════════════════════════════════════ */}
      <h2 id="nas-kya-hai" style={S.h2}>What Is NAS — Definition and Full Form</h2>
      <p style={S.p}><strong>NAS = Network Attached Storage</strong></p>
      <p style={S.p}>NAS is a dedicated storage device that is connected directly to the Ethernet network. Servers, computers and clients access files on this device over the network.</p>
      <p style={S.p}><strong>Simple definition:</strong> A storage box placed on the network. Any system connected to the network can read and write files on this box — together, simultaneously.</p>
      <p style={S.p}><strong>Technical definition:</strong> NAS is a dedicated storage appliance that runs a specialized operating system, has Ethernet network interfaces, and exposes file-level storage protocols (primarily SMB and NFS) — to provide shared storage to multiple concurrent clients.</p>

      <h3 style={S.h3}>Why NAS Was Created</h3>
      <p style={S.p}>A general-purpose file server can also provide shared file storage, but NAS is a purpose-built storage platform that integrates centralized file services, storage management, redundancy, snapshots and replication into a specialized appliance/platform.</p>
      <p style={S.p}>In data centers this need grows exponentially — hundreds of servers, thousands of users, petabytes of shared data. NAS addresses this need with dedicated, optimized hardware and software.</p>

      {/* ══ SECTION 2 — DAS vs NAS ══════════════════════════════════════════ */}
      <h2 id="das-vs-nas" style={S.h2}>DAS vs NAS — Fundamental Difference</h2>
      <p style={S.p}>This confusion is very common. Let's understand it clearly once:</p>
      <CodeBlock lang="text">
{`Typical DAS (Direct Attached Storage):
Server ←——— Physical Cable ——→ Storage
(Directly attached to host — does not provide
general-purpose network file sharing)

NAS (Network Attached Storage):
Server A ←——┐
Server B ←——┤
Server C ←——┤——→ Ethernet Switch ——→ NAS
Laptop D ←——┘
(ALL of them access it simultaneously over network)`}
      </CodeBlock>
      <Callout type="important" title="DAS — Important Nuance">
        Typical DAS is connected directly to a single host and does not provide general-purpose network sharing. Specialized designs (such as shared-SAS clusters or cluster-aware configurations) can allow shared disk access between two or more nodes — but this is not general NAS file sharing and carries platform-specific complexity. Block storage can be provided by either DAS topology or SAN.
      </Callout>

      <Figure caption="Fig 1 — DAS vs NAS data path comparison. DAS: direct cable to host, no general-purpose network sharing. NAS: multiple clients simultaneously via Ethernet. Both data paths shown side-by-side.">
        <NasDasComparison />
      </Figure>

      {/* ══ SECTION 3 — NAS vs External HDD ════════════════════════════════ */}
      <h2 id="nas-vs-external-hdd" style={S.h2}>NAS vs Normal External Hard Disk</h2>
      <p style={S.p}>An external hard disk used at home and a NAS are different:</p>
      <ComparisonTable
        title="External Hard Disk vs NAS"
        headers={["Parameter", "External Hard Disk", "NAS"]}
        rows={[
          ["Connection",          "USB — one device at a time",       "Ethernet — multiple clients simultaneously"],
          ["Access",              "One person at a time",              "Multiple users concurrently"],
          ["Underlying file system","FAT32 / NTFS / exFAT",          "ZFS, WAFL, Btrfs, vendor-specific distributed filesystems*"],
          ["OS",                  "None",                              "Specialized NAS OS (ONTAP, OneFS, DSM, etc.)"],
          ["Redundancy",          "Usually none",                     "RAID standard"],
          ["Management",          "Drag-and-drop only",               "Web GUI, CLI, API"],
          ["Scale",               "Single drive",                     "Multiple drives, shelves, petabytes"],
          ["Data center use",     "Not suitable",                     "Standard"],
        ]}
        caption="*SMB/NFS clients do not directly see the underlying NAS filesystem — they use standard file operations. NAS filesystem is an internal implementation detail."
      />

      {/* ══ SECTION 4 — NAS vs SAN ══════════════════════════════════════════ */}
      <h2 id="nas-vs-san" style={S.h2}>NAS vs SAN — Brief Introduction</h2>
      <p style={S.p}>These two are different. SAN gets its own dedicated chapter — here it is only for context:</p>
      <ComparisonTable
        title="NAS vs SAN — Overview"
        headers={["", "NAS", "SAN"]}
        rows={[
          ["Access type",  "File-level",                  "Block-level"],
          ["Protocol",     "SMB, NFS",                   "Fibre Channel, iSCSI"],
          ["Client sees",  "Files and folders",           "Raw disk/LUN"],
          ["Network",      "Standard Ethernet",           "Dedicated FC network or iSCSI"],
          ["Typical use",  "Shared files, backups",      "Databases, VMware shared datastores"],
        ]}
        caption="Block-level storage can be provided via local/direct-attached disks (DAS topology) or SAN-provided LUNs. DAS describes attachment topology, not access type. SAN chapter: coming soon."
      />
      <p style={S.p}><strong>Simple rule:</strong> NAS = sharing files. SAN = sharing raw disk. NAS is easier to use. SAN gives higher performance and control for database-type workloads.</p>

      {/* ══ SECTION 5 — NAS vs Cloud ════════════════════════════════════════ */}
      <h2 id="nas-vs-cloud" style={S.h2}>NAS vs Cloud Storage</h2>
      <p style={S.p}><strong>Cloud storage</strong> (Google Drive, S3, Azure Blob) is storage over the internet — typically object storage, HTTP/HTTPS protocols.</p>
      <p style={S.p}><strong>NAS</strong> sits on the on-premise network — file protocols (SMB/NFS), low latency, private network. Data centers use both, for different purposes.</p>

      {/* ══ SECTION 6 — FILE-LEVEL STORAGE ═════════════════════════════════ */}
      <h2 id="file-level-storage" style={S.h2}>What Is File-Level Storage</h2>
      <p style={S.p}>In the storage world there are three main access types:</p>
      <ul style={S.ul}>
        <li><strong>Block storage:</strong> Raw disk blocks — the OS or application filesystem decides how to use them. Provided by local/direct-attached disks (DAS topology) or SAN over the network.</li>
        <li><strong>File storage (NAS):</strong> Files and folders directly. The file system lives on the NAS itself. The client simply opens a file as if it were a local file.</li>
        <li><strong>Object storage (Cloud, Ceph):</strong> Data objects as key-value pairs. Accessed over HTTP. For unstructured data, backups, media.</li>
      </ul>
      <p style={S.p}>NAS is file-level storage — the client does not get raw blocks, it gets files directly. This is NAS's simplicity advantage and also its constraint.</p>

      {/* ══ SECTION 7 — HOW NAS WORKS ══════════════════════════════════════ */}
      <h2 id="how-nas-works" style={S.h2}>How NAS Works — Complete Data Path</h2>
      <p style={S.p}>When a Windows user opens a file from <code>\\nas01\engineering</code>, all of this happens:</p>
      <CodeBlock lang="text">
{`User double-clicks file in Windows Explorer
              ↓
Windows OS checks: local file or network path?
              ↓
UNC path identified: \\nas01\engineering
              ↓
DNS resolution: nas01 → IP address (e.g. 10.10.20.50)
              ↓
SMB client initiates TCP connection — Port 445
              ↓
SMB session established — authentication happens
              ↓
SMB: "open file X in share 'engineering'"
              ↓
NIC → Ethernet cable → Switch → NAS NIC
              ↓
NAS OS processes request — authenticated? Permissions OK?
              ↓
NAS file system locates file on storage pool
              ↓
Storage pool → RAID → Physical drives → data read
              ↓
Data returned via SMB response
              ↓
Network → Switch → Client NIC
              ↓
Application opens file`}
      </CodeBlock>
      <p style={S.p}>A Linux path (<code>/mnt/nas</code>) uses the NFS protocol — same concept, different protocol.</p>

      <Figure caption="Fig 2 — NAS file access: complete request and response flow. Every numbered layer must succeed. Authentication, permissions and network path — all checked before data is returned.">
        <NasRequestFlow />
      </Figure>

      {/* ══ SECTION 8 — NAS HARDWARE ARCHITECTURE ══════════════════════════ */}
      <h2 id="nas-architecture" style={S.h2}>NAS Architecture — Hardware Components</h2>
      <p style={S.p}>An enterprise NAS is a complex appliance. Let's understand what happens inside:</p>

      <h3 style={S.h3}>NAS Controller (Head Unit)</h3>
      <p style={S.p}>The "brain" of the NAS. There are one or two controllers (for redundancy). Inside the controller:</p>
      <ul style={S.ul}>
        <li><strong>CPU:</strong> Runs the NAS OS, processes SMB/NFS requests, RAID calculations, deduplication/compression (if enabled).</li>
        <li><strong>Memory (RAM):</strong> Read cache — keeps frequently accessed data in RAM. Write cache — buffers incoming writes. More RAM = generally better NAS performance.</li>
        <li><strong>Cache (NVRAM / SSD-based):</strong> Dedicated non-volatile write cache — cached data stays safe even during a power failure. Regular RAM is volatile.</li>
        <li><strong>Network Interfaces (NICs):</strong> Typically 10GbE, 25GbE, or 100GbE in enterprise. Redundant ports are standard.</li>
        <li><strong>Management Interface:</strong> Separate port — for the management network. Keeping production data traffic and management traffic separate is best practice.</li>
        <li><strong>Storage Controllers:</strong> Manage internal storage connections — with drives and disk shelves.</li>
      </ul>

      <h3 style={S.h3}>Storage Shelves (Disk Enclosures)</h3>
      <p style={S.p}>Additional storage is attached to the controller. Large enterprise NAS systems have multiple shelves.</p>
      <ComparisonTable
        title="Drive Types in NAS"
        headers={["Type", "Interface", "Typical Use"]}
        rows={[
          ["SAS HDD",  "SAS",   "Enterprise reliability, high capacity — bulk storage, archival"],
          ["SATA HDD", "SATA",  "Lower cost, high capacity — SMB NAS, backup targets"],
          ["SAS SSD",  "SAS",   "Performance tier — frequently accessed data"],
          ["NVMe SSD", "PCIe",  "Highest performance — all-flash NAS, caching tier"],
        ]}
        caption="Tiering: some enterprise NAS platforms automatically migrate hot data to NVMe/SSD and cold data to HDD."
      />

      <h3 style={S.h3}>Power Supplies and Cooling</h3>
      <p style={S.p}>Redundant PSUs are standard in enterprise NAS — if one fails, the NAS keeps running. Typically hot-swappable. Redundant fans and temperature monitoring — storage hardware is heat-sensitive.</p>

      <Figure caption="Fig 3 — Enterprise NAS hardware internal architecture. Controller box: CPU, RAM, NVRAM cache, data NICs (data network), management port, storage controller, redundant PSUs. Disk shelves with hot-swap drives connect via storage controller.">
        <NasHardwareArch />
      </Figure>

      {/* ══ SECTION 9 — TYPES OF NAS ════════════════════════════════════════ */}
      <h2 id="types-of-nas" style={S.h2}>Types of NAS</h2>

      <h3 style={S.h3}>Desktop / Small Business NAS</h3>
      <p style={S.p}>Synology, QNAP, WD My Cloud — 2 to 8 drives. Home, small office, lab environment. Consumer or prosumer grade. <strong>Use case:</strong> Home media server, small team file sharing, developer lab, learning environment.</p>

      <h3 style={S.h3}>Rackmount NAS</h3>
      <p style={S.p}>Rack-mounted unit — more drives, better redundancy, higher throughput. <strong>Use case:</strong> Small to medium enterprise file storage, backup targets, test environments.</p>

      <h3 style={S.h3}>Enterprise NAS — Scale-Up</h3>
      <p style={S.p}>NetApp AFF/FAS and other dual-controller enterprise NAS platforms — purpose-built enterprise. Redundant controllers, large drive counts, advanced OS features, enterprise support. Scale-up = grow capacity within one controller pair (more drives, additional shelves).</p>
      <p style={S.p}><strong>Use case:</strong> Enterprise file servers, corporate home directories, large collaborative workloads, backup infrastructure.</p>

      <h3 style={S.h3}>Scale-Out NAS (Clustered NAS)</h3>
      <p style={S.p}>Multiple nodes form a cluster — aggregate storage and performance. <strong>Dell PowerScale (OneFS)</strong> is the dominant example. PowerScale uses a distributed multi-node architecture — fundamentally different from a scale-up dual-controller/shared-shelf design. OneFS is a distributed filesystem integrated into the PowerScale scale-out storage platform.</p>
      <p style={S.p}><strong>Use case:</strong> Media and entertainment (video production), large HPC environments, massive unstructured data — petabyte scale.</p>

      <h3 style={S.h3}>Unified Storage</h3>
      <p style={S.p}>Single platform that serves both NAS (file) and SAN (block) protocols. Dell PowerStore, NetApp AFF/FAS — both of these can serve NAS and SAN simultaneously.</p>

      <h3 style={S.h3}>NAS Gateway</h3>
      <p style={S.p}>Controller only — it has no drives of its own. It presents file services on top of SAN storage. For organizations already invested in SAN.</p>

      <h3 style={S.h3}>Synology / QNAP — Positioning Note</h3>
      <p style={S.p}>Synology and QNAP are widely used in SMB, departmental, backup and lab environments. Suitability for enterprise production depends on the specific model, HA capability, support SLA, workload and organizational requirements — classifying them universally as "non-enterprise" is not appropriate.</p>

      {/* ══ SECTION 10 — ENTERPRISE NAS ARCHITECTURE ════════════════════════ */}
      <h2 id="enterprise-nas-arch" style={S.h2}>Enterprise NAS Architecture — Data Center Deployment</h2>
      <p style={S.p}>Realistic enterprise scale-up NAS deployment (dual-controller design):</p>
      <CodeBlock lang="text">
{`Servers / Client Workstations
         ↓
Access Layer Switches (ToR)
         ↓
Aggregation / Core Switches
         ↓
     ┌───┴───┐
Switch A  Switch B   (Redundant switches)
   ↓           ↓
NIC A1      NIC B1   } Controller A
NIC A2      NIC B2   }
   ↓           ↓
NIC A3      NIC B3   } Controller B
NIC A4      NIC B4   }
         ↓
    Storage Pool
         ↓
   Disk Shelf 1 ... Shelf N`}
      </CodeBlock>
      <p style={S.p}>One switch fails → traffic automatically moves to the second switch. One NIC fails → the partner NIC takes over. One controller fails → the second controller serves all clients. A single drive fails → RAID protects the data.</p>

      <Figure caption="Fig 4 — Generic Dual-Controller Scale-Up NAS Architecture. Note: Scale-out NAS platforms such as Dell PowerScale use a different distributed multi-node architecture — not this shared-shelf design.">
        <NasHaArchitecture />
      </Figure>

      {/* ══ SECTION 11 — NAS NETWORKING ════════════════════════════════════ */}
      <h2 id="nas-networking" style={S.h2}>NAS Networking — Practical Concepts</h2>

      <h3 style={S.h3}>IP Address and Hostname</h3>
      <p style={S.p}>Every NAS data interface has an IP address. Clients connect to this IP. The hostname (such as <code>nas01</code>) resolves to the IP via DNS.</p>
      <Callout type="important" title="Hostname and Failover — Platform-Dependent">
        Enterprise NAS platforms may use virtual IPs (VIPs), logical interfaces, floating addresses, cluster namespaces or DNS aliases — depending on platform architecture. A simple hostname-to-IP mapping alone does not automatically work in failover cases. Check your NAS platform's documentation for how client connectivity is handled during failover.
      </Callout>

      <h3 style={S.h3}>Management IP vs Data IP</h3>
      <ul style={S.ul}>
        <li><strong>Management IP:</strong> For the admin GUI and CLI. On the management network. Isolated from production traffic.</li>
        <li><strong>Data IP (Logical Interface / SVM IP):</strong> Clients access files through this IP. On the storage/data network.</li>
      </ul>
      <p style={S.p}><strong>Best Practice:</strong> Keep these on separate networks. If the management network is compromised, the data network should not be affected.</p>

      <h3 style={S.h3}>NIC, Bonding and Link Redundancy</h3>
      <p style={S.p}><strong>Bonding / Teaming:</strong> Combining multiple physical NICs into one logical interface — for redundancy and optionally bandwidth aggregation.</p>
      <p style={S.p}><strong>LACP (IEEE 802.3ad):</strong> A common link aggregation approach — dynamically negotiates links between the switch and the NAS. LACP must also be configured on the switch side. However, depending on the NAS platform, redundancy/performance can also be achieved through failover groups, virtual/logical interfaces, SMB Multichannel, clustering or vendor-specific networking mechanisms instead of link aggregation.</p>
      <Callout type="maintenance" title="LACP Bandwidth Note">
        A single large file transfer typically goes over just one link — LACP aggregation benefits multiple concurrent connections. Actual bandwidth improvement depends on the traffic pattern and switch implementation.
      </Callout>

      <h3 style={S.h3}>SMB Multichannel</h3>
      <p style={S.p}>An SMB 3.x feature — <strong>a separate concept from LACP.</strong> When both client and NAS support it, SMB Multichannel can use multiple network connections simultaneously for one session — better throughput and resilience.</p>
      <p style={S.p}>Windows clients can automatically negotiate modern SMB Multichannel if multiple NICs are available. Actual support and behavior depend on the NAS platform and OS configuration — verify with vendor documentation.</p>

      <h3 style={S.h3}>VLAN</h3>
      <p style={S.p}>NAS storage traffic typically sits on a dedicated VLAN — separated from server management, application, and user workstation traffic. <strong>Client and NAS must be on the same VLAN or a routed path — wrong VLAN = connectivity failure.</strong></p>

      <h3 style={S.h3}>Jumbo Frames (MTU)</h3>
      <p style={S.p}>Standard Ethernet MTU = 1500 bytes. Jumbo Frames are typically in the ~9000-byte MTU range (exact value is vendor/device dependent — not universally 9000).</p>
      <Callout type="warning" title="Jumbo Frames — End-to-End Consistency Mandatory">
        An MTU mismatch can cause fragmentation (where permitted), packet drops, or Path-MTU-related connectivity and performance problems. The NAS interface, switch ports and client NICs must all be configured with the same MTU. Many enterprise environments run perfectly well on the standard 1500 MTU.
      </Callout>

      <h3 style={S.h3}>DNS and Reverse DNS</h3>
      <p style={S.p}><strong>DNS:</strong> The NAS hostname A record must be registered in DNS. Clients should use the same DNS server.</p>
      <p style={S.p}><strong>Reverse DNS (PTR record):</strong> Not a universal NFS requirement. PTR records may be needed in specific Kerberos configurations, security policies, logging or vendor-specific implementations — generally not required for generic NFS access.</p>

      <h3 style={S.h3}>NTP</h3>
      <p style={S.p}><strong>NTP mandatory for AD/Kerberos environments:</strong> In Microsoft AD the default maximum clock skew is approximately five minutes (it can be changed by policy). If the NAS time differs from AD by more than that — Kerberos authentication can fail. Simple fix: configure NTP on day one.</p>

      {/* ══ SECTION 12 — NAS PROTOCOLS ═════════════════════════════════════ */}
      <h2 id="nas-protocols" style={S.h2}>NAS Protocols — SMB and NFS</h2>

      <h3 style={S.h3}>SMB — Server Message Block</h3>
      <p style={S.p}><strong>What it is:</strong> The Windows file sharing protocol. When a Windows machine accesses a network drive — it is mostly using SMB. <strong>Port:</strong> TCP 445.</p>
      <ComparisonTable
        title="SMB Versions"
        headers={["Version", "When", "Notes"]}
        rows={[
          ["SMB 1.0 / CIFS era", "Legacy",             "Serious security vulnerabilities. Disable in modern production."],
          ["SMB 2.0",            "Windows Vista/2008", "Significant improvements, fewer round-trips"],
          ["SMB 2.1",            "Windows 7/2008 R2",  "Minor improvements"],
          ["SMB 3.0",            "Windows 8/2012",     "Encryption, Multichannel"],
          ["SMB 3.1.1",          "Windows 10/2016+",   "Latest dialect — negotiated between client and server"],
        ]}
        caption="SMB dialect automatically negotiated between client and server — highest mutually supported version used. Disable SMB 1.0 everywhere in modern production."
      />
      <p style={S.p}><strong>CIFS terminology:</strong> CIFS (Common Internet File System) generally refers to the SMB 1.0-era implementation/dialect. Technically, modern SMB 2.x/3.x should not be called CIFS — the "CIFS" label appears in legacy NAS interfaces because of old terminology.</p>
      <Callout type="warning" title="SMB 1.0 — Disable in Modern Environments">
        SMB 1.0 has serious security vulnerabilities (EternalBlue, WannaCry). For unavoidable legacy dependencies: isolate, document, apply compensating controls, create a migration plan.
      </Callout>

      <h3 style={S.h3}>NFS — Network File System</h3>
      <p style={S.p}><strong>What it is:</strong> The Unix/Linux file sharing protocol. <strong>Primary port:</strong> TCP 2049.</p>
      <ComparisonTable
        title="NFS Versions"
        headers={["Version", "Common Use", "Port/Notes"]}
        rows={[
          ["NFSv3", "Still widely deployed", "TCP/UDP 2049 + rpcbind/portmapper TCP/UDP 111 + dynamic RPC ports (mountd, locking, stat). Complex firewalling."],
          ["NFSv4", "Modern standard",       "Primarily TCP 2049. Stateful, TCP only. Kerberos, DNS, identity services may need additional connectivity."],
          ["NFSv4.1","Enterprise",           "Parallel NFS (pNFS), better HA — additional vendor-specific requirements may apply."],
          ["NFSv4.2","Newer deployments",    "Server-side copy, sparse files."],
        ]}
        caption="NFSv3: TCP 2049 reachable alone does not prove complete NFSv3 functionality — portmapper + dynamic RPC ports also involved. Always verify exact requirements with NAS vendor documentation."
      />

      <h3 style={S.h3}>NFS Authorization — Two Distinct Layers</h3>
      <p style={S.p}><strong>Export authorization:</strong> Which client machine (IP address / subnet) is permitted to mount an export. This is the first gate.</p>
      <p style={S.p}><strong>File authorization:</strong> Once mounted, individual file/directory access is controlled by UID (User ID) and GID (Group ID), through POSIX permission bits and ACLs. A Linux user's UID must match the permissions of the same UID on the NAS.</p>
      <p style={S.p}><strong>NFSv4 and Kerberos:</strong> NFSv4 does not automatically use Kerberos. NFSv4 can use either AUTH_SYS (traditional UID/GID, no user authentication) or Kerberos — it depends on configuration.</p>
      <ComparisonTable
        title="NFS Kerberos Security Flavors"
        headers={["Flavor", "Provides"]}
        rows={[
          ["krb5",   "Authentication only — identity verified"],
          ["krb5i",  "Authentication + integrity — data tampering detect"],
          ["krb5p",  "Authentication + integrity + privacy (encryption of data in transit)"],
        ]}
        caption="NFSv4 + krb5p is the strongest security — consider configuration and performance overhead."
      />

      <h3 style={S.h3}>Multiprotocol SMB + NFS — Warning</h3>
      <Callout type="danger" title="Multiprotocol Access — Design Required, Not Optional">
        A NAS can expose SMB and NFS at the same time — on the same underlying storage. But accessing the same dataset through both protocols — without proper configuration — is risky. Issues: Windows SID and Unix UID/GID mismatch, ACL translation problems, security style (NTFS vs Unix), name mapping. Follow the NAS vendor documentation specifically for multiprotocol configuration. This is not a "just enable both" situation.
      </Callout>

      <Figure caption="Fig 5 — SMB vs NFS access flow. Windows: TCP 445, Kerberos/NTLM authentication. Linux: TCP 2049, export authorization + AUTH_SYS or Kerberos. Both access same NAS storage — multiprotocol requires identity mapping design.">
        <NasSmbNfsFlow />
      </Figure>

      {/* ══ SECTION 13 — SHARES AND EXPORTS ════════════════════════════════ */}
      <h2 id="nas-shares-exports" style={S.h2}>NAS Shares and Exports — Practical</h2>

      <h3 style={S.h3}>SMB Share (Windows)</h3>
      <p style={S.p}><strong>UNC Path format:</strong> <code>{"\\\\server-name\\share-name"}</code></p>
      <p style={S.p}>Examples:</p>
      <CodeBlock lang="text">
{"\\\\nas01\\engineering    — server nas01, share: engineering\n\\\\10.10.20.50\\backup   — IP-direct (hostname bypass)\n\\\\nas01\\finance        — finance department share\n\\\\nas01\\home\\[username]  — per-user home directory"}
      </CodeBlock>
      <p style={S.p}><strong>Permissions — two layers both must be correct:</strong></p>
      <ul style={S.ul}>
        <li><strong>Share-level permissions:</strong> Who can connect to the share.</li>
        <li><strong>NTFS-style permissions (folder level):</strong> Who can do what inside the share.</li>
      </ul>

      <h3 style={S.h3}>NFS Export (Linux)</h3>
      <p style={S.p}><strong>Export example on NAS (illustrative):</strong> <code>{"/vol/engineering → allowed to 10.10.20.0/24"}</code></p>
      <p style={S.p}><strong>Note:</strong> On NFSv4, actual export paths and the namespace/pseudoroot depend on NAS/vendor configuration. These examples are illustrative.</p>
      <CodeBlock label="Linux — NFS mount" lang="bash">
{`# NFSv4 mount (modern, recommended where supported)
sudo mount -t nfs4 nas01:/vol/engineering /mnt/engineering

# With version option (illustrative — verify for your environment)
sudo mount -t nfs -o vers=4.1,hard nas01:/vol/engineering /mnt/engineering`}
      </CodeBlock>
      <CodeBlock label="/etc/fstab — persistent NFS mount" lang="bash">
{`nas01:/vol/engineering  /mnt/engineering  nfs  defaults,_netdev,nofail  0  0
# _netdev: wait for network before mounting
# nofail: don't fail boot if mount fails
# Add vers=4.1 or other options as required by your environment`}
      </CodeBlock>
      <Callout type="warning" title="NFS Mount Options — Environment-Specific">
        <code>intr</code>/<code>nointr</code> are legacy options — obsolete or ignored on modern Linux NFS clients. The <code>sync</code> mount option introduces a significant performance impact — check the workload and vendor recommendations. Verify mount options against your Linux distribution and NAS vendor documentation.
      </Callout>

      {/* ══ SECTION 14 — NAS SOFTWARE / OS ═════════════════════════════════ */}
      <h2 id="nas-software-os" style={S.h2}>NAS Software / Operating System</h2>
      <p style={S.p}>An enterprise NAS is not just hardware — it runs a specialized OS.</p>

      <h3 style={S.h3}>Enterprise NAS Platforms</h3>
      <p style={S.p}><strong>NetApp ONTAP:</strong> Industry-leading NAS/unified storage OS. NFS, SMB, iSCSI, FC support. Built-in: SnapShot, SnapMirror replication, deduplication, compression, FabricPool cloud tiering. Runs on NetApp AFF/FAS hardware and ONTAP Select (software-defined).</p>
      <p style={S.p}><strong>Dell PowerScale (OneFS):</strong> The dominant scale-out NAS platform. Multiple nodes present a single namespace. OneFS is a distributed filesystem integrated into the PowerScale scale-out storage platform — it is architecturally different from per-node filesystems such as ZFS, WAFL or Btrfs. Petabyte scale is common.</p>
      <p style={S.p}><strong>TrueNAS (SCALE / CORE):</strong> Open-source NAS OS. TrueNAS CORE: FreeBSD + ZFS. TrueNAS SCALE: Linux + ZFS. Small-to-medium deployments, labs. ZFS powerful — snapshots, deduplication, checksums. iXsystems commercial support available.</p>
      <p style={S.p}><strong>Synology DSM / QNAP QTS:</strong> Widely used in SMB, departmental, backup and lab environments. Enterprise production suitability depends on the specific model, HA capability, support SLA, workload and organizational requirements.</p>
      <p style={S.p}><strong>HPE Storage Platforms:</strong> At HPE, file storage capabilities vary by product family and generation. Check HPE's official documentation for current HPE file/NAS capabilities.</p>
      <Callout type="important" title="Products Evolve — Verify With Vendor">
        NAS capabilities across vendors significantly differ in features, scale limits, performance and licensing. Always verify current capabilities with vendor documentation.
      </Callout>

      <ComparisonTable
        title="SMB/Lab NAS vs Enterprise NAS"
        headers={["", "SMB/Lab NAS", "Enterprise NAS"]}
        rows={[
          ["Scale",          "TBs to low PBs",              "PBs+"],
          ["Concurrent clients","Tens to hundreds",          "Thousands"],
          ["Controllers",    "Varies by model",             "Redundant, scale-out"],
          ["Support",        "Varies — community to commercial","24×7 enterprise SLAs"],
          ["Cost",           "Low to medium",               "High"],
          ["DC suitability", "Lab/dev/SMB/departmental",   "Large production Data Center"],
        ]}
        caption=""
      />

      {/* ══ SECTION 15 — MANAGEMENT INTERFACE ══════════════════════════════ */}
      <h2 id="nas-management" style={S.h2}>NAS Management Interface</h2>
      <p style={S.p}>A NAS is typically managed in multiple ways:</p>

      <h3 style={S.h3}>Web GUI — Primary Interface</h3>
      <p style={S.p}>Typical sections engineer sees: Dashboard, Storage (pools/volumes), Shares, NFS Exports, Network, Sessions, Protocols, Users, Quotas, Snapshots, Replication, Logs, Firmware.</p>

      <Figure caption="Fig 6 — Generic Educational NAS Management Interface (NOT an OEM screenshot). Dashboard shows: health status, capacity donut, active SMB/NFS sessions, replication status, active alerts, recent events.">
        <NasManagementUI />
      </Figure>

      <h3 style={S.h3}>CLI / SSH</h3>
      <ul style={S.ul}>
        <li><strong>NetApp ONTAP:</strong> <code>system node</code>, <code>volume</code>, <code>vserver</code> (SVM) commands</li>
        <li><strong>Dell PowerScale (OneFS):</strong> <code>isi</code> suite — <code>isi storagepool</code>, <code>isi smb shares</code>, <code>isi nfs exports</code></li>
        <li><strong>TrueNAS:</strong> Shell access, <code>midclt</code> commands</li>
        <li><strong>Synology:</strong> SSH available, standard Linux + custom commands</li>
      </ul>

      <h3 style={S.h3}>REST API</h3>
      <p style={S.p}>Modern enterprise NAS systems expose REST APIs — ONTAP REST API, OneFS REST API. Monitoring tools, ITSM systems and custom automation scripts can integrate with them.</p>

      {/* ══ SECTION 16 — QUOTAS ═════════════════════════════════════════════ */}
      <h2 id="nas-quotas" style={S.h2}>Quotas</h2>
      <p style={S.p}>Some NAS platforms support quota management:</p>
      <ul style={S.ul}>
        <li><strong>User quota:</strong> How much space an individual user can use</li>
        <li><strong>Group quota:</strong> Collective limit for an AD/LDAP group</li>
        <li><strong>Directory/tree quota:</strong> Space limit for a specific folder tree (platform-dependent)</li>
        <li><strong>Soft limit:</strong> Generates a warning — access is not blocked immediately (grace period)</li>
        <li><strong>Hard limit:</strong> Writes are blocked once the limit is exceeded</li>
      </ul>
      <Callout type="important" title="Quota ≠ Physical Pool Free Space">
        A user's quota may be 500GB but the pool may have only 100GB free — actual writes will be capped at 100GB. Both need to be watched.
      </Callout>

      {/* ══ SECTION 17 — FILE LOCKING ═══════════════════════════════════════ */}
      <h2 id="file-locking" style={S.h2}>File Locking / Open Files</h2>
      <p style={S.p}>On shared storage multiple users can access the same file simultaneously — file locking manages this situation.</p>
      <p style={S.p}><strong>SMB Leases / Opportunistic Locking (Oplocks):</strong> The SMB protocol lets clients cache file data locally — improving performance. When another client accesses the same file, the NAS breaks the lease — the first client flushes its cached data.</p>
      <p style={S.p}><strong>NFS locking:</strong> NFSv4 has integrated locking. In NFSv3, NLM (Network Lock Manager) is a separate service.</p>
      <Callout type="danger" title="Active Sessions / Open Files — Never Force-Close Without Impact Assessment">
        Never force-close active sessions or open files without an impact assessment. If a user is actively writing a file and the session is force-closed — data corruption is possible.
      </Callout>

      {/* ══ SECTION 18 — NAMESPACE ══════════════════════════════════════════ */}
      <h2 id="nas-namespace" style={S.h2}>Namespace</h2>
      <p style={S.p}>In enterprise environments users do not connect directly to the physical NAS controller hostname — they connect to a logical namespace.</p>
      <p style={S.p}><strong>Example:</strong> <code>{"\\\\files.company.local\\engineering"}</code> — this is a logical name, not the actual physical controller. The namespace can be served by DFS (Windows Distributed File System), the NAS platform cluster namespace, or a DNS alias.</p>
      <p style={S.p}><strong>Benefit:</strong> Replace or migrate the physical NAS — the client namespace does not change. Engineers migrate the backend, and clients keep using the same path.</p>

      {/* ══ SECTION 19 — CONFIG WORKFLOW ════════════════════════════════════ */}
      <h2 id="nas-config-workflow" style={S.h2}>NAS Configuration — Practical Workflow</h2>
      <p style={S.p}>High-level workflow when a new NAS is deployed. Exact steps vary by OEM and model.</p>
      <ol style={{ ...S.ul, listStyleType: "decimal" }}>
        <li><strong>Physical readiness:</strong> Rack mounting, dual PSUs → separate PDU A/B, physical cabling.</li>
        <li><strong>Initial management access:</strong> Management IP configure, Web GUI access verify.</li>
        <li><strong>Hostname, DNS, NTP:</strong> Set hostname, configure DNS servers, configure NTP (critical in AD), set timezone.</li>
        <li><strong>Network interface configuration:</strong> Data IPs, subnet, gateway. Link redundancy — bonding, LACP, failover groups as appropriate. VLANs. MTU settings.</li>
        <li><strong>Storage pool creation:</strong> Disk discovery → RAID level → pool create → initialization complete hone do.</li>
        <li><strong>Volume / Filesystem creation:</strong> Size, thin/thick provisioning, filesystem type.</li>
        <li><strong>Protocol configuration:</strong> Enable the SMB service. Enable the NFS service. If using multiprotocol, plan identity mapping.</li>
        <li><strong>Authentication integration (AD):</strong> Domain join, DNS and AD records resolvable, verify time sync.</li>
        <li><strong>Share/Export creation:</strong> SMB share — path, name, permissions. NFS export — path, allowed clients, options.</li>
        <li><strong>Permission configuration:</strong> Share-level + folder-level. Verify with a test user.</li>
        <li><strong>Client access testing:</strong> Windows: UNC path. Linux: mount. Read, write, delete — test everything.</li>
        <li><strong>Performance baseline:</strong> fio (Linux), DiskSPD (Windows), NAS built-in stats.</li>
        <li><strong>Monitoring setup:</strong> Email alerts, SNMP, capacity thresholds.</li>
        <li><strong>Snapshot schedule:</strong> Automated schedule + retention policy.</li>
        <li><strong>Backup/replication setup:</strong> Backup software + replication job (if DR is required).</li>
        <li><strong>Documentation:</strong> IPs, share paths, VLAN, RAID config, permissions matrix.</li>
        <li><strong>Production handover:</strong> Change ticket close, monitoring confirmed, stakeholders notified.</li>
      </ol>

      {/* ══ SECTION 20 — WINDOWS PRACTICAL ════════════════════════════════ */}
      <h2 id="windows-nas-practical" style={S.h2}>Windows + NAS — Practical Access</h2>

      <h3 style={S.h3}>Access via UNC Path</h3>
      <CodeBlock lang="text">
{`\\nas01\engineering         — Windows Explorer direct
\\nas01\finance             — Finance share

Map Network Drive:
  Path: \\nas01\engineering
  Option: "Reconnect at sign-in"`}
      </CodeBlock>

      <h3 style={S.h3}>PowerShell Diagnostic Commands</h3>
      <CodeBlock label="Hostname resolution" lang="powershell">
{`nslookup nas01
# Expected: NAS data IP address
# Fail: DNS issue — NAS hostname not registered or wrong DNS server`}
      </CodeBlock>
      <CodeBlock label="Ping — ICMP test (caveats apply)" lang="powershell">
{`ping nas01
# Tests: Network reachability + ICMP response
# IMPORTANT: Ping success ≠ SMB working. Ping failure ≠ NAS down.
# ICMP may be disabled on NAS. Always verify at protocol level too.`}
      </CodeBlock>
      <CodeBlock label="SMB port test — recommended" lang="powershell">
{`Test-NetConnection nas01 -Port 445
# TcpTestSucceeded: True  = Port 445 reachable, SMB listening
# TcpTestSucceeded: False = Port blocked or SMB service down`}
      </CodeBlock>
      <CodeBlock label="NFS port test" lang="powershell">
{`Test-NetConnection nas01 -Port 2049
# Tests: TCP 2049 for NFS`}
      </CodeBlock>
      <CodeBlock label="Network drives" lang="powershell">
{`net use                              # List current mapped drives + status
net use Z: \\nas01\engineering /persistent:yes   # Map Z: drive
net use Z: /delete                   # Disconnect`}
      </CodeBlock>
      <Callout type="maintenance" title="Get-SmbSession / Get-SmbShare — Local Windows Server Commands">
        <code>Get-SmbSession</code> and <code>Get-SmbShare</code> show local SMB server sessions/shares on Windows Server. Sessions/shares of a generic NAS (NetApp, PowerScale, Synology) are not queried by these — use that NAS platform's own management tool.
      </Callout>
      <Callout type="best-practice" title="Telnet vs Test-NetConnection">
        In modern Windows the Telnet client is disabled by default. <code>Test-NetConnection</code> is built into PowerShell 3.0+ — the preferred method for port testing.
      </Callout>

      {/* ══ SECTION 21 — LINUX PRACTICAL ════════════════════════════════════ */}
      <h2 id="linux-nas-practical" style={S.h2}>Linux + NAS — Practical Commands</h2>

      <h3 style={S.h3}>NFS Mount Commands</h3>
      <CodeBlock label="Manual NFS mount" lang="bash">
{`# NFSv4 (modern, recommended where supported)
sudo mount -t nfs4 nas01:/vol/engineering /mnt/engineering

# With version option (verify for your environment + distro)
sudo mount -t nfs -o vers=4.1,hard nas01:/vol/engineering /mnt/engineering

# Note: Mount paths for NFSv4 depend on NAS vendor configuration.
# These examples are illustrative — verify with your NAS documentation.`}
      </CodeBlock>
      <CodeBlock label="/etc/fstab — persistent mount" lang="bash">
{`nas01:/vol/engineering  /mnt/engineering  nfs  defaults,_netdev,nofail  0  0
# _netdev: wait for network before mounting
# nofail: don't fail boot if this mount fails`}
      </CodeBlock>

      <h3 style={S.h3}>Diagnostic Commands</h3>
      <CodeBlock label="DNS resolution" lang="bash">
{`nslookup nas01
dig nas01 A
# Expected: NAS data IP`}
      </CodeBlock>
      <CodeBlock label="NFS port check" lang="bash">
{`nc -zv nas01 2049
# Tests TCP 2049 reachability
# Note: Port reachable ≠ complete NFSv3 functionality (portmapper + dynamic ports also needed)`}
      </CodeBlock>
      <CodeBlock label="Show NFS exports (NFSv3 environments)" lang="bash">
{`showmount -e nas01
# Relies on RPC mount services — primarily useful for NFSv3-style environments
# May not enumerate or work as expected against NFSv4-only servers`}
      </CodeBlock>
      <CodeBlock label="Mounted filesystems + routing" lang="bash">
{`df -h                  # All filesystems and usage
mount | grep nas01     # Current NAS mounts
ip addr show           # Network interfaces and IPs
ip route show          # Routing table — route to NAS subnet?`}
      </CodeBlock>
      <CodeBlock label="Active NFS connections" lang="bash">
{`ss -tn | grep 2049     # Active TCP connections to NFS port`}
      </CodeBlock>
      <CodeBlock label="Unmount — identify busy processes" lang="bash">
{`sudo umount /mnt/engineering

# If "device is busy":
fuser -vm /mnt/engineering     # Efficient — identify processes using mount
# lsof +D /mnt/engineering     # Warning: recursively scans directory tree
                                # Expensive on large NAS mounts — use fuser first`}
      </CodeBlock>

      {/* ══ SECTION 22 — PING, PORT, CONNECTIVITY ══════════════════════════ */}
      <h2 id="ping-port-connectivity" style={S.h2}>Ping, Port and Connectivity — Key Concepts</h2>

      <h3 style={S.h3}>What Ping Tests</h3>
      <p style={S.p}>Ping uses ICMP — an "are you alive?" type of check.</p>
      <ul style={S.ul}>
        <li><strong>Ping success means:</strong> Network path exists + NAS network stack responds + ICMP enabled</li>
        <li><strong>Ping success does NOT mean:</strong> SMB/NFS running, authentication working, shares accessible</li>
        <li><strong>Ping failure means:</strong> NAS down or a network issue — or simply ICMP disabled on the NAS (security)</li>
      </ul>
      <Callout type="common-mistake" title="Real Incident — Ping Misleads">
        The client runs <code>ping nas01</code> — timeout. "The NAS is down!" Actually ICMP was disabled on the NAS. Ran <code>Test-NetConnection nas01 -Port 445</code> — TcpTestSucceeded: True. The NAS was perfectly fine.
      </Callout>

      <h3 style={S.h3}>Troubleshooting Layer Model</h3>
      <CodeBlock lang="text">
{`Layer 1: Can client reach NAS IP? (ping / traceroute)
    ↓ Yes →
Layer 2: Can client reach NAS protocol port? (Test-NetConnection / nc)
    ↓ Yes →
Layer 3: Can client authenticate? (test user connection)
    ↓ Yes →
Layer 4: Does the share/export exist and is it accessible?
    ↓ Yes →
Layer 5: Does the user have correct permissions?`}
      </CodeBlock>

      {/* ══ SECTION 23 — AUTH + PERMISSIONS ════════════════════════════════ */}
      <h2 id="auth-permissions" style={S.h2}>Authentication and Permissions</h2>

      <h3 style={S.h3}>Authentication — Who Are You?</h3>
      <ul style={S.ul}>
        <li><strong>Local users:</strong> Created directly on the NAS — simple environments. Generally avoided in enterprise.</li>
        <li><strong>Active Directory:</strong> Enterprise standard. The NAS joins the domain. Single sign-on.</li>
        <li><strong>LDAP:</strong> Centralized user directory in Linux/Unix environments.</li>
        <li><strong>NFS AUTH_SYS:</strong> IP-based export control + UID/GID. No cryptographic user verification.</li>
        <li><strong>NFS + Kerberos:</strong> Proper user authentication. NFSv4 does not automatically use Kerberos — configuration required.</li>
      </ul>
      <Callout type="important" title="AD Integration — Multiple Ports Required">
        Multiple ports are involved in AD integration — DNS (53), Kerberos (88), LDAP (389), LDAPS (636), NTP (123), SMB (445), Global Catalog (3268/3269), and possibly RPC/dynamic ports. Use your NAS vendor's official AD integration port matrix.
      </Callout>

      <h3 style={S.h3}>Permissions — What Can You Do?</h3>
      <p style={S.p}><strong>SMB — two layers (both must be correct):</strong></p>
      <ul style={S.ul}>
        <li><strong>Share-level:</strong> Who can connect to the share</li>
        <li><strong>Folder/NTFS-level:</strong> Who can do what inside the share</li>
      </ul>
      <p style={S.p}><strong>NFS — two layers:</strong></p>
      <ul style={S.ul}>
        <li><strong>Export rules:</strong> Client IP/subnet allowed?</li>
        <li><strong>POSIX permissions:</strong> UID/GID matching between NAS and client</li>
      </ul>

      <h3 style={S.h3}>Common Permission Problem</h3>
      <CodeBlock lang="text">
{`Symptoms:
- NAS reachable (ping OK)
- Port accessible (Test-NetConnection OK)
- Share exists, user can see it
- But: Access Denied when opening/writing files

Root causes (SMB):
1. Share permission: User not in allowed list
2. NTFS permission: User/group missing or wrong permissions
3. User not in correct AD group
4. Inherited Deny overriding Allow

Check sequence:
1. Share permissions → is user allowed?
2. Effective permissions on specific folder
3. AD group membership — user in correct group?
4. Any explicit Deny in chain?`}
      </CodeBlock>

      {/* ══ SECTION 24 — NAS SECURITY ═══════════════════════════════════════ */}
      <h2 id="nas-security" style={S.h2}>NAS Security</h2>

      <h3 style={S.h3}>Management Network Separation</h3>
      <p style={S.p}><strong>Recommended Best Practice:</strong> NAS management interface on a dedicated management VLAN — isolated from the production data network.</p>

      <h3 style={S.h3}>Authentication Security</h3>
      <ul style={S.ul}>
        <li>Disable default/factory admin credentials on day 1</li>
        <li>Strong passwords — MFA/PAM where supported</li>
        <li>Role-based access — least privilege principle</li>
        <li>Avoid shared admin accounts</li>
      </ul>

      <h3 style={S.h3}>Protocol Security</h3>
      <p style={S.p}><strong>Disable SMB 1.0:</strong> Strong recommendation — all modern environments. Legacy dependencies: isolate, document, compensating controls, migration plan.</p>
      <p style={S.p}><strong>SMB Signing:</strong> Provides message integrity and authenticity — protects against data tampering and certain man-in-the-middle attacks. Recommended.</p>
      <p style={S.p}><strong>SMB Encryption:</strong> Available in SMB 3.0+ — encrypts data in transit. It can introduce processing overhead — the actual impact depends on SMB version, CPU capabilities, hardware offload, NAS platform and workload.</p>
      <p style={S.p}><strong>NFSv4 with Kerberos:</strong> Better security than AUTH_SYS. The krb5p option encrypts data in transit.</p>

      <h3 style={S.h3}>Ransomware Considerations</h3>
      <p style={S.p}>NAS is shared storage — a single infected client can rapidly encrypt NAS files.</p>
      <ul style={S.ul}>
        <li><strong>Snapshots:</strong> Client-side ransomware normally cannot directly modify read-only snapshot contents. But if an attacker gains administrative/API access — deleting snapshots is possible. <strong>Immutable/locked snapshots</strong> (where supported) provide extra protection.</li>
        <li><strong>Independent backup:</strong> Independent backup, preferably offsite/isolated, strongly recommended per organizational policy — strongest when isolated, immutable/offline and independently protected.</li>
        <li><strong>Network segmentation:</strong> The NAS should be accessible only to the required subnets</li>
        <li><strong>Least privilege:</strong> Give users write access only to the necessary folders</li>
      </ul>

      <h3 style={S.h3}>Audit Logging</h3>
      <p style={S.p}>File access logging, failed auth attempts, admin activity logs. <strong>Warning:</strong> File-level audit logging generates very high log volume — plan for the storage and performance impact.</p>

      {/* ══ SECTION 25 — HIGH AVAILABILITY ═════════════════════════════════ */}
      <h2 id="high-availability" style={S.h2}>High Availability (HA)</h2>

      <h3 style={S.h3}>Dual Controllers</h3>
      <p style={S.p}>Enterprise NAS typically has two controllers. <strong>Active-Active:</strong> Both serve simultaneously, load is distributed. <strong>Active-Passive:</strong> Primary serves, secondary on standby, takes over on failover. Exact behavior depends on the OEM and configuration.</p>

      <h3 style={S.h3}>NAS Resiliency Design — Protection Map</h3>
      <ComparisonTable
        title="What the Overall NAS Resiliency Design Protects Against"
        headers={["Component", "Protection Type", "Protects Against"]}
        rows={[
          ["Controller HA (dual controllers)",           "Controller redundancy", "Single controller failure"],
          ["Network redundancy (bonded NICs/failover)",  "Link/NIC redundancy",  "Single NIC or cable failure"],
          ["Network/fabric redundancy (dual switches)", "Switch redundancy",     "Single switch failure"],
          ["Power redundancy (redundant PSUs)",          "Power redundancy",      "Single PSU failure"],
          ["RAID / erasure coding",                      "Disk-level protection", "Drive failure(s) — per RAID level"],
          ["Replication / DR",                           "Site/disaster protection","Site failure, major disaster"],
          ["Snapshots + Backup",                         "Data protection",       "Accidental deletion, corruption"],
        ]}
        caption="HA protects against hardware failures. Data corruption, ransomware, site failure — these require snapshots + independent backup."
      />

      <h3 style={S.h3}>Failover Testing</h3>
      <p style={S.p}>HA/failover testing should be performed periodically according to organizational policy, change management and vendor-supported procedures. Use the vendor-supported planned takeover procedure — deliberately breaking a production controller is a risky approach. Verify: did client access remain continuous? Were alerts generated? Does failback work? Document it.</p>

      {/* ══ SECTION 26 — SNAPSHOTS ══════════════════════════════════════════ */}
      <h2 id="snapshots" style={S.h2}>Snapshots</h2>

      <h3 style={S.h3}>What Is a Snapshot</h3>
      <p style={S.p}>A snapshot is a point-in-time copy — it captures the state of the NAS at a specific moment. Implementation is filesystem/vendor dependent — platforms may use copy-on-write, redirect-on-write, metadata/pointer techniques or other mechanisms.</p>
      <p style={S.p}><strong>Space efficiency:</strong> Many modern NAS snapshot implementations are space-efficient and initially consume relatively little additional capacity — exact behavior is filesystem/platform dependent.</p>

      <h3 style={S.h3}>Snapshot vs Backup — Critical Difference</h3>
      <ComparisonTable
        title="Snapshot vs Backup"
        headers={["", "Snapshot", "Backup"]}
        rows={[
          ["Location",                         "Same NAS storage",    "Different location (tape, another NAS, cloud)"],
          ["Protection against hardware failure","No — NAS fails = snapshot gone","Yes"],
          ["Protection against ransomware",     "Limited; immutable/locked snapshots improve protection","Stronger when isolated, immutable/offline and independently protected"],
          ["Recovery speed",                    "Very fast",           "Slower"],
          ["Retention",                         "Limited (storage grows with changes)","Long-term"],
          ["Independent copy",                  "No",                  "Yes"],
        ]}
        caption="Snapshot is NOT a backup. 3-2-1 principle (3 copies, 2 different media, 1 offsite) is a recommended data-protection strategy."
      />
      <Callout type="danger" title="Snapshot ≠ Backup">
        A snapshot sits on the same hardware. If the NAS storage fails — the snapshot is gone too. Independent backup, preferably with an offsite/isolated copy, is strongly recommended according to organizational backup and DR policy.
      </Callout>

      <h3 style={S.h3}>Snapshot Retention Planning</h3>
      <p style={S.p}>Example schedule: Hourly (last 24h), Daily (last 7 days), Weekly (last 4 weeks), Monthly (last 6–12 months). Delete old snapshots automatically — "retain forever" can exhaust space.</p>

      {/* ══ SECTION 27 — BACKUP & REPLICATION ══════════════════════════════ */}
      <h2 id="backup-replication" style={S.h2}>Backup and Replication</h2>

      <h3 style={S.h3}>NAS Backup Approaches</h3>
      <ul style={S.ul}>
        <li><strong>Agent-based backup:</strong> Backup software (Veeam, Commvault, NetBackup) backs up files via an agent.</li>
        <li><strong>NDMP (Network Data Management Protocol):</strong> Long-established protocol — supported by many enterprise NAS platforms and backup software. The NAS communicates directly with the backup device; data is not routed through a server. Modern NAS backup architectures may also use native snapshots, vendor APIs, replication, file-based backup or object-storage integration — NDMP is one option.</li>
        <li><strong>Snapshot-based backup:</strong> Create snapshots, then export the snapshot data to the backup system.</li>
      </ul>

      <h3 style={S.h3}>NAS-to-NAS Replication</h3>
      <p style={S.p}>Primary NAS → Secondary NAS (DR site). Examples: NetApp SnapMirror, OneFS SyncIQ, TrueNAS ZFS Replication.</p>
      <p style={S.p}><strong>RPO:</strong> Determined by replication frequency. <strong>RTO:</strong> Determined by the failover process.</p>

      {/* ══ SECTION 28 — CAPACITY MANAGEMENT ═══════════════════════════════ */}
      <h2 id="capacity-management" style={S.h2}>Capacity Management</h2>

      <h3 style={S.h3}>Capacity Calculations</h3>
      <p style={S.p}><strong>Conceptual example:</strong> 24 × 4TB = 96TB raw. RAID 6 (2 parity drives) = 22 × 4TB = 88TB after RAID. Actual usable capacity depends on RAID group/layout, distributed spare capacity, system reserve, metadata, vendor implementation and TB vs TiB reporting.</p>
      <p style={S.p}><strong>Snapshot consumption:</strong> As data changes, snapshots consume space from the same pool. <strong>Thin provisioning:</strong> Over-provisioning risk — total allocated &gt; physical available.</p>

      <h3 style={S.h3}>Why Low Free Space is Dangerous</h3>
      <ul style={S.ul}>
        <li>Write operations fail — applications get I/O errors</li>
        <li>NAS performance can degrade — thresholds and behavior are platform/filesystem dependent</li>
        <li>Snapshots will not be able to capture new changes</li>
        <li>NAS OS operations can be affected</li>
      </ul>
      <Callout type="warning" title="Capacity Thresholds — Per Vendor Recommendations and Policy">
        Example operational thresholds: ~80% → Warning, ~90% → Critical. Set actual thresholds based on vendor recommendations, snapshot reserve requirements, workload behavior and organizational policy.
      </Callout>

      {/* ══ SECTION 29 — PERFORMANCE ════════════════════════════════════════ */}
      <h2 id="performance" style={S.h2}>Performance</h2>

      <h3 style={S.h3}>Key Metrics</h3>
      <ul style={S.ul}>
        <li><strong>IOPS:</strong> Input/Output Operations Per Second — small random reads/writes, database workloads</li>
        <li><strong>Throughput (MB/s):</strong> Large sequential reads/writes, media streaming</li>
        <li><strong>Latency (ms):</strong> Operation completion time — lower is better</li>
        <li><strong>Metadata latency:</strong> File creates, deletes, directory listings — critical for small file workloads</li>
      </ul>

      <h3 style={S.h3}>Performance Bottleneck Identification</h3>
      <CodeBlock lang="text">
{`Is client CPU/memory maxed? → Client bottleneck
       ↓ No
Is network saturated? (check NAS NIC + switch stats) → Network bottleneck
       ↓ No
Is NAS controller CPU/memory high? → Controller bottleneck
       ↓ No
Is disk/storage pool latency high? → Disk bottleneck
       ↓ No
Background jobs? (backup, replication, rebuild) → Background job impact`}
      </CodeBlock>
      <p style={S.p}><strong>Common causes:</strong> Network congestion/NIC errors, controller overloaded, RAID rebuild in progress, cache thrashing, backup/replication running concurrently, small file/metadata workloads, client-side issues.</p>

      <h3 style={S.h3}>Small Files vs Large Files</h3>
      <p style={S.p}>Small files: High metadata operations — NAS controller CPU intensive. Large files: Sequential throughput dominant. Profile workload before sizing NAS.</p>

      {/* ══ SECTION 30 — MONITORING ═════════════════════════════════════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring — What Engineers Watch</h2>

      <h3 style={S.h3}>Daily Monitoring Checklist</h3>
      <ComparisonTable
        title=""
        headers={["Check", "What to Look For"]}
        rows={[
          ["System health",                "Green/OK on all components"],
          ["Critical alerts",             "Zero critical alerts"],
          ["Failed disks",                "Any drive faults?"],
          ["Storage pool health",         "RAID optimal/degraded?"],
          ["Capacity",                    "Under organizational warning threshold"],
          ["Controller state",            "Both controllers active/healthy"],
          ["Network interface errors",    "Zero or at established baseline"],
          ["SMB/NFS active sessions",     "Counts normal? Unexpected drops?"],
          ["Authentication failures",     "Any unusual patterns in last 24h?"],
          ["Replication status",          "All jobs succeeded, lag within RPO"],
          ["Backup status",               "Last backup completed successfully"],
        ]}
        caption=""
      />

      <h3 style={S.h3}>What Each Metric Tells You</h3>
      <ul style={S.ul}>
        <li><strong>Cache hit ratio:</strong> High = data served from cache (fast). Dropping = workload changed or capacity issue.</li>
        <li><strong>Disk latency:</strong> Rising = drives aging, RAID rebuild, or pool full</li>
        <li><strong>NIC utilization:</strong> Near 100% sustained = network bottleneck</li>
        <li><strong>Protocol errors:</strong> SMB/NFS service issues, network problems</li>
        <li><strong>Replication lag:</strong> Backup data freshness — rising lag = RPO at risk</li>
        <li><strong>Snapshot space:</strong> Growing unexpectedly = high change rate or too many snapshots</li>
      </ul>

      <h3 style={S.h3}>Monitoring Tools</h3>
      <ul style={S.ul}>
        <li><strong>OEM Dashboard (Web GUI):</strong> Primary — visual, check this daily</li>
        <li><strong>SNMP:</strong> Enterprise monitoring platforms (Prometheus, Nagios, Zabbix, SolarWinds) poll SNMP OIDs</li>
        <li><strong>Syslog:</strong> NAS events and alerts into centralized log management</li>
        <li><strong>Email Alerts:</strong> Configure day one — direct notification on critical events</li>
        <li><strong>REST API:</strong> Advanced — automation, custom monitoring integration</li>
      </ul>

      {/* ══ SECTION 31 — SWITCH-SIDE TROUBLESHOOTING ═══════════════════════ */}
      <h2 id="switch-troubleshooting" style={S.h2}>Network Troubleshooting — Switch Side</h2>
      <p style={S.p}>NAS troubleshooting often requires checking both NAS-side and switch-side statistics. The NAS side may look clean while the problem is on the switch.</p>
      <ComparisonTable
        title="Switch-Side Checklist"
        headers={["Check", "What to Verify"]}
        rows={[
          ["Switch port link state",   "Port up? Speed/duplex correct (no auto-negotiation mismatch)?"],
          ["VLAN membership",          "Is the NAS port in the correct VLAN?"],
          ["LACP state",               "LACP negotiated properly? Both sides active?"],
          ["CRC / interface errors",   "Physical layer errors — bad cable, SFP?"],
          ["Packet drops",             "Input/output drops — congestion?"],
          ["SFP/transceiver health",  "DOM/diagnostics check — optical power levels?"],
          ["MAC learning",             "NAS MAC address learned on correct port?"],
          ["MTU consistency",          "Switch port MTU matches NAS and clients?"],
        ]}
        caption="Common switch-side causes: wrong VLAN on port, LACP misconfiguration, CRC errors (bad cable/SFP), MTU mismatch with jumbo frames."
      />

      {/* ══ SECTION 32 — COMMON FAILURES ════════════════════════════════════ */}
      <h2 id="common-failures" style={S.h2}>Common NAS Failures — Field Guide</h2>

      <h3 style={S.h3}>Failure 1 — Drive Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Drive fault alert in the NAS dashboard, RAID degraded, possible performance decrease during rebuild.</p>
      <p style={S.p}><strong>Action:</strong> Confirm the drive bay (GUI → Storage). Verify the LED. Confirm the correct replacement — same model/capacity/speed. Change management approval. Hot-swap per OEM procedure. Monitor rebuild progress and remaining redundancy. Escalate if rebuild behavior is abnormal. RAID optimal → document.</p>
      <Callout type="danger" title="During Drive Replacement">
        Do not remove the wrong drive — confirm the bay number twice. Do not remove a second drive during rebuild. Do not ignore the degraded state — a second failure = data loss.
      </Callout>

      <h3 style={S.h3}>Failure 2 — NIC Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> Throughput reduced, possible client disconnections, NAS interface down alert.</p>
      <p style={S.p}><strong>Action:</strong> Which interface failed (GUI → Network). Bonding/failover functioning on remaining interface? Physical check: cable, switch port, SFP. Cable swap first. Replace NIC if hardware failure (OEM procedure).</p>

      <h3 style={S.h3}>Failure 3 — PSU Failure</h3>
      <p style={S.p}><strong>Symptoms:</strong> NAS PSU alert, amber/red LED. NAS continues running (redundant PSU).</p>
      <p style={S.p}><strong>Action:</strong> Which PSU (GUI → Hardware). Confirm other PSU active. Hot-swap replacement per OEM. Ensure replacement PSU connected to correct PDU (A/B).</p>

      <h3 style={S.h3}>Failure 4 — SMB Service Unavailable</h3>
      <p style={S.p}><strong>Symptoms:</strong> UNC path access fails. Port 445 test fails. Management GUI accessible.</p>
      <p style={S.p}><strong>Action:</strong> NAS GUI → Protocols → SMB status. Recent changes? Firmware update? Restart the SMB service if supported. OEM support if the service won't start.</p>

      <h3 style={S.h3}>Failure 5 — NFS Mount Failure</h3>
      <CodeBlock label="NFS failure diagnostics" lang="bash">
{`showmount -e nas01        # NFSv3 environments — export visible?
nc -zv nas01 2049         # Port 2049 reachable?
# NFS service status: NAS GUI → Protocols → NFS
# Export list: client IP in allowed list?`}
      </CodeBlock>

      <h3 style={S.h3}>Failure 6 — Capacity Critical</h3>
      <p style={S.p}><strong>Immediate actions:</strong> (1) Identify largest consumers (NAS GUI capacity reports). (2) Delete unnecessary data — with data owner confirmation. (3) Move completed project files to archive/cold storage. (4) Reduce snapshot retention temporarily. (5) Emergency procurement initiated. (6) Application teams notify — potential write failures.</p>

      <h3 style={S.h3}>Failure 7 — High Latency / Slow Access</h3>
      <p style={S.p}><strong>Investigation:</strong> Background jobs running (rebuild, backup, replication)? Controller CPU/memory? Cache hit ratio? Network errors? Disk latency? Metadata workload heavy? Client-side changes?</p>
      <Callout type="important" title="RAID Rebuild — Action, Not Just Wait">
        Rebuild in progress: Confirm degraded/rebuild status, remaining redundancy, rebuild ETA, any errors. Check vendor-supported rebuild priority/QoS controls. Communicate impact to stakeholders. Avoid risky additional maintenance. Escalate if rebuild behavior is abnormal.
      </Callout>

      <h3 style={S.h3}>Failure 8 — Authentication Failure (Access Denied)</h3>
      <p style={S.p}><strong>Investigation:</strong> AD connectivity from NAS (DNS + AD ports)? NAS time synced with AD (Kerberos clock skew ~5 min default)? Share permissions? Folder permissions? Account locked/disabled in AD?</p>

      {/* ══ SECTION 33 — TROUBLESHOOTING MATRIX ════════════════════════════ */}
      <h2 id="troubleshooting-matrix" style={S.h2}>Troubleshooting Matrix</h2>
      <ComparisonTable
        title=""
        headers={["Symptom", "Likely Cause", "First Check", "Tool", "Next Action"]}
        rows={[
          ["Hostname not resolving",   "DNS issue",               "DNS A record",             "nslookup nas01",                 "Fix NAS A record, check client DNS"],
          ["Ping fails",              "Network / ICMP disabled", "Network path, VLAN",        "traceroute nas01",               "Test port — don't assume NAS down"],
          ["Port 445 fails",          "SMB down / firewall",     "SMB service on NAS",        "Test-NetConnection nas01 -Port 445","NAS GUI → SMB, check firewall"],
          ["Port 2049 fails",         "NFS down / firewall",     "NFS service on NAS",        "nc -zv nas01 2049",              "NAS GUI → NFS, check VLAN"],
          ["Share not accessible",    "Removed / permissions",   "Share existence on NAS",    "Try from different client",      "NAS GUI → Shares, verify permissions"],
          ["NFS mount fails",         "Export/IP/portmapper",    "Export list",               "showmount -e nas01 (NFSv3)",     "Check NFS exports, client IP allowed"],
          ["Access Denied",           "Permissions",             "Share + folder permissions","Effective permissions check",    "Verify AD groups, NTFS ACL"],
          ["Slow file transfer",      "Network/disk/bg jobs",    "NAS performance stats",     "NAS dashboard, iostat (client)", "Layer-by-layer bottleneck ID"],
          ["Pool degraded",           "Drive failure",           "Which drive",               "NAS GUI → Storage → Drives",    "Replace per OEM procedure"],
          ["Capacity critical",       "Data growth",             "Space consumers",           "NAS GUI → Capacity reports",    "Cleanup + procurement"],
          ["High latency",            "Multiple causes",         "Background jobs, CPU stats","NAS performance dashboard",     "Identify bottleneck layer"],
          ["Auth fails",              "AD/time/ports",           "NAS time, AD reachability","w32tm /query /status (Win)",    "Sync NAS NTP, verify AD ports"],
        ]}
        caption=""
      />

      {/* ══ SECTION 34 — TROUBLESHOOTING FLOWCHART ═════════════════════════ */}
      <Figure caption="Fig 7 — NAS inaccessible: systematic troubleshooting flowchart. Note: management GUI inaccessible has multiple causes beyond hardware failure — check management VLAN, routing, firewall, management service and controller separately.">
        <NasTroubleshootFlow />
      </Figure>

      {/* ══ SECTION 35 — PRODUCTION INCIDENTS ══════════════════════════════ */}
      <h2 id="production-incidents" style={S.h2}>Real Production Incident Scenarios</h2>

      <h3 style={S.h3}>Scenario 1 — NAS Responds to Ping but Files Inaccessible</h3>
      <p style={S.p}><strong>Symptoms:</strong> <code>\\nas01\engineering</code> inaccessible. Ping works. Initial conclusion: "issue on user side."</p>
      <CodeBlock label="Protocol-level test" lang="powershell">
{`Test-NetConnection nas01 -Port 445
# Result: TcpTestSucceeded: False`}
      </CodeBlock>
      <p style={S.p}><strong>Investigation:</strong> Port 445 fail. NAS management GUI: SMB service stopped. Event log: firmware update 30 minutes ago — SMB service start failure post-update.</p>
      <p style={S.p}><strong>Resolution:</strong> SMB service restart from NAS GUI. Configuration parameter re-applied per new firmware documentation. <strong>Lesson:</strong> Ping misleads. Always test at protocol level.</p>

      <h3 style={S.h3}>Scenario 2 — SMB Works from Some Servers, Not Others</h3>
      <p style={S.p}><strong>Symptoms:</strong> Dev servers access share. Production servers cannot. Same credentials.</p>
      <p style={S.p}><strong>Root Cause:</strong> Production servers were recently moved to a new VLAN. Firewall blocking production VLAN → NAS port 445. <strong>Resolution:</strong> Firewall rule update. <strong>Lesson:</strong> "Same credentials" is irrelevant if the network is blocked — check the network layer first.</p>

      <h3 style={S.h3}>Scenario 3 — NFS Mount Suddenly Fails</h3>
      <p style={S.p}><strong>Symptoms:</strong> 3 AM: Linux app servers NFS mount missing. Applications in error state.</p>
      <CodeBlock label="Investigation" lang="bash">
{`showmount -e nas01
# Export /vol/appdata not listed`}
      </CodeBlock>
      <p style={S.p}><strong>Root Cause:</strong> A junior admin deleted an export during a "cleanup" — 12 servers were actually using it. <strong>Resolution:</strong> Export re-created, remounted, services restarted. <strong>Prevention:</strong> Put NFS export deletion under change management.</p>

      <h3 style={S.h3}>Scenario 4 — File Transfer Extremely Slow</h3>
      <p style={S.p}><strong>Symptoms:</strong> The engineering team is taking hours to copy large files.</p>
      <p style={S.p}><strong>Investigation:</strong> NAS dashboard: storage pool rebuilding. Controller CPU 90%+ (rebuild + user workload combined).</p>
      <p style={S.p}><strong>Action:</strong> Confirm rebuild progress, ETA, remaining redundancy. Check vendor-supported rebuild priority controls. Communicate temporary degradation to users. Do not attempt additional risky maintenance during rebuild. <strong>Prevention:</strong> Configure a hot spare. Rebuild priority tuning.</p>

      <h3 style={S.h3}>Scenario 5 — NAS at Critical Capacity</h3>
      <p style={S.p}><strong>Symptoms:</strong> 94% capacity. Previous 80% alert acknowledged but no action taken.</p>
      <p style={S.p}><strong>Investigation:</strong> Video production share — 40TB in 3 weeks (new project). Snapshots also consuming significant space.</p>
      <p style={S.p}><strong>Immediate actions:</strong> Inform the video team. Archive completed project files. Reduce snapshot retention. Emergency procurement. <strong>Prevention:</strong> Action at the warning threshold is mandatory — not just acknowledgment.</p>

      {/* ══ SECTION 36 — BEGINNER MISTAKES ═════════════════════════════════ */}
      <h2 id="beginner-mistakes" style={S.h2}>Common Beginner / Field Mistakes</h2>
      <ul style={S.ul}>
        <li><strong>"Ping success means NAS is working"</strong> — Wrong. Ping tests ICMP. SMB/NFS is separate. Always test at protocol level.</li>
        <li><strong>Confusing DAS, NAS and SAN</strong> — DAS: direct attachment, typically one host. NAS: network, file-level, multiple clients. SAN: dedicated network, block-level. Different use cases.</li>
        <li><strong>Testing wrong IP</strong> — Management IP and data IP are different. Test share access using the data IP.</li>
        <li><strong>Wrong VLAN</strong> — Client and NAS must be on the same VLAN or a routed path.</li>
        <li><strong>Wrong DNS or no DNS</strong> — The UNC path depends on DNS. Tested with the IP — said "works". Fails with the production hostname.</li>
        <li><strong>Wrong share path</strong> — The share name must match exactly. Typo = access denied.</li>
        <li><strong>Permissions checked at share level only</strong> — Check both share + folder/NTFS levels.</li>
        <li><strong>Ignoring capacity alerts</strong> — Start capacity planning immediately at the warning threshold.</li>
        <li><strong>Removing a disk without confirming correct bay</strong> — Confirm via iDRAC/GUI and verify the LED before pulling.</li>
        <li><strong>Treating snapshot as backup</strong> — A snapshot is on the same hardware. A separate independent backup is required.</li>
        <li><strong>Making network changes without redundancy check</strong> — NIC config change: verify first that the current link is redundant.</li>
        <li><strong>Force-closing active sessions without impact assessment</strong> — Active writes force-close = data corruption risk.</li>
      </ul>

      {/* ══ SECTION 37 — BEST PRACTICES ═════════════════════════════════════ */}
      <h2 id="best-practices" style={S.h2}>Best Practices</h2>
      <ComparisonTable
        title=""
        headers={["Practice", "Classification"]}
        rows={[
          ["Management network separation (dedicated VLAN)",              "Recommended Best Practice"],
          ["Disable SMB 1.0 in modern environments",                      "Strong Recommendation — legacy deps: isolate + compensating controls"],
          ["Enable email alerts on day 1",                                "Recommended Best Practice"],
          ["Redundant NICs + link redundancy",                            "Recommended Best Practice"],
          ["Dual switches for production NAS",                            "Recommended Best Practice"],
          ["Dual controllers for production",                             "Recommended Best Practice"],
          ["Regular snapshot schedule",                                   "Recommended Best Practice"],
          ["Independent backup (offsite/isolated copy)",                  "Strongly Recommended per org backup/DR policy"],
          ["Capacity threshold alerts at ~80%/90%",                       "Recommended Best Practice — per vendor + org policy"],
          ["Document everything (IPs, paths, VLANs, permissions)",        "Recommended Best Practice"],
          ["Firmware updates via change management only",                  "Mandatory — no unplanned production updates"],
          ["HA/failover testing periodically",                            "Recommended per org policy + change management"],
          ["NTP configuration in AD/Kerberos environments",               "Mandatory"],
          ["Principle of least privilege",                                "Recommended Best Practice"],
          ["NFSv4 over NFSv3 where environment supports",                 "Recommended Best Practice"],
          ["Multiprotocol access: plan identity mapping before enabling", "Mandatory consideration"],
        ]}
        caption=""
      />

      {/* ══ SECTION 38 — DAS vs NAS vs SAN COMPARISON ══════════════════════ */}
      <h2 id="das-nas-san-comparison" style={S.h2}>DAS vs NAS vs SAN — Complete Comparison</h2>
      <ComparisonTable
        title=""
        headers={["Parameter", "DAS", "NAS", "SAN"]}
        rows={[
          ["Connection",              "Direct cable to host",                  "Ethernet network",              "Dedicated FC/iSCSI network"],
          ["Access type",             "Local block (OS manages filesystem)",    "File-level (NAS manages filesystem)", "Block-level (server OS/app manages)"],
          ["Multi-host sharing",      "Typically no (specialized designs: limited)","Yes — multiple concurrent clients","Yes — multiple servers"],
          ["Protocol",                "SAS, SATA, NVMe",                       "SMB, NFS",                     "Fibre Channel, iSCSI"],
          ["Network dependency",      "None",                                  "Yes — Ethernet",               "Yes — dedicated storage network"],
          ["Client sees",             "Raw disk blocks",                       "Files and folders",            "Raw disk / LUN"],
          ["Complexity",              "Simplest",                              "Medium",                       "Highest"],
          ["Cost",                    "Lowest",                                "Medium",                       "Highest"],
          ["Latency",                 "Lowest",                                "Medium (network adds latency)", "Low (dedicated network)"],
          ["Scalability",             "Limited (chassis)",                     "Good (scale-out NAS)",         "High"],
          ["Typical DC use",          "Local server storage, HCI",             "Shared files, home dirs, backup","Databases, VMware, mission-critical"],
          ["Management",              "Per-server",                            "Centralized NAS OS",           "SAN management suite"],
        ]}
        caption="SAN — dedicated chapter coming soon. Block storage can be provided via DAS topology (local) or SAN (network)."
      />

      {/* ══ SECTION 39 — LOGS AND EVENTS ════════════════════════════════════ */}
      <h2 id="logs-events" style={S.h2}>Logs and Events — What to Collect</h2>
      <p style={S.p}><strong>Collect for an OEM support case:</strong></p>
      <ul style={S.ul}>
        <li><strong>System information:</strong> NAS model, serial number, OS/firmware version, controller status</li>
        <li><strong>Problem details:</strong> Error messages (screenshots), timestamps, affected users/shares/clients, recent changes</li>
        <li><strong>Logs:</strong> System event log (NAS GUI → Events), support bundle/diagnostic package (NAS GUI or CLI), syslog if configured, client-side logs (Windows Event Viewer, <code>/var/log/messages</code>)</li>
        <li><strong>NAS diagnostics:</strong> Storage pool status, drive health, network stats, performance graphs near problem time</li>
        <li><strong>Impact:</strong> How many affected, business impact, troubleshooting already performed</li>
      </ul>

      {/* ══ SECTION 40 — OPERATIONS CHECKLIST ══════════════════════════════ */}
      <h2 id="operations-checklist" style={S.h2}>Daily / Weekly / Monthly / Quarterly Operations</h2>

      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>System health: All components green?</li>
        <li>Critical alerts: Zero?</li>
        <li>Failed/degraded drives: None?</li>
        <li>RAID pool status: Optimal?</li>
        <li>Capacity: Under organizational warning threshold?</li>
        <li>Network interface errors: Zero or at baseline?</li>
        <li>SMB/NFS active sessions: Normal counts?</li>
        <li>Authentication failures: Any unusual patterns?</li>
        <li>Replication jobs: All succeeded, within RPO?</li>
        <li>Backup last run: Completed?</li>
      </ul>

      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Drive health trends — any S.M.A.R.T. warnings?</li>
        <li>Capacity growth rate — when will warning threshold be reached?</li>
        <li>Event log review — any unresolved warnings?</li>
        <li>Snapshot health — all scheduled snapshots completing? Space consumption?</li>
        <li>Network stats trend — any increasing errors?</li>
        <li>Performance stats review — any degradation vs baseline?</li>
      </ul>

      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>Firmware advisory review — security patches released?</li>
        <li>Full capacity review and growth projection</li>
        <li>Backup restore spot test — verify backup is actually restorable</li>
        <li>Documentation update — changes made this month?</li>
        <li>Open alerts/events review — anything unresolved?</li>
      </ul>

      <h3 style={S.h3}>Quarterly</h3>
      <ul style={S.ul}>
        <li>HA/failover test per organizational policy, change management, vendor-supported procedure</li>
        <li>Capacity procurement review</li>
        <li>Security review — SMB version, inactive accounts, audit logs</li>
        <li>OEM support contract check</li>
        <li>Participate in organizational DR exercises — validate NAS replication, recovery and client/application access per DR plan</li>
      </ul>

      {/* ══ SECTION 41 — PREVENTIVE MAINTENANCE ════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <h3 style={S.h3}>Physical Inspection (Site Visits)</h3>
      <ul style={S.ul}>
        <li>Drive bay LEDs — any amber/orange/red?</li>
        <li>PSU LEDs — both green?</li>
        <li>Fan noise — abnormal?</li>
        <li>Cable condition — no damage, properly seated</li>
        <li>SFP/cable connections firmly connected</li>
        <li>Airflow clearance — front/rear</li>
      </ul>
      <Callout type="warning" title="Physical Inspection — No Unplanned Changes">
        Do not make configuration changes during physical inspection without change management approval.
      </Callout>

      <h3 style={S.h3}>Configuration Review (Planned Window)</h3>
      <ul style={S.ul}>
        <li>Snapshot schedules running?</li>
        <li>Replication jobs healthy?</li>
        <li>Alert email delivery — send a test</li>
        <li>Firmware advisory check</li>
      </ul>

      <h3 style={S.h3}>Never Do Without Change Management</h3>
      <ul style={S.ul}>
        <li>Restart production services</li>
        <li>Remove drives</li>
        <li>Change network configuration</li>
        <li>Apply firmware updates</li>
        <li>Modify shares/exports/permissions</li>
      </ul>

      {/* ══ SECTION 42 — NAS MIGRATION ══════════════════════════════════════ */}
      <h2 id="nas-migration" style={S.h2}>NAS Migration</h2>
      <p style={S.p}>When replacing a NAS, a basic file copy is often insufficient. Plan and validate:</p>
      <ul style={S.ul}>
        <li><strong>ACLs and ownership</strong> — NTFS ACLs, POSIX permissions, extended ACLs</li>
        <li><strong>Timestamps</strong> — creation, modification, access times</li>
        <li><strong>Extended attributes</strong> — xattrs on Linux, resource forks on some platforms</li>
        <li><strong>Alternate data streams</strong> — Windows/NTFS environments</li>
        <li><strong>SMB share definitions</strong> — share names, paths, permissions</li>
        <li><strong>NFS export rules</strong> — client access, mount options</li>
        <li><strong>Quotas</strong> — per-user/group/directory quotas</li>
        <li><strong>Identity mapping</strong> — UID/GID, SID mapping configuration</li>
        <li><strong>DNS / namespace cutover</strong> — DFS, virtual IPs, DNS aliases</li>
        <li><strong>Application freeze / delta sync</strong> — quiesce applications for final delta</li>
        <li><strong>Data integrity validation</strong> — checksums/verification where appropriate</li>
      </ul>
      <Callout type="warning" title="robocopy / rsync — Not a Complete NAS Migration Tool">
        robocopy and rsync are useful, but they do not automatically preserve every NAS metadata element, ACL or protocol-specific configuration. Verify exactly what will be preserved and what will have to be migrated manually. Enterprise NAS migrations typically require vendor-specific migration procedures.
      </Callout>

      {/* ══ SECTION 43 — NAS vs WINDOWS FILE SERVER ════════════════════════ */}
      <h2 id="nas-vs-windows-fs" style={S.h2}>NAS vs Windows File Server</h2>
      <p style={S.p}><strong>Windows File Server:</strong> Hosting an SMB share on a general-purpose OS (Windows Server). Tight integration with the Microsoft ecosystem, flexible.</p>
      <p style={S.p}><strong>NAS:</strong> Purpose-built storage platform — storage management, hardware redundancy, snapshots, replication and file protocols are integrated into one specialized appliance.</p>
      <p style={S.p}>Both are valid solutions — the choice depends on scale, budget, existing infrastructure, required features and operational model.</p>

      {/* ══ SECTION 44 — INTERVIEW QUESTIONS ═══════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q1: What is NAS and how is it different from DAS?</h3>
      <p style={S.p}><strong>Answer:</strong> NAS is a dedicated file storage appliance that is connected to the Ethernet network and provides file-level storage to multiple clients simultaneously. DAS is attached directly to a single host by cable — it typically does not provide general-purpose network file sharing. The main advantage of NAS: shared multi-client access. The main advantage of DAS: lowest latency, simplest architecture. In production both are used for different use cases.</p>

      <h3 style={S.h3}>Q2: What is the difference between SMB and NFS?</h3>
      <p style={S.p}><strong>Answer:</strong> SMB (Server Message Block) — Windows file sharing protocol, TCP port 445. NFS (Network File System) — Linux/Unix standard, primarily TCP port 2049. SMB uses user-based authentication (AD/Kerberos/NTLM). NFS traditionally uses IP-based export control + UID/GID. NFSv4 with Kerberos adds proper user auth. The same NAS can support both simultaneously — multiprotocol datasets require an identity mapping design.</p>

      <h3 style={S.h3}>Q3: What is Port 445?</h3>
      <p style={S.p}><strong>Answer:</strong> The primary TCP port of the SMB (Server Message Block) protocol. Windows file sharing runs on this port. <code>Test-NetConnection nas01 -Port 445</code> is used to verify that the SMB service on the NAS is accessible and the port is reachable.</p>

      <h3 style={S.h3}>Q4: Ping works but SMB does not — why?</h3>
      <p style={S.p}><strong>Answer:</strong> Ping tests ICMP. SMB uses TCP port 445. They are different protocols. ICMP can be enabled while the SMB service is stopped or the port is blocked — ping still works in that case. Always test at protocol level: <code>Test-NetConnection nas01 -Port 445</code>.</p>

      <h3 style={S.h3}>Q5: How do you troubleshoot a NAS when it is inaccessible?</h3>
      <p style={S.p}><strong>Answer:</strong> Layer-by-layer: (1) Management GUI accessible? Consider: management VLAN, routing, firewall, service, controller, physical. (2) DNS — hostname resolving? (3) Network path — VLAN/routing correct? (4) Protocol port open? (445 / 2049) (5) Share/export exists? (6) Authentication successful? (7) Permissions correct? Verify each layer before assuming hardware failure.</p>

      <h3 style={S.h3}>Q6: The NAS is slow — what will you check?</h3>
      <p style={S.p}><strong>Answer:</strong> Network congestion/NIC errors. NAS controller CPU/memory. Background jobs: rebuild, backup, replication. Cache hit ratio. Disk latency. Is the metadata workload heavy? Client-side issues? Identify the bottleneck layer by layer — do not assume a single factor.</p>

      <h3 style={S.h3}>Q7: What happens if NAS capacity reaches 100%?</h3>
      <p style={S.p}><strong>Answer:</strong> Write operations will fail — applications get I/O errors. Performance will degrade. Snapshots can fail. Serious production impact. Take immediate action at the organizational warning threshold — do not wait until 100%.</p>

      <h3 style={S.h3}>Q8: What is the difference between a snapshot and a backup?</h3>
      <p style={S.p}><strong>Answer:</strong> A snapshot lives on the same NAS — fast restore, space-efficient. If the NAS fails — the snapshot is gone. An independent backup lives on separate storage/location — it protects against hardware failure, ransomware and site disaster. Use both, for different purposes — a snapshot does not replace a backup.</p>

      <h3 style={S.h3}>Q9: What is the firewall difference between NFSv3 and NFSv4?</h3>
      <p style={S.p}><strong>Answer:</strong> NFSv3: portmapper/rpcbind TCP/UDP 111 + NFS data port 2049 + dynamic RPC ports for mountd/locking/stat — complex, multiple ports. NFSv4: primarily TCP 2049 for basic protocol traffic. Kerberos, DNS and identity services may require additional connectivity. Always verify with the NAS vendor documentation.</p>

      <h3 style={S.h3}>Q10: Why should SMB 1.0 be disabled?</h3>
      <p style={S.p}><strong>Answer:</strong> SMB 1.0 has serious security vulnerabilities — the EternalBlue exploit, WannaCry ransomware. Modern systems support SMB 2.x/3.x. Legacy dependencies: isolate, document, compensating controls, migration plan. Keeping SMB 1.0 enabled in production is an unacceptable security risk.</p>

      {/* ══ SECTION 45 — KEY TAKEAWAYS ══════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>NAS = Network Attached Storage</strong> — a dedicated file storage appliance on Ethernet. Multiple clients access it simultaneously.</li>
        <li><strong>File-level storage</strong> — NAS shares files and folders. The underlying NAS filesystem (ZFS, WAFL, Btrfs, vendor-specific) is not directly visible to clients.</li>
        <li><strong>SMB = Windows protocol (Port 445). NFS = Linux/Unix (Port 2049 primarily).</strong> Enterprise NAS supports both simultaneously — multiprotocol datasets require an identity mapping design.</li>
        <li><strong>Ping ≠ NAS health.</strong> Always test at protocol port level.</li>
        <li><strong>Layer-by-layer troubleshooting:</strong> Network → DNS → Port → Service → Share → Auth → Permissions.</li>
        <li><strong>Three checks for Access Denied:</strong> Share permission, folder permission, authentication.</li>
        <li><strong>Capacity thresholds</strong> should be set from vendor recommendations and organizational policy.</li>
        <li><strong>Snapshot ≠ Backup.</strong> It sits on the same hardware. Independent backup, preferably offsite/isolated, strongly recommended per organizational policy.</li>
        <li><strong>Disable SMB 1.0</strong> — legacy dependencies: isolate, document, migration plan.</li>
        <li><strong>NTP mandatory in AD/Kerberos environments</strong> — time skew = auth failure.</li>
        <li><strong>HA/failover testing</strong> should be performed periodically per org policy, change management and vendor-supported procedures.</li>
        <li><strong>NFSv3 firewalling complex</strong> (portmapper + dynamic ports). NFSv4 simpler (primarily TCP 2049 + identity/Kerberos deps).</li>
        <li><strong>Multiprotocol NAS requires design</strong> — plan identity mapping, security style and name mapping before enabling both protocols.</li>
        <li><strong>NAS migration:</strong> ACLs, timestamps, identity mapping, share/export definitions — plan all of them explicitly. A basic file copy is not sufficient.</li>
        <li><strong>Monitor daily:</strong> Drive health, RAID status, capacity, network errors, session counts, replication lag, auth failures.</li>
        <li><strong>Document everything:</strong> Share paths, IPs, VLANs, permissions matrix.</li>
      </ul>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ RELATED TOPICS ═══════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="das" variant="inline" /> — Direct Attached Storage — the predecessor concept to NAS. Read NAS after DAS.</li>
        <li><TopicLink slug="san" variant="inline" /> — Storage Area Network — enterprise shared block storage. Compare NAS and SAN.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware fundamentals — the servers that deploy NAS.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware and NAS — shared datastores and VM storage.</li>
      </ul>
    </>
  );
}
