import type { SanityClient } from "@sanity/client";

export interface SiteSettings {
  siteTitle?: string;
  siteDescription?: string;
  heroEyebrow?: string;
  heroName?: { firstName?: string; middleName?: string; lastName?: string; suffix?: string };
  heroTagline?: string;
  heroLede?: string;
  heroImage?: any;
  heroFigCaption?: any;
  contactEmail?: string;
  contactPhone?: string;
  contactPhoneLink?: string;
  linkedin?: string;
  researchGate?: string;
  orcid?: string;
  googleScholar?: string;
  calendlyUrl?: string;
  footerText?: string;
  tapeText?: string;
}

export interface SiteContent {
  stats?: Array<{ number: number; suffix?: string; label: string }>;
  statsEn?: Array<{ number: number; suffix?: string; label: string }>;
  aboutText?: any;
  aboutTextEn?: any;
  aboutChips?: string[];
  aboutChipsEn?: string[];
  aboutFacts?: Array<{ key: string; value: string }>;
  aboutFactsEn?: Array<{ key: string; value: string }>;
  aboutPullQuote?: string;
  aboutPullQuoteEn?: string;
  expertise?: Array<{ index: string; title: string; description: string }>;
  expertiseEn?: Array<{ index: string; title: string; description: string }>;
  career?: Array<{ dateRange: string; title: string; org: string; bullets?: string[] }>;
  careerEn?: Array<{ dateRange: string; title: string; org: string; bullets?: string[] }>;
  careerIndex?: Array<{ dateRange: string; org: string }>;
  careerIndexEn?: Array<{ dateRange: string; org: string }>;
  education?: Array<{ year: string; title: string; school: string; thesis?: string }>;
  educationEn?: Array<{ year: string; title: string; school: string; thesis?: string }>;
  skillGroups?: Array<{ category: string; tags: string[] }>;
  skillGroupsEn?: Array<{ category: string; tags: string[] }>;
  publications?: Array<{ index: number; title: string; journal: string; year: number; doi: string; authors: string; url?: string; type?: string }>;
  publicationsNote?: string;
  publicationsNoteEn?: string;
  awards?: Array<{ year: string; title: string; location?: string }>;
  awardsEn?: Array<{ year: string; title: string; location?: string }>;
  serviceConsulting?: Array<{ org: string; description: string }>;
  serviceConsultingEn?: Array<{ org: string; description: string }>;
  serviceAffiliations?: Array<{ org: string; description: string }>;
  serviceAffiliationsEn?: Array<{ org: string; description: string }>;
  talks?: Array<{ year: number; type: string; title: string; location: string }>;
  talksEn?: Array<{ year: number; type: string; title: string; location: string }>;
  contactLead?: string;
  contactLeadEn?: string;
  contactSubjects?: string[];
  contactSubjectsEn?: string[];
  faq?: Array<{ question: string; answer: string }>;
  faqEn?: Array<{ question: string; answer: string }>;
  media?: any[];
  mediaEn?: any[];
  projects?: any[];
  projectsEn?: any[];
  gallery?: Array<{ image: any; caption: string }>;
  galleryEn?: Array<{ image: any; caption: string }>;
  testimonials?: Array<{ name: string; role: string; quote: string }>;
  testimonialsEn?: Array<{ name: string; role: string; quote: string }>;
}

export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: any;
  tags?: string[];
  body?: any;
  language?: "fr" | "en";
}

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle, siteDescription, heroEyebrow, heroName, heroTagline,
  heroLede, heroImage, heroFigCaption, aboutImage, aboutFigCaption,
  breakImage, breakLabel, breakQuote, officeImage, officeFigCaption,
  contactEmail, contactPhone, contactPhoneLink, linkedin, researchGate,
  orcid, googleScholar, calendlyUrl, footerText, tapeText
}`;

export const CONTENT_QUERY = `*[_type == "siteContent"][0]{
  stats[], statsEn[],
  aboutText, aboutTextEn, aboutChips[], aboutChipsEn[], aboutFacts[], aboutFactsEn[], aboutPullQuote, aboutPullQuoteEn,
  expertise[], expertiseEn[], careerIndex[], careerIndexEn[], career[], careerEn[], education[], educationEn[], skillGroups[], skillGroupsEn[],
  publications[]{index,title,journal,year,doi,authors,url,type}, publicationsNote, publicationsNoteEn, awards[], awardsEn[],
  serviceConsulting[], serviceConsultingEn[], serviceAffiliations[], serviceAffiliationsEn[], talks[], talksEn[],
  contactLead, contactLeadEn, contactSubjects[], contactSubjectsEn[], faq[], faqEn[], gallery[]{image,caption}, galleryEn[]{image,caption}, testimonials[], testimonialsEn[],
  media[], mediaEn[], projects[], projectsEn[]
}`;

export const POSTS_QUERY = `*[_type == "post" && (!defined(language) || language == "fr")]{title, slug{current}, publishedAt, excerpt, coverImage, tags[], language} | order(publishedAt desc)`;

export const POSTS_QUERY_EN = `*[_type == "post" && language == "en"]{title, slug{current}, publishedAt, excerpt, coverImage, tags[], language} | order(publishedAt desc)`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title, slug{current}, publishedAt, excerpt, tags[], coverImage, body, language
}`;

// Mémoïse les requêtes identiques : chaque requête GROQ n'est exécutée
// qu'une seule fois par build, partagée entre tous les composants.
const fetchCache = new Map<string, Promise<unknown>>();

export function cachedFetch<T = unknown>(client: SanityClient, query: string, params?: Record<string, unknown>): Promise<T> {
  const key = params ? query + JSON.stringify(params) : query;
  if (!fetchCache.has(key)) {
    fetchCache.set(key, client.fetch(query, params));
  }
  return fetchCache.get(key)! as Promise<T>;
}

