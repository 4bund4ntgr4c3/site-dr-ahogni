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
      lastmod: new Date(),
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
    {
      name: "sitemap-alias",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          const fs = await import("node:fs/promises");
          const path = await import("node:path");
          const { fileURLToPath } = await import("node:url");
          const distDir = fileURLToPath(dir);
          const indexPath = path.join(distDir, "sitemap-index.xml");
          const aliasPath = path.join(distDir, "sitemap.xml");
          const aliasIndex = path.join(distDir, "sitemap_index.xml");
          try {
            await fs.copyFile(indexPath, aliasPath);
            await fs.copyFile(indexPath, aliasIndex);
          } catch (e) {}
        },
      },
    },
  ],
});

