import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { CONTENT_QUERY, SETTINGS_QUERY, cachedFetch } from "../../lib/queries";

export const GET: APIRoute = async () => {
  const [content, settings] = await Promise.all([
    cachedFetch(sanityClient, CONTENT_QUERY),
    cachedFetch(sanityClient, SETTINGS_QUERY),
  ]);

  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: "Dr Idelphonse Bonaventure AHOGNI, PhD",
      label: "Medical Entomologist · Public Health Malaria Program Manager",
      image: "https://idelphonseahogni.com/Dr-Idelphone-AHOGNI.jpeg",
      email: settings?.email || "idelphonse.ahogni@gmail.com",
      phone: settings?.phone || "+229 00 00 00 00",
      url: "https://idelphonseahogni.com/en",
      summary: "PhD in Medical Entomology, Senior Researcher at the Entomological Research Centre of Cotonou (CREC) and Public Health Expert specialized in operational vector control evaluation, insecticide resistance management, and genomic surveillance across Sub-Saharan Africa.",
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
      name: c.company || c.org || "CREC Benin",
      position: c.role || c.title || "Senior Research Entomologist",
      url: "https://crec-benin.org",
      startDate: c.period?.split("—")[0]?.trim() || "2020",
      endDate: c.period?.split("—")[1]?.trim() || "Present",
      summary: c.description || "",
      highlights: [],
    })),
    education: (content?.education ?? []).map((e: any) => ({
      institution: e.institution || "University of Abomey-Calavi (UAC)",
      url: "https://uac.bj",
      area: e.field || "Medical Entomology & Public Health",
      studyType: e.degree || "Doctorate (PhD)",
      startDate: e.year ? String(Number(e.year) - 3) : "2018",
      endDate: String(e.year || "2021"),
      score: "",
      courses: [],
    })),
    skills: (content?.skillGroups ?? []).map((sg: any) => ({
      name: sg.category || "General",
      level: "Master",
      keywords: sg.tags || [],
    })),
    publications: (content?.publications ?? []).map((p: any) => ({
      name: p.title,
      publisher: p.journal,
      releaseDate: String(p.year),
      url: p.url || (p.doi ? `https://doi.org/${p.doi}` : ""),
      summary: `Authors: ${p.authors}`,
    })),
    languages: [
      { language: "French", fluency: "Native speaker" },
      { language: "Fon", fluency: "Native speaker" },
      { language: "English", fluency: "Full professional / scientific proficiency" },
    ],
    interests: [
      { name: "Global Health Policy" },
      { name: "Vector Control & Insecticide Resistance" },
      { name: "GLP Certification & Clinical Trials" },
      { name: "Capacity Building & Mentorship" },
    ],
  };

  return new Response(JSON.stringify(resume, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
