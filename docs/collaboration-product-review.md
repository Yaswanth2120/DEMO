# Collaboration page: product review and redesign brief

Date: October 27, 2026
Status: Review and specification only. Implementation deferred.
Scope: `/collaboration`; retain shared navigation, branding, and the two required sections.

## Product assessment

The page currently feels like a generic company directory rather than a considered engineering collaboration page. The problem is primarily content hierarchy and relevance, not a lack of decoration. Adding more animation, gradients, or larger images would not resolve it.

Reviewed the running desktop page and its component/styles. Mobile recommendations below are implementation requirements, not claims of completed mobile testing.

### Findings

| Priority | Current issue | Visitor impact | Recommended action |
| --- | --- | --- | --- |
| P0 | Five invented industrial company names dominate the page | The central credibility content is illustrative rather than useful evidence | In the redesign, use collaboration opportunity cards until approved partner information is supplied |
| P1 | Oversized hero followed by another large, two-line heading | Visitors scroll through several introductory statements before reaching useful content | Use one concise hero and modest, descriptive section titles |
| P1 | Industrial cards contain a photo, repeated icon, company name, and short category | Visitors cannot determine the scope or value of working together | Give each card a clear subject, short explanation, and relevant discussion link |
| P1 | Stock photography does not consistently communicate the card topic | The cards look interchangeable; imagery can imply an association with a company | Replace illustrative company photos with restrained technical icons; use approved logos only for actual organizations |
| P1 | Academic cards identify universities but do not explain the nature of the connection | Recognition alone does not establish collaboration scope | Add approved relationship context when available; otherwise keep wording neutral |
| P2 | Repeated demo labels and a further section disclaimer | Necessary preview context becomes visual clutter | Keep one visible preview notice above any retained demo content |
| P2 | Large image bands, icons, and empty space compete for attention | Low information density makes the page feel longer than its content warrants | Compact cards with a consistent internal rhythm |
| P2 | The closing CTA offers both collaboration and a team visit | The page's primary next step is less clear | Use one primary collaboration enquiry action |

The existing three-column grid is not inherently a problem. Preserve equal-width cards and allow the final slot to remain empty, consistent with About. Do not stretch the last cards to fill a row.

## Page purpose

Help an industrial or academic visitor understand where a collaboration could fit, what they might discuss with NexaFive, and how to start that discussion.

The page should answer:

1. What kinds of collaboration can we discuss?
2. How do industrial and academic collaborations differ?
3. What information should I bring to the first conversation?

This page should complement Services and Industries. It should not repeat their full capability lists or the five-stage service method.

## Recommended structure and copy

### 1. Compact introduction

- Eyebrow: **Collaboration**
- H1: **Connect research with real-world challenges.**
- Description: **Discuss industrial challenges and applied research opportunities with NexaFive. Start with the question, the context, and what you need to understand next.**
- Two lightweight anchor links: **Industrial collaboration** and **Academic research & collaboration**.

Use one H1. Avoid a second slogan immediately below it. The first section should begin soon after the introduction.

### 2. 01 / Industrial collaboration

Section heading: **Work on the challenges behind the product.**

Description: **Explore focused collaboration around materials, manufacturing, and durability. Scope and deliverables are agreed for each program.**

Recommended opportunity cards (proposed discussion topics, not claims of completed projects):

| Card | Proposed description |
| --- | --- |
| Materials & interfaces | Discuss material compatibility, coatings, joining, and the behavior of dissimilar interfaces. |
| Manufacturing & validation | Connect process constraints, tooling requirements, and the evidence needed to evaluate a change. |
| Durability & failure investigation | Frame an observed failure or durability question and identify relevant investigation needs. |

Each card has a small technical icon, title, two or three lines of description, and **Discuss this opportunity**. Link to the existing contact route; use an existing supported enquiry subject where possible. Do not invent an unsupported contact-form option.

If the owner prefers a partner directory, retain the partner-card model only after receiving approved names, logos, relationship descriptions, and permission to show them. Do not quietly turn the present demonstration companies into apparent real partners.

### 3. 02 / Academic research collaboration

Section heading: **Bring a research question into application.**

Description: **Explore applied investigations that connect research questions with material, component, and process decisions.**

Keep individual cards for Missouri S&T and Kansas State University, using the existing logo assets. Preserve their current names and institutional subtitles. Add a short relationship description only when approved information is available. Do not infer an active agreement, facility access, accreditation, or project outcome from a logo.

With two institutions, keep two cards at the same column width as the industrial cards and leave the third slot blank. Use a short section-level note about confirming scope if approved relationship details remain unavailable.

### 4. Focused closing invitation

Heading: **Have a question worth exploring together?**

Supporting copy: **Share the application, the question you are trying to answer, and the outcome you need to support.**

Primary button: **Discuss a collaboration** → `/contact`.

Avoid a new process section or a large unrelated team CTA.

## Visual specification

- Reuse the About card language: 14px corners, thin borders, restrained surfaces, 24–28px padding, and 18–24px gaps.
- Desktop: three columns. Intermediate widths: two columns where readable. Small screens: one column. No horizontal card carousel.
- Hero heading: approximately 48–64px desktop and 34–42px mobile; adapt to the established font and available width.
- Section headings: approximately 30–38px desktop. Keep the numbered section labels visible but secondary.
- Card headings: 22–26px. Body copy: 14–15px with comfortable line spacing.
- Industrial cards should be approximately 240–300px tall at a typical desktop width, driven by content rather than clipped fixed heights.
- Academic logo areas: approximately 80–100px high, consistent padding, `object-fit: contain`, and white backing for logo legibility.
- Use blue for hierarchy, icons, and actions. A subtle alternate background can distinguish the academic section without making every card a different visual theme.
- Remove the 155px stock-photo bands and redundant icons from the proposed partner-directory replacement.
- Use visible focus styles. Only actionable cards/links should appear clickable. No autoplay or decorative motion is needed for this page.
- Verify light and dark themes explicitly; avoid hardcoded white copy surfaces against dark backgrounds.

## Implementation plan for a later task

1. Update only `CollaborationPage` in `frontend/src/v2/SitePages.jsx`; preserve About, Services, and Industries behavior.
2. Introduce a small collaboration opportunity data set, keeping demo companies separate from verified organization content.
3. Create scoped card and section styles in `frontend/src/v2/site-pages.css`; remove obsolete collaboration selectors after checking references.
4. Preserve `/collaboration`, header/footer entries, academic assets, and contact routing.
5. Validate content, responsive layout, themes, keyboard navigation, and production builds.

## Acceptance criteria

- Both required sections are present and have distinct accessible headings.
- One hero explains the page purpose; no repeated slogan blocks.
- Industrial opportunity cards provide useful scope rather than relying on fictitious company names.
- Academic institutions appear as individual compact cards with no unsupported relationship claims.
- Three equal cards fit on a wide desktop; incomplete rows stay left-aligned.
- At 390px and 768px, text and logos remain readable, with no horizontal overflow or clipped content.
- At 1280px and 1440px, useful collaboration content follows the introduction without excessive blank space.
- Both themes have legible text, borders, logos, and focus indicators.
- Every enquiry action reaches the contact page; anchor links land below the sticky header.
- Reduced-motion preferences are respected if transitions are added.
- Client and server production builds pass using the installed Node 22 runtime.

## Decisions and dependencies

Recommended default for implementation: three industrial opportunity cards plus two academic institution cards. This keeps the requested card format while giving the page a clear purpose.

Approved partner identities and relationship wording are content dependencies for a credible partner directory. They do not prevent implementing the opportunity-card direction. No website source changes are included in this review deliverable.
