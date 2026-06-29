"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lines] = useState([
    "INITIALIZING SYSTEM...",
    "LOADING DATA STREAMS...",
    "ESTABLISHING SECURE CONNECTION...",
    "MOUNTING AI SUBSYSTEMS...",
    "BEHIND THE TECH — READY",
  ]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + 2;
      });
    }, 20);

    const lineInterval = setInterval(() => {
      setCurrentLine((l) => Math.min(l + 1, lines.length - 1));
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(lineInterval);
    };
  }, [lines.length]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center grid-bg"
      style={{
        background: "var(--color-void)",
        opacity: progress >= 100 ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: progress >= 100 ? "none" : "all",
      }}
    >
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        {/* Logo mark */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 border-2 border-[var(--color-neon-blue)] flex items-center justify-center"
            style={{ boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}>
            <div className="w-8 h-8 border border-[var(--color-neon-blue)] flex items-center justify-center">
              <div className="w-3 h-3 bg-[var(--color-neon-blue)]" />
            </div>
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl tracking-[0.5em] text-[var(--color-text-primary)] mb-8 flicker"
          style={{ fontFamily: "var(--font-display)" }}>
          BTT
        </h1>

        {/* Log lines */}
        <div className="mb-8 text-left space-y-1 h-32 overflow-hidden">
          {lines.slice(0, currentLine + 1).map((line, i) => (
            <p
              key={i}
              className="text-[10px] tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: i === currentLine ? "var(--color-neon-blue)" : "var(--color-text-muted)",
                opacity: i === currentLine ? 1 : 0.5,
              }}
            >
              {i < currentLine ? "✓ " : "> "}{line}
            </p>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-[rgba(0,212,255,0.15)] relative overflow-hidden">
          <div
            className="h-full bg-[var(--color-neon-blue)] transition-all duration-100"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 10px rgba(0,212,255,0.8)",
            }}
          />
        </div>

        {/* Progress number */}
        <div className="mt-3 text-[10px] tracking-widest text-[var(--color-text-muted)] text-right"
          style={{ fontFamily: "var(--font-mono)" }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
