// Vercel Serverless Function — inscription newsletter (Buttondown).
// Env requis dans le projet Vercel :
//   BUTTONDOWN_API_KEY  — clé API Buttondown (https://buttondown.com)
// Si la clé est absente, la fonction renvoie `not_configured` et le site
// affiche « bientôt disponible » (dégradation gracieuse).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RL_WINDOW_NL = 60 * 60 * 1000;
const RL_MAX_NL = 5;
const rlStoreNl = new Map<string, { count: number; reset: number }>();

function rateLimitedNl(ip: string): boolean {
  const now = Date.now();
  const e = rlStoreNl.get(ip);
  if (!e || now > e.reset) { rlStoreNl.set(ip, { count: 1, reset: now + RL_WINDOW_NL }); return false; }
  e.count++; return e.count > RL_MAX_NL;
}
function getIPNl(req: any): string {
  const fwd = req.headers?.["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  if (Array.isArray(fwd)) return fwd[0];
  return req.headers?.["x-real-ip"] || req.socket?.remoteAddress || "unknown";
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

  const ip = getIPNl(req);
  if (rateLimitedNl(ip)) return res.status(429).json({ ok: false, error: "rate_limited" });

  const origin = String(req.headers?.origin || req.headers?.referer || "");
  if (origin && !origin.includes("idelphonseahogni.com") && !origin.includes("localhost") && !origin.includes("127.0.0.1")) {
    return res.status(403).json({ ok: false, error: "forbidden" });
  }

  // Honeypot
  if (req.body?.["bot-field"]) return res.status(200).json({ ok: true });

  const email = String(req.body?.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return res.status(501).json({ ok: false, error: "not_configured" });
  }

  try {
    const r = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, type: "regular" }),
    });

    if (!r.ok) {
      // Un abonnement déjà existant est un succès du point de vue de l'utilisateur.
      if (r.status === 409) return res.status(200).json({ ok: true });
      console.error("buttondown error", r.status, await r.text());
      return res.status(502).json({ ok: false, error: "provider" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("buttondown network error", err);
    return res.status(502).json({ ok: false, error: "provider" });
  }
}
