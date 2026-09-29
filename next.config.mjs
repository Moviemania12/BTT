/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ── /dc-map → /data-center-map ─────────────────────────────────────────
      {
        source: "/dc-map",
        destination: "/data-center-map",
        permanent: true,
      },

      // ── Phase 3: common short URLs for trust pages (reviewers and users type these) ──
      { source: "/contact", destination: "/about/contact", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },

      // ── Phase 2 SEO: duplicate / legacy URLs ─────────────────────────────────

      // Stale Hinglish duplicate of the flagship article (its canonical already
      // pointed to /learn/what-is-a-data-center).
      {
        source: "/en/learn/what-is-a-data-center",
        destination: "/learn/what-is-a-data-center",
        permanent: true,
      },

      // /articles was a temporary redirect to one legacy article; the learning
      // hub is the real index of all articles now.
      {
        source: "/articles",
        destination: "/learn",
        permanent: true,
      },

      // Legacy Hinglish article → same topic in Hindi, under the /hi/ structure.
      {
        source: "/articles/data-center-kya-hota-hai",
        destination: "/hi/learn/what-is-a-data-center",
        permanent: true,
      },

      // Legacy articles with a closely related section (no exact equivalent).
      {
        source: "/articles/cloud-security-assets",
        destination: "/learn/it/cloud",
        permanent: true,
      },
      {
        source: "/articles/5g-networks-connectivity",
        destination: "/learn/it/networking",
        permanent: true,
      },
      // NOTE: /articles/cyber-security-kya-hai and /articles/quantum-computing-frontier
      // have no relevant equivalent page — they stay live but are noindex.

      // Hindi copies of pages whose data is English-only. They duplicated the
      // English pages (only a one-line intro differed), so they redirect to the
      // English originals. The English pages no longer declare hreflang=hi.
      { source: "/hi/study/checklists", destination: "/study/checklists", permanent: true },
      { source: "/hi/study/case-studies", destination: "/study/case-studies", permanent: true },
      { source: "/hi/reference/glossary", destination: "/reference/glossary", permanent: true },
      { source: "/hi/reference/standards", destination: "/reference/standards", permanent: true },
      { source: "/hi/reference/downloads", destination: "/reference/downloads", permanent: true },
      { source: "/hi/reference/newsletter", destination: "/reference/newsletter", permanent: true },
      { source: "/hi/learn/roadmap", destination: "/learn/roadmap", permanent: true },

      // ── /resources/* → current routes ──────────────────────────────────────
      {
        source: "/resources/case-studies",
        destination: "/study/case-studies",
        permanent: true,
      },
      {
        source: "/resources/troubleshooting-guides",
        destination: "/study/troubleshooting",
        permanent: true,
      },
      {
        source: "/resources/checklists",
        destination: "/study/checklists",
        permanent: true,
      },
      {
        source: "/resources/interview-questions",
        destination: "/study/interview",
        permanent: true,
      },
      {
        source: "/resources/glossary",
        destination: "/reference/glossary",
        permanent: true,
      },
      {
        source: "/resources/standards",
        destination: "/reference/standards",
        permanent: true,
      },
      {
        source: "/resources/downloads",
        destination: "/reference/downloads",
        permanent: true,
      },
      {
        source: "/resources/newsletter",
        destination: "/reference/newsletter",
        permanent: true,
      },

      // ── /articles/* with genuine equivalent pages ───────────────────────────

      // PAC unit article → existing published PAC topic page
      {
        source: "/articles/pac-unit-kya-hai",
        destination: "/learn/non-it/cooling/pac",
        permanent: true,
      },

      // UPS article → existing published UPS topic page
      {
        source: "/articles/ups-kya-hota-hai",
        destination: "/learn/non-it/electrical/ups",
        permanent: true,
      },

      // Cloud computing article → closest genuine equivalent: cloud-vs-data-center
      {
        source: "/articles/cloud-computing-kya-hai",
        destination: "/learn/cloud-vs-data-center",
        permanent: true,
      },

      // NVIDIA H100 article → existing published NVIDIA architecture topic page
      {
        source: "/articles/nvidia-h100-explained",
        destination: "/learn/ai/hardware/nvidia-architecture",
        permanent: true,
      },

      // AI article → existing published what-is-ai-infrastructure topic page
      {
        source: "/articles/artificial-intelligence-kya-hai",
        destination: "/learn/ai/fundamentals/what-is-ai-infrastructure",
        permanent: true,
      },

      // ML production article → existing published machine-learning topic page
      {
        source: "/articles/ml-production-deployment",
        destination: "/learn/ai/fundamentals/machine-learning",
        permanent: true,
      },


    ];
  },
  // Language signal in the HTTP response as well as in <html lang> (see
  // components/HtmlLang.tsx): /hi/* is Hindi, all other pages are English.
  async headers() {
    return [
      { source: "/", headers: [{ key: "Content-Language", value: "en" }] },
      { source: "/hi", headers: [{ key: "Content-Language", value: "hi" }] },
      { source: "/hi/:path*", headers: [{ key: "Content-Language", value: "hi" }] },
      {
        // Everything else that is a page (not /hi, /_next, /api or a file with an extension)
        source: "/:path((?!hi$|hi/|_next/|api/|.*\\..*).*)",
        headers: [{ key: "Content-Language", value: "en" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
