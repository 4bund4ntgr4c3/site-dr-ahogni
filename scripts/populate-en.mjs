import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "tbpdhv8m",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const enData = {
  statsEn: [
    { _key: "en1", number: 10, suffix: "+", label: "Years of Field Experience" },
    { _key: "en2", number: 25, suffix: "+", label: "Peer-Reviewed Publications" },
    { _key: "en3", number: 9, suffix: "", label: "Countries of Intervention" },
    { _key: "en4", number: 50, suffix: "+", label: "Field Trials Coordinated" },
    { _key: "en5", number: 250, suffix: "+", label: "Students Mentored" },
  ],
  aboutChipsEn: ["Medical Entomology", "Insecticide Resistance", "Dual-Active LLINs", "GLP Quality Standards", "Genomic Surveillance", "Public Health & NMCP", "Phase II/III Trials"],
  aboutFactsEn: [
    { _key: "enf1", key: "Specialty", value: "Medical Entomology & Malaria" },
    { _key: "enf2", key: "Institution", value: "CREC / LSHTM Partner" },
    { _key: "enf3", key: "Experience", value: "10+ Years in Sub-Saharan Africa" },
    { _key: "enf4", key: "Working Languages", value: "French, English, Fon" },
  ],
  aboutPullQuoteEn: "Rigorous entomological surveillance is the foundation of any effective vector control strategy.",
  aboutTextEn: [
    {
      _type: "block",
      _key: "en1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "en1a", text: "Dr Idelphonse B. Ahogni is a Medical Entomologist and Public Health researcher with over 10 years of operational experience in sub-Saharan Africa. He leads Phase II and Phase III trials on next-generation dual-active insecticide-treated nets (Interceptor G2, Royal Guard) and coordinates genomic surveillance of insecticide resistance mechanisms (kdr, ace-1, metabolic P450s). As Technical Advisor to the Benin National Malaria Control Program, he shapes national vector control policies and mass net distribution strategies, bridging laboratory research, field entomology, and evidence-based public health decision-making.", marks: [] }],
    },
  ],
  expertiseEn: [
    { _key: "en1", index: "01", title: "Operational LLIN Evaluation", description: "Phase II experimental hut trials and Phase III community cRCTs evaluating next-generation LLINs in real-world settings." },
    { _key: "en2", index: "02", title: "Insecticide Resistance Monitoring", description: "WHO tube and CDC bottle bioassays with molecular and biochemical characterization of resistance phenotypes." },
    { _key: "en3", index: "03", title: "Genomic Surveillance & Molecular Markers", description: "High-throughput PCR and sequencing for kdr, ace-1, and metabolic enzyme markers across vector populations." },
    { _key: "en4", index: "04", title: "Quality Management & GLP Standards", description: "Operational implementation of OECD/WHO Good Laboratory Practice in insectary and field trial settings." },
    { _key: "en5", index: "05", title: "Strategic Advisory for NMCPs", description: "High-level technical support for National Malaria Control Programs in strategic plan development and Global Fund applications." },
    { _key: "en6", index: "06", title: "Sentinel Field Station Network", description: "Nationwide coordination of entomological surveillance and adaptive vector bionomics monitoring." },
    { _key: "en7", index: "07", title: "Biometrics, Sampling & Abbott", description: "Design and power analysis for bioassays using Abbott correction, Fleiss sampling, and Probit models." },
    { _key: "en8", index: "08", title: "Teaching, Capacity Building & Mentorship", description: "Knowledge transfer through masterclasses, MSc/PhD supervision, and South-South training for vector biologists." },
  ],
  careerEn: [
    {
      _key: "en1",
      dateRange: "2021 — Present",
      title: "Senior Research Medical Entomologist & Project Lead",
      org: "Entomological Research Centre of Cotonou (CREC) · Benin",
      bullets: [
        "Principal leadership for Phase II and Phase III trials on next-generation dual-active nets (Interceptor G2, Royal Guard).",
        "Coordination of nationwide genomic surveillance tracking pyrethroid and organophosphate resistance markers (kdr, ace-1, P450s).",
        "Technical advisory for the National Malaria Control Program (NMCP Benin) guiding mass bednet distribution policies.",
        "Lead author for high-impact Q1 peer-reviewed research papers and WHO/Global Fund policy briefs.",
      ],
    },
    {
      _key: "en2",
      dateRange: "2018 — 2021",
      title: "Doctoral Researcher (PhD) & Field Trial Coordinator",
      org: "University of Abomey-Calavi (UAC) / CREC Benin",
      bullets: [
        "Doctoral dissertation investigating the molecular mechanisms and operational consequences of multiple resistance in Anopheles gambiae s.l.",
        "Supervision of experimental hut protocols at Covè and Akron sentinel stations under GLP compliance.",
        "Academic mentoring for Master's students in Medical Entomology and Public Health.",
      ],
    },
    {
      _key: "en3",
      dateRange: "2015 — 2018",
      title: "Entomological Bioassay & Field Trial Supervisor",
      org: "CREC Operational Research Projects / International Consortia",
      bullets: [
        "Execution of standardized WHO tube bioassays, CDC bottle assays, and residual efficacy testing.",
        "Field management of larval surveys and human landing catches (HLC) across 12 health districts in Benin.",
        "Management of reference insectary facilities maintaining standard Kisumu susceptible strains.",
      ],
    },
  ],
  careerIndexEn: [
    { _key: "en1", dateRange: "2021 — Present", org: "CREC Benin" },
    { _key: "en2", dateRange: "2018 — 2021", org: "UAC / CREC Benin" },
    { _key: "en3", dateRange: "2015 — 2018", org: "CREC Operational Research" },
  ],
  educationEn: [
    { _key: "en1", year: "2021", title: "PhD in Medical Entomology", school: "University of Abomey-Calavi (UAC) · Benin", thesis: "Molecular and metabolic mechanisms of insecticide resistance in Anopheles gambiae s.l. in Benin and operational efficacy of next-generation dual-active LLINs." },
    { _key: "en2", year: "2019", title: "Master of Public Health (MPH Candidate)", school: "Regional Institute of Public Health (IRSP) · Ouidah", thesis: "Applied epidemiology, biostatistics, design, and strategic management of vector-borne disease control programs." },
    { _key: "en3", year: "2015", title: "Master of Science (MSc) in Medical Entomology", school: "Faculty of Sciences and Techniques (FAST) · UAC", thesis: "Phenotypic and biochemical characterization of malaria vector susceptibility to pyrethroids and organophosphates." },
    { _key: "en4", year: "2012", title: "Bachelor of Science (BSc) in Life & Natural Sciences", school: "University of Abomey-Calavi (UAC) · Benin", thesis: "Animal biology, population genetics, and general environmental ecology." },
  ],
  skillGroupsEn: [
    { _key: "en1", category: "Bioassays & Laboratory", tags: ["WHO Tube Assays", "CDC Bottle Assays", "Cone Bioassays", "Experimental Huts", "PBO Synergist Assays", "Kisumu Strain Colonization", "Salivary & Ovarian Dissection"] },
    { _key: "en2", category: "Molecular Biology & Genomics", tags: ["DNA/RNA Extraction", "PCR-RFLP", "Sanger Sequencing", "TaqMan kdr/ace-1", "Enzymatic Assays (P450/GST/EST)", "Gel Electrophoresis"] },
    { _key: "en3", category: "Biometrics & Software", tags: ["R & RStudio", "Stata", "Abbott Correction Formula", "Fleiss Sample Sizing", "Probit Regression", "QGIS Spatial Mapping", "DHIS2 Health Data"] },
    { _key: "en4", category: "Quality & Program Leadership", tags: ["OECD/WHO GLP Standards", "WHO Protocol Audits", "NMCP Strategic Plans", "Global Fund Grants", "Q1 Scientific Publishing"] },
  ],
  publicationsNoteEn: "Full list available on ResearchGate & Google Scholar",
  awardsEn: [
    { _key: "en1", year: "2023", title: "PAMCA Travel Award & Scientific Excellence Fellowship", location: "Addis Ababa, Ethiopia" },
    { _key: "en2", year: "2021", title: "Outstanding Doctoral Research Award", location: "Ministry of Higher Education, Benin" },
    { _key: "en3", year: "2019", title: "Young Scientist Award — International Conference on Vector Control", location: "Cotonou, Benin" },
    { _key: "en4", year: "2016", title: "Best Scientific Poster Presentation Award (MIM)", location: "Dakar, Senegal" },
  ],
  serviceConsultingEn: [
    { _key: "en1", org: "NMCP Benin", description: "Technical Advisory Committee Member for the evaluation of national vector control strategies and mass LLIN campaigns." },
    { _key: "en2", org: "WHO / AFRO", description: "Invited technical expert for the regional review of insecticide resistance management guidelines." },
    { _key: "en3", org: "CREC Benin", description: "Internal Quality Assurance Auditor under OECD Good Laboratory Practice (GLP) for entomological trials." },
  ],
  serviceAffiliationsEn: [
    { _key: "en1", org: "PAMCA", description: "Active Member of the Pan-African Mosquito Control Association (PAMCA), West Africa Chapter." },
    { _key: "en2", org: "Beninese Entomological Society", description: "Executive board member and scientific session organizer for annual entomology conferences." },
    { _key: "en3", org: "Peer Review", description: "Regular reviewer for Malaria Journal, Parasites & Vectors, and Acta Tropica." },
  ],
  talksEn: [
    { _key: "en1", year: 2023, type: "Oral Presentation", title: "Efficacy of Interceptor G2 nets in areas with high pyrethroid resistance: results from a cluster-randomized trial in Benin", location: "PAMCA Annual Conference, Addis Ababa" },
    { _key: "en2", year: 2022, type: "Poster", title: "Genomic architecture of metabolic resistance in Anopheles gambiae s.l. populations from southern Benin", location: "MIM Conference, Dakar" },
    { _key: "en3", year: 2021, type: "Invited Talk", title: "Operational impact of dual-active LLINs on malaria transmission: evidence from Phase III", location: "WHO Vector Control Advisory Group, Geneva" },
  ],
  contactLeadEn: "Whether you are a research institution, NMCP, or international agency, let's discuss how entomological evidence can strengthen your malaria control strategy. I respond within 48 hours.",
  contactSubjectsEn: ["Research Collaboration", "Technical Consulting & Advisory", "Training & Capacity Building", "Media & Press Inquiry", "Other"],
  faqEn: [
    { _key: "en1", question: "What types of missions do you undertake?", answer: "I provide technical expertise for Phase II/III LLIN trials, insecticide resistance surveillance, GLP audits, NMCP strategic plan development, and Global Fund grant writing." },
    { _key: "en2", question: "How can we collaborate on a research project?", answer: "Contact me via the form or email with a brief concept note (objectives, timeline, location, budget). I typically respond within 48 hours with availability and next steps." },
    { _key: "en3", question: "Do you offer training for NMCP staff?", answer: "Yes — I regularly deliver masterclasses on WHO bioassays, genomic surveillance, and experimental hut methodology, both in Benin and internationally." },
  ],
  testimonialsEn: [
    { _key: "en1", name: "Prof. Martin Akogbéto", role: "Director, CREC Benin", quote: "Dr. Ahogni embodies the highest standard of West African entomological research. His leadership on dual-active net trials has directly shaped WHO policy." },
    { _key: "en2", name: "Prof. Hilary Ranson", role: "Associate Professor, LSHTM", quote: "Working with Idelphonse on multi-country LLIN evaluation trials has been outstanding. His genomic surveillance expertise is world-class." },
    { _key: "en3", name: "Dr. Codjo Ahomadegbe", role: "Deputy National Coordinator, NMCP Benin", quote: "Dr. Ahogni's technical expertise enabled the NMCP to seamlessly transition to next-generation nets in high-resistance areas." },
    { _key: "en4", name: "Dr. Roseric Azondékon", role: "Researcher, CREC Benin", quote: "A passionate scientific mentor committed to African youth. His training programs have launched a new generation of vector biologists." },
  ],
  mediaEn: [
    { _key: "en1", year: 2023, title: "Why the new bed nets matter for malaria elimination", outlet: "BBC Africa", type: "interview", url: "https://bbc.com" },
    { _key: "en2", year: 2022, title: "Inside Benin's experimental huts: the frontline of malaria research", outlet: "RFI", type: "reportage", url: "https://rfi.fr" },
  ],
  projectsEn: [
    { _key: "en1", title: "Durability and Efficacy Evaluation of Next-Generation Dual-Active LLINs (Interceptor G2 & Royal Guard)", period: "2021 — 2024", funder: "Global Fund / PMI", role: "Co-Principal Investigator & Field Coordinator", countries: "Benin", description: "Phase II experimental hut and Phase III community trials evaluating the operational impact of dual-active nets on malaria transmission in high pyrethroid resistance areas.", url: "" },
    { _key: "en2", title: "National Entomological Surveillance & Insecticide Resistance Monitoring", period: "2019 — Present", funder: "NMCP Benin / WHO", role: "Technical Advisor", countries: "Benin (12 districts)", description: "Annual nationwide monitoring of vector susceptibility against standard insecticides and molecular characterization of resistance alleles.", url: "" },
    { _key: "en3", title: "Multicenter Quality & Residual Efficacy Evaluation of Indoor Residual Spraying (IRS)", period: "2020 — 2023", funder: "Unitaid / IVCC", role: "Study Coordinator", countries: "Benin, Burkina Faso", description: "Assessment of residual efficacy decay for microencapsulated organophosphates and neonicotinoids on different wall substrates.", url: "" },
  ],
  galleryEn: [], // keep empty, will use fallback unsplash EN captions
};

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN");
    process.exit(1);
  }
  console.log("Fetching current siteContent...");
  const content = await client.fetch(`*[_type == "siteContent"][0]{ _id, _rev }`);
  if (!content || !content._id) {
    console.error("No siteContent found");
    process.exit(1);
  }
  console.log(`Found siteContent ${content._id} rev ${content._rev}`);

  console.log("Patching EN fields...");
  const result = await client.patch(content._id).set(enData).commit();
  console.log("Patched EN fields:", Object.keys(enData).join(", "));
  console.log("New rev:", result._rev);

  // Create EN blog post if not exists
  console.log("Checking for EN post...");
  const existingEn = await client.fetch(`*[_type == "post" && language == "en" && slug.current == "welcome"][0]`);
  if (existingEn) {
    console.log("EN post welcome already exists:", existingEn._id);
  } else {
    console.log("Creating EN post 'welcome'...");
    const frPost = await client.fetch(`*[_type == "post" && slug.current == "bienvenue"][0]{ title, excerpt, body, coverImage, tags }`);
    const newPost = {
      _type: "post",
      title: "Welcome to the Field Notes",
      slug: { _type: "slug", current: "welcome" },
      publishedAt: new Date().toISOString(),
      excerpt: "Operational reflections on malaria vector control, field trials, and entomological surveillance in sub-Saharan Africa.",
      language: "en",
      tags: ["Welcome", "Field Research"],
      body: frPost?.body || [
        {
          _type: "block",
          _key: "enbody1",
          style: "normal",
          markDefs: [],
          children: [{ _type: "span", _key: "enbody1a", text: "Welcome to my field notes — a space for sharing operational research insights, lessons from Phase II and Phase III trials, and reflections on malaria vector control in Africa. Stay tuned for regular updates from the lab and the field.", marks: [] }],
        },
      ],
      coverImage: frPost?.coverImage || undefined,
    };
    const created = await client.create(newPost);
    console.log("Created EN post:", created._id);
  }

  console.log("Done. EN editorial content is now live in Sanity.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
