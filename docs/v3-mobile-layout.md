# V3 mobile layout — October 18, 2026

The compact experience applies only to /v3 at viewport widths up to 700px. Desktop keeps the existing layout and content. Regular /, dark /v2, and board pages do not enable it.

Mobile shows the main story and active capability, with optional disclosures for the discipline visualization, capability applications, integrated solutions, industry network, diagnostic methods, FAQs and project form. Discuss links automatically open the form and select a relevant subject. Direct fragment links reveal their content before scrolling. Inactive capability and method panels no longer reserve the tallest panel's height. Mobile spacing, illustration size, type hierarchy and footer navigation are compacted.

MobileFold is a progressive enhancement: its wrappers use display:contents on desktop, the controls are hidden there, and no-JavaScript users receive expanded content. All appearance rules are scoped to .n5-mobile-compact inside the phone breakpoint. The Light/Dark/Device selector and repeating reveals are retained.

At 390px wide, the initial page measured 8,512px before and 4,633px after (about 46% shorter), with optional details collapsed. At 1440px, page height remained 6,224px before and after. Desktop controls stay hidden and the original form remains visible. Browser checks covered 320, 375, 390, 430 and 700px in Light and Dark, with no horizontal overflow. Expanders, capability selection, enquiry subject selection, FAQ fragment navigation, and down/up/down reveal cycles passed. Production SSR also worked with JavaScript disabled. Build and eight backend tests passed.

Screenshots: v3-mobile-compact-hero.png and v3-mobile-compact-overview.png. Existing unrelated local board-intro and naming edits were preserved and excluded from this commit.
