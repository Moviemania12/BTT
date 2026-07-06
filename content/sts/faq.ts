export interface FaqEntry { question: string; answer: string; }

export const stsFaq: FaqEntry[] = [
  {
    question: "STS kya hota hai aur yeh Data Center mein kyun use hota hai?",
    answer:
      "Static Transfer Switch (STS) ek solid-state switching device hai jo ek single-corded load ko do independent power sources ke beech 2–4 milliseconds mein transfer karta hai. Data Center mein yeh un devices ke liye use hota hai jo dual power input support nahi karte — STS unhe dual-bus architecture ka protection deta hai bina dual-corded PSU ke.",
  },
  {
    question: "STS aur ATS mein main difference kya hai?",
    answer:
      "STS (Static Transfer Switch) mein SCR/Thyristor solid-state switching hoti hai — transfer time 2–4 ms, koi moving parts nahi. ATS (Automatic Transfer Switch) mein mechanical contactors hote hain — transfer time 100–500 ms. IT loads ke liye STS preferred hai kyunki 100ms+ interruption servers ko reboot kara sakta hai. ATS generator changeover ke liye suitable hai jahan brief interruption acceptable hoti hai.",
  },
  {
    question: "STS transfer time 4ms kyun hoti hai?",
    answer:
      "SCR (Silicon Controlled Rectifier) thyristors microseconds mein switch ho sakte hain. Lekin STS ko pehle source synchronization verify karna padta hai, preferred source ki failure detect karni padti hai, aur alternate source ready hai confirm karna padta hai. In sab steps milake 2–4ms ho jaati hai. Yeh time IT equipment ke liye completely invisible hota hai kyunki server PSU capacitors milliseconds ki interruption absorb kar lete hain.",
  },
  {
    question: "Break-before-make aur make-before-break mein kya difference hai?",
    answer:
      "Break-before-make mein pehle active source disconnect hota hai, phir new source connect — ek brief power gap hoti hai. Make-before-break mein new source pehle connect hota hai, phir old source disconnect — zero interruption. STS mein make-before-break strategy use hoti hai lekin sirf tabhi jab dono sources synchronized hain. Agar synchronization nahi hai toh momentary break-before-make use hoti hai — is case mein brief interruption possible hai.",
  },
  {
    question: "Phase synchronization STS ke liye kyun mandatory hai?",
    answer:
      "Agar Source A aur Source B ke output voltage out-of-phase hain aur STS make-before-break kare, toh momentarily dono sources ek load pe connect ho jaayenge. Voltage difference se extremely high circulating current flow karega — yeh STS SCRs aur connected equipment dono damage kar sakta hai. Isliye STS hamesha pehle phase angle verify karta hai — synchronization confirm hone par hi seamless make-before-break transfer karta hai.",
  },
  {
    question: "STS mein maintenance bypass kyun hota hai?",
    answer:
      "STS SCR modules, control electronics, aur internal components service ke liye kabhi bhi fault ho sakte hain ya replacement chahiye. Without maintenance bypass, STS service karna load ko power interrupt kiye bina impossible hai. Maintenance bypass ek mechanical switch ya contactor hai jo load ko directly source se connect karta hai, STS ko completely bypassing karte hue. Yeh planned maintenance ke time safe isolation deta hai.",
  },
  {
    question: "Single-corded load ke liye STS kyun use karte hain, dual-corded PSU kyun nahi?",
    answer:
      "Kuch legacy servers, network switches, aur specialized equipment sirf single power input support karte hain — dual-corded PSU option hi nahi hota inke liye. STS aise single-corded equipment ko dual-bus architecture ka protection deta hai. Additionally, kuch cases mein dual-corded upgrade cost-prohibitive hoti hai — STS ek economical alternative hai.",
  },
  {
    question: "STS failure hoti hai toh kya hoga?",
    answer:
      "Modern STS failure modes mein: (1) SCR failure — typically 'stuck closed' ya 'stuck open'. Stuck closed mein load continue chalta hai lekin transfer impossible ho jaata hai. Stuck open mein load power lose kar deta hai. (2) Control electronics failure — STS manual bypass mode mein ja sakta hai. (3) Communication fault — alarm generate hoti hai lekin operation continue. Isliye STS ke saath hamesha manual bypass switch hona chahiye.",
  },
  {
    question: "STS preferred source kaise decide karta hai?",
    answer:
      "STS mein programmable source priority hoti hai — typically Source A preferred, Source B alternate. Priority configure karne ke baad, STS hamesha preferred source pe rehta hai agar woh within specification hai. Preferred source fail hone ya out-of-spec jaane par automatic transfer alternate source pe. Preferred source restore hone par, STS optionally 'auto-retransfer' kar sakta hai ya operator action wait kar sakta hai — yeh configurable hota hai.",
  },
  {
    question: "Dual UPS aur STS architecture Tier IV mein kaise kaam karta hai?",
    answer:
      "Tier IV mein: UPS-A → PDU-A (dual-corded equipment ke liye Port A). UPS-B → PDU-B (dual-corded equipment ke liye Port B). Lekin single-corded equipment ke liye: UPS-A aur UPS-B dono STS ke input hote hain. STS ka output single-corded load ko jaata hai. Agar UPS-A fail ho toh STS 2–4ms mein UPS-B pe transfer kar deta hai. Complete path redundancy achieve hoti hai even for single-corded loads.",
  },
  {
    question: "STS sizing kaise ki jaati hai?",
    answer:
      "STS rated current ke basis pe size kiya jaata hai. Basic formula: STS current rating = (Load kVA × 1000) ÷ (Voltage × PF × √3 for 3-phase). Typically 10–20% margin add karte hain future growth ke liye. STS voltage rating UPS output voltage match karni chahiye. Standard sizes: 16A, 32A, 63A, 100A, 250A, 400A, 630A per phase. Data Center standard: 3-phase STS, typically 32A–250A range.",
  },
  {
    question: "STS commissioning mein kya check karte hain?",
    answer:
      "Commissioning checklist: (1) Both sources energized aur within spec. (2) Phase synchronization verified between Source A aur B. (3) Preferred source set correctly. (4) Transfer test — preferred source manually interrupt karo, verify automatic transfer in < 4ms. (5) Retransfer test — preferred source restore karo, verify retransfer behavior. (6) Manual bypass test. (7) Alarm tests — overvoltage, undervoltage, overtemperature. (8) Communication/SNMP connectivity test.",
  },
  {
    question: "STS pe overload kya hoga?",
    answer:
      "STS mein defined overload curve hoti hai — typically 150% for 30 seconds, 200% for few cycles. Overload limit exceed hone par STS alarm raise karta hai aur/ya manual bypass mode engage kar sakta hai. Severe overload ya short circuit pe, upstream breaker trip hota hai. STS khud circuit breaker nahi hai — upstream protection coordinate honi chahiye STS rating se.",
  },
  {
    question: "STS ki preventive maintenance schedule kya hoti hai?",
    answer:
      "Quarterly: Visual inspection, alarms check, source voltages verify, communication test. Half-yearly: Full transfer test (source simulation), SCR temperature check, torque verification on connections. Annually: Complete functional test including manual bypass operation, firmware update if available, cleaning of internal components, detailed inspection of SCR modules. OEM service typically annual recommended.",
  },
  {
    question: "STS aur UPS mein fundamental difference kya hai?",
    answer:
      "UPS power convert karta hai — AC to DC to AC — complete power conditioning deta hai. UPS mein battery hoti hai — offline backup provide karta hai. STS sirf switch karta hai — koi energy storage nahi, koi power conversion nahi. STS tabhi kaam karta hai jab alternate source available ho; agar dono sources fail ho jaayein toh STS kuch nahi kar sakta. UPS aur STS complementary technologies hain — typically dono saath use hote hain.",
  },
];
