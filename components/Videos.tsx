"use client";
import { useEffect, useRef } from "react";
import { Play, Clock, Eye, Youtube } from "lucide-react";

const videos = [
  {
    title: "Inside Google's $1 Billion Data Center",
    category: "Data Center",
    duration: "18:42",
    views: "2.4M",
    thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    featured: true,
  },
  {
    title: "The AI Chip Arms Race: NVIDIA's H100 Explained",
    category: "AI Systems",
    duration: "24:15",
    views: "1.8M",
    thumb: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
    featured: false,
  },
  {
    title: "How Amazon Powers 5 Million Servers",
    category: "Server Tech",
    duration: "21:30",
    views: "1.2M",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    featured: false,
  },
  {
    title: "The Cooling System Keeping AI Alive",
    category: "Data Center",
    duration: "16:55",
    views: "980K",
    thumb: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80",
    featured: false,
  },
  {
    title: "Microsoft's Undersea Data Center Project",
    category: "Future Tech",
    duration: "19:10",
    views: "3.1M",
    thumb: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    featured: false,
  },
  {
    title: "100,000 Volt Substation: Power for the Cloud",
    category: "Electrical",
    duration: "22:45",
    views: "756K",
    thumb: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    featured: false,
  },
];

function VideoCard({
  video,
  index,
  featured = false,
}: {
  video: (typeof videos)[0];
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`reveal glass card-hover group cursor-pointer overflow-hidden ${
        featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? "h-56 md:h-72" : "h-44"}`}>
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-abyss)] via-transparent to-transparent" />
        {/* Scanline overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)" }} />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-[var(--color-neon-blue)]"
            style={{ background: "rgba(0,212,255,0.15)", backdropFilter: "blur(10px)" }}>
            <Play size={24} className="text-[var(--color-neon-blue)] ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 text-[10px] font-bold tracking-wider"
          style={{ fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.8)", color: "var(--color-neon-blue)", border: "1px solid rgba(0,212,255,0.3)" }}>
          {video.duration}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2 py-1 text-[9px] tracking-[0.2em] font-bold uppercase"
          style={{ fontFamily: "var(--font-mono)", background: "rgba(255,34,68,0.15)", color: "var(--color-neon-red)", border: "1px solid rgba(255,34,68,0.3)" }}>
          {video.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className={`font-bold text-[var(--color-text-primary)] mb-3 leading-snug group-hover:text-[var(--color-neon-blue)] transition-colors ${featured ? "text-xl" : "text-base"}`}>
          {video.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-1.5"><Eye size={11} /> {video.views}</span>
          <span className="flex items-center gap-1.5"><Clock size={11} /> {video.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="videos" ref={sectionRef} className="relative py-32 px-6 overflow-hidden"
      style={{ background: "linear-gradient(var(--color-void), var(--color-abyss), var(--color-void))" }}>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="tech-line w-12" />
              <span className="text-xs tracking-[0.4em] text-[var(--color-neon-red)] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}>Latest Releases</span>
            </div>
            <h2 className="reveal text-[clamp(2.5rem,6vw,5rem)] tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-[var(--color-text-primary)]">LATEST </span>
              <span className="text-[var(--color-neon-red)] glow-red">VIDEOS</span>
            </h2>
          </div>
          <div className="reveal flex items-center gap-3">
            <a
              href="https://youtube.com/@behindthetech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 text-xs tracking-wider border border-[rgba(255,34,68,0.4)] text-[var(--color-neon-red)] hover:bg-[rgba(255,34,68,0.1)] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <Youtube size={14} />
              YOUTUBE CHANNEL
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <VideoCard key={video.title} video={video} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
