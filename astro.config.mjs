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
      filter: (page) => !["/cv/", "/changelog/", "/offline/", "/404/", "/en/cv/", "/en/changelog/", "/en/offline/", "/en/404/"].includes(new URL(page).pathname),
      i18n: {
        defaultLocale: "fr",
        locales: {
          fr: "fr",
          en: "en",
        },
      },
    }),
    sanity({
      projectId: "tbpdhv8m",
      dataset: "production",
      apiVersion: "2026-03-01",
      useCdn: false,
    }),
  ],
});

