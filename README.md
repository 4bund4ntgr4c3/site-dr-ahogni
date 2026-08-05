# Site du Dr I. B. Ahogni — Portfolio professionnel

Site statique du **Dr Idelphonse Bonaventure Ahogni** — gestionnaire de programme paludisme, entomologiste médical et chercheur en santé publique.

Construit avec **Astro** + **Sanity CMS** (headless), déployé sur **Vercel** (migration depuis Netlify en cours).

## Stack

- [Astro 7](https://astro.build) — génération statique
- [Sanity](https://www.sanity.io) — CMS headless (dataset `production`, projet `tbpdhv8m`)
- [astro-portabletext](https://github.com/natemoo-re/astro-portabletext) — rendu des blocs Portable Text
- [@fontsource-variable](https://fontsource.org) — polices self-hosted (Fraunces, Archivo, JetBrains Mono)
- [@vercel/analytics](https://vercel.com/analytics) — analytics intégrés
- [Resend](https://resend.com) — emails transactionnels (formulaire contact)
- [Buttondown](https://buttondown.com) — newsletter

## Structure

```
public/                  # assets statiques (images, favicon)
api/
  contact.ts             # Vercel Function — formulaire de contact (Resend)
  newsletter.ts          # Vercel Function — inscription newsletter (Buttondown)
src/
  components/            # composants Astro (Hero, About, Career, PublicationsPage, Newsletter…)
  layouts/Layout.astro   # layout global (head SEO, dark mode, back-to-top)
  lib/queries.ts         # requêtes GROQ + cachedFetch (mémoïsation)
  pages/                 # /, /contact, /publications, /blog, /cv, /changelog
  sanity/schemas/        # siteSettings + siteContent
  scripts/main.js        # interactions côté client (i18n, thème, decode, analytics)
  styles/global.css      # design system (variables, sections, responsive, dark mode)
astro.config.mjs
vercel.json              # config Vercel (headers CSP, functions)
netlify.toml             # config Netlify (transition)
sanity.config.ts         # config du Sanity Studio
```

## Design

- **Dark mode** : bascule manuelle persistée (`localStorage`), script anti-flash inline
- **Header adaptatif** : classe `body.on-dark-header` pour les pages avec en-tête sombre
- **Polices** : Fraunces (display), Archivo (body), JetBrains Mono (mono)
- **Palette** : `--ink`, `--paper`, `--teal`, `--coral`, `--amber`

## Pages

| Page | Description |
| :-- | :-- |
| `/` | Accueil (Hero, About, Career, Education, Expertise, Publications, Distinctions) |
| `/contact` | Formulaire de contact + FAQ |
| `/publications` | Liste complète des publications avec filtres et recherche |
| `/blog` | Blog — notes de terrain |
| `/blog/[slug]` — Article de blog avec JSON-LD et partage social |
| `/cv` | Curriculum Vitæ imprimable (A4) |
| `/changelog` | Journal de versions (protégé par mot de passe) |

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

- **Vercel** : déploiement automatique depuis le dépôt GitHub
  - `vercel.json` : build `npm run build`, publication `dist/`, headers CSP, functions serverless
  - Domaine : https://idelphonseahogni.com
- **Netlify** : en transition (configuration conservée pour rollback)
