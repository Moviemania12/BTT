import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BttAssistant from "@/components/BttAssistant";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Behind The Tech — Technology That Powers the Modern World",
  description:
    "Explore the technology powering the modern world. Data centers, AI infrastructure, servers, electrical systems, automation, and future technology — documented in cinematic depth.",
  keywords: [
    "data centers",
    "AI infrastructure",
    "server technology",
    "electrical systems",
    "automation",
    "future tech",
    "smart buildings",
    "networking",
    "tech documentary",
    "behind the tech",
  ],
  authors: [{ name: "Behind The Tech" }],
  creator: "Behind The Tech",
  openGraph: {
    title: "Behind The Tech — Technology That Powers the Modern World",
    description:
      "Explore the technology powering the modern world. Cinematic deep-dives into data centers, AI, servers, and the infrastructure of tomorrow.",
    url: "https://behindthetech.in",
    siteName: "Behind The Tech",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Behind The Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Behind The Tech",
    description: "Technology that powers the modern world.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.behindthetech.in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased" data-homepage-theme="light">
        <Navbar />
        {children}
        <BttAssistant />
      </body>
    </html>
  );
}
