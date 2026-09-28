export const hybridCloudFaq = [
  {
    question: "What is the actual difference between Hybrid Cloud and Multi-Cloud?",
    answer:
      "Hybrid Cloud means a coordinated, integrated architecture of on-premises infrastructure and public cloud — the two work together as one system. Data can move freely, workloads can shift, and identity is managed from a shared plane. Multi-Cloud means using multiple public cloud providers simultaneously (AWS + Azure, or AWS + GCP) — but not necessarily integrated. Multi-Cloud is usually adopted to avoid provider lock-in or to use best-of-breed services. The real difference: Hybrid = on-prem + cloud integration. Multi-Cloud = cloud A + cloud B (with or without on-prem). One architecture can be both — on-prem + AWS + Azure = hybrid-multi-cloud.",
  },
  {
    question: "How exactly does Cloud Bursting work and when should you use it?",
    answer:
      "Cloud Bursting is a capacity extension pattern — normal load is handled on-prem, but during peak periods (tax season, sale events, batch jobs) additional capacity is spun up automatically in the public cloud. Implementation: low-latency connectivity between on-prem and cloud (VPN or Interconnect) + shared identity + a compatible workload format (containers or VMs). When to use it: predictable peak load that lasts for a short duration, when you want to avoid over-provisioning on-prem hardware, and when the workload is stateless or uses shared state (cloud bursting stateful applications is complex). When to avoid it: data-gravity-heavy workloads, regulatory restrictions on cloud data transfer, and latency-sensitive database tiers.",
  },
  {
    question: "What is Data Gravity and how does it affect hybrid architecture decisions?",
    answer:
      "Data Gravity = the tendency of large datasets to attract services to their location, because moving data is expensive and slow. It is more practical to move compute to where the data is. Practical impact: if a 200TB production database is on-prem, it may be sensible to keep the application layer on-prem too — for cloud bursting, move only the stateless compute layers. Data Gravity is the primary driver of workload placement in hybrid architecture. Counter-approach: move data gradually into the cloud with Cloud Storage Gateway or DataSync, then let workloads follow. Keeping it on-prem versus moving it to the cloud — this decision mostly depends on data size, egress cost and regulatory requirements.",
  },
  {
    question: "Which should you choose — VPN or Dedicated Interconnect/Direct Connect?",
    answer:
      "VPN: an encrypted IPsec tunnel over the Internet. Setup is fast (hours), cost is low, bandwidth is typically up to 1-10Gbps per tunnel, latency is variable (Internet dependent). Use when: moderate bandwidth, budget constraints, encryption requirement met by IPsec, variable latency acceptable. Dedicated Interconnect/Direct Connect: a private physical circuit via colocation. Setup takes weeks to months, higher cost, bandwidth 10-100Gbps, consistently low latency, NOT encrypted by default. Use when: high bandwidth (large data transfers), consistent latency is critical (real-time apps), compliance requires no Internet exposure. Production best practice: Dedicated/Direct primary + VPN backup. This pattern achieves a 99.99% hybrid connectivity SLA.",
  },
  {
    question: "How exactly do Active Directory and Microsoft Entra ID (Azure AD) connect in hybrid identity?",
    answer:
      "On-prem Active Directory Domain Services (AD DS) and Microsoft Entra ID (cloud identity) are synced through the Azure AD Connect tool. AD Connect syncs continuously — users, groups, passwords (hash or pass-through). When a user logs in to a cloud app: Entra ID checks the credentials. With Password Hash Sync (PHS): the hash is stored in the cloud and authentication happens in the cloud. With Pass-through Auth (PTA): the cloud authentication request is validated against on-prem AD DS via an agent. With Federation (ADFS): on-prem ADFS handles authentication. Result: an engineer can access cloud apps (Office 365, Azure portal, SaaS apps) with their on-prem Windows login credentials — no separate cloud password is needed.",
  },
  {
    question: "What exactly does Zero Trust mean in Hybrid Cloud and how do you implement it?",
    answer:
      "Traditional security model: trust the network — if you are inside via VPN, you are safe. Zero Trust: 'Never trust, always verify' — no trust comes from location; it comes from identity + device health + context. Implementation in hybrid cloud: (1) Identity verification — MFA mandatory, conditional access policies (device compliance check). (2) Microsegmentation — workload-level network isolation in both on-prem and cloud. (3) Least privilege access — just enough permissions, just in time. (4) Continuous validation — re-verify even during the session. (5) Encryption everywhere — data in transit (TLS) and at rest. Tools: Microsoft Entra ID + Conditional Access (Azure), AWS IAM + SCP + GuardDuty, BeyondCorp (GCP). Practical starting point: MFA + device compliance + privileged access workstation (PAW) — this covers 80% of attack vectors.",
  },
  {
    question: "What is the fundamental difference between Azure Arc and AWS Outposts?",
    answer:
      "Azure Arc: a software-based control plane extension — it projects the Azure management plane (ARM) onto on-prem machines, Kubernetes clusters and databases. On-prem servers are registered in Azure, managed from the Azure Portal, Azure Policy is applied, and Defender for Cloud monitors them. Physical hardware: your own. Outposts: an AWS-managed hardware rack that is installed in your data center. AWS services (EC2, EBS, EKS, RDS) run on-prem, with the same APIs and the same experience. Physical hardware: owned by AWS, maintained by AWS. Analogy: Arc = management bridge. Outposts = the AWS cloud inside your building. Choose Arc when: you need consistent management of existing on-prem hardware. Choose Outposts when: you need an identical experience of AWS services on-prem, especially for ultra-low latency AWS services.",
  },
  {
    question: "What are the most important decisions when designing disaster recovery in Hybrid Cloud?",
    answer:
      "Three core decisions: (1) Define RPO and RTO — these drive everything. RPO 15 min means near-real-time replication; RPO 24 hours means a daily backup is acceptable. (2) Decide the primary/secondary direction — on-prem primary with cloud DR? Or cloud primary with on-prem DR? Or active-active? Most orgs start with on-prem primary and cloud DR (Pilot Light or Warm Standby). (3) Decide the failover scope — the entire application stack, or only the data layer? Application-level failover requires DNS cutover + compute spinup + data promotion. Common mistakes: not testing the DR plan (quarterly runbooks are mandatory), no connectivity failover plan (VPN backup), not thinking about identity failover (AD replication to cloud). Best pattern for most enterprises: Cloud SQL read replica + VM snapshots + automated Terraform/Bicep templates for the compute layer — 30-min RTO and 5-min RPO achievable at reasonable cost.",
  },
];
