import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biometric Authentication in Data Centers — Complete Engineering Guide | Behind The Tech",
  description:
    "How biometric systems work in a Data Center — fingerprint, face recognition, iris, FAR/FRR, enrollment, liveness, access control integration, troubleshooting and privacy. Engineer guide.",
  keywords: [
    "biometrics data center",
    "fingerprint access control",
    "face recognition data center",
    "iris recognition",
    "biometric authentication",
  ],
  openGraph: {
    title: "Biometric Authentication in Data Centers — Complete Engineering Guide",
    description: "From fingerprint to iris — the complete engineering guide to Data Center biometric systems.",
    url: "https://behindthetech.in/learn/non-it/security/biometrics",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biometrics in Data Centers — Behind The Tech",
    description: "Data Center biometric authentication — FAR/FRR, enrollment, troubleshooting and privacy.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/security/biometrics",
    languages: {
      en: "https://behindthetech.in/learn/non-it/security/biometrics",
      hi: "https://behindthetech.in/hi/learn/non-it/security/biometrics",
      "x-default": "https://behindthetech.in/learn/non-it/security/biometrics",
    },
  },
};

export const faqs = [
  {
    q: "What is the difference between FAR and FRR and how are the two balanced?",
    a: "FAR (False Acceptance Rate) — an unauthorized person gets accepted by mistake. FRR (False Rejection Rate) — an authorized person gets rejected by mistake. The two are inversely related — reduce FAR and FRR increases (stricter matching threshold). The balance comes from the threshold setting, which depends on site conditions, enrollment quality and security requirements. There is no universally correct FAR/FRR value — it depends on the project and application.",
  },
  {
    q: "How is biometric data stored — is the raw image saved?",
    a: "Modern biometric systems typically do not store the raw fingerprint image or face photo. Instead, at enrollment a mathematical template (feature vector) is extracted and that is what gets stored. The original biometric cannot be reverse-engineered from the template — this is important for privacy. The template is typically stored in encrypted format. Some systems support on-card template storage — the template stays on the user's card, not on the server.",
  },
  {
    q: "How is a biometric reader integrated with the access control system?",
    a: "Integration typically happens in two ways: (1) The reader connects directly to the controller — it sends a 'match result' signal over Wiegand or OSDP (match = valid credential signal). (2) The biometric system uses its own controller/server that communicates with the access control system through an API or direct integration. The approach depends on the OEM, system size and project requirements.",
  },
  {
    q: "Can a biometric system be bypassed?",
    a: "No security system is 100% bypass-proof. Known attacks against biometric systems include spoofing (fake fingerprint, printed face photo) and template theft. Liveness detection is an effective countermeasure against these attacks. Multi-factor authentication (biometric + card/PIN) makes a bypass attempt significantly harder. Following regular system updates and vendor security advisories is important.",
  },
  {
    q: "FRR is high because of poor enrollment — what should be done?",
    a: "Re-enroll properly — in a controlled environment, on a clean sensor, taking the best quality sample from multiple attempts. Train the enrollment operator — proper finger placement, pressure, angle. Clean the sensor before enrollment. If specific users consistently fail (due to fingerprint quality — age, work-related wear) — consider an alternative biometric (face/iris) or a fallback credential (card).",
  },
  {
    q: "How do privacy regulations apply to biometrics?",
    a: "Biometric data falls in the 'sensitive personal data' category in most privacy regulations — GDPR (Europe), India's DPDP Act, and similar frameworks. Explicit consent is typically required for collection. Data minimization, purpose limitation and retention limits apply. Verify project-specific requirements with local legal counsel — regulations vary by jurisdiction and sector.",
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
