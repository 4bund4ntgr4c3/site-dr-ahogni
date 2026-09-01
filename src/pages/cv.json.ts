import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { CONTENT_QUERY, SETTINGS_QUERY, cachedFetch } from "../lib/queries";

export const GET: APIRoute = async () => {
  const [content, settings] = await Promise.all([
    cachedFetch(sanityClient, CONTENT_QUERY),
    cachedFetch(sanityClient, SETTINGS_QUERY),
  ]);

  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: "Dr Idelphonse Bonaventure AHOGNI",
      label: "Entomologiste Médical · Gestionnaire de Programme Paludisme",
      image: "https://idelphonseahogni.com/Dr-Idelphone-AHOGNI.jpeg",
      email: settings?.contactEmail || "contact@idelphonseahogni.com",
      phone: settings?.contactPhone || "+229 01 96 68 21 98",
      url: "https://idelphonseahogni.com",
      summary: "Docteur en Entomologie Médicale (PhD), chercheur au Centre de Recherche Entomologique de Cotonou (CREC) et expert en santé publique spécialisé dans l'évaluation opérationnelle des outils de lutte antivectorielle, la gestion de la résistance aux insecticides et la surveillance génomique en Afrique subsaharienne.",
      location: {
        city: "Cotonou",
        countryCode: "BJ",
        region: "Littoral",
      },
      profiles: [
        {
          network: "ResearchGate",
          username: "Idelphonse-Ahogni",
          url: "https://www.researchgate.net/profile/Idelphonse-Ahogni",
        },
        {
          network: "LinkedIn",
          username: "idelphonse-ahogni",
          url: "https://www.linkedin.com/in/idelphonse-ahogni",
        },
        {
          network: "ORCID",
          username: "0000-0000-0000-0000",
          url: "https://orcid.org",
        },
      ],
    },
    work: (content?.career ?? []).map((c: any) => ({
      name: c.company || c.org || "CREC Bénin",
      position: c.role || c.title || "Chercheur Entomologiste",
      url: "https://crec-benin.org",
      startDate: c.period?.split("—")[0]?.trim() || "2020",
      endDate: c.period?.split("—")[1]?.trim() || "Présent",
      summary: c.description || "",
      highlights: [],
    })),
    education: (content?.education ?? []).map((e: any) => ({
      institution: e.institution || "Université d'Abomey-Calavi (UAC)",
      url: "https://uac.bj",
      area: e.field || "Entomologie Médicale & Santé Publique",
      studyType: e.degree || "Doctorat (PhD)",
      startDate: e.year ? String(Number(e.year) - 3) : "2018",
      endDate: String(e.year || "2021"),
      score: "",
      courses: [],
    })),
    publications: (content?.publications ?? []).map((p: any) => ({
      name: p.title,
      publisher: p.journal,
      releaseDate: String(p.year || "2024"),
      url: p.url || (p.doi ? `https://doi.org/${p.doi}` : ""),
      summary: `${p.authors}. ${p.journal}, ${p.year}. DOI: ${p.doi || "N/A"}`,
    })),
    skills: [
      {
        name: "Lutte Antivectorielle & Entomologie",
        level: "Master",
        keywords: [
          "Bio-essais OMS (Tubes & Bouteilles CDC)",
          "Cases expérimentales (Phase II)",
          "Échantillonnage et élevage larvaire",
          "Moustiquaires PBO & Bi-actives (Interceptor G2)",
        ],
      },
      {
        name: "Biologie Moléculaire & Génomique",
        level: "Advanced",
        keywords: [
          "Génotypage kdr L1014F/S",
          "Génotypage ace-1 G119S",
          "Dosages enzymatiques Cytochromes P450",
          "PCR multiplex d'identification spécifique",
        ],
      },
      {
        name: "Gestion de Programme & Santé Publique",
        level: "Expert",
        keywords: [
          "Surveillance épidémiologique",
          "Coordination bailleurs (Fonds Mondial, PMI)",
          "Recherche opérationnelle",
          "Rédaction de protocoles et SOPs",
        ],
      },
    ],
    languages: [
      { language: "Français", fluency: "Langue maternelle" },
      { language: "Anglais", fluency: "Courant professionnel (C1)" },
    ],
  };

  return new Response(JSON.stringify(resume, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
