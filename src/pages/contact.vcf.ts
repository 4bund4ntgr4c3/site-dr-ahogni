import { sanityClient } from "sanity:client";
import { SETTINGS_QUERY, cachedFetch } from "../lib/queries";

export async function GET() {
  const settings = await cachedFetch(sanityClient, SETTINGS_QUERY);
  const fn = `${settings?.heroName?.firstName || "Idelphonse"} ${settings?.heroName?.middleName || "Bonaventure"} ${settings?.heroName?.lastName || "AHOGNI"}`.trim();
  const email = settings?.contactEmail || "contact@idelphonseahogni.com";
  const phone = settings?.contactPhone || "";
  const title = settings?.heroTagline || "Gestionnaire de programme paludisme · Entomologiste médical";
  const site = "https://idelphonseahogni.com";

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${fn}, ${settings?.heroName?.suffix || "PhD"}`,
    `N:${settings?.heroName?.lastName || "Ahogni"};${settings?.heroName?.firstName || "Idelphonse"};${settings?.heroName?.middleName || "Bonaventure"};Dr;PhD`,
    `TITLE:${title}`,
    "ORG:Ministère de la Santé / Programme National de Lutte contre le Paludisme",
    `EMAIL;TYPE=INTERNET,WORK:${email}`,
    phone ? `TEL;TYPE=CELL,VOICE:${phone}` : "",
    "ADR;TYPE=WORK:;;Cotonou;;;Bénin",
    `URL:${site}`,
    settings?.linkedin && settings?.linkedin !== "#" ? `X-SOCIALPROFILE;type=linkedin:${settings.linkedin}` : "",
    settings?.orcid && settings?.orcid !== "#" ? `X-SOCIALPROFILE;type=orcid:${settings.orcid}` : "",
    "NOTE:Entomologiste médical et gestionnaire de programme paludisme.",
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  return new Response(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Dr_Idelphonse_AHOGNI.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
