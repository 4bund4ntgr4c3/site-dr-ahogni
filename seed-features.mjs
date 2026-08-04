import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: "tbpdhv8m",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const demoPost = {
  _id: "post-bienvenue",
  _type: "post",
  title: "Bienvenue sur les notes de terrain",
  slug: { _type: "slug", current: "bienvenue" },
  publishedAt: new Date().toISOString(),
  excerpt:
    "Ce carnet rassemble des chroniques de terrain, des réflexions sur la lutte antivectorielle et les actualités de la recherche sur le paludisme.",
  tags: ["Vie du site", "Terrain"],
  body: [
    { _type: "block", _key: "b1", style: "normal", children: [{ _type: "span", _key: "s1", text: "Bienvenue sur ce carnet de notes. Vous y trouverez, au fil des publications, des observations de terrain, des synthèses méthodologiques et des nouvelles de la recherche sur le paludisme." }] },
    { _type: "block", _key: "b2", style: "normal", children: [{ _type: "span", _key: "s2", text: "L'objectif est simple : partager des " }, { _type: "span", _key: "s3", text: "données et des leçons apprises", marks: ["strong"] }, { _type: "span", _key: "s4", text: " qui puissent éclairer les décisions de santé publique, de la surveillance entomologique à la durabilité des moustiquaires imprégnées." }] },
    { _type: "block", _key: "b3", style: "blockquote", children: [{ _type: "span", _key: "s5", text: "Chaque moustique compté est une décision de santé publique mieux informée." }] },
  ],
};

const sampleTestimonials = [
  { _key: "tst1", name: "Dr X, Ministère de la Santé", role: "Partenaire programme paludisme", quote: "Un partenaire rigoureux, dont les données entomologiques ont directement informé le choix des moustiquaires au niveau national." },
  { _key: "tst2", name: "Prof. Y, université africaine", role: "Collaborateur recherche", quote: "Une capacité rare à traduire la science de pointe en décisions programmatiques concrètes et à encadrer les équipes de terrain." },
];

async function main() {
  console.log("Seed des nouvelles fonctionnalités...");

  // 1) Post de blog de démonstration
  try {
    await client.createOrReplace(demoPost);
    console.log("✓ Post de blog démarré :", demoPost.slug.current);
  } catch (err) {
    console.error("✗ Post de blog:", err.message);
  }

  // 2) Témoignages (préserve toutes les autres données existantes)
  try {
    const existing = await client.fetch("*[_type=='siteContent'][0]");
    const updated = {
      ...existing,
      _type: "siteContent",
      _id: "siteContent",
      testimonials: existing?.testimonials?.length ? existing.testimonials : sampleTestimonials,
      gallery: existing?.gallery || [],
    };
    await client.createOrReplace(updated);
    console.log("✓ Témoignages & galerie en place");
  } catch (err) {
    console.error("✗ Témoignages:", err.message);
  }

  // 3) Rappel sur les champs à compléter dans le Studio Sanity
  console.log("→ À compléter dans Sanity Studio :");
  console.log("  • Settings : linkedin, researchGate, orcid, googleScholar, calendlyUrl");
  console.log("  • Contenu → Galerie : ajouter des photos de terrain");
  console.log("  • Blog : modifier/supprimer le post de démonstration");

  console.log("Terminé !");
}

main();