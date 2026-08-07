import type { SanityClient } from "@sanity/client";

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

export const POSTS_QUERY = `*[_type == "post"]{title, slug{current}, publishedAt, excerpt, coverImage, tags[]} | order(publishedAt desc)`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title, slug{current}, publishedAt, excerpt, tags[], coverImage, body
}`;

// Mémoïse les requêtes identiques : chaque requête GROQ n'est exécutée
// qu'une seule fois par build, partagée entre tous les composants.
const fetchCache = new Map<string, Promise<unknown>>();

export function cachedFetch(client: SanityClient, query: string, params?: Record<string, unknown>): Promise<any> {
  const key = params ? query + JSON.stringify(params) : query;
  if (!fetchCache.has(key)) {
    fetchCache.set(key, client.fetch(query, params));
  }
  return fetchCache.get(key)!;
}

export async function fetchSettings(client: SanityClient) {
  return cachedFetch(client, SETTINGS_QUERY);
}

export async function fetchContent(client: SanityClient) {
  return cachedFetch(client, CONTENT_QUERY);
}

export async function fetchPosts(client: SanityClient) {
  return cachedFetch(client, POSTS_QUERY);
}

export async function fetchPost(client: SanityClient, slug: string) {
  return cachedFetch(client, POST_QUERY, { slug });
}
