export interface DailySocialPost {
  day: number;
  series: string;
  topic: string;
  posterHeadline: string;
  hook: string;
  visualDirection: string;
  nextTopic?: string;
}

export const dailyPostPlan: DailySocialPost[] = [
  {
    day: 1,
    series: "The Invisible Technology",
    topic: "Who Works Behind the Technology We Use Every Day?",
    posterHeadline: "WHO WORKS BEHIND THE TECHNOLOGY YOU USE EVERY DAY?",
    hook: "Every tap, search, message and stream depends on infrastructure you rarely see.",
    visualDirection:
      "Cinematic smartphone in foreground connected through glowing digital paths to hidden servers, network infrastructure and a massive data center in the background. Premium technology documentary poster, realistic, clean composition.",
    nextTopic: "What Happens After You Tap Send?",
  },
  {
    day: 2,
    series: "The Invisible Technology",
    topic: "What Happens After You Tap Send?",
    posterHeadline: "YOU TAP SEND. THEN WHAT?",
    hook: "A message can travel through networks, infrastructure and servers before reaching another screen.",
    visualDirection:
      "Two smartphones separated by a city, connected through network towers, fiber routes and distant data center infrastructure. Cinematic technical visualization.",
    nextTopic: "The Internet Is More Than Wi-Fi",
  },
  {
    day: 3,
    series: "The Invisible Technology",
    topic: "The Internet Is More Than Wi-Fi",
    posterHeadline: "THE INTERNET IS NOT JUST WI-FI.",
    hook: "Behind your Wi-Fi connection is a global physical infrastructure.",
    visualDirection:
      "Home Wi-Fi router transitioning into fiber optic cables, telecom infrastructure, subsea network and data center. Realistic educational technology poster.",
    nextTopic: "Where Does Your Data Actually Go?",
  },
  {
    day: 4,
    series: "The Invisible Technology",
    topic: "Where Does Your Data Actually Go?",
    posterHeadline: "WHERE DOES YOUR DATA ACTUALLY GO?",
    hook: "Photos, applications and digital services ultimately depend on physical computing and storage infrastructure.",
    visualDirection:
      "Cloud icon visually opening to reveal physical servers, storage systems and illuminated data center racks. Cinematic but technically believable.",
    nextTopic: "Meet the Data Center",
  },
  {
    day: 5,
    series: "The Invisible Technology",
    topic: "Meet the Data Center",
    posterHeadline: "THIS IS WHERE THE DIGITAL WORLD LIVES.",
    hook: "Data centers are physical facilities built to keep computing, storage and network systems operating reliably.",
    visualDirection:
      "Large modern data center hall with symmetrical server racks, controlled lighting, visible infrastructure and strong depth. Premium documentary poster.",
    nextTopic: "What Is Inside a Data Center?",
  },
  {
    day: 6,
    series: "Inside the Data Center",
    topic: "What Is Inside a Data Center?",
    posterHeadline: "WHAT'S INSIDE A DATA CENTER?",
    hook: "Servers are only one part of the infrastructure keeping digital services alive.",
    visualDirection:
      "Cutaway data center showing server racks, electrical infrastructure, cooling, fire protection, security and monitoring systems.",
    nextTopic: "Why Data Centers Need So Much Power",
  },
  {
    day: 7,
    series: "Inside the Data Center",
    topic: "Why Data Centers Need So Much Power",
    posterHeadline: "THE DIGITAL WORLD RUNS ON ELECTRICITY.",
    hook: "Every server, storage system and network device ultimately needs reliable electrical power.",
    visualDirection:
      "Data center racks connected visually to electrical switchgear and power infrastructure with controlled energy-flow effects.",
    nextTopic: "The Data Center Power Journey",
  },
  {
    day: 8,
    series: "Powering the Digital World",
    topic: "The Data Center Power Journey",
    posterHeadline: "HOW DOES POWER REACH A SERVER?",
    hook: "Utility power passes through multiple electrical systems before reaching IT equipment.",
    visualDirection:
      "Clean cinematic power journey from utility grid to transformer, switchgear, UPS, PDU and finally server rack.",
    nextTopic: "Why Data Centers Need Transformers",
  },
  {
    day: 9,
    series: "Powering the Digital World",
    topic: "Why Data Centers Need Transformers",
    posterHeadline: "BEFORE POWER REACHES THE SERVER...",
    hook: "Transformers help provide the voltage levels required by the facility's electrical distribution system.",
    visualDirection:
      "Industrial transformer in foreground transitioning toward a modern data center electrical room and server hall.",
    nextTopic: "What Happens When Grid Power Fails?",
  },
  {
    day: 10,
    series: "Powering the Digital World",
    topic: "What Happens When Grid Power Fails?",
    posterHeadline: "WHAT IF THE GRID GOES DOWN?",
    hook: "Critical facilities use backup power architecture to keep essential loads operating during utility failures.",
    visualDirection:
      "City grid going dark while a data center remains illuminated, with standby generators visible in background.",
    nextTopic: "Meet the Diesel Generator",
  },
  {
    day: 11,
    series: "Powering the Digital World",
    topic: "Meet the Diesel Generator",
    posterHeadline: "WHEN THE GRID FAILS, THIS MACHINE WAKES UP.",
    hook: "Standby generators provide an alternate source of electrical power during utility outages.",
    visualDirection:
      "Large data center standby generator starting during a blackout, realistic industrial engineering environment.",
    nextTopic: "But Generators Need Time",
  },
  {
    day: 12,
    series: "Powering the Digital World",
    topic: "Why UPS Systems Matter",
    posterHeadline: "SERVERS CAN'T WAIT FOR THE GENERATOR.",
    hook: "UPS systems provide continuity of power while the facility transitions between power sources.",
    visualDirection:
      "UPS system visually bridging grid failure and generator startup while server racks remain continuously powered.",
    nextTopic: "Inside a UPS",
  },
  {
    day: 13,
    series: "Powering the Digital World",
    topic: "Inside a UPS",
    posterHeadline: "WHAT'S INSIDE A UPS?",
    hook: "Rectifiers, inverters, static bypass systems and batteries work together to support critical loads.",
    visualDirection:
      "Technical cutaway of a large data center UPS with rectifier, inverter, static bypass and battery path represented visually.",
    nextTopic: "The Battery Bank",
  },
  {
    day: 14,
    series: "Powering the Digital World",
    topic: "The Battery Bank",
    posterHeadline: "THE DATA CENTER'S INSTANT ENERGY RESERVE.",
    hook: "Battery systems store energy that the UPS can use when normal input power is unavailable.",
    visualDirection:
      "Professional data center battery room with organized battery strings and subtle energy-flow visualization.",
    nextTopic: "From UPS to Server Rack",
  },
  {
    day: 15,
    series: "Powering the Digital World",
    topic: "From UPS to Server Rack",
    posterHeadline: "HOW DOES UPS POWER REACH THE SERVER?",
    hook: "Power distribution continues through downstream systems before finally reaching IT equipment.",
    visualDirection:
      "Power path visualization from UPS through distribution equipment and PDU toward illuminated server racks.",
    nextTopic: "Why Servers Get Two Power Feeds",
  },
  {
    day: 16,
    series: "Powering the Digital World",
    topic: "Why Servers Get Two Power Feeds",
    posterHeadline: "WHY TWO POWER CABLES?",
    hook: "Many critical servers use redundant power paths to reduce dependence on a single electrical feed.",
    visualDirection:
      "Server rack with clearly separated A and B power paths feeding dual-power-supply servers.",
    nextTopic: "Servers Turn Electricity Into Heat",
  },
  {
    day: 17,
    series: "Cooling the Digital World",
    topic: "Servers Turn Electricity Into Heat",
    posterHeadline: "COMPUTING CREATES HEAT.",
    hook: "The electrical energy consumed by IT equipment ultimately becomes heat that must be removed.",
    visualDirection:
      "Server rack operating under load with controlled heat visualization rising from equipment.",
    nextTopic: "How Data Centers Stay Cool",
  },
  {
    day: 18,
    series: "Cooling the Digital World",
    topic: "How Data Centers Stay Cool",
    posterHeadline: "HOW DO THOUSANDS OF SERVERS STAY COOL?",
    hook: "Data centers use engineered cooling systems to continuously remove heat from IT spaces.",
    visualDirection:
      "Modern server hall with visible cooling airflow paths and precision cooling infrastructure.",
    nextTopic: "Hot Aisle vs Cold Aisle",
  },
  {
    day: 19,
    series: "Cooling the Digital World",
    topic: "Hot Aisle vs Cold Aisle",
    posterHeadline: "HOT AIR AND COLD AIR MUST NOT MIX.",
    hook: "Airflow management helps cooling systems deliver conditioned air where IT equipment needs it.",
    visualDirection:
      "Server rows showing clearly separated cold aisle intake and hot aisle exhaust airflow.",
    nextTopic: "Precision Cooling",
  },
  {
    day: 20,
    series: "Cooling the Digital World",
    topic: "Precision Cooling",
    posterHeadline: "THIS IS NOT NORMAL AIR CONDITIONING.",
    hook: "Critical IT environments require cooling designed for continuous operation and controlled environmental conditions.",
    visualDirection:
      "Precision cooling equipment beside server racks with engineered airflow visualization.",
    nextTopic: "What If Cooling Fails?",
  },
  {
    day: 21,
    series: "Cooling the Digital World",
    topic: "What If Cooling Fails?",
    posterHeadline: "WHAT HAPPENS WHEN COOLING STOPS?",
    hook: "Without adequate heat removal, server inlet temperatures can rise rapidly.",
    visualDirection:
      "Data center cooling fault scenario with temperature visualization increasing around active server racks.",
    nextTopic: "How Data Centers Detect Fire Early",
  },
  {
    day: 22,
    series: "Protecting the Digital World",
    topic: "How Data Centers Detect Fire Early",
    posterHeadline: "FIRE MUST BE DETECTED BEFORE IT SPREADS.",
    hook: "Critical facilities use multiple layers of fire detection to identify developing fire conditions.",
    visualDirection:
      "Data center ceiling and racks with smoke detection and aspirating detection concept shown professionally.",
    nextTopic: "How Data Centers Fight Fire",
  },
  {
    day: 23,
    series: "Protecting the Digital World",
    topic: "How Data Centers Fight Fire",
    posterHeadline: "YOU CAN'T PROTECT SERVERS LIKE A NORMAL ROOM.",
    hook: "Data centers use carefully engineered fire protection strategies suited to critical electrical and IT environments.",
    visualDirection:
      "Protected server room with fire detection and clean-agent suppression infrastructure represented realistically.",
    nextTopic: "Physical Security",
  },
  {
    day: 24,
    series: "Protecting the Digital World",
    topic: "Physical Security",
    posterHeadline: "WHO CAN ACTUALLY ENTER A DATA CENTER?",
    hook: "Physical access to critical infrastructure is controlled through multiple security layers.",
    visualDirection:
      "Secure data center entrance with access control, surveillance and layered restricted zones.",
    nextTopic: "The Data Center Control Room",
  },
  {
    day: 25,
    series: "Operating the Digital World",
    topic: "The Data Center Control Room",
    posterHeadline: "WHO WATCHES THE DATA CENTER 24/7?",
    hook: "Operations teams continuously monitor critical infrastructure, alarms and environmental conditions.",
    visualDirection:
      "Professional data center operations control room with monitoring displays and engineers observing infrastructure.",
    nextTopic: "BMS and DCIM",
  },
  {
    day: 26,
    series: "Operating the Digital World",
    topic: "BMS and DCIM",
    posterHeadline: "THE DATA CENTER HAS A NERVOUS SYSTEM.",
    hook: "Monitoring platforms help operators understand the condition and performance of critical infrastructure.",
    visualDirection:
      "Data center digital monitoring interface connected visually to power, cooling and server infrastructure.",
    nextTopic: "Meet the Server Rack",
  },
  {
    day: 27,
    series: "Computing the Digital World",
    topic: "Meet the Server Rack",
    posterHeadline: "INSIDE THESE RACKS LIVES COMPUTING POWER.",
    hook: "Racks organize servers, network equipment and supporting IT infrastructure.",
    visualDirection:
      "Open premium server rack showing organized servers, network switches, cabling and power distribution.",
    nextTopic: "What Does a Server Actually Do?",
  },
  {
    day: 28,
    series: "Computing the Digital World",
    topic: "What Does a Server Actually Do?",
    posterHeadline: "WHAT DOES A SERVER ACTUALLY DO?",
    hook: "Servers provide computing resources that applications and digital services depend on.",
    visualDirection:
      "Enterprise server transitioning visually into websites, applications, databases and digital services.",
    nextTopic: "Where Is All the Data Stored?",
  },
  {
    day: 29,
    series: "Computing the Digital World",
    topic: "Where Is All the Data Stored?",
    posterHeadline: "WHERE DO BILLIONS OF FILES LIVE?",
    hook: "Storage systems preserve and serve the data used by applications and digital services.",
    visualDirection:
      "Enterprise storage arrays inside a data center connected to servers and abstract digital data elements.",
    nextTopic: "How Servers Talk to the World",
  },
  {
    day: 30,
    series: "Computing the Digital World",
    topic: "How Servers Talk to the World",
    posterHeadline: "SERVERS ARE USELESS IF THEY CAN'T CONNECT.",
    hook: "Network infrastructure connects computing systems to each other and ultimately to users.",
    visualDirection:
      "Server racks connected through network switches, fiber infrastructure and outward toward global connectivity.",
    nextTopic: "The Journey Continues: Cloud and AI",
  },
];