# Changelog

Tout l'historique des modifications du site du Dr I. B. Ahogni.

---

## [3.4.0] - 2026-08-23

### Suite Pédagogique, Cartographique & Mode Présentation
- **Glossaire Bilingue d'Entomologie Médicale & Santé Publique (`MedicalGlossary.astro`)** :
  - Dictionnaire interactif FR / EN avec moteur de recherche en temps réel et filtres par domaine (TIE/EIR, KDT50, PBO, kdr, endophagie, cases expérimentales).
- **Cartographie des Stations de Recherche & Sites Sentinelles au Bénin (`BeninFieldStations.astro`)** :
  - Fiches interactives pour les stations de Covè, Akron / Porto-Novo, Parakou, Kandi et le siège du CREC Cotonou (écologie, vecteurs, profil de résistance, essais conduits).
- **Calculateur d'Échantillonnage & Dimensionnement d'Études (`SampleSizeCalculator.astro`)** :
  - Formule biométrique de Fleiss pour le calcul de la taille d'échantillon ($n$) selon la différence de mortalité attendue ($\Delta$), le seuil $\alpha$ et la puissance $1 - \beta$.
- **Espace Mentorat, Encadrement & Réseau Alumni (`MentorshipAlumni.astro`)** :
  - Répertoire des mémoires de Master et thèses de Doctorat (PhD) supervisés avec devenir et postes actuels des chercheurs formés.
- **Radar d'Expertise Scientifique & Nuage de Mots-Clés (`ResearchRadar.astro`)** :
  - Radar chart SVG polygonal illustrant les 6 piliers de compétences du Dr Ahogni avec nuage de tags cliquables.
- **Mode Diaporama & Présentation Plein Écran Web (`/pres`)** :
  - Vue diaporama interactive optimisée pour les conférences et webinaires (navigation clavier `Flèches`, `Espace`, `F` plein écran).

---

## [3.3.0] - 2026-08-23

### Outils Génétiques, Opérationnels, Timeline & Interopérabilité
- **Calculateur de Génétique des Populations & Équilibre de Hardy-Weinberg (`GeneticsCalculator.astro`)** :
  - Analyse des fréquences alléliques $p$ et $q$ pour les marqueurs *kdr* (L1014F/S) et *ace-1* (G119S).
  - Test du $\chi^2$ de conformité HWE en temps réel avec tableau des effectifs observés vs attendus et diagnostic de sélection sous MILDV.
- **Matrice Comparative des Moustiquaires Imprégnées LLIN (`LlinMatrix.astro`)** :
  - Tableau comparatif interactif : standards (pyréthroïdes), PBO synergistes, et bi-actives (Interceptor G2 / chlorfénapyr, Royal Guard / pyriproxyfène).
  - Filtres par type de technologie, modes d'action, rémanence, préqualification OMS et contexte épidémiologique au Bénin.
- **Chronologie des Projets & Financements de Recherche (`ProjectsTimeline.astro`)** :
  - Timeline dynamique avec filtres par bailleurs (Fonds Mondial, USAID/PMI, OMS/TDR, Wellcome Trust, PAMCA/BMGF).
  - Détail des rôles de coordination, budgets gérés, sites d'étude et livrables opérationnels.
- **Export International `JSON Resume` (`/cv.json`)** :
  - Endpoint normalisé selon le standard [JSON Resume v1.0.0](https://jsonresume.org) avec bouton de téléchargement direct depuis la barre d'outils du CV.
- **Module de Veille Épidémiologique & Bulletins Saisonniers (`MalariaWatch.astro`)** :
  - Alertes sanitaires sur la transmission saisonnière au Bénin, la surveillance d'*Anopheles stephensi* et les nouvelles directives OMS.
- **Mur d'Endossements & Recommandations de Pairs Enrichi (`Testimonials.astro`)** :
  - Filtres par statut de collaborateur (Académiques, Programmes Nationaux, Agences Internationales) et bouton d'action pour déposer un témoignage.

---

## [3.2.0] - 2026-08-23

### Suite Avancée Scientifique, Pédagogique & Multimédia
- **Hub d'Impact Scientifique & Réseau de Collaboration (`ScientificImpact.astro`)** :
  - Métriques d'impact dynamiques : 500+ citations, h-index 12, i10-index 15, 100% Open Access, 25+ articles revues internationales.
  - Graphe interactif Canvas/SVG du réseau de collaboration scientifique interconnectant les institutions nationales (CREC, UAC), régionales (PAMCA, IRSS) et mondiales (LSHTM, OMS/WHO, CDC, LSTM).
- **Explorateur d'Entomologie Médicale & Simulateur de Bio-essais OMS (`VectorExplorer.astro`)** :
  - Fiches d'identification des vecteurs clés (*Anopheles gambiae s.s.*, *An. coluzzii*, *An. funestus*, *An. stephensi*).
  - Simulateur interactif de bio-essais en tubes OMS avec calcul de mortalité à 24h, correction automatique d'Abbott et interprétation selon les seuils OMS (Sensible ≥98%, Suspectée 90-97%, Résistance confirmée <90%).
- **Vidéothèque de Conférences & Interventions Médias (`VideoGallery.astro`)** :
  - Lecteur vidéo modale fluide avec chapitrage, étiquettes de durée et de catégorie (Symposiums PAMCA, consultations OMS, émissions ORTB).
- **Assistant « Demande de Conférence » (Speaker Request Wizard, `SpeakerWizard.astro`)** :
  - Formulaire interactif guidé en 4 étapes (Format, Thématiques de recherche, Logistique & audience, Validation) avec génération instantanée du message pour les organisateurs de colloques.
- **Centre de Ressources Pédagogiques & Protocoles (`AcademicResources.astro`) & Liseuse PDF (`PdfViewerModal.astro`)** :
  - Espace de téléchargement des SOPs OMS, guides d'échantillonnage larvaire et diapositives de cours avec filtres par catégorie.
  - Modale de visualisation PDF plein écran intégrée au site pour lire instantanément les protocoles et publications Open Access.
- **PWA & Support Hors-Ligne Terrain (`manifest.webmanifest`, `sw.js`, `offline.astro`)** :
  - Configuration Progressive Web App installable sur smartphone et tablette.
  - Service Worker intelligent mettant en cache les publications, le CV et les contacts pour un accès complet hors-ligne en mission de terrain.

---

## [3.1.0] - 2026-08-12

### Nouvelles fonctionnalités & Outils Scientifiques
- **Export global des publications (BibTeX & RIS)** :
  - Route dédiée `/publications/publications.bib` pour télécharger l'ensemble de la bibliographie.
  - Bouton d'export `.ris` généré côté client pour intégration instantanée dans Zotero, Mendeley et EndNote.
- **Modal de citation multi-formats** :
  - Bouton « Citer / Citation ▾ » sur chaque publication.
  - Onglets interactifs avec formatage automatique : **APA 7th**, **Vancouver**, **BibTeX**.
  - Copie instantanée dans le presse-papier avec confirmation visuelle et fermeture clavier (`Échap`).
- **Interconnexion Carte Leaflet ↔ Fiches Pays & Projets** :
  - Panneau latéral dynamique affichant les détails d'intervention au clic sur les 9 pays d'Afrique (rôles, thématiques, programmes associés, nombre de publications).
  - Animation de vol de caméra (*flyTo*) et synchronisation complète de la légende.
- **Fiche de contact numérique vCard (`.vcf`) & Modal QR Code** :
  - Route `/contact.vcf` permettant d'enregistrer directement les coordonnées du Dr Ahogni dans le carnet d'adresses smartphone/Outlook.
  - Modal QR Code sur `/contact` pour scan direct lors de conférences.
- **Améliorations Blog & Notes de terrain** :
  - **Calcul automatique du temps de lecture** (ex. `⏱️ 3 min de lecture`).
  - **Sommaire interactif automatique (*Table of Contents*)** généré à partir des titres `h2` et `h3` avec défilement fluide.
- **Mini-lecteur audio pour la section Médiations** :
  - Lecteur audio stylisé pour écouter les interviews radiophoniques et podcasts scientifiques directement sur la page d'accueil.
- **Mode Executive Summary (1-Page) sur le CV** :
  - Bascule dans la barre d'outils entre la vue complète et une vue synthétique 1-page pour les recruteurs et comités.
  - Bouton de téléchargement vCard intégré dans la barre d'outils.

### Correctifs & Sécurité
- Sécurisation du flux `/rss.xml` avec gestion de repli en cas de données vides.
- Harmonisation typographique des titres d'en-tête du CV (support `h1`/`h2` en modes clair et sombre).
- Robustesse des filtres par année et par type dans les pages `/publications` et `/speaking`.

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

---

## [1.1.0] - 2026-08-04

### Page Publications dédiée
- Création de `PublicationsPage.astro` avec hero, filtres par année, recherche temps réel
- Route `/publications` ajoutée
- Navigation header mise à jour : lien vers `/publications` au lieu de `/#publications`
- 26 publications enrichies dans Sanity (token Editor)
- Script `update-publications.mjs` pour mettre à jour les publications

---

## [1.2.0] - 2026-08-04

### Modal de recherche
- Composant `SearchModal.astro` avec overlay, barre de recherche, résultats par catégorie
- Raccourci clavier `Ctrl+K` / `⌘K` pour ouvrir/fermer
- Catégories : Sections (8), Publications (26), Compétences (30+), Expertises (8)
- Recherche en temps réel sur titres, auteurs, mots-clés
- Navigation clavier : `↑` `↓` naviguer, `↵` ouvrir, `esc` fermer

---

## [1.3.0] - 2026-08-04

### Corrections
- Bouton retour en haut déplacé à droite
- Section statistiques ajoutée dans le Hero (10+, 25+, 9, 50+, 250+)
- Photo hero copiée localement dans `public/Dr-Idelphone-AHOGNI.jpeg`
- Dépendance `@sanity/image-url` supprimée du Hero
