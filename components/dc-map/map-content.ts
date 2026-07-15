// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/map-content.ts
//
// Educational copy for every component on the Interactive Data Center
// Map, written in the platform's natural Hinglish voice — same tone as
// the flagship articles. Kept separate from map-data.ts so geometry and
// content evolve independently (one responsibility per file).
//
// Structure per component mirrors the info panel sections:
//   purpose        → yeh kya karta hai
//   working        → andar kaam kaise hota hai
//   whyRequired    → iske bina kya problem hai
//   failureImpact  → fail hone par kya hota hai
//
// No fabricated project statistics anywhere — only standard, verifiable
// engineering facts (voltages, redundancy concepts, code requirements).
// ═══════════════════════════════════════════════════════════════════════════

export interface DcComponentContent {
  purpose: string;
  working: string;
  whyRequired: string;
  failureImpact: string;
}

export const DC_CONTENT: Record<string, DcComponentContent> = {
  "utility-grid": {
    purpose:
      "Utility grid data center ka primary power source hai. Poora facility normally isi supply par chalta hai — DG sets sirf backup ke liye hote hain.",
    working:
      "State utility ya private supplier HT level par power deta hai — typically 11kV, 33kV ya bade campuses ke liye 66kV/132kV. Yeh supply HT yard ke through facility ke andar aati hai.",
    whyRequired:
      "Data center ko 24×7 continuous, economical power chahiye. Grid supply DG ke comparison mein sasti aur cleaner hoti hai, isliye normal operation hamesha grid par hi hota hai.",
    failureImpact:
      "Grid fail hote hi UPS batteries instantly load pakad leti hain, aur DG sets auto-start hoke kuch seconds mein supply restore karte hain. Agar DG bhi fail ho jaye, to battery autonomy khatam hote hi poora facility down ho jata hai.",
  },
  "ht-yard": {
    purpose:
      "HT yard woh outdoor switchyard hai jahan utility ki high-tension supply facility mein receive, meter aur protect ki jaati hai.",
    working:
      "Incoming HT line gantry structure par terminate hoti hai. Isolators, circuit breakers, CT/PT metering aur surge arresters ke through power controlled tarike se RMU aur transformers tak jaati hai.",
    whyRequired:
      "Utility interface par ek defined demarcation point chahiye — jahan metering ho, protection ho, aur fault hone par supply ko safely isolate kiya ja sake. HT yard yahi kaam karta hai.",
    failureImpact:
      "HT yard mein fault matlab poora utility incomer down. Facility turant DG par shift ho jaati hai, lekin jab tak yard restore nahi hota, redundancy ek level kam ho jaati hai — Tier III/IV mein yeh serious operational risk mana jata hai.",
  },
  rmu: {
    purpose:
      "RMU (Ring Main Unit) compact MV switchgear hai jo HT supply ko receive karke transformers ki taraf distribute aur protect karta hai.",
    working:
      "Sealed enclosure ke andar load-break switches aur fuse/breaker combination hota hai — aksar SF6 ya vacuum insulated. Ring configuration mein do incoming paths hote hain, isliye ek path fail hone par doosre se supply continue rehti hai.",
    whyRequired:
      "Transformer ko direct HT line par nahi daala jata — beech mein switching aur protection layer chahiye. RMU compact footprint mein yahi safety aur ring redundancy deta hai.",
    failureImpact:
      "RMU fault hone par uske downstream transformer ki supply cut ho jaati hai. Ring design mein load doosre path par shift ho sakta hai; radial design mein woh transformer tab tak down rahega jab tak RMU repair na ho.",
  },
  transformer: {
    purpose:
      "Transformer utility ki HT supply (jaise 11kV) ko usable LT level (415V) par step-down karta hai — isi voltage par facility ke panels aur equipment chalte hain.",
    working:
      "Electromagnetic induction ka principle: primary winding HT side par, secondary LT side par. Turns ratio ke hisaab se voltage neeche aata hai. Oil-filled ya dry-type construction hoti hai, cooling fins ke saath.",
    whyRequired:
      "11kV par koi server ya panel directly nahi chal sakta. Distribution losses kam karne ke liye power HT par transmit hoti hai aur use point ke paas LT par convert hoti hai — transformer yeh conversion karta hai.",
    failureImpact:
      "Transformer failure ka matlab uska poora downstream LT section dead. Isliye data centers mein N+1 ya 2N transformer configuration hoti hai — ek unit fail ho to doosra load utha leta hai. Replacement mein weeks lag sakte hain, isliye redundancy critical hai.",
  },
  "dg-sets": {
    purpose:
      "DG sets facility ka emergency power plant hain. Grid fail hone par yeh poore data center ko chalane ki zimmedari lete hain — ghanto ya dino tak.",
    working:
      "Diesel engine alternator ko rotate karta hai aur electricity generate hoti hai. AMF (Auto Mains Failure) panel grid supply monitor karta hai — grid jaate hi DG ko start command milti hai, aur typically kuch hi seconds mein DG load lene layak ho jata hai.",
    whyRequired:
      "UPS batteries sirf minutes ka backup deti hain — woh bridge hain, solution nahi. Extended outage mein continuous power sirf DG hi de sakta hai. Tier III/IV facilities mein DG ko hi 'primary' long-duration source design kiya jata hai.",
    failureImpact:
      "Grid outage ke दौरान DG start na hua, to battery autonomy khatam hote hi poora facility down. Isliye DG sets ki N+1 redundancy, weekly test runs aur load bank testing standard practice hai.",
  },
  "fuel-system": {
    purpose:
      "Fuel system bulk tank se DG sets tak diesel ki continuous, clean supply ensure karta hai — transfer pumps, piping, filtration aur day tanks ke through.",
    working:
      "Transfer pumps bulk storage se fuel kheench kar har DG ke paas lage day tank mein bharte hain. Level sensors automatic filling control karte hain, aur filtration/polishing units fuel se paani aur particles nikaalte hain.",
    whyRequired:
      "DG ke engine ko clean fuel constant pressure par chahiye. Bulk tank door hota hai aur gravity feed reliable nahi hoti — isliye engineered transfer system zaroori hai. Purana diesel degrade bhi hota hai, isliye polishing bhi chahiye.",
    failureImpact:
      "Fuel transfer fail ho jaye to DG sirf day tank ke fuel tak chalega — uske baad extended outage mein shutdown. Contaminated fuel se injectors choke hote hain aur DG load par trip kar sakta hai — exactly us waqt jab uski sabse zyada zaroorat hoti hai.",
  },
  "fuel-tank": {
    purpose:
      "Bulk fuel tank facility ka diesel reserve store karta hai — yahi decide karta hai ki grid outage mein data center kitne ghante ya din tak DG par chal sakta hai.",
    working:
      "Above-ground ya underground steel tank, level monitoring, vents aur spill containment (bund wall) ke saath. Refuelling tanker se hoti hai; supply DG day tanks tak transfer pumps le jaate hain.",
    whyRequired:
      "Tier standards extended runtime maangte hain — Uptime Institute Tier III/IV ke liye minimum 12 ghante on-site fuel at design load ek common baseline hai, aur operators aksar 24–72 ghante rakhte hain. Bina bulk storage ke DG backup ka koi matlab nahi.",
    failureImpact:
      "Tank leak environmental hazard aur fuel loss dono hai. Level monitoring fail ho jaye to team ko galat runtime estimate milta hai — long outage mein fuel khatam hona poore facility ke shutdown ka sabse avoidable reason hai.",
  },
  "cooling-tower": {
    purpose:
      "Cooling towers building ki saari heat ko finally atmosphere mein reject karte hain. Chillers ne jo garmi absorb ki, use bahar phenkne ka last stage yahi hai.",
    working:
      "Garam condenser water tower ke andar fill media par spray hota hai. Fans hawa ko upar ki taraf kheenchte hain, thoda paani evaporate hota hai, aur evaporation baaki paani ko thanda kar deta hai. Thanda paani wapas chiller ke condenser mein jaata hai.",
    whyRequired:
      "Chiller heat absorb karta hai, destroy nahi. Woh heat kahin jaani chahiye — water-cooled plants mein cooling tower hi woh 'heat exit door' hai. Iske bina chiller condenser pressure par trip kar jayega.",
    failureImpact:
      "Tower fans ya pumps fail hone par condenser water garam hota jata hai aur chillers high-pressure par trip karte hain. Server hall ka temperature minutes mein climb karta hai — cooling failure ka thermal runaway power failure se bhi tez nuksaan karta hai.",
  },
  chiller: {
    purpose:
      "Chiller data center cooling ka engine hai — yeh chilled water produce karta hai (typically 7–14°C range) jo CRAH units tak jaakar server hall ki garmi absorb karti hai.",
    working:
      "Vapor-compression refrigeration cycle: evaporator mein refrigerant chilled water se heat lekar evaporate hota hai, compressor use high pressure par le jaata hai, condenser mein woh heat condenser water ko de deta hai, aur expansion valve cycle repeat karta hai.",
    whyRequired:
      "IT load jitni power consume karta hai, lagbhag utni hi heat generate karta hai. Is scale ki heat sirf mechanical refrigeration hi handle kar sakti hai — free cooling favourable climate mein supplement karti hai, replace nahi.",
    failureImpact:
      "Chiller trip hone par chilled water temperature turant rise karta hai. Thermal storage buffer kuch minutes deta hai, lekin standby chiller start na hua to hall temperature ASHRAE limits cross kar jata hai aur servers thermal shutdown lene lagte hain.",
  },
  pumps: {
    purpose:
      "Pumps cooling system ka circulation banaye rakhte hain — chilled water (CHW) ko CRAH units tak aur condenser water (CDW) ko cooling towers tak continuously move karte hain.",
    working:
      "Centrifugal pumps motor se chalte hain aur closed piping loops mein flow maintain karte hain. Primary pumps chiller ke through constant flow rakhte hain; secondary pumps VFD ke saath load ke hisaab se flow modulate karte hain.",
    whyRequired:
      "Paani khud nahi ghoomta. Chiller kitna bhi acha ho, agar chilled water CRAH tak pahunchi hi nahi to cooling zero hai. Pumps hi poore hydraulic loop ki lifeline hain.",
    failureImpact:
      "Pump failure ka matlab us loop mein flow stop — chiller low-flow par trip karega aur CRAH coils garam ho jayengi. Isliye pumps hamesha N+1 mein lagte hain, auto changeover ke saath, aur unki power essential/UPS-backed hoti hai.",
  },
  "lt-panel": {
    purpose:
      "LT panel (main LV switchboard) facility ka electrical junction hai — transformer aur DG dono ki supply yahan aati hai, aur yahin se UPS, cooling aur baaki loads ko power distribute hoti hai.",
    working:
      "415V busbar system ke saath ACBs (air circuit breakers) incoming aur outgoing feeders control karte hain. Protection relays CT/PT inputs analyze karte hain — fault detect hone par relay breaker ko trip command deta hai, breaker khud decide nahi karta.",
    whyRequired:
      "Har load ko controlled, protected feeder chahiye. LT panel ke bina selective isolation possible nahi — ek chhota fault poore system ko gira dega. Yahi panel grid↔DG changeover ka bhi point hota hai.",
    failureImpact:
      "Main LT panel ka busbar fault catastrophic hota hai — uske peeche ka sab kuch down. Isliye Tier III/IV designs mein do independent LT boards (A/B paths) hote hain, taaki ek board ke failure ya maintenance mein doosra poora load sambhal le.",
  },
  ups: {
    purpose:
      "UPS grid aur DG ke beech ka gap zero kar deta hai — power jaate hi milliseconds ke bina kisi break ke battery se clean supply continue rakhta hai.",
    working:
      "Double-conversion online UPS mein rectifier incoming AC ko DC banata hai, DC bus battery se juda hota hai, aur inverter usse wapas perfect AC banata hai. Input chala jaye to battery DC bus ko feed karti hai — output par koi transfer time nahi aata.",
    whyRequired:
      "DG ko start hone mein seconds lagte hain, lekin server ek millisecond ka bhi dip tolerate nahi karta. UPS yeh bridge hai — saath hi voltage sags, spikes aur harmonics se bhi IT load ko isolate karta hai.",
    failureImpact:
      "UPS fail ho aur bypass bhi available na ho, to critical load turant raw mains par ya down — dono unacceptable. Isliye N+1 modules, static bypass, aur A/B side dual UPS systems standard design practice hai.",
  },
  "battery-bank": {
    purpose:
      "Battery bank UPS ki energy reserve hai — grid failure ke baad DG ke load lene tak ka poora bridge yahi DC energy deta hai.",
    working:
      "VRLA ya lithium-ion cells series strings mein connect hoke UPS ke DC bus voltage tak pahunchte hain. Normal operation mein float charge par rehti hain; discharge sirf outage mein hota hai. BMS/monitoring har string ki health track karta hai.",
    whyRequired:
      "UPS ke paas apni koi energy nahi hoti — woh sirf converter hai. Autonomy (backup minutes) poori tarah battery sizing se aati hai. Battery hi decide karti hai ki DG start hone ke liye kitna window hai.",
    failureImpact:
      "Ek weak cell poori string ki capacity gira deta hai. Real outage mein battery expected time se pehle khatam ho jaye — aur DG ne abhi load nahi liya — to facility hard down. Isliye periodic discharge testing aur cell-level monitoring non-negotiable hai.",
  },
  sts: {
    purpose:
      "STS (Static Transfer Switch) do independent power sources ke beech load ko itni tezi se transfer karta hai ki downstream equipment ko pata bhi nahi chalta.",
    working:
      "Thyristor (SCR) based switching — koi mechanical contact movement nahi. Source A ki quality continuously monitor hoti hai; problem detect hote hi quarter-cycle ke andar (typically 4–8ms) load Source B par shift ho jata hai.",
    whyRequired:
      "Single-corded ya legacy equipment ke liye A/B redundancy ka fayda tabhi hai jab transfer seamless ho. Mechanical changeover bahut slow hai — STS hi woh speed deta hai jo IT load ke ride-through se chhota ho.",
    failureImpact:
      "STS khud single point of failure ban sakta hai agar design mein dhyan na ho. Iske fail hone par uske downstream loads ka A/B advantage khatam — isliye STS maintenance bypass ke saath lagta hai aur uski apni redundancy plan hoti hai.",
  },
  "server-hall": {
    purpose:
      "Server hall (white space) data center ka core hai — yahi woh controlled environment hai jahan saare racks, IT equipment aur unka supporting distribution rehta hai.",
    working:
      "Hall ka environment tightly controlled hota hai: temperature aur humidity ASHRAE guidelines ke andar, hot/cold aisle arrangement airflow ko discipline karta hai, aur access strictly restricted hota hai.",
    whyRequired:
      "Servers ko stable temperature, clean power aur physical security chahiye. Poora baaki infrastructure — power chain, cooling plant, fire systems — sirf is ek hall ko protect karne ke liye बना hai.",
    failureImpact:
      "Hall level ki failure (cooling loss, water leak, fire event) ek saath sैकड़ों racks ko affect karti hai. Isliye multi-hall designs mein risk ko compartmentalize kiya jata hai — ek hall ki problem doosre hall tak na pahunche.",
  },
  pdu: {
    purpose:
      "PDU UPS ki output ko server hall ke andar distribute karta hai — yeh UPS aur racks ke beech ki main distribution layer hai.",
    working:
      "Floor-standing panel jisme main breaker, distribution breakers aur branch circuit monitoring hoti hai. Kai designs mein isolation transformer bhi hota hai jo voltage ko rack level (jaise 415/230V) par adjust karta hai aur ground isolation deta hai.",
    whyRequired:
      "UPS se direct sैकड़ों racks tak cable nahi jaa sakti — beech mein organized, protected, monitored distribution chahiye. PDU per-circuit protection aur power metering deta hai jo capacity planning ke liye zaroori hai.",
    failureImpact:
      "PDU failure uske saare downstream racks ki us side ki supply gira deta hai. Dual-corded IT load doosre path (B-side PDU) se chalta rehta hai — yahi wajah hai ki A aur B PDUs alag rooms/paths se aate hain.",
  },
  busway: {
    purpose:
      "Overhead busway racks ke upar chalne wala power highway hai — cable trays ke jungle ki jagah ek clean, flexible distribution rail.",
    working:
      "Copper/aluminium conductors ek enclosed housing mein rack rows ke upar run karte hain. Har rack ke upar tap-off box plug hota hai jisse rack ki supply milti hai — naya rack aaya to bas naya tap-off, koi naya cable pull nahi.",
    whyRequired:
      "Traditional under-floor cabling mein har change slow, messy aur airflow-blocking hota hai. Busway moves/adds/changes ko minutes ka kaam bana deta hai aur raised floor plenum ko cooling ke liye khali rakhta hai.",
    failureImpact:
      "Busway ka ek section fault hone par uske saare tap-offs de-energize ho jaate hain. A/B dual busway design mein racks doosri rail se chalte rehte hain — single busway design mein poori row down ho sakti hai.",
  },
  "server-racks": {
    purpose:
      "Racks woh standardized frames hain jinme servers, storage aur network gear mount hota hai — data center ki saari value inhi ke andar hoti hai.",
    working:
      "Standard 19-inch width, height U mein measure hoti hai (1U = 44.45mm; 42U common hai). Equipment front se cold air leta hai aur peeche hot aisle mein garam hawa nikaalta hai. Har rack ko A aur B dono paths se power milti hai rack PDUs ke through.",
    whyRequired:
      "Standardization ke bina density, cabling aur cooling — sab chaos ho jata hai. Rack hi woh unit hai jisme power (kW/rack), cooling aur space ki planning hoti hai.",
    failureImpact:
      "Ek rack ki dono power feeds ek saath jaana rare hai — dual-path design isi ke liye hai. Zyada common failure hai poor airflow management: blanking panels missing hon to hot air recirculate hoke equipment ko overheat kar deti hai.",
  },
  "remote-pdu": {
    purpose:
      "Remote PDU (RPP — Remote Power Panel) main PDU ki capacity ko hall ke door wale hisson tak extend karta hai, bina lambi branch cabling ke.",
    working:
      "Compact panel jo main PDU ya busway se feed hota hai aur apne aas-paas ke racks ko branch circuits deta hai. Branch circuit monitoring se har circuit ka load dikhta hai.",
    whyRequired:
      "Bade halls mein main PDU se har rack tak individual circuits kheenchna impractical hai — voltage drop aur cable congestion dono badhte hain. RPP distribution ko load ke paas le aata hai.",
    failureImpact:
      "RPP failure uske local rack group ki us-side supply cut karta hai. Dual-corded equipment B-side se chalta rahega — isliye A-side aur B-side RPPs alag parent paths se feed hote hain.",
  },
  "raised-floor": {
    purpose:
      "Raised floor ek structural platform hai jo cooling ka underfloor plenum banata hai — CRAH ki thandi hawa isi ke neeche pressurize hoke perforated tiles se racks tak pahunchti hai.",
    working:
      "Pedestals par 600×600mm tiles ka grid. Neeche ka space cold air plenum hota hai; perforated tiles sirf cold aisles mein lagti hain taaki air wahi niklegi jahan chahiye. Kuch designs mein piping/cabling bhi neeche route hoti hai.",
    whyRequired:
      "Underfloor supply designs mein plenum hi air distribution ka mechanism hai — bina raised floor ke CRAH ki hawa ko racks tak evenly पहुंचाने ka koi controlled path nahi. (Slab-floor designs isko overhead ducting/containment se replace karte hain.)",
    failureImpact:
      "Galat jagah khuli tiles ya missing grommets plenum pressure gira dete hain — door wale racks ko hawa milna band ho jaati hai aur hot spots bante hain. Cooling ki kai 'mystery problems' ka reason bas ek uthi hui tile hoti hai.",
  },
  crah: {
    purpose:
      "CRAH (Computer Room Air Handler) chilled water se chalne wala precision air handler hai — server hall ki garam hawa ko thanda karke wapas supply karta hai.",
    working:
      "Hot aisle ki return air CRAH ke chilled-water coil ke upar se guzarti hai — heat paani mein transfer ho jaati hai aur garam paani chiller plant ko wapas chala jata hai. EC fans thandi hawa ko plenum ya hall mein push karte hain. Compressor CRAH ke andar nahi hota — cooling chilled water se aati hai.",
    whyRequired:
      "Comfort AC office ke liye hai, data center ke liye nahi — yahan 24×7 sensible cooling, tight humidity control aur high airflow chahiye. Chilled-water plants mein CRAH hi hall ke andar ka delivery mechanism hai.",
    failureImpact:
      "Ek CRAH trip ho to N+1 design mein baaki units fan speed badha kar cover kar lete hain. Chilled water supply hi ruk jaye to saare CRAH sirf pankhe reh jaate hain — hall temperature minutes mein unsafe ho jata hai.",
  },
  crac: {
    purpose:
      "CRAC (Computer Room Air Conditioner) self-contained precision cooling unit hai — iske andar apna refrigeration circuit hota hai, isliye yeh chiller plant ke bina bhi kaam karta hai.",
    working:
      "DX (direct expansion) cycle unit ke andar hi chalta hai: compressor, evaporator coil aur expansion device andar; heat bahar condenser tak refrigerant piping se jaati hai. Return air evaporator coil par thandi hoti hai aur supply ho jaati hai.",
    whyRequired:
      "Chhote/medium rooms, edge sites, ya chiller plant ke independent backup ke liye DX units practical hote hain — kam infrastructure, simple installation. Kai facilities CRAH + kuch CRAC ka mix rakhti hain diversity ke liye.",
    failureImpact:
      "CRAC ka compressor fail ho to woh unit poori tarah cooling dena band kar deta hai (CRAH jaisa 'sirf coil garam' scenario nahi — yahan cycle hi ruk jata hai). N+1 unit design aur refrigerant leak monitoring isliye zaroori hai.",
  },
  vesda: {
    purpose:
      "VESDA (Very Early Smoke Detection Apparatus) aspirating detection system hai — yeh fire ko us stage par pakadta hai jab abhi sirf invisible smoke particles ban rahe hote hain.",
    working:
      "Sampling pipes ka network continuously hall ki hawa ko detector chamber tak kheenchta hai. Laser-based chamber particle density measure karta hai — normal detectors se kai guna zyada sensitive. Multiple alarm thresholds (Alert → Action → Fire) staged response dete hain.",
    whyRequired:
      "Data center mein 'fire lag gayi' tak wait karna option nahi — high airflow smoke ko dilute kar deta hai aur point detectors late react karte hain. VESDA early warning deta hai jab problem abhi ek overheating component hoti hai, disaster nahi.",
    failureImpact:
      "VESDA down ho to early-warning layer chali jaati hai — detection wapas conventional detectors par depend karega jo incipient stage miss kar dete hain. Blocked sampling pipes silently coverage kam kar dete hain, isliye pipe integrity checks routine mein hote hain.",
  },
  fm200: {
    purpose:
      "FM200 / Novec 1230 clean-agent suppression systems hain — yeh fire ko bujha dete hain bina paani ke, taaki servers aur data safe rahein.",
    working:
      "Pressurized cylinders mein agent liquid form mein stored hota hai. Confirmed detection (typically cross-zoning — do independent detectors) par control panel discharge trigger karta hai; agent nozzles se seconds mein poore protected volume mein bhar jata hai aur heat absorb karke combustion chain rok deta hai.",
    whyRequired:
      "Sprinkler ka paani fire ke saath-saath poora hall bhi destroy kar dega. Clean agents electronics ke liye safe hain, residue nahi chhodte, aur occupied spaces ke liye design concentrations par safe mane jaate hain.",
    failureImpact:
      "Accidental discharge lakhs ka agent waste karta hai aur refill tak hall unprotected rehta hai. Room integrity (door seals, dampers) fail ho to agent leak hoke required concentration hold nahi kar paata — isliye room integrity fan test commissioning ka mandatory part hai.",
  },
  "isp-entry": {
    purpose:
      "ISP entry woh physical point hai jahan carriers ki fiber facility ke andar aati hai — data center ka internet se pehla handshake yahi hota hai.",
    working:
      "Underground conduits fiber ko property boundary se entry vault tak laate hain, phir Meet-Me Room tak. Serious facilities mein do diverse entries hoti hain — alag routes, alag building corners — taaki ek physical cut sab kuch na kaat de.",
    whyRequired:
      "Data center bina connectivity ke sirf ek mehenga godown hai. Redundant power ka koi matlab nahi agar single fiber path hi सब kuch carry kar raha hai.",
    failureImpact:
      "Single entry design mein ek excavator ka ek galat scoop poora facility internet se kaat sakta hai — 'backhoe fade' industry ka classic outage hai. Diverse entries mein traffic doosre path par reroute ho jata hai.",
  },
  "meet-me-room": {
    purpose:
      "Meet-Me Room (MMR) woh neutral space hai jahan alag-alag carriers aur customers ke networks physically interconnect hote hain.",
    working:
      "Har carrier ki fiber apne racks par terminate hoti hai; cross-connects (patch fibers) structured tarike se ek network ko doosre se jodte hain. Access strictly controlled hota hai kyunki yahan multiple parties ka critical infrastructure ek saath hai.",
    whyRequired:
      "Carriers ko customers tak aur customers ko carriers tak ek organized, secure, documented interconnection point chahiye. MMR ke bina cross-connections ad-hoc aur untraceable ho jaati hain.",
    failureImpact:
      "MMR mein ek galat patch poori connectivity confuse kar sakta hai, aur yahan ka environmental/power failure ek saath saare carriers ko affect karta hai — isliye MMR ko bhi critical space ki tarah treat kiya jata hai (redundant power, cooling, access control).",
  },
  "core-network": {
    purpose:
      "Core network data center ke traffic ka backbone hai — saara north-south (bahar↔andar) aur major east-west (andar hi andar) traffic isi layer se route hota hai.",
    working:
      "High-throughput routers/switches redundant pairs mein chalte hain. Routing protocols (jaise BGP/OSPF) paths decide karte hain; ek device ya link fail ho to traffic seconds ke andar alternate path par converge ho jata hai.",
    whyRequired:
      "Hazaaron servers ka traffic kisi ek central, high-capacity, fault-tolerant layer se aggregate hona chahiye — warna network flat aur unscalable ho jata hai.",
    failureImpact:
      "Redundancy ke bawajood core ka misconfiguration poore facility ka traffic down kar sakta hai — network outages ka sabse common reason hardware failure nahi, human change error hota hai. Isliye core changes strict change-control se guzarte hain.",
  },
  distribution: {
    purpose:
      "Distribution/leaf switches core aur racks ke beech ki layer hain — server ports yahi terminate hote hain, typically Top-of-Rack (ToR) switches par.",
    working:
      "Har rack (ya rack group) ka ToR switch uplinks se distribution/spine layer tak connect hota hai. Modern leaf-spine designs mein har leaf har spine se connect hota hai — koi bhi do servers maximum do hops door.",
    whyRequired:
      "Har server ko directly core se jodna cabling aur port economics dono mein impossible hai. Distribution layer aggregation deta hai aur failures ko rack-level par contain karta hai.",
    failureImpact:
      "Ek ToR switch fail hone par us rack ke single-homed servers network se kat jaate hain. Dual-homed servers (do alag ToR se connected) chalte rehte hain — critical workloads isi liye dual-homing maangte hain.",
  },
  "storage-san": {
    purpose:
      "SAN (Storage Area Network) centralized block storage hai — servers ka data unke andar nahi, is shared, protected storage layer par rehta hai.",
    working:
      "Storage arrays (controllers + disk/flash shelves) dedicated network se — Fibre Channel ya iSCSI/NVMe-oF — servers se jude hote hain. RAID aur replication data ko disk failures se protect karte hain; dual controllers aur dual fabrics path redundancy dete hain.",
    whyRequired:
      "Compute replaceable hai; data nahi. Centralized storage snapshots, replication, aur capacity management deta hai jo server-local disks par possible nahi.",
    failureImpact:
      "Storage outage server outage se zyada bura hota hai — compute wapas aa jata hai, corrupt ya lost data nahi. Dono controllers ya dono fabric paths ek saath jaana rare hai, lekin aisi event poore dependent application stack ko down kar deti hai.",
  },
  backup: {
    purpose:
      "Backup systems data ki last line of defence hain — ransomware, accidental deletion, corruption ya site disaster ke baad wapas laane ka rasta.",
    working:
      "Backup software scheduled copies leta hai — disk repositories, tape libraries ya offsite/cloud targets par. 3-2-1 rule standard hai: 3 copies, 2 alag media, 1 offsite. Immutable/air-gapped copies ransomware ke against critical hain.",
    whyRequired:
      "RAID aur replication failures se bachate hain, galtiyon se nahi — delete ya encrypt hua data दोनों jagah sync ho jata hai. Sirf backup hi time mein peeche jaane deta hai.",
    failureImpact:
      "Backup failure tab tak invisible hai jab tak restore ki zaroorat na pade — aur tab woh sabse mehenga surprise hota hai. Isliye restore testing (sirf backup success logs nahi) hi asli measure hai.",
  },
  "security-room": {
    purpose:
      "Security room facility ke physical security ka command center hai — CCTV walls, access control servers aur guard operations sab yahin se chalti hain.",
    working:
      "24×7 manned room jahan video management system, access control head-end aur intercom/alarm panels consolidated hote hain. Incidents yahan se coordinate hote hain aur visitor authorizations verify hoti hain.",
    whyRequired:
      "Cameras aur card readers khud decisions nahi lete — trained log aur centralized systems chahiye jo events ko dekhein, correlate karein aur respond karein.",
    failureImpact:
      "Security room ki power/network failure surveillance ko blind kar sakti hai — isliye iske systems UPS-backed hote hain aur recording redundant/local bhi hoti hai taaki live monitoring loss mein bhi evidence capture chalta rahe.",
  },
  "access-control": {
    purpose:
      "Access control system decide karta hai ki kaun, kahan, kab enter kar sakta hai — card readers, controllers aur mantraps ke through layered entry.",
    working:
      "Card/credential reader par present hota hai, controller access rules check karta hai, authorized hone par door strike release hota hai. Data center entries mein mantrap (do interlocked doors — pehla band, tabhi doosra khulta hai) tailgating rokta hai.",
    whyRequired:
      "Duniya ka best firewall bekaar hai agar koi bhi server room mein walk-in kar sake. Physical access hi ultimate access hai — isliye yeh security ki foundation layer hai.",
    failureImpact:
      "System failure par doors fail-secure (band) ya fail-safe (open, fire codes ke liye) behave karte hain — dono ka galat combination ya to logon ko fansa deta hai ya facility ko khol deta hai. Isliye door-by-door failure mode deliberately design hota hai.",
  },
  biometric: {
    purpose:
      "Biometric readers identity ko us cheez se verify karte hain jo chori nahi ho sakti — fingerprint, iris ya face. Card sharing ka loophole yahan band ho jata hai.",
    working:
      "Enrollment par biometric ka mathematical template store hota hai (image nahi). Har attempt par live scan template se match hota hai; high-security doors par card + biometric dono chahiye (two-factor).",
    whyRequired:
      "Card batayi ja sakti hai, di ja sakti hai, chori ho sakti hai. Data hall jaise critical areas ke liye 'jo aap ho' wala factor zaroori hai, sirf 'jo aapke paas hai' kaafi nahi.",
    failureImpact:
      "Reader failure entry bottleneck banata hai — fallback procedures (guard verification, secondary reader) pehle se defined hone chahiye, warna log tailgating aur door-propping jaise workarounds karne lagte hain jo poori security ko defeat kar dete hain.",
  },
  cctv: {
    purpose:
      "CCTV facility ki visual memory hai — perimeter se rack aisles tak har movement record hota hai, deterrence aur investigation dono ke liye.",
    working:
      "IP cameras PoE par network se jude hote hain; VMS/NVR footage record karta hai defined retention period tak. Analytics motion/line-crossing par alerts generate karti hai; critical areas continuous record hote hain.",
    whyRequired:
      "Access logs batate hain card kiska tha; camera batata hai andar gaya kaun tha. Incident investigation, compliance audits aur live situational awareness — teeno ke liye video mandatory hai.",
    failureImpact:
      "Recording gap ka matlab us window ki koi visual evidence nahi — incident ke baad yahi gap sabse mehenga sabit hota hai. Isliye NVR storage, camera health monitoring aur retention compliance regular audits mein check hote hain.",
  },
  noc: {
    purpose:
      "NOC woh 24×7 room hai jahan se poore facility ki health par nazar rakhi jaati hai — network, IT services aur infrastructure alarms sab ek video wall par.",
    working:
      "Operators monitoring dashboards (network, DCIM, BMS feeds) watch karte hain, alarms ko triage karte hain, tickets banate hain aur defined runbooks/escalation matrix follow karte hain. Shift handovers formally documented hote hain.",
    whyRequired:
      "Alarms raat 3 baje bhi aate hain. Automated systems detect karte hain, lekin coordinate aur respond insaan karte hain — NOC hi woh insaani layer hai jo MTTR (repair time) ko chhota rakhti hai.",
    failureImpact:
      "NOC processes weak hon to alarms miss ya late-acknowledge hote hain — chhoti problem bade outage mein badal jaati hai. Post-incident reviews mein 'alarm aaya tha, action nahi hua' sabse painful finding hoti hai.",
  },
  bms: {
    purpose:
      "BMS building ke mechanical/electrical systems ka automation brain hai — chillers, CRAH, pumps, dampers, sensors sab isi se monitor aur control hote hain.",
    working:
      "Field sensors aur controllers (DDC) BACnet/Modbus jaise protocols par BMS head-end se baat karte hain. Setpoints ke against control loops chalte hain — temperature badha to BMS cooling stage-up karta hai; equipment trip hua to alarm generate hota hai.",
    whyRequired:
      "Sैकड़ों mechanical devices ko manually optimal chalana impossible hai. BMS sequences of operation ko consistently execute karta hai aur operators ko sirf exceptions par focus karne deta hai.",
    failureImpact:
      "BMS down hone par equipment apne local/standalone mode mein chalta hai — chalta rahega, lekin coordination aur optimization ke bina. Galat BMS logic zyada khatarnaak hai: ek wrong sequence poore cooling plant ko galat state mein daal sakta hai.",
  },
  dcim: {
    purpose:
      "DCIM (Data Center Infrastructure Management) IT aur facility ke beech ka bridge hai — kaunsa rack kitni power le raha hai, kahan capacity bachi hai, kaunsa asset kahan hai.",
    working:
      "PDU/rack-PDU metering, environmental sensors aur asset database ek platform mein aate hain. Dashboards per-rack power/cooling headroom dikhate hain; naya server lagane se pehle placement isi data par decide hota hai.",
    whyRequired:
      "Bina measurement ke capacity planning guesswork hai — aur guesswork ya to stranded capacity banata hai ya overload trips. DCIM 'kitna aur load lag sakta hai' ka honest answer deta hai.",
    failureImpact:
      "DCIM ka data stale/wrong ho to decisions bhi wrong — ek 'khali' dikhne wale circuit par naya load actual mein breaker trip kara sakta hai. Isliye metering calibration aur asset data hygiene DCIM ki value ka asli foundation hai.",
  },
  "fire-alarm": {
    purpose:
      "Fire Alarm Control Panel (FACP) fire safety ka decision-maker hai — detectors ki input lekar alarms, announcements aur suppression release sab isi ke commands par hota hai.",
    working:
      "Addressable loop par har detector/module ki unique identity hoti hai — panel ko exact device aur location pata hota hai. Programmed cause-and-effect matrix ke hisaab se panel sounders bajata hai, dampers/AHU trip karta hai, aur cross-zoned confirmation par clean agent release karta hai.",
    whyRequired:
      "Detection aur action ke beech ek intelligent, certified layer chahiye. Suppression jaisa irreversible action kabhi single sensor ke bharose nahi chhoda jata — panel hi confirmation logic enforce karta hai.",
    failureImpact:
      "Panel failure poore detection-response chain ko blind kar deta hai — isliye panels battery-backed hote hain, fault-monitored loops ke saath. Disabled zones ya unacknowledged faults fire audits ki sabse serious findings hoti hain.",
  },
  ahu: {
    purpose:
      "AHU (Air Handling Unit) support areas ki air quality aur comfort sambhalta hai — offices, NOC, corridors — aur facility mein filtered fresh air bhi laata hai.",
    working:
      "Fan, filters, chilled-water cooling coil aur dampers ek unit mein. Return air + fresh air mix hoke, filter aur cool hoke ducting se spaces mein supply hoti hai. BMS temperature/CO₂ ke hisaab se modulate karta hai.",
    whyRequired:
      "Data hall precision cooling occupancy comfort ke liye nahi bani. Logon ko ventilation chahiye (fresh air codes), aur positive building pressure dust ingress rokta hai — yeh AHU ka kaam hai.",
    failureImpact:
      "AHU failure IT ko directly down nahi karta, lekin NOC/office unbearable ho jaate hain aur building pressure girne se doors ke through dust/humidity infiltrate hoti hai — long-term equipment ke liye slow poison.",
  },
  "earthing-grid": {
    purpose:
      "Earthing grid poore facility ka safety foundation hai — fault current ko safely zameen mein le jaata hai taaki insaan aur equipment dono bache rahein.",
    working:
      "Zameen ke andar buried conductors ka mesh, earth electrodes/pits se juda hua. Har panel, equipment body aur structure is grid se bond hoti hai. Fault hone par current low-resistance path se earth mein jaata hai aur protection relays turant trip karate hain.",
    whyRequired:
      "Bina proper earthing ke fault ke waqt equipment bodies par lethal voltage aa sakta hai. Sensitive electronics ke liye clean reference earth bhi chahiye — noise aur surges isi se drain hote hain.",
    failureImpact:
      "Corroded joints ya toota conductor earth resistance badha deta hai — fault par touch voltages dangerous ho jaate hain aur breakers late trip karte hain. Isliye earth pit resistance ki periodic testing maintenance calendar ka fixed item hai.",
  },
  "lightning-protection": {
    purpose:
      "Lightning protection system (LPS) bijli girne ki energy ko building ke upar se pakad kar seedha earth mein utaar deta hai — structure aur equipment dono bach jaate hain.",
    working:
      "Air terminals (masts/rods) roof ke highest points par strike ko attract karte hain. Down conductors us current ko defined paths se earthing grid tak le jaate hain. Andar ke sensitive circuits ke liye SPDs (surge protection devices) panels par lagte hain — induced surges ko clamp karne ke liye.",
    whyRequired:
      "Direct strike lakhs of amperes carry karta hai. Bina designed path ke woh current building ke structure, piping ya cabling se guzrega — fire, structural damage aur mass electronics failure ek saath.",
    failureImpact:
      "LPS continuity toote to strike ka current uncontrolled paths dhoondhta hai. SPDs degrade ho chuke hon (unka life hota hai) to induced surge poori server population ke power supplies ek raat mein maar sakta hai.",
  },
  "fire-pump": {
    purpose:
      "Fire pump room hydrant aur sprinkler network ko pressure deta hai — jab kahin bhi paani ki demand ho, required flow aur pressure yahi maintain karta hai.",
    working:
      "Teen pump ka classic set: jockey pump chhoti leaks compensate karke line pressure banaye rakhta hai; main electric pump demand par start hota hai; diesel standby pump tab bhi chalta hai jab poori electricity down ho. Pressure drop hone par pumps automatically sequence mein start hote hain.",
    whyRequired:
      "Static tank pressure kaafi nahi hai upper floors aur door ke hydrants ke liye. Fire codes specific residual pressure at the farthest outlet maangte hain — engineered pumping ke bina yeh possible nahi.",
    failureImpact:
      "Fire event ke दौरान pump start na hona worst-case hai — poora water-based suppression paper par reh jata hai. Isliye weekly churn tests, diesel pump ki battery/fuel checks aur annual flow tests statutory requirements hain.",
  },
  "fire-water-tank": {
    purpose:
      "Fire water tank firefighting ke liye dedicated paani ka reserve hai — hydrants aur sprinklers ki demand isi se poori hoti hai, chahe municipal supply ho ya na ho.",
    working:
      "Sized as per fire codes (NFPA/local) — required flow rate × required duration. Level monitoring, dedicated suction to fire pumps, aur is paani ka koi doosra use allowed nahi hota (domestic use se isolation).",
    whyRequired:
      "Fire ke waqt municipal supply par depend karna gamble hai — pressure ya availability guaranteed nahi. On-site reserve hi ensure karta hai ki suppression system apni designed duration tak chal sake.",
    failureImpact:
      "Tank level low ho (leak, ya kisi ne domestic use kar liya) to fire event mein suppression designed time se pehle khatam — statutory inspections mein tank level aur isolation isi liye check hota hai.",
  },
  "admin-area": {
    purpose:
      "Administration area facility ka public-facing hissa hai — reception, visitor management, meeting rooms aur security ki pehli screening layer.",
    working:
      "Visitors yahan register hote hain, ID verify hoti hai, badges issue hote hain aur escort policy apply hoti hai. Yahi se controlled corridors ke through hi koi aage ja sakta hai — direct data hall access kisi ka nahi hota.",
    whyRequired:
      "Security layers onion ki tarah hoti hain — admin area sabse bahari layer hai jahan untrusted logon ko trusted zone se separate rakha jata hai.",
    failureImpact:
      "Weak visitor processes social engineering ka entry point ban jaate hain — 'vendor bol kar' andar aana physical security breaches ka classic pattern hai. Process discipline yahan technology jitni hi important hai.",
  },
  "office-area": {
    purpose:
      "Office area facility ke staff ka workspace hai — engineering, operations aur management teams ka din yahan guzarta hai, data hall ke controlled environment se alag.",
    working:
      "Normal commercial office environment — comfort HVAC (AHU se), regular power with limited UPS points, aur data hall se separate access zone. Yahan se hall tak jaane ke liye bhi access control layers cross karni padti hain.",
    whyRequired:
      "White space mein desks nahi lagte — har extra person, kursi aur coffee cup wahan risk hai. Staff ko productive space chahiye jo critical environment ke bahar ho.",
    failureImpact:
      "Office area ki failures facility-critical nahi hoti, lekin poor zoning ho — jaise office aur hall ka shared corridor without control — to yeh security aur environmental risk दोनों banata hai.",
  },
  "loading-dock": {
    purpose:
      "Loading dock woh controlled gate hai jahan se saara equipment facility mein aata-jaata hai — naye servers se lekar replaced parts tak.",
    working:
      "Trucks dock levellers par unload karte hain; material staging area mein receive, inspect aur log hota hai. Unpacking yahin hoti hai — cardboard aur packing material data hall mein kabhi nahi jaata (fire load + contamination). Entry security ke through hi hoti hai.",
    whyRequired:
      "Bina defined logistics path ke equipment corridors mein ghoomta hai, dust andar jaati hai aur chain-of-custody ka record nahi rehta. Dock in sabko ek controlled point par rok deta hai.",
    failureImpact:
      "Dock discipline tootne par sabse common issues: unauthorized material movement, hall mein packing debris (fire risk), aur delivery ke naam par tailgating. Kai security incidents ki entry story dock se shuru hoti hai.",
  },

};
