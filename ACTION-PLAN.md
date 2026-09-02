# Prioritized SEO Action Plan: idelphonseahogni.com

This action plan organizes all confirmed findings from the audit into a four-phase implementation roadmap.

---

## Phase 1: Immediate Blockers & Critical Fixes (Within 48 hours)

### 1. Fix Broken Scientific DOI Links
- **Impact**: `Critical` | **Effort**: `Low (15 min)`
- **Problem**: 5 publication DOI links on the homepage point to 404 pages on doi.org.
- **Evidence**:
  - `https://doi.org/10.1186/s13071-018-3196-3`
  - `https://doi.org/10.1186/s13071-024-06289-x`
  - `https://doi.org/10.1186/s12936-025-02402-3`
  - `https://doi.org/10.1186/s12936-024-05014-2`
  - `https://doi.org/10.1186/s12936-018-2339-0`
- **Action**: Check the source files in `src/data/publications.ts` or component and update the DOI suffixes or replace with direct PubMed / Malaria Journal URLs.

### 2. Fix 404 on Protocol / SOP PDF Downloads
- **Impact**: `Critical` | **Effort**: `Low (20 min)`
- **Problem**: Download buttons for research protocols in the resource section return HTTP 404.
- **Evidence**:
  - `/protocols/WHO_Tube_Bioassay_SOP_Fr.pdf`
  - `/protocols/Larval_Sampling_Guide_Benin.pdf`
  - `/protocols/Cours_Mecanismes_Resistance_Ahogni.pdf`
  - `/protocols/Insectary_Maintenance_Manual.pdf`
- **Action**: Place the actual PDF documents inside `public/protocols/` or adjust the download button actions to valid assets.

---

## Phase 2: High Impact Quick Wins (Within 1 week)

### 3. Optimize Title & Meta Description Lengths
- **Impact**: `High` | **Effort**: `Low (15 min)`
- **Problem**: Current Title is 76 chars (cut off in Google search) and Meta Description is 271 chars (truncated).
- **Current Title**: `Dr Idelphonse Ahogni, PhD — Expert Paludisme & Entomologiste Médical | Bénin`
- **Recommended Title** (57 chars): `Dr Idelphonse Ahogni, PhD — Expert Paludisme & Entomologie`
- **Current Meta Description** (271 chars): `Dr Idelphonse Bonaventure Ahogni, PhD — entomologiste médical et gestionnaire de programme paludisme (malaria) au Bénin. 25+ publications, résistance aux insecticides, moustiquaires imprégnées, lutte antivectorielle. Expertises, missions et consultations internationales.`
- **Recommended Meta Description** (156 chars): `Dr Idelphonse Ahogni, PhD : entomologiste médical et expert en lutte antivectorielle au Bénin. 25+ publications, résistance insecticides et moustiquaires.`

### 4. Create Standard Sitemap Aliases & Add `<lastmod>`
- **Impact**: `High` | **Effort**: `Low (20 min)`
- **Problem**: Crawlers requesting `https://idelphonseahogni.com/sitemap.xml` receive a 404. Furthermore, none of the 28 URLs in `sitemap-index.xml` include `<lastmod>` date tags.
- **Action**:
  1. Add a redirect or rewrite in `astro.config.mjs` / `public/_redirects` from `/sitemap.xml` to `/sitemap-index.xml`.
  2. Configure the `@astrojs/sitemap` integration to automatically output `<lastmod>` dates.

### 5. Correct Schema.org Affiliation Properties
- **Impact**: `High` | **Effort**: `Low (15 min)`
- **Problem**: Validator flagged missing required `url` property on `Organization` entities within the `affiliation` array in `schema.org/Person`.
- **Action**: In the JSON-LD script generation in `Layout.astro` / `seo.ts`:
  ```json
  "affiliation": [
    {
      "@type": "Organization",
      "name": "Pan-African Mosquito Control Association (PAMCA)",
      "url": "https://pamca.org"
    },
    {
      "@type": "Organization",
      "name": "Organisation Mondiale de la Santé (OMS / WHO)",
      "url": "https://www.who.int"
    }
  ]
  ```

---

## Phase 3: Strategic SEO & AI Optimization (Within 1 month)

### 6. Implement `/llms.txt` and `/llms-full.txt` for GEO (Generative Engine Optimization)
- **Impact**: `High` | **Effort**: `Medium (45 min)`
- **Problem**: AI systems (SearchGPT, Claude, Perplexity) crawling the site do not find a structured synopsis.
- **Action**: Create `public/llms.txt` with:
  - Title and core identity statement.
  - Summary of key research areas (LLIN durability, Abbott calculations, kdr/ace-1 markers, CREC Sentinel sites).
  - Direct markdown links to `/expertises`, `/entomologie`, `/publications`, `/parcours`, `/stations-terrain`.

### 7. Clarify AI Crawler Rules in `robots.txt`
- **Impact**: `Medium` | **Effort**: `Low (10 min)`
- **Problem**: 4 AI search bots (`ChatGPT-User`, `PerplexityBot`, `anthropic-ai`, `FacebookBot`) inherit wildcard rules without explicit management.
- **Action**: If you want your scientific papers and portfolio to be cited in AI search engines, add explicit `Allow: /` for search crawlers (`PerplexityBot`, `ChatGPT-User`), while maintaining scraping restrictions on bulk training scrapers (`CCBot`, `Bytespider`).

### 8. Add Missing `alt` Attributes on Remaining Static Images
- **Impact**: `Medium` | **Effort**: `Low (15 min)`
- **Problem**: 1 image (`/images/hero-photo.png` / preview fallback) is missing an `alt` attribute.
- **Action**: Ensure all `<img>` tags in `.astro` components include contextual French and English `alt` attributes.

---

## Phase 4: Maintenance & Ongoing Entity Monitoring (Quarterly)

1. **Verify Google Scholar & ORCID integration**: Ensure `sameAs` links include Dr Ahogni's ORCID and Google Scholar profiles alongside ResearchGate and LinkedIn.
2. **Backlink Acquisition**: Secure contextual backlinks from institutional partners (CREC, LSHTM, UAC, PAMCA).
3. **Internal Linking Enhancement**: Ensure `/cv.json` and new blog publications are cross-linked from main landing pages.
