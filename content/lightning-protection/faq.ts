export interface FaqEntry { question: string; answer: string; }

export const lightningProtectionFaq: FaqEntry[] = [
  {
    question: "Lightning Protection aur Earthing mein kya fark hai?",
    answer:
      "Earthing general purpose fault current path hai — normal electrical faults ke liye designed. Lightning Protection specifically bahut high current (tens of kA), bahut short duration (microseconds) lightning discharge handle karne ke liye designed hai. LPS apna dedicated down conductor aur earth termination use karta hai, jo ultimately building ki common earthing se bond hota hai lekin function-specific separate path rakhta hai.",
  },
  {
    question: "Direct strike aur induced surge mein kya difference hai?",
    answer:
      "Direct strike matlab lightning directly building/structure pe girti hai — air termination system yeh current safely ground tak le jaata hai. Induced surge tab hoti hai jab lightning nearby kahi girti hai (building pe nahi) — electromagnetic field power/data cables mein voltage induce karta hai. Data Centers mein induced surge zyada common hai aur SPD (Surge Protection Device) iska primary defense hai.",
  },
  {
    question: "SPD Type 1, 2, aur 3 mein kya fark hai?",
    answer:
      "Type 1 SPD main incoming supply pe lagta hai — direct/partial lightning current handle karta hai (high energy, kA rating). Type 2 SPD distribution panels pe lagta hai — residual surge protect karta hai after Type 1. Type 3 SPD equipment ke bahut paas lagta hai (fine protection) — sensitive electronics ko final-stage protect karta hai. Teeno cascade mein kaam karte hain — coordinated protection deta hai.",
  },
  {
    question: "LPL (Lightning Protection Level) kya hota hai?",
    answer:
      "IEC 62305 4 protection levels define karta hai — LPL I (highest protection) se LPL IV (lowest). Yeh risk assessment se decide hota hai — kitni frequently lightning strike hone ki probability hai, aur consequence kitna severe hoga. Data Centers typically LPL I ya LPL II design karte hain kyunki consequence of failure (data loss, downtime) bahut high hota hai.",
  },
  {
    question: "Air termination ke kaunse types hote hain?",
    answer:
      "Teen main types: Franklin Rod (vertical rod, point-based protection — traditional method), Mesh (conductor grid over roof, wide area coverage — modern buildings mein common), aur Early Streamer Emission (ESE) rods (claims larger protection radius — controversial, kuch countries mein certified nahi hai). Data Center mein typically Mesh + strategic Franklin rods combination use hoti hai.",
  },
  {
    question: "Kya lightning protection SPD ki jagah le sakta hai?",
    answer:
      "Nahi — dono complementary hain, substitute nahi. Lightning protection (air termination + down conductor + earth) direct strike current ko safely ground mein divert karta hai. SPD electrical circuits ko surge voltage se protect karta hai — chahe woh direct strike se ho ya induced surge se. Dono ek complete protection scheme banate hain — ek ke bina doosra incomplete hai.",
  },
  {
    question: "Data Center mein SPD kahan-kahan lagti hai?",
    answer:
      "Typical locations: Type 1 at main incoming supply (transformer/RMU output), Type 2 at UPS input aur major distribution panels, Type 3 at PDU/rack level for sensitive server equipment. Yeh cascade design ensure karta hai ki surge progressively attenuate ho jaaye har stage pe — final equipment tak minimal residual voltage pahunche.",
  },
  {
    question: "Down conductor kitne lagane chahiye ek building mein?",
    answer:
      "IEC 62305 ke according, down conductor count LPL pe depend karta hai — LPL I ke liye typically 10m spacing, LPL IV ke liye 25m spacing along building perimeter. Minimum 2 down conductors har structure mein mandatory hain — single down conductor single point of failure create karta hai.",
  },
  {
    question: "Kya har Data Center ko lightning protection chahiye?",
    answer:
      "Formal risk assessment (IEC 62305-2) determine karta hai actual requirement — building height, location (lightning flash density), aur consequence of failure sab factor karte hain. Practically, sabhi Tier III/IV Data Centers LPS install karte hain kyunki downtime cost itna high hota hai ki risk assessment almost always LPS justify karta hai.",
  },
  {
    question: "SPD health kaise check karte hain?",
    answer:
      "Modern SPDs visual indicator (green/red window) dete hain jo status show karta hai — green normal, red replace required. Kuch SPDs remote signaling contact bhi dete hain jo BMS ko alert bhej sakta hai. Physical inspection monthly aur remote monitoring continuous — dono combine karna best practice hai.",
  },
  {
    question: "Equipotential bonding lightning protection mein kyun important hai?",
    answer:
      "Lightning strike ke time, agar different metallic systems (structural steel, cable trays, pipes, earthing) alag-alag potential pe hain, unke beech dangerous voltage difference (side flash risk) create ho sakta hai. Equipotential bonding sab metallic systems ko same reference pe laata hai — yeh side flash aur equipment damage risk significantly reduce karta hai.",
  },
  {
    question: "Lightning protection system ki testing kitni frequently honi chahiye?",
    answer:
      "IEC 62305 recommends annual visual inspection minimum, aur earth resistance/continuity testing annually bhi. High-risk areas (frequent lightning zones) mein 6-monthly testing recommended hai. Har major lightning event ke baad bhi inspection karni chahiye — even if system worked correctly, components stress ho sakte hain.",
  },
  {
    question: "IS 2309 aur IEC 62305 mein kya relationship hai?",
    answer:
      "IS 2309 India ka national standard hai lightning protection ke liye — but modern practice mein IEC 62305 zyada comprehensive aur globally recognized hai. Kai Indian Data Center projects, especially international clients ke liye, IEC 62305 follow karte hain jabki IS 2309 baseline compliance ke liye reference rehta hai.",
  },
  {
    question: "External LPS aur Internal LPS mein kya fark hai?",
    answer:
      "External LPS lightning current ko structure ke bahar intercept aur divert karta hai — air termination, down conductor, earth termination. Internal LPS structure ke andar equipment ko surge se protect karta hai — SPDs, bonding, shielding. Dono milke complete protection dete hain: External LPS current ko safely ground le jaata hai, Internal LPS residual/induced voltages se equipment bachata hai.",
  },
  {
    question: "Common LPS failure ka sabse bada cause kya hai?",
    answer:
      "Sabse common failure: SPD end-of-life ho jaana bina replace kiye — ek significant surge event ke baad SPD internal varistor degrade ho jaata hai lekin visually normal lag sakta hai agar indicator check nahi kiya. Doosra common issue: down conductor continuity loss due to corrosion ya physical damage, jo annual testing ke bina undetected reh jaata hai.",
  },
];
