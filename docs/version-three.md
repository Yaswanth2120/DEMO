# NexaFive Global — Version 3

## Open

Run `npm install` once, then `npm run dev` and open http://localhost:5173/v3. Production: `npm run build`, `npm start`, then http://localhost:3001/v3. Versions 1 (`/`) and 2 (`/v2`) are unchanged. Nothing has been deployed.

## Concept: a journey through the business

Version 3 is a single-screen, app-like experience rather than a scrolling page. One living field of particles (24,000 on desktop, 11,000 on phones) reshapes itself into each part of NexaFive's business. Visitors travel between eleven scenes with the wheel, a swipe, the arrow keys, the side rail or the journey index.

| # | Scene | What the particles become | What the visitor can do |
|---|---|---|---|
| 01 | Beyond | A cube boundary with energy escaping beyond it ("Innovate beyond boundaries") | Begin the journey, or jump to contact |
| 02 | Disciplines | Five clusters on a pentagram, a nod to the N5 mark | Select Science, Engineering, Research, Material or Eco, in the panel or on the model |
| 03 | Battery | A battery tray with 32 cells, busbars and an exploded lid | Hotspots for cells/modules/packs, thermal and structural, and corrosion prevention |
| 04 | Lightweight automotive | A multi-material car body with four wheels | Hotspots for body structures, joining, and stamping and coatings |
| 05 | Tooling | A forming press: platen, die, punch, formed sheet and guide pillars | Hotspots for tooling, forming and die casting, and fluid dynamics |
| 06 | AI/ML | A 3D neural network with signals pulsing along its connections | Hotspots for material selection, optimization, and risk and performance |
| 07 | Corrosion | An exploded coating stack over dissimilar metals, with ions falling onto the sealant | Hotspots for metals, conversion and adhesive layers, and sealing and validation |
| 08 | Method | A rising spiral with five stations | The five-step corrosion-resolution process |
| 09 | Industries | Five orbits around a core, one per industry | Each industry's focus and description |
| 10 | Research | A face-centred-cubic crystal lattice | University partners, diagnostic methods and standards (qualified wording) |
| 11 | Contact | A calm sphere behind a glass enquiry panel | Enquiry form, direct contact, privacy notice, links to Versions 1 and 2 |

Every word comes from `frontend/src/content.js`. Verified-only claims (university agreements, ISO 17025, OEM procedures) appear only when `PUBLISH_VERIFIED_CLAIMS=true`. No clients, testimonials or metrics were added.

## Craft

- **Morphing particles on the GPU.** Each particle flies along its own staggered path between shapes, so a quick change of scene never jumps. Shapes are generated in code (`shapes.js`); no 3D model files are downloaded.
- **Hotspots anchored in 3D.** Labels are projected from model coordinates every frame, fade when behind the model, and stay in sync with the list in the panel.
- **Auto-framing camera.** Each model is fitted to the free area: right of the glass panel on desktop, above the bottom sheet on phones. Drag to rotate (with inertia); the model tilts gently with the pointer.
- **Optional sound.** An ambient tone and a five-note pentatonic chime per scene, synthesized live with Web Audio. Off by default; there are no audio files.
- **Details.** A journey index (press `M`), a chapter rail, a progress counter, a trailing cursor ring that shows "drag" over the model, glass panels and a kinetic headline.

## Robustness and accessibility

- Server-rendered: all eleven chapters are in the HTML. Without JavaScript, `/v3` is a normal readable page.
- Without WebGL, the scenes and navigation still work over a static backdrop.
- `prefers-reduced-motion` turns off spin, drift and transitions.
- Only the current chapter is focusable (`inert` on the others), changes are announced through a live region, and the index is a modal dialog. Keyboard: arrows, Page Up/Down, Space, Home/End, `M`, Escape.
- Rendering pauses when the tab is hidden. Pixel ratio and particle count are capped on phones.
- The Three.js engine (`three@0.186.1`, MIT) loads as a separate lazy chunk only on `/v3` (about 133 KB gzipped). It meets the existing strict Content Security Policy with no inline styles or scripts.
- The enquiry form uses the shared FormSubmit helper with the original field names.

## Files

`frontend/src/v3/`: `VersionThree.jsx` (stage, navigation, panels, form), `chapters.js` (scene script), `shapes.js` (procedural point clouds, anchors and radii), `engine.js` (Three.js renderer and shaders), `v3.css`.

## Verification

- Production build and eight backend tests pass, including server-render checks for every `/v3` chapter and anchor, and confirmation that verified claims stay hidden by default.
- 33 browser checks pass: WebGL running; single screen; wheel, arrow and Home/End navigation; URL hash; panel and hotspot sync; hotspot projection; index; deep link; "Discuss" pre-selecting the subject; form validation and intercepted submission (no real enquiry sent); arrow keys inside the form; sound toggle; phone swipe and sheet buttons; no-WebGL fallback; no-JavaScript document; reduced motion; no console errors.
- Screenshots: `v3-desktop.png`, `v3-battery.png`, `v3-mobile.png`.
