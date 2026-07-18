import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biometric Authentication in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "Data Center mein biometric systems kaise kaam karte hain — fingerprint, face recognition, iris, FAR/FRR, enrollment, liveness, access control integration, troubleshooting aur privacy. Engineer guide.",
  keywords: [
    "biometrics data center",
    "fingerprint access control",
    "face recognition data center",
    "iris recognition",
    "biometric authentication",
  ],
  openGraph: {
    title: "Biometric Authentication in Data Centers — Complete Engineering Guide",
    description: "Fingerprint se iris tak — Data Center biometric systems ka complete engineering guide.",
    url: "https://behindthetech.in/learn/non-it/security/biometrics",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biometrics in Data Centers — Behind The Tech",
    description: "Data Center biometric authentication — FAR/FRR, enrollment, troubleshooting aur privacy.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/security/biometrics" },
};

export const faqs = [
  {
    q: "FAR aur FRR mein kya fark hai aur dono kaise balance karte hain?",
    a: "FAR (False Acceptance Rate) — unauthorized person galti se accept ho jaata hai. FRR (False Rejection Rate) — authorized person galti se reject ho jaata hai. Dono inversely related hain — FAR kam karo to FRR badhta hai (stricter matching threshold). Balance threshold setting se hoti hai jo site conditions, enrollment quality aur security requirements pe depend karta hai. Koi universally correct FAR/FRR value nahi hai — project aur application pe depend karta hai.",
  },
  {
    q: "Biometric data store kaise hota hai — raw image save hoti hai kya?",
    a: "Modern biometric systems raw fingerprint image ya face photo typically store nahi karte. Instead, enrollment ke time se mathematical template (feature vector) extract hoti hai aur wahi store hoti hai. Template se original biometric reverse-engineer nahi ki ja sakti — ye privacy ke liye important hai. Template typically encrypted format mein store hoti hai. Some systems on-card template storage support karte hain — template server pe nahi, user ke card pe rehti hai.",
  },
  {
    q: "Biometric reader ko access control system ke saath kaise integrate karte hain?",
    a: "Integration typically do ways mein hoti hai: (1) Reader controller ke saath directly connect hota hai — Wiegand ya OSDP pe 'match result' signal bhejta hai (match = valid credential signal). (2) Biometric system apna controller/server use karta hai jo access control system ke saath API ya direct integration se communicate karta hai. Approach OEM, system size aur project requirements pe depend karta hai.",
  },
  {
    q: "Kya biometric system bypass ho sakta hai?",
    a: "Koi bhi security system 100% bypass-proof nahi hota. Biometric systems ke against known attacks mein spoofing (fake fingerprint, printed face photo) aur template theft include hain. Liveness detection in attacks ke against effective countermeasure hai. Multi-factor authentication (biometric + card/PIN) bypass attempt significantly harder banata hai. Regular system updates aur vendor security advisories follow karna important hai.",
  },
  {
    q: "Poor enrollment ki wajah se FRR high hai — kya karna chahiye?",
    a: "Re-enrollment karo properly — controlled environment mein, clean sensor pe, multiple attempts se best quality sample le. Enrollment operator ko train karo — proper finger placement, pressure, angle. Sensor clean karo pehle enrollment se. Agar specific users consistently fail karte hain (due to fingerprint quality — age, work-related wear) — alternative biometric (face/iris) ya fallback credential (card) consider karo.",
  },
  {
    q: "Privacy regulations biometrics pe kaise apply hoti hain?",
    a: "Biometric data 'sensitive personal data' category mein aata hai most privacy regulations mein — GDPR (Europe), India's DPDP Act, aur similar frameworks. Collection ke liye typically explicit consent required hoti hai. Data minimization, purpose limitation aur retention limits apply hote hain. Local legal counsel se project-specific requirements verify karo — regulations jurisdiction aur sector pe vary karte hain.",
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
