export const sdWanFaq = [
  {
    question: "SD-WAN kya replace karta hai — MPLS khatam ho jaata hai?",
    answer:
      "Nahi. SD-WAN ek overlay hai jo available transports ke upar operate karta hai. MPLS, Internet, LTE — sab underlay transports hain. SD-WAN inhe replace nahi karta, inke upar policy aur path selection layer add karta hai. MPLS abhi bhi useful hai quality-sensitive applications ke liye jahan latency predictability important hai.",
  },
  {
    question: "Tunnel up hai matlab traffic theek hai — yeh soch sahi hai?",
    answer:
      "Bilkul galat. Tunnel UP sirf establish karta hai ki SD-WAN nodes ke beech logical path exist karta hai. Latency, jitter, aur packet loss still high ho sakti hai. Application SLA fail kar sakti hai even with tunnel UP. Tunnel state aur path quality dono alag metrics hain — dono check karo.",
  },
  {
    question: "Controller down hone se kya saara traffic band ho jaata hai?",
    answer:
      "Generally nahi, lekin yeh platform pe depend karta hai. Data plane typically already distributed routing aur policy state use karke forwarding continue karta hai. Lekin management functions (new policy push, configuration changes, zero-touch provisioning, monitoring) unavailable ho jaate hain. Apne platform ka exact behavior samjho — assume mat karo.",
  },
  {
    question: "Active-active dual link matlab 50/50 traffic split hoti hai?",
    answer:
      "Nahi. Traffic distribution application policy aur path quality pe depend karta hai. Voice traffic MPLS pe ja sakti hai, web traffic Internet pe. Equal split by default nahi hoti — policy-driven hai. Actual utilization per-application policy se determine hoti hai.",
  },
  {
    question: "Brownout aur blackout mein kya difference hai?",
    answer:
      "Blackout: path completely unavailable — link down, circuit fail. Fast detect hota hai. Brownout: path technically reachable hai lekin quality degrade ho gayi hai — high latency, high jitter, ya high packet loss. Traditional routing brownout ko 'link up' maanta hai aur traffic bhejta rehta hai. SD-WAN path quality continuously measure karta hai aur brownout detect hone pe traffic steer kar sakta hai.",
  },
  {
    question: "SD-WAN Firewall replace karta hai?",
    answer:
      "Automatically nahi. SD-WAN networking features provide karta hai — path selection, overlay, traffic steering. Security ke liye dedicated NGFW ya integrated security platform chahiye. Kuch vendors integrated SD-WAN + security platforms offer karte hain, lekin yeh ek deliberate architectural choice hai, default assumption nahi.",
  },
  {
    question: "Failover kitni fast hoti hai aur sessions survive karte hain?",
    answer:
      "Failover speed detection time + switchover time pe depend karti hai — probe interval, failure type, aur hold timers sab matter karte hain. Physical link failure quality degradation se faster detect ho sakti hai, lekin detection failure type, probe configuration, timers aur platform behavior pe depend karti hai. Session continuity guaranteed nahi hai — kuch TCP sessions may reset during path change. Platform capabilities aur application type dono matter karte hain.",
  },
  {
    question: "Direct Internet Access (DIA) ka matlab sabke liye better hai?",
    answer:
      "Har situation ke liye nahi. DIA SaaS aur cloud applications ke liye latency reduce karta hai aur DC backhaul cost bachaata hai. Lekin security controls necessary hain locally — branch-level Firewall ya cloud-delivered security. Private/sensitive traffic ko still DC ke through route karna ho sakta hai. Security posture aur application requirements architecture decide karte hain.",
  },
];
