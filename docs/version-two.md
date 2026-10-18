# NexaFive Global — Version 2

## Open and compare

Run `npm install` once, then `npm run dev` from the repository root.

- Primary site: http://localhost:5173/
- Classic backup: http://localhost:5173/backup
- Board Members: http://localhost:5173/boardmembers

Production: `npm run build`, then `npm start`. The same routes are available at http://localhost:3001. No AI credentials are required. This change does not deploy the site.

## Business understanding

NexaFive Global is a specialized engineering and technology consultancy in Minneapolis. It connects five disciplines (Science, Engineering, Research, Material, Eco) across five capabilities: battery module & pack engineering, lightweight automotive solutions, high-performance tooling & manufacturing, the AI/ML optimization platform, and corrosion mitigation. Its published five-step process describes corrosion problem resolution, from intake through implementation support. It serves automotive OEMs, tier suppliers, energy/BEV, healthcare technologies (EHR software and data integration, not clinical care) and industrial manufacturing. All copy comes from the shared `frontend/src/content.js`, so both versions stay consistent. The live-site text is archived in `v2-source-content.txt`.

University agreements, laboratory accreditation, OEM procedures and proprietary-platform wording stay behind `PUBLISH_VERIFIED_CLAIMS`, as in Version 1. Version 2 adds no clients, testimonials, case studies, metrics or certifications.

## Design direction

The concept comes from the "5" in the N5 mark: five disciplines, five capabilities, a five-step method. It uses no template or reference layout. The palette is limited to the logo's blue `#0E579E`, near-black `#080A0B`, white and tints of that blue. The original PNG logo is unchanged; because it has a white background, it always sits on the white navigation island and footer.

To reduce scrolling, each chapter is about one screen and long lists become interactive stages. Desktop height dropped from about 10 screens to about 6, and phone height from about 14 to about 9.

| Chapter | What it does |
| --- | --- |
| Hero | Kinetic headline and a live **constellation**: the five disciplines on a pentagon with a travelling pulse. It cycles automatically, tilts with the pointer and shows each discipline when tapped. |
| Capabilities (dark) | All five services on **one stage**. Tabs with progress bars tour automatically and pause on hover or interaction. Each service has its own animated engineering illustration: cells charging, a car drawn in multi-material, a press forming a part, signals crossing a network, ions stopped by a coating stack. |
| Method | The five steps as an animated **track** with stations. The three integrated solutions sit underneath (a swipe row on phones). |
| Industries | A horizontal **expanding accordion** of the five sectors (a vertical accordion on phones). |
| Research (dark) | University partners, diagnostic methods and standards, with the qualified wording kept. |
| Contact | Floating-label enquiry form, direct contact details and FAQ, in one screen. |

Other features:

- **Spotlight search**: press ⌘K / Ctrl K, `/`, or the search button. It jumps to any section, capability or industry, and can start an email, call or enquiry.
- **Chapter rail**: shows the current chapter on wide screens and adapts to light or dark sections.
- **Context-aware enquiry**: a "Discuss this capability" or "Discuss your program" button pre-selects the matching form subject and focuses the form.
- Pointer-following light on cards, scroll reveals, and scroll-linked depth where the browser supports scroll-driven animations.
- Deep links such as `/#battery-engineering` open the matching capability.

## Accessibility and robustness

- Server-rendered: all copy, all five capability panels and every anchor are in the HTML without JavaScript.
- Accessible tablist, accordion, combobox/listbox and modal-dialog patterns, with keyboard support (arrow keys, Home/End, Escape) and visible focus.
- `prefers-reduced-motion` turns off auto-tours and decorative motion; content stays visible.
- Strict CSP compatible: no inline style attributes; dynamic values are set through CSSOM custom properties.
- The intro animation waits for the existing loading screen to finish.

## Implementation

- `frontend/src/v2/VersionTwo.jsx`: page shell, navigation island, hero, chapter rail, research and footer.
- `Constellation.jsx`, `Capabilities.jsx`, `Illustrations.jsx`, `Method.jsx`, `Sectors.jsx`, `Enquiry.jsx`, `CommandPalette.jsx`: the chapters and features.
- `Glyph.jsx` (icons), `motion.js` (reveal, in-view and pointer helpers), `v2.css` (scoped styles).
- `frontend/src/components/enquiry.js`: shared FormSubmit integration used by both versions, with unchanged field names.
- `/` is the primary public route. `/backup` preserves the original design, while `/v2` redirects to the primary site.

## Verification

- Production build and seven backend tests pass, including the Version 2 SSR, anchor and logo checks.
- Checked at 320, 360, 375, 390, 414, 430, 667×375, 768, 1024, 1280, 1440 and 1920px: no horizontal overflow, no text under 12px (10px for uppercase labels), touch targets of at least 40px, no console errors.
- 21 browser interaction checks pass: search palette (open, filter, Enter, Escape, `/`), capability tabs (click, arrow keys, deep link), pre-selected enquiry subject and focus, accordion, method stations, form validation, intercepted form submission with the original field names (no real enquiry sent), the mobile menu, and reduced-motion behaviour.
- Screenshots: `v2-desktop.png`, `v2-capabilities.png`, `v2-mobile.png`.
