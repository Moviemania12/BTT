export const multiCloudFaq = [
  {
    question: "Multi-Cloud aur Hybrid Cloud mein kya fundamental difference hai?",
    answer:
      "Multi-Cloud = multiple public cloud providers simultaneously (AWS + Azure, AWS + GCP, ya teeno). On-premises infrastructure optional — focus is on using multiple public clouds. Hybrid Cloud = on-premises infrastructure + at least one public cloud, tightly integrated. On-prem is the defining characteristic of hybrid. Practically: ek company AWS pe workloads run kare, Azure pe M365/AD, GCP pe analytics — yeh multi-cloud hai even bina on-prem ke. Same company agar on-prem data center bhi run kare toh hybrid-multi-cloud. Multi-cloud engineering challenge: cross-cloud connectivity, unified identity, consistent governance. Hybrid engineering challenge: on-prem to cloud connectivity, legacy application integration.",
  },
  {
    question: "Multi-Cloud adopt karne ka sabse strong business case kya hai?",
    answer:
      "Teen strongest business cases: (1) Vendor lock-in avoidance — ek provider pe 100% dependent rehne se negotiating power kho jaati hai, exit cost high hoti hai. Large enterprises deliberately 2 providers maintain karte hain leverage ke liye. (2) Best-of-breed services — AWS database services mature hain, Azure AD/M365 integration best hai, GCP BigQuery/AI/ML unmatched hai. Different workloads different providers pe optimally run karte hain. (3) Regulatory/geographic requirements — kuch geographies mein ek specific provider ki region available nahi, ya regulator specific provider pe ho sakta hai. Real example: Indian BFSI company RBI ke liye India region (AWS Mumbai) primary, EU GDPR ke liye Azure West Europe, ML workloads GCP pe — teeno providers ek architecture mein.",
  },
  {
    question: "Cross-cloud networking kaise kaam karta hai — kya providers ka directly connect hota hai?",
    answer:
      "Cloud providers directly interconnected nahi hain by default — traffic public Internet se guzarta hai agar explicitly connected nahi karo. Cross-cloud connectivity ke options: (1) Site-to-Site VPN — AWS VGW ↔ Azure VPN Gateway, ya AWS ↔ GCP HA VPN. Encrypted, Internet pe, variable latency, lower cost. (2) SD-WAN overlay — cross-cloud private fabric (Megaport, Equinix Fabric). Traffic cloud backbone ya private exchanges pe. Better performance, higher cost. (3) Colocation fabric — AWS Direct Connect + Azure ExpressRoute + GCP Interconnect same colo facility mein terminate karo, cross-connect (patch cable) se providers ko connect karo — minimal latency, maximum control, maximum cost. Production recommendation: SD-WAN overlay ya colocation cross-connect for production cross-cloud traffic. VPN for dev/test ya low-bandwidth scenarios.",
  },
  {
    question: "Multi-Cloud mein Kubernetes federation kaise manage karte hain?",
    answer:
      "Multi-cluster Kubernetes management ke primary approaches: (1) Anthos (GCP) — AWS/Azure/on-prem pe bhi GKE-style managed clusters. Unified policy, service mesh, config management. GCP-centric lekin genuinely multi-cloud. (2) Red Hat OpenShift — vendor-neutral, runs on AWS (ROSA), Azure (ARO), GCP, on-prem. Advanced Cluster Management (RHACM) multiple clusters manage karta hai. (3) Rancher — open-source, multi-cloud multi-cluster management. Downstream clusters: EKS, AKS, GKE ya custom. (4) Cluster API — K8s-native cluster lifecycle management. Cross-cloud consistency. (5) ArgoCD + ApplicationSets — GitOps se multiple clusters pe consistent deployment. Selection: existing GCP investment → Anthos. OpenShift already hai → RHACM. Vendor-neutral preference → Rancher ya Cluster API.",
  },
  {
    question: "Multi-Cloud mein federated identity kaise implement karo — ek login sab clouds pe?",
    answer:
      "Central Identity Provider (IdP) establish karo — sab cloud providers us IdP se federate karte hain. Dono primary approaches: (1) Microsoft Entra ID as central IdP — AWS IAM Identity Center SAML federation se Entra ID se, GCP Cloud Identity SAML se Entra ID se. Engineers ek Microsoft login se AWS Console + GCP Console + Azure Portal access karte hain. Best for Microsoft-heavy orgs. (2) Okta/Ping as neutral IdP — vendor-neutral, all three clouds SAML/OIDC se connect hote hain. Large enterprises ke liye preferred (avoids Microsoft dependency for identity). IAM mapping important: Entra ID groups → AWS IAM roles (via Permission Sets in Identity Center). GCP IAM roles mapped via group membership. Consistent naming: AWS PowerUserAccess = Azure Contributor = GCP Editor — map these carefully.",
  },
  {
    question: "Multi-Cloud mein secret management kaise karo — alag-alag KMS systems hain?",
    answer:
      "Har cloud ka apna KMS hai — AWS KMS, Azure Key Vault, GCP Cloud KMS — aur yeh interoperable nahi hain. Cross-cloud secret management ke options: (1) HashiCorp Vault — cloud-agnostic, on-prem ya cloud-hosted. Sab clouds se secrets fetch karte hain ek consistent API se. Dynamic secrets: AWS credentials on-demand generate karta hai, automatically expire. Best for multi-cloud consistency. (2) Provider-native + sync — AWS Secrets Manager → Azure Key Vault sync (custom Lambda/Function ya third-party). Complexity aur drift risk. (3) External Secrets Operator (Kubernetes) — K8s pe secrets cloud provider se pull karo, consistent Kubernetes Secret object banao. Recommendation: HashiCorp Vault enterprise multi-cloud ke liye. Cloud-native tools agar single-primary-cloud-with-secondary architecture hai.",
  },
  {
    question: "Multi-Cloud FinOps — cost visibility aur chargeback kaise implement karo?",
    answer:
      "Multi-cloud mein cost management single cloud se 3x complex hai — teen billing systems, alag cost models, alag pricing terminology. Steps: (1) Tagging standardization — same tag schema enforce karo all providers pe (environment, team, application, cost-center). AWS SCPs, Azure Policy, GCP Org Policies pe mandatory tag rules enforce karo. (2) Unified cost aggregation — CloudHealth by VMware, Apptio Cloudability, Spot.io, ya Kubecost (for K8s). Yeh tools teeno clouds ka cost ek dashboard pe dikhate hain. (3) Showback pehle — business units ko unka cross-cloud spend dikhao (report only). Awareness badhta hai. (4) Chargeback baad mein — actual billing per business unit. Internal billing system + cross-cloud cost allocation. (5) Reserved capacity optimization — AWS RIs + Azure RVMs + GCP CUDs independently manage karo. Unified tools recommendation across all three. Common mistake: ek cloud optimize karo doosre ignore karo — total spend worse ho jaata hai.",
  },
  {
    question: "Multi-Cloud disaster recovery mein sabse complex part kya hai?",
    answer:
      "Data consistency aur split-brain ek active-active multi-cloud DR mein sabse complex challenge hai. Agar AWS us-east-1 pe primary database hai aur Azure West Europe pe DR replica — failover ke time pe: (1) DNS cutover: TTL pre-lower karna mandatory. High TTL ke saath failover hours tak stuck rehta hai. (2) Database promotion: read replica ko standalone promote karo — irreversible step agar primary simultaneously recover ho raha ho. Split-brain risk. (3) Application consistency: stateful sessions, cache, message queues — sab invalidate ho sakte hain. (4) Cross-cloud replication lag: AWS RDS → Azure SQL replication native nahi hai — third-party tools (Attunity, Striim, pglogical) needed. Lag monitoring mandatory. Recommendation: Multi-cloud DR ke liye DNS failover + read replica promotion pattern sabse tested hai. Active-active multi-cloud database globally distributed (CockroachDB, Spanner) use karo agar budget allows — yeh split-brain problem eliminate karta hai.",
  },
];
