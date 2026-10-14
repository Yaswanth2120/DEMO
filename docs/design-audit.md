# Reference and brand correction

Reference inspected directly: https://heshvithacare.com/
NexaFive source inspected directly: https://nexafiveglobal.com/

The first implementation translated the reference too loosely. Its very large light-weight/serif headline, rectangular buttons, icon-only service cards, dark feature band and page-to-page navigation did not reflect the reference's visual composition closely enough.

## Observed reference → implemented correction

| Actual rendered reference | Revised NexaFive implementation |
| --- | --- |
| Anchor navigation links to sections on one page | Header and footer use homepage anchors; former page routes redirect to anchors. |
| Outfit headings and Plus Jakarta Sans body text | Same openly licensed font families, self-hosted with their OFL licenses. |
| Desktop hero heading approximately 51px, weight 800 | Bold Outfit hero approximately 53px at 1440px; two-line headline. |
| Mobile hero heading approximately 34px, weight 800, centered | Centered fluid 31–38px headline and matching compact composition. |
| Light, gently tinted hero, rounded portrait and floating badges | Soft off-white/blue hero, engineering image, rounded frame and factual capability badges. |
| Pill buttons and small benefit chips | Blue brand buttons, outlined secondary button and engineering capability chips. |
| Small proof row below hero buttons | Five actual disciplines, end-to-end scope, and R&D; no invented metrics. |
| Image-led cards, category filters, rounded surfaces | Engineering image cards, working service filters and expandable details. |
| Structured five-step journey | Existing five-step engineering process with circular step markers. |
| Partner area and FAQ accordion | Published research-network information and company-grounded FAQs. |
| Contact remains on the same page | Existing enquiry integration, inline contact details and inline privacy notice. |

Reference screenshots are saved in docs/reference-*.png solely for review. No reference logo, healthcare photography, marketing copy, testimonial, proprietary component or healthcare brand color was used in the product. Product imagery comes from NexaFive's original assets. Open font licensing is preserved in frontend/public/fonts/.

## Logo correction

The previous SVG reconstruction was incorrect: it substituted a font glyph and geometric drawing for the original interlocking N5, and changed the wordmark. That SVG and its derived favicon have been removed.

The active logo is the original unmodified PNG. A fresh download from the published NexaFive asset matches the saved original byte for byte:

`dc55a5e5693956f24b6dc353549b4ad57e16b31d2037eac60e408f183cf03a5f`

The original source is 163 × 45 pixels. Header/footer render it at 163 × 45 without filters, altered type, stretching or enlargement. Blue remains #0E579E and the original dark lettering remains unchanged. An automated test verifies the served file's exact hash. The existing favicon is a crop of the original N5, not the reconstructed mark.

A true higher-resolution improvement requires the official higher-resolution or vector master. This correction intentionally preserves source identity rather than pretending that a redrawn mark is the original.

## Single-page behavior

Services include summaries, descriptions, applications and project CTAs directly on the homepage. Filter categories are All services, Mobility & energy, Manufacturing & AI, and Durability. Explore capability opens details inline. Footer capability links reveal the corresponding service, including after filtering. The five disciplines, research/test scope, FAQ answers and privacy notice also expand inline.

No homepage navigation or exploration link opens another internal page. Email, telephone and configured WhatsApp links intentionally launch their respective communication tools. Old URLs remain usable through permanent redirects to the matching section. Unknown URLs still return 404.
