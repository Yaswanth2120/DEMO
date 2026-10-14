# NexaFive Global — React + Node.js

A responsive engineering consultancy website with a **React frontend** and a separate **Node.js / Express backend**. The previous implementation used Node-rendered HTML and browser JavaScript. It has been replaced with React components and Vite. The website AI assistant, OpenAI endpoints, chat UI and AI credentials have been removed. NexaFive’s actual AI/ML engineering service remains part of the business content.

## Stack

- Frontend: React 19, JSX, Vite 7, mobile-first CSS, native accessible HTML controls.
- Backend: Node.js 22.12+, Express 5, server-rendered React pages in production.
- Contact: existing FormSubmit AJAX integration, with React validation/loading/success/error handling.
- Support: WhatsApp click-to-chat, configured only with a verified official number.
- No database, AI provider, OpenAI key, external font service, or paid API is required to run the website.

React + Vite + a small Express server matches the requested separation and keeps the site maintainable without unnecessary infrastructure. Production renders page content and metadata on the server, so direct URLs have meaningful HTML and SEO without waiting for client JavaScript. Development uses a separate Vite frontend and Express API server. Page links use standard navigation; React hydrates each server-rendered page in production.

## Folder structure

```text
frontend/
  src/
    components/       # Header, footer, forms, logo, sections, WhatsApp
    pages/            # Page composition for all routes
    App.jsx
    content.js        # Company content and claims
    routes.js         # Route list and page-specific metadata
    entry-client.jsx  # React mounting/hydration
    entry-server.jsx  # Server renderer
    styles.css        # Responsive design tokens and CSS
  public/assets/      # Vector logo, favicon, original assets
  vite.config.js
  package.json
backend/
  src/
    routes/api.js     # Public configuration and health endpoints
    middleware/      # Security headers
    config.js
    app.js           # Express application and production rendering
    server.js
  tests/
  .env.example
  package.json
scripts/dev.mjs       # Starts both development processes
package.json          # npm workspaces and shared commands
package-lock.json     # Locked dependency versions
```

## Local setup

Install Node.js 22.12 or newer. From the project folder:

```sh
cd /Users/yaswanth/Desktop/Demo
npm install
npm run dev
```

Open **http://localhost:5173**. The backend runs on **http://localhost:3001** and Vite proxies `/api` to it. You do not need an environment file or any AI credentials.

To run them separately, use two terminals:

```sh
# Terminal 1, project root
npm run dev:backend

# Terminal 2, project root
npm run dev:frontend
```

You can also run `npm run dev` inside `frontend/` and `backend/` separately. If the frontend port 5173 is occupied, Vite reports the conflict; stop the existing process or choose another port explicitly. A frontend-only preview still renders if the backend is unavailable, but it cannot obtain optional backend WhatsApp configuration.

## Production

```sh
npm ci
npm run build
npm test
npm start
```

Open **http://localhost:3001**. The backend serves compiled assets and all server-rendered React routes. `frontend/dist/client/` contains the browser build; `frontend/dist/server/` contains the React server renderer. Deploy both builds and the backend together to a Node-capable host. A static-only upload omits server-side rendering and backend configuration.

Provide HTTPS, environment configuration and process supervision on the chosen host. Keep `package-lock.json` and use `npm ci` for reproducible installs. No deployment was performed.

## Optional configuration

```sh
cp -n backend/.env.example backend/.env
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port, default `3001`. Vite’s proxy expects this default unless its target is changed. |
| `SITE_URL` | Public HTTP/HTTPS origin for canonical URLs, sitemap and Open Graph metadata. Default `https://nexafiveglobal.com`. |
| `WHATSAPP_NUMBER` | Official business WhatsApp number, international digits only, 8–15 digits. No default. |
| `PUBLISH_VERIFIED_CLAIMS` | Default false. Enable affirmative accreditation/partnership copy only after client confirmation. |

Restart the backend after changing environment configuration. The root `.env` from the previous version is no longer used; current configuration belongs in `backend/.env`. Environment files are ignored by Git. No `OPENAI_API_KEY` or `OPENAI_MODEL` is used anywhere in the application.

The published telephone +1 651 416 7950 is a verified contact number, but is not assumed to support WhatsApp. Until `WHATSAPP_NUMBER` is configured, the green control opens direct email/phone contact options. A configured number opens the official `wa.me` link with the requested predefined greeting.

## Pages

Home `/`, About `/about`, Services `/services`, Solutions `/solutions`, Industries `/industries`, Research `/research`, Contact `/contact`, Privacy `/privacy`, and five detail pages under `/services/`:

- `/services/battery-engineering`
- `/services/lightweight-automotive`
- `/services/tooling-manufacturing`
- `/services/ai-optimization`
- `/services/corrosion-mitigation`

Original homepage anchors remain. `/index.html` redirects to `/`, and trailing page slashes redirect to their canonical routes. Production provides unique titles/descriptions, Open Graph metadata, canonical URLs, organization schema, sitemap, robots and a proper 404 status.

## Mobile layout

- Navigation switches to a full mobile menu at 1100px, with viewport-bounded scrolling and Escape closure.
- Hero, paired sections, industries and contact become single-column at 900px.
- Service cards, form fields and process timeline become single-column on phones.
- Fluid headings, content gutters, explicit `minmax(0, 1fr)` grids and constrained images prevent overflow.
- Mobile hero buttons fill the available width. Touch targets are at least 44px for key controls.
- All form controls use 16px text, avoiding automatic input zoom on iOS.
- WhatsApp respects safe-area spacing and has reserved footer clearance.
- Native details/summary controls, form labels, visible keyboard focus, live form status and reduced-motion support remain.

## Logo quality

The source logo is only **163 × 45 px**, so enlarging it produces blur. The new `frontend/public/assets/nexafive-logo.svg` is a reconstructed vector lockup with a clean geometric N5 mark, outlined wordmark and outlined tagline. It keeps the original blue **#0E579E**, near-black **#080A0B**, wordmark and tagline arrangement. It uses real paths rather than embedding/upscaling the original raster or depending on downloaded fonts. The original PNG remains alongside it for reference. A matching SVG favicon is included.

This is a cleanup/reconstruction from a low-resolution reference, not an original official vector master; some typography/contours differ slightly. Review the reconstructed artwork for brand approval, or replace it with the official SVG/AI/EPS if supplied. The white/light theme suits the original logo; tonal navy **#102E4C** coordinates dark feature sections without recoloring the logo.

## Content and integrations

Engineering services, healthcare technology offerings, contact details, process and original image assets are preserved. `docs/original-content.txt` archives the original live-site copy. Confirm Missouri S&T / Kansas State collaboration scope, lab identity and ISO 17025 accredited scope, ASTM/SAE/ISO test applicability, specific OEM approvals and proprietary platform status before publishing affirmative claims. No testimonials, case studies, customer relationships or performance metrics were invented.

FormSubmit’s existing endpoint and field names are retained: firstName, lastName, email, optional phone, subject, message and original hidden fields. Test ownership/activation and live delivery to info@nexafiveglobal.com before launch. Automated browser tests intercept submissions and do not send email to the company. The updated privacy page covers enquiries and WhatsApp; AI processing statements have been removed.

## Verification

- Client and server production builds pass.
- Four backend tests cover configuration validation, health/public config, removal of chat endpoints, all 13 server-rendered routes, unique metadata, vector logo, asset handling, security headers and redirects.
- Browser layout checks cover all 13 routes at 320, 375, 390, 768, 1024, 1440 and 1920px: 91 combinations, no horizontal overflow.
- Mobile navigation, keyboard Escape, contact validation/loading/success/error, optional WhatsApp fallback and production hydration are checked.
- Desktop and mobile screenshots are in `docs/`.
- Live FormSubmit delivery and configured WhatsApp conversation require final integration checks. No AI setup is needed.

This is an engineering review of responsiveness and accessibility, not a formal WCAG certification or production Core Web Vitals measurement.
