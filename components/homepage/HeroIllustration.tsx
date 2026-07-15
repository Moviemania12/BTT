import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src="/images/data-center-hero.png"
        alt="Behind The Tech Data Center Hero Illustration"
        width={560}
        height={400}
        priority
        quality={100}
        sizes="(max-width: 768px) 100vw, 560px"
        className="w-full h-auto object-contain select-none pointer-events-none"
      />
    </div>
  );
}
