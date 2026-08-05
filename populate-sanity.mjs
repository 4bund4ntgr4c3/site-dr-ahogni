import { createClient } from "@sanity/client";
import "dotenv/config";
import { publications } from "./publications-data.mjs";

const client = createClient({
  projectId: "tbpdhv8m",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const settings = {
  _type: "siteSettings",
  _id: "siteSettings",
  siteTitle: "Dr I. B. Ahogni, PhD — Gestionnaire de Programme Paludisme · Entomologiste Médical",
  siteDescription: "Site professionnel du Dr Idelphonse Bonaventure Ahogni — Gestionnaire de programme paludisme, entomologiste médical et chercheur en santé publique, Cotonou, Bénin.",
  heroEyebrow: "DOSSIER PROFESSIONNEL — COTONOU · 6°22′N 2°23′E",
  heroName: {
    firstName: "Dr Idelphonse",
    middleName: "Bonaventure",
    lastName: "Ahogni",
    suffix: "PhD",
  },
  heroTagline: "GESTIONNAIRE DE PROGRAMME PALUDISME ✦ ENTOMOLOGISTE MÉDICAL ✦ CHERCHEUR EN SANTÉ PUBLIQUE",
  heroLede: "Plus de dix ans d'expérience nationale et internationale à diriger des programmes de lutte antivectorielle multicentriques, à renforcer les systèmes de surveillance du paludisme et à ancrer des solutions fondées sur les preuves au sein des Ministères de la Santé à travers l'Afrique.",
  heroFigCaption: {
    left: "Spécimen Nº 001 — Entomologiste médical",
    right: "Cotonou, Bénin",
  },
  aboutFigCaption: {
    left: "Mission de terrain — collecte entomologique",
    right: "Bénin · GMT+1",
  },
  breakLabel: "Carnet de terrain — Anopheles gambiae s.l.",
  breakQuote: "Chaque moustique compté est une décision de santé publique mieux informée.",
  officeFigCaption: {
    left: "Poste de commandement — Cotonou",
    right: "Carte des sites d'étude",
  },
  contactEmail: "contact@idelphonseahogni.com",
  contactPhone: "+229 01 96 68 21 98",
  contactPhoneLink: "tel:+2290196682198",
  linkedin: "#",
  researchGate: "#",
  footerText: "© 2026 Dr I. B. Ahogni, PhD — Entomologiste médical & gestionnaire de programme paludisme",
  tapeText: "Surveillance entomologique ✦ MILDA · PID · ATSB ✦ Résistance aux insecticides ✦ DHIS2 & données géolocalisées ✦ Essais randomisés de phase III ✦ Plans stratégiques nationaux ✦ OMS · PMI/USAID · Fonds mondial ✦",
};

const content = {
  _type: "siteContent",
  _id: "siteContent",
  stats: [
    { number: 10, suffix: "+", label: "Années d'expérience" },
    { number: 25, suffix: "+", label: "Publications évaluées par les pairs" },
    { number: 9, suffix: "", label: "Pays couverts en Afrique" },
    { number: 50, suffix: "+", label: "Agents encadrés par projet" },
    { number: 250, suffix: "+", label: "Relais communautaires formés" },
  ],
  aboutText: [
    {
      _type: "block",
      _key: "about1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Scientifique du paludisme (PhD) et gestionnaire de programme, je cumule plus de ",
        },
        { _type: "span", _key: "s2", text: "10 ans d'expérience", marks: ["strong"] },
        {
          _type: "span",
          _key: "s3",
          text: " dans la direction de programmes de lutte antivectorielle multi-pays, la gestion de projets financés par ",
        },
        { _type: "span", _key: "s4", text: "USAID/PMI, le Fonds mondial, la Fondation Gates et UNITAID", marks: ["strong"] },
        {
          _type: "span",
          _key: "s5",
          text: ", et l'intégration de solutions fondées sur les preuves au sein des Ministères de la Santé d'Afrique de l'Ouest, centrale, orientale et australe.",
        },
      ],
    },
    {
      _type: "block",
      _key: "about2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Ma pratique couvre la conception et l'exécution des ",
        },
        { _type: "span", _key: "s2", text: "Plans Stratégiques Nationaux (PSN)", marks: ["strong"] },
        {
          _type: "span",
          _key: "s3",
          text: ", le renforcement des systèmes de surveillance (dépôts de données géolocalisées, qualité de l'enregistrement des TDR), l'optimisation des chaînes d'approvisionnement des produits antipaludiques, ainsi qu'une expertise technique approfondie en ",
        },
        { _type: "span", _key: "s4", text: "surveillance entomologique, gestion de la résistance aux insecticides et lutte antivectorielle (PID, MILDA, ATSB)", marks: ["strong"] },
        { _type: "span", _key: "s5", text: "." },
      ],
    },
    {
      _type: "block",
      _key: "about3",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1",
          text: "Consultant temporaire de l'OMS sur la durabilité physique des MILDA, auteur de plus de 25 publications évaluées par les pairs, bilingue français-anglais et profondément ancré dans le système de santé béninois et les opérations du PNLP, je suis engagé pour un impact durable piloté par les gouvernements.",
        },
      ],
    },
  ],
  aboutChips: [
    "OMS — Consultant temporaire",
    "PNLP Bénin",
    "USAID / PMI",
    "Fonds mondial",
    "UNITAID",
    "Fondation Gates",
    "LSHTM",
    "IVCC",
  ],
  aboutFacts: [
    { key: "Langues", value: "Français & Fon — natifs · Anglais — rédaction scientifique" },
    { key: "Base", value: "Cotonou, Bénin — missions internationales" },
    { key: "Portefeuille projets", value: "Plus de 2 M$ USD gérés" },
    { key: "Domaine", value: "Paludisme · Entomologie médicale · Santé publique" },
  ],
  aboutPullQuote: "Des données entomologiques rigoureuses pour des décisions programmatiques durables.",
  expertise: [
    { index: "N° 01", title: "Stratégie programmes paludisme & PSN", description: "Conception et exécution de Plans Stratégiques Nationaux alignés sur les priorités des PNLP." },
    { index: "N° 02", title: "Propositions & rapports bailleurs", description: "Fonds mondial, USAID/PMI, UNITAID, Fondation Gates — conformité totale des cadres de rapportage." },
    { index: "N° 03", title: "Données géolocalisées & DHIS2", description: "Dépôts de données géo-activés, qualité de l'enregistrement des TDR, systèmes d'information sanitaire." },
    { index: "N° 04", title: "Surveillance & suivi-évaluation", description: "Renforcement des systèmes de surveillance, sites sentinelles entomologiques, M&E rigoureux." },
    { index: "N° 05", title: "Chaîne d'approvisionnement", description: "Quantification et gestion des stocks de produits antipaludiques à l'échelle nationale." },
    { index: "N° 06", title: "Lutte antivectorielle : PID · MILDA · ATSB", description: "Essais de phase III, cases expérimentales, stations semi-field, évaluation d'impact programmatique." },
    { index: "N° 07", title: "Résistance aux insecticides", description: "Surveillance des mutations kdr L1014F & Ace-1 G119S, bioessais OMS/CDC, plans de gestion." },
    { index: "N° 08", title: "Leadership multi-pays", description: "Équipes pluridisciplinaires jusqu'à 50 agents, engagement MoH/PNLP/bailleurs, renforcement des capacités." },
  ],
  careerIndex: [
    { dateRange: "2025 — auj.", org: "AIRID · Cotonou" },
    { dateRange: "2022 — 2025", org: "CREC / LSHTM" },
    { dateRange: "2020 — 2022", org: "CREC · Postdoc" },
    { dateRange: "2015 — 2020", org: "CREC · Doctorat" },
    { dateRange: "2015 — 2025", org: "CREC / UAC · Instructeur" },
  ],
  career: [
    {
      dateRange: "Sept. 2025 — Présent",
      title: "Responsable Entomologie Médicale & Chef de Projet",
      org: "African Institute for Research in Infectious Diseases (AIRID) — Cotonou, Bénin",
      bullets: [
        "Direction de la planification et de la mise en œuvre des projets de <strong>surveillance entomologique</strong> alignés sur les priorités du PNLP et le PSN paludisme du Bénin.",
        "Obtention des approbations éthiques et réglementaires (<strong>CNERS, PNLP, PMI, LSHTM, IVCC</strong>) pour trois projets majeurs de recherche et d'intervention.",
        "Direction d'<strong>essais contrôlés randomisés de phase III</strong> sur les appâts sucrés ciblés (ATSB) au Bénin et au Kenya, pour éclairer les investissements nationaux en lutte antivectorielle.",
        "Contribution à la <strong>préqualification OMS</strong> de MILDA nouvelle génération à double matière active ; appui au déploiement de la vaccination saisonnière contre le paludisme (Bénin, Guinée).",
        "Rapports techniques stratégiques pour le PNLP, PMI/USAID et les bailleurs ; développement de SOP et renforcement des capacités des équipes de terrain et de laboratoire.",
      ],
    },
    {
      dateRange: "Sept. 2022 — Sept. 2025",
      title: "Chef de Projet",
      org: "CREC / London School of Hygiene & Tropical Medicine — Cotonou, Bénin",
      bullets: [
        "Gestion de projets de recherche et d'évaluation de la lutte antivectorielle dans <strong>9 pays</strong> (Bénin, Côte d'Ivoire, Guinée, Nigéria, Kenya, Tanzanie, Ouganda, Cameroun, Mozambique).",
        "Conception d'études laboratoire/terrain sur l'impact des interventions (<strong>MILDA double IA, PID, ATSB</strong>) — preuves adoptées par les PNLP pour la sélection des produits.",
        "Développement des protocoles de <strong>sites sentinelles entomologiques</strong> et expansion de la surveillance vectorielle avec le PNLP et les partenaires USAID.",
        "Encadrement et mentorat d'équipes pluridisciplinaires de <strong>jusqu'à 50 personnes</strong> ; rapports de haute qualité pour UNITAID, Gates, PMI/USAID et LSHTM — livrables à l'heure et dans le budget.",
      ],
    },
    {
      dateRange: "Janv. 2020 — Août 2022",
      title: "Chercheur Postdoctoral & Chef d'Équipe",
      org: "Centre de Recherche Entomologique de Cotonou (CREC) — Bénin",
      bullets: [
        "Direction de l'évaluation <strong>PMI/USAID</strong> de la durabilité et de l'efficacité de PermaNet 3.0 et Yorkool — rapports informant directement la stratégie nationale de distribution des MILDA.",
        "Direction de l'essai randomisé en grappes <strong>« New Net Project »</strong> (Fonds mondial & UNITAID) évaluant Royal Guard et Interceptor G2 à Covè, Zagnanado et Ouinhi.",
        "Supervision des collectes entomologiques, essais en cases expérimentales, bioessais et analyses moléculaires (<strong>PCR, ELISA, Kdr, Ace-1</strong>).",
        "Encadrement de plus de 40 agents de terrain et techniciens ; participation aux groupes techniques du PNLP.",
      ],
    },
    {
      dateRange: "Mars 2015 — Déc. 2020",
      title: "Assistant de Recherche & Doctorant",
      org: "Centre de Recherche Entomologique de Cotonou (CREC) — Bénin",
      bullets: [
        "Co-gestion d'un budget de <strong>200 000 $+</strong> (PMI/USAID) pour le suivi entomologique de la PID en Alibori et Donga ; co-gestion de <strong>316 157 $+</strong> pour le suivi de durabilité des MILDA (2014–2020).",
        "Bioessais sur <strong>7 000+ MILDA</strong> tous les 3 à 6 mois (tests OMS cône et CDC) ; xénomonitoring moléculaire de la filariose lymphatique dans 5 districts.",
        "Tests de sensibilité aux insecticides, détection des mutations de résistance, mesures de taux de sporozoïtes par ELISA sur les sites sentinelles.",
        "Formation de <strong>250+ relais communautaires</strong>, 50 agents de santé et 30 techniciens ; plus de 15 publications évaluées par les pairs.",
      ],
    },
    {
      dateRange: "Juil. 2015 — 2025",
      title: "Instructeur — Formation Internationale en Entomologie du Paludisme",
      org: "CREC / Université d'Abomey-Calavi — Bénin",
      bullets: [
        "Conception et animation de formations appliquées pour participants nationaux et internationaux : biologie des vecteurs, planification PID, évaluation des MILDA, résistance aux insecticides, analyse épidémiologique.",
        "Supervision et mentorat de <strong>5 étudiants de licence et 4 de master</strong> en entomologie et biostatistique.",
      ],
    },
  ],
  education: [
    {
      year: "2015 — 2020",
      title: "PhD en Entomologie Médicale et Vétérinaire",
      school: "Université d'Abomey-Calavi — Bénin",
      thesis: "Thèse : « Durabilité et impact sur l'infection à Plasmodium falciparum et l'anémie chez les enfants de moins de 5 ans de huit types de MILDA dans huit communes du Bénin, Afrique de l'Ouest. »",
    },
    {
      year: "2012 — 2014",
      title: "Master en Entomologie Médicale et Vétérinaire",
      school: "Université d'Abomey-Calavi — Bénin",
      thesis: "Mémoire : « Comportement alimentaire et pouvoir infectant d'Anopheles melas dans la lagune côtière de Ouidah, Bénin. »",
    },
  ],
  skillGroups: [
    {
      category: "Programmes & systèmes de données",
      tags: ["DHIS2", "ODK Collect", "REDCap", "Excel avancé", "Stata", "R — modélisation & analyse spatiale", "QGIS", "ArcGIS", "Outils IA pour l'analytique programmatique"],
    },
    {
      category: "Gestion de programmes",
      tags: ["Conception d'études multi-pays", "Conformité bailleurs : PMI/USAID · Fonds mondial · OMS · Gates", "Gestion budgétaire 2 M$+", "Plans de travail & jalons", "SOP & assurance qualité (BPL)"],
    },
    {
      category: "Laboratoire & terrain",
      tags: ["Tests OMS tubes / cônes", "Bioessais CDC bouteilles", "Cases expérimentales", "Stations semi-field", "PCR · RT-PCR · ELISA", "Xénomonitoring moléculaire", "CPH · PSC · pièges lumineux UV-CDC", "Prospections larvaires", "Élevage : Anopheles · Aedes · Culex"],
    },
    {
      category: "Surveillance & lutte antivectorielle",
      tags: ["Suivi & gestion de la résistance aux insecticides", "Bioefficacité & durabilité MILDA (Phase III)", "Impact entomologique de la PID", "Conception & extension de sites sentinelles"],
    },
  ],
  publications,
  publicationsNote: "25+ publications évaluées par les pairs",
  awards: [
    { year: "2026", title: "Bourse de voyage — Conférence Internationale sur les Arboviroses", location: "Cap-Vert" },
    { year: "2025", title: "Bourse de voyage — Harvard Leadership Course « Science of Defeating Malaria »", location: "Kigali, Rwanda" },
    { year: "2023", title: "Bourse PAMCA Safeguarding Champions — 9e Conférence PAMCA", location: "Addis-Abeba, Éthiopie" },
    { year: "2023", title: "Certificat — International Spring School in Global Health : Climat & Santé numérique", location: "International" },
    { year: "2022", title: "Bourse de voyage — 71e Congrès annuel ASTMH", location: "Seattle, WA, USA" },
    { year: "2022", title: "Bourse PAMCA — Vector-Control Decision-Making Course", location: "Kigali, Rwanda" },
    { year: "2021", title: "Lauréat — RSTMH « Research in Progress »", location: "Londres, Royaume-Uni" },
  ],
  serviceConsulting: [
    { org: "OMS", description: "Consultant temporaire, Consultation technique sur l'intégrité physique et la durabilité des moustiquaires imprégnées." },
    { org: "Groupe de Travail Technique", description: "Surveillance entomologique et gestion de la résistance aux insecticides, Ministère de la Santé, Bénin." },
    { org: "Groupe d'experts", description: "Mise à jour de la base de données sur la résistance des vecteurs aux insecticides, Bénin." },
    { org: "Évaluateur d'abstracts", description: "Conférence annuelle PAMCA Africa (2022, Kigali)." },
  ],
  serviceAffiliations: [
    { org: "PAMCA", description: "Association Panafricaine de Lutte contre les Moustiques · Secrétaire du chapitre Bénin." },
    { org: "SERB", description: "Société Entomologique de la République du Bénin." },
    { org: "ASTMH", description: "American Society of Tropical Medicine and Hygiene." },
    { org: "Évaluateur", description: "Parasites & Vectors · Frontiers · GigaByte Journal." },
  ],
  talks: [
    { year: 2024, type: "Posters ×3", title: "8e Conférence de la Société MIM", location: "Kigali, Rwanda" },
    { year: 2023, type: "Poster", title: "9e Conférence annuelle PAMCA", location: "Addis-Abeba, Éthiopie" },
    { year: 2022, type: "Orale", title: "71e Congrès annuel ASTMH", location: "Seattle, WA, USA" },
    { year: 2022, type: "Poster", title: "8e Conférence annuelle PAMCA", location: "Centre de Conventions de Kigali, Rwanda" },
    { year: 2021, type: "Poster", title: "70e Congrès annuel ASTMH", location: "National Harbor, MD, USA" },
    { year: 2021, type: "Prix", title: "Présentation lauréate — RSTMH Research in Progress", location: "Londres, Royaume-Uni" },
  ],
  contactLead: "Programmes nationaux, bailleurs de fonds, instituts de recherche, médias scientifiques : écrivez-moi pour une gestion de programme, une consultation technique OMS/PNLP, une évaluation de lutte antivectorielle, un partenariat de recherche ou une invitation à conférencier.",
  contactSubjects: [
    "Gestion de programme paludisme",
    "Consultation technique (OMS / PNLP)",
    "Recherche & partenariats",
    "Conférence, formation & mentorat",
    "Autre demande",
  ],
  faq: [
    {
      question: "Quels types de missions acceptez-vous ?",
      answer: "Gestion de programmes paludisme nationaux ou régionaux, consultances techniques (surveillance entomologique, durabilité MILDA, PID, ATSB), appui aux propositions bailleurs (Fonds mondial, PMI/USAID), renforcement des systèmes de surveillance DHIS2/données géolocalisées, et évaluations d'interventions en conditions réelles.",
    },
    {
      question: "Intervenez-vous en dehors du Bénin ?",
      answer: "Oui. J'ai dirigé des projets dans 9 pays (Afrique de l'Ouest, centrale, orientale et australe) et je reste mobile pour des missions internationales : supervision d'études multicentriques, ateliers de renforcement des capacités, groupes de travail OMS et conférences.",
    },
    {
      question: "Supervisez-vous étudiants et jeunes chercheurs ?",
      answer: "Avec plaisir : j'ai encadré 5 étudiants de licence et 4 de master, formé plus de 250 relais communautaires et animé pendant dix ans la formation internationale en entomologie du paludisme (CREC/UAC). Écrivez-moi avec votre projet de recherche et votre calendrier.",
    },
    {
      question: "Comment obtenir CV détaillé ou lettres de référence ?",
      answer: "Les références et la liste complète des 25+ publications sont disponibles sur demande : utilisez le formulaire ci-dessus (objet « Autre demande ») ou écrivez directement à contact@idelphonseahogni.com — réponse sous 48 h ouvrées.",
    },
  ],
};

async function main() {
  console.log("Peuplage de Sanity...");

  try {
    const settingsResult = await client.createOrReplace(settings);
    console.log("✓ siteSettings créé:", settingsResult._id);
  } catch (err) {
    console.error("✗ Erreur siteSettings:", err.message);
  }

  try {
    const contentResult = await client.createOrReplace(content);
    console.log("✓ siteContent créé:", contentResult._id);
  } catch (err) {
    console.error("✗ Erreur siteContent:", err.message);
  }

  console.log("Terminé !");
}

main();
