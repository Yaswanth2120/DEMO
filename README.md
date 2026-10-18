# NexaFive Global — React + Node.js

A responsive **single-page** engineering consultancy website. Frontend code lives in `frontend/`; Node/Express code lives in `backend/`. The latest revision corrects the original N5 logo and follows the actual Heshvitha Care reference more closely. See [the reference and logo audit](docs/design-audit.md).

## Stack

- React 19, JSX, Vite 7, self-hosted Outfit and Plus Jakarta Sans, responsive CSS.
- Node.js 22.12+ and Express 5, with React server rendering and client hydration in production.
- Existing FormSubmit contact integration; optional configured WhatsApp click-to-chat.
- No AI assistant, AI credentials, database or paid API is required to run the website.

The company’s AI/ML engineering service remains part of its actual business content. The separate website chatbot has been removed as requested.

## Run locally

```sh
cd /Users/yaswanth/Desktop/Demo
npm install
npm run dev
```

Open **http://localhost:5173**. This starts both the Vite frontend and the backend at **http://localhost:3001**. Vite proxies `/api` to the backend. No environment file is required for basic operation.

Run the processes separately with two terminals:

```sh
# Project root, terminal 1
npm run dev:backend

# Project root, terminal 2
npm run dev:frontend
```

After pulling updates, stop any previous process and restart `npm run dev`. Use the printed URL and refresh the browser to see the current version.

## Production

```sh
npm ci
npm run build
npm test
npm start
```

Open **http://localhost:3001**. The backend serves the React page, server-rendered content/metadata, and compiled assets. Deploy `backend/`, `frontend/dist/client/`, `frontend/dist/server/`, workspace package files, and installed production dependencies together to a Node-capable host. Configure HTTPS and process supervision. No deployment has been performed.

## Structure

```text
frontend/
  src/components/       Header, footer, contact form, WhatsApp, sections
  src/pages/            Homepage composition and 404 view
  src/content.js        Actual company content and claims
  src/routes.js         Homepage metadata and legacy redirects
  src/entry-client.jsx  React mounting/hydration
  src/entry-server.jsx  React server renderer
  src/styles.css        Design tokens and responsive layouts
  public/assets/        Unmodified original logo and engineering imagery
  public/fonts/         Openly licensed, self-hosted fonts and licenses
backend/
  src/routes/           Health and public configuration
  src/middleware/       Security headers
  src/config.js
  src/app.js            Express, server rendering, assets and redirects
  src/server.js
  tests/
  .env.example
scripts/dev.mjs         Starts both development servers
```

## Single-page navigation

All company information and exploration stays on the homepage:

| Section | Anchor |
| --- | --- |
| Home | `#hero` |
| About and five core disciplines | `#about` |
| Services, filters and full inline details | `#pillars` |
| Integrated solutions | `#solutions` |
| Industries | `#industries` |
| Engineering process | `#process` |
| Research and testing scope | `#partners` |
| FAQ | `#faq` |
| Project enquiry | `#contact` |
| Inline privacy notice | `#privacy` |

Services have individual anchors: `#battery-engineering`, `#lightweight-automotive`, `#tooling-manufacturing`, `#ai-optimization`, `#corrosion-mitigation`. Explore capability expands descriptions and applications in place; footer links reveal the matching service. Filters show All services, Mobility & energy, Manufacturing & AI, or Durability. Filter state stays in page memory.

Former `/about`, `/services`, `/solutions`, `/industries`, `/research`, `/contact`, `/privacy`, and service detail URLs permanently redirect to the appropriate homepage anchor. `/index.html` redirects to `/`. The sitemap lists the single canonical homepage. Unknown URLs retain 404 status.

## Brand and reference

The earlier reconstructed SVG incorrectly changed the N5 shape. It was removed. The **original 163 × 45 PNG is now used unchanged**, at its native dimensions. Its SHA-256 is checked against the freshly downloaded original in an automated test. No filters, font substitution or enlargement are applied to the logo. The original favicon crop is retained. A true higher-resolution logo requires the official source/master artwork.

Blue **#0E579E**, original near-black **#080A0B**, and coordinated tonal navy **#102E4C** remain. The layout now follows the reference's compact bold sans-serif typography, softly tinted hero, rounded image composition and badges, pill buttons, service filters/photo cards, five-step process and FAQ. NexaFive's own content and engineering images are retained; healthcare assets and claims were not copied. Font licenses are included.

## Optional backend configuration

```sh
cp -n backend/.env.example backend/.env
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port, default `3001`. Update Vite's proxy if changing the development backend port. |
| `SITE_URL` | Public HTTP/HTTPS origin for canonical URLs, sitemap and Open Graph metadata. Default `https://nexafiveglobal.com`. |
| `WHATSAPP_NUMBER` | Confirmed official business WhatsApp number, international digits only, 8–15 digits. No default. |
| `PUBLISH_VERIFIED_CLAIMS` | Default false. Enable affirmative partnership/accreditation copy only after client verification. |

Restart the backend after configuration changes. Previous root `.env` is no longer used. Environment files are ignored by Git. No OpenAI environment variables are read by the application.

Verified published contact: **info@nexafiveglobal.com**, **+1 651 416 7950**, Minneapolis, Minnesota, USA. The telephone is not assumed to be a WhatsApp number. Until confirmed/configured, the green control provides direct email and phone options instead of broken navigation.

## Contact and content integrity

FormSubmit's existing endpoint and fields remain: firstName, lastName, email, optional phone, subject, message and original hidden fields. Validation, loading, success and safe error handling are implemented. Verify FormSubmit ownership/activation and real email delivery before launch. Browser verification intercepts submissions and never sends test enquiries to the company.

Services, industries including Healthcare Technologies, engineering process, research content and contact information are preserved. `docs/original-content.txt` archives the original source copy. Confirm current Missouri S&T / Kansas State agreements, lab identity and ISO 17025 accredited scope, applicable ASTM/SAE/ISO standards, specific OEM approvals and proprietary-platform status before publishing affirmative claims. No testimonials, clients, certifications, case studies or performance metrics were invented.

The inline privacy notice covers enquiries, hosting logs and WhatsApp. No tracking cookies, analytics or AI processing is added.

## Verification

- Production browser and server builds pass.
- Six automated tests cover configuration, health, absent AI endpoints, same-page exploration, legacy redirects, original-logo byte identity, security headers and self-hosted fonts.
- Homepage checked at 320, 375, 390, 768, 1024, 1440 and 1920px without horizontal overflow; mobile form text is 16px.
- Service filters, inline details, privacy opening, mobile navigation and keyboard Escape checked in the production build.
- Contact form success/error tests use intercepted requests, preserving the real integration.
- Current screenshots are in `docs/`; reference screenshots are review material only and are not product assets.

Live contact email delivery and a configured WhatsApp conversation need final production verification. Accessibility review is not formal WCAG certification; production Core Web Vitals have not been measured.

## Scroll progress and loading animation

A fixed 3px blue bar at the very top follows the actual reading position in both directions: empty at the top, full at the bottom. It recalculates after viewport changes, expanded details and service filtering. Passive scroll events and animation-frame updates keep it lightweight; its accessible progress value updates without repeated live announcements.

The initial loading animation uses the original N5 favicon, a blue rotating ring, a dark branded background and an indeterminate loading line. React reveals the page after the initial fonts and hero image settle. Normal motion includes a short 450ms minimum intro and a 220ms fade; reduced motion disables animation and removes the minimum hold. No fake loading percentages are displayed.

Skip animation works independently of React, including when its bundle fails. A standalone 5-second deadline releases the page if the application cannot finish booting. The server-rendered page remains visible with JavaScript disabled. The intro runs on full page loads, not on same-page navigation, and does not replay on browser back/forward cache restoration. No new dependencies or changes to the original logo were introduced.

Browser verification covers scroll progress in both directions across all seven viewport widths, dynamic page-height updates, normal loading, missing application bundles, the skip button, reduced motion, and JavaScript-disabled access. Screenshots: `docs/loading-desktop.png`, `docs/loading-mobile.png`, and `docs/scroll-progress-desktop.png`.

The five-discipline strip below the hero is now a compact, centered ticker capped at 600px, rather than a full-width row with large gaps. It scrolls continuously without pause/resume controls. With reduced motion enabled it becomes a manually scrollable row. Duplicate visual groups are hidden from assistive technology, which reads the five disciplines only once. All seven responsive widths were checked without horizontal page overflow.

## Primary design and routes

The engineering-focused design is the primary site at `/`. Version 1 is retained at `/backup` as a classic backup design. `/v2` redirects to `/`; Version 3 has been removed.

The primary experience is built around the "5" in the N5 mark: an interactive five-discipline constellation, a focused capability stage with engineering illustrations, a five-step method track, expanding industry content, ⌘K / Ctrl K search, and contextual enquiry actions. It includes a Board Members route at `/boardmembers` plus a hover-paused industry collaboration reel within Research. The current board people, direct contacts, and industry collaborator names are clearly marked demonstration content in `frontend/src/content.js`; replace them with approved details before launch.
