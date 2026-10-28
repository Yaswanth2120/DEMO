# About, Services, and Industries redesign

Branch: `dev_2`. The redesign is now included on `dev_2`; `dev` and `main` are unchanged.

## Homepage preservation

The homepage render was captured before implementation and compared again afterward with the same configuration. The SHA-256 is unchanged: `936f25a15162b6b968a9694f544c63821e652e499ecd9c89708a80db7a2b593c`. Homepage sections, copy, ordering, and interaction components are retained. New styling is scoped under `.rd-pages` and its descendants. The shared search receives a harmless industry-selection event so the new atlas can respond while homepage anchor navigation continues as before.

## About — engineering in depth

Replaced the crossed-line N5 graphic with an animated, layered isometric tooling illustration in the logo’s blue, black, and silver palette. The company narrative remains. Restored all five original method stages, with their original descriptions: Problem Intake & Triage, Diagnostic Testing, Solution Engineering, Prototype & Validate, and Implementation Support. The method now uses five selectable stage cards and a split blueprint/detail panel. Every stage includes an explanation, three work areas, a practical outcome, and a next-stage link. Selection remains fixed while reading. The blue geometric panel has subtle animation, supports reduced motion, and the selector supports keyboard navigation. Mobile keeps all five stages visible.

## Services — illustrated engineering gallery

Removed the sidebar and question-and-answer workbench. Five horizontal service tabs now change a wide illustrated showcase. Each service has a distinct technical SVG scene, headline, scope summary, three contribution areas, and a contact link. Illustrations cover battery assemblies, lightweight structures, tooling, materials intelligence, and corrosion protection. Arrow keys, Home/End, existing service hashes, and site search remain supported. No AI/API dependency or fabricated performance claims were introduced.

## Industries — application atlas

Replaced the duplicated bento grid. A compact industry selector changes the application context, engineering pressures, useful questions, and relevant service links. A logo-colored technical map provides a different visual identity from the homepage. Healthcare content stays focused on EHR/software integration rather than implying battery or mechanical engineering services apply to healthcare software. Existing `#industry-0` through `#industry-4` links still select the correct context.

## Compatibility and checks

- Production build and full Netlify function packaging passed (`npm run check:netlify`).
- All 21 automated tests passed. Stale tests from the merged branch were aligned with its current seven-link navigation and page structure, while adding assertions that the three pages no longer render the repeated homepage components.
- Fixed the existing authentication return-path allowlist for `/services`, `/industries`, and `/collaboration`; protected routes now return visitors to their intended page after login.
- Verified service deep links, keyboard selection, search-driven service/industry selection, five-stage method selection, and relevant service links.
- Checked 320, 390, 768, and 1440 px in both themes: no horizontal overflow.
- Reduced-motion styles disable the new diagram and content animations.
- No deployment was performed. The temporary QA server was stopped after validation.

## Preview locally

```sh
git switch dev_2
npm install
npm run dev
```

Open http://localhost:5173/about, http://localhost:5173/services, and http://localhost:5173/industries. The homepage remains at http://localhost:5173/.

Desktop and mobile screenshots are saved alongside this report as `redesign-about-*`, `redesign-services-*`, and `redesign-industries-*`.

## Latest visual revision validation

- All 21 automated tests pass; production and Netlify packaging builds pass.
- All five service selections and keyboard End selection verified in the browser.
- About and Services checked at 320, 390, 768, and 1440 px in light and dark themes with no horizontal overflow.
- Homepage render hash remains unchanged from the baseline above.
- Latest previews: `about-visual-revision.png`, `about-five-stage-method.png`, `services-visual-revision.png`, and `*-visual-mobile.png` / `*-visual-dark.png`.

Expanded method preview: `about-five-stage-expanded.png`. All five detail panels, keyboard selection, reduced motion, and both themes at 320–1440px were checked.
