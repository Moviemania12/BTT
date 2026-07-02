// ═══════════════════════════════════════════════════════════════════════════
// content/battery-bank/faq.ts
//
// Battery Bank FAQ — single source of truth for FAQ section AND FAQ JSON-LD
// schema AND AI registry. All 30 questions from Blueprint v3.0 Section 25.1.
// ═══════════════════════════════════════════════════════════════════════════

export interface FaqEntry {
  question: string;
  answer: string;
}

export const batteryBankFaq: FaqEntry[] = [
  {
    question: "Battery bank aur UPS battery mein kya fark hai?",
    answer:
      "Battery bank ek complete energy storage system hai jisme multiple batteries series-parallel mein connected hoti hain. UPS battery bhi battery bank ka hi ek hissa hai — fark sirf terminology ka hai. Data Center engineers 'battery bank' isliye kehte hain kyunki wahan akeli battery nahi, balki ek poora organized bank of batteries hota hai jo ek specific voltage aur capacity deliver karta hai.",
  },
  {
    question: "VRLA ka matlab kya hai aur yeh sealed kyun hota hai?",
    answer:
      "VRLA ka matlab hai Valve Regulated Lead Acid. Yeh sealed hota hai kyunki iske andar ek pressure relief valve hota hai jo sirf overpressure pe khulta hai — normal operation mein electrolyte bahar nahi aata. AGM type mein electrolyte glass mat mein absorbed hoti hai, Gel type mein silica gel mein — dono cases mein electrolyte free-flowing nahi hoti isliye yeh spillproof aur maintenance-free hoti hai.",
  },
  {
    question: "12V battery 192V kaise banta hai?",
    answer:
      "Series connection se. Jab batteries series mein connect karte hain toh voltages add hoti hain, capacity (Ah) same rehti hai. 192 ÷ 12 = 16 batteries series mein chahiye. Formula: Batteries per string = Bus Voltage ÷ Per-Battery Voltage = 192 ÷ 12 = 16 batteries. Yeh 16 batteries ek 'string' banati hain jo 192V DC deliver karti hai.",
  },
  {
    question: "Ah aur kWh mein kya difference hai?",
    answer:
      "Ah (Ampere-Hour) capacity measure karta hai — kitna current kitni der deliver kar sakta hai. kWh (kilowatt-hour) energy measure karta hai — voltage aur Ah dono ka product. Formula: kWh = (Ah × Voltage) ÷ 1000. Example: 100Ah battery at 192V = 19.2 kWh energy. Data Center sizing mein Ah use hoti hai kyunki DC bus voltage fixed hoti hai.",
  },
  {
    question: "C-rate kya hota hai aur sizing mein kyun matter karta hai?",
    answer:
      "C-rate discharge rate hai. C10 matlab battery apni full capacity 10 hours mein discharge karegi. C20 matlab 20 hours mein. Problem yeh hai ki jitni fast discharge karo, available capacity utni kam milti hai (Peukert's Law). Data Center mein typically C10 ya C8 rate use hoti hai — isliye rated Ah always C20 se kam milega. Sizing mein hamesha actual C-rate pe available Ah use karo, not rated Ah.",
  },
  {
    question: "10-minute runtime ke liye kitni battery chahiye?",
    answer:
      "Formula: Ah = (Load_W × Runtime_hr) ÷ (V_bus × DoD × η). Example: 500kW load, 10 min runtime (0.167 hr), 192V bus, 80% DoD, 95% efficiency = (500,000 × 0.167) ÷ (192 × 0.80 × 0.95) = 83,500 ÷ 145.9 = 572 Ah. Phir temperature aur ageing correction apply karo. Use karein Battery Ah Calculator at /tools/battery-ah-calculator.",
  },
  {
    question: "DoD 80% kyun rakha jaata hai, 100% kyun nahi?",
    answer:
      "100% discharge VRLA battery ko permanently damage karta hai — plates sulfate ho jaati hain, capacity permanently reduce ho jaati hai. 80% DoD ek safe limit hai jahan battery zyada cycle life deti hai. VRLA ke liye 80% DoD pe ~300 cycles milte hain, 50% DoD pe ~600 cycles. LFP ke liye yeh limit 90% tak ja sakti hai kyunki chemistry zyada robust hai.",
  },
  {
    question: "Temperature correction factor kab apply karna chahiye?",
    answer:
      "Hamesha. Battery ki available capacity temperature pe depend karti hai — 25°C reference hai. 35°C pe VRLA ka capacity ~15% reduce hota hai; 40°C pe ~25% reduce. Indian summer mein jab ambient 40-45°C ho, toh sizing mein temperature correction factor zaroor apply karo. Formula: Corrected Ah = Rated Ah × Temp_factor. Temp_factor at 40°C ≈ 0.75–0.80 depending on OEM datasheet.",
  },
  {
    question: "Ageing factor kya hota hai aur calculation mein kaise add karna chahiye?",
    answer:
      "IEEE 485 ke according, battery end-of-life pe 80% of rated capacity tak girjati hai. Agar tum chahte ho ki battery poore design life mein minimum runtime de, toh initial sizing mein ageing factor 1/0.8 = 1.25 multiply karo. Matlab: required Ah ko 25% zyada banana hai to account for future capacity degradation. Yeh ek conservative design approach hai.",
  },
  {
    question: "Parallel strings kitne tak rakh sakte hain — IEEE kya kehta hai?",
    answer:
      "IEEE 1187 guidance hai ki generally 3 se zyada parallel strings avoid karo. Reason: zyada parallel strings mein current imbalance zyada hoti hai, ek string ki failure doosri strings ko overload karta hai, aur individual string fusing mandatory ho jaata hai. Agar zyada capacity chahiye, larger Ah per cell use karo — parallel strings badhane ki jagah.",
  },
  {
    question: "Battery installation ke time konsi galtiyan sabse common hain?",
    answer:
      "Top 5 mistakes: (1) Mixed age batteries same string mein — new battery prematurely discharges. (2) Wrong terminal torque — loose connection = hotspot; too tight = cracked terminal. (3) Formation charge skip karna — battery never reaches full rated capacity. (4) No per-string fusing — single string fault puri bank ko damage karta hai. (5) BMS thresholds set karna galat — false alarms ya missed real alarms.",
  },
  {
    question: "Float voltage aur equalisation voltage mein kya difference hai?",
    answer:
      "Float voltage normal operating voltage hai jo battery ko fully charged maintain karta hai — VRLA AGM ke liye typically 2.25–2.27V per cell. Equalisation (boost) voltage zyada hota hai, typically 2.33–2.40V per cell, jo occasionally apply kiya jaata hai to balance cells and remove sulphation. Float hamesha on rehta hai; equalisation periodic/scheduled hota hai aur VRLA ke liye cautiously use karna chahiye.",
  },
  {
    question: "Overcharge se kya hota hai?",
    answer:
      "VRLA mein overcharge dry-out ka sabse common cause hai — zyada voltage pe electrolyte gas ban ke escape karta hai (recombination 100% efficient nahi hoti), battery permanently capacity lose kar deti hai. Li-ion mein overcharge thermal runaway trigger kar sakta hai — yeh bahut zyada dangerous hai. Isliye temperature-compensated charger mandatory hai — ambient ke sath float voltage automatically adjust hona chahiye.",
  },
  {
    question: "Battery room ka temperature 25°C se zyada ho toh kya karein?",
    answer:
      "Three actions: (1) HVAC repair priority — battery room cooling N+1 redundant hona chahiye. (2) Charger mein temperature compensation on hai toh float voltage automatically reduce hoga — verify karo. (3) Increased monitoring — high temp mein monthly impedance test quarterly se advance karo. Long term mein: battery life calculation redo karo nayi temperature pe, aur replacement timeline forward karo accordingly.",
  },
  {
    question: "Hydrogen gas kitna dangerous hai aur ventilation ka formula kya hai?",
    answer:
      "Hydrogen ka Lower Explosive Limit (LEL) 4% in air hai — isse upar koi bhi spark explosion cause kar sakta hai. Formula: H₂ generation rate (L/hr) = 0.00042 × I_charge (A) × N_cells. Ventilation: Q (m³/hr) = (H₂_rate × 5) ÷ 0.01 — 5× safety factor, 1% LFL limit. Example: 200 cells, 50A charge current = 0.00042 × 50 × 200 = 4.2 L/hr H₂. Q = (4.2 × 5) ÷ 0.01 = 2,100 m³/hr minimum ventilation.",
  },
  {
    question: "Annual capacity test kab fail hoti hai?",
    answer:
      "IEEE 450/1188 ke according, agar measured capacity < 80% of rated capacity hai toh battery bank fail consider hoti hai aur replacement recommend ki jaati hai. Common causes: undetected capacity degradation over years, missed maintenance, high ambient temperature, chronic overcharge, PSOC operation (never fully recharged after discharge). Test fail hona matlab hai ki next real outage mein expected runtime nahi milega.",
  },
  {
    question: "Impedance test capacity test se better kyun hai kuch cases mein?",
    answer:
      "Capacity test ke liye actual load bank chahiye, UPS ko maintenance mode mein rakhna padta hai — yeh risky aur expensive hai. Impedance test non-intrusive hai — battery on-float rehti hai, small AC signal inject karte hain, impedance measure karte hain. Weak cells (high impedance) identify ho jaate hain bina discharge kiye. Limitation: impedance test capacity ka surrogate hai, direct measurement nahi — both tests together best results dete hain.",
  },
  {
    question: "Visual inspection se kya detect hota hai aur kya nahi?",
    answer:
      "Detects: swelling/bulging (overcharge/overtemperature), case cracks, electrolyte leaks, terminal corrosion, loose connections. Does NOT detect: internal capacity degradation, early sulphation, internal short circuit, impedance rise, actual available Ah. Yahi reason hai ki visual inspection kafi nahi hai — voltage measurement, impedance test, aur annual capacity test sabhi mandatory hain.",
  },
  {
    question: "Mixed-age string problem kya hai?",
    answer:
      "Agar ek string mein kuch old (high impedance) aur kuch new batteries hain, toh discharge mein old batteries pehle exhaust hoti hain — new batteries phir over-discharge hoti hain in parallel. Charge mein old batteries pehle full hoti hain aur overcharge hoti hain jabki new batteries charge ho rahi hain. Net result: dono prematurely fail hoti hain. Rule: ek string mein sab batteries same batch, same age, same brand honi chahiye.",
  },
  {
    question: "Thermal imaging battery maintenance mein kyun use hoti hai?",
    answer:
      "Thermal camera (IR camera) loose connections aur high-resistance joints detect karta hai jo naked eye se nahi dikhte. Ek 0.1 Ohm extra resistance at 100A = 1,000W heat = hotspot. Yeh hotspot terminal melt karne se pehle IR image mein clearly visible hota hai. Half-yearly thermal imaging of all battery terminals, intercell connectors, aur fuse panels ek standard preventive maintenance practice hai Tier III+ Data Centers mein.",
  },
  {
    question: "Thermal runaway kya hai aur kaise rokein?",
    answer:
      "Thermal runaway ek self-reinforcing loop hai: heat → accelerated chemical reaction → more heat → more reaction → fire/explosion. VRLA mein trigger hota hai overcharge se. Li-ion mein zyada dangerous hai — NMC chemistry mein ek cell ka thermal runaway adjacent cells ko trigger kar sakta hai (propagation). Prevention: proper charge voltage, temperature monitoring with BMS cutoff, adequate ventilation, fire suppression (clean agent for VRLA, specialized system for Li-ion per NFPA 855).",
  },
  {
    question: "Sulphation kya hai aur kya yeh reversible hai?",
    answer:
      "Lead-acid battery mein discharge ke time lead sulfate crystals plates pe form hoti hain — yeh normal hai. Recharge pe yeh dissolve honi chahiye. Problem tab hoti hai jab battery deep-discharged rehti hai ya PSOC mein operate hoti hai — crystals large aur hard ho jaate hain, recharge pe nahi dissolve hoti. Early-stage sulphation partially reversible hai equalisation charge se. Advanced sulphation irreversible hai — battery replace karna padta hai.",
  },
  {
    question: "Battery fire mein pani kyun nahi daalna chahiye?",
    answer:
      "VRLA battery mein sulfuric acid electrolyte hoti hai — pani se exothermic reaction hota hai. Li-ion battery mein pani se hydrogen gas aur heat generate hoti hai — fire worse ho sakta hai. Battery fires ke liye CO₂ ya clean agent (FM-200, Novec 1230) ya dry chemical powder use karte hain. Best approach: early detection → suppress using appropriate agent → evacuate → let fire department handle with specialized training.",
  },
  {
    question: "DC short circuit itna dangerous kyun hai?",
    answer:
      "AC short circuit mein current zero crossing pe naturally extinguish hota hai — circuit breaker trip easily karta hai. DC mein zero crossing nahi hoti — arc continuously burn karta hai. Battery bank ka short circuit current bahut high hota hai (V_bus ÷ R_cable, typically thousands of amperes), arc flash energy massive hoti hai. Isliye DC-rated fuses (not AC fuses) aur proper PPE mandatory hain DC battery work mein.",
  },
  {
    question: "Battery swollen/bulged ho toh kya karna chahiye?",
    answer:
      "Immediately: (1) Do NOT attempt to charge or discharge — risk of rupture/explosion. (2) Identify if active thermal runaway is ongoing (heat, gas smell) — if yes, evacuate and call fire department. (3) If stable, isolate the string — open string fuse. (4) Wear PPE — acid-resistant gloves, eye protection, face shield. (5) Contact OEM for safe disposal instructions. (6) Investigate root cause — usually overcharge or overtemperature — fix before replacing.",
  },
  {
    question: "VRLA se Li-ion switch kyun kar rahe hain Data Centers?",
    answer:
      "Teen main reasons: (1) TCO — LFP 10-15 year life vs VRLA 3-5 year life; over 10 years LFP replacement cost much lower despite higher upfront. (2) Space — same kWh energy mein LFP 70% lighter aur 50% smaller — critical for space-constrained retrofits. (3) Performance — LFP 90% DoD usable vs VRLA 80%, faster recharge, better high-temp performance. Barrier: higher upfront cost, fire suppression system changes per NFPA 855, insurance approval.",
  },
  {
    question: "Li-ion battery room ke liye alag fire suppression kyun chahiye?",
    answer:
      "VRLA fire mein CO₂ ya clean agent sufficient hai. Li-ion fire (especially NMC) mein thermal runaway internally generated heat + oxygen release hoti hai — external oxygen deprivation se fire ruk nahi sakti. NFPA 855 require karta hai specialized detection (early warning), system-level thermal runaway prevention (BMS), aur cooling/suppression specifically for Li-ion. Some AHJs require room-level gas suppression plus cooling water system. Always verify with local fire authority.",
  },
  {
    question: "Second-life EV battery Data Center mein use ho sakti hai?",
    answer:
      "Theoretically possible — EV battery jo 80% SoH pe retire hui (EV ke liye kafi nahi) abhi bhi stationary storage ke liye use ho sakti hai. Practical challenges: unknown remaining cycle life, SOH verification difficult, warranty void, insurance concerns, mixed cell batches. Some hyperscalers pilot programs kar rahe hain. India mein yeh abhi nascent stage mein hai — commercial viability aur regulatory clarity dono ki zaroorat hai.",
  },
  {
    question: "Flow battery kya hai aur Data Center mein kab sense karta hai?",
    answer:
      "Flow battery mein energy liquid electrolyte mein stored hoti hai (separate tanks), power conversion aur energy storage alag hote hain. Vanadium Redox Flow Battery (VRFB) sabse commercial hai. Advantages: unlimited cycles (electrolyte degrade nahi hoti), long duration (4-12 hours) economical, no thermal runaway. Disadvantages: high upfront cost, large footprint, complex BMS. Data Center mein sense karta hai sirf long-duration BESS ke liye — short-duration UPS bridging ke liye nahi.",
  },
  {
    question: "BMS ke bina battery bank chalana kyun risky hai?",
    answer:
      "BMS ke bina: individual cell voltage monitor nahi hoti — weak cell over-discharge ya overcharge hogi undetected. Temperature monitoring nahi — thermal runaway early warning nahi milegi. State of Health track nahi hoga — actual available capacity unknown rahegi. Emergency cutoff nahi — fault condition mein automatic isolation nahi hoga. Modern Data Center mein BMS not optional — it is a required safety and reliability component, especially for Li-ion.",
  },
];
