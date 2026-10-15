# NexaFive Global — Version 2

## Open and compare

Run `npm install` once, then `npm run dev` from the repository root.

- Version 1: http://localhost:5173/
- Version 2: http://localhost:5173/v2

Production: `npm run build`, then `npm start`. The same two paths are available at http://localhost:3001. No AI credentials are required. This change does not deploy either version.

## Business review

Reviewed all content on the live https://nexafiveglobal.com/ homepage on October 15, 2026, including its navigation, capabilities, solutions, process, industries, research, and enquiry sections. Its internal navigation points to sections on one page. The current text is archived in v2-source-content.txt; the existing content module remains the shared source for the five services, industries, disciplines, and process.

NexaFive is a specialized engineering and technology consultancy. Its work spans materials science, manufacturing, mobility and energy systems. The five capabilities are battery module/pack engineering, lightweight automotive solutions, tooling/manufacturing, AI/ML optimization, and corrosion mitigation. These connect design and simulation with testing and implementation. Healthcare is a software/data integration offering (including EHR), not clinical care. The five-step published process specifically describes corrosion problem resolution; Version 2 labels it accordingly rather than claiming every project follows that sequence.

The live source describes university agreements, laboratory accreditation, OEM procedures, and a proprietary platform. Version 2 preserves the existing qualified wording and verification configuration rather than asserting independent confirmation of those claims. It adds no invented clients, testimonials, case studies, performance metrics, or certifications.

## Design direction

An original engineering editorial direction, independent of the healthcare reference: oversized black typography, the original logo blue (#0E579E), white and pale gray surfaces, fine rules, square actions, and alternating light/dark sections. The logo is the existing unmodified PNG at its original proportions. Both official university marks are preserved without cropping.

The page explains the connections between material, process and performance. Expandable capabilities keep detailed applications on the same page. The industry selector exposes each of the five business sectors. The technical ring, entry motion and scroll reveals add restrained movement; reduced-motion preferences disable animation. Reading progress and the existing loading screen work in both versions.

## Implementation

- frontend/src/v2/VersionTwo.jsx: independent layout and local interactions.
- frontend/src/v2/version-two.css: scoped styles; Version 1 retains its existing layout.
- frontend/src/App.jsx and routes.js: select Version 2 at /v2, including SSR metadata and a working /v2/ redirect.
- Existing Express backend, React SSR/hydration, contact form, privacy notice, fonts and original logo are reused.
- /v2 stays out of the main production sitemap while it is an alternate design for comparison.
- Reuses locally stored photography; no new third-party runtime dependency or API.

## Verification

- Production build and seven backend tests pass, including the new Version 2 SSR/anchor checks and the original logo checksum.
- Browser layouts checked at 320, 375, 390, 430, 768, 1024, 1440 and 1920px: no horizontal page overflow or clipped visible main-content text.
- Mobile menu opens, closes on selection, and restores focus on Escape.
- Capability sections open with pointer and keyboard. Industry selection switches all five sectors. FAQ and privacy expand inline.
- Contact success and error feedback checked with intercepted requests; no real enquiry sent.
- All images load. Scroll progress moves from 0 to 100 and back. Reduced motion disables the decorative ring. No application errors during normal production use; the mocked HTTP 500 form test produced the expected resource error.
- Screenshots: v2-desktop.png, v2-mobile.png, v2-research-mobile.png, v2-full-desktop.png.
