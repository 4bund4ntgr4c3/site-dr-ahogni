// @ts-check
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://idelphonseahogni.com",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !["/cv/", "/changelog/", "/offline/", "/en/cv/", "/en/changelog/", "/en/offline/"].includes(new URL(page).pathname),
    }),
    sanity({
      projectId: "tbpdhv8m",
      dataset: "production",
      apiVersion: "2026-03-01",
      useCdn: false,
    }),
  ],
});

