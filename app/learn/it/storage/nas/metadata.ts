import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NAS — Network Attached Storage: Complete Engineer Guide | Behind The Tech",
  description:
    "NAS kya hai, SMB aur NFS protocols, enterprise architecture, HA, snapshots, capacity management, Windows/Linux commands, troubleshooting, OEM reference, monitoring aur interview tips — complete Hinglish Data Center engineer handbook.",
  keywords: [
    "network attached storage", "NAS storage", "SMB protocol", "NFS protocol",
    "NAS troubleshooting", "enterprise NAS", "NAS vs SAN", "NAS vs DAS",
    "NetApp ONTAP", "Dell PowerScale", "file storage", "NAS configuration",
    "SMB share", "NFS export", "NAS monitoring", "data center storage",
  ],
  openGraph: {
    title: "NAS — Network Attached Storage: Complete Engineer Guide",
    description: "NAS architecture, SMB/NFS protocols, HA, snapshots, capacity, troubleshooting aur production operations — complete guide.",
    url: "https://behindthetech.in/learn/it/storage/nas",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAS — Network Attached Storage | Behind The Tech",
    description: "Network Attached Storage — complete engineer guide Hinglish mein. Basics se production operations tak.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/storage/nas" },
};

export const faqs = [
  {
    q: "NAS kya hai aur DAS se kaise alag hai?",
    a: "NAS (Network Attached Storage) ek dedicated file storage appliance hai jo Ethernet network pe connected hota hai aur multiple clients ko simultaneously file-level storage provide karta hai. DAS (Direct Attached Storage) directly ek host se cable se attached hoti hai — typically general-purpose network file sharing provide nahi karta. NAS ka main advantage: shared multi-client access. DAS ka main advantage: lowest latency, simplest architecture.",
  },
  {
    q: "SMB aur NFS mein kya difference hai?",
    a: "SMB (Server Message Block) Windows file sharing protocol hai — TCP port 445. NFS (Network File System) Linux/Unix standard hai — primarily TCP port 2049. SMB user-based authentication (AD/Kerberos/NTLM) use karta hai. NFS traditionally IP-based export control aur UID/GID use karta hai. NFSv4 with Kerberos proper user authentication add karta hai. Same NAS dono simultaneously support kar sakta hai — lekin multiprotocol datasets ke liye identity mapping design required hai.",
  },
  {
    q: "Ping kaam karta hai lekin SMB nahi — kyun?",
    a: "Ping ICMP protocol test karta hai aur SMB TCP port 445. Dono alag protocols hain. ICMP enabled ho aur SMB service stopped ho, port blocked ho ya authentication fail ho — ping tab bhi work kar sakta hai. Always test at protocol level: Test-NetConnection nas01 -Port 445.",
  },
  {
    q: "NAS troubleshoot kaise karte ho jab inaccessible ho?",
    a: "Layer-by-layer: (1) NAS management GUI accessible? Consider: management VLAN/network, routing, firewall, management service, controller, physical. (2) DNS — hostname resolve ho raha hai? (3) Network path — VLAN/routing correct? (4) Protocol port open? 445 SMB / 2049 NFS. (5) Share/export exists? (6) Authentication successful? (7) Permissions correct? Har layer verify karo before next pe jaao.",
  },
  {
    q: "Snapshot aur backup mein kya difference hai?",
    a: "Snapshot same NAS pe — fast restore, space-efficient. NAS fail ho — snapshot gone. Independent backup alag storage/location pe hai — hardware failure, ransomware aur site disaster se protect karta hai. Dono alag-alag use karo. Snapshot backup replace nahi karta. 3-2-1 rule: 3 copies, 2 different media, 1 offsite/isolated — ek recommended data-protection strategy hai.",
  },
  {
    q: "NFSv3 aur NFSv4 mein firewall mein kya difference hai?",
    a: "NFSv3: portmapper/rpcbind TCP/UDP 111 + NFS port 2049 + dynamic RPC ports for mountd/locking/stat — complex firewalling. NFSv4: primarily TCP 2049 for basic protocol traffic. Kerberos, DNS, identity services aur vendor-specific integrations additional connectivity require kar sakte hain. Always NAS vendor documentation verify karo.",
  },
  {
    q: "NAS capacity 100% ho jaaye toh kya hoga?",
    a: "Write operations fail honge — applications ko I/O errors milenge. NAS performance degrade hogi. Snapshots new changes capture nahi kar paayenge. NAS OS operations bhi affected ho sakte hain. Ye serious production impact hai. Organizational warning threshold pe action lo — vendor recommendations aur workload behavior follow karo.",
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
