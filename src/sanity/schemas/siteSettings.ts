import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Titre du site", type: "string" }),
    defineField({ name: "siteDescription", title: "Description SEO", type: "text" }),
    defineField({ name: "heroEyebrow", title: "Hero — Eyebrow", type: "string" }),
    defineField({
      name: "heroName",
      title: "Hero — Nom",
      type: "object",
      fields: [
        defineField({ name: "firstName", title: "Prénom", type: "string" }),
        defineField({ name: "middleName", title: "Deuxième prénom", type: "string" }),
        defineField({ name: "lastName", title: "Nom de famille", type: "string" }),
        defineField({ name: "suffix", title: "Suffixe (ex: PhD)", type: "string" }),
      ],
    }),
    defineField({ name: "heroTagline", title: "Hero — Tagline", type: "string" }),
    defineField({ name: "heroLede", title: "Hero — Paragraphe", type: "text" }),
    defineField({ name: "heroImage", title: "Hero — Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroFigCaption",
      title: "Hero — Légende image",
      type: "object",
      fields: [
        defineField({ name: "left", title: "Texte gauche", type: "string" }),
        defineField({ name: "right", title: "Texte droite", type: "string" }),
      ],
    }),
    defineField({ name: "aboutImage", title: "À propos — Image terrain", type: "image", options: { hotspot: true } }),
    defineField({
      name: "aboutFigCaption",
      title: "À propos — Légende image",
      type: "object",
      fields: [
        defineField({ name: "left", title: "Texte gauche", type: "string" }),
        defineField({ name: "right", title: "Texte droite", type: "string" }),
      ],
    }),
    defineField({ name: "breakImage", title: "Image section break", type: "image", options: { hotspot: true } }),
    defineField({ name: "breakLabel", title: "Break — Label", type: "string" }),
    defineField({ name: "breakQuote", title: "Break — Citation", type: "string" }),
    defineField({ name: "officeImage", title: "Contact — Image bureau", type: "image", options: { hotspot: true } }),
    defineField({
      name: "officeFigCaption",
      title: "Contact — Légende bureau",
      type: "object",
      fields: [
        defineField({ name: "left", title: "Texte gauche", type: "string" }),
        defineField({ name: "right", title: "Texte droite", type: "string" }),
      ],
    }),
    defineField({ name: "contactEmail", title: "E-mail contact", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({ name: "contactPhone", title: "Téléphone (affichage)", type: "string" }),
    defineField({ name: "contactPhoneLink", title: "Téléphone (lien tel:)", type: "string" }),
    defineField({ name: "linkedin", title: "Lien LinkedIn", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "researchGate", title: "Lien ResearchGate", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "orcid", title: "Lien ORCID", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "googleScholar", title: "Lien Google Scholar", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "calendlyUrl", title: "Lien de prise de RDV (Calendly / Cal.com)", type: "url", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "footerText", title: "Texte footer", type: "string" }),
    defineField({ name: "tapeText", title: "Texte bande défilante", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Paramètres du site" };
    },
  },
});
