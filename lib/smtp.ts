import tls from "node:tls";

// ═══════════════════════════════════════════════════════════════════════════
// lib/smtp.ts — minimal SMTP-over-TLS mail sender (no third-party API, no
// extra dependency). Used by /api/demo-request to send mail straight from a
// Gmail account.
//
// Environment variables (server only — never sent to the browser):
//   GMAIL_USER          the Gmail address the mail is sent from
//   GMAIL_APP_PASSWORD  a Google "App password" (Google Account → Security →
//                       2-Step Verification → App passwords). NOT the normal
//                       Gmail password.
//   SMTP_HOST / SMTP_PORT  optional overrides (default smtp.gmail.com : 465)
// ═══════════════════════════════════════════════════════════════════════════

export function smtpConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");
const wrap76 = (s: string) => s.replace(/(.{76})/g, "$1\r\n");

export async function sendSmtpMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const user = process.env.GMAIL_USER as string;
  const pass = (process.env.GMAIL_APP_PASSWORD as string).replace(/\s+/g, "");
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const to = clean(opts.to);
  const fromName = "BTT Employee Manager";

  const headers = [
    `From: =?UTF-8?B?${b64(fromName)}?= <${clean(user)}>`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${b64(clean(opts.subject))}?=`,
    ...(opts.replyTo ? [`Reply-To: ${clean(opts.replyTo)}`] : []),
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ].join("\r\n");
  const message = `${headers}\r\n\r\n${wrap76(b64(opts.text))}\r\n`;

  await new Promise<void>((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host });
    socket.setTimeout(15000, () => fail(new Error("smtp timeout")));
    let buf = "";
    let waiter: ((code: number, text: string) => void) | null = null;
    let done = false;

    function fail(err: Error) {
      if (done) return;
      done = true;
      socket.destroy();
      reject(err);
    }

    socket.on("error", fail);
    socket.on("data", (d) => {
      buf += d.toString("utf8");
      // A reply is complete when its last line is "NNN text" (not "NNN-text").
      const lines = buf.split("\r\n");
      if (lines.length < 2) return;
      const last = lines[lines.length - 2];
      if (/^\d{3} /.test(last) || /^\d{3}$/.test(last)) {
        const text = buf;
        buf = "";
        const cb = waiter;
        waiter = null;
        cb?.(Number(last.slice(0, 3)), text);
      }
    });

    const reply = () => new Promise<{ code: number; text: string }>((res) => (waiter = (code, text) => res({ code, text })));
    async function expect(codes: number[], what: string) {
      const r = await reply();
      if (!codes.includes(r.code)) throw new Error(`smtp ${what} failed: ${r.text.trim().slice(0, 200)}`);
    }
    const send = (line: string) => socket.write(line + "\r\n");

    (async () => {
      await expect([220], "greeting");
      send("EHLO behindthetech.in");
      await expect([250], "EHLO");
      send("AUTH LOGIN");
      await expect([334], "AUTH");
      send(b64(user));
      await expect([334], "user");
      send(b64(pass));
      await expect([235], "login (check GMAIL_USER / GMAIL_APP_PASSWORD)");
      send(`MAIL FROM:<${clean(user)}>`);
      await expect([250], "MAIL FROM");
      send(`RCPT TO:<${to}>`);
      await expect([250, 251], "RCPT TO");
      send("DATA");
      await expect([354], "DATA");
      // dot-stuff and terminate
      socket.write(message.replace(/^\./gm, "..") + ".\r\n");
      await expect([250], "message");
      send("QUIT");
      done = true;
      socket.end();
      resolve();
    })().catch(fail);
  });
}
