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
  aboutText?: any;
  aboutChips?: string[];
  aboutFacts?: Array<{ key: string; value: string }>;
  aboutPullQuote?: string;
  expertise?: Array<{ index: string; title: string; description: string }>;
  career?: Array<{ dateRange: string; title: string; org: string; bullets?: string[] }>;
  careerIndex?: Array<{ dateRange: string; org: string }>;
  education?: Array<{ year: string; title: string; school: string; thesis?: string }>;
  skillGroups?: Array<{ category: string; tags: string[] }>;
  publications?: Array<{ index: number; title: string; journal: string; year: number; doi: string; authors: string; url?: string; type?: string }>;
  publicationsNote?: string;
  awards?: Array<{ year: string; title: string; location?: string }>;
  serviceConsulting?: Array<{ org: string; description: string }>;
  serviceAffiliations?: Array<{ org: string; description: string }>;
  talks?: Array<{ year: number; type: string; title: string; location: string }>;
  media?: any[];
  projects?: any[];
  gallery?: Array<{ image: any; caption: string }>;
  testimonials?: Array<{ name: string; role: string; quote: string }>;
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
  stats[], aboutText, aboutChips[], aboutFacts[], aboutPullQuote,
  expertise[], careerIndex[], career[], education[], skillGroups[],
  publications[]{index,title,journal,year,doi,authors,url,type}, publicationsNote, awards[],
  serviceConsulting[], serviceAffiliations[], talks[],
  contactLead, contactSubjects[], faq[], gallery[]{image,caption}, testimonials[],
  media[], projects[]
}`;

export const POSTS_QUERY = `*[_type == "post" && (!defined(language) || language == "fr")]{title, slug{current}, publishedAt, excerpt, coverImage, tags[], language} | order(publishedAt desc)`;

export const POSTS_QUERY_EN = `*[_type == "post" && language == "en"]{title, slug{current}, publishedAt, excerpt, coverImage, tags[], language} | order(publishedAt desc)`;

export const POSTS_QUERY_ALL = `*[_type == "post"]{title, slug{current}, publishedAt, excerpt, coverImage, tags[], language} | order(publishedAt desc)`;

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

export async function fetchSettings(client: SanityClient): Promise<SiteSettings | null> {
  return cachedFetch<SiteSettings | null>(client, SETTINGS_QUERY);
}

export async function fetchContent(client: SanityClient): Promise<SiteContent | null> {
  return cachedFetch<SiteContent | null>(client, CONTENT_QUERY);
}

export async function fetchPosts(client: SanityClient): Promise<Post[]> {
  return cachedFetch<Post[]>(client, POSTS_QUERY);
}

export async function fetchPost(client: SanityClient, slug: string): Promise<Post | null> {
  return cachedFetch<Post | null>(client, POST_QUERY, { slug });
}
