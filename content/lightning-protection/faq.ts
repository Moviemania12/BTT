export interface FaqEntry { question: string; answer: string; }

export const lightningProtectionFaq: FaqEntry[] = [
  {
    question: "What is the difference between Lightning Protection and Earthing?",
    answer:
      "Earthing is a general purpose fault current path — designed for normal electrical faults. Lightning Protection is designed specifically to handle very high current (tens of kA), very short duration (microseconds) lightning discharges. An LPS uses its own dedicated down conductor and earth termination, which is ultimately bonded to the building's common earthing but keeps a function-specific separate path.",
  },
  {
    question: "What is the difference between a direct strike and an induced surge?",
    answer:
      "A direct strike means lightning falls directly on the building/structure — the air termination system carries this current safely to the ground. An induced surge happens when lightning falls somewhere nearby (not on the building) — the electromagnetic field induces voltage in power/data cables. In Data Centers induced surges are more common, and the SPD (Surge Protection Device) is the primary defense against them.",
  },
  {
    question: "What is the difference between SPD Type 1, 2 and 3?",
    answer:
      "A Type 1 SPD is installed at the main incoming supply — it handles direct/partial lightning current (high energy, kA rating). A Type 2 SPD is installed at distribution panels — it protects against residual surge after Type 1. A Type 3 SPD is installed very close to the equipment (fine protection) — it gives final-stage protection to sensitive electronics. All three work in cascade — giving coordinated protection.",
  },
  {
    question: "What is an LPL (Lightning Protection Level)?",
    answer:
      "IEC 62305 defines 4 protection levels — from LPL I (highest protection) to LPL IV (lowest). It is decided by risk assessment — how frequently a lightning strike is likely, and how severe the consequence would be. Data Centers typically design for LPL I or LPL II because the consequence of failure (data loss, downtime) is very high.",
  },
  {
    question: "What types of air termination are there?",
    answer:
      "Three main types: Franklin Rod (vertical rod, point-based protection — traditional method), Mesh (conductor grid over the roof, wide area coverage — common in modern buildings), and Early Streamer Emission (ESE) rods (claim a larger protection radius — controversial, not certified in some countries). Data Centers typically use a combination of Mesh + strategic Franklin rods.",
  },
  {
    question: "Can lightning protection replace an SPD?",
    answer:
      "No — the two are complementary, not substitutes. Lightning protection (air termination + down conductor + earth) safely diverts direct strike current into the ground. The SPD protects electrical circuits from surge voltage — whether it comes from a direct strike or an induced surge. Together they form a complete protection scheme — one is incomplete without the other.",
  },
  {
    question: "Where are SPDs installed in a Data Center?",
    answer:
      "Typical locations: Type 1 at the main incoming supply (transformer/RMU output), Type 2 at the UPS input and major distribution panels, Type 3 at the PDU/rack level for sensitive server equipment. This cascade design ensures the surge is progressively attenuated at each stage — so minimal residual voltage reaches the final equipment.",
  },
  {
    question: "How many down conductors should a building have?",
    answer:
      "According to IEC 62305, the down conductor count depends on the LPL — typically 10m spacing for LPL I and 25m spacing for LPL IV along the building perimeter. A minimum of 2 down conductors is mandatory in every structure — a single down conductor creates a single point of failure.",
  },
  {
    question: "Does every Data Center need lightning protection?",
    answer:
      "A formal risk assessment (IEC 62305-2) determines the actual requirement — building height, location (lightning flash density) and consequence of failure are all factors. Practically, all Tier III/IV Data Centers install an LPS because downtime cost is so high that the risk assessment almost always justifies an LPS.",
  },
  {
    question: "How is SPD health checked?",
    answer:
      "Modern SPDs provide a visual indicator (green/red window) that shows the status — green is normal, red means replacement required. Some SPDs also provide a remote signaling contact that can send an alert to the BMS. Monthly physical inspection and continuous remote monitoring — combining both is best practice.",
  },
  {
    question: "Why is equipotential bonding important in lightning protection?",
    answer:
      "During a lightning strike, if different metallic systems (structural steel, cable trays, pipes, earthing) are at different potentials, a dangerous voltage difference (side flash risk) can be created between them. Equipotential bonding brings all metallic systems to the same reference — this significantly reduces side flash and equipment damage risk.",
  },
  {
    question: "How frequently should a lightning protection system be tested?",
    answer:
      "IEC 62305 recommends annual visual inspection at minimum, and earth resistance/continuity testing annually as well. In high-risk areas (frequent lightning zones), 6-monthly testing is recommended. An inspection should also be done after every major lightning event — even if the system worked correctly, components can be stressed.",
  },
  {
    question: "What is the relationship between IS 2309 and IEC 62305?",
    answer:
      "IS 2309 is India's national standard for lightning protection — but in modern practice IEC 62305 is more comprehensive and globally recognized. Many Indian Data Center projects, especially for international clients, follow IEC 62305, while IS 2309 remains the reference for baseline compliance.",
  },
  {
    question: "What is the difference between External LPS and Internal LPS?",
    answer:
      "The External LPS intercepts and diverts lightning current outside the structure — air termination, down conductor, earth termination. The Internal LPS protects equipment inside the structure from surges — SPDs, bonding, shielding. Together they give complete protection: the External LPS carries the current safely to the ground, the Internal LPS protects equipment from residual/induced voltages.",
  },
  {
    question: "What is the biggest cause of common LPS failure?",
    answer:
      "The most common failure: an SPD reaching end-of-life without being replaced — after a significant surge event the SPD's internal varistor degrades but can look visually normal if the indicator is not checked. The second common issue: loss of down conductor continuity due to corrosion or physical damage, which stays undetected without annual testing.",
  },
];
