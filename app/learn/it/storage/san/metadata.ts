import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "SAN — Storage Area Network: Complete Engineer Guide | Behind The Tech",
  description:
    "What SAN is, Fibre Channel, iSCSI, LUN, zoning, LUN masking, multipathing, ALUA, dual fabric, Windows/Linux/VMware practicals, troubleshooting, OEM escalation and interview tips — a complete English Data Center engineer handbook.",
  keywords: [
    "storage area network", "SAN storage", "fibre channel", "iSCSI", "LUN",
    "SAN zoning", "LUN masking", "multipathing", "MPIO", "DM-Multipath",
    "WWPN", "HBA", "SAN troubleshooting", "FC SAN", "dual fabric",
    "ALUA", "VMware SAN", "enterprise storage", "data center storage",
  ],
  openGraph: {
    title: "SAN — Storage Area Network: Complete Engineer Guide",
    description: "Fibre Channel, iSCSI, LUN, zoning, multipathing, ALUA, dual fabric, troubleshooting — complete SAN handbook.",
    url: "https://behindthetech.in/learn/it/storage/san",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAN — Storage Area Network | Behind The Tech",
    description: "Complete SAN engineer guide in English — FC, iSCSI, LUN, zoning, multipathing, troubleshooting.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/storage/san",
    languages: {
      en: "https://behindthetech.in/learn/it/storage/san",
      hi: "https://behindthetech.in/hi/learn/it/storage/san",
      "x-default": "https://behindthetech.in/learn/it/storage/san",
    },
  },
};

export const faqs = [
  {
    q: "What is SAN and how is it different from NAS?",
    a: "SAN (Storage Area Network) is a dedicated high-speed storage network that provides block-level storage to servers — the server sees a raw disk (LUN) and builds its own filesystem. NAS provides file-level storage — the filesystem lives on the NAS, and the client accesses files (SMB/NFS). SAN is used for databases, VMware shared datastores and mission-critical applications. NAS is used for file sharing and backup.",
  },
  {
    q: "What is a LUN?",
    a: "A LUN (Logical Unit Number) is a logical block storage unit in a storage array — not a physical disk. It is a logical volume created in software on top of a storage pool/RAID. The host sees this LUN as a raw block device — the host OS or application creates a filesystem on top of it. Multiple LUNs can be created from one storage pool.",
  },
  {
    q: "What is the difference between zoning and LUN masking?",
    a: "Zoning is at the SAN switch (fabric) level — it controls which initiator WWPN can communicate with which target WWPN. LUN masking is at the storage array level — it controls which host can see which LUN. They are two separate layers — both are required. Zoning controls fabric communication; LUN masking controls storage access.",
  },
  {
    q: "What is multipathing and why is it important?",
    a: "Multipathing provides multiple physical paths from the host's multiple HBA ports — to the same LUN through dual fabrics and dual storage controllers. MPIO (Windows), DM-Multipath (Linux), VMware NMP — at the OS level these aggregate the multiple paths into a single device. If one path fails → I/O automatically continues over another path without application disruption.",
  },
  {
    q: "What is the difference between FC SAN and iSCSI SAN?",
    a: "FC SAN uses dedicated Fibre Channel hardware (FC HBAs, FC switches), WWPN-based addressing, and a purpose-built lossless fabric. iSCSI uses SCSI over TCP/IP — standard Ethernet infrastructure, IQN-based addressing, TCP port 3260. FC is historically purpose-built and predictable. iSCSI is lower cost, and IP networking skills are transferable. In modern environments both can achieve high performance — the choice depends on workload, budget and infrastructure.",
  },
  {
    q: "Why use a dual fabric?",
    a: "Mission-critical enterprise FC SAN designs commonly use two independent fabrics (Fabric A and Fabric B) — to eliminate a single fabric as a single failure domain. Each server has 2 HBAs — one to Fabric A, one to Fabric B. The front-end ports of the storage array's controllers are on both fabrics. If one fabric fails → the other fabric automatically handles all I/O.",
  },
  {
    q: "A new LUN is not visible — what should be checked?",
    a: "Layer by layer: (1) Is the HBA port online? (2) FLOGI — logged in to the fabric? (3) Is zoning correct? Correct initiator + target WWPN? Configuration active? Both fabrics? (4) Is the storage target front-end port online? (5) Is the host object correct on the array? WWPN registered? (6) LUN mapped to the host? LUN online? (7) Rescan the host. (8) Multipath check — expected paths visible? (9) Did the device appear in the OS?",
  },
  {
    q: "What is ALUA?",
    a: "ALUA (Asymmetric Logical Unit Access) is a T10 SCSI standard through which the storage array provides the host with information about Target Port Groups (TPGs) — which TPG is Active/Optimized (preferred, lower latency) and which is Active/Non-Optimized. The host multipath software uses the ALUA information to choose optimal paths. Behavior is architecture-dependent — some arrays are active-active (all paths optimized), others use ALUA asymmetrically.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
