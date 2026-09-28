import type { FaqItem } from "@/lib/schemas";

export const aiCoolingFaq: FaqItem[] = [
  {
    question: "AI data centers mein cooling itni critical kyun hai — normal servers se kya alag hai?",
    answer:
      "Normal enterprise servers typically 1–3 kW per rack unit consume karte hain, aur ek standard 42U rack mein 10–20 kW total power hoti hai. AI GPU servers fundamentally alag hain. Ek NVIDIA DGX H100 server alone approximately 10.2 kW consume karta hai — yani ek single server ek puri enterprise rack ke barabar. Jab 4–8 aisi servers ek rack mein hoti hain, rack power density 40–80+ kW ho jaati hai. Newer platforms jaise GB200 NVL72 to 100+ kW per rack tak pahonch sakte hain. Yeh itni heat generate karte hain ki traditional CRAC/CRAH air cooling systems physically is density ko handle nahi kar sakte — air mein itni heat absorb karne ki capacity hi nahi hoti. Isliye liquid cooling mandatory ban jaata hai — pani ki heat capacity air se approximately 3500 guna zyada hoti hai.",
  },
  {
    question: "Direct Liquid Cooling (DLC) aur Immersion Cooling mein kya fundamental difference hai?",
    answer:
      "Direct Liquid Cooling (DLC) mein coolant server ke andar specific heat-generating components (primarily GPU chips) pe lage cold plates ke through flow karta hai. Server ka baaki structure normal rehta hai — fans bhi ho sakte hain supplementary ke liye. Coolant GPU chip ke directly upar se guzarta hai, heat absorb karta hai, aur CDU (Cooling Distribution Unit) wapas jaata hai. Immersion Cooling mein poora server — ya poora circuit board — ek dielectric fluid (insulating liquid) mein physically submerge kar diya jaata hai. Fluid directly PCBs, chips, memory sab se contact karta hai aur heat absorb karta hai. DLC more targeted approach hai aur existing infrastructure ke saath compatible rehta hai. Immersion more aggressive approach hai jo potentially higher densities handle kar sakta hai lekin significant operational changes require karta hai.",
  },
  {
    question: "PUE kya hota hai aur AI data centers mein good PUE kya maana jaata hai?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. Ek ideal PUE 1.0 hoga (sirf IT equipment use ho, koi overhead nahi) — yeh practically impossible hai. Traditional air-cooled data centers ka PUE 1.4–1.8 range mein hota tha. Modern efficient facilities 1.2–1.3 achieve karte hain. AI data centers aur liquid cooling ke saath 1.1–1.2 possible hai kyunki cooling ki thermal efficiency better hoti hai. Lekin yeh important hai: PUE sirf ek metric hai. Bahut low PUE necessarily zyada efficient data center guarantee nahi karta — context matter karta hai. Ek warm climate mein facility ka PUE naturally higher hoga (zyada cooling energy). Aur PUE IT utilization capture nahi karta — agar GPUs idle hain toh PUE accha dikhe par efficiency poor hai. PUE ko GPU utilization aur training throughput ke saath milake judge karo.",
  },
  {
    question: "CDU kya hai aur AI cooling architecture mein iska kya role hai?",
    answer:
      "CDU (Cooling Distribution Unit) AI data center liquid cooling architecture ka central component hai. CDU ek heat exchanger hai jo facility cooling water (building chiller se aata hai) aur IT equipment ke liye dedicated secondary liquid loop ke beech thermal interface provide karta hai. Yeh dono loops ko physically separate rakhta hai — facility water IT equipment se directly contact nahi karta. Kyun separate? Kyunki facility water mein treatment chemicals, corrosion inhibitors, aur other contaminants ho sakte hain jo sensitive IT equipment ko damage kar sakte hain. CDU secondary loop mein cooled dielectric fluid ya treated water circulate karta hai, jo GPU cold plates tak jaata hai, heat absorb karta hai, wapas CDU aata hai, CDU facility water se cool karta hai, aur cycle repeat hota hai. CDU typically per-rack ya per-cluster deploy hota hai.",
  },
  {
    question: "Single-phase aur two-phase immersion cooling mein kya difference hai?",
    answer:
      "Single-phase immersion cooling mein dielectric fluid liquid state mein rehta hai — woh kabhi boil nahi hoti. Fluid warm hoti hai components se heat absorb karke, CDU ya external heat exchanger wapas jaati hai cool hone ke liye. Simple, well-understood process. Two-phase immersion cooling mein dielectric fluid boil hoti hai — yeh deliberate hai. Components itne hot hote hain ki fluid ka boiling point reach ho jaata hai, fluid vaporize hoti hai, vapors tank ke upar condensers pe collect hote hain, condense ho jaate hain (liquid mein convert), aur wapas components pe drip karte hain — cycle. Two-phase mein heat transfer efficiency bahut high hoti hai (phase change latent heat) lekin fluid selection, vapor management, aur pressure control more complex hai. Two-phase fluids typically specialty fluorocarbon compounds hote hain jo expensive hain aur environmental concerns raise karte hain (GWP — Global Warming Potential).",
  },
  {
    question: "GPU thermal throttling kya hai aur yeh AI training pe kaise affect karta hai?",
    answer:
      "GPUs mein built-in thermal protection mechanism hoti hai. Jab GPU temperature ek configured threshold cross karta hai — typically GPU manufacturer ke specified thermal limits ke pass pahonchte hue — GPU automatically apni clock speed reduce kar leta hai. Yeh thermal throttling hai. Throttling mein GPU slower speed pe compute karta hai — effective compute performance drops. AI training mein yeh directly training throughput mein dikhta hai: tokens/second ya samples/second kam ho jaata hai. Problem yeh hai ki throttling silently hoti hai — GPU 'running' dikh raha hai, utilization high dikh raha hai, lekin actual performance degraded hai. Monitoring mein GPU clock speed aur temperature simultaneously track karna zaruri hai. Agar cooling inadequate hai, throttling continuous hogi — expensive hardware apni full capability deliver nahi karegi. Proper cooling directly AI training ROI affect karta hai.",
  },
  {
    question: "Kya existing air-cooled data center mein AI servers deploy kiye ja sakte hain?",
    answer:
      "Technically possible hai lekin significant limitations ke saath. Existing air-cooled facilities typically 10–20 kW per rack design ke liye hote hain. Modern AI GPU servers (jaise DGX H100 ~10.2 kW per server) aur multiple servers per rack ke saath density 40–80+ kW easily ho sakti hai. Agar existing cooling infrastructure is density support nahi karta, toh: GPU throttling hogi (performance degradation), equipment lifespan reduce ho sakta hai, ya worst case equipment failure bhi possible hai. Partial solutions exist karte hain: rear-door heat exchangers add karo (existing air cooling augment karte hain), zyada CRAC/CRAH units add karo, ya selective lower-density deployment (fewer GPUs per rack). Lekin high-density modern AI platforms ke liye greenfield liquid-cooled facilities ya significant retrofit often necessary hoti hai. Pehle existing facility ka cooling capacity audit karo, phir AI hardware select karo.",
  },
  {
    question: "WUE metric kya hai aur PUE se kaise alag hai?",
    answer:
      "WUE (Water Usage Effectiveness) = Annual Water Usage (liters) / IT Equipment Energy (kWh). Yeh metric data center ke water consumption efficiency measure karta hai. PUE energy efficiency measure karta hai (power ratio). WUE water efficiency measure karta hai. Kyun important hai? Cooling towers (evaporative cooling) significant water consume karte hain — water evaporation se heat reject hoti hai. Arid regions ya water-scarce areas mein yeh concern hai. Liquid cooling ke saath WUE change ho sakta hai: agar cooling tower ki jaroorat kam ho (mechanical refrigeration ya dry cooler use ho) toh WUE improve ho sakta hai. Lekin liquid cooling ke secondary loop ke liye bhi water/fluid management hoti hai. AI data centers ke liye dono metrics track karna chahiye — sirf PUE optimize karne se WUE worse ho sakta hai (e.g., zyada evaporative cooling use karna).",
  },
  {
    question: "Liquid cooling mein leak detection kyun critical hai aur kaise implement hoti hai?",
    answer:
      "Liquid coolant aur electronics ka combination catastrophic failure cause kar sakta hai — short circuits, corrosion, aur permanent hardware damage. AI servers mein millions of dollars ke GPUs hote hain — ek significant leak training jobs disrupt kar sakta hai aur expensive hardware destroy kar sakta hai. Leak detection multiple levels pe implement hoti hai: Sensor-based detection — moisture sensors ya liquid detection cables CDU, manifold connections, aur rack level pe deploy kiye jaate hain; yeh electrical conductivity change detect karte hain jab liquid present hoti hai. Pressure monitoring — closed loop mein pressure drop leak indicate karta hai. Flow rate monitoring — agar flow rate unexpectedly change ho toh issue possible hai. Visual inspection ports — regularly accessible areas pe visual checks. Automatic shutoff — kuch systems mein leak detect hone pe automatic valve closure hoti hai coolant flow band karne ke liye. Leak detection response time matter karta hai — faster detection = less damage.",
  },
  {
    question: "Hot aisle/cold aisle containment AI cooling mein kab sufficient hai?",
    answer:
      "Hot aisle/cold aisle containment air cooling optimization technique hai — yeh cooling capacity increase nahi karta, sirf existing capacity ko zyada effectively use karta hai. Containment se bypass airflow reduce hoti hai, cold air directly servers tak pahonchti hai, aur hot exhaust directly back to cooling units. Lekin yeh fundamentally air cooling hai — aur air cooling ki physics limits hain. Containment AI racks ke liye sufficient hai sirf tab jab: Rack power density manageable range mein ho (facility ke cooling design ke mutabik, typically below ~25–30 kW per rack for air cooling, though exact limits depend on facility design), aur cooling units enough capacity rakhein. Agar AI rack density in limits se exceed kare, containment alone kaam nahi karega — liquid cooling augmentation ya replacement necessary hogi. Containment air-cooled facility mein AI servers deploy karte waqt efficiency maximize karne ke liye zaruri hai lekin yeh physical cooling capacity ki limit nahi badhaata.",
  },
];
