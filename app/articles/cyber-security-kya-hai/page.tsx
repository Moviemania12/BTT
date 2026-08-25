import type { Metadata } from "next";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyber Security Kya Hai? Internet Par Apna Data Bachao — Behind The Tech",
  description:
    "Cyber security kya hai, common threats kaise kaam karte hain, aur data centers aur enterprises apni digital assets kaise protect karte hain — complete guide Hinglish mein.",
  keywords: ["cyber security kya hai", "cybersecurity hindi", "internet security hindi", "data protection hindi", "firewall vpn encryption"],
  authors: [{ name: "Kumar Anil" }],
  openGraph: {
    title: "Cyber Security Kya Hai? — Behind The Tech",
    description: "Cyber security fundamentals, common threats aur enterprise protection strategies Hinglish mein.",
    url: "https://behindthetech.in/articles/cyber-security-kya-hai",
    siteName: "Behind The Tech",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Security Kya Hai?",
    description: "Cyber security kya hai aur internet par apna data kaise bachate hain.",
  },
};

export default function CyberSecurityPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-void)",
        paddingTop: 96,
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[11px] tracking-widest text-[var(--color-text-muted)] mb-10"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="/" className="hover:text-[var(--color-neon-blue)] transition-colors">HOME</Link>
          <ChevronRight size={10} />
          <Link href="/articles" className="hover:text-[var(--color-neon-blue)] transition-colors">ARTICLES</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--color-neon-blue)]">CYBER SECURITY</span>
        </nav>

        {/* Tag */}
        <div className="mb-5">
          <span
            className="text-[10px] tracking-[0.2em] px-3 py-1 font-bold uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "var(--color-neon-blue)",
            }}
          >
            Security
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            color: "var(--color-text-primary)",
            marginBottom: 24,
          }}
        >
          Cyber Security Kya Hai?
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-4 mb-10 text-sm"
          style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
        >
          <span>Kumar Anil</span>
          <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,212,255,0.12)", paddingTop: 40 }}>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 24, color: "var(--color-text-secondary)" }}>
            Cyber security digital systems, networks, aur data ko unauthorized access, damage, ya theft se protect karne ki practice hai. Har roz crores ke cyber attacks hote hain — individuals se leke governments tak sab target hain. Samajhna zaroori hai ki yeh attacks kaise kaam karte hain aur protection kaise karte hain.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Common Cyber Threats
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Malware: viruses, ransomware, trojans — malicious software jo systems infect karte hain. Phishing: fake emails ya websites se credentials steal karna. Man-in-the-Middle (MitM): attacker do parties ke beech communication intercept karta hai. DDoS (Distributed Denial of Service): target server ko traffic se overwhelm karna. SQL Injection: database queries mein malicious code inject karna. Social Engineering: humans ko manipulate karke information extract karna — technical vulnerability se zyada human vulnerability exploit karta hai.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Core Security Controls
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Firewall: network traffic filter karta hai — allowed aur blocked traffic rules define karte hain. VPN (Virtual Private Network): encrypted tunnel create karta hai public network pe private communication ke liye. Encryption: data ko unreadable format mein convert karna — at-rest aur in-transit dono ke liye. MFA (Multi-Factor Authentication): password ke alawa second factor (OTP, biometric) require karna. Patch Management: software vulnerabilities fix karne ke liye regular updates apply karna. Principle of Least Privilege: users aur systems ko sirf wahi access do jo unhe actually chahiye.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Data Center Security Perspective
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Data centers mein cyber security multiple layers mein implement hoti hai. Network segmentation: VLANs, micro-segmentation — blast radius limit karna. Intrusion Detection/Prevention Systems (IDS/IPS): suspicious traffic identify aur block karna. SIEM (Security Information and Event Management): centralized logging aur real-time alerting. Zero Trust Architecture: "never trust, always verify" — internal network pe bhi authentication required. Physical security bhi cyber security ka part hai — unauthorized physical access se logical access mil sakta hai.
          </p>

          {/* Coming Soon */}
          <div
            style={{
              marginTop: 48,
              padding: "24px 28px",
              border: "1px solid rgba(0,212,255,0.2)",
              background: "rgba(0,212,255,0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-neon-blue)",
                marginBottom: 8,
              }}
            >
              Coming Soon
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", margin: 0 }}>
              Is article ka detailed version — penetration testing, SOC operations, compliance frameworks (ISO 27001, NIST, SOC 2), aur data center specific security — jald aayega.
            </p>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 48 }}>
            <Link
              href="/articles"
              className="flex items-center gap-2 hover:text-[var(--color-neon-blue)] transition-colors"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", textDecoration: "none" }}
            >
              <ArrowLeft size={13} /> Back to Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
