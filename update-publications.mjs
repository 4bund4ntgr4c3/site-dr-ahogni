import { createClient } from "@sanity/client";
import "dotenv/config";
import { publications } from "./publications-data.mjs";

const client = createClient({
  projectId: "tbpdhv8m",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

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
