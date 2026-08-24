// Vercel Serverless Function — formulaire de contact.
// Env requis dans le projet Vercel :
//   RESEND_API_KEY        — clé API Resend (https://resend.com)
//   CONTACT_FROM_EMAIL    — expéditeur vérifié, ex. "Site <contact@idelphonseahogni.com>" (défaut ci-dessous)
//   CONTACT_TO_EMAIL      — destinataire (défaut : contact@idelphonseahogni.com)

const RL_WINDOW = 60 * 60 * 1000; // 1h
const RL_MAX = 5;
const rlStore = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rlStore.get(ip);
  if (!entry || now > entry.reset) {
    rlStore.set(ip, { count: 1, reset: now + RL_WINDOW });
    return false;
  }
  entry.count++;
  if (entry.count > RL_MAX) return true;
  return false;
}

function getIP(req: any): string {
  const fwd = req.headers?.["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  if (Array.isArray(fwd)) return fwd[0];
  return req.headers?.["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

type FormBody = Record<string, string | undefined>;

function parseBody(raw: unknown): FormBody {
  if (typeof raw === "string") {
    try {
      const j = JSON.parse(raw);
      if (j && typeof j === "object") return j as FormBody;
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(raw);
    const o: FormBody = {};
    for (const [k, v] of params) o[k] = v;
    return o;
  }
  if (raw && typeof raw === "object") return raw as FormBody;
  return {};
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "https://idelphonseahogni.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("X-Robots-Tag", "noindex");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const ip = getIP(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  // Vérification Origin/Referer basique (anti-CSRF simple)
  const origin = String(req.headers?.origin || req.headers?.referer || "");
  if (origin && !origin.includes("idelphonseahogni.com") && !origin.includes("localhost") && !origin.includes("127.0.0.1")) {
    return res.status(403).json({ ok: false, error: "forbidden" });
  }

  const body = parseBody(req.body);

  // Honeypot : un humain ne remplit jamais ce champ.
  if (body["bot-field"]) return res.status(200).json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 120) {
    return res.status(400).json({ ok: false, error: "invalid_name" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }
  if (message.length < 20 || message.length > 1000) {
    return res.status(400).json({ ok: false, error: "invalid_message" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  const to = process.env.CONTACT_TO_EMAIL || "contact@idelphonseahogni.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Site <contact@idelphonseahogni.com>";
  const title = subject || name;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Contact site — ${title}`,
      text: `Nom : ${name}\nE-mail : ${email}${subject ? `\nObjet : ${subject}` : ""}\n\n${message}`,
      html: `<p><strong>Nom :</strong> ${esc(name)}</p><p><strong>E-mail :</strong> ${esc(email)}</p>${
        subject ? `<p><strong>Objet :</strong> ${esc(subject)}</p>` : ""
      }<hr><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!r.ok) {
    const text = await r.text();
    console.error("resend error", r.status, text);
    return res.status(502).json({ ok: false, error: "provider" });
  }

  return res.status(200).json({ ok: true });
}
