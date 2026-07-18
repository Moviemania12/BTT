import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantrap (Airlock) in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "Data Center mantrap kaise kaam karta hai — door interlock, occupancy detection, anti-tailgating, emergency release, fire integration, troubleshooting. Beginner se O&M engineer tak.",
  keywords: [
    "mantrap data center",
    "airlock data center",
    "anti-tailgating",
    "mantrap interlock",
    "data center physical security",
  ],
  openGraph: {
    title: "Mantrap (Airlock) in Data Centers — Complete Engineering Guide",
    description: "Door interlock se occupancy detection tak — Data Center mantrap ka complete engineering guide.",
    url: "https://behindthetech.in/learn/non-it/security/mantrap",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantrap in Data Centers — Behind The Tech",
    description: "Data Center mantrap — interlock logic, anti-tailgating, emergency release aur troubleshooting.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/security/mantrap" },
};

export const faqs = [
  {
    q: "Mantrap aur normal access control door mein kya fundamental difference hai?",
    a: "Normal access control door mein sirf ek door hota hai — credential present karo aur andar jaao. Tailgating prevent karne ka koi mechanical mechanism nahi. Mantrap mein do interlocked doors hote hain — sirf ek baar ek hi door open ho sakta hai. Agar Door 1 khuli hai to Door 2 mechanically locked rehti hai — aur vice versa. Ye arrangement ensure karta hai ki har person individually authenticate ho ek controlled space mein.",
  },
  {
    q: "Mantrap mein occupancy sensor kyun lagta hai?",
    a: "Occupancy sensor (PIR ya weight sensor) mantrap ke andar detect karta hai ki kitne log present hain. Ek se zyada log andar aane pe (tailgating attempt) system second door open nahi karta — alarm generate karta hai. Without occupancy detection, ek authorized person door open kare aur doosra unauthorised person saath andar ghus jaaye — mantrap ka security purpose defeat ho jaata hai.",
  },
  {
    q: "Fire alarm pe mantrap kaise behave karta hai?",
    a: "Fire alarm pe sab doors immediately open ho jaani chahiye — evacuation path block nahi honi chahiye. Fail-safe configuration: power cut ya fire alarm signal pe dono doors open ho jaate hain. Ye life safety requirement hai aur fire code compliance ke liye mandatory hai. Controller ya PLC logic fire alarm input pe interlock override karta hai. Ye integration commissioning ke time verify karo aur regularly test karo.",
  },
  {
    q: "Mantrap mein koi andar phase ja jaaye aur bahar nahi aa sake to kya karna chahiye?",
    a: "Mantrap mein manual emergency release hona chahiye — typically red break-glass switch ya manual override. Security operator remote release bhi kar sakta hai VMS/access control interface se. Andar phase phansa hua hai to: remotely door release karo, ya security staff manually jaake override karo. Intercom bhi install hona chahiye — andar phansne pe communication possible ho. Emergency release procedure staff training mein include karo.",
  },
  {
    q: "Mantrap CCTV se kyun integrate karna zaroori hai?",
    a: "Mantrap ek controlled entry point hai — yahaan ki footage forensic evidence ke liye critical hai. CCTV WDR cameras mantrap mein face clearly capture karti hain. Har access event pe automatic camera recording aur snapshot zaroori hai. Tailgating attempt ya security alert pe instant footage review important hai. Bina CCTV ke mantrap entry log audit trail incomplete hoti hai.",
  },
  {
    q: "Single-door vs double-door mantrap mein kya choose karein?",
    a: "Single-door mantrap kuch vendors offer karte hain jahan ek door + inner cage/turnstile combination hoti hai — smaller footprint. Traditional double-door mantrap full two separate doors aur enclosed vestibule space deta hai — more space lekin stronger anti-tailgating. Data center high-security entry ke liye traditional double-door mantrap preferred hai. Space constraints mein single-door alternatives evaluate karo — lekin occupancy detection maintain karo.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
