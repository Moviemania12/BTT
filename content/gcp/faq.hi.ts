export const gcpFaq = [
  {
    question: "GCP Region aur Zone mein kya difference hai, aur AWS/Azure se kaise compare karta hai?",
    answer:
      "GCP Region ek geographic location hai (e.g., asia-south1 Mumbai) jisme multiple Zones hain. Zone ek isolated failure domain hai — separate power, cooling, network. AWS mein Regions ke andar Availability Zones hain (same concept). Azure mein Regions ke andar Availability Zones + Region Pairs hain. Key GCP difference: Zones typically 3 per Region, named a/b/c. GCP mein AWS jaisi 'Region Pair' concept nahi hai — engineer khud DR Region choose karta hai. Single Zone failure → only that Zone affected; Regional failure rare but possible.",
  },
  {
    question: "GCP VPC aur AWS VPC mein sabse bada architectural difference kya hai?",
    answer:
      "Sabse bada difference: GCP VPC GLOBAL hai — ek single VPC multiple Regions span karta hai automatically. AWS VPC Region-specific hota hai (ek VPC sirf ek Region). GCP mein subnets regional hain (ek subnet ek Region, lekin multiple Zones span karta hai us Region mein). AWS mein subnets AZ-specific hain. GCP mein VPC Peering ya Transit Gateway jaise complexity nahi hai sirf single-VPC multi-region connectivity ke liye — lekin agar multiple VPCs chahiye toh VPC Peering ya Shared VPC use karte hain. GCP Firewall Rules VPC level pe hain, subnet level pe nahi (unlike AWS NACLs).",
  },
  {
    question: "GCP IAM aur AWS IAM mein kya primary differences hain?",
    answer:
      "GCP IAM mein permissions Resource Hierarchy pe based hain — Organization → Folder → Project → Resource. Roles inherited hote hain downward. AWS IAM mein Accounts flat structure pe manage hote hain — Organizations SCPs add karte hain. GCP mein three role types: Basic (primitive, avoid in prod), Predefined (service-specific), Custom. GCP Service Accounts AWS IAM Roles ka equivalent hai — workloads ke liye, humans ke liye nahi. Workload Identity Federation AWS IAM Roles for Service Accounts ka equivalent hai — external workloads GCP resources access kar sakti hain bina Service Account key ke.",
  },
  {
    question: "Preemptible VMs aur Spot VMs mein GCP mein kya difference hai?",
    answer:
      "Preemptible VMs: GCP ka original low-cost option — fixed 24-hour maximum runtime, 30-second shutdown notice, Google anytime reclaim kar sakta hai. Spot VMs: Newer model — no fixed 24-hour limit (run as long as capacity available), same 30-second notice, same interruption behavior lekin potentially longer runtime. AWS Spot = 2-minute notice. GCP Spot = 30-second notice — design accordingly. Dono fault-tolerant, stateless, batch workloads ke liye suited hain. Cost savings: up to 60-91% vs on-demand. Important: application ko graceful shutdown handle karni chahiye 30 seconds mein.",
  },
  {
    question: "Cloud Interconnect aur Cloud VPN mein kya choose karna chahiye?",
    answer:
      "Cloud VPN: Internet pe IPsec tunnel, encrypted by default, lower cost, variable latency, setup fast. Dedicated Interconnect: dedicated private circuit directly to Google, NOT encrypted by default, 10Gbps or 100Gbps, predictable latency, higher cost. Partner Interconnect: lower bandwidth options (50Mbps–50Gbps) via connectivity providers — good for lower bandwidth needs. Choice: variable latency OK, moderate bandwidth → Cloud VPN. High bandwidth, consistent latency, large data transfer → Dedicated Interconnect. Medium bandwidth → Partner Interconnect. Cloud Interconnect HA configuration: dual connections different metro facilities mein for 99.99% SLA.",
  },
  {
    question: "Sustained Use Discounts aur Committed Use Discounts mein kya fark hai?",
    answer:
      "Sustained Use Discounts (SUDs): automatic, koi commitment nahi. Ek month mein VM jitna zyada run karta hai, utna discount — 25% chala toh ~0%, 100% chala toh ~30% discount. No action required. AWS aur Azure mein equivalent nahi hai — GCP unique advantage. Committed Use Discounts (CUDs): 1-year ya 3-year commitment for specific vCPU/memory — up to 57% (1yr) ya 70% (3yr). Resource-based ya spend-based dono available. AWS Reserved Instances ka equivalent. Engineering decision: predictable baseline workloads → CUDs maximize savings. Variable workloads → SUDs automatic protection. Dono combine kar sakte hain.",
  },
  {
    question: "GKE Autopilot aur Standard mode mein kya choose karna chahiye?",
    answer:
      "GKE Standard: Full control over node configuration, machine types, OS, node pools. You manage nodes (scaling, upgrades, patching optional). Useful when: specific hardware needed (GPU, high memory), custom node configs, existing K8s expertise. GKE Autopilot: Google manages nodes completely — you sirf pods deploy karo. Node provisioning, scaling, security automatic. Billing per pod (CPU/memory requested), not per node. Useful when: simplicity priority hai, variable workloads, per-pod billing beneficial. Limitation: some privileged workloads, DaemonSets restricted. For new GKE users aur most production workloads: Autopilot recommended — less operational overhead.",
  },
  {
    question: "VPC Service Controls kya hai aur kab use karna chahiye?",
    answer:
      "VPC Service Controls ek security perimeter hai jo GCP managed services (Cloud Storage, BigQuery, Cloud SQL) ke around define karta hai — data exfiltration prevent karta hai. Even if IAM allows access, VPC Service Controls perimeter ke bahar se access deny kar sakta hai. Use case: regulated industries (banking, healthcare) jahan sensitive data ko specific network boundary mein rakhna compliance requirement hai. Example: BigQuery sirf corporate VPC se accessible ho, Internet ya unknown networks se nahi — even with valid credentials. AWS mein comparable concept VPC Endpoints + S3 Bucket Policies combination se approximate hota hai lekin centralized perimeter concept GCP-specific hai.",
  },
];
