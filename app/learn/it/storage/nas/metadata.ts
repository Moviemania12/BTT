import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "NAS — Network Attached Storage: Complete Engineer Guide | Behind The Tech",
  description:
    "What NAS is, SMB and NFS protocols, enterprise architecture, HA, snapshots, capacity management, Windows/Linux commands, troubleshooting, OEM reference, monitoring and interview tips — the complete English Data Center engineer handbook.",
  keywords: [
    "network attached storage", "NAS storage", "SMB protocol", "NFS protocol",
    "NAS troubleshooting", "enterprise NAS", "NAS vs SAN", "NAS vs DAS",
    "NetApp ONTAP", "Dell PowerScale", "file storage", "NAS configuration",
    "SMB share", "NFS export", "NAS monitoring", "data center storage",
  ],
  openGraph: {
    title: "NAS — Network Attached Storage: Complete Engineer Guide",
    description: "NAS architecture, SMB/NFS protocols, HA, snapshots, capacity, troubleshooting and production operations — complete guide.",
    url: "https://behindthetech.in/learn/it/storage/nas",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAS — Network Attached Storage | Behind The Tech",
    description: "Network Attached Storage — the complete engineer guide in English. From basics to production operations.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/storage/nas",
    languages: {
      en: "https://behindthetech.in/learn/it/storage/nas",
      hi: "https://behindthetech.in/hi/learn/it/storage/nas",
      "x-default": "https://behindthetech.in/learn/it/storage/nas",
    },
  },
};

export const faqs = [
  {
    q: "What is NAS and how is it different from DAS?",
    a: "NAS (Network Attached Storage) is a dedicated file storage appliance that is connected to the Ethernet network and provides file-level storage to multiple clients simultaneously. DAS (Direct Attached Storage) is attached directly to a single host by cable — it typically does not provide general-purpose network file sharing. The main advantage of NAS: shared multi-client access. The main advantage of DAS: lowest latency, simplest architecture.",
  },
  {
    q: "What is the difference between SMB and NFS?",
    a: "SMB (Server Message Block) is the Windows file sharing protocol — TCP port 445. NFS (Network File System) is the Linux/Unix standard — primarily TCP port 2049. SMB uses user-based authentication (AD/Kerberos/NTLM). NFS traditionally uses IP-based export control and UID/GID. NFSv4 with Kerberos adds proper user authentication. The same NAS can support both simultaneously — but multiprotocol datasets require an identity mapping design.",
  },
  {
    q: "Ping works but SMB does not — why?",
    a: "Ping tests the ICMP protocol, while SMB uses TCP port 445. They are different protocols. ICMP can be enabled while the SMB service is stopped, the port is blocked or authentication fails — ping can still work in that case. Always test at protocol level: Test-NetConnection nas01 -Port 445.",
  },
  {
    q: "How do you troubleshoot a NAS when it is inaccessible?",
    a: "Layer-by-layer: (1) Is the NAS management GUI accessible? Consider: management VLAN/network, routing, firewall, management service, controller, physical. (2) DNS — is the hostname resolving? (3) Network path — is the VLAN/routing correct? (4) Is the protocol port open? 445 SMB / 2049 NFS. (5) Does the share/export exist? (6) Is authentication successful? (7) Are permissions correct? Verify each layer before moving on to the next.",
  },
  {
    q: "What is the difference between a snapshot and a backup?",
    a: "A snapshot lives on the same NAS — fast restore, space-efficient. If the NAS fails, the snapshot is gone. An independent backup lives on separate storage/location — it protects against hardware failure, ransomware and site disaster. Use both, for different purposes. A snapshot does not replace a backup. The 3-2-1 rule: 3 copies, 2 different media, 1 offsite/isolated — a recommended data-protection strategy.",
  },
  {
    q: "What is the firewall difference between NFSv3 and NFSv4?",
    a: "NFSv3: portmapper/rpcbind TCP/UDP 111 + NFS port 2049 + dynamic RPC ports for mountd/locking/stat — complex firewalling. NFSv4: primarily TCP 2049 for basic protocol traffic. Kerberos, DNS, identity services and vendor-specific integrations may require additional connectivity. Always verify with the NAS vendor documentation.",
  },
  {
    q: "What happens if NAS capacity reaches 100%?",
    a: "Write operations will fail — applications will get I/O errors. NAS performance will degrade. Snapshots will not be able to capture new changes. NAS OS operations can also be affected. This is a serious production impact. Take action at the organizational warning threshold — follow vendor recommendations and workload behavior.",
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
