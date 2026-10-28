# About, Services, and Industries redesign

Branch: `dev_2`. The redesign is now included on `dev_2`; `dev` and `main` are unchanged.

## Homepage preservation

The homepage render was captured before implementation and compared again afterward with the same configuration. The SHA-256 is unchanged: `936f25a15162b6b968a9694f544c63821e652e499ecd9c89708a80db7a2b593c`. Homepage sections, copy, ordering, and interaction components are retained. New styling is scoped under `.rd-pages` and its descendants. The shared search receives a harmless industry-selection event so the new atlas can respond while homepage anchor navigation continues as before.

## About — a connected studio story

Removed the five discipline-card grid and the repeated homepage Method component. Replaced them with an original blue-and-black intersection diagram around the existing N5 mark, a company narrative, interactive Understand / Connect / Move forward perspectives, and a working-relationship brief. No invented client results, dates, certifications, or numerical performance claims were added.

## Services — project-focused workbench

Replaced the repeated capability showcase and generic expectations block. The new workbench explains a starting question, contribution areas, information to bring, and a next decision for each service. It supports pointer selection, arrow keys, Home/End, direct service hashes, and site search. Enquiry links open the existing contact form. The offerings remain aligned with the existing business service scope; no AI/API dependency was introduced.

## Industries — application atlas

Replaced the duplicated bento grid. A compact industry selector changes the application context, engineering pressures, useful questions, and relevant service links. A logo-colored technical map provides a different visual identity from the homepage. Healthcare content stays focused on EHR/software integration rather than implying battery or mechanical engineering services apply to healthcare software. Existing `#industry-0` through `#industry-4` links still select the correct context.

## Compatibility and checks

- Production build and full Netlify function packaging passed (`npm run check:netlify`).
- All 21 automated tests passed. Stale tests from the merged branch were aligned with its current seven-link navigation and page structure, while adding assertions that the three pages no longer render the repeated homepage components.
- Fixed the existing authentication return-path allowlist for `/services`, `/industries`, and `/collaboration`; protected routes now return visitors to their intended page after login.
- Verified service deep links, keyboard selection, search-driven service/industry selection, About perspective switching, and relevant service links.
- Checked 320, 390, 768, and 1440 px in both themes: no horizontal overflow.
- Verified reduced-motion disables diagram flow animations.
- No deployment was performed. The temporary QA server was stopped after validation.

## Preview locally

```sh
git switch dev_2
npm install
npm run dev
```

Open http://localhost:5173/about, http://localhost:5173/services, and http://localhost:5173/industries. The homepage remains at http://localhost:5173/.

Desktop and mobile screenshots are saved alongside this report as `redesign-about-*`, `redesign-services-*`, and `redesign-industries-*`.
