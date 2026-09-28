"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import HypervisorTypes from "../svg/HypervisorTypes";
import VmArchitecture from "../svg/VmArchitecture";
import VmClusterHa from "../svg/VmClusterHa";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Virtualisation in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What virtualisation is:</strong> Running multiple virtual servers (VMs) on one physical server. Each VM thinks it has dedicated hardware. Resources are shared and abstracted through software.</li> <li><strong>Hypervisor:</strong> The software layer between the physical hardware and the VMs. Type 1 (bare metal — ESXi/Hyper-V/KVM) is the data center standard. Type 2 (hosted — VirtualBox) is for dev/test.</li> <li><strong>VM = vCPU + vRAM + vDisk + vNIC:</strong> All virtual, mapped onto physical resources. vRAM allocation/reservation behaviour depends on the hypervisor and configuration.</li> <li><strong>Overcommit:</strong> Assigning more virtual resources than physical — manage it carefully. With memory overcommit, swapping has a catastrophic performance impact.</li> <li><strong>Snapshots ≠ Backups:</strong> A snapshot sits on the same storage, for quick rollback. A backup sits in a separate location, for disaster recovery. The two are different.</li> <li><strong>Live migration:</strong> Moving a running VM from host to host without downtime. Shared storage or storage migration is typically required — depends on the hypervisor.</li> <li><strong>HA:</strong> Host fails → the cluster automatically restarts the VMs on other hosts. Recovery time = VM restart time (OS boot).</li> </ul>
      </div>

      <h2 id="why-virtualisation" style={S.h2}>Why Virtualisation?</h2>
      <p style={S.p}>Pre-virtualisation era: one application = one physical server. 100 applications = 100 servers. Problem: CPU utilization was typically 5-15% for most workloads — 85-95% of server capacity wasted. Hardware, power, space, cooling — all wasteful.</p>
      <p style={S.p}>Virtualisation changed this fundamentally: run dozens of VMs on one powerful physical server. Resource utilization improved, provisioning dropped to minutes (instead of weeks), isolation was maintained between VMs, and maintenance was simplified.</p>
      <p style={S.p}>Today virtualisation is standard practice in the modern data center — bare metal is used only for specific high-performance workloads where the overhead is unacceptable (some HPC, latency-sensitive databases).</p>

      <h2 id="hypervisor-types" style={S.h2}>Hypervisor — Type 1 and Type 2</h2>
      <p style={S.p}>A hypervisor (Virtual Machine Monitor) is the software layer that sits between the physical hardware and the VMs. It abstracts the physical CPU, RAM, storage and network. It presents virtual hardware to the VMs. It allocates and schedules resources. It enforces isolation between VMs.</p>
      <Figure caption="Fig 1 — Type 1 bare metal hypervisor (runs directly on hardware) vs Type 2 hosted hypervisor (runs as process on host OS). KVM note included."><HypervisorTypes /></Figure>
      <Callout type="important" title="KVM Architecture — Correctly Understood">
        KVM (Kernel-based Virtual Machine) is a Linux kernel module that turns the Linux kernel into a Type 1 hypervisor. KVM is not Type 2 — it becomes part of the Linux kernel and accesses hardware directly. QEMU is typically used alongside KVM for device emulation. KVM is widely used in production data centers — OpenStack, many cloud providers.
      </Callout>
      <p style={S.p}><strong>Microsoft Hyper-V</strong> is also Type 1 — after the Hyper-V role is enabled on Windows Server, the Hyper-V hypervisor runs directly on the hardware. Windows itself becomes a privileged VM (parent partition). It is not Type 2.</p>

      <h2 id="vm-architecture" style={S.h2}>VM Architecture</h2>
      <Figure caption="Fig 2 — VM architecture: physical host with hypervisor, three VMs each showing vCPU, vRAM, vDisk and vNIC. Values illustrative."><VmArchitecture /></Figure>
      <p style={S.p}><strong>vCPU (Virtual CPU):</strong> The VM receives virtual processor cores. The hypervisor schedules vCPUs on physical CPU threads. A VM with 4 vCPUs → the hypervisor uses/schedules 4 physical threads. Preserving NUMA topology is beneficial for VM performance.</p>
      <p style={S.p}><strong>vRAM (Virtual RAM):</strong> Memory assigned to the VM. Backed by physical server RAM. vRAM allocation, reservation and limit behaviour depends on the hypervisor and configuration — VMware memory reservation, ballooning and swapping are all configured separately. By default not all vRAM is physically reserved — the hypervisor manages it dynamically.</p>
      <p style={S.p}><strong>vDisk (Virtual Disk):</strong> VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (KVM) — a virtual disk file or a direct block device. It appears to the VM like a normal disk. Thin provisioning (only used space allocated) vs thick provisioning (all space pre-allocated).</p>
      <p style={S.p}><strong>vNIC (Virtual Network Interface):</strong> Connects to a virtual switch. It appears to the VM like a normal network card. Multiple vNICs can be assigned — for different VLANs and redundancy.</p>

      <h2 id="resource-allocation" style={S.h2}>Resource Allocation and Overcommit</h2>
      <p style={S.p}><strong>CPU Overcommit:</strong> Assigning more vCPUs than there are physical threads. It works because not all VMs peak simultaneously. Risk: simultaneous heavy load → CPU ready time increases → VMs slow down. Monitor CPU ready time metrics. The appropriate overcommit ratio depends on the workload mix — monitor it and establish baselines.</p>
      <p style={S.p}><strong>Memory Overcommit Techniques:</strong></p>
      <ul style={S.ul}>
        <li><strong>Memory Ballooning:</strong> The hypervisor loads a balloon driver inside the VM — when the host is under pressure, the driver reclaims memory from the VM.</li>
        <li><strong>Memory Swapping:</strong> VM RAM swapped to host disk — performance drastically falls (disk speed vs RAM speed). Avoid it in production workloads.</li>
        <li><strong>Transparent Page Sharing (TPS):</strong> Identical pages across VMs deduplicated — after security concerns, many hypervisors disabled it by default.</li>
      </ul>
      <Callout type="warning" title="Memory Overcommit Production Risk">
        Use memory overcommit carefully in production workloads, or avoid it. Once memory swapping begins, VM performance degrades catastrophically. Provision physical RAM adequately — sum of all VM configured RAM + hypervisor overhead. Monitor balloon driver activity and host memory pressure.
      </Callout>
      <p style={S.p}><strong>Storage Thin Provisioning:</strong> Allocate a 500GB vDisk to a VM, but only the used space is physically allotted. Benefit: efficient storage use. Risk: total allocated across all VMs exceeds physical capacity — when the datastore fills up, VMs can pause or crash. Monitor datastore utilization carefully.</p>

      <h2 id="vm-lifecycle" style={S.h2}>VM Lifecycle</h2>
      <p style={S.p}><strong>Create:</strong> New VM wizard — specify vCPU count, vRAM, vDisk size, network, OS type. Create from a template for rapid deployment.</p>
      <p style={S.p}><strong>Provision:</strong> Install the OS (ISO mount or PXE), install VMware Tools / Hyper-V Integration Services (critical — balloon driver, time sync, enhanced network/storage drivers).</p>
      <p style={S.p}><strong>Run:</strong> VM power on. Deploy the workload. Configure monitoring.</p>
      <p style={S.p}><strong>Maintain:</strong> OS patches, application updates. VM hardware version updates (planned). Snapshot management — consolidate stale snapshots.</p>
      <p style={S.p}><strong>Migrate:</strong> Live migration (host maintenance), storage migration, cross-cluster moves.</p>
      <p style={S.p}><strong>Decommission:</strong> Migrate or terminate the workload. Verify data backup. Delete the VM — clean up vDisk files. Remove from DNS/IPAM/CMDB.</p>

      <h2 id="templates-cloning" style={S.h2}>Templates, Cloning and Datastores</h2>
      <p style={S.p}><strong>Templates:</strong> Golden image — a pre-configured, patched OS image. New VMs are deployed from templates — consistent and fast. Update the template → all future deployments are updated. VMware: VM → Convert to Template. Hyper-V: Differencing disk or Checkpoint-based.</p>
      <p style={S.p}><strong>Cloning:</strong> An exact copy of an existing VM. Full clone — completely independent copy. Linked clone — shares space with the base VM (space efficient, dependent on base). Customization (sysprep/Linux equivalent) after cloning — unique hostname, IP, SID.</p>
      <p style={S.p}><strong>Datastores:</strong> A logical storage container for storing VM files. A SAN LUN, NFS share or local storage can become a datastore. Multiple hosts access the same datastore — shared storage enables live migration. Monitor datastore capacity and performance — IOPS, latency, space.</p>

      <h2 id="virtual-networking" style={S.h2}>Virtual Networking</h2>
      <p style={S.p}><strong>Virtual Switch (vSwitch):</strong> Hypervisor software switch. VMs connect to this switch. The physical NIC (uplink) connects to the real network. Traffic: VM → vSwitch → physical NIC → physical switch.</p>
      <p style={S.p}><strong>Port Groups / VLANs:</strong> Organize VMs into logical groups — different VLANs, different security policies. Separate production VM traffic from management traffic.</p>
      <p style={S.p}><strong>NIC Teaming:</strong> Connect multiple physical NICs to the virtual switch — redundancy and bandwidth aggregation. Active-active or active-standby configuration possible.</p>
      <p style={S.p}><strong>Distributed Virtual Switch (VMware VDS / Hyper-V virtual switch):</strong> Centralised management in enterprise environments — consistent policies across all hosts, better monitoring, LACP support.</p>

      <h2 id="snapshots-backups" style={S.h2}>Snapshots vs Backups</h2>
      <ComparisonTable
        title="Snapshot vs Backup — Critical Distinction"
        headers={["Aspect","Snapshot","Backup"]}
        rows={[
          ["What it is","Point-in-time state of VM (disk, memory, settings)","Copy of data to separate location"],
          ["Storage location","Same datastore — same storage device","Separate storage, ideally different location"],
          ["Purpose","Quick rollback before risky change","Disaster recovery, long-term retention"],
          ["If storage fails","Lost (same device)","Safe (different location)"],
          ["Performance impact","Degrades over time (delta disk growth)","None on running VM"],
          ["Application consistency","Not always — may not flush buffers","Requires VSS/quiescing for consistency"],
          ["Is it a backup?","NO","YES"],
        ]}
        caption="Snapshots are NOT backups. Production environments need proper backup solutions alongside snapshot management."
      />
      <Callout type="danger" title="Snapshots Are NOT Backups">
        A snapshot lives on the same datastore — in a storage failure, both the VM and the snapshot are gone. Long-running snapshots significantly degrade VM performance. The delta disk grows indefinitely. In production, a backup solution (Veeam, Commvault, Veritas, etc.) is mandatory. Snapshot = temporary safety net for planned changes only.
      </Callout>
      <p style={S.p}><strong>Application Consistency:</strong> Crash-consistent snapshot (VM state as-is) vs application-consistent (in-flight writes are flushed via VSS/quiescing). Application-consistent backups are critical for database workloads — otherwise there is a risk of data corruption during recovery.</p>

      <h2 id="live-migration" style={S.h2}>Live Migration</h2>
      <p style={S.p}>Live migration moves a running VM from one physical host to another without shutting the VM down. Applications keep running. VMware vMotion, Hyper-V Live Migration, KVM live migrate — common implementations.</p>
      <p style={S.p}><strong>How it works (simplified):</strong> VM memory pages start copying to the destination — "pre-copy". Changed pages (dirty pages) repeatedly sync. Brief pause (VM momentarily frozen — milliseconds to seconds). Execution resumes on the destination. VM stopped on the source. Network state transfer.</p>
      <p style={S.p}><strong>Traditional requirements:</strong> Shared storage (both hosts access the same VMDK/VHD), compatible CPUs (feature parity or compatibility mode), adequate resources on destination, network connectivity between hosts.</p>
      <Callout type="important" title="Shared Storage Not Always Mandatory">
        VMware Storage vMotion can migrate compute and storage simultaneously. KVM live migration with storage migration is also possible local-to-local. Hyper-V Shared Nothing Live Migration also exists. Specific capabilities depend on the hypervisor version and configuration — "shared storage universally mandatory" is not correct. Verify vendor documentation.
      </Callout>
      <p style={S.p}><strong>Use cases:</strong> Host maintenance (put it into maintenance mode → VMs auto-evacuate). Load balancing (move VMs off a busy host). DRS (VMware Distributed Resource Scheduler) automatically rebalances VMs based on cluster load.</p>

      <h2 id="ha-clusters" style={S.h2}>HA and Cluster Architecture</h2>
      <Figure caption="Fig 3 — VM cluster HA: Host 1 fails, HA detects failure and restarts VMs A, B, C on surviving Hosts 2 and 3. Shared storage enables access to VM disks."><VmClusterHa /></Figure>
      <p style={S.p}><strong>Cluster:</strong> Multiple ESXi/Hyper-V hosts in one logical unit. Shared resources, shared features (HA, DRS, live migration). Hosts monitor each other through heartbeats.</p>
      <p style={S.p}><strong>HA (High Availability):</strong> Host fails → HA detects it → VMs automatically restart on the surviving hosts. Recovery time depends on VM restart time (OS boot) — seconds to minutes, not instantaneous. No fixed universal time claim is accurate.</p>
      <p style={S.p}><strong>Admission Control:</strong> HA ensures reserved capacity — so that N hosts can fail and the remaining hosts can still handle all VMs. Configure it based on the required failure tolerance (e.g., 1 host, 2 hosts).</p>
      <p style={S.p}><strong>VMware FT (Fault Tolerance):</strong> Zero-downtime — an identical running shadow copy of the VM on another host. Primary fails → shadow instantly takes over, no restart. Significant compute overhead. Only for high-criticality VMs.</p>
      <p style={S.p}><strong>DRS (VMware Distributed Resource Scheduler):</strong> Monitors cluster load — live migrates VMs when there is an imbalance. Manual, partial or fully automated mode. Optimizes load balancing and initial VM placement.</p>

      <h2 id="management-plane" style={S.h2}>Virtualisation Management Plane</h2>
      <p style={S.p}><strong>VMware vCenter Server:</strong> Centralized management platform — manage all ESXi hosts, VMs, clusters and datastores from one interface. HA, DRS, vMotion, permissions — all from vCenter. When vCenter is down, existing VMs keep running — but management operations (new VMs, vMotion, HA reconfiguration) are unavailable.</p>
      <p style={S.p}><strong>Microsoft System Center VMM (SCVMM) / Windows Admin Center:</strong> Centralised management for Hyper-V environments.</p>
      <p style={S.p}><strong>OpenStack / oVirt / Proxmox:</strong> Open-source management platforms — for KVM/QEMU environments. Self-hosted cloud capabilities.</p>
      <p style={S.p}>The management plane handles VM lifecycle, resource allocation, user permissions, monitoring, alerts and compliance. Plan for management plane availability — HA configuration for the management servers too.</p>

      <h2 id="rpo-rto" style={S.h2}>RPO and RTO Concepts</h2>
      <p style={S.p}><strong>RPO (Recovery Point Objective):</strong> Maximum acceptable data loss time — "How much data is it acceptable to lose after a disaster?" If the RPO is 1 hour → backups/replication must happen every 1 hour. Shorter RPO = more frequent backups/replication = higher cost.</p>
      <p style={S.p}><strong>RTO (Recovery Time Objective):</strong> Maximum acceptable downtime — "Within how much time must the service be back up after a disaster?" Shorter RTO = faster recovery mechanisms needed = higher cost (hot standby, FT, etc.).</p>
      <p style={S.p}>Virtualisation helps achieve RPO/RTO: VM replication (shorter RPO), HA/FT (shorter RTO), snapshots (quick rollback — but these are not backups). Specific RPO/RTO targets are driven by business requirements and shape the design of an appropriate backup/replication/HA strategy.</p>

      <h2 id="vm-vs-containers" style={S.h2}>VM vs Containers</h2>
      <ComparisonTable
        title="VMs vs Containers"
        headers={["Aspect","Virtual Machine (VM)","Container (Docker/Kubernetes)"]}
        rows={[
          ["Isolation","Full OS isolation — separate kernel","Process isolation — shared host OS kernel"],
          ["OS","Complete guest OS (different from host possible)","Uses host OS kernel — same kernel"],
          ["Size","GBs — full OS image","MBs — application + dependencies"],
          ["Startup time","Minutes (OS boot)","Seconds to milliseconds"],
          ["Resource overhead","Higher — full OS","Lower — no OS duplication"],
          ["Security boundary","Stronger — separate kernel","Weaker — kernel sharing"],
          ["Use case","Different OS, legacy apps, strong isolation","Microservices, cloud-native, fast scaling"],
          ["In practice","Often both used together","Containers often run on VMs"],
        ]}
        caption="VMs and containers are complementary, not competing. Most production environments use both — VMs for infrastructure, containers for application workloads."
      />

      <h2 id="security-isolation" style={S.h2}>Virtualisation Security and Isolation</h2>
      <p style={S.p}><strong>VM isolation:</strong> Hypervisor-enforced isolation between VMs. One VM normally cannot access another VM's memory. Side-channel attacks (Spectre/Meltdown) demonstrated information leakage through shared physical resources — apply mitigations (firmware patches, hypervisor updates, CPU microcode).</p>
      <p style={S.p}><strong>Hypervisor attack surface:</strong> Hypervisor compromised → all VMs at risk. Regularly update hypervisor and management plane firmware and software. Minimal attack surface — disable unnecessary features.</p>
      <p style={S.p}><strong>VM escape:</strong> A rare but serious vulnerability where VM isolation breaks and the VM can access the host or other VMs. CVE monitoring and timely patching are critical.</p>
      <p style={S.p}><strong>Network microsegmentation:</strong> Fine-grained firewall rules on virtual networking — restrict lateral movement between VMs. NSX (VMware), Hyper-V virtual switch ACLs — control traffic between VMs even on the same physical host.</p>
      <p style={S.p}><strong>vTPM (Virtual Trusted Platform Module):</strong> Presenting a virtual TPM to the VM — for guest OS full disk encryption (BitLocker, etc.) and secure boot. Consider it for sensitive workloads.</p>

      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Virtualisation</h2>
      <h3 style={S.h3}>VM Slow / Unresponsive</h3>
      <p style={S.p}>Host resource check: CPU ready time high? Memory balloon/swap active? Storage latency high? `esxtop` (VMware) or equivalent — per-VM CPU ready %, memory state, storage IOPS. Network saturation? Within VM: OS-level check — high process CPU, memory pressure?</p>
      <h3 style={S.h3}>VM Won't Start</h3>
      <p style={S.p}>Enough RAM on the host? vDisk file accessible (datastore mounted)? Configuration error? Incompatible hardware version? Permissions — correct user/service account rights? Check the logs (vmware.log, event viewer in Hyper-V).</p>
      <h3 style={S.h3}>Live Migration Failing</h3>
      <p style={S.p}>Network connectivity between hosts? Required ports open? Shared storage accessible from destination? CPU incompatibility — EVC mode needed? Sufficient resources on destination? Check the logs — the specific error message pinpoints the issue most of the time.</p>
      <h3 style={S.h3}>HA Not Triggering</h3>
      <p style={S.p}>HA enabled and configured in the cluster? Enough capacity on the remaining hosts (check admission control settings)? Shared storage accessible (a storage failure prevents HA restart)? Management network (heartbeat) working? vCenter/management accessible?</p>
      <h3 style={S.h3}>Datastore Full — VMs Pausing</h3>
      <p style={S.p}>Thin-provisioned VMs grew beyond datastore capacity. Immediate: expand the storage or migrate VMs to another datastore. Check for accumulated snapshot delta disks — consolidate stale snapshots. Long-term: configure datastore capacity monitoring and alerting.</p>
      <h3 style={S.h3}>High CPU Ready Time</h3>
      <p style={S.p}>VMs are waiting for physical CPUs. The host is overcommitted. Migrate VMs to a less-loaded host. Use resource pools to give production VMs guaranteed resources. Review the overcommit ratio.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the difference between a Type 1 and a Type 2 hypervisor? Where does KVM fit?</h3>
      <p style={S.p}><strong>Answer:</strong> Type 1 runs directly on hardware — no host OS, lower overhead, data center standard (ESXi, Hyper-V, KVM). Type 2 runs as a process on a host OS — VirtualBox, Workstation — for dev/test. KVM is a Linux kernel module that turns the kernel into a Type 1 hypervisor — not Type 2. Hyper-V is also Type 1 — the Windows parent partition runs as a privileged VM on top of the hypervisor.</p>
      <h3 style={S.h3}>Q2: What is the difference between a snapshot and a backup?</h3>
      <p style={S.p}><strong>Answer:</strong> A snapshot is a point-in-time state on the same storage — for quick rollback before a risky change. If the same storage fails → the snapshot is gone too. Long-running snapshots degrade performance. A backup copies data to a separate location — for disaster recovery. Production environments need both — a snapshot does not replace a backup.</p>
      <h3 style={S.h3}>Q3: What conditions are required for live migration?</h3>
      <p style={S.p}><strong>Answer:</strong> In the traditional implementation: shared storage (both hosts access the same vDisk), compatible CPUs (or EVC mode), network connectivity between hosts, adequate resources on destination. But shared storage is not universally mandatory — VMware Storage vMotion, KVM storage migration and Hyper-V Shared Nothing Live Migration are also possible. Verify specific requirements from hypervisor documentation.</p>
      <h3 style={S.h3}>Q4: VM vs container — when should you use which?</h3>
      <p style={S.p}><strong>Answer:</strong> VM when: a different OS is required, strong isolation is critical, legacy applications, compliance requirements, different kernel versions needed. Container when: cloud-native microservices, fast scaling, lightweight workloads, same OS kernel acceptable. In production both are often used together — VMs provide the infrastructure, and containers run on the VMs.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Virtualisation runs multiple VMs on one physical server — improved resource utilization, fast provisioning, isolation maintained.</li>
        <li>Type 1 hypervisors (ESXi, Hyper-V, KVM) are the data center standard — directly on hardware, lower overhead.</li>
        <li>KVM is a Linux kernel module — Type 1 semantics, not Type 2. Hyper-V is also Type 1.</li>
        <li>vRAM allocation/reservation behaviour depends on the hypervisor and configuration — not universally pre-reserved.</li>
        <li>Snapshots are not backups — they sit on the same storage, degrade performance over time, and are insufficient for disaster recovery.</li>
        <li>Shared storage is typically helpful for live migration but not universally mandatory — hypervisor capabilities vary.</li>
        <li>HA restarts VMs on host failure — recovery time depends on VM restart time.</li>
        <li>VMs and containers are complementary — both are often used in production.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — The physical server architecture that hosts VMs.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — vCPU scheduling, NUMA in VMs, virtualisation extensions.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density VM hosting on blade infrastructure.</li>
        <li><TopicLink slug="cloud-vs-data-center" variant="inline" /> — Cloud virtualisation vs on-premise.</li>
      </ul>
    </>
  );
}
