// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/HeroIllustration.tsx
//
// Hero illustration — right-side column of the HeroV2 two-column grid.
//
// Responsive fix: added width:"100%" height:"auto" objectFit:"contain"
// to the Image style prop so the browser respects CSS-driven sizing at
// every breakpoint instead of locking to the HTML width/height attributes.
// Wrapper div and all other props are unchanged.
// ═══════════════════════════════════════════════════════════════════════════

import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src="/images/data-center-hero.png"
        alt="Isometric illustration of a data center showing power, cooling, networking, fire protection, and monitoring systems"
        width={1608}
        height={978}
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="hp-illustration"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
