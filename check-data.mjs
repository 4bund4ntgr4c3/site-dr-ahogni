import { createClient } from "@sanity/client";
import "dotenv/config";

const c = createClient({
  projectId: "tbpdhv8m",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const q = `*[_type=="siteContent"][0]{
  aboutText, aboutChips[], aboutFacts[], aboutPullQuote,
  expertise[], career[], education[], skillGroups[],
  awards[], serviceConsulting[], serviceAffiliations[],
  talks[], contactLead, faq[], publicationsNote,
  stats[]
}`;

const d = await c.fetch(q);
console.log("aboutText:", !!d.aboutText);
console.log("aboutChips:", d.aboutChips?.length);
console.log("aboutFacts:", d.aboutFacts?.length);
console.log("aboutPullQuote:", !!d.aboutPullQuote);
console.log("expertise:", d.expertise?.length);
console.log("career:", d.career?.length);
console.log("education:", d.education?.length);
console.log("skillGroups:", d.skillGroups?.length);
console.log("awards:", d.awards?.length);
console.log("serviceConsulting:", d.serviceConsulting?.length);
console.log("serviceAffiliations:", d.serviceAffiliations?.length);
console.log("talks:", d.talks?.length);
console.log("contactLead:", !!d.contactLead);
console.log("faq:", d.faq?.length);
console.log("publicationsNote:", d.publicationsNote);
console.log("stats:", d.stats?.length);
