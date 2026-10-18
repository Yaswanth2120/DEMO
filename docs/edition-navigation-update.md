# Edition and animation update — October 18, 2026

The regular homepage remains at /. The existing dark design has moved from /v3 to /v2. The new /v3 combines a light hero and method with dark capability and industry sections, plus the existing dark research chapter. All editions retain the original logo.

Each edition links to its own board route. Board header, footer, logo, contact links, and command-palette navigation retain the edition. The new section-arrival effect waits for fonts and loader dismissal before correcting an incoming URL fragment, addressing cross-page links landing at the top. Same-page native smooth navigation is preserved.

Reveal effects now remain observed. Content reveals when at least 8% intersects the viewport and resets after fully leaving the observation region. Resetting only after exit avoids repeatedly toggling near the trigger threshold. Focused content remains visible. Reduced-motion preferences remove the reveal enhancement entirely, including changes to that preference while the page is open. The classic backup's reveal effect also replays on re-entry.

Validation: production build and all seven backend tests pass. Tests cover the regular/dark/mixed routes and same-edition board links. Browser checks confirmed down/up/down replay; Research and Capabilities board links in all three editions; the mixed edition's mobile board round-trip; and no horizontal overflow at 320, 390, 768, and 1440px across all three editions. Reduced-motion testing showed zero hidden reveal blocks. Screenshots: mixed-v3-desktop.png, mixed-v3-capabilities.png, mixed-v3-mobile.png.
