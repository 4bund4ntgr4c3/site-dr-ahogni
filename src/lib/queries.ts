import type { SanityClient } from "@sanity/client";

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle, siteDescription, heroEyebrow, heroName, heroTagline,
  heroLede, heroImage, heroFigCaption, aboutImage, aboutFigCaption,
  breakImage, breakLabel, breakQuote, officeImage, officeFigCaption,
  contactEmail, contactPhone, contactPhoneLink, linkedin, researchGate,
  orcid, footerText, tapeText
}`;

export const CONTENT_QUERY = `*[_type == "siteContent"][0]{
  stats[], aboutText, aboutChips[], aboutFacts[], aboutPullQuote,
  expertise[], careerIndex[], career[], education[], skillGroups[],
  publications[], publicationsNote, awards[],
  serviceConsulting[], serviceAffiliations[], talks[],
  contactLead, contactSubjects[], faq[]
}`;

export async function fetchSettings(client: SanityClient) {
  return client.fetch(SETTINGS_QUERY);
}

export async function fetchContent(client: SanityClient) {
  return client.fetch(CONTENT_QUERY);
}
