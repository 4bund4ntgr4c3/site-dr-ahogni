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
- [Leaflet](https://leafletjs.com) — carte interactive des pays d'intervention
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) — flux RSS/Atom

## Structure

```
public/                  # assets statiques (images, favicon)
api/
  contact.ts             # Vercel Function — formulaire de contact (Resend)
  newsletter.ts          # Vercel Function — inscription newsletter (Buttondown)
src/
  components/            # composants Astro (Hero, About, Career, PublicationsPage, Newsletter, Media, Projects…)
  layouts/Layout.astro   # layout global (head SEO, dark mode, back-to-top)
  lib/queries.ts         # requêtes GROQ + cachedFetch (mémoïsation)
  pages/                 # /, /contact, /publications, /blog, /cv, /speaking, /changelog, /rss.xml
  sanity/schemas/        # siteSettings + siteContent (media[], projects[])
  scripts/main.js        # interactions côté client (i18n, thème, decode, analytics)
  styles/global.css      # design system (variables, sections, responsive, dark mode)
  styles/contact.css     # CSS contact (chargé uniquement sur /contact)
  styles/fonts-latin.css # @font-face subset latin uniquement
astro.config.mjs
vercel.json              # config Vercel (headers CSP, Cache-Control, functions)
netlify.toml             # config Netlify (transition)
sanity.config.ts         # config du Sanity Studio
```

## Design

- **Dark mode** : bascule manuelle persistée (`localStorage`), script anti-flash inline
- **Header adaptatif** : classe `body.on-dark-header` pour les pages avec en-tête sombre
- **Polices** : Fraunces (display), Archivo (body), JetBrains Mono (mono)
- **Palette** : `--ink`, `--paper`, `--teal`, `--coral`, `--amber`
- **Images** : AVIF + WebP automatiques via Sanity CDN + Astro Image (hero preload adaptatif)

## Pages

| Page | Description |
| :-- | :-- |
| `/` | Accueil (Hero, About, Career, Projects, Education, Expertise, Publications, Awards, Service, Communications, Media, Carte, Galerie) |
| `/contact` | Formulaire de contact + FAQ |
| `/publications` | Liste complète des publications avec filtres par année et type, recherche, BibTeX |
| `/blog` | Blog — notes de terrain avec filtres par tag |
| `/blog/[slug]` | Article de blog avec JSON-LD, partage social (LinkedIn, X, WhatsApp, e-mail) |
| `/speaking` | Conférences & présentations avec filtres année/type |
| `/cv` | Curriculum Vitæ imprimable (A4) |
| `/changelog` | Journal de versions (protégé par mot de passe) |
| `/rss.xml` | Flux RSS/Atom du blog |

## Performance

- **Polices** : subset latin uniquement (−193 Ko), `font-display: swap`
- **Images hero** : `<link rel="preload">` AVIF/WebP adaptatif + `fetchpriority="high"`
- **Leaflet** : CSS injecté dynamiquement au scroll (pas de render-blocking)
- **CSS** : contact extrait dans un fichier séparé (non chargé sur les autres pages)
- **Cache** : `Cache-Control: immutable` pour `/_astro/*`
- **Analytics** : Vercel Analytics avec CSP mis à jour

## Sanity CMS

Le contenu est géré dans Sanity (documents singleton `siteSettings` et `siteContent`).

### Champs disponibles dans `siteContent`

| Groupe | Champs |
| :-- | :-- |
| Statistiques | `stats[]` — compteurs animés |
| À propos | `aboutText`, `aboutChips[]`, `aboutFacts[]`, `aboutPullQuote` |
| Expertises | `expertise[]` — 8 domaines |
| Parcours | `career[]`, `careerIndex[]` — expériences professionnelles |
| Formation | `education[]`, `skillGroups[]` — diplômes et compétences |
| Publications | `publications[]` — index, titre, journal, année, DOI, auteurs, URL, type |
| Distinctions | `awards[]` — prix et bourses |
| Service | `serviceConsulting[]`, `serviceAffiliations[]` |
| Communications | `talks[]` — conférences (année, type, titre, lieu) |
| Contact | `contactLead`, `contactSubjects[]` |
| FAQ | `faq[]` — questions/réponses |
| Galerie | `gallery[]` — images terrain avec légende |
| Témoignages | `testimonials[]` — citations |
| Médiations | `media[]` — interviews, articles presse, reportages |
| Projets | `projects[]` — programmes financés (titre, période, financeur, rôle, pays) |

Le token `SANITY_API_TOKEN` est défini dans `.env` (non versionné).

## Commandes

| Commande | Action |
| :-- | :-- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de dev à `localhost:4321` |
| `npm run build` | Build de production vers `./dist/` |
| `npm run preview` | Prévisualise le build |
| `astro dev --background` | Dev server en arrière-plan |
| `astro dev stop` | Arrête le dev server |
| `node populate-sanity.mjs` | Peuple/crée les documents Sanity |
| `node update-publications.mjs` | Met à jour uniquement les publications de Sanity |

## Déploiement

- **Vercel** : déploiement automatique depuis le dépôt GitHub
  - `vercel.json` : build `npm run build`, publication `dist/`, headers CSP + Cache-Control, functions serverless
  - Domaine : https://idelphonseahogni.com
- **Netlify** : en transition (configuration conservée pour rollback)
