# Prioritized SEO Action Plan: https://idelphonseahogni.com

This action plan organizes fixes into prioritized tiers based on **Impact**, **Effort**, and **Dependencies**.

---

## Priority Tier 1: Immediate Blocker Fixes (0–48 Hours)
*Directly impacts crawler accessibility, indexation integrity, and user trust.*

| # | Task | Affected File(s) | Impact | Effort |
|---|---|---|:---:|:---:|
| **1.1** | **Fix 404 Mailto Link**<br>Cloudflare Email Obfuscation scrambles `mailto:` in testimonials CTA into a broken internal 404 link (`/cdn-cgi/l/email-protection#...`). Wrap in `<!--email_off-->` or construct via JS. | `src/components/Testimonials.astro` | High | Low |
| **1.2** | **Fix Broken Footer Backlink**<br>`https://studio26.africa` fails DNS resolution (`Errno 11001`). Remove or replace with working link. | `src/components/Footer.astro` | High | Low |
| **1.3** | **Fix `/sitemap.xml` HTTP 200 HTML Refresh**<br>Replace Astro HTML refresh redirect with an HTTP 301 redirect to `/sitemap-index.xml` or copy `sitemap-index.xml` to `sitemap.xml`. | `astro.config.mjs` / `public/_redirects` | High | Low |
| **1.4** | **Fix Broken 404 Image & Empty `<img>` Tag**<br>Replace dead Unsplash URL (`photo-1581093458791-9f3c3900df4b`) and remove empty placeholder `<img id="lxImg" src="" alt="">`. | `src/components/Gallery.astro` | Medium | Low |

---

## Priority Tier 2: Quick Wins & High-Impact Optimizations (Week 1)
*Substantially improves schema validity, Generative Engine visibility (GEO), and document structure.*

| # | Task | Affected File(s) | Impact | Effort |
|---|---|---|:---:|:---:|
| **2.1** | **Fix Heading Hierarchy Inversion**<br>In `Layout.astro`, off-canvas `<AiAssistant />` places an `<h2>` before the page `<h1>`. Move modals below `<slot />` and convert modal `<h2>` to a styled `<div>` or `<span>`. | `src/layouts/Layout.astro`,<br>`src/components/AiAssistant.astro` | High | Low |
| **2.2** | **Unblock AI Search Crawlers for GEO**<br>Allow `GPTBot`, `ClaudeBot`, `Google-Extended`, and `OAI-SearchBot` in Cloudflare Dashboard and `robots.txt` so ChatGPT, Claude, and Gemini can cite publications. | `public/robots.txt`,<br>Cloudflare Dashboard | Very High | Low |
| **2.3** | **Clean Person Schema Keyword Stuffing**<br>Trim 55+ alternateName spelling variants down to 5 genuine bibliographic citation aliases. | `src/layouts/Layout.astro` | Medium | Low |
| **2.4** | **Add Real Academic Entity Links in `sameAs`**<br>Add official ORCID profile URL and Google Scholar author link to `Person.sameAs`. | `src/layouts/Layout.astro` | High | Low |
| **2.5** | **Deprecate Restricted FAQPage Schema**<br>Replace unsupported `FAQPage` on `/contact` with standard `ContactPage` schema. | `src/pages/contact.astro` | Medium | Low |

---

## Priority Tier 3: Medium-Term Strategic Enhancements (Weeks 2–4)
*Maximizes semantic entity depth, Answer Engine Optimization (AEO), and asset performance.*

| # | Task | Affected File(s) | Impact | Effort |
|---|---|---|:---:|:---:|
| **3.1** | **Implement `ScholarlyArticle` Schema**<br>Inject rich JSON-LD markup for each of the 26 peer-reviewed papers on `/publications` with DOI, journal name, and publication date. | `src/pages/publications.astro` | High | Medium |
| **3.2** | **Add AEO Definition & Answer Blocks**<br>Embed 134–167 word concise definition blocks ("Dr. Idelphonse Ahogni est un...") at the top of `/expertises` and `/entomologie` for Google AI Overviews and Featured Snippets. | `src/pages/expertises.astro`,<br>`src/pages/entomologie.astro` | High | Medium |
| **3.3** | **Migrate External Images to Astro Image Pipeline**<br>Replace 10 remote Unsplash JPEGs with local assets processed through Astro's `<Image />` component (generating responsive WebP/AVIF with `srcset` and `sizes`). | `src/components/Gallery.astro` | Medium | Medium |
| **3.4** | **Add `SpeakableSpecification` Schema**<br>Define speakable CSS selectors (`#bio-summary`, `.lead-answer`) for voice query optimization. | `src/layouts/Layout.astro` | Medium | Low |
| **3.5** | **Create Wikidata Entity**<br>Submit and verify a Wikidata item for Dr. Idelphonse Ahogni with CREC/LSHTM/UAC citations to solidify the Google Knowledge Graph entity. | External / Wikidata.org | High | Medium |

---

## Tracking & Verification Checklist

- [ ] Run `python .agent/skills/seo/scripts/broken_links.py https://idelphonseahogni.com` — verify 0 broken links.
- [ ] Run `python .agent/skills/seo/scripts/sitemap_checker.py https://idelphonseahogni.com` — verify valid XML across all sitemap endpoints.
- [ ] Run `python .agent/skills/seo/scripts/robots_checker.py https://idelphonseahogni.com` — confirm GPTBot and Google-Extended allowed.
- [ ] Run `python .agent/skills/seo/scripts/validate_schema.py` — confirm 0 warnings on Person & Contact schema.
- [ ] Inspect Google Search Console URL Inspection tool for live page rendering and breadcrumb validation.
