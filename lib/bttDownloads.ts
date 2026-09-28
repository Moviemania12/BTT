import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// ═══════════════════════════════════════════════════════════════════════════
// lib/bttDownloads.ts — download links for BTT Employee Manager.
//
// Two ways to publish a file (server-side only; read at build / request time):
//
// 1. Local file (local testing): the build scripts copy the files into
//    public/downloads/ with these fixed names — the page then links to them
//    and works out size + SHA-256 itself:
//      BTT-Employee-Manager-Setup.exe   (or BTT-Employee-Manager-Windows.zip)
//      BTT-Employee-App.apk
//    public/downloads/ is git-ignored: these files are too big for GitHub and
//    must never be committed.
//
// 2. Hosted file (live site): upload to a GitHub Release in a separate public
//    repo that holds ONLY these binaries, then set on Vercel and redeploy:
//      BTT_EM_WINDOWS_URL / _VERSION / _SIZE / _SHA256, BTT_EM_WINDOWS_SIGNED=true
//      (only once the installer is code-signed)
//      BTT_EM_ANDROID_URL / _VERSION / _SIZE / _SHA256
//    An env URL must be https:// and always wins over a local file.
//
// Version shown on the page when BTT_EM_*_VERSION is not set.
export const RELEASE_VERSION = "0.15.0";

// Neither present → the button is shown disabled ("Coming soon"). Nothing is faked.
// ═══════════════════════════════════════════════════════════════════════════

export type DownloadInfo = {
  id: "windows" | "android";
  name: string;
  platform: string;
  fileType: string;
  requirements: string;
  url: string | null;
  version: string | null;
  size: string | null;
  sha256: string | null;
  signed: boolean;
};

type LocalFile = { url: string; size: string; sha256: string; fileType: string };

function env(name: string): string | null {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function httpsOnly(url: string | null): string | null {
  return url && url.startsWith("https://") ? url : null;
}

function sha(value: string | null): string | null {
  return value && /^[0-9a-fA-F]{64}$/.test(value) ? value.toLowerCase() : null;
}

const localCache = new Map<string, { mtime: number; info: LocalFile }>();

function localFile(candidates: { file: string; fileType: string }[]): LocalFile | null {
  for (const c of candidates) {
    const abs = path.join(process.cwd(), "public", "downloads", c.file);
    try {
      if (!existsSync(abs)) continue;
      const st = statSync(abs);
      const hit = localCache.get(abs);
      if (hit && hit.mtime === st.mtimeMs) return hit.info;
      const info: LocalFile = {
        url: `/downloads/${c.file}`,
        size: `${Math.max(1, Math.round(st.size / (1024 * 1024)))} MB`,
        sha256: createHash("sha256").update(readFileSync(abs)).digest("hex"),
        fileType: c.fileType,
      };
      localCache.set(abs, { mtime: st.mtimeMs, info });
      return info;
    } catch {
      // unreadable file → treat as not published
    }
  }
  return null;
}

export function getDownloads(): DownloadInfo[] {
  const winUrl = httpsOnly(env("BTT_EM_WINDOWS_URL"));
  const winLocal = winUrl
    ? null
    : localFile([
        { file: "BTT-Employee-Manager-Setup.exe", fileType: "Installer (.exe)" },
        { file: "BTT-Employee-Manager-Windows.zip", fileType: "ZIP (extract, then run the .exe)" },
      ]);

  const apkUrl = httpsOnly(env("BTT_EM_ANDROID_URL"));
  const apkLocal = apkUrl ? null : localFile([{ file: "BTT-Employee-App.apk", fileType: "App (.apk)" }]);

  return [
    {
      id: "windows",
      name: "BTT Employee Manager for Windows",
      platform: "Windows",
      fileType: winLocal?.fileType ?? "Installer (.exe)",
      requirements: "Windows 10 / 11, 64-bit. No other software needed.",
      url: winUrl ?? winLocal?.url ?? null,
      version: env("BTT_EM_WINDOWS_VERSION") ?? RELEASE_VERSION,
      size: winUrl ? env("BTT_EM_WINDOWS_SIZE") : winLocal?.size ?? null,
      sha256: winUrl ? sha(env("BTT_EM_WINDOWS_SHA256")) : winLocal?.sha256 ?? null,
      signed: env("BTT_EM_WINDOWS_SIGNED") === "true",
    },
    {
      id: "android",
      name: "BTT Employee App for Android",
      platform: "Android",
      fileType: "App (.apk)",
      requirements: "Android 8.0 or newer. Camera and location permission needed for attendance.",
      url: apkUrl ?? apkLocal?.url ?? null,
      version: env("BTT_EM_ANDROID_VERSION") ?? RELEASE_VERSION,
      size: apkUrl ? env("BTT_EM_ANDROID_SIZE") : apkLocal?.size ?? null,
      sha256: apkUrl ? sha(env("BTT_EM_ANDROID_SHA256")) : apkLocal?.sha256 ?? null,
      signed: true,
    },
  ];
}

export const DOWNLOAD_ROUTE = "/products/btt-employee-manager/download";
