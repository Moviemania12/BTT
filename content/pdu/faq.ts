export interface FaqEntry { question: string; answer: string; }

export const pduFaq: FaqEntry[] = [
  {
    question: "PDU aur Power Strip mein kya fark hai?",
    answer:
      "Power strip ek simple consumer-grade device hai jisme basic outlets hote hain — koi metering, monitoring, ya protection nahi. Data Center PDU ek engineered device hai jisme proper circuit breakers, phase balancing, high-quality connectors (IEC C13/C19), aur optional metering/monitoring hota hai. PDU Data Center mein certified hoti hai aur thousands of hours continuous operation ke liye designed hoti hai.",
  },
  {
    question: "Intelligent PDU (iPDU) aur Simple Metered PDU mein kya difference hai?",
    answer:
      "Metered PDU sirf current aur voltage measure karti hai — display ya basic SNMP. Intelligent PDU (iPDU) mein per-outlet metering, remote outlet switching (on/off), environmental sensors (temperature/humidity), DCIM/BMS integration, SNMP v3, Modbus TCP, SSH access, role-based access control, aur event logging sab hote hain. iPDU essentially ek network device hai jisme power distribution bhi hoti hai.",
  },
  {
    question: "Single Phase vs Three Phase PDU — kab kaunsa use karein?",
    answer:
      "Single phase PDU ek UPS output se feed hoti hai — simpler wiring, direct 230V outlets. Three phase PDU three phase UPS output se feed hoti hai — per-phase load balancing require karta hai, higher current capacity, typically used for high-density racks (10kW+). India mein standard 415V 3-phase supply available hai — three phase PDU zyada capacity deti hai same cable size mein.",
  },
  {
    question: "PDU aur RPP mein kya difference hai?",
    answer:
      "RPP (Remote Power Panel) ek floor-mounted distribution panel hai jo UPS output receive karta hai aur multiple rack PDUs ko feed karta hai — essentially ek intermediate distribution point. PDU directly rack mein hoti hai aur individual servers/equipment ko feed karti hai. RPP building-level distribution hai; PDU rack-level distribution hai. Ek RPP typically 10-20 rack PDUs feed karta hai.",
  },
  {
    question: "Outlet switching kya hoti hai aur kab kaam aati hai?",
    answer:
      "Switched PDU mein har outlet ko remotely on/off kiya ja sakta hai — network connection se. Kaam aata hai: (1) Remote server reboot jab server hung ho aur network respond na kare, (2) Scheduled load shedding during high load events, (3) New server installation ke time phased power-on, (4) Unauthorised devices ko remotely power off karna. IT teams ke liye time-saving aur downtime-reducing feature hai.",
  },
  {
    question: "PDU kaunse outlet types use karti hai?",
    answer:
      "Data Center PDU standard IEC 60320 connectors use karti hai: C13 socket (standard 10A server connection), C19 socket (high-power 16A/20A devices jaise high-end servers, storage arrays), C7 (small devices — uncommon in DC). India mein additionally Type B ya Type D outlets bhi kuch PDUs mein milte hain. IEC standardization isliye important hai kyunki server PSU cables worldwide same IEC C14/C20 plugs use karti hain.",
  },
  {
    question: "SNMP aur Modbus mein kya difference hai PDU ke liye?",
    answer:
      "SNMP (Simple Network Management Protocol) IT network management ke liye hai — PDU ko network device ki tarah treat karta hai, NMS (Network Management System) ya DCIM se integrate hota hai. Modbus TCP/RTU industrial protocol hai — BMS (Building Management System) aur SCADA se integration ke liye use hota hai. Modern iPDU typically dono support karta hai — IT team SNMP use karta hai, facilities team Modbus use karta hai.",
  },
  {
    question: "PDU load balancing kyun zaroori hai?",
    answer:
      "Three phase PDU mein agar ek phase pe zyada load ho aur doosri phases light hoon, toh unbalanced neutral current generate hota hai — cable heating, neutral conductor overload, aur power quality issues hote hain. Target: teeno phases ±10% ke andar balanced honi chahiye. iPDU per-phase metering se real-time monitoring hota hai aur engineer accordingly server placement ya PDU assignment adjust kar sakta hai.",
  },
  {
    question: "PDU peak load capacity aur rated capacity mein kya fark hai?",
    answer:
      "Rated capacity woh continuous load hai jo PDU indefinitely handle kar sakti hai — typically 80% derate rule apply hota hai (160A rated PDU ko 128A se zyada load nahi dena chahiye continuously). Peak capacity momentary surge hai — server boot-up pe startup current rated se 2-3x zyada ho sakti hai briefly. iPDU peak current logging karta hai — capacity planning mein yeh historical peaks important hain.",
  },
  {
    question: "Environmental sensors PDU mein kyun hote hain?",
    answer:
      "Rack mein air temperature aur humidity directly server reliability affect karta hai. iPDU ke environmental sensors (typically T/H probe at rack intake) server inlet temperature monitor karte hain — ASHRAE A2 standard ke according 80.6°F (27°C) se neeche rehna chahiye. Yeh data DCIM dashboard mein rack-level thermal map banata hai — hot spots identify karna aur cooling adjustment karna real-time mein possible hota hai.",
  },
  {
    question: "PDU failure ke time kya hota hai?",
    answer:
      "PDU failure ke time sab connected servers lose power karte hain simultaneously — ek PDU failure ek poore rack ya rack group ko affect kar sakti hai. Isliye Tier III/IV mein dual-corded servers use hote hain — Server PSU1 PDU-A se aur PSU2 PDU-B se connected hoti hai. PDU-A fail hone pe server PSU2 se chalta rehta hai. Single-corded servers ke liye PDU replacement tabhi kiya ja sakta hai jab load shift karein ya scheduled downtime mein.",
  },
  {
    question: "Metered PDU mein kaunse readings available hote hain?",
    answer:
      "Metered PDU typically provide karta hai: input current per phase (Amperes), input voltage per phase, total power (kW), energy consumption (kWh), power factor, load percentage. Advanced metered PDUs additionally per-outlet current bhi dete hain. Yeh data display pe dikhta hai aur SNMP/Modbus se remotely readable hota hai — manual rounds ki jagah centralized monitoring enable karta hai.",
  },
  {
    question: "PDU ko rack mein kaise install karte hain?",
    answer:
      "Vertical rack PDU ek U-slot side mein lagti hai — 'zero U' design hai, rack space nahi leta. Horizontal PDU 1U ya 2U rack space occupy karta hai, typically top ya bottom mein. Installation: mounting brackets secure karo, input cable route karo ke door close ho sake, outlet side accessible ho for cable management, cable ties se dress karo. Heavy three-phase PDU requires 2-person installation — weight 15-25 kg ho sakta hai.",
  },
  {
    question: "DCIM aur BMS mein se PDU data kaun use karta hai?",
    answer:
      "BMS (Building Management System) primarily total power, current, aur alarm status monitor karta hai — facility-level view ke liye. DCIM rack-level aur outlet-level detail use karta hai — server asset mapping, per-rack capacity planning, outlet utilization, historical trends. Facilities team BMS use karta hai daily operations ke liye; IT/DC operations team DCIM use karta hai capacity management ke liye. Dono integration complementary hain, competing nahi.",
  },
  {
    question: "PDU kab replace karni chahiye?",
    answer:
      "PDU replacement ke clear indicators: (1) Recurring circuit breaker trips — internal fault ya overload, (2) Outlet physical damage — bent pins, burnt marks, (3) Metering readings inconsistent ya drifting — calibration lost, (4) Communication module failure — SNMP/Modbus stopped working, (5) Age > 10-12 years with heavy load history, (6) OEM end-of-life — no firmware updates, security patches. PDU replacement planned maintenance window mein karo — unplanned replacement always means downtime.",
  },
  {
    question: "iPDU ka asset management kaise kaam karta hai?",
    answer:
      "Advanced iPDU mein per-outlet asset tagging hoti hai — RFID ya barcode scanner se server asset tag scan karo, outlet number se associate karo. DCIM mein yeh visible hota hai: 'Rack R-21, PDU-A, Outlet 12 → Server PROD-DB-07'. Physical audit mein manually har rack check karne ki jagah DCIM se real-time asset location visible hoti hai. Some PDUs USB barcode scanner directly support karte hain on-board.",
  },
  {
    question: "Three phase PDU mein neutral current kyun measure karte hain?",
    answer:
      "Perfectly balanced three phase system mein neutral current zero hota hai — teeno phases cancel out hoti hain. Unbalanced loading se neutral current increase hoti hai — 10-15A neutral current on 32A circuit normal hai, lekin 25A+ neutral current cable rating ke against check karna chahiye. Modern switching power supplies (servers) non-linear loads hain — yeh harmonics generate karte hain jo neutral mein add hote hain. iPDU neutral current measurement isliye important parameter hai.",
  },
  {
    question: "PDU input breaker aur outlet breaker mein kya fark hai?",
    answer:
      "Input (main) breaker poori PDU protect karta hai — input feeder ya PDU internal fault pe trip karta hai. Outlet/branch circuit breaker individual circuit protect karta hai — typically 10A, 16A ya 20A per branch. Outlet breaker trip hone pe sirf woh branch lose power karta hai — baaki outlets continue karte hain. Input breaker trip hone pe poori PDU lose power karti hai. Branch circuit breakers easily hand-reset kiye ja sakte hain — input breaker larger handle hota hai.",
  },
  {
    question: "PDU outlet coloring ka kya matlab hota hai?",
    answer:
      "PDU outlets typically color-coded hote hain for phase identification in 3-phase PDUs. Common convention: Phase A outlets grey/white, Phase B outlets black, Phase C outlets red — lekin yeh OEM-specific vary karta hai. Color coding isliye important hai kyunki dual-corded server connect karte waqt PSU1 aur PSU2 ko alag phases pe connect karna chahiye — same phase pe dono connect karna phase redundancy nahi deta. iPDU software mein phase assignment clearly label hoti hai.",
  },
  {
    question: "MQTT PDU monitoring mein kyun use hota hai?",
    answer:
      "MQTT (Message Queuing Telemetry Transport) ek lightweight publish-subscribe protocol hai — low bandwidth, high frequency data streaming ke liye ideal hai. Traditional SNMP polling-based hai (query-response) — high frequency polling network load badhata hai. MQTT PDU real-time data push karta hai as events occur — outlet current change, temperature threshold, alarm trigger sab instantly published hote hain. Modern DCIM platforms aur cloud-based monitoring increasingly MQTT adopt kar rahe hain for edge infrastructure.",
  },
];
