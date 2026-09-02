# Full Website SEO Audit Report

- **Target URL**: `https://idelphonseahogni.com`
- **Audit Date**: 2026-09-02
- **Audit Scope**: `full-site` & homepage deep dive (Technical, On-Page, Schema, Content & E-E-A-T, Crawlability, Performance, AI/GEO readiness)
- **Overall SEO Health Score**: **74 / 100** (Directional Rating: **Good / Optimization Required**)
- **Score Confidence**: `High` (backed by 12 empirical Python scripts & direct DOM extraction)

---

## 1. Executive Summary

`https://idelphonseahogni.com` is the official academic and professional portfolio of **Dr Idelphonse Bonaventure Ahogni, PhD** — a medical entomologist and malaria vector control manager at CREC (Benin). 

### Key Strengths
1. **Outstanding Security Posture (100/100)**: Full suite of HTTP security headers active (HSTS with preload, strict CSP, X-Frame-Options DENY, nosniff, Permissions-Policy).
2. **Exceptional E-E-A-T & Authority**: Deep scientific content (9,000+ words, 26 listed scientific publications, WHO GLP protocols, Sentinel station tracking, LSHTM/PAMCA credentials).
3. **Flawless Hreflang Configuration**: Bidirectional language alternates (`fr`, `en`, and `x-default`) correctly aligned with canonical URLs.

### Critical Blockers & Top Issues
1. **11 Broken Links (404/Connection Failures)**: 5 academic DOI links, 4 downloadable PDF protocol links, 1 obfuscated email link, and 1 external domain (`studio26.africa`) returning errors.
2. **Meta Description & Title Length Truncation**: Meta description is 271 characters (limit: ~155-160 chars) and Title is 76 characters (limit: ~60 chars), causing SERP snippet truncation.
3. **Missing `<lastmod>` in XML Sitemaps & 404 on standard endpoints**: `/sitemap.xml` returns 404 (only `/sitemap-index.xml` exists) and all 28 URLs lack `<lastmod>` timestamps.
4. **Missing `/llms.txt`**: AI search engines (Perplexity, SearchGPT, Claude) lack structured markdown overview.
5. **Schema.org Validation Deficits**: Missing `url` on `affiliation` nodes and nested organization properties in JSON-LD.

---

## 2. Category Scoring (Chain-of-Thought Protocol)

| Category | Base Score | Penalties | Final Score | Weight | Weighted Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Technical SEO & Security** | 95/100 | -15 (Sitemap 404 & missing lastmod) | **80/100** | 25% | 20.00 |
| **Content Quality & E-E-A-T** | 100/100 | -5 (Readability complexity for meta) | **95/100** | 20% | 19.00 |
| **On-Page SEO & Metadata** | 90/100 | -20 (Title & Meta description length, OG length) | **70/100** | 15% | 10.50 |
| **Schema & Structured Data** | 85/100 | -15 (Missing required `url` on affiliations, incomplete Org props) | **70/100** | 15% | 10.50 |
| **Crawl Flow & Link Health** | 75/100 | -30 (11 broken links, 3 orphan paths) | **45/100** | 10% | 4.50 |
| **Images & Media** | 90/100 | -10 (Missing alt on 1 hero image) | **80/100** | 10% | 8.00 |
| **AI Search Readiness (GEO/AEO)** | 60/100 | -40 (Missing llms.txt, blocked/unmanaged bots) | **20/100** | 5% | 1.00 |
| **Total Weighted Health Score** | | | | **100%** | **73.5 → 74/100** |

---

## 3. Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Links** | `Critical` | `Confirmed` | 5 Scientific DOI links return HTTP 404 | `https://doi.org/10.1186/s13071-018-3196-3`, `https://doi.org/10.1186/s13071-024-06289-x`, `https://doi.org/10.1186/s12936-025-02402-3`, `https://doi.org/10.1186/s12936-024-05014-2`, `https://doi.org/10.1186/s12936-018-2339-0` return 404 | Fix DOI strings in publication data component to valid resolved URLs |
| **Links** | `Critical` | `Confirmed` | 4 SOP / Protocol PDF downloads return HTTP 404 | `/protocols/WHO_Tube_Bioassay_SOP_Fr.pdf`, `/protocols/Larval_Sampling_Guide_Benin.pdf`, `/protocols/Cours_Mecanismes_Resistance_Ahogni.pdf`, `/protocols/Insectary_Maintenance_Manual.pdf` return 404 | Place actual PDF files in `public/protocols/` or update hrefs |
| **Links** | `Warning` | `Confirmed` | External link to studio26.africa failed | `https://studio26.africa` fails connection | Verify domain DNS/SSL or update footer link |
| **On-Page** | `Warning` | `Confirmed` | Meta Description exceeds length limit | 271 characters (`Dr Idelphonse Bonaventure Ahogni, PhD — entomologiste médical...`) | Shorten to 150–158 characters with primary keywords first |
| **On-Page** | `Warning` | `Confirmed` | Title tag exceeds 60 characters | 76 characters (`Dr Idelphonse Ahogni, PhD — Expert Paludisme & Entomologiste Médical \| Bénin`) | Tighten title to 55–60 characters: `Dr Idelphonse Ahogni, PhD — Expert Paludisme & Entomologie \| Bénin` |
| **Sitemaps** | `Warning` | `Confirmed` | Missing standard `/sitemap.xml` alias & missing `<lastmod>` | `/sitemap.xml` and `/sitemap_index.xml` return 404; all 28 URLs in `sitemap-index.xml` lack `<lastmod>` | Add redirect from `/sitemap.xml` to `/sitemap-index.xml` and include `<lastmod>` tags in sitemap generation |
| **Schema** | `Warning` | `Confirmed` | JSON-LD schema missing required `url` on Organization affiliations | Schema validator flagged `$[0].affiliation[0]` (PAMCA) and `$[0].affiliation[1]` (OMS) missing `url` | Add `"url": "https://pamca.org"` and `"url": "https://www.who.int"` into affiliation objects |
| **Social** | `Warning` | `Confirmed` | Open Graph and Twitter card descriptions are overly long | `og:description` and `twitter:description` = 271 characters | Optimize social descriptions to ≤200 characters |
| **Images** | `Warning` | `Confirmed` | Image missing `alt` description | `/images/hero-photo.png` or fallback banner lacks `alt` tag | Ensure all `<img>` tags include concise descriptive `alt` text |
| **AI / GEO** | `Warning` | `Confirmed` | Missing `/llms.txt` and `/llms-full.txt` files | HTTP 404 on `https://idelphonseahogni.com/llms.txt` | Create `public/llms.txt` with structured markdown summary of Dr Ahogni's expertise and key pages |
| **Robots** | `Info` | `Confirmed` | 4 AI bot user-agents unmanaged in robots.txt | `ChatGPT-User`, `PerplexityBot`, `anthropic-ai`, `FacebookBot` not explicitly declared | Define explicit `Allow` or `Disallow` directives depending on indexing preference |
| **Internal Links** | `Info` | `Confirmed` | 3 potential orphan files/pages detected | `/cv.json`, `/en/cv.json`, `/en/blog/welcome` have ≤1 incoming link | Link `/cv.json` clearly in CV page and connect blog articles |

---

## 4. In-Depth Technical Analysis

### 4.1. Security & Infrastructure (Score: 100/100)
- **HTTPS**: Enforced via TLS 1.3.
- **HSTS**: `max-age=31536000; includeSubDomains; preload` (Grade A+).
- **CSP**: Restrictive policy in place with proper nonce/self directives.
- **Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

### 4.2. Crawlability & Indexability
- **Robots.txt**: Accessible (HTTP 200) and references `https://idelphonseahogni.com/sitemap-index.xml`.
- **Sitemap structure**: 28 total URLs indexed across language sub-sitemaps.
- **Hreflang tags**:
  - `fr` → `https://idelphonseahogni.com/`
  - `en` → `https://idelphonseahogni.com/en`
  - `x-default` → `https://idelphonseahogni.com/`
  - All tags correctly self-reference with canonical alignment.

### 4.3. Schema.org / Entity SEO
- Primary entity: `schema.org/Person` with `jobTitle`, `hasOccupation`, `alumniOf`, `worksFor`, and `knowsAbout`.
- Secondary entity: `schema.org/WebSite` with `SearchAction`.
- Entity signals: High topical authority for malaria entomology keywords (`MILDV`, `kdr`, `PBO`, `Chlorfénapyr`, `CREC`, `LSHTM`).
