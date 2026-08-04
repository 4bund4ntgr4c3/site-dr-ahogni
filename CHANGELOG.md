# Changelog

Tout l'historique des modifications du site du Dr I. B. Ahogni.

---

## [3.0.0] - 2026-08-04

### Nouvelles fonctionnalités
- **Page CV imprimable A4** (`/cv`) avec bouton Imprimer / PDF
- **Blog / notes de terrain** : type de document Sanity `post`, listing `/blog`, routes dynamiques `/blog/[slug]`
- **Carte Leaflet interactive** des 9 pays d'intervention (composant `MapAfrica`)
- **Galerie terrain** avec lightbox accessible (clavier, ESC, prev/next), pilotée par Sanity
- **Témoignages & recommandations** (champ Sanity `testimonials`)
- **Bouton de prise de RDV Calendly/Cal.com** conditionnel (champ `calendlyUrl`)
- **Liens LinkedIn / ResearchGate / ORCID / Google Scholar** conditionnels (affichage seulement si remplis) + **DOI cliquables** sur l'accueil
- **Bascule FR/EN** du texte d'interface (dictionnaire + persistance localStorage) + balise `lang` dynamique
- **Mode impression A4** global (règle `@media print`)

### Améliorations CMS
- Ajout des champs `calendlyUrl` + `googleScholar` (settings), `gallery[]`, `testimonials[]` (contenu)
- Nouveau type de document `post` enregistré

### Accessibilité (RGAA / WCAG AA)
- Lien d'évitement « Aller au contenu principal »
- État de focus visible global (`:focus-visible`)
- Formulaire réseaux sociaux et lightbox navigables au clavier

---

## [2.0.0] - 2026-08-04

### Audit & assainissement
- Unification des données publications (source de vérité unique `publications-data.mjs`)
- Ajout du champ `type` aux publications dans le schéma `siteContent`
- Retrait des dépendances inutilisées : `react`, `react-dom`, `@astrojs/react`, `styled-components`, et de l'intégration `react()`
- Factorisation des requêtes Sanity : `cachedFetch` mémorisé dans `src/lib/queries.ts` (une requête par build au lieu d'une par composant)
- Self-hosting des polices via `@fontsource-variable/*` (fini le CDN jsdelivr)
- SEO : balises Open Graph / Twitter, favicon, canonical, `site` dans la config Astro
- Centralisation de l'e-mail de contact via `settings.contactEmail`
- Implémentation du scrollspy de navigation (classe `.act`)
- Nettoyage des mentions obsolètes (dark mode supprimé) et réécriture du README

---

## [1.0.0] - 2026-08-04

### Initialisation
- Initialisation du projet Astro 7.x + Sanity v3 + React
- Installation des dépendances : `@astrojs/react`, `@sanity/astro`, `@sanity/client`, `sanity`, `astro-portabletext`, `@sanity/image-url`, `react`, `react-dom`, `styled-components`
- Configuration Astro avec intégration Sanity (projectId: `tbpdhv8m`, dataset: `production`)
- Création des schémas Sanity : `siteSettings` (singleton) et `siteContent` (singleton) avec ~45 champs
- Extraction du CSS global dans `src/styles/global.css`
- Extraction du JS vanilla dans `src/scripts/main.js`

### Composants (17)
- `Header.astro` — Navigation fixe avec logo SVG mosquito, nav links, bouton CTA
- `Hero.astro` — Section accueil avec nom, tagline, photo, statistiques animées
- `Tape.astro` — Bandeau défilant amber avec mots-clés
- `About.astro` — Section profil avec texte, chips, facts, pull quote, photo terrain
- `Expertise.astro` — Grille 4x2 des 8 domaines d'intervention (fond sombre)
- `Break.astro` — Section pleine hauteur avec image Ken Burns et citation
- `Career.astro` — Timeline du parcours professionnel avec index sticky
- `Education.astro` — Diplômes et groupes de compétences (fond sombre)
- `Publications.astro` — Liste des publications sur la page d'accueil
- `Awards.astro` — Grille des distinctions et bourses
- `Service.astro` — Rôles consultatifs et affiliations (fond sombre)
- `Communications.astro` — Liste des présentations et conférences
- `ContactCTA.astro` — Appel à l'action contact en bas de page d'accueil
- `ContactPage.astro` — Page contact dédiée avec formulaire, infos, FAQ
- `Footer.astro` — Pied de page
- `SearchModal.astro` — Modal de recherche avec raccourci Ctrl+K
- `PublicationsPage.astro` — Page dédiée publications avec filtres et recherche

### Pages
- `/` — Page d'accueil avec toutes les sections
- `/contact` — Page contact dédiée
- `/publications` — Page dédiée aux publications

### Fonctionnalités
- Scrollspy dans la navigation header
- Animation decode effect sur le tagline hero
- Compteurs animés (Intersection Observer)
- Horloge temps réel Cotonou (GMT+1)
- Formulaire de contact → ouvre le client mail
- FAQ avec accordéons (details/summary)
- Animations reveal on scroll (Intersection Observer)
- Ken Burns effect sur l'image break
- Bouton retour en haut (apparaît après 400px de scroll)
- Modal de recherche (Ctrl+K) avec filtres par catégorie
- Responsive mobile/tablet/desktop

### Déploiement
- Repository GitHub : `idelphonseahogni/site-dr-ahogni-astro`
- Déploiement Netlify automatique depuis GitHub
- Domaine : https://idelphonseahogni.com/
- Sanity Studio : https://www.sanity.io/manage/project/tbpdhv8m

---

## [1.1.0] - 2026-08-04

### Page Publications dédiée
- Création de `PublicationsPage.astro` avec hero, filtres par année, recherche temps réel
- Route `/publications` ajoutée
- Navigation header mise à jour : lien vers `/publications` au lieu de `/#publications`
- 26 publications enrichies dans Sanity (token Editor)
- Script `update-publications.mjs` pour mettre à jour les publications

### Données Sanity
- Script `populate-sanity.mjs` pour peupler toutes les données
- Ajout de `dotenv/config` dans les scripts pour charger le token depuis `.env`
- Fichier `.env` avec `SANITY_API_TOKEN` pour les opérations d'écriture

---

## [1.2.0] - 2026-08-04

### Modal de recherche
- Composant `SearchModal.astro` avec overlay, barre de recherche, résultats par catégorie
- Raccourci clavier `Ctrl+K` / `⌘K` pour ouvrir/fermer
- Catégories : Sections (8), Publications (26), Compétences (30+), Expertises (8)
- Recherche en temps réel sur titres, auteurs, mots-clés
- Navigation clavier : `↑` `↓` naviguer, `↵` ouvrir, `esc` fermer
- Bouton trigger intégré dans la navbar header (design `.btn`)
- Position fixe en bas à droite supprimée au profit de la navbar

### Bouton retour en haut
- Composant ajouté dans `Layout.astro`
- Position fixe en bas à droite
- Apparaît après 400px de scroll
- Scroll smooth vers le haut
- Style cohérent avec le design du site

---

## [1.3.0] - 2026-08-04

### Corrections
- Bouton retour en haut déplacé à droite (même côté que recherche)
- Menu dupliqué supprimé de `SearchModal.astro`
- Section statistiques ajoutée dans le Hero (10+, 25+, 9, 50+, 250+)
- Photo hero copiée localement dans `public/Dr-Idelphone-AHOGNI.jpeg`
- Dépendance `@sanity/image-url` supprimée du Hero
- `white-space: nowrap` ajouté sur le bouton recherche pour garder icône et `⌘K` sur la même ligne

---

## Fichiers projet

```
site-dr-ahogni-astro/
├── public/
│   └── Dr-Idelphone-AHOGNI.jpeg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Tape.astro
│   │   ├── About.astro
│   │   ├── Expertise.astro
│   │   ├── Break.astro
│   │   ├── Career.astro
│   │   ├── Education.astro
│   │   ├── Publications.astro
│   │   ├── Awards.astro
│   │   ├── Service.astro
│   │   ├── Communications.astro
│   │   ├── ContactCTA.astro
│   │   ├── ContactPage.astro
│   │   ├── Footer.astro
│   │   ├── SearchModal.astro
│   │   └── PublicationsPage.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── contact.astro
│   │   └── publications.astro
│   ├── sanity/
│   │   └── schemas/
│   │       ├── siteSettings.ts
│   │       └── siteContent.ts
│   ├── lib/
│   │   └── queries.ts
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── sanity.config.ts
├── populate-sanity.mjs
├── update-publications.mjs
├── .env
├── netlify.toml
└── package.json
```
