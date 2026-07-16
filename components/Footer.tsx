import Link from "next/link";
import { Zap, Youtube, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

// White theme migration (Phase A): all neon-glow colors replaced with
// flat hp-* tokens. Footer links updated with real hrefs (Phase 2).

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  "Resources": [
    { label: "Non-IT Infrastructure", href: "/learn/non-it" },
    { label: "IT Infrastructure",     href: "/learn/it" },
    { label: "AI Infrastructure",     href: "/learn/ai" },
    { label: "DC Map",                href: "/data-center-map" },
    { label: "Engineering Tools",     href: "/tools" },
  ],
  "Company": [
    { label: "About BTT",     href: "/about" },
    { label: "Our Mission",   href: "/about/mission" },
    { label: "Kumar Anil",    href: "/about/kumar-anil" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Contact",       href: "/about/contact" },
  ],
  "Legal": [
    { label: "Privacy Policy",          href: "/privacy-policy" },
    { label: "Terms & Conditions",      href: "/terms-and-conditions" },
    { label: "Disclaimer",              href: "/disclaimer" },
    { label: "Cookie Policy",           href: "/cookie-policy" },
    { label: "Advertising Disclosure",  href: "/advertising-disclosure" },
    { label: "Affiliate Disclosure",    href: "/affiliate-disclosure" },
    { label: "Accessibility",           href: "/accessibility" },
    { label: "Correction Policy",       href: "/correction-policy" },
    { label: "Fact-Checking Policy",    href: "/fact-checking-policy" },
    { label: "Content Policy",          href: "/content-policy" },
  ],
};

const socialLinks = [
  {
    icon: Youtube,
    href: "https://youtube.com/@behindthe_tech",
    label: "YouTube",
    bgClass: "bg-[rgba(225,29,72,0.06)]",
    hoverBorderClass: "hover:border-[var(--hp-danger)]",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/_behindthetech",
    label: "Instagram",
    bgClass: "bg-[var(--hp-accent-subtle)]",
    hoverBorderClass: "hover:border-[var(--hp-accent)]",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/behindthetech",
    label: "LinkedIn",
    bgClass: "bg-[var(--hp-accent-subtle)]",
    hoverBorderClass: "hover:border-[var(--hp-accent)]",
  },
  {
    icon: Mail,
    href: "mailto:hello@behindthetech.in",
    label: "Email",
    bgClass: "bg-[var(--hp-accent-subtle)]",
    hoverBorderClass: "hover:border-[var(--hp-accent)]",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-homepage-theme="light"
      className="relative border-t border-[var(--hp-border)] overflow-hidden"
      style={{ background: "var(--hp-bg-subtle)" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 tech-line-light" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-7">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--hp-accent)] opacity-10 rounded-sm rotate-45" />
                <Zap size={16} className="text-[var(--hp-accent)] relative z-10" />
              </div>
              <span
                className="text-xl tracking-widest text-[var(--hp-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BEHIND THE TECH
              </span>
            </div>

            <p className="text-sm text-[var(--hp-text-secondary)] leading-relaxed mb-9 max-w-xs">
              Documentary-grade technology coverage. We go inside the machines that power the modern world
              — data centers, AI systems, servers, and the infrastructure you never see.
            </p>

            {/* Social links — pure CSS hover, no JS event handlers */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, bgClass, hoverBorderClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 flex items-center justify-center border border-[var(--hp-border)] ${hoverBorderClass} ${bgClass} transition-all duration-300 hover:scale-110 rounded-lg`}
                >
                  <Icon size={15} className="text-[var(--hp-text-secondary)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-[10px] tracking-[0.35em] text-[var(--hp-accent)] uppercase mb-7"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--hp-text-secondary)] hover:text-[var(--hp-text-primary)] transition-colors flex items-center gap-1.5 group"
                    >
                      {label}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--hp-border)] py-9 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p
            className="text-xs text-[var(--hp-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {currentYear} Behind The Tech. All rights reserved.
          </p>

          {/* Live status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--hp-accent)] pulse-blue" />
            <span
              className="text-[10px] tracking-widest text-[var(--hp-text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          <p
            className="text-xs text-[var(--hp-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            hello@behindthetech.in
          </p>
        </div>
      </div>
    </footer>
  );
}
