export interface FaqEntry { question: string; answer: string; }

export const pduFaq: FaqEntry[] = [
  {
    question: "What is the difference between a PDU and a Power Strip?",
    answer:
      "A power strip is a simple consumer-grade device with basic outlets — no metering, monitoring or protection. A Data Center PDU is an engineered device with proper circuit breakers, phase balancing, high-quality connectors (IEC C13/C19) and optional metering/monitoring. A PDU is certified for the Data Center and designed for thousands of hours of continuous operation.",
  },
  {
    question: "What is the difference between an Intelligent PDU (iPDU) and a Simple Metered PDU?",
    answer:
      "A metered PDU only measures current and voltage — display or basic SNMP. An Intelligent PDU (iPDU) has per-outlet metering, remote outlet switching (on/off), environmental sensors (temperature/humidity), DCIM/BMS integration, SNMP v3, Modbus TCP, SSH access, role-based access control and event logging. An iPDU is essentially a network device that also does power distribution.",
  },
  {
    question: "Single Phase vs Three Phase PDU — which to use when?",
    answer:
      "A single phase PDU is fed from one UPS output — simpler wiring, direct 230V outlets. A three phase PDU is fed from a three phase UPS output — requires per-phase load balancing, has higher current capacity, and is typically used for high-density racks (10kW+). In India a standard 415V 3-phase supply is available — a three phase PDU gives more capacity in the same cable size.",
  },
  {
    question: "What is the difference between a PDU and an RPP?",
    answer:
      "An RPP (Remote Power Panel) is a floor-mounted distribution panel that receives the UPS output and feeds multiple rack PDUs — essentially an intermediate distribution point. A PDU sits directly in the rack and feeds individual servers/equipment. The RPP is building-level distribution; the PDU is rack-level distribution. One RPP typically feeds 10-20 rack PDUs.",
  },
  {
    question: "What is outlet switching and when is it useful?",
    answer:
      "In a switched PDU every outlet can be switched on/off remotely — over a network connection. It is useful for: (1) Remote server reboot when a server is hung and the network does not respond, (2) Scheduled load shedding during high load events, (3) Phased power-on during new server installation, (4) Remotely powering off unauthorised devices. It is a time-saving and downtime-reducing feature for IT teams.",
  },
  {
    question: "Which outlet types does a PDU use?",
    answer:
      "Data Center PDUs use standard IEC 60320 connectors: C13 socket (standard 10A server connection), C19 socket (high-power 16A/20A devices like high-end servers, storage arrays), C7 (small devices — uncommon in DC). In India, Type B or Type D outlets are additionally found in some PDUs. IEC standardization is important because server PSU cables worldwide use the same IEC C14/C20 plugs.",
  },
  {
    question: "What is the difference between SNMP and Modbus for a PDU?",
    answer:
      "SNMP (Simple Network Management Protocol) is for IT network management — it treats the PDU like a network device and integrates with an NMS (Network Management System) or DCIM. Modbus TCP/RTU is an industrial protocol — used for integration with a BMS (Building Management System) and SCADA. A modern iPDU typically supports both — the IT team uses SNMP, the facilities team uses Modbus.",
  },
  {
    question: "Why is PDU load balancing necessary?",
    answer:
      "In a three phase PDU, if one phase has more load and the other phases are light, an unbalanced neutral current is generated — causing cable heating, neutral conductor overload and power quality issues. Target: all three phases should be balanced within ±10%. iPDU per-phase metering gives real-time monitoring, and the engineer can adjust server placement or PDU assignment accordingly.",
  },
  {
    question: "What is the difference between a PDU's peak load capacity and rated capacity?",
    answer:
      "Rated capacity is the continuous load a PDU can handle indefinitely — typically the 80% derate rule applies (a 160A rated PDU should not be given more than 128A continuously). Peak capacity is a momentary surge — at server boot-up, startup current can briefly be 2-3x the rated value. An iPDU logs peak current — these historical peaks are important in capacity planning.",
  },
  {
    question: "Why does a PDU have environmental sensors?",
    answer:
      "Air temperature and humidity in the rack directly affect server reliability. An iPDU's environmental sensors (typically a T/H probe at the rack intake) monitor server inlet temperature — according to the ASHRAE A2 standard it should stay below 80.6°F (27°C). This data builds a rack-level thermal map in the DCIM dashboard — identifying hot spots and adjusting cooling becomes possible in real time.",
  },
  {
    question: "What happens when a PDU fails?",
    answer:
      "When a PDU fails, all connected servers lose power simultaneously — one PDU failure can affect a whole rack or rack group. That is why dual-corded servers are used in Tier III/IV — server PSU1 is connected to PDU-A and PSU2 to PDU-B. When PDU-A fails, the server keeps running on PSU2. For single-corded servers, a PDU replacement can only be done by shifting the load or during scheduled downtime.",
  },
  {
    question: "Which readings are available in a metered PDU?",
    answer:
      "A metered PDU typically provides: input current per phase (Amperes), input voltage per phase, total power (kW), energy consumption (kWh), power factor, load percentage. Advanced metered PDUs additionally give per-outlet current. This data shows on the display and is readable remotely via SNMP/Modbus — enabling centralized monitoring instead of manual rounds.",
  },
  {
    question: "How is a PDU installed in a rack?",
    answer:
      "A vertical rack PDU fits in a U-slot at the side — it is a 'zero U' design and takes no rack space. A horizontal PDU occupies 1U or 2U of rack space, typically at the top or bottom. Installation: secure the mounting brackets, route the input cable so the door can close, keep the outlet side accessible for cable management, dress with cable ties. A heavy three-phase PDU requires 2-person installation — weight can be 15-25 kg.",
  },
  {
    question: "Which of DCIM and BMS uses PDU data?",
    answer:
      "The BMS (Building Management System) primarily monitors total power, current and alarm status — for a facility-level view. DCIM uses rack-level and outlet-level detail — server asset mapping, per-rack capacity planning, outlet utilization, historical trends. The facilities team uses the BMS for daily operations; the IT/DC operations team uses DCIM for capacity management. Both integrations are complementary, not competing.",
  },
  {
    question: "When should a PDU be replaced?",
    answer:
      "Clear indicators for PDU replacement: (1) Recurring circuit breaker trips — internal fault or overload, (2) Outlet physical damage — bent pins, burnt marks, (3) Metering readings inconsistent or drifting — calibration lost, (4) Communication module failure — SNMP/Modbus stopped working, (5) Age > 10-12 years with heavy load history, (6) OEM end-of-life — no firmware updates, security patches. Do the PDU replacement in a planned maintenance window — unplanned replacement always means downtime.",
  },
  {
    question: "How does iPDU asset management work?",
    answer:
      "Advanced iPDUs have per-outlet asset tagging — scan the server asset tag with an RFID or barcode scanner and associate it with the outlet number. In DCIM it becomes visible: 'Rack R-21, PDU-A, Outlet 12 → Server PROD-DB-07'. Instead of manually checking every rack in a physical audit, the real-time asset location is visible from DCIM. Some PDUs support a USB barcode scanner directly on-board.",
  },
  {
    question: "Why is neutral current measured in a three phase PDU?",
    answer:
      "In a perfectly balanced three phase system the neutral current is zero — the three phases cancel out. Unbalanced loading increases neutral current — 10-15A of neutral current on a 32A circuit is normal, but 25A+ neutral current should be checked against the cable rating. Modern switching power supplies (servers) are non-linear loads — they generate harmonics that add up in the neutral. That is why iPDU neutral current measurement is an important parameter.",
  },
  {
    question: "What is the difference between a PDU input breaker and an outlet breaker?",
    answer:
      "The input (main) breaker protects the whole PDU — it trips on an input feeder or PDU internal fault. The outlet/branch circuit breaker protects an individual circuit — typically 10A, 16A or 20A per branch. When an outlet breaker trips, only that branch loses power — the other outlets continue. When the input breaker trips, the whole PDU loses power. Branch circuit breakers can easily be hand-reset — the input breaker has a larger handle.",
  },
  {
    question: "What does PDU outlet coloring mean?",
    answer:
      "PDU outlets are typically color-coded for phase identification in 3-phase PDUs. Common convention: Phase A outlets grey/white, Phase B outlets black, Phase C outlets red — but this varies by OEM. Color coding is important because when connecting a dual-corded server, PSU1 and PSU2 should be connected to separate phases — connecting both on the same phase does not give phase redundancy. In iPDU software the phase assignment is clearly labelled.",
  },
  {
    question: "Why is MQTT used in PDU monitoring?",
    answer:
      "MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe protocol — ideal for low bandwidth, high frequency data streaming. Traditional SNMP is polling-based (query-response) — high frequency polling increases network load. With MQTT the PDU pushes real-time data as events occur — outlet current change, temperature threshold, alarm trigger are all published instantly. Modern DCIM platforms and cloud-based monitoring are increasingly adopting MQTT for edge infrastructure.",
  },
];
