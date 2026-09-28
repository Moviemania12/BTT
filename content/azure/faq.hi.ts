export const azureFaq = [
  {
    question: "Azure Region aur Availability Zone mein kya difference hai?",
    answer:
      "Azure Region ek specific geographic location hai jahan Microsoft ke data centers cluster hote hain — jaise East US, Central India, West Europe. Har Region mein typically multiple Availability Zones (AZs) hoti hain — physically separate facilities with independent power, cooling aur networking. AZ failure ek zone ko affect karta hai, region-wide nahi. Region Pairs Azure ka unique concept hai — do Regions ek pair mein linked hain (e.g., East US ↔ West US) — platform updates sequentially roll out hote hain, aur major disasters mein dusra region recovery prioritize hota hai.",
  },
  {
    question: "Azure Resource Group kya hai aur iska use kab karna chahiye?",
    answer:
      "Resource Group ek logical container hai jo related Azure resources ko together group karta hai. Resources jo same lifecycle share karte hain — same application ke VM, storage, database — ek Resource Group mein rakhna best practice hai. Poora group ek saath deploy, delete ya access-control kiya ja sakta hai. Resource Group region-specific hota hai (metadata storage ke liye), lekin different regions ke resources ek group mein ho sakte hain. Billing aur RBAC granularity ke liye Resource Groups critical hain.",
  },
  {
    question: "Azure NSG aur Azure Firewall mein kya fark hai?",
    answer:
      "NSG (Network Security Group) subnet ya NIC level pe basic allow/deny rules enforce karta hai — stateful, L3/L4. Free service, always available. Azure Firewall ek managed, stateful network firewall service hai — L3 through L7, FQDN filtering, threat intelligence, centralized logging. Azure Firewall costly hai (hourly charge) lekin enterprise-grade security deta hai. Typical architecture: NSG har subnet pe (first line of defence) + Azure Firewall hub VNet pe (central policy enforcement). Dono complementary hain — NSG sirf Azure Firewall ko replace nahi karta aur vice versa.",
  },
  {
    question: "Azure Active Directory (Microsoft Entra ID) aur traditional Active Directory mein kya difference hai?",
    answer:
      "Traditional Active Directory (on-prem AD DS) LDAP/Kerberos pe based hai, domain-joined machines manage karta hai, GPO apply karta hai. Microsoft Entra ID (formerly Azure AD) cloud-native identity service hai — OAuth 2.0/OIDC/SAML use karta hai, web applications aur APIs ke liye designed hai, device join different concept hai (Azure AD Join ya Hybrid Join). Entra ID domain controller nahi hai — ek cloud identity provider hai. Dono ko saath use karna hybrid identity scenario hai — on-prem AD to Entra ID sync via Azure AD Connect.",
  },
  {
    question: "Azure ExpressRoute aur VPN Gateway mein kya choose karna chahiye?",
    answer:
      "VPN Gateway: Internet pe IPsec tunnel, encrypted, lower cost, setup fast (hours), variable latency. ExpressRoute: dedicated private circuit via connectivity provider, NOT encrypted by default, predictable latency, high bandwidth (50Mbps to 100Gbps), costlier, setup weeks-months. Choice criteria: variable latency acceptable, moderate bandwidth, budget-conscious → VPN Gateway. High bandwidth, consistent latency, large data transfer, compliance (no Internet exposure) → ExpressRoute. Production environments mein often ExpressRoute primary + VPN Gateway backup pattern use hota hai.",
  },
  {
    question: "Azure VM aur AWS EC2 mein architecture ka kya difference hai?",
    answer:
      "Conceptually dono virtual compute instances hain, lekin Azure terminology aur structure different hai. Azure VM requires: Resource Group, VNet + Subnet, NIC (Network Interface Card), OS Disk (Managed Disk), optionally Public IP. Azure mein availability ke liye Availability Sets (fault domains + update domains) ya Availability Zones use karte hain. AWS EC2 mein AMI-based launch, Security Groups directly attached hain; Azure mein NSG subnet ya NIC pe attach hoti hai. Azure VM sizes: B-series (burstable), D-series (general purpose), E-series (memory), F-series (compute), N-series (GPU) — AWS instance families se different naming lekin similar categories.",
  },
  {
    question: "Azure Blob Storage aur AWS S3 mein kya differences hain?",
    answer:
      "Dono object storage services hain. Azure Blob Storage: Account > Container > Blob hierarchy. Tiers: Hot, Cool, Cold, Archive. Blob types: Block Blob (files/images/videos), Append Blob (logging), Page Blob (VHD/disk images). AWS S3: Bucket > Object. Storage Classes: Standard, Standard-IA, Glacier etc. Key differences: Azure mein storage account level pe performance tier (Standard/Premium) choose hoti hai; S3 mein per-object storage class. Azure Data Lake Storage Gen2 Blob pe built hierarchical namespace add karta hai. Dono globally redundant aur highly durable hain.",
  },
  {
    question: "Azure Managed Disks aur AWS EBS mein kya fark hai?",
    answer:
      "Dono block storage services hain jo VM se network-attached hoti hain. Azure Managed Disks: Microsoft storage account infrastructure manage karta hai — you sirf disk create karo aur VM attach karo. Types: Ultra Disk (highest IOPS, low latency, databases), Premium SSD v2, Premium SSD, Standard SSD, Standard HDD. Availability Zone aware — same zone mein VM pe attach. Snapshots possible, cross-region copy possible. AWS EBS: gp3/io2/st1/sc1 types. Key Azure advantage: Managed Disks automatically fault-tolerant storage pe backed hain — single point of failure nahi. Dono persistent hain aur VM stop/start pe survive karte hain.",
  },
];
