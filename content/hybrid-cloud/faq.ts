export const hybridCloudFaq = [
  {
    question: "Hybrid Cloud aur Multi-Cloud mein kya actual difference hai?",
    answer:
      "Hybrid Cloud ka matlab hai on-premises infrastructure aur public cloud ka ek coordinated, integrated architecture — dono milke ek system ki tarah kaam karte hain. Data freely move kar sakta hai, workloads shift ho sakte hain, identity ek shared plane se manage hoti hai. Multi-Cloud matlab hai multiple public cloud providers simultaneously use karna (AWS + Azure, ya AWS + GCP) — lekin necessarily integrated nahi. Multi-Cloud usually provider lock-in se bachne ya best-of-breed services ke liye hota hai. Real difference: Hybrid = on-prem + cloud integration. Multi-Cloud = cloud A + cloud B (with or without on-prem). Ek architecture dono ho sakti hai — on-prem + AWS + Azure = hybrid-multi-cloud.",
  },
  {
    question: "Cloud Bursting exactly kaise kaam karta hai aur kab use karna chahiye?",
    answer:
      "Cloud Bursting ek capacity extension pattern hai — normal load on-prem handle hoti hai, lekin peak periods mein (tax season, sale events, batch jobs) additional capacity public cloud pe automatically spin up hoti hai. Implementation: on-prem aur cloud ke beech low-latency connectivity (VPN ya Interconnect) + shared identity + compatible workload format (containers ya VMs). Kab use karo: predictable peak load jo short duration ke liye hoti hai, on-prem hardware over-provisioning avoid karna ho, workload stateless ya shared state ho (stateful applications cloud burst karna complex hai). Kab avoid karo: data gravity heavy workloads, regulatory restrictions pe cloud data transfer, latency-sensitive database tier.",
  },
  {
    question: "Data Gravity kya hai aur yeh hybrid architecture decisions ko kaise affect karta hai?",
    answer:
      "Data Gravity = large datasets ka tendency ki wo apni location pe services attract karte hain, kyunki data move karna expensive aur slow hai. Jahan data hai, wahan compute move karna zyada practical hai. Practical impact: agar 200TB production database on-prem hai, toh application layer bhi on-prem rakhna sensible ho sakta hai — cloud bursting ke liye sirf stateless compute layers move karo. Data Gravity hybrid architecture mein primary driver hota hai workload placement ka. Counter-approach: Cloud Storage Gateway ya DataSync se data gradually cloud mein move karo, phir workloads follow karein. On-prem pe rakhna versus cloud mein move karna — yeh decision mostly data size, egress cost aur regulatory requirements pe depend karta hai.",
  },
  {
    question: "VPN aur Dedicated Interconnect/Direct Connect mein kya choose karna chahiye?",
    answer:
      "VPN: Internet pe encrypted IPsec tunnel. Setup fast (hours), cost low, bandwidth typically up to 1-10Gbps per tunnel, latency variable (Internet dependent). Use when: moderate bandwidth, budget constraints, encrypted requirement met by IPsec, variable latency acceptable. Dedicated Interconnect/Direct Connect: private physical circuit via colocation. Setup weeks-months, higher cost, bandwidth 10-100Gbps, consistent low latency, NOT encrypted by default. Use when: high bandwidth (large data transfers), consistent latency critical (real-time apps), compliance requires no Internet exposure. Production best practice: Dedicated/Direct primary + VPN backup. Yeh patten 99.99% hybrid connectivity SLA achieve karta hai.",
  },
  {
    question: "Active Directory aur Microsoft Entra ID (Azure AD) hybrid identity mein exactly kaise connect hoti hain?",
    answer:
      "On-prem Active Directory Domain Services (AD DS) aur Microsoft Entra ID (cloud identity) sync hoti hain Azure AD Connect tool ke through. AD Connect continuously sync karta hai — users, groups, passwords (hash ya pass-through). Jab user cloud app login kare toh: Entra ID credential check karta hai. Password Hash Sync (PHS) mein: hash cloud mein stored hai, authentication cloud pe hoti hai. Pass-through Auth (PTA) mein: cloud authentication request on-prem AD DS pe validate hoti hai via agent. Federation (ADFS) mein: on-prem ADFS handles authentication. Result: engineer on-prem Windows login credentials se cloud apps (Office 365, Azure portal, SaaS apps) access kar sakta hai — alag cloud password nahi chahiye.",
  },
  {
    question: "Hybrid Cloud mein Zero Trust exactly kya mean karta hai aur implement kaise karo?",
    answer:
      "Traditional security model: network pe trust karo — VPN se andar ho toh safe ho. Zero Trust: 'Never trust, always verify' — location se koi trust nahi milta, identity + device health + context se milti hai. Hybrid cloud mein implementation: (1) Identity verification — MFA mandatory, conditional access policies (device compliance check). (2) Microsegmentation — on-prem aur cloud dono mein workload-level network isolation. (3) Least privilege access — just enough permissions, just in time. (4) Continuous validation — session ke dauran bhi re-verify. (5) Encryption everywhere — data in transit (TLS) aur at rest. Tools: Microsoft Entra ID + Conditional Access (Azure), AWS IAM + SCP + GuardDuty, BeyondCorp (GCP). Practical starting point: MFA + device compliance + privileged access workstation (PAW) — yeh 80% attack vectors cover karta hai.",
  },
  {
    question: "Azure Arc aur AWS Outposts mein kya fundamental difference hai?",
    answer:
      "Azure Arc: software-based control plane extension — Azure management plane (ARM) on-prem machines, Kubernetes clusters, databases pe project karo. On-prem servers Azure pe registered hote hain, Azure Portal se manage hote hain, Azure Policy apply hoti hai, Defender for Cloud monitors karta hai. Physical hardware: tumhara hi. Outposts: AWS managed hardware rack jo tumhare data center mein install hota hai. AWS services (EC2, EBS, EKS, RDS) on-prem run karte hain, same APIs same experience. Physical hardware: AWS ka, AWS maintain karta hai. Analogy: Arc = management bridge. Outposts = AWS cloud tumhare building mein. Choose Arc jab: existing on-prem hardware consistent management chahiye. Choose Outposts jab: AWS services on-prem pe identical experience chahiye, especially ultra-low latency AWS services ke liye.",
  },
  {
    question: "Hybrid Cloud mein disaster recovery design karte waqt sabse important decisions kya hain?",
    answer:
      "Teen core decisions: (1) RPO aur RTO define karo — yeh everything drive karte hain. RPO 15 min means near-real-time replication; RPO 24 hours means daily backup acceptable. (2) Primary/secondary direction decide karo — on-prem primary, cloud DR? Ya cloud primary, on-prem DR? Ya active-active? Most orgs on-prem primary, cloud DR (Pilot Light ya Warm Standby) se shuru karte hain. (3) Failover scope decide karo — entire application stack, ya sirf data layer? Application-level failover requires DNS cutover + compute spinup + data promotion. Common mistakes: DR plan test nahi karte (quarterly runbooks mandatory), connectivity failover plan nahi hoti (VPN backup), identity failover nahi sochte (AD replication to cloud). Best pattern for most enterprises: Cloud SQL read replica + VM snapshots + automated Terraform/Bicep templates for compute layer — 30-min RTO, 5-min RPO achievable at reasonable cost.",
  },
];
