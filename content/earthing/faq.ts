export interface FaqEntry { question: string; answer: string; }

export const earthingFaq: FaqEntry[] = [
  {
    question: "Earthing aur Grounding mein kya fark hai?",
    answer: "Technical terms mein dono same hai — IEC aur IS standards 'earthing' use karte hain (British English), IEEE aur NEC 'grounding' use karte hain (American English). Concept bilkul same hai: equipment ke metallic parts ko earth se connect karna taaki fault current safe path se dissipate ho. Data Center world mein dono terms interchangeably use hoti hain.",
  },
  {
    question: "Data Center mein acceptable earth resistance kya hoti hai?",
    answer: "IS 3043 ke according: main earth electrode ≤1 Ohm, individual equipment body earth ≤1 Ohm, Clean Earth (IT equipment) ≤1 Ohm, Lightning Protection Earth ≤10 Ohm (IS 2309). Kuch premium Data Centers clean earth ke liye ≤0.5 Ohm target rakhte hain for sensitive equipment. Values typically annual test mein verify honi chahiye.",
  },
  {
    question: "Chemical earthing aur conventional plate/rod earthing mein kya difference hai?",
    answer: "Conventional plate/rod earthing mein resistance seasonal variation hoti hai — monsoon mein kam, summer mein zyada (soil dries out). Chemical earthing (Maintenance Free Earthing) mein hygroscopic compound use hota hai jo soil mein moisture retain karta hai year-round — consistent low resistance. Data Center ke liye chemical earthing preferred hai kyunki consistent performance critical hai.",
  },
  {
    question: "Earth Resistance test kab karna chahiye?",
    answer: "Commissioning pe mandatory (baseline establish karo), phir annually minimum — IS 3043 recommendation. India mein summer (April-June) mein test karo — worst case condition hai kyunki soil driest hoti hai. Agar summer mein pass toh monsoon aur winter mein bhi pass rahega. Event-based: after lightning strike, after soil disturbance near earth pit.",
  },
  {
    question: "3 Pole test aur Clamp method mein kaba kaunsa use karein?",
    answer: "3 Pole (Fall of Potential) method most accurate hai — single earth electrode accurately measure karta hai. Lekin dedicated current probe run karna padta hai, equipment temporary disconnect chahiye. Clamp method non-intrusive hai — live system pe bina disconnect kiye test hota hai. Data Center mein: commissioning aur annual test ke liye 3 Pole, routine monitoring ke liye Clamp method.",
  },
  {
    question: "Neutral Earth Voltage (NEV) kya hota hai aur acceptable range kya hai?",
    answer: "Neutral-Earth voltage woh potential difference hai jo neutral conductor aur earth electrode ke beech hoti hai — ideally zero, practically 0-2V acceptable hai under normal load. >2V indicates neutral-earth bonding issue ya excessive neutral current. IT equipment ke liye <1V recommended hai — zyada voltage equipment damage aur communication interference cause karta hai.",
  },
  {
    question: "Ground Loop kya hai aur Data Center mein kyun problem hai?",
    answer: "Ground loop tab create hoti hai jab ek circuit mein do ya zyada earth points hoon alag potential pe — current loop ban jaata hai. IT equipment mein ground loop noise (hum) introduce karta hai — communication cables, audio/video signal, sensitive measurement circuits affect hote hain. Prevention: single point earthing for sensitive equipment, equipotential bonding throughout DC.",
  },
  {
    question: "Floating Ground kya hoti hai aur kab dangerous hoti hai?",
    answer: "Floating ground matlab equipment ka metallic body earth se properly connected nahi hai — woh 'float' kar raha hai at undefined potential. Touch voltage hazard: agar phase-to-body fault ho toh dangerous voltage appear ho sakta hai body pe bina immediate trip. Data Center mein sab equipment properly bonded hona chahiye — floating ground safety hazard hai aur EMI problem bhi cause karta hai.",
  },
  {
    question: "UPS mein earth fault alarm kab aata hai?",
    answer: "UPS DC bus pe insulation monitoring system (IMS) hota hai — yeh continuously DC positive aur negative ke earth se insulation resistance monitor karta hai. Alarm tab aata hai jab insulation resistance drops below threshold (typically 10kΩ-100kΩ depending on UPS). Common causes: battery cell case damage, cable insulation fault, moisture ingress. Single earth fault usually alarm only — second fault causes shutdown.",
  },
  {
    question: "Lightning earth aur equipment earth ek hi pit se ho sakti hai?",
    answer: "IS 2309 aur IS 3043 dono separate earth electrode recommend karte hain lightning protection aur equipment earthing ke liye — minimum 2-3 meter separation. Reason: lightning strike pe massive current (kA range) earth electrode mein inject hoti hai — yeh nearby equipment earth mein potential raise kar sakti hai (Ground Potential Rise). Separate electrodes protect equipment from this transient. Large DCs mein often connected at main earth bar with surge protective devices.",
  },
  {
    question: "Server rack earthing ke liye kya specific requirements hain?",
    answer: "Rack ke har part ko bonded karna chahiye: rack frame, side panels, doors, cable management accessories, PDU mounting hardware. Server equipment apni earth connection PDU ke through karti hai (power cord ground pin). Rack-to-rack bonding: adjacent racks copper strip ya earth wire se connect karo. Raised floor: anti-static tiles metal stringer se bonded honi chahiye, stringer ground bar se.",
  },
  {
    question: "Soil resistivity measurement kyun karte hain?",
    answer: "Earth electrode ka resistance soil resistivity pe directly depend karta hai. Rocky soil mein high resistance, moist clay mein low. Site-specific soil resistivity measure karna (Wenner method se) earth pit design ke liye essential hai — kitne rods chahiye, kitni depth, kaunsa earth enhancement compound chahiye. Without soil resistivity data, earth system over ya under-designed ho sakta hai.",
  },
  {
    question: "Maintenance Free Earthing (MFE) kit mein kya hota hai?",
    answer: "MFE kit mein hota hai: copper bonded rod (typically 2-3 meter length, 17.2mm diameter), cast iron inspection chamber, back-fill compound (hygroscopic salts + bentonite + carbon mixture), test link (for periodic testing), copper strip connection terminal. Compound soil mein permanently moisture retain karta hai — resistance consistent rehti hai year-round without watering like conventional systems.",
  },
  {
    question: "Touch voltage aur step voltage mein kya difference hai?",
    answer: "Touch voltage: woh voltage jo koi simultaneously ek earthed structure ko touch kare aur earth surface pe khada ho — between hand and feet. Step voltage: woh voltage jo do points ke beech hoti hai jitna ek insaan ka stride hai (typically 1 meter apart) during ground fault current flow. Step voltage substation areas mein concern hai. Data Center mein touch voltage primary concern hai — equipment body aur earth surface ke beech.",
  },
  {
    question: "IS 3043 kya specify karta hai earthing ke liye?",
    answer: "IS 3043 (Code of Practice for Earthing) India ka primary earthing standard hai. Key specifications: earth electrode material (copper, GI, copper-bonded steel), minimum electrode sizes, burial depth requirements, earth resistance values, inspection chamber requirements, bonding requirements, test link locations. Data Center implementation mein IS 3043 + IEC 60364 + TIA-942 sab reference karte hain — typically most stringent requirement apply karte hain.",
  },
  {
    question: "Clean earth aur dirty earth ka separation kyun zaroori hai?",
    answer: "Dirty earth: power equipment (UPS, DG, transformers, panels) ka earth — switching transients, harmonics, neutral currents se polluted. Clean earth: IT equipment, communication systems, sensitive instrumentation ka earth — noise-free reference chahiye. Dono alag electrode systems se ultimately same main earth bar pe connect hote hain — lekin alag paths se taaki dirty earth se noise clean earth mein couple na ho.",
  },
  {
    question: "Kisi rack mein earth continuity test kaise karte hain?",
    answer: "Low resistance ohmmeter ya continuity tester use karo. Connection: ek probe main earth bar pe, doosra probe rack ke kisi metal point pe. Reading: <0.1 Ohm typically expected for proper bonding. Check: rack frame, doors, side panels, cable tray sections, PDU body. Any reading >1 Ohm needs investigation — loose connection, paint/anodize layer interference, broken bonding strap.",
  },
  {
    question: "Battery room earthing mein special considerations kya hain?",
    answer: "Battery room mein hydrogen gas risk hai — spark from loose earth connection explosive environment mein ignition source ban sakta hai. Requirements: explosion-proof earth clamps, all metallic surfaces (battery racks, shelves, trays) properly bonded, battery bank positive/negative terminals se separate isolation — only equipment earth (body/chassis) connected, never DC circuit earth in floating DC UPS systems.",
  },
  {
    question: "Earth resistance badhne ke common causes kya hain?",
    answer: "Seasonal soil drying (summer peak), physical damage to earth strip/cable, loose clamp connections, corrosion at connection points, termite damage to buried conductor, construction activity disturbing earth pit, soil composition change near pit. First check: inspection chamber mein visual inspection karo — often visible corrosion ya physical damage dikhta hai. If visual OK, test soil moisture near pit.",
  },
  {
    question: "SPD (Surge Protection Device) aur earthing ka kya relationship hai?",
    answer: "SPD transient overvoltages ko divert karta hai earth path mein. Agar earth resistance high hai toh SPD effective nahi hoga — transient energy properly dissipate nahi hogi. SPD ke liye dedicated low-resistance earth connection essential hai — SPD performance directly earth quality pe dependent hai. High earth resistance + SPD = false sense of security.",
  },
];
