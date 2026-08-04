import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteContent",
  title: "Contenu du site",
  type: "document",
  groups: [
    { name: "stats", title: "Statistiques" },
    { name: "about", title: "À propos" },
    { name: "expertise", title: "Expertises" },
    { name: "career", title: "Parcours" },
    { name: "education", title: "Formation & Skills" },
    { name: "publications", title: "Publications" },
    { name: "awards", title: "Distinctions" },
    { name: "service", title: "Service" },
    { name: "talks", title: "Communications" },
    { name: "contact", title: "Contact" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    // ── STATS ──
    defineField({
      name: "stats",
      title: "Statistiques",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Nombre", type: "number" }),
            defineField({ name: "suffix", title: "Suffixe (ex: +)", type: "string" }),
            defineField({ name: "label", title: "Libellé", type: "string" }),
          ],
        },
      ],
      group: "stats",
    }),

    // ── ABOUT ──
    defineField({
      name: "aboutText",
      title: "Texte de présentation",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
    }),
    defineField({
      name: "aboutChips",
      title: "Badges / Chips",
      type: "array",
      of: [{ type: "string" }],
      group: "about",
    }),
    defineField({
      name: "aboutFacts",
      title: "Facts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "key", title: "Clé", type: "string" }),
            defineField({ name: "value", title: "Valeur", type: "string" }),
          ],
        },
      ],
      group: "about",
    }),
    defineField({ name: "aboutPullQuote", title: "Citation", type: "string", group: "about" }),

    // ── EXPERTISE ──
    defineField({
      name: "expertise",
      title: "Domaines d'expertise",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "index", title: "Index (ex: N° 01)", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
        },
      ],
      group: "expertise",
    }),

    // ── CAREER ──
    defineField({
      name: "careerIndex",
      title: "Index parcours (sidebar)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "dateRange", title: "Période", type: "string" }),
            defineField({ name: "org", title: "Organisation", type: "string" }),
          ],
        },
      ],
      group: "career",
    }),
    defineField({
      name: "career",
      title: "Parcours professionnel",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "dateRange", title: "Période", type: "string" }),
            defineField({ name: "title", title: "Poste", type: "string" }),
            defineField({ name: "org", title: "Organisation", type: "string" }),
            defineField({
              name: "bullets",
              title: "Points clés",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
      group: "career",
    }),

    // ── EDUCATION ──
    defineField({
      name: "education",
      title: "Diplômes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Année", type: "string" }),
            defineField({ name: "title", title: "Diplôme", type: "string" }),
            defineField({ name: "school", title: "Établissement", type: "string" }),
            defineField({ name: "thesis", title: "Thèse / Mémoire", type: "string" }),
          ],
        },
      ],
      group: "education",
    }),
    defineField({
      name: "skillGroups",
      title: "Groupes de compétences",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "category", title: "Catégorie", type: "string" }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
      group: "education",
    }),

    // ── PUBLICATIONS ──
    defineField({
      name: "publications",
      title: "Publications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "index", title: "Numéro", type: "number" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "journal", title: "Journal", type: "string" }),
            defineField({ name: "year", title: "Année", type: "number" }),
            defineField({ name: "doi", title: "DOI", type: "string" }),
            defineField({ name: "authors", title: "Auteurs", type: "string" }),
            defineField({ name: "url", title: "Lien DOI", type: "url" }),
          ],
        },
      ],
      group: "publications",
    }),
    defineField({ name: "publicationsNote", title: "Note publications", type: "string", group: "publications" }),

    // ── AWARDS ──
    defineField({
      name: "awards",
      title: "Distinctions & Bourses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Année", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "location", title: "Lieu", type: "string" }),
          ],
        },
      ],
      group: "awards",
    }),

    // ── SERVICE ──
    defineField({
      name: "serviceConsulting",
      title: "Rôles consultatifs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "org", title: "Organisation", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
        },
      ],
      group: "service",
    }),
    defineField({
      name: "serviceAffiliations",
      title: "Affiliations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "org", title: "Organisation", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
        },
      ],
      group: "service",
    }),

    // ── TALKS ──
    defineField({
      name: "talks",
      title: "Communications scientifiques",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Année", type: "number" }),
            defineField({ name: "type", title: "Type (Orale, Poster, Prix)", type: "string" }),
            defineField({ name: "title", title: "Titre de la conférence", type: "string" }),
            defineField({ name: "location", title: "Lieu", type: "string" }),
          ],
        },
      ],
      group: "talks",
    }),

    // ── CONTACT ──
    defineField({ name: "contactLead", title: "Accroche page contact", type: "text", group: "contact" }),
    defineField({
      name: "contactSubjects",
      title: "Options sujet (select)",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
    }),

    // ── FAQ ──
    defineField({
      name: "faq",
      title: "Questions fréquentes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Réponse", type: "text" }),
          ],
        },
      ],
      group: "faq",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contenu du site" };
    },
  },
});
