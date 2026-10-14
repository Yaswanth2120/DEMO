# NexaFive Global

Complete local website redesign. The supplied workspace was empty; the original site was a standalone HTML page. This implementation uses Node.js 22+ server-rendered pages and browser JavaScript, with no third-party runtime dependencies. No hosting registration or deployment was performed.

## Run

```sh
cp .env.example .env
npm run dev
```

Open http://localhost:3000. No dependency installation is required.

```sh
npm test
npm run build
npm start
```

`npm run build` syntax-checks application modules, packages the server and assets in `dist`, and renders all 13 routes into `dist/prerender` for inspection. It is **not a static-only deployment**: chat requires the Node server. Run the packaged application with `node --env-file-if-exists=.env dist/server.mjs`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Server-only OpenAI API key. Never put in public files. |
| `OPENAI_MODEL` | Responses-compatible model available to your account; default `gpt-4.1-mini`. |
| `WHATSAPP_NUMBER` | Confirmed official business WhatsApp number, international digits only, 8–15 digits. No default. |
| `SITE_URL` | Public HTTPS origin for canonical URLs, sitemap and API origin validation. |
| `PORT` | Server port, default 3000. |
| `PUBLISH_VERIFIED_CLAIMS` | Default false. Enable only after client verification described below. |
| `TRUST_PROXY` | Default false; enable only behind a trusted proxy that overwrites X-Forwarded-For. |
| `AI_DAILY_REQUEST_LIMIT` | Per-process daily AI request budget, default 500. |

Create an OpenAI project API key in the account dashboard, configure billing and project usage limits, add the key to the server environment, and select an accessible Responses-compatible model. Restart the server after environment changes. The implementation follows the [official Responses migration documentation](https://developers.openai.com/api/docs/guides/migrate-to-responses/), with `store: false` and a bounded output budget.

Do not infer WhatsApp support from the verified published telephone number +1 651 416 7950. Confirm the business number before filling `WHATSAPP_NUMBER`. Empty or invalid configuration shows a contact fallback and never opens a broken link.

## Pages and shared components

Home `/`, About `/about`, Services `/services`, Solutions `/solutions`, Industries `/industries`, Research `/research`, Contact `/contact`, Privacy `/privacy`, plus five service pages under `/services/`. Original homepage anchors `hero`, `about`, `pillars`, `solutions`, `industries`, `partners`, `process`, and `contact` remain. `/index.html` redirects to `/`; trailing slashes redirect to canonical routes.

Shared responsive header, mobile menu, brand tokens, service cards, industry accordion, engineering timeline, contact form, footer, lazy-loaded AI chat, WhatsApp control, page metadata, organization schema, robots and sitemap.

## Integrations and privacy

The original FormSubmit AJAX endpoint and fields are retained, including firstName, lastName, email, phone, subject, message and existing hidden fields. Verify ownership/activation of `info@nexafiveglobal.com` in FormSubmit before production. Native validation, loading, success and error states are implemented. Browser tests intercepted requests; no real enquiry was sent and email delivery was not verified.

`POST /api/chat` calls OpenAI Responses securely from the server. Knowledge lives in `content.mjs`. Visitor history has only user/assistant roles, up to 9 messages, user messages up to 1500 characters, assistant history up to 4000 characters, total 16000 characters, 40 KB HTTP limit, 450 output tokens and 4000 output characters. Requests have provider timeouts, origin checking, per-IP limits (10/minute), max 8 concurrent provider requests, and a daily cap. Provider failures produce safe errors. There are no AI tools, internal-data access or generated HTML rendering. Prompt rules separate trusted content from untrusted messages; no prompt-based defense can guarantee perfect model obedience.

History is only in browser memory; Clear conversation aborts pending requests and resets history. No analytics, persistent conversation storage, or chat-content server logs. API response storage is disabled; OpenAI’s applicable abuse-monitoring retention policies still apply. Contact submissions are never passed to the AI provider. Review `/privacy` with the client before launch.

Rate limits and budgets are process-local. For multiple instances, use shared rate limiting at the deployment gateway and enforce OpenAI project budgets. Configure TLS, trusted proxy headers, secrets, access log retention, uptime monitoring and process supervision on the chosen Node-capable host.

## Brand and source audit

Original logo downloaded unchanged from https://nexafiveglobal.com/assets/nexafive-logo.png (163 × 45). Dominant solid blue RGB(14,87,158), `#0E579E`; near-black solid lettering RGB(8,10,11), `#080A0B`; white `#FFFFFF`. Secondary tonal navy `#102E4C` is a derived UI color, not a claimed logo swatch. Light background suits the white-backed original logo; dark feature sections use tonal navy. Footer logo sits on white without filters. Existing engineering, research and industry assets are reused. Original source text is preserved in `docs/original-content.txt`.

Heshvitha Care was inspected through its rendered page: split hero, welcoming light layout, teal CTAs, clean service cards and structured five-step journey. Only layout concepts informed this redesign; no healthcare copy or assets were copied.

## Client verification before launch

Confirm current Missouri S&T / Kansas State collaborative agreements, ISO 17025 lab identity and accredited scope, applicable ASTM/SAE/ISO standards, specific automotive OEM approvals, and proprietary AI/ML platform status. These original claims are preserved in `content.mjs` and the source archive, qualified in public copy and excluded as verified AI facts by default. `PUBLISH_VERIFIED_CLAIMS=true` enables their original affirmative treatment after approval. Confirm service and healthcare software compliance scope with the team; no new certifications, testimonials, customer logos, metrics or case studies were invented.

Confirm WhatsApp number, FormSubmit ownership and delivery, OpenAI key/model/budget, privacy notice, and final content. Deployment needs separate user approval, as requested.

## Validation

Five automated Node tests pass: invalid-role/history/length rejection, company knowledge accuracy gates, page metadata and support controls, HTTP routes/error/rate limiting, and mocked provider integration with real request schema. `npm run build` passes.

Browser checks: all 13 routes at 320, 375, 390, 768, 1024, 1440, 1920 px (91 route/viewport combinations) have no horizontal overflow and one H1. Mobile navigation, Escape closure, chat focus return, independent WhatsApp accessibility with expanded chat, missing credentials/number states, and intercepted contact success/error states verified. Screenshots in `docs/`.

Live OpenAI answers and live WhatsApp navigation require credentials/number and remain unverified. Live enquiry delivery was not exercised. Expected HTTP errors were observed when testing unavailable AI and simulated failed forms; no JavaScript exceptions were observed. Accessibility reviewed for semantics, labels, live regions, focus indicators, reduced motion and keyboard operation; this is not a formal WCAG audit. Core Web Vitals have not been measured in a production environment.
