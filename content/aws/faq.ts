export const awsFaq = [
  {
    question: "AWS Region aur Availability Zone mein kya difference hai?",
    answer:
      "Region ek independent geographic location hai (e.g., ap-south-1 Mumbai). Har Region mein multiple Availability Zones (AZs) hote hain. AZ ek logically isolated failure domain hai — separate power, cooling aur connectivity — physically separated lekin low-latency distance pe. AZ ek single physical building ka guarantee nahi deta. Single AZ failure ki impact multi-AZ design mein localized hoti hai; single Region failure wide-area event hota hai.",
  },
  {
    question: "Public subnet aur private subnet ka actual difference kya hai?",
    answer:
      "Primarily routing ka difference hai — subnet-level designation IP address assignment se zyada route table pe depend karta hai. Public subnet woh subnet hai jisme route table mein Internet Gateway (IGW) ki taraf 0.0.0.0/0 route hoti hai. Private subnet mein IGW route nahi hoti — outbound Internet access ke liye NAT Gateway use hoti hai. Public IP assignment aur routing alag concepts hain; sirf public IP hone se Internet connectivity nahi milti agar route table mein IGW route absent ho.",
  },
  {
    question: "Security Group aur Network ACL mein kya fark hai?",
    answer:
      "Security Group instance-level, stateful firewall hai — ek allowed connection ki return traffic automatically permit hoti hai; sirf ALLOW rules hote hain. Network ACL subnet-level, stateless hai — inbound aur outbound dono explicitly allow karne padte hain including ephemeral return ports; ALLOW aur DENY dono rules possible hain; rules numbered order mein evaluate hote hain. Ek application Security Group pe allow kar do lekin NACL pe inbound/outbound dono check karna zaroori hai — troubleshooting mein yeh common mistake hai.",
  },
  {
    question: "NAT Gateway kya karta hai aur Internet Gateway se kaise alag hai?",
    answer:
      "Internet Gateway (IGW) public-facing resources ke liye bidirectional Internet connectivity provide karta hai — inbound aur outbound. NAT Gateway private subnet instances ko outbound Internet access deta hai bina unhe Internet se directly reachable banaye. NAT Gateway outbound-initiated traffic ke liye hai — unsolicited inbound connections Internet se private instances tak NAT Gateway ke through possible nahi hain. NAT Gateway khud public subnet mein place hota hai aur IGW ke through bahar jaata hai.",
  },
  {
    question: "EC2 stop aur terminate mein kya fark hai?",
    answer:
      "Stop: instance halt ho jaata hai, EBS volumes persist hote hain, billing stops for compute (storage billed separately). Instance restart pe different physical host pe aana possible hai — instance store data lost hota hai stop pe. Terminate: instance permanently delete hota hai; root EBS volume by default delete hota hai (configurable). Reboot: same instance restarts, same physical host pe generally, instance store data survive karta hai. Instance store aur EBS same nahi hain — instance store ephemeral hai, EBS persistent.",
  },
  {
    question: "Multi-AZ deployment automatically high availability guarantee karta hai?",
    answer:
      "Sirf infrastructure level pe nahi — application design bhi matter karta hai. Multi-AZ resources (instances, LB targets, RDS) spread karo, lekin application ko stateless ya shared state design karo. Database Multi-AZ failover DNS-based hoti hai — application ko reconnect handle karna chahiye. Auto Scaling health replacement + LB health checks + multi-AZ targets — sab milke HA banate hain. Sirf resources multiple AZs mein hona enough nahi hai agar application level pe single point of failure ho.",
  },
  {
    question: "AWS Direct Connect aur Site-to-Site VPN mein kya choose karna chahiye?",
    answer:
      "VPN: Internet ke upar IPsec tunnel, encrypted, lower cost, setup fast, latency variable. Direct Connect: dedicated private circuit, predictable latency, higher bandwidth, NOT encrypted by default — encryption ke liye separate layer (jaise IPsec) configure karna padta hai. Moderate bandwidth + acceptable latency variability + security via encryption = VPN suitable. High bandwidth + consistent latency + large data transfer = Direct Connect better. Production environments mein often Direct Connect primary + VPN as backup used hota hai.",
  },
  {
    question: "CloudWatch aur CloudTrail mein kya difference hai?",
    answer:
      "CloudWatch operational observability platform hai — metrics (CPU, network, custom), logs (application, system), alarms aur dashboards. Kya system abhi kaise perform kar raha hai? CloudTrail AWS account mein API activity audit trail hai — kaun ne kya API call kiya, kab, kahan se. Security investigation, compliance, account activity history. Dono ko mix mat karo: EC2 CPU high hone pe CloudWatch alarm use karo; unauthorized API call track karne ke liye CloudTrail use karo.",
  },
];
