# Review of changes/Changes

The five supplied files are retained unchanged as proposal snapshots; the running app uses frontend/src.

Applied: supplied stock photography in the hero, about, services and solutions; official university imagery; a shrinking header after scrolling; section entrance animations; and a compact research standards strip. Photos are downloaded into public/assets, with source URLs in changes-assets.json. Image descriptions were corrected to match the actual assets. The Kansas State source is a wordmark, so it is contained rather than cropped.

Removed the ticker pause/resume button at the user’s request. Preserved the compact continuous ticker, reduced-motion manual scrolling, page loading animation, original N5 artwork and top scroll progress indicator. Supplied App/styles snapshots would have reverted those newer features, so they were merged selectively.

Kept the existing qualified business copy rather than promoting unverified proprietary-platform or OEM approval claims. Did not apply the proposed AI+/OEM hero statistics or stronger content.js claims. No chatbot or runtime AI API was added.

Scroll reveals run once and also observe service cards created by filtering. Reduced-motion preferences keep content visible and disable automatic ticker motion.

Validation: production build and all six backend tests pass. Browser checks at 320, 375, 390, 768, 1024, 1440 and 1920px found no horizontal overflow or ticker controls. All images loaded; filtered cards revealed correctly; scroll progress reached 100 at the bottom and returned to 0 at the top. Loading dismissal and reduced motion were checked. Browser console had no errors.

## Missouri S&T logo update

Replaced the atrium photo with the official primary green university logo downloaded from brand.mst.edu/logos/university-logos/. Preserved its proportions with object-fit: contain; corrected the university full name. Browser checks at 320, 375, 390, 430, 768, 1024 and 1440px confirmed no page or partner-card overflow and successful logo loading. Mobile navigation opens/closes and the contact form fits at 320px. Screenshots: research-mobile-logo.png and research-desktop-logo.png.
