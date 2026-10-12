import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "Virtualisation — Hypervisors, VMs, HA, Live Migration & Containers | Behind The Tech",
  description: "Virtualisation from basics to data center practice: hypervisors, vCPU scheduling, overcommit, storage and networking, live migration, HA/DRS, sizing, BIOS settings, DR, security, troubleshooting and Tier III/IV design — with 10 diagrams explained.",
  keywords: ["virtualisation","hypervisor","VMware ESXi","Hyper-V","KVM","VM","vCPU vRAM","live migration","vMotion","HA cluster","snapshots backups","VM vs container","CPU ready","SR-IOV passthrough","cluster sizing","RPO RTO"],
  openGraph: { title: "Virtualisation — Hypervisors, VMs, HA & Live Migration", description: "Type 1/2 hypervisors, VM architecture, overcommit, HA, live migration, containers.", url: "https://behindthetech.in/learn/it/servers/virtualization", locale: "en_US", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Virtualisation — Behind The Tech", description: "Hypervisors, VMs, HA and live migration complete guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/servers/virtualization",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/virtualization",
      hi: "https://behindthetech.in/hi/learn/it/servers/virtualization",
      "x-default": "https://behindthetech.in/learn/it/servers/virtualization",
    },
  },
};
export const faqs = [
  { q: "What is the difference between a Type 1 and a Type 2 hypervisor?", a: "Type 1 (bare metal) installs directly on physical hardware — no host OS. Lower overhead, better performance. Data center standard: VMware ESXi, Microsoft Hyper-V, KVM (Linux kernel module — Type 1 semantics), Xen. Type 2 (hosted) runs on top of an existing OS — VirtualBox, VMware Workstation. Host OS crash → all VMs affected. Used for development/testing, typically not in production data centers." },
  { q: "What is CPU overcommit and when does it become problematic?", a: "Assigning more vCPUs to VMs than there are physical CPU threads. It works because not all VMs peak simultaneously. It becomes problematic when all VMs are under heavy load at the same time — VMs wait in the CPU ready queue → performance degradation. Monitor CPU ready time metrics, establish workload-specific baselines, and manage the overcommit ratio carefully." },
  { q: "What is the difference between a snapshot and a backup?", a: "A snapshot is a point-in-time state of a VM on the same storage — for rapid rollback (before a risky change). A backup is a copy of the data in a separate location — for actual disaster recovery. A snapshot does not replace a backup: if the same storage fails → the snapshot is gone too. Long-running snapshots degrade VM performance (delta disk growth). A proper backup solution is essential in production environments." },
  { q: "What are the requirements for live migration?", a: "Traditional shared-storage live migration (VMware vMotion, Hyper-V Live Migration) requires: shared storage (both hosts access the same datastore), compatible CPUs (or EVC/CPU compatibility mode), network connectivity between hosts, adequate resources on destination. Shared storage is not universally mandatory — KVM allows storage migration without pre-shared storage, and modern hypervisors also support storage migration simultaneously. Verify specific requirements from hypervisor documentation." },
  { q: "What is the difference between a VM and a container?", a: "A VM runs full virtual hardware and a complete OS — strong isolation, different kernels possible, heavier resource use. A container shares the host OS kernel — the application and its dependencies are isolated. Containers are lighter, start faster and have less overhead. VMs provide stronger isolation. In production both are often used together — VMs provide the infrastructure, and containers run on the VMs." },
  { q: "What is CPU ready time?", a: "The time a vCPU is ready to run but waiting for a physical core. High ready time means the host is overcommitted or VMs are oversized. It is measured on the host, not inside the guest." },
  { q: "What is memory ballooning?", a: "A balloon driver in the guest asks the guest OS to free less-used memory so the hypervisor can reuse it when the host is short of RAM. It is preferable to host swapping but indicates memory pressure." },
  { q: "What is the difference between HA and Fault Tolerance?", a: "HA restarts failed VMs on another host after a short outage (minutes). Fault Tolerance runs a lockstep shadow VM and switches over without a restart, but uses more resources and has limits on VM size." },
  { q: "What are SR-IOV and PCI passthrough?", a: "Both give VMs near-direct hardware access. Passthrough dedicates a whole device to one VM; SR-IOV splits one NIC into many virtual functions. Both improve performance but usually limit live migration and flexibility." },
  { q: "How do I size a virtualisation cluster?", a: "Measure real CPU, RAM, storage and network use, choose consolidation ratios, calculate hosts (RAM is often the limit), add N+1 or N+2 for failures, then add growth, storage, network and power capacity." },
  { q: "What are RPO and RTO?", a: "RPO is how much data loss is acceptable (in time); RTO is how long a service may be down. They decide whether you need backup, replication or a stretched cluster." },
  { q: "Which BIOS settings matter for virtualisation?", a: "Enable Intel VT-x / AMD-V, EPT/NPT, VT-d / IOMMU, SR-IOV if needed, keep NUMA enabled, use a performance power profile and keep firmware at vendor-validated versions on every host." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
