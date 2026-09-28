export const azureFaq = [
  {
    question: "What is the difference between an Azure Region and an Availability Zone?",
    answer:
      "An Azure Region is a specific geographic location where Microsoft's data centers are clustered — such as East US, Central India, West Europe. Each Region typically has multiple Availability Zones (AZs) — physically separate facilities with independent power, cooling and networking. An AZ failure affects one zone, not the whole region. Region Pairs are a unique Azure concept — two Regions are linked in a pair (e.g., East US ↔ West US) — platform updates roll out sequentially, and in major disasters recovery of the other region is prioritized.",
  },
  {
    question: "What is an Azure Resource Group and when should you use it?",
    answer:
      "A Resource Group is a logical container that groups related Azure resources together. Keeping resources that share the same lifecycle — the VM, storage and database of the same application — in one Resource Group is best practice. The entire group can be deployed, deleted or access-controlled together. A Resource Group is region-specific (for metadata storage), but resources from different regions can be in one group. Resource Groups are critical for billing and RBAC granularity.",
  },
  {
    question: "What is the difference between an Azure NSG and Azure Firewall?",
    answer:
      "An NSG (Network Security Group) enforces basic allow/deny rules at the subnet or NIC level — stateful, L3/L4. Free service, always available. Azure Firewall is a managed, stateful network firewall service — L3 through L7, FQDN filtering, threat intelligence, centralized logging. Azure Firewall is costly (hourly charge) but provides enterprise-grade security. Typical architecture: NSG on every subnet (first line of defence) + Azure Firewall on the hub VNet (central policy enforcement). The two are complementary — an NSG alone does not replace Azure Firewall and vice versa.",
  },
  {
    question: "What is the difference between Azure Active Directory (Microsoft Entra ID) and traditional Active Directory?",
    answer:
      "Traditional Active Directory (on-prem AD DS) is based on LDAP/Kerberos, manages domain-joined machines and applies GPOs. Microsoft Entra ID (formerly Azure AD) is a cloud-native identity service — it uses OAuth 2.0/OIDC/SAML, is designed for web applications and APIs, and device join is a different concept (Azure AD Join or Hybrid Join). Entra ID is not a domain controller — it is a cloud identity provider. Using both together is a hybrid identity scenario — on-prem AD to Entra ID sync via Azure AD Connect.",
  },
  {
    question: "Should you choose Azure ExpressRoute or VPN Gateway?",
    answer:
      "VPN Gateway: IPsec tunnel over the Internet, encrypted, lower cost, fast setup (hours), variable latency. ExpressRoute: dedicated private circuit via a connectivity provider, NOT encrypted by default, predictable latency, high bandwidth (50Mbps to 100Gbps), costlier, setup takes weeks to months. Choice criteria: variable latency acceptable, moderate bandwidth, budget-conscious → VPN Gateway. High bandwidth, consistent latency, large data transfer, compliance (no Internet exposure) → ExpressRoute. Production environments often use an ExpressRoute primary + VPN Gateway backup pattern.",
  },
  {
    question: "What is the architectural difference between an Azure VM and AWS EC2?",
    answer:
      "Conceptually both are virtual compute instances, but Azure terminology and structure are different. An Azure VM requires: Resource Group, VNet + Subnet, NIC (Network Interface Card), OS Disk (Managed Disk), and optionally a Public IP. For availability, Azure uses Availability Sets (fault domains + update domains) or Availability Zones. In AWS EC2, launches are AMI-based and Security Groups are attached directly; in Azure the NSG is attached to the subnet or NIC. Azure VM sizes: B-series (burstable), D-series (general purpose), E-series (memory), F-series (compute), N-series (GPU) — different naming from AWS instance families but similar categories.",
  },
  {
    question: "What are the differences between Azure Blob Storage and AWS S3?",
    answer:
      "Both are object storage services. Azure Blob Storage: Account > Container > Blob hierarchy. Tiers: Hot, Cool, Cold, Archive. Blob types: Block Blob (files/images/videos), Append Blob (logging), Page Blob (VHD/disk images). AWS S3: Bucket > Object. Storage Classes: Standard, Standard-IA, Glacier etc. Key differences: in Azure the performance tier (Standard/Premium) is chosen at the storage account level; in S3 the storage class is per object. Azure Data Lake Storage Gen2 adds a hierarchical namespace built on Blob. Both are globally redundant and highly durable.",
  },
  {
    question: "What is the difference between Azure Managed Disks and AWS EBS?",
    answer:
      "Both are block storage services that are network-attached to the VM. Azure Managed Disks: Microsoft manages the storage account infrastructure — you just create the disk and attach it to the VM. Types: Ultra Disk (highest IOPS, low latency, databases), Premium SSD v2, Premium SSD, Standard SSD, Standard HDD. Availability Zone aware — attached to a VM in the same zone. Snapshots possible, cross-region copy possible. AWS EBS: gp3/io2/st1/sc1 types. Key Azure advantage: Managed Disks are backed by automatically fault-tolerant storage — no single point of failure. Both are persistent and survive VM stop/start.",
  },
];
