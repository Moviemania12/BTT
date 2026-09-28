import type { FaqItem } from "@/lib/schemas";

export const aiCoolingFaq: FaqItem[] = [
  {
    question: "Why is cooling so critical in AI data centers — what makes it different from normal servers?",
    answer:
      "Normal enterprise servers typically consume 1–3 kW per rack unit, and a standard 42U rack has 10–20 kW total power. AI GPU servers are fundamentally different. A single NVIDIA DGX H100 server alone consumes approximately 10.2 kW — that is, one single server is the equivalent of an entire enterprise rack. When 4–8 such servers sit in one rack, rack power density becomes 40–80+ kW. Newer platforms like the GB200 NVL72 can reach 100+ kW per rack. These generate so much heat that traditional CRAC/CRAH air cooling systems physically cannot handle this density — air simply does not have the capacity to absorb that much heat. That is why liquid cooling becomes mandatory — water's heat capacity is approximately 3500 times greater than air's.",
  },
  {
    question: "What is the fundamental difference between Direct Liquid Cooling (DLC) and Immersion Cooling?",
    answer:
      "In Direct Liquid Cooling (DLC), coolant flows through cold plates mounted on specific heat-generating components inside the server (primarily GPU chips). The rest of the server structure remains normal — there can still be fans for supplementary cooling. Coolant passes directly over the GPU chip, absorbs heat, and returns to the CDU (Cooling Distribution Unit). In Immersion Cooling, the entire server — or the entire circuit board — is physically submerged in a dielectric fluid (an insulating liquid). The fluid directly contacts the PCBs, chips, memory — everything — and absorbs heat. DLC is a more targeted approach and remains compatible with existing infrastructure. Immersion is a more aggressive approach that can potentially handle higher densities but requires significant operational changes.",
  },
  {
    question: "What is PUE, and what is considered a good PUE in AI data centers?",
    answer:
      "PUE (Power Usage Effectiveness) = Total Facility Power / IT Equipment Power. An ideal PUE would be 1.0 (only IT equipment power used, no overhead) — this is practically impossible. Traditional air-cooled data centers used to have a PUE in the 1.4–1.8 range. Modern efficient facilities achieve 1.2–1.3. With AI data centers and liquid cooling, 1.1–1.2 is possible because cooling thermal efficiency is better. But this is important: PUE is just one metric. A very low PUE does not necessarily guarantee an efficient data center — context matters. A facility in a warm climate will naturally have a higher PUE (more cooling energy needed). And PUE does not capture IT utilization — if GPUs are idle, PUE may look good but efficiency is poor. Judge PUE together with GPU utilization and training throughput.",
  },
  {
    question: "What is a CDU, and what is its role in AI cooling architecture?",
    answer:
      "The CDU (Cooling Distribution Unit) is the central component of AI data center liquid cooling architecture. A CDU is a heat exchanger that provides the thermal interface between facility cooling water (coming from the building chiller) and a dedicated secondary liquid loop for IT equipment. It keeps the two loops physically separate — facility water never directly contacts the IT equipment. Why separate? Because facility water can contain treatment chemicals, corrosion inhibitors, and other contaminants that could damage sensitive IT equipment. In the CDU secondary loop, cooled dielectric fluid or treated water circulates, reaches the GPU cold plates, absorbs heat, returns to the CDU, gets cooled by the facility water in the CDU, and the cycle repeats. A CDU is typically deployed per-rack or per-cluster.",
  },
  {
    question: "What is the difference between single-phase and two-phase immersion cooling?",
    answer:
      "In single-phase immersion cooling, the dielectric fluid remains in a liquid state — it never boils. The fluid warms up as it absorbs heat from the components, returns to the CDU or an external heat exchanger to cool down. A simple, well-understood process. In two-phase immersion cooling, the dielectric fluid boils — this is deliberate. The components get so hot that the fluid's boiling point is reached, the fluid vaporizes, the vapor collects on condensers at the top of the tank, condenses (converts back to liquid), and drips back onto the components — a cycle. Two-phase has very high heat transfer efficiency (latent heat of phase change) but fluid selection, vapor management, and pressure control are more complex. Two-phase fluids are typically specialty fluorocarbon compounds that are expensive and raise environmental concerns (GWP — Global Warming Potential).",
  },
  {
    question: "What is GPU thermal throttling, and how does it affect AI training?",
    answer:
      "GPUs have a built-in thermal protection mechanism. When GPU temperature crosses a configured threshold — typically as it approaches the manufacturer's specified thermal limits — the GPU automatically reduces its clock speed. This is thermal throttling. While throttling, the GPU computes at a slower speed — effective compute performance drops. In AI training, this shows up directly in training throughput: tokens/second or samples/second decreases. The problem is that throttling happens silently — the GPU appears to be 'running,' utilization appears high, but actual performance is degraded. It is essential to track GPU clock speed and temperature simultaneously in monitoring. If cooling is inadequate, throttling will be continuous — expensive hardware will not deliver its full capability. Proper cooling directly affects AI training ROI.",
  },
  {
    question: "Can AI servers be deployed in an existing air-cooled data center?",
    answer:
      "Technically possible, but with significant limitations. Existing air-cooled facilities are typically designed for 10–20 kW per rack. With modern AI GPU servers (such as the DGX H100 at ~10.2 kW per server) and multiple servers per rack, density can easily reach 40–80+ kW. If the existing cooling infrastructure does not support this density, then: GPU throttling will occur (performance degradation), equipment lifespan may reduce, or in the worst case, equipment failure is also possible. Partial solutions exist: add rear-door heat exchangers (augment existing air cooling), add more CRAC/CRAH units, or selective lower-density deployment (fewer GPUs per rack). But for high-density modern AI platforms, greenfield liquid-cooled facilities or a significant retrofit are often necessary. Audit the existing facility's cooling capacity first, then select AI hardware.",
  },
  {
    question: "What is the WUE metric, and how is it different from PUE?",
    answer:
      "WUE (Water Usage Effectiveness) = Annual Water Usage (liters) / IT Equipment Energy (kWh). This metric measures a data center's water consumption efficiency. PUE measures energy efficiency (a power ratio). WUE measures water efficiency. Why does it matter? Cooling towers (evaporative cooling) consume significant water — heat is rejected through water evaporation. This is a concern in arid or water-scarce regions. With liquid cooling, WUE can change: if the need for a cooling tower reduces (mechanical refrigeration or a dry cooler is used instead), WUE can improve. But liquid cooling's secondary loop also requires water/fluid management. AI data centers should track both metrics — optimizing PUE alone can make WUE worse (e.g., by using more evaporative cooling).",
  },
  {
    question: "Why is leak detection critical in liquid cooling, and how is it implemented?",
    answer:
      "The combination of liquid coolant and electronics can cause catastrophic failure — short circuits, corrosion, and permanent hardware damage. AI servers contain millions of dollars worth of GPUs — a significant leak can disrupt training jobs and destroy expensive hardware. Leak detection is implemented at multiple levels: Sensor-based detection — moisture sensors or liquid detection cables are deployed at the CDU, manifold connections, and rack level; they detect the change in electrical conductivity when liquid is present. Pressure monitoring — a pressure drop in a closed loop indicates a leak. Flow rate monitoring — if flow rate changes unexpectedly, an issue is possible. Visual inspection ports — regular visual checks of accessible areas. Automatic shutoff — in some systems, an automatic valve closes to stop coolant flow when a leak is detected. Leak detection response time matters — faster detection means less damage.",
  },
  {
    question: "When is hot aisle/cold aisle containment sufficient in AI cooling?",
    answer:
      "Hot aisle/cold aisle containment is an air cooling optimization technique — it does not increase cooling capacity, it only uses existing capacity more effectively. Containment reduces bypass airflow, cold air reaches the servers directly, and hot exhaust goes directly back to the cooling units. But this is fundamentally still air cooling — and air cooling has physical limits. Containment is sufficient for AI racks only when: rack power density is within a manageable range (per the facility's cooling design, typically below roughly 25–30 kW per rack for air cooling, though exact limits depend on facility design), and the cooling units have enough capacity. If AI rack density exceeds these limits, containment alone will not work — liquid cooling augmentation or replacement will be necessary. Containment is essential for maximizing efficiency when deploying AI servers in an air-cooled facility, but it does not raise the physical limit of cooling capacity.",
  },
];
