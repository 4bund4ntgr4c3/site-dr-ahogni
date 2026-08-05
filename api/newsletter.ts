// Vercel Serverless Function — inscription newsletter (Buttondown).
// Env requis dans le projet Vercel :
//   BUTTONDOWN_API_KEY  — clé API Buttondown (https://buttondown.com)
// Si la clé est absente, la fonction renvoie `not_configured` et le site
// affiche « bientôt disponible » (dégradation gracieuse).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "https://idelphonseahogni.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

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
