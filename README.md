# PHARMINCEPT INDUSTRIAL CO., LIMITED — Website

> Static, English-only B2B corporate website for **PHARMINCEPT INDUSTRIAL CO., LIMITED** (famingsai.com).
> Pure HTML + CSS + JS + SVG. No build step, no framework.

---

## 1. Project at a glance

| | |
| --- | --- |
| Legal name | PHARMINCEPT INDUSTRIAL CO., LIMITED |
| Domain | https://famingsai.com |
| Office | Room 2, LG1, Mirror Tower, 61 Mody Road, Tsim Sha Tsui, Hong Kong |
| Site language | English only |
| Markets | Europe + Americas |
| Tech stack | Vanilla HTML5, CSS3, ES2020, SVG. No frameworks, no bundlers. |
| Hosting | GitHub Pages (apex domain via `CNAME`) |

---

## 2. Folder layout

```
/
├── index.html                Home (served at `/` — SEPC L58 forbids `index.html` in URLs)
├── services.html             Business Services
├── culture.html              Corporate Culture
├── news.html                 Company News
├── contact.html              Contact Us
├── privacy.html              Privacy Policy
├── terms.html                Terms of Service
├── 404.html                  404 page
│
├── CNAME                     GitHub Pages apex domain mapping
├── robots.txt                Crawler directives
├── sitemap.xml               Search-engine sitemap
├── app-ads.txt               IAB Authorized Advertising Sellers declaration
│
├── css/
│   └── styles.css            Single hand-authored stylesheet
│
├── js/
│   ├── partials.js           Shared header / footer DOM injection
│   ├── animations.js         Scroll reveals, marquee, magnetic CTAs, parallax
│   ├── contact-form.js       Front-end validation + simulated submit
│   └── app.js                Page-specific boot dispatch
│
└── images/
    ├── logo/                 Logo SVGs (mark, wordmark, light variants, favicon)
    ├── icons/                UI icons + sprite.svg
    ├── hero/                 Page-hero PNGs
    ├── sections/             Section PNGs
    ├── animals/              Mascot SVGs + hero mascots
    └── og/                   Open Graph cover image
```

---

## 3. Local preview

No build step is required. Any static server works.

### Python (recommended)

```bash
cd "E:\香港\27"
python -m http.server 8765
```

Open <http://localhost:8765/> in a browser. The seven user-facing pages are reachable at:

| URL | Source file |
| --- | --- |
| `/` | `index.html` |
| `/services.html` | `services.html` |
| `/culture.html` | `culture.html` |
| `/news.html` | `news.html` |
| `/contact.html` | `contact.html` |
| `/privacy.html` | `privacy.html` |
| `/terms.html` | `terms.html` |
| `/404.html` | `404.html` |

### Node `http-server`

```bash
npx http-server "E:\香港\27" -p 8765
```

### Direct browser

You can also double-click `index.html` to open it directly in a browser; some browsers gate `fetch` on `file://` so the static-server route is preferred.

---

## 4. Production deploy

Deploys are handled by `ops-famingsai` in a future round. The repo is shaped for GitHub Pages:

- `CNAME` is a single line — `famingsai.com`.
- `sitemap.xml` lists all 7 user-facing pages plus 404.
- `robots.txt` allows `/`, references the sitemap, and excludes `css/` + `js/`.
- `app-ads.txt` carries the IAB-compliant comment line required by strict validators.

HTTPS is enforced by GitHub Pages. Custom-subdomain redirects (`www.famingsai.com` → `famingsai.com`) are configured via DNS outside this repo.

---

## 5. Compliance coverage (legal pages)

`privacy.html` covers every section enumerated in `docs/legal-outline.md`:

- 19 named ad-platform SDKs (AdMob, GAM, Meta Audience Network, Unity Ads, AppLovin MAX, ironSource LevelPlay, Pangle, Vungle, Chartboost, InMobi, Tapjoy, Mintegral, Digital Turbine, Liftoff, Yahoo, Smaato, Start.io, Appodeal, BidMachine).
- 4 ad formats per platform: open-screen / splash, rewarded video, interstitial, banner.
- 9 regional privacy regimes (GDPR, UK GDPR, CCPA / CPRA, PIPL, LGPD, PIPEDA, Australia Privacy Act, Singapore PDPA, Japan APPI).
- 3 children-data regimes (COPPA, GDPR-K, UK AADC).
- Apple App Store + Google Play store policies.

`terms.html` covers the 19 sections in Part B of the same outline, including Apple EULA incorporation and Google Play Developer Program Policy.

---

## 6. SEO

- Every page has unique `<title>` and `<meta name="description">`.
- Canonical URLs point to `https://famingsai.com/...` (no `index.html`).
- Open Graph + Twitter Card on every page.
- JSON-LD: `Organization` everywhere; `WebSite` on home; `BreadcrumbList` on inner pages; `Service` on `/services.html`.
- `og:image` points to `images/og/cover.png` (1200×630).
- `lang="en"` on every page; single H1 per page.

---

## 7. Accessibility

- WCAG 2.1 AA target — focus rings, ARIA labels, semantic landmarks.
- `prefers-reduced-motion: reduce` collapses all keyframe and scroll animations.
- Body text contrast ≥ 7:1 on light; ≥ 13:1 on dark.
- Every decorative mascot has `alt=""`; meaningful images have descriptive alt.

---

## 8. Authoring conventions

- CSS uses custom properties from `docs/design-tokens.md`. The single stylesheet `css/styles.css` is the only file declaring raw hex values.
- BEM-ish class names (`hero__title`, `card--featured`). No utility-class soup.
- Vanilla ES2020 modules. No bundlers.
- All icons ship as SVG via the sprite (`images/icons/sprite.svg#name`) or as individual files for downloads.

---

## 9. Source of truth

- `SEPC.txt` — authoritative company facts and tech spec.
- `docs/prd.md` — product requirements (PM agent).
- `docs/seo-keywords.md` — per-page SEO table (PM agent).
- `docs/legal-outline.md` — exhaustive legal outline (PM agent).
- `docs/design-tokens.md` — design tokens (UI agent).
- `docs/ui-components.md` — component inventory (UI agent).
- `docs/motion-vocabulary.md` — keyframe + easing inventory (UI agent).
- `docs/QA-REPORT.md` — build QA report (this repo).