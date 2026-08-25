import type { Metadata } from "next";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloud Security: Assets aur Infrastructure Ko Secure Karo — Behind The Tech",
  description:
    "Cloud security kya hai, cloud assets kaise protect karte hain, shared responsibility model, aur data center perspective se cloud security ka complete overview — Hinglish mein.",
  keywords: ["cloud security kya hai", "cloud assets security hindi", "cloud infrastructure security", "shared responsibility model hindi"],
  authors: [{ name: "Kumar Anil" }],
  openGraph: {
    title: "Cloud Security: Assets aur Infrastructure Ko Secure Karo — Behind The Tech",
    description: "Cloud security fundamentals, shared responsibility model aur enterprise cloud asset protection.",
    url: "https://behindthetech.in/articles/cloud-security-assets",
    siteName: "Behind The Tech",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Security: Assets aur Infrastructure Ko Secure Karo",
    description: "Cloud security kya hai aur assets kaise protect karte hain.",
  },
};

export default function CloudSecurityPage() {
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
          <span className="text-[var(--color-neon-blue)]">CLOUD SECURITY</span>
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
            Cloud & Security
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
          Cloud Security: Assets aur Infrastructure Ko Secure Karo
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
          <span>Kumar Anil</span>
          <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,212,255,0.12)", paddingTop: 40 }}>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 24, color: "var(--color-text-secondary)" }}>
            Cloud mein shift karne ke baad organizations ka attack surface dramatically change ho jaata hai. On-premise data center mein physical perimeter tha — cloud mein perimeter software-defined hai aur internet-facing. Cloud security assets protect karna ek continuous process hai.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Shared Responsibility Model
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Cloud security ka foundation hai Shared Responsibility Model. Cloud provider (AWS, Azure, GCP) infrastructure secure karta hai — physical data centers, network fabric, hypervisor. Customer apna data, applications, identity management, aur network configuration secure karta hai. IaaS, PaaS, SaaS — har model mein responsibility split alag hoti hai. Confusion yahan hoti hai ki customers assume karte hain provider sab handle kar raha hai.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Cloud Assets Kya Hain?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Cloud assets mein shamil hain: compute instances (VMs, containers, serverless functions), storage buckets (S3, Blob, GCS), databases (RDS, Cosmos, Cloud SQL), network resources (VPCs, subnets, security groups), IAM (Identity and Access Management) roles aur policies, aur API endpoints. Har asset ko inventory karo, classify karo, aur continuously monitor karo — CSPM (Cloud Security Posture Management) tools yeh automate karte hain.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Data Center vs Cloud Security Perspective
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Traditional data center mein physical access control, network segmentation (VLANs, firewalls), aur on-premise identity systems primary controls the. Cloud mein: IAM (least privilege principle critical hai), encryption in-transit aur at-rest mandatory, network security groups virtual firewalls ka kaam karte hain, aur audit logging (CloudTrail, Activity Logs) everything track karta hai. Zero Trust Architecture — "never trust, always verify" — cloud environments ke liye especially relevant hai.
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
              Is article ka detailed version — cloud security tools, CSPM, CWPP, SIEM integration, aur compliance (ISO 27001, SOC 2) — jald aayega.
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
