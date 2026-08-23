# Site du Dr I. B. Ahogni — Portfolio professionnel

Site statique et portfolio scientifique du **Dr Idelphonse Bonaventure Ahogni** — gestionnaire de programme paludisme, entomologiste médical et chercheur en santé publique au Bénin.

Construit avec **Astro 7** + **Sanity CMS** (headless), déployé sur **Vercel**.

---

## ⚡ Stack Technique

- [Astro 7](https://astro.build) — Génération statique haute performance (SSG)
- [Sanity CMS](https://www.sanity.io) — CMS headless (dataset `production`, projet `tbpdhv8m`)
- [astro-portabletext](https://github.com/natemoo-re/astro-portabletext) — Rendu des blocs Portable Text
- [@fontsource-variable](https://fontsource.org) — Polices self-hosted (Fraunces, Archivo, JetBrains Mono)
- [@vercel/analytics](https://vercel.com/analytics) — Analytics intégrés et respectueux de la vie privée
- [Resend](https://resend.com) — Emails transactionnels sécurisés (formulaire contact)
- [Buttondown](https://buttondown.com) — Inscription à la newsletter
- [Leaflet](https://leafletjs.com) — Carte interactive des pays d'intervention avec fiches projets
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) — Flux RSS/Atom pour les notes de terrain

---

## 📁 Structure du Projet

```
public/                  # Assets statiques (photos, favicon, logo)
api/
  contact.ts             # Vercel Function — formulaire de contact sécurisé (Resend)
  newsletter.ts          # Vercel Function — inscription newsletter (Buttondown)
src/
  components/            # Composants Astro modulaires
    ├── Header.astro       # Navigation sticky, burger, recherche, thème & i18n
    ├── Hero.astro         # Accueil, statistiques animées & portrait optimisé
    ├── About.astro        # Profil détaillé, faits marquants & citation
    ├── ScientificImpact.astro # Hub métriques de recherche & graphe Canvas du réseau partenarial
    ├── VectorExplorer.astro   # Explorateur d'espèces de vecteurs & simulateur de bio-essais OMS
    ├── Career.astro       # Timeline de parcours & index des organisations
    ├── Projects.astro     # Projets financés & programmes de recherche
    ├── Education.astro    # Diplômes universitaires & nuage de compétences
    ├── PublicationsPage.astro # Catalogue complet, filtres, export BibTeX/RIS & modal citations
    ├── VideoGallery.astro # Vidéothèque de conférences et webinaires
    ├── AcademicResources.astro # Centre de téléchargement de SOPs et cours
    ├── PdfViewerModal.astro    # Liseuse PDF plein écran in-app
    ├── SpeakerWizard.astro    # Assistant interactif de demande de conférence
    ├── MapAfrica.astro    # Carte interactive Leaflet & panneau latéral des fiches pays
    ├── Media.astro        # Médiations, presse & mini-lecteur audio
    ├── ContactPage.astro  # Formulaire contact, vCard & modal QR Code
    ├── SearchModal.astro  # Recherche globale instantanée (Ctrl+K / ⌘K)
    ├── Gallery.astro      # Galerie photo terrain avec lightbox accessible
    ├── Testimonials.astro # Témoignages & recommandations de pairs
    ├── Newsletter.astro   # Bloc d'inscription newsletter
    └── Footer.astro       # Liens, réseaux sociaux, horloge de Cotonou & mentions
  layouts/
    └── Layout.astro     # Layout global (SEO, Open Graph, PWA, Dark Mode)
  lib/
    └── queries.ts       # Requêtes GROQ + mémoïsation cachedFetch
  pages/
    ├── index.astro        # Page d'accueil complète enrichie
    ├── contact.astro      # Page de contact dédiée
    ├── contact.vcf.ts     # Endpoint de téléchargement de la vCard 3.0
    ├── offline.astro      # Page de fallback hors-ligne PWA
    ├── speaking.astro     # Conférences, vidéothèque & speaker wizard
    ├── publications/
    │   ├── index.astro    # Page dédiée aux publications scientifiques
    │   └── publications.bib.ts # Export global de toutes les publications au format BibTeX
    ├── blog/
    │   ├── index.astro    # Listing des notes de terrain avec filtres par tag
    │   └── [slug].astro   # Article avec TOC (sommaire), temps de lecture & partage social
    ├── speaking.astro     # Conférences & colloques internationaux avec filtres
    ├── cv.astro           # Curriculum Vitæ imprimable A4 (Vue Complète & Executive Summary)
    ├── changelog.astro    # Journal de versions protégé par mot de passe
    └── rss.xml.ts         # Flux RSS/Atom du blog
  scripts/
    └── main.js          # Moteur client (i18n, dark mode, scrollspy, animations, horloge)
  styles/
    ├── global.css       # Design system (variables CSS, typographie, composants)
    ├── contact.css      # Styles dédiés à la page contact
    └── fonts-latin.css  # Subset latin optimisé des polices
astro.config.mjs         # Configuration Astro, intégration Sanity & Sitemap
vercel.json              # Configuration Vercel (CSP strict, Cache-Control immutable, Serverless functions)
```

---

## 🎨 Design & Expérience Utilisateur

- **Dark Mode / Mode Clair** : Bascule manuelle persistée dans `localStorage`, script anti-flash dans le `<head>`, synchronisation avec les tuiles CartoDB de la carte.
- **Multilingue (FR / EN)** : Dictionnaire de traduction d'interface réactif côté client sans rechargement de page.
- **Recherche Globale (Ctrl+K / ⌘K)** : Indexation instantanée des sections, publications, expertises et compétences.
- **Micro-animations** : Décode matriciel (`data-decode`), compteurs incrémentaux animés, effet Ken Burns, reveal au scroll (`IntersectionObserver`).
- **Horloge temps réel** : Fuseau horaire officiel de Cotonou (`Africa/Porto-Novo`, GMT+1).

---

## 📄 Pages du Site

| Route | Description & Fonctionnalités Clés |
| :--- | :--- |
| `/` | **Accueil** : Hero, Profil, Expertises, Timeline, Projets, Diplômes, Publications, Distinctions, Service, Conférences, Médias (Lecteur audio), Carte interactive (Fiches pays), Galerie, Témoignages. |
| `/contact` | Formulaire sécurisé, FAQ dynamique, téléchargement de **vCard (`.vcf`)** et **modal QR Code** pour smartphones. |
| `/contact.vcf` | Téléchargement direct de la carte de visite numérique compatible iOS, Android et Outlook. |
| `/publications` | Catalogue scientifique complet avec recherche textuelle, filtres Année/Type, **export global BibTeX (`.bib`) et RIS (`.ris`)**, et **modal de citation multi-formats (APA, Vancouver, BibTeX)**. |
| `/publications/publications.bib` | Fichier BibTeX téléchargeable contenant l'ensemble des publications indexées. |
| `/blog` | Journal de terrain et réflexions scientifiques avec filtrage par tags. |
| `/blog/[slug]` | Notes de terrain avec **calcul automatique du temps de lecture**, **sommaire interactif (*TOC*)**, partage sur LinkedIn, X, WhatsApp et e-mail. |
| `/speaking` | Liste des conférences, posters et présentations avec filtres par année et par type d'intervention. |
| `/cv` | Curriculum Vitæ imprimable format A4 avec bascule **Vue Complète** / **Executive Summary (1-Page)** et bouton d'impression PDF direct. |
| `/changelog` | Journal des versions détaillé avec protection par mot de passe. |
| `/rss.xml` | Flux de syndication RSS/Atom pour les lecteurs d'actualités. |

---

## 🚀 Performance & Optimisations

- **Polices auto-hébergées** : Sous-ensemble latin uniquement (−193 Ko), `font-display: swap`, préchargement Fraunces.
- **Hero Image** : `<link rel="preload">` AVIF/WebP adaptatif avec `fetchpriority="high"`.
- **Leaflet & styles à la demande** : Chargement asynchrone différé au défilement (pas de blocage du premier rendu).
- **Images Sanity** : Conversion automatique WebP/AVIF via CDN (`.auto("format")`).
- **Cache CDN** : `Cache-Control: public, max-age=31536000, immutable` pour les assets `/_astro/*`.

---

## 🛠️ Commandes Utiles

| Commande | Action |
| :--- | :--- |
| `npm install` | Installe les dépendances du projet |
| `npm run dev` | Lance le serveur de développement local sur `localhost:4321` |
| `npm run build` | Compile le site statique dans le dossier `./dist/` |
| `npm run preview` | Prévisualise le build localement |
| `node update-publications.mjs` | Met à jour les publications dans Sanity |
| `node populate-sanity.mjs` | Peuple/synchronise l'ensemble des données dans Sanity |

---

## 🌐 Déploiement

- **Hébergement** : [Vercel](https://vercel.com)
- **Domaine officiel** : [https://idelphonseahogni.com](https://idelphonseahogni.com)
- **Sanity Studio** : [https://www.sanity.io/manage/project/tbpdhv8m](https://www.sanity.io/manage/project/tbpdhv8m)
