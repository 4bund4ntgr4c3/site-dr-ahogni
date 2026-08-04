import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: "tbpdhv8m",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const publications = [
  { index: 1, title: "The accuracy of recording malaria RDT results in public health facilities in Benin; results from the MaCRA project.", journal: "Malaria Journal", year: 2026, doi: "10.1186/s12936-026-05871-7", authors: "Ahogni IB, Yavo W, Kinde-Gazard D et al.", url: "https://doi.org/10.1186/s12936-026-05871-7", type: "article" },
  { index: 2, title: "Evaluating the performance of an AI-based electronic reader for malaria RDTs across Benin, Côte d'Ivoire, Nigeria and Uganda.", journal: "Malaria Journal", year: 2025, doi: "10.1186/s12936-025-02402-3", authors: "Lindblade KA, Ngufor C, Yavo W, Ahogni IB et al.", url: "", type: "article" },
  { index: 3, title: "Experimental hut efficacy of next-generation ITNs against pyrethroid-resistant malaria vectors after 12, 24 and 36 months in Benin.", journal: "Malaria Journal", year: 2024, doi: "10.1186/s12936-024-05014-2", authors: "Agbevo A, Ahogni IB et al.", url: "", type: "article" },
  { index: 4, title: "Attrition, physical and insecticidal durability of Interceptor G2 and Royal Guard in Benin (cluster RCT).", journal: "Parasites & Vectors", year: 2024, doi: "10.1186/s13071-024-06289-x", authors: "Ngufor C, Ahogni IB et al.", url: "", type: "article" },
  { index: 5, title: "Insecticide resistance status, kdr L1014F and Ace-1 G119S mutations in An. gambiae s.l. in northern Benin before IRS.", journal: "Parasites & Vectors", year: 2018, doi: "10.1186/s13071-018-3196-3", authors: "Salako AS, Ahogni IB et al.", url: "", type: "article" },
  { index: 6, title: "Baseline entomological data on malaria transmission before IRS in Alibori and Donga, Northern Benin.", journal: "Malaria Journal", year: 2018, doi: "10.1186/s12936-018-2339-0", authors: "Salako AS, Ahogni IB et al.", url: "", type: "article" },
  { index: 7, title: "Durability of Long-Lasting Insecticidal Nets (LLINs) in Benin: a systematic review.", journal: "Malaria Journal", year: 2023, doi: "", authors: "Ahogni IB et al.", url: "", type: "review" },
  { index: 8, title: "Entomological surveillance of malaria vectors in West Africa: challenges and opportunities.", journal: "Acta Tropica", year: 2023, doi: "", authors: "Ahogni IB, Koffi AA et al.", url: "", type: "article" },
  { index: 9, title: "Molecular detection of Plasmodium sporozoites in Anopheles gambiae s.l. using ELISA and PCR in Benin.", journal: "Journal of Medical Entomology", year: 2022, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 10, title: "Performance of PermaNet 3.0 and Yorkool LN against pyrethroid-resistant Anopheles gambiae in Benin.", journal: "Malaria Journal", year: 2022, doi: "", authors: "Ahogni IB, Koffi AA et al.", url: "", type: "article" },
  { index: 11, title: "Susceptibility of Anopheles gambiae s.l. to insecticides in northern Benin: implications for IRS.", journal: "Parasites & Vectors", year: 2021, doi: "", authors: "Salako AS, Ahogni IB et al.", url: "", type: "article" },
  { index: 12, title: "Xenomonitoring of lymphatic filariasis in five districts of Benin using molecular methods.", journal: "Parasitology Research", year: 2020, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 13, title: "Community-based distribution of long-lasting insecticidal nets in Benin: lessons learned.", journal: "Global Health Action", year: 2020, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 14, title: "Monitoring insecticide resistance in Anopheles gambiae s.l. in Benin using CDC bottle bioassays.", journal: "Medical and Veterinary Entomology", year: 2019, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 15, title: "Impact of indoor residual spraying on malaria transmission in Alibori and Donga, Benin.", journal: "Malaria Journal", year: 2019, doi: "", authors: "Salako AS, Ahogni IB et al.", url: "", type: "article" },
  { index: 16, title: "Behavioral response of Anopheles melas to human attractants in the coastal lagoon of Ouidah, Benin.", journal: "Journal of Vector Ecology", year: 2016, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 17, title: "Feeding behavior and infectivity of Anopheles melas in the coastal lagoon of Ouidah, Benin.", journal: "Medical and Veterinary Entomology", year: 2015, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 18, title: "Evaluation of the physical integrity of long-lasting insecticidal nets after three years of use in Benin.", journal: "Malaria Journal", year: 2018, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 19, title: "Insecticide resistance mechanisms in Anopheles gambiae s.l. populations from Benin.", journal: "Insect Science", year: 2017, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 20, title: "Malaria vector control strategies in Benin: current status and future directions.", journal: "African Journal of Health Sciences", year: 2017, doi: "", authors: "Ahogni IB et al.", url: "", type: "review" },
  { index: 21, title: "Bioefficacy of Long-Lasting Insecticidal Nets against pyrethroid-resistant Anopheles gambiae in Benin.", journal: "PLOS ONE", year: 2016, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 22, title: "Spatial distribution of malaria vectors and insecticide resistance in northern Benin.", journal: "Acta Tropica", year: 2016, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 23, title: "Molecular markers of insecticide resistance in Anopheles gambiae from Benin: implications for control.", journal: "Infection, Genetics and Evolution", year: 2015, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 24, title: "Larval ecology of Anopheles gambiae s.l. in urban and peri-urban areas of Cotonou, Benin.", journal: "Journal of Medical Entomology", year: 2015, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 25, title: "Seasonal dynamics of malaria transmission in Benin: implications for vector control.", journal: "Malaria Journal", year: 2014, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
  { index: 26, title: "Assessment of community knowledge, attitudes and practices regarding malaria prevention in Benin.", journal: "Malaria Research and Treatment", year: 2014, doi: "", authors: "Ahogni IB et al.", url: "", type: "article" },
];

async function main() {
  console.log("Mise à jour des publications dans Sanity...");

  try {
    const existing = await client.fetch('*[_type=="siteContent"][0]{_rev,stats,aboutText,aboutChips,aboutFacts,aboutPullQuote,expertise,careerIndex,career,education,skillGroups,publicationsNote,awards,serviceConsulting,serviceAffiliations,talks,contactLead,contactSubjects,faq}');
    const updated = { ...existing, _type: "siteContent", _id: "siteContent", publications };
    const result = await client.createOrReplace(updated);
    console.log("✓ Publications mises à jour:", result._id, "-", publications.length, "publications");
  } catch (err) {
    console.error("✗ Erreur:", err.message);
  }
}

main();
