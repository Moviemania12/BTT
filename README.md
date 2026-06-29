# Behind The Tech 🔵

> **Technology that powers the modern world**

A premium, cinematic dark-themed website for the Behind The Tech brand — built with Next.js 15, Tailwind CSS v4, and a futuristic AI/data center aesthetic.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ 
- npm or pnpm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
behind-the-tech/
├── app/
│   ├── globals.css          # Tailwind v4 + custom CSS variables, animations
│   ├── layout.tsx           # Root layout, SEO metadata, Google Fonts
│   └── page.tsx             # Main page assembling all sections
├── components/
│   ├── LoadingScreen.tsx    # Boot sequence loading animation
│   ├── Navbar.tsx           # Sticky nav + mobile hamburger menu
│   ├── Hero.tsx             # Canvas particle system + server rack SVGs
│   ├── About.tsx            # Mission statement + topic grid
│   ├── Categories.tsx       # 6 category cards with glassmorphism
│   ├── Videos.tsx           # YouTube-style video cards
│   ├── Stats.tsx            # Animated counter stats
│   ├── Newsletter.tsx       # Email subscribe form
│   ├── Contact.tsx          # Contact form
│   └── Footer.tsx           # Social links + sitemap
├── public/
│   └── favicon.svg          # Custom neon-blue favicon
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## ☁️ Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: behind-the-tech
# - Directory: ./
# - Override settings? N
```

### Option 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — that's it!

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🎨 Customization

### Colors
Edit CSS variables in `app/globals.css`:

```css
@theme {
  --color-neon-blue: #00d4ff;    /* Primary accent */
  --color-neon-red: #ff2244;     /* Secondary accent */
  --color-neon-cyan: #00ffcc;    /* Tertiary accent */
  --color-void: #030507;         /* Background */
}
```

### Brand Details
- **Name**: Update `BEHIND THE TECH` in `components/Navbar.tsx` and `components/Footer.tsx`
- **Tagline**: Update in `components/Hero.tsx`
- **Email**: Search/replace `behindthetech.io` throughout
- **Social links**: Update in `components/Footer.tsx`
- **SEO metadata**: Edit `app/layout.tsx`

### Videos
Update the `videos` array in `components/Videos.tsx` with real YouTube thumbnails:
```ts
thumb: "https://i.ytimg.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg"
```

### Stats
Update the `stats` array in `components/Stats.tsx` with real numbers.

---

## ✨ Features

- **Loading screen** — cinematic boot sequence with progress bar
- **Sticky navbar** — glassmorphism on scroll + mobile hamburger menu
- **Hero** — canvas particle network + animated server rack SVGs
- **Scroll reveal** — IntersectionObserver fade-in animations
- **Glassmorphism cards** — backdrop-blur + neon border effects
- **Animated counters** — smooth number animation on scroll
- **Contact form** — with subject selector and success state
- **Newsletter form** — with loading state and confirmation
- **Responsive** — mobile-first, tested on 320px–1920px
- **SEO** — metadata, OpenGraph, Twitter cards, sitemap-ready
- **Custom fonts** — Bebas Neue (display) + DM Sans (body) + JetBrains Mono
- **Custom scrollbar** — neon blue minimal scrollbar
- **Favicon** — custom SVG favicon

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 15.x | React framework |
| Tailwind CSS | 4.x | Utility CSS |
| TypeScript | 5.x | Type safety |
| Lucide React | latest | Icons |
| Google Fonts | — | Bebas Neue, DM Sans, JetBrains Mono |

---

## 📝 License

© 2025 Behind The Tech. All rights reserved.
