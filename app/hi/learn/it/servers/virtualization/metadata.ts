import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
export const metadata: Metadata = {
  title: "Virtualisation Kya Hai? Hypervisor, VM, HA aur Live Migration | Behind The Tech",
  description: "Virtualisation kya hai, Type 1/2 hypervisors, VM architecture, overcommit, live migration, HA clusters, snapshots vs backups, RPO/RTO, VM vs containers — Zero-to-Hero Hinglish guide.",
  keywords: ["virtualisation","hypervisor","VMware ESXi","Hyper-V","KVM","VM","vCPU vRAM","live migration","vMotion","HA cluster","snapshots backups","VM vs container"],
  openGraph: { title: "Virtualisation — Hypervisors, VMs, HA & Live Migration", description: "Type 1/2 hypervisors, VM architecture, overcommit, HA, live migration, containers.", url: "https://behindthetech.in/hi/learn/it/servers/virtualization", locale: "hi_IN", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Virtualisation — Behind The Tech", description: "Hypervisors, VMs, HA aur live migration complete guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/it/servers/virtualization",
    languages: {
      en: "https://behindthetech.in/learn/it/servers/virtualization",
      hi: "https://behindthetech.in/hi/learn/it/servers/virtualization",
      "x-default": "https://behindthetech.in/learn/it/servers/virtualization",
    },
  },
};
export const faqs = [
  { q: "Type 1 aur Type 2 hypervisor mein kya difference hai?", a: "Type 1 (bare metal) directly physical hardware pe install hota hai — no host OS. Lower overhead, better performance. Data center standard: VMware ESXi, Microsoft Hyper-V, KVM (Linux kernel module — Type 1 semantics), Xen. Type 2 (hosted) existing OS ke upar run karta hai — VirtualBox, VMware Workstation. Host OS crash → all VMs affected. Development/testing ke liye, production data centers mein typically nahi." },
  { q: "CPU overcommit kya hai aur kab problematic hota hai?", a: "Physical CPU threads se zyada vCPUs VMs ko assign karna. Work karta hai kyunki sab VMs simultaneously peak pe nahi hote. Problematic hota hai jab sab VMs simultaneously heavy load pe hon — CPU ready queue mein VMs wait karte hain → performance degradation. CPU ready time metrics monitor karo, workload-specific baselines establish karo, overcommit ratio carefully manage karo." },
  { q: "Snapshot aur backup mein kya difference hai?", a: "Snapshot VM ka point-in-time state hai same storage pe — rapid rollback ke liye (risky change se pehle). Backup data separate location pe copy hai — actual disaster recovery ke liye. Snapshot backup replace nahi karta: same storage fail → snapshot bhi gone. Long-running snapshots VM performance degrade karte hain (delta disk growth). Production environments mein proper backup solution zaroori hai." },
  { q: "Live migration ke liye kya requirements hain?", a: "Traditional shared-storage live migration (VMware vMotion, Hyper-V Live Migration) ke liye: shared storage (both hosts same datastore access karein), compatible CPUs (ya EVC/CPU compatibility mode), network connectivity between hosts, adequate resources on destination. Shared storage universally mandatory nahi hai — KVM storage migration allow karta hai without pre-shared storage, aur modern hypervisors storage migration bhi simultaneously support karte hain. Specific requirements hypervisor documentation se verify karo." },
  { q: "VM aur container mein kya difference hai?", a: "VM full virtual hardware aur complete OS run karta hai — strong isolation, different kernels possible, heavier resource use. Container host OS kernel share karta hai — application aur dependencies isolate hote hain. Containers lighter, faster start, less overhead. VMs stronger isolation dete hain. Production mein often dono sath use hote hain — VMs infrastructure provide karte hain, containers VMs pe run hote hain." },
  { q: "CPU ready time kya hai?", a: "Wo time jab vCPU chalne ko ready hota hai par physical core ka intezaar karta hai. High ready time ka matlab host overcommitted hai ya VMs oversized hain. Ise host par naapte hain, guest ke andar nahi." },
  { q: "Memory ballooning kya hoti hai?", a: "Host ke paas RAM kam ho to guest ka balloon driver guest OS se kam-use hone wali memory free karwata hai taaki hypervisor use dobara use kar sake. Host swapping se behtar hai, par memory pressure ka sign hai." },
  { q: "HA aur Fault Tolerance mein kya fark hai?", a: "HA failed VMs ko chhote outage (minutes) ke baad doosre host par restart karta hai. Fault Tolerance lockstep shadow VM chalata hai aur bina restart switch-over karta hai, par zyada resources lagte hain aur VM size par limits hoti hain." },
  { q: "SR-IOV aur PCI passthrough kya hain?", a: "Dono VMs ko near-direct hardware access dete hain. Passthrough poora device ek VM ko deta hai; SR-IOV ek NIC ko kai virtual functions mein baant deta hai. Performance badhti hai par live migration aur flexibility aam taur par limit hoti hai." },
  { q: "Virtualisation cluster ko size kaise karte hain?", a: "Real CPU, RAM, storage aur network use naapo, consolidation ratios chuno, hosts nikalo (aksar RAM limit hoti hai), failures ke liye N+1 ya N+2 jodo, phir growth, storage, network aur power capacity." },
  { q: "RPO aur RTO kya hain?", a: "RPO matlab kitna data loss acceptable hai (time mein); RTO matlab service kitni der down reh sakti hai. Inse tay hota hai ki backup, replication ya stretched cluster chahiye." },
  { q: "Virtualisation ke liye kaun si BIOS settings zaroori hain?", a: "Intel VT-x / AMD-V, EPT/NPT, VT-d / IOMMU enable karo, zarurat ho to SR-IOV, NUMA on rakho, performance power profile use karo aur har host par firmware vendor-validated version par rakho." },
];
export const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
