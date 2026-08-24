import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Article de blog — Notes de terrain",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "publishedAt", title: "Date de publication", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Extrait", type: "text", rows: 3, validation: (Rule) => Rule.required().min(20).max(300) }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texte alternatif", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({
      name: "language",
      title: "Langue",
      type: "string",
      options: { list: [{ title: "Français", value: "fr" }, { title: "English", value: "en" }], layout: "radio" },
      initialValue: "fr",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
    },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString("fr-FR") : "" };
    },
  },
});