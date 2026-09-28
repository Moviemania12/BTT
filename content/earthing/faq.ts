export interface FaqEntry { question: string; answer: string; }

export const earthingFaq: FaqEntry[] = [
  {
    question: "What is the difference between Earthing and Grounding?",
    answer: "In technical terms both are the same — IEC and IS standards use 'earthing' (British English), IEEE and NEC use 'grounding' (American English). The concept is exactly the same: connecting the metallic parts of equipment to earth so that fault current dissipates through a safe path. In the Data Center world both terms are used interchangeably.",
  },
  {
    question: "What is the acceptable earth resistance in a Data Center?",
    answer: "As per IS 3043: main earth electrode ≤1 Ohm, individual equipment body earth ≤1 Ohm, Clean Earth (IT equipment) ≤1 Ohm, Lightning Protection Earth ≤10 Ohm (IS 2309). Some premium Data Centers target ≤0.5 Ohm for clean earth for sensitive equipment. Values should typically be verified in the annual test.",
  },
  {
    question: "What is the difference between chemical earthing and conventional plate/rod earthing?",
    answer: "In conventional plate/rod earthing, resistance has seasonal variation — lower in the monsoon, higher in summer (the soil dries out). Chemical earthing (Maintenance Free Earthing) uses a hygroscopic compound that retains moisture in the soil year-round — consistently low resistance. Chemical earthing is preferred for Data Centers because consistent performance is critical.",
  },
  {
    question: "When should the Earth Resistance test be done?",
    answer: "Mandatory at commissioning (establish the baseline), then annually at minimum — IS 3043 recommendation. In India, test in summer (April-June) — it is the worst case condition because the soil is driest. If it passes in summer, it will also pass in the monsoon and winter. Event-based: after a lightning strike, after soil disturbance near the earth pit.",
  },
  {
    question: "When should the 3 Pole test and the Clamp method be used?",
    answer: "The 3 Pole (Fall of Potential) method is the most accurate — it measures a single earth electrode accurately. But a dedicated current probe has to be run and the equipment needs a temporary disconnect. The Clamp method is non-intrusive — the test happens on a live system without disconnecting. In the Data Center: 3 Pole for commissioning and annual tests, the Clamp method for routine monitoring.",
  },
  {
    question: "What is Neutral Earth Voltage (NEV) and what is the acceptable range?",
    answer: "Neutral-Earth voltage is the potential difference between the neutral conductor and the earth electrode — ideally zero, practically 0-2V is acceptable under normal load. >2V indicates a neutral-earth bonding issue or excessive neutral current. <1V is recommended for IT equipment — higher voltage causes equipment damage and communication interference.",
  },
  {
    question: "What is a Ground Loop and why is it a problem in a Data Center?",
    answer: "A ground loop is created when a circuit has two or more earth points at different potentials — a current loop forms. In IT equipment a ground loop introduces noise (hum) — communication cables, audio/video signals and sensitive measurement circuits are affected. Prevention: single point earthing for sensitive equipment, equipotential bonding throughout the DC.",
  },
  {
    question: "What is a Floating Ground and when is it dangerous?",
    answer: "A floating ground means the metallic body of the equipment is not properly connected to earth — it is 'floating' at an undefined potential. Touch voltage hazard: if there is a phase-to-body fault, a dangerous voltage can appear on the body without an immediate trip. In a Data Center all equipment should be properly bonded — a floating ground is a safety hazard and also causes EMI problems.",
  },
  {
    question: "When does an earth fault alarm come on a UPS?",
    answer: "The UPS DC bus has an insulation monitoring system (IMS) — it continuously monitors the insulation resistance of DC positive and negative to earth. The alarm comes when insulation resistance drops below the threshold (typically 10kΩ-100kΩ depending on the UPS). Common causes: battery cell case damage, cable insulation fault, moisture ingress. A single earth fault usually gives an alarm only — a second fault causes shutdown.",
  },
  {
    question: "Can lightning earth and equipment earth come from the same pit?",
    answer: "IS 2309 and IS 3043 both recommend separate earth electrodes for lightning protection and equipment earthing — minimum 2-3 meter separation. Reason: on a lightning strike, massive current (kA range) is injected into the earth electrode — this can raise the potential in nearby equipment earth (Ground Potential Rise). Separate electrodes protect equipment from this transient. In large DCs they are often connected at the main earth bar with surge protective devices.",
  },
  {
    question: "What are the specific requirements for server rack earthing?",
    answer: "Every part of the rack should be bonded: rack frame, side panels, doors, cable management accessories, PDU mounting hardware. Server equipment makes its earth connection through the PDU (power cord ground pin). Rack-to-rack bonding: connect adjacent racks with copper strip or earth wire. Raised floor: anti-static tiles should be bonded to the metal stringer, and the stringer to the ground bar.",
  },
  {
    question: "Why is soil resistivity measured?",
    answer: "The resistance of an earth electrode depends directly on soil resistivity. Rocky soil has high resistance, moist clay low. Measuring site-specific soil resistivity (with the Wenner method) is essential for earth pit design — how many rods are needed, what depth, which earth enhancement compound is needed. Without soil resistivity data, the earth system can be over- or under-designed.",
  },
  {
    question: "What is in a Maintenance Free Earthing (MFE) kit?",
    answer: "An MFE kit contains: a copper bonded rod (typically 2-3 meter length, 17.2mm diameter), a cast iron inspection chamber, back-fill compound (hygroscopic salts + bentonite + carbon mixture), a test link (for periodic testing), and a copper strip connection terminal. The compound permanently retains moisture in the soil — resistance stays consistent year-round without watering, unlike conventional systems.",
  },
  {
    question: "What is the difference between touch voltage and step voltage?",
    answer: "Touch voltage: the voltage experienced when someone simultaneously touches an earthed structure and stands on the earth surface — between hand and feet. Step voltage: the voltage between two points as far apart as a person's stride (typically 1 meter apart) during ground fault current flow. Step voltage is a concern in substation areas. In a Data Center, touch voltage is the primary concern — between the equipment body and the earth surface.",
  },
  {
    question: "What does IS 3043 specify for earthing?",
    answer: "IS 3043 (Code of Practice for Earthing) is India's primary earthing standard. Key specifications: earth electrode material (copper, GI, copper-bonded steel), minimum electrode sizes, burial depth requirements, earth resistance values, inspection chamber requirements, bonding requirements, test link locations. In Data Center implementation, IS 3043 + IEC 60364 + TIA-942 are all referenced — typically the most stringent requirement is applied.",
  },
  {
    question: "Why is separating clean earth and dirty earth necessary?",
    answer: "Dirty earth: the earth of power equipment (UPS, DG, transformers, panels) — polluted by switching transients, harmonics and neutral currents. Clean earth: the earth of IT equipment, communication systems and sensitive instrumentation — needs a noise-free reference. Both are ultimately connected through separate electrode systems to the same main earth bar — but through separate paths so that noise from the dirty earth does not couple into the clean earth.",
  },
  {
    question: "How is an earth continuity test done on a rack?",
    answer: "Use a low resistance ohmmeter or continuity tester. Connection: one probe on the main earth bar, the other probe on any metal point of the rack. Reading: <0.1 Ohm is typically expected for proper bonding. Check: rack frame, doors, side panels, cable tray sections, PDU body. Any reading >1 Ohm needs investigation — loose connection, paint/anodize layer interference, broken bonding strap.",
  },
  {
    question: "What are the special considerations in battery room earthing?",
    answer: "The battery room has a hydrogen gas risk — a spark from a loose earth connection can become an ignition source in an explosive environment. Requirements: explosion-proof earth clamps, all metallic surfaces (battery racks, shelves, trays) properly bonded, separate isolation from battery bank positive/negative terminals — only equipment earth (body/chassis) connected, never DC circuit earth in floating DC UPS systems.",
  },
  {
    question: "What are the common causes of rising earth resistance?",
    answer: "Seasonal soil drying (summer peak), physical damage to the earth strip/cable, loose clamp connections, corrosion at connection points, termite damage to a buried conductor, construction activity disturbing the earth pit, soil composition change near the pit. First check: do a visual inspection in the inspection chamber — visible corrosion or physical damage is often seen. If visual is OK, test soil moisture near the pit.",
  },
  {
    question: "What is the relationship between an SPD (Surge Protection Device) and earthing?",
    answer: "An SPD diverts transient overvoltages into the earth path. If earth resistance is high, the SPD will not be effective — transient energy will not dissipate properly. A dedicated low-resistance earth connection is essential for an SPD — SPD performance depends directly on earth quality. High earth resistance + SPD = a false sense of security.",
  },
];
