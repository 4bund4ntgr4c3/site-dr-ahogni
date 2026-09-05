# Complete SEO Audit Report: https://idelphonseahogni.com

- **Audited Target**: `https://idelphonseahogni.com`
- **Audit Date**: 2026-09-05
- **Auditor**: Antigravity SEO Specialist (LLM-First & Script-Verified)
- **Scope**: Full-Site Audit (Technical, Content, Schema, Performance, Links, GEO, AEO, Entity SEO, Sitemap)
- **Overall SEO Health Score**: **78 / 100** (Rating: **Good**, with actionable high-impact fixes)
- **Interactive HTML Dashboard**: `SEO-REPORT.html` (generated in project root)

---

## 1. Executive Summary

Dr. Idelphonse Ahogni’s website is an exceptionally deep, academically authoritative personal portfolio and medical entomology research hub built on **Astro SSG**. It features full bilingual parity (FR/EN), 100/100 security headers, self-canonicals, `llms.txt` support, and real operational research data (25+ peer-reviewed publications, sentinel field station data, GLP compliance, interactive calculators).

However, our evidence-backed audit identified **several critical technical, schema, link, and AI visibility impediments** that suppress search rankings, trigger crawler errors, and blind generative AI search engines (ChatGPT, Google AI Overviews, Perplexity).

### Top Critical Issues:
1. **Broken Links & DNS Failures**:
   - An internal Cloudflare email-obfuscation link generates an internal 404 error (`/cdn-cgi/l/email-protection#...`) on the recommendation CTA button.
   - The external footer credit backlink (`https://studio26.africa`) fails DNS resolution (`Errno 11001: getaddrinfo failed`).
2. **Broken Sitemap Endpoint (`/sitemap.xml`)**:
   - Standard bot requests to `https://idelphonseahogni.com/sitemap.xml` return an HTML client-side refresh page instead of valid XML or an HTTP 301 redirect, causing XML parser errors across search engines.
3. **AI Crawler Paradox (GEO Blindness)**:
   - Cloudflare edge / robots.txt blocks `GPTBot`, `ClaudeBot`, `Google-Extended`, and `Applebot-Extended`. This prevents ChatGPT Search, Claude, and Google Gemini from citing Dr. Ahogni’s papers and field research in AI Overviews and conversational answers.
4. **Schema Keyword Stuffing & Restricted Types**:
   - The `Person` schema contains 55+ keyword permutations and typo variants in `alternateName` (e.g., "Idelfonse", "Aogni"), triggering spam flags in schema validators.
   - `/contact` employs deprecated `FAQPage` schema (restricted by Google in 2023 to government/health authorities).
   - Crucial academic authority hubs (**ORCID**, **Google Scholar**) are commented out and missing from `sameAs`.
5. **DOM Heading Hierarchy Inversion**:
   - The off-canvas AI search drawer (`AiAssistant.astro`) is rendered in `Layout.astro` before `<slot />`, causing an `<h2>` to precede the main page `<h1>` on every single page of the site.
6. **Unoptimized & Broken Gallery Images**:
   - Gallery image from Unsplash returns HTTP 404 (`photo-1581093458791-9f3c3900df4b`).
   - Hardcoded empty image placeholder (`<img id="lxImg" src="" alt="">`) flags missing alt text and empty src.
   - 10 external Unsplash images load without responsive `srcset`/`sizes`.

---

## 2. Category-by-Category Audit & Scorecard

| Category | Weight | Score | Evaluation |
|---|:---:|:---:|---|
| **Technical SEO** | 20% | **82 / 100** | Strong HTTPS/HSTS, clean canonicals & hreflang; penalized by sitemap HTML redirect & heading inversion. |
| **Content Quality & E-E-A-T** | 15% | **88 / 100** | Extraordinary academic authority & real research data; penalized by high reading complexity & missing publication dates. |
| **Schema & Structured Data** | 15% | **70 / 100** | Rich Person & WebSite graph; penalized by 55+ alternateName stuffing, deprecated FAQPage, missing ScholarlyArticle & ORCID. |
| **Performance & Core Web Vitals** | 10% | **75 / 100** | Fast Astro SSG baseline & local WOFF2 fonts; penalized by 10 unoptimized external images & 1 broken 404 image. |
| **Links & Navigation** | 10% | **72 / 100** | Good site architecture; penalized by 2 broken links (internal 404, external DNS failure) and repetitive search modal anchors. |
| **GEO (Generative Engine Optimization)** | 10% | **65 / 100** | Perfect `llms.txt`; severely penalized by robots.txt blocking GPTBot/ClaudeBot/Google-Extended and lack of 134-167w answer blocks. |
| **AEO (Answer Engine Optimization)** | 10% | **60 / 100** | Rich content; penalized by 0 direct answer definitions, no `Speakable` schema, and lack of PAA query-focused H2/H3s. |
| **Entity SEO** | 5% | **68 / 100** | Clear Person identity; penalized by absence of ORCID, Google Scholar, and Wikidata entity reconciliation. |
| **Sitemap & Indexability** | 5% | **75 / 100** | Clean `sitemap-0.xml` with hreflang; penalized by broken `/sitemap.xml` endpoint and missing image/video tags. |
| **Total Weighted Health Score** | **100%** | **78 / 100** | **Good — High-impact fixes can readily lift score to 95+** |

---

## 3. Comprehensive Findings & Evidence

### Area 1: Technical SEO
- **[Pass] Security Headers (Score: 100/100)**:
  - *Evidence*: HSTS (`max-age=31536000; includeSubDomains; preload`), strict CSP with nonces/hashes, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and full `Permissions-Policy`.
- **[Pass] Canonical & Hreflang Alignment**:
  - *Evidence*: `hreflang_checker.py` confirmed bidirectional return tags between `https://idelphonseahogni.com/` (fr), `https://idelphonseahogni.com/en` (en), and `x-default`. Self-canonicals match 100%.
- **[Critical] Heading Order Inversion (`<h2>` before `<h1>`)**:
  - *Evidence*: In `src/layouts/Layout.astro`, `<AiAssistant />` is placed before `<slot />`. In the compiled HTML, line 25 displays:
    `<h2>Moteur de recherche & base de connaissances scientifiques</h2>` followed 10 lines later by `<h1>Dr Idelphonse Bonaventure Ahogni PhD</h1>`.
  - *Impact*: Inverted document outline confuses screen readers and search bots on primary page entity.
  - *Fix*: Move `<AiAssistant />`, `<SearchModal />`, and `<PdfViewerModal />` below `<slot />` in `Layout.astro`, and replace the drawer's `<h2>` with a non-heading `<div role="heading" aria-level="2" class="ai-title">` or structural header tag.
- **[Critical] Broken `/sitemap.xml` Endpoint**:
  - *Evidence*: Requesting `https://idelphonseahogni.com/sitemap.xml` yields HTTP 200 with an HTML client-side refresh page (`<meta http-equiv="refresh" content="0;url=/sitemap-index.xml">`).
  - *Impact*: Search crawlers and XML validators checking `/sitemap.xml` abort with XML syntax parsing errors.
  - *Fix*: In Astro config or `public/_redirects`, serve an HTTP 301 permanent redirect to `/sitemap-index.xml`, or alias/copy `sitemap-index.xml` as `sitemap.xml`.

### Area 2: Content Quality & E-E-A-T
- **[Pass] Exceptional Author Authority & Scientific Depth**:
  - *Evidence*: 3,735 words on homepage, 26 peer-reviewed papers with full DOIs, affiliations with CREC, LSHTM, WHO, PAMCA.
- **[Warning] Extreme Reading Complexity for Broader Audiences**:
  - *Evidence*: Flesch Reading Ease score of 30.0 (Grade 13.0, College level). 27.4% complex multi-syllable terms.
  - *Impact*: While highly credible to scientists, general public, journalists, and answer engines encounter high friction.
  - *Fix*: Provide 2-sentence plain-language summaries (TL;DR / En résumé) at the head of major sections.
- **[Warning] Missing Visible "Last Modified / Updated" Timestamps**:
  - *Evidence*: Articles and resource guides lack visible `Mis à jour le [Date]` and schema `dateModified` properties.

### Area 3: Schema & Structured Data
- **[Critical] AlternateName Keyword Stuffing in Person Schema**:
  - *Evidence*: `Layout.astro` injects 55+ strings into `alternateName` including slight spelling typos ("Idelfonse", "Aogni", "Idelphonse Ahogny").
  - *Impact*: Google Search spam algorithms flag repetitive name arrays as manipulation attempts.
  - *Fix*: Retain only genuine publishing and bibliographic names:
    `["Dr Idelphonse Ahogni", "Dr Idelphonse Bonaventure Ahogni", "Ahogni IB", "Ahogni, I. B.", "I. B. Ahogni"]`.
- **[Warning] Restricted FAQPage Schema on `/contact`**:
  - *Evidence*: `/contact` outputs `@type: FAQPage`.
  - *Impact*: Google has deprecated FAQ rich results for non-governmental/non-health institutions since August 2023. It yields zero rich snippets.
  - *Fix*: Switch to `ContactPage` with `mainEntity` pointing to the `Person` entity, and present FAQs as semantic HTML without unsupported schema.
- **[Warning] Missing ScholarlyArticle Schema for Publications**:
  - *Evidence*: Publications on `/publications` are rendered in HTML and downloadable as BibTeX, but lack individual `@type: ScholarlyArticle` JSON-LD nodes.
  - *Fix*: Inject `ScholarlyArticle` schema for each paper with `headline`, `doi`, `author`, `isPartOf` (Journal), and `datePublished`.
- **[Warning] Unlinked String Literals in `knowsAbout`**:
  - *Evidence*: 45 raw text strings.
  - *Fix*: Connect major scientific terms to Wikidata URIs (e.g. Chlorfenapyr, Anopheles gambiae, Piperonyl butoxide).

### Area 4: Performance & Core Web Vitals
- **[Pass] Lightweight Astro Core & Self-Hosted Fonts**:
  - *Evidence*: WOFF2 variable fonts preloaded locally; zero render-blocking external Google Font CSS.
- **[Critical] Broken Image 404 in Gallery**:
  - *Evidence*: `src/components/Gallery.astro` references `https://images.unsplash.com/photo-1581093458791-9f3c3900df4b`, returning HTTP 404.
  - *Fix*: Replace with a verified working Unsplash image or local optimized asset.
- **[Warning] Empty `<img>` Tag in Modal**:
  - *Evidence*: `<img id="lxImg" src="" alt="">`. Triggers missing alt and empty src warnings.
  - *Fix*: Omit `src="" alt=""` from initial HTML, or create element dynamically in JS upon modal opening.
- **[Warning] 10 External Unoptimized JPEGs**:
  - *Evidence*: External images lack `srcset`, `sizes`, and AVIF/WebP next-gen formats, adding over 500 KB to mobile payload.
  - *Fix*: Use Astro's native `<Image />` or `<Picture />` components to generate responsive WebP/AVIF variants.

### Area 5: Links & Site Architecture
- **[Critical] Broken Internal Mailto Link (Cloudflare Scrambled)**:
  - *Evidence*: `https://idelphonseahogni.com/cdn-cgi/l/email-protection#...` returns HTTP 404. Anchor: "✍️ Rédiger une recommandation".
  - *Fix*: Wrap the mailto anchor in `<!--email_off-->` or construct the mailto link with client-side script to prevent Cloudflare link corruption.
- **[Critical] Broken External Backlink in Footer**:
  - *Evidence*: `https://studio26.africa` in footer fails DNS resolution (`getaddrinfo failed`).
  - *Fix*: Update to a valid URL or remove link until domain DNS is restored.
- **[Warning] Anchor Text Repetition from Global Search Modal**:
  - *Evidence*: 18 links with prefix `🔗Page Dédiée : ...` repeat identically across all 21 pages.
  - *Fix*: Add `rel="nofollow" data-nosnippet` or render search modal list lazily on first modal activation.

### Area 6: GEO (Generative Engine Optimization)
- **[Pass] High-Quality `llms.txt` & `llms-full.txt`**:
  - *Evidence*: `llms_txt_checker.py` awarded 100/100 score with complete project and research overviews.
- **[Critical] AI Crawler Blocking via Edge/Robots.txt**:
  - *Evidence*: Live robots.txt disallows `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`.
  - *Impact*: OpenAI Search (ChatGPT), Claude Search, and Google Gemini cannot read or cite Dr. Ahogni’s research.
  - *Fix*: Disable Cloudflare’s blanket AI Scraper block, and explicitly configure robots.txt to ALLOW search-indexing AI bots (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`) while blocking uncredited scrapers (`CCBot`, `Bytespider`).
- **[Warning] Lack of 134-167 Word Direct Citation Blocks**:
  - *Evidence*: Text consists of either long academic paragraphs or brief card bullets.
  - *Fix*: Add structured "Key Findings & Contributions" blocks of 130-160 words with exact metrics.

### Area 7: AEO (Answer Engine Optimization)
- **[Warning] 0 Direct Answer Definitions**:
  - *Evidence*: `answer_block_scanner.py` detected 0 direct answer definitions matching PAA search intent.
  - *Fix*: Format key definitions: "Dr. Idelphonse Ahogni est un entomologiste médical béninois spécialisé dans..." within dedicated answer blocks.
- **[Warning] Missing Speakable Schema**:
  - *Evidence*: No `SpeakableSpecification` in schema.
  - *Fix*: Add `speakable` schema pointing to bio summaries and key research highlights for voice assistant extraction.

### Area 8: Entity SEO
- **[Critical] Missing Academic Identity Profiles in `sameAs`**:
  - *Evidence*: Lines 244-246 in `Layout.astro` have ORCID and Google Scholar commented out.
  - *Impact*: Search engines cannot unambiguously connect Dr. Ahogni to his 25+ papers in academic indices.
  - *Fix*: Add real ORCID (`https://orcid.org/...`), Google Scholar, and ResearchGate profiles to `sameAs`.
- **[Warning] Absence of Wikidata Entity**:
  - *Evidence*: No Wikidata item exists for Dr Idelphonse Ahogni.
  - *Fix*: Create a notable researcher Wikidata entry with secondary citations (WHO reports, LSHTM publications, UAC dissertation).

### Area 9: Sitemap Analysis
- **[Pass] Multilingual URL Coverage in `sitemap-0.xml`**:
  - *Evidence*: 28 URLs indexed with correct `xhtml:link` alternates.
- **[Warning] Missing Media Extensions in XML**:
  - *Evidence*: Zero `<image:image>` or `<video:video>` tags included in sitemap for rich scientific images and videos.

---

## 4. Prioritized Action Plan

### Phase 1: Immediate Blockers (Within 24 Hours)
1. **Fix Broken Links**:
   - Wrap recommendation mailto in `<!--email_off-->` to prevent Cloudflare 404 generation.
   - Remove or fix broken `studio26.africa` DNS link in `Footer.astro`.
2. **Fix Broken `/sitemap.xml` Redirect**:
   - Provide an HTTP 301 permanent redirect from `/sitemap.xml` to `/sitemap-index.xml`.
3. **Resolve 404 Image in Gallery**:
   - Update broken Unsplash URL in `Gallery.astro:38, 71`.
   - Remove empty `<img id="lxImg" src="" alt="">`.

### Phase 2: High Impact Quick Wins (Within 1 Week)
4. **Unblock AI Search Crawlers (GEO Unlock)**:
   - Whitelist `GPTBot`, `ClaudeBot`, `Google-Extended`, `OAI-SearchBot` in robots.txt and Cloudflare dashboard.
5. **Clean Schema & Connect Entity Profiles**:
   - Trim `alternateName` array to 5 valid author variants.
   - Uncomment and supply real **ORCID** and **Google Scholar** URLs in `sameAs`.
   - Replace `FAQPage` on `/contact` with `ContactPage` schema.
6. **Correct DOM Heading Inversion**:
   - Move modal drawers in `Layout.astro` below `<slot />` so `<h1>` is the first heading in the DOM.

### Phase 3: Strategic Improvements (Within 1 Month)
7. **Implement ScholarlyArticle Schema**:
   - Generate structured JSON-LD for all 26 publications with DOIs, journals, and publication dates.
8. **Optimize Image Pipeline**:
   - Migrate external Unsplash images into Astro `<Image />` assets with responsive WebP/AVIF generation.
9. **AEO Answer Blocks & Speakable Schema**:
   - Add 134-167 word definition blocks at the top of `/expertises` and `/entomologie`.
   - Implement `SpeakableSpecification` for voice search.
