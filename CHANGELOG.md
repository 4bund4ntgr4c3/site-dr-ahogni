# Changelog

Tout l'historique chronologique et structuré des versions du site du Dr Idelphonse B. Ahogni.

---

## [4.2.0] - 2026-09-02

### Optimisation SEO Sémantique, Entité Google Knowledge Graph & Variantes Nominales
- **Enrichissement Exhaustif des Variantes d'Identité (`Layout.astro`)** :
  - Déploiement de plus de 50 variantes nominales, phonétiques, et académiques dans les schémas JSON-LD Schema.org (`@type: "Person"` et `@type: "WebSite"`).
  - Couverture des formats de citation PubMed / Google Scholar (*Ahogni I. B.*, *Ahogni, Idelphonse*, *IB Ahogni*), des déclinaisons honorifiques (*Dr Idelphonse Bonaventure AHOGNI*, *Docteur Ahogni*, *Dr. Ahogni*), et des tolérances phonétiques (*Idelfonse*, *Idelfonce*, *Ahogny*, *Aogni*).
- **Indexation Sémantique des Domaines d'Expertise ("Fields")** :
  - Intégration de la classification internationale des professions ISCO-08 (`hasOccupation`: 2131 - Biologistes, Zoologistes & Professionnels des Sciences de la Vie).
  - Déclaration bilingue (FR / EN) exhaustive de plus de 45 domaines de recherche et compétences pointues (`knowsAbout`) : MILDV bi-actives (Interceptor G2, Royal Guard), résistance aux insecticides, marqueurs *kdr/ace-1*, cytochromes métaboliques P450, conformité BPL (OECD GLP), protocoles OMS, modélisation d'Abbott et Fleiss, espèces anophéliennes (*Anopheles gambiae*, *funestus*, *stephensi*) et appui stratégique aux programmes nationaux (PNLP / Fonds Mondial).
- **Consolidation E-E-A-T & Knowledge Panel** :
  - Alignement des identifiants et entités sémantiques pour favoriser le déclenchement du panneau de connaissances Google Knowledge Graph et la première position sur les recherches de nom.

---

## [4.1.0] - 2026-09-02

### Déploiement Vercel, Sécurité CSP, PWA v6 & Nettoyage du Codebase
- **Déploiement Vercel & Headers de Sécurité Stricts (`vercel.json`)** :
  - Configuration de production avec headers HTTP sécurisés : `Content-Security-Policy` sans dépendances CDN externes, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
  - Configuration des Serverless Functions (`api/contact.ts` et `api/newsletter.ts`) avec plafond `maxDuration: 10` (compatible forfait Vercel Hobby).
- **Conformité Web & Résolution des Dépendances Externes** :
  - Importation locale de la feuille de style Leaflet (`import "leaflet/dist/leaflet.css"` dans `MapAfrica.astro`), éliminant l'injection dynamique depuis un CDN externe et garantissant la compatibilité hors-ligne intégrale.
  - Préchargement des polices via import dynamique ESM Vite (`@fontsource-variable/archivo` et `@fontsource-variable/fraunces`) dans `Layout.astro` sans hachage statique.
  - Encapsulation des blocs JSON-LD Schema.org dans le composant `<Layout>` pour une conformité HTML5 stricte.
- **PWA & Cache Hors-ligne v6 (`public/sw.js`)** :
  - Mise à niveau du cache en version `dr-ahogni-v6` avec pré-mise en cache des 36 pages statiques (incluant les 7 parcours thématiques profonds).
- **Expérience Utilisateur & Formulaires** :
  - Sélection des 5 publications phares sur la page d'accueil (`Publications.astro`) avec lien vers le catalogue complet de 26+ articles.
  - Extension de la capacité du formulaire de contact à 3 000 caractères avec compteur en direct et validation multilingue.
  - Mise à jour des endpoints JSON Resume (`/cv.json` et `/en/cv.json`) connectés aux données réelles de Sanity.
- **Audit & Nettoyage du Code Mort** :
  - Suppression des requêtes et fonctions orphelines dans `queries.ts`, suppression de l'import orphelin `dict` dans `main.js` et nettoyage des scripts de test redondants.
  - Validation à 100% de la suite de tests unitaires purs (`node:test`) pour les algorithmes Abbott, Hardy-Weinberg et Fleiss.

---

## [4.0.0] - 2026-08-24

### Architecture Multilingue Dédiée : Routes `/en/*`, SEO International & PWA v4
- **Routage Bilingue Natif (/ et /en/*)** :
  - Intégration de la configuration i18n d'Astro avec génération statique de l'ensemble des 18 pages en anglais sous le préfixe `/en/*`.
- **SEO International Bidirectionnel** :
  - Rendu serveur de `<html lang="en">` ou `"fr"`, balises `rel="alternate" hreflang="fr"`, `hreflang="en"`, et `hreflang="x-default"` dynamiques.
- **Bascule d'URL Intelligente & Recherche Contextuelle** :
  - Clic sur le sélecteur FR/EN redirigeant automatiquement vers l'URL correspondante et recherche globale `SearchModal` adaptée au préfixe linguistique.
- **Flux RSS Dédié & JSON Resume Bilingue** :
  - Génération de `/en/rss.xml` pour les abonnés anglophones et de `/en/cv.json` au format standard JSON Resume.

---

## [3.9.0] - 2026-08-24

### Refonte de l'Assistant : Moteur Sémantique & Base de Connaissances Scientifique Certifiée
- **Moteur de Recherche Sémantique Client (0 ms)** :
  - Normalisation insensible aux accents, suppression des stop-words bilingues, scoring pondéré et tolérance aux correspondances partielles.
- **Corpus Scientifique Exhaustif** :
  - Indexation complète des travaux du Dr Ahogni : Interceptor G2 & Royal Guard, synergisme PBO, formule d'Abbott, dimensionnement de Fleiss, mutations *kdr* / *ace-1*, réseau sentinelle du Bénin et critères d'audit BPL.

---

## [3.8.0] - 2026-08-24

### Internationalisation Bilingue Intégrale (FR/EN) & Modularisation TypeScript
- **Modularisation du Code Client (`src/scripts/modules/`)** :
  - Découpage de `main.js` avec création de `modules/i18n.ts` et `modules/calculators.ts`.
  - Externalisation du dictionnaire de traduction dans `src/i18n/fr.json` et `src/i18n/en.json` (536 clés).
  - Création de `src/styles/tokens.css` pour la gestion centralisée du thème et des variables CSS.
- **Suite de Tests Unitaires Pures** :
  - Mise en place de `tests/unit.test.js` via le runner natif Node.js (`node:test`).

---

### Assistant IA Flottant & Accessibilité Contraste Absolu (WCAG AAA)
- **Bouton Flottant & Widget Déroulant de l'Assistant IA (`AiAssistant.astro`)** :
  - Transformation de la section statique en un bouton d'action flottant interactif positionné au-dessus du bouton *Back-to-Top*.
  - Panneau déroulant (*flyout drawer*) réactif avec historique de conversation, suggestions rapides et recherche en temps réel dans la base de connaissances scientifiques du Dr Ahogni.
  - Intégration globale dans `Layout.astro` accessible depuis l'ensemble des 18 pages du site.
- **Correction des Contrastes & Boutons Blanc-sur-Blanc en Mode Sombre** :
  - Résolution des boutons avec fond blanc et texte blanc en Dark Mode (`AcademicResources`, `AiAssistant`, `cv.astro`, `Calendly`, `Header`, `Layout`, `Media`, `ContactPage`).
  - Harmonisation complète de tous les boutons interactifs et filtres actifs avec fond ambre vif (`#F59E0B`) et texte noir (`#0B0F17`, font-weight: 700).

---

## [3.6.0] - 2026-08-23

### 7 Pages Dédiées Approfondies, Accessibilité Dark Mode (WCAG AAA), Stabilisation SVG & Traduction Bilingue
- **7 Nouvelles Pages Dédiées d'Approfondissement** :
  - **`/expertises`** : Page dédiée aux 8 piliers de compétences, radar de recherche à 6 axes (`ResearchRadar`), anatomie vectorielle (`AnophelesAnatomy`) et impact mondial (`ScientificImpact`).
  - **`/entomologie`** : Plateforme interactive regroupant l'explorateur vectoriel (`VectorExplorer`), le calculateur génétique *kdr/ace-1* & HWE (`GeneticsCalculator`), le calculateur biométrique d'échantillonnage de Fleiss (`SampleSizeCalculator`), la matrice comparative MILDV (`LlinMatrix`) et le simulateur médico-économique coût-efficacité (`CostEffectiveness`).
  - **`/stations-terrain`** : Fiches détaillées des 5 stations sentinelles du Bénin (`BeninFieldStations`), tableau de bord météo-entomologique (`ClimateDashboard`), checklist d'audit 10-points BPL/GLP (`GlpAuditChecklist`) et galerie photos de terrain (`Gallery`).
  - **`/projets`** : Programmes financés (`Projects`), chronologie interactive des subventions (`ProjectsTimeline`) et carte panafricaine des 9 pays d'intervention (`MapAfrica`).
  - **`/parcours`** : Rétrospective de carrière (`Career`), diplômes académiques (`Education`), réseau de mentorat et thèses encadrées (`MentorshipAlumni`), service professionnel (`Service`) et distinctions internationales (`Awards`).
  - **`/medias`** : Couverture médiatique et interviews (`Media`), vidéothèque YouTube (`VideoGallery`), mini-capsules audio avec transcriptions (`AudioCapsules`) et bulletins de veille épidémiologique (`MalariaWatch`).
  - **`/ressources`** : Centre de téléchargement des protocoles et SOPs OMS (`AcademicResources`), dictionnaire bilingue d'entomologie (`MedicalGlossary`), assistant IA virtuel « Dr Ahogni AI » (`AiAssistant`), recommandations de pairs (`Testimonials`) et assistant conférencier (`SpeakerWizard`).
- **Support Bilingue FR / EN Intégral** :
  - Ajout des entrées de dictionnaire complètes dans `main.js` pour tous les fils d'Ariane, statistiques clés, sous-titres et métadonnées des 7 pages.
- **Amélioration du Contraste et Accessibilité en Mode Sombre (WCAG AAA)** :
  - Rehaussement des variables `--ink` (`#FFFFFF`) et `--ink2` (`#E2E8F0`).
  - Harmonisation de tous les boutons actifs (`.active`) avec fond ambre vif (`#F59E0B`) et texte noir obsidienne (`#0B0F17`, font-weight: 700).
  - Remplacement de tous les sélecteurs obsolètes `.dark` par `html[data-theme="dark"]`.
- **Stabilisation du Graphe de Réseau SVG (`ScientificImpact.astro`)** :
  - Élimination des micro-vibrations au survol des nœuds institutionnels par suppression du scale géométrique et ajout d'un halo lumineux doré et contour persistant.
- **Pied de Page & Recherche Globale (`⌘K`)** :
  - Mention de copyright scindée sur 2 lignes distinctes (`© 2026 Dr Idelphonse B. AHOGNI` / `TOUS DROITS RÉSERVÉS.`).
  - Menu déroulant *« Explorer »* dans l'en-tête et indexation des 18 pages dans le SearchModal.

---

## [3.5.0] - 2026-08-23

### Suite d'IA Virtuelle, Éco-Épidémiologie & Économie de la Santé
- **Assistant Scientifique Virtuel « Dr Ahogni AI » (`AiAssistant.astro`)** :
  - Chatbot interactif in-browser avec base de connaissances vectorielles, suggestions rapides et réponses sourcées vers les publications et simulateurs du site.
- **Tableau de Bord Météo-Entomologique au Bénin (`ClimateDashboard.astro`)** :
  - Suivi des paramètres thermo-hygrométriques et calcul en temps réel de l'Indice d'Émergence Larvaire pour Cotonou, Bohicon/Covè, Parakou et Kandi.
- **Explorateur Anatomique & Microscopique d'Anopheles gambiae (`AnophelesAnatomy.astro`)** :
  - Cartographie interactive des organes (glandes salivaires, proboscis, estomac, ovaires, canal sodium Vgsc, corps gras) et impact sur la transmission.
- **Simulateur Médico-Économique de Coût-Efficacité (`CostEffectiveness.astro`)** :
  - Modélisation du coût annuel et du coût par cas de paludisme évité pour les MILDV standards, PBO, bi-actives (Interceptor G2) et la PID.
- **Checklist d'Auto-Évaluation BPL / GLP Insectarium OMS (`GlpAuditChecklist.astro`)** :
  - Grille d'audit en 10 critères normalisés OMS/OECD avec calcul du score de conformité et recommandations opérationnelles.
- **Mini-Capsules Audio Pédagogiques (« 3 Minutes d'Entomologie ») (`AudioCapsules.astro`)** :
  - Player audio avec micro-cours sur le chlorfénapyr, la méthode HLC et l'invasion urbaine d'Anopheles stephensi avec transcriptions intégrales.

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

### Outils Bibliographiques, Carte Dynamique, vCard & Blog TOC
- **Export global des publications (BibTeX & RIS)** :
  - Route dédiée `/publications/publications.bib` pour télécharger l'ensemble de la bibliographie.
  - Bouton d'export `.ris` généré côté client pour intégration instantanée dans Zotero, Mendeley et EndNote.
- **Modal de citation multi-formats** :
  - Bouton « Citer / Citation ▾ » sur chaque publication (APA 7th, Vancouver, BibTeX) avec copie instantanée.
- **Interconnexion Carte Leaflet ↔ Fiches Pays & Projets** :
  - Panneau latéral dynamique affichant les détails d'intervention au clic sur les 9 pays d'Afrique (rôles, thématiques, programmes associés, nombre de publications) avec animation *flyTo*.
- **Fiche de contact numérique vCard (`.vcf`) & Modal QR Code** :
  - Route `/contact.vcf` et modal QR code pour numérisation et enregistrement direct sur smartphone.
- **Améliorations Blog & Notes de terrain** :
  - Calcul automatique du temps de lecture et sommaire interactif automatique (*Table of Contents*) avec défilement fluide.
- **Mode Executive Summary (1-Page) sur le CV** :
  - Bascule entre vue complète et vue synthétique 1-page pour les recruteurs et comités.

---

## [3.0.0] - 2026-08-07

### Performance, Optimisations & Flux RSS
- **Performance & Polices Auto-Hébergées** :
  - Polices Fraunces, Archivo et JetBrains Mono intégrées en local via `@fontsource-variable/*` (subset latin, zéro CDN externe).
  - Préchargement de l'image Hero avec `fetchpriority="high"`.
  - Lazy-loading dynamique de Leaflet CSS au scroll et minification de `leaflet.js`.
- **Flux RSS / Atom (`/rss.xml`)** :
  - Syndication automatique pour le blog avec découverte dans les métadonnées `<head>`.
- **Enrichissement du Schéma Sanity** :
  - Modèles `media[]` et `projects[]` pour administrer les interventions presse et subventions.

---

## [2.1.0] - 2026-08-05

### Thème Sombre, Navigation Mobile Burger, Dark Map & Sécurité
- **Thème Sombre & Design System** :
  - Thème sombre sans flash piloté par variables CSS tokens (`--surface`, `--paper`, `--ink`, `--amber`).
  - Menu burger responsive (`#navToggle` / `#navPanel`) pour mobiles et tablettes avec fermeture tactile.
- **Carte Leaflet en Thème Sombre** :
  - Bascule automatique des tuiles CARTO Dark Matter lors du changement de thème.
- **Sécurité & SEO** :
  - En-têtes HTTP sécurisés (CSP, HSTS, `nosniff`, `Referrer-Policy`), page `404` dédiée et balises Open Graph / Twitter Cards.

---

## [2.0.0] - 2026-08-04

### Audit Architectural & Assainissement du Codebase
- **Unification des Données** :
  - Source de vérité unique pour les 26 publications scientifiques avec type normalisé.
  - Factorisation des requêtes Sanity avec cache mémoïsé (`cachedFetch`).
- **Allègement des Dépendances** :
  - Suppression des dépendances superflues (`styled-components`, wrappers React non nécessaires) pour une exécution ultra-rapide en Astro Vanilla/Islands.
- **Navigation & Scrollspy** :
  - Détection automatique de la section active dans le menu (`.act`).

---

## [1.0.0] - 2026-08-04

### Initialisation & Architecture Fondatrice
- **Initialisation du Projet** :
  - Socle Astro 7.x + Sanity CMS v3 (`siteSettings`, `siteContent`).
  - 17 composants fondamentaux (Header, Hero, Tape, About, Expertise, Career, Education, Publications, Awards, Service, Communications, ContactCTA, ContactPage, Footer, SearchModal).
- **Fonctionnalités Clés** :
  - Modal de recherche rapide (`Ctrl+K` / `⌘K`) indexant publications, compétences et sections.
  - Page dédiée `/publications` avec filtres par année et recherche temps réel.
  - Déploiement CI/CD et domaine officiel `idelphonseahogni.com`.
