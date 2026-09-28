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
    question: "What is the difference between a battery bank and a UPS battery?",
    answer:
      "A battery bank is a complete energy storage system in which multiple batteries are connected in series-parallel. A UPS battery is also part of a battery bank — the difference is only terminology. Data Center engineers say 'battery bank' because there is not a single battery there, but a whole organized bank of batteries that delivers a specific voltage and capacity.",
  },
  {
    question: "What does VRLA mean and why is it sealed?",
    answer:
      "VRLA means Valve Regulated Lead Acid. It is sealed because it has a pressure relief valve inside that opens only on overpressure — in normal operation the electrolyte does not come out. In the AGM type the electrolyte is absorbed in a glass mat, in the Gel type in silica gel — in both cases the electrolyte is not free-flowing, which is why it is spillproof and maintenance-free.",
  },
  {
    question: "How do 12V batteries make 192V?",
    answer:
      "Through series connection. When batteries are connected in series, the voltages add up and the capacity (Ah) stays the same. 192 ÷ 12 = 16 batteries are needed in series. Formula: Batteries per string = Bus Voltage ÷ Per-Battery Voltage = 192 ÷ 12 = 16 batteries. These 16 batteries make one 'string' that delivers 192V DC.",
  },
  {
    question: "What is the difference between Ah and kWh?",
    answer:
      "Ah (Ampere-Hour) measures capacity — how much current can be delivered for how long. kWh (kilowatt-hour) measures energy — the product of voltage and Ah. Formula: kWh = (Ah × Voltage) ÷ 1000. Example: a 100Ah battery at 192V = 19.2 kWh of energy. Ah is used in Data Center sizing because the DC bus voltage is fixed.",
  },
  {
    question: "What is C-rate and why does it matter in sizing?",
    answer:
      "C-rate is the discharge rate. C10 means the battery will discharge its full capacity in 10 hours. C20 means in 20 hours. The problem is that the faster you discharge, the less capacity is available (Peukert's Law). In the Data Center the C10 or C8 rate is typically used — so you will always get less than the C20 rated Ah. In sizing, always use the Ah available at the actual C-rate, not the rated Ah.",
  },
  {
    question: "How much battery is needed for a 10-minute runtime?",
    answer:
      "Formula: Ah = (Load_W × Runtime_hr) ÷ (V_bus × DoD × η). Example: 500kW load, 10 min runtime (0.167 hr), 192V bus, 80% DoD, 95% efficiency = (500,000 × 0.167) ÷ (192 × 0.80 × 0.95) = 83,500 ÷ 145.9 = 572 Ah. Then apply temperature and ageing correction. Use the Battery Ah Calculator at /tools/battery-ah-calculator.",
  },
  {
    question: "Why is DoD kept at 80% and not 100%?",
    answer:
      "A 100% discharge permanently damages a VRLA battery — the plates get sulfated and capacity is permanently reduced. 80% DoD is a safe limit at which the battery gives more cycle life. For VRLA you get ~300 cycles at 80% DoD and ~600 cycles at 50% DoD. For LFP this limit can go up to 90% because the chemistry is more robust.",
  },
  {
    question: "When should the temperature correction factor be applied?",
    answer:
      "Always. A battery's available capacity depends on temperature — 25°C is the reference. At 35°C VRLA capacity reduces by ~15%; at 40°C by ~25%. In the Indian summer, when the ambient is 40-45°C, definitely apply the temperature correction factor in sizing. Formula: Corrected Ah = Rated Ah × Temp_factor. Temp_factor at 40°C ≈ 0.75–0.80 depending on OEM datasheet.",
  },
  {
    question: "What is the ageing factor and how should it be added to the calculation?",
    answer:
      "According to IEEE 485, at end-of-life a battery falls to 80% of rated capacity. If you want the battery to give the minimum runtime over its entire design life, multiply by an ageing factor of 1/0.8 = 1.25 in the initial sizing. That means: make the required Ah 25% higher to account for future capacity degradation. This is a conservative design approach.",
  },
  {
    question: "How many parallel strings can be used — what does IEEE say?",
    answer:
      "IEEE 1187 guidance is to generally avoid more than 3 parallel strings. Reason: with more parallel strings there is more current imbalance, the failure of one string overloads the other strings, and individual string fusing becomes mandatory. If more capacity is needed, use larger Ah per cell — instead of increasing parallel strings.",
  },
  {
    question: "Which mistakes are most common during battery installation?",
    answer:
      "Top 5 mistakes: (1) Mixed age batteries in the same string — the new battery prematurely discharges. (2) Wrong terminal torque — loose connection = hotspot; too tight = cracked terminal. (3) Skipping the formation charge — the battery never reaches full rated capacity. (4) No per-string fusing — a single string fault damages the whole bank. (5) Setting BMS thresholds wrong — false alarms or missed real alarms.",
  },
  {
    question: "What is the difference between float voltage and equalisation voltage?",
    answer:
      "Float voltage is the normal operating voltage that keeps the battery fully charged — typically 2.25–2.27V per cell for VRLA AGM. Equalisation (boost) voltage is higher, typically 2.33–2.40V per cell, and is applied occasionally to balance cells and remove sulphation. Float is always on; equalisation is periodic/scheduled and should be used cautiously for VRLA.",
  },
  {
    question: "What happens with overcharge?",
    answer:
      "In VRLA, overcharge is the most common cause of dry-out — at higher voltage the electrolyte turns into gas and escapes (recombination is not 100% efficient), and the battery permanently loses capacity. In Li-ion, overcharge can trigger thermal runaway — this is much more dangerous. That is why a temperature-compensated charger is mandatory — float voltage should automatically adjust with the ambient.",
  },
  {
    question: "What should be done if the battery room temperature is above 25°C?",
    answer:
      "Three actions: (1) HVAC repair priority — battery room cooling should be N+1 redundant. (2) If temperature compensation is on in the charger, the float voltage will reduce automatically — verify it. (3) Increased monitoring — at high temperature, advance the impedance test from quarterly to monthly. In the long term: redo the battery life calculation at the new temperature, and bring the replacement timeline forward accordingly.",
  },
  {
    question: "How dangerous is hydrogen gas and what is the ventilation formula?",
    answer:
      "The Lower Explosive Limit (LEL) of hydrogen is 4% in air — above this, any spark can cause an explosion. Formula: H₂ generation rate (L/hr) = 0.00042 × I_charge (A) × N_cells. Ventilation: Q (m³/hr) = (H₂_rate × 5) ÷ 0.01 — 5× safety factor, 1% LFL limit. Example: 200 cells, 50A charge current = 0.00042 × 50 × 200 = 4.2 L/hr H₂. Q = (4.2 × 5) ÷ 0.01 = 2,100 m³/hr minimum ventilation.",
  },
  {
    question: "When does the annual capacity test fail?",
    answer:
      "According to IEEE 450/1188, if the measured capacity is < 80% of rated capacity, the battery bank is considered failed and replacement is recommended. Common causes: undetected capacity degradation over years, missed maintenance, high ambient temperature, chronic overcharge, PSOC operation (never fully recharged after discharge). A failed test means that the expected runtime will not be available in the next real outage.",
  },
  {
    question: "Why is the impedance test better than the capacity test in some cases?",
    answer:
      "The capacity test needs an actual load bank, and the UPS has to be kept in maintenance mode — this is risky and expensive. The impedance test is non-intrusive — the battery stays on float, a small AC signal is injected and impedance is measured. Weak cells (high impedance) are identified without discharging. Limitation: the impedance test is a surrogate for capacity, not a direct measurement — both tests together give the best results.",
  },
  {
    question: "What does visual inspection detect and what does it not?",
    answer:
      "Detects: swelling/bulging (overcharge/overtemperature), case cracks, electrolyte leaks, terminal corrosion, loose connections. Does NOT detect: internal capacity degradation, early sulphation, internal short circuit, impedance rise, actual available Ah. This is the reason visual inspection is not enough — voltage measurement, impedance test and the annual capacity test are all mandatory.",
  },
  {
    question: "What is the mixed-age string problem?",
    answer:
      "If a string has some old (high impedance) and some new batteries, during discharge the old batteries get exhausted first — the new batteries then over-discharge in parallel. During charge the old batteries become full first and get overcharged while the new batteries are still charging. Net result: both fail prematurely. Rule: all batteries in a string must be the same batch, same age and same brand.",
  },
  {
    question: "Why is thermal imaging used in battery maintenance?",
    answer:
      "A thermal camera (IR camera) detects loose connections and high-resistance joints that are not visible to the naked eye. 0.1 Ohm of extra resistance at 100A = 1,000W of heat = a hotspot. This hotspot is clearly visible in an IR image before it melts the terminal. Half-yearly thermal imaging of all battery terminals, intercell connectors and fuse panels is a standard preventive maintenance practice in Tier III+ Data Centers.",
  },
  {
    question: "What is thermal runaway and how can it be prevented?",
    answer:
      "Thermal runaway is a self-reinforcing loop: heat → accelerated chemical reaction → more heat → more reaction → fire/explosion. In VRLA it is triggered by overcharge. In Li-ion it is more dangerous — in NMC chemistry, the thermal runaway of one cell can trigger adjacent cells (propagation). Prevention: proper charge voltage, temperature monitoring with BMS cutoff, adequate ventilation, fire suppression (clean agent for VRLA, specialized system for Li-ion per NFPA 855).",
  },
  {
    question: "What is sulphation and is it reversible?",
    answer:
      "In a lead-acid battery, lead sulfate crystals form on the plates during discharge — this is normal. On recharge they should dissolve. The problem arises when the battery stays deep-discharged or operates in PSOC — the crystals become large and hard and do not dissolve on recharge. Early-stage sulphation is partially reversible with an equalisation charge. Advanced sulphation is irreversible — the battery has to be replaced.",
  },
  {
    question: "Why should water not be used on a battery fire?",
    answer:
      "A VRLA battery contains sulfuric acid electrolyte — water causes an exothermic reaction. In a Li-ion battery, water generates hydrogen gas and heat — the fire can get worse. For battery fires, CO₂ or a clean agent (FM-200, Novec 1230) or dry chemical powder is used. Best approach: early detection → suppress using appropriate agent → evacuate → let fire department handle with specialized training.",
  },
  {
    question: "Why is a DC short circuit so dangerous?",
    answer:
      "In an AC short circuit, current naturally extinguishes at the zero crossing — the circuit breaker trips easily. In DC there is no zero crossing — the arc burns continuously. The short circuit current of a battery bank is very high (V_bus ÷ R_cable, typically thousands of amperes), and the arc flash energy is massive. That is why DC-rated fuses (not AC fuses) and proper PPE are mandatory in DC battery work.",
  },
  {
    question: "What should be done if a battery is swollen/bulged?",
    answer:
      "Immediately: (1) Do NOT attempt to charge or discharge — risk of rupture/explosion. (2) Identify if active thermal runaway is ongoing (heat, gas smell) — if yes, evacuate and call fire department. (3) If stable, isolate the string — open string fuse. (4) Wear PPE — acid-resistant gloves, eye protection, face shield. (5) Contact OEM for safe disposal instructions. (6) Investigate root cause — usually overcharge or overtemperature — fix before replacing.",
  },
  {
    question: "Why are Data Centers switching from VRLA to Li-ion?",
    answer:
      "Three main reasons: (1) TCO — LFP 10-15 year life vs VRLA 3-5 year life; over 10 years the LFP replacement cost is much lower despite the higher upfront cost. (2) Space — for the same kWh of energy, LFP is 70% lighter and 50% smaller — critical for space-constrained retrofits. (3) Performance — LFP 90% DoD usable vs VRLA 80%, faster recharge, better high-temp performance. Barrier: higher upfront cost, fire suppression system changes per NFPA 855, insurance approval.",
  },
  {
    question: "Why does a Li-ion battery room need separate fire suppression?",
    answer:
      "In a VRLA fire, CO₂ or a clean agent is sufficient. In a Li-ion fire (especially NMC), thermal runaway involves internally generated heat + oxygen release — the fire cannot be stopped by external oxygen deprivation. NFPA 855 requires specialized detection (early warning), system-level thermal runaway prevention (BMS), and cooling/suppression specifically for Li-ion. Some AHJs require room-level gas suppression plus cooling water system. Always verify with local fire authority.",
  },
  {
    question: "Can a second-life EV battery be used in a Data Center?",
    answer:
      "Theoretically possible — an EV battery retired at 80% SoH (not enough for an EV) can still be used for stationary storage. Practical challenges: unknown remaining cycle life, SOH verification difficult, warranty void, insurance concerns, mixed cell batches. Some hyperscalers are running pilot programs. In India this is still at a nascent stage — both commercial viability and regulatory clarity are needed.",
  },
  {
    question: "What is a flow battery and when does it make sense in a Data Center?",
    answer:
      "In a flow battery, energy is stored in liquid electrolyte (separate tanks); power conversion and energy storage are separate. The Vanadium Redox Flow Battery (VRFB) is the most commercial. Advantages: unlimited cycles (the electrolyte does not degrade), economical for long duration (4-12 hours), no thermal runaway. Disadvantages: high upfront cost, large footprint, complex BMS. In a Data Center it makes sense only for long-duration BESS — not for short-duration UPS bridging.",
  },
  {
    question: "Why is running a battery bank without a BMS risky?",
    answer:
      "Without a BMS: individual cell voltage is not monitored — a weak cell will over-discharge or overcharge undetected. No temperature monitoring — no early warning of thermal runaway. State of Health is not tracked — the actual available capacity remains unknown. No emergency cutoff — there is no automatic isolation in a fault condition. In a modern Data Center a BMS is not optional — it is a required safety and reliability component, especially for Li-ion.",
  },
];
