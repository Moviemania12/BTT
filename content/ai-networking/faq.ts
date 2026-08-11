import type { FaqItem } from "@/lib/schemas";

export const aiNetworkingFaq: FaqItem[] = [
  {
    question: "AI Networking kya hai aur yeh normal enterprise networking se kyun alag hai?",
    answer:
      "AI Networking un network technologies, topologies aur protocols ka collection hai jo AI data centers mein GPU servers ke beech high-bandwidth, low-latency communication enable karte hain. Normal enterprise networking mainly North-South traffic (client se server) ke liye design hoti hai — email, file sharing, web browsing. AI training clusters mein traffic pattern fundamentally alag hai: hundreds ya thousands of GPU servers simultaneously ek doosre se gradients exchange karte hain (East-West traffic). Yeh communication har training step pe hoti hai aur agar network slow ya congested ho, toh GPUs compute karne ki jagah network ka wait karte hain — expensive hardware idle rehti hai. Yahi reason hai ki AI networking mein high aggregate bandwidth, low latency, aur efficient congestion management ki zaroorat hoti hai jo conventional enterprise switching typically provide nahi karti.",
  },
  {
    question: "RDMA kya hai aur kya RDMA InfiniBand ka synonym hai?",
    answer:
      "RDMA (Remote Direct Memory Access) ek communication technology/mechanism hai jisme ek machine doosri machine ki memory mein directly read/write kar sakti hai bina doosri machine ke CPU ya operating system ko involve kiye. Yeh CPU overhead dramatically reduce karta hai aur latency improve karta hai. RDMA InfiniBand ka synonym NAHI hai. RDMA ek concept/mechanism hai; InfiniBand ek specific networking fabric/technology hai jo RDMA natively support karta hai. RDMA Ethernet pe bhi implement ho sakta hai — specifically RoCE (RDMA over Converged Ethernet) ke through. To summarize: InfiniBand always RDMA use karta hai, lekin RDMA sirf InfiniBand tak limited nahi hai.",
  },
  {
    question: "RoCE kya hai aur RoCEv1 aur RoCEv2 mein kya difference hai?",
    answer:
      "RoCE (RDMA over Converged Ethernet) ek technology hai jo standard Ethernet infrastructure pe RDMA capabilities provide karta hai. RoCEv1 Layer-2 Ethernet pe operate karta hai — yeh non-routable hai, sirf same broadcast domain ke devices se communicate kar sakta hai. RoCEv2 UDP/IP encapsulation use karta hai aur Layer-3 routable hai — yeh different subnets aur larger, routed networks pe kaam kar sakta hai. RoCEv2 practically zyada deployed hai kyunki yeh modern leaf-spine data center topologies ke saath better integrate hota hai. Dono ke liye lossless networking important hai — congestion control ke liye ECN (Explicit Congestion Notification) aur PFC (Priority Flow Control) commonly use hote hain, lekin inhe carefully design karna hota hai.",
  },
  {
    question: "NVLink aur InfiniBand mein kya fundamental difference hai?",
    answer:
      "NVLink aur InfiniBand bilkul alag technologies hain aur alag purposes ke liye hain. NVLink NVIDIA ka proprietary GPU interconnect technology hai — yeh ek server ke andar (intra-node) GPUs ko directly connect karta hai, extremely high bandwidth pe. NVLink data center network nahi hai; yeh sirf NVIDIA ke supported GPU platforms mein available hai. InfiniBand ek high-performance data center networking fabric hai — yeh alag servers (inter-node) ko connect karta hai. ek GPU server typically dono use karta hai: NVLink apne GPUs ko internally connect karne ke liye, aur InfiniBand (ya RoCE Ethernet) doosre servers se connect hone ke liye.",
  },
  {
    question: "PFC kya hai aur kya yeh puri Ethernet network ko 'lossless' bana deta hai?",
    answer:
      "PFC (Priority Flow Control) IEEE 802.1Qbb standard hai jo Ethernet mein per-priority pause mechanism provide karta hai. Jab ek switch port buffer almost full hone lagta hai, woh upstream sender ko pause frame bhejta hai taaki woh specific traffic priority ke liye temporarily ruk jaye — isse packet drop avoid hota hai. LEKIN PFC poori Ethernet network ko universally 'lossless' nahi banata. PFC sirf ek specific priority class ke liye directly connected ports ke beech kaam karta hai. PFC ke saath serious risks hain: Head-of-Line Blocking (ek stuck flow doosre flows ko bhi pause kar sakta hai), Congestion Propagation (pause cascade ho sakta hai network mein), aur PFC Storms (loops mein traffic indefinitely pause ho sakta hai). Yahi reason hai ki PFC ko careful design, proper topology aur complementary ECN ke saath use karna chahiye.",
  },
  {
    question: "ECN kya hai aur PFC se kaise alag hai?",
    answer:
      "ECN (Explicit Congestion Notification) ek IP-level mechanism hai jisme congested switch packet ko drop karne ki jagah packet header mein ek congestion marker set karta hai. Receiver yeh marker dekh ke sender ko CNP (Congestion Notification Packet) bhejta hai, aur sender apni transmission rate reduce kar leta hai. ECN aur PFC dono alag mechanisms hain: PFC traffic ko physically pause karta hai (stop-and-go), ECN rate reduction trigger karta hai (smoother). ECN khud packet loss guarantee nahi karta — yeh congestion signal karta hai taaki senders rate adjust kar sakein. Ideal RoCE deployment mein dono ka combination use hota hai: ECN rate-based control ke liye aur PFC last-resort protection ke liye.",
  },
  {
    question: "NCCL kya hai aur kya yeh ek network hai?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) ek software library hai — yeh physical network ya fabric NAHI hai. NCCL distributed AI training mein GPU-to-GPU collective communication operations (AllReduce, AllGather, ReduceScatter, Broadcast, All-to-All) implement karta hai. PyTorch ya TensorFlow jaise frameworks NCCL ko internally use karte hain. NCCL topology-aware hai — woh automatically detect karta hai ki GPUs ek hi server pe hain (NVLink use karega) ya alag servers pe (network fabric use karega). Agar network bottleneck hai, NCCL operations slow honge — isliye NCCL performance issues asal mein network issues ki symptom ho sakte hain.",
  },
  {
    question: "AI training mein GPUs kyun idle rehte hain aur network ka isse kya connection hai?",
    answer:
      "Distributed AI training mein, har training step ke baad sab GPUs ko apne gradients sync karne hote hain — typically AllReduce operation ke through. Agar network bandwidth insufficient hai ya congestion hai, toh fast GPUs computation complete kar ke wait karte hain jab tak network sync operation complete na ho. Is GPU idle time ko 'communication overhead' ya informally 'GPU starvation' kehte hain (though storage starvation se distinguish karna chahiye). Network latency bhi matter karta hai: agar har sync operation slow hai, toh across thousands of training steps yeh accumulated delay training throughput dramatically reduce kar sakta hai. GPU idle time profiling (NVIDIA DCGM, nsight tools) se identify karo ki GPU actually compute kar raha hai ya network ka wait kar raha hai.",
  },
  {
    question: "Kya Ethernet AI clusters ke liye suitable hai ya sirf InfiniBand kaam karta hai?",
    answer:
      "Ethernet AI clusters ke liye bilkul suitable hai — yeh ek common misconception hai ki AI ke liye sirf InfiniBand kaam karta hai. Modern high-speed Ethernet (100/200/400 GbE) aur RoCEv2 ke combination se large-scale AI training successfully run hoti hai. Kai hyperscalers (Meta, Google, Microsoft) apne large AI clusters mein primarily Ethernet-based networking use karte hain. Ethernet ka advantage hai: broad ecosystem, lower cost per port, flexible routing. Challenge hai: RDMA ke liye RoCE configuration, lossless networking ke liye PFC/ECN tuning, aur congestion management additional complexity add karte hain. InfiniBand apne native RDMA support aur traditionally excellent latency ke liye preferred hai lekin mandatory nahi hai. Choice depend karta hai workload, scale, existing expertise aur budget pe.",
  },
  {
    question: "AllReduce kya hai aur AI training mein kyun critical hai?",
    answer:
      "AllReduce ek collective communication operation hai jisme participating sab nodes apna data contribute karte hain, ek mathematical reduction operation (typically sum ya average) apply hoti hai, aur sab nodes result receive karte hain. AI training mein yeh har step pe hota hai: N GPU nodes pe model train ho raha hai, har node apne data batch pe gradients compute karta hai, phir AllReduce se sab GPUs ke gradients average hote hain aur sab nodes same updated gradient receive karte hain. Isse ensure hota hai ki sab GPU nodes synchronized rehein aur model consistently update ho. Jab GPU count badh ta hai, AllReduce ka data volume bhi badh ta hai — ek 10-billion parameter model ka gradient update gigabytes of data transfer kar sakta hai per step. Network bandwidth aur latency directly AllReduce efficiency affect karte hain aur isliye AI training throughput determine karte hain.",
  },
  {
    question: "Leaf-Spine topology AI clusters ke liye kyun preferred hai?",
    answer:
      "Leaf-Spine (ya Clos) topology AI clusters ke liye preferred hai kyunki yeh consistent, predictable East-West bandwidth provide karta hai. Is topology mein: Leaf switches directly GPU servers se connect hote hain, Spine switches Leaf switches ko interconnect karte hain, aur har Leaf switch har Spine switch se connected hota hai (multiple paths). Benefits: ECMP (Equal-Cost Multi-Path) se traffic multiple paths pe distribute hoti hai, koi single bottleneck point nahi hota, fabric scale-out karna easy hai (aur Leaf aur Spine dono add kar sakte hain), aur failure domains well-defined hain. Traditional hierarchical (Core-Distribution-Access) networking mein uplinks often oversubscribed hote hain — jo AI AllReduce traffic ke liye problematic hai. Leaf-Spine oversubscription ratio ko much better control deta hai.",
  },
  {
    question: "MTU aur Jumbo Frames AI networking mein kyun matter karte hain?",
    answer:
      "MTU (Maximum Transmission Unit) maximum packet/frame size define karta hai. Standard Ethernet MTU 1500 bytes hai. Jumbo Frames typically 9000 bytes (9K MTU) tak ke frames allow karte hain. AI/RDMA workloads ke liye larger MTU beneficial ho sakta hai kyunki: large data transfers fewer but bigger packets mein ho sakte hain, per-packet overhead (headers, processing) proportionally kam hoti hai, aur throughput improve ho sakti hai large sequential transfers ke liye. LEKIN Jumbo Frames universally mandatory NAHI hain. Critical requirement yeh hai ki MTU end-to-end consistent honi chahiye — agar ek switch ya server 1500 MTU pe configure hai aur doosra 9000 MTU pe, toh fragmentation ya packet drops ho sakte hain. MTU mismatch ek common source of mysterious connectivity problems aur performance issues hai AI clusters mein.",
  },
];
