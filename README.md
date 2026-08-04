# Site du Dr I. B. Ahogni — Portfolio professionnel

Site statique du **Dr Idelphonse Bonaventure Ahogni** — gestionnaire de programme paludisme, entomologiste médical et chercheur en santé publique.

Construit avec **Astro** + **Sanity CMS** (headless), déployé sur **Netlify**.

## Stack

- [Astro 7](https://astro.build) — génération statique
- [Sanity](https://www.sanity.io) — CMS headless (dataset `production`, projet `tbpdhv8m`)
- [astro-portabletext](https://github.com/natemoo-re/astro-portabletext) — rendu des blocs Portable Text
- [@fontsource-variable](https://fontsource.org) — polices self-hosted (Fraunces, Archivo, JetBrains Mono)

## Structure

```
public/                  # assets statiques (images, favicon)
src/
  components/            # 17 composants Astro (Hero, About, Career, SearchModal…)
  layouts/Layout.astro   # layout global (head SEO, back-to-top)
  lib/queries.ts         # requêtes GROQ + cachedFetch (mémoïsation)
  pages/                 # /, /contact, /publications, /changelog
  sanity/schemas/        # siteSettings + siteContent
  scripts/main.js        # interactions côté client (scrollspy, compteurs, formulaire)
  styles/global.css      # design system (variables, sections, responsive)
astro.config.mjs
sanity.config.ts         # config du Sanity Studio
publications-data.mjs    # source de vérité des publications
```

## Commandes

| Commande | Action |
| :-- | :-- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de dev à `localhost:4321` |
| `npm run build` | Build de production vers `./dist/` |
| `npm run preview` | Prévisualise le build |
| `node populate-sanity.mjs` | Peuple/crée les documents Sanity |
| `node update-publications.mjs` | Met à jour uniquement les publications de Sanity |

## CMS

Le contenu est géré dans Sanity (documents singleton `siteSettings` et `siteContent`).
Les scripts racine utilisent le token `SANITY_API_TOKEN` défini dans `.env` (non versionné).

## Déploiement

- Automatique via [Netlify](https://idlphonseahogni.com) depuis le dépôt GitHub
- `netlify.toml` : build `npm run build`, publication `dist/`
- Domaine : https://idelphonseahogni.com