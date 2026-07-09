import { Zap, Youtube, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  "Explore": ["Data Centers", "AI Systems", "Electrical Engineering", "Future Tech", "Smart Infrastructure", "Server Technology"],
  "Company": ["About Us", "Our Mission", "Press Kit", "Privacy Policy", "Terms of Service"],
  "Connect": ["YouTube Channel", "Newsletter", "Contact Us", "Partnerships", "Advertise"],
};

const socialLinks = [
  {
    icon: Youtube,
    href: "https://youtube.com/@behindthe_tech",
    label: "YouTube",
    bgClass: "bg-[rgba(255,34,68,0.15)]",
    hoverBorderClass: "hover:border-[var(--color-neon-red)]",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/_behindthetech",
    label: "Instagram",
    bgClass: "bg-[rgba(0,212,255,0.08)]",
    hoverBorderClass: "hover:border-[var(--color-neon-blue)]",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/behindthetech",
    label: "LinkedIn",
    bgClass: "bg-[rgba(0,212,255,0.08)]",
    hoverBorderClass: "hover:border-[var(--color-neon-blue)]",
  },
  {
    icon: Mail,
    href: "mailto:hello@behindthetech.in",
    label: "Email",
    bgClass: "bg-[rgba(0,255,204,0.08)]",
    hoverBorderClass: "hover:border-[var(--color-neon-cyan)]",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[rgba(0,212,255,0.08)] overflow-hidden"
      style={{ background: "var(--color-abyss)" }}
    >
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px tech-line" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--color-neon-blue)] opacity-20 rounded-sm rotate-45" />
                <Zap size={16} className="text-[var(--color-neon-blue)] relative z-10" />
              </div>
              <span
                className="text-xl tracking-widest text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BEHIND THE TECH
              </span>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-xs">
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
                  className={`w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] ${hoverBorderClass} ${bgClass} transition-all duration-300 hover:scale-110`}
                >
                  <Icon size={15} className="text-[var(--color-text-secondary)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-[10px] tracking-[0.35em] text-[var(--color-neon-blue)] uppercase mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5 group"
                    >
                      {link}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.05)] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {currentYear} Behind The Tech. All rights reserved.
          </p>

          {/* Live status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-cyan)] pulse-blue" />
            <span
              className="text-[10px] tracking-widest text-[var(--color-text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          <p
            className="text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            support@behindthetech.io
          </p>
        </div>
      </div>
    </footer>
  );
}
