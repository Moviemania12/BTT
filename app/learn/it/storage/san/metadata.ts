import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAN — Storage Area Network: Complete Engineer Guide | Behind The Tech",
  description:
    "SAN kya hai, Fibre Channel, iSCSI, LUN, zoning, LUN masking, multipathing, ALUA, dual fabric, Windows/Linux/VMware practical, troubleshooting, OEM escalation aur interview tips — complete Hinglish Data Center engineer handbook.",
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
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAN — Storage Area Network | Behind The Tech",
    description: "SAN complete engineer guide Hinglish mein — FC, iSCSI, LUN, zoning, multipathing, troubleshooting.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/storage/san" },
};

export const faqs = [
  {
    q: "SAN kya hai aur NAS se kaise alag hai?",
    a: "SAN (Storage Area Network) ek dedicated high-speed storage network hai jo servers ko block-level storage provide karta hai — server raw disk (LUN) dekhta hai aur khud filesystem banata hai. NAS file-level storage provide karta hai — NAS pe filesystem hoti hai, client files access karta hai (SMB/NFS). SAN databases, VMware shared datastores aur mission-critical applications ke liye use hota hai. NAS file sharing aur backup ke liye.",
  },
  {
    q: "LUN kya hai?",
    a: "LUN (Logical Unit Number) storage array mein ek logical block storage unit hai — physical disk nahi. Storage pool/RAID ke upar software se create ki gayi logical volume hoti hai. Host is LUN ko ek raw block device ki tarah dekhta hai — host ka OS ya application uske upar filesystem create karta hai. Ek storage pool se multiple LUNs create ho sakti hain.",
  },
  {
    q: "Zoning aur LUN masking mein kya fark hai?",
    a: "Zoning SAN switch (fabric) level pe hai — controls which initiator WWPN can communicate with which target WWPN. LUN masking storage array level pe hai — controls which host can see which LUN. Dono alag layers hain — dono required hain. Zoning fabric communication control karta hai; LUN masking storage access control karta hai.",
  },
  {
    q: "Multipathing kya hai aur kyun important hai?",
    a: "Multipathing host ke multiple HBA ports se multiple physical paths provide karta hai — same LUN tak through dual fabrics and dual storage controllers. MPIO (Windows), DM-Multipath (Linux), VMware NMP — OS level pe yeh multiple paths ek single device mein aggregate karta hai. Ek path fail → automatically doosre path se I/O continue hota hai bina application disruption ke.",
  },
  {
    q: "FC SAN aur iSCSI SAN mein kya difference hai?",
    a: "FC SAN dedicated Fibre Channel hardware use karta hai (FC HBAs, FC switches), WWPN-based addressing, purpose-built lossless fabric. iSCSI SCSI over TCP/IP use karta hai — standard Ethernet infrastructure, IQN-based addressing, TCP port 3260. FC historically purpose-built aur predictable. iSCSI lower cost, IP networking skills transferable. Modern environments mein dono high performance achieve kar sakte hain — choice workload, budget aur infrastructure pe depend karta hai.",
  },
  {
    q: "Dual fabric kyun use karte hain?",
    a: "Mission-critical enterprise FC SAN designs commonly two independent fabrics (Fabric A aur Fabric B) use karte hain — ek fabric ko single failure domain eliminate karne ke liye. Har server mein 2 HBAs — ek Fabric A se, ek Fabric B se. Storage array ke controllers ke front-end ports dono fabrics pe hote hain. Ek fabric fail ho → doosra fabric automatically sab I/O handle karta hai.",
  },
  {
    q: "New LUN visible nahi hai — kya check karein?",
    a: "Layer-by-layer: (1) HBA port online hai? (2) FLOGI — fabric mein logged in? (3) Zoning correct? Correct initiator + target WWPN? Configuration active? Both fabrics? (4) Storage target front-end port online? (5) Host object correct on array? WWPN registered? (6) LUN mapped to host? LUN online? (7) Host rescan karo. (8) Multipath check — expected paths visible? (9) OS mein device appear hua?",
  },
  {
    q: "ALUA kya hai?",
    a: "ALUA (Asymmetric Logical Unit Access) ek T10 SCSI standard hai jisse storage array host ko Target Port Groups (TPGs) ke baare mein information provide karta hai — kaun sa TPG Active/Optimized (preferred, lower latency) hai aur kaun sa Active/Non-Optimized. Host multipath software ALUA information se optimal paths choose karta hai. Behavior architecture-dependent hai — some arrays active-active (all paths optimized), others use ALUA asymmetrically.",
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
