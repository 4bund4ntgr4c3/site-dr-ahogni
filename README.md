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

## 📄 Pages & Architecture Bilingue (36 Routes Statiques)

Toutes les pages sont générées statiquement à la fois en français (`/`) et en anglais sous le préfixe (`/en/*`) avec balises `hreflang` bidirectionnelles :

| Route (FR / EN) | Description & Fonctionnalités Clés |
| :--- | :--- |
| `/` · `/en` | **Accueil** : Hero, Profil, 8 Expertises, 5 Publications phares, Timeline, Projets, Diplômes, Conférences, Médias, Carte interactive, Galerie, Témoignages. |
| `/expertises` · `/en/expertises` | **Expertises & Recherche** : 8 piliers, radar interactif à 6 axes (`ResearchRadar`), anatomie vectorielle (`AnophelesAnatomy`) et impact mondial (`ScientificImpact`). |
| `/entomologie` · `/en/entomologie` | **Hub Entomologique & Calculatrices** : Explorateur vectoriel Abbott (`VectorExplorer`), calculateur HWE *kdr/ace-1* (`GeneticsCalculator`), échantillonnage de Fleiss (`SampleSizeCalculator`), matrice MILDV (`LlinMatrix`), coût-efficacité (`CostEffectiveness`). |
| `/stations-terrain` · `/en/stations-terrain` | **Stations Sentinelles au Bénin** : Fiches Covè, Akron, Parakou, Kandi (`BeninFieldStations`), tableau de bord météo & risque vectoriel (`ClimateDashboard`), checklist audit BPL/GLP (`GlpAuditChecklist`), galerie photo (`Gallery`). |
| `/projets` · `/en/projets` | **Programmes & Financements** : Fiches projets bailleurs (`Projects`), frise chronologique des subventions (`ProjectsTimeline`), carte Leaflet panafricaine (`MapAfrica`). |
| `/parcours` · `/en/parcours` | **Carrière & Distinctions** : Rétrospective (`Career`), diplômes académiques (`Education`), mentorat & alumni (`MentorshipAlumni`), service professionnel (`Service`), distinctions (`Awards`). |
| `/medias` · `/en/medias` | **Médias & Veille** : Articles presse (`Media`), vidéothèque de conférences (`VideoGallery`), mini-capsules audio avec transcriptions (`AudioCapsules`), bulletins sanitaires (`MalariaWatch`). |
| `/ressources` · `/en/ressources` | **Centre Académique & Outils** : Téléchargement des SOPs OMS (`AcademicResources`), glossaire bilingue (`MedicalGlossary`), recommandations de pairs (`Testimonials`), assistant conférencier (`SpeakerWizard`). |
| `/publications` · `/en/publications` | **Catalogue Scientifique Complet** : 26+ publications indexées, filtres avancés, **export global BibTeX (`.bib`) et RIS (`.ris`)**, modal de citation multi-formats (APA, Vancouver, BibTeX). |
| `/blog` · `/en/blog` | **Notes de Terrain & Blog** : Journal de recherche et réflexions avec filtres par tag et formulaire newsletter. |
| `/blog/[slug]` · `/en/blog/[slug]` | **Article Détaillé** : Calcul automatique du temps de lecture, sommaire interactif (*TOC*), partage LinkedIn / X / WhatsApp / e-mail. |
| `/speaking` · `/en/speaking` | **Conférences & Colloques** : Liste des interventions internationales avec filtres par année et type. |
| `/cv` · `/en/cv` | **Curriculum Vitæ Format A4** : Impression haute fidélité avec bascule **Vue Complète** / **Executive Summary**. |
| `/contact` · `/en/contact` | **Contact & vCard** : Formulaire sécurisé (3 000 car.), FAQ interactive, téléchargement vCard (`.vcf`) et modal QR Code smartphone. |
| `/pres` · `/en/pres` | **Mode Diaporama** : Présentation interactive plein écran pilotable au clavier pour les conférences. |
| `/changelog` · `/en/changelog` | **Journal de Versions** : Historique complet des versions et déploiements protégé par mot de passe. |
| `/offline` · `/en/offline` | **PWA Hors-ligne** : Page de secours autonome du Service Worker v6 avec conseils d'utilisation hors connexion. |
| `/cv.json` · `/en/cv.json` | **API JSON Resume** : Données CV normalisées selon le standard JSON Resume v1.0.0. |
| `/rss.xml` · `/en/rss.xml` | **Flux RSS/Atom** : Syndication du blog pour les flux d'actualités. |

---

## 🚀 Performance & Sécurité

- **Sécurité CSP Stricte** : `Content-Security-Policy` sans dépendances CDN externes, immunisé contre les injections de script et conforme aux standards modernes.
- **SEO Sémantique & Google Knowledge Graph** : Données structurées JSON-LD complètes (`@type: "Person"`, `@type: "WebSite"`, `@type: "BreadcrumbList"`), couverture de 50+ variantes nominales (PubMed, Scholar, translitérations) et 45+ domaines d'expertise bilingues indexés (`knowsAbout`, classification `hasOccupation: ISCO-08`).
- **Leaflet & Polices 100% Locaux** : Feuilles de style et polices (`@fontsource-variable/fraunces`, `@fontsource-variable/archivo`) bundlées localement par Vite.
- **Service Worker PWA v6** : Cache hors-ligne `dr-ahogni-v6` préchargeant l'intégralité des 36 pages pour une consultation fluide même sans connexion internet.
- **Images Sanity Optimisées** : Conversion automatique WebP/AVIF via CDN et lazy-loading natif.
- **Cache CDN Vercel** : `Cache-Control: public, max-age=31536000, immutable` pour tous les assets compilés `/_astro/*`.

---

## 🛠️ Commandes Utiles

| Commande | Action |
| :--- | :--- |
| `npm install` | Installe les dépendances du projet |
| `npm run dev` | Lance le serveur de développement local sur `localhost:4321` |
| `node --test tests/unit.test.js` | Exécute la suite de tests unitaires mathématiques (Abbott, HWE, Fleiss) |
| `npm run build` | Compile les 36 pages statiques dans le dossier `./dist/` |
| `npm run preview` | Prévisualise le build statique localement |
| `node scripts/populate-en.mjs` | Peuple les 22 champs anglophones dans Sanity Studio |
| `node populate-sanity.mjs` | Synchronise l'ensemble des données francophones dans Sanity |

---

## 🌐 Déploiement

- **Hébergement** : [Vercel](https://vercel.com) (Framework Preset : **Astro**, Output Directory : `dist`)
- **Domaine officiel** : [https://idelphonseahogni.com](https://idelphonseahogni.com)
- **Sanity Studio** : [https://www.sanity.io/manage/project/tbpdhv8m](https://www.sanity.io/manage/project/tbpdhv8m)

