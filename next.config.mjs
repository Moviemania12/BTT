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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
